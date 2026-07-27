import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { SearchIcon, QuestionIcon, PortalIcon, TelegramIcon, EmailIcon } from '../components/icons';
import { apiGet } from '../hooks/useApi';
import { ORDER_STATUS, STATUS_PIPELINE, STATUS_LABELS } from '../utils/orderStatus';
import { trackEvent } from '../utils/trackEvent';
import styles from './Track.module.css';
import v2b from '../styles/v2/buttons.module.css';

function fmtDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function Track() {
  const { t } = useTranslation('common');
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await apiGet(`/api/public/track?code=${encodeURIComponent(code.trim())}`);
      setResult(data);
      trackEvent('track_shipment_submit');
    } catch (err) {
      setError(err.message || 'Shipment not found');
    } finally {
      setLoading(false);
    }
  }

  const normalizedStatus = result ? (result.status || '').toLowerCase() : '';
  const statusIdx = result ? STATUS_PIPELINE.indexOf(normalizedStatus) : -1;

  return (
    <div className={styles.wrap}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Track',url:'/track'}]} />
      <PageMeta title={t('meta.trackTitle')} description={t('meta.trackDescription')} path="/track" />

      <div className={styles.header}>
        <div className={styles.headerIcon}><SearchIcon size={22} /></div>
        <span className={styles.kicker}>{t('track.kicker')}</span>
        <h1 className={styles.title}>{t('track.h1')}</h1>
        <p className={styles.subtitle}>{t('track.subtitle')}</p>
      </div>

      <div className={styles.body}>
      <div className={styles.explanationBlock}>
        <p className={styles.explanation}>{t('track.explanation')}</p>
        <p className={styles.fastestPath}>{t('track.fastestPath')}</p>
      </div>

      <form onSubmit={handleSearch} className={styles.form}>
        <input
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder={t('track.searchPlaceholder')}
          aria-label={t('track.searchPlaceholder')}
          className={styles.searchInput}
        />
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className={`${v2b.cta} ${styles.submitBtn}`}
        >
          {loading ? '...' : 'Track'}
        </button>
      </form>

      {/* a11y: live region announces the async result / error to screen readers */}
      <div aria-live="polite">
      {error && (
        <div className={styles.errorCard} role="alert">
          <div className={styles.errorIcon}><QuestionIcon size={44} /></div>
          <p className={styles.errorMsg}>
            {error === 'Shipment not found' ? 'No shipment found with that code. Please check and try again.' : error}
          </p>
          <div className={styles.errorCtas}>
            <Link to="/ship-my-car" className={`${v2b.ghostOnPaper} ${styles.errorBtn}`}>
              Get a Quote
            </Link>
            <Link to="/portal/login" className={`${v2b.ghostOnPaper} ${styles.errorBtn}`}>
              Sign In
            </Link>
          </div>
        </div>
      )}

      {result && (
        <div className={styles.resultCard}>
          {result.vehicle && <h2 className={styles.vehicle}>{result.vehicle}</h2>}
          {result.vin && <p className={styles.vin}>VIN: {result.vin}</p>}

          {/* Status timeline */}
          <div className={styles.timeline}>
            {/* NEX-7 (1c): 'listed' is a rank in the pipeline but renders only
                while current — a transient sourcing state, not a milestone
                every order passes through. Done-ness compares full-pipeline
                ranks so the filtered render keeps honest progress. */}
            {STATUS_PIPELINE.filter((s) => s !== ORDER_STATUS.LISTED || s === normalizedStatus).map((s, i, renderSteps) => {
              const done = STATUS_PIPELINE.indexOf(s) <= statusIdx;
              const isCurrent = s === normalizedStatus;
              const isLast = i === renderSteps.length - 1;
              const label = STATUS_LABELS[s] || s;

              const dotClass = isCurrent
                ? styles.timelineDotCurrent
                : done
                  ? styles.timelineDotDone
                  : styles.timelineDot;
              const labelClass = done ? styles.timelineLabelDone : styles.timelineLabel;

              return (
                <div key={s} className={isLast ? styles.timelineRowLast : styles.timelineRow} aria-current={isCurrent ? 'step' : undefined}>
                  <div className={styles.timelineDotWrap}>
                    <div className={dotClass} />
                    {!isLast && (
                      <div className={done ? styles.timelineLineDone : styles.timelineLine} />
                    )}
                  </div>
                  <div className={styles.timelineText}>
                    <span className={labelClass}>{label}</span>
                    {isCurrent && <span className={styles.timelineCurrent}>{t('track.currentLabel')}</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Route + carrier */}
          <div className={styles.meta}>
            {(result.pickup || result.route) && (
              <div>
                Route:{' '}
                <strong className={styles.metaStrong}>
                  {result.pickup && result.delivery ? `${result.pickup} \u2192 ${result.delivery}` : result.route}
                </strong>
              </div>
            )}
            {result.carrier_name && (
              <div>Carrier: <strong className={styles.metaStrong}>{result.carrier_name}</strong></div>
            )}
            {result.last_update && <div>Last updated: {fmtDate(result.last_update)}</div>}
          </div>
        </div>
      )}
      </div>

      {/* Help text */}
      {!result && !error && !loading && (
        <div className={styles.helpText}>
          Don't have a tracking code?{' '}
          <Link to="/ship-my-car" className={styles.helpLink}>{t('track.helpLink')}</Link>
          {' or '}
          <Link to="/portal/login" className={styles.helpLink}>Log In</Link>
        </div>
      )}

      {/* Fallback cards: portal / Telegram / email info */}
      <div className={styles.fallbackSection}>
        <div className={styles.orderNote}>
          <p>{t('track.orderNote')}</p>
        </div>
        <h2 className={styles.fallbackHeading}>{t('track.fallbackHeading')}</h2>
        <div className={styles.fallbackGrid}>
          <Link to="/portal/login" className={styles.fallbackCard}>
            <span className={styles.fallbackIcon}><PortalIcon size={22} /></span>
            <h3 className={styles.fallbackTitle}>{t('track.portalCard.title')}</h3>
            <p className={styles.fallbackDesc}>{t('track.portalCard.desc')}</p>
            <span className={styles.fallbackCta}>{t('track.portalCard.cta')} &rarr;</span>
          </Link>
          <a href="https://t.me/y7dispatch_bot" target="_blank" rel="noopener noreferrer" className={styles.fallbackCard}>
            <span className={styles.fallbackIcon}><TelegramIcon size={22} /></span>
            <h3 className={styles.fallbackTitle}>{t('track.telegramCard.title')}</h3>
            <p className={styles.fallbackDesc}>{t('track.telegramCard.desc')}</p>
            <span className={styles.fallbackCta}>{t('track.telegramCard.cta')} &rarr;</span>
          </a>
          <a href="mailto:info@y7agency.com" className={styles.fallbackCard}>
            <span className={styles.fallbackIcon}><EmailIcon size={22} /></span>
            <h3 className={styles.fallbackTitle}>{t('track.emailCard.title')}</h3>
            <p className={styles.fallbackDesc}>{t('track.emailCard.desc')}</p>
            <span className={styles.fallbackCta}>{t('track.emailCard.cta')} &rarr;</span>
          </a>
        </div>
      </div>
      </div>
    </div>
  );
}
