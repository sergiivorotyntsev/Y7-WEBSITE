import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { HourglassIcon, DollarIcon, CheckIcon, TruckIcon, CrossIcon, CircleIcon, ClipboardIcon, MapPinIcon, ProfileIcon, TelegramIcon, EmailIcon } from '../../components/icons';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts, button as btnStyles, keyframes } from '../../theme';

const STATUS_COLORS = {
  pending: '#6c757d', quoted: '#0d6efd', confirmed: '#28a745',
  dispatched: '#6f42c1', cancelled: '#adb5bd', declined: '#dc3545',
  completed: '#198754', delivered: '#198754',
};

const STATUS_ICONS = {
  pending: <HourglassIcon size={14} />, quoted: <DollarIcon size={14} />, confirmed: <CheckIcon size={14} />,
  dispatched: <TruckIcon size={14} />, cancelled: <CrossIcon size={14} />, completed: <CheckIcon size={14} />,
  delivered: <CheckIcon size={14} />,
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
      <PageMeta title="My Dashboard" description="Your active orders, shipment tracking, account management." path="/portal/dashboard" />
      <style>{keyframes}</style>

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
                  <span style={{ fontSize: '18px', display: 'flex', alignItems: 'center' }}>{STATUS_ICONS[order.status] || <CircleIcon size={14} />}</span>
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
            { icon: <ClipboardIcon size={18} />, label: 'New Quote', to: '/ship-my-car' },
            { icon: <MapPinIcon size={18} />, label: 'Track Shipment', to: '/track' },
            { icon: <ProfileIcon size={18} />, label: 'Profile', to: '/portal/profile' },
            { icon: <TelegramIcon size={18} />, label: 'Telegram Bot', href: 'https://t.me/y7dispatch_bot' },
            { icon: <EmailIcon size={18} />, label: 'Contact Us', to: '/contact' },
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
              {icon}
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
