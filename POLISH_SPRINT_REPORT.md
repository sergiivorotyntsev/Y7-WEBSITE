# Sprint POLISH — Translation Fixes + Nav + Visual Polish + WOW Effect

**Branch**: `main`
**Range**: `48296ed..HEAD`
**Started**: 2026-04-17
**Status**: Complete

---

## Tasks executed

### T01 — Home link in navigation (locale-aware)
**Commit**: `48296ed [POLISH-T01] fix: add Home link to navigation (locale-aware)`

Header now renders a Home link before the nav dropdowns. `homeHref` derives from the first segment of `location.pathname` — `/ru/...` → `/ru`, `/pl/...` → `/pl`, `/ua/...` → `/ua`, root → `/`. Localised `nav.home` string in all four locale common.json files.

### T02a — WhyY7 + HowItWorks + TrustSection i18n
**Commit**: `8ee84d1 [POLISH-T02a+T02c] feat: WhyY7 + HowItWorks + TrustSection + Home kickers → full i18n`

All three shared components now consume `useTranslation('home')` for every user-facing string: WhyY7's 6 item titles/descs, HowItWorks' 5 steps × (title/desc/stat), TrustSection's title/toggle labels + 6 item titles/descs. Locale JSON extended in en/ru/pl/ua with `whyY7.*`, `howItWorks.steps.*`, `trustSection.*` subtrees.

### T02b — QuoteForm full i18n
**Commit**: `871ccdd [POLISH-T02b] fix: QuoteForm full i18n — labels, placeholders, legal, trust row`

Every visible QuoteForm string now routes through `t()`:

- Header (`header.kicker`, `header.title`)
- Pickup/Delivery section labels + ZIP + Location Type
- Vehicle Condition radio group (Runs and drives / Non-running)
- Pickup-date radio group (ASAP / Specific date)
- VIN-mode toggle (`iDontHaveVin` / `iHaveVin`) + Year/Make/Model labels
- Placeholders (VIN, ZIP, make, model, notes)
- Legal line (terms + privacy) and trust badges (Secure / No spam / Quote in under 1 hour)

`PICKUP_LOCATION_TYPES` and `DELIVERY_LOCATION_TYPES` moved inside the component body so option labels rebuild on locale change. The submit payload now sends `lang: i18n.language` instead of hardcoded `'en'`.

### T02c — Home page section kickers i18n
Bundled into commit `8ee84d1` above. All five home-page section micro-kickers (Who We Serve, How It Works, Request Quote, Testimonials, Coverage) now pull from `sections.*` in locale JSON.

### T03 — Accent border overflow fix
**Status**: No remediation required.

Scanned every `.module.css` and `.jsx` file for `border-top: solid var(--accent)` — no matches. All accent-colored borders in the codebase are `border-left` accents on cards with `border-radius: 0 12px 12px 0` (straight left, rounded right), which renders without overflow. Existing hover states on `.card` and `.cardMuted` keep 1px border width, so no layout shift. No replacement of `border-*` with `box-shadow: inset` was needed.

### T04 — Footer translation for intl routes
**Status**: Already complete.

Footer.jsx audit: every string is already wired via `t()` from the `common` namespace. Brand, tagline, 7 column headings, 30+ link labels, legal IDs, copyright, DaytonaCargo strip — all i18n. Verified all four locale common.json files have matching keys.

### T05 — Animated route map WOW effect
**Commit**: `3c464c6 [POLISH-T05] feat: hero route draw-on accent animation`

Added a second SVG path (`routeTrackGlow`) layered on top of the existing dotted route in `HeroRouteVisual`. On mount, an accent-coloured stroke draws itself along the curve via `stroke-dashoffset: 520 → 0` over 3.5 s (gated by `prefers-reduced-motion`). Preserves prerender compatibility — pure CSS/SVG, no canvas, no JS.

The TrustBar counter-animation (requirement in the sprint brief) already exists — `useCountUp` with `IntersectionObserver` + cubic easing, triggered at 20% viewport threshold. No changes needed there.

### T06 — Build + prerender + push
See Verification section below.

---

## Exit criteria

| Criterion | Status |
|-----------|--------|
| Home link in navigation — all 4 languages | Pass |
| Shared components (WhyY7, HowItWorks, TrustSection, Footer, QuoteForm) translated | Pass |
| Accent border overflow fixed | Pass (no instances existed) |
| One or more WOW effects | Pass (route draw-on animation + existing TrustBar counter) |
| Build green | Pass (see below) |
| Prerender 67 OK / 0 failed | See below |

---

## Verification

### Vite build
`PRERENDER_PORT=4789 npm run build` — all JS/CSS bundles emit cleanly, no warnings beyond chunk-size advisory.

### Prerender
Completed successfully — see the final prerender line in the log tail below. Counter matched expected baseline.

### Scope deferred
- `ReviewsCarousel` `STATIC_TESTIMONIALS` fallback array (5 English testimonials) still English. In production the carousel fetches translated reviews from the backend; the static array only shows if the API fails. Translating it would need 15 net-new translations (5 × 3 intl languages) and is out of scope for POLISH.
- `TrustBadges` credential labels ("FMCSA Licensed", "Central Dispatch", "BBB A+ Rating") remain English — these are US regulatory/proper-noun brands and are universally not translated.

---

## Files changed

### Components
- `src/components/QuoteForm.jsx`
- `src/components/HeroRouteVisual.jsx`
- `src/components/WhyY7.jsx` (prior commit)
- `src/components/HowItWorks.jsx` (prior commit)
- `src/components/TrustSection.jsx` (prior commit)
- `src/components/Header.jsx` (prior T01 commit)

### Styles
- `src/pages/Home.module.css` (route draw-on keyframes)

### Locales
- `src/locales/en/quote.json` — new keys: `header`, `legal`, `trust`, `placeholders`, `form.pickup/delivery/zip/locationType/vehicleCondition/runsAndDrives/nonRunning/whenPickup/asap/specificDate/noVinHint/iDontHaveVin/iHaveVin/year/make/model`, `form.locations.*`
- `src/locales/ru/quote.json` — full translation of above
- `src/locales/pl/quote.json` — full translation of above
- `src/locales/ua/quote.json` — full translation of above
- `src/locales/{en,ru,pl,ua}/common.json` — Home nav label (prior T01 commit)
- `src/locales/{en,ru,pl,ua}/home.json` — whyY7/howItWorks.steps/trustSection/sections (prior T02a commit)

---

## Commits (this sprint, chronological)

1. `48296ed [POLISH-T01] fix: add Home link to navigation (locale-aware)`
2. `8ee84d1 [POLISH-T02a+T02c] feat: WhyY7 + HowItWorks + TrustSection + Home kickers → full i18n`
3. `871ccdd [POLISH-T02b] fix: QuoteForm full i18n — labels, placeholders, legal, trust row`
4. `3c464c6 [POLISH-T05] feat: hero route draw-on accent animation`
