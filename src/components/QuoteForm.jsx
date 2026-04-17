import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useVinDecode } from '../hooks/useVinDecode';
import { apiPost } from '../hooks/useApi';
import SmsConsent from './SmsConsent';
import RouteEstimator from './RouteEstimator';
import VehicleSilhouette from './VehicleSilhouette';
import PostQuoteFlow from './PostQuoteFlow';
import PhoneInput, { getCleanPhone, isValidPhone } from './PhoneInput';
import { trackEvent } from '../utils/analytics';
import styles from './QuoteForm.module.css';
import btn from '../styles/buttons.module.css';

export default function QuoteForm({ compact = false }) {
  const { t, i18n } = useTranslation('quote');

  const PICKUP_LOCATION_TYPES = [
    { value: 'residential', label: t('form.locations.residential') },
    { value: 'business',    label: t('form.locations.business') },
    { value: 'auction',     label: t('form.locations.auction') },
    { value: 'dealer',      label: t('form.locations.dealer') },
    { value: 'port',        label: t('form.locations.port') },
    { value: 'other',       label: t('form.locations.other') },
  ];

  const DELIVERY_LOCATION_TYPES = [
    { value: 'residential', label: t('form.locations.residential') },
    { value: 'business',    label: t('form.locations.business') },
    { value: 'dealer',      label: t('form.locations.dealer') },
    { value: 'port',        label: t('form.locations.port') },
    { value: 'storage',     label: t('form.locations.storage') },
    { value: 'other',       label: t('form.locations.other') },
  ];

  const { decode, loading: vinLoading, error: vinError, result: vinResult } = useVinDecode();
  const step2Ref = useRef(null);
  const [step2Height, setStep2Height] = useState(0);

  // Pre-fill from URL params (e.g. resubmit after decline: ?vin=...&pickup_zip=...)
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const [form, setForm] = useState({
    vin: urlParams?.get('vin') || '',
    vehicle_year: '', vehicle_make: '', vehicle_model: '',
    pickup_zip: urlParams?.get('pickup_zip') || '',
    pickup_location_type: 'residential',
    delivery_zip: '', delivery_location_type: 'residential',
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

  // Sprint P: pick up promo code from ?promo= URL param and stash in
  // localStorage so it survives the full quote → confirmation → portal
  // checkout flow. URL is cleaned so bookmarking doesn't re-trigger.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const promo = params.get('promo');
      if (promo) {
        localStorage.setItem('y7_promo_code', promo.toUpperCase());
        params.delete('promo');
        const qs = params.toString();
        const newUrl = (qs ? `?${qs}` : '') + window.location.hash;
        window.history.replaceState({}, '', window.location.pathname + newUrl);
      }
    } catch { /* ignore */ }
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
    if (form.phone && !isValidPhone(form.phone)) {
      setError('Please enter a valid 10-digit phone number, or leave it blank.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        vin: noVinMode ? 'TBD' : form.vin.trim().toUpperCase(),
        phone: form.phone ? getCleanPhone(form.phone) : '',
        is_inoperable: form.is_inoperable,
        preferred_pickup_date: form.pickup_date_type === 'date' ? form.preferred_pickup_date : null,
        sms_consent_timestamp: form.sms_consent ? new Date().toISOString() : null,
        sms_consent_page_url: window.location.href,
        source: 'website',
        lang: i18n.language || 'en',
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
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.kicker}>&#9670; {t('header.kicker')}</span>
        <h2 className={styles.title}>{t('header.title')}</h2>
      </div>

      <form onSubmit={handleSubmit} className={compact ? styles.formCompact : styles.form}>

      {/* ── STEP 1: Vehicle + Route ── */}

      {/* VIN or manual vehicle entry */}
      {!noVinMode ? (
        <div className={styles.field}>
          <label className={styles.label}>{t('form.vin')}</label>
          <div className={styles.vinRow}>
            <input
              value={form.vin}
              onChange={e => set('vin', e.target.value.toUpperCase())}
              onBlur={() => markTouched('vin')}
              placeholder={t('form.vinPlaceholder')}
              maxLength={17}
              className={fieldErrors.vin ? styles.vinInputError : styles.vinInput}
            />
            <button
              type="button"
              onClick={handleDecode}
              disabled={vinLoading || form.vin.length !== 17}
              className={`${btn.btnSecondary} ${styles.decodeBtn}`}
            >
              {vinLoading ? '...' : t('form.decode')}
            </button>
          </div>
          {vinError && <div className={styles.errorText}>{vinError}</div>}
          {fieldErrors.vin && <div className={styles.errorText}>{fieldErrors.vin}</div>}
          {!form.vin && (
            <div className={styles.hint}>
              {t('form.noVinHint')}
            </div>
          )}
          {vinResult && (
            <>
              <div className={styles.hintSuccess}>
                {vinResult.year} {vinResult.make} {vinResult.model}
              </div>
              <VehicleSilhouette make={vinResult.make} model={vinResult.model} year={vinResult.year} bodyClass={vinResult.bodyClass} />
            </>
          )}
          <button
            type="button"
            onClick={() => setNoVinMode(true)}
            className={styles.toggleLink}
            style={{ border: 'none', background: 'none' }}
          >
            {t('form.iDontHaveVin')}
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setNoVinMode(false)}
            className={styles.toggleLink}
            style={{ border: 'none', background: 'none', marginBottom: '12px' }}
          >
            {t('form.iHaveVin')}
          </button>
          <div className={styles.row3}>
            <div className={styles.field}>
              <label className={styles.label}>{t('form.year')}</label>
              <select value={form.vehicle_year} onChange={e => set('vehicle_year', e.target.value)} className={styles.selectLg}>
                <option value="">{t('form.vehicleYear')}</option>
                {Array.from({ length: 28 }, (_, i) => 2027 - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{t('form.make')}</label>
              <input value={form.vehicle_make} onChange={e => set('vehicle_make', e.target.value)} placeholder={t('placeholders.make')} className={styles.inputLg} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{t('form.model')}</label>
              <input value={form.vehicle_model} onChange={e => set('vehicle_model', e.target.value)} placeholder={t('placeholders.model')} className={styles.inputLg} />
            </div>
          </div>
        </div>
      )}

      {/* Vehicle details (show if decoded) */}
      {!noVinMode && vinResult && (
        <div className={styles.row3Even}>
          <div className={styles.field}>
            <label className={styles.label}>{t('form.vehicleYear')}</label>
            <input
              value={form.vehicle_year}
              onChange={e => set('vehicle_year', e.target.value.replace(/\D/g, '').slice(0, 4))}
              inputMode="numeric"
              maxLength={4}
              pattern="\d{4}"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>{t('form.vehicleMake')}</label>
            <input value={form.vehicle_make} onChange={e => set('vehicle_make', e.target.value)} className={styles.input} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>{t('form.vehicleModel')}</label>
            <input value={form.vehicle_model} onChange={e => set('vehicle_model', e.target.value)} className={styles.input} />
          </div>
        </div>
      )}

      {/* Pickup section */}
      <div>
        <div className={styles.sectionLabel}>{t('form.pickup')}</div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>{t('form.zip')}</label>
            <input
              value={form.pickup_zip}
              onChange={e => set('pickup_zip', e.target.value)}
              onBlur={() => markTouched('pickup_zip')}
              placeholder={t('placeholders.pickupZip')}
              maxLength={10}
              className={fieldErrors.pickup_zip ? styles.inputError : styles.input}
            />
            {fieldErrors.pickup_zip && <div className={styles.errorText}>{fieldErrors.pickup_zip}</div>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>{t('form.locationType')}</label>
            <select
              value={form.pickup_location_type}
              onChange={e => set('pickup_location_type', e.target.value)}
              className={styles.select}
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
        <div className={styles.sectionLabel}>{t('form.delivery')}</div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>{t('form.zip')}</label>
            <input
              value={form.delivery_zip}
              onChange={e => set('delivery_zip', e.target.value)}
              onBlur={() => markTouched('delivery_zip')}
              placeholder={t('placeholders.deliveryZip')}
              maxLength={10}
              className={fieldErrors.delivery_zip ? styles.inputError : styles.input}
            />
            {fieldErrors.delivery_zip && <div className={styles.errorText}>{fieldErrors.delivery_zip}</div>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>{t('form.locationType')}</label>
            <select
              value={form.delivery_location_type}
              onChange={e => set('delivery_location_type', e.target.value)}
              className={styles.select}
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
        <label className={styles.label}>{t('form.transportType')}</label>
        <div className={styles.radioGroup}>
          {['open', 'enclosed'].map(type => (
            <label key={type} className={styles.radioLabel}>
              <input
                type="radio"
                name="transport_type"
                value={type}
                checked={form.transport_type === type}
                onChange={() => set('transport_type', type)}
                className={styles.radioInput}
              />
              {t(`form.${type}`)}
            </label>
          ))}
        </div>
      </div>

      {/* Vehicle condition */}
      <div>
        <label className={styles.label}>{t('form.vehicleCondition')}</label>
        <div className={styles.radioGroup}>
          {[
            { value: false, label: t('form.runsAndDrives') },
            { value: true, label: t('form.nonRunning') },
          ].map(opt => (
            <label key={String(opt.value)} className={styles.radioLabel}>
              <input
                type="radio"
                name="is_inoperable"
                checked={form.is_inoperable === opt.value}
                onChange={() => set('is_inoperable', opt.value)}
                className={styles.radioInput}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Preferred pickup date */}
      <div>
        <label className={styles.label}>{t('form.whenPickup')}</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="pickup_date_type"
              checked={form.pickup_date_type === 'asap'}
              onChange={() => { set('pickup_date_type', 'asap'); set('preferred_pickup_date', ''); }}
              className={styles.radioInput}
            />
            {t('form.asap')}
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="pickup_date_type"
              checked={form.pickup_date_type === 'date'}
              onChange={() => set('pickup_date_type', 'date')}
              className={styles.radioInput}
            />
            {t('form.specificDate')}
          </label>
          {form.pickup_date_type === 'date' && (
            <input
              type="date"
              value={form.preferred_pickup_date}
              onChange={e => set('preferred_pickup_date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0]}
              className={styles.input}
              style={{ width: 'auto' }}
            />
          )}
        </div>
      </div>

      {/* Route Estimator (appears when both ZIPs filled) */}
      <RouteEstimator pickupZip={form.pickup_zip} deliveryZip={form.delivery_zip} />

      {/* ── STEP 2: Contact (animated reveal) ── */}
      <div
        className={styles.step2}
        style={{
          maxHeight: showStep2 ? `${step2Height + 20}px` : '0px',
          opacity: showStep2 ? 1 : 0,
        }}
      >
        <div ref={step2Ref} className={styles.step2Content}>
          <div className={styles.step2Kicker}>{t('form.almostThere')}</div>

          {/* Name */}
          <div className={styles.field}>
            <label className={styles.label}>{t('form.name')}</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} className={styles.input} />
          </div>

          {/* Phone + Email */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>{t('form.phone')}</label>
              <PhoneInput value={form.phone} onChange={v => set('phone', v)} className={styles.input} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{t('form.email')}</label>
              <input
                value={form.email}
                onChange={e => set('email', e.target.value)}
                onBlur={() => markTouched('email')}
                type="email"
                className={fieldErrors.email ? styles.inputError : styles.input}
              />
              {fieldErrors.email && <div className={styles.errorText}>{fieldErrors.email}</div>}
            </div>
          </div>

          {/* Notes (hidden in compact mode) */}
          {!compact && (
            <div className={styles.field}>
              <label className={styles.label}>{t('form.notes')}</label>
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                placeholder={t('form.notesPlaceholder')}
                rows={3}
                className={styles.textarea}
              />
            </div>
          )}

          {/* SMS Consent */}
          <SmsConsent checked={form.sms_consent} onChange={v => set('sms_consent', v)} />
        </div>
      </div>

      {/* ── STEP 3: Error + Submit ── */}

      {error && <div className={styles.errorAlert}>{error}</div>}

      <p className={styles.legal}>
        {t('legal.prefix')}{' '}
        <a href="/terms" target="_blank" rel="noopener noreferrer" className={styles.legalLink}>{t('legal.terms')}</a>
        {' '}{t('legal.and')}{' '}
        <a href="/privacy" target="_blank" rel="noopener noreferrer" className={styles.legalLink}>{t('legal.privacy')}</a>.
      </p>

      <button
        type="submit"
        disabled={submitting || !canSubmit}
        className={`${btn.btnAccent} ${styles.submitBtn}`}
      >
        {submitting ? t('form.submitting') : t('form.submit')}
      </button>

      {/* Trust badges */}
      <div className={styles.trustRow}>
        <span className={styles.trustItem}>
          <span className={styles.trustDot}>&#9670;</span> {t('trust.secure')}
        </span>
        <span className={styles.trustItem}>
          <span className={styles.trustDot}>&#9670;</span> {t('trust.noSpam')}
        </span>
        <span className={styles.trustItem}>
          <span className={styles.trustDot}>&#9670;</span> {t('trust.fast')}
        </span>
      </div>
    </form>
    </div>
  );
}
