import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from '../SeoLandingPage';
import { prose, muted, subhead, tableWrap, table, th, td } from '../_enrichedStyles';

export default function NewJerseyAutoTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'New Jersey Auto Transport — NJ Car Shipping | Y7 Logistics',
        description:
          'NJ auto transport with Port Newark gate pass coordination. Dealer-dense market expertise. Licensed FMCSA broker MC #1741537.',
        path: '/new-jersey-auto-transport',
      }}
      primaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      secondaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      heading="New Jersey Auto Transport — Vehicle Shipping in NJ"
      intro="New Jersey sits at the center of three of the most important auto-transport flows in the United States: the Port Newark export gateway, the dealer-dense Northeast retail corridor, and the I-95 mainline that moves vehicles between New England and Florida. Y7 Logistics is a licensed FMCSA broker (MC #1741537 / USDOT #4427359) based in Natick, MA, and we coordinate shipments to and from every corner of New Jersey — Bergen County to Cape May, Newark to Princeton — through our vetted carrier network on Central Dispatch."
      whenNeeded={[
        'Shipping a vehicle to or from New Jersey',
        'Delivering to Port Newark / Elizabeth for export',
        'NJ dealer-to-dealer trades and inventory rebalancing',
        'Picking up from Copart Somerville or IAAI Jersey City',
        'Relocating to or from the Garden State',
        'Receiving auction purchases at an NJ address',
      ]}
      steps={[
        { title: 'Request a Quote', desc: 'Provide your NJ address (or auction lot) and vehicle details.' },
        { title: 'Receive Pricing', desc: 'Within 1 hour during business hours, based on current Northeast lane rates.' },
        { title: 'Confirm and Schedule', desc: 'Lock in your pickup window — we pull from a high-frequency carrier pool.' },
        { title: 'Carrier Picks Up or Delivers', desc: 'Residential, dealer, auction, or port delivery, coordinated by a single dispatcher.' },
        { title: 'Transport Completed', desc: 'BOL at both ends; for port deliveries we hand off to your freight forwarder.' },
      ]}
      requirements={[
        'NJ pickup or delivery address (or auction + lot number)',
        'Vehicle year, make, and model (or VIN)',
        'Destination (or origin if inbound)',
        'For port delivery — terminal / warehouse name and booking number',
        'Preferred pickup window',
      ]}
      capabilities={[
        'All of New Jersey — North, Central, and South',
        'Port Newark / Port Elizabeth delivery and gate-pass coordination',
        'High dealer-density corridor support (Newark / Jersey City / Edison)',
        'Copart Somerville and IAAI Jersey City auction pickup',
        'Open and enclosed transport',
        'USDOT #4427359 • MC #1741537 • FMCSA-registered broker',
      ]}
      faqs={[
        {
          q: 'How much does it cost to ship a car from New Jersey?',
          a: 'Open-trailer pricing from NJ: to Miami $700–$950 (3–5 days), to Los Angeles $1,050–$1,400 (7–9 days), to Boston $350–$500 (1–2 days), to Port Newark locally $200–$400 (same day to 1 day). Enclosed transport runs 40–60% higher. Rates move with season and vehicle size.',
        },
        {
          q: 'How does the Port Newark gate pass process work?',
          a: 'A gate pass is the terminal\u2019s written authorization to enter with a vehicle for export. Y7 coordinates the paperwork with the port warehouse, the driver arrives at the terminal, the gate pass is issued, the vehicle is logged in, and your freight forwarder then takes over for customs, ocean booking, and vessel loading.',
        },
        {
          q: 'Do NJ dealers get better pricing on high-volume trades?',
          a: 'Yes. Dealers running recurring trades between Newark, Jersey City, Edison, and other NJ markets — or shipping inventory south to Florida — qualify for dealer rate cards. Volume, predictable lanes, and open pickup windows all reduce per-unit cost. Ask us for a custom rate sheet.',
        },
        {
          q: 'What is the best way to pick up from Copart Somerville or IAAI Jersey City?',
          a: 'We schedule pickup inside the auction\u2019s free storage window (typically 3–5 days after payment) and coordinate the gate pass with your buyer number. Both yards are high-volume, so same-week pickup is usually available. Share the lot number and we handle the rest.',
        },
        {
          q: 'What are transit times from New Jersey?',
          a: 'NJ sits on the I-95 spine, so transit is fast in every direction: Boston / New England 1–2 days, Washington DC 1 day, Atlanta 2–3 days, Florida 3–5 days, Chicago 3–4 days, Texas 4–5 days, Los Angeles 7–9 days. Pickup itself usually happens 1–5 days after you confirm.',
        },
        {
          q: 'Is my vehicle insured during NJ transport?',
          a: 'Yes. Every carrier we dispatch carries cargo insurance — typically $100,000–$250,000 for open carriers and $250,000–$500,000 for enclosed transport. We verify active coverage through Central Dispatch before assigning any load. Your BOL at pickup and delivery is the formal record for any claim against the carrier\u2019s policy.',
        },
      ]}
      related={[
        { label: 'NJ to FL Shipping', to: '/new-jersey-to-florida-car-shipping' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Copart Shipping from NJ Yards', to: '/copart-shipping' },
        { label: 'Ship My Car', to: '/ship-my-car' },
        { label: 'Port Newark', to: '/ports/newark' },
      ]}
    >
      <Section title="New Jersey as the East Coast Export Gateway">
        <p style={prose}>
          Port Newark / Elizabeth is the single most important vehicle export terminal in the
          United States. The combined facility handles the majority of roll-on/roll-off and
          containerized vehicle exports on the East Coast, and by some industry estimates more
          than half of all US vehicle exports transit through the New York/New Jersey port
          complex. For exporters, dealers, and individuals sending a car overseas, New Jersey is
          not just a state — it is the funnel.
        </p>
        <p style={muted}>
          The terminal footprint spans both Port Newark (on the Newark side) and the Elizabeth
          Marine Terminal (on the Elizabeth side), with dedicated RO/RO berths, secured storage
          yards, and warehouse operators who accept vehicles from out-of-state auctions every day.
          Y7 runs this lane on a recurring basis for exporters shipping to West Africa, the Middle
          East, the Caribbean, and Europe. The domestic leg is what we handle — pickup at the
          auction, transport to the port, gate pass, delivery logged at the warehouse — after
          which your freight forwarder takes custody for customs and ocean booking.
        </p>
        <p style={muted}>
          The export corridor matters because it sets the shape of the entire New Jersey carrier
          market. Trucks constantly deadhead into the state carrying empty slots, because they
          know loads are waiting. That competition keeps inbound rates to NJ unusually
          competitive compared to other Northeast destinations, and it means a Copart or IAAI
          buyer in the Midwest who wants to get a car to Port Newark rarely has to wait more
          than a few days for dispatch.
        </p>
      </Section>

      <Section title="Dealer-Dense Market: Newark, Jersey City, Edison">
        <p style={prose}>
          New Jersey has one of the highest new-car dealer densities in the United States.
          Franchise rooftops cluster along Route 1, Route 22, Route 17, and the Route 18 / 9
          corridor in Middlesex County; used-car operators and auction resellers are concentrated
          around Newark, Elizabeth, Paterson, and Jersey City. For a compact state, the trade
          volume is enormous — dealers constantly rebalance inventory with other Northeast
          markets and with the Florida retail belt.
        </p>
        <p style={muted}>
          We support recurring dealer accounts in three common shapes. First, intra-NJ and
          intra-Northeast trades — a rooftop in Edison moves a used vehicle to a sister store in
          Paramus, or trades with a dealer in Queens or Greenwich. Second, NJ-to-Florida
          inventory pushes, where dealers move aged inventory south to a hotter retail market.
          Third, auction-to-retail flows from Manheim or ADESA into an NJ dealer lot. All three
          benefit from dealer rate cards, flexible pickup windows, and single-dispatcher
          coordination across multiple moves per week.
        </p>
      </Section>

      <Section title="Pricing From and To New Jersey">
        <p style={prose}>
          New Jersey is one of the best-priced origins in the Northeast because of constant
          carrier presence. The numbers below are typical open-trailer ranges for standard sedans
          and SUVs picked up at a residential or dealer address; enclosed transport runs 40–60%
          higher.
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Route</th>
                <th style={th}>Distance</th>
                <th style={th}>Open Price</th>
                <th style={th}>Transit</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>NJ &rarr; Miami, FL</td><td style={td}>1,280 mi</td><td style={td}>$700&ndash;$950</td><td style={td}>3&ndash;5 days</td></tr>
              <tr><td style={td}>NJ &rarr; Los Angeles, CA</td><td style={td}>2,790 mi</td><td style={td}>$1,050&ndash;$1,400</td><td style={td}>7&ndash;9 days</td></tr>
              <tr><td style={td}>NJ &rarr; Boston, MA</td><td style={td}>215 mi</td><td style={td}>$350&ndash;$500</td><td style={td}>1&ndash;2 days</td></tr>
              <tr><td style={td}>NJ &rarr; Port Newark (local)</td><td style={td}>5&ndash;40 mi</td><td style={td}>$200&ndash;$400</td><td style={td}>Same day &ndash; 1 day</td></tr>
              <tr><td style={td}>NJ &rarr; Atlanta, GA</td><td style={td}>880 mi</td><td style={td}>$600&ndash;$850</td><td style={td}>2&ndash;3 days</td></tr>
              <tr><td style={td}>NJ &rarr; Chicago, IL</td><td style={td}>790 mi</td><td style={td}>$550&ndash;$800</td><td style={td}>3&ndash;4 days</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          Local NJ-to-port runs are priced on a minimum-load basis rather than strict per-mile
          rates — that is why a 15-mile IAAI Jersey City to Port Newark delivery falls in the
          $200–$400 band even though the math would suggest less. Carriers need a floor that
          covers driver time, the gate pass process, and warehouse wait time. Long-haul rates
          follow the usual pattern of roughly $0.40–$0.70 per mile on open trailers, scaling
          down as distance grows.
        </p>
      </Section>

      <Section title="Port Newark Gate Pass Process">
        <p style={prose}>
          A gate pass is terminal authorization — the document (or electronic record) that lets a
          driver enter a secured port facility with a vehicle destined for export. Without it,
          the driver is turned away, the vehicle goes back onto the truck, storage fees start
          accruing, and the vessel schedule may slip. Getting this right is the single most
          important operational detail in an auction-to-port transport.
        </p>
        <h3 style={subhead}>Y7\u2019s role</h3>
        <p style={muted}>
          We handle the domestic coordination. Once you share the destination warehouse, booking
          number, and freight forwarder contact, we confirm the gate pass is on file at the
          terminal before the driver arrives. If paperwork is missing we flag it before dispatch,
          not at the gate. We do not file customs paperwork or book the ocean leg — that is the
          freight forwarder\u2019s job.
        </p>
        <h3 style={subhead}>What happens at the port</h3>
        <p style={muted}>
          The driver pulls into the designated warehouse staging area, the vehicle is off-loaded,
          the warehouse operator inspects it and logs the condition, and the BOL is signed and
          released. From that moment the freight forwarder controls the vehicle — they arrange
          vessel loading, file the Automated Export System declaration, and deal with customs.
          You receive the signed BOL and the port receipt as your proof of domestic delivery.
        </p>
        <h3 style={subhead}>Timing</h3>
        <p style={muted}>
          Ports charge storage fees if a vehicle sits too long before vessel loading. We time
          pickup so the vehicle lands at the port within the warehouse\u2019s free window —
          typically a few days before the booked sailing, never weeks ahead. If a vessel slips,
          we can sometimes hold at origin rather than absorb port storage.
        </p>
      </Section>

      <Section title="NJ Auction Locations">
        <p style={prose}>
          New Jersey itself has two primary auction yards that Y7 picks up from regularly, plus
          a ring of dealer auctions and independent yards in the surrounding states that feed
          the NJ market.
        </p>
        <h3 style={subhead}>Copart Somerville</h3>
        <p style={muted}>
          Central NJ off I-287 / Route 22, a high-volume salvage and clean-title yard serving
          buyers across the Northeast and the export market. Gate pass coordination and forklift
          loading for non-running vehicles are part of the standard pickup workflow. Most
          Somerville-to-Port Newark runs are same-day or next-day.
        </p>
        <h3 style={subhead}>IAAI Jersey City</h3>
        <p style={muted}>
          Hudson County, minutes from the port complex itself. One of the shortest auction-to-port
          transports in the country — frequently under 15 miles. The yard handles heavy export
          buyer volume, so pickup scheduling discipline matters: we confirm gate-pass paperwork
          is on file before the driver rolls.
        </p>
        <h3 style={subhead}>Surrounding dealer and independent auctions</h3>
        <p style={muted}>
          Manheim New Jersey (Bordentown), ADESA New Jersey (Manville), and a number of smaller
          dealer-only auctions in the Newark / Edison area complete the local picture. We pick up
          from all of them under dealer buyer numbers on recurring accounts, and we consolidate
          multi-vehicle runs into Port Newark when the timing lines up.
        </p>
      </Section>

      <Section title="The NJ Export-Warehouse Market">
        <p style={prose}>
          Beyond the Port Newark terminal itself, New Jersey&rsquo;s export flow runs through a
          cluster of export warehouses in the Newark / Irvington area that receive vehicles from
          auctions across the country before they are loaded for ocean transit. This is a national
          feeder market, not a local one: recent dispatch data shows cars arriving from 25 states
          and 79 distinct pickup locations, led by volume from New York, Pennsylvania, Illinois,
          Massachusetts, and New Jersey itself.
        </p>
        <p style={muted}>
          The practical consequence for exporters and dealers is that the warehouse cluster behaves
          as a single delivery point &mdash; where in the Newark / Irvington area a car is received
          makes no measurable difference to the carrier rate. How that rate is actually formed
          &mdash; the role of distance, pickup type, and vehicle size &mdash; is broken down on our{' '}
          <Link to="/nj-export-warehouse-shipping-cost">NJ export-warehouse shipping cost</Link>{' '}
          page.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
