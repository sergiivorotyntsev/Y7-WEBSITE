# Y7-WEBSITE — Selling-Pages Consistency Audit (Phase 0)

**Date:** 2026-06-26
**Scope:** `/` (premium baseline), `/services`, `/dealers`, `/dealer-quote`, `/exporters`, `/ship-my-car`, `/contact`, `/track` (secondary).
**Method:** Read-only code inventory of each page component + CSS module, measured against the Home premium baseline (`Home.module.css` + the shared `premium.module.css` / `interactions.module.css` system) and against `DESIGN.md` / `PRODUCT.md`. One agent per page, full-file reads. No live files were edited.

> **Tooling note.** The **Playwright MCP is not connected** in this session, so the visual-capture step (0.3) was not run live. **Puppeteer `^24.40.0` is already a project dependency** (it powers `scripts/prerender.mjs`), so screenshots can be captured with zero new dependencies via a throwaway capture script. See [Visual capture status](#visual-capture-status). **Refero MCP is not connected** either; reference anchors below are drawn from documented craft (the named products are illustrative, not pulled live).

---

## TL;DR — the root finding, confirmed in code

The premium work that elevated Home lives almost entirely in **two shared modules the other pages never import**:

- `src/styles/premium.module.css` — `.card`, `.lift` (-4px + `--success` border), `.gradientBorder`, `.spotlight` dark band, `.kicker/.heading/.mono`.
- `src/styles/interactions.module.css` — `.liftCard` (-3px + accent border), `.subtleLift`, `.underlineGrow/.underlineCenter`, `.focusRing` (the `:focus-visible` double ring), `.fadeIn/.staggerChild` entrance reveals.

**Every in-scope page except Home imports neither.** Each one re-implements cards, lifts, focus, and reveals locally and partially. That single fact explains ~80% of the consistency gap: the system exists, it is just not wired to the pages.

Three findings repeat on all seven pages:

1. **No shared primitives** → divergent, partial re-implementations of the same things.
2. **Sienna kickers, not green** → every page leads sections with `--accent`, where Home leads non-hero sections with `--success` green. This also pushes accent **over the One Seal Rule (≤10%) budget** on most pages.
3. **No section rhythm** → no alternating `paper / sectionMuted / sectionDark` bands, no dark `.spotlight` moment, and container widths drift (1100 / 960 / 900 / 760 / 720 instead of Home's 1200 / 720).

No page is a disaster; every page graded **Partial**. None is a rewrite. This is a wiring-and-tokenizing sprint, exactly as scoped.

---

## ⚠️ One decision blocks clean execution: the kicker canon

There is a genuine contradiction between the two sources of truth, and it must be resolved before Phase 2:

- **`DESIGN.md` — the "Kicker–Headline Pair Rule"** (§3): *"the kicker is always uppercase 11px... **sienna fill**, optionally prefixed with `◆`."* Every non-Home page follows this literally.
- **Home (the new premium baseline)** deliberately broke it: `Home.module.css:297` — `.sectionMicro { color: var(--success) }` with the comment *"PHASE5B-HOME (Variant 2): green leads non-hero kickers."* Hero kicker stays sienna; everything below goes green.

The likely intent: leading **every** section kicker in sienna blows the One Seal Rule on a long page, so Home moved non-hero kickers to green and reserved sienna for the hero kicker + primary CTA + focus glow. That is a defensible, on-brand evolution, but **`DESIGN.md` was never updated to match.**

**This is a Sergii decision, not mine to assume.** Both are reasonable:

- **Option G (green non-hero kickers, sienna hero only):** matches Home, protects the One Seal budget on long pages, becomes the new canon → then update `DESIGN.md`'s Kicker rule.
- **Option S (sienna kickers throughout, per `DESIGN.md`):** keep Home's hero sienna, revert Home's green non-hero kickers back to sienna, and instead protect the One Seal budget by cutting accent elsewhere (tags, borders, numerics).

I recommend **Option G** (it is what the premium baseline already ships, and it reads more like a trade publication's two-color editorial system), but I am holding for your call. The fix lists below are written to be correct either way; only the kicker hue flips.

---

## 1. Per-page findings

Legend: **OK** = at/near Home parity · **Partial** = present but divergent/incomplete · **Missing** = absent.

### `/` Home — PREMIUM BASELINE (reference, not graded)
Consumes `premium.module.css` + `interactions.module.css`. Alternating section bands, dark `.spotlight` bookends, route-SVG hero motif + rotating seal, green non-hero kickers, gradient hero CTA with -2px lift + `:focus-visible`, reduced-motion guards throughout, `--shadow-card*` tokens, JetBrains Mono labels. This is the bar.

### `/services` — grade: **Partial**
- **Shared imports:** only `buttons.module.css`. Re-implements cards/hover/focus/reveal locally.
- **Tokens:** raw `rgba(153,60,29,*)` glow/shadow (`Services.module.css:29,124`), `rgba(247,245,240,.7)` (`:65`); off-scale `14.5px` (`:139`) plus fixed-px headings (18/15/14/13/12/11) with no `clamp`.
- **Type:** Georgia on most headings ✓ but `.linkTitle` is **sans** (`:293`) while `.cardTitle` is serif — split heading families. Section titles `clamp(1.35,2.5vw,1.75rem)` (`:78`), **smaller** than Home's `clamp(1.5,3vw,2.25rem)`. **No mono.**
- **Rhythm:** no `.section` bands; single paper field with `margin-top` separation (`:178`). Container 1100px, no 720 narrow variant. Dead `.ctaWrap` rule (`:317`).
- **States:** `:focus-visible` present on `.linkCard` + CTA (via `btn`) ✓ — better than peers.
- **A11y / Seal:** kickers are **accent**, applied inconsistently (◆ on some, not others). Closing CTA is an accent-gradient strip, not a dark spotlight.
- **Imagery:** **none** (only a radial glow). No SVG/seal texture.
- **Mobile:** clamp on padding ✓; headings fixed px (no fluid scale).

### `/dealers` — grade: **Partial** (structurally closest, token-dirtiest)
- **Shared imports:** only `buttons.module.css` (`btnAccent`, `btn`). Re-implements the rest.
- **Strength:** **does alternate backgrounds** (paper / muted / dark "problem" band / gradient) — the best rhythm of any non-Home page. Good mono discipline on numerics (`.capNum/.caseNum/.timelineDay`). Fluid `clamp()` headings.
- **Tokens (worst offender):** dark band hardcoded — `#1f1f1d/#2c2c2a` (`:154`), `#F7F5F0` (`:72,155,192`), `#d9d4c8/#c7c2b5/#e9d9ca/#E8A577`. Raw white `#fff` (`:311,768,777,790`). Raw shadows `0 4px 12px rgba(0,0,0,.06)` (`:245,467`) instead of `--shadow-*`. **No `--radius-*` used anywhere** (literal 6/8/10/12/16/24). Off-scale `13.5px` (×6), `14.5px`, `0.98rem`.
- **States / A11y:** **`:focus-visible` missing** on `.midCtaButton` (`:735`), `.auctionCard` (`<Link>`), `.faqSummary` (`:696`). Comparison `<th>` lack `scope`/`<caption>`.
- **Seal:** accent on kicker + capNum + caseNum + timelineDay + auctionCoverage + payTag + faqChevron + failCard border + full CTA strip → **well over ≤10%.** No green kickers.
- **Rhythm:** section padding `9vh/96px` (vs Home `8vh/100px`); container 1100px.
- **Mobile:** strong clamp + table `overflow-x` ✓; `.crosslink` tap target ~30px (`:832`).

### `/dealer-quote` — grade: **Partial** (conversion page; real a11y gaps)
- **Shared imports:** `QuoteForm.module.css` (`qForm`), `buttons.module.css`. Not `interactions`/`premium`. Pulls inline-styled `SmsConsent.jsx`.
- **Forms a11y (highest impact):** **labels not associated** — `<label className={qForm.label}>` with no `htmlFor`, inputs no `id` (`DealerQuote.jsx:182-271`). **Notes textarea has no label at all** (`:328`). Radio/checkbox groups lack `fieldset/legend`. `.errorAlert` has no `role="alert"`. Required is `*`-only (no `aria-required`/`aria-invalid`).
- **States:** inputs use `:focus` (single 3px glow), **not** the site `:focus-visible` double-ring; fires on mouse too. Local radios/checks (`:187-193`) have **no `:focus-visible`**. `qForm.inputError` exists but is never applied (no field-level validation).
- **Error palette split:** page `.errorAlert` = sienna on `#FFF0EC`; embedded `SmsConsent` = pure red `#b91c1c/#fef2f2` — two error languages on one form.
- **Tokens:** prefill banner hardcoded greens `#065F46/#D1FAE5` (`:86-88`) not `--success`; `13.5px`, `8px` dot.
- **Seal:** hero + 4 section kickers sienna → over budget.
- **Mobile:** input font **14px** → iOS zoom-on-focus; radio/check + backLink tap targets <44px.

### `/exporters` — grade: **Partial** (most fragmented heading system; zero imagery)
- **Shared imports:** `buttons.module.css`, `forms.module.css`. Not `interactions`/`premium`.
- **Two parallel heading systems:** tokenized `.sectionHeader/.sectionMicro/.sectionHeading` (docs/destinations/FAQ) **vs** ad-hoc `.howTitle/.portsTitle/.valueTitle/.formTitle` (no kicker, fixed 20/22px) — inconsistent within one page.
- **Invented local tokens:** `--bg-warm-accent:#FFF8F5`, `--bg-error-soft:#FFF0EC`, `--text-on-accent:#fff` (`:4-6`) — off-palette peach used heavily. Border fallback split `#d8d0c3` (`:71`) vs `#e5e0d8`. Off-scale `12.5/13.5/14.5px`.
- **Rhythm:** no `.section` system; blocks stacked in a 900px `.body` while `.wrap`/docs/FAQ are 1100px → **content columns misalign.** A third+fourth page-specific width.
- **States / A11y:** `:focus-visible` **missing** on `.midCtaButton`, `.crosslink`; `.faqSummary` sets `outline:none` with **no replacement** (`:586`). `.portLink` is the one correct focus case (`:378`). Form `.errorAlert` no `role="alert"`; required `*`-only.
- **Imagery (biggest miss):** **zero** — no port photos, flags, route lines, or port-pills on the international page. `.feeBadge` `white-space:nowrap` (`:276`) risks horizontal overflow with long PL/RU/UA strings.
- **Seal:** kickers accent, half the sections have no kicker at all.

### `/ship-my-car` — grade: **Partial** (most self-contained; imports nothing shared)
- **Shared imports:** **NONE** — only its own module (`ShipMyCar.jsx:10`). Every primitive hand-rolled. The single biggest structural delta.
- **Type:** **five different H2 ramps** for one role (`.sectionHeading/.pricingTitle/.quoteTitle/.faqTitle/.finalCtaTitle`, `:185/441/277/323/521`). **No mono** (pricing table/transit times in sans/serif). Fragmented body px (14.5/14/13.5/13).
- **Tokens:** hardcoded `#5F2412` (`:503`, undocumented), `#FFF8F5` (`:221`), rgba shadows, off-scale px, `1.5px` border.
- **States / A11y:** **no `:focus-visible`** on `.heroCta`, `.finalCtaButton`, `.crosslink` (keyboard focus invisible on the primary CTAs). Step-number hover lifts **-4px** (`:154`) — exceeds the -3px cap on an interactive element.
- **Rhythm:** no alternating bands, **no dark band at all**; ad-hoc padding; widths 960/900/720.
- **Mobile:** clamp ✓; `.crosslink` sub-44; pricing table scrolls with no sticky route column.

### `/contact` — grade: **Partial**
- **Shared imports:** `buttons.module.css`, `forms.module.css`. Not `interactions`/`premium`.
- **Forms a11y:** **labels not associated** (`:139-172` no `htmlFor`/`id`); no `aria-invalid`/`aria-describedby`; `.errorAlert` no `role="alert"`; required not marked.
- **Error palette (three reds):** banner `#FFF0EC`/accent, `forms.module.css` `#c0392b`, `PhoneInput.jsx` `#d32f2f` — three different reds in one form. `PhoneInput` is inline-styled and gets **no focus ring** (sibling inputs do, via `forms.input`).
- **Strength:** `forms.input` bumps to **16px on mobile** ✓ (iOS zoom handled); `.infoCard` has a correct `:focus-visible` ring.
- **Tokens:** raw `rgba(153,60,29,.16/.08)` (`:105,120`), `rgba(15,110,86,.2)` (`:271`), `#FFF0EC` (`:251`); `14.5/11.5px`. Submit fights `btnAccent` with three `!important` overrides (`:256-261`).
- **Rhythm / Seal:** single flat slab, no bands; accent kicker.

### `/track` — grade: **Partial** (secondary; nicest input ring, real a11y gaps)
- **Shared imports:** only `buttons.module.css`.
- **Strengths:** `.form:focus-within` accent ring is genuinely premium (`:72`); mono on `.searchInput`/`.vin` ✓; status timeline uses **correct system-state color** (green=done, accent="you are here", hollow=future); `.helpLink`/`.fallbackCard` have `:focus-visible` ✓.
- **A11y gaps:** **no live region** on async results/error (no `aria-live`/`role="status"`/`role="alert"`); tracking input has **no `<label>`** (placeholder-as-label, `Track.jsx:66`); no `aria-current` on the current timeline step; loading shows `'...'` (not exposed to AT).
- **Contrast:** `#999` idle/placeholder text (`:92,255`) ≈ 2.8:1 — **fails AA.** Off-palette (real muted is `#706E68`).
- **Tokens:** hardcoded hover shadow (`:400`) not `--shadow-card-hover`; raw accent tints.
- **Rhythm:** no bands; four container widths (720/640/760/900); `.fallbackSection` (900) is **wider than `.wrap`** (720) → tablet misalignment. `.errorBtn`/`.helpLink` tap targets <44px.

---

## 2. Consistency-gap matrix

Columns: **Dark-body match** (does the body carry the premium dark-spotlight depth the header implies?) · **Section rhythm** (alternating bands + standard widths) · **Type scale** (single fluid scale, right families) · **State coverage** (`:focus-visible` + hover/active everywhere) · **Token purity** (no hardcoded hex/rgba; uses `--shadow/--radius/--accent-glow`) · **Mobile**.

| Page | Dark-body match | Section rhythm | Type scale | State coverage | Token purity | Mobile |
|---|---|---|---|---|---|---|
| `/` Home (baseline) | OK | OK | OK | OK | OK | OK |
| `/services` | Missing | Missing | Partial | Partial | Partial | Partial |
| `/dealers` | Partial | Partial | Partial | Missing | **Missing** | Partial |
| `/dealer-quote` | Missing | Partial | Partial | **Missing** | Partial | Missing |
| `/exporters` | Missing | Missing | Missing | Missing | **Missing** | Partial |
| `/ship-my-car` | Missing | Missing | **Missing** | **Missing** | Missing | Partial |
| `/contact` | Missing | Missing | Partial | Partial | Partial | OK |
| `/track` | Missing | Missing | Partial | Partial | Partial | Partial |

**Reading the matrix:** *State coverage* and *Dark-body match* are the most uniformly broken columns — both flow directly from not importing the shared modules. *Token purity* is worst on `/dealers` and `/exporters` (hardcoded dark band; invented peach vars). *Type scale* is worst on `/ship-my-car` (five forked H2 ramps).

---

## 3. Prioritized fix list

### A. Shared-system fixes (do once, every page benefits) — highest leverage

1. **Wire pages to `premium.module.css` + `interactions.module.css`.** Replace local card/lift/focus/reveal re-implementations with `.card`/`.lift`/`.liftCard`/`.focusRing`/`.fadeIn`/`.staggerChild`. This is the single highest-impact change and removes most divergence at the source. *(Per-page, but the same mechanical move everywhere.)*
2. **Resolve + apply the kicker canon** (Option G or S — see decision section). Whichever wins, apply one kicker color rule across all pages and update `DESIGN.md`.
3. **Standardize the section system.** Promote Home's `.section/.sectionMuted/.sectionDark/.sectionInner(1200)/.sectionInnerNarrow(720)` into a shared module (or `layout.module.css`) and adopt it so every page gets alternating bands + one dark `.spotlight` moment + consistent widths. Retire the 1100/960/900/760/640 drift.
4. **One focus standard.** `:focus-visible` double-ring (`.focusRing`) on every interactive element. Specifically fixes: `midCtaButton` & `crosslink` (Dealers/Exporters/ShipMyCar), `auctionCard`/`faqSummary` (Dealers/Exporters), `heroCta`/`finalCtaButton` (ShipMyCar), `PhoneInput` (Contact), local radios/checks (DealerQuote). Convert form inputs from `:focus` to `:focus-visible` where they currently fire on mouse.
5. **Tokenize.** Replace raw `rgba(153,60,29,*)` → `--accent-glow`; raw shadows → `--shadow-card/--shadow-card-hover`; hardcoded dark band → `--spotlight-bg`; literal radii → `--radius-*`. Retire invented locals (`#FFF8F5`, `#FFF0EC`, `#5F2412`, `#999`, `#d8d0c3`).
6. **One type scale.** Collapse forked H2 ramps onto the DESIGN.md Headline ramp (`clamp(1.35rem,2.5vw,1.75rem)`) or Home's `.sectionTitle` (`clamp(1.5rem,3vw,2.25rem)`) — pick one and reuse. Kill off-scale `14.5/13.5/12.5px`. Restore JetBrains Mono for stats/figures on Services/ShipMyCar (pricing tables, transit times).
7. **One form-error language.** Single Cite-Red token (`#C0392B`) for borders + message; kill the `#d32f2f`/`#b91c1c`/`#c0392b` split. Add `role="alert"`/`aria-live` to every `.errorAlert`. Wire field-level `inputError` + `aria-invalid` (DealerQuote, Contact).
8. **One Seal Rule pass.** After the kicker decision, audit accent coverage per page and pull it back under ≤10% (esp. Dealers: cap nums, tags, borders, chevrons).

### B. Per-page fixes (top items)

- **Services:** adopt premium/interactions; make `.linkTitle` serif; raise section-title scale; add one dark spotlight CTA + alternating bands; delete dead `.ctaWrap`; add SVG/mono texture.
- **Dealers:** tokenize the dark "problem" band + radii/shadows; add `:focus-visible` to midCta/auctionCard/faqSummary; recolor kickers + cut accent; `<th scope>`/`<caption>`; widen `.crosslink` tap target to ≥44px.
- **Dealer-quote:** `htmlFor`/`id` on every field + label the Notes textarea; `fieldset/legend` on radio/check groups; `role="alert"`; field-level validation; unify SmsConsent error to the sienna system; inputs → 16px (`qForm.inputLg`); tap targets ≥44px.
- **Exporters:** retire the second heading system (`.howTitle` etc.) onto `.sectionHeader`; remove invented peach vars; fix `.feeBadge` nowrap overflow + i18n wrap; `:focus-visible` on midCta/crosslink/faqSummary; **add port/route/flag imagery** (biggest visual lift); fix 900-vs-1100 column misalignment.
- **Ship-my-car:** import shared modules; collapse five H2 ramps to one; `:focus-visible` on all three CTAs; reduce step hover to -3px; add a dark band; restore mono pricing table; tokenize `#5F2412`/rgba shadows.
- **Contact:** `htmlFor`/`id` + `aria-*` on fields; `role="alert"` banner; give `PhoneInput` a real focus ring + unify the three reds; alternating bands + kicker per canon; replace `!important` submit overrides with `btnLg`.
- **Track:** `aria-live` results + `role="alert"` error + real input `<label>` + `aria-current` on current step; replace `#999` with `--text-muted`; tokenize hover shadow; unify container widths; raise `.errorBtn`/`.helpLink` tap targets.

---

## 4. The three design directions (refined)

Important context discovered in code: **Home already implements Direction A.** `premium.module.css:5` reads *"Light-base elevation per the approved 'A' direction."* So A is not hypothetical — it is the shipped spine. The practical question this audit answers is therefore *"how far do we carry A across the funnel, and where do B and C earn an accent layer?"* The composite the brief anticipates (**A spine + B on forms + C in hero/track**) is, in my read, the strongest answer. The three directions below are written so they can be combined.

### Direction A — Refined Editorial *(evolution · lowest risk · already the Home spine)*
- **Design DNA:** "The Trade Bulletin" at magazine grade. Considered type scale, generous vertical rhythm, alternating `paper / margin-sand / pressroom-ink` bands, thin editorial dividers, sienna strictly as a seal, JetBrains Mono tabular figures in every stat. Hierarchy from scale + weight, never decoration.
- **Token moves:** standardize the `.section` band system + 1200/720 widths; `--shadow-card*` at-rest; green non-hero kickers (Option G) or sienna throughout (Option S); mono on all numerics; one Headline ramp.
- **Pages it helps most:** the trust/long-form pages — `/services`, `/dealers`, `/exporters`, `/ship-my-car`. Directly protects the SEO/AI-citation ranking (augment-only, no content touched).
- **Conversion rationale:** credibility-by-substance. The audience (shippers, dealers, exporters) is buying operational trust; editorial restraint signals "we document credibility, we don't perform it" (PRODUCT.md Principle 3).
- **Reference anchors:** Bloomberg / Stripe Press / The Economist editorial systems; FT-style serif-headline + sans-body + mono-figures trade-press identities.

### Direction B — Modern Operational *(structural rigor · for conversion surfaces)*
- **Design DNA:** the warm palette as an accent layer over B2B-SaaS-grade cleanliness. One card-elevation system from tokens, strict 8pt grid, serif reserved for hero moments only, clean sans hierarchy elsewhere, single-weight inline-SVG icons, and `:focus-visible`/hover/active on *every* control.
- **Token moves:** `--shadow-card/--shadow-card-hover` as the one elevation ladder; `.focusRing` everywhere; field-level validation states from `--success`/Cite-Red tokens; 16px mobile inputs; one error language.
- **Pages it helps most:** the forms + B2B funnel — `/dealer-quote`, `/contact`, the `/dealers` quote entry. These pages' audits surfaced the real defects (label association, focus, validation, error-color split); B is the discipline that closes them.
- **Conversion rationale:** form completion is the conversion event; operational credibility on a quote form is "does this feel like a real broker's back office." Stripe/Mercury-grade form hygiene converts.
- **Reference anchors:** Stripe / Mercury / Linear form + onboarding systems; fintech pricing/KYC flows.

### Direction C — Logistics-Forward *(character + motion · accent layer only)*
- **Design DNA:** route lines (origin → destination) as a recurring graphic motif, port-pills, restrained status indicators, and **real numbers as visual anchors** (877+ carriers, USDOT #4427359, port partners) in mono. Optional deeper hero palette under the existing dark header; restrained route/tracking animation (reduced-motion guarded), echoing Home's existing animated route SVG.
- **Token moves:** reuse Home's `routeTrack/routeDot/routeCar` SVG vocabulary as a shared motif; `--spotlight-bg` hero band; mono stat anchors; status-only color (green/Cite-Red) for the Track timeline.
- **Pages it helps most:** hero/`/` and `/track` (and the `/exporters` ports section, which today has **zero imagery** — the single biggest visual gap in the audit).
- **Conversion rationale:** specificity is the moat (PRODUCT.md Principle 2). Route motifs + real port/carrier numbers *show* the specialization instead of claiming it.
- **Reference anchors:** Flexport / project44 / maritime-tracking dashboards; data-forward fleet/logistics products. **Guardrail:** stay editorial — no neon, no glassmorphism, no urgency theater; motion is a quiet seal, not a light show.

**Recommended composite:** **A as the spine on all selling pages**, **B's form/state discipline on `/dealer-quote` + `/contact` + the Dealers quote block**, **C's route/port/number motifs as a thin accent layer on `/` hero, `/track`, and the `/exporters` ports section.** This maximizes parity and conversion while keeping one coherent brand spine (PRODUCT.md Principle 4: "three audience tracks, one brand spine").

---

## Visual capture status

Playwright MCP is not connected, so step 0.3 was not run live. Two ways to complete it, both zero-new-dependency (Puppeteer `^24.40.0` is already installed):

- **Option 1 (recommended):** I write a throwaway capture script using the existing Puppeteer, run `npm run build` + `npm run preview` (port 3000), and screenshot all 8 pages at 1440w + 390w into `design-audit/screenshots/`. I will revert any `public/sitemap.xml` prerender churn before stopping. Say the word and I will run it now.
- **Option 2:** connect the Playwright MCP (`npx @playwright/mcp`) and I will use it as the brief specifies.

No screenshots are committed yet; nothing has been built or pushed.

---

## Constraints honored this phase
- **Read-only.** No live file edited. `git status` clean apart from this new `design-audit/` report and pre-existing untracked `docs/`.
- No dependencies added; `package-lock.json` untouched.
- No commits, no push. Pre-flight showed a clean tree and **no held/unpushed commits** (`git log origin/main..main` empty).

## >>> HARD STOP <<<
Awaiting your read. Specifically I need: **(1)** the kicker-canon decision (Option G green vs Option S sienna), **(2)** whether to capture screenshots now via Puppeteer (Option 1 above), and **(3)** go/no-go on Phase 1 (render `/design-lab/{a,b,c}` isolated previews of the composite). I will not proceed to Phase 1 until you say so.
