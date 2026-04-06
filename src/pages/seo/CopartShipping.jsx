import SeoLandingPage, { Section } from './SeoLandingPage';
import HreflangTags from '../../components/HreflangTags';
import { colors, fonts } from '../../theme';

const p = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

export default function CopartShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Copart Shipping — Vehicle Transport from Copart Auctions | Y7 Logistics',
        description:
          'Ship your Copart purchase nationwide. Gate pass coordination, salvage & clean title vehicles, inoperable transport. Licensed broker Y7 Logistics.',
        path: '/copart-shipping',
      }}
      heading="Copart Shipping — Vehicle Transport from Copart Auctions"
      intro="Copart is the largest online vehicle auction in the US. Y7 Logistics specializes in picking up vehicles from Copart locations nationwide — whether clean title, salvage, or non-running."
      whenNeeded={[
        'Won a vehicle on Copart.com',
        'Need transport from any Copart yard',
        'Buying salvage vehicles for rebuild or resale',
        'Purchasing clean title vehicles from Copart',
        'Dealer buying inventory from Copart',
        'Exporter shipping Copart purchase to port',
      ]}
      steps={[
        { title: 'Win & Complete Payment', desc: 'Win your Copart vehicle and complete payment through Copart.' },
        { title: 'Share Your Details', desc: 'Provide your lot number and buyer number to Y7 Logistics.' },
        { title: 'Gate Pass & Scheduling', desc: 'We coordinate the gate pass and schedule pickup within the free storage window.' },
        { title: 'Carrier Picks Up', desc: 'Carrier arrives at the Copart yard and loads your vehicle.' },
        { title: 'Vehicle Delivered', desc: 'Your vehicle is delivered to your address or port.' },
      ]}
      requirements={[
        'Copart lot number',
        'Buyer or member number',
        'Payment completed with Copart',
        'Gate pass (Copart issues after payment clears)',
        'Delivery destination',
      ]}
      capabilities={[
        'All 200+ Copart locations nationwide',
        'Salvage and clean title vehicles',
        'Non-running vehicles with winch loading',
        'Fast pickup within storage-free period',
        'Delivery to home, shop, or port',
        'Open and enclosed transport options',
      ]}
      faqs={[
        {
          q: 'How does Copart pickup work?',
          a: 'After you win and pay for your vehicle, Copart issues a gate pass. We then schedule a carrier to pick up your vehicle from the Copart yard within the free storage window so you avoid daily storage fees.',
        },
        {
          q: 'What\u2019s the Copart storage fee deadline?',
          a: 'Copart typically gives 3\u20135 free days after payment clears. After that, storage fees range from $25\u2013$75 per day depending on the location. We prioritize scheduling pickup within this window.',
        },
        {
          q: 'Can you pick up inoperable Copart vehicles?',
          a: 'Yes. Many Copart vehicles are non-running. Our carriers have winch and forklift equipment to safely load inoperable vehicles.',
        },
        {
          q: 'Do you ship from Copart to ports?',
          a: 'Yes, Copart-to-port transport is one of our most common services. We work with exporters regularly and deliver to all major US ports.',
        },
      ]}
      ctaLabel="Get a Copart Shipping Quote"
      ctaTo="/quote"
      related={[
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Salvage Shipping', to: '/salvage-car-shipping' },
        { label: 'Auction to Port', to: '/auction-to-port-shipping' },
        { label: 'Port Delivery', to: '/door-to-port-auto-transport' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <HreflangTags currentPath="/copart-shipping" hasPolishVersion hasUkrainianVersion hasRussianUSVersion />
      <Section title="The Copart Purchase-to-Pickup Process">
        <p style={p}>
          Winning a vehicle on Copart is only half the job. The real logistics start the moment the
          virtual gavel drops. Here is what actually happens between your winning bid and having the
          car on a carrier: you win the lot, Copart sends an invoice, you pay (wire, cashier's check,
          or Copart's CashierPay), the title desk processes your payment and generates a gate pass,
          and only then can a carrier physically enter the yard to load your vehicle.
        </p>
        <p style={p}>
          The critical detail most first-time buyers miss: Copart does not release vehicles until the
          gate pass is issued, and the gate pass does not appear until payment fully clears. Wire
          transfers typically clear same-day or next-day. CashierPay and cashier's checks can take
          two to three business days. That timeline matters because storage fees start ticking after
          the free period, which at most locations is three days from the date payment clears — not
          from the date you send payment.
        </p>
      </Section>

      <Section title="Storage Fees: The Hidden Cost Nobody Warns You About">
        <p style={p}>
          Copart charges daily storage once the free window expires. Rates depend on the specific
          yard, but expect $25 to $75 per day. High-volume locations like Copart Los Angeles,
          Copart Houston, and Copart Miami tend to sit at the higher end. Smaller yards in rural
          areas may charge closer to $25. Over a week of inaction, you could easily add $175 to
          $525 to the cost of a vehicle you bought to save money at auction.
        </p>
        <p style={p}>
          This is why timing your transport order matters. The best approach: submit your shipping
          request to us on the same day you make your Copart payment. We begin lining up a carrier
          immediately so that by the time your gate pass is issued, a truck is already assigned and
          headed toward the yard.
        </p>
      </Section>

      <Section title="Gate Pass: What It Is and Why Carriers Need It">
        <p style={p}>
          A Copart gate pass is the document that authorizes a carrier to enter the yard and remove
          your vehicle. Without it, the yard security will turn the driver away — no exceptions.
          Copart generates gate passes automatically once your payment clears and your account is
          in good standing. The pass includes the lot number, buyer information, and vehicle details.
        </p>
        <p style={p}>
          When you book with Y7 Logistics, we monitor your gate pass status and coordinate directly
          with the yard's release desk. If there is a delay — a hold on the title, an unresolved
          fee, or a system lag — we catch it before the carrier arrives, saving everyone a wasted trip.
        </p>
      </Section>

      <Section title="What Your Carrier Needs from You">
        <p style={p}>
          To pick up from any Copart location, the carrier needs four things: your buyer number
          (or member number), the lot number of the vehicle, a valid gate pass, and proof that
          payment has been received by Copart. When you place your order with us, we collect all
          of this upfront so the driver walks into the yard with everything in hand.
        </p>
      </Section>

      <Section title="Running vs. Non-Running: How It Affects Your Shipment">
        <p style={p}>
          Copart lists vehicles as "run and drive," "starts," or "non-running / stationary." This
          designation directly impacts your shipping cost and carrier selection. A running vehicle
          can be driven onto the trailer — straightforward. A non-running vehicle requires a winch
          or forklift load, which takes more time at the yard and limits which carriers can handle
          the job.
        </p>
        <p style={p}>
          Title status also plays a role. Clean title Copart vehicles are often purchased by
          end-buyers or dealers for resale, and carriers treat them with standard care. Salvage
          title vehicles — especially those with heavy collision damage — may have fluid leaks,
          missing wheels, or structural issues that require extra securing on the trailer. We ask
          about condition upfront because it determines which carrier gets the dispatch.
        </p>
      </Section>

      <Section title="Where Copart Yards Are: Top States by Volume">
        <p style={p}>
          Copart operates over 200 locations across the US. The states with the most yards — and
          the highest volume of vehicles moving through them — are California, Texas, Florida,
          Georgia, Illinois, Pennsylvania, New York, Ohio, Michigan, and North Carolina. If you
          are buying from a yard in any of these states, carrier availability is generally strong
          because trucks are already running those lanes regularly.
        </p>
        <p style={p}>
          More remote yards (think rural Montana or western Nebraska) can take a day or two longer
          for carrier assignment simply because fewer trucks pass through those corridors. We factor
          location into every quote so there are no surprises.
        </p>
      </Section>

      <Section title="Typical Timeline: Purchase to Delivery">
        <p style={p}>
          From the moment you win a Copart auction to the moment a carrier picks up, plan for three
          to seven business days. The breakdown: one to three days for payment to clear and gate
          pass to generate, then one to four days for carrier dispatch and arrival at the yard.
          Delivery time depends on distance — local deliveries within the same state can happen
          next-day after pickup, while coast-to-coast runs take five to eight days on the road.
        </p>
      </Section>

      <Section title="Copart to Port: For Export Buyers">
        <p style={p}>
          A large percentage of Copart vehicles are purchased by international buyers and exporters.
          The flow for export is: win at auction, complete payment, obtain gate pass, transport the
          vehicle to a port warehouse, then hand off to the freight forwarder for ocean shipping.
          Y7 Logistics handles the domestic leg — Copart yard to port — and we deliver to every
          major US export port including Houston, Savannah, Newark, Los Angeles, Jacksonville,
          Baltimore, and Miami.
        </p>
        <p style={p}>
          Exporters who buy multiple lots per week benefit from consolidated pickups. If you have
          three vehicles at Copart Houston and two at Copart Dallas, we can route a single carrier
          to grab all five and deliver them to the Port of Houston in one run. That cuts your
          per-vehicle transport cost significantly compared to booking each one separately.
        </p>
      </Section>

      <Section title="Real Scenario: Copart Dallas to Houston">
        <p style={p}>
          You win a 2019 Honda Civic with a salvage title at Copart Dallas on Monday for $6,800.
          You wire payment Monday afternoon. Payment clears Tuesday morning. Copart issues the gate
          pass Wednesday by noon. We dispatch a carrier Thursday who arrives at the Dallas yard
          Friday morning, loads the Civic with a winch (it is non-running — front-end collision),
          and hits the road. The vehicle is delivered to your home in Houston by Monday. Total
          transport cost: $350. Total storage fees: zero, because pickup happened within the free
          window.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
