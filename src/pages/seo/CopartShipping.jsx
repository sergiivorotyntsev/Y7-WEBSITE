import SeoLandingPage, { Section } from './SeoLandingPage';
import { tableWrap } from './_enrichedStyles';
import HreflangTags from '../../components/HreflangTags';
import { Link } from 'react-router-dom';
import { colors, fonts } from '../../theme';

const p = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

const table = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: fonts.sans,
  fontSize: '13px',
  margin: '12px 0 20px',
};

const th = {
  textAlign: 'left',
  padding: '10px 12px',
  borderBottom: `2px solid ${colors.border}`,
  background: colors.bgMuted,
  fontWeight: 700,
  color: colors.text,
};

const td = {
  padding: '10px 12px',
  borderBottom: `1px solid ${colors.border}`,
  color: colors.textMuted,
};

const linkStyle = { color: colors.accent, textDecoration: 'none', fontWeight: 600, borderBottom: `1px solid ${colors.accent}` };

const FAQS = [
  {
    q: 'How much does it cost to ship a car from Copart?',
    a: 'The carrier rate depends on distance, vehicle size and condition, required loading equipment, lane frequency, season, and destination type. Across the lanes shown on this page, observed running-vehicle rates range from $400-$650 for trips under 300 miles to $1,100-$1,700 for 1,500-2,500 miles; winch loading for a non-running vehicle typically adds $75-$150. Y7\'s dispatch fee is separate: dealers pay $50 per vehicle when they pay the carrier directly or $60 when Y7 handles carrier payment, exporters pay $50 with carrier-payment handling included, and individuals pay the greater of $75 or 10% of the carrier price. The carrier rate always stays separate from Y7\'s fee.',
  },
  {
    q: 'Can you guarantee pickup within the free storage window?',
    a: 'No. Pickup timing depends on carrier availability for the lane, yard access, release timing, vehicle condition, and required equipment. Y7 gives the buyer a realistic dispatch assessment before commitment and explains when pickup inside the complimentary window looks unlikely.',
  },
  {
    q: 'Can you ship a non-running vehicle from Copart?',
    a: 'Yes. Y7 assigns a carrier with the equipment required for the condition disclosed on the quote. Winch loading for a non-running vehicle typically adds $75-$150 to the carrier rate; missing wheels, locked steering, severe frame damage, or a vehicle that cannot roll can require a different carrier and a higher charge.',
  },
  {
    q: 'Do I need to be at the Copart yard for pickup?',
    a: 'No. Send Y7 the buyer or member number, lot number, gate-pass PIN, accurate vehicle condition, and delivery address. Y7 coordinates those release details with the assigned carrier, who completes the yard pickup.',
  },
  {
    q: 'Can Y7 deliver a Copart vehicle to a warehouse or port?',
    a: 'Yes. Y7 arranges the US inland leg from the Copart yard to the warehouse or port named by the buyer or freight forwarder. Exporters pay a $50 dispatch fee per vehicle with carrier-payment handling included, while the carrier rate remains separate.',
  },
  {
    q: 'How quickly can a carrier be assigned?',
    a: 'Assignment timing depends on the yard, lane frequency, vehicle condition, equipment, and destination. A common lane with a running vehicle generally has a larger carrier pool than a remote pickup or severely damaged lot. Y7 reports the current lane conditions instead of promising a fixed dispatch time.',
  },
  {
    q: 'Open or enclosed carrier for a Copart vehicle?',
    a: 'Most salvage vehicles move on open carriers. A clean-title collector or high-value vehicle may justify enclosed transport, which typically costs 40-60% more than open. Vehicle value, condition, weather exposure, and the buyer\'s risk tolerance determine the choice.',
  },
  {
    q: 'Does Y7 work with Copart dealer accounts?',
    a: 'Yes. Y7 coordinates single-lot and multi-vehicle pickups, including compatible lots at one yard or along one route. Dealers pay a $50 dispatch fee per vehicle when they pay the carrier directly, or $60 when Y7 handles carrier payment; the carrier rate remains separate. The portal stores buyer numbers, preferred yards, and delivery locations for repeat requests.',
  },
  {
    q: 'Can I track my Copart shipment?',
    a: 'Yes. The client portal and Telegram bot record shipment milestones such as carrier assigned, at yard, loaded, in transit, and delivered. These are written milestone updates, not live GPS tracking.',
  },
  {
    q: 'Should I use Copart\'s in-house Transporter App or a broker?',
    a: 'Copart\'s app can fit a straightforward lane and a running vehicle. A broker is useful when the buyer wants a pre-bid estimate, condition-specific equipment, a remote-yard pickup, delivery to a warehouse or port, or one dispatcher coordinating several lots. Y7 quotes the carrier market separately from its dispatch fee so the buyer can compare the transport decision directly.',
  },
];

export default function CopartShipping() {
  const serviceSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Auto Auction Transport',
    name: 'Copart Vehicle Transport and Delivery',
    description: 'Copart vehicle transport from 200+ US auction yards to a home, shop, warehouse, or port, including gate-pass coordination and non-running vehicle handling.',
    provider: { '@id': 'https://www.y7agency.com/#organization' },
    areaServed: { '@type': 'Country', name: 'United States' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Copart Shipping Options',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Running Vehicle Transport', description: 'Open carrier transport of drivable Copart vehicles' },
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD', minPrice: '400', maxPrice: '1700' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Non-Running Vehicle Transport', description: 'Winch and forklift loading for inoperable Copart vehicles' },
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD', minPrice: '550', maxPrice: '2000' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Auction-to-Port Export', description: 'Copart pickup and inland transport to your freight forwarder warehouse, prepared for ocean freight by international buyers' },
        },
      ],
    },
    audience: [
      { '@type': 'PeopleAudience', audienceType: 'Private Auction Buyer' },
      { '@type': 'BusinessAudience', audienceType: 'Dealer' },
      { '@type': 'BusinessAudience', audienceType: 'Exporter' },
      { '@type': 'BusinessAudience', audienceType: 'Rebuilder' },
    ],
  });

  // CONT-T07: hand-rolled FAQPage removed — SeoLandingPage already auto-generates
  // FAQPage from the faqs={FAQS} prop; emitting both produced a duplicate block.
  return (
    <SeoLandingPage
      meta={{
        title: 'Copart Car Transport & Delivery | Y7 Logistics',
        description: 'Copart car transport moves auction purchases from US yards to a home, shop, warehouse, or port with gate pass coordination and condition-aware dispatch.',
        path: '/copart-shipping',
      }}
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      secondaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      heading="Copart Vehicle Transport From Auction Yard to Delivery"
      intro="Y7 Logistics arranges Copart car transport from the auction yard to a home, shop, warehouse, or port. We coordinate carrier assignment and gate-pass details for clean-title, salvage, and non-running vehicles from 200+ US locations. The carrier rate and Y7 dispatch fee are quoted separately, so buyers know what each part of the move costs before pickup."
      tldr={{
        kicker: 'Copart shipping, in brief',
        ariaLabel: 'Copart shipping, in brief',
        text: 'Y7 Logistics is a Licensed & Bonded FMCSA Broker arranging Copart vehicle transport for individual buyers, dealers, rebuilders, and exporters. We coordinate carrier dispatch and gate-pass details from 200+ US yards, including clean-title, salvage, and non-running vehicles, for delivery to a home, shop, warehouse, or port. The carrier rate stays separate from Y7\'s disclosed dispatch fee.',
      }}
      whenNeeded={[
        'You bought a vehicle on Copart and need it moved from the yard.',
        'You want a transport estimate before placing the bid.',
        'Your salvage or non-running vehicle needs condition-specific equipment.',
        'Your dealership needs one or several Copart lots collected.',
        'Your exporter shipment needs delivery to a nominated warehouse or port.',
        'Your vehicle needs delivery to a home, shop, or business address.',
      ]}
      steps={[
        { title: 'Quote the Route', desc: 'Share the yard, destination, vehicle condition, and timing so Y7 can price the carrier market before or after the bid.' },
        { title: 'Complete the Purchase', desc: 'Pay Copart and wait for the auction to clear the account and issue the vehicle release.' },
        { title: 'Send Release Details', desc: 'Provide the buyer number, lot number, gate-pass PIN, delivery address, and an accurate condition report.' },
        { title: 'Carrier Pickup', desc: 'Y7 assigns a verified carrier with the equipment required for the vehicle and coordinates the yard pickup.' },
        { title: 'Delivery and Documentation', desc: 'The carrier delivers to the nominated home, shop, warehouse, or port, with milestone updates and a Bill of Lading.' },
      ]}
      requirements={[
        'Provide the Copart lot number and buyer or member number.',
        'Complete payment directly with Copart.',
        'Send the gate-pass PIN after Copart issues the release.',
        'Disclose whether the vehicle runs, rolls, steers, and brakes.',
        'Provide the complete delivery address and receiving contact.',
      ]}
      capabilities={[
        'We arrange pickup from 200+ Copart locations nationwide.',
        'We transport clean-title, salvage, and non-running vehicles.',
        'We match non-running loads with winch-capable equipment.',
        'We provide pre-bid transport estimates using current lane conditions.',
        'We coordinate delivery to a home, shop, warehouse, or port.',
        'We source open and enclosed carrier options.',
        'We coordinate single-vehicle and compatible multi-vehicle pickups.',
        'We record shipment milestones through the portal, Telegram, and email.',
      ]}
      faqs={FAQS}
      ctaLabel="Get a Copart Shipping Quote"
      ctaTo="/quote"
      related={[
        { label: 'Copart Storage Fees Explained', to: '/copart-storage-fees' },
        { label: 'Copart Gate Pass Guide', to: '/copart-gate-pass-guide' },
        { label: 'Copart International Shipping', to: '/copart-international-shipping' },
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Salvage Shipping', to: '/salvage-car-shipping' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Port Delivery', to: '/door-to-port-auto-transport' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <HreflangTags currentPath="/copart-shipping" hasPolishVersion hasUkrainianVersion hasRussianVersion />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }} />

      <Section title="How Y7 Arranges a Copart Pickup">
        <p style={p}>
          Y7 arranges the carrier, pickup coordination, and delivery after the buyer supplies the
          lot number, buyer number, vehicle condition, destination, and release details. Copart,
          not Y7, accepts the auction payment and issues the gate pass after payment clears; Y7
          coordinates those details with the assigned carrier but does not purchase the pass. We
          match the pickup to a carrier equipped for the vehicle and lane and confirm the yard
          requirements; the carrier documents pickup on the Bill of Lading. Read the{' '}
          <Link to="/copart-gate-pass-guide" style={linkStyle}>Copart gate pass and vehicle release guide</Link>{' '}
          for Copart&apos;s clearance, PIN, driver-matching, appointment, and yard-cutoff rules.
        </p>
      </Section>

      <Section title="Storage Timing Before Carrier Pickup">
        <p style={p}>
          Copart, not Y7, sets and charges storage fees at each auction yard. Copart&apos;s three-day
          complimentary period starts on sale day; after it closes, paid storage can continue by
          calendar day until the vehicle leaves. Across the yards Y7 ships from, observed storage
          rates typically run $40-$60 per day, but buyers should verify the exact rate on the
          location page because Copart has no single national schedule. Y7 can quote the carrier
          market before a bid and coordinate dispatch, while Copart alone controls the storage
          window, fees, and account. Review the <Link to="/copart-storage-fees" style={linkStyle}>Copart storage fees guide</Link>{' '}
          and <Link to="/blog/copart-storage-fees-real-cost-2026" style={linkStyle}>Copart storage cost examples</Link>{' '}
          for the full timing and planning detail.
        </p>
      </Section>

      <Section title="How Much Does Copart Shipping Cost?">
        <p style={p}>
          A Copart transport price depends on distance, vehicle size and condition, required
          loading equipment, lane frequency, season, and whether delivery is to a home, shop,
          warehouse, or port. The table shows observed carrier-rate ranges already used on this
          page, not a guaranteed quote or the Y7 dispatch fee.
        </p>
        <div style={tableWrap}>
          <table style={{ ...table, margin: 0 }}>
            <thead>
              <tr>
                <th style={th}>Distance</th>
                <th style={th}>Running</th>
                <th style={th}>Non-running</th>
                <th style={th}>Enclosed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={td}>0-300 miles</td>
                <td style={td}>$400-$650</td>
                <td style={td}>$550-$900</td>
                <td style={td}>$1,100+</td>
              </tr>
              <tr>
                <td style={td}>300-800 miles</td>
                <td style={td}>$700-$1,200</td>
                <td style={td}>$900-$1,500</td>
                <td style={td}>$1,600+</td>
              </tr>
              <tr>
                <td style={td}>800-1,500 miles</td>
                <td style={td}>$900-$1,400</td>
                <td style={td}>$1,200-$1,800</td>
                <td style={td}>$2,200+</td>
              </tr>
              <tr>
                <td style={td}>1,500-2,500 miles</td>
                <td style={td}>$1,100-$1,700</td>
                <td style={td}>$1,350-$2,000</td>
                <td style={td}>$2,800+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={p}>
          Winch loading for a non-running vehicle typically adds $75-$150 to the carrier rate.
          Y7&apos;s separate dispatch fee is $50 per vehicle for dealers paying the carrier directly,
          $60 for dealers asking Y7 to handle carrier payment, and $50 for exporters with carrier
          payment handling included; individuals pay the greater of $75 or 10% of the carrier
          price. Request a route-specific <Link to="/quote" style={linkStyle}>Copart shipping estimate</Link>{' '}
          or review the <Link to="/auction-transport-savings" style={linkStyle}>auction transport savings breakdown</Link>{' '}
          to see how the carrier rate and dispatch fee stay separate.
        </p>
      </Section>

      <Section title="Transporting Running, Non-Running, and Damaged Vehicles">
        <p style={p}>
          Y7 arranges Copart transport for clean-title, salvage, running, non-running, and damaged
          vehicles by matching the disclosed condition to the carrier&apos;s equipment. Buyers should
          report whether the vehicle runs, rolls, steers, and brakes, plus missing keys, wheels,
          loose parts, or severe body and frame damage. A winch-capable carrier is normally needed
          when the vehicle cannot load under its own power, with a typical $75-$150 addition to the
          carrier rate. Accurate condition details help avoid a rejected pickup, equipment change,
          or re-dispatch after the driver reaches the yard.
        </p>
      </Section>

      <Section title="Release Details the Carrier Needs">
        <p style={p}>
          A carrier needs the buyer or member number, lot number, cleared payment, gate-pass PIN,
          and matching driver details before Copart releases a vehicle. Copart issues the pass and
          administers its storage account; Y7 only coordinates release data with the assigned
          carrier. Copart&apos;s fee schedule includes a $79 gate fee for a clean-title vehicle or $95
          for a salvage or other non-clean-title vehicle, a $15 environmental fee, and a $50
          late-payment fee; exact gate fees can vary by yard. Loading cutoffs and appointment rules
          also vary by location. Review the <Link to="/copart-gate-pass-guide" style={linkStyle}>Copart gate pass and vehicle release guide</Link>{' '}
          before dispatch.
        </p>
      </Section>

      <Section title="Copart Pickup Coverage Across 200+ US Yards">
        <p style={p}>
          Y7 arranges vehicle pickup from 200+ Copart locations across the United States, with
          the carrier pool and rate determined by the specific yard and destination. Regular
          truck traffic is typically strongest around these high-volume markets:
        </p>
        <ul style={{ ...p, paddingLeft: '20px' }}>
          <li><strong>California:</strong> 10+ yards around Los Angeles, Sacramento, Van Nuys, Fresno, and Rancho Cucamonga.</li>
          <li><strong>Texas:</strong> 8+ yards across Dallas and Fort Worth, Houston, San Antonio, and Austin.</li>
          <li><strong>Florida:</strong> Miami, Orlando, Tampa, and Jacksonville, including export traffic through the Jacksonville port.</li>
          <li><strong>New Jersey and New York:</strong> Northeast pickups with access to the Port Newark corridor.</li>
          <li><strong>Georgia:</strong> Atlanta pickups and the Savannah port corridor.</li>
          <li><strong>Illinois, Pennsylvania, Ohio, Michigan, and North Carolina:</strong> established interior carrier networks.</li>
        </ul>
        <p style={p}>
          See our <Link to="/massachusetts-car-shipping" style={linkStyle}>Massachusetts</Link>,
          {' '}<Link to="/texas-auto-transport" style={linkStyle}>Texas</Link>,
          {' '}<Link to="/florida-car-shipping" style={linkStyle}>Florida</Link>, and
          {' '}<Link to="/new-jersey-auto-transport" style={linkStyle}>New Jersey</Link> pages for
          location-specific detail.
        </p>
      </Section>

      <Section title="Copart Delivery to a Warehouse or Port">
        <p style={p}>
          Y7 arranges the US inland move from a Copart yard to the warehouse or port nominated by
          the buyer or freight forwarder. The buyer provides the delivery facility, receiving
          contact, hours, and any booking or reference number the facility requires. Exporters pay
          Y7 a $50 dispatch fee per vehicle with carrier-payment handling included, while the
          carrier rate remains separate. For the document chain and ocean-leg planning outside this
          domestic transport scope, use the <Link to="/copart-international-shipping" style={linkStyle}>Copart international shipping guide</Link>,
          {' '}<Link to="/auction-to-port-transport" style={linkStyle}>auction-to-port transport service</Link>, and
          {' '}<Link to="/exporters" style={linkStyle}>exporter program</Link>.
        </p>
      </Section>

      <Section title="Choosing an Auction Before You Arrange Transport">
        <p style={p}>
          Copart and IAA use different release, check-in, loading, and storage procedures, so buyers
          need auction-specific pickup instructions. Copart&apos;s buyer-cost stack can include a
          $25-$149 internet bid fee, $79 or $95 gate fee, $15 environmental fee, and $50
          late-payment fee; on the existing $12,000 example, auction add-ons commonly total
          $600-$1,100, or roughly 5-9% of the hammer price. Those are Copart charges, not Y7
          transport fees, and buyers should confirm current figures with the auction. Read the{' '}
          <Link to="/blog/copart-iaa-manheim-comparison" style={linkStyle}>Copart, IAA, and Manheim buyer comparison</Link>{' '}
          for the release and carrier-check-in differences.
        </p>
      </Section>

      <Section title="Multi-Vehicle Copart Pickup for Dealers">
        <p style={p}>
          Y7 coordinates one or several Copart lots for dealers, including compatible vehicles at
          the same yard or along the same route. A compatible multi-vehicle load may reduce the
          carrier&apos;s per-vehicle cost, but the quote still depends on condition, equipment, yard,
          and destinations. Dealers pay a $50 Y7 dispatch fee per vehicle when they pay the carrier
          directly, or $60 when Y7 handles carrier payment; the carrier rate remains separate. The
          portal stores repeat buyer numbers, yard preferences, and delivery locations, with one
          dispatcher coordinating the moves. Review the <Link to="/dealers" style={linkStyle}>Y7 dealer program</Link>{' '}
          and <Link to="/blog/dealer-auction-pickup-guide" style={linkStyle}>dealer auction pickup guide</Link>.
        </p>
      </Section>

      <Section title="Why Y7 for Copart Transport">
        <p style={p}>
          Y7 gives Copart buyers one accountable dispatch path from route estimate through carrier
          pickup and delivery, without combining the carrier rate with its service fee.
        </p>
        <ul style={{ ...p, paddingLeft: '20px' }}>
          <li><strong>Licensed &amp; Bonded FMCSA Broker:</strong> MC #1741537, USDOT #4427359.
            {' '}<a href="https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=4427359" target="_blank" rel="noopener noreferrer" style={linkStyle}>Verify on FMCSA</a>.</li>
          <li><strong>Condition-aware carrier matching:</strong> running, non-running, damaged, open, and enclosed requirements are disclosed before assignment.</li>
          <li><strong>Transparent pricing:</strong> the carrier rate and Y7 dispatch fee are quoted separately.</li>
          <li><strong>One dispatcher:</strong> one person coordinates the pickup details and delivery instead of a call-center handoff.</li>
          <li><strong>Written milestones:</strong> the portal, Telegram bot, and email record carrier assignment, pickup, transit, and delivery updates.</li>
          <li><strong>Language support:</strong> English, Russian, Polish, and Ukrainian.</li>
        </ul>
      </Section>

      <Section title="Example: Copart Dallas to Houston">
        <p style={p}>
          A Dallas-to-Houston move shows how the auction release, equipment, carrier market, and
          storage clock combine in one transport decision. In this existing example, the buyer wins
          a non-running 2019 Honda Civic at Copart Dallas for $6,800, payment clears, Copart issues
          the gate pass, and a carrier already working the lane winches the vehicle for delivery to
          Houston. The observed open-carrier rate is $350; two paid storage days at the $40-$60
          range Y7 typically sees would add $80-$120 in Copart charges, subject to the Dallas
          location&apos;s exact rate. This is one realistic outcome when the lane cooperates, not a
          guaranteed price or timeline.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
