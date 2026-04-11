import { useState } from 'react';
import { portalFetch } from '../hooks/useAuth';
import { colors, fonts } from '../theme';

/**
 * AccountTypeModal (SPRINT-E-T3)
 *
 * First-visit classification modal. Shown when the authenticated user's
 * customer_type is 'unknown', either on dashboard mount or when redirected
 * from a 403 classification_required response (which appends ?classify=1).
 *
 * Persists via PATCH /api/portal/data/customer-type. The dealer card is
 * intentionally non-selectable: dealers must apply via the dealer-inquiry
 * form on /dealers, not self-promote through this modal.
 */

const TYPE_LABELS = {
  dealer: 'Dealer',
  individual: 'Individual',
  auction_buyer: 'Auction Buyer',
  exporter: 'Exporter',
  unknown: 'Not Classified',
};

const TYPES = [
  {
    id: 'individual',
    title: 'Individual',
    description: "I'm shipping my own vehicle (private, not for resale)",
  },
  {
    id: 'auction_buyer',
    title: 'Auction Buyer',
    description: 'I buy from Copart, IAA, Manheim, or other auctions',
  },
  {
    id: 'exporter',
    title: 'Exporter',
    description: 'I ship vehicles internationally',
  },
  {
    id: 'dealer',
    title: 'Licensed Dealer',
    description: 'I run a dealership (requires separate application)',
    disabled: true,
    note: 'Dealers must apply via the Dealers page',
  },
];

export default function AccountTypeModal({ onComplete, mode = 'initial', currentType, onClose }) {
  const isEdit = mode === 'edit';
  const editTypes = TYPES.filter(t => t.id !== 'dealer');
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    if (!selected || submitting) return;
    if (selected === 'dealer') {
      window.location.href = '/dealers';
      return;
    }
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
          disabled={!selected || submitting}
          style={{
            width: '100%',
            padding: 14,
            background: selected && !submitting ? colors.accent : colors.bgMuted,
            color: selected && !submitting ? '#fff' : colors.textMuted,
            border: 'none',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            cursor: selected && !submitting ? 'pointer' : 'not-allowed',
            fontFamily: fonts.sans,
          }}
        >
          {submitting
            ? 'Saving...'
            : selected === 'dealer'
              ? 'Go to Dealer Application'
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
