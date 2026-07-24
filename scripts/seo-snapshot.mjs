/**
 * seo-snapshot.mjs — [NJPORTS-T4] SEO regression baseline for the NJ-ports /
 * auction-origin in-scope pages.
 *
 * WHY: the content sprint must prove zero SEO regression. This captures the
 * crawlable contract of each in-scope page — <title>, meta description,
 * canonical, hreflang set, the H1/H2/H3 tree in document order, every JSON-LD
 * block (type + key field), and the internal-link count — into a committed
 * JSON baseline, and fails loudly on any drift.
 *
 * SOURCE OF TRUTH = the PRERENDERED output in dist/, NOT the dev server.
 * scripts/prerender.mjs is what crawlers actually see (Vite SPA + Puppeteer
 * prerender). We parse the raw static HTML string (no browser, no hydration)
 * so the snapshot is exactly the bytes a crawler receives.
 *
 * ZERO new dependencies — Node built-ins only (fs, path, url).
 *
 * USAGE:
 *   node scripts/seo-snapshot.mjs --write   # write scripts/seo-baseline.json
 *   node scripts/seo-snapshot.mjs --check    # diff dist/ vs baseline; exit 1 on any change
 *   node scripts/seo-snapshot.mjs            # same as --check
 *
 * Wired as npm scripts `seo:snapshot` / `seo:check`. Deliberately NOT added to
 * prebuild in this sprint — it is a guard you run, not a build step.
 *
 * Requires a prior `npm run build` (dist/ with prerendered routes). If a route's
 * prerendered file is missing the run errors with the route path.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const BASELINE = join(__dirname, 'seo-baseline.json');

// The in-scope page set (audit §A4): the seven named pages plus the four
// Newark-touching lane pages (auction-to-port is itself one of them and is
// listed among the named seven). This array is the single source — add or
// remove a route here in one place.
const ROUTES = [
  '/',
  '/services',
  '/exporters',
  '/ports/newark',
  '/new-jersey-auto-transport',
  '/auction-to-port-transport',
  '/door-to-port-auto-transport',
  '/texas-to-newark-port-auto-transport',
  '/chicago-to-port-newark-car-shipping',
  '/new-jersey-to-florida-car-shipping',
];

// ---- HTML helpers (regex on well-formed prerendered output) ----------------

const ENTITIES = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'",
  '&#x27;': "'", '&rsquo;': '’', '&#8217;': '’', '&lsquo;': '‘',
  '&mdash;': '—', '&#8212;': '—', '&ndash;': '–', '&#8211;': '–',
  '&rarr;': '→', '&ldquo;': '“', '&rdquo;': '”', '&nbsp;': ' ',
  '&hellip;': '…', '&#x2F;': '/',
};

function decodeEntities(s) {
  if (!s) return s;
  return s.replace(/&[a-zA-Z]+;|&#x?[0-9a-fA-F]+;/g, (m) => ENTITIES[m] ?? m);
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

function parseAttrs(tag) {
  const attrs = {};
  const re = /([a-zA-Z:-]+)\s*=\s*"([^"]*)"|([a-zA-Z:-]+)\s*=\s*'([^']*)'/g;
  let m;
  while ((m = re.exec(tag))) {
    if (m[1] !== undefined) attrs[m[1].toLowerCase()] = m[2];
    else attrs[m[3].toLowerCase()] = m[4];
  }
  return attrs;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? stripTags(m[1]) : null;
}

function extractMetaDescription(html) {
  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of metas) {
    const a = parseAttrs(tag);
    if ((a.name || '').toLowerCase() === 'description') return decodeEntities(a.content ?? '');
  }
  return null;
}

function extractCanonical(html) {
  const links = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of links) {
    const a = parseAttrs(tag);
    if ((a.rel || '').toLowerCase() === 'canonical') return a.href ?? null;
  }
  return null;
}

function extractHreflang(html) {
  const links = html.match(/<link\b[^>]*>/gi) || [];
  const out = [];
  for (const tag of links) {
    const a = parseAttrs(tag);
    if ((a.rel || '').toLowerCase() === 'alternate' && a.hreflang) {
      out.push({ hreflang: a.hreflang, href: a.href ?? '' });
    }
  }
  // Stable order so the diff is deterministic regardless of emit order.
  out.sort((x, y) => x.hreflang.localeCompare(y.hreflang) || x.href.localeCompare(y.href));
  return out;
}

function extractHeadings(html) {
  // Body only, so <title>/head noise never leaks in.
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;
  const re = /<(h[123])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const out = [];
  let m;
  while ((m = re.exec(body))) {
    const text = stripTags(m[2]);
    if (text) out.push({ tag: m[1].toLowerCase(), text });
  }
  return out;
}

function jsonLdKey(obj) {
  return obj.name || obj.serviceType || obj.headline || obj.url || obj['@id'] || null;
}

function extractJsonLd(html) {
  const re = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    let data;
    try {
      data = JSON.parse(decodeEntities(m[1].trim()));
    } catch {
      out.push({ type: 'PARSE_ERROR', key: null });
      continue;
    }
    const nodes = Array.isArray(data) ? data : (data['@graph'] ? data['@graph'] : [data]);
    for (const node of nodes) {
      if (node && typeof node === 'object') {
        const type = node['@type'] || 'unknown';
        out.push({ type: Array.isArray(type) ? type.join('+') : type, key: jsonLdKey(node) });
      }
    }
  }
  return out;
}

function countInternalLinks(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;
  const anchors = body.match(/<a\b[^>]*>/gi) || [];
  const targets = new Set();
  let total = 0;
  for (const tag of anchors) {
    const a = parseAttrs(tag);
    const href = a.href || '';
    const isInternal =
      href.startsWith('/') && !href.startsWith('//')
        ? true
        : href.startsWith('https://www.y7agency.com');
    if (isInternal) {
      total += 1;
      targets.add(href.replace('https://www.y7agency.com', '') || '/');
    }
  }
  return { total, unique: targets.size };
}

function routeToFile(route) {
  return route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html');
}

function snapshotRoute(route) {
  const file = routeToFile(route);
  if (!existsSync(file)) {
    throw new Error(
      `Prerendered file missing for route "${route}": ${file}\n` +
        `Run \`npm run build\` first so dist/ holds the prerendered output.`
    );
  }
  const html = readFileSync(file, 'utf-8');
  return {
    title: extractTitle(html),
    description: extractMetaDescription(html),
    canonical: extractCanonical(html),
    hreflang: extractHreflang(html),
    headings: extractHeadings(html),
    jsonLd: extractJsonLd(html),
    internalLinks: countInternalLinks(html),
  };
}

function buildSnapshot() {
  const snap = {};
  for (const route of ROUTES) snap[route] = snapshotRoute(route);
  return snap;
}

// ---- diff -------------------------------------------------------------------

function diff(baseline, current) {
  const changes = [];
  const routes = new Set([...Object.keys(baseline), ...Object.keys(current)]);
  for (const route of routes) {
    const b = baseline[route];
    const c = current[route];
    if (!b) { changes.push(`+ route added: ${route}`); continue; }
    if (!c) { changes.push(`- route removed: ${route}`); continue; }
    for (const field of ['title', 'description', 'canonical', 'hreflang', 'headings', 'jsonLd', 'internalLinks']) {
      const bs = JSON.stringify(b[field]);
      const cs = JSON.stringify(c[field]);
      if (bs !== cs) {
        changes.push(`~ ${route} :: ${field}\n    baseline: ${bs}\n    current:  ${cs}`);
      }
    }
  }
  return changes;
}

// ---- main -------------------------------------------------------------------

const mode = process.argv.includes('--write') ? 'write' : 'check';

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(2);
}

const current = buildSnapshot();

if (mode === 'write') {
  writeFileSync(BASELINE, JSON.stringify(current, null, 2) + '\n', 'utf-8');
  console.log(`[seo-snapshot] wrote baseline for ${Object.keys(current).length} routes -> ${BASELINE}`);
  process.exit(0);
}

// check mode
if (!existsSync(BASELINE)) {
  console.error(`[seo-snapshot] no baseline at ${BASELINE}. Run \`npm run seo:snapshot\` first.`);
  process.exit(2);
}
const baseline = JSON.parse(readFileSync(BASELINE, 'utf-8'));
const changes = diff(baseline, current);
if (changes.length === 0) {
  console.log(`[seo-snapshot] OK — no SEO drift across ${Object.keys(current).length} in-scope routes.`);
  process.exit(0);
}
console.error(`[seo-snapshot] REGRESSION — ${changes.length} change(s) detected:\n`);
console.error(changes.join('\n'));
process.exit(1);
