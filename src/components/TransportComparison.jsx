import { CheckIcon } from './icons';
import styles from './TransportComparison.module.css';
import btn from '../styles/buttons.module.css';

const TYPES = [
  {
    title: 'Open Transport',
    features: [
      'Standard multi-car carrier',
      '7-10 vehicle capacity',
      'Weather exposed during transit',
      'Most popular option (85% of shipments)',
      'Best for daily drivers and standard vehicles',
    ],
    price: 'Most affordable option',
    cta: 'Get Open Quote',
    type: 'open',
  },
  {
    title: 'Enclosed Transport',
    features: [
      'Fully enclosed trailer',
      '2-6 vehicle capacity',
      'Complete protection from elements',
      'Premium white-glove service',
      'Best for luxury, classic, and sports cars',
    ],
    price: 'Premium protection',
    cta: 'Get Enclosed Quote',
    type: 'enclosed',
    premium: true,
  },
];

export default function TransportComparison() {
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
      <h2 className={styles.title}>Open vs Enclosed Transport</h2>

      <div className={styles.grid}>
        {TYPES.map(t => (
          <div
            key={t.type}
            className={styles.card}
            onClick={() => scrollToQuote(t.type)}
            onKeyDown={handleKey(t.type)}
            role="button"
            tabIndex={0}
          >
            {t.premium && <div className={styles.badge}>Premium</div>}
            <h3 className={styles.cardTitle}>{t.title}</h3>
            <ul className={styles.featureList}>
              {t.features.map((f, i) => (
                <li key={i} className={styles.feature}>
                  <span className={styles.featureIcon}><CheckIcon size={16} /></span>
                  {f}
                </li>
              ))}
            </ul>
            <div className={styles.price}>{t.price}</div>
            <button
              onClick={e => { e.stopPropagation(); scrollToQuote(t.type); }}
              className={`${t.premium ? btn.btnAccent : btn.btnPrimary} ${styles.cta}`}
            >
              {t.cta}
            </button>
          </div>
        ))}
      </div>

      <p className={styles.disclaimer}>
        Actual pricing varies by route, vehicle size, and season.
      </p>
    </div>
  );
}
