import { useState, useEffect, useRef } from 'react';
import { API_URL } from '../config';
import { colors, fonts } from '../theme';

export default function RouteEstimator({ pickupZip, deliveryZip }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Clear previous timer
    if (timerRef.current) clearTimeout(timerRef.current);

    const from = (pickupZip || '').trim();
    const to = (deliveryZip || '').trim();

    if (from.length < 5 || to.length < 5) {
      setData(null);
      return;
    }

    // Debounce 500ms
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/api/public/distance?from_zip=${encodeURIComponent(from)}&to_zip=${encodeURIComponent(to)}`
        );
        if (!res.ok) {
          setData(null);
          setLoading(false);
          return;
        }
        const json = await res.json();
        if (json.error) {
          setData(null);
        } else {
          setData(json);
        }
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [pickupZip, deliveryZip]);

  if (!data && !loading) return null;

  if (loading) {
    return (
      <div style={{
        background: colors.bgMuted,
        borderRadius: '12px',
        padding: '16px 20px',
        marginTop: '8px',
        marginBottom: '8px',
        textAlign: 'center',
        fontFamily: fonts.sans,
        fontSize: '12px',
        color: colors.textMuted,
      }}>
        Calculating route...
      </div>
    );
  }

  const routeLabel = (data.from_city && data.to_city)
    ? `${data.from_city} \u2192 ${data.to_city}`
    : `${pickupZip} \u2192 ${deliveryZip}`;

  return (
    <div style={{
      background: colors.bgMuted,
      borderRadius: '12px',
      padding: '20px',
      marginTop: '8px',
      marginBottom: '8px',
      animation: 'fadeUp 300ms ease',
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes growBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
      }}>
        <span style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          fontWeight: 600,
          color: colors.text,
        }}>
          {routeLabel}
        </span>
        <span style={{
          fontFamily: fonts.mono,
          fontSize: '13px',
          fontWeight: 600,
          color: colors.accent,
        }}>
          ~{data.distance_miles.toLocaleString()} mi
        </span>
      </div>

      {/* Progress bar */}
      <div style={{
        height: '4px',
        background: colors.border,
        borderRadius: '2px',
        marginBottom: '12px',
      }}>
        <div style={{
          height: '100%',
          background: colors.accent,
          borderRadius: '2px',
          width: '100%',
          animation: 'growBar 600ms ease forwards',
        }} />
      </div>
    </div>
  );
}
