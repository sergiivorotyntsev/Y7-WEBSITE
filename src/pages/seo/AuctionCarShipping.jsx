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

export default function AuctionCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Auction Car Shipping',
        description:
          'Ship vehicles from Copart, IAAI, Manheim, and other US auto auctions. Gate pass coordination, storage fee prevention. Licensed broker Y7 Logistics.',
        path: '/auction-car-shipping',
      }}
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      secondaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      heading="Auction Car Shipping — Pickup from Any US Auction"
      intro="Won a vehicle at auction? Y7 Logistics coordinates pickup from all major US auto auctions — Copart, IAAI, Manheim, and independent auctions. We handle gate passes, timing, and transport to prevent costly storage fees."
      whenNeeded={[
        'Won a vehicle at Copart',
        'Purchased from IAAI',
        'Bought at Manheim dealer auction',
        'Independent auction purchase',
        'Need fast pickup to avoid storage fees',
        'Buying salvage vehicles for rebuild',
      ]}
      steps={[
        { title: 'Share Auction Details', desc: 'Provide your lot number, buyer number, and auction location.' },
        { title: 'Gate Pass & Pickup Coordination', desc: 'We coordinate the gate pass and schedule pickup within your storage-free window.' },
        { title: 'Carrier Assigned', desc: 'A carrier experienced with auction pickups is dispatched to your auction yard.' },
        { title: 'Vehicle Picked Up', desc: 'Carrier arrives at the auction yard and loads your vehicle.' },
        { title: 'Delivered to Your Door or Port', desc: 'Vehicle delivered to your home, shop, or port for export.' },
      ]}
      requirements={[
        'Lot number and buyer number',
        'Gate pass (or we coordinate with the auction)',
        'Payment confirmation from the auction',
        'Pickup authorization',
        'Delivery address',
      ]}
      capabilities={[
        'All major auction yards nationwide',
        'Gate pass coordination',
        'Non-running and salvage vehicle transport',
        'Fast pickup to minimize storage fees',
        'Open and enclosed transport options',
        'Port delivery for export shipments',
      ]}
      faqs={[
        {
          q: 'How quickly can you pick up from an auction?',
          a: 'Typically 2–5 business days from the time the gate pass is ready. Expedited pickup is available if you need faster service to avoid storage charges.',
        },
        {
          q: 'Do I need a gate pass?',
          a: 'Yes, most auctions require a gate pass before any vehicle can leave the yard. If you\u2019re unsure how to obtain one, we can guide you through the process for your specific auction.',
        },
        {
          q: 'Can you ship non-running auction vehicles?',
          a: 'Yes. We work with carriers equipped to handle inoperable vehicles using winch or forklift loading. Non-running vehicles are one of the most common auction shipments we handle.',
        },
        {
          q: 'What if my vehicle has a salvage title?',
          a: 'No problem at all. We transport vehicles with all title types — clean, salvage, rebuilt, and parts-only. Title status does not affect our ability to ship.',
        },
        {
          q: 'Do you ship from auctions to ports for export?',
          a: 'Yes, auction-to-port is one of our most popular services. We deliver to all major US ports for international export.',
        },
      ]}
      ctaLabel="Get an Auction Shipping Quote"
      ctaTo="/quote"
      related={[
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Manheim Transport', to: '/manheim-transport' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Salvage Car Shipping', to: '/salvage-car-shipping' },
        { label: 'Port Delivery', to: '/door-to-port-auto-transport' },
        { label: 'Dealer Auto Transport', to: '/dealer-auto-transport' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <Section title="US Auto Auctions: What You Need to Know">
        <p style={p}>
          Not all auctions work the same way, and the differences matter when you are planning transport. Each platform has its own rules for gate passes, payment clearance timelines, and yard access hours. Here is what we see every day across the three major platforms.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}><Link to="/copart-shipping" style={{ color: colors.accent, textDecoration: 'none' }}>Copart</Link></strong> is open to the public through their membership tiers (Basic, Premier, Dealer). Inventory is a mix of clean-title vehicles, salvage, and insurance total-loss. All bidding happens online. After you win, payment must clear before the yard issues a gate pass — typically 2-3 business days for non-dealer buyers. Copart charges storage fees starting on the third business day after payment clears, so the clock starts ticking fast. Yards are spread across nearly every state, but some locations (like Copart Dallas or Copart Los Angeles) process hundreds of vehicles per day and have stricter scheduling windows for carrier access.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}><Link to="/iaai-transport" style={{ color: colors.accent, textDecoration: 'none' }}>IAAI (Insurance Auto Auctions)</Link></strong> operates similarly to Copart — open to the public with membership, mostly insurance salvage and total-loss vehicles, online bidding. The key operational difference is in their gate pass process, which can vary by branch. Some IAAI locations are slower to process gate passes than Copart, and their storage fee windows can be tighter. We track these differences by location so we can schedule carriers accordingly.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}><Link to="/manheim-transport" style={{ color: colors.accent, textDecoration: 'none' }}>Manheim</Link></strong> is a different animal entirely. It is a dealer-only wholesale auction — you need an active dealer license to buy. Inventory tends to be cleaner (off-lease returns, dealer trade-ins, fleet vehicles), and the buying process involves both in-lane and online (Manheim Express, OVE) bidding. Payment and title processing at Manheim is generally faster because they are dealing with licensed businesses, but their yards also enforce strict pickup windows. Miss it, and your vehicle gets moved to overflow storage with daily fees.
        </p>
      </Section>

      <Section title="Auction-to-Home: How the Process Works">
        <p style={p}>
          The typical auction-to-home flow looks like this: you win the vehicle, complete payment through the auction platform, and the auction issues a gate pass once funds clear. At that point, you provide us with the lot number, buyer number, and auction location. We dispatch a carrier to the yard — usually within 1-3 business days of the gate pass being ready. The carrier loads your vehicle (winch load if it is non-running), and delivers it to your door. Total timeline from auction win to delivery is typically 3-10 days depending on distance and carrier availability.
        </p>
        <p style={p}>
          The critical variable is the gap between payment clearance and carrier pickup. Every day your vehicle sits in the yard after the free storage window costs you money — $25-75 per day depending on the auction and location. Our job is to close that gap.
        </p>
      </Section>

      <Section title="Auction-to-Port: Export Shipments">
        <p style={p}>
          For exporters, the flow adds one more leg: after the carrier picks up from the auction yard, delivery goes to a port warehouse or consolidation facility instead of a residential address. The carrier delivers to the specific warehouse your freight forwarder designates, and you receive delivery confirmation for your export documentation.
        </p>
        <p style={p}>
          This is where consolidation logistics get interesting. If you are buying multiple vehicles from different auctions in different states, we coordinate all pickups to arrive at the same port within a tight delivery window. The goal is to have all units at the warehouse in time for your container loading or RoRo booking.
        </p>
      </Section>

      <Section title="What Can Go Wrong — and How We Handle It">
        <p style={p}>
          <strong style={{ color: colors.text }}>Title delays.</strong> Some auctions take longer to process titles than expected, especially for out-of-state title transfers or lien releases. We monitor payment and title status so we can schedule the carrier pickup for the right day — not too early (wasted trip) and not too late (storage fees). If a title delay pushes things back, we adjust the carrier schedule and keep you informed.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Storage fees.</strong> The number one complaint we hear from auction buyers who tried to arrange their own shipping. They did not realize how tight the free storage window was, could not find a carrier fast enough, and ended up paying $200-400 in storage before the vehicle even left the lot. We prioritize auction pickups specifically to avoid this — our dispatcher tracks payment clearance dates and lines up carriers before the gate pass is even issued.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Inoperable vehicles.</strong> You bid on what looks like a running car in the auction photos, and it turns out the engine does not start. This is common with salvage vehicles. Our carriers come prepared with winch equipment, but if a vehicle is listed as operable and turns out not to be, there can be an additional fee (typically $50-150) for the winch load. We always confirm operability status with you upfront so there are no surprises.
        </p>
        <p style={p}>
          <strong style={{ color: colors.text }}>Wrong yard location.</strong> Auctions sometimes transfer vehicles between yards after the sale, especially if the original lot is full. A vehicle listed at "Copart Houston" might actually be at the Copart Houston South facility 30 miles away. We verify the exact yard location with the auction before dispatching the carrier. This prevents wasted trips and delays.
        </p>
      </Section>

      <Section title="Real Scenarios">
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '16px',
        }}>
          <p style={{ ...p, marginBottom: '0' }}>
            <strong style={{ color: colors.text }}>Auction to door.</strong> A buyer in New Jersey wins a clean-title BMW 3 Series at Copart Dallas. Payment clears on Monday, gate pass issued Tuesday morning. We dispatch a carrier Tuesday afternoon — the driver is at the Copart Dallas yard by Wednesday. Vehicle loaded, in transit across I-81, and delivered to the buyer's driveway in northern NJ by Saturday. Five days from gate pass to delivery, zero storage fees.
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
            <strong style={{ color: colors.text }}>Multi-auction export consolidation.</strong> An exporter based in Dubai buys three salvage vehicles: a Toyota Camry at IAAI Houston, a Honda Accord at Copart Atlanta, and a Nissan Altima at Copart Orlando. Three different auctions, three different states. We coordinate all three pickups and route them to the same warehouse at Port Newark. All three vehicles arrive within the same week, ready for the exporter's container loading date. One point of contact, one invoice, three vehicles consolidated.
          </p>
        </div>
      </Section>

      <Section title="Storage Fee Prevention">
        <p style={p}>
          This is where most of our value comes in for auction buyers. Every major auction charges daily storage fees after a short free window — Copart gives about 3 business days after payment clears, IAAI is similar, and Manheim enforces even tighter deadlines for dealer buyers.
        </p>
        <p style={p}>
          Our process: when you book with us, we ask for your expected payment date. We begin matching carriers before payment even clears. By the time the gate pass is ready, we already have a carrier scheduled or en route. This is not something you can do by posting on a load board the day your gate pass comes through — by then, you are already behind.
        </p>
        <p style={p}>
          For repeat buyers who purchase multiple vehicles per month, we set up standing dispatch protocols. Your payment habits, preferred auctions, and delivery addresses are already in our system. Each new purchase gets slotted into the next available carrier run automatically.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
