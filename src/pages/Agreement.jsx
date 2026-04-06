import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth, portalFetch } from '../hooks/useAuth';
import { apiPost, apiGet } from '../hooks/useApi';
import { colors, fonts, button as btnStyles } from '../theme';
import { trackEvent } from '../utils/analytics';

const SECTION_IDS = ['service', 'bol', 'payment', 'insurance', 'cancellation', 'customer', 'delays', 'liability'];

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

export default function Agreement() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const agreementNs = user?.customer_type === 'dealer' ? 'agreement_dealer' : 'agreement';
  const { t } = useTranslation(agreementNs);
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

  // Customer-level agreement modes:
  // 1. /agreement (logged-in user, customer_id from session)
  // 2. /agreement/new?customer_id=123 (legacy deep link)
  // 3. /agreement/:orderId (legacy order-linked, resolves to customer)
  const searchParams = new URLSearchParams(window.location.search);
  const customerIdParam = searchParams.get('customer_id');
  const isCustomerLevel = !orderId || (orderId === 'new' && customerIdParam);
  const resolvedCustomerId = user?.id || (customerIdParam ? parseInt(customerIdParam, 10) : null);

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

  // Scroll tracking
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const threshold = containerRect.top + containerRect.height * 0.6;

    const newRead = new Set(readSections);
    SECTION_IDS.forEach(id => {
      const el = sectionRefs.current[id];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < threshold) {
          newRead.add(id);
        }
      }
    });
    if (newRead.size !== readSections.size) {
      setReadSections(newRead);
    }
  }, [readSections]);

  const allChecked = checks.every(Boolean);
  const canSign = allChecked && signerName.trim().length >= 2;

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
        lang: 'en',
        agreement_type: user?.customer_type === 'dealer' ? 'dealer' : 'shipper',
      };
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
      setSuccess(true);
      trackEvent('agreement_sign');
      setTimeout(() => {
        if (isCustomerLevel) {
          navigate('/portal/dashboard', { replace: true });
        } else {
          const ref = orderId.match(/^\d+$/) ? `WEB-${String(orderId).padStart(5, '0')}` : orderId;
          navigate(`/track?code=${encodeURIComponent(ref)}`);
        }
      }, 3000);
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

  const sections = [
    { id: 'service', title: t('sections.service.title'), body: t('sections.service.body'), highlight: false },
    { id: 'bol', title: t('sections.bol.title'), body: t('sections.bol.body'), highlight: true },
    { id: 'payment', title: t('sections.payment.title'), body: t('sections.payment.body'), highlight: true },
    { id: 'insurance', title: t('sections.insurance.title'), body: t('sections.insurance.body'), highlight: false },
    { id: 'cancellation', title: t('sections.cancellation.title'), body: t('sections.cancellation.body'), highlight: false },
    { id: 'customer', title: t('sections.customer.title'), body: t('sections.customer.body'), highlight: true },
    { id: 'delays', title: t('sections.delays.title'), body: t('sections.delays.body'), highlight: false },
    { id: 'liability', title: t('sections.liability.title'), body: t('sections.liability.body'), highlight: false },
  ];

  const checkboxLabels = [
    t('checkboxes.bol'),
    t('checkboxes.payment'),
    t('checkboxes.broker'),
    t('checkboxes.cancellation'),
  ];

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
        {sections.map((sec, i) => (
          <div
            key={sec.id}
            ref={el => { sectionRefs.current[sec.id] = el; }}
            style={sec.highlight ? highlightedBox : normalBox}
          >
            <div style={sectionTitle}>
              {readSections.has(sec.id) ? <CheckIcon /> : <PendingIcon />}
              <span>Section {i + 1}: {sec.title}</span>
            </div>
            <p style={sectionBody}>{sec.body}</p>
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
}
