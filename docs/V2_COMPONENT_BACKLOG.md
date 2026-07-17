# V2 Component & Copy Backlog

One queue for everything the DESIGN-V2 waves deliberately did NOT touch.
Each item ships in its own small wave/commit with the usual verification
ritual; none of these may ride inside an unrelated design wave.

## Frozen V1 component islands (visual)

| Component | Where it shows | State | Wave |
|---|---|---|---|
| TransportComparison | /ship-my-car (cream island on board band, W4-T03) | V1 internals: hardcoded EN H2 "Open vs Enclosed Transport", #fff cards, sienna badge/price | component mini-wave |
| ~~ProcessTimeline~~ | /ship-my-car, /quote | CLOSED W5-T02b: V2 restyle, ungated stagger deleted | done |
| Blog category badges | /blog index + articles | V1 palette (blogPurple/Blue/Brown) rides in via JSX data | blog content wave |
| AnimatedLogo | chrome (header/footer) | Georgia wordmark; --color-accent scoped red since W2 | brand decision: keep serif wordmark or cut a V2 mark |
| ~~HeroRouteVisual~~ | intl Home LPs x3 | CLOSED W6-T00: own module, V2 on-dark tokens | done |
| Icon library sienna defaults | src/components/icons/* (54 files default color '#993C1D') | V2 pages calling without a color prop leak V1 sienna (About/Contact/FAQ/Exporters/DealerQuote + portal); W6-T03 patched UA call sites with currentColor | component mini-wave: default to currentColor + audit all call sites incl. portal |
| QuoteForm internal trust-row | /quote form island | V1 diamond glyphs + sienna accents inside the sanctioned island | component mini-wave |

## Copy backlog (x4-locale commits, ranking-impact review where marked)

| String | Where | Issue |
|---|---|---|
| ~~"267+ CARRIERS"~~ | blog index hero stat | CLOSED W5-T07: aligned to "700+" (pre-authorized) |
| "Open vs Enclosed Transport" H2 + card copy | TransportComparison | hardcoded EN on all 4 locales |
| "Buying at auction? Copart guide" | ShipMyCar crosslinks | hardcoded EN |
| Services card/link titles+descs | /services catalogs | hardcoded EN (kickers/headings are i18n, cards are not) |
| Duplicate "Transparent Pricing" card title | Home Advantages (benefits+whyY7 merge) | pre-existing duplicate; merging needs ranking review |
| Em dashes in 2 card descriptions | Home Advantages (multilingualDesc, quoteAnywhereDesc) | Em-Dash Ban vs frozen ranking copy |
| Em dashes pervasive in native intl copy | all 9 intl LPs (RU/PL/UA) + processTimeline.json EN step 2 | Em-Dash Ban vs frozen native copy; needs language-capable copy pass |
| Emoji icons in RU data arrays | RussiaHome services (5), RussiaShipMyCar why-Y7 (3) | colorful glyphs on restrained V2 board; candidate for hairline SVG marks |
| Stat-numeral idiom divergence | PolandHome (red trustRow numerals) vs RussiaHome/UkraineHome (ink/white) | reviewer to pick one idiom for intl homes |
| Fee model fact fork | portal ind_2026 = max($75,10%) vs CLAUDE.md "$40-60" | docs reconciliation, no UI change |

## Deferred functional work

| Item | Origin |
|---|---|
| ~~QuoteStrip interactive selects~~ | CLOSED T13: shipped as the rate calculator |
| V1 May-Jun CD loads export -> src/data/rates/ append + regen | W2-T12, pending Sergii's dashboard export (1,524 total) |
| ~~/quote real submit test (fixture id=9)~~ | CLOSED W5 Phase 2: payload-equivalence + curl replay, pending_id 69/70 (CORS blocks browser path from preview) |
