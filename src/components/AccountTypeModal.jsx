import { useEffect, useState } from 'react';
import { portalFetch, useAuth } from '../hooks/useAuth';
import { useFeePreview } from '../hooks/useFeePreview';
import FeePreviewLine from './FeePreviewLine';
import { colors, fonts } from '../theme';
import {
  accountTypeCards,
  CANONICAL_TYPE_IDS,
  IND_2026_COD_LINE,
  IND_2026_FEE_LINE,
} from '../data/accountTypes';

/**
 * AccountTypeModal (SPRINT-E-T3)
 *
 * First-visit classification modal. Shown when the authenticated user's
 * customer_type is 'unknown', either on dashboard mount or when redirected
 * from a 403 classification_required response (which appends ?classify=1).
 *
 * Persists via PATCH /api/portal/data/customer-type. AQ-3: ONE account-type rule
 * — choosing dealer/exporter here is an application (the backend sets
 * pending_review), not a hard reject. After the type change the dealer/exporter
 * re-signs and completes their application; powers stay gated on activation.
 */

const TYPE_LABELS = {
  dealer: 'Dealer',
  individual: 'Individual',
  auction_buyer: 'Auction Buyer',
  exporter: 'Exporter',
  unknown: 'Not Classified',
};

// WAP-T02 (Sergii 2026-07-08): Auction Buyer MERGED into Individual — one card
// covers personal and auction purchases. The terms line is dynamic per the
// viewer's pricing model (new customers see the ind_2026 formula; legacy
// customers keep the wording they signed up under).
// WAC-T01: the card SET and the fee/terms lines come from the shared source
// of truth (data/accountTypes.js); only the modal-context phrasing
// ("I'm shipping my own vehicle...") stays local.
const individualTermsBenefit = (pricingModel) =>
  pricingModel === 'ind_2026'
    ? `${IND_2026_FEE_LINE} · ${IND_2026_COD_LINE.charAt(0).toLowerCase()}${IND_2026_COD_LINE.slice(1)}`
    : 'Pay on delivery (COD)';

// Modal-context copy per canonical type (first-person, reclassification
// framing). The type ids MUST stay the canonical set — no additions here.
const MODAL_CARD_COPY = {
  individual: {
    title: 'Individual',
    description: "I'm shipping my own vehicle — personal or auction purchase",
    benefits: [
      'Single-vehicle web quote form',
      'Auction pickups (Copart/IAA/Manheim): VIN decode, gate-pass upload, document auto-fill',
      'Portal tracking & email updates',
    ],
  },
  dealer: {
    title: 'Licensed Dealer',
    description: 'I run a dealership (application + verification required)',
    note: 'Activation requires a short review and call with Y7',
    benefits: [
      'Saved locations & dedicated dispatch',
      'Dealer-specific transport agreement',
    ],
  },
  exporter: {
    title: 'Exporter',
    description: 'I ship vehicles internationally',
    benefits: [
      'Saved port & warehouse addresses',
      'Exporter-specific transport agreement',
      'Route presets for international ports',
    ],
  },
};

// B2B-T03: the dealer/exporter COMMERCIAL terms come from the shared source —
// the modal only owns its first-person capability phrasing. The old
// "Per-delivery billing & weekly invoicing" bullet is gone: it stated a cadence
// no agreement binds and contradicted the confirmed model.
// Terms are resolved per VIEWER, so an unmigrated legacy dealer sees the tier
// they are actually charged rather than the 2026 model.
const typesForViewer = (pricingModel) => {
  const resolved = accountTypeCards(pricingModel);
  return CANONICAL_TYPE_IDS.map((id) => ({
    id,
    ...MODAL_CARD_COPY[id],
    terms: resolved.find((c) => c.id === id)?.terms || [],
  }));
};

export default function AccountTypeModal({ onComplete, mode = 'initial', currentType, onClose, orderId = null }) {
  const { user } = useAuth();
  const isEdit = mode === 'edit';
  // [SPRINT-P2b] Same fee source as the onboarding wizard (the other door). The dashboard
  // opens this modal for a customer-level reclassification with NO order in context, so it
  // stays idle and the generic per-model terms show. If a caller ever scopes it to an order
  // (decision #5), it renders the identical per-order figure the wizard does — same hook,
  // same component, one source.
  const { state: feeState, previews } = useFeePreview(orderId);
  const hasLiveFee = feeState === 'loading' || feeState === 'ok' || feeState === 'error';
  // AQ-3: one rule — dealer/exporter are selectable here too (they enter the
  // pending-application flow), so the edit list is no longer filtered.
  // Resolved for this viewer's pricing model (B2B-T03).
  const TYPES = typesForViewer(user?.pricing_model);
  const editTypes = TYPES;
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  // ACC-1-T06: server-computed consequence preview — the same idea the admin
  // change-type dialog has. The switch clears the signed agreement and resets
  // verification; the customer sees that BEFORE confirming, not in a
  // post-hoc toast. Blockers (unpaid invoices, blocked billing) disable the
  // submit outright with the reason on screen.
  const [preview, setPreview] = useState(null);
  const [previewState, setPreviewState] = useState('idle'); // idle | loading | ok | error
  useEffect(() => {
    if (!selected) { setPreview(null); setPreviewState('idle'); return; }
    let alive = true;
    setPreviewState('loading');
    (async () => {
      try {
        const r = await portalFetch(`/api/portal/data/customer-type/preview?to=${encodeURIComponent(selected)}`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (alive) { setPreview(data); setPreviewState('ok'); }
      } catch {
        // Preview is advisory — its failure must not strand classification.
        if (alive) { setPreview(null); setPreviewState('error'); }
      }
    })();
    return () => { alive = false; };
  }, [selected]);
  const blocked = previewState === 'ok' && (preview?.blockers?.length || 0) > 0;

  async function handleSubmit() {
    if (!selected || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const body = { customer_type: selected };
      const response = await portalFetch('/api/portal/data/customer-type', {
        method: 'PATCH',
        body: JSON.stringify(body),
      });
      if (response.status === 409) {
        const data = await response.json().catch(() => ({}));
        if (data.detail?.error === 'deposit_refund_required') {
          const proceed = window.confirm(
            `You have a deposit balance of $${(data.detail.deposit_balance_cents / 100).toFixed(2)}. ` +
            'This will be refunded manually by Y7.\n\nProceed with type change?'
          );
          if (proceed) {
            const r2 = await portalFetch('/api/portal/data/customer-type', {
              method: 'PATCH',
              body: JSON.stringify({ ...body, confirm_refund: true }),
            });
            if (!r2.ok) {
              const err2 = await r2.json().catch(() => ({}));
              throw new Error(err2.detail?.message || err2.detail || 'Failed to save');
            }
            const d2 = await r2.json();
            onComplete?.(d2.customer_type);
            return;
          }
          setSubmitting(false);
          return;
        }
        const msg = data.detail?.message || data.detail || 'Failed to save';
        throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
      }
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const msg = err.detail?.message || err.detail || 'Failed to save';
        throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
      }
      const data = await response.json();
      onComplete?.(data.customer_type);
    } catch (e) {
      setError(e.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Choose account type"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 20,
      }}
    >
      <div style={{
        background: colors.bgCard,
        borderRadius: 16,
        maxWidth: 600,
        width: '100%',
        padding: 32,
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
      }}>
        {isEdit && onClose && (
          <button onClick={onClose} style={{
            position: 'absolute', top: 16, right: 16, background: 'none', border: 'none',
            fontSize: 20, color: colors.textMuted, cursor: 'pointer', lineHeight: 1,
          }}>&times;</button>
        )}

        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: 24,
          marginBottom: 8,
          color: colors.text,
        }}>
          {isEdit ? 'Change Account Type' : 'Welcome to Y7 Logistics'}
        </h2>
        {isEdit && currentType && (
          <p style={{ fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, marginBottom: 8 }}>
            Current type: <strong>{TYPE_LABELS[currentType] || currentType}</strong>
          </p>
        )}
        <p style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          color: colors.textMuted,
          marginBottom: isEdit ? 8 : 24,
          lineHeight: 1.6,
        }}>
          {isEdit
            ? 'Select a new account type below.'
            : 'To get started, please tell us what kind of customer you are. This helps us show you the right forms and the right agreement.'}
        </p>
        {isEdit && (
          <p style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.accent, marginBottom: 16, lineHeight: 1.5 }}>
            Changing your account type will require re-signing your agreement under the new terms.
          </p>
        )}

        <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
          {(isEdit ? editTypes : TYPES).map(type => (
            <button
              key={type.id}
              type="button"
              className="acct-type-card"
              onClick={() => !type.disabled && setSelected(type.id)}
              disabled={type.disabled}
              style={{
                padding: 16,
                border: `2px solid ${selected === type.id ? colors.accent : colors.border}`,
                borderRadius: 12,
                background: type.disabled
                  ? colors.bgMuted
                  : (selected === type.id ? '#FFF8F5' : colors.bgCard),
                cursor: type.disabled ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                opacity: type.disabled ? 0.6 : 1,
                transition: 'all 150ms ease',
              }}
            >
              <div style={{
                fontFamily: fonts.serif,
                fontSize: 18,
                fontWeight: 700,
                color: colors.text,
                marginBottom: 4,
              }}>
                {type.title}
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 13,
                color: colors.textMuted,
              }}>
                {type.description}
              </div>
              {type.benefits && (
                <ul style={{
                  margin: '8px 0 0 0',
                  padding: '0 0 0 18px',
                  fontFamily: fonts.sans,
                  fontSize: 12,
                  color: colors.textMuted,
                  lineHeight: 1.6,
                }}>
                  {(() => {
                    // B2B-T04: commercial terms take the hover accent; the
                    // capability bullets above them stay muted.
                    // [SPRINT-P2b] with a live per-order fee, the generic terms are
                    // suppressed (the number replaces them) — the capability bullets stay.
                    const terms = hasLiveFee
                      ? []
                      : type.id === 'individual'
                        ? [individualTermsBenefit(user?.pricing_model)]
                        : type.terms || [];
                    return [...type.benefits, ...terms].map((b, i) => (
                      <li key={i} className={terms.includes(b) ? 'acct-type-terms' : undefined}>
                        {b}
                      </li>
                    ));
                  })()}
                </ul>
              )}
              {/* [SPRINT-P2b] the real per-order fee, same source as the wizard. */}
              {hasLiveFee && (
                <FeePreviewLine state={feeState} preview={previews?.[type.id]} />
              )}
              {type.note && (
                <div style={{
                  fontSize: 11,
                  color: colors.accent,
                  marginTop: 6,
                  fontStyle: 'italic',
                }}>
                  {type.note}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* ACC-1-T06: what this change actually does — before the button. */}
        {selected && previewState === 'ok' && preview && (
          <div style={{ marginBottom: 16 }}>
            {preview.blockers?.length > 0 && (
              <div style={{ padding: 12, background: '#FEE2E2', borderRadius: 8, marginBottom: 8, fontFamily: fonts.sans, fontSize: 13, color: '#991B1B' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>This change is blocked:</div>
                {preview.blockers.map((b, i) => <div key={i}>• {b}</div>)}
              </div>
            )}
            <div style={{ padding: 12, background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, fontFamily: fonts.sans, fontSize: 13, color: '#78350F' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>This will:</div>
              {(preview.consequences || []).map((c, i) => <div key={i} style={{ marginBottom: 2 }}>• {c}</div>)}
            </div>
          </div>
        )}

        {error && (
          <div style={{
            padding: 12,
            background: '#FEE2E2',
            borderRadius: 8,
            marginBottom: 16,
            color: '#991B1B',
            fontSize: 13,
            fontFamily: fonts.sans,
          }}>
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selected || submitting || previewState === 'loading' || blocked}
          style={{
            width: '100%',
            padding: 14,
            background: selected && !submitting && !blocked && previewState !== 'loading' ? colors.accent : colors.bgMuted,
            color: selected && !submitting && !blocked && previewState !== 'loading' ? '#fff' : colors.textMuted,
            border: 'none',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            cursor: selected && !submitting && !blocked && previewState !== 'loading' ? 'pointer' : 'not-allowed',
            fontFamily: fonts.sans,
          }}
        >
          {submitting
            ? 'Saving...'
            : previewState === 'loading'
              ? 'Checking…'
              : ['dealer', 'exporter'].includes(selected)
                ? 'Apply for activation'
                : 'Continue'}
        </button>

        {!isEdit && (
          <p style={{
            fontSize: 11,
            color: colors.textMuted,
            textAlign: 'center',
            marginTop: 12,
            fontFamily: fonts.sans,
          }}>
            This selection determines your agreement type and available features.
          </p>
        )}
      </div>
    </div>
  );
}
