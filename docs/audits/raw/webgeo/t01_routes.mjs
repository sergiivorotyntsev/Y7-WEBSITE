/**
 * WEBGEO T01 — the route inventory, from the source of truth rather than a memory.
 *
 * THREE candidate sources exist and this script reads all three, because the brief
 * says "find it, do not assume which" and because any drift between them IS the
 * finding:
 *
 *   1. scripts/prerender.mjs  `PUBLIC_ROUTES`  — what the Puppeteer prerender walks.
 *      Not exported, so the array literal is sliced out of the file text and
 *      evaluated. `SKIP_PATTERNS` is [] at this SHA, so PUBLIC_ROUTES ===
 *      ROUTES_TO_PRERENDER (prerender.mjs:680-685).
 *   2. src/App.jsx `<Route path=...>` — what react-router will actually serve.
 *   3. scripts/generateSitemap.js — what goes into public/sitemap.xml.
 *
 * Usage:  node docs/audits/raw/webgeo/t01_routes.mjs
 * Writes: docs/audits/raw/webgeo/out/T01_routes.txt
 *         docs/audits/raw/webgeo/out/T01_route_sources.txt
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..', '..');
const OUT = join(HERE, 'out');
mkdirSync(OUT, { recursive: true });

const LOCALES = ['ua', 'pl', 'ru'];

function localeOf(route) {
  const m = /^\/(ua|pl|ru)(\/|$)/.exec(route);
  return m ? m[1] : 'en';
}

// PUBLIC_ROUTES is NOT a pure literal: it interpolates PORT_SLUGS
// (prerender.mjs:13). Evaluating the slice therefore needs the real import, not a
// hand-written stand-in -- a stand-in would silently change the count.
import { PORT_SLUGS } from '../../../../src/pages/ports/portData.js';

/** Slice `const NAME = [ ... ];` out of a source file and evaluate it. */
function arrayLiteral(src, name) {
  const start = src.indexOf(`const ${name} = [`);
  if (start === -1) throw new Error(`${name} not found`);
  const open = src.indexOf('[', start);
  let depth = 0;
  let i = open;
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') {
      depth--;
      if (depth === 0) break;
    }
  }
  // eslint-disable-next-line no-new-func
  return new Function('PORT_SLUGS', `return ${src.slice(open, i + 1)}`)(PORT_SLUGS);
}

// ---- source 1: the prerender manifest -------------------------------------
const prerenderSrc = readFileSync(join(ROOT, 'scripts', 'prerender.mjs'), 'utf8');
const PUBLIC_ROUTES = arrayLiteral(prerenderSrc, 'PUBLIC_ROUTES');
const SKIP_PATTERNS = arrayLiteral(prerenderSrc, 'SKIP_PATTERNS');

// ---- source 2: the router -------------------------------------------------
const appSrc = readFileSync(join(ROOT, 'src', 'App.jsx'), 'utf8');
const appRoutes = [...appSrc.matchAll(/<Route\s+[^>]*path=(?:"([^"]*)"|\{`([^`]*)`\}|'([^']*)')/g)]
  .map((m) => m[1] ?? m[2] ?? m[3])
  .filter((p) => p !== undefined);

// ---- source 3: the sitemap generator --------------------------------------
const sitemapSrc = readFileSync(join(ROOT, 'scripts', 'generateSitemap.js'), 'utf8');
const sitemapPaths = [...new Set([...sitemapSrc.matchAll(/'(\/[a-z0-9/\-:]*)'/g)].map((m) => m[1]))];

// ---- T01_routes.txt : every prerendered route, one per line, with its locale
const rows = PUBLIC_ROUTES.map((r) => `${localeOf(r)}\t${r}`).sort();
writeFileSync(join(OUT, 'T01_routes.txt'), rows.join('\n') + '\n', 'utf8');

// ---- the report ------------------------------------------------------------
const L = [];
const say = (s = '') => L.push(s);

say('WEBGEO T01 — ROUTE INVENTORY');
say('source of truth: scripts/prerender.mjs PUBLIC_ROUTES (not exported; sliced and evaluated)');
say('');
say(`PUBLIC_ROUTES total .................. ${PUBLIC_ROUTES.length}`);
say(`SKIP_PATTERNS ........................ ${SKIP_PATTERNS.length} (empty => every route is prerendered)`);
say(`unique after dedup ................... ${new Set(PUBLIC_ROUTES).size}`);
const dupes = PUBLIC_ROUTES.filter((r, i) => PUBLIC_ROUTES.indexOf(r) !== i);
say(`duplicates ........................... ${dupes.length}${dupes.length ? ' -> ' + dupes.join(', ') : ''}`);
say('');

const byLocale = {};
for (const r of PUBLIC_ROUTES) (byLocale[localeOf(r)] ??= []).push(r);
say('ROUTES PER LOCALE');
for (const k of ['en', ...LOCALES]) say(`  ${k.padEnd(4)} ${String((byLocale[k] || []).length).padStart(4)}`);
say('');

// EN routes missing a twin in each locale.
const enRoutes = byLocale.en || [];
const twin = (loc, r) => (r === '/' ? `/${loc}` : `/${loc}${r}`);
say('ASYMMETRY — EN routes with NO twin in a locale');
for (const loc of LOCALES) {
  const have = new Set(byLocale[loc] || []);
  const missing = enRoutes.filter((r) => !have.has(twin(loc, r)));
  say(`  ${loc}: ${missing.length} of ${enRoutes.length} EN routes have no ${loc} twin`);
}
say('');
say('THE MIRROR — localized routes with NO English twin (unique intl landing pages)');
for (const loc of LOCALES) {
  const en = new Set(enRoutes);
  const orphans = (byLocale[loc] || []).filter((r) => {
    const bare = r === `/${loc}` ? '/' : r.slice(loc.length + 1);
    return !en.has(bare);
  });
  say(`  ${loc}: ${orphans.length}${orphans.length ? ' -> ' + orphans.join(', ') : ''}`);
}
say('');
say('THE FULL EN->LOCALE MATRIX (X = present)');
say(`  ${'route'.padEnd(46)} en  ua  pl  ru`);
for (const r of enRoutes.slice().sort()) {
  const cells = LOCALES.map((loc) => ((byLocale[loc] || []).includes(twin(loc, r)) ? ' X ' : ' . '));
  say(`  ${r.padEnd(46)} X  ${cells.join(' ')}`);
}
say('');

// ---- cross-source drift ----------------------------------------------------
say('CROSS-SOURCE DRIFT (rule: three lists of one fact — can they disagree?)');
say(`  src/App.jsx <Route path=...>  ....... ${appRoutes.length} (incl. params/wildcards)`);
const appStatic = appRoutes.filter((p) => p && !p.includes(':') && !p.includes('*'));
say(`  ...static (no :param, no *) ......... ${appStatic.length}`);
const appSet = new Set(appStatic.map((p) => (p.startsWith('/') ? p : '/' + p)));
const prerenderNotInApp = PUBLIC_ROUTES.filter((r) => !appSet.has(r));
say(`  prerendered but NOT a static App.jsx route: ${prerenderNotInApp.length}`);
if (prerenderNotInApp.length) prerenderNotInApp.forEach((r) => say(`      ${r}`));
const appNotPrerendered = [...appSet].filter((r) => !PUBLIC_ROUTES.includes(r));
say(`  static App.jsx route but NOT prerendered: ${appNotPrerendered.length}`);
if (appNotPrerendered.length) appNotPrerendered.forEach((r) => say(`      ${r}`));
say('');
say(`  scripts/generateSitemap.js literal paths seen: ${sitemapPaths.length}`);
const smSet = new Set(sitemapPaths);
const prerenderNotInSitemapSrc = PUBLIC_ROUTES.filter((r) => !smSet.has(r));
say(`  prerendered but not a literal in generateSitemap.js: ${prerenderNotInSitemapSrc.length}`);
say('  (generateSitemap.js also composes paths from PORT_SLUGS and blogArticles,');
say('   so a literal-only comparison UNDERSTATES its coverage — see T04 for the');
say('   authoritative sitemap.xml comparison, which reads the built artefact.)');

writeFileSync(join(OUT, 'T01_route_sources.txt'), L.join('\n') + '\n', 'utf8');
console.log(L.join('\n'));
