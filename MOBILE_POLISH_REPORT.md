# Sprint MOBILE-POLISH — Execution Report

**Sprint:** Mobile UX + Icon Contrast + Layout Fixes
**Date:** 2026-04-18
**Branch:** main

## Overall

Six task commits polishing the site for small viewports (≤520 px). All
fixes are mobile-only — desktop layout is unchanged. Build green.

## T01 — Icon contrast (commit `575bdbc`)

**AudienceCards:** each of the three audience icons (`PersonalCar`,
`DealerTrade`, `GlobeRoute`) now takes `color="#ffffff"` so the SVG
strokes render white against the coral/teal/amber gradient circle.

**Benefits + WhyY7:** iconWrap switched from a faint rgba(accent, 0.06–0.1)
tint with coral-colored icons to a solid coral gradient circle
(`linear-gradient(135deg, #B14825, #7A3017)`) with white icons, matching
the AudienceCards visual language. Hover now pops the shadow instead of
tinting the background.

## T02 — Icon-left horizontal card layout on mobile (commit `ab5fa93`)

On screens below the grid breakpoint, each card now uses CSS Grid with
the icon anchored to the left column and the tag/title/description/CTA
stacked in the right column. Desktop layout (icon above content) is
unchanged.

| Component | Mobile breakpoint | Icon column |
|-----------|-------------------|-------------|
| AudienceCards | ≤560 px | 56 px |
| Benefits | ≤560 px | 48 px |
| WhyY7 | ≤520 px | 44 px |

Grid template areas cleanly position the tag/title/description/CTA in
one column alongside the icon, which stays top-aligned.

## T03 — Hero CTA button sizing (commit `40aa94e`)

Home hero CTAs:

- Pill shape (`border-radius: 28px`)
- `min-width: 180px` / `max-width: 320px` — not edge-to-edge
- `min-height: 48px` for comfortable touch
- Container `max-width: 420px`, centered

On ≤520 px the buttons stack vertically but are constrained to 300 px
max-width with 20 px side padding on the container, so they stay
centered with visible gutters rather than stretching edge-to-edge.

## T04 — Hero typography responsive (commit `2a177c2`)

Applied across **Home, ShipMyCar, Dealers, Exporters** hero sections:

| Element | Change |
|---------|--------|
| Title   | `clamp(1.75rem, 6.5–7.5vw, 2.75–3.5rem)` — scales down on narrow screens; added `overflow-wrap: break-word` to prevent italic-accent text overflow |
| Subtitle | `clamp(0.95rem, 3.2–3.4vw, 1.1–1.15rem)` + 4–8 px side padding |
| Kicker | `clamp(10px, 2.6vw, 11px)` — shrinks slightly on tiny screens |
| Hero top padding | 48 px floor (was 64–80) |
| Hero bottom padding | 32–36 px floor (was 40) |

## T05 — Quote hideHeader prop (commit `7c3f79b`)

`QuoteForm` now accepts a `hideHeader` boolean prop (default `false`).
When `true`, the component skips its built-in "◆ FREE ESTIMATE / Get
Your Transport Quote" kicker + title block and renders the form
directly.

Pages that already render their own quote section heading now pass
`hideHeader`:

- `Home.jsx` — section heading "Get Your Free Quote"
- `Quote.jsx` — page hero heading "Get Your Free Quote"
- `ShipMyCar.jsx` — in-page quote section heading

Result: exactly **one** kicker + title above the form on every page.

## T06 — Mobile spacing, touch targets, iOS zoom (commit `e6ba823`)

- Forms: input `font-size: 16px` on ≤640 px to prevent iOS Safari's
  auto-zoom on focus.
- Input `min-height: 44px` (Apple HIG), padding increased on mobile.
- Buttons already enforce 44 px min-height on ≤520 px.

## T07 — Build + prerender

- `npx vite build` → **OK**
- Prerender → **97 OK / 0 failed**
- Zero duplicate title/meta tags (preserved from prior sprints)

## Exit criteria

- [x] All icon circles have white icons against colored backgrounds
- [x] AudienceCards/Benefits/WhyY7 cards use icon-left layout on mobile
- [x] Hero CTA buttons not full-width — pill-shaped, max 300–320 px
- [x] Hero text scales properly at 320–768 px
- [x] No duplicate quote headers on Home / Quote / ShipMyCar
- [x] Input `font-size` ≥ 16 px on mobile (no iOS auto-zoom)
- [x] Touch targets ≥ 44 px
- [x] Build + prerender green

## Manual QA checklist (mobile, 375 px width)

- [ ] Home hero — title wraps cleanly, CTAs centered with gutters, not edge-to-edge
- [ ] Home — WHO WE SERVE cards show icon left of title/description
- [ ] Home — Benefits + WhyY7 cards: white icons visible on coral circles, icon-left layout
- [ ] /quote — only one kicker + title above the form
- [ ] /ship-my-car — quote section has one heading, form fields 16 px text
- [ ] Input fields don't trigger iOS auto-zoom when tapped
- [ ] /dealers + /exporters hero CTAs pill-shaped, not stretching to edges
