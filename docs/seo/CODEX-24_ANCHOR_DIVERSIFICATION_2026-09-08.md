# CODEX-24: Related Anchor Diversification — Verification Report

## STATUS

DONE. Implementation and validation completed locally; not pushed or deployed.

Base: `5232f5c33860aa05421df0d89fe10e3f4de8ce54`. Implementation: `8382c2139f3fded9ff6b7d5974036dfce7484389`. Branch: `codex/seogeo24-anchors`.

FACT: the required fetch succeeded and `git log main..origin/main` was empty before editing. The revised CODEX-24 brief resolved the earlier scope qualification; it is the authoritative task contract.

## SCOPE COMPLETED AND DECISIONS

- 233 related-anchor labels on 72 routes, reaching 19 destinations. No URL was added, removed or retargeted.
- PortPage uses one route/locale/destination-keyed translation lookup with the existing label as fallback. The six href arrays are unchanged.
- Previously localized port strings covered section headings only (`labels.relatedMicro`, `labels.relatedServices`), not the Related Services link labels. Added 27 label values per locale, 108 total; all previous locale values remain unchanged.
- Existing RelatedGuides titles, page-owned related arrays, guide Related lists and blog RELATED_SERVICES already supported per-source labels. No new component abstraction was needed.
- Pills and cards were edited independently. New phrases were checked against all anchors, including unchanged contextual, navigation and footer links: maximum two source routes; no case-only changes.
- Refero copy guidance kept labels concise and destination-specific. The existing Y7 interface, DESIGN V2 and local reference screenshots were the reference lock; no external Refero connection was available. No layout, token, CSS, component design or imagery changes were made.

## VALIDATION

| Check | Result |
| --- | --- |
| Initial npm run build | Expected verify-only sitemap drift; stopped before Vite. Not a regression. |
| npm run sitemap:update | Run exactly once. 57 truthful lastmod updates; same commit as source edits. |
| Full build 1 | 143 OK, 0 failed; clean tree before and after. |
| Full build 2 | 143 OK, 0 failed; clean tree before and after; same commit. |
| Independent dist validation, each build | 143 files present, 143 populated roots, none below 20 KB; three content/title/meta spot checks passed. |
| npm run seo:check | Zero drift across all 138 indexable routes. Baseline not changed. |
| npm run lint:baseline | PASS: 7 errors / 28 warnings, exact baseline finding identities. |
| New inventory script ESLint | PASS. |
| Actual changes versus final plan | Exactly 233 expected labels, zero unexpected changes. |
| Browser after hydration | 40 routes (39 changed), all 24 port routes; 320/768/1024/1440; 160 cases, zero pageerror or new horizontal overflow. |
| Label layout | No new pill/card overflow, row changes, line-count changes or parent-height changes in the tested cases. |
| Known overflow at 320px | Dealer service remains 16px; Copart international guide remains 2px. No worsening. |
| Real anchors | All 11,040 anchors remain A elements with non-empty hrefs. |
| Source preservation | Independent AST-scoped audit: 43 source files contain only permitted label edits and the one PortPage lookup. All 102 descriptions unchanged. |

An earlier validation pair was superseded after the final browser test found a trailing arrow wrapping at 320px on the blog cost-guide link. The label was shortened to “Understand the quote”, the preview harness was corrected to preserve trailing arrows, and geometry changes became an explicit harness failure. The final build pair below uses the corrected label. Earlier logs are retained with a `superseded-` prefix.

### Consecutive clean builds

| Build | UTC start | UTC end | Exit | Tree before | Tree after |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026-09-09T03:42:18.360Z | 2026-09-09T03:57:21.275Z | 0 | empty | empty |
| 2 | 2026-09-09T03:57:40.681Z | 2026-09-09T04:12:39.895Z | 0 | empty | empty |

Second-build semantic comparison: 143 routes, zero changes. Whole-HTML SHA-256 matches on 143/143 snapshots; this byte check is supplementary to the required preservation gates.

### All-route preservation proof

The following hashes aggregate the same ordered 143 routes and the exact captured field strings/arrays. Every before hash equals its after hash. DOM positions, anchor tag names and hrefs were also compared per anchor.

| Field | Before and after SHA-256 (identical) |
| --- | --- |
| hrefSequence | `19012dcaa971b85d02d166f03f155bdfab7f7cd6b50dbfeb7d09e91f94bc9d26` |
| internalTargetSet | `dd5273d319ac3d3c033f9b1e2e6c7162b36c43b785769c5f79259030da809a69` |
| metadata | `dc40dbc5bde9c96d0b2e3e973c0a8d57633f329eba167351c95e00f82eb1370c` |
| headings | `93151ff9ee33b30b544f9707cbc5154ff89c4de920ae9d8008b68cc25a2e7ab0` |
| schemaScripts | `26b9b9c72d160217c7ff8b6dc413e0bfc20f6b21718cfce563ee6563c905e32f` |
| footerHtml | `fed69264c43221240ba5f7db7f206224579a66f71681fdf03f357daf67fa17c8` |
| protectedBodyText | `faa15918d05eebb67dcbcfbef6e970206e2b685833deb7407b8a6e7a9102f72e` |

### Reusable inventory

Added `scripts/related-links-inventory.mjs`, not a temporary-only inventory. It parses prerendered HTML with JavaScript disabled and blocks network requests. It compares ordered href arrays, internal-target sets, exact metadata/H1–H6/raw JSON-LD/footer strings, DOM positions, descriptions and protected body text, and rejects out-of-scope anchor changes or over-repeated new labels.

```powershell
node scripts/related-links-inventory.mjs --out tmp/links-before.json
node scripts/related-links-inventory.mjs --out tmp/links-after.json --compare tmp/links-before.json
```

Control comparison passed. Synthetic wrong-href and excessive-repetition fixtures returned the expected nonzero exit codes; these fixture mutations affected only QA JSON, not site source or built HTML.

## SITEMAP

138 URLs and 340 alternate-link elements remain byte-identical after replacing lastmod values with a common placeholder. Priorities, URL order, comments and all other sitemap bytes are unchanged. The manifest and sitemap are committed with the source edits. The existing conservative resolver and blog article-date policy were not changed.

57 dates advanced to the source commit date: 33 edited page-owned components and 24 port routes depending on PortPage and their own locale namespace. Every source listed below was edited in this task; no shared-shell or unrelated-route fan-out was introduced.

| Route | Previous lastmod | New lastmod | Git source |
| --- | --- | --- | --- |
| `/ports/newark` | 2026-09-04 | 2026-09-08 | src/locales/en/ports.json, src/pages/ports/PortPage.jsx |
| `/ua/ports/newark` | 2026-09-04 | 2026-09-08 | src/locales/ua/ports.json, src/pages/ports/PortPage.jsx |
| `/pl/ports/newark` | 2026-09-04 | 2026-09-08 | src/locales/pl/ports.json, src/pages/ports/PortPage.jsx |
| `/ru/ports/newark` | 2026-09-04 | 2026-09-08 | src/locales/ru/ports.json, src/pages/ports/PortPage.jsx |
| `/ports/houston` | 2026-09-04 | 2026-09-08 | src/locales/en/ports.json, src/pages/ports/PortPage.jsx |
| `/ua/ports/houston` | 2026-09-04 | 2026-09-08 | src/locales/ua/ports.json, src/pages/ports/PortPage.jsx |
| `/pl/ports/houston` | 2026-09-04 | 2026-09-08 | src/locales/pl/ports.json, src/pages/ports/PortPage.jsx |
| `/ru/ports/houston` | 2026-09-04 | 2026-09-08 | src/locales/ru/ports.json, src/pages/ports/PortPage.jsx |
| `/ports/savannah` | 2026-09-04 | 2026-09-08 | src/locales/en/ports.json, src/pages/ports/PortPage.jsx |
| `/ua/ports/savannah` | 2026-09-04 | 2026-09-08 | src/locales/ua/ports.json, src/pages/ports/PortPage.jsx |
| `/pl/ports/savannah` | 2026-09-04 | 2026-09-08 | src/locales/pl/ports.json, src/pages/ports/PortPage.jsx |
| `/ru/ports/savannah` | 2026-09-04 | 2026-09-08 | src/locales/ru/ports.json, src/pages/ports/PortPage.jsx |
| `/ports/los-angeles` | 2026-09-04 | 2026-09-08 | src/locales/en/ports.json, src/pages/ports/PortPage.jsx |
| `/ua/ports/los-angeles` | 2026-09-04 | 2026-09-08 | src/locales/ua/ports.json, src/pages/ports/PortPage.jsx |
| `/pl/ports/los-angeles` | 2026-09-04 | 2026-09-08 | src/locales/pl/ports.json, src/pages/ports/PortPage.jsx |
| `/ru/ports/los-angeles` | 2026-09-04 | 2026-09-08 | src/locales/ru/ports.json, src/pages/ports/PortPage.jsx |
| `/ports/baltimore` | 2026-09-04 | 2026-09-08 | src/locales/en/ports.json, src/pages/ports/PortPage.jsx |
| `/ua/ports/baltimore` | 2026-09-04 | 2026-09-08 | src/locales/ua/ports.json, src/pages/ports/PortPage.jsx |
| `/pl/ports/baltimore` | 2026-09-04 | 2026-09-08 | src/locales/pl/ports.json, src/pages/ports/PortPage.jsx |
| `/ru/ports/baltimore` | 2026-09-04 | 2026-09-08 | src/locales/ru/ports.json, src/pages/ports/PortPage.jsx |
| `/ports/jacksonville` | 2026-09-04 | 2026-09-08 | src/locales/en/ports.json, src/pages/ports/PortPage.jsx |
| `/ua/ports/jacksonville` | 2026-09-04 | 2026-09-08 | src/locales/ua/ports.json, src/pages/ports/PortPage.jsx |
| `/pl/ports/jacksonville` | 2026-09-04 | 2026-09-08 | src/locales/pl/ports.json, src/pages/ports/PortPage.jsx |
| `/ru/ports/jacksonville` | 2026-09-04 | 2026-09-08 | src/locales/ru/ports.json, src/pages/ports/PortPage.jsx |
| `/car-shipping-cost` | 2026-07-24 | 2026-09-08 | src/pages/seo/CarShippingCost.jsx |
| `/enclosed-car-shipping` | 2026-08-25 | 2026-09-08 | src/pages/seo/EnclosedCarShipping.jsx |
| `/auction-car-shipping` | 2026-09-07 | 2026-09-08 | src/pages/seo/AuctionCarShipping.jsx |
| `/auction-transport-savings` | 2026-09-04 | 2026-09-08 | src/pages/seo/AuctionTransportSavings.jsx |
| `/door-to-port-auto-transport` | 2026-09-04 | 2026-09-08 | src/pages/seo/DoorToPort.jsx |
| `/dealer-auto-transport` | 2026-09-05 | 2026-09-08 | src/pages/seo/DealerAutoTransport.jsx |
| `/salvage-car-shipping` | 2026-08-25 | 2026-09-08 | src/pages/seo/SalvageCarShipping.jsx |
| `/open-car-shipping` | 2026-08-25 | 2026-09-08 | src/pages/seo/OpenCarShipping.jsx |
| `/state-to-state-car-shipping` | 2026-08-25 | 2026-09-08 | src/pages/seo/StateToState.jsx |
| `/massachusetts-car-shipping` | 2026-09-02 | 2026-09-08 | src/pages/seo/locations/MassachusettsCarShipping.jsx |
| `/boston-car-shipping` | 2026-09-02 | 2026-09-08 | src/pages/seo/locations/BostonCarShipping.jsx |
| `/newton-auto-transport` | 2026-09-02 | 2026-09-08 | src/pages/seo/locations/NewtonAutoTransport.jsx |
| `/florida-car-shipping` | 2026-08-25 | 2026-09-08 | src/pages/seo/locations/FloridaCarShipping.jsx |
| `/new-jersey-auto-transport` | 2026-08-25 | 2026-09-08 | src/pages/seo/locations/NewJerseyAutoTransport.jsx |
| `/texas-auto-transport` | 2026-08-25 | 2026-09-08 | src/pages/seo/locations/TexasAutoTransport.jsx |
| `/nj-export-warehouse-shipping-cost` | 2026-09-04 | 2026-09-08 | src/pages/seo/NjExportWarehouseShippingCost.jsx |
| `/massachusetts-to-florida-car-shipping` | 2026-08-25 | 2026-09-08 | src/pages/seo/routes/MassachusettsToFlorida.jsx |
| `/texas-to-newark-port-auto-transport` | 2026-07-08 | 2026-09-08 | src/pages/seo/routes/TexasToNewark.jsx |
| `/chicago-to-port-newark-car-shipping` | 2026-07-08 | 2026-09-08 | src/pages/seo/routes/ChicagoToNewark.jsx |
| `/auction-to-port-transport` | 2026-09-05 | 2026-09-08 | src/pages/seo/routes/AuctionToPort.jsx |
| `/atlanta-to-savannah-port-auto-transport` | 2026-07-08 | 2026-09-08 | src/pages/seo/routes/AtlantaToSavannah.jsx |
| `/dallas-to-port-houston-auto-transport` | 2026-07-08 | 2026-09-08 | src/pages/seo/routes/DallasToHouston.jsx |
| `/florida-to-jacksonville-port-car-shipping` | 2026-07-08 | 2026-09-08 | src/pages/seo/routes/FloridaToJacksonville.jsx |
| `/tesla-car-shipping` | 2026-07-15 | 2026-09-08 | src/pages/seo/TeslaCarShipping.jsx |
| `/ev-auto-transport` | 2026-04-19 | 2026-09-08 | src/pages/seo/EVAutoTransport.jsx |
| `/cybertruck-shipping` | 2026-04-19 | 2026-09-08 | src/pages/seo/CybertruckShipping.jsx |
| `/electric-vehicle-port-delivery` | 2026-04-30 | 2026-09-08 | src/pages/seo/ElectricVehiclePortDelivery.jsx |
| `/how-to-ship-a-car-bought-at-auction` | 2026-07-16 | 2026-09-08 | src/pages/seo/guides/HowToShipAuctionCar.jsx |
| `/open-vs-enclosed-auto-transport` | 2026-07-16 | 2026-09-08 | src/pages/seo/guides/OpenVsEnclosed.jsx |
| `/what-is-a-bill-of-lading` | 2026-07-16 | 2026-09-08 | src/pages/seo/guides/BillOfLading.jsx |
| `/copart-storage-fees` | 2026-09-07 | 2026-09-08 | src/pages/seo/guides/CopartStorageFees.jsx |
| `/copart-gate-pass-guide` | 2026-09-07 | 2026-09-08 | src/pages/seo/guides/CopartGatePassGuide.jsx |
| `/copart-international-shipping` | 2026-09-07 | 2026-09-08 | src/pages/seo/guides/CopartInternationalShipping.jsx |

## FILES CHANGED, BY COMMIT

### Implementation commit 8382c21

- `public/sitemap.xml`
- `scripts/related-links-inventory.mjs`
- `scripts/sitemap-lastmod.json`
- `src/data/relatedGuides.js`
- `src/locales/en/ports.json`
- `src/locales/pl/ports.json`
- `src/locales/ru/ports.json`
- `src/locales/ua/ports.json`
- `src/pages/blog/BlogArticle.jsx`
- `src/pages/ports/PortPage.jsx`
- `src/pages/seo/AuctionCarShipping.jsx`
- `src/pages/seo/AuctionTransportSavings.jsx`
- `src/pages/seo/CarShippingCost.jsx`
- `src/pages/seo/CopartShipping.jsx`
- `src/pages/seo/CybertruckShipping.jsx`
- `src/pages/seo/DealerAutoTransport.jsx`
- `src/pages/seo/DoorToPort.jsx`
- `src/pages/seo/EVAutoTransport.jsx`
- `src/pages/seo/ElectricVehiclePortDelivery.jsx`
- `src/pages/seo/EnclosedCarShipping.jsx`
- `src/pages/seo/IaaiTransport.jsx`
- `src/pages/seo/ManheimTransport.jsx`
- `src/pages/seo/NjExportWarehouseShippingCost.jsx`
- `src/pages/seo/OpenCarShipping.jsx`
- `src/pages/seo/SalvageCarShipping.jsx`
- `src/pages/seo/StateToState.jsx`
- `src/pages/seo/TeslaCarShipping.jsx`
- `src/pages/seo/guides/BillOfLading.jsx`
- `src/pages/seo/guides/CopartGatePassGuide.jsx`
- `src/pages/seo/guides/CopartInternationalShipping.jsx`
- `src/pages/seo/guides/CopartStorageFees.jsx`
- `src/pages/seo/guides/HowToShipAuctionCar.jsx`
- `src/pages/seo/guides/OpenVsEnclosed.jsx`
- `src/pages/seo/locations/BostonCarShipping.jsx`
- `src/pages/seo/locations/FloridaCarShipping.jsx`
- `src/pages/seo/locations/MassachusettsCarShipping.jsx`
- `src/pages/seo/locations/NewJerseyAutoTransport.jsx`
- `src/pages/seo/locations/NewtonAutoTransport.jsx`
- `src/pages/seo/locations/TexasAutoTransport.jsx`
- `src/pages/seo/routes/AtlantaToSavannah.jsx`
- `src/pages/seo/routes/AuctionToPort.jsx`
- `src/pages/seo/routes/ChicagoToNewark.jsx`
- `src/pages/seo/routes/DallasToHouston.jsx`
- `src/pages/seo/routes/FloridaToJacksonville.jsx`
- `src/pages/seo/routes/MassachusettsToFlorida.jsx`
- `src/pages/seo/routes/TexasToNewark.jsx`

### Documentation-only completion commit

- `docs/seo/CODEX-24_ANCHOR_DIVERSIFICATION_2026-09-08.md` (this report). No source or sitemap edits in that commit.

## RISKS, UNCHANGED ITEMS AND NEXT TASK

- FACT: metadata, all heading levels, raw schema, body/contextual links, existing CTA copy, footer, URLs, descriptions, pricing figures and CSS are unchanged across all 143 routes. Protected RelatedArticles H3 cards and low-concentration/out-of-cohort defaults remain unchanged, detailed below.
- Existing build warnings about deprecated Vite advancedChunks and large chunks remain. Existing lint findings were not fixed. Known small mobile overflows were not fixed.
- New RU/PL/UA UI labels are listed verbatim below for owner review. Browser validation covers the requested widths, not every possible width, zoom level or browser engine. Geometry comparisons use positions relative to the immediate parent so pre-existing Reveal animation offsets are not mistaken for text wrapping.
- No guarantee of a ranking or CTR increase is claimed. This changes contextual anchor wording only; it does not alter indexability or metadata.
- Recommended next task: a separately authorized pricing-truth audit/fix for `/car-shipping-cost`, including its visible copy and corresponding schema/metadata where necessary. `src/pages/seo/CarShippingCost.jsx:257` still says: “The broker fee is built into your all-inclusive quote. You will never see a separate line item for it.” This contradicts the project rule that the Y7 fee and carrier rate are separate. It was reported, not changed here.
- The prior CODEX-22 residual-claims report remains an independent follow-up; no items outside the current label scope were fixed.

ASSUMPTIONS: no new business rule, fee, SLA or service-availability assumption was introduced.

OPEN QUESTIONS: no blocking owner decision. Optional native-language editorial review of the new short labels.

STOP CONDITIONS: no unresolved condition. Initial sitemap drift was handled through the expressly required update flow. No SEO, target, heading, schema, footer or protected-body drift was accepted.

## EVIDENCE FILES

Local QA artifacts: `C:/Users/vorot/Downloads/CODEX-24-QA/` (build logs/results, lint result, SEO result, browser-before/after JSON and screenshots, preservation-summary.json, second-build-summary.json). Full DOM inventories: `C:/dev/Y7-WEBSITE/tmp/codex24/before.json`, `after.json`, `after-build-2.json`. These are local QA artifacts and are not deployed.

## LABEL REGISTER AND RETAINED REPETITION

The following tables were prepared from the final label plan and then verified against the actual built DOM: all 233 replacements match exactly. Their after-state counts therefore describe the verified output, not an unverified projection.
## Scope summary

The final plan changes **233 rendered anchor labels on 72 source pages**: 125 non-port labels and 108 labels on the 24 localized port pages. It creates 230 distinct normalized new labels. None is merely a case-only change. Every newly introduced label is used on no more than 2 source pages when checked against **all anchors**, including unchanged body text, global navigation, CTAs and footer links, not just templated anchors.

| Surface | Changed anchors |
| --- | --- |
| SEO related pill | 74 |
| RelatedGuides card title | 28 |
| Guide related pill | 5 |
| Standalone Related list | 3 |
| Port Related Services | 108 |
| Blog Related Services | 15 |

The shared RelatedGuides component is unchanged. Its 28 changed card titles remain separate from related pills. All 102 RelatedGuides descriptions are preserved, including the four CODEX-22 correction families. The approved PortPage change only resolves a label from the route/locale-specific dictionary, with the original label as the default; it does not change its destination arrays or rendering structure.

The independent source audit found exactly 125 non-port label edits, 27 new relatedLabels entries in each of four ports.json files, and the single approved PortPage fallback expression. After masking only those scoped label nodes, all remaining normalized source bytes were unchanged. The actual-output preservation comparison also passed.

## Counting method

- A “source page” is an exact route string; EN, PL, RU and UA port routes count separately.
- A surface is the baseline DOM classification. Protected RelatedArticles H3 cards, body links, global CTAs and footer links are not editable related-label scope.
- Concentration is the largest number of distinct source routes using the same short anchor label for a destination. A card and pill on the same source route count as one source page for repetition.
- Case-insensitive comparison is NFKC normalization, whitespace collapse, trim, then JavaScript toLowerCase(). Punctuation and hyphenation remain significant; case-only alternatives are not diversification.
- The cohort in the first table is the original approved top ten, fixed before implementation. Its metrics are recomputed case-insensitively both before and after. Re-ranking with case-insensitive metrics does not silently expand the approved editing scope.
- New-label collision checking is stricter than concentration reporting: it checks the normalized phrase across all 11,040 baseline anchors with verified replacements, regardless of destination or surface.
- Output invariants and responsive geometry were verified separately as documented above; HTTP behavior was not changed.

## Approved top ten: before versus verified after

| Destination | Source pages (unchanged) | Links (unchanged) | Distinct labels before | Distinct labels after | Max same-label source pages before | Max same-label source pages after |
| --- | --- | --- | --- | --- | --- | --- |
| `/auction-to-port-transport` | 45 | 54 | 8 | 49 | 24 | 3 |
| `/door-to-port-auto-transport` | 39 | 44 | 9 | 36 | 20 | 4 |
| `/copart-shipping` | 24 | 34 | 7 | 34 | 16 | 1 |
| `/state-to-state-car-shipping` | 21 | 21 | 4 | 16 | 14 | 4 |
| `/car-shipping-cost` | 16 | 17 | 2 | 17 | 12 | 1 |
| `/quote` | 10 | 10 | 1 | 10 | 10 | 1 |
| `/ship-my-car` | 20 | 20 | 3 | 20 | 13 | 1 |
| `/auction-car-shipping` | 13 | 18 | 3 | 18 | 10 | 1 |
| `/ports/newark` | 11 | 11 | 2 | 9 | 9 | 2 |
| `/florida-car-shipping` | 11 | 14 | 2 | 9 | 8 | 3 |

The original top-ten destinations have no remaining editable repeated-label cluster on five or more source pages. The residual three/four-source clusters below the approved selection threshold remain unchanged. State-to-state and Florida fall below the threshold after port localization, so their remaining non-port defaults are deliberately retained.

### Fresh case-insensitive ranking, shown for transparency

The following ranks all editable related surfaces using the same case-insensitive method. This is a report, not a new editing authorization. In particular, an out-of-cohort destination appearing in the post-change top ten has not become an in-scope page.

| Rank | Before destination | Before max | Verified after destination | After max |
| --- | --- | --- | --- | --- |
| 1 | `/auction-to-port-transport` | 24 | `/enclosed-car-shipping` | 8 |
| 2 | `/door-to-port-auto-transport` | 20 | `/dealer-auto-transport` | 8 |
| 3 | `/copart-shipping` | 16 | `/manheim-transport` | 7 |
| 4 | `/state-to-state-car-shipping` | 14 | `/iaai-transport` | 6 |
| 5 | `/ship-my-car` | 13 | `/open-car-shipping` | 5 |
| 6 | `/car-shipping-cost` | 12 | `/door-to-port-auto-transport` | 4 |
| 7 | `/enclosed-car-shipping` | 12 | `/state-to-state-car-shipping` | 4 |
| 8 | `/auction-car-shipping` | 10 | `/salvage-car-shipping` | 4 |
| 9 | `/quote` | 10 | `/auction-transport-savings` | 4 |
| 10 | `/ports/newark` | 9 | `/electric-vehicle-port-delivery` | 4 |

### New phrases used on two source pages

These are the maximum permitted repetitions of newly introduced phrases. No new phrase exceeds two source pages.

| Phrase | Source routes |
| --- | --- |
| Auction port move | `/auction-car-shipping`, `/dallas-to-port-houston-auto-transport` |
| Copart delivery | `/copart-international-shipping`, `/iaai-transport` |
| Copart vehicle transport | `/copart-gate-pass-guide`, `/iaai-transport` |
| Auctions to port | `/atlanta-to-savannah-port-auto-transport`, `/door-to-port-auto-transport` |
| Copart vehicle pickup | `/dealer-auto-transport`, `/texas-auto-transport` |
| Из Нью-Джерси во Флориду | `/ru/ports/jacksonville`, `/ru/ports/newark` |

## Full old/new change register: all 233 anchors

Grouped by destination. Labels are exact text values; punctuation and letter case are intentional. Source and surface identify separate card/pill occurrences even when their href is the same. Existing destinations, order and DOM positions are not changed by the plan.

### `/atlanta-to-savannah-port-auto-transport` (4 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/pl/ports/savannah` | Port Related Services | Atlanta to Savannah port corridor | Z Atlanty do portu Savannah |
| `/ports/savannah` | Port Related Services | Atlanta to Savannah port corridor | From Atlanta auctions to Savannah |
| `/ru/ports/savannah` | Port Related Services | Atlanta to Savannah port corridor | Из Атланты в порт Саванны |
| `/ua/ports/savannah` | Port Related Services | Atlanta to Savannah port corridor | З Атланти до порту Саванна |

### `/auction-car-shipping` (16 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/auction-to-port-transport` | SEO related pill | Auction Car Shipping | Auction collection |
| `/auction-transport-savings` | RelatedGuides card title | Auction Car Shipping | Auction pickup review |
| `/auction-transport-savings` | SEO related pill | Auction Car Shipping | Auction transport options |
| `/chicago-to-port-newark-car-shipping` | SEO related pill | Auction Shipping | Auction routes |
| `/copart-shipping` | SEO related pill | Auction Shipping | Other auction transport |
| `/dealer-auto-transport` | RelatedGuides card title | Auction Car Shipping | Auction inventory moves |
| `/dealer-auto-transport` | SEO related pill | Auction Shipping | Auction pickup options |
| `/how-to-ship-a-car-bought-at-auction` | Guide related pill | Auction Car Shipping | Arrange auction transport |
| `/iaai-transport` | RelatedGuides card title | Auction Car Shipping | Auction pickup service |
| `/iaai-transport` | SEO related pill | Auction Shipping | Other auction pickups |
| `/manheim-transport` | RelatedGuides card title | Auction Car Shipping | Auction vehicle delivery |
| `/manheim-transport` | SEO related pill | Auction Shipping | Auction moves |
| `/open-car-shipping` | SEO related pill | Auction Car Shipping | Shipping auction purchases |
| `/salvage-car-shipping` | RelatedGuides card title | Auction Car Shipping | Auction delivery service |
| `/salvage-car-shipping` | SEO related pill | Auction Car Shipping | Auction delivery |
| `/state-to-state-car-shipping` | SEO related pill | Auction Car Shipping | Auction pickup nationwide |

### `/auction-to-port-transport` (44 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/atlanta-to-savannah-port-auto-transport` | RelatedGuides card title | Auction to Port | Auction port transfers |
| `/atlanta-to-savannah-port-auto-transport` | SEO related pill | Auction to Port | Auctions to port |
| `/auction-car-shipping` | RelatedGuides card title | Auction to Port | Auction-to-port service |
| `/auction-car-shipping` | SEO related pill | Auction to Port | Auction port move |
| `/chicago-to-port-newark-car-shipping` | RelatedGuides card title | Auction to Port | Export pickup planning |
| `/chicago-to-port-newark-car-shipping` | SEO related pill | Auction to Port | Auction-to-port routes |
| `/copart-shipping` | SEO related pill | Auction to Port | Auction export moves |
| `/dallas-to-port-houston-auto-transport` | RelatedGuides card title | Auction to Port | Auction export delivery |
| `/dallas-to-port-houston-auto-transport` | SEO related pill | Auction to Port | Auction port move |
| `/door-to-port-auto-transport` | RelatedGuides card title | Auction to Port | Auction collection to port |
| `/door-to-port-auto-transport` | SEO related pill | Auction to Port | Auctions to port |
| `/electric-vehicle-port-delivery` | RelatedGuides card title | Auction to Port | Auction EVs to port |
| `/electric-vehicle-port-delivery` | SEO related pill | Auction to Port | Auction EV port move |
| `/florida-to-jacksonville-port-car-shipping` | RelatedGuides card title | Auction to Port | Auction export workflow |
| `/florida-to-jacksonville-port-car-shipping` | SEO related pill | Auction to Port | Auction-to-port moves |
| `/new-jersey-auto-transport` | SEO related pill | Auction to Port | Auction export shipping |
| `/nj-export-warehouse-shipping-cost` | SEO related pill | Auction to Port | Auction delivery workflow |
| `/pl/ports/baltimore` | Port Related Services | Auction-to-port shipping workflow | Z aukcji do portu Baltimore |
| `/pl/ports/houston` | Port Related Services | Auction-to-port shipping workflow | Auto z aukcji do Houston |
| `/pl/ports/jacksonville` | Port Related Services | Auction-to-port shipping workflow | Auto z aukcji do Jacksonville |
| `/pl/ports/los-angeles` | Port Related Services | Auction-to-port shipping workflow | Z aukcji do Los Angeles |
| `/pl/ports/newark` | Port Related Services | Auction-to-port shipping workflow | Z aukcji do portu Newark |
| `/pl/ports/savannah` | Port Related Services | Auction-to-port shipping workflow | Auto z aukcji do Savannah |
| `/ports/baltimore` | Port Related Services | Auction-to-port shipping workflow | Arrange an auction-to-Baltimore move |
| `/ports/houston` | Port Related Services | Auction-to-port shipping workflow | Plan your auction-to-Houston move |
| `/ports/jacksonville` | Port Related Services | Auction-to-port shipping workflow | From auction to JAXPORT |
| `/ports/los-angeles` | Port Related Services | Auction-to-port shipping workflow | From auction yard to Los Angeles |
| `/ports/newark` | Port Related Services | Auction-to-port shipping workflow | Plan an auction-to-Newark move |
| `/ports/savannah` | Port Related Services | Auction-to-port shipping workflow | Arrange auction pickup for Savannah |
| `/ru/ports/baltimore` | Port Related Services | Auction-to-port shipping workflow | С аукциона в Балтимор |
| `/ru/ports/houston` | Port Related Services | Auction-to-port shipping workflow | С аукциона в Хьюстон |
| `/ru/ports/jacksonville` | Port Related Services | Auction-to-port shipping workflow | С аукциона до порта Джексонвилла |
| `/ru/ports/los-angeles` | Port Related Services | Auction-to-port shipping workflow | С аукциона в Лос-Анджелес |
| `/ru/ports/newark` | Port Related Services | Auction-to-port shipping workflow | С аукциона в порт Ньюарк |
| `/ru/ports/savannah` | Port Related Services | Auction-to-port shipping workflow | С аукциона до Саванны |
| `/texas-auto-transport` | SEO related pill | Auction to Port | Auction cars to port |
| `/texas-to-newark-port-auto-transport` | RelatedGuides card title | Auction to Port | Auction export handoff |
| `/texas-to-newark-port-auto-transport` | SEO related pill | Auction to Port | From auction to port |
| `/ua/ports/baltimore` | Port Related Services | Auction-to-port shipping workflow | З аукціону до Балтимора |
| `/ua/ports/houston` | Port Related Services | Auction-to-port shipping workflow | З аукціону до Х'юстона |
| `/ua/ports/jacksonville` | Port Related Services | Auction-to-port shipping workflow | З аукціону до порту Джексонвілл |
| `/ua/ports/los-angeles` | Port Related Services | Auction-to-port shipping workflow | З аукціону до Лос-Анджелеса |
| `/ua/ports/newark` | Port Related Services | Auction-to-port shipping workflow | З аукціону до порту Ньюарк |
| `/ua/ports/savannah` | Port Related Services | Auction-to-port shipping workflow | З аукціону до Саванни |

### `/car-shipping-cost` (17 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/auction-transport-savings` | RelatedGuides card title | Car Shipping Cost | How transport rates vary |
| `/blog/75000-bond-claims-guide` | Blog Related Services | Car shipping cost guide | Car shipping fees explained |
| `/blog/carrier-coi-verification-guide` | Blog Related Services | Car shipping cost guide | What affects transport rates |
| `/blog/carrier-who-vanished` | Blog Related Services | Car shipping cost guide | Understand the quote |
| `/blog/fmcsa-2026-new-rules` | Blog Related Services | Car shipping cost guide | How transport rates are set |
| `/boston-car-shipping` | SEO related pill | Car Shipping Cost | Car transport pricing |
| `/chicago-to-port-newark-car-shipping` | SEO related pill | Car Shipping Cost | Long-haul shipping costs |
| `/enclosed-car-shipping` | SEO related pill | Car Shipping Cost | Enclosed pricing factors |
| `/florida-car-shipping` | SEO related pill | Car Shipping Cost | Seasonal transport costs |
| `/massachusetts-car-shipping` | SEO related pill | Car Shipping Cost | What car shipping costs |
| `/nj-export-warehouse-shipping-cost` | SEO related pill | Car Shipping Cost | Carrier rate factors |
| `/open-car-shipping` | RelatedGuides card title | Car Shipping Cost | Carrier quote factors |
| `/open-car-shipping` | SEO related pill | Car Shipping Cost | Open transport pricing |
| `/open-vs-enclosed-auto-transport` | Guide related pill | Car Shipping Cost | Compare shipping costs |
| `/state-to-state-car-shipping` | SEO related pill | Car Shipping Cost | Interstate shipping costs |
| `/tesla-car-shipping` | SEO related pill | Car Shipping Cost | Size and weight pricing |
| `/what-is-a-bill-of-lading` | Guide related pill | Car Shipping Cost | Transport quote breakdown |

### `/copart-shipping` (28 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/atlanta-to-savannah-port-auto-transport` | RelatedGuides card title | Copart Shipping | Copart yard collection |
| `/atlanta-to-savannah-port-auto-transport` | SEO related pill | Copart Shipping | Copart pickup options |
| `/auction-car-shipping` | RelatedGuides card title | Copart Shipping | Shipping a Copart vehicle |
| `/auction-car-shipping` | SEO related pill | Copart Shipping | Copart transport |
| `/auction-to-port-transport` | RelatedGuides card title | Copart Shipping | Copart to warehouses |
| `/auction-to-port-transport` | SEO related pill | Copart Shipping | Copart port delivery |
| `/auction-transport-savings` | RelatedGuides card title | Copart Shipping | Copart transport service |
| `/auction-transport-savings` | SEO related pill | Copart Shipping | Copart pricing |
| `/chicago-to-port-newark-car-shipping` | RelatedGuides card title | Copart Shipping | Copart pickup planning |
| `/copart-gate-pass-guide` | Standalone Related list | Copart shipping main page | Arrange Copart collection |
| `/copart-international-shipping` | Standalone Related list | Copart shipping main page | Copart pickup for export |
| `/copart-storage-fees` | Standalone Related list | Copart shipping main page | Plan transport from Copart |
| `/dallas-to-port-houston-auto-transport` | RelatedGuides card title | Copart Shipping | Moving cars from Copart |
| `/dallas-to-port-houston-auto-transport` | SEO related pill | Copart Shipping | Texas Copart move |
| `/dealer-auto-transport` | RelatedGuides card title | Copart Shipping | Copart inventory moves |
| `/dealer-auto-transport` | SEO related pill | Copart Shipping | Copart dealer moves |
| `/florida-to-jacksonville-port-car-shipping` | SEO related pill | Copart Shipping | Copart export pickup |
| `/how-to-ship-a-car-bought-at-auction` | Guide related pill | Copart Shipping | Arrange Copart pickup |
| `/iaai-transport` | RelatedGuides card title | Copart Shipping | Copart vehicle transport |
| `/iaai-transport` | SEO related pill | Copart Shipping | Copart delivery |
| `/manheim-transport` | RelatedGuides card title | Copart Shipping | Copart dealer pickups |
| `/manheim-transport` | SEO related pill | Copart Shipping | Copart car moves |
| `/salvage-car-shipping` | RelatedGuides card title | Copart Shipping | Non-running Copart cars |
| `/salvage-car-shipping` | SEO related pill | Copart Shipping | Copart salvage move |
| `/texas-auto-transport` | SEO related pill | Copart Shipping | Copart vehicle pickup |
| `/texas-to-newark-port-auto-transport` | RelatedGuides card title | Copart Shipping | Copart export transport |
| `/texas-to-newark-port-auto-transport` | SEO related pill | Copart Shipping | Copart road move |
| `/what-is-a-bill-of-lading` | Guide related pill | Copart Shipping | Copart pickup details |

### `/dallas-to-port-houston-auto-transport` (4 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/pl/ports/houston` | Port Related Services | Dallas to Port Houston corridor | Z aukcji w Dallas do Houston |
| `/ports/houston` | Port Related Services | Dallas to Port Houston corridor | From Dallas auctions to Houston |
| `/ru/ports/houston` | Port Related Services | Dallas to Port Houston corridor | Из Далласа в порт Хьюстона |
| `/ua/ports/houston` | Port Related Services | Dallas to Port Houston corridor | З Далласа до порту Х'юстон |

### `/door-to-port-auto-transport` (28 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/atlanta-to-savannah-port-auto-transport` | SEO related pill | Door-to-Port Transport | Vehicle delivery to port |
| `/chicago-to-port-newark-car-shipping` | RelatedGuides card title | Door-to-Port Transport | Arranging port delivery |
| `/chicago-to-port-newark-car-shipping` | SEO related pill | Door-to-Port Transport | Pickup to export port |
| `/dallas-to-port-houston-auto-transport` | SEO related pill | Door-to-Port Transport | Port delivery service |
| `/electric-vehicle-port-delivery` | SEO related pill | Door-to-Port Transport | Car delivery to port |
| `/nj-export-warehouse-shipping-cost` | SEO related pill | Door-to-Port Transport | Delivery for export |
| `/pl/ports/baltimore` | Port Related Services | Door-to-port transport overview | Zaplanuj dostawę auta do Baltimore |
| `/pl/ports/houston` | Port Related Services | Door-to-port transport overview | Zaplanuj dostawę do portu Houston |
| `/pl/ports/los-angeles` | Port Related Services | Door-to-port transport overview | Dostawa do portu Los Angeles |
| `/pl/ports/newark` | Port Related Services | Door-to-port transport overview | Dostawa auta do portu Newark |
| `/pl/ports/savannah` | Port Related Services | Door-to-port transport overview | Jak dostarczyć auto do Savannah |
| `/ports/baltimore` | Port Related Services | Door-to-port transport overview | Getting your vehicle to Baltimore |
| `/ports/houston` | Port Related Services | Door-to-port transport overview | Getting a vehicle to Houston |
| `/ports/los-angeles` | Port Related Services | Door-to-port transport overview | Plan your Los Angeles port delivery |
| `/ports/newark` | Port Related Services | Door-to-port transport overview | Arrange delivery to Port Newark |
| `/ports/savannah` | Port Related Services | Door-to-port transport overview | Plan delivery to Savannah port |
| `/ru/ports/baltimore` | Port Related Services | Door-to-port transport overview | Доставка авто в Балтимор |
| `/ru/ports/houston` | Port Related Services | Door-to-port transport overview | Доставка авто в Хьюстон |
| `/ru/ports/los-angeles` | Port Related Services | Door-to-port transport overview | Доставка до порта Лос-Анджелеса |
| `/ru/ports/newark` | Port Related Services | Door-to-port transport overview | Как доставить авто в Ньюарк |
| `/ru/ports/savannah` | Port Related Services | Door-to-port transport overview | Как привезти авто в Саванну |
| `/texas-to-newark-port-auto-transport` | RelatedGuides card title | Door-to-Port Transport | Planning the port handoff |
| `/texas-to-newark-port-auto-transport` | SEO related pill | Door-to-Port Transport | Door-to-port service |
| `/ua/ports/baltimore` | Port Related Services | Door-to-port transport overview | Доставка авто до Балтимора |
| `/ua/ports/houston` | Port Related Services | Door-to-port transport overview | Доставка авто до Х'юстона |
| `/ua/ports/los-angeles` | Port Related Services | Door-to-port transport overview | Доставка до порту Лос-Анджелес |
| `/ua/ports/newark` | Port Related Services | Door-to-port transport overview | Як доставити авто до Ньюарка |
| `/ua/ports/savannah` | Port Related Services | Door-to-port transport overview | Як привезти авто до Саванни |

### `/enclosed-car-shipping` (4 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/pl/ports/los-angeles` | Port Related Services | Enclosed car shipping | Transport zamknięty do Los Angeles |
| `/ports/los-angeles` | Port Related Services | Enclosed car shipping | Enclosed moves to Los Angeles |
| `/ru/ports/los-angeles` | Port Related Services | Enclosed car shipping | Закрытый автовоз в Лос-Анджелес |
| `/ua/ports/los-angeles` | Port Related Services | Enclosed car shipping | Закритий автовоз у Лос-Анджелес |

### `/florida-car-shipping` (8 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/pl/ports/jacksonville` | Port Related Services | Florida car shipping services | Zaplanuj odbiór auta na Florydzie |
| `/pl/ports/savannah` | Port Related Services | Florida car shipping services | Odbiór auta na Florydzie |
| `/ports/jacksonville` | Port Related Services | Florida car shipping services | Plan your pickup in Florida |
| `/ports/savannah` | Port Related Services | Florida car shipping services | Explore Florida vehicle pickup |
| `/ru/ports/jacksonville` | Port Related Services | Florida car shipping services | Перевозка авто по Флориде |
| `/ru/ports/savannah` | Port Related Services | Florida car shipping services | Забрать автомобиль во Флориде |
| `/ua/ports/jacksonville` | Port Related Services | Florida car shipping services | Перевезення авто Флоридою |
| `/ua/ports/savannah` | Port Related Services | Florida car shipping services | Забрати автомобіль у Флориді |

### `/florida-to-jacksonville-port-car-shipping` (4 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/pl/ports/jacksonville` | Port Related Services | Florida auctions to JAXPORT corridor | Z Florydy do portu Jacksonville |
| `/ports/jacksonville` | Port Related Services | Florida auctions to JAXPORT corridor | Florida auctions to Jacksonville port |
| `/ru/ports/jacksonville` | Port Related Services | Florida auctions to JAXPORT corridor | Из Флориды в Джексонвилл |
| `/ua/ports/jacksonville` | Port Related Services | Florida auctions to JAXPORT corridor | Із Флориди до Джексонвілла |

### `/massachusetts-to-florida-car-shipping` (4 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/pl/ports/jacksonville` | Port Related Services | Massachusetts to Florida corridor | Z Massachusetts na Florydę |
| `/ports/jacksonville` | Port Related Services | Massachusetts to Florida corridor | Bring a Massachusetts car to Florida |
| `/ru/ports/jacksonville` | Port Related Services | Massachusetts to Florida corridor | Из Массачусетса во Флориду |
| `/ua/ports/jacksonville` | Port Related Services | Massachusetts to Florida corridor | З Массачусетсу до Флориди |

### `/new-jersey-auto-transport` (8 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/pl/ports/baltimore` | Port Related Services | New Jersey auto transport | New Jersey: odbiór przed eksportem |
| `/pl/ports/newark` | Port Related Services | New Jersey Auto Transport services | Transport aut w New Jersey |
| `/ports/baltimore` | Port Related Services | New Jersey auto transport | New Jersey pickup before port delivery |
| `/ports/newark` | Port Related Services | New Jersey Auto Transport services | New Jersey pickup options |
| `/ru/ports/baltimore` | Port Related Services | New Jersey auto transport | Забрать авто в Нью-Джерси |
| `/ru/ports/newark` | Port Related Services | New Jersey Auto Transport services | Перевозка авто по Нью-Джерси |
| `/ua/ports/baltimore` | Port Related Services | New Jersey auto transport | Забрати авто в Нью-Джерсі |
| `/ua/ports/newark` | Port Related Services | New Jersey Auto Transport services | Доставка авто в Нью-Джерсі |

### `/new-jersey-to-florida-car-shipping` (8 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/pl/ports/jacksonville` | Port Related Services | New Jersey to Florida corridor | Trasa z New Jersey na Florydę |
| `/pl/ports/newark` | Port Related Services | NJ to Florida corridor | Z New Jersey na Florydę |
| `/ports/jacksonville` | Port Related Services | New Jersey to Florida corridor | Shipping from New Jersey to Florida |
| `/ports/newark` | Port Related Services | NJ to Florida corridor | New Jersey to Florida transport |
| `/ru/ports/jacksonville` | Port Related Services | New Jersey to Florida corridor | Из Нью-Джерси во Флориду |
| `/ru/ports/newark` | Port Related Services | NJ to Florida corridor | Из Нью-Джерси во Флориду |
| `/ua/ports/jacksonville` | Port Related Services | New Jersey to Florida corridor | Маршрут з Нью-Джерсі до Флориди |
| `/ua/ports/newark` | Port Related Services | NJ to Florida corridor | З Нью-Джерсі до Флориди |

### `/ports/newark` (7 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/blog/port-specific-export-newark-houston-savannah` | Blog Related Services | Port Newark | Newark export terminal |
| `/chicago-to-port-newark-car-shipping` | SEO related pill | Port Newark | Newark arrival |
| `/door-to-port-auto-transport` | SEO related pill | Port Newark | Delivery to Newark |
| `/electric-vehicle-port-delivery` | SEO related pill | Port Newark | Newark port requirements |
| `/new-jersey-auto-transport` | SEO related pill | Port Newark | Newark port guide |
| `/nj-export-warehouse-shipping-cost` | SEO related pill | Port Newark | Newark delivery info |
| `/texas-to-newark-port-auto-transport` | SEO related pill | Port Newark | Newark handoff |

### `/quote` (10 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/auction-car-shipping` | SEO related pill | Get a Quote | Auction quote |
| `/car-shipping-cost` | SEO related pill | Get a Quote | Price my move |
| `/copart-shipping` | SEO related pill | Get a Quote | Copart quote |
| `/cybertruck-shipping` | SEO related pill | Get a Quote | Cybertruck quote |
| `/dealer-auto-transport` | SEO related pill | Get a Quote | Shipment quote |
| `/door-to-port-auto-transport` | SEO related pill | Get a Quote | Port delivery quote |
| `/ev-auto-transport` | SEO related pill | Get a Quote | EV quote |
| `/iaai-transport` | SEO related pill | Get a Quote | IAA quote |
| `/manheim-transport` | SEO related pill | Get a Quote | Pickup quote |
| `/tesla-car-shipping` | SEO related pill | Get a Quote | Tesla quote |

### `/ship-my-car` (19 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/blog/75000-bond-claims-guide` | Blog Related Services | Ship my car service | Personal car moves |
| `/blog/bill-of-lading-pickup-delivery-guide` | Blog Related Services | Ship my car | Car delivery service |
| `/blog/carrier-coi-verification-guide` | Blog Related Services | Ship my car service | Arrange car transport |
| `/blog/central-dispatch-listing-decoded` | Blog Related Services | Ship my car service | Book a personal move |
| `/blog/enclosed-transport-when-to-skip` | Blog Related Services | Ship my car | Transport for your car |
| `/blog/fmcsa-2026-new-rules` | Blog Related Services | Ship my car service | Shipping your own car |
| `/blog/fmcsa-broker-recordkeeping-2026` | Blog Related Services | Ship my car service | Your car shipment |
| `/blog/non-running-vehicle-shipping-playbook` | Blog Related Services | Ship my car | Plan your car shipment |
| `/blog/outbox-pattern-dispatch` | Blog Related Services | Ship my car service | Personal car delivery |
| `/blog/winter-auto-transport-pricing` | Blog Related Services | Ship my car | Seasonal car shipping |
| `/car-shipping-cost` | SEO related pill | Ship My Car | Personal shipping costs |
| `/enclosed-car-shipping` | SEO related pill | Ship My Car | Ship your own car |
| `/florida-car-shipping` | SEO related pill | Ship My Car | Snowbird moves |
| `/massachusetts-to-florida-car-shipping` | SEO related pill | Ship My Car | Seasonal moves |
| `/new-jersey-auto-transport` | SEO related pill | Ship My Car | Car relocation |
| `/newton-auto-transport` | SEO related pill | Ship My Car | Door-to-door |
| `/open-car-shipping` | SEO related pill | Ship My Car | Personal shipping |
| `/state-to-state-car-shipping` | SEO related pill | Ship My Car | Move your car |
| `/texas-auto-transport` | SEO related pill | Ship My Car | Ship a car home |

### `/state-to-state-car-shipping` (12 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/pl/ports/baltimore` | Port Related Services | State-to-state shipping | Transport między stanami do Baltimore |
| `/pl/ports/los-angeles` | Port Related Services | State-to-state shipping | Transport międzystanowy do Kalifornii |
| `/pl/ports/savannah` | Port Related Services | State-to-state shipping | Przez inne stany do Savannah |
| `/ports/baltimore` | Port Related Services | State-to-state shipping | Interstate routes into Baltimore |
| `/ports/los-angeles` | Port Related Services | State-to-state shipping | Long-distance routes into California |
| `/ports/savannah` | Port Related Services | State-to-state shipping | Interstate routes to Savannah |
| `/ru/ports/baltimore` | Port Related Services | State-to-state shipping | Через другие штаты в Балтимор |
| `/ru/ports/los-angeles` | Port Related Services | State-to-state shipping | Дальний маршрут до Калифорнии |
| `/ru/ports/savannah` | Port Related Services | State-to-state shipping | В Саванну из других штатов |
| `/ua/ports/baltimore` | Port Related Services | State-to-state shipping | Через інші штати до Балтимора |
| `/ua/ports/los-angeles` | Port Related Services | State-to-state shipping | Далекий маршрут до Каліфорнії |
| `/ua/ports/savannah` | Port Related Services | State-to-state shipping | Маршрут між штатами до Саванни |

### `/texas-auto-transport` (4 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/pl/ports/houston` | Port Related Services | Texas auto transport services | Odbiór aut w Teksasie |
| `/ports/houston` | Port Related Services | Texas auto transport services | Texas pickup and delivery options |
| `/ru/ports/houston` | Port Related Services | Texas auto transport services | Где забрать авто в Техасе |
| `/ua/ports/houston` | Port Related Services | Texas auto transport services | Де забрати авто в Техасі |

### `/texas-to-newark-port-auto-transport` (4 label changes)

| Source route | Surface | Before | After |
| --- | --- | --- | --- |
| `/pl/ports/houston` | Port Related Services | TX to Port Newark corridor | Z Teksasu do portu Newark |
| `/ports/houston` | Port Related Services | TX to Port Newark corridor | Shipping from Texas to Newark |
| `/ru/ports/houston` | Port Related Services | TX to Port Newark corridor | Из Техаса в порт Ньюарк |
| `/ua/ports/houston` | Port Related Services | TX to Port Newark corridor | З Техасу до порту Ньюарк |

## Port dictionary: all 108 exact final labels by locale

This appendix repeats the port subset from the destination-grouped register above in the dictionary’s locale/port organization. Each locale has the same six port keys and the same ordered destination keys: 27 entries per locale, 108 total. The short labels are not padded to meet an arbitrary word count. All hrefs remain exactly those already present in RELATED_BY_PORT.

### EN (27 entries)

| Port key | Existing destination | Exact final label |
| --- | --- | --- |
| newark | `/new-jersey-auto-transport` | New Jersey pickup options |
| newark | `/auction-to-port-transport` | Plan an auction-to-Newark move |
| newark | `/new-jersey-to-florida-car-shipping` | New Jersey to Florida transport |
| newark | `/door-to-port-auto-transport` | Arrange delivery to Port Newark |
| houston | `/dallas-to-port-houston-auto-transport` | From Dallas auctions to Houston |
| houston | `/texas-auto-transport` | Texas pickup and delivery options |
| houston | `/texas-to-newark-port-auto-transport` | Shipping from Texas to Newark |
| houston | `/auction-to-port-transport` | Plan your auction-to-Houston move |
| houston | `/door-to-port-auto-transport` | Getting a vehicle to Houston |
| savannah | `/atlanta-to-savannah-port-auto-transport` | From Atlanta auctions to Savannah |
| savannah | `/florida-car-shipping` | Explore Florida vehicle pickup |
| savannah | `/auction-to-port-transport` | Arrange auction pickup for Savannah |
| savannah | `/door-to-port-auto-transport` | Plan delivery to Savannah port |
| savannah | `/state-to-state-car-shipping` | Interstate routes to Savannah |
| los-angeles | `/state-to-state-car-shipping` | Long-distance routes into California |
| los-angeles | `/enclosed-car-shipping` | Enclosed moves to Los Angeles |
| los-angeles | `/auction-to-port-transport` | From auction yard to Los Angeles |
| los-angeles | `/door-to-port-auto-transport` | Plan your Los Angeles port delivery |
| baltimore | `/state-to-state-car-shipping` | Interstate routes into Baltimore |
| baltimore | `/auction-to-port-transport` | Arrange an auction-to-Baltimore move |
| baltimore | `/door-to-port-auto-transport` | Getting your vehicle to Baltimore |
| baltimore | `/new-jersey-auto-transport` | New Jersey pickup before port delivery |
| jacksonville | `/florida-to-jacksonville-port-car-shipping` | Florida auctions to Jacksonville port |
| jacksonville | `/florida-car-shipping` | Plan your pickup in Florida |
| jacksonville | `/massachusetts-to-florida-car-shipping` | Bring a Massachusetts car to Florida |
| jacksonville | `/new-jersey-to-florida-car-shipping` | Shipping from New Jersey to Florida |
| jacksonville | `/auction-to-port-transport` | From auction to JAXPORT |

### PL (27 entries)

| Port key | Existing destination | Exact final label |
| --- | --- | --- |
| newark | `/new-jersey-auto-transport` | Transport aut w New Jersey |
| newark | `/auction-to-port-transport` | Z aukcji do portu Newark |
| newark | `/new-jersey-to-florida-car-shipping` | Z New Jersey na Florydę |
| newark | `/door-to-port-auto-transport` | Dostawa auta do portu Newark |
| houston | `/dallas-to-port-houston-auto-transport` | Z aukcji w Dallas do Houston |
| houston | `/texas-auto-transport` | Odbiór aut w Teksasie |
| houston | `/texas-to-newark-port-auto-transport` | Z Teksasu do portu Newark |
| houston | `/auction-to-port-transport` | Auto z aukcji do Houston |
| houston | `/door-to-port-auto-transport` | Zaplanuj dostawę do portu Houston |
| savannah | `/atlanta-to-savannah-port-auto-transport` | Z Atlanty do portu Savannah |
| savannah | `/florida-car-shipping` | Odbiór auta na Florydzie |
| savannah | `/auction-to-port-transport` | Auto z aukcji do Savannah |
| savannah | `/door-to-port-auto-transport` | Jak dostarczyć auto do Savannah |
| savannah | `/state-to-state-car-shipping` | Przez inne stany do Savannah |
| los-angeles | `/state-to-state-car-shipping` | Transport międzystanowy do Kalifornii |
| los-angeles | `/enclosed-car-shipping` | Transport zamknięty do Los Angeles |
| los-angeles | `/auction-to-port-transport` | Z aukcji do Los Angeles |
| los-angeles | `/door-to-port-auto-transport` | Dostawa do portu Los Angeles |
| baltimore | `/state-to-state-car-shipping` | Transport między stanami do Baltimore |
| baltimore | `/auction-to-port-transport` | Z aukcji do portu Baltimore |
| baltimore | `/door-to-port-auto-transport` | Zaplanuj dostawę auta do Baltimore |
| baltimore | `/new-jersey-auto-transport` | New Jersey: odbiór przed eksportem |
| jacksonville | `/florida-to-jacksonville-port-car-shipping` | Z Florydy do portu Jacksonville |
| jacksonville | `/florida-car-shipping` | Zaplanuj odbiór auta na Florydzie |
| jacksonville | `/massachusetts-to-florida-car-shipping` | Z Massachusetts na Florydę |
| jacksonville | `/new-jersey-to-florida-car-shipping` | Trasa z New Jersey na Florydę |
| jacksonville | `/auction-to-port-transport` | Auto z aukcji do Jacksonville |

### RU (27 entries)

| Port key | Existing destination | Exact final label |
| --- | --- | --- |
| newark | `/new-jersey-auto-transport` | Перевозка авто по Нью-Джерси |
| newark | `/auction-to-port-transport` | С аукциона в порт Ньюарк |
| newark | `/new-jersey-to-florida-car-shipping` | Из Нью-Джерси во Флориду |
| newark | `/door-to-port-auto-transport` | Как доставить авто в Ньюарк |
| houston | `/dallas-to-port-houston-auto-transport` | Из Далласа в порт Хьюстона |
| houston | `/texas-auto-transport` | Где забрать авто в Техасе |
| houston | `/texas-to-newark-port-auto-transport` | Из Техаса в порт Ньюарк |
| houston | `/auction-to-port-transport` | С аукциона в Хьюстон |
| houston | `/door-to-port-auto-transport` | Доставка авто в Хьюстон |
| savannah | `/atlanta-to-savannah-port-auto-transport` | Из Атланты в порт Саванны |
| savannah | `/florida-car-shipping` | Забрать автомобиль во Флориде |
| savannah | `/auction-to-port-transport` | С аукциона до Саванны |
| savannah | `/door-to-port-auto-transport` | Как привезти авто в Саванну |
| savannah | `/state-to-state-car-shipping` | В Саванну из других штатов |
| los-angeles | `/state-to-state-car-shipping` | Дальний маршрут до Калифорнии |
| los-angeles | `/enclosed-car-shipping` | Закрытый автовоз в Лос-Анджелес |
| los-angeles | `/auction-to-port-transport` | С аукциона в Лос-Анджелес |
| los-angeles | `/door-to-port-auto-transport` | Доставка до порта Лос-Анджелеса |
| baltimore | `/state-to-state-car-shipping` | Через другие штаты в Балтимор |
| baltimore | `/auction-to-port-transport` | С аукциона в Балтимор |
| baltimore | `/door-to-port-auto-transport` | Доставка авто в Балтимор |
| baltimore | `/new-jersey-auto-transport` | Забрать авто в Нью-Джерси |
| jacksonville | `/florida-to-jacksonville-port-car-shipping` | Из Флориды в Джексонвилл |
| jacksonville | `/florida-car-shipping` | Перевозка авто по Флориде |
| jacksonville | `/massachusetts-to-florida-car-shipping` | Из Массачусетса во Флориду |
| jacksonville | `/new-jersey-to-florida-car-shipping` | Из Нью-Джерси во Флориду |
| jacksonville | `/auction-to-port-transport` | С аукциона до порта Джексонвилла |

### UA (27 entries)

| Port key | Existing destination | Exact final label |
| --- | --- | --- |
| newark | `/new-jersey-auto-transport` | Доставка авто в Нью-Джерсі |
| newark | `/auction-to-port-transport` | З аукціону до порту Ньюарк |
| newark | `/new-jersey-to-florida-car-shipping` | З Нью-Джерсі до Флориди |
| newark | `/door-to-port-auto-transport` | Як доставити авто до Ньюарка |
| houston | `/dallas-to-port-houston-auto-transport` | З Далласа до порту Х'юстон |
| houston | `/texas-auto-transport` | Де забрати авто в Техасі |
| houston | `/texas-to-newark-port-auto-transport` | З Техасу до порту Ньюарк |
| houston | `/auction-to-port-transport` | З аукціону до Х'юстона |
| houston | `/door-to-port-auto-transport` | Доставка авто до Х'юстона |
| savannah | `/atlanta-to-savannah-port-auto-transport` | З Атланти до порту Саванна |
| savannah | `/florida-car-shipping` | Забрати автомобіль у Флориді |
| savannah | `/auction-to-port-transport` | З аукціону до Саванни |
| savannah | `/door-to-port-auto-transport` | Як привезти авто до Саванни |
| savannah | `/state-to-state-car-shipping` | Маршрут між штатами до Саванни |
| los-angeles | `/state-to-state-car-shipping` | Далекий маршрут до Каліфорнії |
| los-angeles | `/enclosed-car-shipping` | Закритий автовоз у Лос-Анджелес |
| los-angeles | `/auction-to-port-transport` | З аукціону до Лос-Анджелеса |
| los-angeles | `/door-to-port-auto-transport` | Доставка до порту Лос-Анджелес |
| baltimore | `/state-to-state-car-shipping` | Через інші штати до Балтимора |
| baltimore | `/auction-to-port-transport` | З аукціону до Балтимора |
| baltimore | `/door-to-port-auto-transport` | Доставка авто до Балтимора |
| baltimore | `/new-jersey-auto-transport` | Забрати авто в Нью-Джерсі |
| jacksonville | `/florida-to-jacksonville-port-car-shipping` | Із Флориди до Джексонвілла |
| jacksonville | `/florida-car-shipping` | Перевезення авто Флоридою |
| jacksonville | `/massachusetts-to-florida-car-shipping` | З Массачусетсу до Флориди |
| jacksonville | `/new-jersey-to-florida-car-shipping` | Маршрут з Нью-Джерсі до Флориди |
| jacksonville | `/auction-to-port-transport` | З аукціону до порту Джексонвілл |

## Residual repetitions deliberately retained

### Protected RelatedArticles headings

All 44 RelatedArticles card anchors on 17 source pages remain unchanged. Their visible titles are H3 headings in BlogArticle.jsx (the related-card renderer at line 319), so they are protected rather than silently diversified. The following titles each occur on three source pages.

| Destination | Protected H3 title | Source pages | Source routes |
| --- | --- | --- | --- |
| `/blog/auction-to-port-cost-breakdown-2026` | The True Cost of Shipping a Car from Auction to Port: A 2026 Breakdown | 3 | `/blog/copart-for-international-buyers-complete-guide`, `/blog/exporter-documentation-checklist`, `/blog/port-specific-export-newark-houston-savannah` |
| `/blog/central-dispatch-listing-decoded` | How to Read a Central Dispatch Load Listing Like a Pro | 3 | `/blog/copart-storage-fees-real-cost-2026`, `/blog/outbox-pattern-dispatch`, `/blog/winter-auto-transport-pricing` |
| `/blog/copart-for-international-buyers-complete-guide` | The International Buyer’s Copart Playbook: Winning Bid to Destination Port | 3 | `/blog/auction-to-port-cost-breakdown-2026`, `/blog/exporter-documentation-checklist`, `/blog/port-specific-export-newark-houston-savannah` |
| `/blog/copart-iaa-manheim-comparison` | Copart vs IAA vs Manheim: Which Auction Platform Is Best for Your Use Case | 3 | `/blog/dealer-auction-pickup-guide`, `/blog/enclosed-transport-when-to-skip`, `/blog/non-running-vehicle-shipping-playbook` |
| `/blog/copart-storage-fees-real-cost-2026` | Copart Storage Fees: The Real Cost in 2026 (and How to Stop Being Surprised by Them) | 3 | `/blog/central-dispatch-listing-decoded`, `/blog/outbox-pattern-dispatch`, `/blog/winter-auto-transport-pricing` |
| `/blog/dealer-auction-pickup-guide` | Stop Losing Money on Auction Pickup: A Dealer's Guide to Faster Transport | 3 | `/blog/copart-iaa-manheim-comparison`, `/blog/enclosed-transport-when-to-skip`, `/blog/non-running-vehicle-shipping-playbook` |
| `/blog/enclosed-transport-when-to-skip` | Why Enclosed Transport Is Not Always the Right Choice (Even for Expensive Cars) | 3 | `/blog/copart-iaa-manheim-comparison`, `/blog/dealer-auction-pickup-guide`, `/blog/non-running-vehicle-shipping-playbook` |
| `/blog/exporter-documentation-checklist` | Auction to Port: The Documentation Checklist That Prevents Vessel Misses | 3 | `/blog/auction-to-port-cost-breakdown-2026`, `/blog/copart-for-international-buyers-complete-guide`, `/blog/port-specific-export-newark-houston-savannah` |
| `/blog/non-running-vehicle-shipping-playbook` | Shipping a Non-Running Vehicle: The Complete Playbook | 3 | `/blog/copart-iaa-manheim-comparison`, `/blog/dealer-auction-pickup-guide`, `/blog/enclosed-transport-when-to-skip` |
| `/blog/outbox-pattern-dispatch` | The Outbox Pattern: How We Stopped Losing Loads to Dead Events | 3 | `/blog/central-dispatch-listing-decoded`, `/blog/copart-storage-fees-real-cost-2026`, `/blog/winter-auto-transport-pricing` |
| `/blog/port-specific-export-newark-houston-savannah` | Understanding Port-Specific Export Process: Newark vs Houston vs Savannah | 3 | `/blog/auction-to-port-cost-breakdown-2026`, `/blog/copart-for-international-buyers-complete-guide`, `/blog/exporter-documentation-checklist` |
| `/blog/winter-auto-transport-pricing` | Winter Auto Transport: Why Rates Spike and How to Plan Around It | 3 | `/blog/central-dispatch-listing-decoded`, `/blog/copart-storage-fees-real-cost-2026`, `/blog/outbox-pattern-dispatch` |

### Protected footer

The footer remains unchanged. Its Copart service link occurs on 142 source pages: 82 EN, 20 PL, 20 RU, 20 UA. There is also one footer language-switcher EN self-link on /copart-shipping, for 143 footer anchors targeting /copart-shipping in total. The language-switcher link is not a second service navigation item.

| Exact footer label | Source pages | Role |
| --- | --- | --- |
| Copart Shipping | 82 | Stable service navigation |
| Transport z Copart | 20 | Stable service navigation |
| Доставка з Copart | 20 | Stable service navigation |
| Доставка с Copart | 20 | Stable service navigation |
| EN | 1 | Language-switcher self-link |

The footer’s stable service anchors are an explicit exception, not a failed diversification target. All other navigation, mobile CTA and contextual CTA strings are also unchanged. The 24 port-page certificate-of-origin links are contextual body links, not members of Related Services, and are excluded.

### Outside the original top-ten cohort: repeated clusters on at least five pages

These surviving editable related-label clusters are outside the approved original cohort. Their counts are case-insensitive, including case-only variants. They are reported without a recommendation or an expansion of the current patch. The enclosed destination’s port labels are localized, but its remaining non-port defaults stay out of scope.

| Destination | Representative existing label | Source pages | Source routes |
| --- | --- | --- | --- |
| `/dealer-auto-transport` | Dealer Auto Transport | 8 | `/auction-car-shipping`, `/auction-transport-savings`, `/blog/dealer-auction-pickup-guide`, `/blog/fmcsa-broker-recordkeeping-2026`, `/blog/outbox-pattern-dispatch`, `/manheim-transport`, `/new-jersey-to-florida-car-shipping`, `/open-vs-enclosed-auto-transport` |
| `/enclosed-car-shipping` | Enclosed Car Shipping | 8 | `/blog/75000-bond-claims-guide`, `/blog/carrier-coi-verification-guide`, `/blog/enclosed-transport-when-to-skip`, `/cybertruck-shipping`, `/ev-auto-transport`, `/open-car-shipping`, `/open-vs-enclosed-auto-transport`, `/tesla-car-shipping` |
| `/manheim-transport` | Manheim Transport | 7 | `/atlanta-to-savannah-port-auto-transport`, `/auction-car-shipping`, `/auction-transport-savings`, `/blog/copart-iaa-manheim-comparison`, `/dealer-auto-transport`, `/how-to-ship-a-car-bought-at-auction`, `/iaai-transport` |
| `/iaai-transport` | IAA Transport | 6 | `/auction-car-shipping`, `/auction-transport-savings`, `/blog/copart-iaa-manheim-comparison`, `/copart-shipping`, `/dealer-auto-transport`, `/manheim-transport` |
| `/manheim-transport` | Manheim Auction Transport | 5 | `/atlanta-to-savannah-port-auto-transport`, `/auction-car-shipping`, `/copart-shipping`, `/dealer-auto-transport`, `/iaai-transport` |
| `/open-car-shipping` | Open Car Shipping | 5 | `/blog/enclosed-transport-when-to-skip`, `/car-shipping-cost`, `/enclosed-car-shipping`, `/open-vs-enclosed-auto-transport`, `/state-to-state-car-shipping` |

### Low-concentration existing clusters: three or four source pages

These unchanged clusters remain below the selection threshold. This table includes both original-cohort and other destinations so residual repetition is visible rather than mistaken for newly introduced duplication.

| Destination | Representative existing label | Source pages | Approved original cohort? |
| --- | --- | --- | --- |
| `/auction-transport-savings` | Auction Transport Savings | 4 | No |
| `/door-to-port-auto-transport` | Port Delivery | 4 | Yes |
| `/electric-vehicle-port-delivery` | EV Port Delivery | 4 | No |
| `/ev-auto-transport` | EV Auto Transport | 4 | No |
| `/iaai-transport` | IAA Auction Transport | 4 | No |
| `/iaai-transport` | IAAI Transport | 4 | No |
| `/salvage-car-shipping` | Salvage Car Shipping | 4 | No |
| `/state-to-state-car-shipping` | State-to-state car shipping | 4 | Yes |
| `/tesla-car-shipping` | Tesla Car Shipping | 4 | No |
| `/auction-to-port-transport` | Auction to Port Transport | 3 | Yes |
| `/boston-car-shipping` | Boston Car Shipping | 3 | No |
| `/certificate-of-origin` | Certificate of Origin (0% EU duty) | 3 | No |
| `/copart-gate-pass-guide` | Copart Gate Pass Guide | 3 | No |
| `/copart-international-shipping` | Copart International Shipping | 3 | No |
| `/dealers` | Dealer program | 3 | No |
| `/door-to-port-auto-transport` | Door-to-Port Auto Transport | 3 | Yes |
| `/door-to-port-auto-transport` | Door-to-Port Transport | 3 | Yes |
| `/florida-car-shipping` | Florida Car Shipping | 3 | Yes |
| `/massachusetts-car-shipping` | Massachusetts Car Shipping | 3 | No |
| `/massachusetts-to-florida-car-shipping` | MA to FL | 3 | No |
| `/massachusetts-to-florida-car-shipping` | MA to FL Shipping | 3 | No |
| `/ports/houston` | Port Houston | 3 | No |
| `/texas-to-newark-port-auto-transport` | Texas → Port Newark | 3 | No |
