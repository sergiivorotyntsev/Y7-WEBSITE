import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from '../SeoLandingPage';
import PricingRange from '../../../components/PricingRange';
import { prose, muted, subhead } from '../_enrichedStyles';

export default function FloridaToJacksonville() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Florida Auctions to Jacksonville Port Car Shipping — RoRo Export | Y7 Logistics',
        description:
          'Vehicle transport from Florida Copart and IAA yards to JAXPORT for RoRo and container export. Gate pass coordination, $250-500 intra-Florida floors. Licensed FMCSA broker.',
        path: '/florida-to-jacksonville-port-car-shipping',
      }}
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      secondaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      heading="Florida Auctions to Jacksonville Port Car Shipping"
      intro="Copart has one of its densest yard footprints in Florida, and JAXPORT is the state's natural export hub — the largest vehicle-export port on the East Coast, handling both RoRo and container loadings. Y7 Logistics runs the intra-Florida leg: auction release verification, carrier dispatch, and port warehouse delivery timed to your vessel booking."
      tldr={{
        kicker: 'Florida to JAXPORT, in brief',
        ariaLabel: 'Florida to JAXPORT, in brief',
        text: 'Y7 Logistics, a licensed and bonded FMCSA broker (MC #1741537, USDOT #4427359), moves auction vehicles from Florida Copart and IAA yards to JAXPORT, the East Coast\'s largest vehicle-export port. Intra-Florida runs are 100-350 miles at minimum-load floors, $250-$500 typical, with 1-2 day transit. JAXPORT loads both RoRo and container exports to Europe, the Caribbean, South America, and West Africa.',
      }}
      whenNeeded={[
        'Exporter buying at Florida Copart or IAA yards with a JAXPORT booking',
        'RoRo export needing terminal delivery with a coordinated gate pass',
        'Caribbean, Europe, South America, or West Africa destination',
        'Salvage or non-running Florida auction win heading overseas',
        'Multiple Florida wins that should consolidate at one port warehouse',
      ]}
      steps={[
        { title: 'Win your vehicle at a Florida auction', desc: 'Copart or IAA anywhere in the state, Miami to the Panhandle.' },
        { title: 'Share lot number and buyer info with Y7', desc: 'We confirm the auction release is active before any carrier is assigned.' },
        { title: 'Carrier dispatched on the intra-Florida run', desc: '100-350 miles depending on the yard; 1-2 day transit.' },
        { title: 'Delivered to JAXPORT or your forwarder warehouse', desc: 'Gate pass on file at the receiving end, BOL signed at delivery.' },
        { title: 'Handoff to your freight forwarder', desc: 'RoRo or container loading, customs, and the ocean leg are the forwarder’s side.' },
      ]}
      requirements={[
        'Auction lot number and buyer number (or pickup address)',
        'JAXPORT warehouse or terminal booking details',
        'Vehicle details including VIN',
        'Auction release confirmed (gate pass or buyer letter)',
        'Booking number and cutoff date for RoRo terminal deliveries',
      ]}
      capabilities={[
        'All Copart and IAA Florida locations',
        'Intra-Florida runs 100-350 miles, transit 1-2 business days',
        'JAXPORT RoRo and container warehouse delivery',
        'Multi-vehicle consolidation for export loads',
        'Winch loading for salvage and non-running units',
        'Gate pass and BOL documentation at both ends',
      ]}
      faqs={[
        {
          q: 'How much does Florida auction to JAXPORT transport cost?',
          a: 'Intra-Florida auction-to-port runs are 100-350 miles and price on minimum-load floors, $250-$500 typical, with 1-2 day transit. The floor pricing means a short Jacksonville-area pickup and a Miami-area pickup can cost similar amounts; consolidating multiple wins onto one carrier is what moves the per-unit number.',
        },
        {
          q: 'Does JAXPORT handle RoRo or container vehicle exports?',
          a: 'Both. JAXPORT is the largest vehicle-export port on the East Coast and loads RoRo and container-based vehicle exports to Europe, the Caribbean, South America, and West Africa. RoRo terminal deliveries need the booking number, cutoff date, and a coordinated gate pass before the carrier arrives; we collect those at quote time.',
        },
        {
          q: 'Which Florida auction yards do you cover?',
          a: 'All of them. Copart runs one of its densest state footprints in Florida, and IAA covers the same metros. We verify the release is active before dispatch: Copart\'s gate pass generates once payment clears, IAA release is requested through the buyer portal and typically processes within one business day.',
        },
        {
          q: 'How tight is the timing on a vessel booking?',
          a: 'Auction free-storage windows typically run 3-5 days after payment, and RoRo bookings carry a hard cutoff date. We schedule pickup inside the auction window and time port delivery close to the cutoff rather than weeks early, so the vehicle is not paying warehouse storage while it waits for the ship.',
        },
        {
          q: 'Can you ship non-running salvage to the port?',
          a: 'Yes, it is routine on this corridor. Winch-equipped carriers load non-runners as standard practice; vehicles with missing wheels or heavy undercarriage damage need forklift-capable equipment, so disclose condition at quote time and the right rig is dispatched the first time.',
        },
      ]}
      ctaLabel="Get a Quote"
      ctaTo="/quote"
      related={[
        { label: 'Port of Jacksonville', to: '/ports/jacksonville' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Florida Car Shipping', to: '/florida-car-shipping' },
        { label: 'Atlanta → Savannah Port', to: '/atlanta-to-savannah-port-auto-transport' },
        { label: 'Salvage Car Shipping', to: '/salvage-car-shipping' },
      ]}
    >
      <PricingRange
        routeName="Florida Auctions to JAXPORT"
        variants={[
          { label: 'Copart / IAA Florida → JAXPORT', low: 250, high: 500, distance: 350, transit: '1-2 days' },
        ]}
      />

      <Section title="Why Florida Export Volume Runs Through JAXPORT">
        <p style={prose}>
          Florida produces a steady stream of export-bound auction vehicles: Copart&apos;s
          dense yard network across Miami, Orlando, Tampa, and Jacksonville sells heavily to
          overseas buyers, and JAXPORT is the state&apos;s natural export hub. As the East
          Coast&apos;s largest vehicle-export port it offers both RoRo and container loadings,
          which covers everything from running clean-title units driving onto a vessel to
          salvage consolidating into containers.
        </p>
        <p style={muted}>
          The intra-state leg prices on minimum-load floors ($250-$500 typical) rather than
          per-mile math, so the biggest cost lever is consolidation: several wins from the same
          sale week riding one carrier to one warehouse.
        </p>
      </Section>

      <Section title="Auction Release and Pickup Mechanics">
        <h3 style={subhead}>Release first, dispatch second</h3>
        <p style={muted}>
          Copart&apos;s gate pass generates automatically once payment clears; IAA release must
          be requested through the buyer portal and typically processes within one business
          day. Free-storage windows (typically 3-5 days after payment) set the pickup deadline,
          and we treat them as hard dispatch priorities.
        </p>
        <h3 style={subhead}>Salvage condition, honestly disclosed</h3>
        <p style={muted}>
          Much of the export volume on this corridor is total-loss salvage. Winch loading is
          standard; missing wheels or severe damage needs forklift-capable equipment. Accurate
          condition at quote time is the difference between one clean pickup and a re-dispatch
          that burns storage days against the booking cutoff.
        </p>
      </Section>

      <Section title="The RoRo Handoff">
        <p style={prose}>
          RoRo terminal deliveries are less forgiving than warehouse drops: the booking number,
          cutoff date, and gate pass must line up before the carrier arrives at the terminal.
          We confirm all three at dispatch and time delivery close to the cutoff. The complete
          auction-to-port workflow is on the{' '}
          <Link to="/auction-to-port-transport">auction-to-port transport page</Link>; per-port
          operational detail lives on the{' '}
          <Link to="/ports/jacksonville">Port of Jacksonville page</Link>.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
