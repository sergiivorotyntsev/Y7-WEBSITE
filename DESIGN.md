---
name: Y7 Logistics
description: Dark-board / paper-manifest / signal-red design system (V2) for a specialized FMCSA auto transport broker. B2B-first. Supersedes the Trade Bulletin system (V1).
version: 2
colors:
  board-black: "#050607"
  board-black-2: "#0b0d0f"
  panel-steel: "#0e1012"
  manifest-paper: "#f4f0e8"
  paper-deep: "#eee8dd"
  card-cream: "#fffaf1"
  headlight-white: "#fff7ed"
  on-dark-secondary: "#e8e0d3"
  on-dark-muted: "#9c9b96"
  paper-ink: "#050607"
  paper-muted: "#5c5851"
  signal-red: "#d70f24"
  signal-red-deep: "#a90918"
  signal-red-bright: "#ef3a4e"
  line-on-dark: "rgba(255,247,237,0.14)"
  line-on-dark-strong: "rgba(255,247,237,0.24)"
  line-on-paper: "rgba(5,6,7,0.14)"
  bonded-pine: "#0F6E56"
  bonded-pine-tint: "#E1F5EE"
typography:
  display:
    fontFamily: "var(--v2-font-display)"
    fontSize: "clamp(2.6rem, 6vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "0.02em"
    textTransform: "uppercase"
  section-display:
    fontFamily: "var(--v2-font-display)"
    fontSize: "clamp(1.9rem, 3.4vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "0.035em"
    textTransform: "uppercase"
  card-title:
    fontFamily: "var(--v2-font-display)"
    fontSize: "clamp(1.3rem, 2vw, 1.65rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "0.05em"
    textTransform: "uppercase"
  body:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  body-long:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  mono-label:
    fontFamily: "'JetBrains Mono', 'Courier New', monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.18em"
    textTransform: "uppercase"
  mono-micro:
    fontFamily: "'JetBrains Mono', 'Courier New', monospace"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.14em"
    textTransform: "uppercase"
  mono-data:
    fontFamily: "'JetBrains Mono', 'Courier New', monospace"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "6px"
  md: "12px"
  lg: "18px"
  xl: "22px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section: "clamp(56px, 8vh, 96px)"
tracking:
  display: "0.02em"
  section: "0.035em"
  caps-ui: "0.06em"
  label: "0.14em"
  eyebrow: "0.18em"
  slogan: "0.26em"
---

# Design System V2: Y7 Logistics

## 1. Overview

**Creative North Star: "The Dispatch Board"**

Y7's site reads like the operational heart of a working dispatch operation: the dark board where loads move, and the paper manifest where every move is documented. Two surfaces carry the whole system. **Board** sections (near-black `#050607`) hold conviction moments: the hero, the proof blocks, the conversion ask. **Manifest** sections (warm paper `#f4f0e8`) hold the working documents: estimates, process, coverage, long-form content. **Signal red** `#d70f24` is exactly what its name says, a signal: it marks the action, the live stat, the stamp. It is never atmosphere.

This is a **final brand decision** matching the approved vehicle-wrap system V4: signal red + near-black + warm paper, condensed uppercase display type, JetBrains Mono microcopy, and a fixed inventory of Japanese serif accents (シンプル・迅速・信頼, the 改善 stamp, the 七 hanko lineage). Positioning is **B2B-first**: dealers and exporters lead, private relocations remain fully served but visually secondary.

V2 supersedes V1 ("The Trade Bulletin"). What carries over from V1 unchanged: operational honesty as a design doctrine, no urgency theater, hedged promises, locale parity as a brand value, reduced-motion respect, the augment-don't-rewrite rule for ranking content. What V2 replaces: the cream/serif/sienna palette, the One Seal Rule (now the Signal Budget), Georgia as display face (now condensed caps), and the flat-single-surface page model (now board/manifest alternation).

The four PRODUCT.md anti-references still stand and V2 must be read against them honestly: dark + red is the classic generic-carrier combination, so the system stays out of that lane through restraint (no highway stock photos, no chrome, no italics-forward "speed" clichés, no urgency), through mono-documented specifics (USDOT, MC, BOL, gate pass), and through the editorial discipline of the manifest sections. If a screen could pass for a towing-company template, it has failed V2 even if every token is correct.

## 2. Surfaces

The page is a stack of full-width surface bands. Every section declares one of three surfaces:

- **Board** (`board-black #050607`, gradient tolerance down to `board-black-2 #0b0d0f`): hero, advantage/proof blocks, conversion block, footer. Text on board: `headlight-white #fff7ed` (primary), `on-dark-secondary #e8e0d3` (supporting), `on-dark-muted #9c9b96` (captions). Hairlines: `line-on-dark`.
- **Manifest** (`manifest-paper #f4f0e8`, gradient tolerance to `paper-deep #eee8dd`): estimate strip, who-we-serve, process, coverage, testimonials, all long-form/SEO body content. Text: `paper-ink #050607`, muted `paper-muted #5c5851`. Hairlines: `line-on-paper`.
- **Panel** (`panel-steel #0e1012`): cards and form shells INSIDE board sections only. Never a full-width section surface.

**The Alternation Rule.** Adjacent sections never share a surface on conversion pages (Home, audience pages): board, then manifest, then board. A page opens dark (hero) and closes dark (footer). Long-form/SEO pages are manifest-dominant: board appears only as the hero band and at most one mid-page conversion band; body content between them stays paper for reading comfort and content continuity.

**The Dark Share Rule.** Conversion pages: 40-60% of scroll height is board. Long-form pages: no more than 25%. Below 40% on Home the brand reads timid; above 60% anywhere it reads like a gaming site.

**Cards on paper** use `card-cream #fffaf1` with `line-on-paper` borders (the V1 no-true-white doctrine carried: #FFFFFF never appears as a surface). **Cards on board** use `panel-steel` or translucent white washes at 3.5-5% alpha with `line-on-dark` borders.

**The No-True-Black/White Rule (carried from V1, recalibrated).** `#050607` is the floor; `#000` never appears. `card-cream #fffaf1` is the ceiling; `#fff` never appears as a surface (pure white may exist only inside the logo SVG and as button text where contrast demands it).

## 3. Color

### Signal Red

- **signal-red `#d70f24`**: the one brand accent. CTAs, the live stat number, the stamp border, the kicker rule-line, link hover, one accent word in a display headline (`<span class="red">`), the hero URL display.
- **signal-red-deep `#a90918`**: gradient partner and hover state.
- **signal-red-bright `#ef3a4e`**: the ONLY red for body-size text on dark surfaces (see contrast law below). Never used on paper.

**The Signal Budget Rule (replaces the One Seal Rule).** Red is a signal, so it must stay rare enough to be read as one. Per viewport at any scroll position: at most **one red-filled element** (a CTA or the stamp), plus at most **two red text/hairline accents** (stat number, accent word, kicker rule, link underline). Red never exceeds ~8% of the pixels in any viewport. Red is never a section background, never a decorative wash larger than the hero's radial glow (which caps at 18% alpha), never a divider system. If a section already contains the gradient CTA, its stat numbers go white/ink, not red. **Low-alpha exemption:** red elements rendered at ≤10% alpha (the step-numeral watermark, the hero radial at distance) do not count toward the pixel budget or the accent count; at that alpha red reads as texture, not signal.

**The Red Contrast Law (measured, WCAG AA).** `signal-red` on paper = 4.64:1 (passes AA body, use freely). `signal-red` on board = 3.85:1 (passes ONLY large text ≥18.66px bold or 24px regular; display numbers, headlines, big URL: yes; captions, body, mono-labels: NO). Body-size red on dark must use `signal-red-bright` (5.2:1 on board, 4.89:1 on panel). White on the CTA gradient passes at both stops (4.97-7.22:1).

### Neutrals

Documented in §2 (Surfaces). Contrast matrix, all measured:

| Pair | Ratio | Verdict |
|---|---|---|
| paper-ink on manifest-paper | 17.84 | AAA |
| paper-muted on manifest-paper | 6.22 | AA+ body |
| headlight-white on board-black | 19.10 | AAA |
| on-dark-secondary on board-black | 15.48 | AAA |
| on-dark-muted on board-black | 7.28 | AA+ body |
| headlight-white on panel-steel | 17.96 | AAA |
| signal-red on manifest-paper | 4.64 | AA body |
| signal-red on board-black | 3.85 | AA large ONLY |
| signal-red-bright on board-black | 5.20 | AA body |
| white on signal-red / red-deep | 5.27 / 7.22 | AA / AAA |

### Status

- **bonded-pine `#0F6E56`** + tint: success and verified state only, unchanged from V1. On dark surfaces use the existing bright derivative (`--success-bright`).
- **Errors** use `signal-red-deep` on paper and `signal-red-bright` on dark, always paired with an icon or text label (never color alone). V1's separate Cite Red is retired; red already means "attention" in V2, and a second red would blur the signal.
- Status colors never decorate. Green means verified/success, nothing else.

## 4. Typography

**Display:** condensed uppercase sans, self-hosted webfont with **mandatory Latin + Latin-Extended + Cyrillic coverage** (H1 renders in RU/UA/PL at parity; a display face without Cyrillic is disqualified regardless of look). The face is selected and pinned in W1-T03; `var(--v2-font-display)` is the single reference. Fallback stack is metric-tuned Arial Narrow.
**Body:** system-ui. Unchanged. Fast, locale-native, zero webfont cost.
**Mono:** JetBrains Mono (already self-hosted, 400/600/700 latin). V2 promotes it from "credentials only" to the system's microcopy voice: eyebrows, labels, sublines, captions, stats labels, chips.
**Serif:** Georgia is retired as a display face. It may survive only as the long-form reading face inside blog article bodies (decision finalized in the blog wave); it never appears in headings, navigation, or UI. The only other serif on the site is the JP accent face (§5).

### Scale (from frontmatter, the law in prose)

- **Display** (hero H1): condensed 700, `clamp(2.6rem, 6vw, 6rem)`, **line-height 0.98 (pinned)**, tracking 0.02em, uppercase. One per page. **Cyrillic Clearance Rule:** uppercase Cyrillic diacritics (Й, Ї, Ё) risk clipping in condensed faces; every display-font candidate is tested with "ЙЇЁ ДОСТАВКА АВТОМОБІЛІВ" at display size before pinning, and if the face clips them, display line-height rises within 0.98-1.0 (same value across all locales, parity rule). **W1-T06 test result (Oswald 700, 6rem):** 0.94 collides line-to-line and severs diacritics under `overflow:hidden`; 0.98 keeps every diacritic fully formed, and 1.0 adds no meaningful clearance. Pinned at **0.98** for all locales; never place `overflow:hidden` on display headings (Oswald ink ascends past the em box at any line-height ≤1).
- **Section Display** (H2): condensed 700, `clamp(1.9rem, 3.4vw, 3.25rem)`, line-height 0.98, tracking 0.035em, uppercase.
- **Card Title** (H3/tile): condensed 600, tracking 0.05em, uppercase.
- **Body / Body-Long**: system-ui 400, 15/16px, line-height 1.65/1.7, sentence case. Reading text is NEVER uppercase and NEVER condensed.
- **Mono Label** (eyebrow/kicker): mono 500, 11px, tracking 0.18em, uppercase.
- **Mono Micro** (chips, captions): mono 500, 10px, tracking 0.14em, uppercase.
- **Mono Data**: mono 500, 13px, normal case, for USDOT/MC/$ figures and tabular numerics.

### Named Rules

**The Caps Ceiling Rule.** Uppercase lives in display type and mono microcopy only. Anything a user actually reads (two or more consecutive sentences) is sentence-case body. A page that shouts everywhere says nothing; the condensed caps earn their force from the calm system-ui text around them.

**The Kicker-Headline Pair, V2 form.** The section opener signature is now: mono eyebrow (11px, 0.18em tracking, `on-dark-muted`/`paper-muted`, preceded by a 46×2px signal-red rule-line, NOT the ◆ glyph) above a condensed uppercase headline. **Density cap:** at most 2 consecutive sections open with the eyebrow+headline pair; every third section must vary the opener (plain headline, JP vertical accent, or a stat lead-in). The ◆ kicker glyph is a V1 artifact; it does not appear in V2 surfaces.

**The Accent Word Rule.** A display headline may carry at most ONE red accent span. Never two, never a red-only headline on board (contrast law), never gradient text (carried V1 ban).

**The No Decorative Type Rule (amended).** No gradient text, ever. Text-shadow is banned with ONE legalized exception: the hero URL display element (`Y7AGENCY.COM`) may carry the single red glow `0 18px 42px rgba(215,15,36,0.16)`. Nothing else glows.

**The Em-Dash Substitution Rule (carried verbatim from V1).** No em dashes (`—`) and no `--` in copy. Commas, colons, periods, parentheses.

**The Multilingual Parity Rule (carried, extended).** RU/UA/PL render the same hierarchy, same tracking, same weights. The display face MUST ship Cyrillic glyphs from day one; a Latin-only fallback rendering RU headlines in Arial Narrow while EN gets the brand face is a parity defect, not a fallback. Tracked-caps tracking values are identical across scripts.

## 5. Japanese Accents (Brand Marks, Not Copy)

The JP accents tie the site to the vehicle-wrap brand system V4 and the kaizen operational ethos. They are **brand marks with the same status as the logo**, not content.

**Fixed inventory (closed list, additions require a DESIGN.md amendment):**
- シンプル・迅速・信頼 ("simple, fast, trust"): vertical strip, hero left margin.
- 改善 (kaizen): the red-bordered stamp, paired with the vertical strip or standalone.
- 七 (seven): hanko-style brand lineage mark, logo contexts only.
- 選択と集中 ("focus and concentration"): section-head margin accent, board sections only.

**Named Rules:**

**The Brand-Mark Rule.** JP accents are never translated, never localized, never carry information required to use the page. They are `aria-hidden="true"`, invisible to screen readers and to SEO. If removing every JP glyph from a page changes what a user knows or can do, the page has broken this law. This is how the accents coexist with the Multilingual Parity Rule: they are parity-neutral because they are decoration on every locale equally.

**The Density Cap.** At most 2 JP accents per viewport, at most 3 per page. The hero strip + stamp combination counts as 2.

**Rendering:** vertical strips use `writing-mode: vertical-rl` with the JP serif asset from W1-T03 (hard-subset webfont ≤6KB or inline SVG; never a full CJK font). Color: `on-dark-muted` at 58% alpha for strips; stamp border and glyph in `signal-red` at 75% alpha.

## 6. Elevation, Radii, Motion

### Radii (V2 family)

`sm 6px` (buttons, chips-on-paper), `md 12px` (inputs, small tiles), `lg 18px` (cards, tiles), `xl 22px` (feature cards, form shells), `pill 999px` (ghost buttons, chips-on-dark). One radius tier per component class per page; mixing 18 and 22 on sibling cards in one section is a defect.

### Elevation

Board sections carry depth through **hairlines and surface steps**, not shadows: `line-on-dark` borders, panel-over-board contrast, inset top-light `inset 0 1px 0 rgba(255,255,255,0.07)`. Paper sections keep the V1 subtle shadow scale (`shadow-sm/md/lg` unchanged) for cream cards. New in V2:

- **red-glow** `0 18px 44px rgba(215,15,36,0.22)`: the gradient CTA's resting shadow. The ONLY colored shadow. One element per viewport may carry it (Signal Budget).
- **board-depth** `0 24px 70px rgba(0,0,0,0.3)`: form shells and featured panels on board sections only.

**The 3px Lift Cap Rule (carried from V1).** Hover translateY caps at -3px on any surface. The register stays controlled.

### Motion

- Durations 150-400ms, ease-out family. Entrances: fade + ≤16px rise.
- **The Reveal Gate Rule (hard technical law).** Every entrance animation runs through the `Reveal`/`ScrollReveal` components or replicates their gates: instant at-rest path when `window.__Y7_PRERENDER` or `window.__Y7_STATIC_SHOWN`, and full `prefers-reduced-motion` collapse. An entrance that animates in the prerender snapshot regresses LCP sitewide; this is a build-blocking defect, not a style note.
- New keyframes register in `theme.js` (single injection point via Layout).
- No scroll-hijack, no parallax on content, no marquees, no infinite decorative loops. Status pulses (live dot) are the sole perpetual motion allowed, max one per viewport.

**The Focus-Visible Law.** Visible keyboard focus is mandatory on every interactive element, including cards-as-links: 2px outline, `signal-red-bright` on dark surfaces / `signal-red` on paper, `outline-offset: 2px`. `:focus-visible` is never suppressed, never replaced by a shadow-only treatment that fails on nested surfaces.

## 7. Components

- **Button / CTA (primary):** gradient `linear-gradient(135deg, #d70f24, #a90918)`, white text, radius `sm 6px` (large: 8px), condensed caps 15px tracking 0.06em, resting `red-glow`. **The Gradient Legality Rule:** this exact pair is the ONLY legal gradient fill in the system (supersedes V1's blanket gradient ban); any other gradient (text, borders, cards, section washes beyond the hero radial) remains banned.
- **Button (ghost):** transparent, 1px `line-on-dark-strong`/`line-on-paper` border, pill radius, condensed caps. On-dark text `headlight-white`, on-paper `paper-ink`.
- **Section shell:** max-width 1440px, padding `section` clamp, surface per §2.
- **Section head:** eyebrow (mono label + red rule-line) + condensed H2 + optional lede (body, ≤520px, muted). Optional JP vertical accent right-aligned (board sections only, density cap applies).
- **Card (board):** `panel-steel` or 3.5-5% white wash, `line-on-dark` border, radius lg/xl, inset top-light. Hover: border brightens to `line-on-dark-strong`, lift ≤3px.
- **Card (paper):** `card-cream`, `line-on-paper` border, radius lg, `shadow-sm` at rest, V1 hover behavior.
- **Chips:** mono-micro caps in pill borders; `line-on-dark`/`line-on-paper`, never filled.
- **Trust row / stat tiles:** hairline-divided grid on 4.5% white wash; stat number condensed in `signal-red` (large-text sizes only), label mono-micro `on-dark-secondary`. Stats obey the honesty laws (§8): hedged, sourced, no fake precision.
- **Forms on board:** `board-black` shell radius xl + `board-depth`; inputs `panel-steel`, `line-on-dark` border, radius md, white text, mono labels above (never placeholder-as-label). Focus: 2px `signal-red-bright` ring + 2px offset; error text `signal-red-bright` + icon. iOS 16px input floor carried from V1.
- **Forms on paper:** V1 input spec carried, focus ring recolored `signal-red` (4.64:1).
- **Numbered process steps:** oversized condensed step numeral at 9% red alpha as card watermark; this is the one sanctioned decorative red (counts toward Signal Budget as a hairline-tier accent).
- **Port/coverage tiles:** mono airport-code style abbreviation in red (large text), name in body. Always real links to `/ports/*` pages.
- **Body links (The Body-Link Law):** inline links in reading copy rest in the surface's text color with an underline: `paper-ink` + underline on manifest, `headlight-white` + underline on board. Hover shifts the color to `signal-red-deep` (paper) / `signal-red-bright` (dark). Red is NEVER the resting color of body links; on link-dense SEO pages resting-red links would consume the Signal Budget instantly and demote red from signal to noise.

## 8. Brand, Copy, Honesty (Law Carried Forward and Pinned)

- **Brand-String Law:** the public brand is **"Y7 Logistics"** in all copy, nav, titles, footer. "Y7 Agency" never appears in copy. `Y7AGENCY.COM` is permitted solely as the graphic URL display element (hero/footer). Legal line: `© Y7 Consulting Inc d/b/a Y7 Logistics`. Schema `name` stays "Y7 Logistics".
- **Descriptor Law:** "Licensed & Bonded FMCSA Broker" verbatim; never "Licensed & Insured"; carrier count claim is "700+"; all response-time promises carry the business-hours hedge (W0 baseline is the floor, never regress it).
- **No urgency theater, no fake social proof, no invented precision.** Every stat on a V2 surface must be sourced (operational data) or hedged. Red makes stats louder; the honesty bar rises with the volume.
- **Milestone language:** status updates happen at shipment milestones; never "real-time tracking", "GPS", "live tracking" (W0 compliance baseline).
- **Copy register:** expert-confident and matter-of-fact. The condensed caps carry conviction; the words stay operational. "MOVE MORE. PAY LESS." is a slogan; body copy under it explains dispatch fees in plain sentences.

## 9. Process Laws (How V2 Ships)

- **The Additive Migration Rule.** V2 tokens live alongside V1 (`--v2-*` namespace) until a wave explicitly flips a surface. No V1 token value changes outside a wave's declared scope. theme.js ↔ variables.css ↔ DESIGN.json stay in sync on every token commit.
- **The Anti-Orphan Rule.** V1's primitives died as orphans (cards/layout/premium modules, zero importers). V2 primitives in `src/styles/v2/` are the ONLY implementation of this spec: every build wave imports them; a page re-implementing a V2 surface, card, button, or section-head inline is a review-reject. New inline section styles on pages are a defect by definition.
- **The SEO Contract.** Every V2 wave ships against `design-v2-audit/SEO_CONTRACT.md`: heading structure, schema, internal links, locale parity preserved 1:1. Restyle is unlimited; content changes need explicit sign-off.
- **The Reveal Gate** (§6) and **prerender validation** (CLAUDE.md protocol): 138 OK + file-level content checks before any wave reports done.

## 10. Do's and Don'ts

### Do:
- **Do** open conversion pages with the board-black hero and close with the board footer; alternate surfaces between.
- **Do** render every credential, ID, price, and stat label in JetBrains Mono. The mono voice IS the operational-honesty voice.
- **Do** keep body copy sentence-case system-ui at 15-16px; the condensed caps are for display only.
- **Do** treat signal red as a budgeted signal: one red fill + two red accents per viewport, max.
- **Do** use the JP accents from the fixed inventory, `aria-hidden`, within density caps.
- **Do** ship display-font Cyrillic coverage and identical type treatment across EN/RU/UA/PL.
- **Do** respect `prefers-reduced-motion` and the Reveal prerender gates on every entrance.
- **Do** link every port tile, coverage item, and audience card to its real page with crawlable anchor text.
- **Do** carry V1's honesty bans: no urgency timers, no fake counters, no review stars, no "Licensed & Insured".
- **Do** import `src/styles/v2/` primitives; extend them there when a wave needs a variant.

### Don't:
- **Don't** use pure `#000` or pure `#fff` as any surface.
- **Don't** put body-size `signal-red` text on dark surfaces (3.85:1 fails AA); use `signal-red-bright`.
- **Don't** ship red section backgrounds, red washes, or more than one red-filled element per viewport.
- **Don't** use any gradient except the legal CTA pair; gradient text stays banned.
- **Don't** set reading copy (two-plus sentences) in caps or condensed.
- **Don't** translate, localize, or attach meaning to JP accents; never let them carry required information.
- **Don't** stack two dark sections or two paper sections adjacently on conversion pages.
- **Don't** use highway stock photos, chrome/carbon-fiber textures, italic "speed" type, or anything from the generic-carrier lane; dark+red must stay disciplined or it becomes anti-reference #1.
- **Don't** exceed the -3px hover lift, add text shadows (one URL-display exception), or introduce glassmorphism (carried ban; the nav's existing blur is grandfathered until the chrome wave re-decides it).
- **Don't** re-implement V2 primitives inline on pages (Anti-Orphan Rule) or add entrance animations outside the Reveal gates.
- **Don't** use the ◆ glyph, Bonded Pine kickers, or sienna anywhere in V2 surfaces; they are V1 artifacts that read as brand drift now.
- **Don't** use em dashes in copy, ever.
