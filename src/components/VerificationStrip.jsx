import { useTranslation } from 'react-i18next';
import styles from './VerificationStrip.module.css';

const FMCSA_URL = 'https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=4427359';
const BROKER_URL = 'https://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_getdetail?pv_apcant_id=1741537';
const CD_URL = 'https://www.centraldispatch.com/';

export default function VerificationStrip({ stacked }) {
  const { t } = useTranslation();
  // T06a: the component carries NO width system of its own — callers own the
  // container (the T06 rule). `stacked` renders the panel form: column,
  // left-aligned, separators hidden (they exist only for the inline row form).
  return (
    <div className={stacked ? `${styles.strip} ${styles.stacked}` : styles.strip}>
      <a href={FMCSA_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {t('verify.fmcsa')} USDOT #4427359 &rarr;
      </a>
      <span className={styles.divider} aria-hidden="true">&bull;</span>
      <a href={BROKER_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {t('verify.broker')} MC #1741537 &rarr;
      </a>
      <span className={styles.divider} aria-hidden="true">&bull;</span>
      <a href={CD_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {t('verify.cd')} &rarr;
      </a>
      <div className={styles.caption}>{t('verify.bondCaption')}</div>
    </div>
  );
}
