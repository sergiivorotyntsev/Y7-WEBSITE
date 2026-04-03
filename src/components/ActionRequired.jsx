import { Link } from 'react-router-dom';
import { colors, fonts, button as btnStyles } from '../theme';
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
      <div style={{ marginBottom: '20px' }}>{config.icon}</div>
      <h2 style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: 700, color: colors.text, marginBottom: '12px' }}>
        {config.title}
      </h2>
      <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, maxWidth: '400px', marginBottom: '24px', lineHeight: 1.6 }}>
        {displayMessage}
      </p>
      <Link to={config.action.to} style={{ ...btnStyles.accent, padding: '12px 28px', fontSize: '14px', textDecoration: 'none' }}>
        {config.action.label}
      </Link>
    </div>
  );
}
