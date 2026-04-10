# Language Switcher Audit — Task B Findings

**Date:** 2026-04-10
**Auditor:** Claude Opus 4.6 (automated)

---

## Issues Found

### 1. Missing URL-based language routes in switcher (FIXED)

**Before:** `I18N_PATHS` only listed `/copart-shipping` and `/ship-my-car`. `I18N_PREFIXES` was empty.

**Effect:** Clicking PL/UA/RU on pages like `/faq` or `/about` only changed the i18n locale internally but kept the EN URL. This meant:
- Bookmarking the page would save the EN URL
- Sharing the URL would give others the EN version
- Google would index only the EN URL

**After:** Added `/faq`, `/about`, `/quote`, `/dealer-quote` to `I18N_PATHS` and `/ports/`, `/quote/`, `/agreement/` to `I18N_PREFIXES`.

### 2. No i18n sync on direct URL navigation (FIXED)

**Before:** Landing on `/pl/faq` directly (e.g., from Google) would:
- Show PL highlighted in the language switcher (correct — from URL detection)
- But render ALL content in English (wrong — i18n locale was never set to `pl`)

**Root cause:** `useParams().lang` was read for display but `i18n.changeLanguage()` was never called on mount/route change.

**After:** Added `useEffect` that syncs URL lang → i18n locale whenever the route changes.

### 3. Intl page language detection (FIXED)

**Before:** On `/pl` (PolandHome), `/ua` (UkraineHome), `/ru` (RussiaHome), the `:lang` route param was undefined because these are exact-match routes, not `/:lang` routes. The language switcher would fall back to `i18n.language` which could be stale from a previous page.

**After:** Added first-segment URL detection that covers both `/:lang/` param routes AND `/pl`, `/ua`, `/ru` dedicated routes.

---

## Current behavior (after fixes)

| User action | Before | After |
|-------------|--------|-------|
| Click PL on `/faq` | i18n → pl, stay on `/faq` | navigate to `/pl/faq` |
| Click PL on `/about` | i18n → pl, stay on `/about` | navigate to `/pl/about` |
| Click PL on `/services` | i18n → pl, stay on `/services` | i18n → pl, stay on `/services` (no `/:lang/services` route) |
| Click EN on `/pl/faq` | i18n → en, navigate to `/faq` | Same (was already correct) |
| Direct visit `/pl/faq` | PL highlighted but content in EN | PL highlighted AND content in PL |
| Direct visit `/ru` | RU page renders (hardcoded) but switcher shows EN | RU page renders AND switcher shows RU |

---

## Pages without language variants (by design)

These EN-only pages have no `/:lang/` routes and stay on the same URL when language is switched:
- `/services`, `/dealers`, `/exporters` — i18n locale changes, partial translation
- `/contact`, `/track` — no i18n at all, stays English
- `/privacy`, `/terms`, `/accessibility` — legal pages, English only
- All SEO pages (`/car-shipping-cost`, `/tesla-car-shipping`, etc.) — English only
