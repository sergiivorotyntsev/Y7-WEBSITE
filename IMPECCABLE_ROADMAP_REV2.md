# Y7-WEBSITE Impeccable Roadmap (REV 2)

**Source:** `IMPECCABLE_FULL_AUDIT.md` (2026-04-30, 6 pages: Home, Dealers, Exporters, Services, Ship My Car, Auction)
**Goal:** Prioritized fix sprint plan addressing all P0-P3 findings across the site.
**Approach:** Cross-site mechanical fixes first (low-effort, high-leverage), then per-page AUGMENTATION work (visual variety, presentation refinement, NOT content cuts).

**Revision 2 (2026-05-01):** Major update — SEO ranking preservation principle now central. Y7 site already ranks well in search engines and AI chatbot citations. Phase B sprints redefined from "restructure/cut/merge" to "augment/diversify/refine" while preserving content depth and heading structure that earned current rankings.

---

## CRITICAL CONSTRAINT — Augment, Don't Rewrite (NEW in REV 2)

**The y7agency.com site already ranks well in:**
- Google search (specific queries about auto transport, dispatch, port shipping)
- AI chatbot citations (ChatGPT, Perplexity, Claude when answering related queries)
- Inbound backlinks pointing to specific sections/pages

**Ranking pages are operational SEO assets**, not blank canvases. Cutting content from a ranking page risks:

1. Permanent search ranking drops
2. Reset AI citation patterns (chatbots stop mentioning Y7)
3. Broken inbound backlinks pointing to specific anchors
4. Lost keyword coverage and semantic depth

**Phase B sprints in REV 1 were planning content cuts** — restructure /dealers from 16 sections to 4-5, reduce 34 cards on /services, merge Benefits + WhyY7 on Home. **All of these are now FORBIDDEN without explicit ranking-impact review.**

**The correct approach is AUGMENT, NOT REWRITE:**

| Action | Permitted? | Rationale |
|---|---|---|
| Add new section | YES | No removal, possible SEO gain |
| Reorder sections (preserve H1/H2) | YES | Minor risk if structure preserved |
| Visual restyle (colors, spacing, fonts) | YES | No SEO impact |
| Replace card grid with list/timeline | YES, with caution | Preserve H3 + content |
| Vary card grid layouts (3-col → 2-col, etc.) | YES | Visual variety, content same |
| Add iconography, banner breaks | YES | Pure addition |
| Cut content paragraphs | NO | Direct ranking risk |
| Rewrite copy (significant changes) | NO | Keyword density risk |
| Change H1/H2 text | NO | Structure-level ranking signal |
| Change URLs | FORBIDDEN | Catastrophic without 301 redirects |

**Required pre-sprint step for any Phase B work:** ranking audit of the target page (Google Search Console, manual keyword search, AI chatbot citation check). Document which content drives current rankings BEFORE designing the sprint.

---

## Current State Summary

| Page | Critique | Audit | Worst |
|---|---|---|---|
| Home | 24/40 | 14/20 | TrustSection keyboard inaccessible (P0) |
| Dealers | 23/36 | 13/20 | 16 sections, 42 identical cards (P1 visual monotony) |
| Exporters | 25/40 | 13/20 | Form labels unassociated (P0) |
| Services | 23/40 | 12/20 | Hero contrast 2.2:1 (P0), 34 identical cards (P1 visual monotony) |
| Ship My Car | 29/40 | 13/20 | Form labels unassociated (P0) |
| Auction | 27/40 | 11/20 | Zero responsive breakpoints in template (P1) |

**Note (REV 2):** "Visual monotony" is now a presentation problem to be solved through layout variation, NOT a content problem to be solved through cuts.

**Average: ~25/40 critique, ~13/20 audit. "Acceptable" baseline. Significant headroom — but achievable through augmentation, not content reduction.**

---

## P0 Issues (3) — Site-Breaking, Fix Immediately

(Same as REV 1 — accessibility fixes don't conflict with content preservation.)

### P0-1: Form labels not associated with inputs
- **Pages:** Exporters, Ship My Car
- **Standard:** WCAG 2.1 Level A (1.3.1, 4.1.2)
- **Status:** ✅ FIXED in SPRINT-IMP-A1 (commit `6042bca`, 2026-05-01)

### P0-2: TrustSection keyboard inaccessible (Home)
- **Page:** Home
- **Standard:** WCAG 2.1 Level A (2.1.1 Keyboard)
- **Status:** ✅ FIXED in SPRINT-IMP-A1 (commit `6042bca`, 2026-05-01)

### P0-3: Hero micro-label contrast 2.2:1 (Services)
- **Page:** Services
- **Standard:** WCAG 2.1 AA (1.4.3 Contrast)
- **Status:** ✅ FIXED in SPRINT-IMP-A1 (commit `6042bca`, 2026-05-01)

**SPRINT-IMP-A1 (P0-FIX-ALL): COMPLETE.** All 3 P0 issues fixed atomic. Visual verification on prod: pending.

---

## Cross-Site P1 Issues (4) — High Leverage, SEO-safe

These mechanical fixes don't impact content or ranking — pure visual/code refinement:

### P1-A: Em dashes site-wide (mechanical)
- **Pages:** All 6 pages (and likely all 97 prerendered pages)
- **Counts found:** Home 3, Dealers 32, Exporters 9, Services 3, Ship My Car 15, Auction 15
- **Total:** 77+ em dashes documented (likely 200+ across full site)
- **Problem:** Strongest textual AI-generation signal per Impeccable
- **SEO impact:** None (em dashes are not keyword signals; replacing them with periods/commas/colons doesn't affect keyword density)
- **Fix:** PowerShell + per-instance judgment to replace `—` with appropriate punctuation in:
  - All `src/locales/{en,pl,ua,ru}/*.json` files
  - Hardcoded JSX strings (`Services.jsx`, `AuctionCarShipping.jsx`)
  - Page `<title>` tags (Ship My Car has em dash in title)
- **Sprint:** SPRINT-IMP-A2 — next up after A1 verification

### P1-B: Side-stripe borders (`border-left: 3-4px`)
- **Pages:** Home (TrustSection), Dealers (failCard), Exporters (valueCallout, errorAlert), Ship My Car (callout, errorAlert, twicRow, consentWarn)
- **Total:** 8+ instances documented
- **Problem:** Explicit Impeccable ban — textbook AI component-library pattern
- **SEO impact:** None (visual styling only)
- **Fix per instance:** full 1px border, OR background tint, OR leading icon/number
- **Sprint:** SPRINT-IMP-A3

### P1-C: Navigation-via-button anti-pattern
- **Pages:** Home (AudienceCards `role=link`), Dealers (hero, footer CTAs), Services (CTA buttons)
- **Problem:** `<button onClick={navigate}>` or `<div role="link">` instead of `<Link>`. Breaks right-click, middle-click, screen reader announcement. WCAG 4.1.2 violation.
- **SEO impact:** None (semantic HTML improvement)
- **Fix:** Replace with `<Link to="...">`. Mid-page CTAs in DEALERS already demonstrate correct pattern (POLISH-B-DEALERS sprint).
- **Sprint:** SPRINT-IMP-A4

### P1-D: SeoLandingPage template missing responsive breakpoints
- **Pages:** 15+ SEO pages (Auction, Copart, IAA, Manheim, state pages, route pages, port pages)
- **Problem:** `SeoLandingPage.module.css` has ZERO `@media` rules. Desktop padding on phones. Breadcrumb links 2px 4px touch target (far below 44px WCAG)
- **SEO impact:** None — actually improves mobile UX which Google factors into ranking, so could improve SEO
- **Fix:** Add `@media (max-width: 480px)` + `@media (max-width: 768px)` rules. Mobile breadcrumb padding to ≥44px. Mobile container padding adjustment.
- **Sprint:** SPRINT-IMP-A5

---

## Per-Page P1 Issues — REDEFINED FOR REV 2

**REV 1 framing (CONTENT CUTS):** Outdated. All "restructure/merge/reduce" approaches are forbidden on ranking pages without ranking audit.

**REV 2 framing (AUGMENTATION):** All per-page sprints now focus on visual variety, layout diversification, and presentation refinement WITHOUT content removal.

### P1-E: Dealers visual monotony (16 sections, 42 cards) — REDEFINED

**REV 1 plan (DON'T DO):** "Cut to 4-5 strongest sections. Hero + Problem + 'When Things Fail' + 1-2 capabilities. Sticky CTA bar."

**REV 2 plan:** Augment 16-section flow with visual variety:
- Vary card grid layouts: not all 7 sections use same 3-col card pattern
  - Some sections → 2-col asymmetric pairs
  - Some sections → narrative blocks instead of cards
  - Some sections → numbered timeline
  - Some sections → comparison table format
- Add banner-style visual breaks between every 3-4 sections (varies the rhythm)
- Refine iconography per section (different icon set/treatment per category)
- Add sticky mid-page CTA reminder (POLISH-B-DEALERS pattern, already established)
- "When Things Fail" — keep position but apply distinct visual treatment to elevate it
- All 16 sections preserved, all H2/H3 hierarchy preserved, all FAQ schema preserved

**Sprint:** SPRINT-IMP-B3 (DEALERS-AUGMENT)
**Required prerequisite:** Ranking audit. Which keywords currently drive /dealers traffic? Which sections have rich snippets in Google? Document before sprint design.

### P1-F: Services 34 identical link-cards — REDEFINED

**REV 1 plan (DON'T DO):** "Reduce 34 cards. Cut redundant content."

**REV 2 plan:** Augment 34-card display with grouping and variety:
- Group cards into visually-distinct categories (e.g., "By Vehicle Type", "By Auction Network", "By Geography", "By Service Type")
- Hero-feature 3-4 most-trafficked cards at larger size with imagery
- Add category icons distinguishing services types
- Anchor navigation jumps to category sections
- All 34 cards preserved (every URL still accessible from /services)
- Preserve all internal linking — these cards are valuable for SEO link equity distribution

**Sprint:** SPRINT-IMP-B4 (SERVICES-AUGMENT)
**Required prerequisite:** Ranking audit. Which sub-pages get traffic from /services link distribution?

### P1-G: Home Benefits/WhyY7 redundancy — REDEFINED

**REV 1 plan (DON'T DO):** "Merge into single section. Keep strongest 4-5 differentiators."

**REV 2 plan:** Differentiate visual presentation while keeping both sections:
- Benefits section keeps 6-card grid, but with refined iconography (custom illustration, not generic icons)
- WhyY7 section transforms into prose-narrative format (no cards) OR comparison table OR testimonial-anchored claims
- Both sections preserve all content
- Visual contrast between them eliminates "AI templating" perception

**Sprint:** SPRINT-IMP-B1 (HOME-DIFFERENTIATE)
**Required prerequisite:** Ranking audit. Which sections of Home contribute to "auto transport broker" + "FMCSA broker" + brand-name rankings?

### P1-H: Ship My Car 4-step + 5-step process redundancy — REDEFINED

**REV 1 plan (DON'T DO):** "Remove 4-step grid. Keep ProcessTimeline."

**REV 2 plan:** Differentiate purposes of two process visualizations:
- 4-step grid → reframe as "Quick Overview" (high-level summary, glanceable)
- 5-step ProcessTimeline → reframe as "Detailed Process" (operational deep-dive)
- Add explanatory headings making the duality intentional, not redundant
- Both stay on page, both contribute to keyword coverage
- Could become collapsible sections (one default-open, one default-closed) for progressive disclosure

**Sprint:** SPRINT-IMP-B2 (SMC-DIFFERENTIATE)
**Required prerequisite:** Ranking audit. Does /ship-my-car rank for "how to ship a car" or step-related queries?

---

## P2 Issues (Per-Page) — Polish

(Mostly unchanged from REV 1 — these are technical/visual issues independent of content.)

### P2-1: !important overrides on CTAs (all 6 pages)
### P2-3: Form validation inline + per-field errors (Exporters, Ship My Car, Home QuoteFormCompact)
### P2-4: Long page CTAs below the fold (Home, Ship My Car, Auction — Dealers now has POLISH-B-DEALERS mid-CTA)
### P2-5: TrustBar contrast 2.4:1 (Home)
### P2-6: Inline styles on AuctionCarShipping (template page)

(Detailed in REV 1, unchanged.)

---

## P3 Issues (Site-wide) — Optional Polish

(Unchanged from REV 1.)
- IntersectionObserver consolidation (Dealers has 14 separate)
- Skip-to-content technique modernization
- Aria-hidden on Unicode symbols
- Cookie banner focus trap
- Dark mode token support
- TrustSection inline → CSS modules

---

## Recommended Sprint Sequence (REV 2)

**Phase A — Foundation (cross-site mechanical, SEO-safe):**

1. ✅ **SPRINT-IMP-A1: P0-FIX-ALL** — COMPLETE (commit `6042bca`). Form labels + TrustSection a11y + Services contrast.
2. **SPRINT-IMP-A2: EM-DASHES-SITEWIDE** — next. 200+ replacements, mostly mechanical, 1 commit.
3. **SPRINT-IMP-A3: SIDE-STRIPES-REMOVE** — 8 CSS rules across 4 pages.
4. **SPRINT-IMP-A4: NAV-AS-LINKS** — Home/Dealers/Services button → Link.
5. **SPRINT-IMP-A5: SEO-TEMPLATE-RESPONSIVE** — `SeoLandingPage.module.css` breakpoints, fixes 15+ pages.

**After Phase A:** Re-run Impeccable on 6 pages. Expected score lift: +3-5 points each. ~1 week elapsed.

**Phase B — Per-Page Augmentation (visual variety, NO content cuts):**

**MANDATORY PRE-SPRINT STEP:** Ranking audit of target page. Document which content drives current rankings. Sprint plan must preserve that content.

6. **SPRINT-IMP-B1: HOME-DIFFERENTIATE** — Benefits + WhyY7 visually differentiated, both preserved
7. **SPRINT-IMP-B2: SMC-DIFFERENTIATE** — 4-step grid reframed as overview vs ProcessTimeline as detail
8. **SPRINT-IMP-B3: DEALERS-AUGMENT** — vary 16-section visual treatment, all content preserved
9. **SPRINT-IMP-B4: SERVICES-AUGMENT** — group 34 cards by category, all preserved

**Phase C — Polish (low risk, low priority):**

(Same as REV 1.)

10. SPRINT-IMP-C1: STICKY-CTA-COMPONENT
11. SPRINT-IMP-C2: BUTTON-SYSTEM-REFACTOR
12. SPRINT-IMP-C3: FORM-VALIDATION-INLINE

**Phase D — Optional:**

13. SPRINT-IMP-D1: A11Y-MISC
14. SPRINT-IMP-D2: DARK-MODE

---

## Effort Estimates (REV 2)

Phase A unchanged.

Phase B sprints generally **easier than REV 1** (less risky — no content rewriting decisions) but **require additional ranking audit step** that adds ~30-60 min per sprint planning.

| Sprint | Effort | Risk | Pre-sprint requirement |
|---|---|---|---|
| A1: P0-fix-all | ✅ DONE | - | - |
| A2: Em-dashes | M | Low | None |
| A3: Side-stripes | S | Low | Per-instance replacement choice |
| A4: Nav-as-Links | S | Low | None |
| A5: SEO-template | M | Medium | Mobile breakpoint values |
| B1: Home differentiate | M | Low | Ranking audit Home |
| B2: SMC differentiate | S | Low | Ranking audit /ship-my-car |
| B3: Dealers augment | M | Low | Ranking audit /dealers (HIGH IMPORTANCE) |
| B4: Services augment | M | Medium | Ranking audit /services + /services/* sub-pages |
| C1: Sticky CTA | M | Low | Component design |
| C2: Button system | M | Medium | Variant API design |
| C3: Form validation | M | Medium | Validation library choice |
| D1: A11y misc | M | Low | None |
| D2: Dark mode | L | Low | Whether Y7 wants this at all |

---

## Ranking Audit Process (NEW IN REV 2)

Before any Phase B sprint, complete this audit:

**Step 1: Google Search Console** (if available)
- Filter to target page URL
- Top 10 keywords ranking + positions
- Note which pages have rich snippets / featured snippets
- Note which sections (URL anchors) get direct traffic

**Step 2: Manual keyword search**
- Search 5-10 target keywords on Google. Where does Y7 rank?
- Note: "auto transport broker", "dealer dispatch service", "Copart shipping", "ship car from auction", etc. (per-audience)

**Step 3: AI chatbot citation check**
- Query ChatGPT, Perplexity, Claude with related questions
- Note which Y7 pages get cited
- Note specific phrases that AI uses (these are likely high-value)

**Step 4: Document findings**
- Save audit findings as `RANKING_AUDIT_<page>.md` in repo root or downloads
- Sprint design must explicitly preserve identified high-value content
- Sprint commit body should reference the audit

**Step 5: Sprint design**
- Visual changes that don't touch protected content: GO
- Layout reorganization preserving heading hierarchy + content depth: GO
- Content cuts or H1/H2 changes: STOP, escalate decision

---

## What This Roadmap Enables (REV 2)

After Phase A (4 remaining sprints, ~3-5 days work):
- All P0 + cross-site P1 mechanical issues fixed
- Em-dashes eliminated (strongest AI-tell removed)
- Side-stripes removed (Impeccable ban)
- Navigation semantic (Links not buttons)
- 15+ SEO pages responsive (mobile UX improvement, indirect SEO gain)
- Impeccable scores +3-5 points per page

After Phase B (4 sprints, ~2 weeks):
- Visual variety eliminates "AI templating" perception
- Page lengths preserved (rankings preserved)
- Card monotony broken
- Each page Impeccable score targeting 30+/40
- **Critical:** Search rankings AND AI chatbot citations preserved or improved

After Phase A + B: substantial site quality improvement WITHOUT SEO regression risk.

This is a 2-3 week roadmap. Phase A delivers most of value with lowest risk and zero SEO impact.

---

## Critical Reminders for Future Sessions

- **Never cut content** from /dealers, /exporters, /services, /ship-my-car, /auction-car-shipping, or any SEO long-form page without ranking audit
- **Never change H1/H2 text** without ranking impact assessment
- **Never change URLs** without 301 redirect plan
- **Always reference SEO-preservation rule** when designing Phase B sprints
- Visual changes are encouraged; content changes require justification
- "Augment, don't rewrite" is now a brand value (PRODUCT.md Principle 6)
