// [WEBFIX2] After-build link measurements, same method as p0_not_indexed.mjs:
// inbound anchors for the 18 not-indexed pages, and the inter-locale link
// matrix (anchors from a page in locale X to a page in locale Y).
import { readFileSync } from 'fs';
import { join } from 'path';

const ROOT = 'C:/dev/Y7-WEBSITE';
const DIST = join(ROOT, 'dist');
const LIST = ['/pl/exporters', '/ua/dostavka-avto-z-usa', '/ru/ports/los-angeles', '/ua/ports/savannah',
  '/ua/contact', '/open-car-shipping', '/ru/faq', '/ua/dealers', '/ua', '/ru/ports/newark',
  '/copart-international-shipping', '/ru/perevozka-avto', '/ua/copart-ta-iaai', '/pl/wysylka-auta-z-usa',
  '/ua/services', '/pl/dealers', '/ua/ports/baltimore', '/ua/ports/los-angeles'];
const raw = JSON.parse(readFileSync(join(DIST, 'valid-routes.json'), 'utf8'));
const routes = (Array.isArray(raw) ? raw : Object.keys(raw)).map(r => (r.replace(/\/$/, '') || '/'));
const routeSet = new Set(routes);
const file = (r) => (r === '/' ? join(DIST, 'index.html') : join(DIST, r, 'index.html'));
const loc = (r) => { const m = r.match(/^\/(pl|ua|ru)(\/|$)/); return m ? m[1] : 'en'; };

const inbound = Object.fromEntries(LIST.map(r => [r, new Set()]));
const matrix = {}; for (const a of ['en', 'pl', 'ua', 'ru']) { matrix[a] = { en: 0, pl: 0, ua: 0, ru: 0 }; }
let switcherPages = 0;
for (const r of routes) {
  const html = readFileSync(file(r), 'utf8');
  const hrefs = [...html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)].map(m => (m[1].replace(/\/$/, '') || '/'));
  const uniq = new Set(hrefs);
  for (const t of LIST) if (r !== t && uniq.has(t)) inbound[t].add(r);
  for (const h of uniq) if (routeSet.has(h) && h !== r) matrix[loc(r)][loc(h)]++;
  if (/<a [^>]*hreflang="uk"[^>]*>UA<\/a>/.test(html)) switcherPages++;
}
console.log('## inbound anchors (pages) to the 18 not-indexed URLs, after');
for (const t of LIST) console.log(`${t.padEnd(32)} ${inbound[t].size}`);
console.log('\n## inter-locale anchor matrix (from-locale rows -> to-locale cols), unique hrefs per page, summed');
console.log('from\\to   en     pl     ua     ru');
for (const a of ['en', 'pl', 'ua', 'ru']) console.log(a.padEnd(8) + ['en', 'pl', 'ua', 'ru'].map(b => String(matrix[a][b]).padStart(6)).join(' '));
console.log(`\npages carrying the switcher as anchors (hreflang="uk" ... >UA</a>): ${switcherPages} / ${routes.length}`);
