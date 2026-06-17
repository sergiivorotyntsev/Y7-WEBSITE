# EMAIL-UNIFY FIX — Y7-WEBSITE

**Date:** 2026-06-16
**Scope:** Unify role-alias contact emails to `info@y7agency.com` across the public site + portal locales.
**Source of truth:** `docs/audits/LEGAL_DISCLAIMER_CONTACT_AUDIT.md` (section B), re-grepped to confirm.
**Mode:** local commits only — NOT pushed. Awaiting raw-diff review.

## Replacements applied
1. `legal@y7agency.com` → `info@y7agency.com`
2. `privacy@y7agency.com` → `info@y7agency.com`
3. `arbitration-optout@y7agency.com` → `info@y7agency.com`

(`payments@y7dispatch.com` does not appear in this repo — handled in TRANSPORT.)

## Files changed (REPLACED)
Only the **English** locale files contained these aliases. Address strings only — no clause wording, key, version, effective date, or whitespace touched.

| File | Lines (pre-edit) | Aliases replaced |
|---|---|---|
| `src/locales/en/agreement.json` | 83, 95, 116 | privacy@, arbitration-optout@ |
| `src/locales/en/privacy.json` | 8, 67, 95, 129, 159, 173, 181 | privacy@, legal@, arbitration-optout@ |
| `src/locales/en/terms.json` | 93, 99, 104, 125 | legal@, privacy@, arbitration-optout@ |

The contact blocks now repeat `info@y7agency.com` under their existing labels (e.g. `Legal: info@y7agency.com`), as intended — labels left unchanged per spec.

## Deliberately LEFT (with reason)
- **`src/locales/{pl,ru,ua}/*.json`** — already used `info@y7agency.com` only; **no role aliases present**, so nothing to change. (The pl/ru/ua legal pages were already consolidated to `info@`; this fix makes `en` consistent with them.)
- **`src/locales/*/agreement_dealer.json` (all langs, incl. en)** — already `info@` only at line 23. The original audit's claim that `agreement_dealer.json:23` held privacy@/arbitration-optout@ was **incorrect** (verified by direct grep).
- **`tmp/legal-t02-address.mjs`** — `tmp/` is gitignored (scratch script, not live code). Contains the four addresses but is never built/served. Left untouched.
- **`docs/audits/LEGAL_DISCLAIMER_CONTACT_AUDIT.md`** — historical audit record documenting the *old* state; not rewritten.

## Verification
- Re-grep of `src/` and whole repo (excl. node_modules, dist, tmp, the audit doc): **zero** remaining `legal@` / `privacy@` / `arbitration-optout@` / `payments@y7dispatch.com`.
- JSON validity: `agreement.json`, `privacy.json`, `terms.json` all parse (`python -c json.load` → OK).
- `npm run build`: see commit/run log.
- Agreement integrity: `agreement.json` still `v2.0`, effective `2026-04-19`, same clauses/sections — only email strings changed.

## Note for owner (infra, out of scope here)
Mail to `info@y7agency.com` must now reliably receive privacy / legal / arbitration-opt-out correspondence (it is the published address for all of them). No new aliases needed on the site side.
