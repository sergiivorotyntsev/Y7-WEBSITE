import { useState } from 'react';
import { portalFetch, useAuth } from '../hooks/useAuth';
import { colors, fonts } from '../theme';

/**
 * LegacyTypeReprompt (WAP-T03, 0707 findings §3)
 *
 * One-time, non-intrusive card at portal login for customers whose
 * customer_type='individual' is a MIGRATED DEFAULT (pre-Sprint-E accounts that
 * were bulk-renamed shipper->individual and never actually asked). The backend
 * computes eligibility (user.show_legacy_type_reprompt); any outcome dismisses
 * the card permanently. Choosing Dealer/Exporter routes through the EXISTING
 * PATCH /customer-type funnel (AQ pending_review application). Reclassifying
 * never changes the customer's pricing model — legacy terms stay.
 */
export default function LegacyTypeReprompt() {
  const { user, checkAuth } = useAuth();
  const [busy, setBusy] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [error, setError] = useState(null);

  if (!user?.show_legacy_type_reprompt || hidden) return null;

  const dismiss = async () => {
    try { await portalFetch('/api/portal/data/legacy-type-reprompt/dismiss', { method: 'POST' }); } catch { /* best-effort */ }
    setHidden(true);
  };

  const choose = async (type) => {
    setBusy(true); setError(null);
    try {
      if (type !== 'individual') {
        const r = await portalFetch('/api/portal/data/customer-type', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customer_type: type }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.detail?.message || data.detail || 'Could not update your account type');
      }
      await dismiss();
      if (type !== 'individual') await checkAuth();
    } catch (e) {
      setError(e.message || 'Something went wrong — please try again.');
    }
    setBusy(false);
  };

  const btn = {
    padding: '8px 18px', borderRadius: 18, fontFamily: fonts.sans, fontSize: 13,
    fontWeight: 600, cursor: busy ? 'not-allowed' : 'pointer', opacity: busy ? 0.6 : 1,
  };

  return (
    <div style={{
      background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 12,
      padding: '16px 20px', marginBottom: 16,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 4 }}>
            Help us serve you better — which describes you?
          </div>
          <p style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, lineHeight: 1.5, margin: 0 }}>
            Your account was set up as Individual by default. Dealers and exporters
            get volume terms and their own workflow — one tap to tell us.
          </p>
        </div>
        <button onClick={dismiss} disabled={busy} aria-label="Dismiss"
          style={{ background: 'none', border: 'none', color: colors.textMuted, fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>
          ×
        </button>
      </div>
      {error && (
        <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.accent, margin: '8px 0 0' }}>{error}</div>
      )}
      <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
        <button onClick={() => choose('individual')} disabled={busy}
          style={{ ...btn, background: colors.accent, color: '#fff', border: 'none' }}>
          I&rsquo;m an individual
        </button>
        <button onClick={() => choose('dealer')} disabled={busy}
          style={{ ...btn, background: 'transparent', color: colors.text, border: `1px solid ${colors.border}` }}>
          I&rsquo;m a dealer
        </button>
        <button onClick={() => choose('exporter')} disabled={busy}
          style={{ ...btn, background: 'transparent', color: colors.text, border: `1px solid ${colors.border}` }}>
          I&rsquo;m an exporter
        </button>
      </div>
    </div>
  );
}
