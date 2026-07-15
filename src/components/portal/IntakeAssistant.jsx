import { useState, useEffect, useCallback } from 'react';
import { portalFetch } from '../../hooks/useAuth';
import { colors, fonts } from '../../theme';

/**
 * AIA1-T03 — the intake-assistant widget (Phase 1, NO AI).
 *
 * A calm, always-available launcher that renders the order's completeness
 * checklist entirely from the deterministic brief
 * (`GET /api/portal/data/orders/{id}/assistant-brief`). This is the
 * graceful-degradation FLOOR: the same checklist the Phase-2 LLM will phrase,
 * but here rendered directly with no model in the loop.
 *
 *  - Auto-opens when the order has REQUIRE-tier gaps (the awaiting-details
 *    moment).
 *  - `submitOverview` mode shows the full provided / missing / clarify /
 *    suggested summary at submit time.
 *  - Otherwise a quiet launcher the customer can open any time.
 *
 * It NEVER mutates: every REQUIRE item's action is a pointer to the real
 * cabinet control on this page (an anchor / a callback the host wires), which
 * goes through the normal APIs + the W-GATEFLOW gate.
 */
export default function IntakeAssistant({ orderId, submitOverview = false, onFocusControl }) {
  const [brief, setBrief] = useState(null);
  const [open, setOpen] = useState(false);
  const [dismissedRecommend, setDismissedRecommend] = useState(false);

  const load = useCallback(() => {
    if (!orderId) return;
    portalFetch(`/api/portal/data/orders/${orderId}/assistant-brief`)
      .then((r) => (r.ok ? r.json() : null))
      .then((b) => {
        if (!b) return;
        setBrief(b);
        // Auto-open on the awaiting-details moment (REQUIRE gaps) or when the
        // host explicitly wants the submit overview.
        if ((b.tiers?.require?.length || 0) > 0 || submitOverview) setOpen(true);
      })
      .catch(() => {});
  }, [orderId, submitOverview]);

  useEffect(() => { load(); }, [load]);

  if (!brief) return null;

  const req = brief.tiers?.require || [];
  const ask = brief.tiers?.ask || [];
  const rec = brief.tiers?.recommend || [];
  const ready = brief.ready_to_dispatch;

  const launcher = (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-label="Order assistant"
      style={{
        position: 'fixed', right: 20, bottom: 20, zIndex: 60,
        width: 52, height: 52, borderRadius: '50%', cursor: 'pointer',
        border: 'none', background: colors.accent, color: '#fff',
        boxShadow: '0 6px 18px rgba(153,60,29,0.35)', fontSize: 22,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {req.length > 0 ? '!' : '✦'}
    </button>
  );

  const Item = ({ item, tone }) => (
    <li style={{ margin: '0 0 10px', listStyle: 'none' }}>
      <div style={{ fontFamily: fonts.sans, fontSize: 13.5, fontWeight: 600, color: tone }}>
        {item.label}
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 12.5, color: colors.textMuted, lineHeight: 1.5 }}>
        {item.reason}
      </div>
      {item.control && onFocusControl && (
        <button
          type="button"
          onClick={() => { onFocusControl(item.field); setOpen(false); }}
          style={{
            marginTop: 4, fontFamily: fonts.sans, fontSize: 12, fontWeight: 600,
            color: colors.accent, background: 'none', border: 'none',
            padding: 0, cursor: 'pointer', textDecoration: 'underline',
          }}
        >
          Add this now →
        </button>
      )}
    </li>
  );

  const panel = open && (
    <div
      style={{
        position: 'fixed', right: 20, bottom: 84, zIndex: 60, width: 340,
        maxWidth: 'calc(100vw - 40px)', maxHeight: '70vh', overflowY: 'auto',
        background: '#fff', border: `1px solid ${colors.border || '#e5e0d8'}`,
        borderRadius: 16, boxShadow: '0 12px 40px rgba(0,0,0,0.18)', padding: 20,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <div style={{ fontFamily: fonts.serif, fontSize: 17, fontWeight: 700, color: colors.text }}>
          {ready ? 'Your order is ready' : 'One step to get moving'}
        </div>
        <button type="button" onClick={() => setOpen(false)}
          style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: colors.textMuted }}>×</button>
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 12.5, color: colors.textMuted, marginBottom: 14, lineHeight: 1.5 }}>
        {brief.next_step} · <span style={{ opacity: 0.7 }}>{brief.order_ref}</span>
      </div>

      {req.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={sectionLabel('#B45309')}>Needed to dispatch</div>
          <ul style={{ padding: 0, margin: 0 }}>
            {req.map((i) => <Item key={i.field} item={i} tone="#92400e" />)}
          </ul>
        </div>
      )}

      {ask.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={sectionLabel(colors.accent)}>Worth clarifying</div>
          <ul style={{ padding: 0, margin: 0 }}>
            {ask.map((i) => <Item key={i.field} item={i} tone={colors.text} />)}
          </ul>
        </div>
      )}

      {!dismissedRecommend && rec.length > 0 && (
        <div>
          <div style={{ ...sectionLabel(colors.textMuted), display: 'flex', justifyContent: 'space-between' }}>
            <span>Suggested</span>
            <button type="button" onClick={() => setDismissedRecommend(true)}
              style={{ background: 'none', border: 'none', fontSize: 11, color: colors.textMuted, cursor: 'pointer' }}>dismiss</button>
          </div>
          <ul style={{ padding: 0, margin: 0 }}>
            {rec.map((i) => <Item key={i.field} item={i} tone={colors.text} />)}
          </ul>
        </div>
      )}

      {ready && req.length === 0 && ask.length === 0 && (
        <div style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.success || '#2e7d32' }}>
          Everything we need is in — we're arranging your carrier.
        </div>
      )}
    </div>
  );

  return (<>{launcher}{panel}</>);
}

function sectionLabel(color) {
  return {
    fontFamily: 'system-ui, sans-serif', fontSize: 11, fontWeight: 700,
    letterSpacing: '0.6px', textTransform: 'uppercase', color, marginBottom: 8,
  };
}
