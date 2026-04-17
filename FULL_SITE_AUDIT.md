# Y7-WEBSITE Full Site Audit
**Date:** 2026-04-17
**Scope:** Complete read-only audit — translations, design parity, content consistency, design debt
**Method:** 5 parallel agents (page inventory + design debt, Polish audit, Ukrainian audit, Russian audit, cross-language fact check)
**Files modified:** None (audit only)

---

## Executive Summary

| Dimension | Score | Summary |
|---|---|---|
| **Page coverage** | ~60 EN pages / 9 intl / 10 portal — ~80 total | Translated: Home, ShipMyCar, Copart only (×3 languages). Most EN public pages have NO intl version. |
| **Translation quality** | UA: NATIVE · PL: GOOD · RU: GOOD | All three languages well-crafted. No machine-translation artifacts. |
| **Translation completeness** | UA: FULL · PL: FULL · RU: PARTIAL | Russian pages structurally thinner than EN (missing live activity feed, testimonials, port pills). |
| **Design parity (intl)** | DIVERGED | All 9 intl pages are inline-styled only. Zero CSS module imports. English pages use modular CSS. |
| **Factual consistency** | MIXED — 5 inconsistencies found | 1 CRITICAL compliance violation (24/7 claim in RU); 4 non-critical divergences. |
| **Design debt (EN)** | LOW — Sprints 1–3 largely cleaned up | 5 component inline `<style>` tags remain as DESIGN-4 candidates. |

**CRITICAL ACTION REQUIRED:** `src/pages/intl/RussiaShipMyCar.jsx:741` contains **"Круглосуточная диспетчерская"** — a 24/7 dispatch claim that was supposed to be removed in the prior hotfix. This is a compliance violation and must be fixed before any further RU traffic is sent to the page.

---

## 1. Page Inventory

### English public pages (18)

| File | Route | Has CSS Module? |
|---|---|---|
| src/pages/Home.jsx | `/` | YES |
| src/pages/Services.jsx | `/services` | YES |
| src/pages/Dealers.jsx | `/dealers` | YES |
| src/pages/Exporters.jsx | `/exporters` | YES |
| src/pages/ShipMyCar.jsx | `/ship-my-car` | YES |
| src/pages/About.jsx | `/about` + `/:lang/about` | YES |
| src/pages/Contact.jsx | `/contact` | YES |
| src/pages/FAQ.jsx | `/faq` + `/:lang/faq` | YES |
| src/pages/Track.jsx | `/track` | YES |
| src/pages/Quote.jsx | `/quote` + `/:lang/quote` | **NO** |
| src/pages/QuoteAction.jsx | `/:lang/quote/:action/:orderId` | **NO** |
| src/pages/DealerQuote.jsx | `/dealer-quote` + `/:lang/dealer-quote` | YES |
| src/pages/ReviewSubmit.jsx | `/review/:token` | **NO** |
| src/pages/MagicLogin.jsx | `/portal/magic/:token` | **NO** |
| src/pages/Agreement.jsx | `/agreement` + `/:lang/agreement/:orderId` | **NO** |
| src/pages/PrivacyPolicy.jsx | `/privacy` | YES (Legal.module.css) |
| src/pages/Terms.jsx | `/terms` | YES (Legal.module.css) |
| src/pages/Accessibility.jsx | `/accessibility` | YES (Legal.module.css) |

### English SEO pages (16 + SeoLandingPage template)

All use shared `SeoLandingPage.module.css` template:
- Cost/type: CarShippingCost, EnclosedCarShipping, OpenCarShipping, AuctionCarShipping, CopartShipping, IaaiTransport, ManheimTransport, SalvageCarShipping, DoorToPort, DealerAutoTransport, StateToState, TeslaCarShipping, EVAutoTransport, CybertruckShipping, ElectricVehiclePortDelivery
- Guides: HowToShipAuctionCar, OpenVsEnclosed, BillOfLading
- Locations: MassachusettsCarShipping, BostonCarShipping, NewtonAutoTransport, FloridaCarShipping, NewJerseyAutoTransport, TexasAutoTransport
- Routes: MassachusettsToFlorida, NewJerseyToFlorida, TexasToNewark, ChicagoToNewark, AuctionToPort

### English blog (2 framework + 8 articles)
BlogIndex.jsx, BlogArticle.jsx (YES CSS modules); articles use BlogArticle template (no individual CSS modules).

### Port pages (1 shared template)
src/pages/ports/PortPage.jsx — routes `/ports/:slug` + `/:lang/ports/:slug` (YES CSS module).

### Polish pages (3)

| File | Route | Has CSS Module? |
|---|---|---|
| src/pages/intl/PolandHome.jsx | `/pl` | **NO** |
| src/pages/intl/PolandShipMyCar.jsx | `/pl/ship-my-car` | **NO** |
| src/pages/intl/PolandCopart.jsx | `/pl/copart-shipping` | **NO** |

### Ukrainian pages (3)

| File | Route | Has CSS Module? |
|---|---|---|
| src/pages/intl/UkraineHome.jsx | `/ua` | **NO** |
| src/pages/intl/UkraineShipMyCar.jsx | `/ua/ship-my-car` | **NO** |
| src/pages/intl/UkraineCopart.jsx | `/ua/copart-shipping` | **NO** |

### Russian pages (3)

| File | Route | Has CSS Module? |
|---|---|---|
| src/pages/intl/RussiaHome.jsx | `/ru` | **NO** |
| src/pages/intl/RussiaShipMyCar.jsx | `/ru/ship-my-car` | **NO** |
| src/pages/intl/RussiaCopart.jsx | `/ru/copart-shipping` | **NO** |

### Portal pages (10, intentionally untouched per sprint scope)
Login, Register, Dashboard, OrderDetail, DispatchDetails, NewOrder, Billing, Locations, LocationSetup, Profile — none have CSS modules.

---

## 2. Translation Completeness Matrix

| Intl Page | English Equivalent | Sections in EN | Sections in Intl | Missing | Extra | Rating |
|---|---|---|---|---|---|---|
| PolandHome.jsx | Home.jsx | 9 (Hero, AudienceCards, LiveFeed, TrustBar, HowItWorks, WhyY7, TrustSection, Testimonials, PortPills) | 8 (Hero, Dwie firmy, Proces, Koszty, Kiedy się opłaca, Pułapki, FAQ, Dla Polonii, CTA) | LiveFeed, Testimonials, PortPills | "Dla Polonii w USA" diaspora section | **FULL** (hand-written, structurally complete) |
| PolandShipMyCar.jsx | ShipMyCar.jsx | 12 | 9 | Peak season prose, Pickup/Delivery detailed sections | Diaspora section | **FULL** |
| PolandCopart.jsx | seo/CopartShipping.jsx | 10 (template) | 10 (expanded: Copart vs IAAI, Opłaty, Pułapki, Współpraca, Diaspora) | None | Extensive educational content | **FULL** |
| UkraineHome.jsx | Home.jsx | 10 | 12 (Hero, Audience, Stats, About, WhyY7, Routes, Process, Pricing, Diaspora, Contact, FAQ, CTA) | None (expanded) | Stats block, dedicated Routes + Pricing tables | **FULL** |
| UkraineShipMyCar.jsx | ShipMyCar.jsx | 10+ | 11 | None | Diaspora highlight + use cases | **FULL** |
| UkraineCopart.jsx | seo/CopartShipping.jsx | 13 | 14 | None | Copart vs IAAI table, Risk Warnings, Diaspora | **FULL** |
| RussiaHome.jsx | Home.jsx | 11 | 9 | LiveFeed, Testimonials/Reviews, PortPills, ExternalReviewsStrip | Stats block, Risks section | **PARTIAL** |
| RussiaShipMyCar.jsx | ShipMyCar.jsx | 13 | 7 | Transport Comparison, Pricing Factors prose, Peak Season, Pickup/Delivery detail sections, ExternalReviews | Contact cards, Trust badge | **PARTIAL** |
| RussiaCopart.jsx | seo/CopartShipping.jsx | 9 | 9 | None | None | **FULL** |

---

## 3. Translation Quality Assessment

### 3.1 Polish Pages — Rating: **GOOD** (native-level for diaspora audience)

**Terminology:** Excellent. Natural automotive Polish: "sprowadzanie aut z USA", "fracht morski", "odprawa celna", "salvage title" correctly explained as "pojazd uznany przez ubezpieczyciela za szkodę całkowitą".

**DaytonaCargo co-branding (INTENTIONAL & CORRECT):**
- PolandHome.jsx:137 — kicker "Y7 Logistics × DaytonaCargo"
- PolandHome.jsx:158 — "nasza siostrzana firma DaytonaCargo LLC"
- PolandShipMyCar.jsx:311, PolandCopart.jsx:196-197 — "siostrzana firma DaytonaCargo LLC z siedzibą w Dover, Delaware"
- Proper transparent disclaimer: "Y7 nie prowadzi obsługi w języku polskim" (PolandHome.jsx:590-593) — directs Polish speakers to DaytonaCargo.
- External links to `daytonacargo.com/pl` present on all three pages.

**Compliance checks:**
- ✅ Zero phone numbers on any PL page
- ✅ Only allowed addresses: Newton, MA and Dover, DE
- ✅ MC #1741537 and USDOT #4427359 correct on all pages (PolandHome.jsx:156, 235-236, 306; schema lines 22-41)
- ✅ "Y7 Logistics" used consistently, never "Y7 Agency"/"Y7 Transport"
- ✅ No 24/7 dispatch claims — realistic "w ciągu godziny" (within an hour)
- ✅ No GPS/real-time tracking claims
- ✅ SEO meta titles: 61–79 chars; descriptions: 161–166 chars; `<html lang="pl">`, canonicals, FAQPage + BreadcrumbList schema all present
- ✅ No PLACEHOLDER_META_TITLE strings
- ℹ️ Polish competitor URLs (americars.com.pl, motopodprad.pl, cars-world.pl, usrides.pl, petrolboys.pl) appear only in **source comments** as research references, NOT as clickable links in page content. `daytonacargo.com/pl` is the only external link and is present correctly.

### 3.2 Ukrainian Pages — Rating: **NATIVE**

**Terminology:** Exceptional. Authentic Ukrainian vocabulary throughout: "пригін авто", "майданчик", "морський фрахт", "розмитнення", "комісія покупця". NO Russian calques detected — flagged vocabulary like "импорт автомобилей" or Russian-form endings absent. Dedicated Ukrainian usage of "зʼєднує" over Russian-calque alternatives.

**War-context messaging:** Respectful and appropriate. "У нинішніх умовах Констанца стала важливим хабом" (UkraineCopart.jsx:1000) — acknowledges wartime logistics shifts without being heavy-handed.

**DaytonaCargo check:** ✅ ZERO mentions across all 3 Ukrainian pages (correct — DaytonaCargo is PL-only partnership).

**Compliance checks:**
- ✅ Zero phone numbers
- ✅ No street addresses (contact only via Telegram/email/portal links)
- ✅ MC #1741537 / USDOT #4427359 present and correct (multiple locations per page)
- ✅ "Y7 Logistics" brand consistent
- ✅ No 24/7 / GPS / tracking claims
- ✅ SEO meta titles: 58–70 chars; descriptions: 155–161 chars (all >80 char requirement)
- ✅ No PLACEHOLDER_META_TITLE strings
- ✅ Routes to Gdynia/Klaipėda/Constanța correctly positioned as primary UA ports (different logistics reality than PL/RU pages)

### 3.3 Russian Pages — Rating: **GOOD** (NATIVE on Copart, GOOD on Home/ShipMyCar)

**Terminology:** Natural US diaspora/CIS register, not Moscow corporate-speak. Industry-standard automotive terms: "автовоз", "закрытый/открытый", "лебёдка", "salvage title" left as-is where appropriate. Pricing rendered correctly ($ references, comma/dot formatting).

**DaytonaCargo check:** Present in RussiaHome.jsx:130 and RussiaCopart.jsx:180, framed as unnamed-country "international shipping partner" (compliant with intentional pattern of not stating Poland).

**CRITICAL COMPLIANCE VIOLATION:**
- ❌ **RussiaShipMyCar.jsx:741** — `"MC #1741537 · USDOT #4427359 · Круглосуточная диспетчерская"` — contains **24/7 dispatch claim** ("Круглосуточная диспетчерская" = "round-the-clock dispatch"). This contradicts the prior hotfix directive to remove all 24/7 claims from RU pages. **Must be removed immediately.**

**Other compliance:**
- ✅ Zero phone numbers
- ✅ No street addresses
- ✅ MC #1741537 / USDOT #4427359 correct on all 3 pages
- ✅ "Y7 Logistics" brand
- ✅ No GPS/real-time tracking
- ✅ SEO meta titles: 43–46 chars; descriptions: 130–143 chars (all meet thresholds)
- ✅ RussiaHome.jsx:69 uses correct "Диспетчер отвечает в рабочие часы" (business hours)
- ✅ RussiaCopart.jsx:78 correctly uses "в любое время" (async/anytime via Telegram) — NOT a 24/7 live-agent claim

---

## 4. Design Parity Audit

| Intl Page | English Page | Design Match | CSS Module Used? | Issues |
|---|---|---|---|---|
| PolandHome.jsx | Home.jsx | **DIVERGED** | NO — all inline `style={{}}` | Hand-written, styles semantically identical (same theme tokens) but zero CSS module imports. No hover/focus via `interactions.module.css`. Structure matches: Hero → Stats → Cards → Process → Examples → Risks → FAQ → CTA. |
| PolandShipMyCar.jsx | ShipMyCar.jsx | **SIMILAR** | NO | Hero (kicker + H1 + CTAs) identical. Grid system matches. `<details>/<summary>` FAQ. No CSS modules imported; buttons re-styled inline. |
| PolandCopart.jsx | seo/CopartShipping.jsx | **OUTDATED** | NO | Fully custom hand-written page vs English SEO template. More content but no shared component system. `<details>` FAQ present. |
| UkraineHome.jsx | Home.jsx | **SIMILAR** | Partial — imports `interactions.module.css` at line 278 (`.liftCard`); contains inline `<style>` block at line 418 | Hero pattern matches. Section rhythm with alternating padding. FAQ via `<details>/<summary>` (1144-1172). Dark CTA strip at 1180-1230. Uses `.liftCard` hover — only intl page to use any CSS module. |
| UkraineShipMyCar.jsx | ShipMyCar.jsx | **DIVERGED (intentional)** | NO | Hero centered, matches ShipMyCar. FAQ uses static card grid (945-979) instead of `<details>` — parity break from UkraineHome. Highlight boxes via inline `borderLeft: 4px solid`. Missing alternating section backgrounds. |
| UkraineCopart.jsx | seo/CopartShipping.jsx | **IDENTICAL** | NO (but mirrors SeoLandingPage template pattern) | Replicates template exactly: breadcrumb, H1 with clamp(), cardStyle + warningCardStyle + stepNumberStyle helpers. FAQ via static cards (matches English CopartShipping). |
| RussiaHome.jsx | Home.jsx | **DIVERGED** | NO — inline only | Missing: HeroRouteVisual, AudienceCards, LiveActivityFeed, ReviewsCarousel, ExternalReviewsStrip, TrustSection components. Simpler Hero (kicker → H1 → paragraph → CTAs). `<details>/<summary>` FAQ with hardcoded "+" (EN uses Chevron icon component). |
| RussiaShipMyCar.jsx | ShipMyCar.jsx | **DIVERGED** | NO | No kicker (Hero simplified to H1 + paragraph). No ScrollReveal. `<details>/<summary>` FAQ. Missing alternating backgrounds. |
| RussiaCopart.jsx | seo/CopartShipping.jsx | **DIVERGED** | NO | Self-contained inline vs English SEO template. Breadcrumb nav present. No thematic CSS reuse. |

**CSS module usage analysis:**
- `cards.module.css` — exists, exports `.card`, `.cardStatic`, `.cardMuted`, `.cardDark`, `.cardGrid*`, `.accentBorder`. **UNUSED in all 9 intl pages.**
- `interactions.module.css` — exists, exports `.liftCard`, `.subtleLift`, `.underlineGrow`, `.focusRing`, `.fadeIn`, etc. **Used only in UkraineHome.jsx:278** (one call site).
- `layout.module.css` (from DESIGN-3) — **unused in intl pages.**

**Consistent structural elements across ALL 9 intl pages:**
- ✅ Hero pattern (kicker + H1 + subtitle/paragraph + CTAs)
- ✅ Card grid via `gridTemplateColumns: 'repeat(auto-fit, minmax(...))'`
- ✅ Dark CTA footer section
- ✅ `<hreflang>` tags, canonical links, `<html lang="XX">`
- ✅ FAQPage + BreadcrumbList schema

**Missing across all 9 intl pages:**
- ❌ Hover/focus state styles (no `interactions.module.css` classes except UkraineHome:278)
- ❌ ScrollReveal animations
- ❌ Shared button styles (`buttons.module.css` not imported)
- ❌ Shared card styles (`cards.module.css` not imported)

---

## 5. Content Accuracy Cross-Check

| # | Claim | EN | PL | UA | RU | Consistent? | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Brand name | Y7 Logistics | Y7 Logistics × DaytonaCargo co-brand | Y7 Logistics | Y7 Logistics | **INTENTIONAL DIVERGENCE** | PL co-branding deliberate. |
| 2 | FMCSA MC # | 1741537 | 1741537 | 1741537 | 1741537 | ✅ YES | — |
| 3 | USDOT # | 4427359 | 4427359 | 4427359 | 4427359 | ✅ YES | — |
| 4 | HQ address | Newton, MA (in Home.jsx schema) | Newton, Massachusetts | Not stated | Not stated | ⚠️ PARTIAL | UA/RU pages omit HQ location. |
| 5 | Carriers network | Implicit | "100+" | Not quantified | "100+ проверенных" | ⚠️ PARTIAL | EN/UA don't quantify. |
| 6 | Service area | All 50 states | Wszystkie 50 stanów | Усі 50 штатів | 50 штатов | ✅ YES | — |
| 7 | Contact method | Telegram primary | Telegram primary | Telegram primary | Telegram primary | ✅ YES | — |
| 8 | Email | info@y7agency.com | same | same | same | ✅ YES | — |
| 9 | Phone numbers | None | None | None | None | ✅ YES | Zero on all pages. |
| 10 | Port destinations | Newark, Baltimore, Savannah, Houston, LA | Same + LA | Gdynia, Klaipėda, Constanța (intl destinations) | Newark, Baltimore, Savannah, Houston, LA, Jacksonville | **INTENTIONAL DIVERGENCE** | UA correctly positions EU ports as destination; others US-centric. |
| 11 | Domestic transport pricing | $300–$1,600 (tiered) | $350–$950 (single) | $350–$950 | $300–$1,600 (tiered) | ⚠️ INCONSISTENT | PL/UA single range; EN/RU tiered. Same service different ranges. |
| 12 | International sea freight | Not specified | $1,150–$2,250 + 4–8k PLN | $1,200–$2,400 + $600–$1,200 | Not explicit | ⚠️ DIVERGENT | — |
| 13 | Process steps | 4–5 | 5–6 | 6 | 5 | ✅ ACCEPTABLE | Minor variation. |
| 14 | Insurance/BOL | Present | Present | Present | Present | ✅ YES | — |
| 15 | DaytonaCargo mentions | None | Explicit co-brand (intended) | None (correct) | "партнёрская компания DaytonaCargo" (country-anonymous) | ✅ AS DESIGNED | Per file comment in RussiaHome.jsx:13: "Mention DaytonaCargo only as 'international shipping' without specifying country". |
| 16 | 24/7 dispatch claim | Absent | Absent | Absent | **PRESENT — line 741 of RussiaShipMyCar.jsx** | ❌ **CRITICAL** | Violates hotfix directive. |
| 17 | GPS / real-time tracking | Absent | Absent | Absent | Absent | ✅ YES | Clean across languages. |
| 18 | "10+ years experience" | Not stated | Not stated | Not stated | **STATED (RussiaHome.jsx:102, 330 + RussiaShipMyCar.jsx:384)** | ⚠️ UNSUBSTANTIATED | Only in Russian version. |
| 19 | Polish competitor references | N/A | Source comments only (not linked) | N/A | N/A | ✅ CORRECT | Research refs, not endorsements. |
| 20 | Brand "Y7 Logistics" spelling | Consistent | Consistent | Consistent | Consistent | ✅ YES | No "Y7 Agency" / "Y7 Transport" anywhere. |

### Inconsistencies summary (most critical first)

1. **CRITICAL:** `RussiaShipMyCar.jsx:741` — "Круглосуточная диспетчерская" (24/7 dispatch) — must be removed.
2. **HIGH:** `RussiaHome.jsx:102, 330` + `RussiaShipMyCar.jsx:384` — "10+ лет опыта" / "Более 10 лет опыта" — unsubstantiated claim only present in Russian pages. Either remove or corroborate in other language versions.
3. **MEDIUM:** Domestic transport pricing — EN/RU use tiered ranges ($300–$1,600 distance-based); PL/UA use single $350–$950 range. Same service, different customer expectations.
4. **MEDIUM:** HQ location (Newton, MA) stated in EN schema only. UA/RU pages do not identify the legal entity's physical address.
5. **LOW:** Carriers-network quantification: PL/RU state "100+"; EN/UA leave implicit. Minor marketing asymmetry.
6. **CARRYOVER (not part of this audit but known):** Per DESIGN-1 report, PortPage.jsx displays wrong MC #1627229 / USDOT #4246498 on 6 port pages — verify whether fixed.

---

## 6. Missing Pages Analysis

| EN Page | Intl Coverage | Need translation? | Business value |
|---|---|---|---|
| Home | ✅ PL/UA/RU | — | — |
| ShipMyCar | ✅ PL/UA/RU | — | — |
| seo/CopartShipping | ✅ PL/UA/RU | — | — |
| **Services** | ❌ None | YES — HIGH priority | Primary nav hub, explains Y7 offering. PL needs Y7+DaytonaCargo co-brand; UA/RU Y7-only for diaspora. |
| **Dealers** | ❌ None | YES — HIGH | B2B audience. PL version would be Y7+DaytonaCargo co-brand. |
| **Exporters** | ❌ None | YES — HIGH | Critical for port-export market (IAAI/Copart → Poland/Ukraine). |
| **About** | ❌ (route exists, renders EN) | YES — MEDIUM | Brand/compliance story varies by market. |
| **Contact** | ❌ None | PARTIAL — MEDIUM | Locale-specific dispatch hours & entity info. |
| **FAQ** | ⚠️ Route `/:lang/faq` exists but renders English | YES — MEDIUM-HIGH | FAQ is conversion-resistance page; market-specific objections. |
| **Quote** | ⚠️ Route `/:lang/quote` exists but form is English | YES — HIGH | Primary conversion surface. |
| **DealerQuote** | ⚠️ Route `/:lang/dealer-quote` exists but English-only | YES if Services/Dealers intl added | — |
| **Agreement** | ⚠️ Route `/:lang/agreement/:orderId` exists but English-only | YES — MEDIUM | Pre-signing document; needs locale versions. |
| **Blog + 8 articles** | ❌ None | PARTIAL — MEDIUM | Translate only highest-value articles (e.g. auction-to-port, compliance) per market. |
| **Terms / Privacy / Accessibility** | ❌ None | YES — MEDIUM | Jurisdictional (GDPR for EU, TCPA for US). |
| Port pages | ⚠️ `/:lang/ports/:slug` routes exist but render same template | PARTIAL | Template i18n rather than per-page translations. |
| **Track** | ❌ None | LOW | Post-quote, minimal marketing value. |
| **ReviewSubmit** | ❌ None | LOW | Single-use token page. |

**Key gap:** The full pre-purchase funnel (Services → Dealers/Exporters → Contact → FAQ → Quote) is English-only for PL/UA/RU users. Currently PL/UA/RU users can only navigate Home → ShipMyCar → Copart, then drop into English for everything else.

---

## 7. Remaining Design Debt

### 7.1 Inline `<style>` tags (13 total)

| File | Line | Status |
|---|---|---|
| src/components/Layout.jsx | 24 | ✅ ACCEPTABLE — global keyframes (per DESIGN-3) |
| src/components/FloatingContact.jsx | 35 | ✅ DEAD CODE — safe to delete |
| src/components/ChatWidget/index.jsx | 206 | ✅ OUT OF SCOPE |
| src/components/AuctionToPortWorkflow.jsx | 15 | ⚠️ DESIGN-4 candidate |
| src/components/WhatHappensNext.jsx | 38 | ⚠️ DESIGN-4 candidate |
| src/components/PricingRange.jsx | 22 | ⚠️ DESIGN-4 candidate |
| src/components/RouteEstimator.jsx | 83 | ⚠️ DESIGN-4 candidate |
| src/components/CookieConsent.jsx | 44 | ⚠️ DESIGN-4 candidate |
| src/components/LiveActivityFeed.jsx | 68 | ⚠️ DESIGN-4 candidate |
| src/components/VehicleSilhouette.jsx | 74 | ⚠️ May be acceptable (SVG-specific) |
| src/pages/intl/UkraineHome.jsx | 418 | ⚠️ DESIGN-4 candidate (intl scope) |
| src/pages/portal/Dashboard.jsx | 172 | ✅ OUT OF SCOPE (portal) |
| src/pages/portal/OrderDetail.jsx | 115 | ✅ OUT OF SCOPE (portal) |

### 7.2 `onMouseEnter` / `onMouseLeave` handlers

**Legitimate (functional, not visual):**
- src/components/ReviewsCarousel.jsx:58-59 — carousel pause ✅
- src/components/TestimonialCarousel.jsx:67-68 — carousel pause ✅
- src/pages/ReviewSubmit.jsx:86,93 — star-rating preview ✅

**Violations (visual hover via JS style manipulation):**
- ❌ src/components/ChatWidget/index.jsx:86-87 — inline style manipulation for hover (out-of-scope)
- ❌ src/pages/portal/Dashboard.jsx:357-358, 473-474 — visual hover (portal, out-of-scope)

### 7.3 Pages without CSS modules (public — should be addressed)

| File | Priority |
|---|---|
| src/pages/Quote.jsx | HIGH — primary conversion surface |
| src/pages/QuoteAction.jsx | HIGH |
| src/pages/ReviewSubmit.jsx | MEDIUM |
| src/pages/Agreement.jsx | MEDIUM |
| src/pages/MagicLogin.jsx | LOW — single-use token |
| All 9 intl pages (PL/UA/RU × Home/ShipMyCar/Copart) | MEDIUM — design parity gap |

### 7.4 Components without CSS modules (major)

AuctionToPortWorkflow, WhatHappensNext, PricingRange, RouteEstimator, CookieConsent, LiveActivityFeed, VehicleSilhouette, TestimonialCarousel, FloatingContact (dead).

### 7.5 Sprint completion context

DESIGN Sprints 1, 2, 3 all completed 2026-04-17. Key carry-overs flagged but unverified in this audit:
- PortPage.jsx may still show wrong MC #1627229 / USDOT #4246498 on 6 port pages (DESIGN-1 carry-over — needs verification)
- 24/7 dispatch claims in Russian intl pages — **CONFIRMED STILL PRESENT** (see §3.3 / §5)
- Blog byline brand drift in 6 articles — not audited
- 13 thin-content SEO pages — not audited

---

## 8. Priority Action Items

### CRITICAL (legal / factual errors — fix before next deploy)

1. **Remove 24/7 dispatch claim from RussiaShipMyCar.jsx**
   - File: `src/pages/intl/RussiaShipMyCar.jsx`
   - Line: 741
   - Current: `"MC #1741537 · USDOT #4427359 · Круглосуточная диспетчерская"`
   - Change to: `"MC #1741537 · USDOT #4427359 · Диспетчерская в рабочие часы"` (or simply remove the third segment)
   - Effort: 1-line edit
   - Reason: Violates prior hotfix directive; Y7 cannot support 24/7 dispatch claim.

2. **Verify PortPage.jsx MC/DOT numbers**
   - File: `src/pages/ports/PortPage.jsx`
   - Flagged in DESIGN-1 report but status unverified: was showing MC #1627229 / USDOT #4246498 instead of MC #1741537 / USDOT #4427359 on 6 port pages.
   - Effort: Grep + find/replace if still present.

3. **Remove unsubstantiated "10+ years experience" claim from Russian pages**
   - Files:
     - `src/pages/intl/RussiaHome.jsx` lines 102, 330
     - `src/pages/intl/RussiaShipMyCar.jsx` line 384
   - Current: "Более 10 лет опыта" / "10+ лет в автоперевозках по США"
   - Options: (a) corroborate across EN/PL/UA with supporting evidence, OR (b) remove. Currently only in Russian — credibility risk.
   - Effort: 3-line edits

### HIGH (design parity gaps, conversion funnel coverage)

4. **Complete the PL/UA/RU funnel: translate Services + Dealers + Exporters**
   - Files to create: `src/pages/intl/PolandServices.jsx`, `UkraineServices.jsx`, `RussiaServices.jsx` (+ Dealers, Exporters)
   - Rationale: Users who enter via intl Home or SEO landing pages can currently only navigate to ShipMyCar/Copart before dropping into English. Services is the primary nav hub.
   - Effort: Moderate — 9 new pages (3 concepts × 3 languages), following existing intl page template.

5. **Fix `/:lang/faq`, `/:lang/quote`, `/:lang/dealer-quote`, `/:lang/agreement/:orderId`, `/:lang/ports/:slug` routes**
   - These routes currently exist in App.jsx but render the English component. Either translate the components to accept locale prop, or redirect/translate.
   - Effort: Per-route decision needed; form localization is the largest item.

6. **Add CSS modules to intl pages (at minimum import `interactions.module.css` for hover/focus states)**
   - All 9 intl pages currently have no hover/focus states at all (browsers show default focus rings only, not Y7 design tokens).
   - UkraineHome.jsx is the only page that imports `interactions.module.css` — propagate this pattern to the other 8.
   - Effort: Add one import + apply `className={interactions.liftCard}` or similar to existing cards. ~30 min per page.

### MEDIUM (translation completeness & consistency)

7. **Fill RussiaHome.jsx / RussiaShipMyCar.jsx structural gaps**
   - Missing vs English: LiveActivityFeed, Testimonials/Reviews carousel, PortPills/Coverage map, ExternalReviewsStrip, Transport Comparison section, Pricing Factors prose, Peak Season prose, Pickup/Delivery detail sections.
   - Decision first: Is this intentional thinning (diaspora context) or incomplete translation? If incomplete, port sections over.

8. **Migrate UkraineShipMyCar FAQ from static cards to `<details>/<summary>`**
   - File: `src/pages/intl/UkraineShipMyCar.jsx:945-979`
   - Current: static card grid
   - Target: match UkraineHome.jsx `<details>` accordion pattern
   - Effort: Small refactor

9. **Add alternating section backgrounds to UkraineShipMyCar and PL/RU Ship pages**
   - Current: flat background, no visual rhythm
   - Target: alternating `.bgMuted` pattern from UkraineHome/UkraineCopart.

10. **Align domestic transport pricing presentation across languages**
    - EN/RU use tiered ranges ($300–$1,600 by distance bucket)
    - PL/UA use single range ($350–$950)
    - Pick one presentation model and apply consistently.

11. **Decide on HQ-address disclosure policy**
    - EN schema states Newton, MA. UA/RU schemas do not. Either add to all or leave consistently omitted outside of EN schema.

### LOW (design debt — DESIGN-4 sprint)

12. Migrate 5 components with inline `<style>` to CSS modules: AuctionToPortWorkflow, WhatHappensNext, PricingRange, RouteEstimator, CookieConsent.
13. Delete dead `FloatingContact.jsx`.
14. Add CSS module to `Quote.jsx` (flagged in DESIGN-3).
15. Add CSS module to `QuoteAction.jsx`, `Agreement.jsx`, `ReviewSubmit.jsx`.
16. Translate blog articles for highest-value pieces (e.g. FMCSA compliance for PL EU importers; auction-to-port for UA/RU).
17. Translate Terms/Privacy for GDPR compliance on EU-facing PL pages.

---

## 9. Summary Statistics

- **Total .jsx pages:** ~80 (60 EN + 9 intl + 10 portal + 1 shared PortPage template)
- **Intl coverage:** 3 concepts × 3 languages = 9 intl pages (Home, ShipMyCar, CopartShipping)
- **Pages with CSS modules:** 13 public + 1 port + 2 blog framework + 15 SEO (via shared template) + UkraineHome (partial). Zero dedicated modules on the other 8 intl pages.
- **Inline `<style>` tags in source:** 13 files (3 acceptable, 2 out-of-scope portal, 5 DESIGN-4 candidates, 2 in dead code / intl, 1 SVG-specific)
- **Visual onMouseEnter/Leave violations (public):** 0 (all 3 public instances are functional — carousel pause or star-rating preview)
- **Translation quality ratings:** UA × 3 NATIVE · PL × 3 GOOD · RU × 3 GOOD (1 NATIVE) · all 9 well-written
- **Translation completeness:** UA × 3 FULL · PL × 3 FULL · RU × 1 FULL + × 2 PARTIAL
- **CRITICAL compliance violations:** 1 (24/7 claim in RussiaShipMyCar.jsx:741)
- **HIGH-priority compliance issues:** 1 (unsubstantiated "10+ years" on 3 Russian page positions)
- **SEO meta compliance:** 9/9 intl pages have valid titles (>30 chars) and descriptions (>80 chars), canonicals, hreflang, `<html lang="XX">`, schema markup. Zero PLACEHOLDER_META_TITLE strings found.

---

**End of audit. No files modified.**
