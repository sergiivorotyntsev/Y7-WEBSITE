import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import styles from './NotFound.module.css';
import v2b from '../styles/v2/buttons.module.css';

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
        noindex
      />

      <div className={styles.inner}>
        <span className={styles.badge} aria-hidden="true">{t('badge')}</span>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>

        <div className={styles.suggestions}>
          <span className={styles.suggestionsKicker}>{t('suggestionsHeading')}</span>
          <div className={styles.grid}>
            <Link to={L('/ship-my-car')} className={styles.card}>
              <h2 className={styles.cardTitle}>{t('cards.shipMyCar.title')}</h2>
              <p className={styles.cardDesc}>{t('cards.shipMyCar.desc')}</p>
              <span className={styles.cardArrow} aria-hidden="true">&rarr;</span>
            </Link>
            <Link to={L('/dealers')} className={styles.card}>
              <h2 className={styles.cardTitle}>{t('cards.dealers.title')}</h2>
              <p className={styles.cardDesc}>{t('cards.dealers.desc')}</p>
              <span className={styles.cardArrow} aria-hidden="true">&rarr;</span>
            </Link>
            <Link to={L('/exporters')} className={styles.card}>
              <h2 className={styles.cardTitle}>{t('cards.exporters.title')}</h2>
              <p className={styles.cardDesc}>{t('cards.exporters.desc')}</p>
              <span className={styles.cardArrow} aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className={styles.secondary}>
          <Link to={L('/')} className={`${v2b.ghostOnDark} ${styles.secondaryLink}`}>{t('links.home')}</Link>
          <Link to={L('/track')} className={`${v2b.ghostOnDark} ${styles.secondaryLink}`}>{t('links.track')}</Link>
          <Link to={L('/contact')} className={`${v2b.ghostOnDark} ${styles.secondaryLink}`}>{t('links.contact')}</Link>
        </div>
      </div>
    </div>
  );
}
