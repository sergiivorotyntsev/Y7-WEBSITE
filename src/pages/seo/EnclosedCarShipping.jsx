import SeoLandingPage, { Section } from './SeoLandingPage';
import { prose, muted, subhead, tableWrap, table, th, td } from './_enrichedStyles';

export default function EnclosedCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Enclosed Car Shipping — Covered Auto Transport | Y7 Logistics',
        description:
          'Enclosed auto transport for luxury, classic, exotic, and high-value vehicles. Hardside/softside trailers, $250K–$500K cargo insurance. Licensed FMCSA broker.',
        path: '/enclosed-car-shipping',
      }}
      heading="Enclosed Car Shipping — Premium Covered Auto Transport"
      intro="Enclosed transport is the right choice when the vehicle's value, rarity, or condition makes open-trailer exposure an unacceptable risk. Y7 Logistics is a licensed FMCSA broker (MC #1741537 / USDOT #4427359) based in Newton, MA, coordinating enclosed shipments through specialty carriers on Central Dispatch. Enclosed runs 40–60% more than open transport — but for a $120,000 sports car or a 1967 Corvette, that premium is the cheapest insurance you can buy against road debris, weather, and curious eyes along the route."
      whenNeeded={[
        'Luxury vehicles valued over $50,000',
        'Classic, vintage, and antique cars (pre-1990 collector vehicles)',
        'Exotic sports cars — Ferrari, Lamborghini, McLaren, Porsche GT models, Aston Martin',
        'Show cars and concours-condition vehicles',
        'Brand-new vehicles with zero delivery miles',
        'Low-clearance vehicles that cannot load on a standard open trailer',
        'Any vehicle where weather, debris, or visibility must be eliminated',
      ]}
      steps={[
        { title: 'Request an Enclosed Quote', desc: 'Provide vehicle details, declared value, and any handling requirements.' },
        { title: 'Receive Pricing', desc: 'Enclosed quote back within 1 hour, with equipment options (hardside, softside, single-car, multi-car).' },
        { title: 'Pre-Transport Documentation', desc: 'Detailed photo documentation of vehicle condition before carrier arrival.' },
        { title: 'Specialty Carrier Assigned', desc: 'Enclosed carrier with proven specialty experience and $250,000–$500,000 cargo insurance.' },
        { title: 'White-Glove Pickup', desc: 'Soft-tie straps, liftgate or ramp loading, climate control when specified.' },
        { title: 'Secure Delivery', desc: 'Final inspection at destination; BOL signed with condition confirmation.' },
      ]}
      requirements={[
        'Vehicle year, make, model, and VIN',
        'Declared value for supplemental insurance',
        'Pickup and delivery locations',
        'Running or non-running status',
        'Ride height and any loading constraints (low splitter, air suspension, etc.)',
        'Preferred equipment type (hardside, softside, single-car, climate-controlled)',
      ]}
      capabilities={[
        'Hardside fully enclosed metal trailers',
        'Softside canvas enclosed trailers',
        'Single-vehicle top-tier transport',
        'Multi-car enclosed (4–6 vehicles)',
        'Liftgate loading for low-clearance vehicles',
        'Climate-controlled options for classics and vintage',
        '$250,000–$500,000 cargo insurance on enclosed specialty carriers',
        'Soft-tie wheel straps — no chains, no body contact',
      ]}
      faqs={[
        {
          q: 'How much more does enclosed shipping cost vs open?',
          a: 'Enclosed runs 40–60% more than open transport on the same lane. Open rates are typically $0.40–$0.70 per mile; enclosed runs $0.70–$1.20 per mile. A coast-to-coast open move at $1,300 becomes roughly $2,000–$2,200 enclosed. Single-vehicle top-tier enclosed can exceed $1.50 per mile on longer lanes.',
        },
        {
          q: 'When is enclosed transport worth the extra cost?',
          a: 'Enclosed is worth it for vehicles over $50,000, classic or collector cars, exotics, show-condition vehicles, brand-new zero-mile deliveries, low-clearance sports cars that need liftgate loading, and any time you want to eliminate weather and road-debris exposure entirely. Below the $50K threshold, open is usually the smarter choice.',
        },
        {
          q: 'What is the difference between hardside and softside enclosed trailers?',
          a: 'Hardside trailers have full metal walls and roof — complete weather seal, total visual privacy, and maximum debris protection. Softside trailers have a rigid frame with heavy-duty canvas sides; slightly lighter, occasionally cheaper. Hardside is the gold standard for exotics, classics, and show cars.',
        },
        {
          q: 'Liftgate vs ramp loading — which do I need?',
          a: 'Ramp loading is standard on most enclosed trailers and works for any vehicle with normal ground clearance (roughly 5+ inches). Liftgate (hydraulic platform) loading is required for low-clearance supercars, vehicles with air suspension that cannot raise, and any car with a front splitter or diffuser at risk of ramp contact.',
        },
        {
          q: 'Do enclosed carriers offer climate control?',
          a: 'Some do, particularly single-vehicle specialty carriers serving the classic and vintage market. Climate-controlled enclosed transport regulates temperature and humidity during transit, which matters for vehicles with period-correct interiors, delicate paint finishes, or long-term storage before transport. Expect an additional 15–25% premium.',
        },
        {
          q: 'What insurance coverage do enclosed carriers carry?',
          a: 'Cargo insurance on network carriers is typically $100,000–$250,000 for open transport and $250,000–$500,000 for enclosed, which is what matters for your shipment. (The $750,000+ figure you may see elsewhere refers to FMCSA-mandated liability insurance for bodily injury and property damage — a separate policy from cargo coverage.) For declared values over $250,000, we recommend confirming the specific cargo policy limit before dispatch and can arrange supplemental coverage if needed.',
        },
      ]}
      ctaLabel="Get an Enclosed Quote"
      ctaTo="/quote"
      related={[
        { label: 'Open Car Shipping', to: '/open-car-shipping' },
        { label: 'Tesla Car Shipping', to: '/tesla-car-shipping' },
        { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
        { label: 'Ship My Car', to: '/ship-my-car' },
      ]}
    >
      <Section title="What Enclosed Transport Actually Is">
        <p style={prose}>
          An enclosed auto transport trailer is a fully covered haul rig that holds
          2–6 vehicles protected from weather, road debris, stone chips, UV
          exposure, and outside visibility. Unlike open carriers — where 7–10
          vehicles ride exposed on a double-deck trailer — enclosed transport
          carries fewer vehicles in a sealed environment, and the carrier spreads
          fewer operating costs across them. That math drives the 40–60% price
          premium.
        </p>
        <p style={muted}>
          Enclosed trailers split into two main designs. Hardside enclosed trailers
          use rigid aluminum or steel walls and a solid roof — the maximum-protection
          option, completely weather-sealed, invisible from outside. Softside
          enclosed trailers use a rigid frame with heavy-duty canvas or coated-fabric
          side panels; lighter and occasionally cheaper, but slightly less protective
          against extreme weather and debris. For six-figure vehicles, hardside is
          the default.
        </p>
        <p style={prose}>
          Capacity also splits the market. Single-vehicle enclosed transport (one
          car per trailer) is the top tier — used for museum-grade classics,
          record-setting auction purchases, and any vehicle where contact with
          another car during loading is unacceptable. Multi-car enclosed (4–6
          vehicles per trailer) is the more common option for luxury daily drivers,
          new-to-you exotics, and dealer-to-collector deliveries. Multi-car enclosed
          uses internal dividers and dedicated tie-down points to keep vehicles
          isolated during transit.
        </p>
      </Section>

      <Section title="When to Choose Enclosed Transport">
        <p style={prose}>
          Most shipments should go open. But certain vehicles and certain situations
          make enclosed the clear choice. Here is how to think through it:
        </p>
        <h3 style={subhead}>Luxury vehicles over $50,000</h3>
        <p style={muted}>
          The rough industry threshold. Above $50K — Mercedes S-Class, BMW M-series,
          Porsche 911, high-trim Audis, Lexus LC, Range Rover — enclosed starts to
          make sense. The premium over open is small relative to the protection
          value, and resale condition matters more at this price point.
        </p>
        <h3 style={subhead}>Classics, vintage, and collector cars</h3>
        <p style={muted}>
          Pre-1990 collector vehicles almost universally ship enclosed. Original
          paint, period interiors, and irreplaceable trim are vulnerable to road
          exposure in ways newer vehicles are not. A 1967 Corvette, a 1970 Porsche
          911, a 1985 Ferrari Testarossa — these are enclosed shipments, always.
        </p>
        <h3 style={subhead}>Exotic and performance cars</h3>
        <p style={muted}>
          Ferrari, Lamborghini, McLaren, Porsche GT variants, Aston Martin,
          Bugatti — the pure-exotic segment. Low ride height alone often disqualifies
          open trailers (the ramp angle is too steep). Combined with paint value,
          resale sensitivity, and the visibility concerns of parking a million-dollar
          car at a truck stop, enclosed is non-negotiable.
        </p>
        <h3 style={subhead}>Show cars and new-delivery vehicles</h3>
        <p style={muted}>
          Any vehicle going to a concours event, a trade show, or a customer as a
          brand-new delivery ships enclosed. The first impression matters, and
          arriving with road-dust and bug-splatter defeats the purpose.
        </p>
        <h3 style={subhead}>Low-clearance vehicles</h3>
        <p style={muted}>
          Any car with ground clearance under roughly 5 inches — many modern
          supercars, track-prepped vehicles, air-suspension cars stuck in low mode,
          vehicles with oversized front splitters — needs liftgate enclosed
          transport to avoid ramp contact. This is an equipment decision, not just
          a value decision.
        </p>
      </Section>

      <Section title="Cost Comparison: Open vs Enclosed">
        <p style={prose}>
          The rule of thumb: enclosed costs 40–60% more than open on the same lane.
          Open rates run $0.40–$0.70 per mile; enclosed rates run $0.70–$1.20 per
          mile; single-vehicle top-tier enclosed can hit $1.50+ per mile on longer
          lanes. Here is a realistic comparison:
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Route Length</th>
                <th style={th}>Open</th>
                <th style={th}>Enclosed Multi-Car</th>
                <th style={th}>Single-Vehicle Top-Tier</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={td}>Under 500 mi</td><td style={td}>$400&ndash;$700</td><td style={td}>$650&ndash;$1,100</td><td style={td}>$900&ndash;$1,500</td></tr>
              <tr><td style={td}>500&ndash;1,000 mi</td><td style={td}>$500&ndash;$900</td><td style={td}>$800&ndash;$1,400</td><td style={td}>$1,200&ndash;$2,000</td></tr>
              <tr><td style={td}>1,000&ndash;1,500 mi</td><td style={td}>$700&ndash;$1,100</td><td style={td}>$1,100&ndash;$1,700</td><td style={td}>$1,700&ndash;$2,600</td></tr>
              <tr><td style={td}>1,500&ndash;2,500 mi</td><td style={td}>$900&ndash;$1,400</td><td style={td}>$1,400&ndash;$2,200</td><td style={td}>$2,200&ndash;$3,400</td></tr>
              <tr><td style={td}>Coast-to-coast (2,800+ mi)</td><td style={td}>$1,100&ndash;$1,500</td><td style={td}>$1,800&ndash;$2,500</td><td style={td}>$2,800&ndash;$4,500</td></tr>
            </tbody>
          </table>
        </div>
        <p style={muted}>
          A practical example: shipping a 1967 Corvette from Boston to Los Angeles,
          roughly 3,000 miles. Open transport is not an appropriate option for a
          vehicle of that vintage and value. Multi-car enclosed quotes typically
          land around $2,200 with 10–14 days transit. Single-vehicle top-tier
          enclosed with climate control and soft-tie straps runs closer to $3,500
          with similar transit. The $1,300 difference buys dedicated routing, no
          shared-trailer contact, and climate regulation — often worth it for a
          vehicle of that era.
        </p>
      </Section>

      <Section title="Types of Enclosed Trailers">
        <p style={prose}>
          Four equipment decisions affect enclosed transport pricing and suitability:
        </p>
        <h3 style={subhead}>Hardside vs softside</h3>
        <p style={muted}>
          Hardside enclosed trailers have full metal walls and a solid roof —
          complete weather seal, total privacy, and the highest debris protection.
          Softside trailers have a rigid frame with heavy-duty canvas or
          coated-fabric panels; slightly lighter and sometimes marginally cheaper,
          but less protective in sustained bad weather. For exotics, classics, and
          show cars, hardside is the default. For luxury daily drivers, softside is
          often acceptable and saves a small amount.
        </p>
        <h3 style={subhead}>Single-vehicle vs multi-car enclosed</h3>
        <p style={muted}>
          Single-vehicle enclosed is the top tier — one car, one trailer, dedicated
          routing. Multi-car enclosed (4–6 vehicles) is more common and more
          affordable; vehicles are separated by internal dividers and secured to
          dedicated tie-down points. For any vehicle where another car's door
          ding-equivalent at pickup is unacceptable, pay for single-vehicle.
        </p>
        <h3 style={subhead}>Liftgate vs ramp loading</h3>
        <p style={muted}>
          Ramp loading is the standard — a simple angled ramp off the back of the
          trailer. Works for any vehicle with roughly 5+ inches of ground clearance.
          Liftgate loading uses a hydraulic platform that lowers flat to the ground
          and raises the vehicle onto the trailer. Required for low-clearance
          supercars, air-suspension vehicles, or anything with an aggressive front
          splitter. Liftgate equipment typically adds $100–$300 to the quote.
        </p>
        <h3 style={subhead}>Climate-controlled enclosed</h3>
        <p style={muted}>
          A subset of single-vehicle specialty carriers offer climate-controlled
          trailers — regulated temperature and humidity during transit. Matters
          most for pre-1980 classics with period interiors, fresh paint jobs still
          curing, and long-duration moves where extreme temperature swings could
          affect the vehicle. Adds 15–25% on top of the single-vehicle enclosed
          rate.
        </p>
      </Section>

      <Section title="Insurance and Handling Standards">
        <p style={prose}>
          Enclosed carriers handle higher-value loads than open carriers, and their
          insurance coverage and handling protocols reflect that. The differences
          matter when you are comparing quotes:
        </p>
        <h3 style={subhead}>Insurance coverage</h3>
        <p style={muted}>
          Open auto carriers typically carry $100,000–$250,000 in cargo insurance.
          Enclosed specialty carriers commonly carry $250,000–$500,000 because
          their cargo is routinely six-figure vehicles and their underwriters
          require it. (The $750,000+ figure sometimes cited is FMCSA-mandated
          liability insurance for bodily injury and property damage — a separate
          policy from cargo coverage.) For declared values above $250,000 we
          confirm the specific cargo policy limit before dispatch; for concours
          or auction-record vehicles we can arrange supplemental coverage on top
          of the carrier's policy.
        </p>
        <h3 style={subhead}>Soft-tie straps, never chains</h3>
        <p style={muted}>
          Every enclosed shipment in our network uses soft-tie wheel-net straps
          that loop through the wheels and tension to anchor points on the
          trailer. The straps never touch the body, frame, or drivetrain. Chains
          directly on axles — a hallmark of older, lower-standard equipment —
          are not used on any shipment we dispatch.
        </p>
        <h3 style={subhead}>Loading and unloading protocol</h3>
        <p style={muted}>
          Enclosed carrier drivers are typically more experienced than open-carrier
          drivers — specialty transport pays better and attracts career operators.
          Expect a careful walk-around at pickup, detailed BOL documentation of
          pre-existing condition (including tire-wall scuffs, wheel curb rash, and
          paint chips smaller than a dime), and a matching walk-around at delivery.
          Take your own photos at both ends regardless — it is the single best
          habit for protecting yourself on any shipment.
        </p>
        <h3 style={subhead}>Climate considerations for classics</h3>
        <p style={muted}>
          For pre-1980 vehicles with original interiors, a climate-controlled
          enclosed trailer protects against leather drying, vinyl cracking, and
          wood-trim movement during long-duration cross-country moves through
          temperature extremes. For post-1990 luxury and exotic vehicles, standard
          enclosed is typically sufficient — modern materials handle temperature
          swings well.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
