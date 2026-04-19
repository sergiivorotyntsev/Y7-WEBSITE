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

export default function DealerAutoTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Dealer Auto Transport',
        description:
          'Auto transport for car dealerships. Volume pricing, auction pickup, dealer trades, dedicated dispatcher. Licensed broker Y7 Logistics.',
        path: '/dealer-auto-transport',
      }}
      primaryCTA={{ intlKey: 'dealers', to: '/dealers', tone: 'teal' }}
      secondaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      heading="Dealer Auto Transport — Vehicle Shipping for Dealerships"
      intro="Y7 Logistics is the transport partner for dealerships that need reliable, cost-effective vehicle shipping. From auction pickups to dealer trades to customer deliveries — we handle the logistics so you can focus on selling cars."
      whenNeeded={[
        'Stocking inventory from auctions (Copart, IAAI, Manheim)',
        'Dealer-to-dealer trades',
        'Customer vehicle deliveries',
        'Fleet acquisitions',
        'Port delivery for export inventory',
        'Relocating vehicles between lots',
      ]}
      steps={[
        { title: 'Set up your dealer account with Y7', desc: 'Quick onboarding with your dealer license — takes minutes, not days.' },
        { title: 'Submit transport requests (single or bulk)', desc: 'Send one vehicle or an entire list. We handle both the same way.' },
        { title: 'Dedicated dispatcher assigns carriers', desc: 'Your account manager coordinates verified carriers for each shipment.' },
        { title: 'Vehicles picked up on schedule', desc: 'Carriers arrive at auctions, lots, or other origins on the agreed timeline.' },
        { title: 'Delivered to your lot with documentation', desc: 'Vehicles arrive at your dealership with condition reports and delivery confirmation.' },
      ]}
      requirements={[
        'Dealer license',
        'Pickup and delivery locations',
        'Vehicle details per unit',
        'Preferred timing',
        'Any special handling requirements',
      ]}
      capabilities={[
        'Volume contract pricing',
        'Dedicated account manager',
        'Auction pickup coordination (all major platforms)',
        'Dealer-to-dealer trades',
        'Multi-car hauling discounts',
        'Priority dispatch',
        'Enclosed transport for high-value inventory',
        'Shipment status dashboard',
      ]}
      faqs={[
        {
          q: 'Do you offer dealer pricing?',
          a: 'Yes, dealerships get volume contract rates based on shipping frequency. The more consistently you ship, the better your rates.',
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
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <Section title="Dealer Workflows We Handle Every Day">
        <p style={p}>
          <strong style={{ color: colors.text }}>Aged inventory repositioning.</strong> Every dealer has units that sit too long — 60, 90, 120 days on the lot with no serious buyer interest. At that point, you have a decision: send it to auction, wholesale it, or move it to another lot where the market is better. We handle the transport for all three scenarios. A sedan that is not moving in suburban Connecticut might sell in two weeks at your partner lot in Virginia. The transport cost is a fraction of the continued depreciation and floorplan interest you are paying to keep it parked.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Out-of-state customer delivery.</strong> Internet leads are a growing share of dealership sales. A customer 500 miles away sees your listing, negotiates over the phone, and wants the car delivered. You could ask them to fly in and drive it home, but that reduces your close rate. Professional door-to-door delivery closes the deal. We pick up from your lot and deliver to the customer's driveway — they sign the delivery receipt, and you have a happy customer who will leave a review, not one who is exhausted from a 10-hour drive.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Dealer trade coordination.</strong> You have a customer who wants a specific trim and color that another dealer 300 miles away has on their lot. Dealer trade. The challenge is getting the vehicle to your lot fast enough to close the deal before the customer walks. We treat dealer trades as priority dispatches — same urgency as auction pickups with tight storage windows.
        </p>
      </Section>

      <Section title="Multi-Vehicle Moves">
        <p style={p}>
          The most common scenario: you buy 3-5 vehicles at Tuesday's Manheim or Copart sale, scattered across 2-3 different auction locations, and you need all of them on your lot by the end of the week. One order, one point of contact, all tracked through our portal.
        </p>
        <p style={p}>
          Here is how it works operationally. You send us the list — VINs, lot numbers, auction locations. Your dedicated dispatcher maps out the most efficient routing. If two vehicles are at the same auction or nearby locations, we consolidate them on one carrier to reduce cost. If they are in different regions, we dispatch multiple carriers but coordinate delivery windows so everything arrives within your target timeframe. You get a single status update thread — not five separate conversations with five different brokers.
        </p>
        <p style={p}>
          For dealers who consistently buy at the same auctions, we build route familiarity with our carrier network. The same carriers who run Manheim Pennsylvania to your lot in Connecticut every week know the route, know the yard staff, and know your delivery preferences. That consistency reduces pickup delays and damage incidents.
        </p>
      </Section>

      <Section title="Contract Pricing and Volume Tiers">
        <p style={p}>
          We structure dealer pricing in tiers based on monthly volume, because consistent volume lets us plan carrier capacity better — and we pass that efficiency back to you.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Tier 1 (5+ vehicles per month):</strong> You get preferred rates on all routes, priority dispatch (your loads get posted before retail customers), and a dedicated dispatcher who handles your account exclusively. This is the baseline for any dealership that ships regularly.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Tier 2 (15+ vehicles per month):</strong> Everything in Tier 1, plus additional rate discounts on high-frequency routes, consolidated invoicing (weekly or monthly instead of per-shipment), and the ability to lock in seasonal rates before peak periods. At this volume, we can also arrange standing carrier assignments on your most common lanes.
        </p>
        <p style={p}>
          What "dedicated dispatcher" actually means: the same person handles your account every time. They know which auctions you buy from, what your lot hours are, whether your yard has a forklift, and whether your receiving manager needs a 30-minute heads-up before delivery. You do not explain your preferences on every call. This saves time on both sides and reduces errors.
        </p>
      </Section>

      <Section title="Compliance and Carrier Verification">
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

      <Section title="Technology: Dealer Portal and Tracking">
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
