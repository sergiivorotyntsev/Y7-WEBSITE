# Y7-WEBSITE — Design-Audit Sprint DEPLOY CHECKLIST

Held commit stack: `git log origin/main..main` (**T04–T11**, 8 commits). **Nothing pushed.** Review
the raw diff before pushing. This sprint changed only visual styling + form a11y/validation. The
Phase 1 design-direction previews (`/design-lab/*`) were used locally and **squashed out of the
final history**, so they are not in the deployed diff. No backend, no email pipeline, no DaytonaCargo.

---

## 1. What changed, per page (classes touched + content/DOM confirmation)

"Zero copy change" = no text, headings, heading levels, link targets, or content order were
altered on any page. Where JSX changed, the additions are **presentational / a11y / validation
elements only** (attributes, error `<span>`s, an `aria-live` wrapper, the C route/anchors DOM).

| Commit | Page / file | Nature | Copy / heading / order | DOM added |
|---|---|---|---|---|
| **T04** | `services` (`Services.module.css`) + `DESIGN.md` | CSS-only | none | none |
| **T05** | `exporters` (`Exporters.{jsx,module.css}`) | CSS + JSX | none | **C motif** (route-rail SVG, dark number-anchors band, port-pill pin/code, dest country-badge + route) + **B** per-field error `<span>`s/`aria-invalid`/`role=alert`. Ports/destinations text unchanged. |
| **T06** | `dealers` (`Dealers.module.css`) | CSS-only | none | none |
| **T07** | `ship-my-car` (`ShipMyCar.module.css`) | CSS-only | none | none |
| **T08** | `contact` (`Contact.{jsx,module.css}`) | CSS + JSX | none | `htmlFor`/`id` attrs, per-field error `<span>`s, `aria-invalid`, `role=alert` |
| **T09** | `track` (`Track.{jsx,module.css}`) | CSS + JSX | none | `aria-label`, an `aria-live="polite"` wrapper `<div>`, `role=alert`, `aria-current`, `aria-busy` |
| **T10** | `dealer-quote` (`DealerQuote.{jsx,module.css}`) | CSS + JSX | none | `htmlFor`/`id` attrs, per-field error `<span>`s, `aria-invalid`, `aria-label` on notes, `role=alert` |
| **T11** | `dealer-quote` (`DealerQuote.module.css`) | CSS-only | none | none (scoped `:disabled` locked style) |

**Cross-cutting visual moves (every selling page):** non-hero section kickers → Bonded Pine
green (sienna reserved for hero kickers); one Headline ramp matched to Home; `--shadow-card`
elevation; `:focus-visible` standard; dark spotlight CTAs replacing solid-sienna slabs; every
banned `border-left` side-stripe removed; container widths unified. `DESIGN.md` updated to the
Option-G kicker canon (T04).

**Shared-component touches (flagged — affect more than one page):**
- `PhoneInput.jsx` (T08): error red `#d32f2f` → Cite-Red `#C0392B`; removed a pre-existing
  unused var. Consumers: contact, exporters, dealer-quote forms. Strict unification, no regression.
- `SmsConsent.jsx` (T10): error block `#b91c1c/#fef2f2` → Cite-Red `#C0392B`; off-brand text
  fallback `#1f2937` → `--text`. See §3.

**Token source:** no edits to `variables.css` / `theme.js`. The documented Cite-Red status hex
`#C0392B` is used directly (it is not yet a CSS var; consider tokenizing as `--cite-red` later).

---

## 2. Pre-push gate (already verified locally)
- [x] `npm run build` → **Prerender complete: 117 OK, 0 failed**.
- [x] `git diff origin/main..main -- package-lock.json` → **empty** (no deps added).
- [x] No shared **CSS module** edited (`buttons/cards/forms/interactions/premium/layout/variables/theme` untouched).
- [x] No `React.lazy` added. (Design-lab previews were squashed out; not in the final history.)
- [x] `public/sitemap.xml` reverted to origin (no date churn in the held stack).
- [x] No hardcoded brand hex introduced beyond the documented Cite-Red status color.
- [x] eslint clean on every touched `.jsx`.

---

## 3. SmsConsent shared-touch — consumer audit (grep: 3 consumers)
`grep SmsConsent` →
1. **`components/QuoteForm.jsx`** (the reusable quote form — Home quote section, `/quote`, etc.):
   renders `<SmsConsent showError={false} optional />`. **The error block never renders here**
   (showError hardcoded false). Only the consent checkbox + label show → the Cite-Red change is
   inert; the label-text fix (`#1f2937` → `--text`) applies, on-brand, no regression.
2. **`pages/DealerQuote.jsx`**: `<SmsConsent showError={submitAttempted} />` (required). **This is
   the only consumer that renders the error block** — verified visually rendering Cite-Red.
3. **`pages/portal/components/LoginCard.jsx`** (portal registration, out of selling-page scope):
   `<SmsConsent />` with no `showError` (defaults false) → error block never renders. Label-text
   fix applies; no regression. (`portal/Onboarding.jsx` uses its own raw checkbox, not the component.)

**Conclusion:** the unified Cite-Red error visibly renders on **dealer-quote only**; the other two
consumers never show that block, so there is no risk of a mis-styled red elsewhere. The label-text
color fix is a benign improvement across all three.

> **Post-push spot-check (optional, belt-and-suspenders):** on prod, open `/dealer-quote`, click
> "REQUEST DEALER PARTNERSHIP" without checking SMS consent → the consent error must render in
> Cite-Red (`#C0392B`), matching the field/banner errors.

### PhoneInput shared-touch — consumer audit
`grep "import PhoneInput | <PhoneInput"` → **11 files total**. The **4 marketing / selling-page
consumers** in this sprint's scope: **`QuoteForm.jsx`** (Home / `/quote`), **`Contact.jsx`**,
**`DealerQuote.jsx`**, **`Exporters.jsx`**. The Home QuoteForm uses **no hardcoded reds** — its
own field/alert errors render via CSS classes (`errorText` / `errorAlert` / `inputError`), and
PhoneInput renders its **own Cite-Red inline**, so there is **no two-reds-in-one-place conflict**.
Cite-Red unification confirmed **non-conflicting** on these forms.

The other **7 consumers are out of selling-page scope** — portal (`LoginCard`, `Onboarding`,
`NewOrder`, `Locations`, `LocationSetup`, `DispatchDetails`) + `ChatWidget/LeadForm`. They share
the same PhoneInput, so they also pick up the `#d32f2f → #C0392B` change: a benign unification to
the documented error color — no regression, no copy/behavior change. (Listed for full blast-radius
visibility; not styled or otherwise modified this sprint.)

---

## 4. Post-push production verification (after Sergii pushes)
Hard-refresh in an incognito window (bypass cache) for each. Confirm desktop (≈1440w) + mobile (≈390w):

- [ ] `/` Home — unchanged (not in scope; confirm no regression from shared PhoneInput/SmsConsent).
- [ ] `/services` — green section kickers; dark spotlight closing CTA; card elevation.
- [ ] `/dealers` — green kickers; dark "problem" band + dark spotlight CTA; green positive card.
- [ ] `/dealer-quote` — green section titles; locked (neutral-muted) submit until SMS consent, then full sienna; field errors after invalid submit; 16px inputs on mobile (no zoom).
- [ ] `/exporters` — route rail + dark number-anchors band; mono port-pills (NWK/HOU/SAV/BAL/LAX/JAX); mono country badges; B form errors.
- [ ] `/ship-my-car` — one heading ramp; green kickers; dark spotlight final CTA; mono pricing.
- [ ] `/contact` — green? (no: header is the sienna hero kicker) elevated cards; form validation; one Cite-Red.
- [ ] `/track` — sienna header kicker; elevated fallback cards; SR live region announces results.
- [ ] **A few locale variants** (`/pl/dealers`, `/ru/exporters`, `/ua/ship-my-car`) — kicker/CTA/spacing parity; no overflow on longer strings.
- [ ] `/design-lab/a|b|c` → **404** (previews were never deployed; expected).
- [ ] Prerender count on the deploy log is **≥ 117 OK, 0 failed** (not below baseline).
- [ ] Forms still **submit** end-to-end (contact, exporter rate request, dealer-quote) — the API
      calls/payloads were not touched, but confirm one real submission per form reaches the inbox.

---

## 5. Out-of-scope confirmation (this is the website repo)
- **Email pipeline:** untouched. No `apiPost`/`apiGet` endpoints, payload shapes, or
  `/api/public/*` calls were modified — only client-side validation gating + presentational error
  rendering changed. (Field-level validation mirrors the existing submit-time validation; it does
  not change what is sent.)
- **DaytonaCargo:** untouched. `pages/daytonacargo/*` and its bare route were not modified.
- **Portal / legal pages:** out of scope; not styled this sprint. The only portal-adjacent change
  is the shared `SmsConsent` label-text color (benign) — its error block does not render in portal.

---

## 6. Rollback
Every change is isolated to per-page CSS modules + scoped JSX + two shared components
(`PhoneInput`, `SmsConsent`). To revert any single page, revert its `[DESIGN-AUDIT-TNN]` commit;
they are independent except T11 (depends on T10) and the T04 `DESIGN.md` canon (documentation).

---

## 7. Backlog (do NOT fix this sprint — next pass)
- **Exporters list keys:** `portList` / `destItems` render with `key={i}` (index). Switch to a
  stable key (`port.name` / `item.country`) on the next Exporters pass. Non-blocking; lists are
  static in render order, so no current bug.
- **QuoteForm error red:** `QuoteForm.module.css .errorText` hex vs Cite-Red `#C0392B` — verify and
  unify if it differs, on the next pass. Cosmetic only, not blocking, and it never co-renders with
  PhoneInput's inline red (see §3), so no conflict today.
