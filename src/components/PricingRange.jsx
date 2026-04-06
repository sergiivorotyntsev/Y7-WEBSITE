import { colors, fonts } from '../theme';

export default function PricingRange({
  routeName,
  openLow,
  openHigh,
  enclosedLow,
  enclosedHigh,
  distance,
  typicalTransitDays,
  seasonalNote,
  variants,
}) {
  return (
    <div style={{
      border: `1px solid ${colors.border}`,
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '40px',
      background: colors.bgCard,
    }}>
      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 560px) {
          .pricing-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <h3 style={{
        fontFamily: fonts.serif,
        fontSize: '22px',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '24px',
      }}>
        Typical Pricing for {routeName}
      </h3>

      {variants ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {variants.map((v, i) => (
            <div key={i} style={{
              background: colors.bg,
              borderRadius: '12px',
              padding: '16px 20px',
              border: `1px solid ${colors.border}`,
            }}>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: '14px',
                fontWeight: 600,
                color: colors.text,
                marginBottom: '6px',
              }}>
                {v.label}
              </div>
              <div style={{
                fontFamily: fonts.serif,
                fontSize: '24px',
                fontWeight: 700,
                color: colors.accent,
                marginBottom: '4px',
              }}>
                ${v.low} &ndash; ${v.high}
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: '13px',
                color: colors.textMuted,
              }}>
                {v.distance && <span>~{v.distance} miles &middot; </span>}
                {v.transit}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pricing-grid" style={{ marginBottom: '24px' }}>
          {openLow != null && openHigh != null && (
            <div style={{
              background: colors.bg,
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: fonts.serif,
                fontSize: '28px',
                fontWeight: 700,
                color: colors.accent,
                marginBottom: '6px',
              }}>
                ${openLow} &ndash; ${openHigh}
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: '14px',
                fontWeight: 600,
                color: colors.text,
                marginBottom: '4px',
              }}>
                Open Transport
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: '12px',
                color: colors.textMuted,
              }}>
                Industry average for this route
              </div>
            </div>
          )}

          {enclosedLow != null && enclosedHigh != null && (
            <div style={{
              background: colors.bg,
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: fonts.serif,
                fontSize: '28px',
                fontWeight: 700,
                color: colors.accent,
                marginBottom: '6px',
              }}>
                ${enclosedLow} &ndash; ${enclosedHigh}
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: '14px',
                fontWeight: 600,
                color: colors.text,
                marginBottom: '4px',
              }}>
                Enclosed Transport
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: '12px',
                color: colors.textMuted,
              }}>
                Industry average for this route
              </div>
            </div>
          )}
        </div>
      )}

      {(distance || typicalTransitDays) && (
        <div style={{
          borderTop: `1px solid ${colors.border}`,
          paddingTop: '16px',
          marginBottom: seasonalNote ? '16px' : '16px',
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
        }}>
          {distance && (
            <div>
              <div style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 600, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                Distance
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: '15px', color: colors.textMuted }}>
                ~{distance} miles
              </div>
            </div>
          )}
          {typicalTransitDays && (
            <div>
              <div style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 600, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                Transit Time
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: '15px', color: colors.textMuted }}>
                {typicalTransitDays} days typical
              </div>
            </div>
          )}
        </div>
      )}

      {seasonalNote && (
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          fontStyle: 'italic',
          color: colors.textMuted,
          lineHeight: 1.5,
          marginBottom: '16px',
        }}>
          {seasonalNote}
        </p>
      )}

      <p style={{
        fontFamily: fonts.sans,
        fontSize: '12px',
        color: colors.textHint,
        lineHeight: 1.5,
        borderTop: `1px solid ${colors.border}`,
        paddingTop: '12px',
        margin: 0,
      }}>
        Prices are estimates based on historical data and current market conditions.
        Request an exact quote for your specific vehicle, dates, and route.
      </p>
    </div>
  );
}
