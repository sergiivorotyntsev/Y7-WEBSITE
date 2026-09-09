import { Link } from 'react-router-dom';
import SeoLandingPage, { Section } from './SeoLandingPage';
import { colors, fonts } from '../../theme';
import v2t from '../../styles/v2/type.module.css';
import pageStyles from './SeoLandingPage.module.css';
import ctaStyles from '../../components/ContextualCTA.module.css';

const p = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

const carrierChecks = [
  { title: 'FMCSA operating authority', detail: "We confirm the carrier's authority is active at the time of that dispatch." },
  { title: 'Current certificate of insurance (COI)', detail: "We check the carrier's current COI before assigning the load." },
  { title: 'Central Dispatch reviews and history', detail: "We review the carrier's record on the industry's load board." },
  { title: "Assigned driver's license", detail: "We check the license of the specific driver who will collect the vehicle, not only the carrier company's details." },
  { title: "Assigned driver's direct phone number", detail: 'We confirm a direct phone number for the driver who will transport the vehicle.' },
];

const faqs = [
  {
    q: 'Is Y7 Logistics a Manheim transport service?',
    a: 'Y7 Logistics is an independent Licensed & Bonded FMCSA Broker, not Manheim and not an affiliated auction transport service. Your dealership buys the vehicle through Manheim; Y7 coordinates the motor carrier for the shipment.',
  },
  {
    q: 'What is the Y7 fee for a dealer buying at Manheim?',
    a: 'The dealer fee is $50 per vehicle if the dealer pays the carrier directly, or $60 if Y7 handles carrier payment. The actual carrier rate is separate. These Y7 fees stay flat regardless of how many vehicles the dealership ships.',
  },
  {
    q: 'What information do you need for Manheim auto transport?',
    a: 'Provide the purchase confirmation, vehicle identifiers, actual pickup address, release status, vehicle condition and dealership delivery contact. Include receiving hours, access restrictions and any instructions supplied with the purchase.',
  },
  {
    q: 'Does a Manheim gate pass mean the vehicle is ready?',
    a: "Not by itself. Manheim's terms distinguish the vehicle release document from readiness for collection. Confirm the pickup status with the location before arranging the driver, and share the current release instructions with Y7.",
  },
  {
    q: 'Can I reuse a recurring dealer lane?',
    a: 'Yes. Keep your delivery locations in the portal and submit the vehicle details for each new purchase. A familiar lane helps coordination, but each carrier quote and collection plan still depend on that shipment and available capacity.',
  },
  {
    q: 'Can several Manheim vehicles travel on one carrier?',
    a: 'Y7 assesses the units together when their pickup and delivery plans are compatible. Vehicle size, condition, release readiness and trailer capacity determine whether one carrier is suitable. Consolidation is assessed for the load, not promised for every purchase.',
  },
  {
    q: 'What changes for an online Manheim purchase?',
    a: 'Send the actual collection address and contact with the purchase details. An online purchase should not be routed solely by the auction brand or listing location. Y7 uses the confirmed collection point and dealership destination to arrange the carrier.',
  },
  {
    q: 'Can a Manheim vehicle go to an export receiving facility?',
    a: 'Y7 can arrange the US carrier leg to the confirmed warehouse or port receiving facility. Exporters pay $50 per vehicle with carrier-payment handling included; the carrier rate remains separate. Share the receiving contact and delivery instructions before dispatch.',
  },
  {
    q: 'What if a purchased vehicle has a loading problem?',
    a: 'Report the condition before a carrier is assigned, including whether the vehicle rolls, steers and brakes. Photos and details of damage or missing parts help determine suitable equipment. Do not assume every dealer-auction vehicle can be driven onto a trailer.',
  },
];

function AudienceCTA({ title, body, to, label, tone }) {
  return (
    <aside className={`${ctaStyles.card} ${ctaStyles[`tone_${tone}`]}`}>
      <div className={ctaStyles.cardBody}>
        <h2 className={ctaStyles.cardTitle}>{title}</h2>
        <p className={ctaStyles.cardText}>{body}</p>
      </div>
      <Link to={to} className={ctaStyles.cardCta}>
        {label} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}

export default function ManheimTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Manheim Car Shipping for Dealers | Y7 Logistics',
        description:
          'Manheim car shipping from auction to dealership. Independent Licensed & Bonded FMCSA Broker, recurring lane coordination and separate carrier pricing.',
        path: '/manheim-transport',
      }}
      heading="Manheim Car Shipping for Dealership Inventory"
      intro="Your dealership has bought the inventory. Now each unit needs a confirmed pickup, suitable carrier and clear receiving plan. Y7 Logistics provides Manheim car shipping for licensed dealers as part of our B2B focus, with one dispatcher coordinating your moves."
      tldr={{
        kicker: 'Manheim transport, in brief',
        ariaLabel: 'Manheim transport, in brief',
        text: 'Y7 Logistics coordinates Manheim car shipping for dealer inventory, from the confirmed collection point to the dealership. We are an independent Licensed & Bonded FMCSA Broker, not Manheim. Dealers pay $50 per vehicle with direct carrier payment or $60 when Y7 handles it; the carrier rate is separate. Each dispatch includes checks of the carrier and assigned driver.',
      }}
      serviceExtras={{
        serviceType: 'Manheim dealer auction transport brokerage',
        audience: {
          schemaType: 'BusinessAudience',
          audienceType: 'Auto dealers',
          name: 'Licensed dealers moving Manheim vehicle purchases',
        },
      }}
      steps={[
        { title: 'Submit the Purchased Units', desc: 'Send the purchase details, actual collection address, condition and release status for each vehicle.' },
        { title: 'Agree the Shipment Plan', desc: 'Review the carrier quote separately from the Y7 fee and confirm the dealership receiving details.' },
        { title: 'Coordinate Collection', desc: 'Y7 checks the carrier and assigned driver, then coordinates pickup against the current release instructions.' },
        { title: 'Document Dealership Delivery', desc: 'Your receiving contact checks the vehicles with the carrier and records the handoff on the Bill of Lading.' },
      ]}
      requirements={[
        'Purchase confirmation and vehicle identifiers for every unit',
        'Actual collection address, contact and release instructions',
        'Vehicle condition and any equipment needs',
        'Dealership delivery address, receiving contact and access details',
      ]}
      faqs={faqs}
      ctaLabel="Get Dealer Pricing"
      ctaTo="/dealer-quote"
      labels={{ ctaSubtitle: 'Share the purchased units and your dealership delivery details.' }}
      related={[
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Dealer Transport', to: '/dealer-auto-transport' },
        { label: 'For Dealers', to: '/dealers' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <AudienceCTA
        title="Shipping auction vehicles for your dealership?"
        body="Keep your dealership's delivery locations and shipment requests together, with one dispatcher handling your moves and consolidated invoicing."
        to="/dealers"
        label="See dealer pricing"
        tone="teal"
      />

      <Section title="From Manheim Purchase to Dispatch">
        <p style={p}>
          Send the purchase confirmation and the actual collection address for every unit.
          Manheim's <a className={v2t.bodyLinkOnPaper} href="https://site.manheim.com/en/services/new-to-manheim.html">marketplace guidance</a>{' '}
          covers physical and digital buying, including offsite inventory, so the collection
          point should be confirmed rather than inferred from the listing.
        </p>
        <p style={p}>
          Manheim's <a className={v2t.bodyLinkOnPaper} href="https://site.manheim.com/en/locations/public-auctions.html">public-auctions page</a>{' '}
          confirms that some locations hold public sales; individual buyers can use our{' '}
          <Link className={v2t.bodyLinkOnPaper} to="/ship-my-car">personal car shipping service</Link>{' '}
          at the greater of <span className={v2t.monoData}>$75</span> or{' '}
          <span className={v2t.monoData}>10%</span> of the separate carrier price.
        </p>
        <p style={p}>
          For release, Manheim's{' '}
          <a className={v2t.bodyLinkOnPaper} href="https://site.manheim.com/en/marketplace-policies/us-policies/manheim-terms-and-conditions.html">US terms, section 17</a>,{' '}
          require the vehicle release document and valid photo identification, but make clear that a pass
          does not itself establish readiness. Confirm the current collection status with the
          location; Y7 coordinates the carrier, not the auction's purchase or release decisions.
        </p>
      </Section>

      <Section title="Set Up a Recurring Dealer Lane">
        <p style={p}>
          Save the dealership's preferred delivery locations in the portal, then send the
          new vehicle and collection details with each request. Note who can receive the load,
          the receiving hours and where a transporter can safely access the property.
        </p>
        <p style={p}>
          One dispatcher handles your dealer moves. Reusing the destination and contact details
          reduces repeated instructions, but it does not reserve a carrier or guarantee a
          collection day. The <Link className={v2t.bodyLinkOnPaper} to="/dealers">dealer account program</Link>{' '}
          covers onboarding and portal requests; the{' '}
          <Link className={v2t.bodyLinkOnPaper} to="/dealer-auto-transport">dealer auto transport service</Link>{' '}
          explains shipment coordination.
        </p>
      </Section>

      <Section title="Multi-Unit Moves and Dealership Delivery">
        <p style={p}>
          Submit the full vehicle list so Y7 can assess whether the units fit a shared carrier
          plan. Size, condition, readiness and the pickup sequence matter as well as the number
          of cars. Tell us about a non-running unit before equipment is selected.
        </p>
        <p style={p}>
          At the dealership, confirm the unloading point and the person receiving each vehicle.
          Keep identifiers with the delivery records so the arriving units can be matched to
          your purchases. Record condition at the handoff with the carrier rather than relying
          on the auction listing alone.
        </p>
      </Section>

      <Section title="Manheim Transport Cost for Dealers">
        <p style={p}>
          The Y7 dealer fee is <span className={v2t.monoData}>$50</span> per vehicle when you pay
          the carrier directly, or <span className={v2t.monoData}>$60</span> when Y7 handles that
          payment. It stays flat at every volume. The carrier rate is a separate quote for the
          route, vehicles and equipment; a recurring lane is not a promise of a fixed carrier price.
        </p>
        <p style={p}>
          Y7 Logistics is a Licensed &amp; Bonded FMCSA Broker,{' '}
          <span className={v2t.monoData}>MC #1741537</span> and{' '}
          <span className={v2t.monoData}>USDOT #4427359</span>.
          We arrange the motor carrier independently of Manheim.
        </p>
      </Section>

      <Section title="Carrier Checks Before Each Manheim Dispatch">
        <p style={p}>
          The company accepting the load and the driver collecting your inventory are both
          part of the dispatch check. Y7 verifies the following for each shipment:
        </p>
        <ul className={pageStyles.list}>
          {carrierChecks.map(({ title, detail }) => (
            <li key={title} className={pageStyles.listItem}>
              <strong>{title}:</strong> {detail}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Connect Manheim Purchases With Your Other Routes">
        <p style={p}>
          Keep purchases from different locations identifiable within your transport requests.
          The <Link className={v2t.bodyLinkOnPaper} to="/auction-car-shipping">auction car shipping hub</Link>{' '}
          brings those workflows together, while{' '}
          <Link className={v2t.bodyLinkOnPaper} to="/copart-shipping">Copart car shipping</Link>{' '}
          covers vehicles bought through that auction.
        </p>
        <p style={p}>
          If the destination is an export receiving facility, use the{' '}
          <Link className={v2t.bodyLinkOnPaper} to="/auction-to-port-transport">auction-to-port transport workflow</Link>{' '}
          for the inland leg. Exporters pay <span className={v2t.monoData}>$50</span> per vehicle
          including carrier-payment handling, with the carrier rate separate.
        </p>
        <p style={p}>
          Our <Link className={v2t.bodyLinkOnPaper} to="/blog/copart-iaa-manheim-comparison">Copart, IAA and Manheim guide</Link>{' '}
          handles auction-platform comparisons if you are deciding where to buy.
        </p>
      </Section>

      <AudienceCTA
        title="Shipping one vehicle door-to-door?"
        body="Use the personal shipment workflow when the vehicle is for your own use rather than dealership inventory."
        to="/ship-my-car"
        label="Get my car quote"
        tone="coral"
      />
    </SeoLandingPage>
  );
}
