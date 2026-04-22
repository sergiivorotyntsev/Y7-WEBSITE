import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import UpdateEmailModal from './UpdateEmailModal';
import { colors, fonts } from '../../theme';

const bannerStyle = {
  background: '#FFF0EC',
  border: `1px solid ${colors.accent}`,
  borderRadius: '12px',
  padding: '14px 18px',
  margin: '0 0 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  flexWrap: 'wrap',
};

const iconStyle = {
  fontFamily: fonts.serif,
  fontSize: '18px',
  fontWeight: 700,
  color: colors.accent,
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: `2px solid ${colors.accent}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const messageStyle = {
  fontFamily: fonts.sans,
  fontSize: '13px',
  color: colors.text,
  lineHeight: 1.5,
  flex: '1 1 240px',
};

const ctaStyle = {
  fontFamily: fonts.sans,
  fontSize: '13px',
  fontWeight: 600,
  padding: '8px 16px',
  borderRadius: '8px',
  border: 'none',
  background: colors.accent,
  color: '#fff',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};

export default function BouncingEmailBanner() {
  const { user, checkAuth } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (!user || !user.email_bouncing) return null;

  function handleClose(updated) {
    setShowModal(false);
    if (updated) checkAuth();
  }

  return (
    <>
      <div style={bannerStyle} role="alert">
        <span style={iconStyle} aria-hidden="true">!</span>
        <span style={messageStyle}>
          Your emails to <strong>{user.email || 'this address'}</strong> are bouncing.
          We can't deliver order updates or notifications to this inbox.
        </span>
        <button onClick={() => setShowModal(true)} style={ctaStyle}>
          Update Email
        </button>
      </div>
      {showModal && <UpdateEmailModal onClose={handleClose} />}
    </>
  );
}
