// MIRROR of TRANSPORT web/src/components/customer-profile/warehouseFields.js.
// The cabinet cannot import across repos, so this file is a pinned twin: the
// TRANSPORT unit test tests/unit/test_wh1_field_parity.py parses BOTH files
// and fails the moment field keys, policy, CD flags or the location-type
// vocabulary drift. Change them TOGETHER or CI goes red.
//
// WH-1-T02/T03: THE single field-definition source for warehouse editing.
//
// Phase 0 (W3) found three surfaces with three hand-maintained field lists and
// THREE different location_type vocabularies — the portal default exported
// every cabinet-created warehouse to Central Dispatch as locationType "Other".
// The admin tab, the settings overview, and the cabinet all derive from HERE.
//
// Each field carries:
//   cd:      null  = never sent to Central Dispatch
//            {to}  = the CD payload field the value lands in — shown in the
//                    form so the operator KNOWS the carrier will see it
//   policy:  'both'  = operator and customer may edit
//            'admin' = operator-only (cabinet shows read-only + contact hint)
// Policy is declared here ONCE (owner ruling WH-1 §1): port_code drives
// routing/price and is_default must stay atomic — operator-only; the
// appointment policy is Y7-confirmed with the facility — operator-only.

export const LOCATION_TYPE_OPTIONS = [
  // Values are the CANONICAL CD V2 enum — what gets stored AND exported.
  // One vocabulary; the backend normalizer accepts these verbatim.
  { value: 'CommercialBusiness', label: 'Commercial business' },
  { value: 'Warehouse', label: 'Warehouse' },
  { value: 'Dealership', label: 'Dealership' },
  { value: 'Auction', label: 'Auction' },
  { value: 'AuctionSatelliteLot', label: 'Auction satellite lot' },
  { value: 'Port', label: 'Port' },
  { value: 'Terminal', label: 'Terminal' },
  { value: 'CrossDockSatelliteStagingLot', label: 'Cross-dock / staging lot' },
  { value: 'CorporateOfficePlant', label: 'Corporate office / plant' },
  { value: 'Residence', label: 'Residence' },
  { value: 'Other', label: 'Other' },
]

// Legacy stored values (admin form's old lowercase set, cabinet's mixed set)
// still resolve to a dropdown option for editing existing rows.
export const LEGACY_LOCATION_TYPE_ALIASES = {
  business: 'CommercialBusiness',
  cross_dock: 'CrossDockSatelliteStagingLot',
  dealer: 'Dealership',
  dealership: 'Dealership',
  residence: 'Residence',
  auction: 'Auction',
  port: 'Port',
  terminal: 'Terminal',
  warehouse: 'Warehouse',
}

export const canonicalLocationType = (value) =>
  LEGACY_LOCATION_TYPE_ALIASES[value] ||
  (LOCATION_TYPE_OPTIONS.some(o => o.value === value) ? value : 'CommercialBusiness')

export const USAGE_ROLE_OPTIONS = [
  { value: 'delivery', label: 'Delivery' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'both', label: 'Pickup + delivery' },
]

// Sections group the form; order matters.
export const WAREHOUSE_FIELDS = [
  // ── Identity ─────────────────────────────────────────────────────────
  { key: 'label', label: 'Name', section: 'identity', type: 'text', required: true,
    placeholder: 'Main NJ warehouse',
    cd: { to: 'stops[].locationName' },
    hint: 'Shown to the customer and, as the facility name, to the carrier.',
    policy: 'both' },
  { key: 'short_code', label: 'Short code', section: 'identity', type: 'text',
    placeholder: 'NJ-1', cd: null,
    hint: 'Operator shorthand for the Documents list. Internal only.',
    policy: 'admin' },
  { key: 'location_type', label: 'Facility type', section: 'identity', type: 'select',
    options: LOCATION_TYPE_OPTIONS, required: true,
    cd: { to: 'stops[].locationType' }, policy: 'both' },
  { key: 'usage_role', label: 'Used for', section: 'identity', type: 'select',
    options: USAGE_ROLE_OPTIONS, required: true, cd: null,
    hint: 'Which orders may use this facility. Not sent to the carrier.',
    policy: 'both' },

  // ── Address ──────────────────────────────────────────────────────────
  { key: 'address', label: 'Street', section: 'address', type: 'text', required: true,
    placeholder: '123 Dock Rd', cd: { to: 'stops[].address' }, policy: 'both' },
  { key: 'city', label: 'City', section: 'address', type: 'text', required: true,
    placeholder: 'Newark', cd: { to: 'stops[].city' }, policy: 'both' },
  { key: 'state', label: 'State', section: 'address', type: 'text', required: true,
    maxLength: 2, placeholder: 'NJ', cd: { to: 'stops[].state' }, policy: 'both' },
  { key: 'zip_code', label: 'ZIP', section: 'address', type: 'text', required: true,
    placeholder: '07105', cd: { to: 'stops[].postalCode' }, policy: 'both' },

  // ── Contact ──────────────────────────────────────────────────────────
  { key: 'phone', label: 'Facility phone', section: 'contact', type: 'text',
    cd: { to: 'stops[].phone' }, policy: 'both' },
  { key: 'contact_name', label: 'Contact name', section: 'contact', type: 'text',
    cd: { to: 'stops[].contactName' }, policy: 'both' },
  { key: 'contact_phone', label: 'Contact phone', section: 'contact', type: 'text',
    cd: { to: 'stops[].contactPhone' }, policy: 'both' },
  { key: 'contact_email', label: 'Contact email', section: 'contact', type: 'text',
    cd: { to: 'stops[].contactEmailAddress' }, policy: 'both' },

  // ── Carrier instructions ─────────────────────────────────────────────
  { key: 'business_hours', label: 'Business hours', section: 'carrier', type: 'text',
    placeholder: 'Mon-Fri 8:00-17:00',
    cd: { to: 'transportationReleaseNotes' }, policy: 'both' },
  { key: 'delivery_instructions', label: 'Delivery instructions', section: 'carrier',
    type: 'textarea', maxLength: 500,
    cd: { to: 'transportationReleaseNotes' }, policy: 'both' },
  { key: 'transport_special_instructions', label: 'Transport special instructions',
    section: 'carrier', type: 'textarea',
    cd: { to: 'transportationReleaseNotes' },
    hint: 'Operator-entered instructions for the carrier.',
    policy: 'admin' },
  { key: 'appointment_required', label: 'Appointment required', section: 'carrier',
    type: 'checkbox', cd: { to: 'transportationReleaseNotes' },
    hint: 'Y7 confirms the appointment policy with the facility.',
    policy: 'admin' },
  { key: 'appointment_instructions', label: 'How to book the appointment',
    section: 'carrier', type: 'textarea',
    cd: { to: 'transportationReleaseNotes' }, policy: 'admin' },
  { key: 'requires_twic', label: 'TWIC required', section: 'carrier',
    type: 'checkbox', cd: { to: 'stops[].twic' }, policy: 'both' },

  // ── Routing & references (internal) ──────────────────────────────────
  { key: 'port_code', label: 'Departure port', section: 'routing', type: 'select-ports',
    cd: null,
    hint: 'Drives export routing and landed-cost ranking internally. Not sent to the carrier.',
    policy: 'admin' },
  { key: 'buyer_reference', label: 'Buyer reference', section: 'routing', type: 'text',
    cd: { to: 'stops[].buyerNumber' },
    hint: 'Stamped onto the CD drop-off as the buyer number.',
    policy: 'admin' },
  { key: 'is_default', label: 'Default facility', section: 'routing', type: 'checkbox',
    cd: null,
    hint: 'Used when an order names no facility. Setting it clears the previous default.',
    policy: 'admin' },
]

export const SECTION_TITLES = {
  identity: 'Facility',
  address: 'Address',
  contact: 'Contact',
  carrier: 'Carrier instructions',
  routing: 'Routing & references (internal)',
}

export function emptyWarehouseForm() {
  const f = {}
  for (const def of WAREHOUSE_FIELDS) {
    f[def.key] = def.type === 'checkbox' ? false : ''
  }
  f.location_type = 'CommercialBusiness'
  f.usage_role = 'delivery'
  return f
}

export function warehouseFormFromRow(row) {
  const f = emptyWarehouseForm()
  for (const def of WAREHOUSE_FIELDS) {
    const v = row[def.key]
    f[def.key] = def.type === 'checkbox' ? !!v : (v ?? '')
  }
  f.label = row.label || row.name || ''
  f.location_type = canonicalLocationType(row.location_type)
  return f
}

// Build the POST/PATCH body. The admin API requires `name`; keep it in
// lockstep with label (the DAL mirrors them anyway).
export function warehousePayload(form) {
  const payload = {}
  for (const def of WAREHOUSE_FIELDS) {
    const v = form[def.key]
    payload[def.key] = def.type === 'checkbox' ? !!v : (String(v ?? '').trim() || null)
  }
  payload.name = payload.label
  return payload
}
