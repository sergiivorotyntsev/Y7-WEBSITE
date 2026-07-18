# Y7 Logistics

Licensed FMCSA auto transport broker (USDOT #4427359, MC #1741537, $75k BMC-84 surety bond). Marketing + SEO long-form site at `www.y7agency.com`. Dispatch portal lives separately at `dispatch.y7agency.com`.

## Design Context

Two project-root files carry the design system. **Read them before any UI work or copy change.**

- **[PRODUCT.md](./PRODUCT.md)** — strategic. Register (`brand`), three audiences under a **B2B-first hierarchy** (dealers & exporters primary; personal-car shippers visually secondary but fully served, all SEO surfaces preserved), brand personality (operationally-honest, expert-confident, editorial-restrained), four named anti-references, and six strategic design principles.
- **[DESIGN.md](./DESIGN.md)** — visual, **V2 "The Dispatch Board"** (supersedes V1 "Trade Bulletin", 2026-07). Board-black `#050607` + manifest-paper `#f4f0e8` surface alternation, signal-red `#d70f24` under a strict Signal Budget, Oswald condensed uppercase display (Cyrillic mandatory) + system sans body + JetBrains Mono microcopy, fixed-inventory Japanese brand-mark accents, measured contrast law, forceful Do's and Don'ts. V2 tokens are ADDITIVE (`--v2-*` / `theme.js v2`) until a wave flips a surface.
- **[DESIGN.json](./DESIGN.json)** — sidecar. Tonal ramps, contrast matrix, motion tokens, breakpoints, full HTML/CSS component snippets for tooling. Regenerated alongside DESIGN.md.

## Strategic principles (from PRODUCT.md)

1. **Recognition before expertise** — name the visitor's specific generalist-bundling pain before stating Y7's solution.
2. **Specialization is the moat; show its depth** — operational specifics, not abstract claims. "Specifics or silence."
3. **Practice the transparency we preach** — operational honesty in copy must be matched by operational honesty in design. No urgency theater, no fake social proof, no hidden markup mechanics.
4. **Three audience tracks, one brand spine, B2B-first billing** — `/ship-my-car`, `/dealers`, `/exporters` diverge in copy depth, not visual language; dealers & exporters lead on shared surfaces.
5. **Translation quality is operational quality** — RU/PL/UK copy at parity with EN. The Polish exporter base is among Y7's most loyal segments.

## Hard visual constraints (from DESIGN.md v2 "The Dispatch Board")

- Two surfaces only: **board-black `#050607`** and **manifest-paper `#f4f0e8`** (panel `#0e1012` for cards inside board). Never pure `#000`/`#fff`. Conversion pages alternate surfaces and open+close dark; long-form/SEO pages stay paper-dominant (≤25% dark).
- **Signal red `#d70f24`** under the Signal Budget: max one red fill + two red accents per viewport; ≤10%-alpha red is exempt. Body-size red on dark uses `#ef3a4e` (contrast law). The CTA gradient `#d70f24→#a90918` is the ONLY legal gradient.
- Display type: **Oswald condensed uppercase** (self-hosted, Cyrillic mandatory), lh 0.98, no `overflow:hidden` on display headings. Reading copy stays sentence-case system-ui. Mono microcopy = JetBrains Mono.
- Section opener: mono eyebrow + 46×2 red rule-line above condensed headline (◆ glyph, pine kickers, sienna = retired V1 artifacts). Max 2 consecutive sections open with the pair.
- JP accents (シンプル・迅速・信頼 / 改善 / 七 / 選択と集中): `aria-hidden` brand marks, fixed inventory, never translated, never informative; max 2/viewport, 3/page.
- No gradient text, no text shadows (one hero-URL exception), no glassmorphism, no neon, no urgency theater, no side-stripe borders, no em dashes (`—`) in copy.
- Bonded Pine green for success/verified state only. Errors use the red family + icon, never color alone.
- Card hover lift caps at `-3px`. Visible `:focus-visible` (2px red outline, offset 2) is mandatory everywhere.
- Entrance animations only through `Reveal`/`__Y7_PRERENDER` gates (LCP law). Multilingual parity across EN/RU/UK/PL is non-negotiable.
- V2 primitives live in `src/styles/v2/` and MUST be imported by build waves; re-implementing them inline on a page is a review-reject (Anti-Orphan Rule).

## Improvement framework

When running Impeccable enhancement commands (`bolder`, `colorize`, `layout`, `delight`, etc.) on Y7 surfaces, **improve within the editorial-trade-publication aesthetic**. The reference test:

> If a suggestion would feel at home in **Bloomberg, Stripe Press, or a quality trade publication**, it likely fits Y7. If it would feel at home on a generic broker template or AI-startup landing page, it doesn't.

Specifically welcomed: better visual hierarchy, varied section layouts to break the 7-grid monotony flagged in the recent Impeccable audit, strategic emphasis where content needs lift, banner-like visual breaks for long pages, refined iconography that ties to the operational expertise theme.

Specifically forbidden: gradient text (anti-reference #4), glassmorphism, neon accents, urgency theater, decorative loudness for its own sake. Hierarchy comes from scale and weight contrast, not visual fireworks.

## Operational facts (so AI agents stop guessing)

- Pricing model: customer pays Y7 only a dispatch fee per load. Y7 dispatch fee: dealers/exporters = flat $50 per vehicle; individuals = max($75, 10% of carrier price) (ind_2026 model, matches the portal). Carrier rate is paid separately, either COD at delivery or via Y7 with a signed dispatch sheet showing the carrier's actual rate. **No spread, no hidden markup.**
- Always "Licensed & Bonded FMCSA Broker", never "Licensed & Insured" (brokers don't carry cargo insurance, carriers do).
- Sister company: DaytonaCargo LLC (Dover, DE) handles the ocean freight leg for exporters wanting both legs from one trusted source.
- Audience pages: `/ship-my-car` (personal), `/dealers` (B2B), `/exporters` (PL/RU/UA international).
- Locale parity: EN, RU, UK, PL — all LTR. RTL, high-contrast mode are out of current scope.
- **SEO ranking preservation:** y7agency.com pages already rank well in search engines and AI chatbot citations. Ranking pages are operational assets. When making improvements to `/dealers`, `/services`, `/ship-my-car`, `/exporters`, or any long-form page, augment with visual variety and presentation improvements, but preserve keyword density, content depth, and H1/H2/H3 hierarchy. Cutting content or rewriting copy on ranking pages requires explicit ranking-impact review first.

## Process protocol (parallel sessions, builds, dist validation)

- **Worktree protocol:** one git worktree per concurrent Claude/agent session — `git worktree add ../Y7-WEBSITE-<task> origin/main`. Never run two sessions in one working copy: mid-build src edits corrupt prerender snapshots, and foreign commits land on the wrong branch (AIA1 precedent: isolate to its own branch and report, never let it ride a sprint branch).
- **Single-builder rule:** before `npm run build`, verify no concurrent build is running (fresh node processes, changing `dist/` mtimes). Two overlapping builds produced empty-shell snapshots that still reported "138 OK".
- **Dist validation:** never trust the prerender's own "N OK" counter. After every build: check all routes in `dist/valid-routes.json` have files, flag snapshots <20 KB, and spot-check 3 pages for real content (helmet title/meta, populated `#root`, expected strings).
- **V2 primitive adoption (Anti-Orphan Rule):** every DESIGN-V2 build wave imports `src/styles/v2/*.module.css` for surfaces/type/buttons/cards/accents. New inline re-implementations of these patterns on pages are a review-reject.

## Design skill precedence

The skills in `.claude/skills/` (ui-ux-pro-max, frontend-design, design-taste-frontend, senior-frontend) are ADVISORY. Y7-WEBSITE invariants always override skill suggestions: no Tailwind (translate to inline styles / CSS modules), theme.js is the single design-token source, no React.lazy (breaks Puppeteer prerender), augment-don't-rewrite ranking content, broker compliance in copy ("Licensed & Bonded FMCSA Broker" only, no carrier/tracking claims, no phone numbers), new npm packages need explicit justification + prerender verification, and locale parity on EN root + /ru/, /pl/, /ua/. Full rules: [.claude/skills/README-Y7-PRECEDENCE.md](./.claude/skills/README-Y7-PRECEDENCE.md). Usage order in design sprints: design-taste-frontend + frontend-design (+ senior-frontend) as taste/direction layer first, ui-ux-pro-max as data lookup layer (search.py).
