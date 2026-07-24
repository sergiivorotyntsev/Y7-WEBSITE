# NJPORTS-3 — Sprint Report

**Repo:** Y7-WEBSITE · **Branch:** `wip/njports-3` (from `main` @ `f7d3073`) · **Date:** 2026-07-24
**Status:** HELD — nothing pushed

Two live-copy corrections (T1 fee, T2 per-mile), one relaxed constraint (T3 band figures), and a
substantial optimisation of `/door-to-port-auto-transport` (T4). Every published figure traces to §2
of the prompt or the NJPORTS-2 fact table.

## Pre-check

`main` is now at `f7d3073` (all NJPORTS work merged in; `wip/njports-2` deleted) — the sprint's "main
should be at f7d3073 or later" holds, so **no branch-base deviation this time**. `git fetch` clean;
`main..origin/main` empty; tree clean; `npm run seo:snapshot` confirmed the committed baseline (11
routes) with no content change (LF/CRLF-only, restored).

---

## T1 — `/auction-transport-savings` side-by-side "$50"

`AuctionTransportSavings.jsx:81` (the `AuctionVsBrokerCard` "Through Y7" column) read "+ a flat $50
dispatch fee" with no audience. Fixed in the surrounding style:

> + a flat Y7 dispatch fee — **$50 for dealers and exporters, $75 for individuals** (paid to Y7, not the carrier).

Confirmed present in the prerendered page. The four-locale check: `AuctionTransportSavings.jsx` is
EN-only (no locale versions); the only other `flat $50` on the site is the already-segmented `faq.json`
copy from NJPORTS-1 ("dealers and exporters pay a flat $50 … individual customers pay $75"). No other
unqualified fee mention found. Figures trace to `[NJPORTS-T1]`.

## T2 — `/auction-to-port-transport` per-mile contradiction

The page claimed long-haul runs follow "$0.40–$0.70/mi", contradicting §2a ($0.79/mi at 501–800). Made
distance-specific without widening the range and without deleting the corridor examples:

- FAQ (`:69`): "…Long-haul runs (Copart Midwest to Port Newark) price by distance band — about
  **$0.79/mi at 500–800 miles, $0.61/mi at 800–1,200 miles, and $0.52/mi beyond 1,200 miles**…" (the
  pre-existing $150–$350 / $400–$650 / $300–$500 corridor examples kept verbatim).
- EntityTldr (`:22`): "long hauls **about $0.52–$0.79 per mile depending on distance**" (was $0.40–$0.70).

`$0.40` no longer appears on the page. Per-mile figures trace to §2a.

## T3 — band figures on `/nj-export-warehouse-shipping-cost`

- Added a new H2 section **"What Each Distance Band Costs"** after the per-mile decay section, carrying
  the full §2a table (median, 25th–75th range, per mile), labelled band-level carrier rates for the
  NJ-inbound corridor, with a link to the homepage calculator. The decay content is kept — the two
  tables are complementary (what you pay vs. why the unit rate falls).
- Updated the EntityTldr to carry a concrete band figure: "**A typical 500-800-mile haul runs about
  $500-$560**" (§2a, 501–800 band).

## T4 — `/door-to-port-auto-transport` optimisation

Rewrote the component additively; the six-port comparison and the Y7-vs-forwarder responsibility split
are preserved verbatim (confirmed present in the browser).

- **T4a — timeline split.** New H2 **"Where the Time Actually Goes: Sourcing vs. Driving"**. The
  existing 3–7 day end-to-end claim is unchanged. The new section separates the variable sourcing
  interval (not quantified — the dataset records dispatch date, not post date) from the driving leg, and
  presents the §2b table **labelled "from dispatch" and "New Jersey-inbound only"** with sample sizes
  (n=49/35/29/26/13, all-hauls median 2 days, n=156; 71% within 3 days of dispatch, 96% within 7). Lands
  the point: a low quoted rate leaves the load on the board while storage runs. The other five ports'
  timing statements are untouched and in a separate section.
- **T4b — pricing.** New H2 **"What Door-to-Port Costs (New Jersey Corridor)"** with the §2a band table,
  scoped to the NJ corridor, linking to `/nj-export-warehouse-shipping-cost` for methodology.
- **T4c — the wedge.** New H2 **"The Door Premium: Auction Yard vs. a Private or Dealer Address"** built
  on the ~$70 flat surcharge (+48% <100 mi, +14% >500 mi) — literally the "door" in door-to-port.
- **T4d — EntityTldr** added (was absent): concrete figures ($180→$600 NJ band, 2-day median from
  dispatch, ~$70 door premium) + all six ports.
- **T4e — title & meta.** Title → "Door-to-Port Auto Transport Cost & Transit Time to US Ports | Y7
  Logistics"; description rewritten to target cost + transit intent + the six ports + MC #. Baseline
  updated deliberately (separate commit).
- **T4f — FAQ.** 5 short answers → 8 substantive answers, adding cost, transit, and the door-premium
  questions. `FAQPage` schema in sync: **8 schema questions = 8 visible `<details>`** (verified).
- **T4g — unsupported discount claim removed.** "we offer multi-vehicle discounts for port
  consolidation" → restated as a **coordination** capability with no discount claim (only 2 of 586 loads
  were multi-vehicle). No `TODO(sergii)` needed.

**Ownership enforced:** auction workflow/gate passes → `/auction-to-port-transport`; non-auction origins
+ six-port comparison → `/door-to-port-auto-transport`; pricing methodology → `/nj-export-warehouse-shipping-cost` (linked from the other two).

---

## Verification

1. **`npm run build`** — clean. Prerender **139 OK, 0 failed** — route count **unchanged**.
2. **`npm run seo:check`** — 6 changes, **all intended** (full diff below); no unintended page. Baseline
   refreshed afterward in a separate commit.
3. **`npm run preview`** (:4185) — all four edited pages return 200 and render. Door-to-port: new title,
   2 tables, EntityTldr, 8 FAQ items, 3 new sections + 4 preserved sections, methodology link resolves.
4. **Door-to-port `FAQPage` JSON-LD** parses (LocalBusiness; BreadcrumbList + FAQPage + Service) and
   matches visible copy (8 = 8).
5. **Locale parity** — no locale files changed this sprint (T1–T4 are EN-only JSX). N/A.
6. **Forbidden-term / figure grep** (below): zero `GPS / real-time / we transport / our trucks` on any
   edited page; every `insured/insurance` mention carries the carrier qualifier; every dollar/day figure
   I added traces to §2 or the NJPORTS-2 table.
7. **No NJ-only figure in a sentence naming another port** — grep for
   `(Houston|Savannah|LA|Baltimore|Jacksonville) … (from dispatch|156|71%|96%)` returns nothing; the §2b
   figures are explicitly qualified NJ-inbound and live in their own section.

### `seo:check` diff (in full)

```
~ /nj-export-warehouse-shipping-cost :: headings       + h2 "What Each Distance Band Costs"
~ /nj-export-warehouse-shipping-cost :: internalLinks  {total 65→66, unique 46}
~ /door-to-port-auto-transport :: title        "…" → "Door-to-Port Auto Transport Cost & Transit Time to US Ports | Y7 Logistics"
~ /door-to-port-auto-transport :: description   port-list → cost/transit-intent + six ports + MC#
~ /door-to-port-auto-transport :: headings      + h2 "What Door-to-Port Costs (New Jersey Corridor)",
                                                 + h2 "The Door Premium: Auction Yard vs. a Private or Dealer Address",
                                                 + h2 "Where the Time Actually Goes: Sourcing vs. Driving"
~ /door-to-port-auto-transport :: internalLinks {total 79→80, unique 48→49}  (+ link to /nj-export-warehouse-shipping-cost)
```

Every diff is a section, link, or title/description I intended. Preserved on door-to-port (present in
both baseline and current): Major US Export Ports, What Y7 Handles vs. What You Handle, Warehouse vs.
Direct Terminal Delivery, Transit Times and Scheduling, Common Export Corridors. **No other page
appears.** T1 and T2 produce no snapshot diff — they changed body/FAQ-answer text within existing
structure (the harness captures headings/title/description/canonical/hreflang/JSON-LD-type/link-count).

### Figure tracing

| Page | Figures added | Source |
|---|---|---|
| auction-transport-savings (T1) | $50, $75 | `[NJPORTS-T1]` fee model |
| auction-to-port (T2) | $0.79, $0.61, $0.52 /mi; $0.52–$0.79 | §2a per-mile |
| nj-export-warehouse (T3) | full §2a table ($170–$665, $2.56–$0.52); $500–$560 in TLDR | §2a |
| door-to-port (T4) | §2a band table; §2b transit table (days + n=49/35/29/26/13/156, 71%, 96%); ~$70, +48%, +14%; $180/$600 TLDR; $50/$60/$75/10% fee | §2a, §2b, NJPORTS-2 fact table, `[NJPORTS-T1]` |

Pre-existing figures **preserved** (sanctioned by "keep the corridor examples" / "do not change the 3–7
day claim"): on auction-to-port the $150–$350 / $400–$650 / $300–$500 corridor examples and $340–$360
NY→Boston; on door-to-port the 3–7 / 4–6 / 6–8 / 5–10 / 3–5 day end-to-end windows, 24–48 hr scheduling,
95%, and the per-port transit lines (Houston same-day–2 days, JAX 1–2 days). These were not introduced
this sprint.

### Forbidden-term grep (prerendered)

```
auction-transport-savings:      GPS/real-time/we transport/our trucks → none
auction-to-port-transport:      none
nj-export-warehouse-shipping-cost: none
door-to-port-auto-transport:    none
insured/insurance (all pages):  every occurrence qualified "carrier's cargo insurance" or "carrier insurance"
multi-vehicle discount claim:   removed from door-to-port
```

**`TODO(sergii)` markers:** none — every figure required by the copy was available in §2 / the NJPORTS-2
table.

---

## Commits (HELD — not pushed)

- `[NJPORTS-T1]` — `AuctionTransportSavings.jsx`
- `[NJPORTS-T2]` — `AuctionToPort.jsx`
- `[NJPORTS-T3]` — `NjExportWarehouseShippingCost.jsx`
- `[NJPORTS-T4]` — `DoorToPort.jsx`
- `[NJPORTS-T4] chore` — `scripts/seo-baseline.json` (baseline refresh, separate commit after confirming intent)
- `[NJPORTS-3] docs` — this report

Build-regenerated `public/sitemap.xml` / `scripts/sitemap-lastmod.json` left uncommitted (lastmod churn;
no route added — sitemap URL set unchanged).

**STOP** — no push.
