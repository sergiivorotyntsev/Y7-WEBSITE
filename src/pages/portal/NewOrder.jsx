import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts, button as btnStyles } from '../../theme';

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  padding: '10px 14px',
  borderRadius: '8px',
  border: `1px solid ${colors.borderInput}`,
  background: colors.bgInput,
  color: colors.text,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle = {
  fontFamily: fonts.sans,
  fontSize: '12px',
  fontWeight: 600,
  color: colors.text,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'block',
  marginBottom: '4px',
};

const hintStyle = {
  fontFamily: fonts.sans,
  fontSize: '12px',
  color: colors.textMuted,
  marginTop: '4px',
};

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i;
const ZIP_RE = /^\d{5}$/;

export default function NewOrder() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [vin, setVin] = useState('');
  const [pickupZip, setPickupZip] = useState('');
  const [deliveryZip, setDeliveryZip] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  // Pre-fill contact from profile
  useEffect(() => {
    portalFetch('/api/portal/data/profile')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return;
        if (data.contact_name) setContactName(data.contact_name);
        if (data.phone) setContactPhone(data.phone);
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!pickupZip || !deliveryZip) {
      setError('Pickup and delivery ZIP codes are required.');
      return;
    }
    if (!ZIP_RE.test(pickupZip)) {
      setError('Pickup ZIP must be exactly 5 digits.');
      return;
    }
    if (!ZIP_RE.test(deliveryZip)) {
      setError('Delivery ZIP must be exactly 5 digits.');
      return;
    }
    if (!contactName.trim()) {
      setError('Contact name is required.');
      return;
    }
    if (!contactPhone.trim()) {
      setError('Contact phone or email is required.');
      return;
    }
    const vinClean = vin.trim().toUpperCase();
    if (vinClean && vinClean !== 'TBD' && !VIN_RE.test(vinClean)) {
      setError('VIN must be exactly 17 characters (letters A-H, J-N, P, R-Z and digits). No I, O, or Q.');
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        vin: vinClean || 'TBD',
        pickup_zip: pickupZip,
        delivery_zip: deliveryZip,
        pickup_contact_name: contactName.trim(),
        pickup_contact_phone: contactPhone.trim(),
        notes: notes.trim() || undefined,
      };
      const res = await portalFetch('/api/portal/data/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccess({ orderId: data.order_id, loadId: data.load_id });
      } else {
        const data = await res.json().catch(() => ({}));
        const detail = data?.detail;
        setError(typeof detail === 'string' ? detail : 'Failed to submit order. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <PageMeta title="Order Submitted" />
        <div style={{
          textAlign: 'center',
          padding: '60px 0',
          animation: 'fadeUp 0.4s ease-out',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#10003;</div>
          <h1 style={{
            fontFamily: fonts.serif,
            fontSize: '24px',
            fontWeight: 700,
            color: colors.text,
            marginBottom: '12px',
          }}>
            Order Submitted
          </h1>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: '14px',
            color: colors.textMuted,
            lineHeight: 1.6,
            marginBottom: '32px',
          }}>
            Your transport request has been received.
            Our dispatcher will review it and send you a quote shortly.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/portal/dashboard')}
              style={btnStyles.accent}
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => {
                setSuccess(null);
                setVin('');
                setPickupZip('');
                setDeliveryZip('');
                setNotes('');
              }}
              style={btnStyles.secondary}
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <PageMeta title="New Transport Order" />

      <Link to="/portal/dashboard" style={{
        fontFamily: fonts.sans,
        fontSize: '13px',
        color: colors.accent,
        display: 'inline-block',
        marginBottom: '20px',
      }}>
        &larr; Back to Dashboard
      </Link>

      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: '28px',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '8px',
      }}>
        New Transport Order
      </h1>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: '14px',
        color: colors.textMuted,
        marginBottom: '32px',
      }}>
        Submit a transport request. We'll review it and send you a quote.
      </p>

      <form onSubmit={handleSubmit}>
        {/* VIN */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>VIN Number</label>
          <input
            style={inputStyle}
            value={vin}
            onChange={e => setVin(e.target.value)}
            placeholder="Enter 17-character VIN or leave blank"
            maxLength={17}
          />
          <div style={hintStyle}>Optional. If unknown, we'll request it later.</div>
        </div>

        {/* ZIP Codes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Pickup ZIP *</label>
            <input
              style={inputStyle}
              value={pickupZip}
              onChange={e => setPickupZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="e.g. 02466"
              inputMode="numeric"
              maxLength={5}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Delivery ZIP *</label>
            <input
              style={inputStyle}
              value={deliveryZip}
              onChange={e => setDeliveryZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="e.g. 33101"
              inputMode="numeric"
              maxLength={5}
              required
            />
          </div>
        </div>

        {/* Contact */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Contact Name *</label>
            <input
              style={inputStyle}
              value={contactName}
              onChange={e => setContactName(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Phone or Email *</label>
            <input
              style={inputStyle}
              value={contactPhone}
              onChange={e => setContactPhone(e.target.value)}
              placeholder="Phone or email"
              required
            />
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Notes</label>
          <textarea
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Special instructions, vehicle details, etc."
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '13px',
            color: colors.accent,
            padding: '10px 14px',
            background: '#FFF0EC',
            borderRadius: '8px',
            marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            ...btnStyles.accent,
            width: '100%',
            padding: '14px 24px',
            fontSize: '14px',
            opacity: submitting ? 0.7 : 1,
            cursor: submitting ? 'default' : 'pointer',
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
}
