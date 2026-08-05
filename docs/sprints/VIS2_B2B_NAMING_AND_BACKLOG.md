# VIS-2 — B2B naming, and what this sprint deliberately did not fix

**Date:** 2026-08-05 · **Branch:** `wip/vis-2-portal` · **Owner-ruled 2026-08-05.**

Written because three separate findings in VIS-2's Phase 0 were correct, real,
and **out of scope**, and an undocumented out-of-scope finding is indistinguishable
from one nobody noticed.

---

## 1. "dealer" is a historical name. The entity is B2B.

Y7 has two B2B customer types, `dealer` and `exporter`. A large part of the
system is named for the first and serves both. **The names are historical; the
entity is B2B.** They are NOT being renamed, on the owner's ruling and my
recommendation.

### What is misnamed but correct

| name | serves | evidence |
|---|---|---|
| `dealer_ledger` (table) | both | `exporter_billing.py:9` — *"the shared dealer_ledger (T0 verdict — one ledger universe)"* |
| `dealer_invoices` (table) | both | `portal_billing.py:60,144,167` serves it to `('dealer','exporter')` |
| `is_dealer` (API flag) | both | `portal_billing.py:31,76` — `False` only when the type is neither |
| `/api/portal/data/dealer-application` | both | per-type field sets since VER-1 (`194092c`) |
| `customers.has_dealer_license` | both | offered to exporters as optional, correctly worded |

### Why they stay

The shared ledger was **chosen**, not inherited by accident — `exporter_billing.py`
records it as the T0 verdict, "one ledger universe". Renaming the tables would be
a schema migration touching three billing modules at once (`dealer_billing.py`,
`exporter_billing.py`, `portal_billing.py`) plus the admin surfaces, to fix a
problem that costs a reader thirty seconds and a customer nothing.

**The rule for future work:** treat `dealer_*` in billing storage as meaning
*B2B*. If you are adding a gate, gate on `('dealer','exporter')` unless you have
a specific reason to exclude exporters — and if you do, say so at the call site.

### What was genuinely dealer-only and is correctly named

`/dealers`, `/dealer-quote`, `/dealer-auto-transport` — public marketing pages
about actual dealerships. **These rank in search and must not be touched.**

`auction-dealers` (`customers.py:895-938`, `portal_data.py:4625-4680`) — an
exporter's own US auction dealers. An exporter-only feature whose name refers to
a third party. Not a misnomer.

### What VIS-2 DID change

Only what a customer could see: the browser-tab title on the shared dashboard,
the Billing copy that named the wrong account type, and two toast strings.
Plus `DealerDashboard.jsx` → `B2BDashboard.jsx`, an internal component with one
import.

---

## 2. ~~BACKLOG~~ — CLOSED BY B2B-1 (2026-08-05): `dealer_billing.py` gates

**Resolved.** Kept rather than deleted, because the measurement below is what
made the case for the sprint, and the resolution is not what this entry assumed.

The owner's ruling was that the two-console split is **deliberate** — dealers in
`dealer_billing.py`, exporters in `exporter_billing.py` via the customer
profile's Billing tab — so the fix was **not** to widen the gates. Each operation
now names its owner and refuses out loud (409 naming the right console), the two
endpoints that returned `{"ok": true}` over an UPDATE matching zero rows now
check rowcount, and `deposit`/`adjust` — which had no gate at any layer — are
closed to dealers. `cost-report` stays wide on purpose and says so.

See TRANSPORT `wip/b2b-1`: `[B2B-1-T01]`, and `docs/sprints/B2B1_WALKTHROUGH.md`.

The original entry, for the record:

**Severity: real defect, affects daily operator work.** An admin action over an
exporter succeeds or silently finds nothing depending on which endpoint it hits.
Not in VIS-2; needs its own task.

`api/routes/dealer_billing.py` (TRANSPORT):

| line | endpoint | gate | exporter |
|---|---|---|---|
| `:62` | `GET /dealers` | `WHERE customer_type = 'dealer'` | **absent from the list** |
| `:76` | `GET /dealer/{customer_id}` | `AND customer_type = 'dealer'` | **not found** |
| `:122` | `PATCH /dealer/{id}/billing-mode` | `AND customer_type = 'dealer'` | **cannot be set** |
| `:164` | `PATCH /dealer/{id}/billing-cadence` | `IN ('dealer','exporter')` | works |
| `:414` | `GET /dealer/{id}/cost-report` | docstring says "dealer/exporter" | works |

So an operator can set an exporter's invoice **cadence** but not their billing
**mode**, and cannot open the exporter's own billing card from the dealer list at
all. Compare `portal_billing.py`, which gates `('dealer','exporter')` on all
eight customer-facing endpoints without exception — the customer-facing side is
already consistent and can serve as the model.

**The question for whoever picks this up** is which behaviour is intended:
whether exporters belong in the dealer billing admin at all (and the two
permissive gates are the bug), or whether they do (and three restrictive gates
are). That is a product decision, not a code cleanup, which is why this is a task
and not a patch.

---

## 3. BACKLOG — `customer_orders.dispatched_price_cents` reader precedence

Fixed in TRANSPORT under VIS-2 as a one-line reader change; the **column
consolidation itself remains its own sprint with its own gate**, per the brief's
§9. See the TRANSPORT commit for detail.

The short version: `services/customer_loads.py` preferred the
`customer_orders.dispatched_price_cents` column over the assignment link, while
`api/routes/portal_data.py` had deliberately abandoned that column in VIS-1
because order #287 carries `$10` with no assignment behind it. The same load
therefore showed `$10` on the dealer dashboard and no price on the order detail.
Precedence is now aligned; the duplicate columns are not consolidated.

---

## 4. BACKLOG — pre-existing `ReferenceError` on the document share-link button

`src/pages/portal/OrderDetail.jsx` — the document share-link handler references
`orderId`, which is not in scope in that component (the variable is `id`). eslint
reports it as `no-undef`; it is identical on `main` and predates this sprint.
The button throws when clicked.

Not fixed here: it is unrelated to the cabinet contract, and a drive-by fix would
ride an unrelated deploy. One-line change when someone picks it up.

---

## 5. BACKLOG — `PUT /api/customers/{id}` sets `billing_mode` with no type gate

**Found after Phase 0, during B2B-1's measurement of who writes the column.**
Not fixed; recorded because it is the third writer and the one nobody counted.

`api/routes/customers.py:420` (TRANSPORT) accepts `billing_mode` in
`CustomerUpdate` (`:65`, a `Literal` of four values) and folds it into a generic
`UPDATE customers SET {set_clauses} WHERE id = ?`. There is **no
`customer_type` predicate on it** — unlike `customer_type` itself two blocks
above, which is intercepted and routed through the type-change service. It is
reachable from the admin customer profile's edit form
(`EditCustomerForm.jsx:63`, `OverviewTab.jsx:261`).

So the writers of `customers.billing_mode` are:

| # | writer | can it write to an exporter? |
|---|---|---|
| 1 | `dealer_billing.py` billing-mode | no — dealers only, and since B2B-1 it says so |
| 2 | `customer_type_change.py:195` | only to reset it to `per_delivery` on leaving `dealer` |
| 3 | **`customers.py:420` PUT** | **yes — any type, any of the four values** |

This is how three production exporters (#9, #304, #305) carry
`prepay_manual_invoice`, a dealer-model value: writer 3 has no gate.

**Why it is only a backlog item.** Nothing reads it for them. Every behavioural
reader of `billing_mode` is already `customer_type === 'dealer'` — Y7-WEBSITE
`Dashboard.jsx:396`, `Profile.jsx:537` and `:670`, `AccountSetupBanner.jsx:62` —
and so is every place that DISPLAYS it (`Profile.jsx:534`, `Dashboard.jsx:362`).
The value is inert for a non-dealer today.

**The owner's decision (2026-08-05): do not clean the production values.** They
cause no harm, and a cosmetic data edit is risk without benefit.

**What is worth doing when someone picks this up:** gate writer 3, so the column
cannot acquire a dealer-model value on a non-dealer account in the first place.
The inertness is a property of today's readers, not a guarantee — the next
feature that reads `billing_mode` without checking the type inherits three
wrong values that nobody put there on purpose.
