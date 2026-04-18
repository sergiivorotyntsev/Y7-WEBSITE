import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';

export default function SmsConsent({ checked, onChange }) {
  const { t } = useTranslation();
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
        <Trans
          t={t}
          i18nKey="sms.fullConsent"
          components={{
            privacyLink: (
              <Link
                to="/privacy"
                style={{ color: colors.accent, textDecoration: 'underline' }}
              />
            ),
            smsTermsLink: (
              <Link
                to="/privacy#sms"
                style={{ color: colors.accent, textDecoration: 'underline' }}
              />
            ),
          }}
        />
      </span>
    </label>
  );
}
