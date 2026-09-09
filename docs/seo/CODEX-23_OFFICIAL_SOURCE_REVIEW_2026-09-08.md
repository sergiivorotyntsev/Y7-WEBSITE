# CODEX-23 Official Source Review

Date: 2026-09-08

Status: Read-only research complete. Implementation requires resolution of the Manheim access conflict below. No repository files were changed and no build was run for this review.

Scope: Auction-specific claims currently present in `src/pages/seo/IaaiTransport.jsx` and `src/pages/seo/ManheimTransport.jsx`. Sources below are official IAA, Manheim, and Ready Logistics pages. Existing repository text is evidence of a current claim, not proof that the claim is true.

## Blocking conflict: universal dealer-only Manheim access

**FACT:** Manheim advertises public passenger-vehicle auctions at selected locations. Its general commercial terms also recognize eligible organizations beyond licensed motor dealers. An absolute statement that all Manheim purchasing requires a dealer licence conflicts with this evidence. [Manheim Public Auctions](https://site.manheim.com/en/locations/public-auctions.html), [Manheim Terms and Conditions](https://site.manheim.com/en/marketplace-policies/us-policies/manheim-terms-and-conditions.html)

**Affected existing source:** `ManheimTransport.jsx:25,29,79,102`.

**Decision required:** Authorize a qualified wholesale-marketplace description, with selected public-sale exceptions, while retaining the page's dealer-service focus. This is a recommendation, not an implemented change or an assumption that the user's instruction can be silently reinterpreted.

## Official source ledger

### IAA public-buyer eligibility

**FACT:** Public-buyer access depends on both the branch and the vehicle's eligibility. IAA directs buyers to the vehicle detail page's **Who Can Bid** information. Business licensing must satisfy the relevant eligibility requirements. Avoid describing every IAA sale as open to every individual. [IAA buyer registration requirements](https://www.iaai.com/us/Marketing/how-to-register)

### IAA pickup scheduling

**FACT:** IAA describes outbound-transporter registration and pickup scheduling through the Tow App. This source does not establish a mandatory buyer-letter process or a one-business-day release period. [IAA mobile apps](https://www.iaai.com/us/marketing/iaa-apps)

**OPEN QUESTION:** The exact current US release credential and account workflow were not verified. The official help site and linked Tow App help article returned HTTP 502. Do not replace the existing unverified buyer-letter story with an invented PIN workflow.

### IAA storage and branch handling

**FACT, branch-specific example:** Grand Rapids publishes sale-day pickup, a free period measured from the award day plus four days, and subsequent storage of $50/day. Its page separately specifies yard hours and a loader weight limit. These details illustrate why the actual branch's current instructions must be checked; they are not national Y7 rules or suggested universal replacement figures. [IAA Grand Rapids pickup information](https://www.iaai.com/us/Locations/518)

**FACT, branch-specific comparison:** Los Angeles publishes award day plus two free days and $50/day storage. Therefore a nationwide description of the free period beginning after payment clearance is not supported by these official examples. [IAA Los Angeles pickup information](https://www.iaai.com/US/Locations/134)

### IAA damage, destination acceptance, and export transport

**FACT about IAA Transport only:** Its terms identify major damage and non-standard vehicles as potential additional-cost cases and require the buyer to establish acceptance at the chosen destination facility or port. They do not guarantee delivery dates. These provisions support checking the vehicle's actual condition and the recipient's acceptance; they must not be presented as contractual rules governing Y7. [IAA Transport terms](https://www.iaai.com/us/TermsOfUsage/IAATransport)

**FACT about IAA Transport only:** IAA advertises domestic delivery and selected international services, with dock-receipt requirements for certain port deliveries. Do not characterize Y7's inland service as IAA's own service, or imply that IAA cannot arrange international transport. [IAA Transport delivery information](https://www.iaai.com/US/buying-services/iaa-transport-delivery)

### Manheim release and pickup readiness

**FACT:** Manheim provides electronic and paper Vehicle Releases. A release document alone is not confirmation of pickup readiness. Its rules identify payment, collection holds, arbitration, and ordered inspections among the relevant conditions. Therefore a generic title-processing delay is not an adequate explanation of release timing. [Manheim release rules, section 17](https://site.manheim.com/en/marketplace-policies/us-policies/manheim-terms-and-conditions.html)

**FACT:** Available passes can be retrieved from purchases in Post-Sale Management and printed. The current Y7 page's contrast between Manheim release and an automated/downloadable pass should not be retained as written. [Manheim gate-pass instructions](https://site.manheim.com/tutorials/how-to-print-a-gate-pass)

### Manheim local timing and storage

**FACT, branch-specific examples:** Milwaukee publishes weekly storage charges after 14 days; Hawaii publishes daily storage after 72 hours. These illustrate local variation, not nationwide deadlines. No new fee figures or national timing promises should be inferred from them. [Manheim Milwaukee](https://site.manheim.com/en/locations/manheim-milwaukee.html), [Manheim Hawaii](https://site.manheim.com/en/locations/us-locations/manheim-hawaii.html)

### Ready Logistics competitor claims

**FACT:** Ready describes its pricing as market-based and dependent on shipment and market conditions. This contradicts the current Y7 page's portrayal of Ready as using standardized posted rates while only Y7 responds to the live market. [Ready Logistics pricing approach](https://www.readylogistics.com/shippers)

**FACT:** Ready explicitly supports SmartAuction purchases as well as Manheim purchases. The existing statement that it transports only Manheim vehicles is contradicted. [Ready Logistics dealer transport](https://www.readylogistics.com/shippers/dealers)

### Manheim digital purchases

**FACT:** Manheim supports both physical and digital buying channels, including inventory sold without first being moved into a physical auction. **Implementation inference:** confirm the actual collection address rather than assuming every online purchase sits at a Manheim yard. [Manheim buying channels](https://site.manheim.com/en/services/new-to-manheim.html)

## Existing claims that should not be reproduced without correction or evidence

Line references refer to the repository inspected for this review. Ranges identify the relevant passages, not claims that every line is independently incorrect.

### `src/pages/seo/IaaiTransport.jsx`

| Source lines | Existing claim | Finding |
|---|---|---|
| 30, 80, 113-126, 148-159, 179, 186 | A manual portal request produces a buyer letter naming the carrier, requires a matching driver ID, takes one business day, and makes IAA pickups average one day behind Copart. | Exact US workflow and comparative delay unverified. Official help access failed. Do not fabricate an alternative workflow. |
| 30, 88, 164-170, 209-218 | A general two-to-three-business-day free period starts after payment clears, followed by a national $15-$50/day range. | Not established as a nationwide rule. Official branch examples use the award day and different free periods. |
| 84, 244-254 | IAA has a significantly higher non-running share than Copart; winch loading is the norm; loading takes 20-30 minutes instead of five. | No official comparative proportions or loading-time evidence located. |
| 64, 274 | Pickup in 2-5 business days and an extra 1-2 days for rural carrier assignment. | Y7-specific operating estimates require owner evidence; auction sources cannot validate them. |
| 224-235 | IAA Transport has no flexibility in timing, routing, or carrier selection. | Unsupported competitor characterization. |
| 265-270 | Ten named states account for the vast majority of IAA auction volume. | No supporting official volume breakdown located. |
| 217 | Ten days at $35/day adds $350. | Arithmetic is correct, but this is a synthetic example, not proof of the applicable branch's storage rate. |

### `src/pages/seo/ManheimTransport.jsx`

| Source lines | Existing claim | Finding |
|---|---|---|
| 25, 29, 79, 102 | Manheim is universally dealer-only. | Contradicted by official public-sale information; conflicts with the task's absolute premise and requires a decision before implementation. |
| 83, 220-223 | Tuesday purchases generally wait until Wednesday or Thursday because of title processing. | Not supported as a general rule; actual release conditions are documented above. |
| 29, 128-136 | Ready uses posted rates, Y7 saves $50-$150 per vehicle, and Ready transports only Manheim vehicles. | Pricing and coverage characterizations contradicted; claimed Y7 savings unverified. |
| 29, 106 | Inventory is overwhelmingly running, clean-title, and in sellable condition. | No official proportion located. Marketplace positioning is not a vehicle-condition or loading guarantee. |
| 67, 149-160 | Pickup windows, next-day delivery, and all vehicles arriving by Friday. | Require Y7 evidence or explicitly conditional examples; not established by auction rules. |
| 19, 25, 29, 54, 62-63, 189-207 | Contract/volume-based Y7 pricing or declining Y7 per-vehicle tiers. | Contradicted by the owner-confirmed flat Y7 fee; third-party auction sources cannot justify a Y7 pricing model. |

## Review boundaries

- Unsupported means not verified from the accessible official sources reviewed, not necessarily proven false.
- Official branch examples are intentionally not generalized into nationwide rules.
- IAA Transport terms describe IAA's own service and do not define Y7's obligations.
- No auction account was accessed, no form submitted, and no production action taken.
- No independent legal advice or new business rule is supplied by this review.
- Repository changes, metadata proposals, testing, and implementation decisions remain with the main CODEX-23 task after the blocking instruction conflict is resolved.
