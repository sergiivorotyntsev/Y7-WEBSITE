import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from './SeoLandingPage';
import { colors, fonts } from '../../theme';

const p = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

export default function ManheimTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Manheim Auction Transport',
        description:
          'Vehicle transport from Manheim dealer auctions. Contract pricing for dealerships, nationwide coverage. Licensed auto transport broker Y7 Logistics.',
        path: '/manheim-transport',
      }}
      primaryCTA={{ intlKey: 'dealers', to: '/dealers', tone: 'teal' }}
      secondaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      heading="Manheim Transport — Dealer Auction Vehicle Shipping"
      intro="Manheim is the world's largest wholesale vehicle auction marketplace, serving licensed dealers exclusively. Y7 Logistics provides reliable transport from Manheim locations with competitive pricing for dealers who ship regularly."
      whenNeeded={[
        'Dealer purchasing inventory at Manheim',
        'Buying from Manheim online (OVE/Simulcast)',
        'Dealer-to-dealer trade through Manheim',
        'Fleet vehicle acquisition at Manheim',
        'Need reliable ongoing transport partner',
      ]}
      steps={[
        { title: 'Purchase vehicle through Manheim', desc: 'Complete your Manheim auction purchase or online transaction.' },
        { title: 'Provide Manheim purchase details to Y7', desc: 'Share your purchase confirmation, pickup location, and delivery address.' },
        { title: 'Carrier assigned from nearest fleet', desc: 'We match your shipment with a verified carrier in the area.' },
        { title: 'Pickup from Manheim location', desc: 'Carrier picks up your vehicle directly from the Manheim facility.' },
        { title: 'Delivered to your dealership or lot', desc: 'Vehicle arrives at your dealership, lot, or other specified destination.' },
      ]}
      requirements={[
        'Manheim purchase confirmation',
        'Dealer license info',
        'Pickup location details',
        'Delivery address',
        'Any special handling needs',
      ]}
      capabilities={[
        'All Manheim locations nationwide',
        'Dealer volume pricing',
        'Dedicated account management',
        'Recurring pickup scheduling',
        'Priority dispatch for time-sensitive inventory',
        'Open and enclosed options',
      ]}
      faqs={[
        {
          q: 'Do you offer dealer volume pricing?',
          a: 'Yes, dealers with regular shipping needs get contract rates. The more you ship, the better your per-vehicle cost.',
        },
        {
          q: 'How fast is pickup from Manheim?',
          a: 'Typically 2-4 business days. Expedited service is available for priority inventory that needs to hit your lot faster.',
        },
        {
          q: 'Can you set up recurring transport from Manheim?',
          a: 'Yes, we offer dedicated scheduling for dealers who buy regularly. Your account manager handles routing and dispatch so you can focus on buying.',
        },
        {
          q: 'Do you transport from Manheim to other auctions?',
          a: 'Yes, inter-auction and dealer-to-dealer transport is available. We handle logistics between any combination of auctions and dealerships.',
        },
      ]}
      ctaLabel="Get Dealer Pricing"
      ctaTo="/dealer-quote"
      related={[
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Dealer Transport', to: '/dealer-auto-transport' },
        { label: 'For Dealers', to: '/dealers' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <Section title="Manheim Is Dealer-Only: Why That Matters for Transport">
        <p style={p}>
          Unlike Copart and IAA, which are open to public buyers, Manheim restricts access to
          licensed dealers. Every vehicle at Manheim is a wholesale unit — trade-ins, off-lease
          returns, fleet dispositions, and dealer consignments. This means the vehicles coming
          out of Manheim are overwhelmingly running, drivable, and in sellable condition. From
          a transport perspective, that translates to simpler loading, fewer special-handling
          requirements, and faster yard turnaround.
        </p>
        <p style={p}>
          It also means the buyers are professionals who move volume. A dealer buying three to
          ten vehicles per week at Manheim has different transport needs than someone who won a
          single salvage car on Copart. Dealer logistics require consistency, predictable pricing,
          and a broker who understands that every day a vehicle sits in transit is a day it is not
          on the lot generating revenue.
        </p>
      </Section>

      <Section title="Ready Logistics vs. Independent Broker: The Real Comparison">
        <p style={p}>
          Manheim owns Ready Logistics, their in-house transport arm. When you buy a vehicle on
          Manheim, you will see Ready Logistics offered as the default shipping option right in the
          checkout flow. It is seamless, it is integrated, and for a dealer who buys one car a
          month, it may be fine. But for dealers who ship volume, the limitations become apparent
          quickly.
        </p>
        <p style={p}>
          Ready Logistics pricing is standardized — you pay their posted rate with no room for
          negotiation. An independent broker like Y7 Logistics prices against the live carrier
          market, which means your rate reflects actual supply and demand on that lane at that
          time. On high-volume routes (say, Manheim Pennsylvania to New Jersey dealerships),
          the difference can be $50 to $150 per vehicle. Multiply that by 20 vehicles a month
          and the savings add up fast.
        </p>
        <p style={p}>
          The bigger advantage is flexibility. Ready Logistics handles Manheim vehicles only.
          If you also buy from Copart, IAA, or directly from other dealers (see how the three
          platforms <Link to="/blog/copart-iaa-manheim-comparison" style={{ color: colors.accent }}>compare for transport</Link>),
          you now have multiple transport vendors to manage. With Y7, one broker handles every pickup
          regardless of source — Manheim, Copart, IAA, dealer trades, or private purchases.
          One point of contact, one invoice, one relationship.
        </p>
      </Section>

      <Section title="Common Dealer Scenarios We Handle">
        <p style={p}>
          Scenario one: you are a mid-size dealer in New Jersey. On Tuesday you buy five vehicles
          at Manheim Pennsylvania — two sedans, an SUV, a pickup, and a minivan. All five are
          running. We dispatch a single car hauler that picks up all five in one trip and delivers
          them to your lot in NJ the next day. Your per-vehicle cost drops because the carrier
          fills a full load on one lane instead of making five separate trips.
        </p>
        <p style={p}>
          Scenario two: same week, you also win two vehicles at Copart Somerville and one at IAA
          Hartford. Instead of booking three separate transport orders with three different
          services, you give us all eight vehicles. We route carriers to cover Manheim PA,
          Copart NJ, and IAA CT with optimized loads — some combined, some separate based on
          timing and geography. You get one update thread, one invoice, and all eight cars on
          your lot by Friday.
        </p>
        <p style={p}>
          Scenario three: dealer trade. You have a customer who wants a specific trim that
          another dealer 300 miles away has on their lot. The other dealer wants a unit you
          have. We coordinate the swap — pick up from Dealer A, deliver to Dealer B, and
          simultaneously pick up from Dealer B and deliver to Dealer A. Timing matters because
          both dealers have customers waiting. We sync the pickups so neither dealer is left
          without a vehicle to show.
        </p>
      </Section>

      <Section title="Manheim OVE and Simulcast: Buying Without Being There">
        <p style={p}>
          Not every Manheim purchase happens in the lane. OVE (Online Vehicle Exchange) is
          Manheim's 24/7 digital marketplace where dealers list and buy wholesale inventory
          without attending a physical auction. Simulcast lets you bid in real-time on live
          auction lanes from your computer. Both channels mean you could buy a vehicle from a
          Manheim location 1,500 miles away without ever stepping foot in the building.
        </p>
        <p style={p}>
          That distance between buyer and vehicle is exactly where transport logistics become
          critical. When you buy on OVE from Manheim Dallas and your dealership is in
          Connecticut, you need a broker who can quote accurately for that lane, dispatch a
          carrier to a Manheim location they may not have visited before, and coordinate with
          Manheim's release desk remotely. We handle OVE and Simulcast purchases the same way
          we handle in-lane buys — the process on our end does not change.
        </p>
      </Section>

      <Section title="Volume Pricing: How Consistent Shipping Lowers Your Cost">
        <p style={p}>
          Transport pricing in this industry is lane-based and volume-sensitive. A dealer who
          ships two vehicles a year pays retail rates. A dealer who ships ten vehicles a month
          gets a different conversation entirely. Here is how it works in practice:
        </p>
        <p style={p}>
          When you ship consistently through one broker, we build a history on your lanes. We
          know which carriers run your routes, what they charge, and when capacity is tight or
          loose. That data lets us negotiate better rates on your behalf because we are not
          starting from scratch every time. Carriers also prefer repeat business — a driver who
          knows he picks up from Manheim PA every Tuesday for the same dealer will hold that
          slot, which means faster pickups and fewer missed windows.
        </p>
        <p style={p}>
          We structure dealer accounts with per-vehicle rate tiers. Ship five or more vehicles
          per month and your rate drops. Ship ten-plus and it drops further. The exact numbers
          depend on your lanes — a 100-mile run has different economics than a 1,200-mile run —
          but the principle holds: consistency earns you better pricing.
        </p>
      </Section>

      <Section title="Manheim's Footprint: 70+ Locations Nationwide">
        <p style={p}>
          Manheim operates over 70 physical auction locations across the United States, from
          Manheim Pennsylvania (the original and largest facility, with 400+ acres) to locations
          in California, Texas, Florida, Georgia, and everywhere in between. Each location runs
          on its own schedule — some hold sales on Tuesdays, others on Wednesdays or Thursdays.
        </p>
        <p style={p}>
          For transport, the sale schedule matters. Vehicles purchased on Tuesday's sale may not
          be release-ready until Wednesday or Thursday, depending on the location's title
          processing speed. We track sale days and release timelines at the Manheim locations
          our dealer clients buy from most frequently, so we can set realistic pickup expectations
          and avoid dispatching a carrier before the vehicle is actually available.
        </p>
        <p style={p}>
          Dealers who buy from multiple Manheim locations in the same region can benefit from
          consolidated routing. If you buy at Manheim Atlanta on Tuesday and Manheim Jacksonville
          on Wednesday, we can route one carrier south through both locations on a single run,
          cutting your total transport bill compared to two separate bookings.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
