# CODEX-22 residual claims: report only, not a gate

Date: 2026-09-08. Repository: C:/dev/Y7-WEBSITE.

## PRIORITY FOLLOW-UP: Manheim's own positioning

FACT (repository): src/pages/seo/ManheimTransport.jsx:19 still publishes this meta description:

```text
'Vehicle transport from Manheim dealer auctions. Contract pricing for dealerships, nationwide coverage. Licensed auto transport broker Y7 Logistics.',
```

This is the page's own promise to searchers, not a stale shared-component echo. The owner confirms the Y7 dealer dispatch fee is flat at every volume ($50, or $60 when Y7 handles carrier payment), with the carrier rate separate. The owner supplied 104 impressions and zero clicks over 12 months; those GSC figures were not remeasured in this task.

RECOMMENDATION: a separately authorized Manheim content-and-metadata correction. Address the fee model consistently across its metadata, TLDR, capabilities, FAQ/schema, H2 and body together. Do not make an isolated meta edit. CODEX-22 intentionally leaves these unchanged.

Current linked claims on that page:

- src/pages/seo/ManheimTransport.jsx:29: text: 'Manheim is a dealer-license-only wholesale marketplace, so its 70+ US locations move overwhelmingly running, clean-title inventory. Y7 Logistics, a licensed and bonded FMCSA broker (MC #1741537, USDOT #4427359), prices Manheim lanes against the live carrier market instead of Ready Logistics\' posted rates, typically $50-$150 less per vehicle on high-volume routes, and consolidates Manheim, Copart, and IAA pickups into one dispatch workflow with volume rate tiers for recurring dealer lanes.',
- src/pages/seo/ManheimTransport.jsx:54: 'Dealer volume pricing',
- src/pages/seo/ManheimTransport.jsx:62: q: 'Do you offer dealer volume pricing?',
- src/pages/seo/ManheimTransport.jsx:63: a: 'Yes, dealers with regular shipping needs get contract rates. The more you ship, the better your per-vehicle cost.',
- src/pages/seo/ManheimTransport.jsx:189: <Section title="Volume Pricing: How Consistent Shipping Lowers Your Cost">
- src/pages/seo/ManheimTransport.jsx:191: Transport pricing in this industry is lane-based and volume-sensitive. A dealer who
- src/pages/seo/ManheimTransport.jsx:192: ships two vehicles a year pays retail rates. A dealer who ships ten vehicles a month
- src/pages/seo/ManheimTransport.jsx:193: gets a different conversation entirely. Here is how it works in practice:
- src/pages/seo/ManheimTransport.jsx:204: We structure dealer accounts with per-vehicle rate tiers. Ship five or more vehicles
- src/pages/seo/ManheimTransport.jsx:205: per month and your rate drops. Ship ten-plus and it drops further. The exact numbers
- src/pages/seo/ManheimTransport.jsx:206: depend on your lanes — a 100-mile run has different economics than a 1,200-mile run —
- src/pages/seo/ManheimTransport.jsx:207: but the principle holds: consistency earns you better pricing.

## Scope and method

The approved §J gate applies only to changed strings and their rendered consumers. This sweep is informational. It revalidates every occurrence found by the pre-implementation EN/PL/RU/UA runtime-source audit against current files, updates line numbers, removes corrected occurrences, and deduplicates multi-category source lines. Source presence can include unused/fallback locale entries; it is not proof each entry renders on a live route. Per-dispatch checks are not necessarily false blanket-network claims; the next task must review context, not perform blind replacement.

12 source/category entries from the prior inventory are removed by the scoped correction. 241 distinct source locations remain (244 category entries before deduplication). No residual source entry in this report was edited by CODEX-22.

## Built HTML sweep across all 143 routes

Exact phrase counts are route-file counts, not occurrences. Broader multilingual matches are candidates, not automatically adjudicated business defects.

| Pattern | Routes with a match |
| --- | ---: |
| exactVerified | 66 |
| verifiedOrVettedAndLocales | 99 |
| exactInsideHour | 0 |
| oneHourAndLocales | 39 |
| exactContractPricing | 1 |
| contractPricingOrRates | 3 |
| preferredYards | 0 |

### exactVerified

- `/services`
- `/quote`
- `/quote-verified`
- `/quote-verification-failed`
- `/about`
- `/daytonacargo`
- `/car-shipping-cost`
- `/enclosed-car-shipping`
- `/auction-transport-savings`
- `/iaai-transport`
- `/manheim-transport`
- `/door-to-port-auto-transport`
- `/dealer-auto-transport`
- `/salvage-car-shipping`
- `/open-car-shipping`
- `/state-to-state-car-shipping`
- `/massachusetts-car-shipping`
- `/boston-car-shipping`
- `/newton-auto-transport`
- `/florida-car-shipping`
- `/new-jersey-auto-transport`
- `/nj-export-warehouse-shipping-cost`
- `/texas-auto-transport`
- `/massachusetts-to-florida-car-shipping`
- `/new-jersey-to-florida-car-shipping`
- `/texas-to-newark-port-auto-transport`
- `/chicago-to-port-newark-car-shipping`
- `/auction-to-port-transport`
- `/atlanta-to-savannah-port-auto-transport`
- `/dallas-to-port-houston-auto-transport`
- `/florida-to-jacksonville-port-car-shipping`
- `/tesla-car-shipping`
- `/ev-auto-transport`
- `/cybertruck-shipping`
- `/electric-vehicle-port-delivery`
- `/how-to-ship-a-car-bought-at-auction`
- `/certificate-of-origin`
- `/ports/newark`
- `/ports/houston`
- `/ports/savannah`
- `/ports/los-angeles`
- `/ports/baltimore`
- `/ports/jacksonville`
- `/ua/ports/newark`
- `/ua/ports/houston`
- `/ua/ports/savannah`
- `/ua/ports/los-angeles`
- `/ua/ports/baltimore`
- `/ua/ports/jacksonville`
- `/pl/ports/newark`
- `/pl/ports/houston`
- `/pl/ports/savannah`
- `/pl/ports/los-angeles`
- `/pl/ports/baltimore`
- `/pl/ports/jacksonville`
- `/ru/ports/newark`
- `/ru/ports/houston`
- `/ru/ports/savannah`
- `/ru/ports/los-angeles`
- `/ru/ports/baltimore`
- `/ru/ports/jacksonville`
- `/pl/transport-z-usa`
- `/pl/transport-z-aukcji`
- `/ru/dostavka-avto-iz-usa`
- `/ru/copart-i-iaai`
- `/ru/perevozka-avto`

### verifiedOrVettedAndLocales

- `/`
- `/services`
- `/exporters`
- `/ship-my-car`
- `/quote`
- `/quote-verified`
- `/quote-verification-failed`
- `/faq`
- `/about`
- `/careers`
- `/daytonacargo`
- `/car-shipping-cost`
- `/enclosed-car-shipping`
- `/auction-transport-savings`
- `/iaai-transport`
- `/manheim-transport`
- `/door-to-port-auto-transport`
- `/dealer-auto-transport`
- `/salvage-car-shipping`
- `/open-car-shipping`
- `/state-to-state-car-shipping`
- `/massachusetts-car-shipping`
- `/boston-car-shipping`
- `/newton-auto-transport`
- `/florida-car-shipping`
- `/new-jersey-auto-transport`
- `/nj-export-warehouse-shipping-cost`
- `/texas-auto-transport`
- `/massachusetts-to-florida-car-shipping`
- `/new-jersey-to-florida-car-shipping`
- `/texas-to-newark-port-auto-transport`
- `/chicago-to-port-newark-car-shipping`
- `/auction-to-port-transport`
- `/atlanta-to-savannah-port-auto-transport`
- `/dallas-to-port-houston-auto-transport`
- `/florida-to-jacksonville-port-car-shipping`
- `/tesla-car-shipping`
- `/ev-auto-transport`
- `/cybertruck-shipping`
- `/electric-vehicle-port-delivery`
- `/how-to-ship-a-car-bought-at-auction`
- `/open-vs-enclosed-auto-transport`
- `/what-is-a-bill-of-lading`
- `/certificate-of-origin`
- `/ports/newark`
- `/ports/houston`
- `/ports/savannah`
- `/ports/los-angeles`
- `/ports/baltimore`
- `/ports/jacksonville`
- `/blog/central-dispatch-listing-decoded`
- `/ua`
- `/ua/exporters`
- `/ua/ship-my-car`
- `/ua/faq`
- `/ua/about`
- `/ua/quote`
- `/ua/certificate-of-origin`
- `/pl`
- `/pl/exporters`
- `/pl/ship-my-car`
- `/pl/faq`
- `/pl/about`
- `/pl/quote`
- `/pl/certificate-of-origin`
- `/ru`
- `/ru/exporters`
- `/ru/ship-my-car`
- `/ru/faq`
- `/ru/about`
- `/ru/quote`
- `/ru/certificate-of-origin`
- `/ua/ports/newark`
- `/ua/ports/houston`
- `/ua/ports/savannah`
- `/ua/ports/los-angeles`
- `/ua/ports/baltimore`
- `/ua/ports/jacksonville`
- `/pl/ports/newark`
- `/pl/ports/houston`
- `/pl/ports/savannah`
- `/pl/ports/los-angeles`
- `/pl/ports/baltimore`
- `/pl/ports/jacksonville`
- `/ru/ports/newark`
- `/ru/ports/houston`
- `/ru/ports/savannah`
- `/ru/ports/los-angeles`
- `/ru/ports/baltimore`
- `/ru/ports/jacksonville`
- `/pl/transport-z-usa`
- `/pl/transport-z-aukcji`
- `/pl/wysylka-auta-z-usa`
- `/ua/import-z-usa`
- `/ua/copart-ta-iaai`
- `/ua/dostavka-avto-z-usa`
- `/ru/dostavka-avto-iz-usa`
- `/ru/copart-i-iaai`
- `/ru/perevozka-avto`

### exactInsideHour

No matches.

### oneHourAndLocales

- `/`
- `/services`
- `/ship-my-car`
- `/quote`
- `/quote-verified`
- `/contact`
- `/about`
- `/enclosed-car-shipping`
- `/salvage-car-shipping`
- `/open-car-shipping`
- `/state-to-state-car-shipping`
- `/massachusetts-car-shipping`
- `/newton-auto-transport`
- `/new-jersey-auto-transport`
- `/massachusetts-to-florida-car-shipping`
- `/blog/central-dispatch-listing-decoded`
- `/ua`
- `/ua/services`
- `/ua/ship-my-car`
- `/ua/contact`
- `/ua/about`
- `/ua/quote`
- `/pl`
- `/pl/services`
- `/pl/ship-my-car`
- `/pl/contact`
- `/pl/about`
- `/pl/quote`
- `/ru`
- `/ru/services`
- `/ru/ship-my-car`
- `/ru/contact`
- `/ru/about`
- `/ru/quote`
- `/pl/transport-z-usa`
- `/pl/transport-z-aukcji`
- `/pl/wysylka-auta-z-usa`
- `/ua/import-z-usa`
- `/ua/dostavka-avto-z-usa`

### exactContractPricing

- `/manheim-transport`

### contractPricingOrRates

- `/dealer-quote`
- `/manheim-transport`
- `/blog/dealer-auction-pickup-guide`

### preferredYards

No matches.

## Every remaining audited source occurrence

### src/components/AuctionToPortWorkflow.jsx:7

```text
{ title: 'Carrier Pickup', timing: 'Day 3-5', desc: 'Verified carrier picks up within 3-5 days of release' },
```

### src/components/MoneyPageSchema.jsx:46

```text
'Door-to-door vehicle shipping across all 50 US states for private customers. Open and enclosed trailer options, VIN decode, status updates at shipment milestones, and FMCSA-vetted carriers.',
```

### src/locales/en/about.json:6

```text
"storyPara1": "Y7 Consulting Inc, operating as <strong>Y7 Logistics</strong>, is a US-based auto transport brokerage. Our team brings 10+ years of combined auto transport experience, with Y7 operating as an FMCSA-licensed broker since 2025. We connect shippers with verified carriers through Central Dispatch — the industry's leading load board.",
```

### src/locales/en/about.json:19

```text
"desc": "We match your load with a verified, insured carrier through Central Dispatch."
```

### src/locales/en/about.json:40

```text
"title": "Verified Carriers",
```

### src/locales/en/about.json:41

```text
"desc": "Every carrier is vetted for insurance, safety record, and operating authority."
```

### src/locales/en/about.json:63

```text
"Response to new inquiries under 1 hour during business hours",
```

### src/locales/en/about.json:64

```text
"Only verified, insured carriers assigned to your load",
```

### src/locales/en/agreement.json:9

```text
"body": "Y7 Consulting Inc. operates as a licensed property broker under 49 CFR Part 371. Y7 arranges transportation of motor vehicles by contracting with duly authorized motor carriers. Y7 does NOT operate motor vehicles, does NOT transport vehicles, and does NOT employ drivers. All actual transportation services are performed by independent motor carriers selected by Y7 from its network of vetted carriers. Customer acknowledges and agrees that Y7 is acting solely as an intermediary and is not responsible for the acts, omissions, or performance of any carrier."
```

### src/locales/en/certificateOfOrigin.json:146

```text
"ctaSubtitle": "Transparent pricing, verified carriers, fast dispatch response.",
```

### src/locales/en/common.json:50

```text
"formSubtitle": "Typical response within 1 hour during business hours.",
```

### src/locales/en/common.json:111

```text
"subtitle": "Fill in the details below. We respond within 1 hour during business hours with competitive pricing."
```

### src/locales/en/common.json:117

```text
"servicesDescription": "Auction pickup (IAAI, Copart, Manheim), dealer trades, enclosed transport, US port delivery. Licensed FMCSA broker with 700+ verified carriers nationwide.",
```

### src/locales/en/common.json:123

```text
"shipMyCarDescription": "Door-to-door car shipping across all 50 states. Open and enclosed transport, status updates at every milestone, FMCSA-vetted carriers. Licensed broker MC #1741537. Free instant quote.",
```

### src/locales/en/common.json:125

```text
"aboutDescription": "Licensed & bonded FMCSA auto transport broker based in Natick, MA. MC #1741537, USDOT #4427359, $75,000 BMC-84 surety bond. Verified carriers, transparent fixed pricing.",
```

### src/locales/en/common.json:127

```text
"contactDescription": "Contact Y7 Logistics for vehicle transport. Email info@y7agency.com, Telegram, customer portal. 6 Harding Rd, Natick MA. Licensed & bonded FMCSA broker, responses within 1 hour during business hours.",
```

### src/locales/en/common.json:131

```text
"quoteDescription": "Request a free auto transport quote from Y7 Logistics. Replies within 1 hour during business hours. No obligation. Licensed FMCSA broker with verified carriers and flat-fee pricing.",
```

### src/locales/en/common.json:146

```text
"trDetail": "Verified Carrier",
```

### src/locales/en/exporters.json:146

```text
"trust2": "700+ vetted carriers",
```

### src/locales/en/faq.json:6

```text
"tldr": "Y7 Logistics is a licensed and bonded FMCSA auto transport broker (MC #1741537, USDOT #4427359) based in Natick, Massachusetts. Y7 arranges car shipping across all 50 states and to major US export ports by matching your vehicle with vetted, insured carriers through Central Dispatch, for a single flat dispatch fee with no transport markup. As a broker, Y7 does not haul or insure vehicles itself; the carriers it books carry the cargo insurance, verified before every dispatch.",
```

### src/locales/en/faq.json:15

```text
"a": "Y7 Logistics is a licensed and bonded FMCSA freight broker (MC #1741537, USDOT #4427359), not a carrier. That means Y7 arranges your transport by matching your vehicle with vetted, insured carriers through Central Dispatch rather than owning the trucks that haul it. Brokers are regulated under 49 CFR Part 371 and, unlike carriers, do not carry the vehicle themselves. Y7 also holds a $75,000 BMC-84 surety bond as federal law requires. Working with a broker matters because a good one vets the carrier's active insurance and safety record before your car is ever loaded."
```

### src/locales/en/faq.json:109

```text
"a": "Y7 typically assigns a vetted carrier within hours on active lanes, prioritizing pickup inside the auction's free storage window to avoid fees. See how dealer auction dispatch works on our dealer auto transport page.",
```

### src/locales/en/home.json:81

```text
"submitStat": "Under 1 hour (business hours)",
```

### src/locales/en/home.json:83

```text
"priceDesc": "Receive a competitive price range within 1 hour during business hours. Confirm when you are ready — no pressure.",
```

### src/locales/en/home.json:89

```text
"carrierDesc": "We match your load with a vetted carrier from our network. You get carrier name and phone.",
```

### src/locales/en/home.json:110

```text
"fastDesc": "Quotes typically within 1 hour during business hours. Dedicated dispatch coordinator."
```

### src/locales/en/home.json:117

```text
"carrierVettingDesc": "Every carrier verified through Central Dispatch. FMCSA authority, active insurance, safety rating checked before assignment.",
```

### src/locales/en/home.json:148

```text
"subtitle": "Tell us where your vehicle needs to go. We'll respond within 1 hour during business hours.",
```

### src/locales/en/home.json:159

```text
"subtitle": "Enter your pickup and delivery ZIP codes. We respond within 1 hour during business hours.",
```

### src/locales/en/home.json:187

```text
"ctaHedge": "Exact quote under 1 hr, business hours",
```

### src/locales/en/ports.json:8

```text
"aboutBody": "Y7 Logistics provides door-to-port auto transport to {{name}} with verified carriers. Whether you are shipping a single vehicle or managing bulk export operations, we coordinate pickup from any US location and deliver directly to the terminal.",
```

### src/locales/en/ports.json:30

```text
"ctaSubtitle": "Door-to-port transport to {{name}}. Transparent pricing, verified carriers.",
```

### src/locales/en/ports.json:39

```text
"metaDesc": "Vehicle shipping to Port Newark-Elizabeth Marine Terminal. Door-to-port auto transport for export. Licensed broker, verified carriers.",
```

### src/locales/en/ports.json:54

```text
"metaDesc": "Vehicle shipping to Port of Houston. Largest US vehicle export port. Door-to-port auto transport with verified carriers.",
```

### src/locales/en/processTimeline.json:13

```text
"timing": "Under 1 business hour",
```

### src/locales/en/processTimeline.json:24

```text
"desc": "We find a vetted carrier through Central Dispatch. You get the driver's name and truck details."
```

### src/locales/en/quote.json:18

```text
"fast": "Quote in under 1 business hour"
```

### src/locales/en/quote.json:107

```text
"message": "We'll send your quote within 1 hour during business hours via email.",
```

### src/locales/en/quote.json:134

```text
"carrierDesc": "We match a verified carrier",
```

### src/locales/en/quote.json:137

```text
"hours": "Business hours: Mon–Fri 9am–6pm EST. Response time within ~1 hour during business hours."
```

### src/locales/en/quote.json:148

```text
"body": "Thanks for confirming your email. Our dispatcher will respond to your quote request within 1 business hour.",
```

### src/locales/en/services.json:24

```text
"ctaSubtitle": "Get a transparent quote in under an hour during business hours. No hidden fees, no pressure.",
```

### src/locales/en/shipMycar.json:11

```text
"desc": "We respond within 1 hour during business hours with a competitive, all-inclusive price."
```

### src/locales/en/shipMycar.json:15

```text
"desc": "A vetted carrier picks up your vehicle at the scheduled time."
```

### src/locales/en/shipMycar.json:59

```text
"quoteSubtitle": "No obligation. We respond within 1 hour during business hours.",
```

### src/locales/en/shipMycar.json:80

```text
"a": "We review your details and respond within 1 hour during business hours with an all-inclusive price. Once you confirm, we post the shipment to our carrier network. Carriers bid on the load, and we assign the best match based on price, route, timing, and carrier rating. Most vehicles are picked up within 1–5 days of the first available date. You will receive carrier details and contact information once assigned."
```

### src/locales/en/shipMycar.json:102

```text
"trust2": "1-hour response (business hours)",
```

### src/locales/pl/about.json:6

```text
"storyPara1": "Y7 Consulting Inc, działająca pod marką <strong>Y7 Logistics</strong>, to amerykański broker transportu samochodów. Nasz zespół ma ponad 10 lat łącznego doświadczenia w transporcie aut, a Y7 działa jako broker z licencją FMCSA od 2025 roku. Łączymy nadawców ze zweryfikowanymi przewoźnikami poprzez Central Dispatch — wiodącą giełdę ładunków w branży.",
```

### src/locales/pl/about.json:19

```text
"desc": "Dobieramy sprawdzonego i ubezpieczonego przewoźnika przez Central Dispatch."
```

### src/locales/pl/about.json:40

```text
"title": "Zweryfikowani przewoźnicy",
```

### src/locales/pl/about.json:63

```text
"Odpowiedź na nowe zapytania w ciągu 1 godziny w godzinach pracy",
```

### src/locales/pl/about.json:64

```text
"Przydzielamy tylko zweryfikowanych i ubezpieczonych przewoźników",
```

### src/locales/pl/certificateOfOrigin.json:146

```text
"ctaSubtitle": "Przejrzyste ceny, zweryfikowani przewoźnicy, szybka odpowiedź dyspozytorów.",
```

### src/locales/pl/common.json:50

```text
"formSubtitle": "Typowy czas odpowiedzi — w ciągu 1 godziny w godzinach pracy.",
```

### src/locales/pl/common.json:111

```text
"subtitle": "Wypełnij formularz poniżej. Odpowiemy w ciągu 1 godziny w godzinach pracy z konkurencyjną ceną."
```

### src/locales/pl/common.json:125

```text
"aboutDescription": "Licencjonowany broker FMCSA transportu aut z siedzibą w Natick, Massachusetts. MC #1741537, USDOT #4427359. Zweryfikowani przewoźnicy, przejrzyste ceny.",
```

### src/locales/pl/common.json:127

```text
"contactDescription": "Skontaktuj się z Y7 Logistics w sprawie transportu auta. Email info@y7agency.com, Telegram, panel klienta. Natick, MA. Odpowiedź w ciągu godziny w godzinach pracy, FMCSA broker.",
```

### src/locales/pl/common.json:131

```text
"quoteDescription": "Zamów bezpłatną wycenę transportu auta od Y7 Logistics. Odpowiadamy w ciągu godziny w godzinach pracy. Bez zobowiązań. Licencjonowany broker FMCSA z przewoźnikami, stałe ceny.",
```

### src/locales/pl/common.json:142

```text
"trDetail": "Zweryfikowany przewoźnik",
```

### src/locales/pl/exporters.json:146

```text
"trust2": "700+ zweryfikowanych przewoźników",
```

### src/locales/pl/faq.json:10

```text
"tldr": "Y7 Logistics to licencjonowany broker transportu aut z gwarancją (bondem) FMCSA (MC #1741537, USDOT #4427359) z siedzibą w Natick w stanie Massachusetts. Y7 organizuje transport aut we wszystkich 50 stanach oraz do głównych portów eksportowych USA, dobierając Twój pojazd do zweryfikowanych, ubezpieczonych przewoźników przez Central Dispatch, za jedną stałą opłatę dyspozytury i bez narzutu na transport. Jako broker Y7 sam nie przewozi ani nie ubezpiecza pojazdów; ubezpieczenie cargo mają przewoźnicy, których rezerwuje, weryfikowane przed każdym zleceniem.",
```

### src/locales/pl/faq.json:19

```text
"a": "Y7 Logistics to licencjonowany broker frachtu z gwarancją (bondem) FMCSA (MC #1741537, USDOT #4427359), a nie przewoźnik. Oznacza to, że Y7 organizuje Twój transport, dobierając pojazd do zweryfikowanych, ubezpieczonych przewoźników przez Central Dispatch, zamiast posiadać ciężarówki, które go wiozą. Brokerzy są regulowani przez 49 CFR Part 371 i, w odróżnieniu od przewoźników, sami nie przewożą pojazdu. Y7 posiada też gwarancję (bond) BMC-84 na $75 000, jak wymaga prawo federalne. Współpraca z brokerem ma znaczenie, bo dobry broker sprawdza aktywne ubezpieczenie i historię bezpieczeństwa przewoźnika, zanim Twoje auto w ogóle zostanie załadowane."
```

### src/locales/pl/faq.json:113

```text
"a": "Y7 zwykle przydziela zweryfikowanego przewoźnika w ciągu kilku godzin na aktywnych trasach, priorytetowo traktując odbiór w oknie bezpłatnego przechowywania aukcji, aby uniknąć opłat. Zobacz, jak działa dyspozycja z aukcji dla dealerów, na naszej stronie transportu aut dla dealerów.",
```

### src/locales/pl/home.json:81

```text
"submitStat": "Do 1 godziny (godziny pracy)",
```

### src/locales/pl/home.json:83

```text
"priceDesc": "Konkurencyjny zakres cen w ciągu godziny w godzinach pracy. Potwierdź, gdy będziesz gotowy — bez nacisku.",
```

### src/locales/pl/home.json:89

```text
"carrierDesc": "Dobieramy sprawdzonego ubezpieczonego przewoźnika z naszej sieci. Otrzymujesz imię i telefon kierowcy.",
```

### src/locales/pl/home.json:110

```text
"fastDesc": "Wycena zwykle w ciągu godziny w godzinach pracy. Dedykowany dyspozytor."
```

### src/locales/pl/home.json:117

```text
"carrierVettingDesc": "Każdy przewoźnik zweryfikowany przez Central Dispatch. Licencja FMCSA, aktywne ubezpieczenie, rating bezpieczeństwa — przed przydzieleniem.",
```

### src/locales/pl/home.json:148

```text
"subtitle": "Powiedz nam, dokąd ma trafić Twój pojazd. Odpowiemy w ciągu 1 godziny w godzinach pracy.",
```

### src/locales/pl/home.json:164

```text
"subtitle": "Wpisz kody pocztowe odbioru i dostawy. Odezwiemy się z wyceną w ciągu godziny w godzinach pracy.",
```

### src/locales/pl/home.json:192

```text
"ctaHedge": "Dokładna wycena do 1 godziny, w godzinach pracy",
```

### src/locales/pl/ports.json:8

```text
"aboutBody": "Y7 Logistics realizuje transport aut do portu — {{name}} — ze zweryfikowanymi przewoźnikami. Niezależnie od tego, czy wysyłasz pojedynczy pojazd, czy obsługujesz eksport w większej skali, organizujemy odbiór z dowolnej lokalizacji w USA i dostawę bezpośrednio do terminalu.",
```

### src/locales/pl/ports.json:30

```text
"ctaSubtitle": "Transport do portu — {{name}}. Przejrzyste ceny, zweryfikowani przewoźnicy.",
```

### src/locales/pl/ports.json:39

```text
"metaDesc": "Transport aut do terminalu Port Newark-Elizabeth. Dostawa z aukcji i dowolnej lokalizacji w USA do portu. Licencjonowany broker, zweryfikowani przewoźnicy.",
```

### src/locales/pl/ports.json:54

```text
"metaDesc": "Transport aut do Portu Houston – największego portu eksportu pojazdów w USA. Dostawa do portu ze zweryfikowanymi przewoźnikami.",
```

### src/locales/pl/processTimeline.json:13

```text
"timing": "W ciągu godziny roboczej",
```

### src/locales/pl/processTimeline.json:24

```text
"desc": "Znajdujemy zweryfikowanego przewoźnika przez Central Dispatch. Otrzymujesz dane kierowcy i pojazdu."
```

### src/locales/pl/quote.json:18

```text
"fast": "Wycena w mniej niż godzinę roboczą"
```

### src/locales/pl/quote.json:107

```text
"message": "Wyślemy wycenę w ciągu 1 godziny roboczej na podany adres email.",
```

### src/locales/pl/quote.json:134

```text
"carrierDesc": "Dobierzemy zweryfikowanego przewoźnika",
```

### src/locales/pl/quote.json:137

```text
"hours": "Godziny pracy: Pn–Pt 9:00–18:00 EST. Odpowiedź w ciągu ~1 godziny w godzinach pracy."
```

### src/locales/pl/quote.json:148

```text
"body": "Dziękujemy za potwierdzenie adresu email. Nasz dyspozytor odpowie na Twoje zapytanie w ciągu 1 godziny roboczej.",
```

### src/locales/pl/services.json:24

```text
"ctaSubtitle": "Uzyskaj przejrzystą wycenę w mniej niż godzinę roboczą. Bez ukrytych kosztów, bez presji.",
```

### src/locales/pl/shipMycar.json:3

```text
"subtitle": "Przeprowadzka do innego stanu? Kupiłeś auto w innym stanie lub na aukcji? Znajdujemy sprawdzonych przewoźników z licencją FMCSA, którzy bezpiecznie i terminowo dostarczą Twój pojazd z aktualizacjami statusu na każdym etapie.",
```

### src/locales/pl/shipMycar.json:11

```text
"desc": "Odpowiemy w ciągu godziny w godzinach pracy ze stałą ceną obejmującą wszystkie koszty."
```

### src/locales/pl/shipMycar.json:15

```text
"desc": "Sprawdzony przewoźnik odbiera pojazd w umówionym dniu i ładuje na lawetę."
```

### src/locales/pl/shipMycar.json:59

```text
"quoteSubtitle": "Bez zobowiązań. Odpowiadamy w ciągu godziny w godzinach pracy.",
```

### src/locales/pl/shipMycar.json:80

```text
"a": "Rozpatrujemy szczegóły i odpowiadamy w ciągu godziny w godzinach pracy z ceną obejmującą wszystko. Po Twoim potwierdzeniu publikujemy zlecenie w sieci przewoźników. Przewoźnicy składają oferty, a my wybieramy najlepszego pod względem ceny, trasy, terminów i oceny. Większość aut odbierana jest w ciągu 1-5 dni od pierwszej możliwej daty. Otrzymujesz kontakt do przewoźnika po przydzieleniu."
```

### src/locales/pl/shipMycar.json:102

```text
"trust2": "Odpowiedź w godzinę (godziny pracy)",
```

### src/locales/ru/about.json:6

```text
"storyPara1": "Y7 Consulting Inc, работающая под брендом <strong>Y7 Logistics</strong>, — американский брокер перевозки авто. Наша команда имеет более 10 лет совокупного опыта в автоперевозках, а Y7 работает как лицензированный FMCSA-брокер с 2025 года. Мы соединяем заказчиков с проверенными перевозчиками через Central Dispatch — ведущий load board отрасли.",
```

### src/locales/ru/about.json:19

```text
"desc": "Подбираем проверенного и застрахованного перевозчика через Central Dispatch."
```

### src/locales/ru/about.json:40

```text
"title": "Проверенные перевозчики",
```

### src/locales/ru/about.json:63

```text
"Ответ на новые запросы в течение 1 часа в рабочее время",
```

### src/locales/ru/about.json:64

```text
"Назначаем только проверенных и застрахованных перевозчиков",
```

### src/locales/ru/certificateOfOrigin.json:146

```text
"ctaSubtitle": "Прозрачные цены, проверенные перевозчики, быстрый ответ диспетчерской.",
```

### src/locales/ru/common.json:50

```text
"formSubtitle": "Типичное время ответа — в течение 1 часа в рабочее время.",
```

### src/locales/ru/common.json:111

```text
"subtitle": "Заполните форму ниже. Мы ответим в течение 1 часа в рабочее время с конкурентной ценой."
```

### src/locales/ru/common.json:123

```text
"shipMyCarDescription": "Перевозка авто по всем 50 штатам США. Открытые и закрытые трейлеры, уведомления о статусе на ключевых этапах, проверенные перевозчики. FMCSA лицензия MC #1741537.",
```

### src/locales/ru/common.json:125

```text
"aboutDescription": "Лицензированный FMCSA брокер авто-транспорта в Натике, Массачусетс. MC #1741537, USDOT #4427359. Проверенные перевозчики, прозрачные фиксированные цены.",
```

### src/locales/ru/common.json:127

```text
"contactDescription": "Свяжитесь с Y7 Logistics по вопросам перевозки авто. Email info@y7agency.com, Telegram, личный кабинет. Натик, Массачусетс. Ответ в течение часа в рабочее время, FMCSA брокер.",
```

### src/locales/ru/common.json:131

```text
"quoteDescription": "Запросите бесплатный расчёт на перевозку авто от Y7 Logistics. Отвечаем в течение часа в рабочее время. Без обязательств. Лицензированный FMCSA брокер, перевозчики, цены.",
```

### src/locales/ru/common.json:142

```text
"trDetail": "Проверенный перевозчик",
```

### src/locales/ru/exporters.json:146

```text
"trust2": "700+ проверенных перевозчиков",
```

### src/locales/ru/faq.json:10

```text
"tldr": "Y7 Logistics — лицензированный автотранспортный брокер с бондом FMCSA (MC #1741537, USDOT #4427359) из Натика, штат Массачусетс. Y7 организует перевозку авто по всем 50 штатам и в крупные экспортные порты США, подбирая под ваш автомобиль проверенных застрахованных перевозчиков через Central Dispatch — за одну фиксированную плату за диспатч, без наценки на транспорт. Как брокер, Y7 сам машины не возит и не страхует; страховку cargo несут перевозчики, которых он нанимает, и она проверяется перед каждым назначением.",
```

### src/locales/ru/faq.json:19

```text
"a": "Y7 Logistics — лицензированный брокер грузоперевозок с бондом FMCSA (MC #1741537, USDOT #4427359), а не перевозчик. Это значит, что Y7 организует перевозку, подбирая под ваш автомобиль проверенных застрахованных перевозчиков через Central Dispatch, а не владеет траками, которые его везут. Брокеры регулируются по 49 CFR Part 371 и, в отличие от перевозчиков, сами машину не возят. У Y7 также есть surety bond BMC-84 на $75 000, как требует федеральный закон. Работать через брокера важно потому, что хороший брокер проверяет действующую страховку и историю безопасности перевозчика ещё до того, как вашу машину погрузят."
```

### src/locales/ru/faq.json:113

```text
"a": "На активных маршрутах Y7 обычно назначает проверенного перевозчика в течение нескольких часов, отдавая приоритет забору внутри окна бесплатного хранения аукциона, чтобы избежать сборов. Как работает дилерский аукционный диспатч — на нашей странице дилерских автоперевозок.",
```

### src/locales/ru/home.json:81

```text
"submitStat": "До 1 часа (в рабочее время)",
```

### src/locales/ru/home.json:83

```text
"priceDesc": "Получите конкурентный диапазон цен в течение часа в рабочее время. Подтверждайте, когда будете готовы — без давления.",
```

### src/locales/ru/home.json:89

```text
"carrierDesc": "Подбираем проверенного застрахованного перевозчика из нашей сети. Получаете имя и телефон водителя.",
```

### src/locales/ru/home.json:110

```text
"fastDesc": "Расчёт обычно в течение часа в рабочие часы. Персональный диспетчер."
```

### src/locales/ru/home.json:117

```text
"carrierVettingDesc": "Каждый перевозчик проверен через Central Dispatch. FMCSA-лицензия, действующая страховка, рейтинг безопасности — до назначения.",
```

### src/locales/ru/home.json:148

```text
"subtitle": "Укажите, куда нужно доставить автомобиль. Мы ответим в течение 1 часа в рабочее время.",
```

### src/locales/ru/home.json:164

```text
"subtitle": "Введите ZIP-коды забора и доставки. Мы свяжемся с ценами в течение одного часа в рабочее время.",
```

### src/locales/ru/home.json:192

```text
"ctaHedge": "Точный расчёт до 1 часа, в рабочее время",
```

### src/locales/ru/ports.json:8

```text
"aboutBody": "Y7 Logistics выполняет транспортировку авто до порта — {{name}} — с проверенными перевозчиками. Отправляете ли вы один автомобиль или работаете с экспортом в объёме, мы организуем забор из любой локации в США и доставку прямо в терминал.",
```

### src/locales/ru/ports.json:30

```text
"ctaSubtitle": "Доставка в порт — {{name}}. Прозрачные цены, проверенные перевозчики.",
```

### src/locales/ru/ports.json:39

```text
"metaDesc": "Транспортировка авто в терминал Port Newark-Elizabeth. Доставка с аукциона и из любой локации в США до порта. Лицензированный брокер, проверенные перевозчики.",
```

### src/locales/ru/ports.json:54

```text
"metaDesc": "Транспортировка авто в Порт Houston — крупнейший порт экспорта авто в США. Доставка в порт с проверенными перевозчиками.",
```

### src/locales/ru/processTimeline.json:13

```text
"timing": "В течение рабочего часа",
```

### src/locales/ru/processTimeline.json:24

```text
"desc": "Находим проверенного перевозчика через Central Dispatch. Вы получаете имя водителя и данные тягача."
```

### src/locales/ru/quote.json:18

```text
"fast": "Расчёт менее чем за рабочий час"
```

### src/locales/ru/quote.json:107

```text
"message": "Мы отправим вам расчёт в течение 1 рабочего часа по электронной почте.",
```

### src/locales/ru/quote.json:134

```text
"carrierDesc": "Подберём проверенного перевозчика",
```

### src/locales/ru/quote.json:137

```text
"hours": "Рабочие часы: Пн–Пт 9:00–18:00 EST. Ответ в течение ~1 часа в рабочее время."
```

### src/locales/ru/quote.json:148

```text
"body": "Спасибо за подтверждение email. Наш диспетчер ответит на вашу заявку в течение 1 рабочего часа.",
```

### src/locales/ru/services.json:24

```text
"ctaSubtitle": "Получите прозрачный расчёт менее чем за рабочий час. Без скрытых комиссий, без давления.",
```

### src/locales/ru/shipMycar.json:3

```text
"subtitle": "Переезжаете в другой штат? Купили авто в другом штате или на аукционе? Мы подбираем проверенных FMCSA-перевозчиков, которые безопасно и вовремя доставят ваш автомобиль с обновлениями статуса на каждом этапе.",
```

### src/locales/ru/shipMycar.json:11

```text
"desc": "Ответим в течение часа в рабочее время с фиксированной ценой, включающей все расходы."
```

### src/locales/ru/shipMycar.json:15

```text
"desc": "Проверенный перевозчик забирает автомобиль в согласованный день и загружает на автовоз."
```

### src/locales/ru/shipMycar.json:59

```text
"quoteSubtitle": "Без обязательств. Отвечаем в течение часа в рабочее время.",
```

### src/locales/ru/shipMycar.json:80

```text
"a": "Мы рассматриваем детали и отвечаем в течение часа в рабочее время с ценой, включающей всё. После вашего подтверждения публикуем рейс в сети перевозчиков. Перевозчики подают заявки, и мы выбираем лучшего по цене, маршруту, срокам и рейтингу. Большинство авто забираются в течение 1-5 дней от первой возможной даты. Вы получаете контакты перевозчика после назначения."
```

### src/locales/ru/shipMycar.json:102

```text
"trust2": "Ответ за 1 час (в рабочее время)",
```

### src/locales/ua/about.json:6

```text
"storyPara1": "Y7 Consulting Inc, що працює під брендом <strong>Y7 Logistics</strong>, — це американський брокер перевезення авто. Наша команда має понад 10 років сукупного досвіду в автоперевезеннях, а Y7 працює як ліцензований FMCSA-брокер з 2025 року. Ми з'єднуємо замовників з перевіреними перевізниками через Central Dispatch — провідний load board галузі.",
```

### src/locales/ua/about.json:19

```text
"desc": "Підбираємо перевіреного і застрахованого перевізника через Central Dispatch."
```

### src/locales/ua/about.json:40

```text
"title": "Перевірені перевізники",
```

### src/locales/ua/about.json:63

```text
"Відповідь на нові запити протягом 1 години у робочий час",
```

### src/locales/ua/about.json:64

```text
"Призначаємо лише перевірених і застрахованих перевізників",
```

### src/locales/ua/certificateOfOrigin.json:146

```text
"ctaSubtitle": "Прозорі ціни, перевірені перевізники, швидка відповідь диспетчерської.",
```

### src/locales/ua/common.json:50

```text
"formSubtitle": "Типовий час відповіді — протягом 1 години у робочий час.",
```

### src/locales/ua/common.json:111

```text
"subtitle": "Заповніть форму нижче. Ми відповімо протягом 1 години в робочий час з конкурентною ціною."
```

### src/locales/ua/common.json:123

```text
"shipMyCarDescription": "Перевезення авто по всіх 50 штатах США. Відкриті та закриті трейлери, сповіщення про статус на ключових етапах, перевірені перевізники. Ліцензія FMCSA MC #1741537.",
```

### src/locales/ua/common.json:125

```text
"aboutDescription": "Ліцензований FMCSA брокер перевезення авто в Натіку, Массачусеттс. MC #1741537, USDOT #4427359. Перевірені перевізники, прозорі фіксовані ціни, 24/7 підтримка.",
```

### src/locales/ua/common.json:127

```text
"contactDescription": "Зв'яжіться з Y7 Logistics щодо перевезення авто. Email info@y7agency.com, Telegram, особистий кабінет. Натік, Массачусеттс. Відповідь протягом години в робочий час.",
```

### src/locales/ua/common.json:131

```text
"quoteDescription": "Замовте безкоштовний розрахунок на перевезення авто від Y7 Logistics. Відповідаємо протягом години в робочий час. Без зобов'язань. Ліцензований FMCSA брокер, перевізники.",
```

### src/locales/ua/common.json:142

```text
"trDetail": "Перевірений перевізник",
```

### src/locales/ua/exporters.json:146

```text
"trust2": "700+ перевірених перевізників",
```

### src/locales/ua/faq.json:10

```text
"tldr": "Y7 Logistics — ліцензований брокер автоперевезень з бондом FMCSA (MC #1741537, USDOT #4427359) із головним офісом у Натіку, штат Массачусетс. Y7 організовує перевезення авто по всіх 50 штатах і до великих експортних портів США, підбираючи для вашого авто перевірених, застрахованих перевізників через Central Dispatch за єдину фіксовану плату за диспетчинг без націнки на транспорт. Як брокер, Y7 сам не перевозить і не страхує авто; вантажну страховку мають перевізники, яких він замовляє, і вона перевіряється перед кожним відправленням.",
```

### src/locales/ua/faq.json:19

```text
"a": "Y7 Logistics — ліцензований брокер вантажоперевезень з бондом FMCSA (MC #1741537, USDOT #4427359), а не перевізник. Це означає, що Y7 організовує ваше перевезення, підбираючи для авто перевірених, застрахованих перевізників через Central Dispatch, а не володіючи вантажівками, які його везуть. Робота брокерів регулюється нормою 49 CFR Part 371, і, на відміну від перевізників, вони самі авто не везуть. Y7 також має surety bond BMC-84 на $75,000, як того вимагає федеральне законодавство. Робота з брокером важлива, бо хороший брокер перевіряє чинну страховку та історію безпеки перевізника ще до того, як ваше авто завантажать."
```

### src/locales/ua/faq.json:113

```text
"a": "Y7 зазвичай призначає перевіреного перевізника протягом кількох годин на активних маршрутах, надаючи пріоритет забору в межах вікна безкоштовного зберігання, щоб уникнути зборів. Як працює дилерський аукціонний диспетчинг, дивіться на нашій сторінці дилерських автоперевезень.",
```

### src/locales/ua/home.json:81

```text
"submitStat": "До 1 години (у робочий час)",
```

### src/locales/ua/home.json:83

```text
"priceDesc": "Конкурентний діапазон цін протягом години в робочий час. Підтверджуйте, коли будете готові — без тиску.",
```

### src/locales/ua/home.json:89

```text
"carrierDesc": "Підбираємо перевіреного застрахованого перевізника з нашої мережі. Отримуєте імʼя та телефон водія.",
```

### src/locales/ua/home.json:110

```text
"fastDesc": "Розрахунок зазвичай протягом години в робочі години. Персональний диспетчер."
```

### src/locales/ua/home.json:117

```text
"carrierVettingDesc": "Кожен перевізник перевірений через Central Dispatch. FMCSA-ліцензія, чинне страхування, рейтинг безпеки — до призначення.",
```

### src/locales/ua/home.json:148

```text
"subtitle": "Вкажіть, куди потрібно доставити автомобіль. Ми відповімо протягом 1 години в робочий час.",
```

### src/locales/ua/home.json:164

```text
"subtitle": "Введіть ZIP-коди забору та доставки. Ми зв'яжемося з цінами протягом години в робочий час.",
```

### src/locales/ua/home.json:192

```text
"ctaHedge": "Точний розрахунок до 1 години, у робочий час",
```

### src/locales/ua/ports.json:8

```text
"aboutBody": "Y7 Logistics виконує транспортування авто до порту — {{name}} — з перевіреними перевізниками. Незалежно від того, відправляєте ви один автомобіль чи працюєте з експортом в обсязі, ми організовуємо забір з будь-якої локації в США та доставку безпосередньо в термінал.",
```

### src/locales/ua/ports.json:30

```text
"ctaSubtitle": "Доставка в порт — {{name}}. Прозорі ціни, перевірені перевізники.",
```

### src/locales/ua/ports.json:39

```text
"metaDesc": "Транспортування авто в термінал Port Newark-Elizabeth. Доставка з аукціону та будь-якої локації в США до порту. Ліцензований брокер, перевірені перевізники.",
```

### src/locales/ua/ports.json:54

```text
"metaDesc": "Транспортування авто в Порт Houston — найбільший порт експорту авто в США. Доставка в порт з перевіреними перевізниками.",
```

### src/locales/ua/processTimeline.json:13

```text
"timing": "До 1 робочої години",
```

### src/locales/ua/processTimeline.json:24

```text
"desc": "Знаходимо перевіреного перевізника через Central Dispatch. Ви отримуєте ім'я водія та дані тягача."
```

### src/locales/ua/quote.json:18

```text
"fast": "Розрахунок менш ніж за робочу годину"
```

### src/locales/ua/quote.json:107

```text
"message": "Ми надішлемо вам розрахунок протягом 1 робочої години на електронну пошту.",
```

### src/locales/ua/quote.json:134

```text
"carrierDesc": "Підберемо перевіреного перевізника",
```

### src/locales/ua/quote.json:137

```text
"hours": "Робочі години: Пн–Пт 9:00–18:00 EST. Відповідь протягом ~1 години в робочі години."
```

### src/locales/ua/quote.json:148

```text
"body": "Дякуємо за підтвердження email. Наш диспетчер відповість на вашу заявку протягом 1 робочої години.",
```

### src/locales/ua/services.json:24

```text
"ctaSubtitle": "Отримайте прозорий розрахунок менш ніж за робочу годину. Без прихованих комісій, без тиску.",
```

### src/locales/ua/shipMycar.json:3

```text
"subtitle": "Переїжджаєте до іншого штату? Купили авто в іншому штаті чи на аукціоні? Ми знаходимо перевірених перевізників FMCSA, які безпечно і вчасно доставлять ваш автомобіль з оновленням статусу на кожному етапі.",
```

### src/locales/ua/shipMycar.json:11

```text
"desc": "Ми відповімо протягом години в робочий час з фіксованою ціною, яка включає всі витрати."
```

### src/locales/ua/shipMycar.json:15

```text
"desc": "Перевірений перевізник забирає автомобіль у погоджений день і завантажує на автовоз."
```

### src/locales/ua/shipMycar.json:59

```text
"quoteSubtitle": "Без зобов'язань. Відповідаємо протягом години в робочий час.",
```

### src/locales/ua/shipMycar.json:80

```text
"a": "Ми розглядаємо деталі й відповідаємо протягом години в робочий час з ціною, що включає все. Після вашого підтвердження публікуємо рейс у мережі перевізників. Перевізники подають заявки, і ми обираємо найкращого за ціною, маршрутом, термінами і рейтингом. Більшість авто забираються протягом 1-5 днів від першої можливої дати. Ви отримуєте контакти перевізника після призначення."
```

### src/locales/ua/shipMycar.json:102

```text
"trust2": "Відповідь за 1 годину (у робочий час)",
```

### src/pages/blog/articles/DealerAuctionPickupGuide.jsx:92

```text
Volume Pricing and Contract Rates
```

### src/pages/blog/articles/DealerAuctionPickupGuide.jsx:98

```text
predictability translates into fixed contract rates that are consistently lower than one-off pricing. The
```

### src/pages/Careers.jsx:78

```text
description: 'Join the Y7 Logistics vetted carrier network. Auto transport loads from Copart, IAA, Manheim, ADESA. Licensed & bonded FMCSA broker. Fast Zelle/ACH payment. Digital-first dispatch workflow.',
```

### src/pages/Careers.jsx:125

```text
Y7 Logistics is building a vetted carrier network for auto transport. Steady loads from
```

### src/pages/daytonacargo/DaytonaCargoPage.jsx:866

```text
own US brokerage with a vetted ~500-carrier network. EN / PL / RU team.
```

### src/pages/DealerQuote.jsx:137

```text
<PageMeta title="Dealer Partnership" description="Apply for dealer partnership. Volume pricing, dedicated dispatcher, fixed contract rates." path="/dealer-quote" />
```

### src/pages/intl/PolandCopart.jsx:533

```text
zweryfikowanych przewoźników pokrywa wszystkie 50 stanów. Typowa trasa
```

### src/pages/intl/PolandCopart.jsx:635

```text
Prześlij link do lotu — otrzymasz pełną kalkulację door-to-door w ciągu godziny.
```

### src/pages/intl/PolandHome.jsx:557

```text
zweryfikowanych przewoźników na terenie wszystkich 50 stanów. Typowe
```

### src/pages/intl/PolandHome.jsx:656

```text
w ciągu godziny, bez zobowiązań. Odpowiadamy po polsku przez DaytonaCargo.
```

### src/pages/intl/PolandShipMyCar.jsx:177

```text
content="Zamów transport auta z aukcji Copart lub IAAI. Y7 Logistics (broker FMCSA MC #1741537) obsługuje transport lądowy w USA. Dla importu do Polski — siostrzana firma DaytonaCargo. Wycena w 1 godzinę."
```

### src/pages/intl/PolandShipMyCar.jsx:197

```text
content="Y7 × DaytonaCargo: od placu Copart do drzwi w Polsce. Dla Polonii w USA — transport między stanami. Wycena w 1 godzinę."
```

### src/pages/intl/PolandShipMyCar.jsx:441

```text
w ciągu 1 godziny w godzinach pracy (9:00-18:00 czasu wschodniego
```

### src/pages/intl/PolandShipMyCar.jsx:509

```text
z dostępem do sieci zweryfikowanych przewoźników na terenie
```

### src/pages/intl/PolandShipMyCar.jsx:639

```text
realną wycenę w ciągu 1 godziny. Wycena jest bezpłatna i nie
```

### src/pages/intl/RussiaHome.jsx:48

```text
text: 'Y7 Logistics — лицензированный брокер автоперевозок FMCSA (MC #1741537, USDOT #4427359). Мы координируем доставку через сеть 700+ проверенных перевозчиков, подбирая оптимальный вариант по маршруту, срокам и бюджету.',
```

### src/pages/intl/RussiaHome.jsx:106

```text
{ number: '700+', label: 'проверенных перевозчиков в сети' },
```

### src/pages/intl/RussiaHome.jsx:200

```text
{ q: 'Y7 — это перевозчик или брокер?', a: 'Y7 Logistics — лицензированный брокер FMCSA (MC #1741537). Мы работаем с сетью 700+ проверенных перевозчиков, подбирая оптимальный вариант для каждого заказа.' },
```

### src/pages/intl/RussiaHome.jsx:254

```text
между городами, до морских портов. Сеть из 700+ проверенных
перевозчиков и русскоязычная команда, которая отвечает быстро через Telegram и email. Наши цены
```

### src/pages/intl/RussiaShipMyCar.jsx:322

```text
Сеть из 700+ проверенных перевозчиков, все 50 штатов.
```

### src/pages/intl/UkraineCopart.jsx:572

```text
перевірених перевізників по всіх 50 штатах. Типовий маршрут між
```

### src/pages/intl/UkraineHome.jsx:266

```text
content="Пригін авто з аукціонів Copart та IAAI в Україну. Y7 Logistics — ліцензований FMCSA-брокер (MC #1741537) з українськомовною підтримкою. Три маршрути доставки, прозорі ціни, розрахунок за 1 годину."
```

### src/pages/intl/UkraineHome.jsx:286

```text
content="Y7 Logistics: FMCSA-брокер, українськомовна підтримка, три маршрути доставки. Розрахунок за 1 годину."
```

### src/pages/intl/UkraineHome.jsx:565

```text
перевірених перевізників по всіх 50 штатах. Комунікуємо українською
```

### src/pages/intl/UkraineShipMyCar.jsx:193

```text
content="Замовте пригін авто з аукціонів Copart або IAAI. Y7 Logistics — ліцензований FMCSA-брокер (MC #1741537) з українськомовною підтримкою. Розрахунок за 1 годину, без прихованих комісій."
```

### src/pages/intl/UkraineShipMyCar.jsx:203

```text
content="Ліцензований FMCSA-брокер (MC #1741537). Українськомовна підтримка, прозорі ціни, розрахунок за 1 годину."
```

### src/pages/intl/UkraineShipMyCar.jsx:213

```text
content="Y7 Logistics: FMCSA-брокер, українськомовна підтримка. Розрахунок за 1 годину."
```

### src/pages/intl/UkraineShipMyCar.jsx:451

```text
маємо доступ до мережі перевірених перевізників по всіх 50 штатах.
```

### src/pages/seo/AuctionTransportSavings.jsx:132

```text
a: 'Yes - one broker for every major US auction. We coordinate the gate pass, dispatch a verified carrier through Central Dispatch, and you pay the real market rate plus a flat dispatch fee.',
```

### src/pages/seo/CarShippingCost.jsx:61

```text
{ title: 'Carrier Picks Up', desc: 'A verified carrier from our network picks up your vehicle at the scheduled time.' },
```

### src/pages/seo/DealerAutoTransport.jsx:47

```text
text: "Y7 Logistics provides nationwide auto transport for dealerships, including auction pickup, dealer trades, customer delivery, multi-vehicle moves, and recurring lanes. As a Licensed & Bonded FMCSA Broker, Y7 coordinates vetted carriers, release documents, gate passes, milestone updates, and delivery records. The carrier performs the transport, and its variable rate is separate from Y7's fixed $50 fee, or $60 when Y7 handles carrier payment.",
```

### src/pages/seo/DealerAutoTransport.jsx:86

```text
{ title: 'Y7 coordinates a vetted carrier', desc: 'Your account manager coordinates verified carriers for each shipment.' },
```

### src/pages/seo/DealerAutoTransport.jsx:246

```text
Every carrier we dispatch is verified before they touch your inventory. We check active MC authority, required insurance coverage (cargo typically $100,000–$250,000 for open and $250,000–$500,000 for enclosed, plus $750,000+ FMCSA liability), FMCSA safety rating, and inspection history. Carriers with conditional or unsatisfactory ratings, insurance lapses, or recent out-of-service violations are excluded from our network. This is not a checkbox exercise — it is how we protect your $30,000-$80,000 vehicles in transit.
```

### src/pages/seo/DoorToPort.jsx:55

```text
{ title: 'Carrier assigned for your route', desc: 'A verified carrier is matched to your origin-to-port route.' },
```

### src/pages/seo/ElectricVehiclePortDelivery.jsx:134

```text
{ step: 'Carrier Assignment', desc: 'We assign a verified carrier experienced with EV transport and port delivery — not all carriers have port credentials or EV handling experience.' },
```

### src/pages/seo/EnclosedCarShipping.jsx:28

```text
{ title: 'Receive Pricing', desc: 'Enclosed quote back within 1 hour, with equipment options (hardside, softside, single-car, multi-car).' },
```

### src/pages/seo/guides/BillOfLading.jsx:127

```text
Y7 Logistics uses verified, insured carriers and ensures proper BOL documentation on every shipment. Get a free quote today.
```

### src/pages/seo/guides/HowToShipAuctionCar.jsx:86

```text
Working with a licensed auto transport broker is the most efficient way to ship your auction purchase. A broker has access to a network of verified carriers and can match your shipment with a driver who is already routing through the auction yard's area. This is particularly important for auction vehicles because timing matters: you need a carrier who can pick up within the free storage window.
```

### src/pages/seo/guides/OpenVsEnclosed.jsx:157

```text
Y7 Logistics offers both open and enclosed auto transport with verified, insured carriers. Tell us about your vehicle and we will recommend the right option.
```

### src/pages/seo/IaaiTransport.jsx:43

```text
{ title: 'Carrier dispatched to IAA location', desc: 'A verified carrier is assigned and dispatched to the IAA yard.' },
```

### src/pages/seo/locations/BostonCarShipping.jsx:28

```text
{ title: 'Carrier Scheduled', desc: 'A verified carrier is assigned for your pickup window.' },
```

### src/pages/seo/locations/BostonCarShipping.jsx:89

```text
We coordinate shipments through a vetted network of 700+ carriers on Central Dispatch.
```

### src/pages/seo/locations/FloridaCarShipping.jsx:16

```text
intro="Florida is the busiest state in the country for inbound auto transport, driven by snowbird traffic, retiree relocations, college moves, military transfers, and year-round tourism. Y7 Logistics coordinates Florida shipments from our Natick, MA office using a vetted network of 700+ carriers on Central Dispatch. We are a licensed FMCSA broker (MC #1741537, USDOT #4427359), covering every Florida ZIP from Pensacola to Key West, and every auction yard, dealer lot, and port terminal in between."
```

### src/pages/seo/locations/MassachusettsCarShipping.jsx:16

```text
intro="Y7 Logistics is a Natick, Massachusetts-based FMCSA auto transport broker (MC #1741537 / USDOT #4427359) coordinating vehicle shipping across the entire Bay State — Boston metro, the MetroWest corridor, Central Massachusetts, the South Coast, Cape Cod and the Islands, and the Berkshires. We do not own trucks; we dispatch a vetted network of carriers on Central Dispatch, the industry's primary load board, which gives you access to the full New England carrier market through a single local point of contact."
```

### src/pages/seo/locations/MassachusettsCarShipping.jsx:29

```text
{ title: 'Receive Pricing', desc: 'All-inclusive quote back within 1 hour during business hours.' },
```

### src/pages/seo/locations/MassachusettsCarShipping.jsx:31

```text
{ title: 'Carrier Assigned', desc: 'Verified carrier with active authority and insurance picks up the load.' },
```

### src/pages/seo/locations/NewJerseyAutoTransport.jsx:17

```text
intro="New Jersey sits at the center of three of the most important auto-transport flows in the United States: the Port Newark export gateway, the dealer-dense Northeast retail corridor, and the I-95 mainline that moves vehicles between New England and Florida. Y7 Logistics is a licensed FMCSA broker (MC #1741537 / USDOT #4427359) based in Natick, MA, and we coordinate shipments to and from every corner of New Jersey — Bergen County to Cape May, Newark to Princeton — through our vetted carrier network on Central Dispatch."
```

### src/pages/seo/locations/NewJerseyAutoTransport.jsx:28

```text
{ title: 'Receive Pricing', desc: 'Within 1 hour during business hours, based on current Northeast lane rates.' },
```

### src/pages/seo/locations/NewtonAutoTransport.jsx:52

```text
{ title: 'Receive Pricing', desc: 'Within 1 hour during business hours, all-inclusive quote.' },
```

### src/pages/seo/ManheimTransport.jsx:19

```text
'Vehicle transport from Manheim dealer auctions. Contract pricing for dealerships, nationwide coverage. Licensed auto transport broker Y7 Logistics.',
```

### src/pages/seo/ManheimTransport.jsx:41

```text
{ title: 'Carrier assigned from nearest fleet', desc: 'We match your shipment with a verified carrier in the area.' },
```

### src/pages/seo/ManheimTransport.jsx:63

```text
a: 'Yes, dealers with regular shipping needs get contract rates. The more you ship, the better your per-vehicle cost.',
```

### src/pages/seo/ManheimTransport.jsx:87

```text
a: 'Yes. OVE and Simulcast purchases ship exactly like in-lane buys on our end: you send the purchase confirmation and delivery address, we quote the lane against the live carrier market, dispatch a verified carrier, and coordinate release with the Manheim location remotely. Buying from a facility 1,500 miles away changes nothing about the process.',
```

### src/pages/seo/OpenCarShipping.jsx:10

```text
'Open-trailer auto transport across all 50 states. Most affordable and most common shipping method. Licensed FMCSA broker. Free quote in under 1 hour.',
```

### src/pages/seo/OpenCarShipping.jsx:16

```text
intro="Open-trailer auto transport is the industry default — roughly 85% of vehicles shipped in the United States move on open carriers, including virtually every new car delivered from factory to dealership. Y7 Logistics is a licensed FMCSA broker (MC #1741537 / USDOT #4427359) based in Natick, MA, coordinating open-trailer shipments through a vetted network of carriers on Central Dispatch. Open is the most affordable option, the most widely available, and for any daily driver or standard vehicle, it's the option you should start with."
```

### src/pages/seo/OpenCarShipping.jsx:28

```text
{ title: 'Receive Pricing', desc: 'Transparent all-in rate within 1 hour, with no hidden broker fees.' },
```

### src/pages/seo/OpenCarShipping.jsx:30

```text
{ title: 'Carrier Assigned', desc: 'Verified carrier with active operating authority accepts the load.' },
```

### src/pages/seo/routes/AuctionToPort.jsx:211

```text
dispatch through a vetted carrier network on Central Dispatch, the industry\u2019s
```

### src/pages/seo/routes/MassachusettsToFlorida.jsx:12

```text
'MA to FL car shipping on the #1 snowbird corridor. Boston to Miami, Orlando, Tampa. Licensed FMCSA broker. Free quote in 1 hour.',
```

### src/pages/seo/routes/MassachusettsToFlorida.jsx:18

```text
intro="The Massachusetts-to-Florida lane is the busiest snowbird auto-transport corridor in the United States. From October through April every year, tens of thousands of vehicles move south from New England to Florida; the reverse flow runs from late March through May. Y7 Logistics is based in Natick, MA (MC #1741537 / USDOT #4427359) and runs this route year-round on the I-95 corridor, pairing every load with a vetted carrier from our Central Dispatch network."
```

### src/pages/seo/SalvageCarShipping.jsx:10

```text
'Salvage-title and total-loss vehicle transport from Copart, IAAI, and home addresses. Winch and forklift loading, condition-matched carriers. Licensed FMCSA broker, free quote in 1 hour.',
```

### src/pages/seo/SeoLandingPage.jsx:76

```text
ctaSubtitle: 'Transparent pricing, verified carriers, fast dispatch response.',
```

### src/pages/seo/StateToState.jsx:10

```text
'State to state car shipping across all 50 states. Licensed FMCSA broker, verified carriers, transparent pricing. Quote in 1 hour.',
```

### src/pages/seo/StateToState.jsx:16

```text
intro="Moving a vehicle across state lines is federally regulated commerce. It requires a licensed broker, a carrier with interstate operating authority, and a paper trail at both ends. Y7 Logistics is an FMCSA-licensed broker (MC #1741537, USDOT #4427359) based in Natick, MA. We coordinate vehicle transport between all 50 US states using a vetted network of 700+ carriers on Central Dispatch. We do not own trucks — our value is carrier vetting, dispatch expertise, and a single point of contact through the whole process."
```

### src/pages/seo/StateToState.jsx:47

```text
'All carriers verified for interstate operating authority',
```

### src/pages/seo/TeslaCarShipping.jsx:41

```text
intro="Shipping a Tesla requires more than a standard car carrier. Ground clearance limitations, regenerative braking behavior, battery charge management, and unique body materials like Cybertruck's stainless steel all demand carriers with specific EV experience. Y7 Logistics works with vetted carriers who understand Tesla's transport mode, air suspension settings, and Falcon wing door positioning — so your vehicle arrives exactly as it left."
```

## Additional shared dealer CTA promises: unchanged

These retain weekly-invoicing and sixth-load volume tiers, plus the licensed-dealer framing. They are not the approved shipMyCar CTA string. They require separate authorization, including a wording review against confirmed registration requirements.

### src/locales/en/contextualCTA.json:11

```text
"body": "Y7 dispatches Copart, IAA, and Manheim loads for licensed dealers every day — weekly invoicing, dedicated dispatcher, and volume tiers from the sixth load of the month.",
```

### src/locales/pl/contextualCTA.json:11

```text
"body": "Y7 codziennie obsługuje Copart, IAA i Manheim dla licencjonowanych dealerów w USA — fakturowanie tygodniowe, dedykowany dyspozytor, ceny hurtowe od szóstego auta w miesiącu.",
```

### src/locales/ru/contextualCTA.json:11

```text
"body": "Y7 ежедневно работает с Copart, IAA и Manheim для лицензированных дилеров в США — еженедельные инвойсы, персональный диспетчер, оптовые тарифы с шестой машины месяца.",
```

### src/locales/ua/contextualCTA.json:11

```text
"body": "Y7 щодня працює з Copart, IAA та Manheim для ліцензованих дилерів у США — щотижневі інвойси, персональний диспетчер, оптові тарифи з шостої машини місяця.",
```

## Explicitly unchanged

All protected metadata, headings, other page copy, private namespace behavior, styling and analytics code remain outside this patch. The free-window contradiction in /copart-international-shipping and other-page overflow remain separate tasks. Original audit and description-by-description evidence are in CODEX-22_PREIMPLEMENTATION_AUDIT_2026-09-08.md and CODEX-22_RELATED_GUIDES_PRECHECK.md.
