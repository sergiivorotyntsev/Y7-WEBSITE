import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { SearchIcon, QuestionIcon } from '../components/icons';
import { apiGet } from '../hooks/useApi';
import { STATUS_PIPELINE, STATUS_LABELS } from '../utils/orderStatus';
import { trackEvent } from '../utils/analytics';
import styles from './Track.module.css';
import btn from '../styles/buttons.module.css';

function fmtDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function Track() {
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
      <PageMeta title="Track Your Shipment" description="Check your vehicle shipment status. Enter your reference number or VIN." path="/track" />

      <div className={styles.header}>
        <div className={styles.headerIcon}><SearchIcon size={22} /></div>
        <span className={styles.kicker}>&#9670; Shipment Status</span>
        <h1 className={styles.title}>Track Your Shipment</h1>
        <p className={styles.subtitle}>
          Enter your reference number, VIN, or tracking code to check shipment status.
        </p>
      </div>

      <form onSubmit={handleSearch} className={styles.form}>
        <input
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="WEB-00042, VIN, or Load ID..."
          className={styles.searchInput}
        />
        <button
          type="submit"
          disabled={loading}
          className={`${btn.btnAccent} ${styles.submitBtn}`}
        >
          {loading ? '...' : 'Track'}
        </button>
      </form>

      {error && (
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}><QuestionIcon size={44} /></div>
          <p className={styles.errorMsg}>
            {error === 'Shipment not found' ? 'No shipment found with that code. Please check and try again.' : error}
          </p>
          <div className={styles.errorCtas}>
            <Link to="/ship-my-car" className={`${btn.btnAccent} ${styles.errorBtn}`}>
              Get a Quote
            </Link>
            <Link to="/portal/login" className={`${btn.btnSecondary} ${styles.errorBtn}`}>
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
            {STATUS_PIPELINE.map((s, i) => {
              const done = i <= statusIdx;
              const isCurrent = s === normalizedStatus;
              const isLast = i === STATUS_PIPELINE.length - 1;
              const label = STATUS_LABELS[s] || s;

              const dotClass = isCurrent
                ? styles.timelineDotCurrent
                : done
                  ? styles.timelineDotDone
                  : styles.timelineDot;
              const labelClass = done ? styles.timelineLabelDone : styles.timelineLabel;

              return (
                <div key={s} className={isLast ? styles.timelineRowLast : styles.timelineRow}>
                  <div className={styles.timelineDotWrap}>
                    <div className={dotClass} />
                    {!isLast && (
                      <div className={done ? styles.timelineLineDone : styles.timelineLine} />
                    )}
                  </div>
                  <div className={styles.timelineText}>
                    <span className={labelClass}>{label}</span>
                    {isCurrent && <span className={styles.timelineCurrent}>Current</span>}
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

      {/* Help text */}
      {!result && !error && !loading && (
        <div className={styles.helpText}>
          Don't have a tracking code?{' '}
          <Link to="/ship-my-car" className={styles.helpLink}>Get a Quote</Link>
          {' or '}
          <Link to="/portal/login" className={styles.helpLink}>Log In</Link>
        </div>
      )}
    </div>
  );
}
