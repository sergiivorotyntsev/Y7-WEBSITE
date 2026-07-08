import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from '../SeoLandingPage';
import PricingRange from '../../../components/PricingRange';
import { prose, muted, subhead } from '../_enrichedStyles';

export default function DallasToHouston() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Dallas to Port Houston Auto Transport — Auction to Ship | Y7 Logistics',
        description:
          'Vehicle transport from Dallas auctions to the Port of Houston. Copart and IAA pickup, port warehouse delivery, gate pass coordination, $300-500 typical. Licensed FMCSA broker.',
        path: '/dallas-to-port-houston-auto-transport',
      }}
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      secondaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      heading="Dallas to Port Houston Auto Transport"
      intro="Copart Dallas to the Port of Houston is the default corridor for Latin-America-bound exports out of Texas auctions: roughly 250 miles, 1-2 day transit, and high carrier frequency that keeps the lane well-priced and reliable. Y7 Logistics runs the domestic leg end to end — auction release verification, carrier dispatch, and port warehouse delivery."
      tldr={{
        kicker: 'Dallas to Port Houston, in brief',
        ariaLabel: 'Dallas to Port Houston, in brief',
        text: 'Y7 Logistics, a licensed and bonded FMCSA broker (MC #1741537, USDOT #4427359), moves auction vehicles from the Dallas-Fort Worth yards to the Port of Houston for $300-$500 per vehicle: roughly 250 miles, 1-2 day transit. Houston is one of the largest US vehicle-export gateways and dominates Gulf, Central and South America, and Middle East corridors, which makes this short leg the standard export move out of Texas auctions.',
      }}
      whenNeeded={[
        'Exporter buying at Copart or IAA Dallas with a Houston vessel booking',
        'Latin America or Middle East destination via the Gulf',
        'Texas dealer consolidating export vehicles at a Houston warehouse',
        'Salvage or non-running Dallas auction win heading overseas',
        'Multiple DFW auction wins that should ride to port as one load',
      ]}
      steps={[
        { title: 'Win your vehicle at a DFW-area auction', desc: 'Copart, IAA, or Manheim across the Dallas-Fort Worth metro.' },
        { title: 'Share lot number and buyer info with Y7', desc: 'We confirm the auction release is active before any carrier is assigned.' },
        { title: 'Carrier dispatched on the I-45 corridor', desc: 'Roughly 250 miles with high carrier frequency in both directions.' },
        { title: 'Delivered to your Port Houston warehouse', desc: 'Gate pass on file at the receiving warehouse, BOL signed at delivery.' },
        { title: 'Handoff to your freight forwarder', desc: 'Vessel loading, customs, and the ocean leg are the forwarder’s side of the line.' },
      ]}
      requirements={[
        'Auction lot number and buyer number (or pickup address)',
        'Houston warehouse name and contact',
        'Vehicle details including VIN',
        'Auction release confirmed (gate pass or buyer letter)',
        'Delivery timing to coordinate with the vessel schedule',
      ]}
      capabilities={[
        'All Copart and IAA locations across DFW',
        '~250 miles, transit 1-2 business days',
        'Port of Houston warehouse delivery coordination',
        'Multi-vehicle consolidation for export loads',
        'Winch loading for salvage and non-running units',
        'Gate pass and BOL documentation at both ends',
      ]}
      faqs={[
        {
          q: 'How much does Dallas to Port Houston transport cost?',
          a: 'Copart Dallas to the Port of Houston runs $300-$500 per vehicle, roughly 250 miles with 1-2 day transit. High carrier frequency keeps the lane consistently priced. Non-running vehicles add a winch surcharge, and multi-vehicle consolidations bring the per-unit cost down.',
        },
        {
          q: 'Why do Texas exporters default to Houston over other ports?',
          a: 'Distance and destination fit. The run is around 250 miles instead of roughly 1,700 to Newark, and Houston dominates the Gulf, Central and South America, and Middle East corridors that most Texas export volume targets. When the destination or your forwarder favors the Northeast, the Texas to Port Newark corridor is the alternative; we quote both so you can compare the all-in math.',
        },
        {
          q: 'Can you pick up from any Copart or IAA yard in the Dallas area?',
          a: 'Yes. The DFW metro has some of the highest-volume auction locations in the country, and we dispatch to all of them. We verify the release is active first: Copart\'s gate pass generates once payment clears, IAA release is requested through the buyer portal and typically processes within one business day.',
        },
        {
          q: 'How do storage fees work on this corridor?',
          a: 'Auction free-storage windows typically run 3-5 days after payment, then daily charges begin; port warehouses offer a similar free window before vessel loading. Storage on either end is between you and the facility, and no broker can waive it. What we control is timing: pickup inside the auction window, delivery close to the sailing date.',
        },
        {
          q: 'Can you consolidate several DFW wins into one Houston delivery?',
          a: 'Yes, and it is the main price lever on this lane. Several units bought across DFW yards in the same sale week can ride one carrier to the same Houston warehouse: one dispatch, one BOL trail, lower per-unit cost.',
        },
      ]}
      ctaLabel="Get a Quote"
      ctaTo="/quote"
      related={[
        { label: 'Port of Houston', to: '/ports/houston' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Texas Auto Transport', to: '/texas-auto-transport' },
        { label: 'Texas → Port Newark', to: '/texas-to-newark-port-auto-transport' },
        { label: 'Door-to-Port Transport', to: '/door-to-port-auto-transport' },
      ]}
    >
      <PricingRange
        routeName="Dallas to Port Houston"
        variants={[
          { label: 'Copart Dallas → Houston Port', low: 300, high: 500, distance: 250, transit: '1-2 days' },
        ]}
      />

      <Section title="The Default Texas Export Leg">
        <p style={prose}>
          Every week, vehicles won at Dallas-Fort Worth auctions head south to the Port of
          Houston, one of the largest vehicle-export gateways in the US and the primary West
          Gulf terminal. The corridor works because everything about it is short: 250 miles,
          1-2 days on the truck, and a carrier pool dense enough that dispatch rarely waits on
          equipment. For Latin-America-bound salvage, it is the standard move.
        </p>
        <p style={muted}>
          The economics matter most on lower-value units: a $300-$500 domestic leg keeps the
          landed cost workable on vehicles where a $1,000+ cross-country leg would not. That is
          why the same exporters who agonize over port choice on high-value clean-title cars
          send their Gulf-bound volume through Houston without a second thought.
        </p>
      </Section>

      <Section title="Auction Release, Then Dispatch">
        <h3 style={subhead}>Verify before the truck rolls</h3>
        <p style={muted}>
          We confirm the release is active before assigning a carrier: Copart&apos;s gate pass
          generates automatically once payment clears; IAA release must be requested through
          the buyer portal and typically processes within one business day. A driver turned
          away at a DFW yard costs a day against the free-storage window and the vessel
          schedule.
        </p>
        <h3 style={subhead}>Non-runners are routine</h3>
        <p style={muted}>
          A large share of export-bound auction vehicles are non-running. Winch-equipped
          carriers handle them as standard practice on this lane; disclose the condition at
          quote time so the right equipment shows up the first time.
        </p>
      </Section>

      <Section title="The Port Handoff">
        <p style={prose}>
          Delivery goes to your freight forwarder&apos;s Houston warehouse with the port gate
          pass confirmed before the carrier leaves the yard and a BOL signed on arrival. Vessel
          booking, customs (AES), and the ocean leg belong to the forwarder. The full workflow
          and document trail are on the{' '}
          <Link to="/auction-to-port-transport">auction-to-port transport page</Link>; the
          line-item cost math is in the{' '}
          <Link to="/blog/auction-to-port-cost-breakdown-2026">2026 cost breakdown guide</Link>.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
