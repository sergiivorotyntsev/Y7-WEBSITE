// Read-only crawl of dist/ for WEBFIX Phase 0. Measures per route:
// JSON-LD block count + parse validity + LocalBusiness.serviceType, <title> length,
// <h1> count, text/HTML ratio, internal hrefs (broken vs valid), inbound links to CO,
// and hrefs carrying ?delivery_zip=.
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = 'C:/dev/Y7-WEBSITE';
const DIST = join(ROOT, 'dist');
const raw = JSON.parse(readFileSync(join(DIST, 'valid-routes.json'), 'utf8'));
const routes = (Array.isArray(raw) ? raw : Object.keys(raw)).map(r => (r.replace(/\/$/, '') || '/'));
const routeSet = new Set(routes);

const rows = [];
const brokenLinks = new Map(); // target -> [sources]
const coInbound = new Map();   // source -> count (any locale CO)
const zipLinks = [];
const ldInvalid = [];
let lbServiceType = 0, ldBlocks = 0;
const h1Detail = [];

function textRatio(html) {
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const text = body.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
  return text.length / html.length;
}

for (const r of routes) {
  const file = r === '/' ? join(DIST, 'index.html') : join(DIST, r, 'index.html');
  if (!existsSync(file)) { rows.push({ r, missing: true }); continue; }
  const html = readFileSync(file, 'utf8');
  const size = Buffer.byteLength(html);
  const titleM = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleM ? titleM[1].replace(/\s+/g, ' ').trim() : '';
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 60));
  if (h1s.length > 1) h1Detail.push({ r, h1s });
  const lds = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  let bad = 0;
  for (const s of lds) {
    ldBlocks++;
    try {
      const j = JSON.parse(s);
      const nodes = Array.isArray(j) ? j : (j['@graph'] || [j]);
      for (const n of nodes) if (n && n['@type'] === 'LocalBusiness' && 'serviceType' in n) lbServiceType++;
    } catch (e) { bad++; ldInvalid.push({ r, err: e.message.slice(0, 60) }); }
  }
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  for (const h of hrefs) {
    if (h.includes('delivery_zip=')) zipLinks.push({ r, h });
    if (!h.startsWith('/') || h.startsWith('//')) continue;
    const path = h.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
    if (/\.(css|js|png|jpg|svg|webp|xml|txt|ico|json|woff2?|pdf)$/.test(path)) continue;
    if (path.startsWith('/assets/') || path.startsWith('/api/')) continue;
    if (/certificate-of-origin$/.test(path)) coInbound.set(r, (coInbound.get(r) || 0) + 1);
    if (!routeSet.has(path) && !path.startsWith('/portal') && !path.startsWith('/promo/') && !path.startsWith('/review/') && path !== '/agreement') {
      if (!brokenLinks.has(path)) brokenLinks.set(path, new Set());
      brokenLinks.get(path).add(r);
    }
  }
  rows.push({ r, size, titleLen: title.length, title, h1: h1s.length, ld: lds.length, ldBad: bad, ratio: +textRatio(html).toFixed(3) });
}

const missing = rows.filter(x => x.missing);
console.log('routes', routes.length, 'missing files', missing.length, missing.map(x => x.r));
console.log('snapshots <20KB:', rows.filter(x => !x.missing && x.size < 20000).map(x => `${x.r}(${x.size})`));
console.log('\n## JSON-LD: blocks', ldBlocks, 'invalid(parse)', ldInvalid.length, 'LocalBusiness-with-serviceType nodes', lbServiceType);
console.log('routes with 0 ld blocks:', rows.filter(x => !x.missing && x.ld === 0).map(x => x.r));
console.log('\n## Titles >70 chars:', rows.filter(x => x.titleLen > 70).length);
for (const x of rows.filter(x => x.titleLen > 70).sort((a, b) => b.titleLen - a.titleLen)) console.log(`  ${x.titleLen}  ${x.r}  "${x.title}"`);
console.log('\n## Multiple H1: routes', h1Detail.length, '; distribution', JSON.stringify(Object.fromEntries(Object.entries(rows.reduce((a, x) => { a[x.h1] = (a[x.h1] || 0) + 1; return a; }, {})))));
console.log('sample:', JSON.stringify(h1Detail.slice(0, 4), null, 0));
const single = rows.filter(x => !x.missing && x.h1 <= 1).map(x => x.r); console.log('single/zero-H1 routes:', single.join(' '));
console.log('\n## Text ratio <=0.10:', rows.filter(x => x.ratio <= 0.10).length);
for (const x of rows.filter(x => x.ratio <= 0.10).sort((a, b) => a.ratio - b.ratio)) console.log(`  ${x.ratio}  ${x.r}  (${x.size} bytes)`);
console.log('\n## Inbound links to *certificate-of-origin (source -> count):');
for (const [s, c] of [...coInbound.entries()].sort()) console.log(`  ${s} -> ${c}`);
console.log('\n## hrefs containing delivery_zip:', zipLinks.length); for (const z of zipLinks.slice(0, 10)) console.log('  ', z.r, z.h);
console.log('\n## Internal hrefs to non-routes (target <- sources):');
for (const [t, s] of [...brokenLinks.entries()].sort()) console.log(`  ${t}  <- ${[...s].length} pages: ${[...s].slice(0, 5).join(' ')}${s.size > 5 ? ' …' : ''}`);
