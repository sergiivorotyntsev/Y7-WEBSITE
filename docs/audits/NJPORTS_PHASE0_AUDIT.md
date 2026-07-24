# NJPORTS — Phase 0 Audit (READ-ONLY)

**Repo:** Y7-WEBSITE · **Machine:** WORK · **Date:** 2026-07-24 · **Mode:** audit only, no source changes
**Sprint tag:** `[NJPORTS-A0]`

> This document is the deliverable of a read-only audit. **No page, locale, calculator constant,
> or data file was modified.** Its purpose is to establish what exists in the repo today, before any
> NJ-ports SEO expansion or calculator recalibration is scoped. Every code claim is tagged
> `CONFIRMED` (read this session), `INFERENCE` (reasoned, evidence named), or `NOT VERIFIED`.
> Confirmed facts (§A1–A5, §CROSS-CHECK) are kept strictly separate from interpretation (§INTERPRETATION, §A6).

---

## §1. Git topology pre-check — CLEAN, no reconcile needed

All numbers below come from commands run this session (`git -C C:\dev\Y7-WEBSITE …`):

| check | value |
|---|---|
| current branch | `main` |
| `git status --porcelain` | empty (working tree clean) |
| local HEAD | `2173ae0` |
| `origin/main` | `2173ae0` |
| `main..origin/main` (behind) | **0** |
| `origin/main..main` (ahead) | **0** |

**No `RECONCILE REQUIRED`.** Local `main` equals `origin/main` exactly (Case A). Nothing was pulled,
rebased, merged, stashed, reset, or pushed during this audit. (Context: Y7-WEBSITE was fast-forwarded
`7c5a0f4 → 2173ae0` in the immediately-preceding SPRINT_RECONCILE step; it has been clean since.)

---

## §Scope & method

- **A1** page/route inventory · **A2** calculator internals · **A3** pricing boundary (primary) ·
  **A4** SEO contract baseline · **A5** conversion path + compliance · **A6** publishability memo.
- Facts gathered by direct reads plus four scoped read-only sub-audits. The load-bearing pricing
  files (`QuoteStrip.jsx`, `dispatchRates.js`, `metros.js`, `accountTypes.js`) were read directly.
- **The two accompanying data files were inspected in place and NOT copied into the repo:**
  `C:\Users\ElenaV\Downloads\cd_loads_2025-08_2026-07.csv` (586 data rows) and
  `nj_rate_model_2026-07.json` (top-level keys: `meta, model, bands[6], body_multipliers{suv,sedan,van,pickup,motorcycle}, pickup_type_surcharge, destinations[3], origin_states[25], origin_locations[79]`).

---

# CONFIRMED CODE FACTS

## §A1. Public-page inventory in scope

**Router:** single inline `<Routes>` in `src/App.jsx` (react-router-dom v7). No separate route-config
file. The public URL set is mirrored by hand in `scripts/generateSitemap.js` and prerendered by
`scripts/prerender.mjs`. `CONFIRMED`.

**In-scope pages (NJ ports / auction-origin / lane content):**

| Route | Source file | Locales | H1 (verbatim) | JSON-LD @types | ~words |
|---|---|---|---|---|---|
| `/new-jersey-auto-transport` | `src/pages/seo/locations/NewJerseyAutoTransport.jsx` | **EN only** | "New Jersey Auto Transport — Vehicle Shipping in NJ" | Breadcrumb, FAQPage, Service | ~1,200 |
| `/ports/newark` | `src/pages/ports/PortPage.jsx` + `portData.js` + `locales/*/ports.json` | **en/ru/pl/ua** | "Port Newark" | Breadcrumb only | ~300 |
| `/auction-to-port-transport` | `src/pages/seo/routes/AuctionToPort.jsx` | **EN only** | "Auction to Port Transport — Direct from Auction to Export Port" | Breadcrumb, FAQPage, Service | ~1,500 |
| `/texas-to-newark-port-auto-transport` | `src/pages/seo/routes/TexasToNewark.jsx` | **EN only** | "Texas to Port Newark Auto Transport" | Breadcrumb, FAQPage, Service | ~600 |
| `/chicago-to-port-newark-car-shipping` | `src/pages/seo/routes/ChicagoToNewark.jsx` | **EN only** | "Chicago to Port Newark Car Shipping" | Breadcrumb, FAQPage, Service | ~600 |
| `/new-jersey-to-florida-car-shipping` | `src/pages/seo/routes/NewJerseyToFlorida.jsx` | **EN only** | "New Jersey to Florida Car Shipping" | Breadcrumb, FAQPage, Service | ~1,000 |
| `/door-to-port-auto-transport` | `src/pages/seo/DoorToPort.jsx` | **EN only** | "Door-to-Port Auto Transport — Vehicle Delivery to US Ports" | Breadcrumb, FAQPage, Service | ~1,300 |
| `/exporters` | `src/pages/Exporters.jsx` + `locales/*/exporters.json` | **en/ru/pl/ua** | "Auto Export Logistics" (hero split) | MoneyPageSchema(Service), FAQPage, Breadcrumb | ~800 (EN) |
| `/services` | `src/pages/Services.jsx` | **en/ru/pl/ua** | "Our Services" | Breadcrumb + inline ld+json | — |
| `/` (Home; hosts the calculator) | `src/pages/Home.jsx` | **en/ru/pl/ua** | "Auto Transport Dispatch for Dealers & Exporters" | inherits root LocalBusiness | — |

Word counts are `INFERENCE` (whole-file heuristic). The EN-only SEO pages share the `SeoLandingPage`
template, whose auto H2 ladder is: *When You Need This · How It Works · What You Need · Our
Capabilities · Frequently Asked Questions · Ready to get started?* (`CONFIRMED` from `SeoLandingPage.jsx`).

**Explicit answers (`CONFIRMED`):**

- **Which page is THE NJ ports page today?** Two, at different altitudes:
  1. `/new-jersey-auto-transport` — the primary NJ landing (statewide NJ + Port-Newark export angle +
     NJ auction yards). Its title/meta lead with "Port Newark gate pass coordination"; it already names
     **Copart Somerville, IAAI Jersey City, Manheim NJ (Bordentown), ADESA NJ (Manville)**. EN-only, ~1,200 words.
  2. `/ports/newark` — the terminal-facing page (address `241 Calcutta St`, ZIP **07114**, gate hours,
     storage/demurrage). Localized (4 languages) but thin (~300 words) and **no FAQ/Service schema**.
- **Overlap / cannibalisation risk** for a lane-expanded NJ page (all `CONFIRMED`, paths given):
  `TexasToNewark.jsx`, `ChicagoToNewark.jsx`, `NewJerseyToFlorida.jsx`, `AuctionToPort.jsx`,
  `DoorToPort.jsx`, `PortPage.jsx (/ports/newark)`, and `blog/articles/PortExportNewarkHoustonSavannah.jsx`.
  A new "Copart Somerville → Port Newark" or "NJ export warehouse" page competes most directly with
  `/new-jersey-auto-transport` (already names those yards) and `/auction-to-port-transport`.
- **Per-state / per-lane pattern?** Exists **as a flat, hand-registered file list, NOT a dynamic URL
  pattern.** Location pages (6): MA, Boston, Newton, FL, **NJ**, TX. Route/lane pages (8): MA→FL,
  **NJ→FL, TX→Newark, Chicago→Newark, Auction→Port**, Atlanta→Savannah, Dallas→Houston, FL→JAXPORT.
  Every URL is a bespoke slug hardcoded in **both** `App.jsx` **and** `generateSitemap.js`. The **only**
  data-driven multi-page generator is `/ports/:slug` (6 slugs from `portData.js`, 4 languages).
- **Exporters page state & overlap.** `src/pages/Exporters.jsx` (+ `exporters.json`, 4 locales) is the
  richest money page: ~11 H2 sections, port-coverage grid to all 6 `/ports/*`, fee table, export-docs
  checklist, rate-request form. It is **generic/national — no NJ-specific, no Port-Newark-specific, no
  auction-origin-lane content.** So NJ-lane work **complements** it (link up to it) rather than overlapping.
- **Locales & parity.** Repo locales: **en, ru, pl, ua**. The **NJ lane/location/route SEO pages and
  DoorToPort are EN-only** (hardcoded JSX, listed under `ENGLISH_ONLY`, no hreflang) → **zero ru/pl/ua
  parity** for those page types. The localized in-scope pages (`/exporters`, `/ports/*`, `/services`,
  `/`) **do** maintain parity (identical locale-file line counts across all four). Minor `faq.json`
  drift (EN 191 lines vs ru/pl/ua 195) — `INFERENCE`, not a blocker.
- **Absent entirely (`CONFIRMED`, zero matches site-wide):** `Irvington`, `Morganville`, `Bayonne`,
  the literal string `"NJ port"`. No `/nj-ports`, `/irvington`, or "NJ export warehouse" page exists.

## §A2. Calculator internals

**The calculator IS `src/components/QuoteStrip.jsx`** (the homepage "quote strip"). It is the sole
consumer of the rate model. `CONFIRMED`.

- **Rate model / data source:** `src/data/dispatchRates.js` — machine-generated
  (`// GENERATED by scripts/derive-rates.mjs — do not edit by hand.`), figures are **carrier rates
  actually paid** (open transport). Distance from `src/data/metros.js` (`roadMiles`).
- **Placement:** embedded on the **Home page only** (`Home.jsx:134-136`), high (2nd section, near/above
  the fold). Not present on Services/Exporters/port pages. Inputs are **four `<select>` dropdowns**
  (pickup metro, delivery metro, vehicle, transport) — **no free-text ZIP or numeric-miles input**;
  miles are *derived* from the two chosen metros. `CONFIRMED`.

**Every constant (file · line · literal — `CONFIRMED`):**

| Constant | Location | Value |
|---|---|---|
| Road factor (haversine → road miles) | `src/data/metros.js:14` | `ROAD_FACTOR = 1.12` (prov. comment 10-11: "V1 used 1.18; recalibrated against 37 known metro pairs → median 1.12") |
| Vehicle multiplier — sedan | `QuoteStrip.jsx:24` | `1.0` |
| Vehicle multiplier — SUV | `QuoteStrip.jsx:25` | `1.13` |
| Vehicle multiplier — pickup | `QuoteStrip.jsx:26` | `1.25` |
| Transport multiplier — open | `QuoteStrip.jsx:29` | `1.0` |
| Transport multiplier — enclosed | `QuoteStrip.jsx:30` | `1.4` |
| Rate-curve tail floor ($/mi) | `dispatchRates.js:101` | `TAIL_FLOOR_DPM = 0.45` (long-haul tail only) |
| Rounding — lo/hi | `dispatchRates.js:126,145-146` | nearest **$5** (`_round5`) |
| Rounding — mid | `dispatchRates.js:144` | nearest **$1** |
| Distance bands | `dispatchRates.js:20-91` | 7 bands `[0-50]…[1201-∞]` w/ n, median, p25, p75, loRatio, hiRatio |
| Origin-state adjustment | `dispatchRates.js:102` | `ORIGIN_ADJ{FL 0.926 … OH 1.15, MA 1.15, VA 1.142, IN 1.128 …}` (clamp 0.85–1.15, n≥8) |
| Baked default route | `dispatchRates.js:152` | `{from:"Chicago, IL", to:"Newark, NJ", miles:786, lo:490, hi:565}` |

- **Base formula (`CONFIRMED`, `dispatchRates.js:130-148`) — NOT `intercept + coeff·√miles`.** It is a
  piecewise-linear $/mile decay curve × origin adjustment × multiplier:
  `mid = curveMid(miles) × ORIGIN_ADJ[state] × (vehicleMult × transportMult)`;
  `lo = round5(mid × band.loRatio)`, `hi = round5(mid × band.hiRatio)`. The `RATE_CURVE`
  (`:100`) was globally **recentered ×0.9234**. The 1201+ band's own spread ratios are **discarded** at
  runtime and replaced with the 801-1200 band's (`:137-139`).
- **Minimum price:** there is **no customer-facing price floor/minimum** — only the `$0.45/mi` tail
  floor on the rate curve. `CONFIRMED`.
- **`src/data/rates/`** (2 tracked CSVs): `cd_2026-05-11_06-12.csv` (200 rows, header incl.
  `dispatch_date`, coverage 05/11–06/12/2026 `CONFIRMED`) and `cd_2026-06-15_07-15.csv` (184 rows,
  **no `dispatch_date` column** → coverage is filename-asserted only, `NOT VERIFIED` from data). Combined
  384 rows → 376 pass the standard/single-vehicle filter. The **two files have different schemas** (17
  cols vs 11); parser keys by column name.
- **"Append-only" is documented convention, NOT enforced** (`derive-rates.mjs:5-6`, comments only). No
  git hook / lint / checksum / runtime assertion blocks editing or deleting a CSV — the generator globs
  `src/data/rates/*.csv` and rebuilds. `INFERENCE` from absence of enforcing code.
- **`scripts/derive-rates.mjs`:** reads `src/data/rates/*.csv`, overwrites `src/data/dispatchRates.js`,
  self-checks that `estimateRange(786,'IL')` reproduces `DEFAULT_ROUTE`. **Invoked manually only** — it
  is **NOT** in `package.json` scripts, vite, server, or prerender. So `dispatchRates.js` is a
  **committed generated artifact**, and the CSVs and the generated file **can silently drift** if nobody
  re-runs the generator. `CONFIRMED`.
- **`scripts/transform-cd-dispatches.mjs`:** one-time transform with a **hardcoded input path**
  `C:/Users/vorot/Downloads/cd_dispatches_2026-05-11_2026-06-12.csv`; derives `vehicle_class` from free
  text; not wired into any build. `CONFIRMED` (source file existence external → `NOT VERIFIED`).

## §A3. Pricing boundary — PRIMARY DELIVERABLE

**The public calculator displays CARRIER COST, not customer price. The markup is NOT applied on the
website — it lives in TRANSPORT. `CONFIRMED` from primary source.**

Evidence:
- The `dispatchRates.js` header (`:8-9`): *"Figures are CARRIER rates actually paid (open transport).
  Y7's dispatch fee is quoted per customer and never derived from this table."*
- The calculator's own result copy (`src/locales/en/home.json` `quoteStrip`):
  - result label: **"Typical carrier rate for this route"**
  - hedge: **"range from recent dispatches"**
  - fee line: **"+ flat Y7 dispatch fee"** — the fee is **named, never numbered** on the calculator.
  - strip description: *"Carrier rate plus a flat Y7 dispatch fee: real numbers from real dispatches. No
    spread, no hidden markup."*
- `QuoteStrip.jsx` never adds a fee to `est.lo/est.hi`; it renders the carrier range verbatim plus the
  worded fee line. `CONFIRMED`.

**Where the markup actually lives:**
- The `ind_2026` model — **`max($75, 10% of carrier price)`** — is defined in **TRANSPORT**
  (`services/individual_pricing.py`), per the binding comment at `src/data/accountTypes.js:30-33`:
  *"The ind_2026 terms — MUST match services/individual_pricing.py (IND_2026_FLOOR_CENTS = 7500,
  IND_2026_RATE = 0.10)"*, and `IND_2026_FEE_LINE = 'Broker fee: $75 minimum or 10% of carrier price'`.
- On Y7-WEBSITE the markup appears **only as descriptive copy** (`FeePreviewLine.jsx`,
  `AccountTypeModal.jsx`, `useFeePreview.js`, portal `NewOrder.jsx`/`OrderDetail.jsx`). The **actual fee
  computation is server-side in TRANSPORT** — `useFeePreview.js` fetches a resolved fee from an
  endpoint; the website never computes it. `CONFIRMED`.

**Consequence (stated as fact, expanded in §INTERPRETATION):** any new coefficients wired into the
website calculator would still display **carrier pay**. There is no on-site markup layer to hide behind.

> **Copy-vs-model inconsistency (`CONFIRMED`, flagged for §Open Questions):** marketing copy on
> `AuctionTransportSavings.jsx:99,116` and the calculator's *"flat Y7 dispatch fee"* describe a **flat
> $50 dispatch fee**, while the current new-customer model `ind_2026` is **`max($75, 10%)`** (a
> percentage, not flat). These two fee framings coexist in the repo and do not agree.

## §A4. SEO contract baseline

**Head management (`CONFIRMED`):** `react-helmet-async`; Vite SPA prerendered with Puppeteer
(`scripts/prerender.mjs`, which dedupes head tags into crawlable static HTML).
- `src/components/PageMeta.jsx` sets title/description/OG/Twitter **and canonical** — canonical + `og:url`
  are **programmatic** from `useLocation().pathname` (`https://www.y7agency.com` + pathname). Title
  auto-suffixes `" | Y7 Logistics"`.
- `src/components/HreflangTags.jsx` (auto-mounted in `Layout.jsx:26`) emits alternates **programmatically**,
  **only** when `isTranslatable(basePath)` (`src/lib/localePaths.js:47-51`). Declared locale set:
  `en, en-US, uk, uk-UA, pl, pl-PL, ru, x-default`. Translatable set (`localePaths.js:23-26`): `/`,
  `/services`, `/dealers`, `/exporters`, `/ship-my-car`, `/about`, `/contact`, `/faq`, `/quote`,
  `/track`, **plus any valid `/ports/<slug>`**. **The SEO lane pages are NOT translatable → no hreflang, EN-only by design.**
- **Sitemap:** `public/sitemap.xml`, generated by `scripts/generateSitemap.js` on the **`prebuild`** npm
  hook (runs automatically before every build). Per-URL `<lastmod>` from git commit date, cached to
  `scripts/sitemap-lastmod.json`.

**Per-page baseline (`CONFIRMED`; titles/descriptions verbatim):**

- **`/ports/newark`** — title `Auto Transport to Port Newark, NJ | Y7 Logistics`
  (`ports.json:36`); desc `"Vehicle shipping to Port Newark-Elizabeth Marine Terminal. Door-to-port auto
  transport for export. Licensed broker, verified carriers."` (`:37`); canonical `/ports/newark`;
  **full hreflang set** (sitemap:453-457); JSON-LD **BreadcrumbList only**. H2 ladder includes a
  hardcoded mid-page **"Auction-to-Port Pipeline"** (`AuctionToPortWorkflow.jsx:68`, EN-only, not i18n).
- **`/new-jersey-auto-transport`** — title `New Jersey Auto Transport — NJ Car Shipping | Y7 Logistics`
  (`:8`); desc `"NJ auto transport with Port Newark gate pass coordination. Dealer-dense market
  expertise. Licensed FMCSA broker MC #1741537."` (`:9-10`); canonical set; **no hreflang** (EN-only);
  JSON-LD Breadcrumb + FAQPage(6) + Service. Custom H2s render **before** template sections.
- **`/auction-to-port-transport`** — title `Auction to Port Car Transport — Copart to Port Shipping |
  Y7 Logistics` (`:11`); desc names Copart/IAAI/Manheim → Newark/Houston/Savannah; **no hreflang**;
  JSON-LD Breadcrumb + FAQPage(6) + Service + an `EntityTldr` "in brief" block for AI extraction.
- **`/exporters`** — title `Auto Export Services — Auction to Port Delivery Nationwide | Y7 Logistics`
  (`common.json:120`); full 4-locale hreflang; JSON-LD MoneyPageSchema(Service) + FAQPage + Breadcrumb.
  **⚠ FROZEN SEO CONTRACT** documented in-file (`Exporters.jsx:24-36`): every heading text/level, i18n
  keys, schema call sites, EntityTldr position, the H2 ladder order, and a dark/light band-alternation
  invariant are frozen.
- **`/services`** — title `Auto Transport Services | Y7 Logistics`; full hreflang; has H2s
  **"Locations We Serve"** and **"Popular Routes"** (the natural insertion points for an NJ link card).
- **`/`** — default title `Y7 Logistics | Nationwide Auto Transport`; full hreflang; inherits root
  `LocalBusiness`.

**Restructuring risk (augment-don't-rewrite):**

| Page | Risk | Basis |
|---|---|---|
| `/auction-to-port-transport` | **LOW — natural target** | Append one H3 under existing "Popular Auction-to-Port Corridors", or a new `<Section>`. Additive, EN-only, no translation debt. |
| `/new-jersey-auto-transport` | **LOW structural / MEDIUM cannibalization** | Append-only is safe; real risk is duplicating content it already has. EN-only. |
| `/services` | **LOW–MEDIUM** | Add a card under existing "Locations We Serve"/"Popular Routes". Content is i18n → 4-locale translation or EN-gating. |
| `/ports/newark` | **HIGH** | Shared template drives all 6 ports off `ports.json labels.*`; a Newark-only section needs a fork / slug-gate / new i18n keys rippling across 4 locales × 6 ports. |
| `/exporters` | **HIGH — frozen contract** | Only a tail-appended section is low-risk, and even that perturbs the band-alternation invariant. i18n × 4 locales. |
| `/` (Home) | **HIGH** | Component-composed with design laws; lane content should be a crosslink at most. |

## §A5. Conversion path & compliance

**Conversion path — complete and traceable (`CONFIRMED`):**
`QuoteStrip` (Home) → `go()` scrolls to Home `#quote-section` (default route) or
`navigate('/quote?…prefill…')` → `QuoteForm.handleSubmit` POSTs `/api/public/quote/start` → OTP →
`PostQuoteFlow` → returning: `/portal/order/{id}`; new: `/portal/register?email=…` → `/portal/login`
(query preserved) → `ProtectedRoute` dashboard/order. The port page CTA routes to Home
`/?delivery_zip=07114#quote-section`.
- **One structural gap (`CONFIRMED`):** the **Exporters `#exporter-form`** is a B2B lead form that POSTs
  to `/api/public/contact` and **dead-ends at an inline success block** — it does **not** create a quote
  or hand off into the portal pipeline. Exporters using that form never enter calculator→quote→portal.

**Compliance scan (Y7 = Licensed & Bonded FMCSA broker, surety bond, not insurance, not a carrier):**
- **GPS / real-time tracking / 24-7 dispatch: 0 violating occurrences site-wide (`CONFIRMED`).** The
  prior `[FIX-LEGAL]` / `[DESIGN-V2-W0-T01]` removals hold. Surviving `24/7` = support availability only.
- **Insurance language is overwhelmingly compliant** — almost every hit is qualified as the **carrier's**
  cargo insurance with explicit broker-not-insurer disclaimers (e.g. `faq.json:6`, `agreement.json:143`,
  `dealers.json:182`, `accountTypes.js:26` "never 'insured'", `NewJerseyAutoTransport.jsx:70`).
- **No CONFIRMED violations on the four core in-scope pages (Home/Services/Exporters/NJ).** Borderline
  items to weigh (`INFERENCE`, none core-page): `CarShippingCost.jsx:92` and `:257` bundle "insurance"
  into what Y7's quote "covers/provides" (line 92 omits the "carrier's" qualifier); minor
  "we transport" / "real-time coordination" softenings on secondary SEO/FAQ/blog pages.

---

# §CROSS-CHECK — dataset (§3 of the brief) vs. shipped code

Confirming/refuting the brief's claimed contradictions against actual constants:

| Dataset claim | Shipped code | Verdict |
|---|---|---|
| Rate model `28.46 + 18.268·√miles` (all) / `31.27 + 18.330·√miles` (2026), R²≈0.87 | Piecewise `RATE_CURVE` × origin-adj × band ratios, from a **different 384-row May–Jul 2026 sample** | **Different model & different data.** The site does not use a √-miles regression. `CONFIRMED` |
| Body multipliers: SUV **1.028**, Sedan 0.976, Van 1.053, Pickup **1.140**, Enclosed **no data** | SUV **1.13**, Pickup **1.25**, Enclosed **1.4**; no sedan-discount, no van option | **Site overstates** SUV (+~10 pts on 59% of real flow), Pickup (+~11 pts); Enclosed 1.4 is **entirely unvalidated** (dataset is open-carrier only). Code self-flags these as unvalidated V1 carryovers (`QuoteStrip.jsx:15-17`). `CONFIRMED` |
| Non-auction pickup surcharge ≈ **+$70 flat/vehicle** | **Not modeled** anywhere on the site (no pickup-type input; `dealer_or_private_address` concept absent) | **Gap.** The calculator cannot express a dealer/private-address surcharge. `CONFIRMED` |
| Destinations: Newark 07105 (355), **Irvington 07111 (229)**, Morganville 07751 (2) | Site models the **marine terminal** `/ports/newark` ZIP **07114**; Irvington/Morganville **absent** | The dataset destinations are Y7's **NJ export warehouses**, distinct from the terminal page the site ships. `CONFIRMED` |
| Origin coverage: 25 states, 79 pickup locations (NY 101, PA 74, IL 67, MA 48, NJ 46 …) | `ORIGIN_ADJ` covers **13 states** only; SEO location pages exist for MA/FL/NJ/TX only | Large uncovered origin surface vs. real flow. `CONFIRMED` |
| Data-file shape compatible with repo ingest? | Downloads `cd_loads` uses `origin_*` / `carrier_rate_usd` / `body_type`; repo CSVs use `pickup_*` / `price_usd` / `vehicle_class` | **Not drop-in compatible** — needs a column-mapping transform before `derive-rates.mjs` could consume it. `CONFIRMED` |

---

# §INTERPRETATION (inference — not code facts)

1. **The cost-basis exposure decision is already partly made.** The shipped calculator openly labels its
   output *"Typical carrier rate for this route"* — Y7 has **already chosen** to publish carrier pay (by
   band, nationally) with the fee worded-not-numbered. Publishing **per-lane / per-state / per-named-yard**
   figures would *deepen* that exposure from coarse national bands to granular competitive intelligence,
   but it is a change of degree, not a new principle. `INFERENCE`.
2. **The dataset is about warehouses, the site is about the terminal.** The 586 loads terminate at Newark
   07105 / **Irvington 07111** warehouses; the site's NJ port page is the marine terminal (07114). The
   most defensible *new* SEO surface is therefore **"auction → NJ export warehouse" origin-lane coverage**,
   which the site does not yet have and which does not require quoting a single rate. `INFERENCE`.
3. **The SUV-overstatement conversion hypothesis is real at the constant level but unproven at the
   revenue level.** SUV 1.13 vs observed 1.028 overstates ~10 pts on 59% of flow — but the calculator
   shows *carrier* cost, so the overstatement inflates the *carrier* range the customer sees, not a
   Y7-margin number. Whether correcting it improves or harms conversion is untested. `INFERENCE`.
4. **Recalibration and SEO expansion are separable sprints.** Fixing multipliers/curve (A2/A3 territory,
   touches `dispatchRates.js` + `QuoteStrip.jsx`, no new pages) is independent of adding lane SEO content
   (A1/A4 territory, touches EN-only SEO pages). They share only the dataset. `INFERENCE`.
5. **Lowest-friction SEO surface = the EN-only `SeoLandingPage` pages**, which carry no translation debt
   and no frozen contract; highest-friction = Exporters/Home (frozen contracts + 4 locales). `INFERENCE`.

---

# §A6. Publishability memo — DECISION FOR SERGII (not made here)

The dataset is **carrier pay**. Publishing it by lane is double-edged: it is exactly the unique
first-party data that wins rankings + AI citations, and it also tells every carrier bidding a lane what
Y7 has been paying. Classification of each figure category:

| Figure | Class | Note |
|---|---|---|
| Origin **coverage** (which states/79 named yards feed NJ) — *qualitative, no rates* | **SAFE TO PUBLISH** | Pure SEO gold; no cost disclosed. This is the ranking win. |
| 2025→2026 **level shift** (+~7%) | **SAFE-ish** | Market commentary, not a Y7-specific number. |
| **Distance bands** (structure, not $) | **SAFE-ish** | Banding alone is generic industry knowledge. |
| **Body multipliers** (relative, e.g. SUV +3%) | **PUBLISHABLE** | Relative ratios, not absolute cost; also useful to *correct* the site's wrong values. |
| **Non-auction surcharge** (+$70 flat) | **PUBLISHABLE ONLY AFTER MARKUP** | A concrete dollar figure; publish as customer price, not raw carrier cost. |
| **$/mile curve** (absolute carrier $/mi) | **EXPOSES COST BASIS** | Direct carrier-pay disclosure. |
| **Per-state medians** (absolute carrier $) | **EXPOSES COST BASIS** | Lane-level competitive intel for carriers. |
| **Named-pickup-location rates** (yard-level carrier $) | **EXPOSES COST BASIS (worst)** | Tells carriers the exact lane price. |

**Options (trade-offs; recommendation given, final choice deferred):**

- **Option A — Coverage-only SEO, zero new rate numbers.** Add "which auctions/states feed the NJ export
  warehouses" content + named-yard → Irvington/Newark warehouse lanes, and *correct* the body
  multipliers. Wins long-tail + AI citations; **no incremental cost exposure**. Weakest on "show me the
  price" intent. *Lowest risk, strong SEO.*
- **Option B — Customer-price ranges (after markup).** Publish lane ranges as **carrier + `ind_2026`
  markup** (customer-facing), consistent with resolving the flat-$50-vs-10% inconsistency first. Shows
  real numbers without raw carrier disclosure. Requires the markup to be computed on-site (today it's
  TRANSPORT-only) — a real engineering dependency.
- **Option C — Keep the current carrier-band framing, extend it per-lane.** Consistent with what the site
  already does, but *deepens* cost-basis exposure to lane granularity. Highest carrier-intel leakage.

**Recommendation (analysis only — Sergii decides):** **Option A now** (coverage + multiplier correction,
no new absolute rates), with **Option B as a follow-up** once the fee model inconsistency is resolved and
a markup layer exists on the website. Avoid Option C's per-lane carrier-$ disclosure.

---

# §Open questions for Sergii

1. **Fee model:** is the customer fee a **flat $50/$60** (marketing copy, `AuctionTransportSavings.jsx`)
   or **`max($75, 10%)`** (`ind_2026`, TRANSPORT)? The repo ships both framings. This gates A6 Option B.
2. **Warehouses vs terminal:** should new NJ content target the **export warehouses** (Newark 07105 /
   Irvington 07111, where the 586 loads actually go) or stay on the **marine terminal** (`/ports/newark`,
   07114)? The dataset describes the former; the site ships the latter.
3. **Markup on the website:** do we want to introduce an on-site customer-price layer (needed for A6
   Option B), or keep the deliberate carrier-rate + worded-fee framing?
4. **Recalibration scope:** re-derive the site curve from the new 586-row dataset (replacing/augmenting
   the 384-row May–Jul sample), or only correct the body multipliers? The two datasets differ in schema
   and model form.
5. **Ingest path:** the Downloads `cd_loads` CSV is not shape-compatible with `src/data/rates/`. Do we
   write a proper transform (vs. the one-time `transform-cd-dispatches.mjs` with its hardcoded path), and
   should `derive-rates.mjs` become part of the build to stop generated/CSV drift?
6. **Localization:** should an NJ-lane expansion be EN-only (matching existing SEO pages) or translated to
   ru/pl/ua (net-new work, no precedent for these page types)?

---

# §Proposed sprint breakdown (PROPOSAL ONLY — not scoped, not approved)

| # | Task | Touches | Effort | Depends on |
|---|---|---|---|---|
| P1 | **Resolve fee-model inconsistency** (flat vs `ind_2026`) — copy audit + single source of truth | copy + `accountTypes.js` | S | Q1 |
| P2 | **Correct body/transport multipliers** to observed (SUV 1.028, Pickup 1.140; decide enclosed) | `QuoteStrip.jsx` (+ regen note) | S | dataset sign-off |
| P3 | **Add non-auction pickup-type surcharge** to the calculator (needs a new input + copy) | `QuoteStrip.jsx`, `estimateRange` | M | Q3 |
| P4 | **Re-derive rate curve** from the 586-row dataset (build a real ingest transform; consider wiring `derive-rates.mjs` into build) | `scripts/`, `src/data/rates/`, `dispatchRates.js` | M–L | Q4, Q5 |
| P5 | **NJ auction-origin coverage content** (Option A): augment `/new-jersey-auto-transport` + extend `/auction-to-port-transport`; add Irvington/warehouse lane content | EN-only SEO pages, `generateSitemap.js` | M | Q2, Q6 |
| P6 | **(Optional) Customer-price lane ranges** (Option B) — requires on-site markup layer | new component + copy | L | P1, Q3 |
| P7 | **SEO regression guard** — snapshot title/meta/canonical/hreflang/JSON-LD for in-scope pages before/after | test harness | S | — |

Effort key: S ≈ ½–1 day · M ≈ 1–2 days · L ≈ 3+ days. **This table is a proposal for discussion, not a committed plan.**

---

*End of Phase 0 audit. No implementation was performed. No page, locale, calculator constant, or data
file was modified.*
