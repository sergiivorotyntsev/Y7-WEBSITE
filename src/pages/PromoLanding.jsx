import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { colors, fonts, shadows, radii } from '../theme';

export default function PromoLanding() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/public/promo/${encodeURIComponent(code)}`)
      .then(r => r.json())
      .then(data => { setPromo(data); setLoading(false); })
      .catch(() => { setPromo({ valid: false, error: 'Could not reach server' }); setLoading(false); });
  }, [code]);

  const handleCTA = () => {
    if (promo?.valid) {
      try { localStorage.setItem('y7_promo_code', promo.code); } catch { /* ignore */ }
    }
    navigate(promo?.valid ? `/?promo=${promo.code}#quote` : '/');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted }}>Loading...</div>
      </div>
    );
  }

  if (!promo?.valid) {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: fonts.serif, fontSize: 32, color: colors.text, margin: '0 0 12px', fontWeight: 700 }}>
          Promo code not found
        </h1>
        <p style={{ fontFamily: fonts.sans, fontSize: 16, color: colors.textMuted, marginBottom: 32 }}>
          {promo?.error || 'This promo code is invalid or has expired.'}
        </p>
        <button onClick={() => navigate('/')}
          style={{
            padding: '12px 32px', borderRadius: radii.pill, border: 'none',
            background: colors.dark, color: colors.bg,
            fontFamily: fonts.sans, fontSize: 13, fontWeight: 600,
            letterSpacing: '0.5px', textTransform: 'uppercase', cursor: 'pointer',
          }}>
          Get a Quote
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <div style={{
        fontFamily: fonts.sans, fontSize: 11, fontWeight: 600,
        color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.15em',
        marginBottom: 14,
      }}>
        Limited-time offer
      </div>

      <h1 style={{
        fontFamily: fonts.serif, fontWeight: 700, fontSize: 48,
        color: colors.text, margin: '0 0 18px', letterSpacing: '-0.02em', lineHeight: 1.1,
      }}>
        Save {promo.discount_display}<br />on your transport
      </h1>

      <p style={{
        fontFamily: fonts.sans, fontSize: 18, color: colors.textMuted,
        lineHeight: 1.6, maxWidth: 480, margin: '0 auto 36px',
      }}>
        {promo.description || `Apply code ${promo.code} at checkout to get ${promo.discount_display} off your dispatch fee.`}
      </p>

      <div style={{
        display: 'inline-block',
        padding: '16px 36px',
        background: colors.bgCard,
        border: `2px dashed ${colors.accent}`,
        borderRadius: radii.md,
        fontFamily: fonts.mono,
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: '4px',
        color: colors.text,
        boxShadow: shadows.sm,
        marginBottom: 40,
      }}>
        {promo.code}
      </div>

      <div>
        <button onClick={handleCTA}
          style={{
            padding: '16px 44px',
            borderRadius: radii.pill,
            border: 'none',
            background: colors.accent,
            color: '#fff',
            fontFamily: fonts.sans,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: shadows.md,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = colors.accentHover; }}
          onMouseLeave={e => { e.currentTarget.style.background = colors.accent; }}>
          Get your discounted quote
        </button>
      </div>

      <div style={{
        marginTop: 48, paddingTop: 28, borderTop: `1px solid ${colors.border}`,
        fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted,
      }}>
        Licensed FMCSA broker · MC #1741537 · USDOT #4427359
      </div>
    </div>
  );
}
