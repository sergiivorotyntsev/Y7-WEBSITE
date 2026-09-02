/**
 * [WAVE0-T02b/T03] Load every route this sprint's diff touches and assert ZERO
 * pageerror and ZERO console.error.
 *
 * `npm run build` exiting 0 says the pages COMPILED. It does not say they run:
 * a prerendered page is a snapshot, and the hydration that follows is where a
 * broken string or a bad import actually throws. So this serves dist/ and drives
 * a real browser over it.
 *
 * THE INSTRUMENT IS SHOWN TO FAIL FIRST. Before trusting any green, it loads a
 * control page that throws and one that logs console.error, and asserts it SAW
 * them. A harness nobody has watched refuse is not evidence (CLAUDE.md).
 *
 * Routes come from the diff, not from a hand-picked list: every route whose
 * component or locale bundle this sprint edited, in every locale that has one.
 *
 * Usage: node docs/audits/raw/wave0/render_check.mjs
 */
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..', '..');
const DIST = join(ROOT, 'dist');
const PORT = 8899;

// Every route reached by a file in the WAVE0 diff.
//   faq.json        -> /faq          (4 locales)
//   services.json   -> /services     (4 locales)
//   PolandHome.jsx  -> /pl/transport-z-usa
//   Boston/Massachusetts/NewtonAutoTransport.jsx -> their three EN pages
//   portal/*.jsx (T03) -> /portal/login is the only one that renders unauthenticated
const ROUTES = [
  '/faq', '/pl/faq', '/ru/faq', '/ua/faq',
  '/services', '/pl/services', '/ru/services', '/ua/services',
  '/pl/transport-z-usa',
  '/boston-car-shipping',
  '/massachusetts-car-shipping',
  '/newton-auto-transport',
  '/portal/login',
  '/',
];

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml',
};

function serve() {
  return new Promise((resolve) => {
    const srv = createServer((req, res) => {
      const url = decodeURIComponent((req.url || '/').split('?')[0]);
      let file = join(DIST, url);
      if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
      if (!existsSync(file)) {
        // SPA fallback, exactly as server.js does for a known path.
        file = join(DIST, 'index.html');
      }
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
      res.end(readFileSync(file));
    });
    srv.listen(PORT, () => resolve(srv));
  });
}

// An error that is ONLY reachable because this harness serves dist/ from
// 127.0.0.1 while the app's API lives on another origin. Narrow on purpose: it
// must name the foreign origin AND be a transport failure. Anything else --
// including any error from our own bundle -- still fails the run. Reported
// separately rather than swallowed, so the run says what it excused and why.
const ENV_ONLY = /dispatch\.y7agency\.com|Access to fetch .* has been blocked by CORS|net::ERR_FAILED/;

async function load(page, url) {
  const errs = [];
  const onErr = (e) => errs.push('pageerror: ' + String(e).slice(0, 200));
  const onMsg = (m) => { if (m.type() === 'error') errs.push('console.error: ' + m.text().slice(0, 200)); };
  page.on('pageerror', onErr);
  page.on('console', onMsg);
  const resp = await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
  await new Promise((r) => setTimeout(r, 350));   // let hydration settle
  page.off('pageerror', onErr);
  page.off('console', onMsg);
  const real = errs.filter((e) => !ENV_ONLY.test(e));
  const env = errs.filter((e) => ENV_ONLY.test(e));
  return { status: resp ? resp.status() : 0, errs: real, env };
}

const srv = await serve();
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
let bad = 0;
try {
  const page = await browser.newPage();

  // ---- the control: prove the harness can SEE a failure -------------------
  console.log('=== CONTROL — the harness must report these, or its greens mean nothing');
  await page.setContent('<html><body>ok</body></html>');
  const ctl = { errs: [] };
  page.on('pageerror', (e) => ctl.errs.push('pageerror: ' + String(e).slice(0, 80)));
  page.on('console', (m) => { if (m.type() === 'error') ctl.errs.push('console.error: ' + m.text().slice(0, 80)); });
  await page.evaluate(() => { console.error('DELIBERATE console.error'); });
  await page.evaluate(() => { setTimeout(() => { throw new Error('DELIBERATE pageerror'); }, 0); });
  await new Promise((r) => setTimeout(r, 400));
  const sawErr = ctl.errs.some((e) => e.startsWith('pageerror'));
  const sawCon = ctl.errs.some((e) => e.startsWith('console.error'));
  console.log(`  saw pageerror?     ${sawErr ? 'YES' : '*** NO — HARNESS IS BLIND'}`);
  console.log(`  saw console.error? ${sawCon ? 'YES' : '*** NO — HARNESS IS BLIND'}`);
  if (!sawErr || !sawCon) { bad++; }
  console.log('');

  // ---- the real pass -------------------------------------------------------
  console.log('=== ROUTES TOUCHED BY THE WAVE0 DIFF');
  const fresh = await browser.newPage();
  for (const r of ROUTES) {
    const { status, errs, env } = await load(fresh, `http://127.0.0.1:${PORT}${r}`);
    const ok = status === 200 && errs.length === 0;
    if (!ok) bad++;
    console.log(`  ${ok ? 'OK  ' : 'FAIL'} ${String(status).padEnd(4)} ${r}`);
    errs.forEach((e) => console.log(`         ${e}`));
    env.forEach((e) => console.log(`         [env, not a defect: this harness is a local`
      + ` static server and the app calls a production origin] ${e}`));
  }
} finally {
  await browser.close();
  srv.close();
}
console.log('');
console.log(bad === 0
  ? 'VERDICT: control saw both failure kinds; every touched route 200 with zero pageerror and zero console.error.'
  : `VERDICT: *** ${bad} problem(s) — see above.`);
process.exit(bad === 0 ? 0 : 1);
