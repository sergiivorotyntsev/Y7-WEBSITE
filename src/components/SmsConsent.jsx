import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../theme';

/**
 * SmsConsent — TCPA affirmative opt-in checkbox.
 *
 * Props:
 *   checked     (bool)        — current value
 *   onChange    (fn)          — setter
 *   showError   (bool)        — parent passes true after failed submit attempt
 *                               to reveal the errorRequired message. Error only
 *                               shows when `showError && !checked`.
 *
 * Namespace note: all SMS i18n keys live in `quote.json`, so we explicitly
 * load the `quote` namespace. Earlier versions used the default namespace
 * which silently failed to resolve and rendered the raw key on prod.
 */
export default function SmsConsent({ checked, onChange, showError = false, optional = false }) {
  const { t } = useTranslation('quote');

  return (
    <div style={{ marginTop: '8px' }}>
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
          aria-required={optional ? 'false' : 'true'}
          aria-invalid={showError && !checked ? 'true' : 'false'}
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
          fontSize: '12px',
          color: colors.textPrimary || '#1f2937',
          lineHeight: 1.5,
        }}>
          {t('sms.checkboxLabel')}
        </span>
      </label>

      {showError && !checked && (
        <div
          role="alert"
          style={{
            marginTop: '8px',
            padding: '8px 12px',
            background: '#fef2f2',
            border: '1px solid #b91c1c',
            borderRadius: '4px',
            color: '#b91c1c',
            fontSize: '12px',
            fontFamily: fonts.sans,
            lineHeight: 1.4,
          }}
        >
          {t('sms.errorRequired')}
        </div>
      )}
    </div>
  );
}
