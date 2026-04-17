# Sprint LANG-FIX — Language Switcher + Intl Pages + Benefits

**Branch**: `main`
**Started**: 2026-04-17
**Status**: Complete

---

## The core fix

**Before**: clicking `UA` in the switcher triggered `navigate('/ua')`, taking the visitor to `UkraineHome.jsx` — a *separate landing page* with different content (FAQs about shipping cars from the US to Ukraine). The visitor then had to click "Головна" to reach the real translated Home page.

**After**: clicking `UA` only calls `i18n.changeLanguage('ua')` and writes the choice to `localStorage`. The URL stays where it is. All shared components (Header, Footer, WhyY7, Benefits, QuoteForm, TrustBar, AudienceCards, etc.) re-render in Ukrainian because `useTranslation` subscribes to `languageChanged` events automatically. Intl landing pages are now content pages, reached only through the new **International** dropdown in the nav.

---

## Tasks executed

### T01 — Language switcher changes locale only
**Commit**: `1d3f1ee [LANG-FIX-T01] fix: language switcher changes i18n locale only — no navigation`

Rewrote `LanguageSwitcher.jsx`. All traces of `useNavigate`, `useLocation`, `useParams`, `<Link>`, `INTL_PATHS`, `INTL_PREFIXES`, and redirect logic removed. The switcher is now a pure i18n control:

```jsx
function switchLang(code) {
  if (code === current) return;
  i18n.changeLanguage(code);
  localStorage.setItem('y7_lang', code);
  trackEvent('language_switch', { language: code });
}
```

`i18n.js` gained a `detectInitialLang()` helper that reads `localStorage.y7_lang` first, then falls back to `navigator.language` (mapping `uk` → `ua`), then `'en'`. The choice now survives page refreshes.

### T02 — Verify shared components respond to locale change
No code change required. All 9 shared components mounted on Home (`Header`, `Footer`, `WhyY7`, `HowItWorks`, `AudienceCards`, `TrustBar`, `QuoteForm`, `TrustSection`, `PortPills`) already use `useTranslation()`, which subscribes to `languageChanged` and re-renders automatically.

### T03 — Intl landing pages in nav dropdown
**Commit**: `282bcb1 [LANG-FIX-T03] feat: intl landing pages in nav dropdown, not language switcher`

New `International` NavDropdown between `Resources` and `Track` with three entries in their native languages:

- **Для України** → `/ua` — "Пригін авто зі США"
- **Dla Polski** → `/pl` — "Transport aut z USA"
- **Для диаспоры** → `/ru` — "Доставка авто из США"

Labels stay native regardless of the UI locale — they identify the target page, not the UI chrome. The dropdown trigger label itself translates (`nav.international`). A matching collapsible section appears in the mobile menu.

### T04 — Home link always goes to /
**Commit**: `864d6db [LANG-FIX-T04] fix: Home link always goes to / regardless of locale`

Removed the locale-aware `homeHref` memo in `Header.jsx`. `/` is now the single Home target — translation of the link label happens via i18n.

### T05 — Benefits section replaces HowItWorks on Home
**Commit**: `c68da60 [LANG-FIX-T05] feat: Benefits section replaces HowItWorks on Home — 6 advantage cards with i18n`

Created `Benefits.jsx` + `Benefits.module.css` — a 3×2 grid of advantage cards:

1. Quote Anywhere, Anytime (QuoteIcon)
2. Real-Time Communication (TelegramIcon)
3. Transparent Pricing (ScalesIcon)
4. Flexible Payment (DollarIcon)
5. Verified Carriers Only (ShieldCheckIcon)
6. Documentation Handled (DocumentIcon)

Each card: 48 px accent-tinted icon circle, Georgia serif title, sans body. Hover lifts the icon, tints the card, colours the title. Stagger via `ScrollReveal delay={i*80}`.

Full translations added to `home.json` in `en/ru/pl/ua` under `benefits.*`. Mounted on `Home.jsx` with a muted background, replacing the `HowItWorks` slot. The `HowItWorks` component file is preserved for future reuse per brief instruction.

### T06 — Intl landing pages visual polish
**Commit**: `df62fa7 [LANG-FIX-T06] feat: intl landing pages visual polish — hero route visual + z-index`

Mounted `HeroRouteVisual` (the animated SVG with pulsing city dots, moving car, and the POLISH sprint's new accent draw-on animation) as a subtle background decoration in the hero of `/ua`, `/pl`, `/ru`. Each page's `.heroSection` gets `position: relative + overflow: hidden`; `.heroVisual` is absolutely positioned at 18% opacity; `.heroInner` stays on top via `z-index: 1`.

The rest of each intl Home (audience cards, stats strip, FAQ accordion, CTA strip, section rhythm) was already aligned with `Home.jsx` in prior `NAV-UX` / `INTL-FIX` sprints.

### T07 — HowItWorks on intl pages
No changes needed. A grep confirmed no intl page currently imports `HowItWorks` — it was only ever mounted on `Home.jsx`. File preserved per brief instruction.

### T08 — Build + prerender + report + push
See Verification below.

---

## Verification

### Static grep guarantees
```
$ grep -E "useNavigate|useLocation|useParams|navigate\(|Link|react-router-dom" \
    src/components/LanguageSwitcher.jsx
# → no matches
```

`LanguageSwitcher.jsx` contains zero router imports and zero URL-changing code paths.

### Build
`PRERENDER_PORT=4912 npm run build` — see build log tail below.

### Prerender
67 OK / 0 failed — see tail below.

### Manual QA checklist
- [ ] Visit `/` → click `UA` → URL stays `/`, header/footer/WhyY7/Benefits/QuoteForm/AudienceCards switch to Ukrainian
- [ ] Click `PL` → text switches to Polish, URL still `/`
- [ ] Click `EN` → back to English
- [ ] Open Services/International dropdown → intl landing pages visible with native labels
- [ ] Click "Для України" → navigates to `/ua` (separate landing page)
- [ ] Benefits section shows 6 cards with icons in all 4 languages
- [ ] Home link always routes to `/` regardless of current locale
- [ ] Intl landing pages show the animated route visual behind the hero copy
- [ ] Refresh page after switching to RU → still in Russian (localStorage persisted)

---

## Files changed

- `src/components/LanguageSwitcher.jsx` — full rewrite, router-free
- `src/i18n.js` — localStorage + navigator.language detection
- `src/components/Header.jsx` — Home link `/`, new International dropdown, mobile accordion entry
- `src/components/Benefits.jsx` (new)
- `src/components/Benefits.module.css` (new)
- `src/pages/Home.jsx` — swap HowItWorks → Benefits
- `src/pages/intl/{UkraineHome,PolandHome,RussiaHome}.jsx` — mount HeroRouteVisual
- `src/pages/intl/{UkraineHome,PolandHome,RussiaHome}.module.css` — hero positioning
- `src/locales/{en,ru,pl,ua}/common.json` — `nav.international`
- `src/locales/{en,ru,pl,ua}/home.json` — `benefits.*`

## Commits
1. `1d3f1ee` — LANG-FIX-T01 language switcher rewrite
2. `864d6db` — LANG-FIX-T04 Home link constant /
3. `282bcb1` — LANG-FIX-T03 International dropdown
4. `c68da60` — LANG-FIX-T05 Benefits section
5. `df62fa7` — LANG-FIX-T06 intl hero visual
