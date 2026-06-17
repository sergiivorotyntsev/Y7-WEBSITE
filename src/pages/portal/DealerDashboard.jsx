import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { portalFetch } from '../../hooks/useAuth';
import { colors, fonts, button as btnStyles, keyframes } from '../../theme';
import { UNIFIED_STAGES, mapUnifiedStage } from '../../utils/loadStatus';

// DEALER-DASH-S1-T03 — Dealer/Exporter HOME: three-block dashboard.
// Block 1 (Loads) is populated; Blocks 2 (Money) and 3 (Documents) are clean
// "coming" placeholders this slice (S2/S3). Reuses the existing portal data
// endpoint (DEALER-DASH-S1-T02 sort/order/limit params). Display-only price
// contract (S1-T01): transport price = final_price ?? quote range; Y7 fee =
// service_fee_cents as a SEPARATE line; never listed_price / dispatch price.

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

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px', // iOS: >=16px prevents zoom-on-focus
  padding: '8px 12px',
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  background: colors.bgInput || '#fff',
  color: colors.text,
};

function ComingBlock({ title, body, cta }) {
  return (
    <div style={{
      background: colors.bgCard,
      border: `1px dashed ${colors.border}`,
      borderRadius: '12px',
      padding: '20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <h3 style={{ fontFamily: fonts.serif, fontSize: '16px', fontWeight: 700, color: colors.text }}>{title}</h3>
        <span style={{
          fontFamily: fonts.sans, fontSize: '10px', fontWeight: 700, color: colors.textMuted,
          background: colors.bgMuted, padding: '2px 8px', borderRadius: '8px',
          textTransform: 'uppercase', letterSpacing: '0.5px',
        }}>Coming soon</span>
      </div>
      <p style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, lineHeight: 1.5 }}>{body}</p>
      {cta}
    </div>
  );
}

function UnifiedProgress({ stageIndex, terminal, label }) {
  if (terminal) {
    return (
      <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: '#991B1B', padding: '8px 0' }}>
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
            fontFamily: fonts.sans, fontSize: '11px', fontWeight: current ? 700 : 500,
            color: current ? '#fff' : done ? colors.text : colors.textMuted,
            background: current ? colors.accent : done ? colors.bgMuted : 'transparent',
            border: `1px solid ${current ? colors.accent : colors.border}`,
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
  const loadId = order.load_id || order.web_reference || `#${order.id}`;
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
    <div style={{ borderBottom: `1px solid ${colors.border}` }}>
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
          <div style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: colors.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {vehicle}
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <span style={{ fontFamily: fonts.mono, marginRight: '8px' }}>{loadId}</span>
            {route && <span>{route}</span>}
          </div>
          {carrierAssigned && (
            <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.text, marginTop: '4px' }}>
              Carrier: {order.carrier_name}{order.carrier_mc ? ` · MC ${order.carrier_mc}` : ''}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span style={{
            fontFamily: fonts.sans, fontSize: '11px', fontWeight: 600,
            color: u.terminal ? '#991B1B' : colors.accent,
            background: u.terminal ? '#FEE2E2' : colors.bgMuted,
            padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.5px',
          }}>
            {u.label}
          </span>
          {transport && (
            <div style={{ fontFamily: fonts.mono, fontSize: '13px', fontWeight: 600, color: colors.text, marginTop: '4px' }}>
              {transport}
            </div>
          )}
          {yfee && (
            <div style={{ fontFamily: fonts.sans, fontSize: '11px', color: colors.textMuted, marginTop: '1px' }}>
              + {yfee} Y7 service fee
            </div>
          )}
        </div>
      </button>
      {expanded && (
        <div style={{ padding: '0 20px 16px' }}>
          <UnifiedProgress stageIndex={u.stageIndex} terminal={u.terminal} label={u.label} />
          <Link to={`/portal/order/${order.id}`} style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, textDecoration: 'none' }}>
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
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <PageMeta title="Dealer Dashboard" description="Monitor your loads, costs, and documents in one place." path="/portal/dashboard" />
      <style>{keyframes}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: 700, color: colors.text }}>
              Welcome back, {user?.name?.split(' ')[0] || 'there'}
            </h1>
            <span style={{
              fontFamily: fonts.sans, fontSize: '11px', fontWeight: 700, color: '#fff',
              background: '#1a1a2e', padding: '3px 10px', borderRadius: '10px',
              textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap',
            }}>
              {isExporter ? 'Exporter Account' : 'Dealer Account'}
            </span>
          </div>
        </div>
        <button onClick={() => navigate('/portal/new-order')} style={btnStyles.accent}>New Order</button>
      </div>

      {/* Three-block grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>

        {/* BLOCK 1 — LOADS (populated) */}
        <div style={{ gridColumn: '1 / -1' }}>
          <h2 style={{ fontFamily: fonts.serif, fontSize: '20px', fontWeight: 700, color: colors.text, marginBottom: '12px' }}>
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
              style={{ ...inputStyle, flex: '1 1 240px', minWidth: '180px' }}
            />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Filter by status" style={inputStyle}>
              {STATUS_FILTERS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <select value={sortValue} onChange={e => setSortValue(e.target.value)} aria-label="Sort loads" style={inputStyle}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {error && (
            <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, padding: '10px 14px', background: '#FFF0EC', borderRadius: '8px', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          {loading ? (
            <div>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  height: 64, borderRadius: '8px', marginBottom: '8px',
                  background: `linear-gradient(90deg, ${colors.bgMuted} 25%, ${colors.bgCard} 50%, ${colors.bgMuted} 75%)`,
                  backgroundSize: '800px 100%', animation: 'shimmer 1.5s ease-in-out infinite',
                }} />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '40px 20px', textAlign: 'center' }}>
              <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, marginBottom: '16px' }}>
                {orders.length === 0 ? 'No loads yet. Submit your first transport order to get started.' : 'No loads match your filters.'}
              </p>
              {orders.length === 0 && (
                <button onClick={() => navigate('/portal/new-order')} style={btnStyles.accent}>New Order</button>
              )}
            </div>
          ) : (
            <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '12px', overflow: 'hidden' }}>
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

        {/* BLOCK 2 — MONEY (placeholder) */}
        <ComingBlock
          title="Money"
          body={isExporter
            ? 'Per-load transport cost, your Y7 service fees, and balance. Exporter billing terms are being finalized.'
            : 'Per-load transport cost and Y7 service fee, what you owe Y7, the current weekly invoice, and payment history — all in one place.'}
          cta={!isExporter ? (
            <Link to="/portal/billing" style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, textDecoration: 'none' }}>
              View current billing &rarr;
            </Link>
          ) : null}
        />

        {/* BLOCK 3 — DOCUMENTS (placeholder) */}
        <ComingBlock
          title="Documents"
          body="Per-load document checklist — what's required (gate pass, etc.), what's uploaded, what's missing, and review status."
        />
      </div>
    </div>
  );
}
