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
//     "View This Quote" deep-links to /portal/orders/{load_id} (verified 200).
//   - "new" (default)     → [Create Password] [Skip for now]
//     "Create Password" preserves email + reference via query params so the
//     register form can pre-fill them.
//
// Visual rhythm matches QuoteOtpStep (T10): framer-motion fade+slide-up
// entry, theme.js tokens only (no Tailwind), 12px radii, 24px card padding.

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';

const CARD_BASE = {
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: 12,
  padding: 24,
};

const PRIMARY_BTN = {
  padding: '10px 20px',
  background: colors.accent,
  color: '#FFFFFF',
  borderRadius: 6,
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
  border: `1px solid ${colors.borderInput}`,
  color: colors.text,
  borderRadius: 6,
  textDecoration: 'none',
  fontFamily: fonts.sans,
  fontSize: 14,
  display: 'inline-block',
};

const TEXT_LINK_BTN = {
  padding: '10px 20px',
  background: 'transparent',
  border: 'none',
  color: colors.textMuted,
  fontFamily: fonts.sans,
  fontSize: 14,
  cursor: 'pointer',
  textDecoration: 'underline',
};

const CARD_TITLE = {
  fontFamily: fonts.serif,
  fontSize: 18,
  color: colors.text,
  marginTop: 0,
  marginBottom: 8,
  fontWeight: 600,
};

const CARD_SUBTITLE = {
  fontSize: 14,
  color: colors.textMuted,
  marginTop: 0,
  marginBottom: 16,
  lineHeight: 1.5,
};

/**
 * PostQuoteFlow — success state after OTP verification.
 *
 * Branches:
 *   - quoteResult.customer_status === 'returning': Welcome back, deep link to /portal/orders/{load_id}
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
    <motion.div
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
          loadId={quoteResult.load_id}
          name={formData?.name}
          dashboardUrl={quoteResult.dashboard_url}
        />
      ) : (
        <NewCustomerCard email={formData?.email} reference={reference} />
      )}
      <TimelineCard />
    </motion.div>
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
          fontFamily: fonts.serif,
          fontSize: 24,
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
        <p style={{ fontSize: 13, color: colors.textMuted, margin: 0 }}>
          {t('success.confirmation', { email })}
        </p>
      )}
    </div>
  );
}

function ReturningCustomerCard({ loadId, name, dashboardUrl }) {
  const { t } = useTranslation('quote');
  const orderUrl = loadId ? `/portal/orders/${loadId}` : '/portal/dashboard';
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
        {loadId && (
          <a href={orderUrl} style={PRIMARY_BTN}>
            {t('returning.viewQuote')}
          </a>
        )}
        <a href={dashUrl} style={loadId ? SECONDARY_LINK_BTN : PRIMARY_BTN}>
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
                background: idx === 0 ? colors.accent : colors.bgMuted,
                color: idx === 0 ? '#FFFFFF' : colors.textHint,
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
                  color: colors.text,
                  fontFamily: fonts.sans,
                }}
              >
                {step.label}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: colors.textMuted,
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
          color: colors.textHint,
          paddingTop: 16,
          borderTop: `1px solid ${colors.borderInput}`,
          textAlign: 'center',
          fontFamily: fonts.sans,
        }}
      >
        {t('timeline.hours')}
      </div>
    </div>
  );
}
