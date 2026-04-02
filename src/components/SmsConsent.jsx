import { Link } from 'react-router-dom';
import { colors, fonts } from '../theme';

export default function SmsConsent({ checked, onChange }) {
  return (
    <label style={{
      display: 'flex',
      gap: '10px',
      alignItems: 'flex-start',
      cursor: 'pointer',
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{
          marginTop: '3px',
          width: '16px',
          height: '16px',
          accentColor: colors.accent,
          flexShrink: 0,
        }}
      />
      <span style={{
        fontFamily: fonts.sans,
        fontSize: '11px',
        color: colors.textMuted,
        lineHeight: 1.5,
      }}>
        By checking this box, you consent to receive SMS notifications and updates
        related to your vehicle transport from Y7 Consulting Inc at the phone number
        provided. Message frequency varies. Message &amp; data rates may apply.
        Reply STOP to opt out, HELP for help. This consent is not a condition of
        purchase. See our{' '}
        <Link to="/privacy" style={{ color: colors.accent, textDecoration: 'underline' }}>
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link to="/privacy#sms" style={{ color: colors.accent, textDecoration: 'underline' }}>
          SMS Terms &amp; Conditions
        </Link>.
      </span>
    </label>
  );
}
