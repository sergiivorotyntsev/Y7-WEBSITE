import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from '../SeoLandingPage';
import PricingRange from '../../../components/PricingRange';
import { prose, muted, subhead } from '../_enrichedStyles';

export default function TexasToNewark() {
  return (
    <SeoLandingPage
      meta={{
        title: 'TX to Port Newark Vehicle Shipping',
        description:
          'Vehicle transport from Texas to Port Newark for export. Auction pickup in TX, door-to-port delivery. All documentation handled.',
        path: '/texas-to-newark-port-auto-transport',
      }}
      primaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      secondaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      heading="Texas to Port Newark Auto Transport"
      intro="The Texas-to-Port Newark corridor is one of the most active export routes in US auto transport. Exporters purchasing vehicles from Texas auctions (Copart, IAAI) regularly ship to Port Newark/Elizabeth for overseas shipping. Y7 Logistics handles the entire domestic leg — from Texas auction yard to port warehouse."
      whenNeeded={[
        'Exporter buying at Texas Copart/IAAI for overseas shipping',
        'Dealer shipping inventory from TX to Port Newark',
        'Vehicle export requiring Port Newark delivery',
        'Multiple vehicles from TX auctions to Newark port',
        'Consolidating TX auction purchases for export',
      ]}
      steps={[
        { title: 'Win your vehicle at a Texas auction', desc: 'Or provide pickup details for any TX address.' },
        { title: 'Share lot number and buyer info with Y7', desc: 'We coordinate gate pass and port warehouse delivery.' },
        { title: 'Carrier dispatched on the TX→Newark corridor', desc: 'Via I-40/I-78 or I-81 corridor.' },
        { title: 'Vehicle delivered to your Port Newark warehouse', desc: 'Door-to-port delivery in 4–6 business days.' },
        { title: 'Receive BOL and delivery confirmation', desc: 'Full documentation for export processing.' },
      ]}
      requirements={[
        'Texas pickup location (auction yard or address)',
        'Port Newark warehouse name and contact',
        'Vehicle details including VIN',
        'Gate pass (for auction pickups)',
        'Delivery timing to coordinate with vessel schedule',
      ]}
      capabilities={[
        'All Copart and IAAI Texas locations',
        '~1,700 miles via I-40/I-78 or I-81 corridor',
        'Transit time 4–6 business days',
        'Port Newark/Elizabeth warehouse delivery coordination',
        'Multi-vehicle consolidation',
        'Gate pass and BOL documentation',
        'Open transport (standard) or enclosed for high-value exports',
      ]}
      faqs={[
        {
          q: 'How long does TX to Port Newark take?',
          a: 'Standard transit is 4–6 business days. We can coordinate delivery timing with your vessel schedule to avoid early arrival warehouse storage fees.',
        },
        {
          q: 'Can you pick up from any Copart/IAAI in Texas?',
          a: 'Yes. Texas has some of the highest-volume auction locations in the country. We pick up from all Copart and IAAI yards across the state — Houston, Dallas, San Antonio, and beyond.',
        },
        {
          q: 'Do you handle documentation for port delivery?',
          a: 'We handle the domestic transport documentation — Bill of Lading, carrier insurance, delivery receipts. For export-specific paperwork (title, customs), work with your freight forwarder.',
        },
        {
          q: 'Can you deliver multiple vehicles to the same port warehouse?',
          a: 'Yes. We regularly consolidate multiple auction purchases for delivery to the same Newark port warehouse. Multi-vehicle shipments often qualify for better per-unit pricing.',
        },
        {
          q: 'Should my Texas auction purchase ship to Port Newark or Port Houston?',
          a: 'It depends on the destination and your freight forwarder. Port Houston is the short run from Texas auctions (Copart Dallas to Houston is roughly 250 miles at $300-$500) and dominates Gulf, Central and South America, and Middle East corridors. Newark is the long run (~1,700 miles, $950-$1,450) but serves destinations and vessel schedules Houston does not, and many forwarders consolidate there. We quote both lanes so you can compare the all-in math before committing.',
        },
      ]}
      related={[
        { label: 'Texas Auto Transport', to: '/texas-auto-transport' },
        { label: 'Port Newark', to: '/ports/newark' },
        { label: 'Door-to-Port Transport', to: '/door-to-port-auto-transport' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
      ]}
    >
      <PricingRange
        routeName="Texas to Port Newark"
        openLow={950}
        openHigh={1450}
        enclosedLow={1700}
        enclosedHigh={2400}
        distance={1650}
        typicalTransitDays="4-6"
      />

      <Section title="Texas Auction Yards Feeding This Corridor">
        <p style={prose}>
          Texas holds some of the highest-volume Copart and IAA locations in the country,
          clustered around Dallas, Houston, and San Antonio. For exporters, that concentration
          is the whole point of the lane: multiple wins across DFW and Houston-area yards in
          one sale week can ride to Port Newark as a single consolidated load instead of three
          separate bookings.
        </p>
        <p style={muted}>
          The dispatch mechanics mirror any auction pickup: we verify the release is active
          before assigning a carrier (Copart&apos;s gate pass generates once payment clears;
          IAA release must be requested through the buyer portal and typically processes within
          one business day), the free-storage window (typically 3-5 days after payment) sets
          the pickup deadline, and the vessel booking at the Newark end sets the delivery
          window. The complete workflow is on our{' '}
          <Link to="/auction-to-port-transport">auction-to-port transport page</Link>.
        </p>
      </Section>

      <Section title="Newark vs Houston: Choosing the Port from Texas">
        <h3 style={subhead}>When Houston wins</h3>
        <p style={muted}>
          For Gulf, Central and South America, and Middle East destinations, the short
          Dallas-to-Houston run (roughly 250 miles, $300-$500, 1-2 days) is usually the smarter
          leg; see the{' '}
          <Link to="/dallas-to-port-houston-auto-transport">Dallas to Port Houston route</Link>{' '}
          for that corridor.
        </p>
        <h3 style={subhead}>When Newark wins</h3>
        <p style={muted}>
          Newark earns the 1,700-mile run when the destination, vessel cadence, or your
          forwarder&apos;s consolidation warehouse lives in the NY/NJ port complex. A forwarder
          with an established Newark operation and weekly consolidations can beat the
          theoretically cheaper port on the all-in math. Our{' '}
          <Link to="/blog/port-specific-export-newark-houston-savannah">Newark vs Houston vs
          Savannah comparison</Link> walks through the decision in detail.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
