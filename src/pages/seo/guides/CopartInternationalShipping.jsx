import { Link } from 'react-router-dom';
import PageMeta from '../../../components/PageMeta';
import BreadcrumbSchema from '../../../components/BreadcrumbSchema';
import styles from './GuidePage.module.css';

// DESIGN-V2-W5-T06: V2 "Dispatch Board" restyle. All heading texts/levels/
// order, copy, and table values are byte-identical to V1; shells + tokens only.

export default function CopartInternationalShipping() {
  return (
    <div className={styles.page}>
      <PageMeta
        title="Copart International Shipping — US Auction to Forwarder Warehouse, Then Worldwide"
        description="End-to-end Copart export: auction win through ocean freight to destination port. Container vs RoRo, typical timelines, cost breakdown, and the Y7 full-cycle workflow."
        path="/copart-international-shipping"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Copart Shipping', url: '/copart-shipping' },
        { name: 'International Shipping', url: '/copart-international-shipping' },
      ]} />

      {/* Hero — board band */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link to="/" className={styles.crumbLink}>Home</Link>
            <span className={styles.crumbSep}>/</span>
            <Link to="/copart-shipping" className={styles.crumbLink}>Copart Shipping</Link>
            <span className={styles.crumbSep}>/</span>
            <span className={styles.crumbCurrent}>International Shipping</span>
          </nav>

          <span className={styles.kicker}>Export playbook</span>

          <h1 className={styles.h1}>
            Buying from Copart Abroad: The Complete Export Playbook
          </h1>
        </div>
      </section>

      <div className={styles.body}>
        <p className={styles.intro}>
          A large share of Copart inventory is bought by international rebuilders, exporters, and
          private buyers in Europe, the Middle East, Africa, and Latin America. The domestic
          transport is only the first leg. This guide covers the full journey from auction win
          to destination port, the Y7 full-cycle workflow we use to handle it end-to-end,
          and the cost and timeline realities to plan around.
        </p>

        <h2 className={styles.h2}>Why Copart is #1 for international buyers</h2>
        <p className={styles.p}>
          Three reasons international buyers target Copart specifically:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Rebuilder economics</strong> — salvage-title vehicles that
            would be uneconomical to rebuild at US labor rates are profitable rebuilds at Ukrainian,
            Polish, or Georgian labor rates.</li>
          <li className={styles.listItem}><strong>Volume and variety</strong> — 200+ yards, thousands of
            vehicles daily, every make and model.</li>
          <li className={styles.listItem}><strong>Export-friendly paperwork</strong> — Copart&apos;s system is
            designed with exporters in mind: buyer numbers work remotely, gate passes are digital,
            consolidation warehouses near major ports are well-integrated.</li>
        </ul>

        <h2 className={styles.h2}>The 7-step auction-to-destination journey</h2>
        <ol className={styles.list}>
          <li className={styles.listItem}><strong>1. Auction win + payment</strong> — wire the invoice the same
            day. Payment clears in 1-2 business days for wire.</li>
          <li className={styles.listItem}><strong>2. Gate pass issuance</strong> — Copart generates once payment
            clears. Free-window clock starts.</li>
          <li className={styles.listItem}><strong>3. Domestic transport</strong> — Y7 dispatches a carrier from
            the Copart yard to a consolidation warehouse or directly to port. 3-10 days typical.</li>
          <li className={styles.listItem}><strong>4. Warehouse consolidation</strong> — if container shipping,
            the vehicle is prepped, drained of most fluids, and loaded with other vehicles for the
            same destination.</li>
          <li className={styles.listItem}><strong>5. Ocean freight booking</strong> — our affiliated export
            company books container or RoRo space on the next sailing to the destination port.</li>
          <li className={styles.listItem}><strong>6. Ocean transit</strong> — 15-45 days depending on destination.</li>
          <li className={styles.listItem}><strong>7. Destination port clearance</strong> — customs, port fees,
            and delivery handoff per the destination country&apos;s process. Buyer&apos;s side.</li>
        </ol>

        <h2 className={styles.h2}>Container vs RoRo — which do you pick?</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Factor</th>
              <th>Container (40ft)</th>
              <th>RoRo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cost per vehicle (single)</td>
              <td>Higher</td>
              <td>Lower</td>
            </tr>
            <tr>
              <td>Cost per vehicle (3-4 shared)</td>
              <td>Lower</td>
              <td>Not applicable</td>
            </tr>
            <tr>
              <td>Non-running vehicles</td>
              <td>Yes</td>
              <td>No — must drive on/off</td>
            </tr>
            <tr>
              <td>Destination coverage</td>
              <td>Worldwide</td>
              <td>Major ports only</td>
            </tr>
            <tr>
              <td>Damage exposure</td>
              <td>Minimal (enclosed)</td>
              <td>Moderate (open deck)</td>
            </tr>
            <tr>
              <td>Typical transit</td>
              <td>15-35 days</td>
              <td>15-45 days</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.p}>
          Default decision rule: non-running or high-value = container. Drivable common-make to
          a major port = RoRo. Multiple vehicles same destination = shared container beats
          individual RoRo bookings.
        </p>

        <h2 className={styles.h2}>Common destinations and timelines</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Destination port</th>
              <th>Region</th>
              <th>Typical end-to-end</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Odesa (Chornomorsk)</td>
              <td>Ukraine</td>
              <td>7-10 weeks</td>
            </tr>
            <tr>
              <td>Gdańsk / Gdynia</td>
              <td>Poland</td>
              <td>6-9 weeks</td>
            </tr>
            <tr>
              <td>Hamburg / Bremerhaven</td>
              <td>Germany</td>
              <td>6-8 weeks</td>
            </tr>
            <tr>
              <td>Klaipeda</td>
              <td>Lithuania</td>
              <td>7-10 weeks</td>
            </tr>
            <tr>
              <td>Poti</td>
              <td>Georgia</td>
              <td>9-11 weeks</td>
            </tr>
            <tr>
              <td>Jebel Ali</td>
              <td>UAE</td>
              <td>7-9 weeks</td>
            </tr>
            <tr>
              <td>Lagos (Apapa)</td>
              <td>Nigeria</td>
              <td>8-10 weeks</td>
            </tr>
            <tr>
              <td>Iquique</td>
              <td>Chile</td>
              <td>9-11 weeks</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.p}>
          Timelines assume a clean domestic leg (no gate-pass delays, lane available within a
          week) and a sailing within the normal frequency for that lane. Peak-season consolidation
          waits can add 1-2 weeks.
        </p>

        <h2 className={styles.h2}>Top US export ports we deliver to</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Port Newark (NJ)</strong> — primary Northeast export hub, dense European sailing frequency.</li>
          <li className={styles.listItem}><strong>Port of Houston (TX)</strong> — Gulf Coast hub, strong Latin America and Middle East routes.</li>
          <li className={styles.listItem}><strong>Port of Savannah (GA)</strong> — Southeast export, efficient RoRo operations.</li>
          <li className={styles.listItem}><strong>Port of Los Angeles / Long Beach</strong> — Pacific gateway, Asia and Oceania routes.</li>
          <li className={styles.listItem}><strong>Port of Baltimore (MD)</strong> — RoRo and container, strong Europe connections.</li>
          <li className={styles.listItem}><strong>Port of Jacksonville (FL)</strong> — Caribbean and Latin America focus.</li>
        </ul>

        <h2 className={styles.h2}>Document flow</h2>
        <ol className={styles.list}>
          <li className={styles.listItem}><strong>Copart gate pass</strong> — domestic carrier presents at yard.</li>
          <li className={styles.listItem}><strong>Bill of Lading</strong> — signed at Copart pickup and again at warehouse drop.</li>
          <li className={styles.listItem}><strong>Warehouse intake confirmation</strong> — photos, condition, consolidation record.</li>
          <li className={styles.listItem}><strong>Ocean BOL</strong> — issued by the carrier line once vessel is booked.</li>
          <li className={styles.listItem}><strong>Commercial invoice + VIN + title copy</strong> — for destination customs.</li>
          <li className={styles.listItem}><strong>Export Certificate (if required)</strong> — depends on destination country. For the EU this is the chamber-issued <Link to="/certificate-of-origin" className={styles.link}>Certificate of Origin</Link>: it qualifies a US-built vehicle for 0% import duty, and Y7 files it on request.</li>
        </ol>

        <h2 className={styles.h2}>Cost breakdown example — Copart NJ to Odesa (container, shared)</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>Copart purchase (salvage Tesla Model 3): $17,000</li>
          <li className={styles.listItem}>Domestic transport Copart NJ → Newark warehouse: $350</li>
          <li className={styles.listItem}>Container loading + prep: $400</li>
          <li className={styles.listItem}>Ocean freight share (1 of 4 in container): $1,200</li>
          <li className={styles.listItem}>Documentation + destination port fees: $300</li>
          <li className={styles.listItem}><strong>Subtotal to destination port (Odesa)</strong>: ~$19,250</li>
        </ul>
        <p className={styles.p}>
          Customs, VAT, and inland delivery at destination are buyer&apos;s responsibility and vary
          by country. A Ukrainian buyer should add import duty + VAT + customs broker per local
          rules.
        </p>

        <h2 className={styles.h2}>Common mistakes international buyers make</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Bidding without a pre-export quote</strong> — domestic transport
            + consolidation + ocean freight can exceed the winning bid on cheaper vehicles.</li>
          <li className={styles.listItem}><strong>Assuming RoRo will work for a non-running vehicle</strong> —
            it will not. Container is required.</li>
          <li className={styles.listItem}><strong>Choosing a remote yard without local carrier check</strong> —
            saves $200 on auction price, adds $500 in domestic transport and 5 storage days.</li>
          <li className={styles.listItem}><strong>Ignoring sailing frequency</strong> — some destinations have
            monthly sailings, not weekly. Missing one adds 3 weeks.</li>
        </ul>

        <h2 className={styles.h2}>How Y7 handles it end-to-end</h2>
        <p className={styles.p}>
          Y7 is the licensed FMCSA domestic broker (MC #1741537). An affiliated company with a
          dealer license handles warehouse consolidation and ocean freight. You get a single
          point of contact through the Y7 client portal for the whole chain — domestic dispatch
          status, warehouse intake confirmation, ocean booking, and destination port handoff
          are all surfaced in one place.
        </p>
        <p className={styles.p}>
          For exporters buying multiple lots per week, the workflow extends to shared containers
          grouped by destination and weekly consolidated billing.
        </p>

        <h2 className={styles.h2}>Related</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}><Link to="/blog/copart-for-international-buyers-complete-guide" className={styles.link}>The international buyer&apos;s step-by-step Copart playbook</Link></li>
          <li className={styles.listItem}><Link to="/copart-shipping" className={styles.link}>Copart shipping main page</Link></li>
          <li className={styles.listItem}><Link to="/copart-storage-fees" className={styles.link}>Copart storage fees</Link></li>
          <li className={styles.listItem}><Link to="/copart-gate-pass-guide" className={styles.link}>Copart gate pass guide</Link></li>
          <li className={styles.listItem}><Link to="/exporters" className={styles.link}>Exporters</Link></li>
          <li className={styles.listItem}><Link to="/auction-to-port-transport" className={styles.link}>Auction to port transport</Link></li>
          <li className={styles.listItem}><Link to="/door-to-port-auto-transport" className={styles.link}>Door to port</Link></li>
          <li className={styles.listItem}><Link to="/certificate-of-origin" className={styles.link}>Certificate of Origin for EU-bound vehicles (0% duty)</Link></li>
        </ul>

        <p className={styles.p} style={{ marginTop: '32px' }}>
          <Link to="/quote" className={styles.link}>Request an export quote →</Link>
        </p>
      </div>
    </div>
  );
}
