// Q2-T11: post-OTP success screen.
//
// Replaces the pre-T11 chaos screen that combined a stale "Check your inbox"
// banner, a duplicate "Create Your Account" card with full re-entry form,
// orphan Skip/Connect-Telegram buttons, and "10–15 min" timeline copy. The
// new layout is three cards stacked top-to-bottom with one rhythm:
//
//   1. SuccessCard         — green confirmation + reference + email note
//   2. Branch card         — ReturningCustomerCard or NewCustomerCard
//   3. TimelineCard        — 5-step "what happens next" + business hours
//
// Branch comes from result.customer_status:
//   - "returning" → Welcome back + [View This Quote] [Go to Dashboard]
//     "View This Quote" deep-links to /portal/order/{order_id} — singular
//     path, numeric PK (Q2-T11-FIX: pre-fix used /portal/orders/{load_id}
//     which fell through to the catch-all 404 and would 422 the backend).
//   - "new" (default)     → [Create Password] [Skip for now]
//     "Create Password" preserves email + reference via query params so the
//     register form can pre-fill them.
//
// Visual rhythm matches QuoteOtpStep (T10): framer-motion fade+slide-up
// entry, theme.js tokens only (no Tailwind), 12px radii, 24px card padding.

import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';

// SPRINT-W7 B1: V2 retoken — paper cards on the board band (this screen
// replaces the quote form in place, same island treatment), Oswald card
// titles, red only on the single primary action (Signal Budget: the CTA
// gradient is the viewport's one red fill; SuccessCard pine = success law).
const INK = 'var(--v2-ink, #050607)';
const INK_MUTED = 'var(--v2-ink-muted, #5c5851)';

const CARD_BASE = {
  background: 'var(--v2-paper, #f4f0e8)',
  border: '1px solid var(--v2-line-on-dark, rgba(255, 247, 237, 0.14))',
  borderRadius: 12,
  padding: 24,
};

const PRIMARY_BTN = {
  padding: '10px 20px',
  background: 'var(--v2-red-gradient, linear-gradient(135deg, #d70f24, #a90918))',
  color: '#fff7ed',
  borderRadius: 8,
  textDecoration: 'none',
  fontFamily: fonts.sans,
  fontWeight: 600,
  fontSize: 14,
  display: 'inline-block',
  cursor: 'pointer',
  border: 'none',
};

const SECONDARY_LINK_BTN = {
  padding: '10px 20px',
  background: 'transparent',
  border: '1px solid rgba(5, 6, 7, 0.3)',
  color: INK,
  borderRadius: 8,
  textDecoration: 'none',
  fontFamily: fonts.sans,
  fontSize: 14,
  display: 'inline-block',
};

const TEXT_LINK_BTN = {
  padding: '10px 20px',
  background: 'transparent',
  border: 'none',
  color: INK_MUTED,
  fontFamily: fonts.sans,
  fontSize: 14,
  cursor: 'pointer',
  textDecoration: 'underline',
  textUnderlineOffset: 2,
};

const CARD_TITLE = {
  fontFamily: 'var(--v2-font-display, Oswald, system-ui)',
  fontSize: 18,
  textTransform: 'uppercase',
  letterSpacing: '0.01em',
  color: INK,
  marginTop: 0,
  marginBottom: 8,
  fontWeight: 600,
};

const CARD_SUBTITLE = {
  fontSize: 14,
  color: INK_MUTED,
  marginTop: 0,
  marginBottom: 16,
  lineHeight: 1.5,
};

/**
 * PostQuoteFlow — success state after OTP verification.
 *
 * Branches:
 *   - quoteResult.customer_status === 'returning': Welcome back, deep link to /portal/order/{order_id}
 *   - quoteResult.customer_status === 'new' (or anything else, defensively): Create Password CTA
 *
 * Props:
 *   quoteResult: { order_id, load_id, reference, customer_status, dashboard_url }
 *   formData:    { name, email, ... } — used to greet by first name and confirm email
 */
export default function PostQuoteFlow({ quoteResult, formData }) {
  if (!quoteResult) return null;

  const isReturning = quoteResult.customer_status === 'returning';
  const reference = quoteResult.reference || quoteResult.load_id || '';

  return (
    <Motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        maxWidth: 560,
        margin: '40px auto',
        padding: '0 16px',
        fontFamily: fonts.sans,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <SuccessCard reference={reference} email={formData?.email} />
      {isReturning ? (
        <ReturningCustomerCard
          orderId={quoteResult.order_id}
          name={formData?.name}
          dashboardUrl={quoteResult.dashboard_url}
        />
      ) : (
        <NewCustomerCard email={formData?.email} reference={reference} />
      )}
      <TimelineCard />
    </Motion.div>
  );
}

function SuccessCard({ reference, email }) {
  const { t } = useTranslation('quote');
  return (
    <div
      style={{
        background: colors.successBg,
        border: `1px solid ${colors.success}`,
        borderRadius: 12,
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div
        style={{ fontSize: 32, marginBottom: 8, color: colors.success, lineHeight: 1 }}
        aria-hidden="true"
      >
        ✓
      </div>
      <h1
        style={{
          fontFamily: 'var(--v2-font-display, Oswald, system-ui)',
          fontSize: 24,
          textTransform: 'uppercase',
          letterSpacing: '0.01em',
          color: colors.success,
          marginTop: 0,
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        {t('success.title')}
      </h1>
      {reference && (
        <p
          style={{
            fontSize: 14,
            color: colors.success,
            marginTop: 0,
            marginBottom: email ? 4 : 0,
            fontFamily: fonts.mono,
          }}
        >
          {t('success.reference', { ref: reference })}
        </p>
      )}
      {email && (
        <p style={{ fontSize: 13, color: INK_MUTED, margin: 0 }}>
          {t('success.confirmation', { email })}
        </p>
      )}
    </div>
  );
}

function ReturningCustomerCard({ orderId, name, dashboardUrl }) {
  const { t } = useTranslation('quote');
  // Q2-T11-FIX: route is /portal/order/:id (singular) and OrderDetail.jsx
  // forwards :id to /api/portal/data/orders/{order_id} which strictly types
  // order_id: int (portal_data.py:361). Use numeric order_id from the
  // /quote/verify response, NOT the load_id string.
  const orderUrl = orderId ? `/portal/order/${orderId}` : '/portal/dashboard';
  const dashUrl = dashboardUrl || '/portal/dashboard';
  const firstName = (name || '').trim().split(/\s+/)[0] || t('returning.fallbackName');

  return (
    <div style={CARD_BASE}>
      <h2 style={CARD_TITLE}>
        {t('returning.title', { name: firstName })}
      </h2>
      <p style={CARD_SUBTITLE}>
        {t('returning.subtitle')}
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {orderId && (
          <a href={orderUrl} style={PRIMARY_BTN}>
            {t('returning.viewQuote')}
          </a>
        )}
        <a href={dashUrl} style={orderId ? SECONDARY_LINK_BTN : PRIMARY_BTN}>
          {t('returning.dashboard')}
        </a>
      </div>
    </div>
  );
}

function NewCustomerCard({ email, reference }) {
  const { t } = useTranslation('quote');
  const params = new URLSearchParams();
  if (email) params.set('email', email);
  if (reference) params.set('ref', reference);
  const registerUrl =
    `/portal/register${params.toString() ? '?' + params.toString() : ''}`;

  const handleSkip = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div style={CARD_BASE}>
      <h2 style={CARD_TITLE}>
        {t('newCustomer.title')}
      </h2>
      <p style={CARD_SUBTITLE}>
        {t('newCustomer.subtitle')}
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <a href={registerUrl} style={PRIMARY_BTN}>
          {t('newCustomer.createPassword')}
        </a>
        <button type="button" onClick={handleSkip} style={TEXT_LINK_BTN}>
          {t('newCustomer.skipForNow')}
        </button>
      </div>
    </div>
  );
}

function TimelineCard() {
  const { t } = useTranslation('quote');
  const steps = [
    { key: 'review', label: t('timeline.review'), desc: t('timeline.reviewDesc') },
    { key: 'quote', label: t('timeline.quote'), desc: t('timeline.quoteDesc') },
    { key: 'confirm', label: t('timeline.confirm'), desc: t('timeline.confirmDesc') },
    { key: 'carrier', label: t('timeline.carrier'), desc: t('timeline.carrierDesc') },
    { key: 'delivered', label: t('timeline.delivered'), desc: t('timeline.deliveredDesc') },
  ];

  return (
    <div style={CARD_BASE}>
      <h2 style={{ ...CARD_TITLE, marginBottom: 16 }}>
        {t('timeline.title')}
      </h2>
      <div style={{ marginBottom: 16 }}>
        {steps.map((step, idx) => (
          <div
            key={step.key}
            style={{
              display: 'flex',
              gap: 12,
              marginBottom: idx === steps.length - 1 ? 0 : 12,
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                // Current step in ink (red stays on the primary CTA only).
                background: idx === 0 ? INK : 'rgba(5, 6, 7, 0.06)',
                color: idx === 0 ? 'var(--v2-paper, #f4f0e8)' : INK_MUTED,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 600,
                flexShrink: 0,
                fontFamily: fonts.sans,
              }}
              aria-hidden="true"
            >
              {idx + 1}
            </div>
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: INK,
                  fontFamily: fonts.sans,
                }}
              >
                {step.label}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: INK_MUTED,
                  marginTop: 2,
                  lineHeight: 1.4,
                }}
              >
                {step.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          fontSize: 13,
          color: INK_MUTED,
          paddingTop: 16,
          borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
          textAlign: 'center',
          fontFamily: fonts.sans,
        }}
      >
        {t('timeline.hours')}
      </div>
    </div>
  );
}
