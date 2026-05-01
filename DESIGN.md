---
name: Y7 Logistics
description: Editorial-restrained trade-publication design system for a specialized FMCSA auto transport broker.
colors:
  newsprint-cream: "#F7F5F0"
  card-white: "#FFFFFF"
  margin-sand: "#EFECE6"
  pressroom-ink: "#2C2C2A"
  pressroom-ink-deep: "#1A1A19"
  type-stone: "#706E68"
  hint-gray: "#999999"
  burnt-sienna: "#993C1D"
  embered-sienna: "#7A3017"
  bonded-pine: "#0F6E56"
  bonded-pine-tint: "#E1F5EE"
  cite-red: "#C0392B"
  margin-hairline: "#E5E0D8"
  field-rule: "#DDDDDD"
typography:
  display:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.8rem, 4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  body-long:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
  micro:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
  mono:
    fontFamily: "'JetBrains Mono', 'Courier New', monospace"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "20px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section: "clamp(60px, 8vh, 100px)"
components:
  button-primary:
    backgroundColor: "{colors.pressroom-ink}"
    textColor: "{colors.newsprint-cream}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.pressroom-ink-deep}"
    textColor: "{colors.newsprint-cream}"
  button-accent:
    backgroundColor: "{colors.burnt-sienna}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-accent-hover:
    backgroundColor: "{colors.embered-sienna}"
    textColor: "{colors.card-white}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.pressroom-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.margin-sand}"
    textColor: "{colors.pressroom-ink}"
  card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.pressroom-ink}"
    rounded: "{rounded.lg}"
    padding: "28px"
  card-muted:
    backgroundColor: "{colors.margin-sand}"
    textColor: "{colors.pressroom-ink}"
    rounded: "{rounded.lg}"
    padding: "28px"
  card-dark:
    backgroundColor: "{colors.pressroom-ink}"
    textColor: "{colors.newsprint-cream}"
    rounded: "{rounded.lg}"
    padding: "28px"
  input:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.pressroom-ink}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  input-focus:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.pressroom-ink}"
  page-hero-warm:
    backgroundColor: "{colors.newsprint-cream}"
    textColor: "{colors.pressroom-ink}"
    padding: "clamp(64px, 10vh, 96px) 24px clamp(40px, 6vh, 56px)"
---

# Design System: Y7 Logistics

## 1. Overview

**Creative North Star: "The Trade Bulletin"**

Y7's site reads like a specialized industry publication, not a marketing landing page. The visual language borrows from print trade journals: warm newsprint-cream paper stock, pressroom-ink type, a single burnt-sienna seal as the only accent, kicker eyebrows in tracked caps, restrained scale-and-weight hierarchy. The page earns the visitor's attention through substance, the way a quality trade publication earns readership: by speaking as an informed insider to other insiders, with operational language matched by operational typography. Recognition first, persuasion second, decoration never.

The system explicitly rejects four aesthetic lanes named in PRODUCT.md. Generic auto-broker template (stock highway photography, blue/red gradients, "GET INSTANT QUOTE!" hero theatrics, urgency timers, fake counter widgets). SaaS-cream marketing (rounded everything, identical 3-card grids, hero-metric repetition, "AI-powered logistics platform" buzzword copy). Logistics-corporate (navy + gold, suit-and-tie photography, 1990s freight-forwarder energy). Crypto/startup (gradient text, glassmorphism, neon accents). The Trade Bulletin posture is the antithesis of all four: it doesn't perform credibility, it documents it.

**Key Characteristics:**
- Warm newsprint-cream surface (#F7F5F0), never pure white. Paper stock, not screen.
- Pressroom-ink type (#2C2C2A), never pure black. Ink on paper, not pixels on screen.
- Single burnt-sienna accent (#993C1D) used as a seal, not a flood. Restrained color strategy: tinted neutrals + one accent ≤10% of any given screen.
- Georgia serif for headlines and titles; system sans for body and UI; JetBrains Mono for credentials, IDs, and structured numerics.
- Hierarchy through scale and weight contrast (≥1.25 ratio), not loudness. No exclamation marks, no urgency theater.
- Multi-layer subtle shadows (four-stop scale) carrying ambient depth, never decorative drop shadows.
- All four locales (EN, RU, UK, PL) at typographic parity. Translation quality is operational quality.

> Two alternate North Stars considered, both viable if "Trade Bulletin" doesn't fit:
> *"The Compliance Ledger"* (operational paperwork as visual language: ledger forms, signed certificates, bonded documents, mono numerics).
> *"The Specialist's Workshop"* (matte tools of a trade: paper, ink, terracotta seal, nothing decorative).

## 2. Colors

A warm-paper neutral base with a single high-conviction accent, expressing the Restrained color strategy. The palette is committed to two doctrines: tint every neutral toward the brand hue rather than using true gray, and treat the accent as a seal whose value comes from rarity.

### Primary
- **Burnt Sienna** (#993C1D, oklch ≈ 47% 0.13 38): the single brand seal color. Used on primary CTAs ("GET QUOTE"), accent badges, kicker eyebrows ("◆ FMCSA LICENSED"), focus glows on inputs, link underlines, hover borders on cards, and the radial wash behind dark heroes. This color carries the brand. It is never used decoratively.
- **Embered Sienna** (#7A3017, oklch ≈ 38% 0.12 38): hover state for accent buttons. Slightly deepened, never bluer or warmer.

### Neutral (warm-paper, not gray)
- **Newsprint Cream** (#F7F5F0): the page surface. Tinted toward burnt sienna at very low chroma. Replaces pure white everywhere on the marketing site. This IS the paper stock.
- **Card White** (#FFFFFF): used only inside elevated cards on top of the cream surface, where the contrast bump signals "this is on top of the page" rather than "this is the page". Never used as a page background.
- **Margin Sand** (#EFECE6): muted soft-bg for sectioned breaks, hover-on-cream surfaces, disabled inputs, sidebar panels.
- **Pressroom Ink** (#2C2C2A): primary text, dark CTA fills, dark hero backgrounds. Never pure black. The warm tint matters.
- **Pressroom Ink Deep** (#1A1A19): hover state on dark CTAs only.
- **Type Stone** (#706E68): muted body copy, secondary metadata, hints, captions.
- **Hint Gray** (#999999): placeholder italic text inside inputs.
- **Margin Hairline** (#E5E0D8): card and divider borders. Always full borders or none, never side stripes.
- **Field Rule** (#DDDDDD): input field default border, slightly cooler than card borders by intent.

### Status (used sparingly)
- **Bonded Pine** (#0F6E56): success state, verified-carrier badges, "Licensed & Bonded" trust marks. Only ever for state, never for decoration.
- **Bonded Pine Tint** (#E1F5EE): success message background.
- **Cite Red** (#C0392B): form error borders and error message text. The only place red appears.

### Named Rules

**The One Seal Rule.** Burnt Sienna covers ≤10% of any given screen. Its rarity is the point. If a page has the accent on the kicker, the primary CTA, and the focus glow, it has met its budget; a fourth use is a deduction. The CTA Strip block is the deliberate exception (a full-bleed accent surface used at most once per page).

**The No-True-White Rule.** The marketing surface is never #FFFFFF. The page is always Newsprint Cream. Card White exists only on top of cream as elevation, never as a base.

**The No-True-Black Rule.** Type and dark surfaces are never #000. Pressroom Ink (#2C2C2A) is the warmest near-black we use. Anything cooler reads as a different brand.

**The Status-Only Color Rule.** Bonded Pine and Cite Red exist only to express system state (success / error / verified). They never appear as decorative accents, dividers, or category tags. PRODUCT.md's "operational honesty" is enforced here: status colors mean status, not vibe.

## 3. Typography

**Display Font:** Georgia (with 'Times New Roman', serif fallback)
**Body Font:** system-ui (with -apple-system, sans-serif fallback)
**Mono Font:** JetBrains Mono (with 'Courier New', monospace fallback)

**Character:** Serif headlines + sans body is the trade-publication pairing — Georgia carries editorial weight without paying webfont latency, system sans keeps body copy fast and locale-native across EN/RU/UK/PL. JetBrains Mono is reserved for structured numerics (USDOT #4427359, MC #1741537, dispatch sheet IDs, $40–60 fee callouts) where tabular alignment expresses operational precision.

### Hierarchy

- **Display** (Georgia 700, clamp(1.8rem, 4vw, 2.75rem), line-height 1.1, tracking -0.02em): page heroes only. One per page maximum. Letter-spacing tightened to feel set, not typed.
- **Headline** (Georgia 700, clamp(1.35rem, 2.5vw, 1.75rem), line-height 1.2, tracking -0.02em): section titles inside `.sectionHeader`. The dominant typographic move on every long-form page.
- **Title** (system-ui 600, 16px, line-height 1.4): card titles, list item titles, in-card subheadings. Sans by intent — keeps the serif/sans contrast clean between section and contents.
- **Body** (system-ui 400, 14.5px, line-height 1.7): standard reading copy.
- **Body Long** (system-ui 400, 16px, line-height 1.7): long-form blog and guide articles. Cap line length at 65–75ch via `narrowColumn` (max-width 720px).
- **Label / Kicker** (system-ui 700, 11px, uppercase, tracking 0.14em): the editorial eyebrow. Almost always paired with `◆` and burnt-sienna fill. Marks the section topic; complements the headline.
- **Micro** (system-ui 600, 12px, tracking 0.02em): form labels, fine print, hint copy. Smaller than the kicker; never uppercase.
- **Mono** (JetBrains Mono 500, 13px): credentials, IDs, dollar figures in dispatch sheets, BOL numbers. Operational paperwork rendered as type.

### Named Rules

**The Kicker–Headline Pair Rule.** Section headers are always a Label kicker (uppercase, sienna, with `◆`) directly above a serif Headline. Never a serif kicker, never a body-cased kicker, never an emoji. The pair is the trade-publication signature.

**The No Decorative Type Rule.** Never gradient text. Never text shadows. Never letter-spaced display copy beyond the tightening described above. Emphasis comes from weight (400 → 700) and scale (≥1.25 ratio between steps), nothing else.

**The Em-Dash Substitution Rule.** No em dashes (`—`) in copy and no `--`. Use commas, colons, semicolons, periods, or parentheses. PRODUCT.md is enforced here: copy that drifts toward em-dash rhythm reads as AI slop.

**The Multilingual Parity Rule.** Russian / Polish / Ukrainian copy uses the same hierarchy and tracking as the English original. No tightened tracking on Cyrillic, no different sizes on Polish. If a translation runs longer, the line-length cap moves down a step before the type scale shrinks.

## 4. Elevation

Multi-layer subtle shadows over a flat-by-default base. The system layers depth atmospherically, never theatrically: each named shadow is two stops stacked (a soft near and a diffuse far) at very low alpha (0.04–0.12). Surfaces are flat at rest; shadows respond to state — hover, focus, active.

### Shadow Vocabulary

- **shadow-sm** (`box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)`): default card resting shadow. Faint enough that the card feels grounded in paper, not floating.
- **shadow-md** (`box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)`): subtle hover, primary CTA hover.
- **shadow-lg** (`box-shadow: 0 4px 12px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)`): card hover lift, dark card hover.
- **shadow-xl** (`box-shadow: 0 8px 24px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.12)`): dialog / sheet / featured-block elevation. Use sparingly.
- **accent-glow** (`box-shadow: 0 2px 8px rgba(153,60,29,0.15), 0 8px 24px rgba(153,60,29,0.15)`): accent CTA hover wash. The only colored shadow in the system.
- **focus-ring** (`box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent)`): keyboard-only focus ring on buttons, inputs, and interactive cards. Two-layer (cream then sienna) so it reads against any surface.

### Named Rules

**The Flat-By-Default Rule.** Surfaces sit flat on the page at rest. Cards have shadow-sm (barely there). Shadows escalate only on state — hover lifts to shadow-lg, focus replaces shadow with the focus ring, accent CTA hover fires the colored accent-glow.

**The No Glassmorphism Rule.** No `backdrop-filter: blur` as a decorative surface treatment. PRODUCT.md anti-reference #4. If translucency is genuinely needed (e.g., a sticky nav over scrolled content), use a solid Newsprint Cream background with shadow, not blur.

**The 3px Lift Cap Rule.** Card hover translateY caps at -3px. Anything more reads as a bouncy startup card; the trade-publication register stays controlled.

**The Augment-Don't-Rewrite Rule.** Ranking pages get visual refinement, not content cuts. Vary layouts, restyle cards, add banner-like breaks, refine iconography — but preserve content depth and heading structure that earned the ranking. The page is a working SEO asset; design serves it, doesn't replace it. Future commands like `distill`, `layout`, `bolder` operating on ranking pages must respect this: if a suggestion removes content paragraphs or restructures H2 hierarchy on a ranking page, flag for ranking-impact review before applying. (See PRODUCT.md Design Principle 6.)

## Token aliasing

The descriptive token names in this spec (`newsprint-cream`, `pressroom-ink`, `burnt-sienna`, etc.) are aliases over the existing CSS custom properties in `src/styles/variables.css` (`--bg`, `--text`, `--accent`, etc.). Both naming conventions resolve to the same hex values; no refactor is required. New code may use either layer. Use the descriptive names when authoring new components or reasoning about visual roles; the legacy `--bg`/`--text`/`--accent` shorthands remain valid in existing CSS modules.

## 5. Components

### Buttons

Pill-shape across all variants (radius 20px). Tracked caps (uppercase, letter-spacing 0.5px), 12px size, weight 600. Min height 40px (44px under 520px viewport for touch comfort). Active state scales to 0.97 instead of bouncing.

- **Primary (`.btnPrimary`):** Pressroom Ink fill, Newsprint Cream text. Hover deepens to #1A1A19 plus shadow-md. The default action button across most surfaces.
- **Accent (`.btnAccent`):** Burnt Sienna fill, white text. Hover deepens to Embered Sienna plus accent-glow. Reserved for high-intent CTAs ("GET QUOTE", "REQUEST DISPATCH", "BOOK PORT DELIVERY"). Never use for tertiary actions; the One Seal Rule applies.
- **Secondary (`.btnSecondary`):** transparent fill, Pressroom Ink text, 1px Field Rule border. Hover fills to Margin Sand and shifts border to Pressroom Ink. Pairs with Primary when two CTAs sit side by side ("GET QUOTE" + "TRACK SHIPMENT").
- **Ghost (`.btnGhost`):** transparent fill, no border. Hover fills to a 6% Pressroom Ink wash. For tertiary actions in dense surfaces.
- **Sizes:** `btnSm` (6px 14px / 11px text), `btnLg` (14px 32px / 13px text). Compose onto any variant.

### Cards

- **Default (`.card`):** Card White fill, 1px Margin Hairline border, radius 12px, padding 28px, shadow-sm at rest. Hover translateY -3px, shadow-lg, border shifts to Burnt Sienna. The dominant container across the site.
- **Muted (`.cardMuted`):** Margin Sand fill, transparent border at rest, radius 12px, padding 28px. Hover lifts -2px, border becomes Burnt Sienna, fill becomes Card White (the "ghost-to-paper" reveal). Used where a section needs a softer container break than full white.
- **Dark (`.cardDark`):** Pressroom Ink fill, Newsprint Cream text, 1px self-border, radius 12px, padding 28px. Hover translateY -3px, shadow-lg. Reserved for testimonial blocks and inverted feature surfaces inside dark sections.
- **Accent Border (`.accentBorder`):** modifier that swaps the resting border to Burnt Sienna and adds a 1px sienna ring + shadow-md. For a single "featured" card per group ("Most Popular", "Recommended"), never multiple.
- **Grids:** `.cardGrid` (3-col → 2 → 1, gap 24/20/16), `.cardGrid2` (2-col → 1, gap 24/16), `.cardGrid4` (4-col → 2 → 1, gap 20). Vary spacing across sections rather than reusing one grid; identical grids stacked are PRODUCT.md anti-reference #2.

### Inputs

Card White fill, 1px Field Rule border, radius 8px, padding 10px 14px (12px 14px on mobile), min-height 44px. Font size 14px desktop, **16px mobile** (iOS zoom-on-focus prevention is non-negotiable).

- **Hover:** border darkens to #BBB.
- **Focus:** border becomes Burnt Sienna; 3px Burnt Sienna 15%-alpha glow surrounds the field.
- **Placeholder:** Hint Gray, italic, 0.8 opacity. The italic is intentional — it visually distinguishes hint from value.
- **Error (`.inputError`):** border + focus glow swap to Cite Red. Error message renders in Cite Red 12px weight 500 below the field.
- **Textarea:** composes input, vertical resize, min-height 96px, line-height 1.6.
- **Select:** composes input, native chevron replaced with inline SVG (gray, 10×6) at right 14px center.
- **Checkbox / Radio:** `accent-color: Burnt Sienna`. Focus-visible adds a 2px sienna outline with 2px offset.

### Page Hero

Two variants. Always centered, always paired with kicker + display.

- **Warm (`.pageHeroWarm`):** Newsprint Cream → Margin Sand vertical gradient with a low-alpha radial Burnt Sienna wash at center-bottom. Padding clamps responsively. Default for marketing pages.
- **Dark (`.pageHeroDark`):** Pressroom Ink fill with a Burnt Sienna 18%-alpha radial wash positioned top-right (-40% / -10%, 520×520). Display title swaps to Newsprint Cream. Used for high-conviction surfaces (About, exporter pitch).

### Section Header

Kicker + serif title + optional sans lede. Centered. Margin-bottom clamps responsively. The kicker is always uppercase 11px with 0.14em tracking, sienna fill, optionally prefixed with `◆`. The title is Headline-tier serif. The lede caps at 620px width.

### Audience Cards (signature pattern)

Three-up audience-routing card row used on Home to send visitors into the right track (`/ship-my-car`, `/dealers`, `/exporters`). Each card is a full clickable region (role="link", tabindex=0, keyboard activation on Enter / Space) with: an icon block, a small audience tag (Label-style), a serif Title, a body description, a status row with a tone-colored dot + stat line, and a CTA button with a trailing arrow. The three cards diverge only in `tone` modifier (coral / teal / amber) which colors the icon block, dot, and CTA underline; everything else stays at parity. Stagger the entrance with `--i: index` (0/1/2) and `staggerChild` so the row reveals left-to-right under `prefers-reduced-motion: no-preference`. Stops being a card grid the moment it's read as one — vary the layout *around* it on the page (a wide hero above, an asymmetric Benefits + WhyY7 split below) so the row is the deliberate three-up moment, not another generic card grid.

### CTA Strip (signature component)

Full-bleed Burnt Sienna → Embered Sienna 135° gradient, radius 16px, padding clamps responsively. Title in white serif Headline, subtitle in 82%-alpha white sans, primary button is the only inverted button in the system (white fill, Burnt Sienna text). One CTA Strip per long-form page maximum — it is the deliberate exception to the One Seal Rule.

### Underline Grow (link treatment)

Inline link gets a 1.5px Burnt Sienna underline that scales from 0 → 1 on hover (`scaleX`, transform-origin left). Pairs with `.underlineCenter` (transform-origin center) for centered link rows. The trade-publication footnote feel: links don't shout, they reveal underlines on intent.

## 6. Do's and Don'ts

### Do:
- **Do** treat Newsprint Cream (#F7F5F0) as the page background everywhere on the marketing site. Card White (#FFFFFF) belongs only inside elevated cards.
- **Do** use Burnt Sienna (#993C1D) as a seal: kicker fills, primary CTAs, focus glows, link underlines, hover borders. ≤10% of any screen.
- **Do** pair every section title with a tracked-caps Label kicker, optionally prefixed by `◆`. The kicker–headline pair is the trade-publication signature.
- **Do** lead with operational specifics on every audience surface: USDOT #4427359, MC #1741537, $75k BMC-84 surety bond, port partners, dispatch fee structure. Render IDs in JetBrains Mono.
- **Do** vary card grid layouts across long pages (3-col, 2-col, narrow column, asymmetric pairs). Identical card grids stacked are PRODUCT.md anti-reference #2.
- **Do** keep status colors (Bonded Pine, Cite Red) for system state only — never decorative.
- **Do** maintain typographic parity across EN, RU, UK, PL. Translation quality is operational quality (PRODUCT.md Design Principle 5).
- **Do** respect `prefers-reduced-motion` on every animation; entrance fades, lifts, and reveals all collapse to instant when reduced motion is set.
- **Do** keep input font-size at 16px on mobile to prevent iOS zoom-on-focus.
- **Do** state Y7 as "Licensed & Bonded FMCSA Broker", never "Licensed & Insured" (brokers don't carry cargo insurance, carriers do — PRODUCT.md operational-honesty doctrine carried through copy).

### Don't:
- **Don't** use pure white (#FFFFFF) as a page background. The Newsprint Cream warm tint is non-negotiable; pure white reads as SaaS-cream marketing (PRODUCT.md anti-reference #2).
- **Don't** use pure black (#000) on text or surfaces. Pressroom Ink (#2C2C2A) carries the warm cast that ties to the rest of the palette.
- **Don't** ship gradient text (`background-clip: text` over a gradient fill). PRODUCT.md anti-reference #4. Emphasis comes from weight and scale, not coloring tricks.
- **Don't** ship glassmorphism or `backdrop-filter: blur` as decoration. PRODUCT.md anti-reference #4.
- **Don't** add neon accents, Web3-flavored gradients, "AI-native dispatch" copy, or any startup/crypto visual cues. PRODUCT.md anti-reference #4.
- **Don't** ship blue/red/orange marketing gradients, "GET INSTANT QUOTE!" hero treatments in giant fonts, urgency timers, fake "X people just got quotes" widgets, or cherry-picked review carousels. PRODUCT.md anti-reference #1.
- **Don't** ship navy + gold logistics-corporate palette, suit-and-tie photography, or "Your global logistics partner since 1985" energy. PRODUCT.md anti-reference #3.
- **Don't** use side-stripe borders (`border-left` > 1px as a colored accent). Always full borders or no border.
- **Don't** ship the hero-metric template (big number + small label + supporting stats + gradient accent). SaaS cliché.
- **Don't** stack identical 3-card grids more than once per page. Vary the rhythm; nested cards are always wrong.
- **Don't** use modals as a first thought. Exhaust inline / progressive alternatives. Modals exist; they are not the default.
- **Don't** use em dashes (`—`) or `--` in copy. PRODUCT.md copy rule.
- **Don't** exceed a -3px translateY on card hover. The trade-publication register stays controlled; anything more reads as bouncy startup card.
- **Don't** use Burnt Sienna as a decorative wash, divider, or large fill outside the CTA Strip exception. The accent's value is rarity (One Seal Rule).
- **Don't** treat RU/UK/PL copy as smaller, looser, or visually demoted. The Polish exporter base is among Y7's most loyal segments; locale parity is a brand value, not a translation chore.
