import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from '../SeoLandingPage';
import PricingRange from '../../../components/PricingRange';
import { prose, muted, subhead } from '../_enrichedStyles';

export default function AtlantaToSavannah() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Atlanta to Savannah Port Auto Transport — Auction to Ship | Y7 Logistics',
        description:
          'Vehicle transport from Atlanta auctions to the Port of Savannah. Copart, IAA, and Manheim pickup, Garden City Terminal delivery, gate pass coordination. Licensed FMCSA broker.',
        path: '/atlanta-to-savannah-port-auto-transport',
      }}
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      secondaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      heading="Atlanta to Savannah Port Auto Transport"
      intro="The Atlanta-to-Savannah corridor connects the Southeast's auction hub to its export gateway. Vehicles bought at metro-Atlanta auctions run roughly 250 miles down I-75/I-16 to the Georgia Ports Authority's Garden City Terminal, one of the Southeast's fast-growing vehicle-export corridors. Y7 Logistics handles the domestic leg: auction release, carrier dispatch, and port warehouse delivery."
      tldr={{
        kicker: 'Atlanta to Savannah, in brief',
        ariaLabel: 'Atlanta to Savannah, in brief',
        text: 'Y7 Logistics, a licensed and bonded FMCSA broker (MC #1741537, USDOT #4427359), moves auction vehicles from metro Atlanta to the Port of Savannah: roughly 250 miles, 1-2 day transit, $400-$650 per vehicle on the Manheim Atlanta lane. We verify the auction release before dispatch, and time port delivery to your freight forwarder\'s vessel booking so the vehicle is not paying warehouse storage weeks before loading.',
      }}
      whenNeeded={[
        'Exporter buying at Atlanta-area auctions with a Savannah vessel booking',
        'Manheim Atlanta purchase heading overseas',
        'Copart or IAA Georgia pickup destined for the Garden City Terminal',
        'Southeast dealer consolidating export vehicles at Savannah',
        'Multiple auction wins that should ride to port as one load',
      ]}
      steps={[
        { title: 'Win your vehicle at an Atlanta-area auction', desc: 'Or provide pickup details for any metro Atlanta address.' },
        { title: 'Share lot number and buyer info with Y7', desc: 'We confirm the auction release is active before any carrier is assigned.' },
        { title: 'Carrier dispatched on the I-75/I-16 corridor', desc: 'Roughly 250 miles, well-traveled by export carriers.' },
        { title: 'Delivered to your Savannah port warehouse', desc: 'Gate pass on file at the receiving warehouse, BOL signed at delivery.' },
        { title: 'Handoff to your freight forwarder', desc: 'Vessel loading, customs, and the ocean leg are the forwarder’s side of the line.' },
      ]}
      requirements={[
        'Auction lot number and buyer number (or pickup address)',
        'Savannah warehouse name and contact',
        'Vehicle details including VIN',
        'Auction release confirmed (gate pass or buyer letter)',
        'Delivery timing to coordinate with the vessel schedule',
      ]}
      capabilities={[
        'Manheim Atlanta, Copart, and IAA Georgia pickups',
        '~250 miles via I-75/I-16, transit 1-2 business days',
        'Garden City Terminal warehouse delivery coordination',
        'Multi-vehicle consolidation for export loads',
        'Gate pass and BOL documentation at both ends',
        'Non-running vehicles with winch loading',
      ]}
      faqs={[
        {
          q: 'How much does Atlanta to Savannah port transport cost?',
          a: 'The benchmark lane, Manheim Atlanta to the Port of Savannah, runs $400-$650 per vehicle for roughly 250 miles with 1-2 day transit. Copart and IAA pickups across metro Atlanta price in the same band. Non-running vehicles add a winch surcharge, and multi-vehicle consolidations bring the per-unit cost down.',
        },
        {
          q: 'How long does auction-to-port take on this corridor?',
          a: 'Driving time is 1-2 business days. The realistic clock is set by the auction side: release must be active before dispatch (Copart generates its gate pass once payment clears; IAA release is requested through the buyer portal and typically processes within one business day; Manheim release is coordinated with the location), and auction free-storage windows typically run 3-5 days after payment. We schedule pickup inside that window whenever the lane allows.',
        },
        {
          q: 'What ships out of the Port of Savannah?',
          a: 'Savannah has become one of the fastest-growing vehicle-export corridors in the Southeast, and for European destinations it is increasingly the natural choice from Southeast origins. Which destinations work best depends on current vessel schedules; your freight forwarder books the ocean leg, and our Newark vs Houston vs Savannah comparison covers how the ports differ.',
        },
        {
          q: 'Can you pick up from Manheim Atlanta without a dealer present?',
          a: 'Yes. Once the purchase clears, we coordinate release with the Manheim location directly, which can include scheduling pickup with auction staff, and dispatch a carrier when the vehicle is actually release-ready. Vehicles bought at a Tuesday sale may not be ready until Wednesday or Thursday depending on title processing.',
        },
        {
          q: 'Do you handle the port gate pass at Garden City Terminal?',
          a: 'We confirm the port gate pass is on file with the receiving warehouse before the carrier leaves the auction yard, the same discipline we apply on every auction-to-port shipment. Customs filings and vessel booking stay with your freight forwarder; our job ends with a signed BOL at the warehouse.',
        },
      ]}
      ctaLabel="Get a Quote"
      ctaTo="/quote"
      related={[
        { label: 'Port of Savannah', to: '/ports/savannah' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Manheim Transport', to: '/manheim-transport' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Florida → JAXPORT', to: '/florida-to-jacksonville-port-car-shipping' },
        { label: 'Door-to-Port Transport', to: '/door-to-port-auto-transport' },
      ]}
    >
      <PricingRange
        routeName="Atlanta to Savannah Port"
        variants={[
          { label: 'Manheim Atlanta → Savannah Port', low: 400, high: 650, distance: 250, transit: '1-2 days' },
        ]}
      />

      <Section title="The Southeast's Auction-to-Export Corridor">
        <p style={prose}>
          Atlanta is the wholesale-vehicle hub of the Southeast: Manheim runs one of its major
          auction facilities there, and Copart and IAA operate yards across the metro. Savannah
          is the region&apos;s export gateway, with vehicle traffic through the Georgia Ports
          Authority&apos;s Garden City Terminal growing steadily, particularly on European
          lanes. The 250-mile leg between them is the connective tissue: short enough for 1-2
          day transit, long enough that dispatch discipline decides whether the vehicle makes
          its vessel.
        </p>
        <p style={muted}>
          A Southeast pickup destined for Europe often routes through Savannah more efficiently
          than through the Northeast ports; our{' '}
          <Link to="/blog/port-specific-export-newark-houston-savannah">Newark vs Houston vs
          Savannah comparison</Link> covers when that holds and when it does not.
        </p>
      </Section>

      <Section title="Release Mechanics by Auction">
        <h3 style={subhead}>Manheim Atlanta</h3>
        <p style={muted}>
          Dealer-license-only access, overwhelmingly running, clean-title inventory. Release is
          coordinated with the location rather than through an automated pass; Tuesday
          purchases may not be release-ready until midweek. We track the location&apos;s sale
          days and dispatch when the vehicle is actually available.
        </p>
        <h3 style={subhead}>Copart and IAA</h3>
        <p style={muted}>
          Copart&apos;s gate pass generates automatically once payment clears; IAA release must
          be requested through the buyer portal and typically processes within one business
          day. Both platforms give a short free-storage window (typically 3-5 days after
          payment), which sets the pickup deadline. Salvage and non-running units get
          winch-equipped carriers, standard practice on this corridor.
        </p>
      </Section>

      <Section title="Timing the Port Handoff">
        <p style={prose}>
          Port warehouses offer a free window before vessel loading, typically a few days, then
          daily storage starts. We time delivery to land close to the sailing date rather than
          weeks ahead, building the schedule around your forwarder&apos;s vessel booking. The
          complete workflow, documents, and cost math live on the{' '}
          <Link to="/auction-to-port-transport">auction-to-port transport page</Link> and the{' '}
          <Link to="/blog/auction-to-port-cost-breakdown-2026">2026 cost breakdown guide</Link>.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
