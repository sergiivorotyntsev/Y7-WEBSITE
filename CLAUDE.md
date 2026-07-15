# Y7 Logistics

Licensed FMCSA auto transport broker (USDOT #4427359, MC #1741537, $75k BMC-84 surety bond). Marketing + SEO long-form site at `www.y7agency.com`. Dispatch portal lives separately at `dispatch.y7agency.com`.

## Design Context

Two project-root files carry the design system. **Read them before any UI work or copy change.**

- **[PRODUCT.md](./PRODUCT.md)** — strategic. Register (`brand`), three primary co-equal audiences (personal-car shippers, dealers, exporters), brand personality (operationally-honest, expert-confident, editorial-restrained), four named anti-references, and five strategic design principles.
- **[DESIGN.md](./DESIGN.md)** — visual. Creative North Star "The Trade Bulletin", warm-newsprint-cream + burnt-sienna palette as OKLCH/hex tokens, Georgia serif + system sans + JetBrains Mono type scale, multi-layer subtle shadow vocabulary, component primitives (button / card / input / hero / CTA strip), forceful Do's and Don'ts.
- **[DESIGN.json](./DESIGN.json)** — sidecar. Tonal ramps, motion tokens, breakpoints, full HTML/CSS component snippets for tooling (Stitch live panel, etc.). Regenerated alongside DESIGN.md.

## Strategic principles (from PRODUCT.md)

1. **Recognition before expertise** — name the visitor's specific generalist-bundling pain before stating Y7's solution.
2. **Specialization is the moat; show its depth** — operational specifics, not abstract claims. "Specifics or silence."
3. **Practice the transparency we preach** — operational honesty in copy must be matched by operational honesty in design. No urgency theater, no fake social proof, no hidden markup mechanics.
4. **Three audience tracks, one brand spine** — `/ship-my-car`, `/dealers`, `/exporters` diverge in copy depth, not visual language.
5. **Translation quality is operational quality** — RU/PL/UK copy at parity with EN. The Polish exporter base is among Y7's most loyal segments.

## Hard visual constraints (from DESIGN.md)

- Page background is **Newsprint Cream `#F7F5F0`**, never pure white.
- Type is **Pressroom Ink `#2C2C2A`**, never pure black.
- Accent is **Burnt Sienna `#993C1D`** used as a seal, ≤10% of any screen (One Seal Rule). CTA Strip is the single deliberate exception per page.
- Section headers always pair a tracked-caps kicker (often `◆ KICKER`) above a Georgia serif headline. The Trade Bulletin signature.
- No gradient text, no glassmorphism, no neon accents, no urgency theater, no side-stripe borders, no em dashes (`—`) in copy.
- Status colors (Bonded Pine green, Cite Red) for system state only, never decorative.
- Card hover lift caps at `-3px`. Subtle shadows only.
- Multilingual parity across EN/RU/UK/PL is non-negotiable.

## Improvement framework

When running Impeccable enhancement commands (`bolder`, `colorize`, `layout`, `delight`, etc.) on Y7 surfaces, **improve within the editorial-trade-publication aesthetic**. The reference test:

> If a suggestion would feel at home in **Bloomberg, Stripe Press, or a quality trade publication**, it likely fits Y7. If it would feel at home on a generic broker template or AI-startup landing page, it doesn't.

Specifically welcomed: better visual hierarchy, varied section layouts to break the 7-grid monotony flagged in the recent Impeccable audit, strategic emphasis where content needs lift, banner-like visual breaks for long pages, refined iconography that ties to the operational expertise theme.

Specifically forbidden: gradient text (anti-reference #4), glassmorphism, neon accents, urgency theater, decorative loudness for its own sake. Hierarchy comes from scale and weight contrast, not visual fireworks.

## Operational facts (so AI agents stop guessing)

- Pricing model: customer pays Y7 only a flat dispatch fee per load (`$40-60` depending on customer type). Carrier rate is paid separately, either COD at delivery or via Y7 with a signed dispatch sheet showing the carrier's actual rate. **No spread, no hidden markup.**
- Always "Licensed & Bonded FMCSA Broker", never "Licensed & Insured" (brokers don't carry cargo insurance, carriers do).
- Sister company: DaytonaCargo LLC (Dover, DE) handles the ocean freight leg for exporters wanting both legs from one trusted source.
- Audience pages: `/ship-my-car` (personal), `/dealers` (B2B), `/exporters` (PL/RU/UA international).
- Locale parity: EN, RU, UK, PL — all LTR. RTL, high-contrast mode are out of current scope.
- **SEO ranking preservation:** y7agency.com pages already rank well in search engines and AI chatbot citations. Ranking pages are operational assets. When making improvements to `/dealers`, `/services`, `/ship-my-car`, `/exporters`, or any long-form page, augment with visual variety and presentation improvements, but preserve keyword density, content depth, and H1/H2/H3 hierarchy. Cutting content or rewriting copy on ranking pages requires explicit ranking-impact review first.

## Design skill precedence

The skills in `.claude/skills/` (ui-ux-pro-max, frontend-design, design-taste-frontend, senior-frontend) are ADVISORY. Y7-WEBSITE invariants always override skill suggestions: no Tailwind (translate to inline styles / CSS modules), theme.js is the single design-token source, no React.lazy (breaks Puppeteer prerender), augment-don't-rewrite ranking content, broker compliance in copy ("Licensed & Bonded FMCSA Broker" only, no carrier/tracking claims, no phone numbers), new npm packages need explicit justification + prerender verification, and locale parity on EN root + /ru/, /pl/, /ua/. Full rules: [.claude/skills/README-Y7-PRECEDENCE.md](./.claude/skills/README-Y7-PRECEDENCE.md). Usage order in design sprints: design-taste-frontend + frontend-design (+ senior-frontend) as taste/direction layer first, ui-ux-pro-max as data lookup layer (search.py).
