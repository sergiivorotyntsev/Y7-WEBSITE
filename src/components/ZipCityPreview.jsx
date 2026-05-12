import { motion, AnimatePresence } from 'framer-motion';
import { colors, fonts } from '../theme';

/**
 * Live city/state pill rendered under a ZIP input.
 *
 * Visual states:
 *   idle    → renders nothing (reserved 22px so the layout doesn't shift)
 *   pending → soft amber "Looking up…"
 *   valid   → green pill "📍 City, ST"
 *   invalid → amber pill "That ZIP doesn't look right — double-check?"
 *   error   → silent (don't punish the user for our Google outage)
 */
export default function ZipCityPreview({ status, city, stateAbbr, label }) {
  let content = null;
  let bg = 'transparent';
  let fg = colors.text;

  if (status === 'pending') {
    content = 'Looking up…';
    bg = 'rgba(153, 60, 29, 0.06)';
    fg = '#7A5230';
  } else if (status === 'valid' && city) {
    content = `📍 ${city}${stateAbbr ? ', ' + stateAbbr : ''}`;
    bg = 'rgba(15, 110, 86, 0.10)';
    fg = colors.success;
  } else if (status === 'invalid') {
    content = "That ZIP doesn't look right — double-check?";
    bg = 'rgba(217, 119, 6, 0.10)';
    fg = '#8A5410';
  }

  return (
    <div style={{ minHeight: 22, marginTop: 4 }} aria-live="polite">
      <AnimatePresence mode="wait">
        {content && (
          <motion.span
            key={`${status}-${content}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              display: 'inline-block',
              fontFamily: fonts.sans,
              fontSize: 13,
              fontWeight: 500,
              padding: '3px 10px',
              borderRadius: 999,
              backgroundColor: bg,
              color: fg,
            }}
            aria-label={label ? `${label}: ${content}` : content}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
