import SeoLandingPage, { Section } from './SeoLandingPage';
import { colors, fonts } from '../../theme';

const p = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

const tableCell = {
  fontFamily: fonts.sans,
  fontSize: '13px',
  color: colors.textMuted,
  padding: '12px 16px',
  borderBottom: `1px solid ${colors.border}`,
  lineHeight: 1.5,
};

const tableHeader = {
  ...tableCell,
  fontWeight: 600,
  color: colors.text,
  fontSize: '13px',
  textAlign: 'left',
  background: colors.bgMuted,
};

const cardStyle = {
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '12px',
};

export default function CarShippingCost() {
  return (
    <SeoLandingPage
      meta={{
        title: 'How Much Does Car Shipping Cost?',
        description:
          'Car shipping costs depend on distance, vehicle type, transport method, and season. Get a free quote from Y7 Logistics — licensed auto transport broker.',
        path: '/car-shipping-cost',
      }}
      primaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      secondaryCTA={{ intlKey: 'dealers', to: '/dealers', tone: 'teal' }}
      heading="How Much Does Car Shipping Cost?"
      intro="Car shipping pricing depends on several factors — distance, vehicle size, transport type, season, and whether the vehicle runs. Y7 Logistics provides transparent, all-inclusive quotes with no hidden fees so you know exactly what you're paying before you book."
      whenNeeded={[
        'Buying a car out of state',
        'Relocating to a new city or state',
        'Sending a vehicle to an auction buyer',
        'Dealer-to-dealer vehicle transfers',
      ]}
      steps={[
        { title: 'Request a Quote', desc: 'Tell us your vehicle details, pickup location, and delivery destination.' },
        { title: 'Receive Pricing', desc: 'We provide an all-inclusive quote based on current market rates and route availability.' },
        { title: 'Confirm & Schedule', desc: 'Accept your quote and we lock in your transport dates.' },
        { title: 'Carrier Picks Up', desc: 'A verified carrier from our network picks up your vehicle at the scheduled time.' },
        { title: 'Vehicle Delivered', desc: 'Your vehicle arrives at the destination and you inspect it upon delivery.' },
      ]}
      requirements={[
        'Vehicle details (year, make, model)',
        'Pickup and delivery locations',
        'Preferred transport dates',
        'Vehicle condition (running or non-running)',
      ]}
      capabilities={[
        'Open and enclosed transport options',
        'Door-to-door service',
        'Expedited shipping available',
        'Inoperable vehicle transport',
        'Shipment status updates',
      ]}
      faqs={[
        {
          q: 'What affects car shipping cost?',
          a: 'The main factors are distance, vehicle size and weight, transport type (open vs. enclosed), time of year, and whether the vehicle is running. Longer routes, larger vehicles, enclosed trailers, peak summer season, and inoperable vehicles all increase the price.',
        },
        {
          q: 'Is open or enclosed transport cheaper?',
          a: 'Open transport is typically 30–40% less expensive than enclosed. Open carriers hold more vehicles, spreading the cost. Enclosed is recommended for luxury, classic, or high-value vehicles where extra protection is worth the premium.',
        },
        {
          q: 'How much does it cost to ship a car across the country?',
          a: "Cross-country rates vary depending on the specific route, vehicle type, and season. The best way to get an accurate price is to request a free quote with your exact details — we'll provide all-inclusive pricing within minutes.",
        },
        {
          q: 'Are there hidden fees?',
          a: 'No. As a licensed FMCSA broker, Y7 Logistics provides an all-inclusive quote covering the carrier transport, the carrier\'s cargo insurance, and door-to-door coordination — Y7 is the broker and does not insure vehicles itself. The price you see is the price you pay.',
        },
        {
          q: 'When is the cheapest time to ship a car?',
          a: 'Winter months (November through February) typically have lower demand and lower prices. Summer is peak season due to relocations and snowbird migration, so rates tend to be higher.',
        },
      ]}
      ctaLabel="Get a Free Quote"
      ctaTo="/quote"
      related={[
        { label: 'Ship My Car', to: '/ship-my-car' },
        { label: 'Enclosed Shipping', to: '/enclosed-car-shipping' },
        { label: 'Open Car Shipping', to: '/open-car-shipping' },
        { label: 'State-to-State', to: '/state-to-state-car-shipping' },
        { label: 'Open vs Enclosed Guide', to: '/open-vs-enclosed-auto-transport' },
        { label: 'Auction Transport Savings', to: '/auction-transport-savings' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      {/* --- Rich content sections --- */}

      <Section title="Cost by Distance: What the Numbers Actually Look Like">
        <p style={p}>
          Distance is the single biggest factor in your shipping cost, but it does not scale linearly. Short hauls under 500 miles actually cost more per mile because the carrier still has to load, secure, and unload your vehicle regardless of how far it travels. Here is how distance breaks down in practice:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${colors.border}` }}>
            <thead>
              <tr>
                <th style={tableHeader}>Distance</th>
                <th style={tableHeader}>Typical Transit</th>
                <th style={tableHeader}>What to Expect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tableCell}>Under 500 mi</td>
                <td style={tableCell}>2–4 days</td>
                <td style={tableCell}>Most affordable total price, but highest per-mile rate. Carriers often bundle short-haul loads with longer routes to fill the trailer.</td>
              </tr>
              <tr>
                <td style={tableCell}>500–1,000 mi</td>
                <td style={tableCell}>3–5 days</td>
                <td style={tableCell}>Mid-range pricing. Popular regional corridors (TX→FL, NY→OH) tend to have more carrier availability and competitive rates.</td>
              </tr>
              <tr>
                <td style={tableCell}>1,000–2,000 mi</td>
                <td style={tableCell}>5–8 days</td>
                <td style={tableCell}>Standard long-haul territory. Per-mile cost drops as distance increases. These routes attract the most carriers.</td>
              </tr>
              <tr>
                <td style={tableCell}>2,000+ mi (cross-country)</td>
                <td style={tableCell}>7–10 days</td>
                <td style={tableCell}>Lowest per-mile rate. Coast-to-coast routes like CA→NY are high-volume corridors with consistent carrier traffic.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={p}>
          Transit times are business days and represent the pickup-to-delivery window, not time on the road. A carrier driving coast-to-coast may cover the distance in 4 days of driving, but regulations limit hours behind the wheel, and multi-car haulers make intermediate stops to load and deliver other vehicles along the route.
        </p>
      </Section>

      <Section title="How Vehicle Size Affects Your Price">
        <p style={p}>
          Carriers price by the space your vehicle occupies on the trailer — both the physical footprint and the weight it adds. A standard car hauler fits 7–10 vehicles depending on size. Larger vehicles mean fewer total cars per load, and the carrier needs to make up that revenue difference.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          <div style={cardStyle}>
            <div style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: colors.text, marginBottom: '6px' }}>Sedans & Coupes</div>
            <p style={{ ...p, marginBottom: 0 }}>Baseline pricing. Compact cars, mid-size sedans, and standard coupes fit easily and take up the least space on the trailer.</p>
          </div>
          <div style={cardStyle}>
            <div style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: colors.text, marginBottom: '6px' }}>SUVs & Trucks</div>
            <p style={{ ...p, marginBottom: 0 }}>Expect 10–20% more than a sedan on the same route. Full-size trucks and three-row SUVs are at the higher end because they limit how many vehicles fit on the deck.</p>
          </div>
          <div style={cardStyle}>
            <div style={{ fontFamily: fonts.sans, fontSize: '14px', fontWeight: 600, color: colors.text, marginBottom: '6px' }}>Oversized & Modified</div>
            <p style={{ ...p, marginBottom: 0 }}>Lifted trucks, vehicles with aftermarket bumpers, dual-rear-wheel pickups, or anything exceeding standard height/width clearances. These can add 30% or more and may require specific trailer configurations.</p>
          </div>
        </div>
        <p style={p}>
          When you request a quote, providing the exact year, make, and model matters. A 2024 Honda Civic and a 2024 Ford F-350 dually going on the same route will have very different prices, and the reason is purely mechanical — trailer space and weight distribution.
        </p>
      </Section>

      <Section title="Open vs. Enclosed Transport">
        <p style={p}>
          About 85% of vehicles shipped in the US go on open carriers — the multi-car haulers you see on the highway every day. Enclosed transport uses a fully covered trailer that protects against weather, road debris, and UV exposure. The price difference is real: enclosed typically runs 40–60% more than open for the same route.
        </p>
        <p style={p}>
          When does enclosed make sense? If you are shipping a vehicle worth over $75,000, a classic car, an exotic, or a show car where even minor cosmetic imperfection matters. For a daily driver or a standard used car purchase, open transport is the industry standard and handles millions of vehicles per year without incident. The cars you see at dealership lots were almost certainly delivered on an open carrier.
        </p>
      </Section>

      <Section title="Inoperable Vehicle Surcharges">
        <p style={p}>
          If your vehicle does not start, does not roll, does not steer, or does not brake, the carrier needs special equipment to load it. A vehicle that rolls but does not start can usually be winched onto the trailer. A vehicle that cannot roll at all may need a forklift. This adds $100–$300 to the transport cost depending on the situation.
        </p>
        <p style={p}>
          Be specific when requesting a quote: "non-running" covers a wide range. A car with a dead battery is very different from a car with no wheels. The more detail you give us, the more accurate the quote. If the vehicle has been in an accident, let us know the extent of the damage — some carriers will not transport vehicles with severe structural damage for safety reasons.
        </p>
      </Section>

      <Section title="Seasonal Pricing Patterns">
        <p style={p}>
          Auto transport pricing follows predictable seasonal cycles driven by migration patterns, weather, and market demand. Understanding these patterns can save you real money if your timeline is flexible.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${colors.border}` }}>
            <thead>
              <tr>
                <th style={tableHeader}>Period</th>
                <th style={tableHeader}>Demand</th>
                <th style={tableHeader}>What Drives It</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tableCell}>January – March</td>
                <td style={{ ...tableCell, fontWeight: 600, color: colors.accent }}>High</td>
                <td style={tableCell}>Snowbird season. Massive volume heading south to Florida and Arizona. Northbound routes out of FL are cheap because carriers need to reposition.</td>
              </tr>
              <tr>
                <td style={tableCell}>April – May</td>
                <td style={tableCell}>Moderate</td>
                <td style={tableCell}>Demand starts balancing out. Snowbirds returning north, spring military PCS orders begin. Good time to ship if you have flexibility.</td>
              </tr>
              <tr>
                <td style={tableCell}>June – August</td>
                <td style={{ ...tableCell, fontWeight: 600, color: colors.accent }}>High</td>
                <td style={tableCell}>Summer relocation season, college moves, military PCS peak. Volume is high nationwide, but so is carrier availability.</td>
              </tr>
              <tr>
                <td style={tableCell}>September – October</td>
                <td style={tableCell}>Moderate–Rising</td>
                <td style={tableCell}>Early snowbird moves begin. Dealers shipping end-of-year inventory. Rates start climbing on southbound routes.</td>
              </tr>
              <tr>
                <td style={tableCell}>November – December</td>
                <td style={tableCell}>Variable</td>
                <td style={tableCell}>Holiday slowdown reduces carrier availability. Weather delays on northern routes. Prices can spike for last-minute shipments.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="First Mile and Last Mile: Location Matters">
        <p style={p}>
          Metro-to-metro routes are the cheapest because carriers are already running those corridors. A shipment from Los Angeles to Houston follows a high-traffic lane with dozens of carriers making that run weekly. But if your pickup or delivery is in a rural area — say, 40 miles off the nearest interstate — expect to pay more.
        </p>
        <p style={p}>
          Rural pickups and deliveries add cost for two reasons: the carrier has to detour from their main route, burning fuel and time, and large car haulers sometimes cannot navigate narrow rural roads. In those cases, we may arrange a smaller truck for the first or last leg, which adds a transfer step. If you are near a metro area, meeting the carrier at a convenient location (like a large parking lot near a highway exit) can save you $50–$150.
        </p>
      </Section>

      <Section title="Why Prices Vary Between Brokers">
        <p style={p}>
          Auto transport is a marketplace. Brokers like Y7 Logistics post your shipment to a load board where carriers bid on the job. The price a carrier accepts depends on their current route, how full their trailer is, fuel costs that week, and how quickly they need to fill empty spots.
        </p>
        <p style={p}>
          If a broker quotes you significantly below market rate, there is a catch: either the carrier will demand more money at pickup (a bait-and-switch), or your vehicle will sit unassigned for weeks because no carrier will take the job at that price. We price based on what carriers are actually accepting on the load board right now — not what sounds good on a sales call. That is why our quotes convert to pickups quickly, usually within 1–5 days of your first available date.
        </p>
        <p style={p}>
          The broker fee is built into your all-inclusive quote. You will never see a separate line item for it. The total you are quoted is the total you pay — that covers the carrier's rate, the carrier's cargo insurance, and our broker coordination of the entire process from booking through delivery confirmation.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
