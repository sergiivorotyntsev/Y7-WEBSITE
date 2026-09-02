// [WEBFIX2 Phase 0] For each "Crawled - currently not indexed" URL: the technical
// signals (canonical, hreflang, robots meta, sitemap, inbound links) and the
// content signals (visible text length, overlap with its EN twin).
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = 'C:/dev/Y7-WEBSITE';
const DIST = join(ROOT, 'dist');
const LIST = ['/pl/exporters', '/ua/dostavka-avto-z-usa', '/ru/ports/los-angeles', '/ua/ports/savannah',
  '/ua/contact', '/open-car-shipping', '/ru/faq', '/ua/dealers', '/ua', '/ru/ports/newark',
  '/copart-international-shipping', '/ru/perevozka-avto', '/ua/copart-ta-iaai', '/pl/wysylka-auta-z-usa',
  '/ua/services', '/pl/dealers', '/ua/ports/baltimore', '/ua/ports/los-angeles'];

const raw = JSON.parse(readFileSync(join(DIST, 'valid-routes.json'), 'utf8'));
const routes = (Array.isArray(raw) ? raw : Object.keys(raw)).map(r => (r.replace(/\/$/, '') || '/'));
const sitemap = readFileSync(join(ROOT, 'public/sitemap.xml'), 'utf8');
const file = (r) => (r === '/' ? join(DIST, 'index.html') : join(DIST, r, 'index.html'));

function visibleText(html) {
  let body = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ').replace(/<head[\s\S]*?<\/head>/gi, ' ');
  // drop header/footer/nav chrome so the number is the page's own copy
  body = body.replace(/<header[\s\S]*?<\/header>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ');
  return body.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}
const words = (t) => t.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(w => w.length > 2);
function overlap(a, b) { // share of A's word tokens (as a set) that also occur in B
  const A = new Set(words(a)), B = new Set(words(b));
  if (!A.size) return 0;
  let n = 0; for (const w of A) if (B.has(w)) n++;
  return n / A.size;
}

// inbound links: count pages whose hrefs point at the route
const inbound = Object.fromEntries(LIST.map(r => [r, 0]));
for (const r of routes) {
  const html = readFileSync(file(r), 'utf8');
  const hrefs = new Set([...html.matchAll(/href="(\/[^"#?]*)/g)].map(m => (m[1].replace(/\/$/, '') || '/')));
  for (const t of LIST) if (r !== t && hrefs.has(t)) inbound[t]++;
}

console.log('route | canonical self? | hreflang n | robots | sitemap | inbound | words | EN twin | overlap w/ twin | title');
for (const r of LIST) {
  const html = readFileSync(file(r), 'utf8');
  const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || '';
  const canonSelf = canon === `https://www.y7agency.com${r === '/' ? '/' : r}`;
  const hl = (html.match(/<link rel="alternate" hreflang=/g) || []).length;
  const robots = (html.match(/<meta name="robots" content="([^"]+)"/) || [])[1] || '-';
  const inSitemap = sitemap.includes(`<loc>https://www.y7agency.com${r}</loc>`) || sitemap.includes(`<loc>https://www.y7agency.com${r}/</loc>`);
  const text = visibleText(html);
  const title = (html.match(/<title[^>]*>([^<]*)</) || [])[1] || '';
  // EN twin: strip the locale prefix if it is a translatable twin; unique intl pages have none
  const m = r.match(/^\/(pl|ua|ru)(\/.*)?$/);
  let twin = '-'; let ov = '';
  if (m) {
    const base = m[2] || '/';
    if (routes.includes(base) && existsSync(file(base))) {
      twin = base;
      const tEN = visibleText(readFileSync(file(base), 'utf8'));
      ov = (overlap(text, tEN) * 100).toFixed(0) + '%';
    } else twin = '(unique)';
  }
  console.log(`${r} | ${canonSelf ? 'yes' : 'NO: ' + canon} | ${hl} | ${robots} | ${inSitemap ? 'yes' : 'NO'} | ${inbound[r]} | ${words(text).length} | ${twin} | ${ov} | ${title.slice(0, 60)}`);
}
