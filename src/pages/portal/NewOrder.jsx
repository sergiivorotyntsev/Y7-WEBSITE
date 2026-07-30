import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { useAuth, portalFetch, authHeader, clearSessionOn401 } from '../../hooks/useAuth';
import { API_URL } from '../../config';
import { releaseDocShortTerm } from '../../utils/releaseDocTerm';
import pp from '../../styles/v2/portal.module.css';
import v2b from '../../styles/v2/buttons.module.css';
import PhoneInput from '../../components/PhoneInput';
import OnboardingBanner from '../../components/OnboardingBanner';
import BouncingEmailBanner from '../../components/recovery/BouncingEmailBanner';
import VerificationBanner from '../../components/VerificationBanner';

// WAF-T01: pickup-availability window [today .. +30 days], computed once at
// module load (not during render — react-hooks purity).
const pickupDateMin = new Date().toISOString().split('T')[0];
const pickupDateMax = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i;
const ZIP_RE = /^\d{5}$/;

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

// ─── Warehouse dropdown + preview card ───────────────────────────
function WarehouseSection({ warehouses, selectedId, onSelect, overrideActive, onToggleOverride, label, manualFields, onManualChange, showLocationName }) {
  if (warehouses.length === 0) {
    return (
      <div>
        <ManualAddressFields fields={manualFields} onChange={onManualChange} showLocationName={showLocationName} />
        <div className={pp.hint} style={{ marginTop: 8 }}>
          <Link to="/portal/locations" style={{ color: 'var(--v2-ink, #050607)', fontSize: 12, textDecoration: 'underline' }}>Add a saved location</Link> to speed up future orders.
        </div>
      </div>
    );
  }

  if (overrideActive) {
    return (
      <div>
        <ManualAddressFields fields={manualFields} onChange={onManualChange} showLocationName={showLocationName} />
        <button type="button" onClick={onToggleOverride} style={{
          background: 'none', border: 'none', color: 'var(--v2-ink, #050607)',
          fontSize: 12, fontFamily: 'var(--font-sans, system-ui)', cursor: 'pointer', padding: '4px 0', marginTop: 4, textDecoration: 'underline',
        }}>
          Use a saved location instead
        </button>
      </div>
    );
  }

  const selected = warehouses.find(w => w.id === selectedId);

  return (
    <div>
      <label className={pp.label}>{label}</label>
      <select className={pp.select} value={selectedId || ''} onChange={e => onSelect(Number(e.target.value) || null)}>
        <option value="">Select location...</option>
        {warehouses.map(w => (
          <option key={w.id} value={w.id}>
            {w.label || w.name} — {w.city}, {w.state}
          </option>
        ))}
      </select>
      {selected && (
        <div className={pp.notice} style={{ marginTop: 8, fontSize: 12 }}>
          <div>{selected.address}</div>
          <div>{selected.city}, {selected.state} {selected.zip_code}</div>
          {selected.contact_name && <div style={{ color: 'var(--v2-ink-muted, #5c5851)', marginTop: 4 }}>Contact: {selected.contact_name}{selected.contact_phone ? ` ${selected.contact_phone}` : ''}</div>}
          {selected.business_hours && <div style={{ color: 'var(--v2-ink-muted, #5c5851)' }}>Hours: {selected.business_hours}</div>}
          {selected.delivery_instructions && <div style={{ color: 'var(--v2-ink-muted, #5c5851)', marginTop: 2 }}>{selected.delivery_instructions}</div>}
        </div>
      )}
      <button type="button" onClick={onToggleOverride} style={{
        background: 'none', border: 'none', color: 'var(--v2-ink, #050607)',
        fontSize: 12, fontFamily: 'var(--font-sans, system-ui)', cursor: 'pointer', padding: '4px 0', marginTop: 4, textDecoration: 'underline',
      }}>
        Use a different location for this order
      </button>
    </div>
  );
}

// ─── Manual address entry fields ─────────────────────────────────
function ManualAddressFields({ fields, onChange, showLocationName }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* W7D-T02: driver-facing business name — feeds the CD listing's pickup
          location name (otherwise the carrier only sees the contact person). */}
      {showLocationName && (
        <div>
          <label className={pp.label}>Business / location name (if any)</label>
          <input className={pp.input} value={fields.location_name || ''} onChange={e => onChange('location_name', e.target.value)} placeholder="e.g. ABC Auto Sales" maxLength={200} />
        </div>
      )}
      <div>
        <label className={pp.label}>ZIP *</label>
        <input className={pp.input} value={fields.zip} onChange={e => onChange('zip', e.target.value.replace(/\D/g, '').slice(0, 5))} placeholder="e.g. 02466" inputMode="numeric" maxLength={5} />
      </div>
      <div>
        <label className={pp.label}>Street</label>
        <input className={pp.input} value={fields.address} onChange={e => onChange('address', e.target.value)} placeholder="123 Main St" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
        <div>
          <label className={pp.label}>City</label>
          <input className={pp.input} value={fields.city} onChange={e => onChange('city', e.target.value)} />
        </div>
        <div>
          <label className={pp.label}>State</label>
          <select className={pp.select} value={fields.state} onChange={e => onChange('state', e.target.value)}>
            <option value="">--</option>
            {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <label className={pp.label}>Contact Name</label>
          <input className={pp.input} value={fields.contact_name} onChange={e => onChange('contact_name', e.target.value)} />
        </div>
        <div>
          <label className={pp.label}>Contact Phone</label>
          <PhoneInput className={pp.input} value={fields.contact_phone} onChange={v => onChange('contact_phone', v)} />
        </div>
      </div>
    </div>
  );
}

const EMPTY_MANUAL = { zip: '', address: '', city: '', state: '', contact_name: '', contact_phone: '', location_name: '' };

// WBF-T01: two distinct eligibility sets — do not conflate them.
// WAREHOUSE_ELIGIBLE drives the saved-locations UI (directory fetch, S1 default
// auto-select, deliver-to-warehouse affordances) and KEEPS auction_buyer.
// DIRECT_SUBMIT_ELIGIBLE drives submission_type routing and must mirror the
// backend gate (dealer_verification.DIRECT_SUBMIT_TYPES = dealer/exporter):
// auction_buyer submits as quote_request — the backend 403s their direct_submit.
const WAREHOUSE_ELIGIBLE = ['dealer', 'exporter', 'auction_buyer'];
const DIRECT_SUBMIT_ELIGIBLE = ['dealer', 'exporter'];

// ─── Main component ──────────────────────────────────────────────
export default function NewOrder() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isDealer = user?.customer_type === 'dealer';
  const isExporter = user?.customer_type === 'exporter';
  // W7U-T04 (0707 §3): individuals get the pickup-source toggle too.
  const isIndividual = user?.customer_type === 'individual';
  const isWarehouseUser = WAREHOUSE_ELIGIBLE.includes(user?.customer_type);
  const isDirectSubmitter = DIRECT_SUBMIT_ELIGIBLE.includes(user?.customer_type);
  // EXP1-T01: exporter delivery is Y7-ASSIGNED after document review — the form
  // collects NO delivery (no picker, no manual fields, no delivery ZIP). Y7
  // picks the destination from their registered warehouses; the assignment
  // snapshot fills the order (EXPORTER_CABINET_PHASE0_FINDINGS §1).
  const deliveryAssignedByY7 = isExporter;

  // Warehouses
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    if (!isWarehouseUser) return;
    portalFetch('/api/portal/locations')
      .then(r => r.ok ? r.json() : { items: [] })
      .then(data => setWarehouses(data.items || []))
      .catch(() => {});
  }, [isWarehouseUser]);

  // Direction (dealer only)
  const [direction, setDirection] = useState('inbound');

  // Vehicle
  const [vin, setVin] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  // W7U-T02: customer-visible CD body type. Auto-suggested from the VIN decode
  // on blur, always editable — mirrors the admin rule "never a silent SEDAN".
  const [vehicleType, setVehicleType] = useState('');
  const [vinDecoding, setVinDecoding] = useState(false);
  const [vinDecodeNote, setVinDecodeNote] = useState('');

  // Warehouse selections
  const [pickupWarehouseId, setPickupWarehouseId] = useState(null);
  const [deliveryWarehouseId, setDeliveryWarehouseId] = useState(null);
  const [pickupOverride, setPickupOverride] = useState(false);
  const [deliveryOverride, setDeliveryOverride] = useState(false);

  // Manual address fields
  const [pickupManual, setPickupManual] = useState({ ...EMPTY_MANUAL });
  const [deliveryManual, setDeliveryManual] = useState({ ...EMPTY_MANUAL });

  const [notes, setNotes] = useState('');

  // Auction fields (auction_buyer + dealer inbound + exporter). EXP1-T01: the
  // backend requires auction_type_id for every direct_submit
  // (portal_data.py:412) and exporter pickups are auctions — hiding the block
  // made every exporter submit a guaranteed 400.
  const isAuctionBuyer = user?.customer_type === 'auction_buyer';
  // W2P-T02: the pickup SOURCE. Auction buyers + dealer-inbound choose between
  // an auction pickup (auction fields + document-first) and a one-off address
  // (manual + dry-run disclaimer). Exporter is FIXED auction (EXP-1 model,
  // byte-identical UI); dealer-outbound pickup is their saved location (the
  // manual override there IS the one-off branch); individual keeps the plain
  // manual quote form untouched.
  // W7U-T04: individual joins the toggle (0707's customer had no way to say
  // "this is an auction pickup" — parity with auction_buyer, approved Q1-A).
  const pickupSourceSelectable = isAuctionBuyer || isIndividual || (isDealer && direction === 'inbound');
  const [pickupSource, setPickupSource] = useState('auction');
  // W7U-T04: individuals default to "Other address" — their common case is a
  // one-off residence/dealership pickup, and defaulting into the auction
  // document-first redirect would skip the post-submit success screen.
  useEffect(() => {
    if (user?.customer_type === 'individual') setPickupSource('oneoff');
  }, [user?.customer_type]);
  const pickupIsAuction = isExporter || (pickupSourceSelectable && pickupSource === 'auction');
  const showAuctionFields = pickupIsAuction;
  const [auctionTypes, setAuctionTypes] = useState([]);
  const [auctionTypeId, setAuctionTypeId] = useState('');
  const [gatePassPin, setGatePassPin] = useState('');
  // WAF-T01: optional "available for pickup" date (empty = available now).
  const [preferredPickupDate, setPreferredPickupDate] = useState('');
  // W2P-T03: dry-run liability consent (one-off manual pickup only).
  const [dryRunConsent, setDryRunConsent] = useState(false);

  useEffect(() => {
    if (!showAuctionFields) return;
    portalFetch('/api/portal/data/auction-types')
      .then(r => r.ok ? r.json() : [])
      .then(setAuctionTypes)
      .catch(() => {});
  }, [showAuctionFields]);

  const selectedAuction = auctionTypes.find(t => String(t.id) === auctionTypeId);
  const auctionRequiresPin = selectedAuction && ['COPART', 'IAA'].includes(selectedAuction.code);

  // CAP-S1-W01: customer-chosen service tier. Only individual + auction_buyer
  // pay Y7 directly and choose a tier; dealers/exporters never see this.
  // Fee amounts come from the backend fee-schedule — never hardcoded.
  // WAP-T02: the $50/$65 tier does NOT apply to new-model customers
  // (pricing_model='ind_2026' — fee is max($75, 10% of carrier price)); they
  // see the formula terms instead of the tier choice.
  const isInd2026 = user?.pricing_model === 'ind_2026';
  const showTierSelector = ['individual', 'auction_buyer'].includes(user?.customer_type) && !isInd2026;
  const showInd2026Terms = ['individual', 'auction_buyer'].includes(user?.customer_type) && isInd2026;
  const [serviceTier, setServiceTier] = useState('cod');
  const [feeSchedule, setFeeSchedule] = useState(null);
  useEffect(() => {
    if (!showTierSelector) return;
    portalFetch('/api/portal/data/fee-schedule')
      .then(r => (r.ok ? r.json() : null))
      .then(data => { if (data) setFeeSchedule(data); })
      .catch(() => {});
  }, [showTierSelector]);
  const fmtFee = (cents) => (typeof cents === 'number' ? `$${(cents / 100).toFixed(0)}` : '…');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  // NEX-8-T03: document-first intake. Upload an auction document as step one;
  // extraction PROPOSES values into the same editable form below — the client
  // decides. Manual entry always stays available.
  const [docUploading, setDocUploading] = useState(false);
  const [docStatus, setDocStatus] = useState(null); // {kind:'ok'|'partial'|'failed', message}
  const [sourceDocumentId, setSourceDocumentId] = useState(null);
  const [docHours, setDocHours] = useState('');
  const [docInstructions, setDocInstructions] = useState('');
  const [docIsAcvSlip, setDocIsAcvSlip] = useState(false);
  const [docFileMeta, setDocFileMeta] = useState(null); // {name, url} for view/replace
  const [docProposedVehicle, setDocProposedVehicle] = useState(false);
  // NEX-8: manual INOPERABLE flag — invoices rarely state it, so the client
  // marks it by hand; a Gate Pass / Pickup Slip / Manheim doc may propose it.
  const [isInoperable, setIsInoperable] = useState(false);

  async function handleDocFirstUpload(file) {
    if (!file) return;
    setDocUploading(true);
    setDocStatus(null);
    // Viewable copy of what was just uploaded (blob URL — exists before the
    // order does); replacing revokes the previous one.
    setDocFileMeta(prev => {
      if (prev?.url) URL.revokeObjectURL(prev.url);
      return { name: file.name, url: URL.createObjectURL(file) };
    });
    try {
      const fd = new FormData();
      fd.append('file', file);
      // WA-T01 discipline: raw fetch + Bearer for FormData — portalFetch
      // forces Content-Type: application/json, which strips the boundary.
      const res = await fetch(`${API_URL}/api/portal/data/documents/extract`, {
        method: 'POST',
        credentials: 'include',
        headers: authHeader(),
        body: fd,
      });
      clearSessionOn401(res.status);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setDocStatus({ kind: 'failed', message: typeof data?.detail === 'string' ? data.detail : 'Upload failed. Enter the details below instead.' });
        return;
      }
      const data = await res.json();
      setSourceDocumentId(data.document_id || null);
      const ex = data.extracted || {};
      // Honesty: a failed or empty read says so plainly and falls through to
      // manual entry. A PARTIAL read (ACV has no price) is a success.
      const gotAnything = ex.vin || ex.vehicle_make || ex.pickup_address || ex.pickup_zip;
      if (data.extract_error || !gotAnything) {
        setDocStatus({
          kind: 'failed',
          message: "We saved your document but couldn't read it. Enter the details below — the file stays attached to your order.",
        });
        return;
      }
      // Propose into the form — every field stays editable.
      if (ex.vin) { setVin(ex.vin); }
      if (ex.vehicle_year) setVehicleYear(String(ex.vehicle_year));
      if (ex.vehicle_make) setVehicleMake(String(ex.vehicle_make));
      if (ex.vehicle_model) setVehicleModel(String(ex.vehicle_model));
      // Confirm-screen honesty: SHOW what was read (year/make/model are
      // normally hidden behind a full VIN) so the client can check and edit.
      if (ex.vehicle_year || ex.vehicle_make || ex.vehicle_model) setDocProposedVehicle(true);
      if (ex.is_inoperable) setIsInoperable(true);
      // A document with a VIN also selects the body type — same decode the
      // VIN-blur path uses (W7U-T02: visible select, never silently defaulted;
      // the note asks the client to confirm).
      if (ex.vin) {
        try {
          const r = await portalFetch(`/api/portal/data/decode-vin?vin=${encodeURIComponent(ex.vin)}`);
          const d = await r.json();
          if (r.ok && d.ok && d.vehicle_type) {
            setVehicleType(d.vehicle_type);
            setVinDecodeNote('Detected from your document — please confirm the body type below.');
          }
        } catch { /* decode is a convenience */ }
      }
      setPickupManual(m => ({
        ...m,
        address: ex.pickup_address || m.address,
        city: ex.pickup_city || m.city,
        state: ex.pickup_state || m.state,
        contact_name: ex.pickup_contact_name || m.contact_name,
        contact_phone: ex.pickup_phone || m.contact_phone,
        location_name: ex.pickup_name || m.location_name,
        zip: ex.pickup_zip || m.zip,
      }));
      setDocHours(ex.pickup_hours || '');
      setDocInstructions(ex.pickup_instructions || '');
      setDocIsAcvSlip(!!ex.is_acv_transport_slip);
      // Map the detected auction onto the auction branch when this customer
      // has one (exporter is fixed-auction; others get the source toggle).
      if (ex.auction_type) {
        if (pickupSourceSelectable) setPickupSource('auction');
        try {
          const r = await portalFetch('/api/portal/data/auction-types');
          if (r.ok) {
            const types = await r.json();
            setAuctionTypes(types);
            const match = (types || []).find(t => t.code === ex.auction_type);
            if (match) setAuctionTypeId(String(match.id));
          }
        } catch { /* best-effort */ }
      }
      const missing = [];
      if (!ex.vin) missing.push('VIN');
      if (!ex.pickup_zip) missing.push('pickup ZIP');
      setDocStatus({
        kind: missing.length ? 'partial' : 'ok',
        message: missing.length
          ? `Document read. We could not find: ${missing.join(', ')} — please fill those in below.`
          : `Document read${ex.auction_type ? ` (${ex.auction_type})` : ''}. Check the fields below — everything stays editable.`,
      });
    } catch {
      setDocStatus({ kind: 'failed', message: 'Upload failed. Enter the details below instead.' });
    } finally {
      setDocUploading(false);
    }
  }
  // CAP-S1-W04: enriched dealer-gate 403 payload -> friendly "under review" screen.
  const [gateBlock, setGateBlock] = useState(null);
  // T04b: duplicate-route advisory dialog ({ matches, category, primary, pZip, dZip } | null)
  const [dupDialog, setDupDialog] = useState(null);

  // Auto-select default warehouse when warehouses load
  useEffect(() => {
    if (warehouses.length === 0) return;
    const def = warehouses.find(w => w.is_default);
    const pickupWarehouses = warehouses.filter(w => ['pickup', 'both'].includes(w.usage_role));
    const deliveryWarehouses = warehouses.filter(w => ['delivery', 'both'].includes(w.usage_role));
    const defDelivery = def && ['delivery', 'both'].includes(def.usage_role) ? def.id : (deliveryWarehouses[0]?.id || null);
    const defPickup = def && ['pickup', 'both'].includes(def.usage_role) ? def.id : (pickupWarehouses[0]?.id || null);
    setDeliveryWarehouseId(defDelivery);
    setPickupWarehouseId(defPickup);
  }, [warehouses]);

  // Reset manual fields when direction changes
  useEffect(() => {
    setPickupOverride(false);
    setDeliveryOverride(false);
    setPickupManual({ ...EMPTY_MANUAL });
    setDeliveryManual({ ...EMPTY_MANUAL });
  }, [direction]);

  const vinClean = vin.trim().toUpperCase();
  const hasFullVin = VIN_RE.test(vinClean);
  // NEX-8: a document-first upload proposes year/make/model — keep them
  // visible for confirmation even when the VIN is full.
  const showVehicleDetails = !hasFullVin || docProposedVehicle;

  // Determine which side is warehouse-driven vs manual
  let pickupIsWarehouse, deliveryIsWarehouse;
  if (deliveryAssignedByY7) {
    // EXP1-T01: exporter — pickup is manual/extracted, delivery not collected.
    pickupIsWarehouse = false;
    deliveryIsWarehouse = false;
  } else if (isDealer) {
    pickupIsWarehouse = direction === 'outbound';
    deliveryIsWarehouse = direction === 'inbound';
  } else if (isWarehouseUser) {
    pickupIsWarehouse = false;
    deliveryIsWarehouse = true;
  } else {
    pickupIsWarehouse = false;
    deliveryIsWarehouse = false;
  }

  const pickupWarehouses = warehouses.filter(w => ['pickup', 'both'].includes(w.usage_role));
  const deliveryWarehouses = warehouses.filter(w => ['delivery', 'both'].includes(w.usage_role));

  // W2P-T03: a ONE-OFF manually typed pickup — not an auction, not a saved
  // directory address. Dealer-outbound reaches it via the "use a different
  // location" override (or having no saved pickup location); the selector
  // types reach it via the "Other address" source. Exporter never.
  // W7U-T04: individual joins — their manual pickup carries the same dry-run
  // liability, so the consent now covers them (parity with auction_buyer;
  // FLAGGED: adds one required checkbox to the individual flow).
  const pickupIsOneOff =
    !pickupIsAuction
    && (isDealer || isAuctionBuyer || isIndividual)
    && (pickupIsWarehouse ? (pickupOverride || !pickupWarehouseId) : true);

  function handlePickupManualChange(field, value) { setPickupManual(prev => ({ ...prev, [field]: value })); }
  function handleDeliveryManualChange(field, value) { setDeliveryManual(prev => ({ ...prev, [field]: value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (vinClean && vinClean !== 'TBD' && !VIN_RE.test(vinClean)) {
      setError('VIN must be exactly 17 characters (letters A-H, J-N, P, R-Z and digits).');
      return;
    }
    if (!hasFullVin && !vehicleMake.trim()) {
      setError('Please enter the VIN or at least the vehicle make.');
      return;
    }
    // W7U-T02: direct-submit orders go straight to fulfillment — the body type
    // must be confirmed (quote flows stay prompted-but-optional, no new block).
    if (isDirectSubmitter && !vehicleType) {
      setError('Please select the vehicle type.');
      return;
    }

    // Determine ZIPs
    let pZip, dZip;
    if (pickupIsWarehouse && !pickupOverride && pickupWarehouseId) {
      const w = warehouses.find(x => x.id === pickupWarehouseId);
      pZip = w?.zip_code || '';
    } else {
      pZip = pickupManual.zip;
    }
    if (deliveryIsWarehouse && !deliveryOverride && deliveryWarehouseId) {
      const w = warehouses.find(x => x.id === deliveryWarehouseId);
      dZip = w?.zip_code || '';
    } else {
      dZip = deliveryManual.zip;
    }

    if (!pZip || !ZIP_RE.test(pZip)) {
      setError('Pickup ZIP must be exactly 5 digits.');
      return;
    }
    // EXP1-T01: no delivery ZIP for exporter — Y7 assigns the destination.
    if (!deliveryAssignedByY7 && (!dZip || !ZIP_RE.test(dZip))) {
      setError('Delivery ZIP must be exactly 5 digits.');
      return;
    }

    // W2P-T02: an AUCTION pickup requires the auction site for every type
    // (the backend requirement is now conditional on the pickup being an
    // auction — dealer-inbound included).
    if (pickupIsAuction && !auctionTypeId) {
      setError('Please select the auction site.');
      return;
    }
    // AGR-GATE-T03: the release document is NO LONGER a hard block at submit.
    // It is issued by the auction after purchase and is often not in hand when
    // the customer is arranging the shipment, so refusing here turned him away
    // at the moment he could not comply — while the server-side dispatch
    // readiness gate (services/dispatch_readiness.py, pickup_location_complete,
    // BLOCKING for ANY auction pickup) already holds the order until one lands.
    // Blocking twice bought nothing and cost the order.
    //
    // The paired server half drops the matching 400 in the same commit; keeping
    // the client block alone would leave a refusal the backend no longer makes,
    // which is the WCF divergence shape in reverse.
    // W2P-T03: HARD BLOCK — a one-off manually typed pickup cannot submit
    // without the dry-run liability consent.
    if (pickupIsOneOff && !dryRunConsent) {
      setError('Please confirm you accept dry-run liability for the manually entered pickup address.');
      return;
    }

    // T04b: non-blocking duplicate-route advisory. A failed/empty check NEVER blocks submit.
    try {
      let pCity = '', pState = '', dCity = '', dState = '';
      if (pickupIsWarehouse && !pickupOverride && pickupWarehouseId) {
        const w = warehouses.find(x => x.id === pickupWarehouseId);
        pCity = w?.city || ''; pState = w?.state || '';
      } else { pCity = pickupManual.city || ''; pState = pickupManual.state || ''; }
      if (deliveryIsWarehouse && !deliveryOverride && deliveryWarehouseId) {
        const w = warehouses.find(x => x.id === deliveryWarehouseId);
        dCity = w?.city || ''; dState = w?.state || '';
      } else { dCity = deliveryManual.city || ''; dState = deliveryManual.state || ''; }

      const qs = new URLSearchParams({
        pickup_zip: pZip, delivery_zip: dZip,
        pickup_city: pCity, pickup_state: pState,
        delivery_city: dCity, delivery_state: dState,
      });
      const checkRes = await portalFetch(`/api/portal/data/route-check?${qs.toString()}`);
      if (checkRes.ok) {
        const checkData = await checkRes.json().catch(() => ({}));
        const matches = checkData?.matches || [];
        if (matches.length > 0) {
          const ACTIVE = ['pending', 'quoted', 'confirmed', 'dispatched'];
          const category = matches.some(m => ACTIVE.includes(m.status)) ? 'active' : 'past';
          const primary = matches.find(m => ACTIVE.includes(m.status)) || matches[0];
          setDupDialog({ matches, category, primary, pZip, dZip });
          return;
        }
      }
    } catch {
      /* advisory only — ignore and proceed to submit */
    }

    await submitOrder(pZip, dZip);
  }

  async function submitOrder(pZip, dZip) {
    setSubmitting(true);
    try {
      // WBF-T01: routing keys on DIRECT_SUBMIT_ELIGIBLE, not warehouse
      // eligibility — auction_buyer keeps the warehouse UI but goes quote flow.
      const submissionType = isDirectSubmitter ? 'direct_submit' : 'quote_request';
      const body = {
        vin: vinClean || 'TBD',
        vehicle_year: vehicleYear.trim() || undefined,
        vehicle_make: vehicleMake.trim() || undefined,
        vehicle_model: vehicleModel.trim() || undefined,
        vehicle_type: vehicleType || undefined,  // W7U-T02
        pickup_zip: pZip,
        delivery_zip: dZip,
        notes: notes.trim() || undefined,
        submission_type: submissionType,
        is_inoperable: isInoperable,
        // W2P-T02: auction credentials ride ONLY when the pickup IS an auction
        // (a stale site selection from a switched-away source must not flip
        // the server's auction signal); the explicit pickup_location_type is
        // the locked backend signal.
        auction_type_id: (pickupIsAuction && auctionTypeId) || undefined,
        gate_pass_pin: (pickupIsAuction && gatePassPin.trim()) || undefined,
        pickup_location_type: pickupIsAuction ? 'Auction' : undefined,
        // W2P-T03: dry-run liability consent (one-off manual pickup only).
        pickup_disclaimer_accepted: pickupIsOneOff ? dryRunConsent : undefined,
        // CAP-S1-W01: only individual/auction_buyer send a tier; backend ignores
        // it for other types regardless.
        service_tier: showTierSelector ? serviceTier : undefined,
        // WAF-T01: direct-submitters (dealer/exporter) state availability here —
        // it's their only surface. quote_request types (individual/auction_buyer)
        // are asked later in Dispatch Details, when they know the date.
        preferred_pickup_date: (isDirectSubmitter && preferredPickupDate) || undefined,
        // NEX-8-T03: document-first — link the uploaded doc to the new order,
        // and carry the document's hours/instructions into the pickup fields.
        source_document_id: sourceDocumentId || undefined,
        pickup_business_hours: docHours || undefined,
        special_instructions: docInstructions || undefined,
      };

      // Pickup side
      if (pickupIsWarehouse && !pickupOverride && pickupWarehouseId) {
        body.pickup_warehouse_id = pickupWarehouseId;
      } else {
        if (pickupManual.address) body.pickup_address = pickupManual.address;
        if (pickupManual.city) body.pickup_city = pickupManual.city;
        if (pickupManual.state) body.pickup_state = pickupManual.state;
        if (pickupManual.contact_name) body.pickup_contact_name = pickupManual.contact_name;
        if (pickupManual.contact_phone) body.pickup_contact_phone = pickupManual.contact_phone;
        // W7D-T02: driver-facing business name -> CD pickup locationName.
        if (pickupManual.location_name) body.pickup_location_name = pickupManual.location_name.trim();
      }

      // Delivery side — EXP1-T01: exporters send NO delivery fields at all
      // (strict-empty; the intake gate also skips server-side auto-fill, so
      // delivery appears only when Y7 assigns it).
      if (!deliveryAssignedByY7) {
        if (deliveryIsWarehouse && !deliveryOverride && deliveryWarehouseId) {
          body.delivery_warehouse_id = deliveryWarehouseId;
        } else {
          if (deliveryManual.address) body.delivery_address = deliveryManual.address;
          if (deliveryManual.city) body.delivery_city = deliveryManual.city;
          if (deliveryManual.state) body.delivery_state = deliveryManual.state;
          if (deliveryManual.contact_name) body.delivery_contact_name = deliveryManual.contact_name;
          if (deliveryManual.contact_phone) body.delivery_contact_phone = deliveryManual.contact_phone;
        }
      }

      // Auction fields — numeric id, only on the auction branch (W2P-T02).
      if (pickupIsAuction && auctionTypeId) body.auction_type_id = parseInt(auctionTypeId);

      const res = await portalFetch('/api/portal/data/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        // EXP1-T01 (Q6) + W2P-T02: document-first flows go STRAIGHT to upload —
        // exporters always; dealers/auction buyers when the pickup is an
        // AUCTION (the document is mandatory: extraction fills pickup +
        // lot/buyer). OrderDetail scrolls to + highlights the intake card.
        if (deliveryAssignedByY7 || pickupIsAuction) {
          navigate(`/portal/order/${data.order_id}?upload=1`, { replace: true });
          return;
        }
        setSuccess({ orderId: data.order_id, loadId: data.load_id });
      } else {
        const data = await res.json().catch(() => ({}));
        const detail = data?.detail;
        // DEALER-LIFECYCLE-G1: backend gates (company_verification_required,
        // trial_quotes_exhausted, …) return a structured dict detail. Render its
        // human-readable message instead of swallowing it as a generic error.
        if (detail && typeof detail === 'object') {
          // CAP-S1-W04: the dealer-verification gates get a friendly full
          // "under review" screen (enriched payload), not a bare inline error.
          // EXP2: locations_required (the exporter backstop 403) joins them —
          // a full panel with a CTA to register warehouses beats inline text.
          if (
            detail.error === 'company_verification_required'
            || detail.error === 'trial_quotes_exhausted'
            || detail.error === 'locations_required'
          ) {
            setGateBlock(detail);
          } else {
            setError(detail.detail || detail.message || 'This action is not available for your account yet.');
          }
        } else {
          // FX-2: never surface a raw backend validation string (e.g.
          // "auction_type_id required for direct_submit"). Map anything that
          // looks technical to a friendly message.
          const raw = typeof detail === 'string' ? detail : '';
          const looksTechnical = /_id\b|direct_submit|null|undefined|traceback|exception/i.test(raw);
          setError(
            raw && !looksTechnical
              ? raw
              : 'Something needs attention before we can submit this order. Please review the form and try again.'
          );
        }
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  // FX-2: gate pending/unverified dealers & exporters UP FRONT — direct
  // orders require a verified company. Don't let them fill the entire form
  // only to be blocked server-side. Trial quotes stay available via the
  // public quote flow; direct orders open once the account is approved.
  const _vstatus = user?.company_verification_status;
  const _needsVerification =
    ['dealer', 'exporter'].includes(user?.customer_type) &&
    _vstatus &&
    _vstatus !== 'verified';
  if (_needsVerification && !success) {
    // VER-1-T03: the customer is addressed as the kind of customer they
    // are, and the screen names EVERY gate that stands between them and a
    // direct order — verification, agreement, warehouses — with what to do
    // about each. Three server gates no longer collapse into one
    // dealer-worded screen.
    const isExp = user?.customer_type === 'exporter';
    const kind = isExp ? 'exporter' : 'dealer';
    const rejected = _vstatus === 'rejected';
    const heading = rejected
      ? `Your ${kind} account was not approved`
      : `Your ${kind} account is being verified`;
    const bodyText = rejected
      ? 'Your application was not approved. Please contact us if you would like to discuss next steps.'
      : (isExp
        ? 'Before you can submit orders directly, our team verifies your export business. Meanwhile you can send us orders by email as usual — direct orders open as soon as you are approved.'
        : "Before you can submit orders directly, our team verifies your dealership details. You can still request a quote in the meantime — direct orders open as soon as you're approved.");
    const gates = [
      {
        label: 'Company verification',
        ok: false,
        note: rejected ? 'not approved — contact us' : 'in review by Y7',
      },
      {
        label: 'Transport agreement',
        ok: !!user?.agreement_signed,
        note: user?.agreement_signed ? 'signed' : 'not signed — open account setup to sign',
      },
      ...(isExp
        ? [{
            label: 'Delivery warehouse',
            ok: !!user?.has_delivery_locations,
            note: user?.has_delivery_locations ? 'on file' : 'add one under Locations',
          }]
        : []),
    ];
    return (
      <div className={pp.shell}>
        <div className={pp.measureNarrow}>
          <PageMeta title={heading} />
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '50vh', padding: '40px 24px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '44px', marginBottom: '16px' }}>&#128737;</div>
            <h1 className={pp.pageTitle} style={{ marginBottom: 12 }}>{heading}</h1>
            <p className={pp.pageSub} style={{ maxWidth: 440, marginBottom: 16 }}>{bodyText}</p>
            <div style={{ textAlign: 'left', margin: '0 auto 24px', fontFamily: 'var(--font-sans, system-ui)', fontSize: 13, lineHeight: 2 }}>
              {gates.map(g => (
                <div key={g.label}>
                  <span style={{ color: g.ok ? '#0F6E56' : '#B45309', fontWeight: 700 }}>{g.ok ? '✓' : '•'}</span>{' '}
                  <strong>{g.label}:</strong> {g.note}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/portal/application" className={v2b.cta}>View your application</Link>
              <button onClick={() => navigate('/portal/dashboard')} className={v2b.ghostOnPaper}>Go to Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EXP2-T04: exporter pre-check — the model requires a complete warehouse
  // directory before the first order (Y7 assigns delivery from it). The
  // backend locations_required 403 is the backstop; this panel is the UX.
  // Strict === false: fail open when the backend doesn't send the flag.
  if (isExporter && user?.has_delivery_locations === false && !success) {
    return (
      <div className={pp.shell}>
        <div className={pp.measureNarrow}>
          <PageMeta title="Register your export warehouses" />
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '50vh', padding: '40px 24px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '44px', marginBottom: '16px' }}>&#127981;</div>
            <h1 className={pp.pageTitle} style={{ marginBottom: 12 }}>
              Register your export warehouses first
            </h1>
            <p className={pp.pageSub} style={{ maxWidth: 440, marginBottom: 28 }}>
              Y7 assigns each shipment to the optimal warehouse from your saved
              locations — add every export warehouse you have a contract with,
              then come back to place your first order.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/portal/locations" className={v2b.cta}>Add your warehouses</Link>
              <button onClick={() => navigate('/portal/dashboard')} className={v2b.ghostOnPaper}>Go to Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gateBlock) {
    // CAP-S1-W04: pinned copy (no time/SLA promises); CTA to Contact us.
    // EXP2: locations_required variant — CTA to register warehouses instead.
    const isTrial = gateBlock.error === 'trial_quotes_exhausted';
    const isLocations = gateBlock.error === 'locations_required';
    // VER-1-T03: type-correct copy — and the server's own message wins where
    // it carries nuance (rejected / needs_details) the local strings lack.
    const _kind = user?.customer_type === 'exporter' ? 'exporter' : 'dealer';
    const _biz = user?.customer_type === 'exporter' ? 'export business' : 'dealership details';
    const heading = isLocations
      ? 'Register your export warehouses first'
      : isTrial
        ? "You've reached your trial quote limit"
        : `Your ${_kind} account is being verified`;
    const bodyText = isLocations
      ? (gateBlock.message
        || 'Y7 assigns each shipment to the optimal warehouse from your saved locations — add every export warehouse you have a contract with, then come back to place your order.')
      : isTrial
        ? `Your account has used its trial quote requests pending verification. Once our team verifies your ${_biz}, you can submit without limits — we’ll be in touch.`
        : (gateBlock.message
          || `Before you can submit orders directly, our team verifies your ${_biz}. We’ll email you as soon as your account is approved.`);
    return (
      <div className={pp.shell}>
        <div className={pp.measureNarrow}>
          <PageMeta title={heading} />
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '50vh', padding: '40px 24px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '44px', marginBottom: '16px' }}>{isLocations ? <>&#127981;</> : <>&#128737;</>}</div>
            <h1 className={pp.pageTitle} style={{ marginBottom: 12 }}>{heading}</h1>
            <p className={pp.pageSub} style={{ maxWidth: 420, marginBottom: 28 }}>{bodyText}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {/* EXP2 review: same destination as the pre-check panel — the model
                  is multi-warehouse; LocationSetup is single-location, redirects
                  away at >=1, and lacks the port field. One destination, one task. */}
              {isLocations
                ? <Link to="/portal/locations" className={v2b.cta}>Add your warehouses</Link>
                : <Link to="/contact" className={v2b.cta}>Contact us</Link>}
              <button onClick={() => navigate('/portal/dashboard')} className={v2b.ghostOnPaper}>Go to Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className={pp.shell}>
        <div className={pp.measureNarrow}>
          <PageMeta title="Order Submitted" />
          <div style={{ textAlign: 'center', padding: '60px 0', animation: 'fadeUp 0.4s ease-out' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#10003;</div>
            <h1 className={pp.pageTitle} style={{ marginBottom: 12 }}>Order Submitted</h1>
            <p className={pp.pageSub} style={{ marginBottom: showTierSelector ? 20 : 32 }}>
              {/* WBF-T01: copy describes the post-submit flow (direct vs quote),
                  so it keys on the submission set — auction_buyer gets the quote wording. */}
              {isDirectSubmitter
                ? "Request received. We'll source the best-priced carrier; your transport price will appear here once it's set."
                : 'Your transport request has been received. Our dispatcher will review it and send you a quote shortly.'}
            </p>
            {/* CAP-S1-W03: ownership-proof prompt (individual/auction_buyer). Soft — speeds dispatch, not a hard block.
                W7U-T05: benefit-first copy — the document does TWO jobs: we read
                it and fill the pickup details, and it doubles as ownership proof. */}
            {showTierSelector && success.orderId && (
              <div className={pp.notice} style={{ textAlign: 'left', maxWidth: 440, margin: '0 auto 28px' }}>
                <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '14px', fontWeight: 600, color: 'var(--v2-ink, #050607)', marginBottom: 4 }}>
                  Have the purchase paperwork? Upload it — we&rsquo;ll do the typing.
                </div>
                <div style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: '12px', color: 'var(--v2-ink-muted, #5c5851)', lineHeight: 1.5, marginBottom: 10 }}>
                  Snap or attach your bill of sale, auction invoice, or title and we
                  read the pickup details off it — location name, address, lot and
                  buyer numbers — so you don&rsquo;t retype them. It also counts as
                  your proof of ownership, which we need before dispatch anyway.
                </div>
                <Link to={`/portal/order/${success.orderId}`} className={v2b.ghostOnPaper} style={{ padding: '8px 16px', minHeight: 0, fontSize: '13px' }}>
                  Upload the document
                </Link>
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/portal/dashboard')} className={v2b.cta}>Go to Dashboard</button>
              <button onClick={() => { setSuccess(null); setVin(''); setVehicleYear(''); setVehicleMake(''); setVehicleModel(''); setVehicleType(''); setVinDecodeNote(''); setPickupManual({ ...EMPTY_MANUAL }); setDeliveryManual({ ...EMPTY_MANUAL }); setNotes(''); }} className={v2b.ghostOnPaper}>Submit Another</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={pp.shell}>
      <div className={pp.measureNarrow}>
      <PageMeta title="New Transport Order" />
      <BouncingEmailBanner />
      <OnboardingBanner />
      <VerificationBanner />
      <Link to="/portal/dashboard" className={pp.backLink}>&larr; Back to Dashboard</Link>
      <h1 className={pp.pageTitle} style={{ marginBottom: 8 }}>New Transport Order</h1>
      <p className={pp.pageSub} style={{ marginBottom: 6 }}>
        {/* WBF-T01: submission-flow copy — keyed on the direct-submit set.
            EXP1-T01: exporter gets doc-first wording (Y7 assigns delivery). */}
        {isExporter
          ? 'Submit your vehicle and upload the auction documents. Y7 will review and assign the destination warehouse.'
          : isDirectSubmitter
            ? "Submit your vehicle. We'll source the best-priced carrier — your transport price will appear here once it's set."
            : "Submit a transport request. We'll review it and send you a quote."}
      </p>
      <p className={pp.pageSub} style={{ fontSize: 12, marginBottom: 24 }}>
        Contact info from your profile will be used.{' '}
        <Link to="/portal/profile" style={{ color: 'var(--v2-ink, #050607)', textDecoration: 'underline' }}>Update in Profile</Link>
      </p>

      <form onSubmit={handleSubmit}>
        {/* NEX-8-T03: document-first intake — upload becomes step one.
            Extraction proposes; the client decides. Manual entry always stays. */}
        <div className={pp.card}>
          <div className={pp.sectionTitle}>Start from your auction invoice</div>
          <p style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: 13, color: 'var(--v2-ink-muted, #5c5851)', margin: '0 0 12px', lineHeight: 1.5 }}>
            Upload your Copart, IAA, Manheim or ACV document (PDF or photo) and we
            read the vehicle and pickup details off it. You can also just enter
            everything manually below.
          </p>
          <label className={v2b.ghostOnPaper} style={{ display: 'inline-block', padding: '10px 18px', cursor: docUploading ? 'wait' : 'pointer', fontSize: 13 }}>
            {docUploading ? 'Reading your document…' : sourceDocumentId ? 'Upload a different document' : 'Upload document'}
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.heic,.webp"
              style={{ display: 'none' }}
              disabled={docUploading}
              onChange={e => { handleDocFirstUpload(e.target.files?.[0]); e.target.value = ''; }}
            />
          </label>
          {docFileMeta && (
            <span style={{ marginLeft: 12, fontFamily: 'var(--font-sans, system-ui)', fontSize: 13 }}>
              <a
                href={docFileMeta.url}
                target="_blank"
                rel="noreferrer"
                data-testid="doc-first-view"
                style={{ color: 'var(--v2-ink, #050607)', textDecoration: 'underline' }}
              >
                View {docFileMeta.name} &#8599;
              </a>
            </span>
          )}
          {docStatus && (
            <div
              role="status"
              data-testid="doc-first-status"
              style={{
                marginTop: 10, padding: '10px 12px', borderRadius: 8, fontSize: 13,
                fontFamily: 'var(--font-sans, system-ui)', lineHeight: 1.5,
                background: docStatus.kind === 'failed' ? 'rgba(180, 60, 40, 0.08)' : 'rgba(60, 130, 70, 0.08)',
                color: 'var(--v2-ink, #050607)',
                border: `1px solid ${docStatus.kind === 'failed' ? 'rgba(180, 60, 40, 0.3)' : 'rgba(60, 130, 70, 0.3)'}`,
              }}
            >
              {docStatus.message}
              {docIsAcvSlip && (
                <div style={{ marginTop: 6, fontSize: 12, color: 'var(--v2-ink-muted, #5c5851)' }}>
                  This ACV transport slip doubles as your pickup authorization —
                  no separate gate pass is needed.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Direction toggle (dealer only) */}
        {isDealer && (
          <div className={pp.card}>
            <div className={pp.sectionTitle}>Direction</div>
            <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
              {[
                { value: 'inbound', label: 'Inbound', desc: 'Ship TO my location' },
                { value: 'outbound', label: 'Outbound', desc: 'Ship FROM my location' },
              ].map(opt => (
                <button key={opt.value} type="button" onClick={() => setDirection(opt.value)} style={{
                  flex: 1, padding: '12px 16px', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans, system-ui)', textAlign: 'center',
                  background: direction === opt.value ? 'var(--v2-ink, #050607)' : 'var(--v2-card-cream, #fffaf1)',
                  color: direction === opt.value ? 'var(--v2-text-on-dark, #f4f0e8)' : 'var(--v2-ink, #050607)',
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{opt.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Vehicle */}
        <div className={pp.card}>
          <div className={pp.sectionTitle}>Vehicle</div>
          <div style={{ marginBottom: 12 }}>
            <label className={pp.label}>VIN Number</label>
            <input
              className={pp.input}
              value={vin}
              onChange={e => setVin(e.target.value)}
              onBlur={async () => {
                // W7U-T02: decode on blur — fills year/make/model (if empty)
                // and suggests the visible body type. Best-effort: failures
                // leave the form untouched.
                const v = vin.trim().toUpperCase();
                if (!VIN_RE.test(v)) return;
                setVinDecoding(true); setVinDecodeNote('');
                try {
                  const r = await portalFetch(`/api/portal/data/decode-vin?vin=${encodeURIComponent(v)}`);
                  const d = await r.json();
                  if (r.ok && d.ok) {
                    if (d.vehicle_year && !vehicleYear.trim()) setVehicleYear(String(d.vehicle_year));
                    if (d.vehicle_make && !vehicleMake.trim()) setVehicleMake(d.vehicle_make);
                    if (d.vehicle_model && !vehicleModel.trim()) setVehicleModel(d.vehicle_model);
                    if (d.vehicle_type) {
                      setVehicleType(d.vehicle_type);
                      setVinDecodeNote(`Detected from VIN — please confirm the body type below.`);
                    } else {
                      setVinDecodeNote('VIN decoded — please pick the body type below.');
                    }
                  }
                } catch { /* silent — decode is a convenience */ }
                setVinDecoding(false);
              }}
              placeholder="Enter 17-character VIN or leave blank"
              maxLength={17}
            />
            <div className={pp.hint}>
              {vinDecoding ? 'Decoding VIN…' : (vinDecodeNote || 'Optional. If unknown, enter vehicle details below.')}
            </div>
          </div>
          {/* W7U-T02: visible, editable body type (never silently defaulted).
              Required for direct-submit forms; optional on quote forms. */}
          <div style={{ marginBottom: 12 }}>
            <label className={pp.label}>Vehicle type {isDirectSubmitter ? '*' : '(helps carriers quote right)'}</label>
            <select className={pp.select} value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
              <option value="">Select...</option>
              <option value="sedan">Sedan / Coupe / Hatchback</option>
              <option value="suv">SUV / Crossover</option>
              <option value="truck">Pickup / Truck</option>
              <option value="van">Van / Minivan</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, cursor: 'pointer', fontFamily: 'var(--font-sans, system-ui)', fontSize: 13 }}>
            <input
              type="checkbox"
              checked={isInoperable}
              onChange={e => setIsInoperable(e.target.checked)}
              data-testid="inoperable-checkbox"
            />
            Vehicle is inoperable (does not run) &mdash; carriers need a winch
          </label>
          {showVehicleDetails && (
            <div>
              <div className={pp.hint} style={{ marginTop: 0, marginBottom: 8 }}>
                {docProposedVehicle ? 'Read from your document — check and edit as needed:' : "Don't have the VIN? Enter vehicle details:"}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label className={pp.label}>Year</label>
                  <input className={pp.input} value={vehicleYear} onChange={e => setVehicleYear(e.target.value)} placeholder="2022" maxLength={4} inputMode="numeric" />
                </div>
                <div>
                  <label className={pp.label}>Make *</label>
                  <input className={pp.input} value={vehicleMake} onChange={e => setVehicleMake(e.target.value)} placeholder="Honda" />
                </div>
                <div>
                  <label className={pp.label}>Model</label>
                  <input className={pp.input} value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} placeholder="CR-V" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pickup */}
        <div className={pp.card}>
          <div className={pp.sectionTitle}>
            Pickup {pickupIsWarehouse ? '(from your location)' : ''}
          </div>
          {/* W2P-T02: pickup source — Auction vs one-off address (dealer-inbound
              + auction buyer). Reuses the direction-toggle button pattern. */}
          {pickupSourceSelectable && (
            <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))', marginBottom: 12 }}>
              {[
                { value: 'auction', label: 'Auction pickup', desc: 'Copart, IAA, Manheim…' },
                { value: 'oneoff', label: 'Other address', desc: 'Residence / business' },
              ].map(opt => (
                <button key={opt.value} type="button" onClick={() => setPickupSource(opt.value)} style={{
                  flex: 1, padding: '12px 16px', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans, system-ui)', textAlign: 'center',
                  background: pickupSource === opt.value ? 'var(--v2-ink, #050607)' : 'var(--v2-card-cream, #fffaf1)',
                  color: pickupSource === opt.value ? 'var(--v2-text-on-dark, #f4f0e8)' : 'var(--v2-ink, #050607)',
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{opt.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          )}
          {pickupIsWarehouse ? (
            <WarehouseSection
              warehouses={pickupWarehouses}
              selectedId={pickupWarehouseId}
              onSelect={setPickupWarehouseId}
              overrideActive={pickupOverride}
              onToggleOverride={() => { setPickupOverride(!pickupOverride); if (!pickupOverride) setPickupWarehouseId(null); }}
              label="Pick up from"
              manualFields={pickupManual}
              onManualChange={handlePickupManualChange}
              showLocationName
            />
          ) : (
            <ManualAddressFields fields={pickupManual} onChange={handlePickupManualChange} showLocationName />
          )}
          {/* W2P-T02: document-first messaging for auction pickups (exporter has
              its own EXP-1 flow copy — same redirect, no duplicate hint). */}
          {pickupIsAuction && !isExporter && (
            <div className={pp.hint} style={{ marginTop: 10 }}>
              Auction pickups are document-first: right after submitting you&rsquo;ll
              upload the auction document and we&rsquo;ll read the exact pickup
              address, lot and buyer number from it.
            </div>
          )}
          {/* W2P-T03: the dry-run liability consent — HARD BLOCK on the one-off
              manual branch only. */}
          {pickupIsOneOff && (
            <label className={pp.notice} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 12, cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={dryRunConsent}
                onChange={e => setDryRunConsent(e.target.checked)}
                style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: 'var(--v2-red, #d70f24)' }}
              />
              <span style={{ fontFamily: 'var(--font-sans, system-ui)', fontSize: 13, color: 'var(--v2-ink, #050607)', lineHeight: 1.5 }}>
                I confirm this pickup address is correct. If the carrier cannot
                pick up because the address is wrong, <strong>I am responsible for
                the carrier&rsquo;s dry-run fee</strong>.
              </span>
            </label>
          )}
          {/* WAF-T01: optional availability date — direct-submitters (dealer/
              exporter) state it here; quote_request types are asked in Dispatch
              Details later. Empty = available now. Window [today .. +30 days]. */}
          {isDirectSubmitter && (
            <div style={{ marginTop: 12 }}>
              <label className={pp.label}>When is the vehicle available for pickup?</label>
              <input
                type="date"
                value={preferredPickupDate}
                onChange={e => setPreferredPickupDate(e.target.value)}
                min={pickupDateMin}
                max={pickupDateMax}
                className={pp.input}
                style={{ width: 'auto' }}
              />
              <div className={pp.hint}>
                Leave empty if it&rsquo;s available now.
              </div>
            </div>
          )}
        </div>

        {/* Delivery */}
        <div className={pp.card}>
          <div className={pp.sectionTitle}>
            Delivery {deliveryIsWarehouse ? '(to your location)' : ''}
          </div>
          {deliveryAssignedByY7 ? (
            /* EXP1-T01: exporter — no delivery entry; quiet info panel reusing
               the input-box tokens. */
            <div className={pp.notice} style={{ lineHeight: 1.6 }}>
              Y7 will review your documents and assign the optimal destination
              warehouse from your registered locations. You&rsquo;ll see the
              delivery details on this order once it&rsquo;s set.
            </div>
          ) : deliveryIsWarehouse ? (
            <WarehouseSection
              warehouses={deliveryWarehouses}
              selectedId={deliveryWarehouseId}
              onSelect={setDeliveryWarehouseId}
              overrideActive={deliveryOverride}
              onToggleOverride={() => { setDeliveryOverride(!deliveryOverride); if (!deliveryOverride) setDeliveryWarehouseId(null); }}
              label="Deliver to"
              manualFields={deliveryManual}
              onManualChange={handleDeliveryManualChange}
            />
          ) : (
            <ManualAddressFields fields={deliveryManual} onChange={handleDeliveryManualChange} />
          )}
        </div>

        {/* WAP-T02: new-model customers see their contract terms up front —
            no tier choice (the fee is the formula, and payment is always COD). */}
        {showInd2026Terms && (
          <div className={pp.card}>
            <div className={pp.sectionTitle}>How payment works</div>
            <div className={pp.notice} style={{ lineHeight: 1.6 }}>
              <div style={{ marginBottom: 6 }}>
                <strong>Broker service fee:</strong> $75 minimum or 10% of the carrier
                price — you&rsquo;ll see the exact range on your quote; the final amount
                is set when your carrier is assigned.
              </div>
              <div>
                <strong>Carrier payment:</strong> you (or your designee) pay the carrier
                COD at pickup or at delivery.
              </div>
            </div>
          </div>
        )}

        {/* CAP-S1-W01: service tier (individual + auction_buyer only) */}
        {showTierSelector && (
          <div className={pp.card}>
            <div className={pp.sectionTitle}>How should the carrier be paid?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                {
                  value: 'cod',
                  title: `COD — pay the driver at delivery (Y7 dispatch fee: ${fmtFee(feeSchedule?.cod_fee_cents)})`,
                  desc: "You pay the carrier directly when your vehicle arrives and is inspected. Choose this if you'll be available at delivery.",
                },
                {
                  value: 'full_service',
                  title: `Full service — Y7 handles carrier payment (dispatch fee: ${fmtFee(feeSchedule?.full_service_fee_cents)})`,
                  desc: "We pay the carrier and bill you the carrier's rate plus a single dispatch fee. Choose this if you can't be at delivery to pay.",
                },
              ].map(opt => {
                const selected = serviceTier === opt.value;
                return (
                  <label key={opt.value} style={{
                    display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer',
                    padding: selected ? '11px 13px' : '12px 14px', borderRadius: 8,
                    border: selected ? '2px solid var(--v2-red, #d70f24)' : '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))',
                    background: 'var(--v2-card-cream, #fffaf1)',
                  }}>
                    <input
                      type="radio"
                      name="service_tier"
                      value={opt.value}
                      checked={selected}
                      onChange={() => setServiceTier(opt.value)}
                      style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: 'var(--v2-red, #d70f24)' }}
                    />
                    <span>
                      <span style={{ display: 'block', fontFamily: 'var(--font-sans, system-ui)', fontSize: 14, fontWeight: 600, color: 'var(--v2-ink, #050607)' }}>{opt.title}</span>
                      <span style={{ display: 'block', fontFamily: 'var(--font-sans, system-ui)', fontSize: 12, color: 'var(--v2-ink-muted, #5c5851)', marginTop: 2, lineHeight: 1.5 }}>{opt.desc}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <div className={pp.hint} style={{ marginTop: 10 }}>
              This is Y7's dispatch fee only — the carrier's transport rate is quoted separately.
            </div>
          </div>
        )}

        {/* Auction fields */}
        {showAuctionFields && (
          <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--v2-card-cream, #fffaf1)', borderRadius: '8px', border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))' }}>
            <div className={pp.sectionTitle}>Auction Information</div>
            <div style={{ marginBottom: '12px' }}>
              <label className={pp.label}>Auction Site {(isAuctionBuyer || isIndividual) ? '*' : ''}</label>
              <select
                className={pp.select}
                value={auctionTypeId}
                onChange={e => { setAuctionTypeId(e.target.value); setGatePassPin(''); }}
              >
                <option value="">Select auction site...</option>
                {auctionTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            {auctionTypeId && (auctionRequiresPin || selectedAuction?.code === 'MANHEIM') && (
              <div>
                {/* W7U-T03: auction-aware term — Manheim says "Vehicle Release",
                    not Copart's "Gate Pass PIN". */}
                <label className={pp.label}>
                  {releaseDocShortTerm(selectedAuction?.code)} {auctionRequiresPin ? '(needed before pickup)' : '(if available)'}
                </label>
                <input
                  className={pp.input}
                  type="text"
                  value={gatePassPin}
                  onChange={e => setGatePassPin(e.target.value)}
                  placeholder={auctionRequiresPin ? 'Add it now, or later from the order' : 'Optional'}
                  maxLength={50}
                />
                {/* AGR-GATE-T03: the asterisk used to mean "you cannot submit
                    without this", and submit refused. It is still REQUIRED —
                    the vehicle cannot be collected without it and dispatch
                    readiness blocks on it — but it is not required NOW, and
                    saying so is what stops the customer being turned away at
                    the one moment he cannot comply. Honest about both facts
                    rather than dropping the requirement or pretending it is
                    optional. */}
                {auctionRequiresPin && !gatePassPin.trim() && (
                  <div style={{
                    fontSize: 13, lineHeight: 1.5, marginTop: 6,
                    color: '#92400E', background: '#FFFBEB',
                    border: '1px solid #FDE68A', borderRadius: 8, padding: '8px 10px',
                  }}>
                    We can take the order without it. The vehicle cannot be
                    collected until the {releaseDocShortTerm(selectedAuction?.code).toLowerCase()} is
                    on file — add it here, or from the order once the auction issues it.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        <div style={{ marginBottom: '24px' }}>
          <label className={pp.label}>Notes</label>
          <textarea
            className={pp.textarea}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Special instructions, vehicle details, etc."
          />
        </div>

        {error && (
          <div className={pp.errorBlock} style={{ marginBottom: 16 }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={submitting} className={v2b.cta} style={{
          width: '100%',
          opacity: submitting ? 0.7 : 1,
          cursor: submitting ? 'default' : 'pointer',
        }}>
          {submitting ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>

      {/* T04b: non-blocking duplicate-route advisory dialog */}
      {dupDialog && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5, 6, 7, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div style={{ background: 'var(--v2-card-cream, #fffaf1)', border: '1px solid var(--v2-line-on-paper, rgba(5, 6, 7, 0.14))', borderRadius: '16px', padding: '28px 24px', width: '100%', maxWidth: '440px', fontFamily: 'var(--font-sans, system-ui)' }}>
            <h3 style={{ fontFamily: 'var(--v2-font-display, Oswald, system-ui)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.01em', fontSize: '18px', color: 'var(--v2-ink, #050607)', margin: '0 0 10px' }}>
              {dupDialog.category === 'active' ? 'Possible duplicate request' : 'Similar past request'}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--v2-ink-muted, #5c5851)', lineHeight: 1.5, margin: '0 0 20px' }}>
              {(() => {
                const ref = dupDialog.primary.web_reference || `#${dupDialog.primary.id}`;
                const status = dupDialog.primary.status;
                return dupDialog.category === 'active'
                  ? `You already have an active request for this route (${ref}, ${status}).`
                  : `You have a past request for this route (${ref}, ${status}).`;
              })()}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button type="button" onClick={() => { const d = dupDialog; setDupDialog(null); submitOrder(d.pZip, d.dZip); }} className={v2b.cta} style={{ width: '100%' }}>
                {dupDialog.category === 'active' ? 'Submit anyway' : 'Re-submit as new'}
              </button>
              <button type="button" onClick={() => navigate(`/portal/orders/${dupDialog.primary.id}`)} className={v2b.ghostOnPaper} style={{ width: '100%' }}>
                View existing
              </button>
              <button type="button" onClick={() => setDupDialog(null)} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--v2-ink-muted, #5c5851)', fontFamily: 'var(--font-sans, system-ui)', cursor: 'pointer', padding: '10px', textDecoration: 'underline' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
