# Y7 Logistics

Licensed FMCSA auto transport broker (USDOT #4427359, MC #1741537, $75k BMC-84
surety bond). Marketing + SEO long-form site at `www.y7agency.com`. Dispatch
portal lives separately at `dispatch.y7agency.com`.

## Design Context

Three project-root files carry the design system. **Read them before any UI
work or copy change.**

- **[PRODUCT.md](./PRODUCT.md)** — strategic. Register (`brand`), three
  audiences under a **B2B-first hierarchy** (dealers & exporters primary;
  personal-car shippers visually secondary but fully served, all SEO surfaces
  preserved), brand personality (operationally-honest, expert-confident,
  editorial-restrained), four named anti-references, six design principles.
  Known staleness: its Brand Personality section still quotes the retired
  `$40-60` fee; the current model is under Operational facts below.
- **[DESIGN.md](./DESIGN.md)** — the visual constitution, **V2 "The Dispatch
  Board"** (supersedes V1 "The Trade Bulletin", 2026-07). Board-black `#050607`
  + manifest-paper `#f4f0e8` surface alternation, signal-red `#d70f24` under a
  strict Signal Budget, Oswald condensed uppercase display (Cyrillic mandatory)
  + system-ui body + JetBrains Mono microcopy, fixed-inventory Japanese brand
  marks, measured contrast laws, the Dark Share rule and its measurement
  convention (§2), hero Angle/Photo laws (§11), the Earned Container law (§12),
  forceful Do's and Don'ts.
- **[DESIGN.json](./DESIGN.json)** — sidecar (`schemaVersion: 2`). Tonal ramps,
  contrast matrix, motion tokens, breakpoints, full HTML/CSS component snippets
  for tooling. Regenerated alongside DESIGN.md.

## Strategic principles (from PRODUCT.md)

1. **Recognition before expertise** — name the visitor's specific
   generalist-bundling pain before stating Y7's solution.
2. **Specialization is the moat; show its depth** — operational specifics, not
   abstract claims. "Specifics or silence."
3. **Practice the transparency we preach** — no urgency theater, no fake social
   proof, no hidden markup mechanics.
4. **Three audience tracks, one brand spine, B2B-first billing** —
   `/ship-my-car`, `/dealers`, `/exporters` diverge in copy depth, not visual
   language; dealers & exporters lead on shared surfaces.
5. **Translation quality is operational quality** — RU/PL/UK copy at parity
   with EN. The Polish exporter base is among Y7's most loyal segments.
6. **Augment, don't rewrite ranking content** — ranking pages are operational
   SEO assets; restyle freely, but content cuts or copy rewrites need
   ranking-preservation review first.

## Hard visual constraints (from DESIGN.md V2)

- Two surfaces only: **board-black `#050607`** and **manifest-paper `#f4f0e8`**
  (panel-steel `#0e1012` for cards inside board sections only). Never pure
  `#000`/`#fff`. Conversion pages alternate surfaces and open+close dark;
  long-form/SEO pages stay paper-dominant.
- **Dark Share rule (§2):** conversion pages 40-60% board, long-form ≤25%,
  link-hubs ≤35%. Measured at 1440 width, page-owned bands only (global
  header/footer and overlays excluded); a surface counts as a band only at
  ≥90% viewport width — cards are not bands.
- **Signal red `#d70f24`** under the Signal Budget: max one red fill + two red
  accents per viewport; ≤10%-alpha red is exempt. Body-size red on dark uses
  `#ef3a4e` (contrast law). The CTA gradient `#d70f24→#a90918` is the ONLY
  legal color gradient; the board-to-transparent photo mask (§11) is the only
  other sanctioned gradient use.
- Display type: **Oswald condensed uppercase** (self-hosted, Cyrillic
  mandatory), line-height 0.98 pinned, never `overflow:hidden` on display
  headings. Reading copy stays sentence-case system-ui; microcopy is JetBrains
  Mono. Georgia survives only as the AnimatedLogo "Y7." wordmark and blog
  article bodies — never headings, nav, or UI.
- Section opener: mono eyebrow + 46×2px signal-red rule-line above a condensed
  headline; max 2 consecutive sections open with the pair. The ◆ glyph, pine
  kickers, and sienna are retired V1 artifacts.
- JP accents (シンプル・迅速・信頼 / 改善 / 七 / 選択と集中): `aria-hidden`
  brand marks, fixed inventory, never translated, never informative; max 2 per
  viewport, 3 per page.
- **Earned Container law (§12):** default is content on the ground plane —
  hairlines and typographic hierarchy, not boxes. Containers are earned by
  interactivity (fields, buttons), CTA panels, or deliberate dark anchors.
  Borderless interactive elements carry a resting underline (Body-Link Law §7).
- No gradient text, no text shadows, no glassmorphism, no neon, no urgency
  theater, no em dashes (`—`) in site copy.
- Bonded Pine green for success/verified state only. Errors use the red family
  + icon, never color alone.
- Card hover lift caps at `-3px`. Visible `:focus-visible` (2px red outline,
  offset 2) is mandatory everywhere.
- Status pulses are the only perpetual motion, max one per viewport (§6); use
  the shared `GlowDot` primitive, never a new pulsing element.
- Entrance animations only through `Reveal`/`__Y7_PRERENDER` gates (LCP law).
  Multilingual parity across EN/RU/UK/PL is non-negotiable.
- V2 primitives live in `src/styles/v2/` and MUST be imported by pages —
  re-implementing them inline is a review-reject (Anti-Orphan Rule).

## Copy conventions (recent rulings — provisional home)

These two rulings are canonized HERE until a DESIGN.md amendment adopts them;
they exist in no other repo doc, so do not "correct" copy against them.

- In RU/PL/UA copy, the "dispatch" term family always names the
  carrier-assignment service (the dispatch desk), never departure or
  shipment-sending; do not let translations drift it toward "отправка".
- Imagery ships at native resolution only — no upscaled assets. Hero
  photography follows the Photo Treatment Law (DESIGN.md §11): owner-supplied
  only, board-emergence mask, tinted to palette, `aria-hidden`.

## Improvement framework

When running enhancement passes on Y7 surfaces, **improve within the
editorial-trade-publication aesthetic**. The reference test:

> If a suggestion would feel at home in **Bloomberg, Stripe Press, or a
> quality trade publication**, it likely fits Y7. If it would feel at home on a
> generic broker template or AI-startup landing page, it doesn't.

Specifically welcomed: better visual hierarchy, varied section layouts,
strategic emphasis where content needs lift, banner-like visual breaks for
long pages, refined iconography tied to the operational-expertise theme.
Container discipline is governed by the Earned Container law (DESIGN.md §12) —
the old "7-grid monotony" problem is resolved; do not reintroduce fields of
bordered boxes.

Specifically forbidden: gradient text, glassmorphism, neon accents, urgency
theater, decorative loudness for its own sake. Hierarchy comes from scale and
weight contrast, not visual fireworks.

## Operational facts (so AI agents stop guessing)

- Pricing model: customer pays Y7 only a dispatch fee per load. Dealers and
  exporters: flat **$50 per vehicle**. Individuals: the greater of **$75 or
  10% of the carrier price** (ind_2026 model; matches the portal and
  `src/locales/en/agreement.json`). Carrier rate is paid separately — COD at
  delivery, or via Y7 with a signed dispatch sheet showing the carrier's
  actual rate. **No spread, no hidden markup.** The `$40-60` figure in older
  docs is retired.
- Always "Licensed & Bonded FMCSA Broker", never "Licensed & Insured" (brokers
  don't carry cargo insurance, carriers do). Carrier count claim is "700+";
  response-time promises carry the business-hours hedge (DESIGN.md §8).
- Milestone language only: status updates at shipment milestones — never
  "real-time tracking", "GPS", "live tracking" (DESIGN.md §8).
- Brand string: the public brand is **"Y7 Logistics"** in all copy, nav,
  titles. "Y7 Agency" never appears in copy; legal line is
  `© Y7 Consulting Inc d/b/a Y7 Logistics` (DESIGN.md §8).
- Sister company: **DaytonaCargo** (Dover, DE) handles the ocean-freight leg
  for exporters wanting both legs from one trusted source. The repo currently
  mixes the entity suffix ("LLC" on PL locale pages, "Corp" on the
  `/daytonacargo` LP) — do not assert a legal suffix in new copy without owner
  confirmation.
- Audience pages: `/ship-my-car` (personal), `/dealers` (B2B), `/exporters`
  (PL/RU/UA international).
- Locale parity: EN, RU, UK, PL — all LTR. RTL and high-contrast mode are out
  of current scope.
- **SEO ranking preservation:** y7agency.com pages already rank well in search
  engines and AI chatbot citations. Ranking pages are operational assets. When
  making improvements to `/dealers`, `/services`, `/ship-my-car`,
  `/exporters`, or any long-form page, augment with visual variety and
  presentation improvements, but preserve keyword density, content depth, and
  H1/H2/H3 hierarchy. Cutting content or rewriting copy on ranking pages
  requires explicit ranking-impact review first.

## Engineering invariants

- No Tailwind. Design tokens come from `theme.js` (single source, kept in sync
  with `variables.css` and DESIGN.json on every token commit).
- No new `React.lazy` routes — lazy loading breaks the Puppeteer prerender.
  The `/daytonacargo` LP's `lazyWithRetry` load is the one deliberate,
  verified exception (CWV-T02).
- New npm packages need explicit justification plus prerender verification.
- Never trust the prerender's own "N OK" counter: check every route in
  `dist/valid-routes.json` has a file, flag snapshots under 20 KB, spot-check
  pages for real content. Full process protocol (worktrees, single-builder
  rule, dist validation): [CLAUDE.md](./CLAUDE.md).
