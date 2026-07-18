import { useTranslation } from 'react-i18next';
import { CheckIcon } from './icons';
import styles from './TransportComparison.module.css';
import v2b from '../styles/v2/buttons.module.css';



export default function TransportComparison() {
  const { t } = useTranslation('transportComparison');
  const TYPES = [
    {
      title: t('open.title'),
      features: t('open.features', { returnObjects: true }),
      price: t('open.price'),
      cta: t('open.cta'),
      type: 'open',
    },
    {
      title: t('enclosed.title'),
      features: t('enclosed.features', { returnObjects: true }),
      price: t('enclosed.price'),
      cta: t('enclosed.cta'),
      type: 'enclosed',
      premium: true,
    },
  ];

  function scrollToQuote(type) {
    const el = document.getElementById('quote-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('selectTransportType', { detail: type }));
  }

  const handleKey = (type) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToQuote(type);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>{t('title')}</h2>

      <div className={styles.grid}>
        {TYPES.map(t2 => (
          <div
            key={t2.type}
            className={styles.card}
            onClick={() => scrollToQuote(t2.type)}
            onKeyDown={handleKey(t2.type)}
            role="button"
            tabIndex={0}
          >
            {t2.premium && <div className={styles.badge}>{t('premiumBadge')}</div>}
            <h3 className={styles.cardTitle}>{t2.title}</h3>
            <ul className={styles.featureList}>
              {(Array.isArray(t2.features) ? t2.features : []).map((f, i) => (
                <li key={i} className={styles.feature}>
                  <span className={styles.featureIcon}><CheckIcon size={16} /></span>
                  {f}
                </li>
              ))}
            </ul>
            <div className={styles.price}>{t2.price}</div>
            <button
              onClick={e => { e.stopPropagation(); scrollToQuote(t2.type); }}
              className={`${t2.premium ? v2b.cta : v2b.ghostOnDark} ${styles.cta}`}
            >
              {t2.cta}
            </button>
          </div>
        ))}
      </div>

      <p className={styles.disclaimer}>{t('disclaimer')}</p>
    </div>
  );
}
