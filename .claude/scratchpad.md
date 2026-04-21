# BILLING-HONESTY sprint — Net-15 audit findings

## Scope of `Net-15` mentions in src/

### home.json (4 locales)
- `src/locales/en/home.json:25` — `"dealersStat": "Flat per-vehicle fee · Net-15 billing"`
- `src/locales/ru/home.json:29` — `"dealersStat": "Фикс. тариф за авто · Net-15"`
- `src/locales/pl/home.json:29` — `"dealersStat": "Stała opłata za auto · Net-15"`
- `src/locales/ua/home.json:29` — `"dealersStat": "Фікс. тариф за авто · Net-15"`

### dealers.json (4 locales, identical English strings across locales)
Three spots per locale (en/ru/pl/ua):

1. `capabilities.items[6]` — `"Consolidated weekly billing" / desc "… Net-15 terms for established dealers. ACH supported."`
2. `workflow.steps[3]` (Day 6-10 "First delivery + invoice") — `desc "… Reconciliation against prepay balance or Net-15 terms."`
3. `billing.features[1]` — `{ "label": "Net-15 terms available", "desc": "New dealers start COD for 4-6 weeks. Clean volume history triggers upgrade eligibility." }`

Note: `hero.trust1` and `hero.trust3` do **not** contain Net-15 — the sprint brief was out-of-date on those. `trust1` already says "Licensed & Bonded FMCSA Broker · MC #1741537".

### Careers.jsx (not in original sprint scope but triggers constraint)
- `src/pages/Careers.jsx:78` — FAQ answer "Net-15 from clean delivery as the standard…" (carrier-facing, but constraint is zero Net-15 references site-wide)
- `src/pages/Careers.jsx:246` — Payment card title `"Net-15 standard"`

### NOT changing (correct denial usage)
- `src/locales/{en,pl,ua,ru}/agreement_dealer.json:15` — `"4. NO CREDIT EXTENSION: Y7 does not extend credit beyond the billing terms stated above. No net-30, no deferred payment, no invoicing by third-party services."` — leave verbatim; explicit denial.

### No hits (confirmed clean)
- `src/pages/Dealers.jsx` — no inline Net-15
- `src/pages/seo/*` — no Net-15 anywhere
- `src/locales/*/common.json` — no Net-15 or "established dealers" mentions

## Replacement strategy

- Home dealersStat → "Flat per-vehicle fee · Carrier payments handled" (+ RU/PL/UA equivalents)
- dealers.json `capabilities.items[6]` desc → replace Net-15 clause with ACH/Zelle AP language
- dealers.json `workflow.steps[3]` desc → replace "or Net-15 terms" with "against prepaid balance"
- dealers.json `billing.features[1]` — repurpose as "Weekly statements" AP-service entry
- Careers.jsx — "Net-15 standard" → "15-day payment standard"; FAQ answer likewise

## T05 carrierPayments section
Existing dealers.json has `paymentOptions` (COD vs Prepay) and `billing` (6 features). Adding a new top-level `carrierPayments` section is redundant. Instead: strengthen the existing `billing.features` entries to cover the AP-service narrative (working capital deposit, carrier data collection, ACH/Zelle execution, weekly statements, 1099-NEC, clear boundaries).
