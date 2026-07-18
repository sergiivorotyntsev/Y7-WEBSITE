import { useTranslation } from 'react-i18next';
import { fonts } from '../theme';

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
            // SPRINT-W7 B1: V2 signal-red control accent (was V1 sienna).
            accentColor: 'var(--v2-red, #d70f24)',
            flexShrink: 0,
          }}
        />
        <span style={{
          fontFamily: fonts.sans,
          fontSize: '12px',
          color: 'var(--v2-ink, #050607)',
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
            background: 'rgba(215, 15, 36, 0.06)',
            border: '1px solid rgba(215, 15, 36, 0.25)',
            borderRadius: '8px',
            color: 'var(--v2-red-deep, #a90918)',
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
