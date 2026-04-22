# Sprint WIZARD-REDESIGN — completion report

Status: **complete, awaiting push approval**
Date: 2026-04-22
Branches: `TRANSPORT/main` (local ahead 6), `Y7-WEBSITE/main` (local ahead 1)

## Goal

Three customer-visible problems in the onboarding wizard:

1. **Content** — the agreement screen showed a hardcoded summary, not the
   actual contractual text per customer_type.
2. **UX** — four checkboxes sat at the bottom of the scroll; there was no
   signal that each checkbox was bound to a specific section.
3. **Legal** — the user typed their own legal name at signing time, making
   the signature a free-text artifact rather than a legally-bound identity.

## Phase 0.5 decisions (recorded for audit)

| Decision | Choice | Why |
| --- | --- | --- |
| **Path** | A — JSON bundles via copy script | `Y7-WEBSITE/src/locales/*/agreement*.json` already held the real legal copy; the `docs/agreements/*.md` files were placeholder stubs pointing to the JSON. |
| **E — sync mechanism** | Option 2 — copy script with SHA-256 manifest | Bundles ship with the repo, but the sync script (`scripts/sync_agreement_bundles.py`) refuses to overwrite if hashes diverge, catching drift. |
| **F — checkbox set** | 4 universal checkboxes with `covers_sections[]` | Keeps the legally-vetted bundle copy intact; maps many bundle sections to a small, user-comprehensible consent surface. |
| **Q3 — locale policy** | 3B — block non-EN sign for non-dealer | The dealer bundle is v1.1 across all locales; individual/auction_buyer/exporter are v2.0 EN-only. Blocking with a structured 409 + banner is safer than serving stale v1.1 translations. |

## Endpoint contracts

### GET `/api/public/agreement-template?v3=true&type=<ct>&lang=<lang>`

- Public, no auth, 30 req/min/IP.
- `v3=false` (or omitted) → legacy v1 shape (version + is_draft + draft_warning).
- `v3=true` → rendered shape below.
- Returns **409** with `{"error": "locale_version_mismatch", "fallback_lang": "en", ...}` for non-EN + non-dealer.
- Returns **500** `bundle_missing` if bundles are absent on disk.

```jsonc
{
  "type": "individual",
  "version": "2.0",
  "lang": "en",
  "bundle_shape": "v2.0",       // or "v1.1" for dealer
  "is_draft": false,
  "draft_warning": null,
  "full_html": "<...>",
  "sections": [
    {"id": "s1", "heading": "...", "body": "<p>...</p>"}
  ],
  "checkboxes": [
    {"id": "bol",          "label": "...", "covers_sections": ["s4"],        "required": true},
    {"id": "payment",      "label": "...", "covers_sections": ["s2","s3"],   "required": true},
    {"id": "broker",       "label": "...", "covers_sections": ["s1","s5"],   "required": true},
    {"id": "cancellation", "label": "...", "covers_sections": ["s6","..."],  "required": true}
  ],
  "signer_name_source": "profile.contact_name",
  "signature": {"version": "...", "method": "..."}
}
```

Coverage verified: every section id returned in `sections[]` is mentioned in at
least one `checkboxes[].covers_sections`, for every supported combination.

### POST `/api/portal/onboarding/update-profile`

- Authenticated.
- Body: `{contact_name, phone, company_name?, delivery_address?, delivery_city, delivery_state, delivery_zip?}`
- 409 on phone collision (normalised via `services.otp_service.normalize_phone`).
- After success, `/auth/me` returns `profile_complete: true` and pre-fills the
  agreement step's signer line.

### POST `/api/portal/onboarding/classify-and-sign` (modified)

- `signature_name` is now **optional** and ignored — server uses
  `customer.contact_name` as the legal signer.
- New required field `section_acknowledgements`: array of
  `{section_id, checkbox_id, acknowledged_at}`. Sent by the client as the
  expansion of `covers_sections[]` for every checked checkbox.
- New field `bundle_shape: "v2.0" | "v1.1"`. Recorded for audit — tells the
  storage layer which schema was rendered at sign time.
- Legacy `checkbox_bol` / `checkbox_payment` / `checkbox_broker_liability` /
  `checkbox_cancellation` are now optional and **derived server-side** by
  re-rendering the bundle and mapping `section_acks → checkbox ids`. Trusting
  the client here would let a forged payload claim coverage it doesn't have.
- Returns **400 `profile_incomplete`** if `contact_name` is missing — wizard
  bounces the user back to Step 1.

### GET `/api/portal/auth/me` (enriched)

New fields: `contact_name`, `phone`, `company_name`, `delivery_address`,
`delivery_city`, `delivery_state`, `delivery_zip`, `profile_complete`.

## Before / after

### Before

```
Onboarding screen:
 ┌──────────────────────────┐
 │ [hardcoded summary HTML] │   ← 4 sections of paraphrased text,
 │  scroll to unlock...     │     not the actual legal agreement.
 └──────────────────────────┘
 [ ] BOL
 [ ] Payment
 [ ] Broker liability        ← four checkboxes with no visible tie
 [ ] Cancellation              to the section each one governs.
 Your full legal name: [ __________ ]
 [ Sign ]
```

### After — 4-step wizard

```
 ● ○ ○ ○   Step 1 — Profile
           [contact_name] [phone] [company] [address] [city] [state] [zip]
           [ Continue ]

 ● ● ○ ○   Step 2 — Account type
           ┌ Ship My Car ┐ ┌ Auction Buyer ┐ ┌ Auto Dealer ┐ ┌ Exporter ┐

 ● ● ● ○   Step 3 — Review and sign
           Signing as: Sergii Vorotyntsev  [Edit]   ← from profile, read-only
           ┌ BOL ────────────────────┐
           │ Section s4 body...      │   ← real bundle copy
           │ [x] I have read...      │
           └─────────────────────────┘
           ┌ Payment ────────────────┐   ← locked until prior is checked
           │ Sections s2 + s3 body   │
           │ [ ] I have read...      │
           └─────────────────────────┘
           ...
           [ Sign as Sergii Vorotyntsev ]

 ● ● ● ●   Step 4 — Welcome
           You are all set. [Submit your first quote] [Dashboard]
```

## Migration note

**Existing signed agreements remain valid.** No data migration required.

- The two new DB columns on `customer_agreements` (`section_acknowledgements
  JSONB`, `bundle_shape TEXT`) are `ADD COLUMN IF NOT EXISTS` — idempotent, nullable.
- Historical rows keep their `signature_name` and aggregate `checkbox_*` flags.
- New rows after deploy populate `section_acknowledgements` and `bundle_shape`;
  the aggregate flags are also written (server-derived) so downstream readers
  that haven't been updated still work.

## QA checklist — 4 types × 4 langs (manual)

### Web (`/portal/onboarding`)

- [ ] Individual × en → profile → type → agreement (v2.0, 12 sections, 4 cards) → welcome
- [ ] Individual × ru → locale-block banner, "Switch to English" CTA works (changes i18n + localStorage)
- [ ] Individual × pl → locale-block banner
- [ ] Individual × ua → locale-block banner
- [ ] Auction buyer × en → same as individual (shares bundle)
- [ ] Auction buyer × {ru,pl,ua} → locale-block banner
- [ ] Dealer × en → agreement (v1.1, 8 sections, 4 cards) → welcome
- [ ] Dealer × ru → agreement renders in Russian, signs normally
- [ ] Dealer × pl → agreement renders in Polish, signs normally
- [ ] Dealer × ua → agreement renders in Ukrainian, signs normally
- [ ] Exporter × en → agreement (v2.0, 12 sections, 4 cards) → welcome
- [ ] Exporter × {ru,pl,ua} → locale-block banner

### Mini App (Telegram)

- [ ] First-time user with unclassified account → profile step shows first
- [ ] Returning user with classified + signed → dashboard immediately
- [ ] Returning user with classified + no signature + profile_complete → straight to agreement
- [ ] "Edit" link on agreement step bounces back to profile step
- [ ] Submitting with `profile_incomplete` error bounces back to profile step with banner
- [ ] Progressive disclosure: later cards stay opacity:0.55 until prior box is checked
- [ ] Signer name on step 3 matches /auth/me.contact_name
- [ ] 4-dot step indicator advances 1→4

### Universal checks

- [ ] Mobile 375px width — all cards stack, step indicator fits
- [ ] Keyboard nav on web — tab through profile fields → type cards → checkboxes
- [ ] Reload mid-wizard — routing lands on the right step based on server state
- [ ] Phone-collision 409 on profile save shows a useful error

## Deploy order

1. **TRANSPORT first** (backend).
   - Migration is idempotent (`ALTER TABLE IF NOT EXISTS` pattern).
   - New endpoint `GET /agreement-template?v3=true` is additive — v1 callers unaffected.
   - Modified `POST /classify-and-sign` is backward-compatible — it still
     accepts the old payload (checkbox booleans + signature_name) for the
     brief window between backend deploy and frontend deploy.
2. **Y7-WEBSITE second** (frontend + Mini App).
   - Once deployed, new signings always use the v3 shape and
     section_acknowledgements.

Rollback: revert Y7-WEBSITE first, then TRANSPORT. Existing rows are safe.

## Post-deploy verification

1. In Telegram, open the Mini App as a test customer with no classification.
   Confirm profile step appears, saves, and advances to type → agreement.
2. In the web portal (incognito), start onboarding at `/portal/onboarding`.
   - With `i18n.language = 'en'`, confirm the Russian/Polish/Ukrainian/English
     toggle stays in English and the agreement loads for each customer type.
   - Switch to Russian via the language picker, pick a non-dealer type,
     confirm the locale-block banner appears with the "Switch to English" CTA.
3. Check one signed row in `customer_agreements`:
   ```sql
   select customer_id, customer_type, bundle_shape,
          jsonb_array_length(section_acknowledgements) as section_count,
          checkbox_bol, checkbox_payment
   from customer_agreements
   order by signed_at desc limit 5;
   ```
   - `bundle_shape` should be `v2.0` or `v1.1` (not null for new rows).
   - `section_count` should be 8 (dealer) or 12 (others).
   - Aggregate `checkbox_*` flags should all be true.

## Known gaps

- **Startup probe**: wanted to add a `bundles_present()` check in
  `api/main.py` so the service fails fast if `data/agreements_i18n/` is
  missing. Skipped because `api/main.py` carries pre-existing gitleaks
  false-positives (lines 117-121, SHA256 dev-secret integrity hashes) that
  block any edit to that file. The renderer endpoint itself returns
  `bundle_missing` 500 when bundles are absent, so the gap is observable
  rather than silent.
- **Test DB**: local environment has no Postgres — endpoint integration tests
  are DB-dependent and will run in CI. Pure-function renderer tests
  (`tests/test_agreement_bundle_renderer.py`) are designed to work without
  DB and were smoke-tested via direct Python invocation covering all 16
  `type × lang` combinations.

## Commits

### TRANSPORT

- `b4c00cb` [T01] agreement renderer + `/agreement-template` v3 + bundle sync
- `718e651` [T01] `sync_agreement_bundles.py` (dry-run default)
- `bf70633` [T02] `/auth/me` returns profile fields + `profile_complete`
- `5a66045` [T03] `POST /onboarding/update-profile` for wizard Step 1
- `9b887e5` [T04] classify-and-sign sources signer from profile + section acks
- `acd4692` [T08] Mini App parity (4-step wizard with profile + v3 template)

### Y7-WEBSITE

- `5ca7bc4` [T05-T07] 4-step wizard with ProfileStep + progressive-disclosure agreement
- *(pending)* [T09] this report

## Verification gates — all green

- `npm run lint` → 13 errors (all pre-existing, `react-hooks/set-state-in-effect`
  rule pre-dates this sprint); Onboarding.jsx has zero net-new violations.
- `npx vite build` → built in 667ms, no errors (chunk-size warning only).
- `node scripts/prerender.mjs` → 30 routes prerendered, all `[OK]`.
- Renderer smoke across `{individual, auction_buyer, dealer, exporter} × {en, ru, pl, ua}`
  → 16/16 expected outcomes (EN renders, non-EN non-dealer blocks, dealer
  serves all langs, every section covered).

## Next action

Both repos are **local-only**. Awaiting explicit `git push` approval per
sprint discipline.
