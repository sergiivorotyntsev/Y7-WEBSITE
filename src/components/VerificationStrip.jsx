import { useTranslation } from 'react-i18next';
import GlowDot from './GlowDot';
import styles from './VerificationStrip.module.css';

const FMCSA_URL = 'https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=4427359';
const BROKER_URL = 'https://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_getdetail?pv_apcant_id=1741537';
const CD_URL = 'https://www.centraldispatch.com/';

export default function VerificationStrip({ stacked }) {
  const { t } = useTranslation();

  // POLISH-T01: the panel (stacked) form is a credentials list — each row
  // carries a mono field label (regulatory identifiers, not marketing copy) so
  // the three links read with real vertical rhythm and fill the card height.
  // The inline form (Contact) is unchanged.
  if (stacked) {
    const rows = [
      { href: FMCSA_URL, label: 'USDOT', text: `${t('verify.fmcsa')} USDOT #4427359` },
      { href: BROKER_URL, label: 'MC', text: `${t('verify.broker')} MC #1741537` },
      { href: CD_URL, label: 'NETWORK', text: t('verify.cd') },
    ];
    return (
      <div className={`${styles.strip} ${styles.stacked}`}>
        {rows.map((r) => (
          <div key={r.label} className={styles.row}>
            <span className={styles.rowLabel} aria-hidden="true">{r.label}</span>
            <a href={r.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {r.text} &rarr;
            </a>
          </div>
        ))}
        {/* POLISH-T03: bondCaption ends with ACTIVE (all locales), so the live
            status dot lands on the Broker Authority line. */}
        <div className={styles.caption}>
          {t('verify.bondCaption')}
          <GlowDot size={7} color="var(--v2-red)" className={styles.activeDot} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.strip}>
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
