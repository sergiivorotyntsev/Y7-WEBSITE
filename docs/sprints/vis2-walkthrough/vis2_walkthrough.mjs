// VIS-2-T03 — the customer half of the walkthrough, executed.
// Run from C:\dev\TRANSPORT-vis2\web so `playwright` resolves.
import { chromium } from 'playwright';

const OUT = process.env.OUT_DIR;
const PORTAL = 'http://localhost:5173';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

// Capture the RAW payload the cabinet receives. The brief's assertion is that
// carrier_phone / carrier_mc are absent from the PAYLOAD, not merely unrendered,
// so the response body is recorded alongside the pixels.
let allLoadsBody = null;
page.on('response', async (r) => {
  if (r.url().includes('/api/portal/data/all-loads')) {
    try { allLoadsBody = await r.json(); } catch { /* non-JSON */ }
  }
});

await page.goto(`${PORTAL}/portal/login`, { waitUntil: 'domcontentloaded' });
await page.getByRole('button', { name: 'Essential Only' }).click().catch(() => {});
await page.getByRole('textbox', { name: 'Email address *' }).fill('vis2.walkthrough@imperial.test');
await page.getByRole('textbox', { name: 'Password' }).fill('Vis2Walk!2026');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.waitForURL('**/portal/dashboard', { timeout: 30000 });
await page.waitForTimeout(2500);

await page.screenshot({ path: `${OUT}/vis2-step5-cabinet-after-assignment.png`, fullPage: true });

// Expand the load so the scheduled dates and their provenance note render.
const row = page.getByRole('button', { name: /730CHEVO1/ });
await row.click();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/vis2-step6-dates-and-note.png`, fullPage: true });

const text = await page.locator('body').innerText();
const grab = (re) => (text.match(re) || [null])[0];

const blob = JSON.stringify(allLoadsBody ?? {});
const item = (allLoadsBody?.items || []).find((i) => i.load_id === '730CHEVO1');

console.log(JSON.stringify({
  pageTitle: await page.title(),
  rendered: {
    accountBadge: grab(/Exporter Account|Dealer Account/),
    carrierLine: grab(/Carrier: [A-Z0-9 .,&'-]+/),
    carrierPrice: grab(/\$[\d,]+(\.\d+)? carrier/),
    dates: grab(/Pickup [A-Z][a-z]{2} \d+, \d{4}.*?Delivery [A-Z][a-z]{2} \d+, \d{4}/s),
    dateNote: grab(/These are the dates Y7 arranged[^.]*\./),
    notAssignedStillPresent: /Carrier not assigned yet/.test(text),
    notPricedStillPresent: /Not priced yet/.test(text),
  },
  payload: {
    carrier_name: item?.carrier_name,
    carrier_price_cents: item?.carrier_price_cents,
    pickup_date: item?.pickup_date,
    delivery_date: item?.delivery_date,
    date_source: item?.date_source,
    load_status: item?.status,
  },
  leakCheck: Object.fromEntries(
    ['carrier_phone', 'carrier_mc', 'cd_carrier_mc', 'cd_carrier_name', 'margin', 'internal_status']
      .map((f) => [f, blob.includes(f)]),
  ),
}, null, 2));

await browser.close();
