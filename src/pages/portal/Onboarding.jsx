import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts, radii, spacing } from '../../theme';
import PhoneInput, { isValidPhone } from '../../components/PhoneInput';
import { LocationsManager } from './Locations'; // EXP2-T02: embedded warehouse step
import { ACCOUNT_TYPE_CARDS, accountTypeCards } from '../../data/accountTypes';
import { useFeePreview, orderIdFromNext } from '../../hooks/useFeePreview';
import FeePreviewLine from '../../components/FeePreviewLine';

/**
 * Onboarding (WIZARD-REDESIGN T05+T06+T07)
 *
 * Steps (derived array, EXP2-T01/T02):
 *   profile    (pre-fills from user.contact_name)
 *   type       (account type)
 *   agreement  (progressive disclosure per checkbox group)
 *   locations  (EXPORTER ONLY, after agreement: register export warehouses —
 *               mandatory, >=1 delivery-capable to continue)
 *   welcome
 *
 * Starting step is derived from the authenticated user:
 *   - fully onboarded (classified + agreement_signed) -> /portal/dashboard
 *   - classified, !agreement_signed, profile_complete -> Step 3
 *   - profile_complete but unclassified                 -> Step 2
 *   - anything else                                     -> Step 1 (Profile)
 *
 * The agreement step pulls /api/public/agreement-template?v3=true so it can
 * render real bundle content per customer_type. Non-EN non-dealer combos
 * get a 409 locale_version_mismatch from the backend; we surface a banner
 * with a "Switch to English" CTA.
 */

const TYPE_LABELS = {
  individual: 'Individual',
  auction_buyer: 'Auction Buyer',
  dealer: 'Auto Dealer',
  exporter: 'Exporter',
};

// AGRINV-T02: these keys are validated server-side against
// db/customer_types.AGREEMENT_TEMPLATE_MAP — a mismatch is a hard HTTP 400
// (portal_onboarding.py:404 template_type_mismatch), so the wizard cannot sign.
// The dealer entry pointed at the SUPERSEDED v0.1 draft file from April until
// AGR-T01 made v1.0 operative on 2026-07-17, which silently broke dealer
// signing through this wizard. tests/unit/test_agreement_template_keys.py now
// fails if the two maps drift again.
const TEMPLATE_KEY_BY_TYPE = {
  individual: 'individual_v1.0.md',
  auction_buyer: 'individual_v1.0.md',
  dealer: 'dealer_agreement_v1.0.md',
  exporter: 'exporter_v1.2.md', // AGR-3-T01: v1.2 in force (ADR-013) — must match AGREEMENT_TEMPLATE_MAP
};

// WAC-T01: the card set + terms come from the shared source of truth
// (data/accountTypes.js) — WAP-T02 merge (Auction Buyer -> Ship My Car),
// EXP1-T05 exporter model copy, and the real dealer terms all live THERE.
// The individual fee line stays dynamic: new-model customers
// (pricing_model='ind_2026') see the formula terms; legacy customers keep
// the $50/$65 wording they signed up under.
const TYPES = ACCOUNT_TYPE_CARDS;

const LOCALE_BLOCK_COPY = {
  en: {
    title: 'Agreement available in English only',
    body: 'The current Y7 Logistics agreement (v2.0) is only available in English. Switch the interface language to English to continue, or contact support if you need a localized copy.',
    cta: 'Switch to English',
  },
  ru: {
    title: 'Договор доступен только на английском',
    body: 'Договор v2.0 доступен только на английском. Переключите язык интерфейса на English, чтобы продолжить, или свяжитесь с поддержкой.',
    cta: 'Переключить на English',
  },
  pl: {
    title: 'Umowa dostępna tylko po angielsku',
    body: 'Umowa v2.0 dostępna tylko po angielsku. Przełącz interfejs na English, aby kontynuować.',
    cta: 'Przełącz na English',
  },
  ua: {
    title: 'Договір доступний лише англійською',
    body: 'Договір v2.0 доступний лише англійською. Переключіть інтерфейс на English, щоб продовжити.',
    cta: 'Переключити на English',
  },
};


// REGC-S13-W07a: type-agnostic onboarding routing helpers. These apply
// uniformly to EVERY classified customer_type (individual, auction_buyer,
// dealer, exporter) — the skip-completed-steps logic is not individual-only.
const isClassifiedType = (t) => !!t && t !== 'unknown' && t !== 'shipper';
// Profile completeness derived from REAL fields (useAuth._normalizeUser never
// sets profile_complete, so that flag is unusable). S4-SMALL-W01 (§3 Option 2):
// the gate is now contact_name + phone only — the delivery address is no longer
// required to enter onboarding (it's collected per-order at order time), so a
// registrant who skipped the optional address lands on Agreement, not Profile.
// Mirrors the relaxed ProfileStep.canSubmit + update-profile backend.
const profileLooksComplete = (u) =>
  !!(u && u.contact_name && u.phone);

// EXP2-T01: the wizard is a DERIVED STEPS ARRAY, not numeric literals.
// Every consumer (render branches, labels, dots, connector, transitions,
// firstIncompleteStep) keys off THIS array, so inserting a conditional step
// can never desync branch numbers vs labels vs dots — the REGC-S13-W06
// step-thrash class dies here. The run-once derivation guard below is
// preserved verbatim in semantics.
//
// EXP2-T02: the exporter warehouse step sits AFTER agreement (Sergii-approved
// position change: the type is only PERSISTED server-side by classify-and-sign,
// so the step's portal_locations calls would 403 before that). `currentStep`
// keeps the step in the array while the user is ON it, so the indicator can't
// desync when has_delivery_locations flips mid-step.
// AGR-2-T01: the warehouse step only belongs to flows that can SIGN — its
// Continue hard-requires >=1 delivery warehouse, which must never become a
// second dead end for an exporter whose agreement is with counsel (they can
// add warehouses any time from the cabinet's Locations page, now readable
// and writable pre-signature). When the exporter document lands
// (agreement_document_available flips true), the step re-engages untouched.
const needsWarehouses = (customerType, user) =>
  customerType === 'exporter'
  && !user?.has_delivery_locations
  && user?.agreement_document_available !== false;
const stepsFor = (customerType, user, currentStep = null) => [
  'profile',
  'type',
  'agreement',
  ...(needsWarehouses(customerType, user) || currentStep === 'locations' ? ['locations'] : []),
  'welcome',
];
// Next step after `key` in `steps` (transitions never hardcode a target
// that could be renumbered by an inserted step).
const nextStep = (steps, key) => steps[steps.indexOf(key) + 1];

// First onboarding step the user still needs (a step KEY, or 'done').
// Same predicate order for all customer types; the warehouse step applies
// only to exporters with no delivery-capable location (so a legacy exporter
// re-entering the wizard lands straight on it).
const firstIncompleteStep = (u) => {
  if (!profileLooksComplete(u)) return 'profile';
  if (!isClassifiedType(u.customer_type)) return 'type';
  // AGR-2-T01: a step that CANNOT be completed is never "incomplete" — an
  // account type with no signable document (exporter until counsel returns,
  // ADR-012) must not be parked on the agreement step forever. Tri-state:
  // only an explicit false skips (stale backends fail open into the step).
  if (!u.agreement_signed && u.agreement_document_available !== false) return 'agreement';
  if (needsWarehouses(u.customer_type, u)) return 'locations';
  return 'done';
};

export default function Onboarding() {
  const { user, checkAuth, loading } = useAuth();
  const navigate = useNavigate();
  // WCF-T02 (F2): honor ?next= — the intent that brought the customer here
  // (e.g. dispatch-details after accepting a quote). Internal portal paths
  // only; everything else falls back to the dashboard.
  const [searchParams] = useSearchParams();
  const rawNext = searchParams.get('next') || '';
  const nextPath = rawNext.startsWith('/portal/') ? rawNext : null;
  const donePath = nextPath || '/portal/dashboard';

  const [step, setStep] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  // REGC-S13-W06: the starting-step derivation must run ONCE. Without this
  // guard the effect re-fires on every `user` reference change — and
  // useAuth._normalizeUser returns a NEW object on every checkAuth() (and never
  // sets profile_complete, so profileComplete is always false) — so after
  // Continue → onCompleted's checkAuth() the effect re-ran and forced
  // setStep(1), fighting onCompleted's setStep(3). That step thrash
  // remounted ProfileStep↔AgreementStep, producing the infinite
  // update-profile/me/agreement-template/sms-consent-text request loop. The
  // guard makes the derivation one-time; thereafter the wizard advances only
  // via user interaction (onCompleted/onSelected/onSigned). W04's skip is
  // preserved — the once-run derivation still sets selectedType + initial step.
  const derivedStartRef = useRef(false);

  // One-time derivation of the starting step from the authenticated user's
  // classification + profile state. After initial setStep the wizard
  // transitions are driven by user interaction.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/portal/login', { replace: true });
      return;
    }
    // REGC-S13-W06/W07a: derive the starting step exactly once (run-once guard
    // avoids the re-fire loop). `loading` gates this until /me has resolved, so
    // `user` here is the RESOLVED user — the route below uses real fields, not
    // the never-set profile_complete flag, and so reacts to the true type.
    if (derivedStartRef.current) return;
    derivedStartRef.current = true;
    // REGC-S13-W07a: route to the first genuinely-incomplete step, for ANY
    // classified type — a classified user with a complete profile skips both
    // Profile and Account-Type and lands on Agreement.
    if (isClassifiedType(user.customer_type)) setSelectedType(user.customer_type);
    const target = firstIncompleteStep(user);
    if (target === 'done') {
      navigate(donePath, { replace: true });  // WCF-T02: honor ?next
      return;
    }
    setStep(target);
  }, [user, loading, navigate, donePath]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (loading || step === null) {
    return (
      <div style={wrapStyle}>
        <div style={{ color: 'var(--v2-ink-muted, #5c5851)', fontFamily: fonts.sans }}>
          Loading...
        </div>
      </div>
    );
  }

  // EXP2-T01: the single source of step order. Derived per render — cheap,
  // and never read inside an effect, so it cannot re-trigger derivation.
  const steps = stepsFor(selectedType || user?.customer_type, user, step);

  return (
    <div style={wrapStyle}>
      <div style={cardStyle}>
        <Header steps={steps} step={step} />

        {/* REGC-S13-W05: light, non-blocking dealer pending-verification note
            (pinned copy). The full order-submit "under review" screen is parked
            CAP-S1 work — this is just a reassuring indication post-signup. */}
        {user?.customer_type === 'dealer' && !user?.agreement_signed && (
          <div style={{
            fontFamily: fonts.sans, fontSize: 13, color: '#0F6E56',
            background: '#F0FAF6', border: '1px solid #0F6E56',
            borderRadius: 8, padding: '10px 12px', marginBottom: 16, lineHeight: 1.5,
          }}>
            Dealer accounts require verification before you can place orders directly.
            You can finish setting up your account now — our team will review your
            dealership and email you once you&rsquo;re approved.
          </div>
        )}

        {step === 'profile' && (
          <ProfileStep
            user={user}
            onCompleted={async () => {
              // REGC-S13-W07a: route from the FRESH user (checkAuth now returns
              // it), not a stale closure — works for every classified type.
              const fresh = (await checkAuth()) || user;
              if (isClassifiedType(fresh?.customer_type)) setSelectedType(fresh.customer_type);
              const target = firstIncompleteStep(fresh);
              if (target === 'done') {
                navigate(donePath, { replace: true });  // WCF-T02: honor ?next
                return;
              }
              setStep(target);
            }}
          />
        )}
        {step === 'type' && (
          <AccountTypeStep
            // [SPRINT-P2b] the order the magic link was minted for, parsed from ?next
            // (decision #5). When present, each card shows the REAL fee for THIS shipment
            // per type from the fee engine; when absent, the generic terms.
            orderId={orderIdFromNext(rawNext)}
            onSelected={(id) => {
              setSelectedType(id);
              // EXP2-T01: transition by array lookup, never a hardcoded target.
              setStep(nextStep(stepsFor(id, user), 'type'));
            }}
          />
        )}
        {step === 'agreement' && selectedType && (
          <AgreementStep
            user={user}
            customerType={selectedType}
            onBack={() => setStep('type')}
            onSigned={async () => {
              const fresh = (await checkAuth()) || user;
              setStep(nextStep(stepsFor(selectedType, fresh), 'agreement'));
            }}
            // AGR-2-T01: a type with no signable document COMPLETES the wizard
            // instead of parking the customer. The fresh /me (post type
            // persist) drives the same array-lookup transition as signing —
            // for a waiting exporter that is 'welcome' (needsWarehouses is
            // false while the document is with counsel).
            onContinueWaiting={async () => {
              const fresh = (await checkAuth()) || user;
              setStep(nextStep(stepsFor(selectedType, fresh), 'agreement'));
            }}
            onEditProfile={() => setStep('profile')}
          />
        )}
        {step === 'locations' && (
          <LocationsStep
            // ACF-T03: the warehouse step only exists for exporters, but the
            // auth context may not have flipped to 'exporter' yet — pass the type
            // the wizard already holds so the Departure Port dropdown renders.
            customerType={selectedType || user?.customer_type}
            onContinue={async () => {
              // Refresh /me so has_delivery_locations is true downstream
              // (NewOrder pre-check, future wizard entries). One-time guard
              // means this cannot re-trigger the start derivation.
              await checkAuth();
              setStep(nextStep(steps, 'locations'));
            }}
          />
        )}
        {step === 'welcome' && (
          <WelcomeStep
            customerType={selectedType}
            name={user?.contact_name || user?.name}
            pendingReview={
              ['dealer', 'exporter'].includes(selectedType) &&
              user?.company_verification_status !== 'verified'
            }
            onComplete={(action) => {
              if (action === 'create_order') navigate('/portal/new-order');
              else if (action === 'application') navigate('/portal/application');
              else navigate(donePath);  // WCF-T02: back to the interrupted step
            }}
          />
        )}
      </div>
    </div>
  );
}


// ---------------------------------------------------------------------------
// Header with 4-step indicator (T07)
// ---------------------------------------------------------------------------

// EXP2-T01: labels keyed by step KEY — dots/connector/numbers derive from the
// steps array itself, so an inserted step can never desync the indicator.
const STEP_LABELS = {
  profile: 'Profile',
  type: 'Account type',
  agreement: 'Review and sign',
  locations: 'Export warehouses', // EXP2-T02 (exporter only)
  welcome: 'Complete',
};

// ---------------------------------------------------------------------------
// EXP2-T02 — LocationsStep (exporter only): register every export warehouse.
// Embeds the shared LocationsManager (same form/CRUD as /portal/locations,
// port dropdown included); Continue unlocks at >=1 delivery-capable location.
// ---------------------------------------------------------------------------

function LocationsStep({ onContinue, customerType = null }) {
  const [locations, setLocations] = useState([]);
  const [advancing, setAdvancing] = useState(false);
  const deliveryCapable = locations.filter(
    l => !l.deactivated_at && ['delivery', 'both'].includes(l.usage_role)
  ).length;
  const canContinue = deliveryCapable >= 1;

  return (
    <div>
      <h2 style={stepTitleStyle}>Register your export warehouses</h2>
      <p style={stepSubtitleStyle}>
        Add every export warehouse you have a contract with — address, contact,
        hours, special instructions, and the departure port. Y7 assigns each
        shipment to the optimal one, so your directory must be complete before
        your first order. You can add more later under Saved Locations.
      </p>
      <LocationsManager onLocationsChange={setLocations} customerType={customerType} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: spacing.md }}>
        <button
          type="button"
          disabled={!canContinue || advancing}
          onClick={async () => {
            if (!canContinue || advancing) return;
            setAdvancing(true);
            try { await onContinue(); } finally { setAdvancing(false); }
          }}
          style={{
            ...primaryBtnStyle,
            opacity: !canContinue || advancing ? 0.5 : 1,
            cursor: !canContinue || advancing ? 'not-allowed' : 'pointer',
          }}
        >
          {canContinue
            ? (advancing ? 'Continuing…' : `Continue (${deliveryCapable} warehouse${deliveryCapable === 1 ? '' : 's'})`)
            : 'Add at least one delivery warehouse to continue'}
        </button>
      </div>
    </div>
  );
}

function Header({ steps, step }) {
  const current = steps.indexOf(step);
  return (
    <div style={{ marginBottom: spacing.lg }}>
      <h1 style={{
        fontFamily: 'var(--v2-font-display, Oswald, system-ui)',
        textTransform: 'uppercase', fontSize: 26, fontWeight: 600,
        letterSpacing: '0.01em', lineHeight: 1.05,
        color: 'var(--v2-ink, #050607)', margin: 0, marginBottom: spacing.xs,
      }}>
        Complete your account setup
      </h1>
      <p style={{
        fontFamily: fonts.sans, fontSize: 14, color: 'var(--v2-ink-muted, #5c5851)',
        margin: 0, marginBottom: spacing.md, lineHeight: 1.5,
      }}>
        Tell us who you are, pick your account type, and sign the
        transport agreement. About two minutes.
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap',
        gap: spacing.xs, marginBottom: spacing.sm,
      }}>
        {steps.map((key, i) => (
          <div key={key} style={{
            display: 'flex', alignItems: 'center', flex: '0 0 auto',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              border: `2px solid ${current >= i ? 'var(--v2-ink, #050607)' : 'var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))'}`,
              background: current >= i ? 'var(--v2-ink, #050607)' : 'transparent',
              color: current >= i ? '#fff7ed' : 'var(--v2-ink-muted, #5c5851)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: fonts.sans, fontSize: 13, fontWeight: 600,
            }}>
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: 32, height: 2,
                background: current > i ? 'var(--v2-ink, #050607)' : 'var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
                margin: `0 ${spacing.xs}px`,
              }} />
            )}
          </div>
        ))}
        <div style={{
          marginLeft: spacing.sm,
          fontFamily: fonts.sans, fontSize: 12, color: 'var(--v2-ink-muted, #5c5851)',
        }}>
          {STEP_LABELS[step]}
        </div>
      </div>
    </div>
  );
}


// ---------------------------------------------------------------------------
// Step 1 - ProfileStep (T05)
// ---------------------------------------------------------------------------

function ProfileStep({ user, onCompleted }) {
  const [form, setForm] = useState({
    contact_name: user?.contact_name || user?.name || '',
    phone: user?.phone || '',
    company_name: user?.company_name || '',
    delivery_address: user?.delivery_address || '',
    delivery_city: user?.delivery_city || '',
    delivery_state: user?.delivery_state || '',
    delivery_zip: user?.delivery_zip || '',
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [consentText, setConsentText] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // REGC-S13-W07b: portalFetch so it reaches the API origin (was a raw
    // relative fetch hitting the SPA origin). Stays tolerant — a non-JSON body
    // degrades to empty consent text rather than throwing.
    portalFetch('/api/portal/data/sms-consent-text')
      .then(r => (r.ok && (r.headers.get('content-type') || '').includes('application/json')) ? r.json() : { text: '' })
      .then(data => setConsentText(data.text || ''))
      .catch(() => {});
  }, []);

  const [phoneValid, setPhoneValid] = useState(() => isValidPhone(form.phone));

  // S4-SMALL-W01 (§3 Option 2): address is optional — only contact_name + phone
  // gate the Profile step, matching the relaxed update-profile backend.
  const canSubmit =
    form.contact_name.trim().length >= 2 &&
    form.phone.length > 0 && phoneValid;

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e?.preventDefault?.();
    setError(null);
    setSaving(true);
    try {
      const res = await portalFetch('/api/portal/onboarding/update-profile', {
        method: 'POST',
        body: JSON.stringify({ ...form, sms_consent: smsConsent }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        onCompleted();
        return;
      }
      const detail = data?.detail || data;
      const code = detail?.error;
      if (code === 'phone_in_use') {
        setError('That phone number is already on another Y7 account. Please use a different number.');
      } else if (code === 'phone_invalid') {
        setError('Phone number is not valid. Use international format, e.g. +1 555 555 1212.');
      } else {
        setError(detail?.message || detail?.error || 'Could not save profile');
      }
    } catch (err) {
      setError(err?.message || 'Network error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={stepTitleStyle}>Tell us about yourself</h2>
      <p style={stepSubtitleStyle}>
        We use this on your dispatch orders and on the agreement you'll
        sign in the next step.
      </p>

      {error && <div style={errorBoxStyle}>{error}</div>}

      <Field
        label="Your full legal name"
        value={form.contact_name}
        onChange={v => set('contact_name', v)}
        placeholder="e.g. John Smith"
        required
        autoFocus
      />
      <div style={{ marginBottom: spacing.md }}>
        <label style={{
          display: 'block', fontFamily: fonts.sans, fontSize: 13,
          fontWeight: 600, color: 'var(--v2-ink, #050607)', marginBottom: spacing.xs,
        }}>
          Phone number *
        </label>
        <PhoneInput
          value={form.phone}
          onChange={v => set('phone', v)}
          onValidChange={setPhoneValid}
          required
          style={{
            width: '100%', padding: '10px 12px',
            fontSize: 16, fontFamily: fonts.sans, // >=16px avoids iOS focus-zoom
            border: '1px solid rgba(5, 6, 7, 0.3)',
            borderRadius: radii.md,
            background: 'var(--v2-card-cream, #fffaf1)',
            color: 'var(--v2-ink, #050607)',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <Field
        label="Company name (optional)"
        value={form.company_name}
        onChange={v => set('company_name', v)}
      />

      {/* S4-SMALL-W01 (§3 Option 2): the whole delivery-address block is now
          optional here — collected per-order at order time. No required markers. */}
      <h3 style={subSectionTitleStyle}>Primary delivery address (optional)</h3>
      <Field
        label="Street address"
        value={form.delivery_address}
        onChange={v => set('delivery_address', v)}
      />
      <Field
        label="City"
        value={form.delivery_city}
        onChange={v => set('delivery_city', v)}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md }}>
        <Field
          label="State"
          value={form.delivery_state}
          onChange={v => set('delivery_state', v)}
          placeholder="CA"
          maxLength={2}
        />
        <Field
          label="ZIP"
          value={form.delivery_zip}
          onChange={v => set('delivery_zip', v)}
          placeholder="90001"
          maxLength={10}
        />
      </div>

      <div style={{
        marginTop: spacing.lg, padding: spacing.md,
        background: 'rgba(5, 6, 7, 0.04)',
        border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
        borderRadius: radii.md,
      }}>
        <label style={{
          display: 'flex', alignItems: 'flex-start', gap: spacing.sm,
          cursor: 'pointer', fontFamily: fonts.sans,
        }}>
          <input
            type="checkbox"
            checked={smsConsent}
            onChange={e => setSmsConsent(e.target.checked)}
            style={{ marginTop: 4, width: 16, height: 16, flexShrink: 0, accentColor: 'var(--v2-red, #d70f24)' }}
          />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--v2-ink, #050607)', marginBottom: 4 }}>
              Get text updates about your shipment
            </div>
            <div style={{ fontSize: 12, color: 'var(--v2-ink-muted, #5c5851)', lineHeight: 1.5 }}>
              {consentText || 'Y7 Logistics will text you about your shipment. Reply STOP to opt out. Msg & data rates may apply.'}
            </div>
          </div>
        </label>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'flex-end',
        marginTop: spacing.lg, gap: spacing.sm,
      }}>
        <button
          type="submit"
          disabled={!canSubmit || saving}
          style={{
            ...primaryBtnStyle,
            opacity: canSubmit && !saving ? 1 : 0.45,
            cursor: canSubmit && !saving ? 'pointer' : 'not-allowed',
          }}
        >
          {saving ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </form>
  );
}


function Field({ label, value, onChange, placeholder, required, type = 'text', autoFocus, maxLength }) {
  return (
    <div style={{ marginBottom: spacing.md }}>
      <label style={{
        display: 'block', fontFamily: fonts.sans, fontSize: 13,
        fontWeight: 600, color: 'var(--v2-ink, #050607)', marginBottom: spacing.xs,
      }}>
        {label}{required ? ' *' : ''}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        maxLength={maxLength}
        style={{
          width: '100%', padding: '10px 12px',
          fontSize: 16, fontFamily: fonts.sans, // >=16px avoids iOS focus-zoom
          border: '1px solid rgba(5, 6, 7, 0.3)',
          borderRadius: radii.md,
          background: 'var(--v2-card-cream, #fffaf1)',
          color: 'var(--v2-ink, #050607)',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}


// ---------------------------------------------------------------------------
// Step 2 - AccountTypeStep
// ---------------------------------------------------------------------------

function AccountTypeStep({ onSelected, orderId = null }) {
  const [focused, setFocused] = useState(null);
  const { user } = useAuth();
  // [SPRINT-P2b] When the customer arrived to classify a specific order (via the magic
  // link's ?next), price THAT shipment per type from the fee engine — the real dollar
  // figure, not the generic formula. No order in context -> idle -> generic terms below.
  const { state: feeState, previews } = useFeePreview(orderId);
  const hasLiveFee = feeState === 'loading' || feeState === 'ok' || feeState === 'error';
  // B2B-T04: terms are tracked separately from capabilities so only the
  // commercial lines take the hover accent. Resolved for THIS viewer's pricing
  // model, so an unmigrated legacy dealer is not shown the 2026 terms.
  const viewerCards = accountTypeCards(user?.pricing_model);
  const cardTerms = (t) => viewerCards.find((c) => c.id === t.id)?.terms || [];
  // With a live per-order fee, the generic hardcoded terms are suppressed (the number
  // replaces them) — showing both would put a formula next to its own resolved figure and
  // re-introduce two sources. The capability bullets always stay.
  const cardBenefits = (t) => (hasLiveFee ? t.benefits : [...t.benefits, ...cardTerms(t)]);
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
            className="acct-type-card"
            onClick={() => onSelected(t.id)}
            onFocus={() => setFocused(t.id)}
            onBlur={() => setFocused(null)}
            style={{
              padding: spacing.md,
              border: `2px solid ${focused === t.id ? 'var(--v2-red, #d70f24)' : 'var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))'}`,
              borderRadius: radii.lg,
              background: 'var(--v2-card-cream, #fffaf1)',
              cursor: 'pointer', textAlign: 'left',
              fontFamily: fonts.sans,
              transition: 'all 150ms ease',
              boxShadow: focused === t.id
                ? '0 0 0 3px rgba(215, 15, 36, 0.15)'
                : 'none',
            }}
          >
            <div style={{
              fontFamily: 'var(--v2-font-display, Oswald, system-ui)',
              textTransform: 'uppercase', fontSize: 18, fontWeight: 600,
              letterSpacing: '0.01em', lineHeight: 1.05,
              color: 'var(--v2-ink, #050607)', marginBottom: 4,
            }}>
              {t.title}
            </div>
            <div style={{
              fontSize: 13, color: 'var(--v2-ink-muted, #5c5851)', marginBottom: spacing.sm,
            }}>
              {t.description}
            </div>
            <ul style={{
              margin: 0, padding: '0 0 0 16px', fontSize: 12,
              color: 'var(--v2-ink-muted, #5c5851)', lineHeight: 1.7,
            }}>
              {cardBenefits(t).map((b, i) => (
                <li key={i} className={cardTerms(t).includes(b) ? 'acct-type-terms' : undefined}>
                  {b}
                </li>
              ))}
            </ul>
            {/* [SPRINT-P2b] the real fee for THIS shipment under this type, from the
                engine — replaces the generic terms when an order is in context. */}
            {hasLiveFee && (
              <FeePreviewLine state={feeState} preview={previews?.[t.id]} />
            )}
            {t.note && (
              <div style={{
                marginTop: spacing.sm, fontSize: 12, fontWeight: 600,
                color: 'var(--v2-ink, #050607)', lineHeight: 1.5,
              }}>
                {t.note}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}


// ---------------------------------------------------------------------------
// Step 3 - AgreementStep (T06)
//
// Fetches /api/public/agreement-template?v3=true and renders one card
// per checkbox group with progressive disclosure: each card shows the
// sections that the checkbox covers + the checkbox itself; subsequent
// cards stay locked until the previous box is checked. The signer name
// is pulled from user.contact_name (read-only).
// ---------------------------------------------------------------------------

function AgreementStep({ user, customerType, onBack, onSigned, onContinueWaiting, onEditProfile }) {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'en').slice(0, 2).toLowerCase();
  const effectiveLang = ['en', 'ru', 'pl', 'ua'].includes(lang) ? lang : 'en';

  const [template, setTemplate] = useState(null);
  const [loadState, setLoadState] = useState('loading'); // 'loading' | 'ok' | 'locale_blocked' | 'being_prepared' | 'error'
  const [errorMsg, setErrorMsg] = useState(null);
  const [checked, setChecked] = useState({}); // checkbox id -> bool
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  // ESIGN-MECHANICS: discrete UETA electronic-consent, unticked by default.
  const [eConsent, setEConsent] = useState(false);
  // AGR-2-T01: the being-prepared screen has an EXIT now.
  const [advancing, setAdvancing] = useState(false);
  const [advanceError, setAdvanceError] = useState(null);
  // AGR-3-T02: fields the party-interpolated document still needs.
  const [missingParty, setMissingParty] = useState([]);

  // AGR-2-T01: leaving the wizard through the being-prepared state must
  // survive a reload — persist the classification the customer chose (the
  // sign endpoint, which normally persists it, refuses this type). Uses the
  // existing cabinet change-type endpoint; no signature is involved.
  async function continueWaiting() {
    if (advancing) return;
    setAdvancing(true);
    setAdvanceError(null);
    try {
      if ((user?.customer_type || 'unknown') !== customerType) {
        const r = await portalFetch('/api/portal/data/customer-type', {
          method: 'PATCH',
          body: JSON.stringify({ customer_type: customerType }),
        });
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          throw new Error(d.detail?.message || 'Could not save your account type — please try again.');
        }
      }
      await onContinueWaiting();
    } catch (e) {
      setAdvanceError(e?.message || 'Something went wrong — please try again.');
      setAdvancing(false);
    }
  }

  useEffect(() => {
    let alive = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadState('loading');
    setErrorMsg(null);
    (async () => {
      try {
        // REGC-S13-W07b: go through portalFetch so the call hits the API origin
        // (API_URL), not the SPA origin. A raw relative fetch returned the SPA
        // index.html → "Unexpected token '<'" on JSON.parse. Path/query unchanged.
        const r = await portalFetch(
          `/api/public/agreement-template?type=${encodeURIComponent(customerType)}&lang=${encodeURIComponent(effectiveLang)}&v3=true`
        );
        if (r.status === 409) {
          // Three distinct 409s: a locale gap (switch to English), "no
          // approved document for this type", and — AGR-3-T02 — the
          // party-interpolated document refusing to render over blanks
          // (missing company/billing facts), with the fields NAMED.
          let payload = null;
          try { payload = await r.json(); } catch { /* non-JSON 409 */ }
          if (alive) {
            if (payload?.error === 'party_data_required') {
              setMissingParty(payload.missing || []);
              setLoadState('party_data_required');
            } else {
              setLoadState(payload?.error === 'agreement_being_prepared' ? 'being_prepared' : 'locale_blocked');
            }
          }
          return;
        }
        if (!r.ok) {
          if (alive) {
            setErrorMsg(`Could not load agreement (HTTP ${r.status})`);
            setLoadState('error');
          }
          return;
        }
        // REGC-S13-W07b: guard against an HTML (SPA-fallback) body reaching
        // JSON.parse — surface a clean error instead of "Unexpected token '<'".
        const contentType = r.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          if (alive) {
            setErrorMsg("Couldn't load the agreement — please try again.");
            setLoadState('error');
          }
          return;
        }
        const data = await r.json();
        if (alive) {
          setTemplate(data);
          setLoadState('ok');
          setChecked({});
        }
      } catch (e) {
        if (alive) {
          setErrorMsg(e?.message || 'Network error');
          setLoadState('error');
        }
      }
    })();
    return () => { alive = false; };
  }, [customerType, effectiveLang]);

  // Section lookup by id for fast rendering inside each checkbox card.
  const sectionsById = useMemo(() => {
    const map = {};
    if (template?.sections) {
      for (const s of template.sections) map[s.id] = s;
    }
    return map;
  }, [template]);

  function handleSwitchToEnglish() {
    try {
      i18n.changeLanguage('en');
      window.localStorage?.setItem('y7_lang', 'en');
    } catch { /* storage unavailable - just changeLanguage runtime */ }
  }

  if (loadState === 'loading') {
    return (
      <div>
        <h2 style={stepTitleStyle}>Review and sign — {TYPE_LABELS[customerType]}</h2>
        <p style={{ ...stepSubtitleStyle, marginTop: spacing.md }}>Loading agreement...</p>
      </div>
    );
  }

  if (loadState === 'party_data_required') {
    // AGR-3-T02: the agreement names your company in its body — it refuses
    // to render over blanks. Say which facts are missing and who fills them.
    const FIELD_LABELS = {
      company_name: 'legal company name',
      billing_address: 'billing address',
      contact_name: 'contact name',
      phone: 'phone',
      email: 'email',
    };
    const labels = missingParty.map((f) => FIELD_LABELS[f] || f);
    return (
      <div>
        <h2 style={stepTitleStyle}>Almost there — the agreement names your company</h2>
        <p style={stepSubtitleStyle}>
          Your {TYPE_LABELS[customerType] || customerType} agreement states your company
          details in its text, and {labels.length === 1 ? 'this detail is' : 'these details are'} not
          on file yet: <strong>{labels.join(', ')}</strong>.
        </p>
        <p style={stepSubtitleStyle}>
          Contact details you can update on your profile. Company and billing details are
          confirmed with Y7 — contact us and we&rsquo;ll complete them together; the moment
          they are on file, the document renders here ready to sign.
        </p>
        <div style={{ display: 'flex', gap: spacing.sm, marginTop: spacing.md }}>
          <button type="button" onClick={onBack} style={secondaryBtnStyle}>Back</button>
          {onContinueWaiting && (
            <button type="button" onClick={() => onContinueWaiting()} style={primaryBtnStyle}>
              Continue to my account
            </button>
          )}
        </div>
      </div>
    );
  }

  if (loadState === 'being_prepared') {
    // ACC-1-T01: honest waiting state — there is no document to show or sign.
    // AGR-2-T03: the screen now tells the WHOLE truth, distinguishing the two
    // situations whose next action differs: the customer's own data is
    // incomplete (name the fields, theirs to fill) vs the document is with
    // counsel (nothing required of them; here is what they can do meanwhile).
    // AGR-2-T01: and it is never a dead end — Continue completes the wizard.
    // The /me readiness list is computed for the ROW's persisted type — only
    // trust it (in EITHER direction) when that matches the type on display; a
    // fresh wizard selection isn't persisted until Continue, and claiming
    // "your details are complete" against the wrong required set would be a
    // lie. Until the type lands, show the counsel notice alone.
    const readinessKnown = user?.customer_type === customerType;
    const missing = (readinessKnown ? user?.agreement_missing_fields : null) || [];
    const selfKeys = ['contact_name', 'phone', 'email'];
    const selfMissing = missing.filter((m) => selfKeys.includes(m.field));
    const companyMissing = missing.filter((m) => !selfKeys.includes(m.field));
    const noteBox = (bg, border, color) => ({
      fontFamily: fonts.sans, fontSize: 14, lineHeight: 1.6, color,
      background: bg, border: `1px solid ${border}`, borderRadius: 8,
      padding: '12px 14px', marginTop: spacing.md, textAlign: 'left',
    });
    return (
      <div>
        <h2 style={stepTitleStyle}>Your agreement is being prepared</h2>
        <p style={stepSubtitleStyle}>
          The {TYPE_LABELS[customerType] || customerType} agreement is being reviewed by our
          legal team. Nothing needs to be signed right now — Y7 will contact you to complete
          onboarding, and the document becomes available to sign here automatically the moment
          it is approved.
        </p>
        {missing.length > 0 ? (
          <div style={noteBox('#FFFBEB', '#FDE68A', '#92400E')}>
            <strong>So it is ready to sign the moment it arrives:</strong>
            {selfMissing.length > 0 && (
              <div style={{ marginTop: 6 }}>
                Please add your {selfMissing.map((m) => m.label.toLowerCase()).join(', ')} —
                you can do that right now from your profile.
              </div>
            )}
            {companyMissing.length > 0 && (
              <div style={{ marginTop: 6 }}>
                Y7 still needs your {companyMissing.map((m) => m.label.toLowerCase()).join(', ')};
                we&rsquo;ll collect {companyMissing.length === 1 ? 'it' : 'these'} with you while
                completing onboarding — nothing to do on your side.
              </div>
            )}
          </div>
        ) : readinessKnown ? (
          <div style={noteBox('#F0FAF6', '#0F6E56', '#0F6E56')}>
            Your details are complete. There is nothing you need to fill in — once the
            document is approved, it will be waiting here for your signature.
          </div>
        ) : null}
        <div style={noteBox('#F8F7F4', '#E5E2DB', '#5c5851')}>
          <strong>Meanwhile you can:</strong> send us your orders by email exactly as before,
          review and update your profile, and add your warehouses under Locations — everything
          except signing works today.
        </div>
        {advanceError && (
          <div style={noteBox('#FDF2F2', '#E5B4B4', '#9B1C1C')}>{advanceError}</div>
        )}
        <div style={{ display: 'flex', gap: spacing.sm, marginTop: spacing.md }}>
          <button type="button" onClick={onBack} style={secondaryBtnStyle}>Back</button>
          {selfMissing.length > 0 && onEditProfile && (
            <button type="button" onClick={onEditProfile} style={secondaryBtnStyle}>
              Update my details
            </button>
          )}
          <button type="button" onClick={continueWaiting} disabled={advancing} style={primaryBtnStyle}>
            {advancing ? 'Continuing…' : 'Continue to my account'}
          </button>
        </div>
      </div>
    );
  }

  if (loadState === 'locale_blocked') {
    const copy = LOCALE_BLOCK_COPY[effectiveLang] || LOCALE_BLOCK_COPY.en;
    return (
      <div>
        <h2 style={stepTitleStyle}>{copy.title}</h2>
        <p style={stepSubtitleStyle}>{copy.body}</p>
        <div style={{ display: 'flex', gap: spacing.sm, marginTop: spacing.md }}>
          <button type="button" onClick={onBack} style={secondaryBtnStyle}>Back</button>
          <button type="button" onClick={handleSwitchToEnglish} style={primaryBtnStyle}>
            {copy.cta}
          </button>
        </div>
      </div>
    );
  }

  if (loadState === 'error' || !template) {
    return (
      <div>
        <h2 style={stepTitleStyle}>Review and sign — {TYPE_LABELS[customerType]}</h2>
        <div style={errorBoxStyle}>{errorMsg || 'Unable to load agreement.'}</div>
        <div style={{ display: 'flex', gap: spacing.sm, marginTop: spacing.md }}>
          <button type="button" onClick={onBack} style={secondaryBtnStyle}>Back</button>
        </div>
      </div>
    );
  }

  const allChecked = template.checkboxes.every(cb => !!checked[cb.id]);
  const canSign = allChecked && eConsent;
  const profileName = user?.contact_name || user?.name || '';

  async function handleSubmit() {
    if (!canSign || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await portalFetch('/api/portal/onboarding/classify-and-sign', {
        method: 'POST',
        body: JSON.stringify({
          customer_type: customerType,
          agreement_template_key: TEMPLATE_KEY_BY_TYPE[customerType],
          agreement_version: template.version,
          // No signature_name — backend pulls it from customer.contact_name.
          section_acknowledgements: template.checkboxes.flatMap(cb =>
            cb.covers_sections.map(sid => ({
              section_id: sid,
              checked: !!checked[cb.id],
            }))
          ),
          html_snapshot: template.full_html,
          language: template.lang,
          signed_channel: 'web',
          bundle_shape: template.bundle_shape,
          e_consent: eConsent,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        onSigned();
        return;
      }
      const detail = data?.detail || data;
      const code = detail?.error;
      if (code === 'profile_incomplete') {
        // ACC-1-T03: the server names every blank field the agreement's
        // counterparty identification needs — show them, don't paraphrase.
        const fields = Array.isArray(detail.missing)
          ? detail.missing.map(m => m.label || m.field).join(', ')
          : '';
        setSubmitError(
          fields
            ? `Please go back and complete your profile before signing. Missing: ${fields}.`
            : 'Please go back and complete your profile before signing.'
        );
      } else if (code === 'signer_name_mismatch') {
        setSubmitError(`Signature name must match your profile (${detail.expected || profileName}).`);
      } else {
        setSubmitError(detail?.message || code || 'Sign failed');
      }
    } catch (e) {
      setSubmitError(e?.message || 'Network error');
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
        Read each section, then check the box at the bottom of each card to
        confirm your understanding. You'll sign as{' '}
        <strong>{profileName || 'your profile name'}</strong>.
      </p>

      {/* FX-1: the client-facing draft/evaluation banner is intentionally
          removed — this is a binding, operative agreement. Any version/draft
          marker is kept internal-only (backend `version` field), never shown
          to the signer. */}

      {template.checkboxes.map((cb, idx) => {
        const prev = template.checkboxes[idx - 1];
        const isUnlocked = idx === 0 || !!checked[prev?.id];
        const isChecked = !!checked[cb.id];
        const coverSections = cb.covers_sections
          .map(id => sectionsById[id])
          .filter(Boolean);

        if (!isUnlocked) {
          return (
            <LockedCard
              key={cb.id}
              number={coverSections[0]?.number ?? idx + 1}
              title={coverSections[0]?.title || 'Section locked'}
            />
          );
        }

        return (
          <section key={cb.id} style={sectionCardStyle}>
            {coverSections.map(s => (
              <div key={s.id} style={{ marginBottom: spacing.md }}>
                <h3 style={sectionHeadingStyle}>
                  {s.number}. {s.title}
                </h3>
                <div
                  style={sectionBodyStyle}
                  dangerouslySetInnerHTML={{ __html: s.html }}
                />
              </div>
            ))}

            <label style={{
              display: 'flex', alignItems: 'flex-start', gap: spacing.sm,
              padding: spacing.sm,
              borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
              marginTop: spacing.md, paddingTop: spacing.md,
              cursor: 'pointer',
              fontFamily: fonts.sans, fontSize: 13, color: 'var(--v2-ink, #050607)',
              lineHeight: 1.5,
            }}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setChecked({ ...checked, [cb.id]: e.target.checked })}
                style={{ marginTop: 2, accentColor: 'var(--v2-red, #d70f24)' }}
              />
              <span><strong>{cb.label}</strong></span>
            </label>
          </section>
        );
      })}

      {/* ESIGN-MECHANICS: discrete UETA electronic-consent — unticked by default,
          required to enable Sign. */}
      <label style={{
        display: 'flex', alignItems: 'flex-start', gap: spacing.sm,
        marginTop: spacing.md, paddingTop: spacing.md,
        borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
        cursor: 'pointer', fontFamily: fonts.sans, fontSize: 13,
        color: 'var(--v2-ink, #050607)', lineHeight: 1.5,
      }}>
        <input
          type="checkbox"
          checked={eConsent}
          onChange={(e) => setEConsent(e.target.checked)}
          style={{ marginTop: 2, accentColor: 'var(--v2-red, #d70f24)' }}
        />
        <span>
          I agree to conduct business electronically and to sign this agreement
          electronically.
        </span>
      </label>

      <div style={signerBlockStyle}>
        <h3 style={{ ...sectionHeadingStyle, marginTop: 0 }}>Your signature</h3>
        <p style={{ margin: 0, fontFamily: fonts.sans, fontSize: 14, color: 'var(--v2-ink, #050607)' }}>
          I, <strong>{profileName}</strong>, agree to the terms above.
        </p>
        <p style={{
          margin: `${spacing.xs}px 0 0`, fontFamily: fonts.sans,
          fontSize: 12, color: 'var(--v2-ink-muted, #5c5851)',
        }}>
          Signed on {new Date().toLocaleDateString()}. To change the
          name on this signature, update your profile.
        </p>
      </div>

      {submitError && <div style={errorBoxStyle}>{submitError}</div>}

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
          disabled={!canSign || submitting}
          style={{
            ...primaryBtnStyle,
            opacity: canSign && !submitting ? 1 : 0.45,
            cursor: canSign && !submitting ? 'pointer' : 'not-allowed',
          }}
        >
          {submitting ? 'Signing...' : 'Sign agreement'}
        </button>
      </div>
    </div>
  );
}


function LockedCard({ number, title }) {
  return (
    <div style={{
      ...sectionCardStyle,
      opacity: 0.55,
      background: 'rgba(5, 6, 7, 0.04)',
    }}>
      <h3 style={{ ...sectionHeadingStyle, color: 'var(--v2-ink-muted, #5c5851)' }}>
        {number}. {title}{' '}
        <span style={{ marginLeft: spacing.sm, fontSize: 13 }}>(locked)</span>
      </h3>
      <p style={{
        margin: 0, fontFamily: fonts.sans, fontSize: 13,
        color: 'var(--v2-ink-muted, #5c5851)',
      }}>
        Confirm the previous section to unlock this one.
      </p>
    </div>
  );
}


// ---------------------------------------------------------------------------
// Step 4 - WelcomeStep
// ---------------------------------------------------------------------------

function WelcomeStep({ customerType, name, pendingReview, onComplete }) {
  // AQ-3: honest copy. A dealer/exporter registration is an APPLICATION, not an
  // instant active account — do NOT claim "your account is active" while the
  // backend has them pending_review + trial-capped + gated. Show the truth and
  // route them to complete their application.
  const label = TYPE_LABELS[customerType] || customerType;
  return (
    <div style={{ textAlign: 'center', padding: spacing.md + 'px 0' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: pendingReview ? 'rgba(5, 6, 7, 0.04)' : colors.successBg,
        color: pendingReview ? 'var(--v2-ink, #050607)' : colors.success,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto ' + spacing.md + 'px',
      }}>
        {pendingReview ? (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <h2 style={{
        fontFamily: 'var(--v2-font-display, Oswald, system-ui)',
        textTransform: 'uppercase', fontSize: 24, fontWeight: 600,
        letterSpacing: '0.01em', lineHeight: 1.05,
        color: 'var(--v2-ink, #050607)',
        margin: 0, marginBottom: spacing.xs,
      }}>
        {pendingReview ? 'Application submitted' : `Welcome${name ? `, ${name}` : ''}.`}
      </h2>
      {pendingReview ? (
        <>
          <p style={{
            fontFamily: fonts.sans, fontSize: 15, color: 'var(--v2-ink-muted, #5c5851)',
            margin: 0, marginBottom: spacing.md,
          }}>
            Thanks{name ? `, ${name}` : ''}. We'll review your <strong>{label}</strong>{' '}
            details and set up a call to activate your account.
          </p>
          <p style={{
            fontFamily: fonts.sans, fontSize: 13, color: 'var(--v2-ink-muted, #5c5851)',
            background: 'rgba(5, 6, 7, 0.04)',
            border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
            padding: spacing.sm + 'px ' + spacing.md + 'px',
            borderRadius: radii.md, display: 'inline-block',
            marginBottom: spacing.lg,
          }}>
            Meanwhile you can request up to <strong>3 quotes</strong>. Direct orders open
            once Y7 activates your account.
          </p>
          <div style={{
            display: 'flex', gap: spacing.sm, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <button type="button" onClick={() => onComplete('application')} style={primaryBtnStyle}>
              Complete your application
            </button>
            <button type="button" onClick={() => onComplete('create_order')} style={secondaryBtnStyle}>
              Request a quote
            </button>
          </div>
        </>
      ) : (
        <>
          <p style={{
            fontFamily: fonts.sans, fontSize: 15, color: 'var(--v2-ink-muted, #5c5851)',
            margin: 0, marginBottom: spacing.md,
          }}>
            Your <strong>{label}</strong> account is active.
          </p>
          <p style={{
            fontFamily: fonts.sans, fontSize: 13, color: 'var(--v2-ink-muted, #5c5851)',
            background: 'rgba(5, 6, 7, 0.04)',
            border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
            padding: spacing.sm + 'px ' + spacing.md + 'px',
            borderRadius: radii.md, display: 'inline-block',
            marginBottom: spacing.lg,
          }}>
            A copy of the signed agreement is on its way to your email.
          </p>
          <div style={{
            display: 'flex', gap: spacing.sm, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <button type="button" onClick={() => onComplete('create_order')} style={primaryBtnStyle}>
              Submit your first quote
            </button>
            <button type="button" onClick={() => onComplete('dashboard')} style={secondaryBtnStyle}>
              Go to dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
}


// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const wrapStyle = {
  minHeight: '100vh',
  padding: spacing.lg,
  background: 'var(--v2-paper, #f4f0e8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: spacing.xl,
};

const cardStyle = {
  width: '100%',
  maxWidth: 760,
  background: 'var(--v2-card-cream, #fffaf1)',
  border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
  borderRadius: 18,
  padding: spacing.xl,
  boxShadow: '0 4px 16px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)',
};

const stepTitleStyle = {
  fontFamily: 'var(--v2-font-display, Oswald, system-ui)',
  textTransform: 'uppercase', fontSize: 20, fontWeight: 600,
  letterSpacing: '0.01em', lineHeight: 1.05,
  color: 'var(--v2-ink, #050607)',
  margin: 0, marginBottom: 4,
};

const stepSubtitleStyle = {
  fontFamily: fonts.sans, fontSize: 13, color: 'var(--v2-ink-muted, #5c5851)',
  margin: 0, marginBottom: 16, lineHeight: 1.5,
};

const subSectionTitleStyle = {
  fontFamily: 'var(--v2-font-display, Oswald, system-ui)',
  textTransform: 'uppercase', fontSize: 16, fontWeight: 600,
  letterSpacing: '0.01em', lineHeight: 1.05,
  color: 'var(--v2-ink, #050607)',
  margin: `${spacing.lg}px 0 ${spacing.sm}px`,
};

const sectionCardStyle = {
  border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
  borderRadius: 12,
  padding: spacing.md,
  marginBottom: spacing.md,
  background: 'var(--v2-card-cream, #fffaf1)',
};

const sectionHeadingStyle = {
  fontFamily: 'var(--v2-font-display, Oswald, system-ui)',
  textTransform: 'uppercase', fontSize: 15, fontWeight: 600,
  letterSpacing: '0.01em', lineHeight: 1.05,
  color: 'var(--v2-ink, #050607)', margin: `0 0 ${spacing.sm}px 0`,
};

const sectionBodyStyle = {
  fontFamily: fonts.sans, fontSize: 13, color: 'var(--v2-ink, #050607)',
  lineHeight: 1.65,
};

const signerBlockStyle = {
  marginTop: spacing.lg,
  padding: spacing.md,
  background: 'rgba(5, 6, 7, 0.04)',
  border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
  borderRadius: 12,
};

const primaryBtnStyle = {
  padding: '12px 24px',
  background: 'var(--v2-red-gradient, linear-gradient(135deg, #d70f24, #a90918))',
  color: '#fff7ed',
  border: 'none', borderRadius: 8,
  fontSize: 13, fontWeight: 600, fontFamily: fonts.sans,
  letterSpacing: '0.5px', cursor: 'pointer',
};

const secondaryBtnStyle = {
  padding: '12px 24px',
  background: 'transparent', color: 'var(--v2-ink, #050607)',
  border: '1px solid rgba(5, 6, 7, 0.3)', borderRadius: 8,
  fontSize: 13, fontWeight: 600, fontFamily: fonts.sans,
  letterSpacing: '0.5px', cursor: 'pointer',
};

const errorBoxStyle = {
  padding: spacing.sm + 'px ' + spacing.md + 'px',
  background: 'rgba(215, 15, 36, 0.06)',
  border: '1px solid rgba(215, 15, 36, 0.25)',
  borderRadius: 8, color: 'var(--v2-red-deep, #a90918)',
  fontFamily: fonts.sans, fontSize: 13,
  marginTop: spacing.md, marginBottom: spacing.md,
};
