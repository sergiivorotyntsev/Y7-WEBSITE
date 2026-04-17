import SeoLandingPage, { Section } from '../SeoLandingPage';
import PricingRange from '../../../components/PricingRange';
import { prose, muted, subhead, tableWrap, table, th, td } from '../_enrichedStyles';

export default function AuctionToPort() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Auction to Port Car Transport — Copart to Port Shipping | Y7 Logistics',
        description:
          'Auction to port vehicle transport with gate pass coordination. Copart, IAAI, Manheim to Port Newark, Houston, Savannah. Licensed FMCSA broker.',
        path: '/auction-to-port-transport',
      }}
      heading="Auction to Port Transport — Direct from Auction to Export Port"
      intro="Auction-to-port is the defining workflow of the vehicle export business. You win a car at Copart, IAAI, or Manheim; it needs to be on a vessel within days; the clock is running on auction storage fees on one end and vessel cut-off on the other; and somewhere between the two, a gate pass has to be on file at the terminal or the whole chain breaks. Y7 Logistics (MC #1741537 / USDOT #4427359) is the licensed FMCSA broker that handles the domestic leg — from auction pickup to port warehouse — and hands the vehicle to your freight forwarder ready for vessel loading."
      whenNeeded={[
        'Exporter buying auction vehicles for overseas markets',
        'Shipping Copart, IAAI, or Manheim purchases directly to port',
        'Dealer exporting auction inventory',
        'Multiple auction purchases consolidated at one port',
        'Any auction \u2192 port domestic transport need',
      ]}
      steps={[
        { title: 'Win your vehicle at auction', desc: 'Complete payment and secure the title.' },
        { title: 'Share auction details with Y7', desc: 'Lot number, buyer number, and port / warehouse booking.' },
        { title: 'Carrier pickup scheduled', desc: 'We schedule within the free storage window to avoid fees.' },
        { title: 'Vehicle transported to port', desc: 'Direct delivery to your designated port warehouse with gate pass.' },
        { title: 'Receive BOL and delivery confirmation', desc: 'Freight forwarder takes over for vessel loading and customs.' },
      ]}
      requirements={[
        'Auction platform and lot number',
        'Buyer / member number',
        'Gate pass authorization details',
        'Destination port and warehouse name',
        'VIN and vehicle details',
        'Vessel / export timeline so we coordinate delivery',
      ]}
      capabilities={[
        'All Copart, IAAI, and Manheim locations nationwide',
        'Major export ports \u2014 Newark, Houston, Savannah, Los Angeles, Baltimore, JAXPORT',
        'Gate pass coordination and storage-fee prevention',
        'Single or multi-vehicle consolidation',
        'Open transport (standard) or enclosed for high-value units',
        'Complete documentation \u2014 BOL, delivery receipts, carrier insurance',
      ]}
      faqs={[
        {
          q: 'How does auction-to-port transport work?',
          a: 'Five steps: (1) you buy the vehicle at auction and pay, (2) you send Y7 the lot / buyer / port details, (3) we pick up inside the free-storage window, (4) we deliver to the port warehouse with the gate pass on file, (5) your freight forwarder takes over for customs and vessel loading. We handle the domestic leg only.',
        },
        {
          q: 'What is gate pass coordination?',
          a: 'A gate pass is the terminal\u2019s authorization for a driver to enter with a vehicle destined for export. Without it, the driver is turned away at the port gate. Y7 coordinates the paperwork with the port warehouse and your forwarder before dispatch so the pass is on file when the driver arrives.',
        },
        {
          q: 'Can you ship any auction vehicle to any port?',
          a: 'Essentially yes. We pick up from every Copart (200+ yards), IAAI (170+ yards), and Manheim (80+ yards) location, plus independent regional auctions, and we deliver to the major export ports — Newark, Houston, Savannah, LA, Baltimore, JAXPORT — and to smaller ports on request. Routing depends on your forwarder\u2019s vessel booking.',
        },
        {
          q: 'How much does auction-to-port transport cost?',
          a: 'Short runs (IAAI Jersey City to Port Newark, ~15 mi) are $150–$350 at minimum-load floors. Regional runs (Copart Atlanta to Savannah, ~250 mi) are $400–$650. Cross-state runs (Copart Dallas to Houston, ~250 mi) are $300–$500. Long-haul runs (Copart Midwest to Port Newark) follow standard $0.40–$0.70/mi open rates.',
        },
        {
          q: 'Can I get hit with storage fees at the port?',
          a: 'Yes, if a vehicle sits at the port warehouse too long before vessel loading. Ports have a free window (typically a few days) before daily storage charges begin. We time pickup and delivery so the vehicle lands at the port close to the vessel sailing date, not weeks ahead. If the vessel slips we can sometimes hold at origin instead.',
        },
        {
          q: 'What is the difference between Y7 and a freight forwarder?',
          a: 'Y7 is a licensed FMCSA auto-transport broker — we handle the domestic trucking leg from auction to port. A freight forwarder handles the international ocean leg — customs filings (Automated Export System), vessel booking, bills of lading for ocean transport, and destination-country documentation. You usually need both; we work together regularly.',
        },
      ]}
      related={[
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'IAAI Transport', to: '/iaai-transport' },
        { label: 'Door to Port', to: '/door-to-port-auto-transport' },
        { label: 'Auction Car Shipping', to: '/auction-car-shipping' },
      ]}
    >
      <PricingRange
        routeName="Auction to Port"
        variants={[
          { label: 'Copart Dallas \u2192 Houston Port', low: 300, high: 500, distance: 250, transit: '1-2 days' },
          { label: 'IAAI Jersey City \u2192 Port Newark', low: 150, high: 350, distance: 15, transit: '1 day' },
          { label: 'Manheim Atlanta \u2192 Savannah Port', low: 400, high: 650, distance: 250, transit: '1-2 days' },
        ]}
      />

      <Section title="The Complete Workflow">
        <p style={prose}>
          Auction-to-port is not a single service — it is a chain of coordinated handoffs, and
          every link has to hold. We run it the same way every time, which is how we keep the
          chain from breaking under time pressure.
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Step</th>
                <th style={th}>Who does it</th>
                <th style={th}>What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>1. Buy at auction</td><td style={td}>Exporter / dealer</td><td style={td}>Win lot, pay, confirm title</td></tr>
              <tr><td style={td}>2. Pickup</td><td style={td}>Y7 + carrier</td><td style={td}>Gate pass at auction, load vehicle, BOL signed</td></tr>
              <tr><td style={td}>3. Transport</td><td style={td}>Carrier</td><td style={td}>Drive to port warehouse, Y7 tracks</td></tr>
              <tr><td style={td}>4. Port delivery</td><td style={td}>Y7 + port warehouse</td><td style={td}>Gate pass at port, warehouse logs condition, BOL signed</td></tr>
              <tr><td style={td}>5. Ocean leg</td><td style={td}>Freight forwarder</td><td style={td}>Vessel loading, customs (AES), ocean bill of lading</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          Y7 owns steps 2 through 4. The exporter owns step 1. The freight forwarder owns step
          5. Understanding where the boundaries are is how you avoid the most common
          auction-to-port mistake: assuming one party handles the whole chain when they
          don\u2019t.
        </p>
      </Section>

      <Section title="Y7\u2019s Role as Broker">
        <p style={prose}>
          Y7 is a licensed FMCSA auto-transport broker. We do not own trucks; we coordinate
          dispatch through a vetted carrier network on Central Dispatch, the industry\u2019s
          primary load board. For the auction-to-port workflow specifically, that means we are
          handling the domestic trucking leg end to end, and handing the vehicle to your
          freight forwarder at the port warehouse.
        </p>
        <p style={muted}>
          What we do not do: we do not file customs paperwork (the freight forwarder\u2019s
          AES declaration), we do not book ocean transport, we do not issue ocean bills of
          lading, and we do not handle destination-country clearance. Trying to do that work
          without a freight forwarder\u2019s license is how shipments get stuck. Our value is
          a single dispatcher who knows the auction workflow, knows the port workflow, and
          owns the hand-off between them.
        </p>
      </Section>

      <Section title="Gate Pass Coordination">
        <p style={prose}>
          Gate passes show up at both ends of the auction-to-port chain, and they are the
          single most common failure point when the workflow goes wrong.
        </p>
        <h3 style={subhead}>What a gate pass is</h3>
        <p style={muted}>
          Gate pass is the umbrella term for terminal entry authorization — the document or
          electronic record that lets a driver enter a controlled facility (auction yard or
          port terminal) with a specific vehicle. It ties the VIN, the driver, and the
          authorized party (buyer, exporter, warehouse operator) together. Without it, the
          driver is turned away at the gate.
        </p>
        <h3 style={subhead}>Who needs it</h3>
        <p style={muted}>
          Everyone picking up from a Copart or IAAI yard needs an auction gate pass tied to
          the buyer number. Everyone delivering a vehicle to a port warehouse for export needs
          a port gate pass tied to the warehouse booking. If either pass is missing when the
          driver arrives, the trip fails.
        </p>
        <h3 style={subhead}>How Y7 handles it</h3>
        <p style={muted}>
          Before any carrier is dispatched, we confirm the auction gate pass is active on the
          buyer account, and we confirm the port gate pass is on file at the receiving
          warehouse. If either is missing we flag it immediately — usually before the load is
          posted. That discipline is the whole difference between \u201cvehicle is at the
          port\u201d and \u201cvehicle is sitting at a truck stop while someone chases
          paperwork.\u201d
        </p>
      </Section>

      <Section title="Popular Auction-to-Port Corridors">
        <p style={prose}>
          Four corridors make up the majority of auction-to-port volume we dispatch. Each has
          its own operational rhythm.
        </p>
        <h3 style={subhead}>Copart Dallas &rarr; Port of Houston</h3>
        <p style={muted}>
          ~250 miles, 1–2 day transit, $300–$500 per vehicle. The default corridor for
          Latin-America-bound exports out of Texas auctions. High carrier frequency keeps this
          lane well-priced and reliable.
        </p>
        <h3 style={subhead}>IAAI Northeast &rarr; Port Newark</h3>
        <p style={muted}>
          IAAI Jersey City is 15 miles from the port — often the same-day run. IAAI yards
          further out (Albany, Hartford, Boston, Philadelphia) run 200–400 miles, $350–$650.
          Port Newark is the dominant Northeast export gateway, so this corridor moves
          constant volume.
        </p>
        <h3 style={subhead}>Copart Florida &rarr; JAXPORT</h3>
        <p style={muted}>
          Copart has a dense footprint in Florida, and JAXPORT is the natural export hub for
          the state. Intra-Florida runs are 100–350 miles at minimum-load floors ($250–$500
          typical).
        </p>
        <h3 style={subhead}>Manheim California &rarr; Port of Los Angeles</h3>
        <p style={muted}>
          Manheim runs large dealer auctions in Southern California; Port of LA is the largest
          West Coast export terminal. Runs are 30–150 miles in the LA basin and price on
          minimum-load floors similar to the Newark lane.
        </p>
      </Section>

      <Section title="Timing and Storage Fees">
        <p style={prose}>
          The auction-to-port clock runs on two sides: auction storage fees on the origin end,
          and port storage fees on the destination end. Both can eat profit fast on a shipment
          that is not actively managed.
        </p>
        <p style={muted}>
          Auction free-storage windows are typically 3–5 days after payment, then daily
          charges begin. We schedule pickup inside that window whenever possible. Port
          warehouses offer a similar free window before vessel loading, typically a few days,
          then daily storage starts — which is why we time delivery to land close to the
          vessel sailing date rather than weeks ahead. Domestic transit itself is usually 1–5
          days depending on corridor; we build the schedule around the forwarder\u2019s vessel
          booking, not the other way around.
        </p>
      </Section>

      <Section title="Documents and Handoff">
        <p style={prose}>
          A clean auction-to-port shipment generates a specific paper trail. Missing or
          incorrect documents are the other big failure mode.
        </p>
        <ul style={prose}>
          <li><strong>Bill of sale</strong> — auction sale receipt, establishes chain of custody</li>
          <li><strong>Title</strong> — required before most carriers will pick up from auction</li>
          <li><strong>Auction gate pass</strong> — tied to buyer number, authorizes pickup</li>
          <li><strong>Y7 BOL</strong> — issued at pickup, signed at port delivery; this is our record of transit</li>
          <li><strong>Port gate pass</strong> — tied to warehouse booking, authorizes delivery</li>
          <li><strong>Warehouse receipt</strong> — issued at port, logs vehicle condition</li>
          <li><strong>Customs / export declaration</strong> — filed by the freight forwarder (AES in the US)</li>
          <li><strong>Ocean bill of lading</strong> — issued by the ocean carrier or forwarder</li>
        </ul>
        <p style={muted}>
          Y7 is responsible for items 3, 4, and 5 on that list, with 1 and 2 supplied by the
          auction / buyer and 6, 7, and 8 handled by the warehouse and freight forwarder. On
          well-run shipments the paperwork is already staged before the driver rolls. On
          poorly-run shipments, someone is calling the auction from a truck stop at 9 PM.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
