import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from './SeoLandingPage';
import { tableWrap, table, th, td } from './_enrichedStyles';
import { colors, fonts } from '../../theme';

const p = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

export default function IaaiTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'IAA Auction Transport',
        description:
          'Vehicle transport from IAA (Insurance Auto Auctions) locations nationwide. Gate pass coordination, salvage vehicles, fast pickup. Y7 Logistics.',
        path: '/iaai-transport',
      }}
      primaryCTA={{ intlKey: 'exporters', to: '/exporters', tone: 'amber' }}
      secondaryCTA={{ intlKey: 'shipMyCar', to: '/ship-my-car', tone: 'coral' }}
      heading="IAA Transport — Ship Your Vehicle from IAA Auctions"
      intro="IAA (formerly Insurance Auto Auctions) is one of the largest salvage vehicle auction platforms. Y7 Logistics picks up from IAA yards across the US with efficient gate pass coordination."
      tldr={{
        kicker: 'IAA transport, in brief',
        ariaLabel: 'IAA transport, in brief',
        text: 'Y7 Logistics is a licensed and bonded FMCSA broker (MC #1741537, USDOT #4427359) shipping vehicles from IAA yards nationwide. IAA release works differently from Copart: you request it through your IAA buyer portal (typically processed within one business day) and the release document is a buyer letter naming the carrier. The free storage window is about two to three business days, then $15-$50 per day. Most IAA vehicles are non-running, so winch loading is the norm; you pay Y7 a flat $40-$60 dispatch fee and the carrier rate separately.',
      }}
      whenNeeded={[
        'Won a vehicle at IAA online auction',
        'Purchased insurance salvage vehicle',
        'Buying from IAA for rebuild or export',
        'Dealer purchasing from IAA',
        'Need fast pickup to avoid IAA storage fees',
      ]}
      steps={[
        { title: 'Complete IAA purchase and payment', desc: 'Finalize your IAA auction transaction and ensure all fees are paid.' },
        { title: 'Provide lot number and buyer info to Y7', desc: 'Share your IAA lot number, buyer number, and delivery details with us.' },
        { title: 'We coordinate IAA gate pass and pickup', desc: 'We guide you through the gate pass process so your vehicle is release-ready.' },
        { title: 'Carrier dispatched to IAA location', desc: 'A verified carrier is assigned and dispatched to the IAA yard.' },
        { title: 'Vehicle delivered to your destination', desc: 'Your vehicle is delivered to your home, shop, dealership, or port.' },
      ]}
      requirements={[
        'IAA lot number',
        'Buyer number',
        'Payment completed',
        'Gate pass authorization',
        'Delivery address or port',
      ]}
      capabilities={[
        'All IAA locations nationwide',
        'Insurance salvage vehicles',
        'Non-running/non-drivable transport',
        'Fast pickup scheduling',
        'Home or port delivery',
        'Competitive pricing for high-volume buyers',
      ]}
      faqs={[
        {
          q: 'How long after IAA purchase can you pick up?',
          a: 'Typically 2-5 business days. We prioritize pickup within the free storage period to help you avoid extra fees.',
        },
        {
          q: 'Do you handle IAA gate passes?',
          a: 'We guide you through the process — IAA issues gate passes after payment clears. We coordinate with the yard to ensure smooth pickup.',
        },
        {
          q: 'Can you ship non-running IAA vehicles?',
          a: 'Yes, many IAA vehicles are non-running. Our carriers have winches, dollies, and other equipment to load and transport inoperable vehicles safely.',
        },
        {
          q: 'What areas do you cover for IAA pickup?',
          a: 'All IAA locations in the continental United States. No matter which IAA yard your vehicle is at, we can arrange transport.',
        },
        {
          q: 'How is the IAA gate pass different from Copart\'s?',
          a: 'Two differences. At Copart the gate pass generates automatically once payment clears; at IAA you must actively request release through your buyer portal, which IAA typically processes within one business day. And IAA\'s release document is a buyer letter naming the authorized carrier, so the driver\'s ID must match it at the gate. When you book with Y7 we flag the request step immediately so you do not lose storage days waiting for a pass that was never requested.',
        },
        {
          q: 'Are more IAA vehicles non-running than at Copart?',
          a: 'Yes. IAA inventory is overwhelmingly insurance total-loss claims, so the share of non-running vehicles is significantly higher than at Copart. Winch loading is the norm rather than the exception, and loading a non-runner takes 20-30 minutes at the yard instead of five. Tell us about missing wheels, flat tires, or heavy undercarriage damage when booking so the right equipment is dispatched the first time.',
        },
        {
          q: 'How much is IAA storage and how long is the free window?',
          a: 'IAA typically gives two to three business days of free storage after payment clears, then charges $15-$50 per day depending on the yard. Storage fees are between you and IAA; no broker can waive them. What we do is treat the free window as a hard dispatch priority and quote your lane before you bid, so storage risk is priced into your bid instead of discovered after you win.',
        },
      ]}
      ctaLabel="Get a Quote"
      ctaTo="/quote"
      related={[
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Manheim Transport', to: '/manheim-transport' },
        { label: 'Salvage Shipping', to: '/salvage-car-shipping' },
        { label: 'Port Delivery', to: '/door-to-port-auto-transport' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <Section title="IAA: What Changed and What Stayed the Same">
        <p style={p}>
          Insurance Auto Auctions rebranded to simply "IAA" in 2019 and was later acquired by
          RB Global (formerly Ritchie Bros.) in 2023. The name changed, the parent company changed,
          but the yard operations stayed largely the same: insurance companies consign total-loss
          vehicles, IAA lists them online, buyers bid, and the winner arranges their own transport.
          That last part is where most buyers — especially first-timers — run into friction.
        </p>
      </Section>

      <Section title="The IAA Gate Pass Process: Different from Copart">
        <p style={p}>
          This is the single biggest operational difference between IAA and Copart that affects
          your transport timeline. At Copart, the gate pass generates automatically once payment
          clears. At IAA, the buyer must actively request the gate pass through their online portal.
          It does not happen on its own. If you pay for your vehicle and then wait for a gate pass
          to magically appear in your account, you will be waiting while storage fees accumulate.
        </p>
        <p style={p}>
          Here is the step-by-step: log into your IAA buyer account, navigate to your purchased
          lot, click the transportation or pickup options, and request gate pass authorization.
          IAA then processes the request — typically within one business day. Once the gate pass
          is active, we can send a carrier to the yard. The extra manual step means IAA pickups
          often run one day behind Copart pickups on average.
        </p>
        <p style={p}>
          When you book transport through Y7 Logistics, we walk you through this process. If you
          have not requested your gate pass yet, we flag it immediately so you do not lose days
          without realizing it.
        </p>
      </Section>

      <Section title="IAA vs Copart: What Actually Differs for Transport">
        <p style={p}>
          Buyers searching &quot;IAAI vs Copart&quot; usually want the fee-and-inventory comparison,
          which lives in our{' '}
          <Link to="/blog/copart-iaa-manheim-comparison" style={{ color: colors.accent }}>
          Copart vs IAA vs Manheim guide</Link>. For transport specifically, the differences are
          operational, and they change how fast your vehicle leaves the yard:
        </p>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Factor</th>
                <th style={th}>IAA</th>
                <th style={th}>Copart</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={td}>Release authorization</td>
                <td style={td}>Buyer letter naming the carrier, requested via the buyer portal</td>
                <td style={td}>Gate pass PIN, generated automatically</td>
              </tr>
              <tr>
                <td style={td}>When release issues</td>
                <td style={td}>~1 business day after you request it</td>
                <td style={td}>Once payment clears, no request needed</td>
              </tr>
              <tr>
                <td style={td}>Free storage window</td>
                <td style={td}>~2-3 business days after payment clears</td>
                <td style={td}>~3 business days after payment clears</td>
              </tr>
              <tr>
                <td style={td}>Storage after the window</td>
                <td style={td}>$15-$50 per day by yard</td>
                <td style={td}>$20-$40 per day by yard</td>
              </tr>
              <tr>
                <td style={td}>Non-running share</td>
                <td style={td}>Higher; winch loading is the norm</td>
                <td style={td}>Lower; more run-and-drive lots</td>
              </tr>
              <tr>
                <td style={td}>Carrier check-in</td>
                <td style={td}>Driver ID must match the buyer letter</td>
                <td style={td}>Transporter App or manual check-in</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={p}>
          The practical takeaway: IAA pickups run about one day behind Copart pickups on average,
          entirely because of the manual release request. A broker who handles both platforms
          builds that day into the dispatch plan instead of discovering it at the gate.
        </p>
      </Section>

      <Section title="Buyer ID Requirements at IAA">
        <p style={p}>
          IAA requires a registered buyer account. Individual buyers need a government-issued ID
          and must register on IAA's platform before bidding. Dealers need their dealer license
          on file. The buyer number tied to your account is what the yard checks when a carrier
          shows up — if the buyer number on the transport authorization does not match the
          account that purchased the vehicle, the yard will not release it.
        </p>
        <p style={p}>
          We verify your buyer number against the lot details before dispatching any carrier. This
          avoids the scenario where a driver makes a 200-mile trip to an IAA yard only to be turned
          away at the gate because of a buyer ID mismatch.
        </p>
      </Section>

      <Section title="IAA Storage Fees: Know Your Window">
        <p style={p}>
          IAA gives buyers a short free storage period — typically two to three business days after
          payment clears. After that, daily storage kicks in at $15 to $50 per day depending on
          the yard. IAA's storage rates tend to be slightly lower than Copart's on average, but
          the shorter free window offsets that. Two free days instead of three means you have less
          margin for error.
        </p>
        <p style={p}>
          The math is simple: if your vehicle sits at an IAA yard for ten days past the free period
          at $35 per day, you have added $350 to the cost of a car you bought at auction specifically
          to get a deal. We treat storage deadlines as hard dispatch priorities — your pickup gets
          scheduled around the free window, not around carrier convenience.
        </p>
      </Section>

      <Section title="IAA Transport (In-House) vs. Independent Broker">
        <p style={p}>
          IAA offers its own transport service called "IAA Transport" directly through the buyer
          portal. It is convenient — you click a button and they arrange a carrier. But convenience
          comes with trade-offs. IAA Transport pricing is set by IAA, not negotiated by you. There
          is no flexibility on timing, routing, or carrier selection. And if you are buying from
          multiple auctions (IAA plus Copart, for example), you are now managing two separate
          transport arrangements instead of one.
        </p>
        <p style={p}>
          Working with an independent broker like Y7 Logistics means your transport is priced
          competitively against the open carrier market. We can combine loads — if you have one
          vehicle at IAA and another at Copart in the same state, a single carrier can grab both
          (deciding between platforms? See our <Link to="/blog/copart-iaa-manheim-comparison" style={{ color: colors.accent }}>Copart vs IAA vs Manheim comparison</Link>).
          We also provide a single point of contact for all your auction transport, regardless of
          which platform you buy from.
        </p>
      </Section>

      <Section title="Most IAA Vehicles Are Non-Running: Plan Accordingly">
        <p style={p}>
          The majority of vehicles at IAA are insurance total-loss claims. That means flood damage,
          collisions, theft recoveries, and mechanical failures. The percentage of non-running
          vehicles at IAA is significantly higher than at Copart, where a larger share of clean
          title, run-and-drive vehicles are listed.
        </p>
        <p style={p}>
          For transport, this means winch loading is the norm, not the exception. Non-running
          vehicles also take longer to load at the yard — a driver may need 20 to 30 minutes per
          vehicle instead of the five minutes it takes to drive a running car onto the trailer.
          Yards with high non-running volume (and there are many) can create bottlenecks, especially
          on busy days. We account for this in our scheduling to make sure your carrier has enough
          time at the yard.
        </p>
        <p style={p}>
          If your IAA vehicle has missing wheels, flat tires, or heavy undercarriage damage, let
          us know when you book. These details determine whether we need a standard car hauler
          with a winch or a flatbed with a forklift-accessible yard.
        </p>
      </Section>

      <Section title="Top IAA Yard Locations by State">
        <p style={p}>
          IAA operates yards across the US, with the highest concentrations in Texas, California,
          Florida, Pennsylvania, Illinois, Ohio, Georgia, Michigan, North Carolina, and New Jersey.
          These ten states account for the vast majority of IAA auction volume. Carrier availability
          from yards in these states is generally strong because they sit on well-traveled freight
          corridors.
        </p>
        <p style={p}>
          For buyers purchasing from less common IAA locations — rural yards in states like
          Wyoming, Montana, or the Dakotas — expect an extra one to two days for carrier assignment.
          We price these routes transparently so you know exactly what to expect before confirming.
        </p>
      </Section>
    </SeoLandingPage>
  );
}
