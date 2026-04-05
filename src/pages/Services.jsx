import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { colors, fonts, button as btnStyles } from '../theme';

const servicePages = [
  { to: '/ship-my-car', title: 'Ship My Car', desc: 'Door-to-door auto transport for individuals. Open or enclosed carriers, real-time tracking.' },
  { to: '/car-shipping-cost', title: 'Car Shipping Cost', desc: 'Understand pricing factors and get a transparent quote with no hidden fees.' },
  { to: '/enclosed-car-shipping', title: 'Enclosed Car Shipping', desc: 'Premium covered transport for luxury, classic, and high-value vehicles.' },
  { to: '/auction-car-shipping', title: 'Auction Car Shipping', desc: 'Pickup from Copart, IAAI, Manheim, and independent auctions nationwide.' },
  { to: '/copart-shipping', title: 'Copart Shipping', desc: 'Fast pickup from all 200+ Copart locations. Gate pass coordination included.' },
  { to: '/iaai-transport', title: 'IAA Transport', desc: 'Vehicle transport from IAA auction yards. Salvage and clean title vehicles.' },
  { to: '/manheim-transport', title: 'Manheim Transport', desc: 'Dealer auction vehicle shipping with volume pricing and recurring scheduling.' },
  { to: '/door-to-port-auto-transport', title: 'Door-to-Port Transport', desc: 'Deliver vehicles to any major US export port — Newark, Houston, Savannah, LA, Baltimore, Jacksonville.' },
  { to: '/dealer-auto-transport', title: 'Dealer Auto Transport', desc: 'B2B transport for dealerships. Volume pricing, auction pickup, dealer trades.' },
  { to: '/open-car-shipping', title: 'Open Car Shipping', desc: 'Standard multi-car hauler transport — the most affordable way to ship your vehicle.' },
  { to: '/salvage-car-shipping', title: 'Salvage & Non-Running', desc: 'Transport for salvage, inoperable, and non-running vehicles with specialized equipment.' },
  { to: '/state-to-state-car-shipping', title: 'State-to-State Shipping', desc: 'Interstate auto transport between all 50 US states. FMCSA-licensed broker.' },
  { to: '/auction-to-port-transport', title: 'Auction to Port', desc: 'Direct pipeline from US auction yards to export ports. Gate pass to port delivery.' },
];

export default function Services() {
  const { t } = useTranslation('services');
  const navigate = useNavigate();
  const list = t('list', { returnObjects: true });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <BreadcrumbSchema items={[{name:'Home',url:'/'},{name:'Services',url:'/services'}]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Auto Transport Brokerage",
        "provider": {"@type": "MovingCompany", "name": "Y7 Logistics"},
        "areaServed": "United States",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Auto Transport Services",
          "itemListElement": [
            {"@type":"Offer","itemOffered":{"@type":"Service","name":"Open Auto Transport"}},
            {"@type":"Offer","itemOffered":{"@type":"Service","name":"Enclosed Auto Transport"}},
            {"@type":"Offer","itemOffered":{"@type":"Service","name":"Auction Car Pickup"}},
            {"@type":"Offer","itemOffered":{"@type":"Service","name":"Door-to-Port Delivery"}},
            {"@type":"Offer","itemOffered":{"@type":"Service","name":"Dealer Transport"}}
          ]
        }
      }) }} />
      <PageMeta title="Auto Transport Services" description="Auction pickup, dealer trades, port delivery, enclosed transport. Licensed broker with 100+ verified carriers." path="/services" />
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: 'clamp(28px, 4vw, 42px)',
        fontWeight: 700,
        color: colors.text,
        textAlign: 'center',
        marginBottom: '8px',
      }}>
        {t('title')}
      </h1>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: '15px',
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: '48px',
      }}>
        {t('subtitle')}
      </p>

      <div className="services-grid" style={{ alignItems: 'stretch' }}>
        {Array.isArray(list) && list.map((item, i) => (
          <div key={i} style={{
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: '16px',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3 style={{
              fontFamily: fonts.serif,
              fontSize: '18px',
              fontWeight: 700,
              color: colors.text,
            }}>
              {item.title}
            </h3>
            <p style={{
              fontFamily: fonts.sans,
              fontSize: '14px',
              color: colors.textMuted,
              lineHeight: 1.6,
              flex: 1,
            }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Service pages hub */}
      <div style={{ marginTop: '64px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '24px',
          fontWeight: 700,
          color: colors.text,
          textAlign: 'center',
          marginBottom: '8px',
        }}>
          Explore Our Services
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          Learn more about each service we offer
        </p>
        <div className="services-grid" style={{ alignItems: 'stretch' }}>
          {servicePages.map((page) => (
            <Link key={page.to} to={page.to} style={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textDecoration: 'none',
              transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = colors.accent;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = colors.border;
              }}
            >
              <h3 style={{
                fontFamily: fonts.sans,
                fontSize: '15px',
                fontWeight: 600,
                color: colors.text,
              }}>
                {page.title}
              </h3>
              <p style={{
                fontFamily: fonts.sans,
                fontSize: '13px',
                color: colors.textMuted,
                lineHeight: 1.5,
                flex: 1,
              }}>
                {page.desc}
              </p>
              <span style={{
                fontFamily: fonts.sans,
                fontSize: '12px',
                color: colors.accent,
                fontWeight: 600,
              }}>
                Learn more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <button onClick={() => navigate('/quote')} style={btnStyles.accent}>
          Get a Free Quote
        </button>
      </div>
    </div>
  );
}
