# Sprint CAREERS — Report

## Scope delivered this session

**Phase B — Y7-WEBSITE frontend** (public-facing): **complete**.

**Phase A — TRANSPORT backend** (API endpoint + tests + email template + schema): **deferred to a paired follow-up session.** The full spec lives in `CAREERS_TRANSPORT_FOLLOWUP.md` on the Y7-WEBSITE side, with verified helper signatures from the T01 audit. Rationale:

- TRANSPORT had uncommitted user work on `main` (modified `CLAUDE.md` / `.gitignore` plus two new script files). Safer to pair backend work than stack partially-verified code on pending changes.
- Sprint spec named helpers that don't exist as written — the real helpers are `services/alerting.py::send_alert` (not `services/admin_notifier.py`), and email uses the **outbox pattern** `services/email_sender.py::enqueue_email`, not a direct Graph API call.
- `create_invitation()` expects `created_by: int | None`, not a string token.
- Tests need PDF fixtures + test-DB isolation that warrant a tight local loop.

The frontend form submits to `/api/public/carrier-application`. Until the backend lands, that URL returns 404 and the form surfaces a clean error message. The form itself is live, validated, and SEO-indexable.

---

## Strategic context

`/careers` was previously a 301 redirect to `/` from the Wix days. This sprint converts it into a **carrier recruiting funnel** that feeds the existing TRANSPORT carrier infrastructure (onboarding tokens + 4-tab carrier portal).

Carrier discovery → landing page → 3-step application → (backend) token email → existing `/onboarding/{token}` flow → existing `/carrier-portal` dashboard. Three token systems already live in TRANSPORT; this sprint only builds the missing public entry point.

---

## Commits (Y7-WEBSITE only this session)

```
e36f658 [CAREERS-T09] nav: link /careers from footer (T08 commit); /about link deferred
85b3c78 [CAREERS-T08] seo: meta tags + sitemap entries for /careers and /careers/apply
e2ad2df [CAREERS-T05] chore(website): remove /careers redirect, add React routes + Careers landing + CareerApplication form
0752922 [CAREERS-T01] chore(transport): infrastructure audit for carrier application endpoint
```

(T05 commit bundles T05 + T06 + T07 content because the files are tightly coupled — routing depends on the pages existing, and the form references routes defined in App.jsx. T02/T03/T04 are documented-only pending the TRANSPORT session; T09 is a marker.)

---

## Deliverables

### `/careers` landing page — `src/pages/Careers.jsx` + `Careers.module.css`

~360 lines, ~1,800 words across 12 sections:

1. Hero — "Become a Y7 Carrier Partner"
2. Why Work With Y7 — 6 benefit cards (steady lanes, digital dispatch, fast payment, transparent paperwork, multi-language, licensed & bonded)
3. Qualifications — 8 checklist items (MC authority, USDOT, COI ≥ \$100k, auto liability \$1M, Satisfactory safety rating, OOS under average, car hauler equipment, current W9)
4. Onboarding — 4-step timeline (apply → email link → secure portal → admin review)
5. How Loads Flow — 4-card operational description (CD posting → bid/accept → dispatch packet → per-load confirmation)
6. Payment Terms — 3 cards (Net-15 standard, Zelle or ACH, Payment Day dashboard)
7. Carrier Portal — 4-tab preview (Loads / Profile / Documents / Payment)
8. Per-Load Workflow — 4-step numbered list for the delivery-confirmation tokens
9. What Y7 Does NOT Do — 5 honest boundaries (no guaranteed daily loads, no upfront pay, no factoring without review, no conditional/unsatisfactory carriers, no household goods / hazmat / oversize)
10. FAQ — 10 accordion items with FAQPage schema
11. CTA strip — "Apply to Carrier Network" + "Already a Y7 carrier? Sign in" (the ONE acceptable place to surface `dispatch.y7agency.com/carrier-portal` — it's the carrier portal, not the admin dashboard)
12. Crosslinks — /dealers, /about, centraldispatch.com

Schemas rendered via `<script type="application/ld+json">`:
- `JobPosting` (Google Rich Results for career pages) with `employmentType: CONTRACTOR`, `occupationalCategory: 53-3032` (heavy truck driver), qualifications and responsibilities arrays
- `FAQPage` auto-generated from the FAQS array

Animation: same `useInViewFade` hook pattern from `/dealers` — IntersectionObserver fade-in with `prefers-reduced-motion` guard.

### `/careers/apply` — `src/pages/CareerApplication.jsx` + `.module.css`

~290 lines. 3-step progressive form with visible progress bar.

**Step 1: Company & Authority** — legal_name, mc_number (regex `^(MC-?)?\d{6,7}$`), usdot_number (regex `^\d{6,8}$`), equipment_type radio (open / enclosed / both).

**Step 2: Contact & Operations** — contact_name, contact_email (regex), contact_phone (formatted as user types, 10-digit required), operating_states (50-state chip grid multi-select), notes (optional).

**Step 3: Documents** — COI + W9 file inputs, 10MB max, PDF/JPG/PNG accepted. Client-side size check; server will reject mismatched magic bytes.

Submit: `POST multipart/form-data` to `${API_URL}/api/public/carrier-application` with graceful handling for:
- 409 (duplicate MC) → clear message pointing to `dispatch@y7agency.com`
- 429 (rate limit) → "Too many applications from this IP in the last hour"
- 5xx / network → generic retry message

Success screen: large green checkmark, "Application received", "Check your email at {email} for the onboarding link within 5 minutes", escape hatch to `/careers`.

### Routing + infrastructure

- `server.js`: removed legacy redirect
- `src/App.jsx`: 2 new `<Route>` entries, static imports (not lazy — prerender-safe)
- `scripts/prerender.mjs`: 2 new paths in `PUBLIC_ROUTES`
- `scripts/generateSitemap.js`: 2 new paths in `ENGLISH_ONLY`
- `src/components/Footer.jsx`: new legal-column link
- `src/locales/en/common.json`: `meta.careersTitle`, `meta.careersDescription`, `meta.careerApplicationTitle`, `meta.careerApplicationDescription`, `footer.careers`

---

## TRANSPORT follow-up (spec ready, not executed)

Full integration spec in **`CAREERS_TRANSPORT_FOLLOWUP.md`** at the repo root. Key points:

**Real helper signatures** (audited in T01):
- `services.onboarding_token_service.create_invitation(carrier_id, carrier_email, carrier_name, created_by: int|None, purpose, expires_hours) -> {'token', 'expires_at', 'portal_url', 'id'}`
- `services.email_sender.enqueue_email(conn, to=, subject=, template=, context=, category=, destination=, source=, idempotency_key=)` — outbox pattern
- `services.alerting.send_alert(message, severity: Severity, context)` — Slack webhook fallback to logging

**Files to create** in TRANSPORT:
- `api/routes/public_carrier.py` — single `POST /api/public/carrier-application` endpoint (full draft code in the follow-up doc, 180 lines, uses real helpers)
- Email template `careers_welcome` for `enqueue_email(template=...)`
- `api/main.py` — include router
- `db/__init__.py` `init_all_tables()` — `ALTER TABLE carriers ADD COLUMN IF NOT EXISTS source TEXT` + verify `status` CHECK constraint allows `pending_application`
- `tests/test_public_carrier_application.py` — 16 test cases + `tests/fixtures/minimal_coi.pdf` + `tests/fixtures/minimal_w9.pdf`

**What the endpoint does** (operational summary):
- Rate-limit check via DB counter (5/hour/IP based on `carriers.notes LIKE '%ip=<ip>%'` within the last hour)
- Validate MC regex, USDOT regex, equipment enum, email format, file size, content-type
- **Magic-bytes validation**: PDF `%PDF`, JPEG `\xff\xd8\xff`, PNG `\x89PNG\r\n\x1a\n`
- Check `carriers.mc_number` uniqueness → 409 on duplicate
- Atomic transaction: INSERT carrier + 2 × INSERT carrier_documents + `create_invitation()` + `enqueue_email()` (all inside one `with get_connection() as conn`)
- Out-of-transaction: `send_alert(severity=MEDIUM)` best-effort admin notification

---

## Compliance confirmation (Y7-WEBSITE side)

| Check | Status |
|---|---|
| `Licensed.*Insured` applied to Y7 in Careers.jsx | 0 matches (copy uses "Licensed & Bonded") |
| Phone number on /careers or /careers/apply | none |
| Customer-facing `dispatch@y7agency.com` in landing body | appears ONCE in the success-screen "didn't receive?" fallback and in the 409 error message — correct usage (it IS the carrier-facing inbox). No mention on the landing body. |
| Link to admin dashboard (`dispatch.y7agency.com`) | one carefully-placed link in the CTA strip to `dispatch.y7agency.com/carrier-portal` — this is the carrier portal, not the admin dashboard, so it's correct |
| Motion / GSAP / Lottie | none — inline `useInViewFade` with IntersectionObserver |
| React.lazy | none — static imports so prerender sees the routes |
| Emoji in production copy | none |
| Invented testimonials, statistics, client names | none |
| Lint | 0 errors, 0 warnings |
| Vite build | green |

---

## Post-deploy checklist

1. **Cloudflare purge** `/careers` and `/careers/apply` — the old 301 redirect may still be cached at CF edge.
2. **GSC Request Indexing** for both URLs.
3. **Schema validation** via Google Rich Results Test on `/careers` — confirm JobPosting + FAQPage parse.
4. **Smoke test on production**:
   - Navigate to `/careers` in incognito → page renders, no console errors.
   - Scroll through — fade-in animations trigger; test with `prefers-reduced-motion` set.
   - Click "Apply to Carrier Network" → /careers/apply loads.
   - Walk through all 3 steps with dummy data — no required-field errors before clicking Next.
   - Submit test application (will currently 404 at the backend until the TRANSPORT follow-up lands — that's expected; confirm the UI shows a clean error message instead of crashing).
5. **Mobile test at 375px** — the 50-state chip grid, progress bar, hero headline, and footer-legal-column link all reflow cleanly.
6. **Once TRANSPORT backend lands**, submit with a real MC + real PDFs and verify:
   - Welcome email arrives at the contact email within 5 minutes
   - Telegram/Slack admin alert fires
   - `carriers` row created with `status=pending_application`, `source=careers_web`
   - `carrier_documents` has COI + W9 rows with `source_type=careers_application`
   - Clicking the email link lands the carrier on the existing `/onboarding/{token}` portal

---

## Future enhancements (deferred)

- Auto-SAFER lookup on application submit to validate MC authority status + safety rating in real time
- Optional translation to RU/UA/PL (scope note: EN-only this sprint)
- Welcome SMS in addition to email (requires Twilio wiring, not yet in scope)
- Admin dashboard widget: "New applications this week" counter
- Scheduled reminder emails if the onboarding token isn't consumed within 24/48/72h
