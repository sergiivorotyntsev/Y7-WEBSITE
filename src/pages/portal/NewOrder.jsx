import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { portalFetch } from '../../hooks/useAuth';
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
  const navigate = useNavigate();

  const [vin, setVin] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [pickupZip, setPickupZip] = useState('');
  const [deliveryZip, setDeliveryZip] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const vinClean = vin.trim().toUpperCase();
  const hasFullVin = VIN_RE.test(vinClean);
  const showVehicleDetails = !hasFullVin;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (vinClean && vinClean !== 'TBD' && !VIN_RE.test(vinClean)) {
      setError('VIN must be exactly 17 characters (letters A-H, J-N, P, R-Z and digits). No I, O, or Q.');
      return;
    }
    if (!hasFullVin && !vehicleMake.trim()) {
      setError('Please enter the VIN or at least the vehicle make.');
      return;
    }
    if (!pickupZip || !ZIP_RE.test(pickupZip)) {
      setError('Pickup ZIP must be exactly 5 digits.');
      return;
    }
    if (!deliveryZip || !ZIP_RE.test(deliveryZip)) {
      setError('Delivery ZIP must be exactly 5 digits.');
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        vin: vinClean || 'TBD',
        vehicle_year: vehicleYear.trim() || undefined,
        vehicle_make: vehicleMake.trim() || undefined,
        vehicle_model: vehicleModel.trim() || undefined,
        pickup_zip: pickupZip,
        delivery_zip: deliveryZip,
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
                setVehicleYear('');
                setVehicleMake('');
                setVehicleModel('');
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
        marginBottom: '6px',
      }}>
        Submit a transport request. We'll review it and send you a quote.
      </p>
      <p style={{
        fontFamily: fonts.sans,
        fontSize: '12px',
        color: colors.textMuted,
        marginBottom: '32px',
      }}>
        Contact info from your profile will be used.{' '}
        <Link to="/portal/profile" style={{ color: colors.accent }}>
          Update in Profile
        </Link>
      </p>

      <form onSubmit={handleSubmit}>
        {/* VIN */}
        <div style={{ marginBottom: showVehicleDetails ? '12px' : '20px' }}>
          <label style={labelStyle}>VIN Number</label>
          <input
            style={inputStyle}
            value={vin}
            onChange={e => setVin(e.target.value)}
            placeholder="Enter 17-character VIN or leave blank"
            maxLength={17}
          />
          <div style={hintStyle}>Optional. If unknown, enter vehicle details below.</div>
        </div>

        {/* Vehicle details — shown when VIN is not a full 17-char match */}
        {showVehicleDetails && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ ...hintStyle, marginTop: 0, marginBottom: '8px' }}>
              Don't have the VIN? Enter vehicle details:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Year</label>
                <input
                  style={inputStyle}
                  value={vehicleYear}
                  onChange={e => setVehicleYear(e.target.value)}
                  placeholder="e.g. 2022"
                  maxLength={4}
                  inputMode="numeric"
                />
              </div>
              <div>
                <label style={labelStyle}>Make *</label>
                <input
                  style={inputStyle}
                  value={vehicleMake}
                  onChange={e => setVehicleMake(e.target.value)}
                  placeholder="e.g. Honda"
                />
              </div>
              <div>
                <label style={labelStyle}>Model</label>
                <input
                  style={inputStyle}
                  value={vehicleModel}
                  onChange={e => setVehicleModel(e.target.value)}
                  placeholder="e.g. CR-V"
                />
              </div>
            </div>
          </div>
        )}

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
