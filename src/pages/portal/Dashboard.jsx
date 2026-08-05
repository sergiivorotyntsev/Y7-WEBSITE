import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import Toast from '../../components/Toast';
import { ClipboardIcon, MapPinIcon, ProfileIcon, TelegramIcon, EmailIcon } from '../../components/icons';
// ONBOARD-T12: AccountTypeModal replaced by the unified /portal/onboarding
// wizard. Keep AccountSetupBanner for residual setup prompts (locations,
// bank_auth) but the classify / agreement items now route to the wizard.
import AccountSetupBanner from '../../components/AccountSetupBanner';
import BouncingEmailBanner from '../../components/recovery/BouncingEmailBanner';
import VerificationBanner from '../../components/VerificationBanner';
import LegacyTypeReprompt from '../../components/LegacyTypeReprompt';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { keyframes } from '../../theme';
import { STATUS_LABELS, STATUS_CHIP_VARIANT } from '../../utils/orderStatus';
// VIS-2-T02: the same words for an absent carrier / price as every other
// cabinet surface, and the same money formatter.
import {
  CARRIER_NOT_ASSIGNED, PRICE_NOT_SET, carrierExpected, moneyFromDollars,
} from '../../utils/loadVocabulary';
import pp from '../../styles/v2/portal.module.css';
import v2b from '../../styles/v2/buttons.module.css';
// DEALER-DASH-S1-T03: dealers/exporters get the three-block dashboard home.
import DealerDashboard from './DealerDashboard';

// SPRINT-W7 C0: canonical status -> C0 chip-class (four-variant system;
// mapping table lives in utils/orderStatus STATUS_CHIP_VARIANT).
const CHIP_VARIANT_CLASS = { ink: pp.chipInk, pine: pp.chipPine, red: pp.chipRed, soft: pp.chipSoft };
function statusChipClass(status) {
  return CHIP_VARIANT_CLASS[STATUS_CHIP_VARIANT[status] || 'ink'] || pp.chipInk;
}

const TOAST_MESSAGES = {
  agreement_signed: 'Dealer Agreement Signed Successfully',
  bank_auth_signed: 'Bank Authorization Signed Successfully',
};

// SPRINT-F: all customer types use the authenticated portal order form.
// Previously routed to public pages (/quote, /exporters, /ship-my-car).
function getNewOrderPath() {
  return '/portal/new-order';
}

function getNewOrderLabel() {
  return 'New Order';
}

function StatCard({ value, label, delay }) {
  return (
    <div style={{
      background: 'var(--v2-card-cream, #fffaf1)',
      border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
      borderRadius: '12px',
      padding: '20px 16px',
      textAlign: 'center',
      opacity: 0,
      animation: `fadeUp 400ms ease ${delay}ms forwards`,
    }}>
      <div style={{
        fontFamily: 'var(--v2-font-display, Oswald, system-ui)',
        fontSize: '28px',
        fontWeight: 600,
        textTransform: 'uppercase',
        color: 'var(--v2-ink, #050607)',
        lineHeight: 1,
        marginBottom: '4px',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'var(--font-sans, system-ui)',
        fontSize: '11px',
        color: 'var(--v2-ink-muted, #5c5851)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {label}
      </div>
    </div>
  );
}

function BillingSummary() {
  const [billing, setBilling] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Only fetch billing if dealer with signed agreement — avoids 403
    if (!user?.agreement_signed || user?.customer_type !== 'dealer') return;
    portalFetch('/api/portal/billing/summary')
      .then(r => r.ok ? r.json() : null)
      .then(d => setBilling(d))
      .catch(() => {});
  }, [user?.agreement_signed, user?.customer_type]);

  if (!billing || !billing.is_dealer) return null;

  const bal = billing.balance_cents || 0;

  return (
    <div
      onClick={() => navigate('/portal/billing')}
      className={pp.card}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '24px', cursor: 'pointer',
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Deposit Balance
        </div>
        <div style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '24px', fontWeight: 700, color: bal < 0 ? 'var(--v2-red-deep, #a90918)' : 'var(--success, #0f6e56)' }}>
          ${(bal / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {billing.is_blocked && (
          <span className={pp.errorBlock} style={{ fontSize: '10px' }}>
            Orders Paused
          </span>
        )}
        <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink, #050607)' }}>View Billing &rarr;</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  // Toast from agreement signing redirect — guard ensures setState only
  // fires once per matching toast param.
  useEffect(() => {
    const toast = searchParams.get('toast');
    if (toast && TOAST_MESSAGES[toast]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToastMsg(TOAST_MESSAGES[toast]);
      searchParams.delete('toast');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    // DEALER-DASH-S1-T03: dealers/exporters render <DealerDashboard/>, which
    // fetches its own loads (limit=0 + filter/sort). Skip the individual
    // recent-orders fetch for them; wait for auth so customer_type is known.
    if (authLoading) return;
    if (['dealer', 'exporter'].includes(user?.customer_type)) {
      setLoading(false);
      return;
    }
    portalFetch('/api/portal/data/orders?limit=10')
      .then(r => r.json())
      .then(data => {
        setOrders(data.items || []);
        setSummary(data.summary || {});
      })
      .catch(() => setError('Failed to load orders. Please try refreshing the page.'))
      .finally(() => setLoading(false));
  }, [authLoading, user?.customer_type]);

  // ONBOARD-T12: redirect to the unified onboarding wizard whenever the
  // user is not fully set up. Covers the two legacy entry points that
  // used to trigger the AccountTypeModal:
  //   - first visit where customer_type === 'unknown' (or legacy 'shipper')
  //   - 403 classification_required / agreement_required from
  //     require_active_customer (now its URLs also point at /portal/onboarding)
  // Leftover ?classify=1 / ?classify=edit query params from older links
  // are treated as explicit onboarding triggers too.
  useEffect(() => {
    if (authLoading) return;
    if (!user) return;
    const params = new URLSearchParams(window.location.search);
    const classifyParam = params.get('classify');
    const needsClassification = !user.customer_type
      || user.customer_type === 'unknown'
      || user.customer_type === 'shipper';
    // AGR-2-T01: the ACC-1 exemption this effect never got. An unsigned
    // account whose agreement DOES NOT EXIST yet (exporter, with counsel —
    // ADR-012; /me says agreement_document_available === false) must land on
    // the dashboard, not be bounced into a wizard step that cannot complete.
    // useAuth.jsx already refuses to hard-redirect those 403s; this effect
    // was the remaining one-way door. Tri-state: only an explicit false
    // exempts, so stale backends keep the old behavior.
    const needsAgreement = user.customer_type
      && user.customer_type !== 'unknown'
      && user.customer_type !== 'shipper'
      && !user.agreement_signed
      && user.agreement_document_available !== false;
    if (needsClassification || needsAgreement || classifyParam) {
      navigate('/portal/onboarding', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const active = (summary?.pending || 0) + (summary?.quoted || 0) + (summary?.confirmed || 0);
  const inTransit = (summary?.dispatched || 0);
  const delivered = (summary?.delivered || 0) + (summary?.completed || 0);
  const total = summary?.total || 0;

  // OWNERSHIP-PROOF (ADR-A Sprint 4): nudge individual / auction_buyer customers to
  // verify ownership on a price-accepted order that still needs it (none / rejected).
  // The order detail page hosts the actual upload card; this is the post-wizard prompt.
  const ownershipProofOrder = ['individual', 'auction_buyer'].includes(user?.customer_type)
    ? orders.find((o) => ['confirmed', 'dispatched'].includes(o.status)
        && ['none', 'rejected'].includes(o.ownership_proof_status || 'none'))
    : null;

  // CAP-S1-W02: nudge individual/auction_buyer to add the COD delivery contact
  // (who pays the driver) on a confirmed order that is still missing it.
  const deliveryContactOrder = ['individual', 'auction_buyer'].includes(user?.customer_type)
    ? orders.find((o) => o.status === 'confirmed' && o.service_tier === 'cod'
        && !(o.delivery_contact_phone && String(o.delivery_contact_phone).trim()))
    : null;

  // WGF-T03d: the awaiting-details attention item — the quote is accepted but
  // dispatch-critical pickup facts are missing (server-computed flag).
  const awaitingDetailsOrder = orders.find((o) => o.awaiting_details);

  // DEALER-DASH-S1-T03: dealer/exporter HOME = the three-block dashboard.
  // All hooks above run unconditionally; the onboarding-redirect effect still
  // sends unverified/unsigned dealers to /portal/onboarding before this shows.
  if (['dealer', 'exporter'].includes(user?.customer_type)) {
    return <DealerDashboard user={user} />;
  }

  return (
    <div className={pp.shell}>
      <PageMeta title="My Dashboard" description="Your active orders, shipment tracking, account management." path="/portal/dashboard" />
      {toastMsg && <Toast message={toastMsg} onDismiss={() => setToastMsg(null)} />}
      <style>{keyframes}</style>

      {loading && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                height: 80, borderRadius: '12px',
                background: 'linear-gradient(90deg, rgba(5,6,7,0.06) 25%, rgba(5,6,7,0.03) 50%, rgba(5,6,7,0.06) 75%)',
                backgroundSize: '800px 100%', animation: 'shimmer 1.5s ease-in-out infinite',
              }} />
            ))}
          </div>
          {[0,1,2].map(i => (
            <div key={i} style={{
              height: 64, borderRadius: '8px', marginBottom: '8px',
              background: 'linear-gradient(90deg, rgba(5,6,7,0.06) 25%, rgba(5,6,7,0.03) 50%, rgba(5,6,7,0.06) 75%)',
              backgroundSize: '800px 100%', animation: 'shimmer 1.5s ease-in-out infinite',
            }} />
          ))}
        </div>
      )}

      {error && (
        <div className={pp.errorBlock} style={{ marginBottom: '20px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {/* WGF-T03d: accepted-but-awaiting-details — the ONE step blocking dispatch. */}
      {awaitingDetailsOrder && (
        <Link
          to={`/portal/order/${awaitingDetailsOrder.id}/dispatch-details`}
          className={pp.notice}
          style={{ display: 'block', textDecoration: 'none', marginBottom: '20px' }}
        >
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', fontWeight: 700, color: 'var(--v2-ink, #050607)' }}>
            &#9203; One step left — add pickup details to dispatch{' '}
            {[awaitingDetailsOrder.vehicle_year, awaitingDetailsOrder.vehicle_make, awaitingDetailsOrder.vehicle_model]
              .filter(Boolean).join(' ') || 'your vehicle'} &rarr;
          </div>
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '2px' }}>
            Your quote is accepted. We can send a carrier as soon as you add the exact
            pickup address, the contact releasing the vehicle, and pickup hours — or pick
            one of your saved locations.
          </div>
        </Link>
      )}

      {ownershipProofOrder && (
        <Link
          to={`/portal/order/${ownershipProofOrder.id}`}
          className={pp.notice}
          style={{ display: 'block', textDecoration: 'none', marginBottom: '20px' }}
        >
          {/* CAP-S1-W03: strengthened copy/visibility — still soft (not a hard gate). */}
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', fontWeight: 700, color: 'var(--v2-ink, #050607)' }}>
            &#128196; Verify vehicle ownership to speed up dispatch &rarr;
          </div>
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '2px' }}>
            Upload your title, registration, bill of sale, or auction invoice for{' '}
            {[ownershipProofOrder.vehicle_year, ownershipProofOrder.vehicle_make, ownershipProofOrder.vehicle_model]
              .filter(Boolean).join(' ') || 'your vehicle'}. It isn&rsquo;t required to submit, but it lets us dispatch as soon as your carrier is set.
          </div>
        </Link>
      )}

      {/* CAP-S1-W02: COD delivery-contact nudge */}
      {deliveryContactOrder && (
        <Link
          to={`/portal/order/${deliveryContactOrder.id}/dispatch-details`}
          className={pp.notice}
          style={{ display: 'block', textDecoration: 'none', marginBottom: '20px' }}
        >
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>
            Add a delivery contact for your COD shipment &rarr;
          </div>
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '2px' }}>
            For COD orders we need the name and phone of whoever pays the driver at delivery for{' '}
            {[deliveryContactOrder.vehicle_year, deliveryContactOrder.vehicle_make, deliveryContactOrder.vehicle_model]
              .filter(Boolean).join(' ') || 'your vehicle'}.
          </div>
        </Link>
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
            <h1 className={pp.pageTitle}>
              Welcome back, {user?.name?.split(' ')[0] || 'there'}
            </h1>
            {user?.customer_type === 'dealer' && (
              <span className={pp.chipInk} style={{ whiteSpace: 'nowrap' }}>
                Dealer Account
              </span>
            )}
          </div>
          {user?.customer_type === 'dealer' && (
            <span className={pp.pageSub}>
              {{ per_delivery: 'Pay per delivery', prepay_manual_invoice: 'Prepay (manual invoice)', prepay_auto_debit: 'Prepay (auto debit)', monthly: 'Monthly billing' }[user.billing_mode] || 'Pay per delivery'}
            </span>
          )}
        </div>
        <button
          onClick={() => navigate(getNewOrderPath())}
          className={v2b.cta}
        >
          {getNewOrderLabel()}
        </button>
      </div>

      <BouncingEmailBanner />
      <AccountSetupBanner />
      <VerificationBanner />
      {/* WAP-T03: one-time type reprompt for migrated-default individuals. */}
      <LegacyTypeReprompt />

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

      {/* Billing summary — dealers with prepay billing only */}
      {user?.customer_type === 'dealer' && user?.billing_mode === 'prepay_manual_invoice' && (
        <BillingSummary />
      )}

      {/* Recent Orders */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <h2 className={pp.sectionTitle}>
          Recent Orders
        </h2>
      </div>

      {loading ? (
        <p style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--v2-ink-muted, #5c5851)' }}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className={pp.card} style={{ padding: '40px 20px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--v2-ink-muted, #5c5851)', marginBottom: '16px' }}>
            {user?.customer_type === 'dealer'
              ? 'No orders yet. Submit your first transport order to get started.'
              : 'No orders yet. Submit your first quote to get started.'}
          </p>
          <button
            onClick={() => navigate(getNewOrderPath())}
            className={v2b.ghostOnPaper}
          >
            {getNewOrderLabel()}
          </button>
        </div>
      ) : (
        <div className={pp.card} style={{ padding: 0, overflow: 'hidden' }}>
          {orders.map((order) => {
            const vehicle = [order.vehicle_year, order.vehicle_make, order.vehicle_model].filter(Boolean).join(' ') || 'Vehicle TBD';
            // SPRINT-E-T4: enriched route shows pickup city + ZIP, then arrow + delivery
            const pickup = [order.pickup_city, order.pickup_zip].filter(Boolean).join(' ');
            const delivery = [order.delivery_city, order.delivery_zip].filter(Boolean).join(' ');
            const route = [pickup, delivery].filter(Boolean).join(' \u2192 ');
            // NUM-2: display load_id as the single reference (web_reference no
            // longer shown); fall back to the numeric id only if load_id is absent.
            const loadId = order.load_id || `#${order.id}`;
            const createdDate = order.created_at
              ? new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              : null;
            // VIS-2-T02: THE ORDER LIST SHOWS THE DISPATCHED PRICE.
            //
            // It never could before: the list endpoint did not select the field
            // at all, so this row had nothing to render for any order. VIS-1
            // added it (portal_data.py, `dispatched_price_cents_live`, read from
            // the assignment rather than the stale customer_orders column), and
            // this is the reader for it.
            //
            // The cascade matches the order detail deliberately — the real
            // dispatched price wins, then the agreed/quoted figure — so the
            // same order cannot show one number in the list and another on the
            // page it links to.
            const dispatched = moneyFromDollars(order.dispatched_price);
            const quotedPrice = order.final_price
              ? moneyFromDollars(order.final_price)
              : (order.quote_price_min && order.quote_price_max)
                ? `${moneyFromDollars(order.quote_price_min)}-${moneyFromDollars(order.quote_price_max)}`
                : '';
            const price = dispatched || quotedPrice;
            // Absent is said in words, not left as the empty string this used to
            // fall back to. A blank cell in a list whose other rows show money
            // reads as a broken screen, not as "we do not know yet". Only where
            // a carrier is expected: nothing is pending on a quote request.
            const pricePending = !price && carrierExpected(order.status);
            const carrierPending = !order.carrier_name && carrierExpected(order.status);
            return (
              <Link
                key={order.id}
                to={`/portal/order/${order.id}`}
                className={pp.row}
                style={{
                  padding: '16px 20px',
                  textDecoration: 'none',
                  color: 'var(--v2-ink, #050607)',
                  transition: 'background 150ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(5, 6, 7, 0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--v2-ink, #050607)', flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-sans, system-ui)',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--v2-ink, #050607)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {vehicle}
                      {/* NEX-8-T04: gate-pass chase is visible, not silent */}
                      {order.needs_release_doc && (
                        <span
                          data-testid="needs-release-doc-chip"
                          style={{
                            marginLeft: 8, padding: '2px 8px', borderRadius: 999,
                            fontSize: 11, fontWeight: 600, verticalAlign: 'middle',
                            background: 'rgba(180, 120, 20, 0.12)',
                            border: '1px solid rgba(180, 120, 20, 0.35)',
                            color: 'var(--v2-ink, #050607)', whiteSpace: 'nowrap',
                          }}
                        >
                          We need your gate pass
                        </span>
                      )}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-sans, system-ui)',
                      fontSize: '12px',
                      color: 'var(--v2-ink-muted, #5c5851)',
                      marginTop: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      <span className={pp.mono} style={{ marginRight: '8px' }}>
                        {loadId}
                      </span>
                      {route && <span>{route}</span>}
                      {createdDate && <span> &middot; {createdDate}</span>}
                    </div>
                    {/* VIS-2-T02: who is carrying it. The company name only —
                        the list endpoint sends `carrier_name` and nothing else
                        about the carrier, and this row asks for nothing else. */}
                    {order.carrier_name ? (
                      <div style={{
                        fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px',
                        color: 'var(--v2-ink, #050607)', marginTop: '4px',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        Carrier: {order.carrier_name}
                      </div>
                    ) : carrierPending ? (
                      <div style={{
                        fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px',
                        color: 'var(--v2-ink-muted, #5c5851)', marginTop: '4px',
                        fontStyle: 'italic', whiteSpace: 'nowrap',
                        overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {CARRIER_NOT_ASSIGNED}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span className={statusChipClass(order.status)}>
                    {STATUS_LABELS[order.status] || order.status || 'Unknown'}
                  </span>
                  {price ? (
                    <div className={pp.mono} style={{ marginTop: '2px' }}>
                      {price}
                      {/* Which price this is, when it is the real one. Without
                          the qualifier a dispatched price and a quote range are
                          indistinguishable at a glance. */}
                      {dispatched && (
                        <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px', color: 'var(--v2-ink-muted, #5c5851)' }}> carrier</span>
                      )}
                    </div>
                  ) : pricePending ? (
                    <div style={{
                      fontFamily: 'var(--font-sans, system-ui)', fontSize: '11px',
                      color: 'var(--v2-ink-muted, #5c5851)', marginTop: '4px', fontStyle: 'italic',
                    }}>
                      {PRICE_NOT_SET}
                    </div>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ marginTop: '40px' }}>
        <h2 className={pp.sectionTitle} style={{ marginBottom: '16px' }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
        }}>
          {[
            { icon: <ClipboardIcon size={18} />, label: getNewOrderLabel(), to: getNewOrderPath() },
            ...(['dealer', 'exporter', 'auction_buyer'].includes(user?.customer_type)
              ? [{ icon: <MapPinIcon size={18} />, label: 'Locations', to: '/portal/locations' }]
              : []),
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
                background: 'var(--v2-card-cream, #fffaf1)',
                border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
                borderRadius: '10px',
                fontFamily: 'var(--font-sans, system-ui)',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--v2-ink, #050607)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'border-color 200ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(5, 6, 7, 0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(5, 6, 7, 0.14)'; }}
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
