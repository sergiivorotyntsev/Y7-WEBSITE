/**
 * Full-site SEO regression snapshot.
 *
 * The route inventory comes from the prerender output, not from a maintained
 * list: dist/valid-routes.json supplies every rendered route, built robots meta
 * removes noindex documents, and dist/sitemap.xml independently proves that the
 * remaining set is the intended 138-URL indexable surface.
 *
 * SOURCE OF TRUTH = the prerendered HTML in dist/. No browser or hydration is
 * involved, so the captured values are exactly what a crawler receives.
 *
 * USAGE:
 *   node scripts/seo-snapshot.mjs --write
 *   node scripts/seo-snapshot.mjs --check
 *   node scripts/seo-snapshot.mjs
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = join(HERE, '..', 'dist');
const VALID_ROUTES_PATH = join(DIST, 'valid-routes.json');
const SITEMAP_PATH = join(DIST, 'sitemap.xml');
const BASELINE_PATH = join(HERE, 'seo-baseline.json');
const SITE_ORIGIN = 'https://www.y7agency.com';
const EXPECTED_INDEXABLE_ROUTE_COUNT = 138;

const SNAPSHOT_FIELDS = [
  'title',
  'description',
  'canonical',
  'robots',
  'ogTitle',
  'ogDescription',
  'ogImage',
  'twitterTitle',
  'twitterDescription',
  'h1',
  'h2',
  'jsonLdTypes',
  'hreflang',
  'internalLinkTargets',
];

const NAMED_ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  rsquo: '’',
  lsquo: '‘',
  ldquo: '“',
  rdquo: '”',
  mdash: '—',
  ndash: '–',
  rarr: '→',
  hellip: '…',
};

function decodeEntities(value) {
  if (value === null || value === undefined) return value;
  return value.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (entity, body) => {
    const lower = body.toLowerCase();
    if (Object.hasOwn(NAMED_ENTITIES, lower)) return NAMED_ENTITIES[lower];

    const codePoint = lower.startsWith('#x')
      ? Number.parseInt(lower.slice(2), 16)
      : lower.startsWith('#')
        ? Number.parseInt(lower.slice(1), 10)
        : Number.NaN;

    return Number.isInteger(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
      ? String.fromCodePoint(codePoint)
      : entity;
  });
}

function stripTags(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

function parseAttrs(tag) {
  const attrs = {};
  const pattern = /([a-zA-Z:-]+)\s*=\s*"([^"]*)"|([a-zA-Z:-]+)\s*=\s*'([^']*)'/g;
  let match;
  while ((match = pattern.exec(tag))) {
    if (match[1] !== undefined) attrs[match[1].toLowerCase()] = match[2];
    else attrs[match[3].toLowerCase()] = match[4];
  }
  return attrs;
}

function extractMetaAttrs(html) {
  return (html.match(/<meta\b[^>]*>/gi) || []).map(parseAttrs);
}

function extractMetaContent(metas, key) {
  const wanted = key.toLowerCase();
  for (const attrs of metas) {
    const name = (attrs.name || '').toLowerCase();
    const property = (attrs.property || '').toLowerCase();
    if (name === wanted || property === wanted) {
      return decodeEntities(attrs.content ?? '');
    }
  }
  return null;
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? stripTags(match[1]) : null;
}

function extractCanonical(html) {
  const links = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of links) {
    const attrs = parseAttrs(tag);
    const rels = (attrs.rel || '').toLowerCase().split(/\s+/);
    if (rels.includes('canonical')) return decodeEntities(attrs.href ?? '');
  }
  return null;
}

function extractHreflang(html) {
  const result = [];
  const links = html.match(/<link\b[^>]*>/gi) || [];

  for (const tag of links) {
    const attrs = parseAttrs(tag);
    const rels = (attrs.rel || '').toLowerCase().split(/\s+/);
    if (rels.includes('alternate') && attrs.hreflang) {
      result.push({
        hreflang: attrs.hreflang,
        href: decodeEntities(attrs.href ?? ''),
      });
    }
  }

  result.sort((a, b) => (
    a.hreflang.localeCompare(b.hreflang) || a.href.localeCompare(b.href)
  ));
  return result;
}

function bodyHtml(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : html;
}

function extractHeadingTexts(html, level) {
  const result = [];
  const pattern = new RegExp('<h' + level + '\\b[^>]*>([\\s\\S]*?)<\\/h' + level + '>', 'gi');
  let match;

  while ((match = pattern.exec(bodyHtml(html)))) {
    result.push(stripTags(match[1]));
  }
  return result;
}

function extractJsonLdTypes(html, route) {
  const scriptPattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const types = new Set();
  let match;

  function visit(value) {
    if (Array.isArray(value)) {
      for (const item of value) visit(item);
      return;
    }
    if (!value || typeof value !== 'object') return;

    if (value['@type']) {
      const nodeTypes = Array.isArray(value['@type']) ? value['@type'] : [value['@type']];
      for (const type of nodeTypes) types.add(String(type));
    }

    for (const child of Object.values(value)) visit(child);
  }

  while ((match = scriptPattern.exec(html))) {
    let data;
    try {
      data = JSON.parse(match[1].trim());
    } catch (error) {
      throw new Error('Invalid JSON-LD on ' + route + ': ' + error.message);
    }
    visit(data);
  }

  return [...types].sort((a, b) => a.localeCompare(b));
}

function extractInternalLinkTargets(html, route) {
  const targets = new Set();
  const anchors = bodyHtml(html).match(/<a\b[^>]*>/gi) || [];
  const baseUrl = new URL(route, SITE_ORIGIN + '/');

  for (const tag of anchors) {
    const attrs = parseAttrs(tag);
    const href = decodeEntities(attrs.href ?? '').trim();
    if (!href || href.startsWith('#')) continue;

    let target;
    try {
      target = new URL(href, baseUrl);
    } catch {
      continue;
    }

    if (target.origin !== SITE_ORIGIN) continue;
    target.hash = '';
    targets.add(target.pathname + target.search);
  }

  return [...targets].sort((a, b) => a.localeCompare(b));
}

function robotsDirectives(metas) {
  return metas
    .filter((attrs) => {
      const name = (attrs.name || '').toLowerCase();
      return name === 'robots' || name === 'googlebot';
    })
    .map((attrs) => decodeEntities(attrs.content ?? ''));
}

function hasNoindexDirective(metas) {
  return robotsDirectives(metas).some((content) => {
    const tokens = content.toLowerCase().split(/[\s,]+/).filter(Boolean);
    return tokens.includes('noindex') || tokens.includes('none');
  });
}

function routeToFile(route) {
  const segments = route.split('/').filter(Boolean);
  return segments.length === 0
    ? join(DIST, 'index.html')
    : join(DIST, ...segments, 'index.html');
}

function readRouteDocuments() {
  if (!existsSync(VALID_ROUTES_PATH)) {
    throw new Error('Missing ' + VALID_ROUTES_PATH + '. Run npm run build first.');
  }

  const routes = JSON.parse(readFileSync(VALID_ROUTES_PATH, 'utf8'));
  if (!Array.isArray(routes)) {
    throw new Error('dist/valid-routes.json must contain an array.');
  }

  const seen = new Set();
  return routes.map((route) => {
    if (typeof route !== 'string' || !route.startsWith('/') || route.includes('..')) {
      throw new Error('Invalid route in dist/valid-routes.json: ' + JSON.stringify(route));
    }
    if (seen.has(route)) {
      throw new Error('Duplicate route in dist/valid-routes.json: ' + route);
    }
    seen.add(route);

    const file = routeToFile(route);
    if (!existsSync(file)) {
      throw new Error('Prerendered file missing for route ' + route + ': ' + file);
    }

    const html = readFileSync(file, 'utf8');
    const metas = extractMetaAttrs(html);
    return {
      route,
      html,
      metas,
      indexable: !hasNoindexDirective(metas),
    };
  });
}

function normalizeSitemapPath(pathname) {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function readSitemapRoutes() {
  if (!existsSync(SITEMAP_PATH)) {
    throw new Error('Missing ' + SITEMAP_PATH + '. Run npm run build first.');
  }

  const xml = readFileSync(SITEMAP_PATH, 'utf8');
  const matches = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)];
  const routes = matches.map((match) => {
    const url = new URL(decodeEntities(match[1].trim()));
    if (url.origin !== SITE_ORIGIN || url.search || url.hash) {
      throw new Error('Unexpected sitemap URL: ' + url.href);
    }
    return normalizeSitemapPath(url.pathname);
  });

  if (new Set(routes).size !== routes.length) {
    throw new Error('dist/sitemap.xml contains duplicate URL entries.');
  }
  return routes;
}

function assertIndexableRouteSet(documents) {
  const indexableRoutes = documents
    .filter((document) => document.indexable)
    .map((document) => document.route);
  const sitemapRoutes = readSitemapRoutes();

  const indexableSet = new Set(indexableRoutes);
  const sitemapSet = new Set(sitemapRoutes);
  const onlyInPrerender = indexableRoutes.filter((route) => !sitemapSet.has(route));
  const onlyInSitemap = sitemapRoutes.filter((route) => !indexableSet.has(route));

  if (indexableRoutes.length !== EXPECTED_INDEXABLE_ROUTE_COUNT
    || sitemapRoutes.length !== EXPECTED_INDEXABLE_ROUTE_COUNT
    || onlyInPrerender.length > 0
    || onlyInSitemap.length > 0) {
    throw new Error([
      'Indexable route-set assertion failed.',
      '  prerender indexable: ' + indexableRoutes.length,
      '  sitemap URLs: ' + sitemapRoutes.length,
      '  only in prerender: ' + JSON.stringify(onlyInPrerender),
      '  only in sitemap: ' + JSON.stringify(onlyInSitemap),
    ].join('\n'));
  }

  return indexableSet;
}

function snapshotDocument(document) {
  const { html, metas, route } = document;
  return {
    title: extractTitle(html),
    description: extractMetaContent(metas, 'description'),
    canonical: extractCanonical(html),
    robots: extractMetaContent(metas, 'robots'),
    ogTitle: extractMetaContent(metas, 'og:title'),
    ogDescription: extractMetaContent(metas, 'og:description'),
    ogImage: extractMetaContent(metas, 'og:image'),
    twitterTitle: extractMetaContent(metas, 'twitter:title'),
    twitterDescription: extractMetaContent(metas, 'twitter:description'),
    h1: extractHeadingTexts(html, 1),
    h2: extractHeadingTexts(html, 2),
    jsonLdTypes: extractJsonLdTypes(html, route),
    hreflang: extractHreflang(html),
    internalLinkTargets: extractInternalLinkTargets(html, route),
  };
}

function buildSnapshot(documents, indexableSet) {
  const snapshot = {};
  for (const document of documents) {
    if (indexableSet.has(document.route)) {
      snapshot[document.route] = snapshotDocument(document);
    }
  }
  return snapshot;
}

function formatValue(value) {
  if (value === undefined) return '      <missing>';
  return JSON.stringify(value, null, 2)
    .split('\n')
    .map((line) => '      ' + line)
    .join('\n');
}

function targetSetDiff(baselineValue, currentValue) {
  const baselineTargets = Array.isArray(baselineValue) ? baselineValue : [];
  const currentTargets = Array.isArray(currentValue) ? currentValue : [];
  const baselineSet = new Set(baselineTargets);
  const currentSet = new Set(currentTargets);

  return {
    added: currentTargets.filter((target) => !baselineSet.has(target)),
    removed: baselineTargets.filter((target) => !currentSet.has(target)),
  };
}

function orderedFields(baselineRoute, currentRoute) {
  const present = new Set([
    ...Object.keys(baselineRoute),
    ...Object.keys(currentRoute),
  ]);
  const known = SNAPSHOT_FIELDS.filter((field) => present.delete(field));
  return [...known, ...[...present].sort((a, b) => a.localeCompare(b))];
}

function diffSnapshots(baseline, current) {
  const changes = [];
  const routes = [...new Set([
    ...Object.keys(baseline),
    ...Object.keys(current),
  ])].sort((a, b) => a.localeCompare(b));

  for (const route of routes) {
    const baselineRoute = baseline[route];
    const currentRoute = current[route];

    if (!baselineRoute) {
      changes.push('+ route added: ' + route);
      continue;
    }
    if (!currentRoute) {
      changes.push('- route removed: ' + route);
      continue;
    }

    for (const field of orderedFields(baselineRoute, currentRoute)) {
      const baselineValue = baselineRoute[field];
      const currentValue = currentRoute[field];
      if (JSON.stringify(baselineValue) === JSON.stringify(currentValue)) continue;

      if (field === 'internalLinkTargets') {
        const linkDiff = targetSetDiff(baselineValue, currentValue);
        changes.push([
          '~ ' + route + ' :: ' + field,
          '    added:',
          formatValue(linkDiff.added),
          '    removed:',
          formatValue(linkDiff.removed),
        ].join('\n'));
        continue;
      }

      changes.push([
        '~ ' + route + ' :: ' + field,
        '    baseline:',
        formatValue(baselineValue),
        '    current:',
        formatValue(currentValue),
      ].join('\n'));
    }
  }

  return changes;
}

function readBaseline() {
  if (!existsSync(BASELINE_PATH)) {
    throw new Error('No baseline at ' + BASELINE_PATH + '. Run the snapshot write command first.');
  }
  const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
  if (!baseline || Array.isArray(baseline) || typeof baseline !== 'object') {
    throw new Error('SEO baseline must be a route-keyed JSON object.');
  }
  return baseline;
}

function main() {
  const args = process.argv.slice(2);
  const unknownArgs = args.filter((arg) => arg !== '--write' && arg !== '--check');
  if (unknownArgs.length > 0 || (args.includes('--write') && args.includes('--check'))) {
    throw new Error('Usage: node scripts/seo-snapshot.mjs [--check|--write]');
  }

  const mode = args.includes('--write') ? 'write' : 'check';
  const documents = readRouteDocuments();
  const indexableSet = assertIndexableRouteSet(documents);
  const current = buildSnapshot(documents, indexableSet);
  const noindexCount = documents.length - indexableSet.size;

  console.log(
    '[seo-snapshot] inventory: ' + documents.length + ' prerendered, '
      + noindexCount + ' noindex, ' + indexableSet.size + ' indexable/sitemap routes.',
  );

  if (mode === 'write') {
    writeFileSync(BASELINE_PATH, JSON.stringify(current, null, 2) + '\n', 'utf8');
    console.log(
      '[seo-snapshot] wrote baseline for ' + Object.keys(current).length
        + ' routes -> ' + BASELINE_PATH,
    );
    return;
  }

  const baseline = readBaseline();
  const changes = diffSnapshots(baseline, current);
  if (changes.length === 0) {
    console.log(
      '[seo-snapshot] OK: no SEO drift across ' + Object.keys(current).length + ' routes.',
    );
    return;
  }

  console.error(
    '[seo-snapshot] REGRESSION: ' + changes.length + ' route/field change(s) detected:\n',
  );
  console.error(changes.join('\n'));
  process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error('[seo-snapshot] ERROR: ' + error.message);
  process.exitCode = 2;
}
