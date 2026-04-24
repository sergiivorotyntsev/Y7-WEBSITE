import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../../components/PageMeta';
import { useAuth, portalFetch } from '../../hooks/useAuth';
import { colors, fonts, button as btnStyles } from '../../theme';
import PhoneInput from '../../components/PhoneInput';
import OnboardingBanner from '../../components/OnboardingBanner';
import BouncingEmailBanner from '../../components/recovery/BouncingEmailBanner';

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
function WarehouseSection({ warehouses, selectedId, onSelect, overrideActive, onToggleOverride, label, manualFields, onManualChange }) {
  if (warehouses.length === 0) {
    return (
      <div>
        <ManualAddressFields fields={manualFields} onChange={onManualChange} />
        <div style={{ ...hintStyle, marginTop: 8 }}>
          <Link to="/portal/locations" style={{ color: colors.accent, fontSize: 12 }}>Add a saved location</Link> to speed up future orders.
        </div>
      </div>
    );
  }

  if (overrideActive) {
    return (
      <div>
        <ManualAddressFields fields={manualFields} onChange={onManualChange} />
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
function ManualAddressFields({ fields, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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

const EMPTY_MANUAL = { zip: '', address: '', city: '', state: '', contact_name: '', contact_phone: '' };

// ─── Main component ──────────────────────────────────────────────
export default function NewOrder() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isDealer = user?.customer_type === 'dealer';
  const isWarehouseUser = ['dealer', 'exporter', 'auction_buyer'].includes(user?.customer_type);

  // Warehouses
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    if (!isWarehouseUser) return;
    portalFetch('/api/portal/locations')
      .then(r => r.ok ? r.json() : { items: [] })
      .then(data => setWarehouses(data.items || []))
      .catch(() => {});
  }, [isWarehouseUser]);

  // Auction types (warehouse users only)
  const [auctionTypes, setAuctionTypes] = useState([]);
  const [auctionTypeId, setAuctionTypeId] = useState(null);
  const [gatePassPin, setGatePassPin] = useState('');
  useEffect(() => {
    if (!isWarehouseUser) return;
    portalFetch('/api/portal/data/auction-types')
      .then(r => r.ok ? r.json() : [])
      .then(setAuctionTypes)
      .catch(() => {});
  }, [isWarehouseUser]);

  const selectedAuction = auctionTypes.find(a => a.id === auctionTypeId);
  const auctionCode = selectedAuction?.code || '';
  const needsPin = ['COPART', 'IAA'].includes(auctionCode);

  // Direction (dealer only)
  const [direction, setDirection] = useState('inbound');

  // Vehicle
  const [vin, setVin] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  // Warehouse selections
  const [pickupWarehouseId, setPickupWarehouseId] = useState(null);
  const [deliveryWarehouseId, setDeliveryWarehouseId] = useState(null);
  const [pickupOverride, setPickupOverride] = useState(false);
  const [deliveryOverride, setDeliveryOverride] = useState(false);

  // Manual address fields
  const [pickupManual, setPickupManual] = useState({ ...EMPTY_MANUAL });
  const [deliveryManual, setDeliveryManual] = useState({ ...EMPTY_MANUAL });

  const [notes, setNotes] = useState('');

  // Auction fields (auction_buyer + dealer inbound)
  const isAuctionBuyer = user?.customer_type === 'auction_buyer';
  const showAuctionFields = isAuctionBuyer || (isDealer && direction === 'inbound');
  const [auctionTypes, setAuctionTypes] = useState([]);
  const [auctionTypeId, setAuctionTypeId] = useState('');
  const [gatePassPin, setGatePassPin] = useState('');

  useEffect(() => {
    if (!showAuctionFields) return;
    portalFetch('/api/auction-types/')
      .then(r => r.ok ? r.json() : { items: [] })
      .then(data => setAuctionTypes((data.items || []).filter(t => t.is_active && t.is_base)))
      .catch(() => {});
  }, [showAuctionFields]);

  const selectedAuction = auctionTypes.find(t => String(t.id) === auctionTypeId);
  const auctionRequiresPin = selectedAuction && ['COPART', 'IAA'].includes(selectedAuction.code);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

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
  if (isDealer) {
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
    if (!dZip || !ZIP_RE.test(dZip)) {
      setError('Delivery ZIP must be exactly 5 digits.');
      return;
    }

    if (isAuctionBuyer && !auctionTypeId) {
      setError('Please select the auction site.');
      return;
    }
    if (auctionRequiresPin && !gatePassPin.trim()) {
      setError('Gate Pass PIN is required for Copart/IAA orders.');
      return;
    }

    setSubmitting(true);
    try {
      const submissionType = isWarehouseUser ? 'direct_submit' : 'quote_request';
      const body = {
        vin: vinClean || 'TBD',
        vehicle_year: vehicleYear.trim() || undefined,
        vehicle_make: vehicleMake.trim() || undefined,
        vehicle_model: vehicleModel.trim() || undefined,
        pickup_zip: pZip,
        delivery_zip: dZip,
        notes: notes.trim() || undefined,
        submission_type: submissionType,
        auction_type_id: auctionTypeId || undefined,
        gate_pass_pin: gatePassPin.trim() || undefined,
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
      }

      // Delivery side
      if (deliveryIsWarehouse && !deliveryOverride && deliveryWarehouseId) {
        body.delivery_warehouse_id = deliveryWarehouseId;
      } else {
        if (deliveryManual.address) body.delivery_address = deliveryManual.address;
        if (deliveryManual.city) body.delivery_city = deliveryManual.city;
        if (deliveryManual.state) body.delivery_state = deliveryManual.state;
        if (deliveryManual.contact_name) body.delivery_contact_name = deliveryManual.contact_name;
        if (deliveryManual.contact_phone) body.delivery_contact_phone = deliveryManual.contact_phone;
      }

      // Auction fields
      if (auctionTypeId) body.auction_type_id = parseInt(auctionTypeId);
      if (gatePassPin.trim()) body.gate_pass_pin = gatePassPin.trim();

      const res = await portalFetch('/api/portal/data/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccess({ orderId: data.order_id, loadId: data.load_id });
      } else {
        const data = await res.json().catch(() => ({}));
        const detail = data?.detail;
        setError(typeof detail === 'string' ? detail : 'Failed to submit order. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <PageMeta title="Order Submitted" />
        <div style={{ textAlign: 'center', padding: '60px 0', animation: 'fadeUp 0.4s ease-out' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#10003;</div>
          <h1 style={{ fontFamily: fonts.serif, fontSize: '24px', fontWeight: 700, color: colors.text, marginBottom: '12px' }}>Order Submitted</h1>
          <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, lineHeight: 1.6, marginBottom: '32px' }}>
            Your transport request has been received. Our dispatcher will review it and send you a quote shortly.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/portal/dashboard')} style={btnStyles.accent}>Go to Dashboard</button>
            <button onClick={() => { setSuccess(null); setVin(''); setVehicleYear(''); setVehicleMake(''); setVehicleModel(''); setPickupManual({ ...EMPTY_MANUAL }); setDeliveryManual({ ...EMPTY_MANUAL }); setNotes(''); }} style={btnStyles.secondary}>Submit Another</button>
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
      <Link to="/portal/dashboard" style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.accent, display: 'inline-block', marginBottom: '20px' }}>&larr; Back to Dashboard</Link>
      <h1 style={{ fontFamily: fonts.serif, fontSize: '28px', fontWeight: 700, color: colors.text, marginBottom: '8px' }}>New Transport Order</h1>
      <p style={{ fontFamily: fonts.sans, fontSize: '14px', color: colors.textMuted, marginBottom: '6px' }}>
        Submit a transport request. We'll review it and send you a quote.
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

        {/* Auction type + gate pass (warehouse users only) */}
        {isWarehouseUser && auctionTypes.length > 0 && (
          <div style={sectionStyle}>
            <div style={sectionTitle}>Auction</div>
            <div style={{ marginBottom: needsPin ? 12 : 0 }}>
              <label style={labelStyle}>Auction Source *</label>
              <select style={selectStyle} value={auctionTypeId || ''} onChange={e => setAuctionTypeId(Number(e.target.value) || null)}>
                <option value="">Select auction...</option>
                {auctionTypes.filter(a => !a.code.startsWith('TEST')).map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
            {needsPin && (
              <div>
                <label style={labelStyle}>Gate Pass PIN *</label>
                <input style={inputStyle} value={gatePassPin} onChange={e => setGatePassPin(e.target.value)} placeholder="e.g. 46F3" maxLength={20} />
                <div style={hintStyle}>Required for {auctionCode} auctions.</div>
              </div>
            )}
          </div>
        )}

        {/* Vehicle */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Vehicle</div>
          <div style={{ marginBottom: showVehicleDetails ? 12 : 0 }}>
            <label style={labelStyle}>VIN Number</label>
            <input style={inputStyle} value={vin} onChange={e => setVin(e.target.value)} placeholder="Enter 17-character VIN or leave blank" maxLength={17} />
            <div style={hintStyle}>Optional. If unknown, enter vehicle details below.</div>
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
            />
          ) : (
            <ManualAddressFields fields={pickupManual} onChange={handlePickupManualChange} />
          )}
        </div>

        {/* Delivery */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>
            Delivery {deliveryIsWarehouse ? '(to your location)' : ''}
          </div>
          {deliveryIsWarehouse ? (
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

        {/* Auction fields */}
        {showAuctionFields && (
          <div style={{ marginBottom: '24px', padding: '16px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ ...labelStyle, fontWeight: 600, marginBottom: '12px' }}>Auction Information</div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Auction Site {isAuctionBuyer ? '*' : ''}</label>
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
                <label style={labelStyle}>
                  Gate Pass PIN {auctionRequiresPin ? '*' : '(if available)'}
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
    </div>
  );
}
