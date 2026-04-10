# Translation Completeness Audit — Task A Findings

**Date:** 2026-04-09
**Auditor:** Claude Opus 4.6 (automated)
**Scope:** All 4 languages (EN, PL, UA, RU)

---

## Summary

| Language | PLACEHOLDERs before | PLACEHOLDERs after | i18n namespaces | Status |
|----------|--------------------|--------------------|-----------------|--------|
| EN | 0 | 0 | 11 (common, home, quote, services, dealers, exporters, shipMycar, agreement, agreement_dealer, about, faq) | Baseline |
| PL | 0 | 0 | 11 (added agreement_dealer) | Good — native content |
| UA | 0 | 0 | 11 (added agreement_dealer) | Good |
| RU | 283 | 0 | 11 (added agreement_dealer) | Fixed — all PLACEHOLDERs replaced |

---

## What was fixed (Task A)

### Step 1 — Locale filename case mismatch
- **Finding:** Git tracks all files as `shipMycar.json`. Windows shows `shipMyCar.json` for PL/RU but this is a display artifact. No actual bug on Linux/CI.
- **Action:** None needed.

### Step 2 — Header + Footer translations (commit 99045c5)
- **32 hardcoded English strings** replaced with `t()` calls in Header.jsx and Footer.jsx
- Header: `My Account`, `Log in`, `Log out` → `auth.*` keys
- Footer: 4 section headings, 9 service links, 3 guide links, 6 port names, 5 route names, Telegram Bot, location, DaytonaCargo description → `footer.*` keys
- All 4 common.json files updated with translations

### Step 3 — RU pages (commits b3d8eb0, 87adc00, 3a3983e)
- **RussiaHome.jsx:** 99 PLACEHOLDERs → professional Russian content (9 sections)
- **RussiaCopart.jsx:** 116 PLACEHOLDERs → Copart/IAAI guide in Russian (9 sections)
- **RussiaShipMyCar.jsx:** 68 PLACEHOLDERs → ordering guide in Russian (8 sections)
- All structured data (FAQ schema, breadcrumbs, service schema) translated
- Trust signals: MC #1741537, USDOT #4427359 present on all 3 pages
- Fixed incorrect Telegram link (was y7logistics, now y7dispatch_bot)

### Step 4 — agreement_dealer locales (commit 1ccbf9e)
- Created `agreement_dealer.json` for PL, RU, UA
- 8 legal sections + checkboxes + signature + success/error messages
- Registered in i18n.js for all 3 languages

### Step 5 — Remaining gaps (commit 18ec4cf)
- Home.jsx `How It Works` heading translated via `howItWorks.title` key

---

## Remaining gaps (NOT fixed — future sprints)

### Pages entirely hardcoded in English (no i18n)
These pages appear to all language users but have zero translation support:

| Page | File | Hardcoded strings (approx) |
|------|------|---------------------------|
| Contact | Contact.jsx | ~20 (form labels, messages, info) |
| About | About.jsx | ~30 (story, process, why-us, FMCSA) |
| Quote | Quote.jsx | ~5 (title, description) |
| Track | Track.jsx | ~15 (form, status display, results) |

### Pages with partial i18n (mixed hardcoded + translated)

| Page | File | Issue |
|------|------|-------|
| Services | Services.jsx | Uses t() for some content but service cards and headings are hardcoded |
| ShipMyCar | ShipMyCar.jsx | Uses t() for form but section headings are hardcoded |

### Shared components with hardcoded English

| Component | File | Strings |
|-----------|------|---------|
| TrustBadges | TrustBadges.jsx | Badge labels (FMCSA Licensed, Verified Broker, etc.) — mostly brand names |
| AccountTypeModal | AccountTypeModal.jsx | ~12 strings (modal title, type names, descriptions, buttons) |
| SmsConsent | SmsConsent.jsx | Full consent text block |

### Recommendation
- **Priority 1:** Translate Contact.jsx and About.jsx — most likely ad landing pages
- **Priority 2:** Translate AccountTypeModal.jsx — portal first-visit experience
- **Priority 3:** Complete Services.jsx and ShipMyCar.jsx i18n migration
- **Priority 4:** Quote.jsx and Track.jsx
- TrustBadges.jsx badges are mostly proper nouns/brand names — low value to translate

---

## Language switcher coverage

| Route | EN | PL | UA | RU | Switcher navigates? |
|-------|----|----|----|----|---------------------|
| / | Home.jsx | PolandHome.jsx | UkraineHome.jsx | RussiaHome.jsx | Yes (URL) |
| /copart-shipping | CopartShipping.jsx | PolandCopart.jsx | UkraineCopart.jsx | RussiaCopart.jsx | Yes (URL) |
| /ship-my-car | ShipMyCar.jsx | PolandShipMyCar.jsx | UkraineShipMyCar.jsx | RussiaShipMyCar.jsx | Yes (URL) |
| /faq | FAQ.jsx | FAQ.jsx (i18n) | FAQ.jsx (i18n) | FAQ.jsx (i18n) | i18n only (no URL change) |
| /about | About.jsx | About.jsx (hardcoded EN) | About.jsx (hardcoded EN) | About.jsx (hardcoded EN) | i18n only (no URL change) |
| /services | Services.jsx | Services.jsx (partial i18n) | Services.jsx (partial i18n) | Services.jsx (partial i18n) | i18n only (no URL change) |
| All others | EN only | — | — | — | No language variant |

**Key insight:** Only 3 routes have true URL-based language switching. All other pages rely on i18n locale change only, which means switching language on `/services` doesn't change the URL but should translate the page content (if i18n keys exist).
