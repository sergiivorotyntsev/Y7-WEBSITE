# DESIGN Sprint 3 — Report

**Date:** 2026-04-17
**Branch:** main
**Scope:** QuoteForm + port pages + carousels + remaining components + shared layout extraction
**Outcome:** ✅ All 13 tasks complete. Build + prerender verified green (67 OK / 0 failed).

---

## 1. Components Migrated (Before / After)

| File | Before | After |
|---|---|---|
| `QuoteForm.jsx` (610 lines) | Inline style constants (inputStyle, selectStyle, labelStyle, rowStyle) + inline style blocks throughout | Premium card container with kicker + H2, 2-col field grid, mono VIN input, animated step-2 reveal via module, trust-badge row ("◆ Secure · No spam · Quote in under 1 hour") |
| `DealerQuote.jsx` (351 lines) | Section style constants + inline style blocks | Warm-gradient hero with kicker, card-section form using shared `QuoteForm.module.css` input classes, staggered section reveals (4 sections with `--i` 0-3), trust row |
| `PortPage.jsx` (424 lines) | 16+ inline style blocks + scattered `<style>` keyframes | Full module rewrite: warm hero with credentials badges, section kickers, info-card wrappers for address/tips, route cards with staggered entrance, gradient CTA strip |
| `ReviewsCarousel.jsx` | Inline carousel + inline fadeIn keyframe | Module with large ornamental opening quote mark (`\201C` at 6rem, 18% opacity), serif italic quote text, verified badge, coral-accent active dots |
| `TestimonialCarousel.jsx` | Same inline pattern as ReviewsCarousel | Reuses `ReviewsCarousel.module.css` — no duplicate CSS |
| `Track.jsx` | Inline form + timeline + result card | Module with pill-shaped search form (combines input+submit in one container, focus ring lights up entire form), status timeline with pulsing current-dot (`box-shadow: 0 0 0 4px accent-glow`), accent-bordered error card |
| `FAQ.jsx` | Inline `h2Style / pStyle / ulStyle` + JS-measured accordion | Module with warm hero + kicker, accent-border open state for category cards, focus-visible rings on all toggles, staggered category reveals |
| `LanguageSwitcher.jsx` | Inline `<style>` tag for responsive + inline button styles | Module: desktop = pill group (subtle bg, active pill has white card + shadow), mobile = dropdown trigger (44px tap) + animated panel |
| `PrivacyPolicy.jsx` | 5 inline style constants | Module: warm hero, 720px editorial column, serif H2s, mono `Last Updated` badge |
| `Terms.jsx` (381 lines) | 8 inline style constants | Module via batch `style={h2Style}` → `className={styles.h2}` replace_all |
| `Accessibility.jsx` | Inline constants | Module + narrow editorial column |
| `LoadingSpinner.jsx` | Inline spinner + inline keyframe | Module with `prefers-reduced-motion: reduce` slows spinner instead of disabling |
| `MobileCTA.jsx` | Inline `<style>` for responsive + inline button style constant | Module with border-left dividers between buttons, 44px min-height tap targets, safe-area-inset padding |

All changes preserve existing logic (VIN decode, form validation, portal routing, prerender signal). No text content changed.

---

## 2. CSS Modules Created / Modified

### Created
| File | Purpose |
|---|---|
| `src/styles/layout.module.css` | Shared primitives: `pageHero`, `pageHeroWarm`, `pageHeroDark`, `sectionHeader`, `sectionKicker`, `sectionTitle`, `ctaStrip*`, `narrowColumn`, `wideColumn`, `mediumColumn`, `sectionPadding`, `sectionMuted`, `sectionDark` |
| `src/components/QuoteForm.module.css` | Full quote form system: card container, field row variants, VIN mono row, Step 2 animated reveal, trust-badge row |
| `src/pages/DealerQuote.module.css` | Hero, staggered section cards, trust row, success state |
| `src/pages/ports/PortPage.module.css` | Port hero with credentials, info-card, routes grid, CTA card, not-found fallback |
| `src/components/ReviewsCarousel.module.css` | Carousel card with serif opening quote mark, stars row, pill badges, active dot animation |
| `src/pages/Track.module.css` | Pill search form, status timeline with current-dot glow, error/result cards |
| `src/pages/FAQ.module.css` | Hero, nested accordion (category + Q&A), chevron rotation, focus states |
| `src/components/LanguageSwitcher.module.css` | Pill group (desktop) + dropdown (mobile) with animated panel |
| `src/pages/Legal.module.css` | Shared module for PrivacyPolicy / Terms / Accessibility — hero, narrow column, serif H2, strong, link, divider, footer note, TOC |
| `src/components/LoadingSpinner.module.css` | Spinner keyframe with reduced-motion fallback |
| `src/components/MobileCTA.module.css` | Fixed bottom bar, slide-up on visible, safe-area inset |

**Total new CSS modules: 11**

### Modified
- `src/styles/buttons.module.css` — added `min-height: 40px` base, `44px` at ≤520px (WCAG tap target)

---

## 3. Shared Layout Module Classes (`layout.module.css`)

New reusable classes available to any page/component:

- **Hero variants:** `.pageHero`, `.pageHeroWarm` (gradient), `.pageHeroDark` (dark + warm radial glow)
- **Hero pieces:** `.pageHeroInner`, `.pageHeroKicker`, `.pageHeroTitle`, `.pageHeroSubtitle`
- **Section headers:** `.sectionHeader`, `.sectionKicker`, `.sectionTitle`, `.sectionLede`
- **CTA strip:** `.ctaStrip`, `.ctaStripTitle`, `.ctaStripSubtitle`, `.ctaStripBtn`
- **Columns:** `.narrowColumn` (720px), `.mediumColumn` (900px), `.wideColumn` (1200px)
- **Backgrounds:** `.sectionPadding` (clamp 60-100px), `.sectionMuted`, `.sectionDark`, `.sectionDivider`

Existing pages (Home, Services, Dealers, Exporters, About, ShipMyCar, SeoLandingPage) still define their own hero variants co-located per page, which allows per-page flourishes (e.g. Home's asymmetric hero, AudienceCards-specific animations). The shared module is for future pages and for phase-4 consolidation.

---

## 4. Bundle Impact

### Build output (vite 8, rolldown)

| Artifact | Size | vs DESIGN-2 |
|---|---|---|
| `index-*.js` (main) | 624.34 KB | −3.6 KB (removed inline style constants) |
| `chunk-*.js` (shared) | 42.34 KB | unchanged |
| `index-*.css` (main) | **47.4 KB** | +12.5 KB (shared layout + legal + language switcher) |
| `PortPage-*.css` | 6.18 KB | new (was inline) |
| `DealerQuote-*.css` | 5.13 KB | new (was inline) |

**Total CSS shipped: ~124 KB** across 16 per-page/component chunks. Route-level lazy-loading means the main critical CSS path (47 KB) only includes what Home + Layout + Header + Footer + always-mounted widgets need.

### Prerender: **67 OK, 0 failed**  (unchanged baseline).

---

## 5. Remaining Inline `<style>` Tags

Still present (13 files), with justification:

| File | Reason kept |
|---|---|
| `Layout.jsx` | `<style>{keyframes}</style>` — injects GLOBAL keyframes from `theme.js` that multiple components reference via inline `animation:` attributes. Migrating requires either removing the keyframe re-exports or converting every animation to a `.module.css`. Acceptable pattern. |
| `ChatWidget/index.jsx` | Out of sprint scope (separate chat system) |
| `WhatHappensNext.jsx` | Component-scoped classes injected via `<style>`; candidate for Sprint 4 |
| `AuctionToPortWorkflow.jsx` | Component-scoped; used on 6 port pages — candidate for Sprint 4 |
| `FloatingContact.jsx` | Component file retained but removed from Layout in earlier hotfix — dead code for now |
| `PricingRange.jsx` | Small widget; candidate for Sprint 4 |
| `CookieConsent.jsx` | Template literals with theme colors baked in; candidate for Sprint 4 |
| `LiveActivityFeed.jsx` | Complex animation; candidate for Sprint 4 |
| `VehicleSilhouette.jsx` | SVG styles; may be acceptable inline |
| `RouteEstimator.jsx` | Candidate for Sprint 4 |
| `intl/UkraineHome.jsx` | Large translation-heavy page; candidate for Sprint 4 |
| `portal/Dashboard.jsx` | OUT OF SCOPE (portal pages untouched per sprint constraints) |
| `portal/OrderDetail.jsx` | OUT OF SCOPE (portal) |

### Visual `onMouseEnter` handlers remaining
Scanned after sprint: **zero** visual hover handlers in public pages. All 5 remaining `onMouseEnter` usages are **functional** (carousel pause, star-rating preview, chat widget state).

---

## 6. Mobile Responsive Status

All new/migrated pages tested against these breakpoints in CSS:
- ✅ Hero → single column < 960px
- ✅ Form rows (2-col) → 1-col < 480px
- ✅ Port page routes 2→1 col < 560px
- ✅ FAQ accordion full-width
- ✅ Track page pill form → stacked < 480px
- ✅ Contact 2-column → stacked < 860px
- ✅ Dealers tier table → stacked labels with pseudo-content prefixes < 720px
- ✅ LanguageSwitcher → dropdown < 1024px
- ✅ All buttons: `min-height: 40px` desktop / `44px` mobile (buttons.module.css)
- ✅ MobileCTA bottom bar: 52px + safe-area-inset

---

## 7. Pages to Check Manually

**Priority 1 (highest-impact changes):**
- `/` — Hero (centered from hotfix), AudienceCards, HowItWorks (vertical timeline)
- `/quote` — QuoteForm premium card with kicker + trust badges (this is the #1 conversion surface)
- `/dealer-quote` — Warm hero, staggered form sections, trust row
- `/ports/newark`, `/ports/houston`, etc. — PortPage template with hero, routes grid, CTA card
- `/track` — Pill search form, status timeline (try a valid code + an invalid code)
- `/faq` — Nested accordion with staggered category entrance

**Priority 2 (shared-module dependents):**
- `/contact` — two-column layout (unchanged since T2)
- `/privacy`, `/terms`, `/accessibility` — editorial typography with shared Legal module

**Priority 3 (interaction states):**
- Hover through all AudienceCards → smooth in AND out (verified earlier in DESIGN-1 hotfix)
- Tab through home page → focus rings on every interactive element
- `prefers-reduced-motion: reduce` in DevTools → entrance animations disable, hover/focus stay

---

## 8. What's Left for Future Sprints

### Design completion
1. **Remaining inline `<style>` in non-portal components** — WhatHappensNext, AuctionToPortWorkflow, CookieConsent, LiveActivityFeed, PricingRange, RouteEstimator, VehicleSilhouette. Each needs a small co-located module.
2. **Delete `FloatingContact.jsx`** if truly not needed anywhere (currently kept as dead code from the UX-3 hotfix).
3. **UkraineHome.jsx inline `<style>`** migration (and its Polish/Russian siblings if they have similar patterns).
4. **Adopt `layout.module.css`** in existing page modules via CSS `composes:` — reduces duplicated hero/section/CTA patterns across Home, Services, Dealers, Exporters, About, ShipMyCar, SeoLandingPage.

### Performance
5. **Code-split the main JS chunk** (624 KB) — i18next locales, React-Router, react-helmet-async could be lazy-loaded.
6. **Inline critical CSS** for the `/` route only; defer per-route CSS chunks.
7. **Remove dead `FloatingContact.jsx`** and its reference from `theme.js` keyframes if unused.

### Content / SEO
8. Thicken the 13 thin SEO template pages with custom `<Section>` children (documented in DESIGN-1 report).
9. Add `HreflangTags` to `Exporters.jsx` and `AuctionCarShipping.jsx`.

### Polish
10. Scroll-progress indicator for blog articles.
11. Print styles for legal pages.
12. OG card image generator (currently no dynamic social preview).

---

## Exit Criteria Checklist

- ✅ QuoteForm redesigned as premium card with 2-col grid + trust badges
- ✅ DealerQuote form styled consistently
- ✅ PortPage template fully migrated to CSS module
- ✅ ReviewsCarousel + TestimonialCarousel migrated to CSS modules
- ✅ Track, FAQ, Legal pages styled
- ✅ LanguageSwitcher CSS module
- ✅ Shared `layout.module.css` extracted (hero, sections, CTA strip)
- ✅ Remaining inline `<style>` tags minimized (13 remain, all justified or out-of-scope)
- ✅ Staggered reveals on all relevant card grids
- ✅ Build + prerender green (67 OK / 0 failed)
- ✅ Report written and ready to push

---

*Generated by Claude Opus 4.7 (1M context) · Sprint DESIGN-3 autonomous run*
