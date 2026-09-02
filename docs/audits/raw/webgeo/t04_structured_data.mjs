/**
 * WEBGEO T04 — structured data and machine readability, measured on the BUILT
 * artefact rather than on the source.
 *
 * Reading the components tells you what CAN be injected. Only the prerendered HTML
 * tells you what a crawler that does not run JS actually receives, which is the whole
 * question for an answer engine. So this walks dist/**\/index.html.
 *
 * Usage:  node docs/audits/raw/webgeo/t04_structured_data.mjs
 * Writes: docs/audits/raw/webgeo/out/T04_structured_data.txt
 *         docs/audits/raw/webgeo/out/T04_hreflang.txt
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { dirname, join, relative, sep } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..', '..');
const DIST = join(ROOT, 'dist');
const OUT = join(HERE, 'out');
mkdirSync(OUT, { recursive: true });

if (!existsSync(DIST)) {
  console.error('dist/ does not exist — run `npm run build` first. NOT MEASURED.');
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (e === 'index.html') acc.push(p);
  }
  return acc;
}

const files = walk(DIST).sort();
const routeOf = (f) => {
  const r = '/' + relative(DIST, f).split(sep).slice(0, -1).join('/');
  return r === '/' ? '/' : r;
};

const L = [];
const say = (s = '') => L.push(s);
const H = [];
const hsay = (s = '') => H.push(s);

say('WEBGEO T04 — STRUCTURED DATA, MEASURED ON dist/ (what a non-JS crawler receives)');
say(`prerendered pages found: ${files.length}`);
say('');

const LD = /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
const perRoute = new Map(); // route -> Set(types)
const typeCount = new Map();
const parseFailures = [];

for (const f of files) {
  const route = routeOf(f);
  const html = readFileSync(f, 'utf8');
  const types = new Set();
  let m;
  LD.lastIndex = 0;
  while ((m = LD.exec(html))) {
    let json;
    try {
      json = JSON.parse(m[1]);
    } catch (e) {
      parseFailures.push(`${route}: ${e.message.slice(0, 90)}`);
      continue;
    }
    const collect = (n) => {
      if (!n || typeof n !== 'object') return;
      if (Array.isArray(n)) return n.forEach(collect);
      if (typeof n['@type'] === 'string') types.add(n['@type']);
      if (Array.isArray(n['@type'])) n['@type'].forEach((t) => types.add(t));
      for (const v of Object.values(n)) collect(v);
    };
    collect(json);
  }
  perRoute.set(route, types);
  for (const t of types) typeCount.set(t, (typeCount.get(t) || 0) + 1);
}

say('SCHEMA TYPES ACROSS THE SITE (route count carrying each type)');
[...typeCount.entries()].sort((a, b) => b[1] - a[1]).forEach(([t, n]) => say(`  ${String(n).padStart(4)}  ${t}`));
say('');

if (parseFailures.length) {
  say(`JSON-LD BLOCKS THAT FAILED TO PARSE (${parseFailures.length}) — a crawler discards these:`);
  parseFailures.forEach((p) => say(`  ${p}`));
} else {
  say('JSON-LD BLOCKS THAT FAILED TO PARSE: 0 (every block on every page is valid JSON)');
}
say('');

const none = [...perRoute.entries()].filter(([, t]) => t.size === 0).map(([r]) => r).sort();
say(`ROUTES WITH NO STRUCTURED DATA AT ALL: ${none.length} of ${files.length}`);
none.forEach((r) => say(`  ${r}`));
say('');

say('PER-ROUTE TYPES (every prerendered route)');
[...perRoute.entries()].sort().forEach(([r, t]) => say(`  ${r.padEnd(52)} ${[...t].sort().join(', ') || '(none)'}`));
say('');

// ---------------------------------------------------------------- hreflang
hsay('WEBGEO T04.4 — HREFLANG CORRECTNESS');
hsay('');
hsay('Sample: the five routes the brief asks for, each in all four locales.');
hsay('Checked: (a) does the page emit hreflang at all; (b) are all four locales named;');
hsay('(c) is x-default present; (d) is the UA prefix mapped to hreflang "uk" (the ISO');
hsay('    language code) rather than "ua" (which is the COUNTRY code for Ukraine and is');
hsay('    invalid as a language subtag); (e) is the page self-referential.');
hsay('');

const SAMPLE = ['/', '/exporters', '/dealers', '/certificate-of-origin', '/services'];
const LOCPREFIX = ['', '/ua', '/pl', '/ru'];
const HREF = /<link[^>]+rel="alternate"[^>]*>/g;
const ATTR = (tag, a) => (new RegExp(`${a}="([^"]*)"`).exec(tag) || [])[1];

for (const base of SAMPLE) {
  hsay('='.repeat(76));
  hsay(`SAMPLE ROUTE: ${base}`);
  hsay('='.repeat(76));
  for (const p of LOCPREFIX) {
    const route = base === '/' ? p || '/' : `${p}${base}`;
    const f = join(DIST, ...route.split('/').filter(Boolean), 'index.html');
    if (!existsSync(f)) {
      hsay(`  ${route.padEnd(34)} NOT PRERENDERED`);
      continue;
    }
    const html = readFileSync(f, 'utf8');
    const tags = html.match(HREF) || [];
    const pairs = tags.map((t) => [ATTR(t, 'hreflang') || ATTR(t, 'hrefLang'), ATTR(t, 'href')]).filter(([l]) => l);
    const langs = pairs.map(([l]) => l);
    const htmlLang = (/<html[^>]+lang="([^"]*)"/.exec(html) || [])[1];
    const canonical = (/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/.exec(html) || [])[1];
    hsay(`  ${route.padEnd(34)} html lang=${String(htmlLang).padEnd(6)} alternates=${langs.length}  [${langs.join(', ')}]`);
    hsay(`      canonical: ${canonical || '(NONE)'}`);
    const self = pairs.find(([, href]) => href && href.endsWith(route === '/' ? '.com/' : route));
    const problems = [];
    if (!langs.length) problems.push('NO hreflang at all');
    if (langs.length && !langs.includes('x-default')) problems.push('no x-default');
    if (langs.includes('ua')) problems.push('uses hreflang="ua" — invalid language subtag, should be "uk"');
    if (langs.length && !langs.includes('uk') && !langs.includes('ua')) problems.push('Ukrainian alternate missing');
    if (langs.length && !self) problems.push('not self-referential');
    hsay(`      ${problems.length ? 'PROBLEMS: ' + problems.join('; ') : 'OK'}`);
    pairs.forEach(([l, h]) => hsay(`        ${String(l).padEnd(10)} ${h}`));
  }
  hsay('');
}

writeFileSync(join(OUT, 'T04_structured_data.txt'), L.join('\n') + '\n', 'utf8');
writeFileSync(join(OUT, 'T04_hreflang.txt'), H.join('\n') + '\n', 'utf8');
console.log(L.slice(0, 60).join('\n'));
