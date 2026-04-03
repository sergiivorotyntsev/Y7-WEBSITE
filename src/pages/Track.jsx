import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { apiGet } from '../hooks/useApi';
import { colors, fonts, button as btnStyles } from '../theme';

const STATUS_ORDER = ['pending', 'quoted', 'confirmed', 'dispatched', 'DISPATCHED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'];
const STATUS_LABELS = {
  pending: 'Quote Requested', quoted: 'Quote Sent', confirmed: 'Confirmed',
  dispatched: 'Carrier Assigned', DISPATCHED: 'Dispatched', PICKED_UP: 'Picked Up',
  IN_TRANSIT: 'In Transit', DELIVERED: 'Delivered',
};

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
    } catch (err) {
      setError(err.message || 'Shipment not found');
    } finally {
      setLoading(false);
    }
  }

  const statusIdx = result ? STATUS_ORDER.indexOf(result.status) : -1;

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <PageMeta title="Track Your Shipment" description="Track your vehicle shipment in real-time. Enter your reference number or VIN." path="/track" />
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>{'\uD83D\uDD0D'}</div>
        <h1 style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(24px, 4vw, 34px)',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '8px',
        }}>
          Track Your Shipment
        </h1>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          lineHeight: 1.6,
        }}>
          Enter your reference number, VIN, or tracking code to see real-time status.
        </p>
      </div>

      <form onSubmit={handleSearch} style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '32px',
      }}>
        <input
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="WEB-00042, VIN, or Load ID..."
          style={{
            flex: 1,
            fontFamily: fonts.mono,
            fontSize: '16px',
            padding: '12px 16px',
            borderRadius: '10px',
            border: `1px solid ${colors.borderInput}`,
            background: colors.bgCard,
            color: colors.text,
            outline: 'none',
          }}
        />
        <button type="submit" disabled={loading} style={{
          ...btnStyles.accent,
          padding: '12px 24px',
          fontSize: '13px',
          opacity: loading ? 0.6 : 1,
        }}>
          {loading ? '...' : 'Track'}
        </button>
      </form>

      {error && (
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '32px 24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>{'\u2753'}</div>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, marginBottom: '20px' }}>
            {error === 'Shipment not found' ? 'No shipment found with that code. Please check and try again.' : error}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Link to="/ship-my-car" style={{ ...btnStyles.accent, textDecoration: 'none', padding: '10px 20px', fontSize: '12px' }}>
              Get a Quote
            </Link>
            <Link to="/portal/register" style={{ ...btnStyles.secondary, textDecoration: 'none', padding: '10px 20px', fontSize: '12px' }}>
              Create Account
            </Link>
          </div>
        </div>
      )}

      {result && (
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '24px',
        }}>
          {/* Vehicle header */}
          {result.vehicle && (
            <h2 style={{
              fontFamily: fonts.serif,
              fontSize: '20px',
              fontWeight: 700,
              color: colors.text,
              marginBottom: '4px',
            }}>
              {result.vehicle}
            </h2>
          )}
          {result.vin && (
            <p style={{ fontFamily: fonts.mono, fontSize: '12px', color: colors.textMuted, marginBottom: '20px' }}>
              VIN: {result.vin}
            </p>
          )}

          {/* Status timeline */}
          <div style={{ marginBottom: '20px' }}>
            {STATUS_ORDER.map((s, i) => {
              const done = i <= statusIdx;
              const isCurrent = s === result.status;
              const label = STATUS_LABELS[s] || s;
              return (
                <div key={s} style={{
                  display: 'flex',
                  gap: '12px',
                  minHeight: i < STATUS_ORDER.length - 1 ? '40px' : 'auto',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '16px' }}>
                    <div style={{
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: done ? colors.success : (isCurrent ? colors.accent : 'transparent'),
                      border: `2px solid ${done ? colors.success : (isCurrent ? colors.accent : colors.border)}`,
                      flexShrink: 0, marginTop: '2px',
                    }} />
                    {i < STATUS_ORDER.length - 1 && (
                      <div style={{ width: '2px', flex: 1, background: done ? colors.success : colors.border, opacity: 0.3 }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: '8px' }}>
                    <span style={{
                      fontFamily: fonts.sans,
                      fontSize: '13px',
                      fontWeight: done ? 600 : 400,
                      color: done ? colors.text : colors.textHint,
                    }}>
                      {label}
                    </span>
                    {isCurrent && (
                      <span style={{ fontFamily: fonts.sans, fontSize: '11px', color: colors.accent, marginLeft: '8px' }}>
                        Current
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Route + carrier */}
          <div style={{
            background: colors.bgInput,
            borderRadius: '8px',
            padding: '14px 16px',
            fontFamily: fonts.sans,
            fontSize: '13px',
            color: colors.textMuted,
            lineHeight: 1.8,
          }}>
            {(result.pickup || result.route) && (
              <div>Route: <strong style={{ color: colors.text }}>
                {result.pickup && result.delivery ? `${result.pickup} \u2192 ${result.delivery}` : result.route}
              </strong></div>
            )}
            {result.carrier_name && (
              <div>Carrier: <strong style={{ color: colors.text }}>{result.carrier_name}</strong></div>
            )}
            {result.last_update && (
              <div>Last updated: {fmtDate(result.last_update)}</div>
            )}
          </div>
        </div>
      )}

      {/* Help text */}
      {!result && !error && !loading && (
        <div style={{
          textAlign: 'center',
          fontFamily: fonts.sans,
          fontSize: '13px',
          color: colors.textHint,
          marginTop: '24px',
        }}>
          Don't have a tracking code?{' '}
          <Link to="/ship-my-car" style={{ color: colors.accent }}>Get a Quote</Link>
          {' or '}
          <Link to="/portal/login" style={{ color: colors.accent }}>Log In</Link>
        </div>
      )}
    </div>
  );
}
