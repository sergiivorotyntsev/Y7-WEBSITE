# Sprint LEGAL-ACCURACY — Report

## Legal framing

Y7 Consulting Inc. is a **licensed property broker** regulated by FMCSA under 49 CFR Part 371. Brokers arrange transport between shippers and motor carriers. They do not operate vehicles, do not carry cargo insurance, and do not carry BIPD insurance.

FMCSA requires brokers to file a **$75,000 surety bond (BMC-84)** as financial responsibility. That bond — not insurance — is the regulatory instrument that backs broker authority. Calling Y7 "insured" both misrepresents the regulatory structure and gives up a real differentiator: the bond is specific, verifiable, and credibility-building.

Insurance belongs on motor carriers, who file BIPD ($750,000 FMCSA-minimum) and cargo coverage at industry norms. Every reference to "insured" in Y7 copy is now scoped to **carriers**, not Y7.

---

## Summary

| # | Task | Status |
|---|---|---|
| T01 | Replace "Licensed & Insured" with "Licensed & Bonded FMCSA Broker" | done |
| T02 | Office address 1007 Chestnut St, Newton MA 02464 in schema + UI | done (CI safety-check updated) |
| T03 | Broker/carrier terminology audit | verified — 0 hits |
| T04 | BMC-84 bond as SEO/trust signal | done (VerificationStrip + About + meta) |
| T05 | Verify + push + report | this file |

---

## T01 — Licensed & Bonded rollout

Changes across **4 locales** each (en / ru / pl / ua):

| File | Key | Before → After (EN) |
|---|---|---|
| `about.json` | `heroH1` | "Licensed & Insured Auto Transport Broker" → "Licensed & Bonded FMCSA Auto Transport Broker" |
| `home.json` | `hero.description` | "Licensed and insured broker connecting you..." → "Licensed FMCSA broker connecting you with vetted, insured carriers..." (moved "insured" to where it belongs — the carriers) |
| `home.json` | `whyY7.licensedTitle` | "Licensed & Insured" → "Licensed & Bonded" |
| `home.json` | `whyY7.licensedDesc` | "Fully licensed property broker" → "Licensed property broker with \$75,000 BMC-84 surety bond" |
| `common.json` | `meta.homeDescription` (EN only) | "...real-time tracking, fully insured." → "...real-time tracking. \$75,000 BMC-84 surety bond." |

Post-edit grep for `Licensed.*Insured` / `fully insured`: **0 Y7-applied matches** in `src/`. The only remaining `insured` reference is `"licensed, insured carriers"` in `faq.json` — which is factually correct (carriers are insured, we are bonded).

---

## T02 — Address correction

**Canonical public address**: `1007 Chestnut St, Newton, MA 02464, USA`.
**Forbidden on public site**: `6 Harding Rd, Natick MA 01760` (that is the FMCSA registered filing address / agent of record, not Y7's office).

### CI guardrail flipped

`.github/workflows/safety-check.yml` previously had two steps that **blocked** `1007 Chestnut` and `02464`. Those rules were obsolete (policy flipped — the office address is now intended public). Replaced with the inverse guard: the FMCSA filing address strings (`6 Harding` / `Natick` / `01760`) must never appear in `src/`, `index.html`, or public assets.

### Files updated

| Location | Change |
|---|---|
| `index.html` LocalBusiness JSON-LD | `postalCode: "02458"` → `02464`, added `streetAddress: "1007 Chestnut St"` |
| `src/pages/Home.jsx` MovingCompany JSON-LD | added `streetAddress` + `postalCode` |
| `src/pages/Contact.jsx` | rendered address block now includes `{streetLine}` above `{cityLine}` |
| `src/locales/{en,ru,pl,ua}/common.json` | `contact.address.streetLine` added, `cityLine` ZIP → 02464 |
| `src/locales/en/terms.json` | `intro` updated to "principal offices at 1007 Chestnut St...". `section12.body` updated to prepend full address line. |
| `src/locales/en/privacy.json` | `section1.body` updated to "Principal place of business: 1007 Chestnut St..." |
| `public/llms.txt` | header updated to full office address + BMC-84 bond mention |

Grep coverage of `1007 Chestnut` / `02464`: **13 hits across 7 files** (schema, Contact, common × 4, Home, terms, privacy). Non-EN terms/privacy translations don't carry the long-form body fields yet — they inherit from EN at runtime.

---

## T03 — Broker vs carrier terminology

Grep for `Y7.*is a carrier`, `we are a carrier`, `we operate.*vehicles`, `we operate.*trucks` returned **0 matches**. Y7 is consistently referred to as:
- "FMCSA-licensed broker" / "licensed property broker" / "licensed property broker, not a motor carrier"
- MC #1741537 + USDOT #4427359 authority references

Carrier references use: "vetted carriers", "licensed, insured carriers", "verified carriers" — all factually correct (motor carriers DO file BIPD + cargo insurance). Legal docs (Terms intro, agreement.json section1, agreement_dealer broker acknowledgment) explicitly state Y7 is a broker, not a carrier.

---

## T04 — Bond as SEO signal

### VerificationStrip (bottom of Home + Contact)

Added a caption row below the three verification links:

> BMC-84 Surety Bond: \$75,000 · Broker Authority: ACTIVE

(Localized for RU/PL/UA.) This is a spec-sheet credential line — sits under the FMCSA / broker-detail / Central Dispatch links without cluttering the strip.

### About page — whyPoints[0] "Licensed Broker" card

Description extended to carry the full credential set on the trust card that already introduces MC/USDOT numbers:

> FMCSA-registered auto transport broker. MC #1741537 · USDOT #4427359 · BMC-84 surety bond \$75,000 · Broker authority ACTIVE.

(Localized for RU/PL/UA.)

### EN meta descriptions

- `meta.aboutDescription` — "Licensed & bonded FMCSA auto transport broker... \$75,000 BMC-84 surety bond."
- `meta.contactDescription` — street address + "Licensed & bonded FMCSA broker, responses within 1 hour."

Non-EN meta left unchanged — "bonded" translates awkwardly ("з заставою / z gwarancją / с облигацией") and reads better on the trust cards than in SERP snippets.

---

## What stays (intentionally)

- `"licensed, insured carriers"` in FAQ answer — correct (carriers ARE insured)
- `"FMCSA-licensed broker"` phrasing — "licensed" IS regulator-correct language (FMCSA grants "operating authority" sometimes called "license")
- MC / USDOT references everywhere — critical trust signals
- Legal doc phrasing in Terms / Agreement — already accurate ("licensed property broker, not a motor carrier")

---

## Post-deploy QA checklist

1. **About page hero** — should read "Licensed & Bonded FMCSA Auto Transport Broker" (and RU/PL/UA equivalents).
2. **Home trust section** — the "Licensed & Insured" card title is gone; now "Licensed & Bonded" with "\$75,000 BMC-84 surety bond" in the description.
3. **Home / Contact verification strip** — bottom caption reads "BMC-84 Surety Bond: \$75,000 · Broker Authority: ACTIVE".
4. **View page source for Home or About** — the `<script type="application/ld+json">` LocalBusiness/MovingCompany block should contain `"streetAddress": "1007 Chestnut St"` and `"postalCode": "02464"`.
5. **Contact page registered-office block** — five lines: "Y7 Consulting Inc / d/b/a Y7 Logistics / 1007 Chestnut St / Newton, MA 02464 / United States".
6. **Terms page** — intro paragraph names "1007 Chestnut St, Newton, Massachusetts 02464". Section 12 contact block lists the same.
7. **Privacy page** — section 1 controller block lists the full address.
8. **Google Search Console → Request Indexing** — home, about, contact, terms, privacy. Schema updates take 2-6 weeks to reflect in Google's LocalBusiness knowledge panel.

---

## Commits

```
42ed53a [LEGAL-T04] seo: add $75,000 BMC-84 bond as trust/SEO signal where appropriate
ae2b707 [LEGAL-T03] chore: verify broker vs. carrier terminology correctness site-wide
d6f7bbe [LEGAL-T02] fix: use office address 1007 Chestnut St Newton MA 02464 in schema + visible UI
034f4ca [LEGAL-T01] fix: replace "Licensed & Insured" with "Licensed & Bonded FMCSA Broker" globally
```
