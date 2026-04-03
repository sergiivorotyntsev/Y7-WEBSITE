import { useParams, Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { colors, fonts, button as btnStyles } from '../../theme';
import { PORTS } from './portData';

export default function PortPage() {
  const { slug } = useParams();
  const port = PORTS[slug];

  if (!port) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: fonts.serif, fontSize: '32px', color: colors.text, marginBottom: '12px' }}>
          Port Not Found
        </h1>
        <p style={{ fontFamily: fonts.sans, fontSize: '15px', color: colors.textMuted, marginBottom: '32px' }}>
          The port page you are looking for does not exist.
        </p>
        <Link to="/exporters" style={{ ...btnStyles.primary, textDecoration: 'none', display: 'inline-block' }}>
          View All Ports
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <PageMeta
        title={port.metaTitle}
        description={port.metaDesc}
        path={`/ports/${slug}`}
        i18n
      />
      <style>{`
        .port-routes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (max-width: 560px) {
          .port-routes-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '8px',
        }}>
          {port.name}
        </h1>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '16px',
          color: colors.textMuted,
          marginBottom: '6px',
        }}>
          {port.fullName}
        </p>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          marginBottom: '16px',
        }}>
          {port.city}, {port.state} {port.zip}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: fonts.mono,
            fontSize: '11px',
            color: colors.textMuted,
            background: colors.bgMuted,
            padding: '4px 14px',
            borderRadius: '20px',
            border: `1px solid ${colors.border}`,
          }}>
            USDOT 4246498
          </span>
          <span style={{
            fontFamily: fonts.mono,
            fontSize: '11px',
            color: colors.textMuted,
            background: colors.bgMuted,
            padding: '4px 14px',
            borderRadius: '20px',
            border: `1px solid ${colors.border}`,
          }}>
            MC 1627229
          </span>
        </div>
      </div>

      {/* About this port */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '16px',
        }}>
          About This Port
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '15px',
          color: colors.textMuted,
          lineHeight: 1.7,
        }}>
          {port.description} Y7 Logistics provides door-to-port auto transport to {port.name} with
          verified carriers. Whether you are shipping a single vehicle or managing bulk export
          operations, we coordinate pickup from any US location and deliver directly to the terminal.
        </p>
      </div>

      {/* Popular Routes */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '20px',
        }}>
          Popular Routes to {port.name}
        </h2>
        <div className="port-routes-grid">
          {port.routes.map((route, i) => (
            <div key={i} style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'transform 200ms ease, box-shadow 200ms ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: '2px',
                }}>
                  {route.from}
                </div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: '12px',
                  color: colors.textMuted,
                }}>
                  to {port.city}, {port.state}
                </div>
              </div>
              <div style={{
                fontFamily: fonts.mono,
                fontSize: '12px',
                fontWeight: 600,
                color: colors.accent,
                background: '#FFF8F5',
                padding: '4px 12px',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
              }}>
                {route.days} {route.days === '1' ? 'day' : 'days'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents Required */}
      <div style={{
        background: colors.bgMuted,
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '48px',
      }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '16px',
        }}>
          Documents Required
        </h2>
        <ul style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          lineHeight: 1.8,
          paddingLeft: '20px',
          margin: 0,
        }}>
          {port.documents.map((doc, i) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>
      </div>

      {/* Shipping Destinations */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '12px',
        }}>
          Shipping Destinations
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '15px',
          color: colors.textMuted,
          lineHeight: 1.7,
        }}>
          Vehicles delivered to {port.name} are shipped to {port.destinations}. Ocean carriers
          at this terminal handle both Roll-on/Roll-off (RoRo) and containerized vehicle shipments.
          Contact us for guidance on which shipping method works best for your destination.
        </p>
      </div>

      {/* CTA */}
      <div style={{
        background: '#FFF8F5',
        borderLeft: `4px solid ${colors.accent}`,
        borderRadius: '0 12px 12px 0',
        padding: '32px',
        textAlign: 'center',
        marginBottom: '48px',
      }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '8px',
        }}>
          Get a Port Delivery Quote
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          marginBottom: '20px',
          lineHeight: 1.6,
        }}>
          Door-to-port transport to {port.name}. Transparent pricing, verified carriers.
        </p>
        <Link
          to={`/?delivery_zip=${port.zip}#quote-section`}
          style={{ ...btnStyles.accent, textDecoration: 'none', display: 'inline-block', padding: '14px 32px', fontSize: '14px' }}
        >
          Get Port Delivery Quote
        </Link>
      </div>

      {/* Company footer info */}
      <div style={{
        textAlign: 'center',
        borderTop: `1px solid ${colors.border}`,
        paddingTop: '32px',
      }}>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.text,
          fontWeight: 600,
          marginBottom: '4px',
        }}>
          Y7 Logistics LLC
        </p>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          color: colors.textMuted,
          lineHeight: 1.6,
          marginBottom: '8px',
        }}>
          Licensed auto transport broker serving all US ports.
        </p>
        <div style={{
          fontFamily: fonts.mono,
          fontSize: '12px',
          color: colors.textMuted,
        }}>
          USDOT 4246498 &middot; MC 1627229
        </div>
      </div>
    </div>
  );
}
