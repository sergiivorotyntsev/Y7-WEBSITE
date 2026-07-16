import { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useVinDecode } from '../hooks/useVinDecode';
import { apiPost } from '../hooks/useApi';
import { useZipLookup } from '../hooks/useZipLookup';
import SmsConsent from './SmsConsent';
import RouteEstimator from './RouteEstimator';
import VehicleSilhouette from './VehicleSilhouette';
import PostQuoteFlow from './PostQuoteFlow';
import QuoteOtpStep from './QuoteOtpStep';
import PhoneInput, { getCleanPhone, isValidPhone } from './PhoneInput';
import ZipCityPreview from './ZipCityPreview';
import EmailTypoBanner from './EmailTypoBanner';
import { trackEvent } from '../utils/trackEvent';
import { useEmailCheck } from '../hooks/useEmailCheck';
import styles from './QuoteForm.module.css';
import btn from '../styles/buttons.module.css';

// WV-T04: US ZIP format (5 or 5-4), mirrors services/input_validators.validate_us_zip.
// 00000/99999 are undeliverable sentinels.
export function isValidUsZip(v) {
  const z = (v || '').trim();
  if (!/^\d{5}(-\d{4})?$/.test(z)) return false;
  return !['00000', '99999'].includes(z.slice(0, 5));
}

export default function QuoteForm({ compact = false, hideHeader = false, onStepChange }) {
  const { t, i18n } = useTranslation('quote');

  // QUOTE-P1 T04: CD-native CamelCase values (same set for pickup + delivery)
  const LOCATION_TYPES = [
    { value: 'Residence',          label: t('location.residence') },
    { value: 'CommercialBusiness', label: t('location.commercialBusiness') },
    { value: 'Auction',            label: t('location.auction') },
    { value: 'Dealership',         label: t('location.dealership') },
    { value: 'Port',               label: t('location.port') },
    { value: 'Warehouse',          label: t('location.warehouse') },
    { value: 'Terminal',           label: t('location.terminal') },
    { value: 'Other',              label: t('location.other') },
  ];

  const { decode, loading: vinLoading, error: vinError, result: vinResult } = useVinDecode();
  const step2Ref = useRef(null);
  const errorRef = useRef(null);
  const [step2Height, setStep2Height] = useState(0);

  // DESIGN-V2-W4-T03 (Reveal Gate law, DESIGN.md §6): during the prerender pass
  // the Step-2 wrapper must NOT be a framer-motion element — Motion.div bakes
  // style="opacity:0;max-height:0" into the snapshot (both ZIPs are empty at
  // prerender), hiding the contact fields from the static HTML. When
  // __Y7_PRERENDER is set we render a plain <div> (at-rest, fully visible);
  // in the browser the Motion.div below behaves exactly as before (hydration
  // starts collapsed, expands on ZIP entry).
  const isPrerender = typeof window !== 'undefined' && window.__Y7_PRERENDER;
  const Step2Shell = isPrerender ? 'div' : Motion.div;

  // Pre-fill from URL params (e.g. resubmit after decline: ?vin=...&pickup_zip=...)
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

  // QUOTE-P2 T09: capture marketing attribution on every form mount.
  // Per locked decision: URL-only, no sessionStorage / cookie persistence.
  const utm = useMemo(() => {
    const p = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    return {
      utm_source:   p?.get('utm_source')   || '',
      utm_medium:   p?.get('utm_medium')   || '',
      utm_campaign: p?.get('utm_campaign') || '',
      utm_term:     p?.get('utm_term')     || '',
      utm_content:  p?.get('utm_content')  || '',
      gclid:        p?.get('gclid')        || '',
      fbclid:       p?.get('fbclid')       || '',
    };
  }, []);
  const [form, setForm] = useState({
    vin: urlParams?.get('vin') || '',
    vehicle_year: '', vehicle_make: '', vehicle_model: '',
    vehicle_type: '', // WGF-T07: detected from VIN, editable, rides the payload spread

    pickup_zip: urlParams?.get('pickup_zip') || '',
    pickup_location_type: 'Residence',
    pickup_requires_twic: false,
    delivery_zip: urlParams?.get('delivery_zip') || '',
    delivery_location_type: 'Residence',
    delivery_requires_twic: false,
    transport_type: 'open',
    is_inoperable: false,
    pickup_date_type: 'asap',
    preferred_pickup_date: '',
    name: '',
    phone: urlParams?.get('phone') || '',
    email: urlParams?.get('email') || '',
    sms_consent: false, termsAccepted: false, notes: '',
  });
  const emailCheck = useEmailCheck(form.email);
  const pickupZipLookup = useZipLookup(form.pickup_zip);
  const deliveryZipLookup = useZipLookup(form.delivery_zip);
  const [noVinMode, setNoVinMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Q2-T09: 3-state machine for OTP flow. 'form' is the initial step; on
  // /quote/start success we transition to 'otp', and on /quote/verify success
  // we transition to 'success' (rendering PostQuoteFlow). Replaces the
  // pre-Q2 single `success` state which was rendered as PostQuoteFlow directly.
  // Q2-T11: onStepChange callback surfaces transitions to the parent route
  // (Quote.jsx) so it can hide its h1/ProcessTimeline chrome when the form
  // reaches 'success'.
  const [currentStep, setCurrentStep] = useState('form');
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);
  const [otpState, setOtpState] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [error, setError] = useState(null);
  const [termsError, setTermsError] = useState(false);
  const [touched, setTouched] = useState({});
  const [serverFieldErrors, setServerFieldErrors] = useState({});
  // P1-TECH-T04: progressive disclosure. Minimum fields visible by default;
  // vehicle-condition, pickup-date preference, and free-form notes live behind
  // an "Add details" toggle to lower B2C mobile friction (21 → ~12 fields
  // visible initially). Field defaults (is_inoperable=false, pickup_date_type
  // ='asap') mean leaving them collapsed still produces a valid quote.
  const [showAdvanced, setShowAdvanced] = useState(false);
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
    email: serverFieldErrors.email
      ? serverFieldErrors.email
      : (touched.email && form.email && !form.email.includes('@') ? 'Enter a valid email' : null),
    // WV-T04: format check, not just length — "abcde"/"00000" must be caught
    // client-side too (server is the backstop). US 5 or 5-4.
    pickup_zip: touched.pickup_zip && form.pickup_zip && form.pickup_zip.trim().length > 0 && !isValidUsZip(form.pickup_zip)
      ? 'Enter a valid US ZIP code' : null,
    delivery_zip: touched.delivery_zip && form.delivery_zip && form.delivery_zip.trim().length > 0 && !isValidUsZip(form.delivery_zip)
      ? 'Enter a valid US ZIP code' : null,
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

  // Step 3: button active when vehicle ID + contact + route all valid.
  const _vinTrim = (form.vin || '').trim().toUpperCase();
  const _hasValidVin = _vinTrim.length === 17 && /^[A-HJ-NPR-Z0-9]{17}$/.test(_vinTrim);
  const _yearTrim = String(form.vehicle_year || '').trim();
  const _hasYMM = /^\d{4}$/.test(_yearTrim) && (form.vehicle_make || '').trim() && (form.vehicle_model || '').trim();
  const _hasVehicleId = noVinMode ? !!_hasYMM : !!(_hasValidVin || _hasYMM);
  const canSubmit = !!(
    _hasVehicleId &&
    form.name.trim() &&
    form.email.trim() && form.email.includes('@') &&
    form.phone.trim() && isValidPhone(form.phone)
  );

  // Measure step2 inner height for smooth animation on every render because
  // the collapsed height depends on which fields are currently mounted.
  // Intentionally no dep array — we want to re-measure after any state update.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (step2Ref.current) {
      setStep2Height(step2Ref.current.scrollHeight);
    }
  });

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  // WGF-T07: mirror of services/vin_decoder.nhtsa_body_to_cd_key — maps the
  // NHTSA body class to the CD body-type key; null = human picks (never a
  // silent sedan).
  function bodyClassToType(bodyClass, vehicleType) {
    const bc = `${bodyClass || ''} ${vehicleType || ''}`.toLowerCase();
    if (!bc.trim()) return '';
    if (bc.includes('pickup') || bc.includes('truck')) return 'truck';
    if (bc.includes('sport utility') || bc.includes('suv') || bc.includes('mpv') || bc.includes('multi-purpose')) return 'suv';
    if (bc.includes('van')) return 'van';
    if (bc.includes('motorcycle') || bc.includes('moped')) return 'motorcycle';
    if (['sedan', 'saloon', 'coupe', 'hatchback', 'convertible', 'wagon', 'roadster', 'passenger car'].some(k => bc.includes(k))) return 'sedan';
    return '';
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
        // WGF-T07: auto-detect the vehicle type; user can change it below.
        vehicle_type: bodyClassToType(result.bodyClass, result.vehicleType) || prev.vehicle_type,
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.termsAccepted) {
      setTermsError(true);
      document.querySelector('input[type="checkbox"][aria-required="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setTermsError(false);

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
      setTimeout(() => errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
      return;
    }

    if (!form.name.trim()) { setError(t('errors.nameRequired')); return; }
    if (!form.email.trim() || !form.email.includes('@')) { setError(t('errors.emailRequired')); return; }
    if (form.pickup_zip.trim().length < 5) { setError(t('errors.pickupRequired')); return; }
    if (form.delivery_zip.trim().length < 5) { setError(t('errors.deliveryRequired')); return; }
    // WV-T04: block a malformed ZIP at submit, not just show an inline hint.
    if (!isValidUsZip(form.pickup_zip)) { setError('Please enter a valid US pickup ZIP code (5 digits).'); return; }
    if (!isValidUsZip(form.delivery_zip)) { setError('Please enter a valid US delivery ZIP code (5 digits).'); return; }
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
        // sms_consent_timestamp removed (QUOTE-P0 T12) — server is authoritative
        sms_consent_page_url: window.location.href,
        sms_consent_page: window.location.href,
        source: 'website',
        lang: i18n.language || 'en',
        ...utm,  // QUOTE-P2 T09: utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid
      };
      const res = await apiPost('/api/public/quote/start', payload);
      // Q2-T09: /quote/start creates a quote_pending row + emails an OTP.
      // We do NOT create customer_orders here — that happens in /quote/verify
      // after the user enters the correct OTP (ADR-009-v2 mandatory email verify).
      setOtpState({
        pending_id: res.pending_id,
        email: res.email,
        expires_at: res.expires_at,
        attempts_remaining: res.attempts_remaining ?? 5,
      });
      setCurrentStep('otp');
      trackEvent('quote_submit', { has_vin: !noVinMode, transport_type: form.transport_type });
    } catch (err) {
      const fe = err.body?.field_errors;
      if (fe?.email) {
        setServerFieldErrors({ email: fe.email });
        setError(null);
      } else {
        setError(err.message || 'Something went wrong');
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Q2-T09: state-machine routing. 'otp' renders QuoteOtpStep (T10 fills it in
  // with the premium 6-digit UI); 'success' renders PostQuoteFlow (T11 rewrites
  // it with new vs returning customer branching).
  if (currentStep === 'success' && submitResult) {
    return <PostQuoteFlow quoteResult={submitResult} formData={form} />;
  }
  // Q2-T11: when the OTP step is active, the parent route hides its h1/
  // ProcessTimeline chrome via onStepChange so the OTP card stands alone.

  if (currentStep === 'otp' && otpState) {
    return (
      <QuoteOtpStep
        pendingId={otpState.pending_id}
        email={otpState.email}
        expiresAt={otpState.expires_at}
        attemptsRemaining={otpState.attempts_remaining}
        onSuccess={(result) => {
          setSubmitResult(result);
          setCurrentStep('success');
        }}
        onCancel={() => {
          // "Edit email" — back to form, preserve form data so user can
          // correct the typo and re-submit.
          setCurrentStep('form');
          setOtpState(null);
        }}
      />
    );
  }

  return (
    <div className={styles.wrap}>
      {!hideHeader && (
        <div className={styles.header}>
          <span className={styles.kicker}>&#9670; {t('header.kicker')}</span>
          <h2 className={styles.title}>{t('header.title')}</h2>
        </div>
      )}

      <form onSubmit={handleSubmit} className={compact ? styles.formCompact : styles.form}>

      {/* ── STEP 1: Vehicle + Route ── */}

      {/* VIN or manual vehicle entry */}
      {!noVinMode ? (
        <div className={styles.field}>
          <label htmlFor="quote-vin" className={styles.label}>{t('form.vin')}</label>
          <p style={{ fontSize: '12px', color: 'var(--text-muted, #706E68)', margin: '4px 0 8px 0' }}>
            {t('form.vinHint')}
          </p>
          <div className={styles.vinRow}>
            <input
              id="quote-vin"
              value={form.vin}
              onChange={e => set('vin', e.target.value.toUpperCase())}
              onBlur={() => {
                markTouched('vin');
                // WGF-T07: auto-decode on blur — most clients never clicked
                // the Decode button, so the type was never detected.
                if (/^[A-HJ-NPR-Z0-9]{17}$/.test((form.vin || '').trim().toUpperCase()) && !vinLoading) {
                  handleDecode();
                }
              }}
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
              {/* WGF-T07: detected vehicle type — visible and editable, never silent. */}
              <div className={styles.field} style={{ marginTop: '8px' }}>
                <label htmlFor="quote-vtype" className={styles.label}>
                  Vehicle type {form.vehicle_type ? '(detected from VIN — please confirm)' : '(helps carriers quote right)'}
                </label>
                <select id="quote-vtype" value={form.vehicle_type} onChange={e => set('vehicle_type', e.target.value)} className={styles.selectLg}>
                  <option value="">Select...</option>
                  <option value="sedan">Sedan / Coupe / Hatchback</option>
                  <option value="suv">SUV / Crossover</option>
                  <option value="truck">Pickup / Truck</option>
                  <option value="van">Van / Minivan</option>
                  <option value="motorcycle">Motorcycle</option>
                </select>
              </div>
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
              <label htmlFor="quote-year" className={styles.label}>{t('form.year')}</label>
              <select id="quote-year" value={form.vehicle_year} onChange={e => set('vehicle_year', e.target.value)} className={styles.selectLg}>
                <option value="">{t('form.vehicleYear')}</option>
                {Array.from({ length: 28 }, (_, i) => 2027 - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="quote-make" className={styles.label}>{t('form.make')}</label>
              <input id="quote-make" value={form.vehicle_make} onChange={e => set('vehicle_make', e.target.value)} placeholder={t('placeholders.make')} className={styles.inputLg} />
            </div>
            <div className={styles.field}>
              <label htmlFor="quote-model" className={styles.label}>{t('form.model')}</label>
              <input id="quote-model" value={form.vehicle_model} onChange={e => set('vehicle_model', e.target.value)} placeholder={t('placeholders.model')} className={styles.inputLg} />
            </div>
          </div>
        </div>
      )}

      {/* Vehicle details (show if decoded) */}
      {!noVinMode && vinResult && (
        <div className={styles.row3Even}>
          <div className={styles.field}>
            <label htmlFor="quote-vehicle-year" className={styles.label}>{t('form.vehicleYear')}</label>
            <input
              id="quote-vehicle-year"
              value={form.vehicle_year}
              onChange={e => set('vehicle_year', e.target.value.replace(/\D/g, '').slice(0, 4))}
              inputMode="numeric"
              maxLength={4}
              pattern="\d{4}"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-vehicle-make" className={styles.label}>{t('form.vehicleMake')}</label>
            <input id="quote-vehicle-make" value={form.vehicle_make} onChange={e => set('vehicle_make', e.target.value)} className={styles.input} />
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-vehicle-model" className={styles.label}>{t('form.vehicleModel')}</label>
            <input id="quote-vehicle-model" value={form.vehicle_model} onChange={e => set('vehicle_model', e.target.value)} className={styles.input} />
          </div>
        </div>
      )}

      {/* Pickup section */}
      <div>
        <div className={styles.sectionLabel}>{t('form.pickup')}</div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="quote-pickup-zip" className={styles.label}>{t('form.zip')}</label>
            <input
              id="quote-pickup-zip"
              value={form.pickup_zip}
              onChange={e => set('pickup_zip', e.target.value)}
              onBlur={() => markTouched('pickup_zip')}
              placeholder={t('placeholders.pickupZip')}
              maxLength={10}
              className={fieldErrors.pickup_zip ? styles.inputError : styles.input}
            />
            {fieldErrors.pickup_zip && <div className={styles.errorText}>{fieldErrors.pickup_zip}</div>}
            <ZipCityPreview
              status={pickupZipLookup.status}
              city={pickupZipLookup.city}
              stateAbbr={pickupZipLookup.stateAbbr}
              label="Pickup location"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-pickup-location" className={styles.label}>{t('form.locationType')}</label>
            <select
              id="quote-pickup-location"
              value={form.pickup_location_type}
              onChange={e => set('pickup_location_type', e.target.value)}
              className={styles.select}
            >
              {LOCATION_TYPES.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {form.pickup_location_type === 'Port' && (
              <label className={styles.twicRow}>
                <input
                  type="checkbox"
                  checked={form.pickup_requires_twic}
                  onChange={e => set('pickup_requires_twic', e.target.checked)}
                />
                <span className={styles.twicLabel}>{t('location.twicRequired')}</span>
                <small className={styles.twicHelp}>{t('location.twicHelp')}</small>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Delivery section */}
      <div>
        <div className={styles.sectionLabel}>{t('form.delivery')}</div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="quote-delivery-zip" className={styles.label}>{t('form.zip')}</label>
            <input
              id="quote-delivery-zip"
              value={form.delivery_zip}
              onChange={e => set('delivery_zip', e.target.value)}
              onBlur={() => markTouched('delivery_zip')}
              placeholder={t('placeholders.deliveryZip')}
              maxLength={10}
              className={fieldErrors.delivery_zip ? styles.inputError : styles.input}
            />
            {fieldErrors.delivery_zip && <div className={styles.errorText}>{fieldErrors.delivery_zip}</div>}
            <ZipCityPreview
              status={deliveryZipLookup.status}
              city={deliveryZipLookup.city}
              stateAbbr={deliveryZipLookup.stateAbbr}
              label="Delivery location"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="quote-delivery-location" className={styles.label}>{t('form.locationType')}</label>
            <select
              id="quote-delivery-location"
              value={form.delivery_location_type}
              onChange={e => set('delivery_location_type', e.target.value)}
              className={styles.select}
            >
              {LOCATION_TYPES.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {form.delivery_location_type === 'Port' && (
              <label className={styles.twicRow}>
                <input
                  type="checkbox"
                  checked={form.delivery_requires_twic}
                  onChange={e => set('delivery_requires_twic', e.target.checked)}
                />
                <span className={styles.twicLabel}>{t('location.twicRequired')}</span>
                <small className={styles.twicHelp}>{t('location.twicHelp')}</small>
              </label>
            )}
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

      {/* P1-TECH-T04: Advanced-options toggle. Vehicle condition + pickup
          date preference live inside this block so the default view shows
          only the high-signal fields that shape the quote price. */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className={styles.advancedToggle}
        aria-expanded={showAdvanced}
      >
        <span className={styles.advancedToggleIcon} aria-hidden="true">
          {showAdvanced ? '\u2212' : '+'}
        </span>
        {showAdvanced ? t('form.hideAdvanced') : t('form.showAdvanced')}
      </button>

      {showAdvanced && (
        <>
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
        </>
      )}

      {/* Route Estimator (appears when both ZIPs filled) */}
      <RouteEstimator pickupZip={form.pickup_zip} deliveryZip={form.delivery_zip} />

      {/* ── STEP 2: Contact (animated reveal — framer-motion Q1-T09; plain div
          during prerender per the Reveal Gate law, DESIGN-V2-W4-T03) ── */}
      <Step2Shell
        className={styles.step2}
        {...(isPrerender
          ? {}
          : {
              initial: false,
              animate: {
                maxHeight: showStep2 ? step2Height + 20 : 0,
                opacity: showStep2 ? 1 : 0,
              },
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              style: { overflow: 'hidden' },
              'aria-hidden': !showStep2,
            })}
      >
        <div ref={step2Ref} className={styles.step2Content}>
          <div className={styles.step2Kicker}>{t('form.almostThere')}</div>

          {/* Name */}
          <div className={styles.field}>
            <label htmlFor="quote-name" className={styles.label}>{t('form.name')} <span className={styles.required}>*</span></label>
            <input id="quote-name" value={form.name} onChange={e => set('name', e.target.value)} className={styles.input} />
          </div>

          {/* Phone + Email */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="quote-phone" className={styles.label}>
                {t('form.phone')} <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <PhoneInput id="quote-phone" value={form.phone} onChange={v => set('phone', v)} className={styles.input} />
              {form.phone && !isValidPhone(form.phone) && (
                <div className={styles.errorText}>Please enter a valid 10-digit phone number</div>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="quote-email" className={styles.label}>{t('form.email')} <span style={{ color: '#DC2626' }}>*</span></label>
              <input
                id="quote-email"
                value={form.email}
                onChange={e => {
                  set('email', e.target.value);
                  if (serverFieldErrors.email) setServerFieldErrors({});
                }}
                onBlur={() => { markTouched('email'); emailCheck.onBlur(); }}
                type="email"
                autoComplete="email"
                className={fieldErrors.email ? styles.inputError : styles.input}
              />
              {fieldErrors.email && (
                <div className={styles.errorText}>
                  {typeof fieldErrors.email === 'string'
                    ? fieldErrors.email
                    : fieldErrors.email.message}
                  {fieldErrors.email?.suggestion && (
                    <>
                      {' '}
                      <button
                        type="button"
                        onClick={() => {
                          const local = form.email.split('@')[0];
                          set('email', `${local}@${fieldErrors.email.suggestion}`);
                          setServerFieldErrors({});
                        }}
                        style={{
                          background: 'none', border: 'none',
                          color: 'inherit', textDecoration: 'underline',
                          cursor: 'pointer', padding: 0, font: 'inherit',
                        }}
                      >
                        Use this
                      </button>
                    </>
                  )}
                </div>
              )}
              {emailCheck.isChecking && (
                <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: 4 }}>Checking…</div>
              )}
              <AnimatePresence>
                {emailCheck.status === 'duplicate' && (
                  <Motion.div
                    key="email-recognized"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    role="status"
                    style={{
                      marginTop: 6,
                      fontFamily: 'inherit',
                      fontSize: 13,
                      color: '#1E6F46',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span style={{ fontSize: 14 }} aria-hidden="true">✓</span>
                    <span>
                      {t('emailRecognized.prompt')}{' '}
                      <a
                        href={`/portal/login?email=${encodeURIComponent(form.email)}`}
                        style={{ color: '#A0411F', fontWeight: 600, textDecoration: 'underline' }}
                      >
                        {t('emailRecognized.loginCta')}
                      </a>{' '}
                      {t('emailRecognized.toTrack')}
                    </span>
                  </Motion.div>
                )}
              </AnimatePresence>
              <EmailTypoBanner
                visible={emailCheck.status === 'typo_suggestion'}
                suggestion={emailCheck.suggestion}
                onAccept={() => set('email', emailCheck.suggestion)}
              />
            </div>
          </div>

          {/* Notes (hidden in compact mode OR until the user opens
              "Add details" — P1-TECH-T04) */}
          {!compact && showAdvanced && (
            <div className={styles.field}>
              <label htmlFor="quote-notes" className={styles.label}>{t('form.notes')}</label>
              <textarea
                id="quote-notes"
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                placeholder={t('form.notesPlaceholder')}
                rows={3}
                className={styles.textarea}
              />
            </div>
          )}

          {/* Unified consent block (QUOTE-P0 T13 + SMS-CONSENT-UX T02):
              label always visible inside <SmsConsent>, error only after
              failed submit attempt. Footnote stays as the legal line. */}
          <div className={styles.consentBlock}>
            <SmsConsent
              checked={form.sms_consent}
              onChange={v => set('sms_consent', v)}
              showError={false}
              optional
            />
            <div style={{ marginTop: 16, marginBottom: 12 }}>
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                cursor: 'pointer',
                fontSize: 13,
                color: '#2C2C2A',
              }}>
                <input
                  type="checkbox"
                  checked={form.termsAccepted}
                  onChange={(e) => {
                    set('termsAccepted', e.target.checked);
                    if (e.target.checked) setTermsError(false);
                  }}
                  style={{
                    marginTop: 3,
                    width: 16,
                    height: 16,
                    accentColor: '#993C1D',
                    flexShrink: 0,
                  }}
                  aria-required="true"
                  aria-describedby={termsError ? "terms-error" : undefined}
                />
                <span>
                  <Trans i18nKey="consent.terms" t={t}>
                    I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#993C1D', textDecoration: 'underline' }}>Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#993C1D', textDecoration: 'underline' }}>Privacy Policy</a>
                  </Trans>
                  <span style={{ color: '#DC2626', marginLeft: 4 }} aria-hidden="true">*</span>
                </span>
              </label>

              {termsError && (
                <Motion.div
                  id="terms-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  role="alert"
                  style={{
                    marginTop: 6,
                    marginLeft: 24,
                    fontSize: 12,
                    color: '#DC2626',
                  }}
                >
                  {t('consent.termsRequired')}
                </Motion.div>
              )}
            </div>
          </div>
        </div>
      </Step2Shell>

      {/* ── STEP 3: Error + Submit ── */}

      {error && <div ref={errorRef} className={styles.errorAlert} role="alert">{error}</div>}

      <button
        type="submit"
        disabled={submitting || !canSubmit}
        className={`${btn.btnAccent} ${styles.submitBtn}`}
      >
        {submitting ? t('form.submitting') : t('form.submit')}
      </button>
      {!canSubmit && !submitting && (
        <p className={styles.submitHelper}>{t('form.submitHelper')}</p>
      )}

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
