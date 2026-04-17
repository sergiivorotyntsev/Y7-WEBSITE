import SeoLandingPage, { Section } from '../SeoLandingPage';
import { prose, muted, subhead, tableWrap, table, th, td } from '../_enrichedStyles';

export default function BostonCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Boston Car Shipping',
        description:
          'Boston car shipping from licensed FMCSA broker. Pickup from any Boston address or dealership. Top corridors: FL, NYC, TX, CA, Port Newark.',
        path: '/boston-car-shipping',
      }}
      heading="Boston Car Shipping — Vehicle Transport in Greater Boston"
      intro="Shipping a car to or from the Greater Boston area requires a broker who knows the city — narrow streets, permit-parking zones, seasonal rate swings, and college move cycles all affect pricing and scheduling. Y7 Logistics is based in Newton, just minutes from downtown, and handles the logistics of pickup and delivery across the metro area."
      whenNeeded={[
        'Moving to or from Boston for work or school',
        'Buying a vehicle online and shipping it to Boston',
        'Sending your car to Florida or Arizona for the winter',
        'Dealer trade between Boston-area dealerships',
        'Relocating from Boston to another state',
        'Receiving an auction purchase (Copart Lowell, IAAI East Taunton)',
      ]}
      steps={[
        { title: 'Get a Quote', desc: 'Mention your Boston neighborhood for the most accurate pricing.' },
        { title: 'Confirm Transport Dates', desc: 'Lock in your preferred pickup window.' },
        { title: 'Carrier Scheduled', desc: 'A verified carrier is assigned for your pickup window.' },
        { title: 'Vehicle Picked Up', desc: 'Carrier arrives at your Boston-area address with a 1–2h window.' },
        { title: 'Door-to-Door Delivery', desc: 'Vehicle is delivered to your destination with BOL signature.' },
      ]}
      requirements={[
        'Exact pickup or delivery address in Greater Boston',
        'Vehicle year / make / model (or VIN)',
        'Preferred dates',
        'Parking situation (driveway, street, garage)',
        'Special notes (gated community, narrow street, permit zone)',
      ]}
      capabilities={[
        'Full Greater Boston coverage — Cambridge, Somerville, Brookline, Newton, Quincy, Dorchester, Back Bay, South End, Allston, Medford, Malden',
        'Carriers experienced with Boston parking and street constraints',
        'Winter scheduling with weather-contingency planning',
        'Open and enclosed transport',
        'Same-day quote response from our local Newton office',
        'Direct relationships with Copart Lowell, IAAI East Taunton, Manheim New England',
      ]}
      faqs={[
        {
          q: 'How much does it cost to ship a car from Boston?',
          a: 'Open-trailer pricing: Boston to Miami $750–$1,050, Boston to NYC $350–$500, Boston to Los Angeles $1,100–$1,500, Boston to Houston $850–$1,150, Boston to Port Newark $400–$550. Rates rise 20–30% in peak snowbird season (Oct–Jan).',
        },
        {
          q: 'Can you pick up from a street with permit parking in Boston?',
          a: 'Yes. Our carriers are experienced with Boston\u2019s parking rules. For permit-only streets, we either time pickup for legal parking windows or arrange a meet-up at a nearby commercial lot (South Bay Center, Assembly Row, Copley Place).',
        },
        {
          q: 'What are the most popular routes from Boston?',
          a: 'The busiest corridors are Boston to South Florida (snowbirds), Boston to NYC and Port Newark (dealer trades and exports), and Boston to California. We run carriers on these lanes weekly, which keeps pricing competitive.',
        },
        {
          q: 'How do Boston\u2019s narrow streets affect car shipping?',
          a: 'Back Bay, Beacon Hill, and parts of the North End require smaller equipment. We may arrange a meet at a larger lot, or use a flatbed to shuttle the car to the main carrier staging point. Our dispatcher flags this when we see the pickup address.',
        },
        {
          q: 'When is the cheapest time to ship a car from Boston?',
          a: 'Shoulder seasons — mid-April through late May and the first two weeks of November — offer the best rates because carrier supply outpaces demand. Avoid mid-August (college move-in) and October\u2013January (snowbird peak) for lowest pricing.',
        },
        {
          q: 'Do you handle dealer trades between Boston-area dealerships?',
          a: 'Yes. Local dealer trades between Boston metro, MetroWest, and North Shore dealerships are a core part of our business. We offer volume pricing for recurring dealer accounts. Contact us for a custom rate sheet.',
        },
      ]}
      related={[
        { label: 'Newton Auto Transport', to: '/newton-auto-transport' },
        { label: 'Massachusetts Car Shipping', to: '/massachusetts-car-shipping' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'MA to FL Shipping', to: '/massachusetts-to-florida-car-shipping' },
      ]}
    >
      <Section title="Car Shipping in Greater Boston">
        <p style={prose}>
          Boston is a top-10 US metro for auto transport volume, driven by a combination of
          snowbird traffic, college moves, dealer density, and the Port Newark export corridor.
          Our Newton office sits 8 miles west of downtown on the I-90 / I-95 crossroads, which
          puts us in the middle of the carrier traffic that moves in and out of New England.
        </p>
        <p style={muted}>
          Y7 Logistics is a licensed FMCSA auto transport broker (MC #1741537 / USDOT #4427359).
          We coordinate shipments through a vetted network of 100+ carriers on Central Dispatch.
          We do not own trucks — our value is dispatch expertise, carrier vetting, and a single
          point of contact through the whole process.
        </p>
      </Section>

      <Section title="Boston Pickup & Delivery Considerations">
        <h3 style={subhead}>Downtown and Back Bay</h3>
        <p style={muted}>
          Back Bay, Beacon Hill, and Downtown Crossing have one-way streets, resident-only
          parking, and tight turns that large multi-car carriers cannot navigate. For addresses
          in these neighborhoods we usually arrange a meet-up at Copley Place, Boston Common
          Garage, or the Seaport commercial lots.
        </p>
        <h3 style={subhead}>Cambridge and Somerville</h3>
        <p style={muted}>
          Harvard Square, Central Square, and Davis Square residential streets are similar to
          Back Bay — expect a nearby meet-up. Further out (Cambridgeport, Somerville near
          Assembly) is fine for residential pickup.
        </p>
        <h3 style={subhead}>South Boston, Dorchester, and the Seaport</h3>
        <p style={muted}>
          These neighborhoods have wider streets and commercial zones that accommodate full
          carriers. Pickup is typically direct. The South Bay shopping center is a common
          fallback staging point for shipments in this area.
        </p>
        <h3 style={subhead}>Commuter suburbs (Brookline, Newton, Quincy, Medford)</h3>
        <p style={muted}>
          Most residential streets accept direct pickup. A small number of tree-lined streets
          in Brookline and west Newton have 12&apos; canopy that rules out multi-car carriers;
          we flag these at quote time.
        </p>
      </Section>

      <Section title="Popular Routes from Boston">
        <p style={prose}>
          Typical open-trailer pricing out of Boston (residential pickup, 7&ndash;10 car carrier):
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Route</th>
                <th style={th}>Distance</th>
                <th style={th}>Typical Price</th>
                <th style={th}>Transit</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>Boston &rarr; South Florida</td><td style={td}>1,500 mi</td><td style={td}>$750&ndash;$1,050</td><td style={td}>5&ndash;7 days</td></tr>
              <tr><td style={td}>Boston &rarr; NYC / NJ metro</td><td style={td}>215 mi</td><td style={td}>$350&ndash;$500</td><td style={td}>1&ndash;2 days</td></tr>
              <tr><td style={td}>Boston &rarr; Los Angeles</td><td style={td}>3,000 mi</td><td style={td}>$1,100&ndash;$1,500</td><td style={td}>8&ndash;12 days</td></tr>
              <tr><td style={td}>Boston &rarr; Texas (Dallas/Houston)</td><td style={td}>1,800 mi</td><td style={td}>$850&ndash;$1,150</td><td style={td}>6&ndash;8 days</td></tr>
              <tr><td style={td}>Boston &rarr; Port Newark</td><td style={td}>230 mi</td><td style={td}>$400&ndash;$550</td><td style={td}>1&ndash;3 days</td></tr>
              <tr><td style={td}>Boston &rarr; Chicago</td><td style={td}>980 mi</td><td style={td}>$650&ndash;$900</td><td style={td}>4&ndash;6 days</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Boston&apos;s Auto Auction Market">
        <p style={prose}>
          Three major auction operators cover the Greater Boston market, and Y7 picks up from
          all three:
        </p>
        <h3 style={subhead}>Copart Lowell</h3>
        <p style={muted}>
          30 miles north of Boston off I-495. Primary salvage + clean-title auction for New
          England. Gate pass coordination and forklift loading for non-running vehicles are
          standard parts of our pickup workflow.
        </p>
        <h3 style={subhead}>IAAI East Taunton</h3>
        <p style={muted}>
          40 miles south of Boston off I-495. Insurance auto auction focused on total-loss and
          salvage vehicles. Same gate-pass workflow as Copart.
        </p>
        <h3 style={subhead}>Manheim New England (Derry, NH)</h3>
        <p style={muted}>
          55 miles north of Boston. Dealer-only auction primarily running clean-title trade-ins.
          We handle dealer account pickups on a recurring basis.
        </p>
      </Section>

      <Section title="College Season: Shipping Cars for Students">
        <p style={prose}>
          August and September see a surge in inbound car shipments from parents sending vehicles
          to students at BU, Boston College, Northeastern, MIT, Harvard, Tufts, Emerson, and
          Berklee. May and early June bring the reverse: shipping vehicles back home at the end
          of spring semester.
        </p>
        <p style={muted}>
          For best rates in the August rush, book two to three weeks before your target pickup
          date. Carriers fill their southbound return loads quickly in that window, so lead time
          matters more than price negotiation. Enclosed transport for higher-value vehicles
          (luxury SUVs, sports cars) is worth the 40&ndash;60% premium in college drop-off
          traffic where parking lots can be chaotic.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
