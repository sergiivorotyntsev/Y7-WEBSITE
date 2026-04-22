import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { colors, fonts } from '../theme';

export default function AccountSetupBanner() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const items = [];

  // ONBOARD-T12: classification + agreement signing are now driven by
  // the unified onboarding wizard. The banner still exists as a safety
  // net on pages the redirects don't cover (or while the user deep-links
  // to an unrelated portal page mid-setup).
  if (!user.customer_type
      || user.customer_type === 'unknown'
      || user.customer_type === 'shipper') {
    items.push({
      id: 'classify',
      title: 'Complete Account Classification',
      description: 'Tell us about your business to get started.',
      action: () => navigate('/portal/onboarding'),
      actionLabel: 'Classify Now',
    });
  }

  const needsLocation = ['dealer', 'exporter', 'auction_buyer'].includes(user.customer_type);
  if (needsLocation && !user.has_locations) {
    items.push({
      id: 'set_location',
      title: 'Set Default Delivery Location',
      description: 'Add your primary delivery address so we can route shipments correctly.',
      action: () => navigate('/portal/locations/setup'),
      actionLabel: 'Add Location',
    });
  }

  if (user.customer_type
      && user.customer_type !== 'unknown'
      && user.customer_type !== 'shipper'
      && !user.agreement_signed) {
    const typeLabel = {
      dealer: 'Dealer Transport Agreement',
      individual: 'Transport Service Agreement',
      auction_buyer: 'Transport Service Agreement',
      exporter: 'Exporter Transport Agreement',
    }[user.customer_type] || 'Transport Service Agreement';

    items.push({
      id: 'agreement',
      title: `Sign ${typeLabel}`,
      description: 'Required to create transport orders.',
      // ONBOARD-T12: signing happens in the unified wizard at Step 2;
      // the wizard picks up the already-set customer_type from /me.
      action: () => navigate('/portal/onboarding'),
      actionLabel: 'Sign Now',
    });
  }

  if (
    user.customer_type === 'dealer' &&
    user.billing_mode === 'prepay_manual_invoice' &&
    !user.bank_auth_signed
  ) {
    items.push({
      id: 'bank_auth',
      title: 'Sign Bank Authorization Agreement',
      description: 'Required for prepay billing. Allows Y7 to issue weekly deposit invoices.',
      action: () => navigate(`/agreement?customer_id=${user.id}&type=bank_auth`),
      actionLabel: 'Sign Now',
    });
  }

  if (items.length === 0) return null;

  return (
    <div style={{
      background: '#FFF8F0',
      border: `2px solid ${colors.accent}`,
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
    }}>
      <h2 style={{
        margin: '0 0 8px',
        fontSize: '18px',
        fontWeight: 700,
        color: colors.accent,
        fontFamily: fonts.serif,
      }}>
        Account Setup Incomplete
      </h2>
      <p style={{
        margin: '0 0 20px',
        fontSize: '13px',
        color: colors.textMuted,
        fontFamily: fonts.sans,
      }}>
        Complete the following {items.length === 1 ? 'step' : 'steps'} to activate your account:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map(item => (
          <div key={item.id} style={{
            background: colors.bgCard,
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            border: `1px solid ${colors.border}`,
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: '14px', color: colors.text, marginBottom: '4px' }}>
                {item.title}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted }}>
                {item.description}
              </div>
            </div>
            <button
              onClick={item.action}
              style={{
                background: colors.accent,
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: fonts.sans,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {item.actionLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
