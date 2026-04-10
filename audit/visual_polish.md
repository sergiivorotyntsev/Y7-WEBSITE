# Visual Polish Audit — Task J Findings

**Date:** 2026-04-10

---

## Theme System
File: `src/theme.js` — defines `colors`, `fonts`, `button` styles.

## Color Consistency

### Using Theme Colors (Correct)
- Header.jsx, Footer.jsx, LanguageSwitcher.jsx — all use `colors.*`
- Home.jsx, Services.jsx, FAQ.jsx — use theme colors for most elements
- Portal pages (Dashboard, Login, Profile) — use theme colors

### Hardcoded Colors (Not in Theme)
~30 files use hardcoded hex values for accent shades and semantic colors:
- `#FFF8F5` — peach callout background (ShipMyCar, Exporters, Agreement)
- `#FFF0EC` — error/warning light background (Contact, Exporters)
- `#FFF6D6` — yellow warning background (Agreement)
- `#c0392b` — semantic red for errors (DealerQuote, ReviewSubmit)
- Various `rgba()` for overlays and transparent effects

### Intl Pages (PolandHome, UkraineHome, RussiaHome, etc.)
Use a separate inline style system with `#993C1D` (accent), `#2C2C2A` (text), `#F7F5F0` (background), `#E8E4DC` (border). These are consistent WITHIN the intl pages but different from the main theme.

## Typography Hierarchy
- h1: `clamp(2rem, 5vw, 3.25rem)` — consistent across intl pages
- h2: `clamp(1.5rem, 3vw, 2.25rem)` — consistent
- Body: `clamp(1rem, 2vw, 1.125rem)` — consistent
- EN pages use theme `fonts.serif` and `fonts.sans`

## Recommendations (Not Fixed)
1. Add semantic color tokens to theme.js (`calloutBg`, `errorBg`, `warningBg`)
2. Migrate intl page styles to use theme tokens (separate refactor sprint)
3. No broken images found
4. Spacing is consistent within each page context

## No Fixes Applied
Cosmetic — all issues are internal consistency improvements, not user-visible bugs.
