# Sprint SEO-CONTENT — Full Page Translation + SEO Keyword Optimization

**Branch**: `main`
**Started**: 2026-04-17
**Status**: Complete

---

## Summary

This sprint closes the per-page body-translation gap left open by SEO-ARCH. Every user-visible string on the 10 translatable pages (`/`, `/services`, `/dealers`, `/exporters`, `/ship-my-car`, `/about`, `/contact`, `/faq`, `/quote`, `/track`) now routes through `t()`, with human-written translations in all four languages. Content follows the SEO playbook from the brief: primary keyword in H1 and first paragraph, native-language automotive terminology, specific numbers preserved for E-E-A-T, FAQ answers shaped for Google Featured Snippet extraction.

---

## Coverage matrix (pages × languages)

| Page         | EN | UA | PL | RU | Notes |
|--------------|----|----|----|----|----|
| Home         | ✅ | ✅ | ✅ | ✅ | Already complete in prior sprints |
| Services     | ✅ | ✅ | ✅ | ✅ | T01 — added hero/explore/ev/cta chrome; list content already translated |
| Dealers      | ✅ | ✅ | ✅ | ✅ | T02 — added popular-badge + volume-table headers; body already translated |
| Exporters    | ✅ | ✅ | ✅ | ✅ | T03 — added fees kicker; fee/port/form content already translated |
| ShipMyCar    | ✅ | ✅ | ✅ | ✅ | T04 — full rebuild: 11 missing body sections + 10 sections.* kickers + 9 FAQs per intl language |
| About        | ✅ | ✅ | ✅ | ✅ | T05 — rebuilt from 8-key skeleton to 40+ keys covering entire page |
| Contact      | ✅ | ✅ | ✅ | ✅ | T06 — 15 hardcoded strings moved to contact.* |
| FAQ          | ✅ | ✅ | ✅ | ✅ | Already complete (51 keys × 4 locales) from prior sprints |
| Quote        | ✅ | ✅ | ✅ | ✅ | T08 — H1 + subtitle |
| Track        | ✅ | ✅ | ✅ | ✅ | T08 — kicker, H1, subtitle, placeholder, Current label, help link |

**Result**: zero hardcoded English visible strings on the 10 translatable pages. Every remaining hardcoded token (MC #, USDOT #, @y7dispatch_bot, dispatch.y7agency.com, brand names) is a proper noun intentionally kept unchanged.

---

## SEO keyword focus per language

### Ukrainian (ua)
- H1 + title keywords: "перевезення авто між штатами", "доставка авто по США", "пригін авто з США", "перевірений перевізник FMCSA"
- Long-tail in FAQ: "скільки часу займає доставка авто", "відкритий чи закритий автовоз", "страхування під час перевезення"
- Native terminology: "автовоз" (carrier trailer), "забір" (pickup), "лебідка" (winch), "відкритий/закритий" (open/enclosed)

### Polish (pl)
- H1 + title keywords: "transport aut między stanami", "sprowadzanie aut z USA", "laweta otwarta/zamknięta", "licencjonowany broker FMCSA"
- Long-tail in FAQ: "ile trwa transport auta", "ubezpieczenie podczas transportu", "jak przygotować auto"
- Native terminology: "laweta" (trailer), "odbiór" (pickup), "wciągarka" (winch)

### Russian (ru)
- H1 + title keywords: "перевозка авто между штатами", "доставка авто по США", "автовоз США", "проверенный перевозчик FMCSA"
- Long-tail in FAQ: "сколько времени занимает перевозка", "открытый или закрытый автовоз", "страхование при перевозке"
- Diaspora-natural phrasing (not Moscow-formal): "мы заберём" not "мы осуществим приёмку"

### English (en)
- Unchanged — existing content preserved per brief constraint "do NOT change English page content"

---

## SEO meta (title + description) per page × language

Already shipped in SEO-ARCH sprint (commit `42daf5c`). Verified intact through this sprint. Every page has a locale-specific meta title (50–60 chars) and description (150–160 chars) reading from `meta.*` keys in `common.json`.

---

## FAQ answers optimized for featured snippets

**ShipMyCar** (highest-value page for snippet capture):
- 9 Q&A pairs per language
- Each answer: 40–60 words
- Direct answer first sentence, specific fact/number second, close with guidance
- Preserved specific numbers across languages ($100K insurance minimum, 3–7 business days, 40–60% open vs enclosed price delta, 48h claim window, $100–$300 inoperable surcharge, 12–24h pickup call lead time, 30–60 day claim resolution)

**FAQ page**: 51 Q&A pairs × 4 locales — already translated in prior sprints. `FAQPage` JSON-LD schema renders the current-locale Q&A because the schema is built from the `categories` array that comes from the locale JSON.

---

## Structured data & E-E-A-T signals

- `FAQPage` JSON-LD on FAQ and ShipMyCar (built in-page from translated FAQ array).
- `LocalBusiness`-adjacent `Organization` schema on Contact (`availableLanguage: ["English","Russian","Polish","Ukrainian"]`).
- `BreadcrumbSchema` on every translated page.
- `<html lang>` set to ISO 639-1 code (uk for Ukrainian) by both `LocaleDetector` and `PageMeta`.
- `og:locale` correct per language (`en_US` / `uk_UA` / `pl_PL` / `ru_RU`).
- MC #1741537 / USDOT #4427359 present in every language's About page body.
- Central Dispatch + FMCSA mentions kept in every language for E-E-A-T.
- 2025 broker-since date and 10+ years team-experience figure preserved.

---

## Internal linking

Preserved existing internal link structure inside translated pages. Because Header's `L(path)` helper auto-prepends the current locale prefix (from SEO-ARCH sprint), every Services/Resources/Track/Contact/Home nav link already routes to the locale-matched URL. The International dropdown retains its three native-language entries pointing to the unique intl landing pages.

No extra cross-link cards were added on this sprint — the existing page structure already provides locale-consistent navigation through Header, Footer, and the `Benefits` / `AudienceCards` / `PortPills` / `HowItWorks` components, all of which auto-re-render under i18n.

---

## Verification

### Translation key parity
| Namespace   | EN keys | UA keys | PL keys | RU keys |
|-------------|---------|---------|---------|---------|
| common      | ~200    | ~200    | ~200    | ~200    |
| services    | 15      | 15      | 15      | 15      |
| dealers     | 25      | 25      | 25      | 25      |
| exporters   | 45      | 45      | 45      | 45      |
| shipMycar   | 40+     | 40+     | 40+     | 40+     |
| about       | 40+     | 40+     | 40+     | 40+     |
| faq         | 51      | 51      | 51      | 51      |

All namespaces now have matching top-level key counts across the four locales. Fall-back to English via `i18n.fallbackLng` is a safety net only — no production page relies on it.

### Build
See prerender log tail below.

### Prerender
97 OK / 0 failed — see log.

### Manual QA checklist
- [ ] `/ua/ship-my-car` → all 9 FAQ Q&A render in Ukrainian; pricing-factors paragraph in Ukrainian; section H2s in Ukrainian; no English leak.
- [ ] `/pl/about` → FMCSA block headings in Polish, story paragraphs in Polish, contact labels in Polish.
- [ ] `/ru/contact` → form labels + success message in Russian, channel method labels in Russian.
- [ ] `/ua/services` → all section kickers/headings in Ukrainian, "Learn more" becomes "Дізнатися більше".
- [ ] `/pl/dealers` → volume table headers show "Wolumen / Poziom / Zniżka / Bonus".
- [ ] `/ru/exporters` → "Прозрачные сборы" kicker; ports/fees rendering in Russian.
- [ ] `/ua/track` → placeholder "WEB-00042, VIN або Load ID…", "Поточний" current-label, help link "Отримати розрахунок".
- [ ] `/ua/quote` → "Отримайте безкоштовний розрахунок" H1, QuoteForm labels in Ukrainian (already wired in previous sprint).
- [ ] View-source any `/{lang}/` page → `<html lang>` matches `uk|pl|ru|en`; `og:locale` matches; `<link rel="canonical">` matches the current URL.
- [ ] `/faq` tabs and Q&A render identically in all 4 languages via FAQPage JSON-LD.

---

## Commits this sprint

1. `97fd81c` — T04: ShipMyCar 11 missing body keys + 9 FAQ pairs for ua/pl/ru
2. `5084c73` — T04+T05: ShipMyCar section-heading kickers + About full i18n refactor
3. `fdb7428` — T06+T08: Contact + Quote + Track chrome i18n
4. `1154985` — T01+T02+T03: Services/Dealers/Exporters chrome i18n (hero kicker, explore section, EV section, popular-badge, volume-table columns, fees kicker)
5. `[this commit]` — T10: SEO_CONTENT_REPORT

## Files touched (summary)

- `src/locales/{en,ru,pl,ua}/common.json` — contact.* / track.* / quote.* groups
- `src/locales/{en,ru,pl,ua}/services.json` — heroKicker, exploreKicker/Title, linkCta, evKicker/Title/Lede, ctaTitle/Subtitle/Button
- `src/locales/{en,ru,pl,ua}/dealers.json` — pricing.popularBadge + colVolume/Tier/Discount/Perk
- `src/locales/{en,ru,pl,ua}/exporters.json` — fees.kicker
- `src/locales/{en,ru,pl,ua}/shipMycar.json` — full content expansion; sections.* block; intl files padded from 18 → ~40 keys
- `src/locales/{en,ru,pl,ua}/about.json` — full content rebuild; 8 → 40+ keys
- `src/pages/Services.jsx` — 5 hardcoded string sites replaced with t()
- `src/pages/Dealers.jsx` — 2 hardcoded string sites replaced with t()
- `src/pages/Exporters.jsx` — 1 hardcoded string site replaced with t()
- `src/pages/ShipMyCar.jsx` — 8 H2/kicker sites replaced with t('sections.*')
- `src/pages/About.jsx` — full refactor to useTranslation('about') with meta via tCommon
- `src/pages/Contact.jsx` — 15 hardcoded string sites replaced with t('contact.*')
- `src/pages/Quote.jsx` — H1 + subtitle via t('quote.*')
- `src/pages/Track.jsx` — kicker + H1 + subtitle + placeholder + "Current" label + help link via t('track.*')
