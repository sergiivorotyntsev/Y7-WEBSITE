import { useTranslation } from 'react-i18next';
import styles from './QuoteStrip.module.css';
import v2t from '../styles/v2/type.module.css';
import v2b from '../styles/v2/buttons.module.css';

// DESIGN-V2-W2-T07: BaitQuote successor, now i18n x4 (the V1 magnet was
// EN-only — a known gap closed here). Static estimate PREVIEW, not a form:
// operational honesty, no fake calculation. Both interactive elements (the
// result tile and the CTA) target #quote-section, preserving the magnet's
// contract behavior. Pricing copy states the flat dispatch fee model
// (no spread, no hidden markup — CLAUDE.md operational facts).
export default function QuoteStrip({ onCta }) {
  const { t } = useTranslation('home');

  const go = (e) => {
    e.preventDefault();
    if (onCta) onCta();
  };

  const fields = [
    { label: t('quoteStrip.pickupLabel'), value: 'Dallas, TX' },
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
          <b className={styles.resultValue}>{t('quoteStrip.resultValue')}</b>
          <span className={`${v2t.monoMicro} ${styles.resultHedge}`}>{t('quoteStrip.resultHedge')}</span>
        </a>
      </div>
    </div>
  );
}
