# VIS-2-T03 — the executed walkthrough: sheet MC to the customer's screen

**Date:** 2026-08-05 · **Branches:** `wip/vis-2-portal` (Y7-WEBSITE), `wip/vis-2-transport` (TRANSPORT)

Executed, not asserted. Every result below came from running the stack.

---

## Environment, and the safety statement first

| piece | what ran |
|---|---|
| database | **local** `postgresql://localhost:5432/y7_qa_local` |
| TRANSPORT API | `uvicorn api.main:app --port 8000`, from the `TRANSPORT-vis2` worktree |
| Y7-WEBSITE | `vite dev` on `:5173`, `VITE_API_URL=http://127.0.0.1:8000`, branch `wip/vis-2-portal` |
| seed | `scripts/dev/vis2_seed_walkthrough.py` (new, guards against a production DSN) |
| driver | Playwright (`docs/sprints/vis2-walkthrough/vis2_walkthrough.mjs`) + HTTP against the API |

**PRODUCTION WAS NOT WRITTEN TO.** `TRANSPORT/.env` points `DATABASE_URL` at Railway
(`switchback.proxy.rlwy.net/railway`) — that is production. The `TRANSPORT-vis2` worktree has
**no `.env`**, `api/main.py` loads dotenv with `override=False`, and `db/connection.py` carries its
own refuse-production guard. One read-only probe was made against production to copy load
`730CHEVO1`'s real shape, with `SET default_transaction_read_only = on` issued first. No write of
any kind reached Railway.

## The load

`730CHEVO1`, reproduced from production exactly: `POSTED`, customer **305 IMPERIAL AUTO — an
exporter**, `dispatch_loads.price_cents` NULL, no carrier, no assignment, and a CD dispatch record
carrying `BALTIC MOTORS LLC` / `MC01072283` / **44000 cents** from `dispatch_sheet_pdf`.

Two properties of this load shaped the walkthrough:

- **`BALTIC MOTORS LLC` is deliberately not seeded into `carriers`.** Its absence *is* step 1.
- **There is no `customer_orders` row**, so it is an email-pipeline load. It reaches the customer
  through `GET /api/portal/data/all-loads` and appears on the **B2B dashboard** — there is no order
  detail page for it. Step 5 is therefore checked there. Inventing an order to produce an order page
  would have been inventing a scenario the brief did not describe.

---

## Step-by-step

### 1. The assign modal offers to create BALTIC MOTORS LLC from the sheet MC — **PASS**

`GET /api/board/loads/730CHEVO1/assign-prefill`:

```json
"carrier_match": {
  "how": "not_in_registry",
  "detail": "Central Dispatch says 'BALTIC MOTORS LLC' (MC MC01072283) — not in your carrier registry",
  "cd_name": "BALTIC MOTORS LLC", "cd_mc": "MC01072283" },
"price": { "value": 44000, "source": "cd_dispatch_sheet" }
```

### 2. Created unvetted, with its provenance recorded — **FAILED, THEN FIXED**

As first run: `POST /api/carriers` → carrier created `tier: "backlog"` (unvetted, correct), **but
with no MC, no `source` and no identity row** — the modal dropped the MC it had just shown the
operator.

**Fixed on the owner's instruction before merge**, TRANSPORT `[VIS-2-T08] 3b574ccf`. Re-run:

```
carriers      : mc_number '1072283' (normalised), source 'cd_dispatch_sheet', tier 'backlog'
identity graph: mc_number = 1072283, source cd_dispatch_sheet, confidence 0.9, is_verified false
                {"observed_mc_verbatim": "MC01072283", "load_id": "730CHEVO1", ...}
```

**Step 2 now passes on both halves.** Detail in the finding below, kept rather than deleted because
the measurement is the argument for the fix.

### 3. The signal applies; carrier and price land; **the status does not change** — **PASS**

`POST /api/cd-prices/730CHEVO1/apply`:

```json
{"ok": true, "applied": {"carrier": "BALTIC MOTORS LLC", "carrier_id": 5,
                         "price_cents": 44000, "status_unchanged": "POSTED"}}
```

Database before and after: `dispatch_loads.status = 'POSTED'` both times. The load gained
`carrier_id`/`carrier_name`; a `carrier_assignments` row was written with `price_cents = 44000` and
`status = 'assigned'` (not `'dispatched'` — the two records of one fact agree).

### 4. The board shows the carrier and the dispatched price, correctly labelled — **NOT DRIVEN**

See "what could not be driven" below. The data the board reads was verified at the API; the
rendering was not.

### 5. The customer's cabinet shows the same price and carrier, **and nothing more** — **PASS**

Rendered (Playwright, `vis2-step5-cabinet-after-assignment.png`):

```
Carrier: BALTIC MOTORS LLC
$440 carrier
```

The payload assertion the brief asks for — absent from the response, not merely unrendered:

| field | present in `/all-loads` payload |
|---|---|
| `carrier_phone` | **false** |
| `carrier_mc` | **false** |
| `cd_carrier_mc` | **false** |
| `cd_carrier_name` | **false** |
| `margin` | **false** |
| `internal_status` | **false** |

**Before** the assignment the same row read `Carrier not assigned yet` / `Not priced yet`
(`vis2-step5a-cabinet-before-assignment.png`); after it, both phrases are gone from the page. The
words appear only while they are true.

### 6. The dates render, labelled as scheduled for the assignment — **PASS**

```
Pickup Aug 10, 2026 · Delivery Aug 14, 2026
These are the dates Y7 arranged with the carrier; they can change — Y7 is a broker
and does not control the carrier's schedule.
```

`date_source: "y7"` in the payload. Nothing claims the carrier gave us these dates.

**One honest note on how the dates got there.** The signal-apply path writes carrier and price and
**no dates at all** — after step 3 the assignment's `scheduled_*` and `eta_*` columns were all NULL.
The dates above are the operator's own, written directly to the assignment as the assign modal
would. That is consistent with VIS-1 §V8: the carrier's own committed dates are stored nowhere, and
capturing them is FUL-1's work.

---

## FINDING — the modal showed the operator an MC and then threw it away

**FIXED before merge**, on the owner's instruction, in TRANSPORT `[VIS-2-T08] 3b574ccf`. The
finding is kept as written because the measurement below is what justified fixing it rather than
backlogging it.

`web/src/components/board/CarrierAssignModal.jsx:384` displays `prefill.cd_carrier_mc` — the
operator is shown *"MC01072283"* and told the carrier is not in the registry. They click create, and
line 167 sends:

```js
body: JSON.stringify({ name: newName.trim() }),
```

**The name only.** The MC that justified the whole offer is not written to the new carrier, and no
`source`/provenance is recorded: after creation, `carriers.source` is NULL and
`carrier_identity_graph` holds no row for it.

So the brief's step 2 — *"the carrier is created unvetted **with its provenance recorded**"* — is
half true. Unvetted, yes. Provenance, no.

This matters beyond tidiness. VIS-1's headline was that **37 of 77 sheet carriers already exist in
the registry under the same name with no MC stored**, so an MC-digits gate is a rubber stamp for
them. Every carrier this modal creates adds another MC-less row to that population — the modal is
actively producing the condition that makes future dedup impossible, while holding the MC in its
hand.

**Verification caveat on the original finding, stated plainly:** I created the carrier by calling
`POST /api/carriers` myself, because the admin UI would not render (below), and I passed
`mc_number` explicitly — so *that* carrier had one. The defect was read from the modal's source,
not observed in the running UI.

**What the fix changed, measured against a running stack:**

```
before  POST {name}                          -> duplicate created, silently
after   POST {name, mc_number, source, load} -> 409 "the same MC number",
                                                candidate #7, strength strong
```

including VIS-1 §V6's exact collision shape — a second create under a *different* name spelling and
a *different* MC spelling (`BALTIC MOTORS` / `1072283` against `BALTIC MOTORS LLC` / `MC01072283`)
now returns 409 matched on `mc_number`. Before, neither was catchable, because the MC never reached
`find_probable_duplicates`.

The MC is attached **only when the typed name matches CD's company** (case- and
whitespace-insensitive, nothing cleverer). A near-miss such as VIS-1's measured
`B & B Transport Services` against CD's `J&B Transport Services LLC` sends no MC and creates a
name-only carrier exactly as before — a test pins that path so it cannot be "improved" into
fuzziness.

**Still true, and still unobserved in the UI:** the modal's own rendering was never driven (below),
so the fix is verified at the endpoint the modal calls and by three unit tests, not by clicking the
button.

## What could not be driven, and what is missing

**The admin board UI (steps 1 and 4 through a browser).** The admin `vite` dev server started
cleanly on `:3000` and served the app, but every board route rendered an empty `#root`, with
`net::ERR_INSUFFICIENT_RESOURCES` loading modules; the browser then wedged and had to be abandoned.
This is an environment/resource limit on this machine, not an application error — `/` (Documents)
rendered fine, and the same API served correct data throughout.

What I did instead, and its limit: steps 1, 2 and 3 were driven against **the exact endpoints the
modal and board call** (`assign-prefill`, `POST /api/carriers`, `cd-prices/{id}/apply`), with an
authenticated admin session. That verifies the data and the behaviour. **It does not verify the
rendering**, so step 4 — "the board shows the carrier and the dispatched price, correctly labelled"
— is **unverified**, and step 1 is verified as data rather than as a modal.

To close it, someone needs the admin panel to render on a machine with more headroom.

## A wrong turn, recorded because it looks like a defect and is not

My first attempt at step 3 used `PATCH /api/board/loads/{id}/assign-carrier`. The load went
`POSTED → ASSIGNED`, which reads as a direct violation of "the status does not change".

It is not. That is the **generic board assign**, where a status transition is the point.
`services/cd_price_apply.py` documents the distinction in its own header: the signal-apply path
*"deliberately does not touch the load's status"* (CLAUDE.md rule 9) and writes the assignment
`status='assigned'` rather than `'dispatched'`, precisely so the two records of one fact do not
disagree. Re-run through the correct path, the status held at `POSTED`.

Recorded because a future reader running the same command will see the same thing and reach for a
fix that is not needed.

## Artifacts

- `docs/sprints/vis2-walkthrough/vis2-step5a-cabinet-before-assignment.png`
- `docs/sprints/vis2-walkthrough/vis2-step5-cabinet-after-assignment.png`
- `docs/sprints/vis2-walkthrough/vis2-step6-dates-and-note.png`
- `docs/sprints/vis2-walkthrough/vis2_walkthrough.mjs` — the Playwright driver
- `TRANSPORT wip/vis-2-transport: scripts/dev/vis2_seed_walkthrough.py` — the seeder
