import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth, portalFetch } from '../hooks/useAuth';
import { apiPost, apiGet } from '../hooks/useApi';
import { colors, fonts, button as btnStyles } from '../theme';
import { trackEvent } from '../utils/trackEvent';

const LEGACY_SECTION_IDS = ['service', 'bol', 'payment', 'insurance', 'cancellation', 'customer', 'delays', 'liability'];
const LEGACY_HIGHLIGHTS = new Set(['bol', 'payment', 'customer']);
const MAX_V2_SECTIONS = 20;

// Builds a unified sections array from either the v2.0 shape (section1..sectionN
// with optional bullets/tiers) or the legacy v1.1 shape (sections.service,
// sections.bol, ...). Returning null for a shape means the namespace hasn't
// loaded yet; an empty array means loaded but nothing to show.
function buildSections(bundle, pricingModel = 'legacy') {
  if (!bundle || typeof bundle !== 'object') return [];
  // v2.0 shape
  if (bundle.section1 && typeof bundle.section1 === 'object') {
    const out = [];
    for (let i = 1; i <= MAX_V2_SECTIONS; i++) {
      // WPF-T01: new-model signers (pricing_model='ind_2026') get the variant
      // fee schedule — MUST mirror the server render (same swap in
      // services/agreement_renderer.py) or the signed hash cross-check drifts.
      const sec = (i === 2 && pricingModel === 'ind_2026' && bundle.section2_ind2026)
        ? bundle.section2_ind2026
        : bundle[`section${i}`];
      if (!sec || typeof sec !== 'object' || !sec.title) break;
      out.push({
        id: `s${i}`,
        title: sec.title,
        body: sec.body || '',
        bullets: Array.isArray(sec.bullets) ? sec.bullets : null,
        tiers: Array.isArray(sec.tiers) ? sec.tiers : null,
        feeIncludes: sec.feeIncludes || null,
        highlight: i === 5, // Section 5 (Limitation of Liability) gets the emphasis box
        index: i,
      });
    }
    return out;
  }
  // Legacy v1.1 shape
  const legacy = bundle.sections;
  if (legacy && typeof legacy === 'object') {
    return LEGACY_SECTION_IDS
      .filter(id => legacy[id])
      .map((id, i) => ({
        id,
        title: legacy[id].title,
        body: legacy[id].body,
        bullets: null,
        tiers: null,
        feeIncludes: null,
        highlight: LEGACY_HIGHLIGHTS.has(id),
        index: i + 1,
      }));
  }
  return [];
}

// Map customers.customer_type to the agreement_type string the backend
// accepts in sign_agreement + get_agreement_template. Mirrors the
// AGREEMENT_TEMPLATE_MAP in db/customer_types.py: dealer and exporter
// each have their own template; individual/auction_buyer/unknown share
// the 'shipper' template.
function getAgreementType(customerType) {
  if (customerType === 'dealer') return 'dealer';
  if (customerType === 'exporter') return 'exporter';
  return 'shipper';
}

const highlightedBox = {
  background: '#FFF8F5',
  borderLeft: `4px solid ${colors.accent}`,
  borderRadius: '0 12px 12px 0',
  padding: '20px 24px',
  marginBottom: '24px',
};

const normalBox = {
  marginBottom: '24px',
  paddingBottom: '20px',
  borderBottom: `1px solid ${colors.border}`,
};

const sectionTitle = {
  fontFamily: fonts.serif,
  fontSize: '18px',
  fontWeight: 700,
  color: colors.text,
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const sectionBody = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
};

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="9" fill={colors.success} />
      <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PendingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="8.5" stroke={colors.border} />
    </svg>
  );
}

function BankAuthAgreement({ user: _user }) {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [checks, setChecks] = useState([false, false, false, false]);
  const [signerName, setSignerName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Load bank auth template directly (no i18n — English only for now)
  const [tpl, setTpl] = useState(null);
  useEffect(() => {
    import('../locales/en/agreement_bank_auth.json').then(m => setTpl(m.default || m));
  }, []);

  if (!tpl) return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: fonts.sans, color: colors.textMuted }}>Loading...</div>;

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#10003;</div>
        <h2 style={{ fontFamily: fonts.serif, fontSize: '24px', color: colors.success, marginBottom: '12px' }}>Bank Authorization Signed</h2>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, marginBottom: '24px' }}>
          Your bank authorization agreement has been recorded. You can now receive weekly invoices.
        </p>
        <button onClick={() => navigate('/portal/dashboard')} style={btnStyles.accent}>Go to Dashboard</button>
      </div>
    );
  }

  const allChecked = checks.every(Boolean);
  const canSign = allChecked && signerName.trim().length >= 2;
  const checkboxEntries = Object.entries(tpl.checkboxes || {});

  async function handleSign() {
    if (!canSign || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await portalFetch('/api/portal/billing/sign-bank-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signer_name: signerName.trim() }),
      });
      if (res.ok) {
        await checkAuth();
        navigate('/portal/dashboard?toast=bank_auth_signed', { replace: true });
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.detail || 'Failed to sign agreement.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>
        {tpl.title}
      </h1>



      {error && (
        <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, padding: '12px 16px', background: '#FFF0EC', borderRadius: '8px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {/* Agreement body */}
      <div style={{ border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '32px 28px', marginBottom: '24px', background: colors.bgCard }}>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7, marginBottom: '24px' }}>
          {tpl.intro}
        </p>
        {(tpl.sections || []).map(sec => (
          <div key={sec.id} style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: `1px solid ${colors.border}` }}>
            <h3 style={{ fontFamily: fonts.serif, fontSize: '18px', fontWeight: 700, color: colors.text, marginBottom: '10px' }}>{sec.title}</h3>
            <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.7 }}>{sec.body}</p>
          </div>
        ))}
      </div>

      {/* Checkboxes */}
      <div style={{ marginBottom: '24px' }}>
        {checkboxEntries.map(([, label], i) => (
          <label key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 0',
            cursor: 'pointer', fontFamily: fonts.sans, fontSize: '13px', color: colors.text, lineHeight: 1.5,
          }}>
            <input
              type="checkbox"
              checked={checks[i] || false}
              onChange={() => setChecks(prev => prev.map((v, j) => j === i ? !v : v))}
              style={{ marginTop: '2px', accentColor: colors.accent }}
            />
            {label}
          </label>
        ))}
      </div>

      {/* Signer name + sign button */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={{ fontFamily: fonts.sans, fontSize: '12px', fontWeight: 600, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
            Full Legal Name
          </label>
          <input
            value={signerName}
            onChange={e => setSignerName(e.target.value)}
            placeholder="Enter your full legal name"
            style={{
              fontFamily: fonts.sans, fontSize: '16px', padding: '10px 14px', borderRadius: '8px',
              border: `1px solid ${colors.borderInput}`, background: colors.bgInput, color: colors.text,
              outline: 'none', width: '100%', boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          onClick={handleSign}
          disabled={!canSign || submitting}
          style={{
            ...btnStyles.accent,
            padding: '12px 32px',
            fontSize: '14px',
            opacity: canSign && !submitting ? 1 : 0.5,
            cursor: canSign && !submitting ? 'pointer' : 'default',
          }}
        >
          {submitting ? 'Signing...' : 'Sign Agreement'}
        </button>
      </div>
    </div>
  );
}

export default function Agreement() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user, checkAuth } = useAuth();
  const agreementNs = user?.customer_type === 'dealer' ? 'agreement_dealer' : 'agreement';
  const { t, i18n } = useTranslation(agreementNs);
  const agreementBundle = i18n.getResourceBundle(i18n.language, agreementNs)
    || i18n.getResourceBundle('en', agreementNs)
    || {};
  const scrollRef = useRef(null);
  const sectionRefs = useRef({});
  const agreementIdRef = useRef(null);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readSections, setReadSections] = useState(new Set());
  const [checks, setChecks] = useState([false, false, false, false]);
  const [signerName, setSignerName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  // ESIGN-MECHANICS: discrete UETA electronic-consent, unticked by default.
  const [eConsent, setEConsent] = useState(false);
  // Template metadata for the dealer DRAFT flow — drives the banner and
  // the agreement_version we send back when signing. Shipper flow leaves
  // this null so nothing renders and the backend uses its default version.
  const [template, setTemplate] = useState(null);

  // Customer-level agreement modes:
  // 1. /agreement (logged-in user, customer_id from session)
  // 2. /agreement/new?customer_id=123 (legacy deep link)
  // 3. /agreement/:orderId (legacy order-linked, resolves to customer)
  const searchParams = new URLSearchParams(window.location.search);
  const typeParam = searchParams.get('type');
  const customerIdParam = searchParams.get('customer_id');
  const isCustomerLevel = !orderId || (orderId === 'new' && customerIdParam);
  const resolvedCustomerId = user?.id || (customerIdParam ? parseInt(customerIdParam, 10) : null);

  // Bank auth sub-agreement — completely separate rendering path.
  // NOTE: typeParam is URL-derived and stable for the lifetime of a given
  // navigation, so the hooks that follow are always called in the same
  // order per render. A strict rules-of-hooks refactor (splitting into
  // sibling sub-components) is tracked as a follow-up.
  if (typeParam === 'bank_auth') {
    return <BankAuthAgreement user={user} />;
  }
  /* eslint-disable react-hooks/rules-of-hooks */

  // Fetch template metadata so we know the version + draft status. This
  // runs in parallel with the signed-status fetch and is best-effort: a
  // failure here only suppresses the DRAFT banner, it does not break the
  // sign flow.
  useEffect(() => {
    const tplType = getAgreementType(user?.customer_type);
    // WPF-T01: in order mode pass the order id so the backend can resolve the
    // signer's pricing model (anonymous quote-email signers have no session).
    const orderParam = !isCustomerLevel && orderId && /^\d+$/.test(String(orderId))
      ? `&order_id=${orderId}` : '';
    apiGet(`/api/public/agreement-template?type=${tplType}${orderParam}`)
      .then(setTemplate)
      .catch(() => setTemplate(null));
  }, [user?.customer_type, isCustomerLevel, orderId]);

  // Check if already signed, fetch order for legacy mode
  useEffect(() => {
    if (isCustomerLevel) {
      if (resolvedCustomerId) {
        apiGet(`/api/public/agreement/status/${resolvedCustomerId}`)
          .then(data => {
            if (data.signed) {
              agreementIdRef.current = data.agreement_id;
              setSuccess(true);
            }
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setLoading(false);
      }
      return;
    }
    if (!orderId) return;
    const ref = orderId.match(/^\d+$/) ? `WEB-${String(orderId).padStart(5, '0')}` : orderId;
    apiGet(`/api/public/track?code=${encodeURIComponent(ref)}`)
      .then(data => { setOrder(data); setLoading(false); })
      .catch(() => { setError(t('errors.orderNotFound')); setLoading(false); });
  }, [orderId, t, isCustomerLevel, resolvedCustomerId]);

  // WPF-T01: the fee-schedule variant for new-model signers. Precedence
  // matters: in ORDER mode the template endpoint resolves the model through
  // the ORDER'S customer — exactly what sign_agreement will hash — so it must
  // win over the viewing session's own model. Customer-level mode falls back
  // to /me. Default: legacy (today's text).
  const pricingModel = template?.pricing_model || user?.pricing_model || 'legacy';
  const sections = buildSections(agreementBundle, pricingModel);

  // Scroll tracking
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const threshold = containerRect.top + containerRect.height * 0.6;

    const newRead = new Set(readSections);
    sections.forEach(sec => {
      const el = sectionRefs.current[sec.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < threshold) {
          newRead.add(sec.id);
        }
      }
    });
    if (newRead.size !== readSections.size) {
      setReadSections(newRead);
    }
  }, [readSections, sections]);

  const allChecked = checks.every(Boolean);
  const canSign = allChecked && eConsent && signerName.trim().length >= 2;

  function toggleCheck(i) {
    setChecks(prev => prev.map((v, j) => j === i ? !v : v));
  }

  async function handleSign() {
    if (!canSign || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        signer_name: signerName.trim(),
        checkboxes: checks,
        signed_at: new Date().toISOString(),
        user_agent: navigator.userAgent,
        lang: i18n.language || 'en',
        agreement_type: getAgreementType(user?.customer_type),
        e_consent: eConsent,
      };
      // Send the version that the user actually saw — recorded on the
      // customer_agreements row. If the template fetch failed earlier we
      // omit the field and let the backend fall back to its column default.
      if (template?.version) {
        payload.agreement_version = template.version;
      }
      if (isCustomerLevel && resolvedCustomerId) {
        payload.customer_id = resolvedCustomerId;
      } else if (orderId) {
        payload.order_id = parseInt(orderId.match(/^\d+$/) ? orderId : orderId.replace('WEB-', ''), 10);
      }
      // Capture agreement text for storage
      const docEl = scrollRef.current;
      if (docEl) {
        payload.agreement_html = docEl.innerHTML;
      }
      const result = await apiPost('/api/public/agreement', payload);
      agreementIdRef.current = result.agreement_id;
      await checkAuth();
      trackEvent('agreement_sign');
      if (isCustomerLevel) {
        navigate('/portal/dashboard?toast=agreement_signed', { replace: true });
      } else {
        const ref = orderId.match(/^\d+$/) ? `WEB-${String(orderId).padStart(5, '0')}` : orderId;
        navigate(`/track?code=${encodeURIComponent(ref)}`);
      }
    } catch (err) {
      setError(err.message || t('errors.submitFailed'));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px', fontFamily: fonts.sans, color: colors.textMuted }}>
        {t('loading')}
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>
          <CheckIcon />
        </div>
        <h2 style={{ fontFamily: fonts.serif, fontSize: '28px', color: colors.success, marginBottom: '12px' }}>
          {t('success.title')}
        </h2>
        <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, marginBottom: '20px' }}>
          {t('success.message')}
        </p>
        {agreementIdRef.current && (
          <a
            href={`${import.meta.env.VITE_API_URL || 'https://dispatch.y7agency.com'}/api/public/agreement/${agreementIdRef.current}/pdf`}
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600,
              color: colors.accent, textDecoration: 'none',
              padding: '10px 20px', border: `1px solid ${colors.accent}`,
              borderRadius: '20px', display: 'inline-block',
            }}
          >
            Download Signed Agreement (PDF)
          </a>
        )}
      </div>
    );
  }

  const checkboxLabels = [
    t('checkboxes.bol'),
    // WPF-T01: the payment acknowledgment mirrors the §2 variant.
    (pricingModel === 'ind_2026' && agreementBundle.checkboxes_ind2026?.payment)
      ? agreementBundle.checkboxes_ind2026.payment
      : t('checkboxes.payment'),
    t('checkboxes.broker'),
    t('checkboxes.cancellation'),
  ];

  const agreementVersion = (pricingModel === 'ind_2026' && agreementBundle.version_ind2026)
    ? agreementBundle.version_ind2026
    : (agreementBundle.version || '');
  const agreementEffective = agreementBundle.effectiveDate || '';
  const agreementIntro = agreementBundle.intro || '';

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
      {/* Header */}
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: 'clamp(24px, 4vw, 34px)',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '8px',
      }}>
        {t('title')}
      </h1>
      {(agreementVersion || agreementEffective) && (
        <div style={{
          fontFamily: fonts.mono,
          fontSize: '12px',
          color: colors.textMuted,
          marginBottom: '14px',
          letterSpacing: '0.02em',
        }}>
          {agreementVersion && `Version ${agreementVersion}`}
          {agreementVersion && agreementEffective && ' · '}
          {agreementEffective && `Effective ${agreementEffective}`}
        </div>
      )}
      {order && (
        <div style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          color: colors.textMuted,
          marginBottom: '24px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          {order.reference && <span>Ref: <strong style={{ color: colors.text, fontFamily: fonts.mono }}>{order.reference}</strong></span>}
          {order.vehicle && <span>Vehicle: <strong style={{ color: colors.text }}>{order.vehicle}</strong></span>}
          {order.vin && <span>VIN: <strong style={{ color: colors.text, fontFamily: fonts.mono }}>{order.vin}</strong></span>}
        </div>
      )}

      {error && (
        <div style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          color: colors.accent,
          padding: '12px 16px',
          background: '#FFF0EC',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          {error}
        </div>
      )}

      {/* Scrollable document body */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          maxHeight: '500px',
          overflowY: 'auto',
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '28px 24px',
          background: colors.bgCard,
          marginBottom: '28px',
        }}
      >
        {agreementIntro && (
          <p style={{ ...sectionBody, marginBottom: '24px' }}>{agreementIntro}</p>
        )}
        {sections.map((sec) => (
          <div
            key={sec.id}
            ref={el => { sectionRefs.current[sec.id] = el; }}
            style={sec.highlight ? highlightedBox : normalBox}
          >
            <div style={sectionTitle}>
              {readSections.has(sec.id) ? <CheckIcon /> : <PendingIcon />}
              <span>{sec.title}</span>
            </div>
            {sec.body && <p style={{ ...sectionBody, whiteSpace: 'pre-line' }}>{sec.body}</p>}
            {sec.tiers && (
              <ul style={{ ...sectionBody, paddingLeft: '20px', marginTop: '8px' }}>
                {sec.tiers.map((t, idx) => <li key={idx} style={{ marginBottom: '6px' }}>{t}</li>)}
              </ul>
            )}
            {sec.feeIncludes && (
              <p style={{ ...sectionBody, marginTop: '8px' }}>{sec.feeIncludes}</p>
            )}
            {sec.bullets && (
              <ul style={{ ...sectionBody, paddingLeft: '20px', marginTop: '8px' }}>
                {sec.bullets.map((b, idx) => <li key={idx} style={{ marginBottom: '6px' }}>{b}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Mandatory checkboxes */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        marginBottom: '28px',
      }}>
        {checkboxLabels.map((label, i) => (
          <label key={i} style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            cursor: 'pointer',
          }}>
            <input
              type="checkbox"
              checked={checks[i]}
              onChange={() => toggleCheck(i)}
              style={{
                marginTop: '3px',
                width: '18px',
                height: '18px',
                accentColor: colors.success,
                flexShrink: 0,
              }}
            />
            <span style={{
              fontFamily: fonts.sans,
              fontSize: '13px',
              color: colors.text,
              lineHeight: 1.5,
            }}>
              {label}
            </span>
          </label>
        ))}
      </div>

      {/* ESIGN-MECHANICS: discrete UETA electronic-consent — unticked by default,
          required (folded into canSign) to enable the Sign button. */}
      <label style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
        cursor: 'pointer',
        marginBottom: '28px',
      }}>
        <input
          type="checkbox"
          checked={eConsent}
          onChange={e => setEConsent(e.target.checked)}
          style={{
            marginTop: '3px',
            width: '18px',
            height: '18px',
            accentColor: colors.success,
            flexShrink: 0,
          }}
        />
        <span style={{
          fontFamily: fonts.sans,
          fontSize: '13px',
          color: colors.text,
          lineHeight: 1.5,
        }}>
          I agree to conduct business electronically and to sign this agreement electronically.
        </span>
      </label>

      {/* Signature block */}
      <div style={{
        background: colors.bgMuted,
        borderRadius: '12px',
        padding: '24px',
        opacity: allChecked ? 1 : 0.5,
        transition: 'opacity 300ms ease',
        pointerEvents: allChecked ? 'auto' : 'none',
      }}>
        <label style={{
          fontFamily: fonts.sans,
          fontSize: '12px',
          fontWeight: 600,
          color: colors.text,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'block',
          marginBottom: '8px',
        }}>
          {t('signature.label')}
        </label>
        <input
          value={signerName}
          onChange={e => setSignerName(e.target.value)}
          placeholder={t('signature.placeholder')}
          style={{
            fontFamily: fonts.serif,
            fontSize: '20px',
            fontStyle: 'italic',
            padding: '12px 16px',
            borderRadius: '8px',
            border: `1px solid ${colors.borderInput}`,
            background: colors.bgCard,
            color: colors.text,
            outline: 'none',
            width: '100%',
            marginBottom: '12px',
          }}
        />
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '11px',
          color: colors.textMuted,
          lineHeight: 1.5,
          marginBottom: '20px',
        }}>
          {t('signature.legal')}
        </p>

        <button
          onClick={handleSign}
          disabled={!canSign || submitting}
          style={{
            ...btnStyles.accent,
            padding: '16px 32px',
            fontSize: '14px',
            width: '100%',
            opacity: (canSign && !submitting) ? 1 : 0.45,
            cursor: (canSign && !submitting) ? 'pointer' : 'not-allowed',
            transition: 'opacity 200ms ease',
          }}
        >
          {submitting ? t('signature.submitting') : t('signature.button')}
        </button>
      </div>
    </div>
  );
  /* eslint-enable react-hooks/rules-of-hooks */
}
