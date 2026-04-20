# Hotfix P3-FIX — Report

## Summary

| # | Task | Status |
|---|---|---|
| T01 | /track email card: info@ instead of dispatch@; reframe for non-order questions | done |
| T02 | /track: explicit "orders through portal" policy note | done |
| T03 | Site-wide audit for customer-facing dispatch@ references | done (2 fixes) |
| T04 | About comms support list: info@ purpose + portal-first item | done |
| T05 | Contact policy body: explicit portal-for-orders split | done |
| T06 | Verify + push + report | this file |

---

## Philosophy clarified (now consistent site-wide)

| Inbox | Purpose | Customer-facing? |
|---|---|---|
| `info@y7agency.com` | Pre-sales, general questions, partnership, non-order support | **Yes** — public |
| `dispatch@y7agency.com` | Carrier / driver / trucking-company comms | **No** — internal only |

Order-flow rule, now reflected in copy on /track, /contact, and /about:
- **Create / modify / cancel an order** → Client Portal (only)
- **Active shipment status** → Portal or Telegram bot `@y7dispatch_bot`
- **Question (non-order)** → info@y7agency.com or the /contact form

---

## What changed

### T01 — /track email card

**Before** — `track.emailCard`:
- title: "Email Dispatch"
- desc: "Include your reference number"
- cta: "Email dispatch@"
- href: `mailto:dispatch@y7agency.com`

**After** — `track.emailCard`:
- title: "Question about a past order?"
- desc: "For non-tracking inquiries only. Active shipments → use portal or Telegram for fastest response."
- cta: "Email info@y7agency.com"
- href: `mailto:info@y7agency.com`

Strings updated in all 4 locales (en/ru/pl/ua).

### T02 — /track policy note

New element rendered inside the fallback section, before the cards heading:

> "All new orders and shipment changes are handled through the Client Portal. Email and Telegram are for questions and status checks, not for submitting or modifying orders."

Files: `Track.jsx` (orderNote div), `Track.module.css` (.orderNote), `common.json × 4` (track.orderNote key).

### T03 — Site-wide audit

Scanned `src/` for `dispatch@y7agency`. Two customer-facing refs found and fixed:

1. **FAQ "Communication & Documents" entry** (added in P3-CLARITY-T03), all 4 locales — the answer used to say "info@y7agency.com for new inquiries, dispatch@y7agency.com for active shipments". Reframed to info@ only and added the explicit "orders/changes not by email" clause.

2. **`src/pages/portal/Billing.jsx:220`** — billing payment note: "For questions, contact dispatch@y7agency.com". Changed to info@.

**Post-fix grep: 0 refs to `dispatch@y7agency` anywhere in `src/`.**

Preserved: the Telegram bot handle `@y7dispatch_bot` (a bot username, not an email — unrelated to the dispatch@ inbox).

### T04 — About "How Y7 Communicates" support list

- Rewrote item 3: was "Email — contracts, invoices, formal communication" → now "Email — info@y7agency.com for inquiries and non-order questions (contracts and invoices are delivered via portal)".
- Appended item 5: "All orders, modifications, and document access happen through the Client Portal."

JSX unchanged — `About.jsx` already maps over the full array, so extending from 4 to 5 items renders automatically.

### T05 — Contact policy block

Rewrote `contact.policy.body` in all 4 locales:

> "Y7 customer support is digital-first. For active shipments and new orders, use the Client Portal or Telegram bot — this is always the fastest path. Use this form or info@y7agency.com for general inquiries, partnership questions, or non-order support. We respond within one business day."

The two-part split is now explicit on the first read: portal for anything transactional, form/info@ for questions.

---

## Build status

- `npm run lint`: 0 errors, 0 warnings
- `dispatch@y7agency` in src: **0 matches**
- "Email dispatch" / "Написать на dispatch" / "Napisz na dispatch": **0 matches**
- Vite build + prerender: 106 OK, 0 failed (final T06 build)

## Commit summary

```
293292a [P3-FIX-T05] copy: Contact page policy — explicit portal-for-orders, info@-for-questions distinction
cef60fc [P3-FIX-T04] copy: About page — clarify info@ purpose and portal-first order flow
164b328 [P3-FIX-T03] fix: audit site-wide — ensure customer-facing email is info@ only
c1dbd8f [P3-FIX-T02] feat: /track — explicit order-through-portal policy note
797d9c4 [P3-FIX-T01] fix: /track email card — info@ instead of dispatch@, correct framing for non-order inquiries
```

---

## Smoke-test checklist (after Railway redeploy)

Do these in an incognito window so cookie/consent state is fresh:

1. **/track**
   - Third fallback card shows "Question about a past order?" (not "Email Dispatch")
   - Clicking it opens `mailto:info@y7agency.com` (not dispatch@)
   - Between the input and the three cards there's a policy note in a left-accent-bordered panel stating orders go through the portal
   - Switch language: UA / RU / PL show the same structure with translated copy

2. **/contact**
   - Policy block under the h1 explicitly mentions Client Portal / Telegram for active shipments and info@y7agency.com for general inquiries
   - Phone field is still present with its "Optional — delivery coordination" help text (unchanged by this hotfix)

3. **/about**
   - "How Y7 Communicates" — Customer Support card now lists 5 bullets, with item 3 naming info@y7agency.com and item 5 stating orders/modifications/documents go through the portal

4. **/faq**
   - "Communication & Documents" category, first question ("How do I contact Y7 if I do not use phone calls?") — the answer names info@y7agency.com only; no reference to dispatch@

5. **Portal → Billing page** (must log in first)
   - "How to Pay" block — contact line shows info@y7agency.com, not dispatch@
