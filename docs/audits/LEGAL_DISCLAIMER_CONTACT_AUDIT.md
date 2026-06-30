# LEGAL DISCLAIMER + CONTACT EMAIL AUDIT

**Scope:** `C:\dev\Y7-WEBSITE` (public site + portal) and `C:\dev\TRANSPORT` (agreement templates / backend)
**Mode:** READ-ONLY. No files changed. Evidence is quoted with exact `file:line`.
**Date:** 2026-06-16

---

## 6-LINE SUMMARY

1. **Does any LIVE signed agreement carry an undermining disclaimer? NO** — the individual "Review and sign" agreement (S1/S2/S3) is clean; the dealer agreement's "DRAFT — for evaluation" banner is intentional and the only one present.
2. **Privacy disclaimer: standard** — "informational purposes / not legal advice" is conventional CYA boilerplate, scoped to the Privacy Policy and Terms pages only; it is NOT injected into any binding agreement.
3. The disclaimer lives in two hardcoded JSX footers (Privacy + Terms); it does NOT appear in `agreement.json`, `agreement_dealer.json`, or any signed-contract text.
4. All `@y7agency.com` emails are conventional role aliases (`privacy@`, `legal@`, `arbitration-optout@`) plus the two known real mailboxes (`info@`, `dispatch@`). None are fabricated or nonsensical.
5. **Action item (infra, owner to verify):** the role aliases must resolve to a real M365 mailbox/alias or mail to them will bounce — this audit does NOT confirm whether they exist.
6. **Minor data note:** the address is `arbitration-optout@y7agency.com` (no hyphen between "opt" and "out"), not `arbitration-opt-out@`; and `payments@y7dispatch.com` references the OTHER domain (y7dispatch.com, not y7agency.com) — both flagged below.

---

## A — THE PRIVACY POLICY DISCLAIMER

### A.1 Privacy Policy page source
- **Route:** `/privacy` — `C:\dev\Y7-WEBSITE\src\App.jsx:185`
- **Component:** `C:\dev\Y7-WEBSITE\src\pages\PrivacyPolicy.jsx`
- **Body text source:** i18n bundle `C:\dev\Y7-WEBSITE\src\locales\en\privacy.json` (sections `section1`…`section18`, rendered in a loop at `PrivacyPolicy.jsx:38-42`).
- **The disclaimer itself is NOT in i18n** — it is a hardcoded JSX footer.

### A.2 The exact disclaimer line — HARDCODED
`C:\dev\Y7-WEBSITE\src\pages\PrivacyPolicy.jsx:44-49` (verified directly):
```jsx
<div className={styles.footerNote}>
  <em>
    This Privacy Policy is for informational purposes and does not constitute legal advice.
    Consult your own attorney for legal guidance.
  </em>
</div>
```
**Source type: hardcoded inline JSX** (not i18n, not data). The policy body around it is i18n; only this footer note is hardcoded.

### A.3 Where the same/similar disclaimer also appears
The "informational purposes / not legal advice / does not constitute" string appears in exactly **two** places, both hardcoded JSX footers, both informational pages — NOT on any agreement:

| Location | file:line | Exact text | Type |
|---|---|---|---|
| Privacy Policy | `Y7-WEBSITE/src/pages/PrivacyPolicy.jsx:44-49` | "This Privacy Policy is for informational purposes and does not constitute legal advice. Consult your own attorney for legal guidance." | Hardcoded JSX |
| Terms of Service | `Y7-WEBSITE/src/pages/Terms.jsx:53-58` | "These Terms are for informational purposes and do not constitute legal advice. Consult your own attorney for legal guidance." | Hardcoded JSX |
| Agreement page (`Agreement.jsx`) | — | **NOT PRESENT** | The broker-shipper / agreement page does NOT carry this disclaimer. |

**Verdict for A:** the disclaimer is confined to the two informational legal pages and does NOT bleed onto any binding contract. This is standard practice.

---

## B — CONTACT EMAILS

### B.1 Emails rendered ON the Privacy Policy page (all from i18n `privacy.json`)
| Email | file:line (representative) | Source |
|---|---|---|
| `privacy@y7agency.com` | `Y7-WEBSITE/src/locales/en/privacy.json:8, 67, 95, 129, 159, 173, 181` | i18n data |
| `info@y7agency.com` | `Y7-WEBSITE/src/locales/en/privacy.json:8, 181` | i18n data |
| `legal@y7agency.com` | `Y7-WEBSITE/src/locales/en/privacy.json:181` | i18n data |
| `arbitration-optout@y7agency.com` | `Y7-WEBSITE/src/locales/en/privacy.json:181` | i18n data |

> Note: the prompt asked about `arbitration-opt-out@`; the address actually used is **`arbitration-optout@y7agency.com`** (single hyphen). If a mailbox/alias is created, it must match this exact spelling, or the Terms/Privacy opt-out instruction will be unrouteable.

### B.2 Deduplicated list — every email the system displays or sends from

**`@y7agency.com` (own-domain):**

| Address | Class | Representative file:line | Usage |
|---|---|---|---|
| `info@y7agency.com` | **REAL mailbox (known)** | Site-wide: `Footer.jsx:120,124`, `Contact.jsx:47,62`, `index.html:35,63,95`, `privacy.json:181`, `terms.json:93,125`, `agreement.json:116`; TRANSPORT senders: `api/routes/admin_communications.py:144`, `api/routes/public.py:2170`, `api/routes/portal_auth.py:2335`, `.env.example:58,68` | Primary customer-facing sender + display, all locales |
| `dispatch@y7agency.com` | **REAL mailbox (known)** | `Y7-WEBSITE/src/pages/CareerApplication.jsx:113,151`, `public/llms.txt:68`; TRANSPORT: `.env.example:67`, `api/routes/portal_data.py:1547,1558` | Carrier communications sender + display |
| `privacy@y7agency.com` | **ROLE ALIAS — needs mailbox/alias** | `privacy.json:8,67,95,129,159,173,181`, `terms.json:93,99,104,125`, `agreement.json:83,116` (TRANSPORT `data/agreements_i18n/en/agreement.json:83,116`) | GDPR/data-protection contact (display only) |
| `legal@y7agency.com` | **ROLE ALIAS — needs mailbox/alias** | `privacy.json:181`, `terms.json:93,99,125`; TRANSPORT `data/agreements_i18n/en/agreement.json:116` | Legal / dispute-resolution contact (display only) |
| `arbitration-optout@y7agency.com` | **ROLE ALIAS — needs mailbox/alias** | `privacy.json:181`, `terms.json:93,104,125`, `agreement.json:95,116`; TRANSPORT `data/agreements_i18n/en/agreement.json:95,116` | Arbitration opt-out receipt (display only) — **inbound is the whole point; if it bounces, the opt-out clause is unworkable** |
| `admin@y7agency.com` | ROLE ALIAS — code/test only | TRANSPORT `api/dlq.py:25` (example), `tests/e2e/test_full_lifecycle.py:43` (fixture) | Not a displayed/sender address; appears only in an example + a test |
| `postmaster@y7agency.com` | Test fixture only | TRANSPORT `tests/test_email_hygiene_integration.py:170` | NDR test only — no production use |

**Other-domain / own-product addresses:**

| Address | Class | file:line | Note |
|---|---|---|---|
| `payments@y7dispatch.com` | **Uncertain — DIFFERENT domain** | TRANSPORT `.env.example:123`, `docs/PAYMENTS.md:80` | Zelle/ACH routing label. Note it is on **y7dispatch.com**, not y7agency.com — owner should confirm whether that domain/mailbox is real or is a stale reference. |

**Third-party `noreply@*` (INBOUND only — parsed, never sent from):** `noreply@airtable.com`, `noreply@centraldispatch.com` / `no-reply@centraldispatch.com` (`services/cd_notification_processor.py:20`), `no-reply@vertafore.com`, `no-reply@truckercert.com`, `noreply@goldwayinsurance.com`, `noreply@elitegroupins.com`, `noreply@hawksoft.app`, `techsupport@ringcentral.com`. These are senders the system *receives* from; not a Y7 routing concern.

**Real-person addresses found in data/reports (customers/carriers/test):** `sergiivorotyntsev@gmail.com` (owner/test), plus several carrier/customer gmail addresses appearing only in audit reports, `.audit/` logs, and test fixtures — operational data, not system contact points. (Privacy note: these are real personal emails sitting in committed report/log files.)

### B.3 Which addresses NEED a real mailbox/alias to receive mail
*(This audit does NOT assert whether they exist in M365 — owner must verify.)*
- `privacy@y7agency.com` — published GDPR contact; must receive.
- `legal@y7agency.com` — published legal/dispute contact; must receive.
- `arbitration-optout@y7agency.com` — published opt-out address; **must receive or the arbitration opt-out clause cannot be exercised.**
- `payments@y7dispatch.com` — if used for real ACH/Zelle routing, must resolve (and note the different domain).
- `info@y7agency.com`, `dispatch@y7agency.com` — known real mailboxes (already used as senders).

---

## C — DISCLAIMERS / DRAFT MARKERS ON AGREEMENTS

Agreement templates live in TRANSPORT `data/agreements_i18n/{en,pl,ru,ua}/agreement.json` (individual) and `agreement_dealer.json` (dealer); Y7-WEBSITE mirrors them in `src/locales/<lang>/`. The draft banner is NOT in the JSON text — it is computed by the backend renderer and rendered by the portal.

| Document | Audience | LIVE or draft | Disclaimer / draft markers found (file:line) | Risk |
|---|---|---|---|---|
| Individual / Broker-Shipper agreement (`data/agreements_i18n/en/agreement.json`, v2.0, eff. 2026-04-19) | Individual customers (S1/S2/S3) | **LIVE** | **NONE.** Grep for draft/evaluation/"not legal advice"/informational/"not binding"/"pending attorney"/"do not rely" → no matches. Only hit is `agreement.json:133 "placeholder": "Your Full Legal Name"` = a form-input hint, NOT a disclaimer. `is_draft=False` for non-dealer in renderer (`services/agreement_renderer.py:363`) and explicitly `is_draft = False` in legacy path (`api/routes/public.py:2030`). | **None** — clean, fully operative. |
| Dealer agreement (`data/agreements_i18n/en/agreement_dealer.json`, v1.1) | Licensed dealers | **LIVE (served), draft-banner by design** | Banner text in `services/agreement_renderer.py:273-278`: "This dealer agreement is a DRAFT pending attorney review. Signing is for evaluation purposes only — Y7 Logistics will issue a final v1.0 for re-signing once legal review is complete." Triggered by `is_draft = customer_type == "dealer"` (`agreement_renderer.py:363`). Rendered as a yellow banner in `Y7-WEBSITE/src/pages/portal/Onboarding.jsx:810-820`, gated on `template.is_draft && template.draft_warning`. | **Intentional / known.** This DOES say "for evaluation purposes only" — a real (by-design) weakening of the dealer agreement until v1.0 is finalized. Acceptable per current business decision, but it is a genuine enforceability caveat on the dealer contract specifically. |
| Dealer agreement v0.1 (`docs/agreements/dealer_agreement_v0.1_DRAFT.md`) | Dealers (attorney-review copy) | **NOT served** | Full "⚠️ LEGAL DRAFT NOTICE" + attorney notes throughout | None to customers — referenced only for audit/documentation in the template map; never rendered for signing. |
| Exporter agreement | Exporters | Not implemented (stub) | n/a | n/a |

### C.3 Direct answers
- **Individual "Review and sign" agreement:** carries **NO disclaimer and NO draft marker.** Verified by direct grep of `agreement.json` and the `is_draft = False` code paths (`public.py:2030`, `agreement_renderer.py:363`). Per project rule (LIVE signed agreement must have no draft banner), this **passes**.
- **Dealer agreement:** **DOES** show the "DRAFT — for evaluation" banner, as expected/by design. Text and gating verified at `agreement_renderer.py:270-282` and `Onboarding.jsx:810-820`. The decoupling rationale (signed-imperfect-agreement-is-still-a-shield) is documented for the *individual* path at `public.py:2023-2029`; the dealer path deliberately keeps `is_draft=True`.

---

## D — PLAIN-LANGUAGE VERDICT

The Privacy Policy "this is not legal advice / for informational purposes" line is **completely standard** CYA boilerplate. It sits in two hardcoded footers — the Privacy Policy and the Terms page — and nowhere else; it does **not** leak onto any contract a customer or dealer actually signs. Your fear that the disclaimer is "bleaking onto binding contracts" is **not borne out** — the binding agreement templates contain no such language.

The contact emails are **not fabricated or nonsensical**. `info@` and `dispatch@` are your two known real mailboxes (already used as senders). `privacy@`, `legal@`, and `arbitration-optout@` are **conventional role aliases** — normal for a privacy policy — but they are display-only addresses, so the open question is purely infrastructure: each must resolve to a real M365 mailbox or alias, or mail to them silently bounces. The arbitration opt-out address is the one that matters most legally, because the whole point of that clause is that a customer can mail it. Two small data notes: the address is spelled `arbitration-optout@` (no second hyphen), and `payments@y7dispatch.com` is on your *other* domain — verify both.

The only language that **does** weaken an agreement is on the **dealer** contract, which intentionally shows "DRAFT … for evaluation purposes only" until the attorney-reviewed v1.0 ships. That is a real, deliberate caveat scoped to dealers — not a leak. **The individual customer agreement that S1/S2/S3 customers sign is clean: no draft banner, no disclaimer, fully operative.** Nothing undermines the enforceability of the agreement your individual customers sign.

---

*Report path: `C:\dev\Y7-WEBSITE\docs\audits\LEGAL_DISCLAIMER_CONTACT_AUDIT.md`*
