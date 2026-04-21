# BILLING-HONESTY Sprint — Report

## Problem

Prior copy used **"Net-15"** to describe dealer billing. That phrasing implies Y7
**extends credit** to dealers for 15 days — i.e., Y7 fronts carrier payment and
waits 15 days to collect. That is a factoring / credit product.

**Y7 does not offer credit.** The live dealer agreement
(`agreement_dealer.json`) already states so:

> **NO CREDIT EXTENSION:** Y7 does not extend credit beyond the billing terms
> stated above. No net-30, no deferred payment, no invoicing by third-party
> services.

The marketing copy (`home.json`, `dealers.json`, `Careers.jsx`) contradicted
that agreement. This sprint fixes the contradiction.

## Solution

Replaced Net-15 language with **Accounts Payable service** language everywhere.

### Positioning clarification

Y7 does **not**:
- extend credit
- factor invoices
- provide deferred-payment terms
- advance working capital

Y7 **does**:
- Bookkeeping: carrier payment records, invoice tracking
- Payment data collection: ACH routing, Zelle handles, W9 forms from carriers, encrypted at rest
- Payment execution: ACH / Zelle payments to carriers on dealer's behalf, from the dealer's **prepaid balance**
- Weekly statements: reconciled against prepaid working capital
- Year-end 1099-NEC issuance (separate annual service fee)

Framed as: **"Carrier Payments Handled"** — Accounts Payable as a Service.

## Files changed

### Content (locales)
- `src/locales/{en,ru,pl,ua}/home.json` — `audience.dealersStat` reworded
- `src/locales/{en,ru,pl,ua}/dealers.json`
  - `capabilities.items[6].desc` — "Consolidated weekly billing" → AP/ACH/Zelle wording
  - `workflow.steps[3].desc` — "Day 6-10" reconciliation line dropped Net-15
  - `billing.intro` — new AP-service preamble + explicit no-credit disclosure
  - `billing.features` — replaced "Net-15 terms available" with "Weekly statement + reconciliation"; added new entries for **Carrier payment execution** and **Year-end 1099-NEC issuance**

### Code
- `src/pages/Careers.jsx` — carrier-side pay copy: "Net-15 standard" / "Net-15 from clean delivery" rewritten to "15-day payment standard" / "15 days from clean delivery"
- `src/components/AudienceCards.module.css` — tag expanded to fill space beside icon (see visual change below)

### Not changed (left verbatim — correct)
- `src/locales/{en,ru,pl,ua}/agreement_dealer.json` — contains the explicit "NO CREDIT EXTENSION" denial clause ("No net-30, no deferred payment…"). Keeping the denial intact is the whole point.

## Visual change

Home audience cards: the INDIVIDUALS / DEALERS / EXPORTERS tag previously sat
as a small pill next to the icon with empty space to its right. The tag now
fills the entire zone beside the icon — a single horizontal bar that makes the
audience segment read as a prominent top strip. Still tone-coloured
(coral / teal / amber), still has the leading dot, still respects
`prefers-reduced-motion` and keyboard navigation.

## Verification

- `rg -i "Net-15|Net 15|net-15|net 15"` over `src/` → **0 matches**
- `rg -i "Net-30|Net 30|net-30"` over `src/` → only inside `agreement_dealer.json` (the denial clause)
- `npx vite build` → green
- `npm run lint` → 0/0
- `node scripts/prerender.mjs` → 113 OK, 0 failed

## Post-deploy checklist

- Cloudflare purge `/`, `/dealers`, `/pl/dealers`, `/ua/dealers`, `/ru/dealers`
- Visual smoke test on home cards (desktop + mobile 375px)
- Google Search Console — Request Indexing for `/dealers` + translated variants

## Commits

- `[BILLING-T01]` chore: audit Net-15 and credit-extension mentions for cleanup
- `[BILLING-T02]` content: replace Net-15 with AP-service language in home.json + dealers.json (4 locales)
- `[BILLING-T03]` content: remove Net-15 from Careers.jsx (carrier pay copy)
- `[BILLING-T05]` content: add AP-service intro + carrier payment execution + 1099-NEC billing features
- `[CARDS-T07]` style: expand tag to fill top-right area beside icon
