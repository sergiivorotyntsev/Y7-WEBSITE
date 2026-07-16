import { useTranslation } from 'react-i18next';
import { lookupBand } from '../data/dispatchRates';
import styles from './QuoteStrip.module.css';
import v2t from '../styles/v2/type.module.css';
import v2b from '../styles/v2/buttons.module.css';

// DESIGN-V2-W2-T07 + T12: BaitQuote successor, i18n x4. Static estimate
// PREVIEW with a REAL carrier-rate range from src/data/dispatchRates.js
// (derived from Sergii's actual Central Dispatch loads; see
// scripts/derive-rates.mjs provenance). Preview route: Chicago, IL ->
// Newark, NJ (~790 mi, 501-800 band) — matches the /routes Chicago->Port
// Newark page. Honesty laws: the figure is a hedged typical range, never a
// guaranteed price; the flat Y7 fee is named but not numbered (quoted per
// customer in the quote flow). Both interactive elements target
// #quote-section (contract). Follow-up (approved): restore V1-style
// interactive route/vehicle selects over lookupBand after this static
// range ships.
const PREVIEW_MILES = 790; // Chicago, IL -> Newark, NJ
export default function QuoteStrip({ onCta }) {
  const { t } = useTranslation('home');

  const go = (e) => {
    e.preventDefault();
    if (onCta) onCta();
  };

  const band = lookupBand(PREVIEW_MILES);
  const range = band ? `$${band.p25}-$${band.p75}` : null;

  const fields = [
    { label: t('quoteStrip.pickupLabel'), value: 'Chicago, IL' },
    { label: t('quoteStrip.deliverLabel'), value: 'Newark, NJ' },
    { label: t('quoteStrip.vehicleLabel'), value: 'Sedan / SUV' },
    { label: t('quoteStrip.transportLabel'), value: t('quoteStrip.transportValue') },
  ];

  return (
    <div className={styles.strip}>
      {/* No eyebrow here (opener varies): the strip's Signal Budget is spent by
          the red result value + the serve block's rule-line below. */}
      <div className={styles.copy}>
        <h2 className={`${v2t.sectionDisplay} ${styles.title}`}>{t('quoteStrip.title')}</h2>
        <p className={`${v2t.lede} ${v2t.ledeOnPaper}`}>{t('quoteStrip.desc')}</p>
        <a href="#quote-section" onClick={go} className={`${v2b.ghostOnPaper} ${styles.cta}`}>
          {t('quoteStrip.cta')}
        </a>
        <p className={`${v2t.monoMicro} ${styles.ctaHedge}`}>{t('quoteStrip.ctaHedge')}</p>
      </div>
      <div className={styles.calc} aria-hidden="false">
        {fields.map(f => (
          <div key={f.label} className={styles.field}>
            <span className={`${v2t.monoMicro} ${styles.fieldLabel}`}>{f.label}</span>
            <strong className={styles.fieldValue}>{f.value}</strong>
          </div>
        ))}
        <a href="#quote-section" onClick={go} className={styles.result}>
          <span className={`${v2t.monoMicro} ${styles.resultLabel}`}>{t('quoteStrip.resultLabel')}</span>
          <b className={styles.resultValue}>{range}</b>
          <span className={`${v2t.monoMicro} ${styles.resultHedge}`}>{t('quoteStrip.resultHedge')}</span>
          <span className={`${v2t.monoMicro} ${styles.resultFee}`}>{t('quoteStrip.resultFee')}</span>
        </a>
      </div>
    </div>
  );
}
