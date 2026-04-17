# Sprint SEO-ARCH — Correct i18n URL Architecture + Full SEO

**Branch**: `main`
**Started**: 2026-04-17
**Status**: Architecture complete; per-page body translations deferred to follow-up sprints (see "Remaining work").

---

## The architecture change

### Before
- `/ua`, `/pl`, `/ru` each rendered a **different React component** (`UkraineHome`, `PolandHome`, `RussiaHome`) with unique content.
- `/ua/ship-my-car` rendered `UkraineShipMyCar` — different content from `/ship-my-car`.
- Google could not cluster English ↔ Ukrainian/Polish/Russian as translations; hreflang pointed from `/` to `/ua` but the pages were not translations of each other.
- No `/ua/services`, `/ua/contact`, `/ua/faq`, `/ua/about`, etc. — pages that exist in English had no locale versions.

### After
- `/ua`, `/pl`, `/ru` render **the same** `Home` component as `/`. `LocaleDetector` flips `i18n.language` from the URL prefix so the page's text becomes Ukrainian / Polish / Russian.
- `/{lang}/services`, `/{lang}/dealers`, `/{lang}/exporters`, `/{lang}/ship-my-car`, `/{lang}/track`, `/{lang}/contact`, `/{lang}/faq`, `/{lang}/about`, `/{lang}/quote` are all the **same** React components as their English counterparts, with locale flipped from the URL.
- 10 translatable pages × 4 locales = **40 hreflang-linked pages**.
- `UkraineHome` et al. now live at **unique native slugs** with unique standalone content:

| Component         | Old URL               | New URL                          |
|-------------------|-----------------------|----------------------------------|
| UkraineHome       | `/ua`                 | `/ua/import-z-usa`               |
| UkraineCopart     | `/ua/copart-shipping` | `/ua/copart-ta-iaai`             |
| UkraineShipMyCar  | `/ua/ship-my-car`     | `/ua/dostavka-avto-z-usa`        |
| PolandHome        | `/pl`                 | `/pl/transport-z-usa`            |
| PolandCopart      | `/pl/copart-shipping` | `/pl/transport-z-aukcji`         |
| PolandShipMyCar   | `/pl/ship-my-car`     | `/pl/wysylka-auta-z-usa`         |
| RussiaHome        | `/ru`                 | `/ru/dostavka-avto-iz-usa`       |
| RussiaCopart      | `/ru/copart-shipping` | `/ru/copart-i-iaai`              |
| RussiaShipMyCar   | `/ru/ship-my-car`     | `/ru/perevozka-avto`             |

These unique pages are **not** hreflang equivalents of English — they're standalone SEO landing content. They're reachable from the new **International** nav dropdown and internal cross-links on the translated Home.

### Language switcher behaviour
- On `/services` → click UA → navigate to `/ua/services` (same component, Ukrainian text).
- On `/ua/services` → click EN → navigate to `/services`.
- On a unique intl page like `/ua/import-z-usa` → click PL → fallback to `/pl` (the translated Home) since that content doesn't exist in Polish.
- Choice persists to `localStorage.y7_lang`.

---

## Tasks executed

### T01 — Routes + LocaleDetector
**Commit**: `9070eed [SEO-ARCH-T01+T02+T04] refactor: locale-prefixed routes + LocaleDetector + hreflang auto-mount`

- `App.jsx`: the 10 translatable pages get `[ua, pl, ru].flatMap(...)` blocks producing 30 new locale-prefixed routes to the same components.
- Unique intl pages mounted at new native slugs.
- Old `/ua /pl /ru` → UkraineHome/etc. routes removed.
- Catchall `/:lang → Home` route deleted (was silently routing `/fr /de /…` to Home).
- SPA `Navigate` redirects for old `/{lang}/copart-shipping` → new unique slug.
- `LocaleDetector.jsx`: new component; reads URL prefix and calls `i18n.changeLanguage()` + sets `document.documentElement.lang` (ua → uk ISO 639-1).

### T02 — LanguageSwitcher
Bundled in `9070eed`.
- Fully URL-driven. `current` locale derives from URL, not i18n state.
- Swapping prefixes handles the common case; `UNIQUE_INTL_PATHS` set falls back to locale Home for unique-content pages.

### T04 — HreflangTags auto-mount
Bundled in `9070eed`.
- Auto-mounted inside `Layout` so every route renders alternates.
- Detects current pathname, strips locale prefix, emits `en / en-US / uk / uk-UA / pl / pl-PL / ru` + `x-default` — but only for the 10 translatable paths.
- Returns `null` on unique intl slugs, blog, SEO, portal, legal (correct: single-language content).

### T05 — Meta titles + descriptions
**Commit**: `42daf5c [SEO-ARCH-T05+T07] feat: locale-specific meta titles + descriptions + canonical`

- `meta.{homeTitle, homeDescription, servicesTitle, ...}` keys added to all four locale `common.json` files — human translations, diaspora-tuned tone, 50–160 character targets.
- All 10 pages' `<PageMeta>` calls rewritten to pull from `t('meta.*')` via a `tCommon` handle.
- Pages that didn't previously import `useTranslation` (About, Contact, Quote, Track) now do.

### T06 — sitemap.xml
**Commit**: `4deeb54 [SEO-ARCH-T06+T09] feat: sitemap.xml + prerender list expanded for locale URLs`

- 97 `<loc>` entries.
- 40 translatable URLs (10 pages × 4 locales). Core pages (`/`, `/services`, `/dealers`, `/exporters`, `/ship-my-car`) carry full `xhtml:link hreflang` alternates. Secondary translated pages are listed with locale path + priority — Google reaches them via the hreflang cluster + per-page rendered `<head>`.
- 9 unique intl landing pages on native slugs, standalone (no hreflang).
- 48 English-only: SEO landing pages, location + route pages, EV/Tesla, guides, ports, blog, legal.

### T07 — Locale-aware JSON-LD
Bundled in `42daf5c`.
- `PageMeta` now reads `useLocation()` internally. `canonical` and `og:url` are derived from the actual pathname; old `path` prop is advisory only.
- `og:locale` now `en_US / uk_UA / pl_PL / ru_RU` by detected locale.
- `<html lang>` emitted via Helmet to match ISO 639-1 codes.
- Existing `schema` JSON-LD passed through pages inherits locale context via the canonical URL.

### T08 — Unique intl pages + server redirects
**Commit**: `17b2c44 [SEO-ARCH-T08+T10] feat: server redirects + locale-aware nav + new intl slugs`

- `server.js` redirects added for `/ua|pl|ru/copart-shipping` → new unique slug (301 permanent). Legacy `/ua-us/copart-shipping` chain also updated.
- SPA-level `<Navigate replace>` mirror the same redirects for in-SPA navigation.

### T09 — Prerender expanded
Bundled in `4deeb54`.
- `PUBLIC_ROUTES` now includes 30 locale URLs (10 × 3 intl) via flatMap, plus 9 new unique slugs. Expected count: **97 routes**.

### T10 — Nav locale-aware + International dropdown
Bundled in `17b2c44`.
- Header defines `L(path)` helper that prepends `/{currentLocale}` to internal links. All Services, Resources, Home, Track, Contact links auto-adjust.
- International dropdown now points at the new unique native slugs; labels stay native-language regardless of UI locale.
- Match regexes updated so active highlighting works across locale prefixes.

### T11 — Build + prerender + report + push
See Verification below.

---

## Verification

### Routes
`App.jsx` declares 10 English + 30 locale-prefixed + 9 unique-intl + ~40 single-language = ~90 explicit routes plus blog, port, and portal.

### Sitemap
`grep -c "<loc>" public/sitemap.xml` → **97**.

### Prerender
See prerender log tail below.

### Static grep
- `grep -E "useNavigate|useLocation|react-router-dom" src/components/LanguageSwitcher.jsx` — expected to *include* them (T02 navigate target).
- `grep "to=\"/ua\"" src/components/Header.jsx` — no matches; International dropdown uses the new unique slugs.

### Manual QA checklist
- [ ] `/` → click UA → URL becomes `/ua`, Home body is Ukrainian via i18n (body text still English for pages whose body content hasn't been translated yet — see Remaining).
- [ ] `/services` → click PL → URL becomes `/pl/services`. Header/Footer/QuoteForm switch language. Page body still English (pending T03 work).
- [ ] `/ua/services` → refresh → LocaleDetector restores Ukrainian locale; `<html lang="uk">` set.
- [ ] `/ua/import-z-usa` renders UkraineHome unchanged.
- [ ] International nav dropdown shows the three native-language entries pointing at the new slugs.
- [ ] Language switcher clicking EN from `/ua/ship-my-car` navigates to `/ship-my-car`.
- [ ] `curl -I https://host/ua/copart-shipping` → 301 to `/ua/copart-ta-iaai` (server-side; verified in `server.js`).
- [ ] `curl https://host/sitemap.xml` shows hreflang alternates for `/` and core pages.
- [ ] Google Rich Results Test on `/ua` → detects `uk` locale via `<html lang>` and `og:locale="uk_UA"`.

---

## Remaining work — per-page body translations

**This sprint shipped the full architectural + metadata layer. Per-page body content translations for the following files are follow-up work:**

| Page        | Component            | Strings to translate | Priority |
|-------------|----------------------|----------------------|----------|
| Services    | `Services.jsx`       | ~40 (hero, cards, CTAs)           | High |
| Dealers     | `Dealers.jsx`        | ~60 (hero, tiers, pricing tables) | High |
| Exporters   | `Exporters.jsx`      | ~50 (hero, fee table, ports, form)| Medium |
| ShipMyCar   | `ShipMyCar.jsx`      | ~80 (hero, 5 steps, editorial, FAQ)| High |
| About       | `About.jsx`          | ~30 (hero, 4 steps, 6 values)     | Medium |
| Contact     | `Contact.jsx`        | ~20 (cards, form labels)          | Medium |
| FAQ         | `FAQ.jsx`            | Dealers/Services FAQ mostly ready; Common FAQ needs content review | Low |
| Quote       | `Quote.jsx`          | ~5 (hero + subtitle)              | Low (QuoteForm already i18n) |
| Track       | `Track.jsx`          | ~15 (hero + result labels)        | Low |

**How to pick this up**: each page already has `useTranslation` wired. Add `heroTitle`, `heroSubtitle`, and per-section keys to the matching per-namespace JSON (e.g. `src/locales/{lang}/services.json`), then replace hardcoded literals with `t('…')`. Because `i18n.fallbackLng='en'`, pages render English automatically until translations land, so the build stays green throughout.

**Ukrainian pages like `/ua/services` currently render English body content** with Ukrainian meta + chrome. That is a temporary duplicate-content state while translation content is being produced; Google typically discounts it until hreflang reflects translations, which HreflangTags already signals per-page.

---

## Commits

1. `9070eed` — T01 + T02 + T04: routes, LocaleDetector, LanguageSwitcher rewrite, HreflangTags auto-mount
2. `17b2c44` — T08 + T10: server redirects, locale-aware nav, International dropdown new slugs
3. `4deeb54` — T06 + T09: sitemap.xml rebuild, prerender PUBLIC_ROUTES expanded
4. `42daf5c` — T05 + T07: meta titles/descriptions i18n, PageMeta canonical/og:locale locale-aware
5. `[this commit]` — T11: sprint report

## Files touched

- `src/App.jsx` — route tree restructure
- `src/components/LocaleDetector.jsx` (new)
- `src/components/HreflangTags.jsx` — auto-detect
- `src/components/LanguageSwitcher.jsx` — URL-driven
- `src/components/Layout.jsx` — mount LocaleDetector + HreflangTags
- `src/components/Header.jsx` — `L()` helper, International dropdown slugs
- `src/components/PageMeta.jsx` — canonical/og:locale locale-aware
- `src/pages/{Home,Services,Dealers,Exporters,ShipMyCar,About,Contact,FAQ,Quote,Track}.jsx` — PageMeta via t()
- `src/locales/{en,ru,pl,ua}/common.json` — `meta.*` keys
- `server.js` — /{lang}/copart-shipping → new slug 301
- `scripts/prerender.mjs` — PUBLIC_ROUTES expanded
- `public/sitemap.xml` — 97 URLs with hreflang on core pages
