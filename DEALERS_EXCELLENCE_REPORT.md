# Sprint DEALERS-EXCELLENCE — Report

## Strategic repositioning

**Before**: "Auto Transport for Dealers" — a broker with volume-discount tiers and dedicated-dispatcher-for-big-volume framing.

**After**: "Your Outsourced Dispatch Department" — a full operational department delivered as a service, flat per-vehicle fee, positioned as the alternative to hiring an internal dispatcher (~$90k true annual cost).

The positioning turns the SERP into a self-qualification funnel: dealers researching internal-hire alternatives land on a page that names their actual decision in the title. Volume-discount shoppers (wrong fit) bounce. That's intended.

---

## Commits

| # | Commit | Summary |
|---|---|---|
| T01 | `04ec181` | architecture plan + content audit |
| T02 | `956f875` | design system prepared |
| T03 | `3ffbdd3` | rewrite dealers.json × 4 locales |
| T04 | `4bed756` | rebuild Dealers.jsx |
| T05 | `b517be3` | complete Dealers.module.css |
| T06 | `3e64f78` | meta tags × 4 locales |
| T07 | `d3765de` | outbound link mesh verification |
| T08 | `0d74c0c` | inbound link mesh verification |
| T09 | this file | build + verify + report |

---

## Before / after metrics

| Metric | Before | After |
|---|---|---|
| Dealers.jsx line count | 115 | ~350 |
| Sections | 6 | 14 |
| dealers.json (EN) line count | 262 | ~340 (with new structure) |
| FAQ items | 10 | 13 |
| Schema blocks | 2 (Breadcrumb + MoneyPageSchema) | 3 (Breadcrumb + Service + FAQPage) |
| Crosslinks from /dealers | 3 | 12 |
| Incoming links to /dealers | 9 files | 9 files (unchanged — mesh was already strong) |
| Volume-discount tier tables | 2 (pricing.tiers + volumeTable.rows) | **0** |
| Discount percentages | 5+ (5%, 10%, 15%, "custom") | **0** |
| Payment option framing | Tiered by volume | Two flat-fee flows (COD vs Prepay) |

---

## Sections (14, all rendered from i18n keys)

1. **Hero** — "Your Outsourced Dispatch Department" display H1 + 3-badge trust bar
2. **Problem** — dark section, 3 cards (internal dispatcher / generic broker / Y7)
3. **Capabilities** — 8 cards in 4×2 grid
4. **Workflow** — 5-phase timeline, horizontal desktop, vertical mobile
5. **Payment Options** — 2 equal side-by-side cards, no "popular" badge, "Hands-on" vs "Hands-off" tags
6. **Portal** — 6 feature cards, gradient background
7. **Auction Coverage** — 4 clickable cards linking to Copart / IAA / Manheim / ADESA SEO pages
8. **Use Cases** — 5 scenario cards
9. **Billing** — 6 feature cards (Friday invoice, Net-15, ACH, monthly summary, DMS export, audit trail)
10. **When Things Fail** — 6 failure-mode scenarios with recovery playbook
11. **Who We Serve** — 5 dealer segments (independents, franchise, exporter-dealers, rebuilders, auction-only)
12. **How We're Different** — 3-column comparison table (internal / broker / Y7)
13. **FAQ** — 13 accordion items, FAQPage schema auto-generated from array
14. **CTA** + **Crosslinks** — coral CTA strip + 8-item crosslinks grid

---

## Compliance confirmation

| Check | Result |
|---|---|
| "Volume discount" / "tier" / "10%" / "15%" in Dealers.jsx or dealers.json | **0 matches** |
| "The more you ship" / "save more ship more" | **0 matches** |
| `dispatch@y7agency.com` in /dealers | **0 matches** |
| `Licensed.*Insured` applied to Y7 | **0 matches** (copy uses "Licensed & Bonded") |
| Phone number on /dealers | none |
| Storage-fee guarantees or dispatch-time guarantees | none (FAQ #5 explicitly says "depends on lane") |
| Invented testimonials or client names | none |
| External animation libraries (Motion / GSAP / Lottie) | none — inline `useInViewFade` with IntersectionObserver |
| React.lazy on /dealers | none — static import |
| prefers-reduced-motion guard | present (`.fadeSection` media query + hook-level check) |
| Lint | 0 errors, 0 warnings |
| Vite build | green |

---

## Visual system

- **Hero**: radial gradient background, center-aligned display serif with kicker + trust bar + inline CTA
- **Problem section**: dark (`#1f1f1d → #2c2c2a`) for visual rhythm break; three cards, the Y7 card uses the accent gradient
- **Shared rhythm**: alternating `.section` / `.sectionMuted` / `.sectionGradient` backgrounds so scroll feels layered
- **Typography**: display serif `clamp(2rem, 5.5vw, 3.6rem)` H1, serif H2 `clamp(1.55rem, 3vw, 2.1rem)`, sans-serif body 15px
- **Animation**: `useInViewFade` on every section. Fade 24px up + opacity 0→1 over 600ms. Triggered at 12% intersection threshold. Auto-disabled when `prefers-reduced-motion: reduce` is set.
- **Grids**: 4-col desktop → 2-col tablet → 1-col mobile throughout. Comparison table gets `overflow-x: auto` fallback.
- **Interaction**: `.capCard` and `.auctionCard` lift on hover (`translateY(-3px) + border-accent + shadow`). Accordion FAQ chevron rotates 180° on `[open]`.

---

## Post-deploy checklist

1. **Cloudflare purge** `/dealers`, `/ua/dealers`, `/pl/dealers`, `/ru/dealers`.
2. **GSC Request Indexing** for all 4 locale URLs — new content and new schema need recrawl.
3. **Schema validation** — paste `/dealers` into Google Rich Results Test; confirm Service + FAQPage parse. (The Service object includes `serviceType=Outsourced Dispatch Department` and 2-offer catalog.)
4. **Visual smoke test on deploy**:
   - Hero gradient renders correctly
   - Fade-in animations trigger on scroll (and disable in reduced-motion)
   - Capability cards lift on hover
   - Payment cards render 2-column on desktop, stack on mobile
   - Comparison table scrolls horizontally on narrow viewports
   - FAQ items expand/collapse cleanly
5. **Mobile test at 375px** — confirm timeline stacks vertically, all grids collapse to 1-column, CTA strip readable.
6. **Dealer lead-quality check** over 2 weeks — new positioning should self-qualify: fewer low-volume inquiries, more "exploring alternatives to internal dispatcher" conversations.

---

## Expected outcome

- **SEO**: the "outsourced dispatch" positioning captures high-intent long-tail queries competitors ignore.
- **Lead quality**: dealers comparing Y7 to internal-hire option arrive primed for the flat-fee conversation. No need to re-educate on pricing model.
- **Compliance**: the page no longer carries volume-tier language that contradicts the flat-fee business reality.
- **Trust**: the "When Things Fail" section (honest recovery playbook) plus the 3-column comparison make Y7 differentiation explicit, not implied.
