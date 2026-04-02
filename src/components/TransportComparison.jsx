import { colors, fonts, button as btnStyles } from '../theme';

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
    price: '~$0.30/mi',
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
    price: '~$0.50/mi',
    cta: 'Get Enclosed Quote',
    type: 'enclosed',
    premium: true,
  },
];

export default function TransportComparison() {
  function scrollToQuote(type) {
    const el = document.getElementById('quote-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    // Pre-select transport type via custom event
    window.dispatchEvent(new CustomEvent('selectTransportType', { detail: type }));
  }

  return (
    <div>
      <h2 style={{
        fontFamily: fonts.serif,
        fontSize: '24px',
        fontWeight: 700,
        color: colors.text,
        textAlign: 'center',
        marginBottom: '24px',
      }}>
        Open vs Enclosed Transport
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        {TYPES.map(t => (
          <div
            key={t.type}
            style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '28px 24px',
              transition: 'border-color 200ms ease, transform 200ms ease',
              cursor: 'pointer',
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = colors.accent;
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => scrollToQuote(t.type)}
          >
            {t.premium && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '20px',
                background: colors.accent,
                color: '#fff',
                fontFamily: fonts.sans,
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Premium
              </div>
            )}
            <h3 style={{
              fontFamily: fonts.serif,
              fontSize: '20px',
              fontWeight: 700,
              color: colors.text,
              marginBottom: '16px',
            }}>
              {t.title}
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              {t.features.map((f, i) => (
                <li key={i} style={{
                  fontFamily: fonts.sans,
                  fontSize: '13px',
                  color: colors.textMuted,
                  lineHeight: 1.5,
                  paddingLeft: '20px',
                  position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, color: colors.success }}>&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <div style={{
              fontFamily: fonts.mono,
              fontSize: '18px',
              fontWeight: 700,
              color: colors.accent,
              marginBottom: '16px',
            }}>
              {t.price}
            </div>
            <button
              onClick={e => { e.stopPropagation(); scrollToQuote(t.type); }}
              style={{
                ...(t.premium ? btnStyles.accent : btnStyles.primary),
                width: '100%',
                padding: '12px',
                fontSize: '12px',
              }}
            >
              {t.cta}
            </button>
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: fonts.sans,
        fontSize: '11px',
        color: colors.textHint,
        textAlign: 'center',
        marginTop: '16px',
      }}>
        Actual pricing varies by route, vehicle size, and season.
      </p>
    </div>
  );
}
