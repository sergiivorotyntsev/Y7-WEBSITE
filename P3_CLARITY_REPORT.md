# Sprint P3-CLARITY — Report

## Summary

| # | Task | Status |
|---|---|---|
| T01 | Unify digital-first support messaging (home/shipMycar/services × 4 locales) | done |
| T02 | "How Y7 Communicates" section on About | done |
| T03 | 3 new FAQ entries about communication model (4 locales) | done |
| T04 | `/track` explanation block + 3 fallback cards | done |
| T05 | Contact page clarity (policy block + field help) — form unchanged | done |
| T06 | Blog clusters on index + CTA banner on articles | done |
| T07 | Global terminology audit | done (1 edit) |
| T08 | Verify + push + report | this file |

---

## What was preserved (CRITICAL)

All non-negotiables from the sprint prompt were kept intact:

1. **Phone field in Contact form** — `<PhoneInput />` at `Contact.jsx` unchanged. Only microcopy was added next to the label.
2. **Phone field in full `QuoteForm.jsx` on `/quote`** — unchanged.
3. **"Carrier phone number provided after dispatch"** — reframed as "driver contact details appear in your portal after dispatch" / "driver's direct phone number for delivery logistics". Same operational fact, better framing. Still clearly communicated in home copy, About comms section, and two new FAQ entries.
4. **SMS channel** — still listed in every status-update sentence on home page (`whyY7.statusDesc`) and in the About comms section's support list (TCPA-compliant).

---

## Messaging changes

### T01 — Copy rewrites

| File (× 4 locales) | Key | Before → After |
|---|---|---|
| home.json | `benefits.quoteAnywhereDesc` | "No calls needed" → "Y7 support is digital-first — no sales calls, no phone tag" |
| home.json | `benefits.documentationDesc` | "Carrier phone number provided" → "Driver contact details shared via portal for delivery coordination" |
| home.json | `whyY7.statusDesc` | "Carrier phone number provided after dispatch" → "For delivery coordination, driver contact details appear in your portal after dispatch" |
| shipMycar.json | `steps[3].desc` | "Get status updates via text and email" → "status updates via portal, Telegram, text, or email" |
| services.json | `list[3].desc` | "status updates and delivery notifications via text and email" → "status updates via portal, Telegram, text, or email" |

### T07 — Audit edit

| File | Line | Before → After |
|---|---|---|
| `src/pages/seo/OpenCarShipping.jsx` | 174 | "call us" → "flag it to dispatch via the portal or Telegram before loading" |

---

## New sections added

### T02 — About: "How Y7 Communicates"

Two-column explainer placed between Values and Commitments:

- **Column 1, PortalIcon** — Customer Support: Digital-First. Bulleted list: Portal, Telegram, Email, SMS (TCPA-compliant).
- **Column 2, TruckIcon** — Delivery Coordination: Driver Contact. Bulleted list: voice required for ETA/directions/unload; industry standard for FMCSA brokers.
- **Benefits strip** — 4 pills: audit trail, accuracy, multi-load coordination, speed.

Translations in en/ru/pl/ua. CSS: 9 new classes in `About.module.css`, responsive 2-col → stack mobile.

### T03 — FAQ: "Communication & Documents" category

3 new Q&A pairs added to each of 4 `faq.json` files (script is idempotent — safe to re-run):

1. "How do I contact Y7 if I do not use phone calls?"
2. "How does the driver coordinate delivery with me?"
3. "How do I receive documents like the Bill of Lading?"

### T04 — /track enhancements

Above the tracking input:
- Explanation box: "Y7 uses digital tracking — every update is logged in writing..."
- Fastest-path hint

Below the existing help text:
- 3-card responsive grid: Client Portal (dispatch.y7agency.com), Telegram Bot (@y7dispatch_bot), Email Dispatch (dispatch@y7agency.com)

Tracking input itself untouched.

### T05 — Contact page clarity

Above the form:
- Policy block (accent-bordered muted panel): "Preferred channels for fastest response" — portal/Telegram for existing customers, form → email within 1 business day for new inquiries.

Inside the form (microcopy only, inputs unchanged):
- Email label subtext: "Required if no phone — we will send our response here."
- Phone label subtext: "Optional — we use this for delivery coordination when your carrier is assigned."

### T06 — Blog

**BlogIndex** — new "Browse by role" section between hero and filter chips. 3 clickable cards (Dealers / Exporters / Broker Insights) with live article counts. Filter chips still present below — clusters are additive.

**BlogArticle** — new CTA banner after related-services, before "Back to Blog". Two buttons only:
- Primary → `/quote`
- Secondary → `/portal/login`

No Telegram button here per sprint constraint.

---

## Global audit results

Grep against sprint-specified patterns (`call us`, `give us a call`, `phone support`, `call our team`, `pick up the phone`, plus RU/PL/UA equivalents):

- **1 hit** — `src/pages/seo/OpenCarShipping.jsx:174` — context was Y7 customer-support escalation ("if your assigned carrier arrives with chains-on-axles equipment, call us"). Rewrote to: "flag it to dispatch via the portal or Telegram before loading."
- **Post-fix re-grep: 0 hits.**

Preserved references (not rewritten, per sprint rules):
- Carrier/driver phone provision for last-mile delivery — operationally required
- Terms/Agreement phone clauses — legal precision
- Carrier operational phrasing like "The driver calls you directly 12–24 hours before arrival" in `OpenCarShipping.jsx:178` — this is driver↔customer, not Y7 support

---

## Post-deploy QA checklist

After Railway redeploys and Cloudflare cache purges:

1. **Cloudflare — critical** — purge the `/blog` rule that's still returning `301 → /` from the edge. Rules → find the old `/blog` redirect, delete it. Verified pre-sprint: `curl -I https://www.y7agency.com/blog` returns `301 Moved Permanently` with no `Cache-Control` header, which only fits a Cloudflare Redirect Rule / Page Rule, not code. After removing the rule, the same curl should return `200 OK` with `Cache-Control: no-cache, no-store, must-revalidate` (same header profile as `/about` and `/contact`).

2. **Home page** — scroll to the `whyY7` card grid: "Monitor your shipment via portal, email, SMS, or Telegram. For delivery coordination, driver contact details appear in your portal after dispatch." Mobile view: confirm QuoteFormCompact still renders and VerificationStrip at bottom still links externally.

3. **About page** — scroll to the new "How Y7 Communicates" section. Two cards (Portal icon / Truck icon) render side-by-side on desktop, stack on mobile. Benefits strip at the bottom shows 4 pills.

4. **FAQ page** — scroll to "Communication & Documents" category. Three new Q&As expand on click.

5. **/track** — landing shows explanation box, tracking input, and 3 fallback cards (Portal / Telegram / Email). Clicking Portal opens `dispatch.y7agency.com` in new tab; Telegram opens `t.me/y7dispatch_bot`; Email triggers `mailto:`.

6. **/contact** — policy block visible under the h1. Form still has Name / Email / Phone / Message. Email label shows "Required if no phone". Phone label shows "Optional — we use this for delivery coordination". Submission still works.

7. **/blog** — 3 cluster cards below the hero (Dealers/Exporters/Broker). Clicking a card activates the corresponding filter.

8. **Any blog article** — scroll to the bottom of the article body (before "Back to Blog" link). CTA banner with "Get a Quote" + "Open Portal" buttons. No Telegram button.

---

## Build status

- Lint: 0 errors, 0 warnings (verified after each task)
- Vite build: green across T01–T07 (verified)
- Prerender: 106 OK, 0 failed — verified in final T08 build

## Commit summary

```
682f0b2 [P3-CLARITY-T07] chore: global terminology audit — digital-first consistency
e4ef6cb [P3-CLARITY-T06] feat: blog clusters on index + CTA banner on articles
69a3877 [P3-CLARITY-T05] feat: Contact page clarity — policy block + field help text
98d0f34 [P3-CLARITY-T04] feat: /track page — explanation block + 3 fallback cards
e9d39e0 [P3-CLARITY-T03] feat: 3 new FAQ entries about communication model (4 languages)
40d57e6 [P3-CLARITY-T02] feat: "How Y7 Communicates" section on About page
12d2de1 [P3-CLARITY-T01] copy: unify digital-first support messaging across 4 locales
```

## Separate deliverable (outside sprint scope)

Customer portal diagnostic — ran while the user asked about it mid-sprint. Result: portal code is healthy and DB-connected (dispatch.y7agency.com responds 401 correctly on `/api/portal/auth/me`). Zero TODO/FIXME/stub markers across the 10 portal pages (Login, Register, Dashboard, OrderDetail, DispatchDetails, NewOrder, Billing, Profile, Locations, LocationSetup). All pages wire real backend endpoints. Auth architecture is sophisticated (HttpOnly cookie primary + localStorage Bearer fallback + structured 403 redirects for classification/agreement flows). If a specific flow looks broken during live QA, flag the page + step for a targeted dig.
