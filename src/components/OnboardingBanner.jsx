import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { colors, fonts, radii, spacing } from '../theme';

/**
 * OnboardingBanner (ONBOARD-T13)
 *
 * Hybrid-gate indicator: if a portal user lands on a page while their
 * account is incomplete (no classification or no signed agreement),
 * render a persistent banner with a single CTA into the wizard.
 *
 * Dashboard doesn't render this because its redirect effect already
 * shuttles incomplete users away to /portal/onboarding before the body
 * paints. This banner exists for pages reachable via deep links
 * (email CTAs, external bookmarks, admin-sent URLs) where the redirect
 * isn't wired — Profile, OrderDetail, NewOrder, Billing, Locations.
 *
 * Writes are still 403-gated server-side via require_active_customer;
 * this banner is the read-side cue.
 */
export default function OnboardingBanner() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const needsClassification = !user.customer_type
    || user.customer_type === 'unknown'
    || user.customer_type === 'shipper';
  const needsAgreement = user.customer_type
    && user.customer_type !== 'unknown'
    && user.customer_type !== 'shipper'
    && !user.agreement_signed;

  if (!needsClassification && !needsAgreement) return null;

  // AGR-2-T03: when the agreement DOCUMENT does not exist yet (exporter,
  // with counsel — ADR-012), "finish setup to unlock orders" is false and
  // the CTA would lead into a step that cannot complete. Tell the truth
  // instead, with no wizard CTA: nothing is required from the customer.
  const beingPrepared = needsAgreement && user.agreement_document_available === false;
  if (beingPrepared) {
    return (
      <div
        role="status"
        style={{
          background: '#F0FAF6',
          borderLeft: '4px solid #0F6E56',
          padding: `${spacing.sm}px ${spacing.md}px`,
          borderRadius: radii.md,
          marginBottom: spacing.md,
        }}
      >
        <span style={{ fontFamily: fonts.sans, fontSize: 13, color: '#0F6E56', lineHeight: 1.5 }}>
          Your {user.customer_type} agreement is being prepared with our legal team — nothing
          is required from you right now. We&rsquo;ll contact you to complete onboarding.
          Meanwhile you can send orders by email, review your profile, and add warehouses.
        </span>
      </div>
    );
  }

  const message = needsClassification
    ? 'Finish your account setup to start submitting quotes.'
    : 'Your agreement is not yet signed. Finish setup to unlock order creation.';

  return (
    <div
      role="alert"
      style={{
        background: '#FFF8F0',
        borderLeft: `4px solid ${colors.accent}`,
        padding: `${spacing.sm}px ${spacing.md}px`,
        borderRadius: radii.md,
        marginBottom: spacing.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: spacing.sm,
      }}
    >
      <span style={{
        fontFamily: fonts.sans,
        fontSize: 13,
        color: colors.text,
        lineHeight: 1.5,
      }}>
        {message}
      </span>
      <button
        type="button"
        onClick={() => navigate('/portal/onboarding')}
        style={{
          background: colors.accent,
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: 18,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          fontFamily: fonts.sans,
          cursor: 'pointer',
        }}
      >
        Complete setup
      </button>
    </div>
  );
}
