# V2 Component & Copy Backlog

One queue for everything the DESIGN-V2 waves deliberately did NOT touch.
Each item ships in its own small wave/commit with the usual verification
ritual; none of these may ride inside an unrelated design wave.

## Frozen V1 component islands (visual)

| Component | Where it shows | State | Wave |
|---|---|---|---|
| TransportComparison | /ship-my-car (cream island on board band, W4-T03) | V1 internals: hardcoded EN H2 "Open vs Enclosed Transport", #fff cards, sienna badge/price | component mini-wave |
| ProcessTimeline | /ship-my-car | paints own V1 #EFECE6 surface (tonal seam on manifest); inline --i stagger | component mini-wave |
| Blog category badges | /blog index + articles | V1 palette (blogPurple/Blue/Brown) rides in via JSX data | blog content wave |
| AnimatedLogo | chrome (header/footer) | Georgia wordmark; --color-accent scoped red since W2 | brand decision: keep serif wordmark or cut a V2 mark |

## Copy backlog (x4-locale commits, ranking-impact review where marked)

| String | Where | Issue |
|---|---|---|
| ~~"267+ CARRIERS"~~ | blog index hero stat | CLOSED W5-T07: aligned to "700+" (pre-authorized) |
| "Open vs Enclosed Transport" H2 + card copy | TransportComparison | hardcoded EN on all 4 locales |
| "Buying at auction? Copart guide" | ShipMyCar crosslinks | hardcoded EN |
| Services card/link titles+descs | /services catalogs | hardcoded EN (kickers/headings are i18n, cards are not) |
| Duplicate "Transparent Pricing" card title | Home Advantages (benefits+whyY7 merge) | pre-existing duplicate; merging needs ranking review |
| Em dashes in 2 card descriptions | Home Advantages (multilingualDesc, quoteAnywhereDesc) | Em-Dash Ban vs frozen ranking copy |
| Fee model fact fork | portal ind_2026 = max($75,10%) vs CLAUDE.md "$40-60" | docs reconciliation, no UI change |

## Deferred functional work

| Item | Origin |
|---|---|
| ~~QuoteStrip interactive selects~~ | CLOSED T13: shipped as the rate calculator |
| V1 May-Jun CD loads export -> src/data/rates/ append + regen | W2-T12, pending Sergii's dashboard export (1,524 total) |
| /quote real submit test (fixture id=9) | IN W5 Phase 2 verification (this wave) |
