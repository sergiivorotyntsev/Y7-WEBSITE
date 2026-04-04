# Google Search Console Setup

## Step 1: Create property
1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Choose **URL prefix** method
4. Enter: `https://www.y7agency.com`

## Step 2: Verify ownership via DNS (Cloudflare)
1. GSC will show a TXT record value — copy it
2. Go to Cloudflare dashboard > DNS > Records
3. Add a new record:
   - **Type:** TXT
   - **Name:** `@`
   - **Content:** (paste the value from GSC)
   - **TTL:** Auto
4. Save and click "Verify" in GSC (may take a few minutes to propagate)

## Step 3: Submit sitemap
1. In GSC left sidebar, click **Sitemaps**
2. Enter: `sitemap.xml`
3. Click Submit
4. Verify status shows "Success"

## Step 4: Request indexing for key pages
Go to **URL Inspection** (top search bar), paste each URL, then click **Request Indexing**.

Priority order:
1. `https://www.y7agency.com/`
2. `https://www.y7agency.com/services`
3. `https://www.y7agency.com/ship-my-car`
4. `https://www.y7agency.com/car-shipping-cost`
5. `https://www.y7agency.com/copart-shipping`
6. `https://www.y7agency.com/auction-car-shipping`
7. `https://www.y7agency.com/dealers`
8. `https://www.y7agency.com/exporters`
9. `https://www.y7agency.com/door-to-port-auto-transport`
10. `https://www.y7agency.com/dealer-auto-transport`
11. `https://www.y7agency.com/how-to-ship-a-car-bought-at-auction`
12. `https://www.y7agency.com/open-vs-enclosed-auto-transport`

Note: Google limits indexing requests — do 10-15 per day max.

## Step 5: Monitor coverage (check after 2-3 days)
1. Go to **Pages** report in left sidebar
2. Look for these statuses:
   - **Indexed** — good, page is in Google
   - **Discovered - currently not indexed** — Google knows about it but hasn't crawled yet
   - **Crawled - currently not indexed** — Google crawled but chose not to index (may need content improvement)
   - **Excluded by 'noindex' tag** — check for accidental noindex meta tags
3. Track indexed page count over time — should climb steadily after prerender deployment

## Step 6: Verify prerendering works
1. In URL Inspection, paste any page URL
2. Click **Test Live URL**
3. Click **View Tested Page** > **Screenshot** tab
4. You should see the full rendered page content, NOT a blank white page or loading spinner
5. Check **HTML** tab — it should contain the actual page text, not just `<div id="root"></div>`

## Ongoing monitoring
- Check GSC weekly for the first month
- Watch for crawl errors in the Pages report
- Monitor Core Web Vitals (will populate after enough traffic)
- Set up email alerts in GSC settings for critical issues
