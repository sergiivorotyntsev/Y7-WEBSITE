import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts, button as btnStyles } from '../../theme';

const STATUS_COLORS = {
  pending: '#6c757d', quoted: '#0d6efd', confirmed: '#28a745',
  dispatched: '#6f42c1', cancelled: '#adb5bd', declined: '#dc3545',
  completed: '#198754', delivered: '#198754',
};

const STATUS_ICONS = {
  pending: '\u23F3', quoted: '\uD83D\uDCB0', confirmed: '\u2705',
  dispatched: '\uD83D\uDE9A', cancelled: '\u274C', completed: '\u2705',
  delivered: '\u2705',
};

function StatCard({ value, label, delay }) {
  return (
    <div style={{
      background: colors.bgMuted,
      borderRadius: '12px',
      padding: '20px 16px',
      textAlign: 'center',
      opacity: 0,
      animation: `fadeUp 400ms ease ${delay}ms forwards`,
    }}>
      <div style={{
        fontFamily: fonts.serif,
        fontSize: '28px',
        fontWeight: 700,
        color: colors.accent,
        lineHeight: 1,
        marginBottom: '4px',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: fonts.sans,
        fontSize: '11px',
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {label}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portalFetch('/api/portal/data/orders?limit=10')
      .then(r => r.json())
      .then(data => {
        setOrders(data.items || []);
        setSummary(data.summary || {});
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const active = (summary?.pending || 0) + (summary?.quoted || 0) + (summary?.confirmed || 0);
  const inTransit = (summary?.dispatched || 0);
  const delivered = (summary?.delivered || 0) + (summary?.completed || 0);
  const total = summary?.total || 0;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
      `}</style>

      {loading && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                height: 80, borderRadius: '12px',
                background: `linear-gradient(90deg, ${colors.bgMuted} 25%, ${colors.bgCard} 50%, ${colors.bgMuted} 75%)`,
                backgroundSize: '800px 100%', animation: 'shimmer 1.5s ease-in-out infinite',
              }} />
            ))}
          </div>
          {[0,1,2].map(i => (
            <div key={i} style={{
              height: 64, borderRadius: '8px', marginBottom: '8px',
              background: `linear-gradient(90deg, ${colors.bgMuted} 25%, ${colors.bgCard} 50%, ${colors.bgMuted} 75%)`,
              backgroundSize: '800px 100%', animation: 'shimmer 1.5s ease-in-out infinite',
            }} />
          ))}
        </div>
      )}

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <h1 style={{
          fontFamily: fonts.serif,
          fontSize: '28px',
          fontWeight: 700,
          color: colors.text,
        }}>
          Welcome back, {user?.name?.split(' ')[0] || 'there'}
        </h1>
        <button onClick={() => navigate('/ship-my-car')} style={btnStyles.accent}>
          New Quote
        </button>
      </div>

      {/* Stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '12px',
        marginBottom: '40px',
      }}>
        <StatCard value={active} label="Active Orders" delay={0} />
        <StatCard value={inTransit} label="In Transit" delay={80} />
        <StatCard value={delivered} label="Delivered" delay={160} />
        <StatCard value={total} label="All Time" delay={240} />
      </div>

      {/* Recent Orders */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '20px',
          fontWeight: 700,
          color: colors.text,
        }}>
          Recent Orders
        </h2>
      </div>

      {loading ? (
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted }}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '40px 20px',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, marginBottom: '16px' }}>
            No orders yet. Submit your first quote to get started.
          </p>
          <button onClick={() => navigate('/ship-my-car')} style={btnStyles.accent}>
            Get a Quote
          </button>
        </div>
      ) : (
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {orders.map((order, i) => {
            const vehicle = [order.vehicle_year, order.vehicle_make, order.vehicle_model].filter(Boolean).join(' ') || 'Vehicle TBD';
            const route = [order.pickup_zip, order.delivery_zip].filter(Boolean).join(' \u2192 ');
            const price = order.final_price ? `$${order.final_price}` :
              (order.quote_price_min && order.quote_price_max)
                ? `$${order.quote_price_min}-$${order.quote_price_max}` : '';
            return (
              <Link
                key={order.id}
                to={`/portal/order/${order.id}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderBottom: i < orders.length - 1 ? `1px solid ${colors.border}` : 'none',
                  textDecoration: 'none',
                  color: colors.text,
                  transition: 'background 150ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = colors.bgInput; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '18px' }}>{STATUS_ICONS[order.status] || '\u2B55'}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: '14px',
                      fontWeight: 600,
                      color: colors.text,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {vehicle}
                    </div>
                    <div style={{
                      fontFamily: fonts.sans,
                      fontSize: '12px',
                      color: colors.textMuted,
                      marginTop: '2px',
                    }}>
                      {route}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{
                    fontFamily: fonts.sans,
                    fontSize: '11px',
                    fontWeight: 600,
                    color: STATUS_COLORS[order.status] || colors.textMuted,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    {order.status}
                  </span>
                  {price && (
                    <div style={{
                      fontFamily: fonts.mono,
                      fontSize: '13px',
                      fontWeight: 600,
                      color: colors.text,
                      marginTop: '2px',
                    }}>
                      {price}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '20px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '16px',
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
        }}>
          {[
            { icon: '\uD83D\uDCCB', label: 'New Quote', to: '/ship-my-car' },
            { icon: '\uD83D\uDCCD', label: 'Track Shipment', to: '/track' },
            { icon: '\uD83D\uDC64', label: 'Profile', to: '/portal/profile' },
            { icon: '\uD83D\uDCAC', label: 'Telegram Bot', href: 'https://t.me/y7dispatch_bot' },
            { icon: '\uD83D\uDCDE', label: 'Contact Us', to: '/contact' },
          ].map(({ icon, label, to, href }) => (
            <a
              key={label}
              href={href || undefined}
              onClick={to ? (e) => { e.preventDefault(); navigate(to); } : undefined}
              target={href ? '_blank' : undefined}
              rel={href ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 16px',
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: '10px',
                fontFamily: fonts.sans,
                fontSize: '13px',
                fontWeight: 500,
                color: colors.text,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'border-color 200ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = colors.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border; }}
            >
              <span style={{ fontSize: '18px' }}>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
