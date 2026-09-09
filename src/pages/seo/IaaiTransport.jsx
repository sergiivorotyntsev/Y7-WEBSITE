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
    q: 'Is Y7 Logistics part of IAA?',
    a: 'No. Y7 Logistics is an independent Licensed & Bonded FMCSA Broker, not IAA or its transport service. Y7 arranges the motor carrier and coordinates the shipment; IAA controls the auction purchase and release.',
  },
  {
    q: 'What does IAA transport cost through Y7?',
    a: 'The carrier rate is quoted separately from the Y7 fee. Dealers pay $50 per vehicle when paying the carrier directly, or $60 when Y7 handles carrier payment. Exporters pay $50 per vehicle with carrier-payment handling included. Individuals pay the greater of $75 or 10% of the carrier price. Vehicle condition, the route and equipment affect the carrier quote.',
  },
  {
    q: 'What should I send for an IAAI car shipping quote?',
    a: 'Send the purchase reference or vehicle listing, the exact IAA pickup branch, available buyer and vehicle identifiers, the delivery address and the vehicle condition. Add any release information and receiving instructions already provided for the purchase.',
  },
  {
    q: 'Does payment mean my IAA vehicle is ready for pickup?',
    a: 'Confirm the current pickup status and required authorization with the IAA branch handling your vehicle. Share that confirmation with Y7 before a carrier is dispatched. A planned collection date should not rely on an assumed release-processing time.',
  },
  {
    q: 'Can Y7 arrange transport for a non-running or damaged vehicle?',
    a: 'Yes, subject to a review of the actual condition and loading access. Explain whether the vehicle rolls, steers and brakes, and disclose missing wheels, leaks or structural damage. Y7 matches the request to suitable carrier equipment rather than treating every salvage vehicle as the same load.',
  },
  {
    q: 'Can an individual buyer ship an IAA purchase with Y7?',
    a: 'Yes, for a vehicle the buyer is eligible to purchase. IAA says public-buyer eligibility depends on the branch and the vehicle; check its Who Can Bid information before bidding. Y7 arranges transport and does not provide auction purchasing access.',
  },
  {
    q: 'Can an IAA purchase go to an export warehouse?',
    a: 'Y7 can coordinate the domestic carrier move to the confirmed receiving facility. Provide its address, contact, vehicle-acceptance requirements and any reference requested for delivery. Ocean booking and overseas transport are separate from this inland shipment.',
  },
  {
    q: 'Where do I confirm IAA storage charges and pickup deadlines?',
    a: "Use the current instructions for the IAA branch handling the purchase. Auction charges and deadlines remain the buyer's responsibility. Give Y7 the relevant pickup information so the carrier request reflects the actual branch requirements, not a nationwide assumed storage window.",
  },
  {
    q: 'Can dealers submit IAA pickups alongside other auction purchases?',
    a: 'Yes. Submit the vehicle and release details for each location through the dealer workflow. Y7 can assess compatible pickups together, but a shared carrier depends on readiness, equipment, capacity and routing. The Y7 dealer fee does not change with shipment volume.',
  },
];

function AudienceCTA({ title, body, to, label, tone }) {
  return (
    <aside className={`${ctaStyles.card} ${ctaStyles[`tone_${tone}`]}`}>
      <div className={ctaStyles.cardBody}>
        <h2 className={ctaStyles.cardTitle}>{title}</h2>
        <p className={ctaStyles.cardText}>{body}</p>
      </div>
      <Link className={ctaStyles.cardCta} to={to}>
        {label} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}

export default function IaaiTransport() {
  return (
    <SeoLandingPage
      meta={{
        title: 'IAAI Car Shipping & Auction Transport | Y7 Logistics',
        description:
          'IAAI car shipping from IAA auctions to dealers, homes and export warehouses. Independent Licensed & Bonded FMCSA Broker; carrier rate quoted separately.',
        path: '/iaai-transport',
      }}
      heading="IAAI Car Shipping From Auction Yard to Delivery"
      intro="Buying at IAA, often searched as IAAI, leaves a separate job: getting the purchased vehicle to its next location. Y7 Logistics arranges IAA car shipping for dealers, exporters and eligible individual buyers, with the carrier rate and broker fee stated separately."
      tldr={{
        kicker: 'IAAI car shipping, in brief',
        ariaLabel: 'IAAI car shipping, in brief',
        text: "Y7 Logistics arranges IAAI car shipping from IAA auction locations to dealerships, homes and export warehouses. We are an independent Licensed & Bonded FMCSA Broker, not IAA. Buyers provide the purchase and release details; Y7 matches equipment and checks the carrier before dispatch. The carrier performs pickup and delivery, with its rate separate from Y7's fee.",
      }}
      serviceExtras={{
        serviceType: 'IAA auction vehicle transport brokerage',
        audience: {
          schemaType: 'BusinessAudience',
          audienceType: 'Auto dealers and vehicle exporters',
          name: 'Dealers and exporters arranging IAA vehicle pickup',
        },
      }}
      steps={[
        { title: 'Identify the Purchase', desc: 'Send the IAA branch, purchase identifiers, vehicle condition and destination for a carrier quote.' },
        { title: 'Confirm Release Readiness', desc: 'Obtain the current pickup instructions from IAA and share the available authorization.' },
        { title: 'Match Carrier and Equipment', desc: 'Y7 reviews the load, completes the per-dispatch checks and coordinates collection.' },
        { title: 'Receive the Vehicle', desc: 'The carrier delivers to the confirmed address; record the handoff on the Bill of Lading.' },
      ]}
      requirements={[
        'Purchase reference and available buyer or vehicle identifiers',
        'Exact IAA branch and current release information',
        'Vehicle condition, photos and known loading limitations',
        'Confirmed delivery address and receiving contact',
        'Pickup and delivery instructions supplied for this vehicle',
      ]}
      faqs={faqs}
      ctaLabel="Get a Quote"
      ctaTo="/quote"
      labels={{ ctaSubtitle: 'Send the IAA purchase details and the confirmed delivery address.' }}
      related={[
        { label: 'Auction Shipping', to: '/auction-car-shipping' },
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'Manheim Transport', to: '/manheim-transport' },
        { label: 'Salvage Shipping', to: '/salvage-car-shipping' },
        { label: 'Port Delivery', to: '/door-to-port-auto-transport' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <AudienceCTA
        title="Getting this car to a port?"
        body="Plan the inland move around the vehicle's condition and the receiving facility's instructions. The exporter workflow connects the auction pickup with the confirmed warehouse or port handoff."
        to="/exporters"
        label="See export services"
        tone="amber"
      />

      <Section title="Confirm the Purchase Before Arranging Pickup">
        <p style={p}>
          Start with the exact IAA branch and purchased vehicle, not just the auction name.
          Send Y7 the purchase reference, available buyer details, condition and destination.
          These let the carrier quote reflect the vehicle actually waiting for collection.
        </p>
        <p style={p}>
          For individual buyers, IAA's{' '}
          <a className={v2t.bodyLinkOnPaper} href="https://www.iaai.com/us/Marketing/how-to-register">buyer registration guide</a>{' '}
          says the branch must allow public buying and the vehicle must be eligible under its
          Who Can Bid information. Y7 is independent of IAA: arranging transport does not
          grant auction bidding eligibility.
        </p>
      </Section>

      <Section title="Release Information and Carrier Check-In">
        <p style={p}>
          Ask the branch to confirm that the vehicle can be collected and what authorization
          the carrier must present. Send that information to Y7 so collection can be coordinated
          with the assigned driver. The buying account remains responsible for resolving the
          purchase and release with IAA.
        </p>
        <p style={p}>
          IAA describes outbound pickup scheduling in its{' '}
          <a className={v2t.bodyLinkOnPaper} href="https://www.iaai.com/us/marketing/iaa-apps">Tow App guidance</a>.
          Consult the{' '}
          <a className={v2t.bodyLinkOnPaper} href="https://www.iaai.com/us/locations">IAA location directory</a>{' '}
          for the branch's current instructions and auction charges. Do not plan around an
          assumed release delay or a nationwide free-storage window.
        </p>
      </Section>

      <Section title="Non-Running and Damaged IAA Vehicles">
        <p style={p}>
          A salvage label is not a loading plan. Tell Y7 whether the vehicle rolls, steers
          and brakes, and provide photos of missing wheels, leaks or damaged attachment points.
          The carrier needs the actual condition to assess suitable loading equipment.
        </p>
        <p style={p}>
          Open, enclosed or specialized equipment depends on that condition and access at both
          ends of the route. Do not assume a purchased vehicle can be driven onto a trailer.
          Our <Link className={v2t.bodyLinkOnPaper} to="/salvage-car-shipping">salvage car shipping guidance</Link>{' '}
          explains the condition details to include with the request.
        </p>
      </Section>

      <Section title="IAA Transport Cost: Carrier Rate and Y7 Fee">
        <p style={p}>
          The carrier quote reflects the pickup and delivery locations, vehicle condition,
          equipment and available capacity. It is separate from Y7's fee and any auction charges.
          Y7 Logistics is a Licensed &amp; Bonded FMCSA Broker,{' '}
          <span className={v2t.monoData}>MC #1741537</span>,{' '}
          <span className={v2t.monoData}>USDOT #4427359</span>.
        </p>
        <p style={p}>
          Dealers pay <span className={v2t.monoData}>$50</span> per vehicle with direct carrier
          payment, or <span className={v2t.monoData}>$60</span> when Y7 handles carrier payment.
          Exporters pay <span className={v2t.monoData}>$50</span> per vehicle with that handling
          included. Individuals pay the greater of <span className={v2t.monoData}>$75</span> or{' '}
          <span className={v2t.monoData}>10%</span> of the carrier price.
        </p>
        <p style={p}>
          For recurring purchases, the{' '}
          <Link className={v2t.bodyLinkOnPaper} to="/dealer-auto-transport">dealer auto transport service</Link>{' '}
          explains dealer shipment coordination. Grouping vehicles may affect the carrier quote;
          it does not create a volume tier for the Y7 fee.
        </p>
      </Section>

      <Section title="IAA-to-Port Moves for Exporters">
        <p style={p}>
          Confirm the receiving warehouse or port facility, its delivery contact, acceptance
          instructions and any required reference. Share these with the auction vehicle details
          so the inland carrier is sent to the correct receiving point.
        </p>
        <p style={p}>
          The <Link className={v2t.bodyLinkOnPaper} to="/auction-to-port-transport">auction-to-port transport workflow</Link>{' '}
          covers the US carrier leg. Ocean booking, vessel arrangements and overseas delivery
          remain with the ocean-freight provider; an inland pickup is not a vessel booking.
        </p>
      </Section>

      <Section title="Carrier Checks Before Each IAA Dispatch">
        <p style={p}>
          A previous shipment with a carrier does not replace checking the company and the
          assigned driver for this load. Before each dispatch, Y7 checks:
        </p>
        <ul className={pageStyles.list}>
          {carrierChecks.map(({ title, detail }) => (
            <li key={title} className={pageStyles.listItem}>
              <strong>{title}:</strong> {detail}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Planning Purchases Across Auction Locations">
        <p style={p}>
          Use the <Link className={v2t.bodyLinkOnPaper} to="/auction-car-shipping">auction car shipping hub</Link>{' '}
          to organize transport requests from different auction locations. A{' '}
          <Link className={v2t.bodyLinkOnPaper} to="/copart-shipping">Copart pickup</Link>{' '}
          still needs its own purchase and release information, even when it shares a delivery address.
        </p>
        <p style={p}>
          For differences between auction platforms, read the{' '}
          <Link className={v2t.bodyLinkOnPaper} to="/blog/copart-iaa-manheim-comparison">Copart, IAA and Manheim comparison guide</Link>.
        </p>
      </Section>

      <AudienceCTA
        title="Shipping one vehicle door-to-door?"
        body="Bought this IAA vehicle for personal use? Send the branch, condition and delivery details for an individual shipment with the carrier price separate from the Y7 fee."
        to="/ship-my-car"
        label="Get my car quote"
        tone="coral"
      />
    </SeoLandingPage>
  );
}
