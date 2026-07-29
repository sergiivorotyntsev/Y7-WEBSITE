import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OnboardingBanner from '../../components/OnboardingBanner';
import PageMeta from '../../components/PageMeta';
import VerificationBanner from '../../components/VerificationBanner';
import { portalFetch } from '../../hooks/useAuth';
import { keyframes } from '../../theme';
import { UNIFIED_STAGES, mapUnifiedStage } from '../../utils/loadStatus';
import pp from '../../styles/v2/portal.module.css';
import v2b from '../../styles/v2/buttons.module.css';

// DEALER-DASH-S1-T03 — Dealer/Exporter HOME: loads dashboard.
// Block 1 (Loads) is the live surface. The former Money/Documents "coming
// soon" placeholders were removed (EXP-P1): no placeholder stands in for a
// real feature. The live Money summary lands with the billing work (Phase 4),
// where the exporter billing gate is also opened. Reuses the existing portal
// data endpoint (DEALER-DASH-S1-T02 sort/order/limit params). Display-only
// price contract (S1-T01): transport price = final_price ?? quote range; Y7
// fee = service_fee_cents as a SEPARATE line; never listed_price / dispatch.

const STATUS_FILTERS = [
  { value: 'all', label: 'All loads' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'dispatched', label: 'In dispatch' },
  { value: 'completed', label: 'Delivered' },
  { value: 'archive', label: 'Archived' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first', col: 'created_at', dir: 'desc' },
  { value: 'oldest', label: 'Oldest first', col: 'created_at', dir: 'asc' },
  { value: 'status', label: 'By status', col: 'status', dir: 'asc' },
  { value: 'price_high', label: 'Price: high → low', col: 'quote_price_max', dir: 'desc' },
  { value: 'price_low', label: 'Price: low → high', col: 'quote_price_max', dir: 'asc' },
];

function money(dollars) {
  if (dollars == null) return null;
  return `$${Number(dollars).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function UnifiedProgress({ stageIndex, terminal, label }) {
  if (terminal) {
    return (
      <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-red-deep, #a90918)', padding: '8px 0' }}>
        This load is {label.toLowerCase()}.
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '8px 0' }}>
      {UNIFIED_STAGES.map((s, i) => {
        const done = i < stageIndex;
        const current = i === stageIndex;
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

function LoadRow({ order, expanded, onToggle }) {
  const vehicle = [order.vehicle_year, order.vehicle_make, order.vehicle_model].filter(Boolean).join(' ') || 'Vehicle TBD';
  const pickup = [order.pickup_city, order.pickup_zip].filter(Boolean).join(' ');
  const delivery = [order.delivery_city, order.delivery_zip].filter(Boolean).join(' ');
  const route = [pickup, delivery].filter(Boolean).join(' → ');
  const loadId = order.load_id || `#${order.id}`; // NUM-2: display load_id only (not web_reference)
  const u = mapUnifiedStage(order);

  // S1-T01 contract: final_price ?? quote range. Endpoint already returns
  // final_price / quote_price_min / quote_price_max in dollars.
  const transport = order.final_price != null
    ? money(order.final_price)
    : (order.quote_price_min != null && order.quote_price_max != null)
      ? `${money(order.quote_price_min)}–${money(order.quote_price_max)}`
      : null;
  const yfee = order.service_fee_cents != null ? money(order.service_fee_cents / 100) : null;
  const carrierAssigned = Boolean(order.carrier_name);

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
          {carrierAssigned && (
            <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink, #050607)', marginTop: '4px' }}>
              Carrier: {order.carrier_name}{order.carrier_mc ? ` · MC ${order.carrier_mc}` : ''}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span className={u.terminal ? pp.chipRed : pp.chipInk}>
            {u.label}
          </span>
          {/* PHASE4B-REPRICE: a revised quote needs the dealer's re-confirmation. */}
          {/* C2 gate correction (owner): reprice IS action-required — the
              order is blocked on the customer's accept/decline. */}
          {order.status === 'quoted' && order.requires_reprice && (
            <div className={pp.chipRed} style={{ marginTop: '4px' }}>
              Needs your re-confirmation
            </div>
          )}
          {transport && (
            <div className={pp.mono} style={{ marginTop: '4px' }}>
              {transport}
            </div>
          )}
          {yfee && (
            <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '1px' }}>
              + {yfee} Y7 service fee
            </div>
          )}
        </div>
      </button>
      {expanded && (
        <div style={{ padding: '0 20px 16px' }}>
          <UnifiedProgress stageIndex={u.stageIndex} terminal={u.terminal} label={u.label} />
          <Link to={`/portal/order/${order.id}`} style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink, #050607)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            View full details &amp; timeline &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}

export default function DealerDashboard({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortValue, setSortValue] = useState('newest');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const buildQuery = useCallback(() => {
    const p = new URLSearchParams();
    p.set('limit', '0'); // all of this dealer's loads
    if (['all', 'active', 'archive'].includes(statusFilter)) p.set('status_group', statusFilter);
    else p.set('status', statusFilter);
    const s = SORT_OPTIONS.find(o => o.value === sortValue) || SORT_OPTIONS[0];
    p.set('sort', s.col);
    p.set('order', s.dir);
    return p.toString();
  }, [statusFilter, sortValue]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    portalFetch(`/api/portal/data/orders?${buildQuery()}`)
      .then(r => r.json())
      .then(data => { if (!cancelled) { setOrders(data.items || []); setError(null); } })
      .catch(() => { if (!cancelled) setError('Failed to load your loads. Please refresh.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [buildQuery]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(o => {
      const hay = [
        o.vehicle_year, o.vehicle_make, o.vehicle_model,
        o.load_id, o.web_reference, o.vin,
        o.pickup_city, o.pickup_zip, o.delivery_city, o.delivery_zip,
        o.carrier_name,
      ].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [orders, search]);

  const isExporter = user?.customer_type === 'exporter';

  return (
    <div className={pp.shell}>
      <PageMeta title="Dealer Dashboard" description="Monitor your loads, costs, and documents in one place." path="/portal/dashboard" />
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
                {orders.length === 0 ? 'No loads yet. Submit your first transport order to get started.' : 'No loads match your filters.'}
              </p>
              {orders.length === 0 && (
                <button onClick={() => navigate('/portal/new-order')} className={v2b.ghostOnPaper}>New Order</button>
              )}
            </div>
          ) : (
            <div className={pp.card} style={{ padding: 0, overflow: 'hidden' }}>
              {visible.map(order => (
                <LoadRow
                  key={order.id}
                  order={order}
                  expanded={expandedId === order.id}
                  onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
