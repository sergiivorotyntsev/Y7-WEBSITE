# CODEX-22: Related Guides Pre-Implementation Audit

Audit date: 2026-09-08. Repository: `C:/dev/Y7-WEBSITE`. Inspected HEAD: `2357bb7832d459829314b6434f8406b8cabeea6b`.

## Status and scope

FACT: This was a read-only audit of `src/data/relatedGuides.js`, its consumers, relevant destination content, and existing generated HTML. No repository sources were edited, and no build was run. This report is outside the repository.

FACT: The data file contains **102 description entries, 40 unique description strings, 41 destination/string pairs, and 27 source route keys**. The inventory below lists every entry by exact source line. Repeated strings are grouped without omitting occurrences.

FACT: `RelatedGuides` is imported only by `src/pages/seo/SeoLandingPage.jsx:9`. That template selects `RELATED_GUIDES[meta.path]` at line 145 and renders the component at line 268. `src/components/RelatedGuides.jsx:4-5` suppresses the section when no links are supplied. Its heading and descriptions are English-only; it has no translation lookup.

FACT: Existing `dist/valid-routes.json` contains 143 routes. A read-only scan of each existing route HTML found the Related Guides section on exactly **27 routes** and the exact Manheim contract-pricing description on exactly **5 routes**, not approximately 23.

## Interpretation and limitations

- `MATCH` means the description agrees with the destination's current repository content. It is not independent verification of every operational, technical, geographic, or legal claim made by that destination.
- `MISMATCH` identifies a conflict with the owner's CODEX-22 confirmations or an explicit condition in the current destination content.
- The owner confirmations in section B of the pasted CODEX-22 request are authoritative for this task, including the absence of contract or volume pricing.
- Existing generated HTML was inspected, not regenerated; the reported runtime counts describe that existing artifact and are also consistent with the source matrix.
- No external legal or technical research was performed. This is a repository-content consistency audit.

## E3: Complete description inventory

All line numbers in the first column refer to `src/data/relatedGuides.js`. All evidence paths are repository-relative. The single repeated string mapped to two destinations, `Inland US to Newark export terminal.`, has two rows so each destination is checked independently.

| Source lines | Destination | Exact current description | Verdict and source evidence |
|---|---|---|---|
| 21 | `/iaai-transport` | `Pickup from IAA salvage auction yards nationwide.` | MATCH: `src/pages/seo/IaaiTransport.jsx:26,30` describes nationwide IAA salvage pickup. |
| 22, 29, 42, 151, 176 | `/manheim-transport` | `Dealer auction shipping with contract pricing.` | MISMATCH: owner confirmation B3 says no contract pricing exists. The destination itself remains stale; see the protected-content conflict below. |
| 23, 41, 58 | `/auction-transport-savings` | `Where auction shipping fees actually go, and how to cut them.` | MATCH: `src/pages/seo/AuctionTransportSavings.jsx:106-107,124` explains broker-direct pricing and avoiding hidden carrier-rate markup. |
| 24, 70 | `/how-to-ship-a-car-bought-at-auction` | `Step-by-step from winning bid to delivery.` | MATCH: `src/pages/seo/guides/HowToShipAuctionCar.jsx:13,40` describes the same purchase-to-delivery guide. |
| 25, 59 | `/texas-to-newark-port-auto-transport` | `Texas auction pickups delivered to the Newark export terminal.` | MATCH: `src/pages/seo/routes/TexasToNewark.jsx:18,28,30,44` covers Texas auction pickup and Newark/Elizabeth warehouse delivery. Terminal is broad shorthand consistent with the destination's framing; no newly demonstrated false claim was found. |
| 28, 35, 40, 55, 68, 139, 145, 153, 158, 177, 192 | `/copart-shipping` | `Vehicle transport from Copart auctions.` | MATCH: `src/pages/seo/CopartShipping.jsx:132,136`, including the current SEOGEO-21 refocus. |
| 30, 163 | `/salvage-car-shipping` | `Inoperable and salvage vehicle transport.` | MATCH: `src/pages/seo/SalvageCarShipping.jsx:15-16`. |
| 31, 37, 178, 193 | `/auction-car-shipping` | `General auction pickup nationwide.` | MATCH: `src/pages/seo/AuctionCarShipping.jsx:67,79-83,101` describes domestic auction transport. Nationwide describes geography; it does not promise acceptance from every auction. |
| 34 | `/dealer-auto-transport` | `Volume pricing for dealerships.` | MISMATCH: `src/pages/seo/DealerAutoTransport.jsx:38,47,110-111` now describes a fixed Y7 fee and separate carrier rate. Owner B3 confirms no volume tiers. |
| 36, 56, 191 | `/iaai-transport` | `Pickup from IAA salvage auction yards.` | MATCH: `src/pages/seo/IaaiTransport.jsx:26,30`. |
| 43, 50, 96, 138, 144, 150, 156, 162, 170 | `/auction-to-port-transport` | `Auction pickup straight to a US export port.` | MATCH: `src/pages/seo/routes/AuctionToPort.jsx:26,30,43` retains domestic pickup to a nominated warehouse or port. The description omits the warehouse option but does not contradict it. |
| 51, 57, 95, 136, 143 | `/door-to-port-auto-transport` | `Vehicle delivery to major US export ports.` | MATCH: `src/pages/seo/DoorToPort.jsx:38-43`; the cost/transit refocus did not remove the service. |
| 52 | `/nj-export-warehouse-shipping-cost` | `How carrier pricing to the NJ export warehouses is formed.` | MATCH: `src/pages/seo/NjExportWarehouseShippingCost.jsx:29-34`. |
| 60 | `/chicago-to-port-newark-car-shipping` | `Midwest auction pickups delivered to the Newark export terminal.` | MATCH: `src/pages/seo/routes/ChicagoToNewark.jsx:18,64,87-99` describes this Midwest auction export corridor and warehouse handoff. |
| 61, 173 | `/certificate-of-origin` | `0% EU import duty on US-built vehicles; Y7 files the eCO as standing agent.` | MISMATCH: material qualification is missing. `src/locales/en/certificateOfOrigin.json:11,16,22-23,127` requires shipment-specific eligibility, US origin, and direct transport; it does not promise a blanket duty outcome for every US-built vehicle. Standing-agent wording is supported at `:7,131`. `src/pages/seo/CertificateOfOrigin.jsx:28-30` expressly prohibits promising a duty outcome. See the figure-preservation constraint below. |
| 67 | `/auction-car-shipping` | `General auction pickup from any US auction.` | MISMATCH: `src/pages/seo/AuctionCarShipping.jsx:198-202` requires review before accepting an independent-auction order, including whether the seller releases to third-party carriers and which pickup documents are available. |
| 69, 188 | `/car-shipping-cost` | `How auto transport pricing works.` | MATCH: `src/pages/seo/CarShippingCost.jsx:49-50,80`. |
| 75, 88, 93, 182 | `/ev-auto-transport` | `Specialized transport for any electric vehicle.` | MATCH TO PAGE: `src/pages/seo/EVAutoTransport.jsx:45-46` uses all-EV positioning; brands are listed at `:5-14`, oversized equipment at `:51`, and flatbed service at `:148`. No independent compatibility verification was performed. |
| 76, 82 | `/cybertruck-shipping` | `Heavy-duty carriers for the Cybertruck.` | MATCH: `src/pages/seo/CybertruckShipping.jsx:33,35,40,124`. |
| 77, 83, 90, 171 | `/electric-vehicle-port-delivery` | `Electric vehicle delivery to US export ports.` | MATCH: `src/pages/seo/ElectricVehiclePortDelivery.jsx:41-42,46`. |
| 78, 84 | `/enclosed-car-shipping` | `Premium covered transport for high-value EVs.` | MATCH: `src/pages/seo/EnclosedCarShipping.jsx:10,15-16` covers high-value vehicles generally; the linking EV pages explicitly support enclosed transport for high-value EVs at `TeslaCarShipping.jsx:49,113` and `EVAutoTransport.jsx:52`. |
| 81, 87, 94, 181 | `/tesla-car-shipping` | `Specialized transport for every Tesla model.` | MATCH: `src/pages/seo/TeslaCarShipping.jsx:35,40,43,45` lists Model S/3/X/Y/Cybertruck. |
| 89, 186 | `/enclosed-car-shipping` | `Premium covered transport for high-value vehicles.` | MATCH: `src/pages/seo/EnclosedCarShipping.jsx:10,15-16`. |
| 101, 111 | `/boston-car-shipping` | `Auto transport from Boston to anywhere in the US.` | MATCH: `src/pages/seo/locations/BostonCarShipping.jsx:19-23,30-31,50,58` covers interstate routes and door-to-door destination delivery. No geographic exclusion was found. |
| 102, 107 | `/newton-auto-transport` | `Local Newton, MA pickup and delivery.` | MATCH: `src/pages/seo/locations/NewtonAutoTransport.jsx:41,55` covers Newton/Greater Boston from the Natick-based brokerage. |
| 103, 113 | `/massachusetts-to-florida-car-shipping` | `Snowbird-friendly MA → FL corridor.` | MATCH: `src/pages/seo/routes/MassachusettsToFlorida.jsx:18,52,60,64`. |
| 106, 112, 127 | `/massachusetts-car-shipping` | `Statewide MA auto transport coverage.` | MATCH: `src/pages/seo/locations/MassachusettsCarShipping.jsx:15-16,44`. |
| 108 | `/massachusetts-to-florida-car-shipping` | `High-volume MA → FL corridor.` | MATCH: `src/pages/seo/routes/MassachusettsToFlorida.jsx:18` describes the busiest snowbird corridor and high vehicle flow. |
| 118 | `/massachusetts-to-florida-car-shipping` | `Snowbird-friendly Massachusetts to Florida route.` | MATCH: `src/pages/seo/routes/MassachusettsToFlorida.jsx:18,52,60,64`. |
| 119, 125 | `/new-jersey-to-florida-car-shipping` | `New Jersey to Florida auto transport.` | MATCH: `src/pages/seo/routes/NewJerseyToFlorida.jsx:17-18`. |
| 120, 187 | `/state-to-state-car-shipping` | `Cross-country auto transport for any route.` | MATCH TO PAGE: `src/pages/seo/StateToState.jsx:15-16,68-69` describes nationwide interstate coverage. |
| 126, 131, 165 | `/florida-car-shipping` | `Auto transport into and out of Florida.` | MATCH: `src/pages/seo/locations/FloridaCarShipping.jsx:15-16,71`. |
| 130 | `/massachusetts-to-florida-car-shipping` | `Massachusetts to Florida snowbird corridor.` | MATCH: `src/pages/seo/routes/MassachusettsToFlorida.jsx:18`. |
| 132 | `/new-jersey-auto-transport` | `Statewide NJ auto transport coverage.` | MATCH: `src/pages/seo/locations/NewJerseyAutoTransport.jsx:17`. |
| 135 | `/chicago-to-port-newark-car-shipping` | `Inland US to Newark export terminal.` | MATCH: `src/pages/seo/routes/ChicagoToNewark.jsx:18,31,45,64`. Broad geographic summary, not a promise of a different route. |
| 137, 159 | `/texas-auto-transport` | `Statewide Texas auto transport coverage.` | MATCH: `src/pages/seo/locations/TexasAutoTransport.jsx:16,42`. |
| 142, 172 | `/texas-to-newark-port-auto-transport` | `Inland US to Newark export terminal.` | MATCH: `src/pages/seo/routes/TexasToNewark.jsx:18,30,44`. |
| 152 | `/florida-to-jacksonville-port-car-shipping` | `Florida auction pickups delivered to the Jacksonville port.` | MATCH: `src/pages/seo/routes/FloridaToJacksonville.jsx:17-18,32`. |
| 157 | `/texas-to-newark-port-auto-transport` | `The long-haul alternative when Newark fits the destination.` | MATCH: `src/pages/seo/routes/TexasToNewark.jsx:18,43-44` covers the Texas-Newark long-haul route; the description is appropriately conditional. |
| 164 | `/atlanta-to-savannah-port-auto-transport` | `Southeast auction pickups delivered to the Savannah port.` | MATCH: `src/pages/seo/routes/AtlantaToSavannah.jsx:17-18`. |
| 183 | `/open-car-shipping` | `Cost-effective open-trailer transport.` | MATCH: `src/pages/seo/OpenCarShipping.jsx:15-16,54`. |

## Exact existing runtime consumers

The following **27 routes** contain the Related Guides section in existing generated HTML. These also constitute the 27 source matrix keys.

```text
/enclosed-car-shipping
/auction-car-shipping
/auction-transport-savings
/copart-shipping
/iaai-transport
/manheim-transport
/door-to-port-auto-transport
/dealer-auto-transport
/salvage-car-shipping
/open-car-shipping
/massachusetts-car-shipping
/boston-car-shipping
/newton-auto-transport
/florida-car-shipping
/massachusetts-to-florida-car-shipping
/new-jersey-to-florida-car-shipping
/texas-to-newark-port-auto-transport
/chicago-to-port-newark-car-shipping
/auction-to-port-transport
/atlanta-to-savannah-port-auto-transport
/dallas-to-port-houston-auto-transport
/florida-to-jacksonville-port-car-shipping
/tesla-car-shipping
/ev-auto-transport
/cybertruck-shipping
/electric-vehicle-port-delivery
/certificate-of-origin
```

The exact current string `Dealer auction shipping with contract pricing.` appears in built HTML on these **5 routes**:

```text
/auction-car-shipping
/copart-shipping
/iaai-transport
/dealer-auto-transport
/atlanta-to-savannah-port-auto-transport
```

Additional description corrections would affect:

| Description | Source routes | Route count |
|---|---|---:|
| Dealer volume pricing | `/manheim-transport` | 1 |
| Any US auction | `/auction-transport-savings` | 1 |
| CO duty qualification | `/auction-to-port-transport`, `/door-to-port-auto-transport` | 2 |

All four description corrections together would affect **9 distinct routes**. This is the affected-card count, not the count of every page displaying any Related Guides section.

FACT: No `/ru`, `/pl`, or `/ua` HTML snapshot renders this section. Localized certificate pages pass a localized `meta.path` and have no corresponding matrix key. The matrix has no localized copies requiring parallel string edits.

## Proposed description corrections, not applied

| Lines | Proposed replacement | Claim source |
|---|---|---|
| 22, 29, 42, 151, 176 | `Dealer auction pickups and delivery coordination.` | `ManheimTransport.jsx:25,74-75,79,83`: auction pickup, release coordination, and delivery handoff; no contract or volume price claim. |
| 34 | `Auction pickups, dealer trades, and deliveries.` | `DealerAutoTransport.jsx:38,43,47` and service offers at `:58-70`. |
| 67 | `Auction pickup and independent-auction review.` | `AuctionCarShipping.jsx:198-202`. |
| 61, 173 | `0% EU duty eligibility for US-origin vehicles; Y7 files the eCO as agent.` | Repository-only basis: `src/locales/en/certificateOfOrigin.json:11,16,22-23,127,131`. This preserves `0%` and replaces a blanket outcome with eligibility. It does not externally validate the legal rule. |

The proposals are pending resolution of the task's stop conditions. They are not implemented or visually validated.

## Blocker 1: Global zero-claim check conflicts with protected metadata

FACT: Section J requires zero built-HTML `contract pricing` and one-hour equivalents, while sections D/G/I protect metadata and prohibit edits outside the listed claim surfaces. These requirements cannot all be satisfied by the authorized description-only change.

Protected and out-of-scope occurrences in `src/pages/seo/ManheimTransport.jsx`:

| Line | Field | Current text |
|---|---|---|
| 19 | Protected meta description | `Vehicle transport from Manheim dealer auctions. Contract pricing for dealerships, nationwide coverage. Licensed auto transport broker Y7 Logistics.` |
| 29 | TLDR | Ends with `with volume rate tiers for recurring dealer lanes.` |
| 54 | Capability | `Dealer volume pricing` |
| 62 | FAQ question | `Do you offer dealer volume pricing?` |
| 63 | FAQ answer and generated schema | `Yes, dealers with regular shipping needs get contract rates. The more you ship, the better your per-vehicle cost.` |
| 189 | Protected H2 | `Volume Pricing: How Consistent Shipping Lowers Your Cost` |
| 191-206 | Body | Related lane/volume pricing narrative remains present. |

Additional protected one-hour equivalent encountered during destination review:

- `src/pages/seo/routes/MassachusettsToFlorida.jsx:12`, meta description: `MA to FL car shipping on the #1 snowbird corridor. Boston to Miami, Orlando, Tampa. Licensed FMCSA broker. Free quote in 1 hour.`

DECISION REQUIRED: Either narrow acceptance to the authorized surfaces and track protected residual claims separately, or explicitly authorize a separate ranking-impact-reviewed metadata/heading/content correction. This audit does not assume permission for either option.

## Implementation constraint: CO qualification correction must preserve the 0% figure

FACT: The current CO descriptions contain the figure `0%`. Section I says to preserve every figure. Replacing those descriptions with documentation-only copy that removes `0%` would therefore conflict with the preservation requirement, even if it avoided a legal outcome claim.

DECISION: Do not remove or alter `0%` under the present specification. A qualification-only proposal can preserve the figure, for example `0% EU duty eligibility for US-origin vehicles; Y7 files the eCO as agent.` Its basis is exclusively the current destination's repository content, not a new legal conclusion or external legal verification. If the owner requires removal of the percentage instead, explicit authorization to relax figure preservation is needed.

FACT: The destination itself supplies the relevant qualification at `src/locales/en/certificateOfOrigin.json:11,16,22-23,127`, including shipment-specific eligibility and the direct-transport condition. The description can be qualified without changing the destination's metadata, headings, or figures. This does not require a separate owner decision if the figure is preserved. No such change has been applied while the wider section D/J conflict remains unresolved.

## Other cross-scope observation

The following content describes different warehouse-selection ownership, which may reflect distinct workflows but cannot be reconciled from this task's owner facts:

- `src/pages/seo/AuctionCarShipping.jsx:127,158`: exporter portal orders receive a destination assigned from the account's registered warehouse network after document review.
- `src/pages/seo/routes/AuctionToPort.jsx:30,138-144`: the customer/forwarder nominates the destination, and Y7 does not operate a preferred warehouse network.

OPEN QUESTION: Are these deliberately different workflows? This is outside CODEX-22's authorized changes. No replacement description should invent a unified warehouse-selection rule.

## Validation performed

- Read-only `rg` searches identified component imports, rendering, relevant destination facts, and protected residual claims.
- A Node read-only source scan grouped every description by destination/string and recorded all source lines: 102 entries, 40 unique strings, 41 destination/string pairs, 27 source keys.
- A Node read-only scan iterated `dist/valid-routes.json`, read each existing route `index.html`, and matched `Related Guides` and the exact Manheim description: 27 and 5 routes respectively.
- No build, lint, SEO snapshot check, browser regression harness, or new prerender validation was run by this audit agent. No implementation has occurred, so this report does not claim those checks passed.

## Recommended next step

Resolve the protected-copy versus global-zero acceptance conflict before implementation. Then apply only approved, source-backed descriptions and the separately audited shared CTA/Copart claims, with unchanged metadata/headings unless separately authorized. Keep the remaining Manheim contract/volume narrative and other protected stale claims in an explicitly scoped follow-up rather than silently expanding this patch.
