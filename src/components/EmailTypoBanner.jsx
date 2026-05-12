import { motion, AnimatePresence } from 'framer-motion';
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
        <motion.div
          key={`typo-${suggestion}`}
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{
            overflow: 'hidden',
            backgroundColor: 'rgba(217, 119, 6, 0.08)',
            border: '1px solid rgba(217, 119, 6, 0.25)',
            borderRadius: 8,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            fontFamily: fonts.sans,
            fontSize: 13,
            color: '#8A5410',
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
              background: '#993C1D',
              color: '#fff',
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
