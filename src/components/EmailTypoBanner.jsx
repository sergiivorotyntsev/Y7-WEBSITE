import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fonts } from '../theme';

/**
 * Inline banner under email field shown when useEmailCheck flags a typo
 * (e.g. "gmial.com" → "gmail.com"). One tap accepts the suggestion.
 */
export default function EmailTypoBanner({ visible, suggestion, onAccept }) {
  const { t } = useTranslation('quote');
  return (
    <AnimatePresence>
      {visible && suggestion && (
        <Motion.div
          key={`typo-${suggestion}`}
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{
            // SPRINT-W7 B1: V2 neutral notice (V1 amber retired; red stays
            // reserved for errors — a typo suggestion is not an error).
            overflow: 'hidden',
            backgroundColor: 'rgba(5, 6, 7, 0.04)',
            border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
            borderRadius: 8,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            fontFamily: fonts.sans,
            fontSize: 13,
            color: 'var(--v2-ink, #050607)',
          }}
          role="status"
        >
          <span>
            {t('emailTypo.prompt')} <strong>{suggestion}</strong>?
          </span>
          <button
            type="button"
            onClick={onAccept}
            style={{
              background: 'var(--v2-ink, #050607)',
              color: 'var(--v2-paper, #f4f0e8)',
              border: 'none',
              borderRadius: 6,
              padding: '4px 12px',
              fontWeight: 600,
              fontFamily: 'inherit',
              fontSize: 12,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {t('emailTypo.cta')}
          </button>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
