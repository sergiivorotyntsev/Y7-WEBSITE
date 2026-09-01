import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet, apiPost } from '../hooks/useApi';
import { colors, fonts, radii, shadows } from '../theme';

/*
 * AGRGATE-T02 — the page the customer lands on from the quote email.
 *
 * It used to auto-confirm on page load: `useEffect` fired
 * `GET /api/public/quote/confirm/{id}` before the customer had read anything.
 * Order 307 (`0901-TATOYR`) was accepted that way with no signature, no pickup
 * street, no delivery street and no delivery contact.
 *
 * Now the page states the condition, collects what confirming requires, and
 * confirms LAST. Confirmation is the final step of this page, not its
 * precondition — a customer who clicks the link and is told "no" has been given
 * a dead end, which is the thing this sprint exists to remove.
 *
 * THE SIGNATURE IS NOT CAPTURED HERE. `/agreement/:orderId` already does it,
 * already works with no portal session (it resolves the order through
 * `/api/public/track` and posts to the public `POST /api/public/agreement`),
 * and it is where the contract text is served and hashed server-side. Building
 * a second signing mechanism is exactly what the sprint forbids, so step 2
 * hands off to that page with a `?next=` and it comes back here. One signing
 * mechanism, one place legal text is rendered.
 *
 * THE ACKNOWLEDGEMENT WORDING IS NOT WRITTEN HERE EITHER. It arrives from the
 * server in `/quote/{id}/details` and is rendered verbatim; the same string is
 * posted back only so the server can flag a mismatch. A sentence composed in
 * the browser would be a record of text nobody can prove was on screen.
 *
 * 380px is the ordinary case, not the exception: one column throughout, and
 * every input at 16px so iOS Safari does not zoom (issues/ios-input-zoom).
 */

const V2_INK = 'var(--v2-ink, #050607)';
const V2_INK_MUTED = 'var(--v2-ink-muted, #5c5851)';
const V2_LINE = 'var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))';
const V2_CREAM = 'var(--v2-card-cream, #fffaf1)';
const V2_DISPLAY = 'var(--v2-font-display, Oswald, system-ui)';

const money = (cents) => (cents == null ? '—' : `$${Math.round(cents / 100)}`);

const primaryBtn = {
  background: 'var(--v2-red-gradient, linear-gradient(135deg, #d70f24, #a90918))',
  color: '#fff7ed',
  padding: '14px 24px',
  borderRadius: 8,
  fontSize: 14,
  border: 'none',
  cursor: 'pointer',
  fontFamily: fonts.sans,
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
};
const ghostBtn = {
  background: 'transparent',
  color: V2_INK,
  padding: '12px 20px',
  borderRadius: 8,
  fontSize: 13,
  border: '1px solid rgba(5, 6, 7, 0.3)',
  cursor: 'pointer',
  fontFamily: fonts.sans,
  fontWeight: 600,
};
const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  // 16px is not a taste decision: anything smaller makes iOS Safari zoom the
  // viewport on focus and the customer loses the page.
  fontSize: 16,
  fontFamily: fonts.sans,
  padding: '11px 12px',
  borderRadius: 8,
  border: `1px solid ${V2_LINE}`,
  background: '#fff',
  color: V2_INK,
};
const labelStyle = {
  display: 'block',
  fontFamily: fonts.sans,
  fontSize: 12,
  fontWeight: 600,
  color: V2_INK_MUTED,
  marginBottom: 5,
  letterSpacing: '0.02em',
};

function Step({ n, title, done, children, muted }) {
  return (
    <section
      data-step={n}
      data-done={done ? 'yes' : 'no'}
      style={{
        border: `1px solid ${done ? 'rgba(22,163,74,0.35)' : V2_LINE}`,
        background: done ? 'rgba(22,163,74,0.05)' : V2_CREAM,
        borderRadius: radii.lg,
        padding: 'clamp(14px, 3.5vw, 20px)',
        marginBottom: 14,
        opacity: muted ? 0.55 : 1,
      }}
    >
      <h2
        style={{
          fontFamily: V2_DISPLAY,
          textTransform: 'uppercase',
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: '0.02em',
          color: V2_INK,
          margin: '0 0 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 9,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            flex: '0 0 auto',
            width: 22,
            height: 22,
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 700,
            background: done ? colors.success : 'rgba(5,6,7,0.08)',
            color: done ? '#fff' : V2_INK_MUTED,
          }}
        >
          {done ? '✓' : n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ConfirmQuotePanel({ orderId, token, onConfirmed }) {
  const [details, setDetails] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [declining, setDeclining] = useState(false);
  const [form, setForm] = useState(null);
  const [acked, setAcked] = useState(false);

  const load = useCallback(async () => {
    try {
      const d = await apiGet(
        `/api/public/quote/${orderId}/details?token=${encodeURIComponent(token)}`,
      );
      setDetails(d);
      setForm((prev) => prev || {
        pickup_address: d.prefill?.pickup_address || '',
        delivery_address: d.prefill?.delivery_address || '',
        delivery_city: d.prefill?.delivery_city || '',
        delivery_state: d.prefill?.delivery_state || '',
        delivery_zip: d.prefill?.delivery_zip || '',
        delivery_contact_name: d.prefill?.delivery_contact_name || '',
        delivery_contact_phone: d.prefill?.delivery_contact_phone || '',
      });
    } catch (err) {
      setLoadError(err.message || 'This confirmation link is no longer active');
    }
  }, [orderId, token]);

  useEffect(() => { load(); }, [load]);

  // Coming back from /agreement/:orderId the signature has landed server-side,
  // so re-read rather than trusting a flag we set before navigating away.
  useEffect(() => {
    const onFocus = () => { if (details && !details.requirements?.ok) load(); };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [details, load]);

  if (loadError) {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '72px 20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: V2_DISPLAY, textTransform: 'uppercase', fontSize: 22, color: V2_INK, marginBottom: 12 }}>
          This confirmation link is no longer active
        </h1>
        <p style={{ fontFamily: fonts.sans, fontSize: 14, color: V2_INK_MUTED, lineHeight: 1.6, maxWidth: 380, margin: '0 auto 20px' }}>
          If you have already confirmed your quote, use the sign-in link in your welcome
          email. Otherwise, request a new quote.
        </p>
        <Link to="/ship-my-car" style={{ ...ghostBtn, display: 'inline-block', textDecoration: 'none' }}>
          Request a New Quote
        </Link>
      </div>
    );
  }

  if (!details || !form) {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '72px 20px', textAlign: 'center' }}>
        <p style={{ fontFamily: fonts.sans, fontSize: 14, color: V2_INK_MUTED }}>Loading your quote…</p>
      </div>
    );
  }

  if (details.status && details.status !== 'quoted') {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '72px 20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: V2_DISPLAY, textTransform: 'uppercase', fontSize: 22, color: V2_INK, marginBottom: 10 }}>
          This quote is already {details.status}
        </h1>
        <p style={{ fontFamily: fonts.sans, fontSize: 14, color: V2_INK_MUTED }}>
          Reference: <strong>{details.order_ref}</strong>
        </p>
      </div>
    );
  }

  const req = details.requirements || { conditions: [], missing: [], ok: false };
  const cond = (name) => req.conditions.find((c) => c.name === name) || { met: false, detail: '' };
  const signed = cond('agreement_signed').met;
  const blocked = req.signing_blocked;
  const ack = details.payer_acknowledgement || {};
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const needsPickupStreet = !cond('pickup_street_present').met;
  const detailsFilled =
    (!needsPickupStreet || form.pickup_address.trim()) &&
    form.delivery_address.trim() &&
    form.delivery_city.trim() &&
    form.delivery_state.trim() &&
    form.delivery_zip.trim() &&
    form.delivery_contact_phone.trim();
  const canConfirm = signed && detailsFilled && acked && !submitting;

  const backHere = `${window.location.pathname}${window.location.search}`;

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const data = await apiPost(`/api/public/quote/confirm/${orderId}`, {
        token,
        ...form,
        payer_acknowledged: acked,
        payer_ack_text: ack.text,
        payer_ack_version: ack.version,
        lang: details.lang || 'en',
        user_agent: navigator.userAgent,
      });
      onConfirmed(data);
    } catch (err) {
      // The server's 409 names exactly which conditions are unmet — show that,
      // not "Request failed", and re-read so the steps reflect it.
      const body = err.body || {};
      setError(body.message || err.message || 'Something went wrong');
      if (body.missing) load();
    } finally {
      setSubmitting(false);
    }
  }

  async function decline() {
    setDeclining(true);
    try {
      await apiGet(`/api/public/quote/decline/${orderId}?token=${encodeURIComponent(token)}&reason=`);
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Could not decline');
      setDeclining(false);
    }
  }

  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: 'clamp(28px, 6vw, 56px) clamp(14px, 4vw, 24px)' }}>
      <h1
        style={{
          fontFamily: V2_DISPLAY,
          textTransform: 'uppercase',
          fontSize: 'clamp(21px, 6vw, 28px)',
          fontWeight: 600,
          letterSpacing: '0.01em',
          lineHeight: 1.1,
          color: V2_INK,
          margin: '0 0 8px',
        }}
      >
        Confirm your shipment
      </h1>
      {/* The condition, in plain language, BEFORE anything is asked of them. */}
      <p
        style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          lineHeight: 1.6,
          color: V2_INK_MUTED,
          margin: '0 0 22px',
        }}
      >
        If this quote suits you, there are two things we need before the order can be
        carried out: your signature on the transport service agreement, and the load&rsquo;s
        details — where the car is collected, where it goes, and who meets the driver.
        Your confirmation is recorded once both are done.
      </p>

      {/* 0 — the quote itself, so they know what they are accepting */}
      <div
        style={{
          background: V2_CREAM,
          border: `1px solid ${V2_LINE}`,
          borderRadius: radii.lg,
          boxShadow: shadows.sm,
          padding: 'clamp(14px, 3.5vw, 20px)',
          marginBottom: 18,
        }}
      >
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: V2_INK_MUTED, marginBottom: 6 }}>
          {details.requires_reprice ? 'Updated quote' : 'Your quote'}
        </div>
        {details.vehicle && (
          <div style={{ fontFamily: V2_DISPLAY, fontSize: 19, textTransform: 'uppercase', color: V2_INK, marginBottom: 4 }}>
            {details.vehicle}
          </div>
        )}
        <div style={{ fontFamily: fonts.mono, fontSize: 26, fontWeight: 700, color: colors.success }}>
          {money(details.quote_price_min_cents)}–{money(details.quote_price_max_cents)}
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 12.5, color: V2_INK_MUTED, marginTop: 8, lineHeight: 1.55 }}>
          Reference <strong>{details.order_ref}</strong>. This is the carrier&rsquo;s transport
          price, paid to the carrier. Your Y7 service fee is determined by the account type
          you choose when you register.
          {details.quote_deadline_text ? ` Valid until ${details.quote_deadline_text}.` : ''}
        </div>
      </div>

      {/* 1 — the agreement, captured by the existing flow */}
      <Step n={1} title="Sign the agreement" done={signed}>
        {signed ? (
          <p style={{ fontFamily: fonts.sans, fontSize: 13.5, color: V2_INK_MUTED, margin: 0, lineHeight: 1.55 }}>
            Signed. Thank you — a copy is on file against your account.
          </p>
        ) : blocked === 'being_prepared' ? (
          <p style={{ fontFamily: fonts.sans, fontSize: 13.5, color: V2_INK, margin: 0, lineHeight: 1.55 }}>
            Your agreement is being prepared. Our team will contact you to complete this
            order — there is nothing for you to sign yet.
          </p>
        ) : blocked === 'profile_incomplete' ? (
          <p style={{ fontFamily: fonts.sans, fontSize: 13.5, color: V2_INK, margin: 0, lineHeight: 1.55 }}>
            The dealer agreement names your company as the signing party, so we need your
            company address on file first. Reply to your quote email with it, or add it in
            your portal profile, and this page will continue.
          </p>
        ) : (
          <>
            <p style={{ fontFamily: fonts.sans, fontSize: 13.5, color: V2_INK_MUTED, margin: '0 0 12px', lineHeight: 1.55 }}>
              The transport service agreement sets out what Y7 does, what the carrier does,
              and how payment works. Read it and sign — you will come straight back here.
            </p>
            <Link
              to={`/agreement/${orderId}?next=${encodeURIComponent(backHere)}`}
              style={{ ...primaryBtn, display: 'inline-block', textDecoration: 'none' }}
            >
              Read &amp; sign the agreement
            </Link>
          </>
        )}
      </Step>

      {/* 2 — the load's details */}
      <Step n={2} title="The load's details" done={!!detailsFilled} muted={!signed}>
        <div style={{ display: 'grid', gap: 12 }}>
          {needsPickupStreet ? (
            <div>
              <label style={labelStyle} htmlFor="cq-pickup">Full pickup address (street, not just a ZIP)</label>
              <input
                id="cq-pickup"
                style={inputStyle}
                value={form.pickup_address}
                autoComplete="street-address"
                placeholder={`Street address in ${details.prefill?.pickup_city || 'the pickup city'}`}
                onChange={(e) => set('pickup_address', e.target.value)}
              />
            </div>
          ) : (
            <p style={{ fontFamily: fonts.sans, fontSize: 12.5, color: V2_INK_MUTED, margin: 0, lineHeight: 1.5 }}>
              Pickup: <strong>{cond('pickup_street_present').detail}</strong> — nothing needed from you.
            </p>
          )}

          <div>
            <label style={labelStyle} htmlFor="cq-daddr">Full delivery address</label>
            <input
              id="cq-daddr"
              style={inputStyle}
              value={form.delivery_address}
              autoComplete="street-address"
              placeholder="Street address"
              onChange={(e) => set('delivery_address', e.target.value)}
            />
          </div>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.2fr)' }}>
            <div>
              <label style={labelStyle} htmlFor="cq-dcity">City</label>
              <input id="cq-dcity" style={inputStyle} value={form.delivery_city}
                onChange={(e) => set('delivery_city', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle} htmlFor="cq-dstate">State</label>
              <input id="cq-dstate" style={inputStyle} value={form.delivery_state} maxLength={2}
                onChange={(e) => set('delivery_state', e.target.value.toUpperCase())} />
            </div>
            <div>
              <label style={labelStyle} htmlFor="cq-dzip">ZIP</label>
              <input id="cq-dzip" style={inputStyle} value={form.delivery_zip} inputMode="numeric"
                onChange={(e) => set('delivery_zip', e.target.value)} />
            </div>
          </div>
          <div>
            <label style={labelStyle} htmlFor="cq-dname">Who meets the driver at delivery</label>
            <input id="cq-dname" style={inputStyle} value={form.delivery_contact_name}
              autoComplete="name" placeholder="Full name"
              onChange={(e) => set('delivery_contact_name', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle} htmlFor="cq-dphone">Their phone number</label>
            <input id="cq-dphone" style={inputStyle} value={form.delivery_contact_phone}
              type="tel" autoComplete="tel" placeholder="(555) 123-4567"
              onChange={(e) => set('delivery_contact_phone', e.target.value)} />
          </div>
        </div>
      </Step>

      {/* 3 — the payer acknowledgement. The wording is the server's, shown
          verbatim above the box, and it is what gets recorded. */}
      <Step n={3} title="Who pays the carrier" done={acked} muted={!signed}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 13.5,
            lineHeight: 1.6,
            color: V2_INK,
            background: 'rgba(5,6,7,0.04)',
            border: `1px solid ${V2_LINE}`,
            borderRadius: radii.md,
            padding: '12px 14px',
            marginBottom: 12,
          }}
          data-testid="payer-ack-text"
        >
          {ack.text}
        </div>
        <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={acked}
            onChange={(e) => setAcked(e.target.checked)}
            style={{ width: 20, height: 20, flex: '0 0 auto', marginTop: 1 }}
            data-testid="payer-ack-checkbox"
          />
          <span style={{ fontFamily: fonts.sans, fontSize: 13.5, lineHeight: 1.5, color: V2_INK }}>
            I confirm the statement above.
          </span>
        </label>
      </Step>

      {/* 4 — the release, when one is needed. It does NOT block this page. */}
      {details.prefill?.auction_type_id || (details.prefill?.pickup_location_type || '').toLowerCase() === 'auction' ? (
        <p style={{
          fontFamily: fonts.sans, fontSize: 13, color: V2_INK_MUTED, lineHeight: 1.55,
          background: 'rgba(5,6,7,0.04)', border: `1px solid ${V2_LINE}`,
          borderRadius: radii.md, padding: '11px 14px', marginBottom: 16,
        }}>
          Your pickup is an auction, so we will also need the release document or PIN before
          the carrier can collect. <strong>You can send that later</strong> — it does not
          hold up this confirmation.
        </p>
      ) : null}

      {error && (
        <div style={{
          fontFamily: fonts.sans, fontSize: 13.5, lineHeight: 1.5,
          color: 'var(--v2-red-deep, #a90918)', background: 'rgba(215, 15, 36, 0.06)',
          border: '1px solid rgba(215, 15, 36, 0.25)', borderRadius: radii.md,
          padding: 12, marginBottom: 14,
        }}>
          {error}
        </div>
      )}

      <button
        onClick={submit}
        disabled={!canConfirm}
        data-testid="confirm-submit"
        style={{ ...primaryBtn, width: '100%', opacity: canConfirm ? 1 : 0.45, cursor: canConfirm ? 'pointer' : 'not-allowed' }}
      >
        {submitting ? 'Confirming…' : 'Confirm my shipment'}
      </button>
      {!canConfirm && !submitting && (
        <p style={{ fontFamily: fonts.sans, fontSize: 12.5, color: V2_INK_MUTED, textAlign: 'center', margin: '10px 0 0' }}>
          {!signed
            ? 'Sign the agreement to continue.'
            : !detailsFilled
              ? 'Fill in the delivery details above.'
              : 'Tick the box in step 3 to continue.'}
        </p>
      )}

      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <button onClick={decline} disabled={declining}
          style={{ ...ghostBtn, opacity: declining ? 0.5 : 1 }}>
          {declining ? 'Declining…' : 'Decline this quote'}
        </button>
      </div>
    </div>
  );
}
