# DaytonaCargo theme-contrast audit (LP5-T04a)

Goal: find text whose color is NOT driven by the theme tokens (`--ink`, `--muted`,
`--amber`) that flip with the `.night` class, and any token-driven text that still drops
below 4.5:1 during the day<->night transition.

## Method
- `grep` for hardcoded text colors in `DaytonaCargoPage.jsx` and `DaytonaCargo.module.css`
  (`color: #...`, `color: rgb/rgba`, inline `style={{ color }}`).
- Read every `color:` declaration in the CSS module and classify it.

## Findings

### 1. JSX inline DOM colors — NONE
`grep "style={{"` on the component returns no DOM nodes. All `color:` hits in the JSX are
Three.js material values (hex ints for WebGL meshes), not page text.

### 2. CSS hardcoded hex/rgba text colors — all INTENTIONAL (no fix)
Every hardcoded text color lives inside the **arrival panel** (`.arrival` and children) or
on an **amber button**. The arrival panel is permanently dark (forced-light text) by design,
so its `#F3F6FB` / `#36DDF2` / `#FF6B1A` / `rgba(243,246,251,*)` values are correct and must
NOT be tokenized:
`.arrivalKicker .arrivalH2 .totalThem .totalUs .arrivalLead .cta .contactLine .field
.formNote .formErr .formOk .fieldLabel .totalsNote` and `.dpCta`/`.dpTable td b` button text
(`#0a1424` on amber). No change.

### 3. Body / card / decision-pack / footer text — ALREADY token-driven
All of `.cardBody`, `.cardBody strong`, `.briefStat`, `.cardTag`, `.vsLabel`, `.vsNum`,
`.footnote`, `.dpSub`, `.dpText`, `.dpText strong`, `.dpTable`, `.dpCheck li`,
`.dpFootnotes`, `.footer`, `.footerFoot` use `var(--ink)` / `var(--muted)` / `var(--amber)`.
The operator's premise ("bold spans pinned to a dark hex") does not hold: bold spans are
`var(--ink)`, which flips correctly at rest.

## Root causes of the observed blend (to fix in T04b)
Two real defects, neither is a hardcoded color:

- **A. Transition desync.** `.page` (color) and `.card` (background) both transition over
  1.1s, but the text rules (`.cardBody`, `.footnote`, `.dpText`, bold spans, etc.) set their
  own `color` with **no transition**, so the text value jumps instantly on the `.night`
  toggle while the backgrounds crossfade. Going day->night the text snaps to light while the
  card is still light for ~1s => light-on-light blend. Fix: add `transition: color 1.1s ease`
  to the token-driven text so it crossfades in lockstep, collapsing the blend window.

- **B. Footnote contrast.** `.footnote` (and `.dpFootnotes`, `.footerFoot`) layer an extra
  `opacity` (0.78 / 0.8 / 0.7) on top of `var(--muted)` (already ~0.58-0.62 alpha). Effective
  alpha ~0.45 => ~3:1 on the cream day background (fails 4.5:1). Fix: introduce a per-theme
  `--foot` token at >=4.5:1 in BOTH themes and drop the compounding opacity.
