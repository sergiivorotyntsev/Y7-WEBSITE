import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { ClipboardIcon, MapPinIcon, ProfileIcon, TelegramIcon, EmailIcon } from '../../components/icons';
import AccountTypeModal from '../../components/AccountTypeModal';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts, button as btnStyles, keyframes } from '../../theme';
import { STATUS_COLORS, getStatusBadge } from '../../utils/orderStatus';

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
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // SPRINT-E-T3: classification modal — shown on first visit when
  // user.customer_type === 'unknown', or when redirected from a 403
  // classification_required response (?classify=1 query param).
  const [showClassifyModal, setShowClassifyModal] = useState(false);

  useEffect(() => {
    portalFetch('/api/portal/data/orders?limit=10')
      .then(r => r.json())
      .then(data => {
        setOrders(data.items || []);
        setSummary(data.summary || {});
      })
      .catch(() => setError('Failed to load orders. Please try refreshing the page.'))
      .finally(() => setLoading(false));
  }, []);

  // Show modal when needed: unknown type OR ?classify=1 redirect target
  useEffect(() => {
    if (!user) return;
    const params = new URLSearchParams(window.location.search);
    if (user.customer_type === 'unknown' || params.get('classify') === '1') {
      setShowClassifyModal(true);
    }
  }, [user]);

  async function handleClassifyComplete() {
    setShowClassifyModal(false);
    // Refresh user from /me so the new customer_type propagates
    await checkAuth();
    // Drop the ?classify=1 param so a refresh doesn't re-open the modal
    if (window.location.search.includes('classify=1')) {
      const url = new URL(window.location.href);
      url.searchParams.delete('classify');
      window.history.replaceState({}, '', url.toString());
    }
  }

  const active = (summary?.pending || 0) + (summary?.quoted || 0) + (summary?.confirmed || 0);
  const inTransit = (summary?.dispatched || 0);
  const delivered = (summary?.delivered || 0) + (summary?.completed || 0);
  const total = summary?.total || 0;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <PageMeta title="My Dashboard" description="Your active orders, shipment tracking, account management." path="/portal/dashboard" />
      <style>{keyframes}</style>

      {showClassifyModal && (
        <AccountTypeModal onComplete={handleClassifyComplete} />
      )}

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

      {error && (
        <div style={{
          fontFamily: fonts.sans, fontSize: '13px', color: colors.accent,
          padding: '10px 14px', background: '#FFF0EC', borderRadius: '8px',
          marginBottom: '20px', textAlign: 'center',
        }}>
          {error}
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
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{
              fontFamily: fonts.serif,
              fontSize: '28px',
              fontWeight: 700,
              color: colors.text,
            }}>
              Welcome back, {user?.name?.split(' ')[0] || 'there'}
            </h1>
            {user?.customer_type === 'dealer' && (
              <span style={{
                fontFamily: fonts.sans,
                fontSize: '11px',
                fontWeight: 700,
                color: '#fff',
                background: '#1a1a2e',
                padding: '3px 10px',
                borderRadius: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
              }}>
                Dealer Account
              </span>
            )}
          </div>
          {user?.customer_type === 'dealer' && (
            <span style={{
              fontFamily: fonts.sans,
              fontSize: '12px',
              color: colors.textMuted,
            }}>
              {user.billing_mode === 'monthly' ? 'Monthly billing' : 'Pay per delivery'}
            </span>
          )}
        </div>
        <button onClick={() => navigate(user?.customer_type === 'dealer' ? '/quote' : '/ship-my-car')} style={btnStyles.accent}>
          {user?.customer_type === 'dealer' ? 'New Order' : 'New Quote'}
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
            {user?.customer_type === 'dealer'
              ? 'No orders yet. Submit your first transport order to get started.'
              : 'No orders yet. Submit your first quote to get started.'}
          </p>
          <button onClick={() => navigate(user?.customer_type === 'dealer' ? '/quote' : '/ship-my-car')} style={btnStyles.accent}>
            {user?.customer_type === 'dealer' ? 'New Order' : 'Get a Quote'}
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
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: STATUS_COLORS[order.status] || colors.textMuted, flexShrink: 0 }} />
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
                  {(() => { const badge = getStatusBadge(order.status); return (
                  <span style={{
                    fontFamily: fonts.sans,
                    fontSize: '11px',
                    fontWeight: 600,
                    color: badge.color,
                    background: badge.backgroundColor,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    {badge.label}
                  </span>
                  ); })()}
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
            { icon: <ClipboardIcon size={18} />, label: user?.customer_type === 'dealer' ? 'New Order' : 'New Quote', to: user?.customer_type === 'dealer' ? '/quote' : '/ship-my-car' },
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
