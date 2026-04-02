import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portalFetch } from '../../hooks/useAuth';
import { colors, fonts } from '../../theme';

const TIMELINE_STEPS = [
  { key: 'pending', label: 'Quote Requested', field: 'created_at' },
  { key: 'quoted', label: 'Quote Sent', field: 'quoted_at' },
  { key: 'confirmed', label: 'Quote Confirmed', field: 'confirmed_at' },
  { key: 'agreement', label: 'Agreement Signed', field: 'agreement_signed_at' },
  { key: 'dispatched', label: 'Carrier Assigned', field: null },
  { key: 'picked_up', label: 'Picked Up', field: null },
  { key: 'in_transit', label: 'In Transit', field: null },
  { key: 'delivered', label: 'Delivered', field: null },
];

const STATUS_ORDER = ['pending', 'quoted', 'confirmed', 'dispatched', 'picked_up', 'in_transit', 'delivered', 'completed'];

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
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portalFetch(`/api/portal/data/orders/${id}`)
      .then(r => r.json())
      .then(setOrder)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Loading...</div>;
  }

  if (!order) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Order not found.</div>;
  }

  const vehicle = [order.vehicle_year, order.vehicle_make, order.vehicle_model].filter(Boolean).join(' ') || 'Vehicle TBD';
  const currentStatusIdx = STATUS_ORDER.indexOf(order.status);

  function isStepDone(stepKey) {
    const stepIdx = TIMELINE_STEPS.findIndex(s => s.key === stepKey);
    if (stepKey === 'agreement') return !!order.agreement_signed_at;
    // Steps before current status are done
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
          const isCurrent = step.key === order.status || (step.key === 'agreement' && !done && currentStatusIdx >= 2);
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
                  {step.key === 'agreement' && done && ' \u2705'}
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
      {price && (
        <InfoCard title="Payment">
          <InfoRow label="Transport fee" value={price} mono />
          {order.payment_responsibility && <InfoRow label="Payment method" value={order.payment_responsibility === 'broker' ? 'Prepaid to Y7' : 'COD at delivery'} />}
        </InfoCard>
      )}

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginTop: '8px',
      }}>
        {order.id && (
          <Link to={`/agreement/${order.id}`} style={{
            ...fonts.sans,
            fontSize: '13px',
            fontWeight: 500,
            color: colors.accent,
            padding: '10px 16px',
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            textDecoration: 'none',
          }}>
            View Agreement
          </Link>
        )}
        <a href="mailto:info@y7agency.com" style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          fontWeight: 500,
          color: colors.accent,
          padding: '10px 16px',
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          textDecoration: 'none',
        }}>
          Contact Dispatcher
        </a>
      </div>
    </div>
  );
}
