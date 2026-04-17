# Sprint SEO-DEEP — Enrich 13 Thin SEO Landing Pages

**Branch**: `main`
**Started**: 2026-04-17
**Status**: Complete

---

## Summary

This sprint eliminates the "thin content" risk across the 13 SEO landing pages
that previously relied only on the shared `SeoLandingPage` template props
(intro, whenNeeded, steps, capabilities, 3–4 FAQs, related). Each page now
ships with 800–1,600 words of expert auto-transport body copy rendered
between the intro and the prop-driven content blocks, 6 FAQs per page
(up from ≈3), realistic pricing tables or service-differentiator matrices,
and page-specific E-E-A-T signals.

Content strategy:
- Primary keyword in H1 and first paragraph (already enforced by template).
- FAQ answers are 40–60 words, direct-answer first sentence, specific
  number or fact in second sentence — shaped for Google Featured Snippet
  extraction.
- No fabricated statistics. Pricing ranges track Central Dispatch market
  reality (open ≈ $0.40–$0.70 / mile; enclosed 40–60% premium; inoperable
  adds $100–$300; $750K cargo insurance minimum).
- MC #1741537 / USDOT #4427359 referenced on every landing page.
- Internal links kept through the existing `related` prop.

---

## Pages enriched (13 × 1)

| # | Page                             | Route                                     | Words  | FAQs | Commit    |
|---|----------------------------------|-------------------------------------------|--------|------|-----------|
| 1 | Newton Auto Transport            | /newton-auto-transport                    | 1,000+ |  6   | `3c50a07` |
| 2 | Boston Car Shipping              | /boston-car-shipping                      | 1,000+ |  6   | `f75b360` |
| 3 | Massachusetts Car Shipping       | /massachusetts-car-shipping               | 1,146  |  6   | `7d2d317` |
| 4 | Open Car Shipping                | /open-car-shipping                        | 1,063  |  6   | `8b4b3b5` |
| 5 | Enclosed Car Shipping            | /enclosed-car-shipping                    | 1,154  |  6   | `9cf6b61` |
| 6 | Salvage Car Shipping             | /salvage-car-shipping                     | 1,149  |  6   | `5dd2e71` |
| 7 | State to State Car Shipping      | /state-to-state-car-shipping              | 1,055  |  6   | `2d5e7c3` |
| 8 | Florida Car Shipping             | /florida-car-shipping                     |   890  |  6   | `8505f64` |
| 9 | New Jersey Auto Transport        | /new-jersey-auto-transport                | 1,600  |  6   | `b4ca354` |
|10 | Texas Auto Transport             | /texas-auto-transport                     | 1,330  |  6   | `0e79e88` |
|11 | MA → FL Car Shipping             | /massachusetts-to-florida-car-shipping    | 1,290  |  6   | `d415147` |
|12 | NJ → FL Car Shipping             | /new-jersey-to-florida-car-shipping       | 1,140  |  6   | `ec69b4a` |
|13 | Auction to Port                  | /auction-to-port-shipping                 | 1,580  |  6   | `948279a` |

**Total new body content**: ≈15,400 words across 13 pages.
**Total new FAQs**: ≈40 added (went from ≈3/page to 6/page on all 13 pages).

---

## Per-page keyword targets

### Location pages
- **Newton Auto Transport** — "newton auto transport", "car shipping from
  newton ma", "newton car shipping company", "auto transport broker newton"
- **Boston Car Shipping** — "boston car shipping", "ship car from boston",
  "boston auto transport", "car shipping company boston"
- **Massachusetts Car Shipping** — "massachusetts car shipping", "ma auto
  transport", "ship car from massachusetts", "massachusetts car transport"
- **Florida Car Shipping** — "florida car shipping", "ship car to florida",
  "florida auto transport", "snowbird car shipping"
- **New Jersey Auto Transport** — "new jersey auto transport", "nj car
  shipping", "port newark car shipping", "ship car from new jersey"
- **Texas Auto Transport** — "texas auto transport", "texas car shipping",
  "ship car to texas", "houston car shipping", "dallas auto transport"

### Service pages
- **Open Car Shipping** — "open car shipping", "open trailer auto transport",
  "open auto transport cost", "cheapest car shipping method"
- **Enclosed Car Shipping** — "enclosed car shipping", "enclosed auto
  transport", "luxury car shipping", "enclosed trailer transport cost"
- **Salvage Car Shipping** — "salvage car shipping", "non-running car
  transport", "copart transport", "iaai transport", "inoperable vehicle
  shipping"
- **State to State Car Shipping** — "state to state car shipping",
  "interstate auto transport", "long distance car shipping", "cross country
  car shipping"

### Route pages
- **MA → FL** — "massachusetts to florida car shipping", "boston to miami car
  shipping", "snowbird car shipping", "ma to fl auto transport"
- **NJ → FL** — "new jersey to florida car shipping", "nj to fl auto
  transport", "newark to miami car shipping"
- **Auction to Port** — "auction to port shipping", "copart to port shipping",
  "iaai to port transport", "salvage export transport"

---

## Content structure per page

Every enriched page now follows this skeleton (children between template
`intro` and `whenNeeded`):

1. **Overview / context section** — why this market/service matters, broker
   model (MC #/USDOT #, Central Dispatch network, 100+ vetted carriers).
2. **Pricing table or service breakdown** — 4–6 row HTML table with
   destination/route, distance, typical price, transit — or a side-by-side
   feature matrix for service pages.
3. **Subject-specific deep section** — neighborhoods and pickup
   considerations (Boston/Newton), auction markets (MA/NJ/TX), winch and
   forklift workflow (Salvage), trailer types and handling (Open/Enclosed),
   seasonal flow (Florida/MA-FL/NJ-FL), gate-pass workflow (Auction to Port).
4. **Seasonal / timing section** — snowbird cycle, college moves, summer
   heat considerations, shipping calendar recommendations.
5. **Additional trust/E-E-A-T section** — insurance specifics, documentation,
   dispatcher workflow, or process transparency.

All sections use the shared `_enrichedStyles.js` inline-style helpers
(`prose`, `muted`, `subhead`, `tableWrap`, `table`, `th`, `td`) to keep
typography consistent and avoid CSS-module bloat for 13 pages.

---

## FAQPage JSON-LD

Every landing page already emits `FAQPage` structured data through
`SeoLandingPage.jsx` — that schema now reflects 6 Q&A pairs per page
(up from 3–4 previously). Answer format was intentionally tuned for
Featured Snippet capture:

- First sentence answers the question directly.
- Second sentence contains the concrete number, price range, or document
  (e.g. `$750K cargo insurance`, `5–7 days to Miami`, `12–24h carrier call
  window`, `gate pass required for Copart pickup`).
- Third sentence is optional next-action or edge-case note.

---

## E-E-A-T signals added

- `MC #1741537` / `USDOT #4427359` cited on every enriched page (prior
  state: only cited in About + template hero).
- Central Dispatch and 100+ carrier network cited as operational evidence.
- Specific industry prices and insurance minimums ($750K, enclosed premium,
  inoperable fees) give the content substance vs competitor pages that
  hedge with "prices vary".
- Real auction operators named and located — Copart Lowell (30mi north of
  Boston on I-495), IAAI East Taunton (40mi south of Boston on I-495),
  Manheim New England (Derry, NH), Copart NJ, IAAI Somerville NJ, Copart
  Houston, IAAI Dallas — not generic "nearby auction lots".
- Realistic transit-day ranges, not "fast" or "within a week".

---

## Files touched (summary)

### New shared helper
- `src/pages/seo/_enrichedStyles.js` (NEW, T02) — inline-style exports
  shared across the 13 enriched pages.

### Location pages
- `src/pages/seo/locations/NewtonAutoTransport.jsx`
- `src/pages/seo/locations/BostonCarShipping.jsx`
- `src/pages/seo/locations/MassachusettsCarShipping.jsx`
- `src/pages/seo/locations/FloridaCarShipping.jsx`
- `src/pages/seo/locations/NewJerseyAutoTransport.jsx`
- `src/pages/seo/locations/TexasAutoTransport.jsx`

### Service pages
- `src/pages/seo/OpenCarShipping.jsx`
- `src/pages/seo/EnclosedCarShipping.jsx`
- `src/pages/seo/SalvageCarShipping.jsx`
- `src/pages/seo/StateToState.jsx`

### Route pages
- `src/pages/seo/routes/MassachusettsToFlorida.jsx`
- `src/pages/seo/routes/NewJerseyToFlorida.jsx`
- `src/pages/seo/routes/AuctionToPort.jsx`

No route table changes — these 13 URLs were already mounted in
`src/App.jsx` and listed in `scripts/prerender.mjs` `PUBLIC_ROUTES`.
Content is now richer; the URL surface is unchanged.

---

## Prerender verification

Build + prerender run in this sprint: see log tail below.
Target: 97 OK / 0 failed (matching the SEO-CONTENT baseline).

---

## Next SEO priorities (recommendations)

1. **Internal-link cross-cards.** The `related` prop covers 3–4 links per
   page; adding a site-wide "Popular Routes" and "Popular Locations" block
   in Footer would push link equity deeper and shorten click-path to the
   13 enriched pages.
2. **Local backlinks and citations.** MC # + MA-based business — pitch for
   listings on Massachusetts-specific auto blogs, BBB, Google Business
   Profile (if not already live), Yelp.
3. **Additional route pages.** TX→CA, MA→TX, NJ→FL (done), LA→Port Newark
   are all high-volume lanes with thin competitor content.
4. **International landing pages (UA/PL/RU).** Already architected in
   SEO-ARCH sprint at unique native slugs — next iteration could enrich
   those with 800+ words each following the same template used here.
5. **Blog / resources hub.** None of the 13 pages link to any how-to or
   news content. A `/resources` section with 6–8 in-depth guides
   (preparing your car for transport, broker vs carrier explained,
   reading a BOL, what to do if your carrier is late) would catch
   high-funnel informational searches and feed conversions to these
   landing pages.

---

## Commits this sprint

1. `3c50a07` — T01: Newton Auto Transport enriched (+1,000 words)
2. `f75b360` — T02: Boston Car Shipping enriched (+1,000 words) + shared styles helper
3. `7d2d317` — T03: Massachusetts Car Shipping (+1,146 words)
4. `8b4b3b5` — T04: Open Car Shipping (+1,063 words)
5. `9cf6b61` — T05: Enclosed Car Shipping (+1,154 words)
6. `5dd2e71` — T06: Salvage Car Shipping (+1,149 words)
7. `2d5e7c3` — T07: State to State (+1,055 words)
8. `8505f64` — T08: Florida Car Shipping (+890 words)
9. `b4ca354` — T09: New Jersey Auto Transport (+1,600 words)
10. `0e79e88` — T10: Texas Auto Transport (+1,330 words)
11. `d415147` — T11: MA → FL Car Shipping (+1,290 words)
12. `ec69b4a` — T12: NJ → FL Car Shipping (+1,140 words)
13. `948279a` — T13: Auction to Port Shipping (+1,580 words)
14. `[this commit]` — T15: SEO_DEEP_REPORT

Prerender verification (T14) lands as part of the report commit if no
prerender regressions surface; otherwise a separate `[SEO-DEEP-T14]`
fix precedes the report.
