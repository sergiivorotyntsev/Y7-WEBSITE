import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckIcon } from '../../components/icons';
import OnboardingBanner from '../../components/OnboardingBanner';
import BouncingEmailBanner from '../../components/recovery/BouncingEmailBanner';
import { portalFetch } from '../../hooks/useAuth';
import { colors, fonts } from '../../theme';
import { STATUS_LABELS, STATUS_PIPELINE } from '../../utils/orderStatus';

const TIMELINE_STEPS = [
  { key: 'pending', label: STATUS_LABELS.pending, field: 'created_at' },
  { key: 'quoted', label: STATUS_LABELS.quoted, field: 'quoted_at' },
  { key: 'confirmed', label: STATUS_LABELS.confirmed, field: 'confirmed_at' },
  { key: 'dispatched', label: STATUS_LABELS.dispatched, field: null },
  { key: 'picked_up', label: STATUS_LABELS.picked_up, field: null },
  { key: 'in_transit', label: STATUS_LABELS.in_transit, field: null },
  { key: 'delivered', label: STATUS_LABELS.delivered, field: null },
];

const STATUS_ORDER = STATUS_PIPELINE;

function fmtDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function InfoCard({ title, children }) {
  return (
    <div style={{
      background: colors.bgCard,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
    }}>
      <div style={{
        fontFamily: fonts.sans,
        fontSize: '11px',
        fontWeight: 600,
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '12px',
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value, mono }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '4px 0',
      fontFamily: fonts.sans,
      fontSize: '13px',
    }}>
      <span style={{ color: colors.textMuted }}>{label}</span>
      <span style={{
        fontWeight: 500,
        color: colors.text,
        fontFamily: mono ? fonts.mono : fonts.sans,
        textAlign: 'right',
      }}>
        {value || '\u2014'}
      </span>
    </div>
  );
}

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState(null);
  const [feeAcknowledged, setFeeAcknowledged] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoMsg, setPromoMsg] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const dispatchSaved = searchParams.get('dispatch_saved') === '1';
  const justPaid = searchParams.get('paid') === '1';

  const fetchOrder = () => {
    setLoading(true);
    setError(null);
    portalFetch(`/api/portal/data/orders/${id}`)
      .then(r => r.json())
      .then(setOrder)
      .catch(() => setError('Failed to load order details. Please try again.'))
      .finally(() => setLoading(false));
  };

  const fetchPayment = () => {
    portalFetch(`/api/portal/orders/${id}/payment`)
      .then(r => r.ok ? r.json() : null)
      .then(setPaymentData)
      .catch(() => setPaymentData(null));
  };

  // Fetch on id change — fetchOrder/fetchPayment are stable functions
  // defined at the top of the component.
  useEffect(() => {
    fetchOrder();
    fetchPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // One-shot mount effect — handle justPaid query param and pick up any
  // stashed promo code from localStorage.
  useEffect(() => {
    if (justPaid) {
      fetchPayment();
      fetchOrder();
      window.history.replaceState({}, '', window.location.pathname);
    }
    try {
      const stored = localStorage.getItem('y7_promo_code');
      if (stored) setPromoCode(stored);
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyPromo = async () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) return;
    setPromoLoading(true);
    setPromoMsg(null);
    try {
      const res = await portalFetch(`/api/portal/orders/${id}/apply-promo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promo_code: code }),
      });
      const data = await res.json();
      if (!res.ok || data.valid === false) {
        setPromoMsg({ ok: false, text: data.error || data.detail || 'Invalid promo code' });
      } else {
        setPromoMsg({ ok: true, text: `Applied: −$${(data.discount_cents / 100).toFixed(2)} off` });
        fetchPayment();
      }
    } catch {
      setPromoMsg({ ok: false, text: 'Failed to validate promo' });
    } finally {
      setPromoLoading(false);
    }
  };

  const handlePayNow = async () => {
    setPayLoading(true);
    setPayError(null);
    try {
      const res = await portalFetch(`/api/portal/orders/${id}/checkout`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Payment system error');
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }
      throw new Error('No checkout URL returned');
    } catch (err) {
      setPayError(err.message || 'Payment system error. Please try again.');
      setPayLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirmCancel) { setConfirmCancel(true); return; }
    setConfirmCancel(false);
    try {
      const r = await portalFetch(`/api/portal/data/orders/${id}/cancel`, { method: 'POST' });
      if (r.ok) fetchOrder();
      else setError('Failed to cancel order. Please try again.');
    } catch {
      setError('Failed to cancel order. Please check your connection and try again.');
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <style>{`@keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }`}</style>
        {[120, 200, 160].map((h, i) => (
          <div key={i} style={{
            height: h, borderRadius: '12px', marginBottom: '16px',
            background: `linear-gradient(90deg, ${colors.bgMuted} 25%, ${colors.bgCard} 50%, ${colors.bgMuted} 75%)`,
            backgroundSize: '800px 100%', animation: 'shimmer 1.5s ease-in-out infinite',
          }} />
        ))}
      </div>
    );
  }

  if (!order && error) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px 80px', textAlign: 'center' }}>
        <div style={{
          fontFamily: fonts.sans, fontSize: '13px', color: colors.accent,
          padding: '10px 14px', background: '#FFF0EC', borderRadius: '8px',
        }}>
          {error}
        </div>
      </div>
    );
  }

  if (!order) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Order not found.</div>;
  }

  const vehicle = [order.vehicle_year, order.vehicle_make, order.vehicle_model].filter(Boolean).join(' ') || 'Vehicle TBD';
  const currentStatusIdx = STATUS_ORDER.indexOf(order.status);

  function isStepDone(stepKey) {
    const statusSteps = ['pending', 'quoted', 'confirmed', 'dispatched', 'picked_up', 'in_transit', 'delivered'];
    const sIdx = statusSteps.indexOf(stepKey);
    return sIdx >= 0 && sIdx <= currentStatusIdx;
  }

  function getStepDate(step) {
    if (step.field && order[step.field]) return fmtDate(order[step.field]);
    if (isStepDone(step.key) && step.key === 'pending') return fmtDate(order.created_at);
    return null;
  }

  const price = order.final_price
    ? `$${typeof order.final_price === 'number' ? order.final_price.toFixed(2) : order.final_price}`
    : (order.quote_price_min && order.quote_price_max)
      ? `$${order.quote_price_min} - $${order.quote_price_max}`
      : null;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <BouncingEmailBanner />
      <OnboardingBanner />
      {/* Back link */}
      <Link to="/portal/dashboard" style={{
        fontFamily: fonts.sans,
        fontSize: '13px',
        color: colors.accent,
        display: 'inline-block',
        marginBottom: '20px',
      }}>
        &larr; Back to Dashboard
      </Link>

      {/* Header */}
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: '24px',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '4px',
      }}>
        {vehicle}
      </h1>
      {order.vin && order.vin !== 'TBD' && (
        <p style={{ fontFamily: fonts.mono, fontSize: '13px', color: colors.textMuted, marginBottom: '24px' }}>
          VIN: {order.vin}
        </p>
      )}

      {/* Status Timeline */}
      <div style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        {TIMELINE_STEPS.map((step, i) => {
          const done = isStepDone(step.key);
          const isCurrent = step.key === order.status;
          const date = getStepDate(step);

          return (
            <div key={step.key} style={{
              display: 'flex',
              gap: '16px',
              minHeight: i < TIMELINE_STEPS.length - 1 ? '52px' : 'auto',
            }}>
              {/* Dot + line */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '20px',
                flexShrink: 0,
              }}>
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: done ? colors.success : (isCurrent ? colors.accent : colors.border),
                  border: done ? 'none' : `2px solid ${isCurrent ? colors.accent : colors.border}`,
                  flexShrink: 0,
                  marginTop: '3px',
                }} />
                {i < TIMELINE_STEPS.length - 1 && (
                  <div style={{
                    width: '2px',
                    flex: 1,
                    background: done ? colors.success : colors.border,
                    opacity: done ? 0.4 : 0.3,
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: '12px' }}>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: '14px',
                  fontWeight: done ? 600 : 400,
                  color: done ? colors.text : colors.textMuted,
                }}>
                  {step.label}
                </div>
                {date && (
                  <div style={{
                    fontFamily: fonts.sans,
                    fontSize: '12px',
                    color: colors.textMuted,
                    marginTop: '2px',
                  }}>
                    {date}
                  </div>
                )}
                {!done && !date && (
                  <div style={{
                    fontFamily: fonts.sans,
                    fontSize: '12px',
                    color: colors.textHint,
                    fontStyle: 'italic',
                    marginTop: '2px',
                  }}>
                    Waiting...
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Route Details */}
      <InfoCard title="Route Details">
        <InfoRow label="From" value={[order.pickup_city, order.pickup_state, order.pickup_zip].filter(Boolean).join(', ') || order.pickup_zip} />
        {order.pickup_location_type && <InfoRow label="Type" value={order.pickup_location_type} />}
        <InfoRow label="To" value={[order.delivery_city, order.delivery_state, order.delivery_zip].filter(Boolean).join(', ') || order.delivery_zip} />
      </InfoCard>

      {/* Payment */}
      {(price || paymentData?.payment) && (
        <InfoCard title="Payment">
          {price && <InfoRow label="Transport fee" value={price} mono />}
          {order.payment_responsibility && <InfoRow label="Payment method" value={order.payment_responsibility === 'broker' ? 'Prepaid to Y7' : 'COD at delivery'} />}

          {paymentData?.payment && (
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${colors.border}` }}>
              <InfoRow label="Tier" value={paymentData.payment.service_tier === 'full_service' ? 'Full Service' : 'COD'} />
              <InfoRow label="Dispatch fee" value={`$${(paymentData.payment.dispatch_fee_cents / 100).toFixed(2)}`} mono />
              {paymentData.payment.service_tier === 'full_service' && (
                <InfoRow label="Carrier transport" value={`$${(paymentData.payment.carrier_quote_cents / 100).toFixed(2)}`} mono />
              )}
              {paymentData.payment.discount_cents > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '13px', color: colors.success }}>
                  <span>Promo ({paymentData.payment.promo_code})</span>
                  <span style={{ fontFamily: 'monospace' }}>−${(paymentData.payment.discount_cents / 100).toFixed(2)}</span>
                </div>
              )}
              <InfoRow label="Total" value={`$${(paymentData.payment.total_charge_cents / 100).toFixed(2)}`} mono />
              <InfoRow label="Status" value={paymentData.payment.status} />

              {paymentData.payment.status === 'pending' && ['quoted', 'confirmed'].includes(order.status) && (
                <div style={{ marginTop: '14px' }}>
                  {!paymentData.payment.promo_code && (
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'block' }}>
                        Promo code
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={promoCode}
                          onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoMsg(null); }}
                          placeholder="SAVE10"
                          style={{
                            flex: 1, padding: '8px 10px',
                            border: `1px solid ${colors.border}`, borderRadius: '6px',
                            fontSize: '14px', fontFamily: 'monospace', letterSpacing: '1px',
                            textTransform: 'uppercase',
                          }}
                        />
                        <button
                          onClick={handleApplyPromo}
                          disabled={promoLoading || !promoCode.trim()}
                          style={{
                            padding: '8px 14px',
                            border: `1px solid ${colors.border}`, borderRadius: '6px',
                            background: '#fff', fontSize: '13px', fontWeight: 600,
                            cursor: (promoLoading || !promoCode.trim()) ? 'not-allowed' : 'pointer',
                            opacity: (promoLoading || !promoCode.trim()) ? 0.6 : 1,
                          }}
                        >
                          {promoLoading ? '...' : 'Apply'}
                        </button>
                      </div>
                      {promoMsg && (
                        <div style={{ marginTop: '6px', fontSize: '12px', color: promoMsg.ok ? colors.success : colors.accent }}>
                          {promoMsg.text}
                        </div>
                      )}
                    </div>
                  )}
                  {paymentData.payment.service_tier === 'full_service' && (
                    <label style={{ display: 'flex', gap: '8px', fontSize: '12px', color: colors.textMuted, marginBottom: '10px', lineHeight: 1.45 }}>
                      <input
                        type="checkbox"
                        checked={feeAcknowledged}
                        onChange={e => setFeeAcknowledged(e.target.checked)}
                      />
                      <span>
                        I understand that payment processing fees (~${(paymentData.payment.total_charge_cents * 0.029 / 100 + 0.30).toFixed(2)}) are non-refundable and will be deducted from any refund.
                      </span>
                    </label>
                  )}
                  <button
                    onClick={handlePayNow}
                    disabled={payLoading || (paymentData.payment.service_tier === 'full_service' && !feeAcknowledged)}
                    style={{
                      width: '100%',
                      padding: '12px 18px',
                      border: 'none',
                      borderRadius: '10px',
                      background: colors.brand || '#1F3864',
                      color: '#fff',
                      fontFamily: fonts.sans,
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: payLoading ? 'not-allowed' : 'pointer',
                      opacity: (payLoading || (paymentData.payment.service_tier === 'full_service' && !feeAcknowledged)) ? 0.6 : 1,
                    }}
                  >
                    {payLoading ? 'Redirecting...' : `Pay $${(paymentData.payment.total_charge_cents / 100).toFixed(2)} Now`}
                  </button>
                  {payError && (
                    <div style={{ marginTop: '8px', fontSize: '12px', color: colors.accent }}>{payError}</div>
                  )}
                </div>
              )}

              {paymentData.payment.status === 'paid' && (
                <div style={{ marginTop: '12px', fontSize: '12px', color: colors.success, fontStyle: 'italic' }}>
                  Payment received. Thank you!
                </div>
              )}
            </div>
          )}
        </InfoCard>
      )}

      {/* Gate Pass Status */}
      <InfoCard title="Gate Pass">
        {order.gate_pass_file_name ? (
          <div style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.success }}>
            <CheckIcon size={16} /> {order.gate_pass_file_name}
          </div>
        ) : order.gate_pass ? (
          <InfoRow label="Gate Pass #" value={order.gate_pass} />
        ) : (
          <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textHint, fontStyle: 'italic' }}>
            Not uploaded
          </div>
        )}
      </InfoCard>

      {/* Driver info card (dispatched orders) */}
      {order.status === 'dispatched' && order.driver_name && (
        <InfoCard title="YOUR DRIVER">
          <div style={{ fontFamily: fonts.sans, fontSize: '15px', fontWeight: 600, color: colors.text }}>
            {order.driver_name}
          </div>
          {order.driver_phone && (
            <a href={`tel:${order.driver_phone}`} style={{
              display: 'inline-block', marginTop: '6px',
              fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600,
              color: colors.accent, textDecoration: 'none',
            }}>
              {order.driver_phone}
            </a>
          )}
          {order.estimated_delivery_date && (
            <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, marginTop: '10px' }}>
              Planned delivery: {fmtDate(order.estimated_delivery_date) || order.estimated_delivery_date}
            </div>
          )}
          {order.carrier_name && (
            <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textHint, marginTop: '4px' }}>
              Carrier: {order.carrier_name}{order.carrier_mc ? ` (MC ${order.carrier_mc})` : ''}
            </div>
          )}
        </InfoCard>
      )}

      {/* Status history timeline */}
      {order.status_history && order.status_history.length > 0 && (
        <InfoCard title="ORDER HISTORY">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {order.status_history.map((entry, idx) => (
              <div key={entry.id} style={{
                borderLeft: `3px solid ${idx === 0 ? colors.accent : colors.border}`,
                paddingLeft: '12px', paddingTop: '2px', paddingBottom: '2px',
              }}>
                <div style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: colors.text }}>
                  {entry.to_status === 'dispatched' ? 'Carrier assigned' :
                   entry.to_status === 'listed' ? 'Sourcing new carrier' :
                   entry.to_status === 'completed' ? 'Delivered' :
                   entry.to_status === 'cancelled' ? 'Cancelled' :
                   entry.to_status}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, marginTop: '2px' }}>
                  {fmtDate(entry.created_at)}
                </div>
                {entry.cancellation_reason && (
                  <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: '#B8851F', marginTop: '4px' }}>
                    {entry.cancellation_reason === 'carrier_refused' ? 'Carrier became unavailable' :
                     entry.cancellation_reason === 'carrier_broke_down' ? 'Carrier mechanical issue' :
                     entry.cancellation_reason === 'no_show' ? 'Carrier did not arrive' :
                     entry.cancellation_reason}
                  </div>
                )}
                {entry.carrier_name_at_transition && (
                  <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textHint, marginTop: '2px' }}>
                    Carrier: {entry.carrier_name_at_transition}
                  </div>
                )}
              </div>
            ))}
          </div>
        </InfoCard>
      )}

      {/* Dispatch Details Status */}
      {['confirmed', 'dispatched'].includes(order.status) && (
        <div style={{
          background: order.dispatch_info_completed ? colors.successBg : '#FFF8E1',
          border: `1px solid ${order.dispatch_info_completed ? colors.success : '#F9A825'}`,
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {order.dispatch_info_completed ? (
            <>
              <span style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.success, fontWeight: 500 }}>
                <CheckIcon size={16} /> Dispatch details provided
              </span>
              <Link to={`/portal/order/${id}/dispatch-details`} style={{
                fontFamily: fonts.sans, fontSize: '12px', color: colors.accent, textDecoration: 'none',
              }}>
                Edit
              </Link>
            </>
          ) : (
            <>
              <span style={{ fontFamily: fonts.sans, fontSize: '14px', color: '#E65100', fontWeight: 500 }}>
                Dispatch details needed to proceed
              </span>
              <Link to={`/portal/order/${id}/dispatch-details`} style={{
                fontFamily: fonts.sans, fontSize: '12px', fontWeight: 600,
                color: '#fff', background: '#F57C00', padding: '6px 14px',
                borderRadius: '16px', textDecoration: 'none',
              }}>
                Provide Details
              </Link>
            </>
          )}
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div style={{
          fontFamily: fonts.sans, fontSize: '13px', color: colors.accent,
          padding: '10px 14px', background: '#FFF0EC', borderRadius: '8px',
          marginBottom: '16px',
        }}>
          {error}
        </div>
      )}

      {/* Success banner after saving dispatch details */}
      {dispatchSaved && (
        <div style={{
          background: colors.successBg, border: `1px solid ${colors.success}`,
          borderRadius: '12px', padding: '12px 20px', marginBottom: '16px',
          fontFamily: fonts.sans, fontSize: '14px', color: colors.success, fontWeight: 500,
        }}>
          <CheckIcon size={16} /> Dispatch details saved successfully
        </div>
      )}

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginTop: '8px',
      }}>
        {['confirmed', 'dispatched', 'completed'].includes(order.status) && order.final_price && (
          <button onClick={async () => {
            try {
              const r = await portalFetch(`/api/portal/data/orders/${id}/invoice`);
              if (r.ok) {
                const blob = await r.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `invoice_${order.load_id || id}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
              } else { setError('Invoice not available yet.'); }
            } catch { setError('Failed to download invoice.'); }
          }} style={{
            fontFamily: fonts.sans, fontSize: '13px', fontWeight: 500,
            color: colors.accent, padding: '10px 16px',
            border: `1px solid ${colors.border}`, borderRadius: '8px',
            background: 'transparent', cursor: 'pointer',
          }}>
            Download Invoice
          </button>
        )}
        <button onClick={() => { setShowMessageForm(f => !f); setMessageSent(false); }} style={{
          fontFamily: fonts.sans, fontSize: '13px', fontWeight: 500,
          color: colors.accent, padding: '10px 16px',
          border: `1px solid ${colors.border}`, borderRadius: '8px',
          background: 'transparent', cursor: 'pointer',
        }}>
          Contact Dispatcher
        </button>
      </div>

      {/* Message to dispatcher form */}
      {showMessageForm && (
        <div style={{
          background: colors.bgCard, border: `1px solid ${colors.border}`,
          borderRadius: '12px', padding: '16px 20px', marginTop: '12px',
        }}>
          {messageSent ? (
            <div style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.success, fontWeight: 500 }}>
              <CheckIcon size={16} /> Message sent! We'll respond shortly.
            </div>
          ) : (
            <>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Message to dispatcher about this order..."
                style={{
                  width: '100%', minHeight: '80px', resize: 'vertical',
                  padding: '10px 12px', border: `1px solid ${colors.borderInput}`,
                  borderRadius: '8px', fontSize: '14px', fontFamily: fonts.sans,
                  background: colors.bgInput, color: colors.text, boxSizing: 'border-box',
                }}
              />
              <button
                disabled={sendingMessage || !message.trim()}
                onClick={async () => {
                  setSendingMessage(true);
                  try {
                    const r = await portalFetch(`/api/portal/data/orders/${id}/message`, {
                      method: 'POST',
                      body: JSON.stringify({ message: message.trim() }),
                    });
                    if (r.ok) { setMessageSent(true); setMessage(''); }
                    else { setError('Failed to send message. Please try again.'); }
                  } catch { setError('Failed to send message. Please check your connection.'); }
                  setSendingMessage(false);
                }}
                style={{
                  marginTop: '8px', padding: '8px 20px',
                  background: colors.accent, color: '#fff',
                  border: 'none', borderRadius: '20px',
                  fontSize: '12px', fontWeight: 600, cursor: sendingMessage ? 'not-allowed' : 'pointer',
                  fontFamily: fonts.sans, textTransform: 'uppercase', letterSpacing: '0.5px',
                  opacity: (sendingMessage || !message.trim()) ? 0.6 : 1,
                }}
              >
                {sendingMessage ? 'Sending...' : 'Send Message'}
              </button>
            </>
          )}
        </div>
      )}

      {/* Cancel */}
      {(order.status === 'pending' || order.status === 'quoted') && (
        <>
          <button onClick={handleCancel} style={{
            fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.5px',
            padding: '12px 24px', background: confirmCancel ? '#b02a37' : '#dc3545', color: '#fff',
            border: 'none', borderRadius: '20px', cursor: 'pointer',
            marginTop: '12px', width: '100%',
          }}>
            {confirmCancel ? 'Confirm Cancellation' : 'Cancel Order'}
          </button>
          {confirmCancel && (
            <button onClick={() => setConfirmCancel(false)} style={{
              fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted,
              background: 'none', border: 'none', cursor: 'pointer',
              marginTop: '8px', width: '100%',
            }}>
              Never mind
            </button>
          )}
        </>
      )}

      {/* Resubmit after decline */}
      {(order.status === 'declined' || order.status === 'cancelled') && (
        <button onClick={() => navigate(`/?vin=${encodeURIComponent(order.vin || '')}&pickup_zip=${encodeURIComponent(order.pickup_zip || '')}`)} style={{
          fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.5px',
          padding: '12px 24px', background: colors.accent, color: '#fff',
          border: 'none', borderRadius: '20px', cursor: 'pointer',
          marginTop: '8px', width: '100%',
        }}>
          Request New Quote
        </button>
      )}
    </div>
  );
}
