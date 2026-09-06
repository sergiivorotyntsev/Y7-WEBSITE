import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from './SeoLandingPage';
import { colors, fonts } from '../../theme';
import v2t from '../../styles/v2/type.module.css';
import ctaStyles from '../../components/ContextualCTA.module.css';

const p = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

function DealerProgramCTA() {
  return (
    <aside className={`${ctaStyles.card} ${ctaStyles.tone_teal}`}>
      <div className={ctaStyles.cardBody}>
        <h2 className={ctaStyles.cardTitle}>Need Ongoing Dealer Dispatch?</h2>
        <p className={ctaStyles.cardText}>
          For recurring lanes and an account-based workflow, the Y7 dealer program explains
          the ongoing operating model.
        </p>
      </div>
      <Link to="/dealers" className={ctaStyles.cardCta}>
        Explore Y7&apos;s outsourced dealer dispatch program <span aria-hidden="true">&rarr;</span>
      </Link>
    </aside>
  );
}

export default function DealerAutoTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Dealer Auto Transport for Car Dealerships | Y7 Logistics',
        description:
          'Dealer auto transport nationwide: auction pickup, dealer trades, customer delivery, multi-vehicle and recurring lanes. Fixed Y7 fee; carrier rate separate.',
        path: '/dealer-auto-transport',
      }}
      secondaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      heading="Dealer Auto Transport — Vehicle Shipping for Dealerships"
      intro="Y7 Logistics is the transport partner for dealerships that need reliable, cost-effective vehicle shipping. From auction pickups to dealer trades to customer deliveries — we handle the logistics so you can focus on selling cars. Our nationwide dealer auto transport service also coordinates multi-vehicle moves and recurring lanes; the motor carrier performs the physical transport."
      tldr={{
        kicker: 'Dealer transport, in brief',
        ariaLabel: 'Y7 dealer auto transport, in brief',
        text: "Y7 Logistics provides nationwide auto transport for dealerships, including auction pickup, dealer trades, customer delivery, multi-vehicle moves, and recurring lanes. As a Licensed & Bonded FMCSA Broker, Y7 coordinates vetted carriers, release documents, gate passes, milestone updates, and delivery records. The carrier performs the transport, and its variable rate is separate from Y7's fixed $50 fee, or $60 when Y7 handles carrier payment.",
      }}
      serviceExtras={{
        serviceType: 'Dealer Auto Transport for Car Dealerships',
        audience: {
          schemaType: 'BusinessAudience',
          audienceType: 'Business',
          name: 'Auto Dealerships',
        },
        offers: [
          {
            name: 'Auction-to-Dealership Dispatch Coordination',
            desc: 'Auction pickup, release-document coordination, and carrier delivery to the dealership. Carrier rate is separate.',
            priceRange: 'Y7 dispatch fee: $50 per vehicle; $60 when Y7 handles carrier payment',
          },
          {
            name: 'Dealer Trade and Customer Delivery Dispatch',
            desc: 'Carrier coordination for dealer-to-dealer inventory moves and delivery of sold vehicles. Carrier rate is separate.',
            priceRange: 'Y7 dispatch fee: $50 per vehicle; $60 when Y7 handles carrier payment',
          },
          {
            name: 'Multi-Vehicle and Recurring Lane Dispatch',
            desc: 'Carrier coordination for multi-vehicle moves and repeat dealership lanes nationwide. Carrier rate is separate.',
            priceRange: 'Y7 dispatch fee: $50 per vehicle; $60 when Y7 handles carrier payment',
          },
        ],
      }}
      whenNeeded={[
        'Stocking inventory from auctions (Copart, IAAI, Manheim)',
        'Dealer-to-dealer trades',
        'Customer vehicle deliveries',
        'Fleet acquisitions',
        'Port delivery for export inventory',
        'Relocating vehicles between lots',
        'Recurring dealership lanes',
      ]}
      steps={[
        { title: 'Set up your dealer account with Y7', desc: 'Provide your dealer license, saved pickup locations, and preferred carrier-payment arrangement.' },
        { title: 'Submit transport requests (single or bulk)', desc: 'Send one vehicle or an entire list. We handle both the same way.' },
        { title: 'Y7 coordinates a vetted carrier', desc: 'Your account manager coordinates verified carriers for each shipment.' },
        { title: 'Release details confirmed before pickup', desc: 'Y7 checks that the assigned carrier has the gate pass, buyer letter, or release reference the origin requires.' },
        { title: 'Carrier delivers with documentation', desc: 'The carrier delivers to the dealership or customer, with condition and delivery records retained for the load.' },
      ]}
      requirements={[
        'Dealer license',
        'Pickup and delivery locations',
        'Vehicle details per unit',
        'Preferred timing',
        'Any special handling requirements',
      ]}
      capabilities={[
        'Fixed per-vehicle Y7 dispatch fee',
        'Dedicated account manager',
        'Auction pickup coordination (Copart, IAAI, Manheim)',
        'Dealer-to-dealer trades and customer delivery',
        'Multi-vehicle and recurring lane coordination',
        'Carrier authority and insurance verification',
        'Enclosed transport for high-value inventory',
        'Milestone status and document archive',
      ]}
      faqs={[
        {
          q: 'Do you offer dealer pricing?',
          a: 'Yes. Y7 charges a fixed $50 dispatch fee per vehicle when your dealership pays the carrier directly at delivery (COD), or $60 per vehicle when Y7 handles carrier payment. The carrier rate is separate and varies by lane, season, and equipment.',
        },
        {
          q: 'Can you pick up from multiple auctions?',
          a: 'Yes, we coordinate pickups from Copart, IAAI, Manheim, and independent auctions. One account, all platforms covered.',
        },
        {
          q: 'Do you handle dealer trades?',
          a: 'Yes, dealer-to-dealer swaps with coordinated timing at both ends. We make sure the logistics match your trade agreements.',
        },
        {
          q: 'Is there a minimum number of vehicles?',
          a: 'No minimum — single vehicle or full truckload, same dedicated service. We scale with your needs.',
        },
        {
          q: 'Can you deliver vehicles directly to our customers?',
          a: 'Yes, we offer door-to-door delivery on behalf of your dealership. Your customer gets a professional delivery experience.',
        },
        {
          q: "Is the carrier rate included in Y7's dealer fee?",
          a: "No. The carrier rate pays the motor carrier for the physical transport and is separate from Y7's dispatch fee. Carrier rates vary by lane, season, vehicle condition, timing, and equipment.",
        },
        {
          q: 'Can you coordinate recurring dealer lanes?',
          a: 'Yes. Dealerships can submit repeat auction-to-lot, dealer-trade, inventory-transfer, and customer-delivery lanes through the same account. Each carrier rate is confirmed for the specific move.',
        },
        {
          q: 'What documents are needed for auction pickup?',
          a: 'Send the VIN, lot and buyer numbers, paid or release status, pickup reference, and any gate pass, buyer letter, or release authorization required by the auction. Y7 confirms the assigned carrier has the available release details before pickup.',
        },
      ]}
      ctaLabel="Get Dealer Pricing"
      ctaTo="/dealer-quote"
      related={[
        { label: 'For Dealers', to: '/dealers' },
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Manheim Transport', to: '/manheim-transport' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Port Delivery', to: '/door-to-port-auto-transport' },
        { label: 'Auction Pickup Playbook', to: '/blog/dealer-auction-pickup-guide' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <DealerProgramCTA />

      <Section title="Auction-to-Dealership Pickup">
        <p style={p}>
          When a dealership buys inventory at auction, Y7 coordinates the US carrier move from
          the auction yard to the dealership or another destination the dealer names. Send the
          VIN, lot and buyer numbers, vehicle condition, release status, pickup location, and
          delivery address so the load can be quoted and dispatched with the right requirements.
        </p>
        <p style={p}>
          The <Link to="/auction-car-shipping" className={v2t.bodyLinkOnPaper}>auction car shipping process</Link>{' '}
          depends on the platform&apos;s release rules. For platform-specific steps, see our guides
          to <Link to="/copart-shipping" className={v2t.bodyLinkOnPaper}>Copart vehicle pickup</Link>,{' '}
          <Link to="/iaai-transport" className={v2t.bodyLinkOnPaper}>IAA auction transport</Link>, and{' '}
          <Link to="/manheim-transport" className={v2t.bodyLinkOnPaper}>Manheim dealer transport</Link>.
        </p>
      </Section>

      <Section title="Dealer Trades, Repositioning, and Customer Delivery">
        <p style={p}>
          <strong style={{ color: colors.text }}>Aged inventory repositioning.</strong> Every dealer has units that sit too long — 60, 90, 120 days on the lot with no serious buyer interest. At that point, you have a decision: send it to auction, wholesale it, or move it to another lot where the market is better. We handle the transport for all three scenarios. A sedan that is not moving in suburban Connecticut might sell in two weeks at your partner lot in Virginia. The transport cost is a fraction of the continued depreciation and floorplan interest you are paying to keep it parked.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Out-of-state customer delivery.</strong> Internet leads are a growing share of dealership sales. A customer 500 miles away sees your listing, negotiates over the phone, and wants the car delivered. You could ask them to fly in and drive it home, but that reduces your close rate. Professional door-to-door delivery closes the deal. We pick up from your lot and deliver to the customer's driveway — they sign the delivery receipt, and you have a happy customer who will leave a review, not one who is exhausted from a 10-hour drive.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Dealer trade coordination.</strong> You have a customer who wants a specific trim and color that another dealer 300 miles away has on their lot. Dealer trade. The challenge is getting the vehicle to your lot fast enough to close the deal before the customer walks. We coordinate pickup and delivery requirements at both dealerships.
        </p>
      </Section>

      <Section title="Multi-Vehicle Moves">
        <p style={p}>
          The most common scenario: you buy 3-5 vehicles at Tuesday's Manheim or Copart sale, scattered across 2-3 different auction locations, and you need all of them on your lot by the end of the week. One order, one point of contact, with each load visible through our portal.
        </p>
        <p style={p}>
          Here is how it works operationally. You send us the list — VINs, lot numbers, auction locations. Your dedicated dispatcher maps out the most efficient routing. If two vehicles are at the same auction or nearby locations, we consolidate them on one carrier to reduce cost. If they are in different regions, we dispatch multiple carriers but coordinate delivery windows so everything arrives within your target timeframe. You get a single status update thread — not five separate conversations with five different brokers.
        </p>
      </Section>

      <Section title="Recurring Dealer Lanes">
        <p style={p}>
          For dealers who consistently buy at the same auctions, we build route familiarity with our carrier network. The same carriers who run Manheim Pennsylvania to your lot in Connecticut every week know the route, know the yard staff, and know your delivery preferences. That consistency reduces pickup delays and damage incidents.
        </p>
        <p style={p}>
          What "dedicated dispatcher" actually means: the same person handles your account every time. They know which auctions you buy from, what your lot hours are, whether your yard has a forklift, and whether your receiving manager needs a 30-minute heads-up before delivery. You do not explain your preferences on every call. This saves time on both sides and reduces errors.
        </p>
        <p style={p}>
          A recurring lane keeps the pickup requirements, delivery hours, and dealer contacts
          consistent, but it does not freeze the carrier rate. Y7 confirms the carrier rate for
          each move because lane demand, season, vehicle condition, timing, and equipment can change.
        </p>
      </Section>

      <Section title="Fixed Y7 Fee, Variable Carrier Rate">
        <p style={p}>
          Y7&apos;s dealer dispatch fee is <strong style={{ color: colors.text }}>$50 per vehicle</strong>{' '}
          when your dealership pays the carrier directly at delivery (COD). It is{' '}
          <strong style={{ color: colors.text }}>$60 per vehicle</strong> when Y7 handles carrier
          payment. The carrier&apos;s transport rate is a separate charge under either arrangement.
        </p>
        <p style={p}>
          The fixed Y7 fee does not change with monthly volume, route, season, equipment, or the
          carrier price. The carrier rate can change with the lane, season, vehicle condition,
          timing, and equipment required. We state the carrier rate separately so your team can
          see which amount pays for physical transport and which amount pays Y7 for dispatch.
        </p>
        <p style={p}>
          Choose COD when your dealership wants to pay the carrier at delivery. Choose carrier
          payment through Y7 when you want Y7 to execute that payment. Neither option bundles
          the carrier rate into the Y7 fee, and Y7 does not add a hidden spread to the carrier rate.
        </p>
      </Section>

      <Section title="Documentation and Gate Passes">
        <p style={p}>
          Auction pickup starts with the release details for the specific vehicle and yard. The
          dealer supplies the available authorization, and Y7 coordinates the VIN, lot and buyer
          numbers, pickup reference, gate pass, buyer letter, or release authorization required
          for the assigned carrier to enter the origin and collect the vehicle.
        </p>
        <p style={p}>
          Y7 confirms the assigned carrier has the available release details before pickup. The
          carrier records vehicle condition on the Bill of Lading at pickup and delivery, while Y7
          keeps the dispatch and delivery records available for the dealership&apos;s load history.
        </p>
      </Section>

      <Section title="Carrier Vetting for Dealer Inventory">
        <p style={p}>
          Y7 Logistics operates under MC #1741537 and USDOT #4427359. We are a licensed and bonded freight broker — not a carrier pretending to be a broker, and not an unlicensed middleman.
        </p>
        <p style={p}>
          Every carrier we dispatch is verified before they touch your inventory. We check active MC authority, required insurance coverage (cargo typically $100,000–$250,000 for open and $250,000–$500,000 for enclosed, plus $750,000+ FMCSA liability), FMCSA safety rating, and inspection history. Carriers with conditional or unsatisfactory ratings, insurance lapses, or recent out-of-service violations are excluded from our network. This is not a checkbox exercise — it is how we protect your $30,000-$80,000 vehicles in transit.
        </p>
        <p style={p}>
          For dealerships, this compliance layer matters because you are liable for your customers' experience. If a carrier damages a vehicle en route to your customer, it is your dealership's reputation on the line. Our carrier vetting process means the transport leg of your operation meets the same standard as everything else on your lot.
        </p>
      </Section>

      <Section title="Dealer Portal and Milestone Updates">
        <p style={p}>
          Dealer accounts get access to our portal with shipment status updates for every active shipment. You can see current status (dispatched, picked up, in transit, delivered) and estimated arrival time for each vehicle through the portal.
        </p>
        <p style={p}>
          Automated status updates go out via email at every milestone: carrier assigned, vehicle picked up, in transit, out for delivery, delivered. Your sales team can forward these directly to customers waiting for deliveries. ETA notifications go out 24 hours and 2 hours before delivery so your lot staff can prepare for receiving.
        </p>
        <p style={p}>
          For high-volume dealers, we provide weekly and monthly reporting: total units shipped, average transit times by route, cost per unit, and on-time delivery percentage. This data helps you plan inventory purchasing around realistic delivery timelines instead of guessing.
        </p>
      </Section>

      <Section title="Common Dealer Scenarios">
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '16px',
        }}>
          <p style={{ ...p, marginBottom: '0' }}>
            <strong style={{ color: colors.text }}>Auction day restocking.</strong> You buy 4 vehicles at Manheim Pennsylvania and 2 at Copart Somerville NJ on Tuesday. Your lot is in Hartford, CT. We dispatch two carriers — one to Manheim PA, one to Copart NJ. Both carriers are loaded by Wednesday afternoon. The Manheim PA units arrive at your lot Thursday morning, the Copart NJ units Thursday afternoon. All 6 vehicles on your lot and ready for reconditioning by Friday, three days after the auction.
          </p>
        </div>
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '16px',
        }}>
          <p style={{ ...p, marginBottom: '0' }}>
            <strong style={{ color: colors.text }}>Out-of-state customer delivery.</strong> A customer in Tampa, FL purchases a certified pre-owned Lexus from your lot in Framingham, MA. They want delivery, not a flight. We pick up from your lot on Monday, and the vehicle is on the customer's driveway in Tampa by Thursday. Professional delivery with a full condition report at both ends. The customer signs, your deal is closed, and you have documentation of the vehicle's condition at delivery.
          </p>
        </div>
      </Section>
    </SeoLandingPage>
  );
}
