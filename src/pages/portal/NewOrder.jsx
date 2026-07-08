import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { releaseDocShortTerm } from '../../utils/releaseDocTerm';
import { colors, fonts, button as btnStyles } from '../../theme';
import PhoneInput from '../../components/PhoneInput';
import OnboardingBanner from '../../components/OnboardingBanner';
import BouncingEmailBanner from '../../components/recovery/BouncingEmailBanner';
import VerificationBanner from '../../components/VerificationBanner';

// WAF-T01: pickup-availability window [today .. +30 days], computed once at
// module load (not during render — react-hooks purity).
const pickupDateMin = new Date().toISOString().split('T')[0];
const pickupDateMax = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

const inputStyle = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  padding: '10px 14px',
  borderRadius: '8px',
  border: `1px solid ${colors.borderInput}`,
  background: colors.bgInput,
  color: colors.text,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
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
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'block',
  marginBottom: '4px',
};

const hintStyle = {
  fontFamily: fonts.sans,
  fontSize: '12px',
  color: colors.textMuted,
  marginTop: '4px',
};

const sectionStyle = {
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: '12px',
  padding: '16px 20px',
  marginBottom: '16px',
};

const sectionTitle = {
  fontFamily: fonts.sans,
  fontSize: '11px',
  fontWeight: 600,
  color: colors.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '12px',
};

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
        <div style={{ ...hintStyle, marginTop: 8 }}>
          <Link to="/portal/locations" style={{ color: colors.accent, fontSize: 12 }}>Add a saved location</Link> to speed up future orders.
        </div>
      </div>
    );
  }

  if (overrideActive) {
    return (
      <div>
        <ManualAddressFields fields={manualFields} onChange={onManualChange} showLocationName={showLocationName} />
        <button type="button" onClick={onToggleOverride} style={{
          background: 'none', border: 'none', color: colors.accent,
          fontSize: 12, fontFamily: fonts.sans, cursor: 'pointer', padding: '4px 0', marginTop: 4,
        }}>
          Use a saved location instead
        </button>
      </div>
    );
  }

  const selected = warehouses.find(w => w.id === selectedId);

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select style={selectStyle} value={selectedId || ''} onChange={e => onSelect(Number(e.target.value) || null)}>
        <option value="">Select location...</option>
        {warehouses.map(w => (
          <option key={w.id} value={w.id}>
            {w.label || w.name} — {w.city}, {w.state}
          </option>
        ))}
      </select>
      {selected && (
        <div style={{
          marginTop: 8, padding: 10, background: colors.bgInput,
          borderRadius: 8, fontSize: 12, fontFamily: fonts.sans, color: colors.text,
          border: `1px solid ${colors.border}`,
        }}>
          <div>{selected.address}</div>
          <div>{selected.city}, {selected.state} {selected.zip_code}</div>
          {selected.contact_name && <div style={{ color: colors.textMuted, marginTop: 4 }}>Contact: {selected.contact_name}{selected.contact_phone ? ` ${selected.contact_phone}` : ''}</div>}
          {selected.business_hours && <div style={{ color: colors.textMuted }}>Hours: {selected.business_hours}</div>}
          {selected.delivery_instructions && <div style={{ color: colors.textMuted, marginTop: 2 }}>{selected.delivery_instructions}</div>}
        </div>
      )}
      <button type="button" onClick={onToggleOverride} style={{
        background: 'none', border: 'none', color: colors.accent,
        fontSize: 12, fontFamily: fonts.sans, cursor: 'pointer', padding: '4px 0', marginTop: 4,
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
          <label style={labelStyle}>Business / location name (if any)</label>
          <input style={inputStyle} value={fields.location_name || ''} onChange={e => onChange('location_name', e.target.value)} placeholder="e.g. ABC Auto Sales" maxLength={200} />
        </div>
      )}
      <div>
        <label style={labelStyle}>ZIP *</label>
        <input style={inputStyle} value={fields.zip} onChange={e => onChange('zip', e.target.value.replace(/\D/g, '').slice(0, 5))} placeholder="e.g. 02466" inputMode="numeric" maxLength={5} />
      </div>
      <div>
        <label style={labelStyle}>Street</label>
        <input style={inputStyle} value={fields.address} onChange={e => onChange('address', e.target.value)} placeholder="123 Main St" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
        <div>
          <label style={labelStyle}>City</label>
          <input style={inputStyle} value={fields.city} onChange={e => onChange('city', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>State</label>
          <select style={selectStyle} value={fields.state} onChange={e => onChange('state', e.target.value)}>
            <option value="">--</option>
            {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <label style={labelStyle}>Contact Name</label>
          <input style={inputStyle} value={fields.contact_name} onChange={e => onChange('contact_name', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Contact Phone</label>
          <PhoneInput style={inputStyle} value={fields.contact_phone} onChange={v => onChange('contact_phone', v)} />
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
  const showTierSelector = ['individual', 'auction_buyer'].includes(user?.customer_type);
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
  const showVehicleDetails = !hasFullVin;

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
    if (pickupIsAuction && auctionRequiresPin && !gatePassPin.trim()) {
      setError(`${releaseDocShortTerm(selectedAuction?.code)} is required for ${selectedAuction?.name || 'this auction'} pickups.`);
      return;
    }
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
    const rejected = _vstatus === 'rejected';
    const heading = rejected
      ? 'Your dealer account was not approved'
      : 'Your dealer account is being verified';
    const bodyText = rejected
      ? 'Your application was not approved. Please contact us if you would like to discuss next steps.'
      : "Before you can submit orders directly, our team verifies your dealership details. You can still request a quote in the meantime — direct orders open as soon as you're approved.";
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <PageMeta title={heading} />
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '50vh', padding: '40px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '44px', marginBottom: '16px' }}>&#128737;</div>
          <h1 style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: 700, color: colors.text, marginBottom: '12px' }}>{heading}</h1>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, maxWidth: '440px', lineHeight: 1.6, marginBottom: '28px' }}>{bodyText}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/portal/application" style={{ ...btnStyles.accent, textDecoration: 'none' }}>View your application</Link>
            <button onClick={() => navigate('/portal/dashboard')} style={btnStyles.secondary}>Go to Dashboard</button>
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
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <PageMeta title="Register your export warehouses" />
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '50vh', padding: '40px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '44px', marginBottom: '16px' }}>&#127981;</div>
          <h1 style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: 700, color: colors.text, marginBottom: '12px' }}>
            Register your export warehouses first
          </h1>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, maxWidth: '440px', lineHeight: 1.6, marginBottom: '28px' }}>
            Y7 assigns each shipment to the optimal warehouse from your saved
            locations — add every export warehouse you have a contract with,
            then come back to place your first order.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/portal/locations" style={{ ...btnStyles.accent, textDecoration: 'none' }}>Add your warehouses</Link>
            <button onClick={() => navigate('/portal/dashboard')} style={btnStyles.secondary}>Go to Dashboard</button>
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
    const heading = isLocations
      ? 'Register your export warehouses first'
      : isTrial
        ? "You've reached your trial quote limit"
        : 'Your dealer account is being verified';
    const bodyText = isLocations
      ? (gateBlock.message
        || 'Y7 assigns each shipment to the optimal warehouse from your saved locations — add every export warehouse you have a contract with, then come back to place your order.')
      : isTrial
        ? 'Your account has used its trial quote requests pending verification. Once our team verifies your dealership, you can submit without limits — we’ll be in touch.'
        : 'Thanks for registering as a dealer. Before you can submit orders directly, our team verifies your dealership details. We’ll email you as soon as your account is approved.';
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <PageMeta title={heading} />
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '50vh', padding: '40px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '44px', marginBottom: '16px' }}>{isLocations ? <>&#127981;</> : <>&#128737;</>}</div>
          <h1 style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: 700, color: colors.text, marginBottom: '12px' }}>{heading}</h1>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, maxWidth: '420px', lineHeight: 1.6, marginBottom: '28px' }}>{bodyText}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* EXP2 review: same destination as the pre-check panel — the model
                is multi-warehouse; LocationSetup is single-location, redirects
                away at >=1, and lacks the port field. One destination, one task. */}
            {isLocations
              ? <Link to="/portal/locations" style={{ ...btnStyles.accent, textDecoration: 'none' }}>Add your warehouses</Link>
              : <Link to="/contact" style={{ ...btnStyles.accent, textDecoration: 'none' }}>Contact us</Link>}
            <button onClick={() => navigate('/portal/dashboard')} style={btnStyles.secondary}>Go to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <PageMeta title="Order Submitted" />
        <div style={{ textAlign: 'center', padding: '60px 0', animation: 'fadeUp 0.4s ease-out' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#10003;</div>
          <h1 style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: 700, color: colors.text, marginBottom: '12px' }}>Order Submitted</h1>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6, marginBottom: showTierSelector ? '20px' : '32px' }}>
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
            <div style={{
              textAlign: 'left', maxWidth: '440px', margin: '0 auto 28px',
              background: '#FFF8E1', border: '1px solid #F9A825', borderRadius: '12px', padding: '14px 18px',
            }}>
              <div style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: '#8a6d1b', marginBottom: 4 }}>
                Have the purchase paperwork? Upload it — we&rsquo;ll do the typing.
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: '12px', color: '#8a6d1b', lineHeight: 1.5, marginBottom: 10 }}>
                Snap or attach your bill of sale, auction invoice, or title and we
                read the pickup details off it — location name, address, lot and
                buyer numbers — so you don&rsquo;t retype them. It also counts as
                your proof of ownership, which we need before dispatch anyway.
              </div>
              <Link to={`/portal/order/${success.orderId}`} style={{ ...btnStyles.accent, textDecoration: 'none', display: 'inline-block', padding: '8px 16px', fontSize: '13px' }}>
                Upload the document
              </Link>
            </div>
          )}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/portal/dashboard')} style={btnStyles.accent}>Go to Dashboard</button>
            <button onClick={() => { setSuccess(null); setVin(''); setVehicleYear(''); setVehicleMake(''); setVehicleModel(''); setVehicleType(''); setVinDecodeNote(''); setPickupManual({ ...EMPTY_MANUAL }); setDeliveryManual({ ...EMPTY_MANUAL }); setNotes(''); }} style={btnStyles.secondary}>Submit Another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <PageMeta title="New Transport Order" />
      <BouncingEmailBanner />
      <OnboardingBanner />
      <VerificationBanner />
      <Link to="/portal/dashboard" style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, display: 'inline-block', marginBottom: '20px' }}>&larr; Back to Dashboard</Link>
      <h1 style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>New Transport Order</h1>
      <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, marginBottom: '6px' }}>
        {/* WBF-T01: submission-flow copy — keyed on the direct-submit set.
            EXP1-T01: exporter gets doc-first wording (Y7 assigns delivery). */}
        {isExporter
          ? 'Submit your vehicle and upload the auction documents. Y7 will review and assign the destination warehouse.'
          : isDirectSubmitter
            ? "Submit your vehicle. We'll source the best-priced carrier — your transport price will appear here once it's set."
            : "Submit a transport request. We'll review it and send you a quote."}
      </p>
      <p style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.textMuted, marginBottom: '24px' }}>
        Contact info from your profile will be used.{' '}
        <Link to="/portal/profile" style={{ color: colors.accent }}>Update in Profile</Link>
      </p>

      <form onSubmit={handleSubmit}>
        {/* Direction toggle (dealer only) */}
        {isDealer && (
          <div style={sectionStyle}>
            <div style={sectionTitle}>Direction</div>
            <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
              {[
                { value: 'inbound', label: 'Inbound', desc: 'Ship TO my location' },
                { value: 'outbound', label: 'Outbound', desc: 'Ship FROM my location' },
              ].map(opt => (
                <button key={opt.value} type="button" onClick={() => setDirection(opt.value)} style={{
                  flex: 1, padding: '12px 16px', border: 'none', cursor: 'pointer',
                  fontFamily: fonts.sans, textAlign: 'center',
                  background: direction === opt.value ? colors.accent : colors.bgCard,
                  color: direction === opt.value ? '#fff' : colors.text,
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{opt.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Vehicle */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Vehicle</div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>VIN Number</label>
            <input
              style={inputStyle}
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
            <div style={hintStyle}>
              {vinDecoding ? 'Decoding VIN…' : (vinDecodeNote || 'Optional. If unknown, enter vehicle details below.')}
            </div>
          </div>
          {/* W7U-T02: visible, editable body type (never silently defaulted).
              Required for direct-submit forms; optional on quote forms. */}
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Vehicle type {isDirectSubmitter ? '*' : '(helps carriers quote right)'}</label>
            <select style={selectStyle} value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
              <option value="">Select...</option>
              <option value="sedan">Sedan / Coupe / Hatchback</option>
              <option value="suv">SUV / Crossover</option>
              <option value="truck">Pickup / Truck</option>
              <option value="van">Van / Minivan</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
          {showVehicleDetails && (
            <div>
              <div style={{ ...hintStyle, marginTop: 0, marginBottom: 8 }}>Don't have the VIN? Enter vehicle details:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Year</label>
                  <input style={inputStyle} value={vehicleYear} onChange={e => setVehicleYear(e.target.value)} placeholder="2022" maxLength={4} inputMode="numeric" />
                </div>
                <div>
                  <label style={labelStyle}>Make *</label>
                  <input style={inputStyle} value={vehicleMake} onChange={e => setVehicleMake(e.target.value)} placeholder="Honda" />
                </div>
                <div>
                  <label style={labelStyle}>Model</label>
                  <input style={inputStyle} value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} placeholder="CR-V" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pickup */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>
            Pickup {pickupIsWarehouse ? '(from your location)' : ''}
          </div>
          {/* W2P-T02: pickup source — Auction vs one-off address (dealer-inbound
              + auction buyer). Reuses the direction-toggle button pattern. */}
          {pickupSourceSelectable && (
            <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: `1px solid ${colors.border}`, marginBottom: 12 }}>
              {[
                { value: 'auction', label: 'Auction pickup', desc: 'Copart, IAA, Manheim…' },
                { value: 'oneoff', label: 'Other address', desc: 'Residence / business' },
              ].map(opt => (
                <button key={opt.value} type="button" onClick={() => setPickupSource(opt.value)} style={{
                  flex: 1, padding: '12px 16px', border: 'none', cursor: 'pointer',
                  fontFamily: fonts.sans, textAlign: 'center',
                  background: pickupSource === opt.value ? colors.accent : colors.bgCard,
                  color: pickupSource === opt.value ? '#fff' : colors.text,
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
            <div style={{ ...hintStyle, marginTop: 10 }}>
              Auction pickups are document-first: right after submitting you&rsquo;ll
              upload the auction document and we&rsquo;ll read the exact pickup
              address, lot and buyer number from it.
            </div>
          )}
          {/* W2P-T03: the dry-run liability consent — HARD BLOCK on the one-off
              manual branch only. */}
          {pickupIsOneOff && (
            <label style={{
              display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 12,
              padding: '12px 14px', background: '#FFF7ED', border: '1px solid #B45309',
              borderRadius: 8, cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={dryRunConsent}
                onChange={e => setDryRunConsent(e.target.checked)}
                style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: colors.accent }}
              />
              <span style={{ fontFamily: fonts.sans, fontSize: 13, color: '#7C2D12', lineHeight: 1.5 }}>
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
              <label style={labelStyle}>When is the vehicle available for pickup?</label>
              <input
                type="date"
                value={preferredPickupDate}
                onChange={e => setPreferredPickupDate(e.target.value)}
                min={pickupDateMin}
                max={pickupDateMax}
                style={{ ...inputStyle, width: 'auto' }}
              />
              <div style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: 4 }}>
                Leave empty if it&rsquo;s available now.
              </div>
            </div>
          )}
        </div>

        {/* Delivery */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>
            Delivery {deliveryIsWarehouse ? '(to your location)' : ''}
          </div>
          {deliveryAssignedByY7 ? (
            /* EXP1-T01: exporter — no delivery entry; quiet info panel reusing
               the input-box tokens. */
            <div style={{
              padding: '12px 14px', background: colors.bgInput, borderRadius: 8,
              border: `1px solid ${colors.border}`, fontFamily: fonts.sans,
              fontSize: 13, color: colors.text, lineHeight: 1.6,
            }}>
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

        {/* CAP-S1-W01: service tier (individual + auction_buyer only) */}
        {showTierSelector && (
          <div style={sectionStyle}>
            <div style={sectionTitle}>How should the carrier be paid?</div>
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
                    padding: '12px 14px', borderRadius: 8,
                    border: `1px solid ${selected ? colors.accent : colors.border}`,
                    background: selected ? '#FFF7F4' : colors.bgCard,
                  }}>
                    <input
                      type="radio"
                      name="service_tier"
                      value={opt.value}
                      checked={selected}
                      onChange={() => setServiceTier(opt.value)}
                      style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: colors.accent }}
                    />
                    <span>
                      <span style={{ display: 'block', fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: colors.text }}>{opt.title}</span>
                      <span style={{ display: 'block', fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: 2, lineHeight: 1.5 }}>{opt.desc}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <div style={{ ...hintStyle, marginTop: 10 }}>
              This is Y7's dispatch fee only — the carrier's transport rate is quoted separately.
            </div>
          </div>
        )}

        {/* Auction fields */}
        {showAuctionFields && (
          <div style={{ marginBottom: '24px', padding: '16px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ ...labelStyle, fontWeight: 600, marginBottom: '12px' }}>Auction Information</div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Auction Site {(isAuctionBuyer || isIndividual) ? '*' : ''}</label>
              <select
                style={inputStyle}
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
                <label style={labelStyle}>
                  {releaseDocShortTerm(selectedAuction?.code)} {auctionRequiresPin ? '*' : '(if available)'}
                </label>
                <input
                  style={inputStyle}
                  type="text"
                  value={gatePassPin}
                  onChange={e => setGatePassPin(e.target.value)}
                  placeholder={auctionRequiresPin ? 'Required for pickup' : 'Optional'}
                  maxLength={50}
                />
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Notes</label>
          <textarea
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Special instructions, vehicle details, etc."
          />
        </div>

        {error && (
          <div style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, padding: '10px 14px', background: '#FFF0EC', borderRadius: '8px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={submitting} style={{
          ...btnStyles.accent,
          width: '100%',
          padding: '14px 24px',
          fontSize: '14px',
          opacity: submitting ? 0.7 : 1,
          cursor: submitting ? 'default' : 'pointer',
        }}>
          {submitting ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>

      {/* T04b: non-blocking duplicate-route advisory dialog */}
      {dupDialog && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(20,20,20,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '28px 24px', width: '100%', maxWidth: '440px', fontFamily: fonts.sans }}>
            <h3 style={{ fontFamily: fonts.serif, fontSize: '18px', color: colors.text, margin: '0 0 10px' }}>
              {dupDialog.category === 'active' ? 'Possible duplicate request' : 'Similar past request'}
            </h3>
            <p style={{ fontSize: '14px', color: colors.textMuted, lineHeight: 1.5, margin: '0 0 20px' }}>
              {(() => {
                const ref = dupDialog.primary.web_reference || `#${dupDialog.primary.id}`;
                const status = dupDialog.primary.status;
                return dupDialog.category === 'active'
                  ? `You already have an active request for this route (${ref}, ${status}).`
                  : `You have a past request for this route (${ref}, ${status}).`;
              })()}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button type="button" onClick={() => { const d = dupDialog; setDupDialog(null); submitOrder(d.pZip, d.dZip); }} style={{ ...btnStyles.accent, width: '100%' }}>
                {dupDialog.category === 'active' ? 'Submit anyway' : 'Re-submit as new'}
              </button>
              <button type="button" onClick={() => navigate(`/portal/orders/${dupDialog.primary.id}`)} style={{ ...btnStyles.secondary, width: '100%' }}>
                View existing
              </button>
              <button type="button" onClick={() => setDupDialog(null)} style={{ ...btnStyles.secondary, width: '100%', border: 'none', color: colors.textMuted }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
