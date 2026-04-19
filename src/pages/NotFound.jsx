import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { t } = useTranslation('notFound');
  const location = useLocation();
  const m = location.pathname.match(/^\/(ua|pl|ru)(\/|$)/);
  const prefix = m ? `/${m[1]}` : '';
  const L = (p) => `${prefix}${p}`;

  return (
    <div className={styles.wrap}>
      <PageMeta
        title={t('title')}
        description={t('subtitle')}
        path={location.pathname}
      />
      {/* Robots noindex via Helmet is not supported by current PageMeta shape,
          so we set it via document head effect. */}
      <NoIndexMeta />

      <div className={styles.inner}>
        <span className={styles.badge} aria-hidden="true">{t('badge')}</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>

        <div className={styles.suggestions}>
          <span className={styles.suggestionsKicker}>&#9670; {t('suggestionsHeading')}</span>
          <div className={styles.grid}>
            <Link to={L('/ship-my-car')} className={`${styles.card} ${styles.tone_coral}`}>
              <h2 className={styles.cardTitle}>{t('cards.shipMyCar.title')}</h2>
              <p className={styles.cardDesc}>{t('cards.shipMyCar.desc')}</p>
              <span className={styles.cardArrow} aria-hidden="true">&rarr;</span>
            </Link>
            <Link to={L('/dealers')} className={`${styles.card} ${styles.tone_teal}`}>
              <h2 className={styles.cardTitle}>{t('cards.dealers.title')}</h2>
              <p className={styles.cardDesc}>{t('cards.dealers.desc')}</p>
              <span className={styles.cardArrow} aria-hidden="true">&rarr;</span>
            </Link>
            <Link to={L('/exporters')} className={`${styles.card} ${styles.tone_amber}`}>
              <h2 className={styles.cardTitle}>{t('cards.exporters.title')}</h2>
              <p className={styles.cardDesc}>{t('cards.exporters.desc')}</p>
              <span className={styles.cardArrow} aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className={styles.secondary}>
          <Link to={L('/')} className={styles.secondaryLink}>{t('links.home')}</Link>
          <span className={styles.sep} aria-hidden="true">·</span>
          <Link to={L('/track')} className={styles.secondaryLink}>{t('links.track')}</Link>
          <span className={styles.sep} aria-hidden="true">·</span>
          <Link to={L('/contact')} className={styles.secondaryLink}>{t('links.contact')}</Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Injects <meta name="robots" content="noindex, follow"> into document.head
 * and removes it on unmount. Works without Helmet because PageMeta doesn't
 * currently expose a robots slot — see OVERNIGHT-T01.
 */
function NoIndexMeta() {
  if (typeof document === 'undefined') return null;
  const tag = document.querySelector('meta[name="robots"][data-notfound="1"]');
  if (!tag) {
    const m = document.createElement('meta');
    m.setAttribute('name', 'robots');
    m.setAttribute('content', 'noindex, follow');
    m.setAttribute('data-notfound', '1');
    document.head.appendChild(m);
  }
  return null;
}
