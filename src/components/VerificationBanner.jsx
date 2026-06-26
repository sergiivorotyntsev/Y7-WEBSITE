import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { colors, fonts, radii, spacing } from '../theme';

/**
 * VerificationBanner (DEALER-LIFECYCLE-G1)
 *
 * First-class, read-side indicator of a dealer/exporter's company-verification
 * lifecycle, sourced from /me (useAuth). The dealer can SEE where they stand:
 *
 *   - unverified    → "Under review" + trial-quote counter (N of 3 remaining)
 *   - needs_details → the admin's free-text request + how to respond
 *   - rejected      → the admin's free-text reason + a contact next step
 *   - verified      → nothing (cap lifted, orders open — no nagging)
 *
 * Portal pages are hardcoded-English (D2/T04b decision): no i18n here.
 * Shown only to dealers/exporters; individuals never see it. The dealer's
 * reply to a needs_details request is out-of-band for now (reply to the email
 * we sent / contact us) — the in-portal reply field is a deferred follow-up.
 */

const STATE_STYLES = {
  unverified: { bg: '#FFF8F0', border: colors.accent, badge: 'Under review', badgeBg: colors.accent },
  // AQ-3: pending_review is the canonical "applied, awaiting Y7" state.
  pending_review: { bg: '#FFF8F0', border: colors.accent, badge: 'Under review', badgeBg: colors.accent },
  needs_details: { bg: '#FEF6E6', border: '#B8860B', badge: 'Action needed', badgeBg: '#B8860B' },
  rejected: { bg: '#FDECEA', border: '#B91C1C', badge: 'Not approved', badgeBg: '#B91C1C' },
};

export default function VerificationBanner() {
  const { user } = useAuth();
  if (!user) return null;
  if (!['dealer', 'exporter'].includes(user.customer_type)) return null;

  const status = user.company_verification_status;
  // verified (or unknown/null) → cap lifted, orders open: nothing to show.
  if (!status || status === 'verified') return null;

  const st = STATE_STYLES[status] || STATE_STYLES.unverified;
  const note = user.company_verification_note;
  const limit = user.trial_quote_limit || 3;
  const remaining = user.trial_quotes_remaining;

  let heading;
  let body;
  if (status === 'needs_details') {
    heading = 'We need a little more to verify your company';
    body = note || 'Please update your application so we can continue your verification.';
  } else if (status === 'rejected') {
    heading = 'Your company verification was not approved';
    body = note || 'Please contact us if you would like to discuss next steps.';
  } else {
    heading = 'Your company is under review';
    body =
      'You can request a limited number of trial quotes now. Direct transport orders open once Y7 activates your account.';
  }

  // Counter is for dealers still in the trial window (not rejected). null
  // remaining means "unlimited" (verified) — already returned above.
  const showCounter = status !== 'rejected' && typeof remaining === 'number';
  const counterText =
    remaining === 0
      ? `You've used all ${limit} trial quotes — complete verification to request more.`
      : `${remaining} of ${limit} trial quotes remaining.`;

  return (
    <div
      role="alert"
      style={{
        background: st.bg,
        borderLeft: `4px solid ${st.border}`,
        padding: `${spacing.md}px ${spacing.md}px`,
        borderRadius: radii.md,
        marginBottom: spacing.md,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: 8, flexWrap: 'wrap' }}>
        <span
          style={{
            background: st.badgeBg,
            color: '#fff',
            fontFamily: fonts.sans,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            padding: '3px 10px',
            borderRadius: 10,
            whiteSpace: 'nowrap',
          }}
        >
          {st.badge}
        </span>
        <span style={{ fontFamily: fonts.serif, fontSize: 16, fontWeight: 700, color: colors.text }}>
          {heading}
        </span>
      </div>

      <p
        style={{
          fontFamily: fonts.sans,
          fontSize: 13,
          color: colors.text,
          lineHeight: 1.55,
          margin: 0,
          whiteSpace: 'pre-wrap',
        }}
      >
        {body}
      </p>

      {status === 'needs_details' && (
        <p style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, lineHeight: 1.5, margin: '8px 0 0' }}>
          <Link to="/portal/application" style={{ color: colors.accent, fontWeight: 600 }}>Update your application</Link>{' '}
          with the requested information, or{' '}
          <Link to="/contact" style={{ color: colors.accent }}>contact us</Link>.
        </p>
      )}

      {(status === 'pending_review' || status === 'unverified') && (
        <p style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, lineHeight: 1.5, margin: '8px 0 0' }}>
          <Link to="/portal/application" style={{ color: colors.accent, fontWeight: 600 }}>View your application</Link>
        </p>
      )}

      {status === 'rejected' && (
        <p style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, lineHeight: 1.5, margin: '8px 0 0' }}>
          <Link to="/contact" style={{ color: colors.accent }}>Contact us</Link> to discuss next steps.
        </p>
      )}

      {showCounter && (
        <div
          style={{
            marginTop: 12,
            paddingTop: 10,
            borderTop: `1px solid ${st.border}33`,
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 600,
            color: remaining === 0 ? '#B91C1C' : colors.text,
          }}
        >
          {counterText}
        </div>
      )}
    </div>
  );
}
