import { useTranslation } from 'react-i18next';
import styles from './ProcessTimeline.module.css';

export default function ProcessTimeline() {
  const { t } = useTranslation('processTimeline');
  const steps = t('steps', { returnObjects: true });

  return (
    <section className={styles.section} aria-labelledby="process-timeline-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.kicker}>{t('kicker')}</span>
          <h2 id="process-timeline-title" className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <ol className={styles.timeline}>
          {Array.isArray(steps) && steps.map((step, i) => (
            <li key={i} className={styles.step} style={{ '--i': i }}>
              <div className={styles.num} aria-hidden="true">{i + 1}</div>
              <div className={styles.body}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <span className={styles.timing}>{step.timing}</span>
                <p className={styles.desc}>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
