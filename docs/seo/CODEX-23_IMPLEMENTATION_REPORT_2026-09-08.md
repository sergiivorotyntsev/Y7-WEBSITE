# CODEX-23 implementation report

Date: 2026-09-08 (America/New_York). Repository: C:/dev/Y7-WEBSITE.

## STATUS: DONE

FACT: implemented on `codex/seogeo-23-brand-pages` in two focused local commits. No push or deployment was performed. The working tree is clean.

The original read-only stop was resolved by the owner: Manheim dealer focus is an audience choice, not a universal access restriction. Selected public auctions receive one sourced qualification and the individual-fee link. No further source/architecture stop condition was triggered.

## 1. Pre-implementation evidence

[Full E1–E4 review](C:/Users/vorot/Downloads/CODEX-23_PREIMPLEMENTATION_REVIEW_2026-09-08.md) records the original metadata, ordered headings, FAQ answers, inbound/outbound links, every fee figure, claim ledger and template/content counts. Its BLOCKED status is historical and predates the owner approval.

[Official-source ledger](C:/Users/vorot/Downloads/CODEX-23_OFFICIAL_SOURCE_REVIEW_2026-09-08.md). [Machine-readable original inventory](C:/Users/vorot/Downloads/CODEX-23-QA/precheck.json).

FACT: `git fetch` succeeded and `git log --oneline main..origin/main` was empty before editing. Base: 73de8331670e6a96f6f96192e9b7549cf3d6af24. Initial checkout was clean.

## 2. Commits and files

### 2d5ce78 [SEOGEO-23] rebuild IAAI pickup service page with sourced buyer guidance

Files:

- `public/sitemap.xml`
- `scripts/seo-baseline.json`
- `scripts/sitemap-lastmod.json`
- `src/pages/seo/IaaiTransport.jsx`

### 1af1e0e [SEOGEO-23] rebuild Manheim dealer transport page and correct pricing claims

Files:

- `public/sitemap.xml`
- `scripts/seo-baseline.json`
- `scripts/sitemap-lastmod.json`
- `src/pages/seo/ManheimTransport.jsx`

Each commit contains only its page, that route’s sitemap/manifest date, and that route’s SEO-baseline entry. Shared artifacts contain separate route-specific changes. No change was made to shared components, styles, locale files, routes, forms, analytics or private-namespace code.

## 3. Before / after by route

### /iaai-transport

| Field | Before | After |
| --- | --- | --- |
| Title | IAA Auction Transport \| Y7 Logistics | IAAI Car Shipping & Auction Transport \| Y7 Logistics |
| Title length | 36 | 52 |
| Description | Vehicle transport from IAA (Insurance Auto Auctions) locations nationwide. Gate pass coordination, salvage vehicles, fast pickup. Y7 Logistics. | IAAI car shipping from IAA auctions to dealers, homes and export warehouses. Independent Licensed & Bonded FMCSA Broker; carrier rate quoted separately. |
| Description length | 143 | 152 |
| H1 | IAA Transport — Ship Your Vehicle from IAA Auctions | IAAI Car Shipping From Auction Yard to Delivery |
| Page-owned word count | 1958 | 1416 |
| FAQ count | 7 | 9 |
| TLDR word count | 112 | 56 |

Before H2/H3, in order:

- H2: Getting this car to a port?
- H2: IAA: What Changed and What Stayed the Same
- H2: The IAA Gate Pass Process: Different from Copart
- H2: IAA vs Copart: What Actually Differs for Transport
- H2: Buyer ID Requirements at IAA
- H2: IAA Storage Fees: Know Your Window
- H2: IAA Transport (In-House) vs. Independent Broker
- H2: Most IAA Vehicles Are Non-Running: Plan Accordingly
- H2: Top IAA Yard Locations by State
- H2: When You Need This
- H2: How It Works
- H2: What You Need
- H2: Our Capabilities
- H2: Frequently Asked Questions
- H2: Shipping one vehicle door-to-door?
- H2: Ready to get started?
- H3: Related Services
- H2: Related Guides

After H2/H3, in order:

- H2: Getting this car to a port?
- H2: Confirm the Purchase Before Arranging Pickup
- H2: Release Information and Carrier Check-In
- H2: Non-Running and Damaged IAA Vehicles
- H2: IAA Transport Cost: Carrier Rate and Y7 Fee
- H2: IAA-to-Port Moves for Exporters
- H2: Carrier Checks Before Each IAA Dispatch
- H2: Planning Purchases Across Auction Locations
- H2: Shipping one vehicle door-to-door?
- H2: How It Works
- H2: What You Need
- H2: Frequently Asked Questions
- H2: Ready to get started?
- H3: Related Services
- H2: Related Guides

Added outbound internal targets: `/dealer-auto-transport`, `/auction-to-port-transport`.
Removed outbound internal targets: none.

### /manheim-transport

| Field | Before | After |
| --- | --- | --- |
| Title | Manheim Auction Transport \| Y7 Logistics | Manheim Car Shipping for Dealers \| Y7 Logistics |
| Title length | 40 | 47 |
| Description | Vehicle transport from Manheim dealer auctions. Contract pricing for dealerships, nationwide coverage. Licensed auto transport broker Y7 Logistics. | Manheim car shipping from auction to dealership. Independent Licensed & Bonded FMCSA Broker, recurring lane coordination and separate carrier pricing. |
| Description length | 147 | 150 |
| H1 | Manheim Transport — Dealer Auction Vehicle Shipping | Manheim Car Shipping for Dealership Inventory |
| Page-owned word count | 1808 | 1330 |
| FAQ count | 7 | 9 |
| TLDR word count | 69 | 58 |

Before H2/H3, in order:

- H2: Shipping auction vehicles for your dealership?
- H2: Manheim Is Dealer-Only: Why That Matters for Transport
- H2: Ready Logistics vs. Independent Broker: The Real Comparison
- H2: Common Dealer Scenarios We Handle
- H2: Manheim OVE and Simulcast: Buying Without Being There
- H2: Volume Pricing: How Consistent Shipping Lowers Your Cost
- H2: Manheim's Footprint: 70+ Locations Nationwide
- H2: When You Need This
- H2: How It Works
- H2: What You Need
- H2: Our Capabilities
- H2: Frequently Asked Questions
- H2: Shipping one vehicle door-to-door?
- H2: Ready to get started?
- H3: Related Services
- H2: Related Guides

After H2/H3, in order:

- H2: Shipping auction vehicles for your dealership?
- H2: From Manheim Purchase to Dispatch
- H2: Set Up a Recurring Dealer Lane
- H2: Multi-Unit Moves and Dealership Delivery
- H2: Manheim Transport Cost for Dealers
- H2: Carrier Checks Before Each Manheim Dispatch
- H2: Connect Manheim Purchases With Your Other Routes
- H2: Shipping one vehicle door-to-door?
- H2: How It Works
- H2: What You Need
- H2: Frequently Asked Questions
- H2: Ready to get started?
- H3: Related Services
- H2: Related Guides

Added outbound internal targets: `/auction-to-port-transport`.
Removed outbound internal targets: none.

Word counts use the same original block-separated whitespace method, include collapsed FAQ and Related Guides, and exclude global chrome. The pages were already long; reduced length removes unsupported claims, comparison intent and repeated boilerplate rather than an arbitrary word-count target.

## 4. CODEX-22 residuals fixed

- IAAI original :43 verified-carrier step: replaced with load-specific carrier coordination and the five explicit SEOGEO-17 checks.
- Manheim original :19 contract-pricing metadata, :29 TLDR, :54 capability, :62–63 FAQ/schema, :189 H2, :191–193 volume framing, :204–207 tier schedule: removed together; now $50 dealer direct payment / $60 Y7 handling, carrier rate separate and Y7 fee flat at every volume.
- Manheim original :41 and :87 verified-carrier statements: removed; exact per-dispatch list now describes what is checked.
- Both rendered generic CTA subtitles (shared default at SeoLandingPage.jsx:76): page-local factual overrides replace verified-carrier / fast-response copy.
- Both secondary CTA response promises and Manheim primary CTA weekly-invoice / sixth-load tiers: replaced inside the authorized page files using the existing local AudienceCTA pattern. Shared locale entries and all other consumers remain untouched.

## 5. Removal ledger

Repeated occurrences in TLDR, body, table and FAQ/schema were removed together; original exact strings/line references are in the E2/E3 ledger.

### IAAI

1. Universal mandatory manual release request, buyer-portal click path, named-carrier buyer letter and required driver-name match: no accessible official US source establishing that universal workflow. Replaced with current branch authorization instructions, not a guessed PIN workflow.
2. One-business-day processing and IAA being one day slower than Copart: unverified release averages removed.
3. 2–3 free days after payment, national $15–$50/day, Copart 3 days / $20–$40 comparison, and lower average IAA storage: unsupported generalization removed. Branch-specific official information varies; no replacement national window or rate was invented.
4. $35/day and $350 storage illustration: removed with the unsupported storage scenario.
5. 2–5-day pickup, fast pickup/scheduling, priority inside the free window, prevention of storage charges and extra 1–2 rural days: unverified timing/avoidance promises removed.
6. Most IAA units being non-running, higher share than Copart, winch-loading norm and 20–30 versus five loading minutes: unsupported proportions and timings removed. Actual vehicle condition now drives equipment assessment.
7. Universal dealer-licence, buyer-number gate-matching and guaranteed refusal/200-mile wasted-trip scenario: removed. The sourced public-buyer qualification remains separate from transport.
8. IAA Transport being inflexible on routing/timing/carrier choice and Y7 comparative advantage: removed with the competitor comparison section.
9. Auction comparison section/table and repeated versus targeting: removed; one acknowledging sentence points to the existing comparison article.
10. 2019/2023 corporate history and unchanged yard operations, top-ten-state volume concentration and implied strong carrier availability: unnecessary/unsupported claims omitted.
11. High-volume competitive pricing and all-yard/all-vehicle acceptance implications: replaced by flat Y7 fees and condition/capacity-qualified coordination.

### Manheim

1. Absolute dealer-only access, mandatory dealer partner for private/export buyers and dealer-licence information as a shipping requirement: removed. Licensed dealers remain the chosen page audience; public sales receive one official-source sentence and individual-fee link.
2. Ready Logistics comparison, standardized/non-negotiable pricing, Manheim-only coverage and $50–$150 claimed Y7 savings: entire comparison removed. No measured comparative basis exists for Y7’s savings/service claims.
3. Contract rates, volume tiers at five/ten/sixth loads, price reductions for regular buyers and fixed weekly carrier slots: removed from all page surfaces.
4. 2–4-day pickup, expedited/priority promises, next-day delivery, all eight units arriving Friday, synchronized swaps guaranteeing uninterrupted inventory: unsupported performance scenarios removed.
5. Tuesday-to-Wednesday/Thursday title-processing story, “not through an automated pass” distinction and presumed release-schedule tracking: removed. Sourced release-document/readiness distinction replaces them.
6. 70+ locations, 400+ acres, overwhelmingly running/clean-title inventory and faster/simpler yard handling: unnecessary numbers and unsupported condition implications omitted.
7. OVE/Simulcast/in-lane purchases being operationally identical regardless of distance, nearest-fleet assignment, any-auction combination guarantees and automatically cheaper combined routing: replaced by confirmed actual collection points and conditional load planning.
8. Unconfirmed dedicated account manager, weekly invoicing and response-time promises: replaced by the owner-confirmed single dispatcher, consolidated invoicing without a stated cadence and neutral CTA copy.

No new third-party auction charge, storage window, release-processing time or transport-time figure was published. All dollar/percentage figures remaining in page-owned copy are owner-confirmed Y7 fee rules, not a carrier quote or competitor saving.

## 6. Sources published on the pages

### /iaai-transport

- [buyer registration guide](https://www.iaai.com/us/Marketing/how-to-register)
- [Tow App guidance](https://www.iaai.com/us/marketing/iaa-apps)
- [IAA location directory](https://www.iaai.com/us/locations)

### /manheim-transport

- [marketplace guidance](https://site.manheim.com/en/services/new-to-manheim.html)
- [public-auctions page](https://site.manheim.com/en/locations/public-auctions.html)
- [US terms, section 17](https://site.manheim.com/en/marketplace-policies/us-policies/manheim-terms-and-conditions.html)

The IAA links support public-buyer eligibility, outbound Tow App scheduling and branch-specific instructions. The Manheim links support public sales, actual physical/digital/offsite collection context and the release document plus valid photo-ID/readiness distinction. No competitor performance assertion was retained.

## 7. SEO snapshot diff

### /iaai-transport: 9 fields

- `title`
- `description`
- `ogTitle`
- `ogDescription`
- `twitterTitle`
- `twitterDescription`
- `h1`
- `h2`
- `jsonLdTypes`

### /manheim-transport: 9 fields

- `title`
- `description`
- `ogTitle`
- `ogDescription`
- `twitterTitle`
- `twitterDescription`
- `h1`
- `h2`
- `jsonLdTypes`

Total: 18 route/field changes, exactly two routes. Includes six mirrored metadata fields per page. Canonical, robots, hreflang and existing top-level schema types are unchanged; BusinessAudience is added as expressly requested.

Full actual CLI diffs: [IAA stage](C:/Users/vorot/Downloads/CODEX-23-QA/seo-iaai.log), [Manheim stage](C:/Users/vorot/Downloads/CODEX-23-QA/seo-manheim.log). Final `npm run seo:check`: zero drift across 138 routes after review and baseline acceptance.
The SEO snapshot compares document-wide internal-link target sets, including global navigation. The new page-owned contextual links point to targets already present globally, so no internalLinkTargets snapshot field changes. The separate page-owned inventory above records the added contextual destinations.

## 8. Validation

| Command / stage | Exit | Evidence |
| --- | --- | --- |
| npm run build (iaai-drift) | 0 | [iaai-drift](C:/Users/vorot/Downloads/CODEX-23-QA/iaai-drift.log) |
| npm run build (manheim-build) | 0 | [manheim-build](C:/Users/vorot/Downloads/CODEX-23-QA/manheim-build.log) |
| npm run build (final-build) | 0 | [final-build](C:/Users/vorot/Downloads/CODEX-23-QA/final-build.log) |
| npm run lint:baseline (lint-baseline) | 0 | [lint-baseline](C:/Users/vorot/Downloads/CODEX-23-QA/lint-baseline.log) |
| npm run seo:check (seo-final) | 0 | [seo-final](C:/Users/vorot/Downloads/CODEX-23-QA/seo-final.log) |

- Every full build reported 143 OK, 0 failed; every one of the 143 route files exists, is at least 20 KB, has populated #root and parseable content/schema. The two targets plus unchanged comparison article were explicitly content-checked.
- Lint baseline: PASS at exactly 7 errors / 28 warnings, with finding identities unchanged. No pre-existing lint issue was fixed.
- Final normalized DOM comparison: 141 untouched routes retain metadata, H1/H2/H3, all anchor destinations in sequence, schemas, visible text, FAQ, table text and number sequence.
- All 143 normalized route snapshots, including both new pages, are identical between the last two full builds.
- Both pages: one H1; TLDR 40–70 words; nine FAQ answers each byte-identical to visible answers; exact five-item SEOGEO-17 checklist; Service provider #organization and BusinessAudience.
- Confirmed Y7 fees only: dealer $50/$60, exporter $50 with handling, individual max($75,10%); no summed carrier rate. Auction/competitor financial figures removed.
- No forbidden claim pattern, comparison table or versus-targeted heading/metadata. Human source review confirmed explicit non-affiliation and absence of misleading positive auction-affiliation statements.
- Original-prose check found no shared 20-word sequence in section prose against the comparison article or between the two pages. Required verification wording, confirmed fee facts, shared chrome and visible/schema FAQ repetition are deliberate exclusions, not originality claims.
- Browser results: see [after.json](C:/Users/vorot/Downloads/CODEX-23-QA/after.json) and [browser summary](C:/Users/vorot/Downloads/CODEX-23-QA/browser-report.md). Both pages at 320/360/768/1440; no pageerror or horizontal overflow. External/API/analytics requests were blocked.

### Build / tree-state evidence

- manheim-build: HEAD 68a960fc23fc3553725bf0dd08142b7ff4b943bf; status before = empty; status after = empty; exit 0.
- final-build: HEAD 1af1e0e61a271786aac16b95a9baf6a15db0cdd6; status before = empty; status after = empty; exit 0.
The reviewed Manheim SEO-baseline entry was included by amending the second unpublished commit between these two builds; render inputs did not change. Each build independently started and ended clean. The final build ran from the final commit.

### lastmod

The initial uncommitted IAA build passed the verify-only check because lastmod intentionally follows Git, not worktree mtime. After each source commit the check correctly detected that route’s drift; sitemap:update ran once per page commit and both generated artifacts were included by amending that same unpublished commit.
Expected negative gates (exit 1, not regressions): [IAA committed drift](C:/Users/vorot/Downloads/CODEX-23-QA/iaai-committed-drift.log), [Manheim committed drift](C:/Users/vorot/Downloads/CODEX-23-QA/manheim-committed-drift.log). Updates both exited 0: [IAA update](C:/Users/vorot/Downloads/CODEX-23-QA/sitemap-iaai.log), [Manheim update](C:/Users/vorot/Downloads/CODEX-23-QA/sitemap-manheim.log).

- /iaai-transport: 2026-09-04 → 2026-09-08; source src/pages/seo/IaaiTransport.jsx and its first CODEX-23 commit.
- /manheim-transport: 2026-07-08 → 2026-09-08; source src/pages/seo/ManheimTransport.jsx and its second CODEX-23 commit.
- Exactly 138 URL entries and 340 alternates. Ignoring only lastmod elements, sitemap content is byte-identical after normalizing checkout line endings. No URL, priority or alternate change.

## 9. Important decisions, impact and risks

DECISION: page-local CTA bodies use the existing auction-hub implementation and ContextualCTA styles. CTA labels, destinations, classes and absence of custom analytics handlers are preserved. Secondary cards now sit before the configured steps/requirements/FAQ, not after FAQ. This position change is intentional and visually tested.

DECISION: Refero copy principles and the repository frontend skill guided answer-first, buyer-task writing within the existing Y7 design system; no visual redesign, token or shared CSS changes.

SEO: pages now target IAAI car shipping and dealer Manheim car shipping instead of comparison intent and unsupported pricing. All existing internal targets remain reachable, with new contextual pillar links. The comparison article remains the comparison destination. “IAA transport” retains navigational ambiguity with IAA’s own transport service; explicit independence and IAAI-led title reduce ambiguity but cannot eliminate search-intent overlap.

GEO: short attributable summaries, official-source links, explicit broker/auction responsibility and per-dispatch checks provide clearer extractable answers. FAQ/schema parity and truthful fees are executable checks. Citation, ranking and CTR improvements are not guaranteed.

RISKS: full rewrites shorten both pages; search behavior must be evaluated after deployment. Official auction rules can change. Shared stale claims elsewhere remain intentionally untouched, including dealer CTA cadence/tiers and generic verified-carrier defaults. DealerQuote’s licence requirement, agreement text and dealer-service marketing contradiction remain separate confirmed defects. The browser test blocks real APIs and analytics; it proves local navigation/rendering, not live quote submission or analytics delivery.

ASSUMPTIONS: no new business, auction or legal rules were invented. GSC numbers are owner-supplied and were not remeasured. No production deployment has been verified.

OPEN QUESTIONS: no owner decision blocks this scoped implementation. The unrelated licence and shared-claims defects still need separately authorized follow-ups.

## 10. Recommended next task

Authorize a focused shared dealer-CTA truth pass: remove weekly billing and sixth-load tiers across its consumers, using the same owner-confirmed pricing and one-dispatcher model, with an explicit full consumer list and scoped SEO regression gate. Resolve the confirmed dealer-licence form/agreement/marketing defects in a separate cross-repository workflow task.
