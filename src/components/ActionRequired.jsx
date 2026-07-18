import { Link } from 'react-router-dom';
import { fonts } from '../theme';
import { DocumentIcon, ProfileIcon, LockIcon, ClockIcon, ShieldIcon } from './icons';

const CONFIGS = {
  agreement_required: {
    icon: <DocumentIcon size={48} />,
    title: 'Agreement Required',
    message: 'Please sign the Transport Service Agreement before placing an order.',
    action: { label: 'Sign Agreement', to: '/agreement' },
  },
  profile_incomplete: {
    icon: <ProfileIcon size={48} />,
    title: 'Complete Your Profile',
    message: 'Please add your delivery address to continue.',
    action: { label: 'Complete Profile', to: '/portal/profile' },
  },
  account_deactivated: {
    icon: <LockIcon size={48} />,
    title: 'Account Deactivated',
    message: 'Your account has been deactivated. Please contact support.',
    action: { label: 'Contact Support', to: '/contact' },
  },
  session_expired: {
    icon: <ClockIcon size={48} />,
    title: 'Session Expired',
    message: 'Your session has expired. Please log in again.',
    action: { label: 'Log In', to: '/portal/login' },
  },
  no_access: {
    icon: <ShieldIcon size={48} />,
    title: 'Access Restricted',
    message: "You don't have access to this page.",
    action: { label: 'Go to Dashboard', to: '/portal/dashboard' },
  },
  // DEALER-LIFECYCLE-G1: structured 403 codes from the dealer-verification gate
  // and the trial-quote limit. Used when a page chooses to render a full-page
  // block; the persistent VerificationBanner (from /me) is the primary cue.
  company_verification_required: {
    icon: <ShieldIcon size={48} />,
    title: 'Company Verification Required',
    message: 'Your company must be verified before you can submit transport orders. You can still request quotes while we review your account.',
    action: { label: 'Go to Dashboard', to: '/portal/dashboard' },
  },
  trial_quotes_exhausted: {
    icon: <ShieldIcon size={48} />,
    title: 'Trial Quotes Used',
    message: 'You have used all of your trial quotes. Complete your company verification to request more.',
    action: { label: 'Go to Dashboard', to: '/portal/dashboard' },
  },
};

export default function ActionRequired({ type, message: customMessage }) {
  const config = CONFIGS[type] || CONFIGS.no_access;
  const displayMessage = customMessage || config.message;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '50vh', padding: '40px 24px',
      textAlign: 'center',
    }}>
      {/* SPRINT-W7 B2: V2 retoken (smoke-discovered V1 leftover — this shared
          screen renders between login and the portal on 401/403 states). */}
      <div style={{ marginBottom: '20px' }}>{config.icon}</div>
      <h2 style={{ fontFamily: 'var(--v2-font-display, Oswald, system-ui)', textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 1.05, fontSize: '24px', fontWeight: 600, color: 'var(--v2-ink, #050607)', marginBottom: '12px' }}>
        {config.title}
      </h2>
      <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: 'var(--v2-ink-muted, #5c5851)', maxWidth: '400px', marginBottom: '24px', lineHeight: 1.6 }}>
        {displayMessage}
      </p>
      <Link to={config.action.to} style={{ background: 'var(--v2-red-gradient, linear-gradient(135deg, #d70f24, #a90918))', color: '#fff7ed', borderRadius: 8, fontFamily: fonts.sans, fontWeight: 600, display: 'inline-block', padding: '12px 28px', fontSize: '14px', textDecoration: 'none' }}>
        {config.action.label}
      </Link>
    </div>
  );
}
