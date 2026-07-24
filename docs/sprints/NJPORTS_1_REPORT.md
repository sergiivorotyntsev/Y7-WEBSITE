# NJPORTS-1 — Sprint Report

**Repo:** Y7-WEBSITE · **Branch:** `wip/njports-1` (from `main` @ `2173ae0` + `[NJPORTS-A0]` audit)
**Date:** 2026-07-24 · **Status:** HELD for review — nothing pushed
**Follows:** `docs/audits/NJPORTS_PHASE0_AUDIT.md`

Two correctness fixes (fee copy, calculator multipliers) + the SEO regression baseline the content
sprint needs. No page content or SEO copy was rewritten; every fee figure now traces to the
TRANSPORT fee engine.

---

## Pre-check (blocking)

Ran this session in `C:\dev\Y7-WEBSITE`:

- `git fetch --all --prune` → clean
- `git log --oneline main..origin/main` → **empty** (local main not behind)
- `git status --porcelain` → clean before work
- Branch: `wip/njports-1` created from `main` (HEAD `2173ae0`).

No pull/rebase/merge. Proceeded.

---

## T1 — Fee model per segment (HARD GATE — PASSED)

Verified against TRANSPORT at `C:\dev\TRANSPORT` HEAD `c9aa5e5a` (confirmed by
`git -C C:\dev\TRANSPORT rev-parse --short HEAD`, matching the prompt).

| Segment | Actual fee charged | File · line |
|---|---|---|
| **Individual / private** | `max($75, 10% of carrier price)` | `services/individual_pricing.py:24-31` — `IND_2026_FLOOR_CENTS = 7500`, `IND_2026_RATE = 0.10`, `ind_2026_fee_cents = max(7500, round(price*0.10))` |
| **Dealer** | **$50 flat**, **$60** when Y7 processes the carrier payment | `services/b2b_pricing.py:37-38, 106-119` — `B2B_FLAT_FEE_CENTS = 5000`, `DEALER_Y7_PAYS_FEE_CENTS = 6000`, `b2b_fee_cents()` |
| **Exporter** | **$50 flat** (always) | `services/b2b_pricing.py:117-118` |

Carrier price is **pass-through at cost** in every model — Y7 never marks it up
(`b2b_pricing.py:11-14`; `individual_pricing.py`). This matches Sergii's decision (dealers/exporters
$50, individuals $75). **Gate passed — copy edits authorised.**

**Flagged, NOT changed (per T1 instruction):** the individual **10% clause** remains in code. On the
586-load NJ dataset it only exceeds the $75 floor when carrier price > $750, i.e. ~1% of loads, so in
practice the model behaves as a flat $75. Whether the 10% clause should remain is a business decision —
left untouched.

---

## T2 — Fee copy segmented by audience

### Inventory of every place stating/implying a Y7 fee amount

| Location | Copy (before) | Audience | Action |
|---|---|---|---|
| `src/data/accountTypes.js:32` `IND_2026_FEE_LINE` | "$75 minimum or 10% of carrier price" | individual | **unchanged** — canonical source, already bound to `individual_pricing.py` (`:30-31`) and guarded by TRANSPORT `test_wap_surfaces.py` |
| `accountTypes.js:65` `DEALER_FEE_LINE` | "$50 per load — $60 when Y7 processes the carrier payment" | dealer | **unchanged** — bound to `b2b_pricing.py` (`:61-63`) |
| `accountTypes.js:66` `EXPORTER_FEE_LINE` | "$50 per load" | exporter | **unchanged** |
| `accountTypes.js:39, 121` legacy lines | "$50 COD or $65 Full Service" | legacy only | **unchanged** — shown only to `pricing_model='legacy'` accounts |
| `components/FeePreviewLine.jsx` | "Y7 service fee, this shipment" (server-resolved per order) | per-order | **unchanged** — already audience-correct (fetches the real fee from TRANSPORT) |
| `locales/*/agreement*.json` | $50/$65, $75/10%, $60 prepay | per-contract | **unchanged** — legally load-bearing signed-agreement text, already audience-scoped by `pricing_model` |
| `locales/*/dealers.json` | "flat dispatch fee" (no number; "we'll give you the number up front") | dealer page | **unchanged** — audience-clear and deliberately numberless |
| `locales/*/exporters.json:3` | "carrier rate + our service fee" (no number) | exporter page | **unchanged** |
| `locales/*/home.json` `quoteStrip.resultFee` | "+ flat Y7 dispatch fee" (unnumbered) | calculator (mixed) | **unchanged** — correct today per T2 step 5; number stays out |
| **`components/MoneyPageSchema.jsx:19`** | dealers JSON-LD `priceRange: '$40-$65'` | dealers | **CHANGED → `'$50-$60'`** (exporters `'$50'` already correct) |
| **`pages/seo/AuctionTransportSavings.jsx`** | blanket "Y7's revenue is a flat $50…" (2 places) | dealer page, read by anyone | **CHANGED** — qualified to "for dealer and exporter accounts" + named the individual $75 |
| **`locales/{en,ru,pl,ua}/faq.json`** | "single flat dispatch fee, typically **$40 to $60** per vehicle" | general/mixed | **CHANGED** — segmented: dealers/exporters $50 ($60 when Y7 pays), individuals $75 (or 10% if greater) |

### What changed and why

1. **`faq.json` (all 4 locales)** — the general-audience "How does Y7's flat fee work" answer stated a
   flat **$40–$60**, which is wrong for individuals ($75) and below every actual fee. Replaced with an
   audience-segmented statement (identical numbers across en/ru/pl/ua, surrounding prose translated to
   match each file's existing terminology). Locale parity preserved — see Verification.
2. **`AuctionTransportSavings.jsx`** (EN-only SEO page) — a dealer/auction-buyer page that made two
   *blanket* "Y7's revenue is a flat $50" claims. Qualified both to dealer/exporter accounts, added the
   "$60 when Y7 handles the carrier payment" tier, and made the existing individual caveat precise ($75
   or 10%). Added a file-level binding comment naming both TRANSPORT sources.
3. **`MoneyPageSchema.jsx`** — dealers `priceRange` `'$40-$65'` did not match the $50/$60 dealer model;
   corrected to `'$50-$60'` with a binding comment. (`shipMyCar` `'$300-$1600'` is total transport
   cost, not the fee — left as-is.)
4. **Binding-comment pattern (step 4)** — extended from `accountTypes.js:30-33` to the two JSX surfaces
   above (JSON locale files can't carry comments; their canonical fee source remains `accountTypes.js`).
5. **`accountTypes.js` deliberately untouched** — it is already the single source of truth, audience-keyed,
   and guarded by TRANSPORT anti-drift tests. Editing its strings would risk those tests for no gain.

**Out of scope, flagged for the content sprint:** `pages/seo/CarShippingCost.jsx:92,257` states the fee
is "built into your all-inclusive quote… never a separate line item… covers the carrier's rate,
insurance…". It names no amount (so not a T2 target), but that framing is inconsistent with the
individual `ind_2026` model (carrier paid **COD directly**, Y7 fee **separate**), and the bundled word
"insurance" is the Phase-0 §A5 compliance flag. Needs a copy pass, not a number fix.

---

## T3 — Vehicle multipliers recalibrated

`src/components/QuoteStrip.jsx:23-31`. Values now measured on 586 NJ-inbound loads
(2025-08-27 → 2026-07-23), sedan = 1.0 basis. Provenance comment rewritten (removed the "V1 guess"
wording; recorded sample size, date range, sedan-relative basis, and pickup's thin sample).

| Vehicle | Before | After | n | Note |
|---|---|---|---|---|
| sedan | 1.0 | **1.0** | 185 | reference, unchanged |
| SUV | 1.13 | **1.05** | 347 | old value sat far outside the 95% CI |
| pickup | 1.25 | **1.17** | 16 | thin sample; a refinement (1.25 was inside the CI) |
| enclosed | 1.4 | **1.4 (untouched)** | 0 | dataset is open-carrier only — no evidence either way |

### Money impact on sample routes (computed via the real `estimateRange` + `metros`)

| Route (open transport) | Miles | Before | After | Δ |
|---|---|---|---|---|
| **SUV** Los Angeles, CA → Newark, NJ | 2,729 | $1,675–$1,950 | $1,555–$1,810 | −7.2% |
| **Pickup** Dallas, TX → Newark, NJ | 1,526 | $945–$1,100 | $885–$1,030 | −6.4% |
| Sedan Chicago, IL → Newark, NJ (control) | 786 | $490–$565 | $490–$565 | unchanged |

The sedan control equals `DEFAULT_ROUTE` exactly — confirming the change did not disturb the prerender
bake (which is used only at `mult===1`), so `dispatchRates.js` needed no regeneration.

**Optional minivan/van option (NOT implemented — needs Sergii's word):** the data supports a **van 1.08**
(n=35, ±0.081), but Chrysler Pacifica alone is 27 of those 35 and minivans are ~6% of observed flow.
Recommendation only; `VEHICLES`/`TRANSPORTS` left with three vehicle options.

---

## T4 — SEO regression snapshot harness

New: `scripts/seo-snapshot.mjs` (zero new deps — Node built-ins only) + `scripts/seo-baseline.json`
(committed). Wired as `npm run seo:snapshot` (write) and `npm run seo:check` (diff, exit 1 on drift).
**Not** added to `prebuild` this sprint.

- **Source of truth = the prerendered `dist/{route}/index.html`** (what crawlers see via
  `scripts/prerender.mjs`), parsed as raw HTML — no browser, no hydration.
- Captures per route: `<title>`, meta description, canonical, full hreflang set, the H1/H2/H3 tree in
  document order, every JSON-LD block (`@type` + key field, `@graph` expanded), and internal-link
  count (total + unique).
- **Routes (10):** the seven audit §A4 pages (`/`, `/services`, `/exporters`, `/ports/newark`,
  `/new-jersey-auto-transport`, `/auction-to-port-transport`, `/door-to-port-auto-transport`) plus the
  three additional NJ-lane pages (`/texas-to-newark-port-auto-transport`,
  `/chicago-to-port-newark-car-shipping`, `/new-jersey-to-florida-car-shipping`). `auction-to-port` is
  itself the fourth Newark-touching lane page. The `ROUTES` array is the single place to extend the set.
- **Known extraction limitation:** adjacent inline heading spans concatenate without a space (e.g. the
  home H1 reads `Auto Transport Dispatchfor Dealers`). Deterministic, so it never causes a false diff;
  noted for whoever reads the baseline.

Usage: `npm run build` → `npm run seo:snapshot` (regenerate baseline) / `npm run seo:check` (guard).

---

## T5 — Dataset-population question (READ-ONLY)

Inspected the destination columns of both repo CSVs (no files changed):

| CSV | rows | NJ | Other destinations |
|---|---|---|---|
| `cd_2026-05-11_06-12.csv` | 200 | **87 (43.5%)** | GA 42, CA 40, TX 29, MA 2 |
| `cd_2026-06-15_07-15.csv` | 184 | **65 (35.3%)** | GA 48, CA 40, TX 26, MA 4, NH 1 |

NJ deliveries resolve to **Irvington (141), Newark (9), Morganville (2)** — exactly the three warehouses
in the 586-load NJ dataset, and the ~87/65 NJ counts ≈ the prompt's cited 90/63.

**Answer:** the repo CSVs are **not** NJ-only — they are a **multi-port national set** (NJ ~35–44%, plus
GA/Savannah, CA/LA, TX/Houston port markets). Therefore the **NJ-only 586-load dataset cannot re-derive
the national curve** — doing so would bias every lane toward NJ and drop the other-port destination
coverage the curve rests on (destination factors are deliberately unmodeled per `dispatchRates.js` T14).
The NJ dataset can inform NJ-specific content and an optional NJ-scoped adjustment, not the base curve.

---

## Verification

1. **`npm run build`** — clean. Vite build OK; prerender **138 routes OK, 0 failed**.
2. **Hooks** — no hooks added or removed in any touched file (fee copy + one numeric-constant change);
   the clean build validates all imports.
3. **Calculator renders + produces numbers (3 combos)** — proven three ways:
   - prerendered `dist/index.html` contains the rendered strip (default `$490-$565`, "Typical carrier
     rate for this route", "+ flat Y7 dispatch fee");
   - shipped JS bundle contains `mult:1.05`, `mult:1.17`, `mult:1.4` with `1.13`/`1.25` **gone**;
   - live in the browser (`npm run preview`, :4175): sedan `$490-$565`, SUV `$515-$590`, pickup
     `$570-$660` — all recomputing with the new multipliers. (The only console errors are pre-existing
     CORS failures on the prod reviews API from localhost — unrelated.)
4. **Locale parity** — `faq.json` key counts: en 167 / ru 171 / pl 171 / ua 171 — **identical to HEAD**
   (`git show HEAD:…`), so no key was added or lost; my edits changed values only (git: 1 line each).
   The en↔others 4-key gap is **pre-existing** (Phase-0 §A4 flagged en faq 191 vs 195 lines) and out of
   scope.
5. **Snapshot idempotence** — `seo:snapshot` wrote 10 routes; `seo:check` run twice back-to-back both
   reported `OK — no SEO drift` (exit 0).

**Build artifacts not committed:** `npm run build` regenerated `public/sitemap.xml` and
`scripts/sitemap-lastmod.json` (lastmod dates via `prebuild`). These are incidental build output, not
sprint changes — left uncommitted (explicit-path adds only).

---

## Commits (HELD — not pushed)

- `[NJPORTS-T2]` — `AuctionTransportSavings.jsx`, `MoneyPageSchema.jsx`, `faq.json` ×4
- `[NJPORTS-T3]` — `QuoteStrip.jsx`
- `[NJPORTS-T4]` — `scripts/seo-snapshot.mjs`, `scripts/seo-baseline.json`, `package.json`
- `[NJPORTS-1] docs` — this report

## Open items for Sergii

1. Keep the individual **10% clause**, or make individuals a flat $75? (fires ~1% on real flow)
2. Add the **minivan/van 1.08** option to the calculator? (data supports it; ~6% of flow, Pacifica-heavy)
3. `CarShippingCost.jsx` "all-inclusive / insurance" copy — schedule the content+compliance fix.
4. Content sprint (NJ warehouse-flow) is unblocked now that the SEO baseline (T4) exists.

**STOP** — no content work started; nothing pushed.
