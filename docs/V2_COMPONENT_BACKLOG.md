# V2 Component & Copy Backlog

One queue for everything the DESIGN-V2 waves deliberately did NOT touch.
Each item ships in its own small wave/commit with the usual verification
ritual; none of these may ride inside an unrelated design wave.

## Frozen V1 component islands (visual)

| Component | Where it shows | State | Wave |
|---|---|---|---|
| ~~TransportComparison~~ | /ship-my-car | CLOSED CLEANUP-T01: natively V2, island retired | done |
| ~~ProcessTimeline~~ | /ship-my-car, /quote | CLOSED W5-T02b: V2 restyle, ungated stagger deleted | done |
| ~~Blog category badges~~ | /blog index + articles | CLOSED CLEANUP-T02: mono hairline chips, zero red; color data orphaned | done |
| Blog banner illustrations | /blog article banners (BANNER_MAP SVGs) | V1 palette (purple/rust/teal) — NEW LOG from CLEANUP-T02; needs its own ruling | blog content wave |
| ~~AnimatedLogo~~ | chrome (header/footer) | CLOSED CLEANUP-T06c: sanctioned brand mark (DESIGN.md section-4 exemption) | done |
| ~~HeroRouteVisual~~ | intl Home LPs x3 | CLOSED W6-T00: own module, V2 on-dark tokens | done |
| ~~Icon library sienna defaults~~ | src/components/icons/* | CLOSED W6-T05: default currentColor, call sites audited | done |
| QuoteForm internal trust-row | /quote form island | V1 diamond glyphs + sienna accents inside the sanctioned island | component mini-wave |

## Copy backlog (x4-locale commits, ranking-impact review where marked)

| String | Where | Issue |
|---|---|---|
| ~~"267+ CARRIERS"~~ | blog index hero stat | CLOSED W5-T07: aligned to "700+" (pre-authorized) |
| ~~"Open vs Enclosed Transport" H2 + card copy~~ | TransportComparison | CLOSED CLEANUP-T04: transportComparison namespace x4 |
| ~~"Buying at auction? Copart guide"~~ | ShipMyCar crosslinks | CLOSED CLEANUP-T04: i18n x4 |
| ~~Services card/link titles+descs~~ | /services catalogs | CLOSED CLEANUP-T04: services.cards.* x4 (30 cards) |
| Duplicate "Transparent Pricing" card title | Home Advantages (benefits+whyY7 merge) | pre-existing duplicate; merging needs ranking review |
| Em dashes in 2 card descriptions | Home Advantages (multilingualDesc, quoteAnywhereDesc) | Em-Dash Ban vs frozen ranking copy |
| Em dashes pervasive in native intl copy | all 9 intl LPs (RU/PL/UA) + processTimeline.json EN step 2 | W6 native-copy LOG: needs language-capable copy pass (NOT a punctuation sweep) |
| Emoji icons in RU data arrays | RussiaHome services (5), RussiaShipMyCar why-Y7 (3) | colorful glyphs on restrained V2 board; candidate for hairline SVG marks |
| ~~Stat-numeral idiom divergence~~ | intl homes | CLOSED W6-T05a review ruling: ink/white everywhere |
| Fee model fact fork | portal ind_2026 = max($75,10%) vs CLAUDE.md "$40-60" | docs reconciliation, no UI change |

## Deferred functional work

| Item | Origin |
|---|---|
| ~~QuoteStrip interactive selects~~ | CLOSED T13: shipped as the rate calculator |
| V1 May-Jun CD loads export -> src/data/rates/ append + regen | W2-T12, pending Sergii's dashboard export (1,524 total) |
| ~~/quote real submit test (fixture id=9)~~ | CLOSED W5 Phase 2: payload-equivalence + curl replay, pending_id 69/70 (CORS blocks browser path from preview) |

## New LOGs from V2-CLEANUP (this sprint)

| Item | Detail |
|---|---|
| Sole-content centered bands vs the T06 rule | exporters formShell + ship-my-car BOL callout are deliberately centered sole-content compositions; the new DESIGN.md section-6 law requires an explicit ruling — Sergii decides at review |
| theme.js blogPurple/Blue/Brown | orphaned by CLEANUP-T02 (no consumers); remove in a theme-hygiene pass |

## Remaining open (post-CLEANUP target state)

W7 PORTAL (final wave) · multipliers/V1-loads from Sergii's CD export (T13/W2-T12) ·
fee-model doc fork (awaiting ruling) · W6 native-copy LOGs (language review) ·
new LOGs above. Pre-existing stragglers still open and outside that list, flagged
honestly: QuoteForm internal trust-row (component mini-wave), RU emoji icon arrays
(intl copy pass), duplicate "Transparent Pricing" (ranking review), Home Advantages
em dashes (frozen ranking copy).
