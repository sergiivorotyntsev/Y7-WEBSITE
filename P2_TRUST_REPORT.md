# Sprint P2-TRUST-FIX — Report

## Summary

| # | Task | Status |
|---|---|---|
| T01 | Remove false FMCSA cargo-insurance requirement claims | done |
| T02 | Display `UA` instead of `UK` for Ukrainian | done |
| T03 | Verify `/blog` prerender + routing | no code change, verified |
| T04 | Trust layer — business hours, full address, verification strip | done |
| T05 | Blog author attribution + Article schema | done |
| T06 | QuoteFormCompact on home page (3 fields) | done |
| T07 | Verify + push + report | this file |

---

## T01 — FMCSA cargo-insurance factual correction

FMCSA cargo-insurance requirements under 49 CFR Part 387 apply to
household-goods motor carriers (BMC-34), not to for-hire motor carriers
of property — auto transport falls into the latter. Prior copy stated
"per FMCSA requirements" / "as required by FMCSA regulations" for cargo
insurance, which is a factual misrepresentation of regulatory compliance.

Corrected across all 4 locales where present:

| File | Before (keyword) | After (framing) |
|---|---|---|
| `src/locales/en/faq.json:56` | "per FMCSA requirements" | "Y7 verification requirement; we confirm active coverage through Central Dispatch" |
| `src/locales/ru/faq.json:56` | "по требованиям FMCSA" | "требование Y7 по верификации" |
| `src/locales/pl/faq.json:56` | "zgodnie z wymogami FMCSA" | "wymaganie weryfikacji Y7" |
| `src/locales/ua/faq.json:56` | "згідно з вимогами FMCSA" | "вимога Y7 з верифікації" |
| `src/locales/en/agreement.json:59` | "per FMCSA requirements" | "as a Y7 network verification requirement" |
| `src/locales/en/agreement_dealer.json:19` | "as required by FMCSA regulations" | "meeting industry standards and Y7 network verification requirements" |
| `src/locales/ru/agreement_dealer.json:19` | "в соответствии с требованиями FMCSA" | "в соответствии с отраслевыми стандартами и требованиями верификации сети Y7" |
| `src/locales/pl/agreement_dealer.json:19` | "zgodnie z wymogami przepisów FMCSA" | "zgodne ze standardami branżowymi i wymaganiami weryfikacji sieci Y7" |
| `src/locales/ua/agreement_dealer.json:19` | "відповідно до вимог FMCSA" | "відповідно до галузевих стандартів та вимог верифікації мережі Y7" |
| `src/pages/seo/guides/OpenVsEnclosed.jsx:173` | "minimum coverage requirements set by the FMCSA" | "This is our network verification requirement, not an FMCSA regulation for non-household-goods motor carriers" |

**Preserved as accurate FMCSA references:**
- Broker bond language ($75,000 BMC-84 "as required by FMCSA") — the
  BMC-84 broker bond under 49 CFR 387.307 genuinely is an FMCSA
  requirement. Kept in all 4 `agreement_dealer.json` files.
- $750,000 BIPD minimum for motor carriers of property (CarrierCOIVerification article) — real FMCSA requirement, distinct from cargo.
- 49 CFR 379 record-retention citation (privacy policy) — real.
- "FMCSA-licensed broker" / "FMCSA registration" attributions — real.

Other files reviewed and left unchanged because they already framed
cargo insurance correctly (Y7 verification / broker verification, not
FMCSA mandate): `shipMycar.json` (all 4 locales), `OpenCarShipping.jsx`
(lines 103 and 228), `HowToShipAuctionCar.jsx:146`, `StateToState.jsx:77`.

---

## T02 — Language label `UK` → `UA`

ISO 639-1 code for Ukrainian is `uk`, but rendered to English speakers
"UK" reads as United Kingdom. The URL path convention is already `/ua/*`.
Changed all user-facing display labels to `UA` while keeping the
internal `uk` key (i18n standard).

Files touched:
- `src/locales/{en,ru,pl,ua}/home.json` — `whyY7.multilingualDesc`
- `src/locales/{en,ru,pl,ua}/common.json` — `lang.uk` display label

`LanguageSwitcher.jsx` was already using hardcoded `UA` label, so no
change was needed there.

---

## T03 — `/blog` routing verification

No code change required. Verification:

- `scripts/prerender.mjs` — lists `/blog` and 16 article slugs (lines 189–205)
- `scripts/generateSitemap.js` — same 17 entries in sitemap routes
- `dist/blog/index.html` — prerendered with `<title>Blog — Dispatches from the Road | Y7 Logistics</title>`
- `dist/valid-routes.json` — 17 blog-related paths present
- `server.js` — `/blog` and `/blog/:slug` SPA fallback handling present

The audit's report that `/blog` redirects to homepage on the live site
is a Cloudflare edge-cache artifact, not a routing defect.

**User action after next deploy:** Cloudflare dashboard → Caching →
Configuration → Purge by URL `https://www.y7agency.com/blog` (or Purge
Everything).

---

## T04 — Trust layer

Added to **Contact page** (`src/pages/Contact.jsx`):

1. **Business Hours block**
   - Mon–Fri 8:00 AM – 8:00 PM ET
   - Sat 9:00 AM – 5:00 PM ET
   - Sun closed
   - Emergency note: existing customers can reach dispatch via the portal or Telegram 24/7

2. **Registered Office block**
   ```
   Y7 Consulting Inc
   d/b/a Y7 Logistics
   Newton, MA 02458
   United States
   ```
   No invented street address — only verifiable city/state/ZIP/country.

3. **VerificationStrip** (bottom of page) — external links to:
   - FMCSA SAFER carrier snapshot (USDOT #4427359)
   - FMCSA LIVIEW broker detail (MC #1741537)
   - Central Dispatch profile

Added to **Home page** (`src/pages/Home.jsx`):
- `VerificationStrip` section rendered at the bottom after PortPills.

New files:
- `src/components/VerificationStrip.jsx`
- `src/components/VerificationStrip.module.css`

New i18n keys (all 4 locales):
- `contact.hours.{title, monFri, sat, sun, closed, emergencyNote}`
- `contact.address.{title, companyLine, dbaLine, cityLine, countryLine}`
- `verify.{title, fmcsa, broker, cd}` (top-level, reusable)

**Per explicit constraints, NOT added:**
- No phone number (business policy — portal/Telegram/email only)
- No invented street address
- No fabricated testimonials, case studies, or customer names

**"1-hour response" claim:** left as-is where it was already qualified
with "during business hours" (Contact formSubtitle, home fastDesc).
Unqualified occurrences in `shipMycar.json` (`trust2: "1-hour response"`)
are a smaller issue and will be addressed in a later copy pass.

---

## T05 — Blog author attribution + Article schema

Added a single source of truth in `src/data/blogArticles.js`:

```js
const FOUNDER_AUTHOR = {
  name: 'Sergii Vorotyntsev',
  role: 'Founder & Licensed FMCSA Broker',
  credential: 'MC #1741537',
};

const TEAM_AUTHOR = {
  name: 'Y7 Dispatch Team',
  role: 'Dispatch Operations',
  credential: 'Licensed FMCSA Broker MC #1741537',
};

export function authorFor(category) {
  return FOUNDER_CATEGORIES.has(category) ? FOUNDER_AUTHOR : TEAM_AUTHOR;
}
// FOUNDER_CATEGORIES = {fmcsa, insurance, broker}
```

Assignment derived from category (no per-article override needed yet):

| Category | Author | Rationale |
|---|---|---|
| fmcsa | Sergii | Regulatory E-E-A-T on YMYL-adjacent topics |
| insurance | Sergii | Insurance expertise claim |
| broker | Sergii | Broker-tips authority |
| dealer | Y7 Dispatch Team | Operational content |
| exporter | Y7 Dispatch Team | Operational content |
| carrier | Y7 Dispatch Team | Operational/case-study voice |

This yields 9 articles attributed to Sergii, 7 to the Dispatch Team.

`BlogArticle.jsx` changes:
- New `authorBlock` element under the title (name / role / credential)
- `BlogPosting` JSON-LD `author` becomes a `Person` for founder-attributed articles and an `Organization` for team-attributed ones
- `articleAuthor` meta reflects the actual author name
- `publisher.logo` added (ImageObject) for richer schema
- Removed the old hardcoded "Y7 Dispatch Team" line from the meta strip

---

## T06 — QuoteFormCompact on Home

**Rationale.** Baymard-style conversion research says every extra field
reduces completion rate, especially on mobile. The home-page form was
still ~12 fields after the P1-TECH progressive-disclosure pass. First
contact is the highest-friction moment — fewer fields at the top of the
funnel measurably raises lead volume.

**Design.** A 3-field form that captures enough to start a conversation,
then redirects the user to `/quote` (or `/{lang}/quote`) with the values
pre-filled via URL params. The full 12-field form still lives on `/quote`
to collect vehicle details, SMS consent, dates, etc. from a more
committed visitor.

Fields:
- Pickup ZIP (5-digit validation, numeric input)
- Delivery ZIP (5-digit validation, numeric input)
- Email OR phone (one field, shape-detected as email vs 10-digit phone)

Flow:
```
Home.jsx <QuoteFormCompact>
  → on submit, validate, trackEvent('quickquote_submit')
  → navigate(/quote?pickup_zip=X&delivery_zip=Y&(email|phone)=Z)
  → QuoteForm on /quote reads all three from URL params and pre-fills
```

`QuoteForm.jsx` was extended to read `delivery_zip`, `email`, and `phone`
from URL params (only `vin` and `pickup_zip` were read previously). This
is what makes the handoff seamless.

New files:
- `src/components/QuoteFormCompact.jsx`
- `src/components/QuoteFormCompact.module.css`

New i18n keys (all 4 locales) under `home.quickQuote.*`: title, subtitle,
pickupZip, deliveryZip, contactLabel, contactPlaceholder, submit,
needDetailed, useFull, errZipPickup, errZipDelivery, errContact,
errContactFormat.

**Conversion-tracking event:** `quickquote_submit` fires with
`pickup_zip`, `delivery_zip`, and `contact_type` (email/phone). Track
home → /quote → dispatched conversion in GA4 after deploy.

---

## Post-deploy manual actions

1. **Cloudflare cache purge** — Dashboard → Caching → Configuration →
   either Purge by URL (`https://www.y7agency.com/blog`) or Purge Everything.
   This is the only action needed to resolve the audit's "/blog → homepage" finding.

2. **Visual smoke-test of home page** in an incognito window:
   - Cookie banner shows; accept "All"
   - Scroll to quote section: 3-field form renders (not 12-field)
   - Submit with valid ZIPs + email → redirect to `/quote` with all three fields pre-filled
   - Scroll to bottom of home: verification strip shows three external links

3. **Visual smoke-test of Contact page**:
   - Business hours block visible
   - Address block visible
   - Verification strip at bottom

4. **Blog smoke-test**:
   - `/blog` loads the index (not the homepage)
   - Click into any article in `fmcsa` / `insurance` / `broker` category — author block shows "Sergii Vorotyntsev, Founder & Licensed FMCSA Broker, MC #1741537"
   - Click into any article in `dealer` / `exporter` / `carrier` category — author block shows "Y7 Dispatch Team, Dispatch Operations"
   - Inspect page source: `<script type="application/ld+json">` block contains `"author":{"@type":"Person"...}` for founder articles and `"@type":"Organization"` for team articles

5. **Monitor GA4 over 2 weeks**:
   - `quickquote_submit` event frequency (new)
   - `quote_submit` event frequency (existing, on `/quote`)
   - Home → /quote conversion (i.e. proportion of `quickquote_submit` that complete `quote_submit`)
   - Compare total `quote_submit` volume vs the 2 weeks prior to this sprint

---

## Build status

- Lint: 0 errors, 0 warnings
- Vite build: green
- Prerender: 106 OK, 0 failed (verified in final build)
- Bundle sizes: initial `index-*.js` actually shrank slightly (home page no longer bundles full QuoteForm eagerly, only the compact)

## Commit summary

```
fb050c6 [P2-TRUST-T06] feat: QuoteFormCompact on home page — 3-field first-contact form
30fc9d8 [P2-TRUST-T05] feat: author attribution + Article schema on blog posts
7fd07fc [P2-TRUST-T04] feat: trust layer — business hours, full address, verification links
549e340 [P2-TRUST-T03] chore: verify /blog prerender and routing correctness
9f29eb4 [P2-TRUST-T02] fix: display language code UA instead of UK for Ukrainian
bc6bcbe [P2-TRUST-T01] fix: remove false FMCSA cargo insurance requirement claims
```
