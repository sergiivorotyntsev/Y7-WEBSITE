import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts, radii, spacing } from '../../theme';

/**
 * Onboarding (ONBOARD-T08)
 *
 * Unified 3-step wizard that replaces the old AccountTypeModal + separate
 * /agreement page flow. Mounted at /portal/onboarding (ProtectedRoute).
 *
 * Step 1 — Choose account type (AccountTypeStep, ONBOARD-T09)
 * Step 2 — Review + sign agreement (AgreementStep, ONBOARD-T10)
 * Step 3 — Welcome (WelcomeStep, ONBOARD-T11)
 *
 * Starting step is derived from the authenticated user:
 *   - fully onboarded (type != unknown && agreement_signed) → redirect to
 *     /portal/dashboard (safety, should not normally land here)
 *   - classified but agreement not signed → Step 2 with type preserved
 *     (covers legacy dealer re-sign)
 *   - unclassified or legacy 'shipper' → Step 1
 *
 * All 3 steps share this container and hit the atomic backend endpoint
 *   POST /api/portal/onboarding/classify-and-sign
 * via portalFetch so classification + signed agreement land in a single
 * DB transaction.
 */

const TYPE_LABELS = {
  individual: 'Individual',
  auction_buyer: 'Auction Buyer',
  dealer: 'Auto Dealer',
  exporter: 'Exporter',
};

const TEMPLATE_MAP = {
  individual: { key: 'individual_v1.0.md', version: 'v1.0' },
  auction_buyer: { key: 'individual_v1.0.md', version: 'v1.0' },
  dealer: { key: 'dealer_agreement_v0.1_DRAFT.md', version: 'v1.0' },
  exporter: { key: 'exporter_v1.0.md', version: 'v1.0' },
};

const TYPES = [
  {
    id: 'individual',
    title: 'Ship My Car',
    description: 'Single vehicle, personal shipment',
    benefits: [
      'One-vehicle web quote, door-to-door',
      'Pay carrier directly on delivery (COD)',
      '$50 COD or $65 Full Service fee',
    ],
    tone: { border: '#993C1D', bg: '#FFF8F5' },
  },
  {
    id: 'auction_buyer',
    title: 'Auction Buyer',
    description: 'Copart, IAA, Manheim, or similar',
    benefits: [
      'Auction presets (Copart / IAA / Manheim)',
      'Gate-pass upload + VIN decode',
      '$50 COD or $65 Full Service fee',
    ],
    tone: { border: '#B8851F', bg: '#FFFBF0' },
  },
  {
    id: 'dealer',
    title: 'Auto Dealer',
    description: 'Licensed dealer moving inventory / trades',
    benefits: [
      'Volume shipping + saved locations',
      'Dedicated dealer agreement',
      '$50 COD / $65 Full Service (AP service available separately)',
    ],
    tone: { border: '#0F6E56', bg: '#F0FAF6' },
  },
  {
    id: 'exporter',
    title: 'Exporter',
    description: 'Shipping to US ports, warehouses, or containers',
    benefits: [
      'Saved port + warehouse addresses',
      'Container-ready delivery',
      '$50 COD or $65 Full Service fee',
    ],
    tone: { border: '#14648C', bg: '#F0F6FA' },
  },
];


export default function Onboarding() {
  const { user, checkAuth, loading } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  // One-time derivation of the starting step from the authenticated user's
  // classification state. After initial setStep the wizard transitions are
  // driven by user interaction, not user state — this effect is a
  // legitimate initializer, not an ongoing sync, hence the block-wide
  // suppression below (matches the useAuth.jsx pattern for the same rule).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/portal/login', { replace: true });
      return;
    }
    const isClassified = user.customer_type
      && user.customer_type !== 'unknown'
      && user.customer_type !== 'shipper';
    if (isClassified && user.agreement_signed) {
      navigate('/portal/dashboard', { replace: true });
      return;
    }
    if (isClassified && !user.agreement_signed) {
      setSelectedType(user.customer_type);
      setStep(2);
    } else {
      setStep(1);
    }
  }, [user, loading, navigate]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (loading || step === null) {
    return (
      <div style={wrapStyle}>
        <div style={{ color: colors.textMuted, fontFamily: fonts.sans }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div style={wrapStyle}>
      <div style={cardStyle}>
        <Header step={step} />

        {step === 1 && (
          <AccountTypeStep
            onSelected={(id) => {
              setSelectedType(id);
              setStep(2);
            }}
          />
        )}
        {step === 2 && selectedType && (
          <AgreementStep
            customerType={selectedType}
            onBack={() => setStep(1)}
            onSigned={async () => {
              await checkAuth();
              setStep(3);
            }}
          />
        )}
        {step === 3 && (
          <WelcomeStep
            customerType={selectedType}
            name={user?.name}
            onComplete={(action) => {
              if (action === 'create_order') navigate('/portal/new-order');
              else navigate('/portal/dashboard');
            }}
          />
        )}
      </div>
    </div>
  );
}


// ---------------------------------------------------------------------------
// Header with step indicator
// ---------------------------------------------------------------------------

function Header({ step }) {
  return (
    <div style={{ marginBottom: spacing.lg }}>
      <h1 style={{
        fontFamily: fonts.serif, fontSize: 26, fontWeight: 700,
        color: colors.text, margin: 0, marginBottom: spacing.xs,
      }}>
        Complete your account setup
      </h1>
      <p style={{
        fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted,
        margin: 0, marginBottom: spacing.md, lineHeight: 1.5,
      }}>
        One short wizard. Your classification and signed agreement are
        saved together in a single step.
      </p>
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: spacing.xs, marginBottom: spacing.sm,
      }}>
        {[1, 2, 3].map((n, i) => (
          <div key={n} style={{
            display: 'flex', alignItems: 'center', flex: '0 0 auto',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              border: `2px solid ${step >= n ? colors.accent : colors.border}`,
              background: step >= n ? colors.accent : 'transparent',
              color: step >= n ? '#fff' : colors.textMuted,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: fonts.sans, fontSize: 13, fontWeight: 600,
            }}>
              {n}
            </div>
            {i < 2 && (
              <div style={{
                width: 40, height: 2,
                background: step > n ? colors.accent : colors.border,
                margin: `0 ${spacing.xs}px`,
              }} />
            )}
          </div>
        ))}
        <div style={{
          marginLeft: spacing.sm,
          fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted,
        }}>
          {step === 1 && 'Choose account type'}
          {step === 2 && 'Review and sign agreement'}
          {step === 3 && "You're all set"}
        </div>
      </div>
    </div>
  );
}


// ---------------------------------------------------------------------------
// Step 1 — AccountTypeStep (ONBOARD-T09)
// ---------------------------------------------------------------------------

function AccountTypeStep({ onSelected }) {
  const [focused, setFocused] = useState(null);
  return (
    <div>
      <h2 style={stepTitleStyle}>Which best describes you?</h2>
      <p style={stepSubtitleStyle}>
        Pick the option that matches your shipping use case. Dealers and
        exporters each have their own agreement.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: spacing.md,
        marginTop: spacing.md,
      }}>
        {TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelected(t.id)}
            onFocus={() => setFocused(t.id)}
            onBlur={() => setFocused(null)}
            style={{
              padding: spacing.md,
              border: `2px solid ${focused === t.id ? t.tone.border : colors.border}`,
              borderRadius: radii.lg,
              background: focused === t.id ? t.tone.bg : colors.bgCard,
              cursor: 'pointer', textAlign: 'left',
              fontFamily: fonts.sans,
              transition: 'all 150ms ease',
              outline: 'none',
              boxShadow: focused === t.id
                ? `0 0 0 3px ${t.tone.border}33`
                : 'none',
            }}
          >
            <div style={{
              fontFamily: fonts.serif, fontSize: 18, fontWeight: 700,
              color: colors.text, marginBottom: 4,
            }}>
              {t.title}
            </div>
            <div style={{
              fontSize: 13, color: colors.textMuted, marginBottom: spacing.sm,
            }}>
              {t.description}
            </div>
            <ul style={{
              margin: 0, padding: '0 0 0 16px', fontSize: 12,
              color: colors.textMuted, lineHeight: 1.7,
            }}>
              {t.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </button>
        ))}
      </div>
    </div>
  );
}


// ---------------------------------------------------------------------------
// Step 2 — AgreementStep (ONBOARD-T10)
// ---------------------------------------------------------------------------

function AgreementStep({ customerType, onBack, onSigned }) {
  const [meta, setMeta] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [checks, setChecks] = useState({
    bol: false, payment: false, broker_liability: false, cancellation: false,
  });
  const [signature, setSignature] = useState('');
  const [readToEnd, setReadToEnd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Load metadata (draft warning, version) from existing public endpoint.
  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const r = await fetch(
          `/api/public/agreement-template?type=${encodeURIComponent(customerType)}`
        );
        if (!r.ok) throw new Error('Template metadata unavailable');
        const data = await r.json();
        if (alive) setMeta(data);
      } catch (e) {
        if (alive) setFetchError(e.message || 'Load failed');
      }
    }
    load();
    return () => { alive = false; };
  }, [customerType]);

  const template = TEMPLATE_MAP[customerType];

  // Scroll-to-bottom read guard.
  function handleScroll(e) {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) {
      setReadToEnd(true);
    }
  }

  const allChecked = Object.values(checks).every(Boolean);
  const canSubmit = readToEnd && allChecked
    && signature.trim().length >= 2 && !submitting;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setSubmitError(null);

    // Capture the HTML we actually rendered so the audit record stores
    // exactly what the customer saw when they signed.
    const docEl = document.getElementById('onboarding-agreement-body');
    const html_snapshot = docEl ? docEl.innerHTML : '';

    try {
      const res = await portalFetch('/api/portal/onboarding/classify-and-sign', {
        method: 'POST',
        body: JSON.stringify({
          customer_type: customerType,
          agreement_template_key: template.key,
          agreement_version: template.version,
          signature_name: signature.trim(),
          checkbox_bol: checks.bol,
          checkbox_payment: checks.payment,
          checkbox_broker_liability: checks.broker_liability,
          checkbox_cancellation: checks.cancellation,
          html_snapshot,
          language: 'en',
          signed_channel: 'web',
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const err = body?.detail?.error || body?.error || 'Sign failed';
        throw new Error(
          typeof err === 'string' ? err : JSON.stringify(err)
        );
      }
      onSigned();
    } catch (e) {
      setSubmitError(e.message || 'Sign failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2 style={stepTitleStyle}>
        Review and sign — {TYPE_LABELS[customerType]}
      </h2>
      <p style={stepSubtitleStyle}>
        Scroll to the end of the agreement, then check all boxes and sign.
      </p>

      {fetchError && (
        <div style={errorBoxStyle}>{fetchError}</div>
      )}

      {meta?.is_draft && meta?.draft_warning && (
        <div style={{
          padding: spacing.md, background: '#FFFBEB',
          border: '1px solid #F59E0B', borderRadius: radii.md,
          fontSize: 13, color: '#7C2D12',
          marginBottom: spacing.md,
        }}>
          <strong>Draft agreement — for evaluation.</strong>{' '}
          {meta.draft_warning}
        </div>
      )}

      <div
        id="onboarding-agreement-body"
        onScroll={handleScroll}
        style={{
          maxHeight: 360, overflowY: 'auto',
          background: colors.bgInput, border: `1px solid ${colors.border}`,
          borderRadius: radii.md, padding: spacing.md,
          fontSize: 13, lineHeight: 1.65, color: colors.text,
          marginBottom: spacing.md,
        }}
      >
        <AgreementBody customerType={customerType} />
      </div>

      {!readToEnd && (
        <div style={{
          padding: spacing.sm + 'px ' + spacing.md + 'px',
          background: '#FFFBEB', border: '1px solid #F59E0B',
          borderRadius: radii.md, fontSize: 13, color: '#92400E',
          marginBottom: spacing.md,
        }}>
          Please scroll to the end of the agreement to continue.
        </div>
      )}

      <div style={{
        display: 'flex', flexDirection: 'column', gap: spacing.sm,
        marginBottom: spacing.md,
      }}>
        <Checkbox
          id="cb-bol"
          disabled={!readToEnd}
          checked={checks.bol}
          onChange={(v) => setChecks({ ...checks, bol: v })}
          label="I understand the Bill of Lading and inspection requirements."
        />
        <Checkbox
          id="cb-payment"
          disabled={!readToEnd}
          checked={checks.payment}
          onChange={(v) => setChecks({ ...checks, payment: v })}
          label="I understand the dispatch fee structure and payment terms."
        />
        <Checkbox
          id="cb-broker"
          disabled={!readToEnd}
          checked={checks.broker_liability}
          onChange={(v) => setChecks({ ...checks, broker_liability: v })}
          label="I understand the broker's role and liability limitations."
        />
        <Checkbox
          id="cb-cancel"
          disabled={!readToEnd}
          checked={checks.cancellation}
          onChange={(v) => setChecks({ ...checks, cancellation: v })}
          label="I understand the cancellation policy and refund terms."
        />
      </div>

      <label style={{
        display: 'block', fontFamily: fonts.sans, fontSize: 13,
        fontWeight: 600, color: colors.text, marginBottom: spacing.xs,
      }}>
        Your full legal name
      </label>
      <input
        type="text"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
        disabled={!allChecked}
        maxLength={200}
        placeholder="e.g. John Smith"
        style={{
          width: '100%', padding: '10px 12px',
          fontSize: 14, fontFamily: fonts.sans,
          border: `1px solid ${colors.borderInput}`,
          borderRadius: radii.md,
          background: allChecked ? colors.bgCard : colors.bgMuted,
          color: colors.text,
          boxSizing: 'border-box',
        }}
      />

      {submitError && (
        <div style={errorBoxStyle}>{submitError}</div>
      )}

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginTop: spacing.lg, gap: spacing.sm,
      }}>
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          style={secondaryBtnStyle}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            ...primaryBtnStyle,
            background: canSubmit ? colors.accent : colors.bgMuted,
            color: canSubmit ? '#fff' : colors.textMuted,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
          }}
        >
          {submitting ? 'Signing...' : 'Sign agreement'}
        </button>
      </div>
    </div>
  );
}


function Checkbox({ id, disabled, checked, onChange, label }) {
  return (
    <label
      htmlFor={id}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: spacing.sm,
        padding: spacing.sm, borderRadius: radii.md,
        background: disabled ? 'transparent' : '#FAFAF7',
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: fonts.sans, fontSize: 13, color: colors.text,
        lineHeight: 1.5,
        opacity: disabled ? 0.55 : 1,
      }}
    >
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginTop: 2 }}
      />
      <span>{label}</span>
    </label>
  );
}


// Inline agreement copy per customer_type. Matches the outline used by
// the existing Agreement.jsx locale bundles; we keep the content short
// and focused on the four consent points the checkboxes reference.
function AgreementBody({ customerType }) {
  const common = (
    <>
      <p><strong>Y7 Logistics service agreement — summary</strong></p>
      <p>This agreement governs your use of Y7 Logistics dispatch
      services. Full legal terms are preserved in the signed copy
      emailed to you after submission.</p>

      <h4>1. Bill of Lading and inspection</h4>
      <p>A Bill of Lading (BOL) is issued at pickup by the carrier and
      signed at both pickup and delivery. Any pre-existing damage should
      be documented on the BOL; damage not noted on the BOL is presumed
      to have occurred during transit.</p>

      <h4>2. Dispatch fee structure</h4>
      <p>Dispatch fees are a flat service fee to Y7 Logistics for
      arranging transport. Two options:</p>
      <ul>
        <li><strong>$50 COD</strong> — you pay the carrier directly at
        delivery for transport; the $50 Y7 fee is billed separately.</li>
        <li><strong>$65 Full Service</strong> — Y7 pays the carrier on
        your behalf; the combined fee is billed to you.</li>
      </ul>

      <h4>3. Broker role and liability</h4>
      <p>Y7 Logistics (Y7 Consulting Inc, DBA Y7 Logistics, USDOT
      #4427359, MC #1741537) is a licensed property broker. Y7 arranges
      transportation with FMCSA-authorized motor carriers; Y7 does not
      itself transport vehicles. Carrier cargo insurance (minimum
      $100,000) is the primary loss coverage for transport damage.</p>

      <h4>4. Cancellation policy</h4>
      <p>You may cancel a dispatched order at any time before a carrier
      is assigned at no charge. After carrier assignment, cancellation
      may be subject to a carrier dry-run fee if the carrier has already
      begun routing. Refunds of any overpaid amounts are returned to the
      original payment method within 5-10 business days.</p>
    </>
  );

  const typeSpecific = {
    dealer: (
      <>
        <h4>5. Dealer-specific terms</h4>
        <p>As a licensed auto dealer, you confirm that vehicles tendered
        for shipment are lawfully in your inventory or assignment. The
        Carrier Payment Service (AP service with weekly statements and
        1099-NEC issuance) is available as a separate opt-in product
        with its own fee schedule.</p>
      </>
    ),
    auction_buyer: (
      <>
        <h4>5. Auction-origin terms</h4>
        <p>For Copart / IAA / Manheim pickups, you are responsible for
        providing the gate pass or release code before dispatch. Storage
        fees accruing at the auction while release documentation is
        pending are your responsibility.</p>
      </>
    ),
    exporter: (
      <>
        <h4>5. Exporter terms</h4>
        <p>Vehicles delivered to US ports or container terminals follow
        the specific delivery protocols of the receiving facility.
        International forwarding (ocean freight, customs) is handled by
        your forwarder, not Y7.</p>
      </>
    ),
    individual: (
      <>
        <h4>5. Personal shipment</h4>
        <p>You confirm the vehicle is your personal property or is being
        shipped on behalf of a household member with their consent.</p>
      </>
    ),
  };

  return (
    <>
      {common}
      {typeSpecific[customerType] || typeSpecific.individual}
      <p style={{ marginTop: 16, fontStyle: 'italic', color: colors.textMuted }}>
        Scrolling past this line unlocks the consent checkboxes below.
      </p>
    </>
  );
}


// ---------------------------------------------------------------------------
// Step 3 — WelcomeStep (ONBOARD-T11)
// ---------------------------------------------------------------------------

function WelcomeStep({ customerType, name, onComplete }) {
  return (
    <div style={{ textAlign: 'center', padding: spacing.md + 'px 0' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: colors.successBg, color: colors.success,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto ' + spacing.md + 'px',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{
        fontFamily: fonts.serif, fontSize: 24, color: colors.text,
        margin: 0, marginBottom: spacing.xs,
      }}>
        Welcome{name ? `, ${name}` : ''}.
      </h2>
      <p style={{
        fontFamily: fonts.sans, fontSize: 15, color: colors.textMuted,
        margin: 0, marginBottom: spacing.md,
      }}>
        Your <strong>{TYPE_LABELS[customerType] || customerType}</strong>{' '}
        account is active.
      </p>
      <p style={{
        fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted,
        background: colors.bgMuted, padding: spacing.sm + 'px ' + spacing.md + 'px',
        borderRadius: radii.md, display: 'inline-block',
        marginBottom: spacing.lg,
      }}>
        A copy of the signed agreement is on its way to your email.
      </p>
      <div style={{
        display: 'flex', gap: spacing.sm, justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        <button
          type="button"
          onClick={() => onComplete('create_order')}
          style={primaryBtnStyle}
        >
          Submit your first quote
        </button>
        <button
          type="button"
          onClick={() => onComplete('dashboard')}
          style={secondaryBtnStyle}
        >
          Go to dashboard
        </button>
      </div>
    </div>
  );
}


// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const wrapStyle = {
  minHeight: '100vh',
  padding: spacing.lg,
  background: colors.bg,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: spacing.xl,
};

const cardStyle = {
  width: '100%',
  maxWidth: 720,
  background: colors.bgCard,
  borderRadius: radii.xl,
  padding: spacing.xl,
  boxShadow: '0 4px 16px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)',
};

const stepTitleStyle = {
  fontFamily: fonts.serif, fontSize: 20, color: colors.text,
  margin: 0, marginBottom: 4,
};

const stepSubtitleStyle = {
  fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted,
  margin: 0, marginBottom: 16, lineHeight: 1.5,
};

const primaryBtnStyle = {
  padding: '12px 24px',
  background: colors.accent, color: '#fff',
  border: 'none', borderRadius: 20,
  fontSize: 13, fontWeight: 600, fontFamily: fonts.sans,
  letterSpacing: '0.5px', cursor: 'pointer',
};

const secondaryBtnStyle = {
  padding: '12px 24px',
  background: 'transparent', color: colors.text,
  border: `1px solid ${colors.border}`, borderRadius: 20,
  fontSize: 13, fontWeight: 600, fontFamily: fonts.sans,
  letterSpacing: '0.5px', cursor: 'pointer',
};

const errorBoxStyle = {
  padding: spacing.sm + 'px ' + spacing.md + 'px',
  background: '#FEE2E2', border: '1px solid #FCA5A5',
  borderRadius: radii.md, color: '#991B1B',
  fontFamily: fonts.sans, fontSize: 13,
  marginTop: spacing.md, marginBottom: spacing.md,
};
