import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import styles from './ProcessSteps.module.css';
import v2s from '../styles/v2/surfaces.module.css';
import v2t from '../styles/v2/type.module.css';
import v2c from '../styles/v2/cards.module.css';

// DESIGN-V2-W2-T05: net-new homepage Process band (manifest surface). Reuses
// the existing 5-step howItWorks copy (already shipped x4 locales) — the honest
// operational version, chosen over the concept's 4-step sketch at Gate A.
// Step numeral watermark = 9% red alpha (Signal Budget low-alpha exemption).
const STEP_KEYS = ['submit', 'price', 'sign', 'carrier', 'delivered'];

export default function ProcessSteps() {
  const { t } = useTranslation('home');

  return (
    <section className={v2s.manifest}>
      <div className={v2s.inner}>
        <ScrollReveal>
          <div className={styles.head}>
            <p className={`${v2t.eyebrow} ${v2t.eyebrowOnPaper}`}>{t('howItWorks.kicker')}</p>
            <h2 className={v2t.sectionDisplay}>{t('howItWorks.title')}</h2>
          </div>
          <div className={styles.steps}>
            {STEP_KEYS.map((k, i) => (
              <div key={k} className={`${v2c.step} ${styles.step}`} data-step={String(i + 1).padStart(2, '0')}>
                <h3 className={`${v2t.cardTitle} ${styles.stepTitle}`}>{t(`howItWorks.steps.${k}Title`)}</h3>
                <p className={styles.stepDesc}>{t(`howItWorks.steps.${k}Desc`)}</p>
                <span className={`${v2t.monoMicro} ${styles.stepStat}`}>{t(`howItWorks.steps.${k}Stat`)}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
