# Hotfix PORTAL-URL-FIX — Report

## The two-URL rule (for all future work)

| URL | Purpose | Who sees it |
|---|---|---|
| `https://www.y7agency.com/portal/login` | **Customer portal** — orders, documents, billing, tracking | Customers |
| `https://dispatch.y7agency.com` | **Admin dashboard** + API host | Internal staff only |

Customers must never be routed to `dispatch.y7agency.com`. The only permitted references to that subdomain are:
- `src/config.js` (`API_URL` fallback) — backend host used by `fetch()`, invisible to users
- `src/pages/Agreement.jsx:437` — direct API endpoint for agreement PDF download

Both are architectural, not user-facing.

## Files touched

### About.jsx (T01)
- Line 207-213: replaced `<a href="https://dispatch.y7agency.com">dispatch.y7agency.com</a>` with `<Link to="/portal/login">{t('contactPortalLinkLabel')}</Link>`.
- Added `contactPortalLinkLabel` key to all 4 about.json locales (EN "Client Portal" / RU "Клиентский портал" / PL "Portal klienta" / UA "Клієнтський портал").

### Track.jsx (T01, extra)
Previously-missed hardcoded admin link from P3-CLARITY-T04. Line 167 first fallback card: external `<a href="https://dispatch.y7agency.com">` → internal `<Link to="/portal/login">`. Card title/desc/cta strings unchanged.

### UkraineHome.jsx (T02)
- Line 219: process step 2 desc — removed literal `"dispatch.y7agency.com"` from mid-sentence.
- Lines 1126-1131: contact-card CTA — external `<a>` → `<Link to="/portal/login">` with "Клієнтський портал" label.

### UkraineShipMyCar.jsx (T03)
- Line 110: short step desc rewritten.
- Line 139: full step 2 desc — subdomain mention removed.
- Lines 836-846: portal CTA — external `<a>` → `<Link to="/portal/login">`.

### PolandShipMyCar.jsx (T04)
- Line 189: "w systemie dispatch.y7agency.com" → "w naszym systemie". No CTA-link change needed (this page had no visible admin-subdomain link).

### Billing.jsx (T05)
No code change. Already fixed in P3-FIX-T03 (`dispatch@y7agency.com` → `info@y7agency.com` at line 220). Kept as marker commit for sprint continuity.

## Preserved per explicit rules

| File | Line | Kept because |
|---|---|---|
| `src/config.js` | 1 | `API_URL` — backend base, invisible to customers |
| `src/pages/Agreement.jsx` | 437 | Direct PDF API endpoint; `VITE_API_URL` env var preferred, hardcoded URL is fallback only |

## Global audit results

```
grep "dispatch.y7agency.com" src/
  → src/config.js:1 (backend API, allowed)
  → src/pages/Agreement.jsx:437 (API endpoint, allowed)
  → 0 other matches

grep "dispatch@y7agency" src/
  → 0 matches

lint: 0 errors
vite build: green
```

All customer-facing links now point to `/portal/login` (same origin, same SPA). No more admin-subdomain exposure.

## Commits

```
92a06d0 [PORTAL-URL-T05] chore: Billing.jsx — already uses info@y7agency.com
e4e9326 [PORTAL-URL-T04] fix: PolandShipMyCar.jsx — remove dispatch subdomain exposure from process text
83ddb9a [PORTAL-URL-T03] fix: UkraineShipMyCar.jsx — remove dispatch subdomain exposure, link to /portal/login
0a55389 [PORTAL-URL-T02] fix: UkraineHome.jsx — process text + CTA point to customer portal
7548fda [PORTAL-URL-T01] fix: About.jsx + Track.jsx — customer portal link to /portal/login not dispatch subdomain
```

## Post-deploy smoke test

1. **`/about`** — Contact card (bottom of page): third row labelled "Customer Portal" (or localized), click lands on `/portal/login` (same origin, not new tab, not admin subdomain).
2. **`/track`** — First fallback card "Client Portal" links to `/portal/login`.
3. **`/ua`** — Scroll to process steps: step 2 text no longer mentions `dispatch.y7agency.com`. Portal CTA further down links to `/portal/login`.
4. **`/ua/dostavka-avto-z-usa`** — Same check: no subdomain mentions in process text; portal CTA → `/portal/login`.
5. **`/pl/wysylka-auta-z-usa`** — Step 2 text: "w naszym systemie" (no subdomain).
6. **Portal Billing page** (requires login) — "For questions, contact info@y7agency.com..." (confirmed in code by P3-FIX-T03).
