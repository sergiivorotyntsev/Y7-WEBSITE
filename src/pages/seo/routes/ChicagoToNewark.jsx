import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from '../SeoLandingPage';
import PricingRange from '../../../components/PricingRange';
import { prose, muted, subhead } from '../_enrichedStyles';

export default function ChicagoToNewark() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Chicago to Port Newark Auto Transport',
        description:
          'Ship vehicles from Chicago area to Port Newark. Auction pickup, dealer transport, export delivery. ~800 miles, 3-4 days.',
        path: '/chicago-to-port-newark-car-shipping',
      }}
      primaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      secondaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      heading="Chicago to Port Newark Car Shipping"
      intro="The Chicago-to-Port Newark route serves exporters, dealers, and individuals who need vehicles shipped from the Midwest to the East Coast's busiest export terminal. At approximately 800 miles via I-80/I-76, this corridor offers fast transit times and competitive pricing."
      whenNeeded={[
        'Exporting vehicles through Port Newark from the Midwest',
        'Chicago-area auction purchases heading to Newark port',
        'Dealer inventory moves from Chicago to New Jersey',
        'Midwest vehicle relocation to the East Coast',
        'Consolidating Midwest purchases at Port Newark',
      ]}
      steps={[
        { title: 'Provide pickup details', desc: 'Chicago-area address or auction location.' },
        { title: 'We quote the ~800-mile corridor', desc: 'Competitive pricing on this well-traveled route.' },
        { title: 'Carrier assigned on the I-80/I-76 route', desc: 'Frequent carrier availability on this corridor.' },
        { title: 'Vehicle picked up from Chicago area', desc: 'All metro and suburban locations served.' },
        { title: 'Delivered to Port Newark warehouse', desc: 'Door-to-port delivery in 3–4 business days.' },
      ]}
      requirements={[
        'Chicago-area pickup address or auction location',
        'Port Newark warehouse details',
        'Vehicle information',
        'Timing to coordinate with port operations',
        'For auctions — lot number and gate pass',
      ]}
      capabilities={[
        'All Chicago metro and suburban areas',
        '~800 miles via I-80/I-76 corridor',
        'Transit 3–4 business days',
        'Copart and IAAI Chicagoland pickup',
        'Port Newark warehouse delivery',
        'Multi-vehicle transport available',
        'Open and enclosed options',
      ]}
      faqs={[
        {
          q: 'How long does Chicago to Port Newark take?',
          a: 'Standard transit is 3–4 business days. The ~800-mile I-80/I-76 route is well-traveled by carriers, ensuring consistent scheduling.',
        },
        {
          q: 'Do you pick up from Chicago-area auctions?',
          a: 'Yes. We pick up from all Copart and IAAI locations in the Chicagoland area and across Illinois. Gate pass coordination included.',
        },
        {
          q: 'Can I combine multiple vehicles on this route?',
          a: 'Yes. Multi-vehicle shipments from Chicago to Port Newark are common for exporters and often come with per-unit savings.',
        },
        {
          q: 'Can you take a Copart or IAA purchase straight from the Chicagoland yard to Port Newark?',
          a: 'Yes, that is the core use of this corridor. We confirm your auction release is active before dispatch, the carrier picks up at the yard, and the vehicle is delivered to your Port Newark warehouse with a signed BOL. Auction free-storage windows typically run 3-5 days after payment, so we schedule the pickup inside that window whenever the lane allows and time delivery to your forwarder\'s vessel booking.',
        },
      ]}
      related={[
        { label: 'Port Newark', to: '/ports/newark' },
        { label: 'Door-to-Port Transport', to: '/door-to-port-auto-transport' },
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
      ]}
    >
      <PricingRange
        routeName="Chicago to Port Newark"
        openLow={600}
        openHigh={950}
        enclosedLow={1150}
        enclosedHigh={1650}
        distance={800}
        typicalTransitDays="3-4"
      />

      <Section title="Why This Corridor Is an Export Lane First">
        <p style={prose}>
          Most traffic on the Chicago-to-Newark lane is not household relocation, it is export
          flow: vehicles bought at Midwest auctions moving to the New York/New Jersey port
          complex, the busiest vehicle-export gateway in the country. Copart and IAA both run
          multiple Chicagoland yards, and the winning bidders are frequently exporters whose
          real destination is a Port Newark or Elizabeth warehouse, not a driveway.
        </p>
        <p style={muted}>
          That changes how the lane should be dispatched. An export shipment has a vessel
          booking behind it, an auction free-storage window in front of it (typically 3-5 days
          after payment), and a port warehouse that logs condition on arrival. We build the
          schedule backward from the forwarder&apos;s vessel date: pickup inside the free
          window, 3-4 business days on the I-80/I-76 corridor, delivery timed so the vehicle
          does not sit at the port warehouse accruing storage weeks before loading. The full
          workflow, gate passes on both ends included, is documented on our{' '}
          <Link to="/auction-to-port-transport">auction-to-port transport page</Link>.
        </p>
      </Section>

      <Section title="Chicagoland Auction Pickup Mechanics">
        <h3 style={subhead}>Release before dispatch</h3>
        <p style={muted}>
          Copart generates its gate pass automatically once payment clears; IAA requires you to
          request release through the buyer portal, which typically processes within one
          business day. We verify the release is active before a carrier is assigned, because a
          driver turned away at a Chicagoland yard costs a day on the vessel schedule.
        </p>
        <h3 style={subhead}>Consolidation is the price lever</h3>
        <p style={muted}>
          Exporters buying several units across Chicago-area yards in the same sale week can
          consolidate them onto one carrier for the Newark run. Per-unit cost drops and the
          paperwork arrives as one package: one dispatch, one BOL trail, one delivery window at
          the port warehouse. Tell us the full list of lots at quote time and we route the
          pickup order around each yard&apos;s release status.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
