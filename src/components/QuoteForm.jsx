import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useVinDecode } from '../hooks/useVinDecode';
import { apiPost } from '../hooks/useApi';
import SmsConsent from './SmsConsent';
import RouteEstimator from './RouteEstimator';
import VehicleSilhouette from './VehicleSilhouette';
import PostQuoteFlow from './PostQuoteFlow';
import { colors, fonts, button as btnStyles } from '../theme';
import { trackEvent } from '../utils/analytics';

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  padding: '10px 14px',
  borderRadius: '8px',
  border: `1px solid ${colors.borderInput}`,
  background: colors.bgInput,
  color: colors.text,
  outline: 'none',
  width: '100%',
};

const selectStyle = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888780' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  paddingRight: '32px',
  cursor: 'pointer',
};

const labelStyle = {
  fontFamily: fonts.sans,
  fontSize: '12px',
  fontWeight: 600,
  color: colors.text,
  marginBottom: '4px',
  display: 'block',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
};

const PICKUP_LOCATION_TYPES = [
  { value: '', label: 'Select...' },
  { value: 'business', label: 'Business' },
  { value: 'residential', label: 'Residential' },
  { value: 'auction', label: 'Auction (IAAI/Copart/Manheim)' },
  { value: 'dealer', label: 'Dealer' },
  { value: 'port', label: 'Port' },
  { value: 'other', label: 'Other' },
];

const DELIVERY_LOCATION_TYPES = [
  { value: '', label: 'Select...' },
  { value: 'business', label: 'Business' },
  { value: 'residential', label: 'Residential' },
  { value: 'dealer', label: 'Dealer' },
  { value: 'port', label: 'Port' },
  { value: 'storage', label: 'Storage Facility' },
  { value: 'other', label: 'Other' },
];

export default function QuoteForm({ compact = false }) {
  const { t } = useTranslation('quote');
  const { decode, loading: vinLoading, error: vinError, result: vinResult } = useVinDecode();
  const step2Ref = useRef(null);
  const [step2Height, setStep2Height] = useState(0);

  // Pre-fill from URL params (e.g. resubmit after decline: ?vin=...&pickup_zip=...)
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const [form, setForm] = useState({
    vin: urlParams?.get('vin') || '',
    vehicle_year: '', vehicle_make: '', vehicle_model: '',
    pickup_zip: urlParams?.get('pickup_zip') || '',
    pickup_location_type: '',
    delivery_zip: '', delivery_location_type: '',
    transport_type: 'open',
    is_inoperable: false,
    pickup_date_type: 'asap',
    preferred_pickup_date: '',
    name: '', phone: '', email: '',
    sms_consent: false, notes: '',
  });
  const [noVinMode, setNoVinMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});
  const formStarted = useRef(false);

  function markTouched(field) {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (!formStarted.current) {
      formStarted.current = true;
      trackEvent('quote_form_start');
    }
  }

  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
  const fieldErrors = {
    vin: !noVinMode && touched.vin && form.vin && !vinRegex.test(form.vin.trim().toUpperCase())
      ? 'VIN must be 17 characters (A-H, J-N, P, R-Z, 0-9)' : null,
    email: touched.email && form.email && !form.email.includes('@') ? 'Enter a valid email' : null,
    pickup_zip: touched.pickup_zip && form.pickup_zip && form.pickup_zip.trim().length > 0 && form.pickup_zip.trim().length < 5
      ? 'ZIP must be 5 digits' : null,
    delivery_zip: touched.delivery_zip && form.delivery_zip && form.delivery_zip.trim().length > 0 && form.delivery_zip.trim().length < 5
      ? 'ZIP must be 5 digits' : null,
  };

  // Listen for transport type selection from TransportComparison buttons
  useEffect(() => {
    const handler = (e) => {
      if (e.detail) set('transport_type', e.detail);
    };
    window.addEventListener('selectTransportType', handler);
    return () => window.removeEventListener('selectTransportType', handler);
  }, []);

  // Step 2: both ZIPs must be >= 5 chars
  const showStep2 = form.pickup_zip.trim().length >= 5 && form.delivery_zip.trim().length >= 5;

  // Step 3: button active when name + (phone or email)
  const canSubmit = !!(form.name.trim() && form.email.trim() && form.email.includes('@'));

  // Measure step2 inner height for smooth animation
  useEffect(() => {
    if (step2Ref.current) {
      setStep2Height(step2Ref.current.scrollHeight);
    }
  });

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleDecode() {
    const result = await decode(form.vin);
    trackEvent('vin_decoded', { success: !!result });
    if (result) {
      setForm(prev => ({
        ...prev,
        vehicle_year: result.year,
        vehicle_make: result.make,
        vehicle_model: result.model,
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // VIN format check (if user typed something in VIN mode)
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    if (!noVinMode && form.vin && !vinRegex.test(form.vin.trim().toUpperCase())) {
      setError('Invalid VIN. Must be 17 characters (letters A-H, J-N, P, R-Z and digits).');
      return;
    }

    // Unified vehicle identification rule: 17-char VIN OR full Year+Make+Model
    const vinTrim = (form.vin || '').trim().toUpperCase();
    const yearTrim = String(form.vehicle_year || '').trim();
    const makeTrim = (form.vehicle_make || '').trim();
    const modelTrim = (form.vehicle_model || '').trim();
    const hasVin = vinTrim.length === 17;
    const hasYMM = yearTrim.length === 4 && /^\d{4}$/.test(yearTrim) && makeTrim.length > 0 && modelTrim.length > 0;
    if (!hasVin && !hasYMM) {
      setError(
        'Please provide either a 17-character VIN, or fill in Year + Make + Model. ' +
        'We cannot quote without knowing which vehicle to transport.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!form.name.trim()) { setError(t('errors.nameRequired')); return; }
    if (!form.email.trim() || !form.email.includes('@')) { setError(t('errors.emailRequired')); return; }
    if (form.pickup_zip.trim().length < 5) { setError(t('errors.pickupRequired')); return; }
    if (form.delivery_zip.trim().length < 5) { setError(t('errors.deliveryRequired')); return; }

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        vin: noVinMode ? 'TBD' : form.vin.trim().toUpperCase(),
        is_inoperable: form.is_inoperable,
        preferred_pickup_date: form.pickup_date_type === 'date' ? form.preferred_pickup_date : null,
        sms_consent_timestamp: form.sms_consent ? new Date().toISOString() : null,
        sms_consent_page_url: window.location.href,
        source: 'website',
        lang: 'en',
      };
      const res = await apiPost('/api/public/quote', payload);
      setSuccess(res);
      trackEvent('quote_submit', { has_vin: !noVinMode, transport_type: form.transport_type });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return <PostQuoteFlow quoteResult={success} formData={form} />;
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: colors.bgCard,
      border: `1px solid ${colors.border}`,
      borderRadius: '16px',
      padding: compact ? '24px' : '32px',
      maxWidth: '680px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>

      {/* ── STEP 1: Vehicle + Route ── */}

      {/* VIN or manual vehicle entry */}
      {!noVinMode ? (
        <div>
          <label style={labelStyle}>{t('form.vin')}</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={form.vin}
              onChange={e => set('vin', e.target.value.toUpperCase())}
              onBlur={() => markTouched('vin')}
              placeholder={t('form.vinPlaceholder')}
              maxLength={17}
              style={{ ...inputStyle, fontFamily: fonts.mono, flex: 1, fontSize: '16px', borderColor: fieldErrors.vin ? colors.accent : colors.borderInput }}
            />
            <button
              type="button"
              onClick={handleDecode}
              disabled={vinLoading || form.vin.length !== 17}
              style={{
                ...btnStyles.secondary,
                padding: '8px 16px',
                fontSize: '11px',
                opacity: (vinLoading || form.vin.length !== 17) ? 0.5 : 1,
              }}
            >
              {vinLoading ? '...' : t('form.decode')}
            </button>
          </div>
          {vinError && (
            <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.accent, marginTop: '4px' }}>
              {vinError}
            </div>
          )}
          {fieldErrors.vin && (
            <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.accent, marginTop: '4px' }}>{fieldErrors.vin}</div>
          )}
          {!form.vin && (
            <div style={{ fontFamily: fonts.sans, fontSize: '11px', color: colors.textMuted, marginTop: '4px' }}>
              No VIN? Use &quot;I don&apos;t have a VIN&quot; below to enter Year, Make and Model.
            </div>
          )}
          {vinResult && (
            <>
              <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.success, marginTop: '4px' }}>
                {vinResult.year} {vinResult.make} {vinResult.model}
              </div>
              <VehicleSilhouette make={vinResult.make} model={vinResult.model} year={vinResult.year} bodyClass={vinResult.bodyClass} />
            </>
          )}
          <div
            onClick={() => setNoVinMode(true)}
            style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.accent, cursor: 'pointer', marginTop: '8px' }}
          >
            I don&apos;t have a VIN
          </div>
        </div>
      ) : (
        <div>
          <div
            onClick={() => setNoVinMode(false)}
            style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.accent, cursor: 'pointer', marginBottom: '12px' }}
          >
            &larr; I have a VIN
          </div>
          <div style={{ ...rowStyle, gridTemplateColumns: '100px 1fr 1fr' }}>
            <div>
              <label style={labelStyle}>Year *</label>
              <select value={form.vehicle_year} onChange={e => set('vehicle_year', e.target.value)} style={{ ...selectStyle, fontSize: '16px' }}>
                <option value="">Year</option>
                {Array.from({ length: 28 }, (_, i) => 2027 - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Make *</label>
              <input value={form.vehicle_make} onChange={e => set('vehicle_make', e.target.value)} placeholder="Honda" style={{ ...inputStyle, fontSize: '16px' }} />
            </div>
            <div>
              <label style={labelStyle}>Model *</label>
              <input value={form.vehicle_model} onChange={e => set('vehicle_model', e.target.value)} placeholder="Civic" style={{ ...inputStyle, fontSize: '16px' }} />
            </div>
          </div>
        </div>
      )}

      {/* Vehicle details (show if decoded) */}
      {!noVinMode && vinResult && (
        <div style={{ ...rowStyle, gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div>
            <label style={labelStyle}>{t('form.vehicleYear')}</label>
            <input
              value={form.vehicle_year}
              onChange={e => set('vehicle_year', e.target.value.replace(/\D/g, '').slice(0, 4))}
              inputMode="numeric"
              maxLength={4}
              pattern="\d{4}"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>{t('form.vehicleMake')}</label>
            <input value={form.vehicle_make} onChange={e => set('vehicle_make', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{t('form.vehicleModel')}</label>
            <input value={form.vehicle_model} onChange={e => set('vehicle_model', e.target.value)} style={inputStyle} />
          </div>
        </div>
      )}

      {/* Pickup section */}
      <div>
        <div style={{
          fontFamily: fonts.sans, fontSize: '11px', fontWeight: 700,
          color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px',
          marginBottom: '8px',
        }}>
          Pickup
        </div>
        <div style={rowStyle}>
          <div>
            <label style={labelStyle}>ZIP</label>
            <input
              value={form.pickup_zip}
              onChange={e => set('pickup_zip', e.target.value)}
              placeholder="e.g. 07114"
              maxLength={10}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Location Type</label>
            <select
              value={form.pickup_location_type}
              onChange={e => set('pickup_location_type', e.target.value)}
              style={selectStyle}
            >
              {PICKUP_LOCATION_TYPES.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Delivery section */}
      <div>
        <div style={{
          fontFamily: fonts.sans, fontSize: '11px', fontWeight: 700,
          color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px',
          marginBottom: '8px',
        }}>
          Delivery
        </div>
        <div style={rowStyle}>
          <div>
            <label style={labelStyle}>ZIP</label>
            <input
              value={form.delivery_zip}
              onChange={e => set('delivery_zip', e.target.value)}
              placeholder="e.g. 77029"
              maxLength={10}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Location Type</label>
            <select
              value={form.delivery_location_type}
              onChange={e => set('delivery_location_type', e.target.value)}
              style={selectStyle}
            >
              {DELIVERY_LOCATION_TYPES.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transport type */}
      <div>
        <label style={labelStyle}>{t('form.transportType')}</label>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['open', 'enclosed'].map(type => (
            <label key={type} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontFamily: fonts.sans,
              fontSize: '13px',
              color: colors.text,
            }}>
              <input
                type="radio"
                name="transport_type"
                value={type}
                checked={form.transport_type === type}
                onChange={() => set('transport_type', type)}
                style={{ accentColor: colors.accent }}
              />
              {t(`form.${type}`)}
            </label>
          ))}
        </div>
      </div>

      {/* Vehicle condition */}
      <div>
        <label style={labelStyle}>Vehicle Condition</label>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { value: false, label: 'Runs and drives' },
            { value: true, label: 'Non-running / Inoperable' },
          ].map(opt => (
            <label key={String(opt.value)} style={{
              display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
              fontFamily: fonts.sans, fontSize: '13px', color: colors.text,
            }}>
              <input
                type="radio"
                name="is_inoperable"
                checked={form.is_inoperable === opt.value}
                onChange={() => set('is_inoperable', opt.value)}
                style={{ accentColor: colors.accent }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Preferred pickup date */}
      <div>
        <label style={labelStyle}>When should we pick up?</label>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <label style={{
            display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
            fontFamily: fonts.sans, fontSize: '13px', color: colors.text,
          }}>
            <input
              type="radio"
              name="pickup_date_type"
              checked={form.pickup_date_type === 'asap'}
              onChange={() => { set('pickup_date_type', 'asap'); set('preferred_pickup_date', ''); }}
              style={{ accentColor: colors.accent }}
            />
            As soon as possible
          </label>
          <label style={{
            display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
            fontFamily: fonts.sans, fontSize: '13px', color: colors.text,
          }}>
            <input
              type="radio"
              name="pickup_date_type"
              checked={form.pickup_date_type === 'date'}
              onChange={() => set('pickup_date_type', 'date')}
              style={{ accentColor: colors.accent }}
            />
            Specific date:
          </label>
          {form.pickup_date_type === 'date' && (
            <input
              type="date"
              value={form.preferred_pickup_date}
              onChange={e => set('preferred_pickup_date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0]}
              style={{ ...inputStyle, width: 'auto' }}
            />
          )}
        </div>
      </div>

      {/* Route Estimator (appears when both ZIPs filled) */}
      <RouteEstimator pickupZip={form.pickup_zip} deliveryZip={form.delivery_zip} />

      {/* ── STEP 2: Contact (animated reveal) ── */}
      <div style={{
        maxHeight: showStep2 ? `${step2Height + 20}px` : '0px',
        opacity: showStep2 ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 300ms ease, opacity 300ms ease',
      }}>
        <div ref={step2Ref} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* "Almost there" label */}
          <div style={{
            fontFamily: fonts.sans,
            fontSize: '13px',
            fontWeight: 600,
            color: colors.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            paddingTop: '8px',
            borderTop: `1px solid ${colors.border}`,
          }}>
            {t('form.almostThere')}
          </div>

          {/* Name */}
          <div>
            <label style={labelStyle}>{t('form.name')}</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} />
          </div>

          {/* Phone + Email */}
          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>{t('form.phone')}</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} type="tel" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{t('form.email')}</label>
              <input value={form.email} onChange={e => set('email', e.target.value)} type="email" style={inputStyle} />
            </div>
          </div>

          {/* Notes (hidden in compact mode) */}
          {!compact && (
            <div>
              <label style={labelStyle}>{t('form.notes')}</label>
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                placeholder={t('form.notesPlaceholder')}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          )}

          {/* SMS Consent */}
          <SmsConsent checked={form.sms_consent} onChange={v => set('sms_consent', v)} />
        </div>
      </div>

      {/* ── STEP 3: Error + Submit ── */}

      {error && (
        <div style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          color: colors.accent,
          padding: '10px 14px',
          background: '#FFF0EC',
          borderRadius: '8px',
        }}>
          {error}
        </div>
      )}

      <p style={{
        fontFamily: fonts.sans, fontSize: '11px', color: colors.textMuted,
        lineHeight: 1.5, textAlign: 'center', margin: '0 0 12px',
      }}>
        By submitting this form, you agree to our{' '}
        <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: colors.accent, textDecoration: 'underline' }}>Terms &amp; Conditions</a>
        {' '}and{' '}
        <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: colors.accent, textDecoration: 'underline' }}>Privacy Policy</a>.
      </p>

      <button
        type="submit"
        disabled={submitting || !canSubmit}
        style={{
          ...btnStyles.accent,
          padding: '14px 32px',
          fontSize: '14px',
          width: '100%',
          opacity: (submitting || !canSubmit) ? 0.45 : 1,
          cursor: (submitting || !canSubmit) ? 'not-allowed' : 'pointer',
          transition: 'opacity 200ms ease',
        }}
      >
        {submitting ? t('form.submitting') : t('form.submit')}
      </button>
    </form>
  );
}
