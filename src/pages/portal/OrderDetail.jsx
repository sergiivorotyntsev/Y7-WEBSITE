import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckIcon } from '../../components/icons';
import OnboardingBanner from '../../components/OnboardingBanner';
import BouncingEmailBanner from '../../components/recovery/BouncingEmailBanner';
import { portalFetch, useAuth, authHeader, clearSessionOn401 } from '../../hooks/useAuth';
import { colors } from '../../theme';
import pp from '../../styles/v2/portal.module.css';
import v2b from '../../styles/v2/buttons.module.css';
import { API_URL } from '../../config';
import { releaseDocShortTerm } from '../../utils/releaseDocTerm';
import { STATUS_LABELS, STATUS_PIPELINE, NO_QUOTE_LABELS, CANCELLATION_REASON_LABELS } from '../../utils/orderStatus';
// A scheduled date is a CALENDAR DAY. formatLoadDate parses a bare YYYY-MM-DD as
// a LOCAL date and rejects rollover; see utils/loadDates.js for the off-by-one
// it exists to prevent. Reused rather than re-implemented here.
import { formatLoadDate } from '../../utils/loadDates';
// VIS-2-T02: one vocabulary for absent carriers, absent prices and the
// scheduled-date caveat, shared with the dealer/exporter dashboard so the two
// surfaces cannot describe the same fact two ways.
import {
  CARRIER_NOT_ASSIGNED, PRICE_NOT_SET, DATE_NOTES, carrierExpected, moneyFromDollars,
} from '../../utils/loadVocabulary';

const TIMELINE_STEPS = [
  { key: 'pending', label: STATUS_LABELS.pending, field: 'created_at' },
  { key: 'quoted', label: STATUS_LABELS.quoted, field: 'quoted_at' },
  { key: 'confirmed', label: STATUS_LABELS.confirmed, field: 'confirmed_at' },
  { key: 'dispatched', label: STATUS_LABELS.dispatched, field: null },
  { key: 'picked_up', label: STATUS_LABELS.picked_up, field: null },
  { key: 'in_transit', label: STATUS_LABELS.in_transit, field: null },
  { key: 'delivered', label: STATUS_LABELS.delivered, field: null },
];

// EXP-T1: no-quote tracker for direct_submit (dealer/exporter) orders — the two
// quote steps are dropped; "pending" reads "Request Received".
const NO_QUOTE_STEPS = [
  { key: 'pending', label: NO_QUOTE_LABELS.pending, field: 'created_at' },
  { key: 'confirmed', label: NO_QUOTE_LABELS.confirmed, field: 'confirmed_at' },
  { key: 'dispatched', label: NO_QUOTE_LABELS.dispatched, field: null },
  { key: 'picked_up', label: NO_QUOTE_LABELS.picked_up, field: null },
  { key: 'in_transit', label: NO_QUOTE_LABELS.in_transit, field: null },
  { key: 'delivered', label: NO_QUOTE_LABELS.delivered, field: null },
];

const STATUS_ORDER = STATUS_PIPELINE;

function fmtDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

// VIS-2-T01: `fmtDeliveryWindow` (2B-5) is GONE, and its ±2-day window with it.
//
// It rendered "Jun 3, 2026 (±2 days)" under the heading "Est. delivery", inside
// the driver card. Every part of that attributed a Y7 planning date to whoever
// was carrying the vehicle: the word "Est.", the placement under the driver's
// name and phone, and a tolerance band Y7 invented and the carrier never gave.
//
// The date itself is real — carrier_assignments.scheduled_delivery_date, what a
// Y7 operator entered on assignment — so the DATA stays and only the claim goes,
// the same trade VIS-1-T05 made on the admin panel. The uncertainty the ±2 days
// was reaching for is now stated in words (SCHEDULE_DATE_NOTE), which is true
// where an invented number was not: Y7 is a broker and does not control the
// carrier's schedule.
//
// The carrier's OWN committed dates are captured nowhere in this system
// (VIS-1 §V8: zero columns, cross-checked against pg_attribute). Capturing them
// is FUL-1's work. Until then nothing here may promise them.

// The note itself is the owner's wording and now lives in utils/loadVocabulary
// (DATE_NOTES.y7), shared with the dealer/exporter dashboard. T01 duplicated it
// here with a pointer; T02 lifts it, so there is one copy and no drift.

function InfoCard({ title, children }) {
  return (
    <div className={pp.card}>
      <div className={pp.sectionTitle}>{title}</div>
      {children}
    </div>
  );
}

function InfoRow({ label, value, mono }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
      padding: '4px 0',
      fontSize: '13px',
    }}>
      <span style={{
        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
        fontSize: '10px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--v2-ink-muted, #5c5851)',
      }}>{label}</span>
      <span style={{
        fontWeight: 500,
        color: 'var(--v2-ink, #050607)',
        fontFamily: mono ? "var(--font-mono, 'JetBrains Mono', monospace)" : 'var(--font-sans, system-ui)',
        textAlign: 'right',
      }}>
        {value || '\u2014'}
      </span>
    </div>
  );
}

// OWNERSHIP-PROOF (ADR-A Sprint 4): individual / auction_buyer proof of ownership.
const OWNERSHIP_DOC_TYPES = [
  { value: 'title', label: 'Vehicle Title' },
  { value: 'registration', label: 'Registration' },
  { value: 'bill_of_sale', label: 'Bill of Sale' },
  { value: 'auction_invoice', label: 'Auction Invoice / Buyer Receipt' },
];

function ownershipTypeLabel(v) {
  const m = OWNERSHIP_DOC_TYPES.find((t) => t.value === v);
  return m ? m.label : v;
}

function OwnershipProofCard({ orderId, status, docType, note, submittedAt, onUpdated }) {
  const [selType, setSelType] = useState(docType || 'title');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState(null);
  const [replacing, setReplacing] = useState(false);

  const st = status || 'none';
  const showForm = st === 'none' || st === 'rejected' || (st === 'pending' && replacing);

  const upload = async () => {
    if (!file) { setErr('Choose a file first.'); return; }
    setUploading(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append('type', selType);
      fd.append('file', file);
      // Raw fetch — portalFetch forces Content-Type: application/json, which breaks FormData.
      // WA-T01: send the Bearer header (same token as the JSON requests) so the
      // upload still authenticates on phones where the cross-site cookie is blocked.
      const r = await fetch(`${API_URL}/api/portal/data/orders/${orderId}/ownership-proof`, {
        method: 'POST',
        credentials: 'include',
        headers: authHeader(),
        body: fd,
      });
      clearSessionOn401(r.status);
      if (r.ok) {
        setFile(null);
        setReplacing(false);
        if (onUpdated) onUpdated();
      } else {
        const e = await r.json().catch(() => ({}));
        setErr(e.detail || (r.status === 401
          ? 'Your session expired. Please refresh the page and sign in again.'
          : 'Upload failed. Please try again.'));
      }
    } catch {
      setErr('Upload failed. Please try again.');
    }
    setUploading(false);
  };

  return (
    <InfoCard title="Ownership Proof">
      {st === 'approved' && (
        <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--success, #0f6e56)', fontWeight: 500 }}>
          <CheckIcon size={16} /> Ownership verified{docType ? ` (${ownershipTypeLabel(docType)})` : ''}
        </div>
      )}

      {st === 'pending' && !replacing && (
        <div>
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--v2-ink, #050607)', fontWeight: 500 }}>
            Under review{docType ? ` — ${ownershipTypeLabel(docType)}` : ''}
          </div>
          {submittedAt && (
            <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '2px' }}>
              Submitted {fmtDate(submittedAt) || submittedAt}
            </div>
          )}
          <button
            type="button"
            onClick={() => setReplacing(true)}
            style={{
              // WA-T03: padded hit area so the text link is a comfortable tap on a phone.
              display: 'inline-flex', alignItems: 'center', minHeight: '44px',
              background: 'none', border: 'none', padding: '4px 0', marginTop: '4px',
              fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink, #050607)',
              textDecoration: 'underline', textUnderlineOffset: '2px', cursor: 'pointer',
            }}
          >
            Replace document
          </button>
        </div>
      )}

      {st === 'rejected' && (
        <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-red-deep, #a90918)', marginBottom: '10px', lineHeight: 1.5 }}>
          Your document wasn&apos;t accepted{note ? `: ${note}` : '.'} Please upload a new one.
        </div>
      )}

      {st === 'none' && (
        <p style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink-muted, #5c5851)', marginBottom: '12px', lineHeight: 1.5 }}>
          To move your shipment forward, upload one document showing you own or are authorized
          to ship this vehicle.
        </p>
      )}

      {showForm && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <select className={pp.select} value={selType} onChange={(e) => setSelType(e.target.value)}>
            {OWNERSHIP_DOC_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.heic,.webp"
            onChange={(e) => { setFile(e.target.files[0]); setErr(null); }}
            className={pp.input}
            // WA-T03: taller padding keeps the native picker an easy tap target on iOS.
            style={{ padding: '11px 12px' }}
          />
          {err && (
            <div className={pp.errorText}>{err}</div>
          )}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button type="button" onClick={upload} disabled={uploading || !file} className={v2b.cta} style={{ opacity: (uploading || !file) ? 0.6 : 1 }}>
              {uploading ? 'Uploading...' : 'Upload document'}
            </button>
            {st === 'pending' && replacing && (
              <button
                type="button"
                onClick={() => { setReplacing(false); setFile(null); setErr(null); }}
                className={v2b.ghostOnPaper}
              >
                Cancel
              </button>
            )}
          </div>
          <div className={pp.hint}>
            PDF or photo (JPG, PNG, HEIC, WebP), up to 15&nbsp;MB.
          </div>
        </div>
      )}
    </InfoCard>
  );
}

// DOC-2 / DOC-5 / DOC-7: cabinet document intake — upload an auction doc to
// auto-fill the order (VIN / vehicle / value / pickup), confirm, and apply; or
// attach a doc as proof only (no reading) for graphic scans / odd gate passes.
function DocIntakeCard({ orderId, onUpdated }) {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [fields, setFields] = useState(null); // confirm fields after extract
  const [done, setDone] = useState(null);

  const post = async (path, fd) => {
    // Raw fetch — portalFetch forces JSON which breaks FormData.
    // WA-T01: attach the Bearer header (same token as the JSON requests) so the
    // upload authenticates when the cross-site cookie is blocked (iOS Safari).
    const r = await fetch(`${API_URL}/api/portal/data/orders/${orderId}${path}`, {
      method: 'POST', credentials: 'include', headers: authHeader(), body: fd,
    });
    clearSessionOn401(r.status);
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      throw new Error(j.detail || (r.status === 401
        ? 'Your session expired. Please refresh the page and sign in again.'
        : 'Upload failed. Please try again.'));
    }
    return j;
  };

  const extract = async () => {
    if (!file) { setErr('Choose a document first.'); return; }
    setBusy(true); setErr(null); setDone(null);
    try {
      const fd = new FormData(); fd.append('file', file);
      const j = await post('/documents/extract', fd);
      const ex = j.extracted || {};
      if (!ex.vin && !ex.vehicle_value_cents && !ex.pickup_address) {
        // WPF-T02 (audit A-2): the failure message used to be copy with no
        // destination. The document is stored as proof; now the SAME editable
        // confirm form opens with blank fields — the manual-entry path is the
        // form itself, and "Confirm & apply" persists whatever the customer
        // types. Photo/scan uploads (no text layer) and unreadable PDFs both
        // land here.
        setDone(
          j.extract_error === 'no_text_layer'
            ? 'Document attached as proof. Photos can’t be read automatically — enter the details below and we’ll apply them.'
            : 'Document attached. We couldn’t read it automatically — enter the details below and we’ll apply them.'
        );
        setFields({
          vin: '', vehicle_year: '', vehicle_make: '', vehicle_model: '',
          vehicle_value_cents: null, vehicle_value_dollars: '',
          pickup_address: '', pickup_city: '', pickup_state: '', pickup_zip: '',
          pickup_location_name: '', lot_number: '', buyer_number: '',
        });
        setFile(null);
      } else {
        setFields({
          vin: ex.vin || '', vehicle_year: ex.vehicle_year || '',
          vehicle_make: ex.vehicle_make || '', vehicle_model: ex.vehicle_model || '',
          vehicle_value_cents: ex.vehicle_value_cents || null,
          vehicle_value_dollars: ex.vehicle_value_dollars != null ? String(ex.vehicle_value_dollars) : '',
          pickup_address: ex.pickup_address || '', pickup_city: ex.pickup_city || '',
          pickup_state: ex.pickup_state || '', pickup_zip: ex.pickup_zip || '',
          // W7D-T02: the extractor's business/facility name ("COPART - MIAMI")
          // persists to pickup_location_name -> the CD listing's locationName.
          pickup_location_name: ex.pickup_name || '',
          // EXP1-T04: lot/stock + buyer # now flow from the extractor to the
          // order (apply-extraction persists them; the operator reads them in
          // the admin Vehicle section for CD manual entry).
          lot_number: ex.vehicle_lot || '', buyer_number: ex.buyer_id || '',
        });
      }
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  const attachProof = async () => {
    if (!file) { setErr('Choose a document first.'); return; }
    setBusy(true); setErr(null); setDone(null);
    try {
      const fd = new FormData(); fd.append('file', file); fd.append('role', 'proof');
      await post('/documents', fd);
      setDone('Document attached as proof.'); setFile(null);
      if (onUpdated) onUpdated();
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  const applyConfirm = async () => {
    setBusy(true); setErr(null);
    try {
      const dollars = parseFloat(fields.vehicle_value_dollars);
      const body = {
        vin: fields.vin || null,
        vehicle_year: fields.vehicle_year ? parseInt(fields.vehicle_year, 10) : null,
        vehicle_make: fields.vehicle_make || null, vehicle_model: fields.vehicle_model || null,
        vehicle_value_cents: Number.isFinite(dollars) ? Math.round(dollars * 100) : fields.vehicle_value_cents,
        pickup_address: fields.pickup_address || null, pickup_city: fields.pickup_city || null,
        pickup_state: fields.pickup_state || null, pickup_zip: fields.pickup_zip || null,
        // W7D-T02: persist the document's business/facility name.
        pickup_location_name: fields.pickup_location_name || null,
        // EXP1-T04: persist lot/buyer (W2D-T01 columns get their writer).
        lot_number: fields.lot_number || null, buyer_number: fields.buyer_number || null,
      };
      // WA-T01: this is a JSON request, so it can use portalFetch directly —
      // which attaches the Bearer token and centralises 401/403 handling.
      const r = await portalFetch(`/api/portal/data/orders/${orderId}/apply-extraction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.detail || (r.status === 401
          ? 'Your session expired. Please refresh the page and sign in again.'
          : 'Could not apply.'));
      }
      setFields(null); setFile(null); setDone('Order updated from your document.');
      if (onUpdated) onUpdated();
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };

  const setF = (k, v) => setFields((p) => ({ ...p, [k]: v }));
  const row2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' };

  return (
    <InfoCard title="Upload auction document">
      {!fields && (
        <div>
          <p style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink-muted, #5c5851)', lineHeight: 1.5, margin: '0 0 12px' }}>
            Upload your auction document and we’ll read the VIN, vehicle, value, and pickup —
            no need to type the VIN by hand. Or attach it as proof only.
          </p>
          <input
            type="file" accept=".pdf,.jpg,.jpeg,.png,.heic,.webp"
            onChange={(e) => { setFile(e.target.files?.[0] || null); setErr(null); setDone(null); }}
            className={pp.input}
            // WA-T03: taller padding keeps the native picker an easy tap target on iOS.
            style={{ padding: '11px 10px' }}
          />
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
            <button type="button" onClick={extract} disabled={busy || !file} className={v2b.cta} style={{ opacity: (busy || !file) ? 0.6 : 1 }}>
              {busy ? 'Reading…' : 'Read & auto-fill'}
            </button>
            <button type="button" onClick={attachProof} disabled={busy || !file} className={v2b.ghostOnPaper} style={{ opacity: (busy || !file) ? 0.6 : 1 }}>
              Attach as proof only
            </button>
          </div>
        </div>
      )}

      {fields && (
        <div>
          <p style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink, #050607)', lineHeight: 1.5, margin: '0 0 12px' }}>
            We read your document — review and confirm. <strong>You don’t need to type the VIN.</strong>
          </p>
          <div style={{ marginBottom: '10px' }}>
            <span className={pp.label}>VIN</span>
            <input className={pp.input} value={fields.vin} onChange={(e) => setF('vin', e.target.value)} />
          </div>
          <div style={row2}>
            <div><span className={pp.label}>Year</span><input className={pp.input} value={fields.vehicle_year} onChange={(e) => setF('vehicle_year', e.target.value)} /></div>
            <div><span className={pp.label}>Vehicle value (USD)</span><input className={pp.input} value={fields.vehicle_value_dollars} onChange={(e) => setF('vehicle_value_dollars', e.target.value)} placeholder="e.g. 9900" /></div>
          </div>
          <div style={{ ...row2, marginTop: '10px' }}>
            <div><span className={pp.label}>Make</span><input className={pp.input} value={fields.vehicle_make} onChange={(e) => setF('vehicle_make', e.target.value)} /></div>
            <div><span className={pp.label}>Model</span><input className={pp.input} value={fields.vehicle_model} onChange={(e) => setF('vehicle_model', e.target.value)} /></div>
          </div>
          {/* W7D-T02: the document's business/facility name, editable before apply. */}
          <div style={{ marginTop: '10px' }}>
            <span className={pp.label}>Pickup location name</span>
            <input className={pp.input} value={fields.pickup_location_name} onChange={(e) => setF('pickup_location_name', e.target.value)} placeholder="e.g. COPART - MIAMI SOUTH" />
          </div>
          <div style={{ marginTop: '10px' }}>
            <span className={pp.label}>Pickup address</span>
            <input className={pp.input} value={fields.pickup_address} onChange={(e) => setF('pickup_address', e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px', marginTop: '10px' }}>
            <div><span className={pp.label}>City</span><input className={pp.input} value={fields.pickup_city} onChange={(e) => setF('pickup_city', e.target.value)} /></div>
            <div><span className={pp.label}>State</span><input className={pp.input} value={fields.pickup_state} onChange={(e) => setF('pickup_state', e.target.value)} /></div>
            <div><span className={pp.label}>ZIP</span><input className={pp.input} value={fields.pickup_zip} onChange={(e) => setF('pickup_zip', e.target.value)} /></div>
          </div>
          {/* EXP1-T04: lot/stock + buyer # — read from the document, editable here. */}
          <div style={{ ...row2, marginTop: '10px' }}>
            <div><span className={pp.label}>Lot / Stock #</span><input className={pp.input} value={fields.lot_number} onChange={(e) => setF('lot_number', e.target.value)} /></div>
            <div><span className={pp.label}>Buyer #</span><input className={pp.input} value={fields.buyer_number} onChange={(e) => setF('buyer_number', e.target.value)} /></div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
            <button type="button" onClick={applyConfirm} disabled={busy} className={v2b.cta} style={{ opacity: busy ? 0.6 : 1 }}>
              {busy ? 'Saving…' : 'Confirm & apply'}
            </button>
            <button type="button" onClick={() => { setFields(null); setDone(null); }} disabled={busy} className={v2b.ghostOnPaper} style={{ opacity: busy ? 0.6 : 1 }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {done && <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--success, #0f6e56)', marginTop: '12px' }}>{done}</div>}
      {err && <div className={pp.errorText} style={{ marginTop: '12px' }}>{err}</div>}
    </InfoCard>
  );
}

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState(null);
  const [feeAcknowledged, setFeeAcknowledged] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoMsg, setPromoMsg] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [sentLoading, setSentLoading] = useState(false);
  const [sentError, setSentError] = useState(null);
  const dispatchSaved = searchParams.get('dispatch_saved') === '1';
  const justPaid = searchParams.get('paid') === '1';
  // EXP1-T01 (Q6): NewOrder redirects exporters here with ?upload=1 so document
  // upload is the immediate next action — scroll to + highlight the intake card.
  const uploadFocus = searchParams.get('upload') === '1';

  const fetchOrder = () => {
    setLoading(true);
    setError(null);
    portalFetch(`/api/portal/data/orders/${id}`)
      .then(r => r.json())
      .then(setOrder)
      .catch(() => setError('Failed to load order details. Please try again.'))
      .finally(() => setLoading(false));
  };

  const fetchPayment = () => {
    portalFetch(`/api/portal/orders/${id}/payment`)
      .then(r => r.ok ? r.json() : null)
      .then(setPaymentData)
      .catch(() => setPaymentData(null));
  };

  // Fetch on id change — fetchOrder/fetchPayment are stable functions
  // defined at the top of the component.
  useEffect(() => {
    fetchOrder();
    fetchPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // EXP1-T01 (Q6): once the page has rendered, bring the doc-intake card into
  // view for ?upload=1 arrivals (post-create exporter flow).
  useEffect(() => {
    if (!uploadFocus || loading) return;
    document.getElementById('doc-intake')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [uploadFocus, loading]);

  // One-shot mount effect — handle justPaid query param and pick up any
  // stashed promo code from localStorage.
  useEffect(() => {
    if (justPaid) {
      fetchPayment();
      fetchOrder();
      window.history.replaceState({}, '', window.location.pathname);
    }
    try {
      const stored = localStorage.getItem('y7_promo_code');
      if (stored) setPromoCode(stored);
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyPromo = async () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) return;
    setPromoLoading(true);
    setPromoMsg(null);
    try {
      const res = await portalFetch(`/api/portal/orders/${id}/apply-promo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promo_code: code }),
      });
      const data = await res.json();
      if (!res.ok || data.valid === false) {
        setPromoMsg({ ok: false, text: data.error || data.detail || 'Invalid promo code' });
      } else {
        setPromoMsg({ ok: true, text: `Applied: −$${(data.discount_cents / 100).toFixed(2)} off` });
        fetchPayment();
      }
    } catch {
      setPromoMsg({ ok: false, text: 'Failed to validate promo' });
    } finally {
      setPromoLoading(false);
    }
  };

  const handlePaymentSent = async () => {
    setSentLoading(true);
    setSentError(null);
    try {
      const res = await portalFetch(`/api/portal/orders/${id}/payment-sent`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Could not record your confirmation');
      fetchPayment();
    } catch (err) {
      setSentError(err.message || 'Could not record your confirmation. Please try again.');
    } finally {
      setSentLoading(false);
    }
  };

  const handlePayNow = async () => {
    setPayLoading(true);
    setPayError(null);
    try {
      const res = await portalFetch(`/api/portal/orders/${id}/checkout`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Payment system error');
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }
      throw new Error('No checkout URL returned');
    } catch (err) {
      setPayError(err.message || 'Payment system error. Please try again.');
      setPayLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirmCancel) { setConfirmCancel(true); return; }
    setConfirmCancel(false);
    try {
      const r = await portalFetch(`/api/portal/data/orders/${id}/cancel`, { method: 'POST' });
      if (r.ok) fetchOrder();
      else setError('Failed to cancel order. Please try again.');
    } catch {
      setError('Failed to cancel order. Please check your connection and try again.');
    }
  };

  if (loading) {
    return (
      <div className={pp.shell}>
        <style>{`@keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }`}</style>
        {[120, 200, 160].map((h, i) => (
          <div key={i} style={{
            height: h, borderRadius: '12px', marginBottom: '16px',
            background: `linear-gradient(90deg, ${colors.bgMuted} 25%, ${colors.bgCard} 50%, ${colors.bgMuted} 75%)`,
            backgroundSize: '800px 100%', animation: 'shimmer 1.5s ease-in-out infinite',
          }} />
        ))}
      </div>
    );
  }

  if (!order && error) {
    return (
      <div className={pp.shell} style={{ textAlign: 'center' }}>
        <div className={pp.errorBlock}>
          {error}
        </div>
      </div>
    );
  }

  if (!order) {
    return <div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: 'var(--font-sans, system-ui)', color: 'var(--v2-ink-muted, #5c5851)' }}>Order not found.</div>;
  }

  const vehicle = [order.vehicle_year, order.vehicle_make, order.vehicle_model].filter(Boolean).join(' ') || 'Vehicle TBD';
  // EXP-T1: dealer/exporter direct_submit orders have no quote — use the no-quote
  // tracker (no "Quote Requested"/"Quote Sent" steps).
  const noQuote = order.submission_type === 'direct_submit';
  const baseSteps = noQuote ? NO_QUOTE_STEPS : TIMELINE_STEPS;
  // NEX-7 (1c, NEX-4 W9): while a replacement carrier is being sourced, show
  // "Sourcing New Carrier" as the current step — transient, injected only when
  // the order is actually there, so it never appears as a permanent milestone.
  const steps = order.status === 'listed'
    ? (() => {
        const i = baseSteps.findIndex((s) => s.key === 'confirmed');
        const withListed = [...baseSteps];
        withListed.splice(i + 1, 0, { key: 'listed', label: STATUS_LABELS.listed, field: null });
        return withListed;
      })()
    : baseSteps;
  const currentStatusIdx = STATUS_ORDER.indexOf(order.status);

  function isStepDone(stepKey) {
    // NEX-7 (1c): 'listed' holds the rank between confirmed and dispatched —
    // keep this array aligned with STATUS_PIPELINE or the index math lies.
    const statusSteps = ['pending', 'quoted', 'confirmed', 'listed', 'dispatched', 'picked_up', 'in_transit', 'delivered'];
    const sIdx = statusSteps.indexOf(stepKey);
    return sIdx >= 0 && sIdx <= currentStatusIdx;
  }

  function getStepDate(step) {
    // NEX-9 (D5): captured ACTUALS win for the physical-event steps.
    if (step.key === 'picked_up' && order.actual_pickup_date) return fmtDate(order.actual_pickup_date);
    if (step.key === 'delivered' && order.actual_delivery_date) return fmtDate(order.actual_delivery_date);
    if (step.field && order[step.field]) return fmtDate(order[step.field]);
    if (isStepDone(step.key) && step.key === 'pending') return fmtDate(order.created_at);
    return null;
  }

  const price = order.final_price
    ? `$${typeof order.final_price === 'number' ? order.final_price.toFixed(2) : order.final_price}`
    : (order.quote_price_min && order.quote_price_max)
      ? `$${order.quote_price_min} - $${order.quote_price_max}`
      : null;

  return (
    <div className={pp.shell}>
      <BouncingEmailBanner />
      <OnboardingBanner />
      {/* Back link */}
      <Link to="/portal/dashboard" className={pp.backLink}>
        &larr; Back to Dashboard
      </Link>

      {/* Header */}
      <h1 className={pp.pageTitle} style={{ marginBottom: '4px' }}>
        {vehicle}
      </h1>
      {order.vin && order.vin !== 'TBD' && (
        <p className={pp.mono} style={{ color: 'var(--v2-ink-muted, #5c5851)', marginBottom: '24px' }}>
          VIN: {order.vin}
        </p>
      )}

      {/* ORD-INV-4: billing lifecycle for dealer/exporter orders (separate from
          the shipment status timeline below). Pending is the default and hidden. */}
      {['dealer', 'exporter'].includes(user?.customer_type) && ['invoiced', 'closed'].includes(order.billing_status) && (
        <span
          className={order.billing_status === 'closed' ? pp.chipPine : pp.chipSoft}
          style={{ marginBottom: '20px' }}
        >
          {order.billing_status === 'closed' ? 'Closed — paid' : 'Invoiced — awaiting payment'}
        </span>
      )}

      {/* PHASE4B-REPRICE: a revised quote awaits the dealer's re-confirmation. The
          re-accept link lives in the updated-quote email (token-gated), so the portal
          surfaces the prompt and the updated price. */}
      {order.status === 'quoted' && order.requires_reprice && (
        <div style={{
          background: 'rgba(215, 15, 36, 0.06)',
          border: '1px solid rgba(215, 15, 36, 0.25)', borderRadius: '12px',
          padding: '16px 18px', marginBottom: '24px',
        }}>
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', fontWeight: 700, color: 'var(--v2-red-deep, #a90918)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
            Needs your re-confirmation
          </div>
          <p style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--v2-ink, #050607)', lineHeight: 1.6, margin: 0 }}>
            The carrier price came in above your original quote, so we sent an updated quote
            {order.quote_price_min != null && order.quote_price_max != null
              ? <> of <strong>${order.quote_price_min}–${order.quote_price_max}</strong></>
              : null}.
            Check your email and tap <strong>Accept Updated Price</strong> to keep your shipment moving.
          </p>
        </div>
      )}

      {/* Status Timeline */}
      <div className={pp.card} style={{ padding: '24px', marginBottom: '24px' }}>
        {steps.map((step, i) => {
          const done = isStepDone(step.key);
          const terminal = step.key === 'delivered' || step.key === 'completed';
          const date = getStepDate(step);

          return (
            <div key={step.key} style={{
              display: 'flex',
              gap: '16px',
              minHeight: i < steps.length - 1 ? '52px' : 'auto',
            }}>
              {/* Dot + line */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '20px',
                flexShrink: 0,
              }}>
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: done ? (terminal ? 'var(--success, #0f6e56)' : 'var(--v2-ink, #050607)') : 'transparent',
                  border: done ? 'none' : '2px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
                  flexShrink: 0,
                  marginTop: '3px',
                }} />
                {i < steps.length - 1 && (
                  <div style={{
                    width: '2px',
                    flex: 1,
                    background: 'var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: '12px' }}>
                <div style={{
                  fontFamily: 'var(--font-sans, system-ui)',
                  fontSize: '14px',
                  fontWeight: done ? 600 : 400,
                  color: done ? 'var(--v2-ink, #050607)' : 'var(--v2-ink-muted, #5c5851)',
                }}>
                  {step.label}
                </div>
                {date && (
                  <div style={{
                    fontFamily: 'var(--font-sans, system-ui)',
                    fontSize: '12px',
                    color: 'var(--v2-ink-muted, #5c5851)',
                    marginTop: '2px',
                  }}>
                    {date}
                  </div>
                )}
                {!done && !date && (
                  <div style={{
                    fontFamily: 'var(--font-sans, system-ui)',
                    fontSize: '12px',
                    color: 'var(--v2-ink-muted, #5c5851)',
                    fontStyle: 'italic',
                    marginTop: '2px',
                  }}>
                    Waiting...
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {/* NEX-8-T04: gate-pass chase as a timeline entry — an action row, NOT
            a status (a status without a pipeline entry is the W9 hollow-
            timeline bug). Shown while the document is required and missing. */}
        {order.pickup_release_doc_required === true
          && !order.gate_pass && !order.gate_pass_pin && !order.gate_pass_document_id
          && !order.gate_pass_file_name && !order.gate_pass_filename
          && ['pending', 'quoted', 'confirmed', 'listed'].includes(order.status) && (
          <div data-testid="timeline-release-doc-entry" style={{ display: 'flex', gap: '16px', marginTop: 4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px', flexShrink: 0 }}>
              <div style={{
                width: '14px', height: '14px', borderRadius: '50%',
                background: 'rgba(180, 120, 20, 0.15)',
                border: '2px solid rgba(180, 120, 20, 0.55)',
                flexShrink: 0, marginTop: '3px',
              }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>
                We need your {releaseDocShortTerm(order.auction_type_code)}
              </div>
              <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '2px' }}>
                The carrier can&rsquo;t collect the vehicle without it — upload it in the section below.
              </div>
            </div>
          </div>
        )}
        {/* NEX-9-T06 (D3.5): quiet check when delivery proof exists; nothing
            otherwise. Never any payment/request data here. */}
        {(order.pod_documents || []).length > 0 && (
          <div data-testid="timeline-pod-entry" style={{ display: 'flex', gap: '16px', marginTop: 4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px', flexShrink: 0 }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--success, #0f6e56)', flexShrink: 0, marginTop: '3px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>
                &#10003; Proof of delivery on file
              </div>
              <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', marginTop: '2px' }}>
                {(order.pod_documents || []).map(pd => (
                  <button key={pd.document_id} type="button"
                    onClick={async () => {
                      try {
                        const r = await portalFetch(`/api/portal/data/orders/${orderId}/documents/${pd.document_id}/share-link`, { method: 'POST' });
                        const j = await r.json();
                        if (r.ok && j.view_url) window.open(j.view_url.startsWith('http') ? j.view_url : `${API_URL}${j.view_url}`, '_blank');
                      } catch { /* best-effort */ }
                    }}
                    style={{ background: 'none', border: 'none', padding: 0, marginRight: 12, cursor: 'pointer', color: 'var(--v2-ink, #050607)', textDecoration: 'underline', fontSize: '12px' }}>
                    View {pd.filename || 'document'} &#8599;
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Route Details */}
      <InfoCard title="Route Details">
        <InfoRow label="From" value={[order.pickup_city, order.pickup_state, order.pickup_zip].filter(Boolean).join(', ') || order.pickup_zip} />
        {order.pickup_location_type && <InfoRow label="Type" value={order.pickup_location_type} />}
        <InfoRow label="To" value={[order.delivery_city, order.delivery_state, order.delivery_zip].filter(Boolean).join(', ') || order.delivery_zip} />
        {/* EXP-B5: Y7-assigned destination warehouse + appointment info (read-only). */}
        {order.destination_warehouse && (
          <>
            <InfoRow
              label="Destination"
              value={[order.destination_warehouse.label, order.destination_warehouse.city, order.destination_warehouse.state].filter(Boolean).join(' · ')}
            />
            {order.destination_warehouse.business_hours && (
              <InfoRow label="Hours" value={order.destination_warehouse.business_hours} />
            )}
            <InfoRow
              label="Appointment"
              value={order.destination_warehouse.appointment_required
                ? `Required${order.destination_warehouse.appointment_instructions ? ` — ${order.destination_warehouse.appointment_instructions}` : ''}`
                : 'Not required'}
            />
          </>
        )}
      </InfoCard>

      {/* Payment */}
      {/* VIS-2-T02 added `carrierExpected`: without it the card itself is
          hidden when every figure is absent, and the "not priced yet" line
          inside it could never render on the orders that most need it. */}
      {/* ASG-2-T05 adds the two pass-through costs to the visibility condition,
          for the reason VIS-2-T02 added `carrierExpected`: a card hidden when
          every OTHER figure is absent cannot show a line it is the only place
          for. An order with a storage fee and nothing else must still render. */}
      {(price || order.dispatched_price != null || order.service_fee_cents != null
        || order.storage_fee_cents || order.dry_run_fee_cents
        || paymentData?.payment || carrierExpected(order.status)) && (
        <InfoCard title="Payment">
          {/* EXP-D4: once the operator records the real CD-dispatched carrier price,
              it IS the transport line (honest passthrough); otherwise show the
              quote/final transport price. The Y7 service fee is ALWAYS a separate
              line — never folded in, never the carrier-offer/listed price. */}
          {/* VIS-2-T02. "Transport (carrier)" is KEPT, on the owner's ruling:
              TRANSPORT standardised internally on "Dispatched price" so the
              column and its label could not drift apart, but that is a rule
              about the field matching its name, and here the meaning is already
              right — this is what the carrier is paid for the transport. The
              customer's word does not have to be the operator's.
              Absent is now SAID. Rendering nothing left the customer unable to
              tell "we do not know the price yet" from "this screen has no such
              line", and the InfoRow fallback would otherwise print a bare em
              dash, which says even less. Only where a carrier is expected at
              all: on a quote request there is nothing pending to report. */}
          {order.dispatched_price != null
            ? <InfoRow label="Transport (carrier)" value={moneyFromDollars(order.dispatched_price)} mono />
            : price
              ? <InfoRow label="Transport fee" value={price} mono />
              : carrierExpected(order.status)
                ? <InfoRow label="Transport (carrier)" value={PRICE_NOT_SET} />
                : null}
          {/* WAP-T02: new-model orders show the formula range until the fee is
              fixed from the real carrier price; the COD condition is contract
              text. Legacy orders render exactly as before. */}
          {order.pricing_model === 'ind_2026' ? (
            <>
              <InfoRow
                label="Broker service fee"
                value={
                  order.fee_fixed_at
                    ? `$${(order.service_fee_cents / 100).toFixed(2)} — final`
                    : order.fee_range_min_cents != null
                      ? (order.fee_range_min_cents === order.fee_range_max_cents
                          ? `$${(order.fee_range_min_cents / 100).toFixed(0)}`
                          : `$${(order.fee_range_min_cents / 100).toFixed(0)}–$${(order.fee_range_max_cents / 100).toFixed(0)}`)
                        + ' — final set at carrier assignment'
                      : '$75 minimum or 10% of carrier price'
                }
                mono
              />
              <p style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', lineHeight: 1.5, margin: '6px 0 0' }}>
                Broker fee is the greater of $75 or 10% of the carrier price. The
                carrier is paid COD by you (or your designee) at pickup or delivery.
              </p>
            </>
          ) : (
            order.service_fee_cents != null && order.service_fee_cents > 0 && (
              <InfoRow label="Y7 service fee" value={`$${(order.service_fee_cents / 100).toFixed(2)}`} mono />
            )
          )}
          {/* ASG-2-T05 — THE STORAGE FEE, AS ITS OWN LINE, AND A TOTAL.

              THE OWNER'S RULING, 2026-08-05: "when a storage fee arises that we
              pay directly to the carrier or driver, there must be a field to
              record that extra cost, SO THE CUSTOMER SEES IT... as its own
              line, and a total for the load."

              The field already existed. `customer_orders.storage_fee_cents` has
              had a writer (the admin Money section) and a reader (the periodic
              cost report Y7 emails) since EXP-F5 — and **0 of 69 orders carry
              one**, and this screen never selected it. So the customer's only
              sight of it was a PDF once a period. CLAUDE.md rule 10: a column
              whose readers cannot reach the surface the customer looks at.

              These are PASS-THROUGH costs. Y7's invoice bills the service fee
              only; storage and dry-run are what Y7 paid the carrier or driver
              direct and is passing on, which is why they sit above the fee and
              inside the same total.

              `load_total_cents` IS NOT ADDED UP HERE. It is computed by
              `services/order_money.load_total_cents` in TRANSPORT and rendered
              identically by the admin card, because the ruling requires the two
              to show the SAME figure and two client-side sums of one formula
              are born diverged (rule 20). */}
          {order.storage_fee_cents != null && order.storage_fee_cents > 0 && (
            <InfoRow label="Storage fee" value={`$${(order.storage_fee_cents / 100).toFixed(2)}`} mono />
          )}
          {order.dry_run_fee_cents != null && order.dry_run_fee_cents > 0 && (
            <InfoRow label="Dry run" value={`$${(order.dry_run_fee_cents / 100).toFixed(2)}`} mono />
          )}
          {/* Rendered only when the carrier price is known. A total of $0.00
              would read as "free" where the truth is "not priced yet", which is
              the distinction the line above this one exists to make. */}
          {order.load_total_cents != null && (
            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
              <InfoRow label="Total for this load" value={`$${(order.load_total_cents / 100).toFixed(2)}`} mono />
            </div>
          )}
          {order.payment_responsibility && <InfoRow label="Payment method" value={order.payment_responsibility === 'broker' ? 'Prepaid to Y7' : 'COD at delivery'} />}

          {/* SPRINT-W7 C2: payment block migrated (the C1 carve-out ends here —
              handlers, gating logic, and copy byte-identical; tokens only). */}
          {paymentData?.payment && (
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
              <InfoRow label="Tier" value={paymentData.payment.service_tier === 'full_service' ? 'Full Service' : 'COD'} />
              <InfoRow label="Dispatch fee" value={`$${(paymentData.payment.dispatch_fee_cents / 100).toFixed(2)}`} mono />
              {paymentData.payment.service_tier === 'full_service' && (
                <InfoRow label="Carrier transport" value={`$${(paymentData.payment.carrier_quote_cents / 100).toFixed(2)}`} mono />
              )}
              {paymentData.payment.discount_cents > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '13px', color: colors.success }}>
                  <span>Promo ({paymentData.payment.promo_code})</span>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)' }}>−${(paymentData.payment.discount_cents / 100).toFixed(2)}</span>
                </div>
              )}
              <InfoRow label="Total" value={`$${(paymentData.payment.total_charge_cents / 100).toFixed(2)}`} mono />
              <InfoRow label="Status" value={paymentData.payment.status} />

              {paymentData.payment.status === 'pending' && ['quoted', 'confirmed'].includes(order.status) && (
                <div style={{ marginTop: '14px' }}>
                  {paymentData.payment.details_sent_at && (
                    <div style={{ marginBottom: '16px', padding: '14px', background: 'rgba(5, 6, 7, 0.04)', border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))', borderRadius: '10px' }}>
                      <div style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '11px', fontWeight: 500, letterSpacing: 'var(--v2-track-label, 0.14em)', textTransform: 'uppercase', color: 'var(--v2-ink, #050607)', marginBottom: '8px' }}>
                        Pay by Zelle
                      </div>
                      <InfoRow label="Send to" value="dispatch@y7agency.com" mono />
                      <InfoRow label="Amount" value={`$${(paymentData.payment.total_charge_cents / 100).toFixed(2)}`} mono />
                      <div style={{ fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', margin: '8px 0 12px', lineHeight: 1.5 }}>
                        This is the Y7 service fee (prepaid). The carrier transport price is paid separately to the driver at delivery.
                      </div>
                      {paymentData.payment.reported_sent_at ? (
                        <div style={{ fontSize: '13px', color: colors.success, fontWeight: 600, lineHeight: 1.5 }}>
                          ✓ Thanks — we’re verifying your payment and will dispatch your vehicle shortly.
                        </div>
                      ) : (
                        <>
                          {/* Ink fill: the red fill belongs to Pay Now below. */}
                          <button
                            onClick={handlePaymentSent}
                            disabled={sentLoading}
                            style={{
                              width: '100%', padding: '12px 18px', border: 'none', borderRadius: '8px',
                              background: 'var(--v2-ink, #050607)', color: 'var(--v2-paper, #f4f0e8)',
                              fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', fontWeight: 600,
                              cursor: sentLoading ? 'not-allowed' : 'pointer', opacity: sentLoading ? 0.6 : 1,
                            }}
                          >
                            {sentLoading ? 'Sending...' : 'I sent the payment'}
                          </button>
                          {sentError && (
                            <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--v2-red-deep, #a90918)' }}>{sentError}</div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {!paymentData.payment.promo_code && (
                    <div style={{ marginBottom: '12px' }}>
                      <label className={pp.label}>
                        Promo code
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={promoCode}
                          onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoMsg(null); }}
                          placeholder="SAVE10"
                          className={pp.input}
                          style={{
                            flex: 1, width: 'auto',
                            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', letterSpacing: '1px',
                            textTransform: 'uppercase',
                          }}
                        />
                        <button
                          onClick={handleApplyPromo}
                          disabled={promoLoading || !promoCode.trim()}
                          style={{
                            padding: '8px 14px',
                            border: '1px solid rgba(5, 6, 7, 0.3)', borderRadius: '8px',
                            background: 'transparent', color: 'var(--v2-ink, #050607)',
                            fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', fontWeight: 600,
                            cursor: (promoLoading || !promoCode.trim()) ? 'not-allowed' : 'pointer',
                            opacity: (promoLoading || !promoCode.trim()) ? 0.6 : 1,
                          }}
                        >
                          {promoLoading ? '...' : 'Apply'}
                        </button>
                      </div>
                      {promoMsg && (
                        <div style={{ marginTop: '6px', fontSize: '12px', color: promoMsg.ok ? colors.success : 'var(--v2-red-deep, #a90918)' }}>
                          {promoMsg.text}
                        </div>
                      )}
                    </div>
                  )}
                  {paymentData.payment.service_tier === 'full_service' && (
                    <label style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginBottom: '10px', lineHeight: 1.45 }}>
                      <input
                        type="checkbox"
                        checked={feeAcknowledged}
                        onChange={e => setFeeAcknowledged(e.target.checked)}
                        style={{ accentColor: 'var(--v2-red, #d70f24)', flexShrink: 0, marginTop: '2px' }}
                      />
                      <span>
                        I understand that payment processing fees (~${(paymentData.payment.total_charge_cents * 0.029 / 100 + 0.30).toFixed(2)}) are non-refundable and will be deducted from any refund.
                      </span>
                    </label>
                  )}
                  {/* Pay Now = this screen's one red fill (Signal Budget). */}
                  <button
                    onClick={handlePayNow}
                    disabled={payLoading || (paymentData.payment.service_tier === 'full_service' && !feeAcknowledged)}
                    style={{
                      width: '100%',
                      padding: '12px 18px',
                      border: 'none',
                      borderRadius: '8px',
                      background: 'var(--v2-red-gradient, linear-gradient(135deg, #d70f24, #a90918))',
                      color: '#fff7ed',
                      fontFamily: 'var(--font-sans, system-ui)',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: payLoading ? 'not-allowed' : 'pointer',
                      opacity: (payLoading || (paymentData.payment.service_tier === 'full_service' && !feeAcknowledged)) ? 0.45 : 1,
                    }}
                  >
                    {payLoading ? 'Redirecting...' : `Pay $${(paymentData.payment.total_charge_cents / 100).toFixed(2)} Now`}
                  </button>
                  {payError && (
                    <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--v2-red-deep, #a90918)' }}>{payError}</div>
                  )}
                </div>
              )}

              {paymentData.payment.status === 'paid' && (
                <div style={{ marginTop: '12px', fontSize: '12px', color: colors.success, fontStyle: 'italic' }}>
                  Payment received. Thank you!
                </div>
              )}
            </div>
          )}
        </InfoCard>
      )}

      {/* Gate Pass Status — W7U-T03: auction-aware term (Manheim "Vehicle
          Release", ACV "Pickup Slip"; generic when the site is unknown). */}
      <InfoCard title={releaseDocShortTerm(order.auction_type_code)}>
        {/* NEX-5-T03: the PIN and a document are separate facts and both may
            exist. The PIN the customer was REQUIRED to enter used to be
            invisible here — the card said "Not uploaded" (NEX-4 audit, W3). */}
        {order.gate_pass_pin && (
          <InfoRow label="PIN on file" value={order.gate_pass_pin} />
        )}
        {order.gate_pass_file_name ? (
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--success, #0f6e56)' }}>
            <CheckIcon size={16} /> {order.gate_pass_file_name}
          </div>
        ) : order.gate_pass ? (
          <InfoRow label={`${releaseDocShortTerm(order.auction_type_code)} #`} value={order.gate_pass} />
        ) : order.gate_pass_pin ? (
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink-muted, #5c5851)' }}>
            No document needed — your PIN above covers pickup.
          </div>
        ) : (
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink-muted, #5c5851)', fontStyle: 'italic' }}>
            Not uploaded
          </div>
        )}
      </InfoCard>

      {/* DOC-2/5/7: cabinet auction-document intake — upload an auction doc to
          auto-fill VIN/value/pickup (or attach proof).
          WPF-T02 (audit A-1): individuals included — W7U already routes them
          here (?upload=1 + the success banner), but the card never rendered,
          leaving both entry points dead-ends. Same conditions as auction_buyer. */}
      {['dealer', 'exporter', 'auction_buyer', 'individual'].includes(user?.customer_type) && (
        <div
          id="doc-intake"
          style={uploadFocus ? {
            scrollMarginTop: 12,
            border: '2px solid var(--v2-red, #d70f24)',
            borderRadius: 14,
            padding: 2,
          } : undefined}
        >
          <DocIntakeCard orderId={id} onUpdated={fetchOrder} />
        </div>
      )}

      {/* Ownership proof — individual / auction_buyer only, once the price is accepted. */}
      {['individual', 'auction_buyer'].includes(user?.customer_type)
        && ['confirmed', 'dispatched'].includes(order.status) && (
        <OwnershipProofCard
          orderId={id}
          status={order.ownership_proof_status}
          docType={order.ownership_proof_type}
          note={order.ownership_proof_note}
          submittedAt={order.ownership_proof_submitted_at}
          onUpdated={fetchOrder}
        />
      )}

      {/* VIS-2-T02: who is carrying the vehicle, and NOTHING else about them.
          The company name only. Not the phone, not the MC, not what Y7 pays
          them. `carrier_mc` used to be appended here in parentheses and was
          served to a real customer on one production order (VIS-1 §V3); the
          field is gone from the query upstream, and the read is gone here so
          nobody "fixes" a blank by restoring it.
          The name comes only from an assignment Y7 made. Central Dispatch may
          name a carrier we never engaged — the operator sees that on the board,
          marked as CD's; the customer never does, because telling them we hired
          someone we did not is worse than telling them nothing.
          It is out of the driver card, so it no longer requires a driver_name
          to appear, and absence is said in words rather than left as a gap. */}
      {(order.carrier_name || carrierExpected(order.status)) && (
        <InfoCard title="CARRIER">
          {order.carrier_name ? (
            <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '15px', fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>
              {order.carrier_name}
            </div>
          ) : (
            <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--v2-ink-muted, #5c5851)', fontStyle: 'italic' }}>
              {CARRIER_NOT_ASSIGNED}
            </div>
          )}
        </InfoCard>
      )}

      {/* VIS-2-T01: the scheduled dates, out of the driver card and under a
          heading that names whose dates they are.
          THE PRODUCTION BREAKAGE THIS FIXES: VIS-1-T05 renamed the wire keys
          estimated_pickup_date/estimated_delivery_date -> scheduled_*, and this
          page still read the old names, so the date rendered blank for every
          customer. The rename is the fix; the relabel is why the rename was
          right.
          It no longer sits behind `driver_name`: a scheduled date is a fact
          about the assignment, not about the driver, and gating it on a driver
          hid it on every load where no driver had been recorded. */}
      {(formatLoadDate(order.scheduled_pickup_date) || formatLoadDate(order.scheduled_delivery_date)) && (
        <InfoCard title="SCHEDULE">
          {formatLoadDate(order.scheduled_pickup_date) && (
            <InfoRow label="Scheduled pickup" value={formatLoadDate(order.scheduled_pickup_date)} />
          )}
          {formatLoadDate(order.scheduled_delivery_date) && (
            <InfoRow label="Scheduled delivery" value={formatLoadDate(order.scheduled_delivery_date)} />
          )}
          <p style={{
            fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px',
            color: 'var(--v2-ink-muted, #5c5851)', lineHeight: 1.5,
            margin: '8px 0 0', maxWidth: '52ch',
          }}>
            {DATE_NOTES.y7}
          </p>
        </InfoCard>
      )}

      {/* Driver info card (dispatched orders) */}
      {['dispatched', 'completed'].includes(order.status) && order.driver_name && (
        <InfoCard title="YOUR DRIVER">
          <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '15px', fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>
            {order.driver_name}
          </div>
          {order.driver_phone && (
            <a href={`tel:${order.driver_phone}`} style={{
              display: 'inline-block', marginTop: '6px',
              fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', fontWeight: 600,
              color: 'var(--v2-ink, #050607)', textDecoration: 'underline', textUnderlineOffset: '2px',
            }}>
              {order.driver_phone}
            </a>
          )}
          {/* THE DRIVER'S NAME AND PHONE STAY, on the owner's ruling: a driver
              and a carrier are different things. Where the customer pays the
              carrier on delivery, they meet THIS person and hand over the
              money, so the number is theirs to have. §2's rule was about the
              carrier's dispatch line — the company's phone and MC — and that
              is gone from the wire entirely (VIS-1-T02).
              The scheduled date moved out to SCHEDULE, and the carrier's name
              moved out to CARRIER: neither is a fact about the driver, and
              both were invisible whenever no driver had been recorded. */}
        </InfoCard>
      )}

      {/* Status history timeline */}
      {order.status_history && order.status_history.length > 0 && (
        <InfoCard title="ORDER HISTORY">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {order.status_history.map((entry, idx) => (
              <div key={entry.id} style={{
                borderLeft: `3px solid ${idx === 0 ? 'var(--v2-ink, #050607)' : 'var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))'}`,
                paddingLeft: '12px', paddingTop: '2px', paddingBottom: '2px',
              }}>
                <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>
                  {STATUS_LABELS[entry.to_status] || entry.to_status}
                </div>
                <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '2px' }}>
                  {fmtDate(entry.created_at)}
                </div>
                {entry.cancellation_reason && (
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '13px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '4px' }}>
                    {CANCELLATION_REASON_LABELS[entry.cancellation_reason] || entry.cancellation_reason}
                  </div>
                )}
                {entry.carrier_name_at_transition && (
                  <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', marginTop: '2px' }}>
                    Carrier: {entry.carrier_name_at_transition}
                  </div>
                )}
              </div>
            ))}
          </div>
        </InfoCard>
      )}

      {/* Dispatch Details Status */}
      {['confirmed', 'dispatched'].includes(order.status) && (
        <div
          className={order.dispatch_info_completed ? pp.successBlock : pp.notice}
          style={{
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {order.dispatch_info_completed ? (
            <>
              <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--success, #0f6e56)', fontWeight: 500 }}>
                <CheckIcon size={16} /> Dispatch details provided
              </span>
              <Link to={`/portal/order/${id}/dispatch-details`} style={{
                fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink, #050607)',
                textDecoration: 'underline', textUnderlineOffset: '2px', flexShrink: 0,
              }}>
                Edit
              </Link>
            </>
          ) : (
            <>
              <div>
                <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--v2-ink, #050607)', fontWeight: 600 }}>
                  Dispatch details needed to proceed
                </span>
                {/* WGF-T03d: the exact missing facts (same list the operator sees). */}
                {(order.missing_dispatch_details || []).length > 0 && (
                  <ul style={{
                    fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)',
                    margin: '6px 0 0', paddingLeft: 18,
                  }}>
                    {order.missing_dispatch_details.map((m) => <li key={m.name}>{m.detail}</li>)}
                  </ul>
                )}
              </div>
              <Link to={`/portal/order/${id}/dispatch-details`} className={v2b.cta} style={{ flexShrink: 0 }}>
                Provide Details
              </Link>
            </>
          )}
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className={pp.errorBlock} style={{ marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {/* Success banner after saving dispatch details */}
      {dispatchSaved && (
        <div className={pp.successBlock} style={{ marginBottom: '16px', fontWeight: 500 }}>
          <CheckIcon size={16} /> Dispatch details saved successfully
        </div>
      )}

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginTop: '8px',
      }}>
        {['confirmed', 'dispatched', 'completed'].includes(order.status) && order.final_price && (
          <button onClick={async () => {
            try {
              const r = await portalFetch(`/api/portal/data/orders/${id}/invoice`);
              if (r.ok) {
                const blob = await r.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `invoice_${order.load_id || id}.pdf`;
                a.click();
                URL.revokeObjectURL(url);
              } else { setError('Invoice not available yet.'); }
            } catch { setError('Failed to download invoice.'); }
          }} className={v2b.ghostOnPaper}>
            Download Invoice
          </button>
        )}
        <button onClick={() => { setShowMessageForm(f => !f); setMessageSent(false); }} className={v2b.ghostOnPaper}>
          Contact Dispatcher
        </button>
      </div>

      {/* Message to dispatcher form */}
      {showMessageForm && (
        <div className={pp.card} style={{ marginTop: '12px', marginBottom: 0 }}>
          {messageSent ? (
            <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', color: 'var(--success, #0f6e56)', fontWeight: 500 }}>
              <CheckIcon size={16} /> Message sent! We'll respond shortly.
            </div>
          ) : (
            <>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Message to dispatcher about this order..."
                className={pp.textarea}
                style={{ minHeight: '80px' }}
              />
              <button
                disabled={sendingMessage || !message.trim()}
                onClick={async () => {
                  setSendingMessage(true);
                  try {
                    const r = await portalFetch(`/api/portal/data/orders/${id}/message`, {
                      method: 'POST',
                      body: JSON.stringify({ message: message.trim() }),
                    });
                    if (r.ok) { setMessageSent(true); setMessage(''); }
                    else { setError('Failed to send message. Please try again.'); }
                  } catch { setError('Failed to send message. Please check your connection.'); }
                  setSendingMessage(false);
                }}
                className={v2b.cta}
                style={{
                  marginTop: '8px',
                  opacity: (sendingMessage || !message.trim()) ? 0.6 : 1,
                }}
              >
                {sendingMessage ? 'Sending...' : 'Send Message'}
              </button>
            </>
          )}
        </div>
      )}

      {/* Cancel */}
      {(order.status === 'pending' || order.status === 'quoted') && (
        <>
          <button
            onClick={handleCancel}
            className={v2b.ghostOnPaper}
            style={{
              color: 'var(--v2-red-deep, #a90918)',
              borderColor: 'rgba(215, 15, 36, 0.35)',
              marginTop: '12px', width: '100%',
            }}
          >
            {confirmCancel ? 'Confirm Cancellation' : 'Cancel Order'}
          </button>
          {confirmCancel && (
            <button onClick={() => setConfirmCancel(false)} style={{
              fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)',
              background: 'none', border: 'none', cursor: 'pointer',
              marginTop: '8px', width: '100%',
            }}>
              Never mind
            </button>
          )}
        </>
      )}

      {/* Resubmit after decline */}
      {(order.status === 'declined' || order.status === 'cancelled') && (
        <button
          onClick={() => navigate(`/?vin=${encodeURIComponent(order.vin || '')}&pickup_zip=${encodeURIComponent(order.pickup_zip || '')}`)}
          className={v2b.cta}
          style={{ marginTop: '8px', width: '100%' }}
        >
          Request New Quote
        </button>
      )}
    </div>
  );
}
