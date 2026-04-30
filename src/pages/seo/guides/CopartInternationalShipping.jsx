import { Link } from 'react-router-dom';
import PageMeta from '../../../components/PageMeta';
import BreadcrumbSchema from '../../../components/BreadcrumbSchema';
import { colors, fonts } from '../../../theme';

const h2Style = { fontFamily: fonts.serif, fontSize: '22px', fontWeight: 700, color: colors.text, marginBottom: '16px', marginTop: '48px' };
const pStyle = { fontFamily: fonts.sans, fontSize: '15px', color: colors.textMuted, lineHeight: 1.7, marginBottom: '16px' };
const liStyle = { fontFamily: fonts.sans, fontSize: '15px', color: colors.textMuted, lineHeight: 1.7, marginBottom: '8px' };
const linkStyle = { color: colors.accent, textDecoration: 'none', fontWeight: 600, borderBottom: `1px solid ${colors.accent}` };
const tableStyle = { width: '100%', borderCollapse: 'collapse', fontFamily: fonts.sans, fontSize: '14px', margin: '12px 0 24px' };
const thStyle = { textAlign: 'left', padding: '10px 12px', borderBottom: `2px solid ${colors.border}`, background: colors.bgMuted, fontWeight: 700, color: colors.text };
const tdStyle = { padding: '10px 12px', borderBottom: `1px solid ${colors.border}`, color: colors.textMuted };

export default function CopartInternationalShipping() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <PageMeta
        title="Copart International Shipping — US Auction to Forwarder Warehouse, Then Worldwide"
        description="End-to-end Copart export: auction win through ocean freight to destination port. Container vs RoRo, typical timelines, cost breakdown, and the Y7 + DaytonaCargo workflow."
        path="/copart-international-shipping"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Copart Shipping', url: '/copart-shipping' },
        { name: 'International Shipping', url: '/copart-international-shipping' },
      ]} />

      <nav aria-label="Breadcrumb" style={{ fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted, marginBottom: '24px' }}>
        <Link to="/" style={{ color: colors.textMuted }}>Home</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <Link to="/copart-shipping" style={{ color: colors.textMuted }}>Copart Shipping</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <span style={{ color: colors.text }}>International Shipping</span>
      </nav>

      <h1 style={{ fontFamily: fonts.serif, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: colors.text, marginBottom: '16px', lineHeight: 1.2 }}>
        Buying from Copart Abroad: The Complete Export Playbook
      </h1>

      <p style={{ ...pStyle, fontSize: '16px', marginBottom: '36px', color: colors.text }}>
        A large share of Copart inventory is bought by international rebuilders, exporters, and
        private buyers in Europe, the Middle East, Africa, and Latin America. The domestic
        transport is only the first leg. This guide covers the full journey from auction win
        to destination port, the Y7 + DaytonaCargo workflow we use to handle it end-to-end,
        and the cost and timeline realities to plan around.
      </p>

      <h2 style={h2Style}>Why Copart is #1 for international buyers</h2>
      <p style={pStyle}>
        Three reasons international buyers target Copart specifically:
      </p>
      <ul style={pStyle}>
        <li style={liStyle}><strong>Rebuilder economics</strong> — salvage-title vehicles that
          would be uneconomical to rebuild at US labor rates are profitable rebuilds at Ukrainian,
          Polish, or Georgian labor rates.</li>
        <li style={liStyle}><strong>Volume and variety</strong> — 200+ yards, thousands of
          vehicles daily, every make and model.</li>
        <li style={liStyle}><strong>Export-friendly paperwork</strong> — Copart&apos;s system is
          designed with exporters in mind: buyer numbers work remotely, gate passes are digital,
          consolidation warehouses near major ports are well-integrated.</li>
      </ul>

      <h2 style={h2Style}>The 7-step auction-to-destination journey</h2>
      <ol style={pStyle}>
        <li style={liStyle}><strong>1. Auction win + payment</strong> — wire the invoice the same
          day. Payment clears in 1-2 business days for wire.</li>
        <li style={liStyle}><strong>2. Gate pass issuance</strong> — Copart generates once payment
          clears. Free-window clock starts.</li>
        <li style={liStyle}><strong>3. Domestic transport</strong> — Y7 dispatches a carrier from
          the Copart yard to a consolidation warehouse or directly to port. 3-10 days typical.</li>
        <li style={liStyle}><strong>4. Warehouse consolidation</strong> — if container shipping,
          the vehicle is prepped, drained of most fluids, and loaded with other vehicles for the
          same destination.</li>
        <li style={liStyle}><strong>5. Ocean freight booking</strong> — DaytonaCargo books
          container or RoRo space on the next sailing to the destination port.</li>
        <li style={liStyle}><strong>6. Ocean transit</strong> — 15-45 days depending on destination.</li>
        <li style={liStyle}><strong>7. Destination port clearance</strong> — customs, port fees,
          and delivery handoff per the destination country&apos;s process. Buyer&apos;s side.</li>
      </ol>

      <h2 style={h2Style}>Container vs RoRo — which do you pick?</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Factor</th>
            <th style={thStyle}>Container (40ft)</th>
            <th style={thStyle}>RoRo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Cost per vehicle (single)</td>
            <td style={tdStyle}>Higher</td>
            <td style={tdStyle}>Lower</td>
          </tr>
          <tr>
            <td style={tdStyle}>Cost per vehicle (3-4 shared)</td>
            <td style={tdStyle}>Lower</td>
            <td style={tdStyle}>Not applicable</td>
          </tr>
          <tr>
            <td style={tdStyle}>Non-running vehicles</td>
            <td style={tdStyle}>Yes</td>
            <td style={tdStyle}>No — must drive on/off</td>
          </tr>
          <tr>
            <td style={tdStyle}>Destination coverage</td>
            <td style={tdStyle}>Worldwide</td>
            <td style={tdStyle}>Major ports only</td>
          </tr>
          <tr>
            <td style={tdStyle}>Damage exposure</td>
            <td style={tdStyle}>Minimal (enclosed)</td>
            <td style={tdStyle}>Moderate (open deck)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Typical transit</td>
            <td style={tdStyle}>15-35 days</td>
            <td style={tdStyle}>15-45 days</td>
          </tr>
        </tbody>
      </table>
      <p style={pStyle}>
        Default decision rule: non-running or high-value = container. Drivable common-make to
        a major port = RoRo. Multiple vehicles same destination = shared container beats
        individual RoRo bookings.
      </p>

      <h2 style={h2Style}>Common destinations and timelines</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Destination port</th>
            <th style={thStyle}>Region</th>
            <th style={thStyle}>Typical end-to-end</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Odesa (Chornomorsk)</td>
            <td style={tdStyle}>Ukraine</td>
            <td style={tdStyle}>7-10 weeks</td>
          </tr>
          <tr>
            <td style={tdStyle}>Gdańsk / Gdynia</td>
            <td style={tdStyle}>Poland</td>
            <td style={tdStyle}>6-9 weeks</td>
          </tr>
          <tr>
            <td style={tdStyle}>Hamburg / Bremerhaven</td>
            <td style={tdStyle}>Germany</td>
            <td style={tdStyle}>6-8 weeks</td>
          </tr>
          <tr>
            <td style={tdStyle}>Klaipeda</td>
            <td style={tdStyle}>Lithuania</td>
            <td style={tdStyle}>7-10 weeks</td>
          </tr>
          <tr>
            <td style={tdStyle}>Poti</td>
            <td style={tdStyle}>Georgia</td>
            <td style={tdStyle}>9-11 weeks</td>
          </tr>
          <tr>
            <td style={tdStyle}>Jebel Ali</td>
            <td style={tdStyle}>UAE</td>
            <td style={tdStyle}>7-9 weeks</td>
          </tr>
          <tr>
            <td style={tdStyle}>Lagos (Apapa)</td>
            <td style={tdStyle}>Nigeria</td>
            <td style={tdStyle}>8-10 weeks</td>
          </tr>
          <tr>
            <td style={tdStyle}>Iquique</td>
            <td style={tdStyle}>Chile</td>
            <td style={tdStyle}>9-11 weeks</td>
          </tr>
        </tbody>
      </table>
      <p style={pStyle}>
        Timelines assume a clean domestic leg (no gate-pass delays, lane available within a
        week) and a sailing within the normal frequency for that lane. Peak-season consolidation
        waits can add 1-2 weeks.
      </p>

      <h2 style={h2Style}>Top US export ports we deliver to</h2>
      <ul style={pStyle}>
        <li style={liStyle}><strong>Port Newark (NJ)</strong> — primary Northeast export hub, dense European sailing frequency.</li>
        <li style={liStyle}><strong>Port of Houston (TX)</strong> — Gulf Coast hub, strong Latin America and Middle East routes.</li>
        <li style={liStyle}><strong>Port of Savannah (GA)</strong> — Southeast export, efficient RoRo operations.</li>
        <li style={liStyle}><strong>Port of Los Angeles / Long Beach</strong> — Pacific gateway, Asia and Oceania routes.</li>
        <li style={liStyle}><strong>Port of Baltimore (MD)</strong> — RoRo and container, strong Europe connections.</li>
        <li style={liStyle}><strong>Port of Jacksonville (FL)</strong> — Caribbean and Latin America focus.</li>
      </ul>

      <h2 style={h2Style}>Document flow</h2>
      <ol style={pStyle}>
        <li style={liStyle}><strong>Copart gate pass</strong> — domestic carrier presents at yard.</li>
        <li style={liStyle}><strong>Bill of Lading</strong> — signed at Copart pickup and again at warehouse drop.</li>
        <li style={liStyle}><strong>Warehouse intake confirmation</strong> — photos, condition, consolidation record.</li>
        <li style={liStyle}><strong>Ocean BOL</strong> — issued by the carrier line once vessel is booked.</li>
        <li style={liStyle}><strong>Commercial invoice + VIN + title copy</strong> — for destination customs.</li>
        <li style={liStyle}><strong>Export Certificate (if required)</strong> — depends on destination country.</li>
      </ol>

      <h2 style={h2Style}>Cost breakdown example — Copart NJ to Odesa (container, shared)</h2>
      <ul style={pStyle}>
        <li style={liStyle}>Copart purchase (salvage Tesla Model 3): $17,000</li>
        <li style={liStyle}>Domestic transport Copart NJ → Newark warehouse: $350</li>
        <li style={liStyle}>Container loading + prep: $400</li>
        <li style={liStyle}>Ocean freight share (1 of 4 in container): $1,200</li>
        <li style={liStyle}>Documentation + destination port fees: $300</li>
        <li style={liStyle}><strong>Subtotal to destination port (Odesa)</strong>: ~$19,250</li>
      </ul>
      <p style={pStyle}>
        Customs, VAT, and inland delivery at destination are buyer&apos;s responsibility and vary
        by country. A Ukrainian buyer should add import duty + VAT + customs broker per local
        rules.
      </p>

      <h2 style={h2Style}>Common mistakes international buyers make</h2>
      <ul style={pStyle}>
        <li style={liStyle}><strong>Bidding without a pre-export quote</strong> — domestic transport
          + consolidation + ocean freight can exceed the winning bid on cheaper vehicles.</li>
        <li style={liStyle}><strong>Assuming RoRo will work for a non-running vehicle</strong> —
          it will not. Container is required.</li>
        <li style={liStyle}><strong>Choosing a remote yard without local carrier check</strong> —
          saves $200 on auction price, adds $500 in domestic transport and 5 storage days.</li>
        <li style={liStyle}><strong>Ignoring sailing frequency</strong> — some destinations have
          monthly sailings, not weekly. Missing one adds 3 weeks.</li>
      </ul>

      <h2 style={h2Style}>How Y7 + DaytonaCargo handle end-to-end</h2>
      <p style={pStyle}>
        Y7 is the licensed FMCSA domestic broker (MC #1741537). DaytonaCargo is a specialized
        export partner handling warehouse consolidation and ocean freight. You get a single
        point of contact through the Y7 client portal for the whole chain — domestic dispatch
        status, warehouse intake confirmation, ocean booking, and destination port handoff
        are all surfaced in one place.
      </p>
      <p style={pStyle}>
        For exporters buying multiple lots per week, the workflow extends to shared containers
        grouped by destination and weekly consolidated billing.
      </p>

      <h2 style={h2Style}>Related</h2>
      <ul style={pStyle}>
        <li style={liStyle}><Link to="/copart-shipping" style={linkStyle}>Copart shipping main page</Link></li>
        <li style={liStyle}><Link to="/copart-storage-fees" style={linkStyle}>Copart storage fees</Link></li>
        <li style={liStyle}><Link to="/copart-gate-pass-guide" style={linkStyle}>Copart gate pass guide</Link></li>
        <li style={liStyle}><Link to="/exporters" style={linkStyle}>Exporters</Link></li>
        <li style={liStyle}><Link to="/auction-to-port-transport" style={linkStyle}>Auction to port transport</Link></li>
        <li style={liStyle}><Link to="/door-to-port-auto-transport" style={linkStyle}>Door to port</Link></li>
      </ul>

      <p style={{ ...pStyle, marginTop: '32px' }}>
        <Link to="/quote" style={linkStyle}>Request an export quote →</Link>
      </p>
    </div>
  );
}
