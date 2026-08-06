import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OnboardingBanner from '../../components/OnboardingBanner';
import PageMeta from '../../components/PageMeta';
import VerificationBanner from '../../components/VerificationBanner';
import { portalFetch } from '../../hooks/useAuth';
import { keyframes } from '../../theme';
import { formatLoadDate } from '../../utils/loadDates';
import { progressFor } from '../../utils/loadStatus';
import {
  CARRIER_NOT_ASSIGNED, PRICE_NOT_SET, DATE_NOTES, moneyFromCents, formatCdDispatch, CD_ATTRIBUTION,
} from '../../utils/loadVocabulary';
import pp from '../../styles/v2/portal.module.css';
import v2b from '../../styles/v2/buttons.module.css';

// DEALER-DASH-S1-T03 — Dealer/Exporter HOME: loads dashboard.
// Block 1 (Loads) is the live surface. The former Money/Documents "coming
// soon" placeholders were removed (EXP-P1): no placeholder stands in for a
// real feature. The live Money summary lands with the billing work (Phase 4),
// where the exporter billing gate is also opened.
//
// CAB-LOADS T01/T02/T03 — the list now comes from /api/portal/data/all-loads,
// which merges BOTH sources: portal orders (customer_orders) and
// email-pipeline loads (dispatch_loads), deduplicated on dispatch_load_id.
// The incident: Imperial Auto had five loads and saw one, because this page
// only ever read the orders table. Measured repo-wide, 733 loads were
// invisible to their owner.
//
// Status comes from the SERVER (services/load_status_vocabulary.py) as
// `status`/`label`/`phase`; this page renders it and does not map it.

const STATUS_FILTERS = [
  // Default is ACTIVE, deliberately. DaytonaCargo has 729 ARCHIVED loads: if
  // the cabinet opened on "all", anything live would drown. Closed work stays
  // one click away, never gone.
  { value: 'active', label: 'Active loads', group: 'active' },
  { value: 'POSTED', label: 'Posted', group: 'all' },
  { value: 'DISPATCHED', label: 'Dispatched', group: 'all' },
  { value: 'DELIVERED', label: 'Delivered', group: 'all' },
  { value: 'closed', label: 'Closed', group: 'closed' },
  { value: 'all', label: 'All loads', group: 'all' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first', col: 'created_at', dir: 'desc' },
  { value: 'oldest', label: 'Oldest first', col: 'created_at', dir: 'asc' },
  { value: 'status', label: 'By status', col: 'status', dir: 'asc' },
  { value: 'price_high', label: 'Price: high → low', col: 'price', dir: 'desc' },
  { value: 'price_low', label: 'Price: low → high', col: 'price', dir: 'asc' },
];

// CAB-LOADS T03 CHOSE SILENCE FOR ABSENT VALUES. VIS-2-T02 REVERSES THAT, ON
// THE OWNER'S RULING (2026-08-05). The reversal is written here rather than
// applied quietly, because the original was a deliberate, reasoned decision and
// the next reader is entitled to know it was overruled and why.
//
// WHAT T03 DECIDED, and it was not careless:
//   "`cents == null` returns null and the caller renders NOTHING. A missing
//    price must never appear as '$0.00': a zero that means 'unknown' is this
//    codebase's recurring defect, and with prices populated on roughly 1% of
//    loads today it would be the overwhelmingly common case.
//    Absent is honest; $0.00 is a claim."
//
// WHAT SURVIVES: the whole of the argument against "$0.00". A zero is still a
// claim, moneyFromCents still returns null rather than a fabricated zero, and
// nothing below ever prints $0 for an unknown price. T03 was right about that
// and this commit does not touch it.
//
// WHAT WAS WRONG: "absent is honest" held only against $0.00, and was measured
// against the wrong alternative. Rendering NOTHING is not the honest option, it
// is the third one. To a customer, an empty space where other rows show a price
// is indistinguishable from "this screen does not have that field" — so the
// silence that was meant to avoid a false claim instead avoided making any
// statement at all, and the customer could not tell "no carrier yet" from "not
// shown here". Phase 0 measured the cost: three surfaces, three different
// silences, none of them readable as a fact.
//
// WHAT REPLACES IT: words. "Carrier not assigned yet", "Not priced yet" — one
// wording, decided once, in utils/loadVocabulary.js, used by every surface.
// Absent is now SAID, not implied by a gap. $0.00 remains forbidden.
//
// Money still crosses the wire in integer cents and is converted at the UI
// boundary, never in the API and never in the database. moneyFromCents moved to
// the shared module unchanged so the dealer dashboard and the order pages
// cannot format the same number two ways.

// Calendar-day formatting lives in utils/loadDates.js so it can be regression-
// tested across timezones — see the off-by-one it exists to prevent.
const formatDate = formatLoadDate;

function UnifiedProgress({ progress }) {
  const { stages, index, terminal, label } = progress;
  if (terminal) {
    return (
      <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-red-deep, #a90918)', padding: '8px 0' }}>
        This load is {label.toLowerCase()}.
      </div>
    );
  }
  if (!stages.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '8px 0' }}>
      {stages.map((s, i) => {
        const done = i < index;
        const current = i === index;
        return (
          <span key={s.key} style={{
            fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', fontWeight: current ? 700 : 500,
            color: current ? '#f4f0e8' : done ? 'var(--v2-ink, #050607)' : 'var(--v2-ink-muted, #5c5851)',
            background: current ? 'var(--v2-ink, #050607)' : done ? 'var(--v2-card-cream, #fffaf1)' : 'transparent',
            border: `1px solid ${current ? 'var(--v2-ink, #050607)' : 'var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))'}`,
            padding: '3px 8px', borderRadius: '10px', whiteSpace: 'nowrap',
          }}>
            {done ? '✓ ' : ''}{s.label}
          </span>
        );
      })}
    </div>
  );
}

function LoadRow({ load, expanded, onToggle }) {
  const vehicle = [load.vehicle_year, load.vehicle_make, load.vehicle_model]
    .filter(Boolean).join(' ') || load.vin || 'Vehicle TBD';
  const route = [load.pickup, load.delivery].filter(Boolean).join(' → ');
  const loadId = load.load_id || (load.order_id ? `#${load.order_id}` : '—');
  const u = progressFor(load);

  const listed = moneyFromCents(load.listed_price_cents);
  const carrierPrice = moneyFromCents(load.carrier_price_cents);
  // EXB-1-T01. NOT a fallback for carrierPrice — a separate fact with a
  // separate subject. The server suppresses it the moment an assignment exists,
  // so the two are never both present; the render below still keeps them in
  // different branches rather than relying on that, because a display that
  // would show CD's number in Y7's place is the defect even if today's data
  // never triggers it (rule 25b — a zero exposure count proves nothing).
  const cd = formatCdDispatch(load);
  const pickupDate = formatDate(load.pickup_date);
  const deliveryDate = formatDate(load.delivery_date);
  const actualPickup = formatDate(load.actual_pickup_date);
  const actualDelivery = formatDate(load.actual_delivery_date);
  const hasDates = pickupDate || deliveryDate || actualPickup || actualDelivery;

  return (
    <div style={{ borderBottom: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        style={{
          width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
          cursor: 'pointer', padding: '16px 20px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', gap: '12px',
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', fontWeight: 600, color: 'var(--v2-ink, #050607)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {vehicle}
          </div>
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <span className={pp.mono} style={{ marginRight: '8px' }}>{loadId}</span>
            {route && <span>{route}</span>}
          </div>
          {/* VIS-2-T02: absent is SAID. The gap this replaces could not be told
              apart from "this screen has no carrier field".
              BUT ONLY WHILE THE LOAD IS LIVE: "not assigned YET" is a claim
              about the future, and on a closed load it is simply false —
              something carried that vehicle, and we are looking at a record
              that does not name it. Silence is right there and words are not,
              which is why this reads `load.active` rather than always
              printing the phrase. */}
          {load.carrier_name ? (
            <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink, #050607)', marginTop: '4px' }}>
              Carrier: {load.carrier_name}
            </div>
          ) : cd?.carrier ? (
            /* EXB-1-T01: CD's carrier, and it is NOT in the Carrier field.
               "Carrier: X" means Y7 engaged them and owes them money; this
               means Central Dispatch observed them on the load. The label and
               the date carry that difference — the board's formatCdCarrier
               makes the identical distinction for the operator. */
            <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '4px' }}>
              {cd.carrier} · {CD_ATTRIBUTION}, {cd.asOf}
            </div>
          ) : load.active ? (
            <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '4px', fontStyle: 'italic' }}>
              {CARRIER_NOT_ASSIGNED}
            </div>
          ) : null}
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span className={u.terminal ? pp.chipRed : pp.chipInk}>
            {u.label}
          </span>
          {/* CAB-LOADS T03: both prices the owner asked for. No zero standing
              in for unknown — that part of T03 stands.
              VIS-2-T02 splits the two prices, which T03 treated alike:
              LISTED is what we first advertised. A load that was never listed
              never had one, so its absence is not a pending value and there is
              nothing to promise. It stays omitted.
              CARRIER is the dispatched price — the number this sprint exists to
              surface. On a live load its absence means "we do not know yet",
              which is a fact and is now said. Same `load.active` reasoning as
              the carrier name above. */}
          {listed && (
            <div className={pp.mono} style={{ marginTop: '4px' }}>
              {listed}
              <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: 'var(--v2-ink-muted, #5c5851)' }}> listed</span>
            </div>
          )}
          {carrierPrice ? (
            <div className={pp.mono} style={{ marginTop: '1px' }}>
              {carrierPrice}
              <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: 'var(--v2-ink-muted, #5c5851)' }}> carrier</span>
            </div>
          ) : cd ? (
            /* EXB-1-T01: the price the BOARD has had all along, now on the
               customer's screen — attributed and dated, never merged with ours.
               It is deliberately NOT styled like the figure above it: that one
               is Y7's own agreed price and this one is somebody else's report,
               and a customer must be able to tell which he is reading. */
            <div style={{ marginTop: '1px' }}>
              <span className={pp.mono}>{cd.price}</span>
              <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: 'var(--v2-ink-muted, #5c5851)' }}>
                {CD_ATTRIBUTION}, {cd.asOf}
              </div>
            </div>
          ) : load.active ? (
            <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '4px', fontStyle: 'italic' }}>
              {PRICE_NOT_SET}
            </div>
          ) : null}
        </div>
      </button>
      {expanded && (
        <div style={{ padding: '0 20px 16px' }}>
          <UnifiedProgress progress={u} />

          {hasDates && (
            <div style={{ marginTop: '4px' }}>
              <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink, #050607)' }}>
                {actualPickup
                  ? <>Picked up {actualPickup}</>
                  : pickupDate && <>Pickup {pickupDate}</>}
                {(actualPickup || pickupDate) && (actualDelivery || deliveryDate) && ' · '}
                {actualDelivery
                  ? <>Delivered {actualDelivery}</>
                  : deliveryDate && <>Delivery {deliveryDate}</>}
              </div>
              {/* Only scheduled dates carry the caveat. An ACTUAL date is a
                  record of something that happened and needs no disclaimer. */}
              {(!actualPickup || !actualDelivery) && load.date_source && (
                <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '2px', maxWidth: '52ch' }}>
                  {DATE_NOTES[load.date_source]}
                </div>
              )}
            </div>
          )}

          {/* Email-pipeline loads have no portal order behind them, so there is
              no detail page to link to. CAB-LOADS T01 is read-only: no upload,
              no cancel, no message on those. Display and status only. */}
          {load.order_id ? (
            <Link to={`/portal/order/${load.order_id}`} style={{ display: 'inline-block', marginTop: '8px', fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink, #050607)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
              View full details &amp; timeline &rarr;
            </Link>
          ) : (
            <div style={{ marginTop: '8px', fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)' }}>
              Booked by email. Reply to your Y7 thread, or contact dispatch, for anything on this load.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function B2BDashboard({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // CAB-LOADS T01: default ACTIVE. See STATUS_FILTERS for why.
  const [statusFilter, setStatusFilter] = useState('active');
  const [sortValue, setSortValue] = useState('newest');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const buildQuery = useCallback(() => {
    const p = new URLSearchParams();
    p.set('limit', '0'); // all of this dealer's loads
    const f = STATUS_FILTERS.find(o => o.value === statusFilter) || STATUS_FILTERS[0];
    p.set('status_group', f.group);
    const s = SORT_OPTIONS.find(o => o.value === sortValue) || SORT_OPTIONS[0];
    p.set('sort', s.col);
    p.set('order', s.dir);
    return p.toString();
  }, [statusFilter, sortValue]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    // CAB-LOADS T01: the merged list — portal orders AND email-pipeline loads,
    // deduplicated server-side on customer_orders.dispatch_load_id.
    portalFetch(`/api/portal/data/all-loads?${buildQuery()}`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          setOrders(data.items || []);
          setCounts(data.counts || null);
          setError(null);
        }
      })
      .catch(() => { if (!cancelled) setError('Failed to load your loads. Please refresh.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [buildQuery]);

  const visible = useMemo(() => {
    // A specific displayed status (Posted / Dispatched / Delivered) is fetched
    // as the "all" group and narrowed here; the active/closed/all groups are
    // already narrowed by the server.
    const f = STATUS_FILTERS.find(o => o.value === statusFilter);
    const byStatus = f && !['active', 'closed', 'all'].includes(f.value)
      ? orders.filter(o => o.status === f.value)
      : orders;
    const q = search.trim().toLowerCase();
    if (!q) return byStatus;
    return byStatus.filter(o => {
      const hay = [
        o.vehicle_year, o.vehicle_make, o.vehicle_model,
        o.load_id, o.vin, o.pickup, o.delivery, o.carrier_name, o.label,
      ].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [orders, search, statusFilter]);

  const isExporter = user?.customer_type === 'exporter';

  return (
    <div className={pp.shell}>
      {/* VIS-2-T05: "Dealer Dashboard" was the ONE dealer-worded string on this
          page that a customer actually saw — in the browser tab and the meta
          description — and half the accounts reading it are exporters, who are
          not dealers and have their own agreement, billing and document flow.
          Customer 305 (IMPERIAL AUTO) is one of them (TRANSPORT ADR-012).
          Neutral rather than type-switched: the account badge in the header
          already says "Exporter Account" / "Dealer Account", so the tab does
          not need to, and a title that claims a type is the thing that was
          wrong here. Matches the individual dashboard's title on the same
          route. */}
      <PageMeta title="My Dashboard" description="Monitor your loads, costs, and documents in one place." path="/portal/dashboard" />
      <style>{keyframes}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className={pp.pageTitle}>
              Welcome back, {user?.name?.split(' ')[0] || 'there'}
            </h1>
            <span className={pp.chipInk} style={{ whiteSpace: 'nowrap' }}>
              {isExporter ? 'Exporter Account' : 'Dealer Account'}
            </span>
          </div>
        </div>
        <button onClick={() => navigate('/portal/new-order')} className={v2b.cta}>New Order</button>
      </div>

      {/* FX-3: dealers/exporters render this dashboard (not the individual one
          that previously held the banner), so the under-review / trial-quote
          status must surface here too. Self-suppresses when verified. */}
      <VerificationBanner />

      {/* AGR-2-T03: the freed exporter lands HERE now (the redirect trap is
          gone) — the honest being-prepared notice self-suppresses for
          everyone else, and turns into the finish-setup CTA for ordinary
          unsigned accounts (which the redirect normally intercepts). */}
      <OnboardingBanner />

      {/* CO3W-T06: Certificate of Origin entry — exporters only. */}
      {isExporter && (
        <div className={pp.card} style={{
          display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <strong style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--v2-ink, #050607)' }}>
              Certificate of Origin
            </strong>
            <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink-muted, #5c5851)' }}>
              0% EU duty for US-manufactured vehicles — check a VIN in seconds.
            </div>
          </div>
          <Link to="/portal/co" style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', fontWeight: 600, color: 'var(--v2-ink, #050607)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            CO requests →
          </Link>
          <Link to="/portal/co/companies" style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', fontWeight: 600, color: 'var(--v2-ink, #050607)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            My companies →
          </Link>
        </div>
      )}

      {/* Loads */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>

        <div style={{ gridColumn: '1 / -1' }}>
          <h2 className={pp.sectionTitle} style={{ marginBottom: '12px' }}>
            Your Loads
            {/* CAB-LOADS T01: with the default filter set to active, the closed
                count must be VISIBLE — a toggle nobody knows about is the same
                as hiding the work. */}
            {counts && counts.closed > 0 && statusFilter === 'active' && (
              <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--v2-ink-muted, #5c5851)', marginLeft: '8px' }}>
                {counts.active} active ·{' '}
                <button
                  type="button"
                  onClick={() => setStatusFilter('closed')}
                  style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px', cursor: 'pointer' }}
                >
                  {counts.closed} closed
                </button>
              </span>
            )}
          </h2>

          {/* filter / sort / search */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search vehicle, load ID, VIN, city, carrier…"
              aria-label="Search loads"
              className={pp.input}
              style={{ flex: '1 1 240px', minWidth: '180px' }}
            />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Filter by status" className={pp.select} style={{ width: 'auto' }}>
              {STATUS_FILTERS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <select value={sortValue} onChange={e => setSortValue(e.target.value)} aria-label="Sort loads" className={pp.select} style={{ width: 'auto' }}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {error && (
            <div className={pp.errorBlock} style={{ marginBottom: '16px' }}>
              {error}
            </div>
          )}

          {loading ? (
            <div>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  height: 64, borderRadius: '8px', marginBottom: '8px',
                  background: 'linear-gradient(90deg, rgba(5,6,7,0.06) 25%, rgba(5,6,7,0.03) 50%, rgba(5,6,7,0.06) 75%)',
                  backgroundSize: '800px 100%', animation: 'shimmer 1.5s ease-in-out infinite',
                }} />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className={pp.card} style={{ padding: '40px 20px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--v2-ink-muted, #5c5851)', marginBottom: '16px' }}>
                {/* "No loads yet" is only true when the customer has none in
                    EITHER group. With the active-by-default filter, a dealer
                    whose work is all closed must not be told they never had any. */}
                {counts && counts.all === 0
                  ? 'No loads yet. Submit your first transport order to get started.'
                  : 'No loads match your filters.'}
              </p>
              {counts && counts.all === 0 && (
                <button onClick={() => navigate('/portal/new-order')} className={v2b.ghostOnPaper}>New Order</button>
              )}
            </div>
          ) : (
            <div className={pp.card} style={{ padding: 0, overflow: 'hidden' }}>
              {visible.map(load => {
                // Key must be unique ACROSS both sources: an email load has no
                // order_id and a portal order may have no load_id.
                const rowKey = `${load.kind}:${load.order_id ?? load.load_id}`;
                return (
                  <LoadRow
                    key={rowKey}
                    load={load}
                    expanded={expandedId === rowKey}
                    onToggle={() => setExpandedId(expandedId === rowKey ? null : rowKey)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
