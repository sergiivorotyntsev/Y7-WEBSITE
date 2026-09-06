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

function AudienceCTA({ title, body, to, label, tone }) {
  return (
    <aside className={`${ctaStyles.card} ${ctaStyles[`tone_${tone}`]}`}>
      <div className={ctaStyles.cardBody}>
        <h2 className={ctaStyles.cardTitle}>{title}</h2>
        <p className={ctaStyles.cardText}>{body}</p>
      </div>
      <Link to={to} className={ctaStyles.cardCta}>
        {label} <span aria-hidden="true">&rarr;</span>
      </Link>
    </aside>
  );
}

export default function AuctionCarShipping() {
  return (
    <SeoLandingPage
      meta={{
        title: 'Auction Car Shipping Service | Auto Auction Transport | Y7 Logistics',
        description:
          'Auction car transport after Copart, IAA, or Manheim purchases. Independent-auction review. Workflows for dealers and exporters. Licensed & Bonded FMCSA Broker.',
        path: '/auction-car-shipping',
      }}
      heading="Auction Car Shipping Service for Dealers & Exporters"
      intro={(
        <>
          Bought a vehicle, or planning to buy one at a U.S. auction?
          <br />
          <strong>Auction to Dealership:</strong> use the{' '}
          <Link to="/dealer-auto-transport" className={v2t.bodyLinkOnPaper}>
            dealer auto transport service
          </Link>{' '}
          for dealership inventory.
          <br />
          <strong>Auction to Port or Export Warehouse:</strong> follow the domestic{' '}
          <Link to="/auction-to-port-transport" className={v2t.bodyLinkOnPaper}>
            auction-to-port transport workflow
          </Link>
          . The freight forwarder handles ocean booking and export filings.
        </>
      )}
      tldr={{
        kicker: 'Auction transport, in brief',
        ariaLabel: 'Y7 Logistics auction vehicle transport, in brief',
        text: 'Y7 Logistics is a Licensed & Bonded FMCSA Broker (MC #1741537) that arranges domestic vehicle transport from U.S. auctions. A customer supplies the available auction release details; Y7 Logistics sources and dispatches the carrier for delivery to a dealership or to an export warehouse within the customer’s registered network.',
      }}
      serviceExtras={{
        serviceType: 'Auction car shipping and vehicle transport',
        audience: {
          schemaType: 'BusinessAudience',
          audienceType: 'Dealerships and vehicle exporters',
          name: 'Dealerships and vehicle exporters',
        },
      }}
      whenNeeded={[
        'Vehicle purchased through Copart',
        'Vehicle purchased through IAA or IAAI',
        'Vehicle purchased through Manheim',
        'Independent-auction purchase needing release review',
        'Auction inventory moving to a dealership',
        'Auction vehicle moving to a registered export warehouse',
        'Running or non-running auction vehicle transport',
      ]}
      steps={[
        { title: 'Share Auction Details', desc: 'Provide the available lot number, buyer number, and exact auction location.' },
        { title: 'Confirm Release, Condition, and Delivery Path', desc: 'Supply the auction release or gate pass, disclose whether the vehicle runs, rolls, steers, and brakes, and identify the dealer, personal, or exporter workflow.' },
        { title: 'Carrier Sourcing and Dispatch', desc: 'Y7 Logistics sources a carrier for the route, vehicle condition, and required equipment.' },
        { title: 'Auction Pickup', desc: 'The dispatched carrier uses the available release details and loads the vehicle at the auction yard.' },
        { title: 'Domestic Delivery', desc: 'The carrier delivers to the dealership, private address, or export warehouse assigned to the order.' },
      ]}
      requirements={[
        'Available lot number and buyer number',
        'Exact auction yard and pickup reference',
        'Auction release or gate pass supplied by the buyer',
        'Vehicle condition and operability details',
        'Delivery requirements and receiving contact, when applicable',
      ]}
      capabilities={[
        'Pickup coordination for Copart, IAA, and Manheim auction yards',
        'Gate pass and auction release coordination',
        'Carrier sourcing for running and non-running vehicles',
        'Open and enclosed carrier options',
        'Domestic delivery to dealerships and private addresses',
        'Domestic delivery to registered export warehouses',
      ]}
      faqs={[
        {
          q: 'What does Y7 Logistics need before auction pickup?',
          a: 'Provide the available lot number, buyer number, exact auction location, release or gate pass, vehicle condition, and delivery requirements. The auction must release the vehicle before the carrier can collect it.',
        },
        {
          q: 'Does Y7 Logistics buy the gate pass or pay auction charges?',
          a: 'No. The buyer remains responsible for the auction account, gate pass or release, and any auction charges. Y7 Logistics coordinates the available release details with the dispatched carrier but does not purchase gate passes or manage storage.',
        },
        {
          q: 'Can Y7 Logistics transport a non-running auction vehicle?',
          a: 'Yes. Tell us whether the vehicle runs, rolls, steers, and brakes so Y7 Logistics can source a carrier with suitable loading equipment. Any loading assistance needed at the auction yard must be confirmed separately.',
        },
        {
          q: 'Can an auction vehicle be delivered to a dealership?',
          a: 'Yes. Y7 Logistics can arrange the domestic carrier move from the auction yard to the dealership address provided for the order.',
        },
        {
          q: 'Can an auction vehicle be delivered to an export warehouse?',
          a: 'Yes. Exporter accounts register eligible warehouse locations. For exporter orders placed through the portal, Y7 Logistics assigns a destination from that registered network after document review. The freight forwarder handles ocean booking and export filings.',
        },
        {
          q: 'Does Y7 Logistics operate auction yards or export warehouses?',
          a: 'No. Y7 Logistics operates neither auction yards nor export warehouses and receives no warehouse referral payment. Exporter accounts register eligible facilities before submitting orders.',
        },
        {
          q: 'Who performs the physical transport from the auction?',
          a: 'A motor carrier performs pickup and delivery. Y7 Logistics acts as the Licensed & Bonded FMCSA Broker that sources and dispatches the carrier and coordinates the available auction release details.',
        },
      ]}
      ctaLabel="Get an Auction Shipping Quote"
      ctaTo="/quote"
      labels={{
        ctaSubtitle: 'Share the auction release details, vehicle condition, origin, and destination.',
      }}
      related={[
        { label: 'Copart Shipping', to: '/copart-shipping' },
        { label: 'IAA Transport', to: '/iaai-transport' },
        { label: 'Manheim Transport', to: '/manheim-transport' },
        { label: 'Auction Transport Savings', to: '/auction-transport-savings' },
        { label: 'Auction to Port', to: '/auction-to-port-transport' },
        { label: 'Salvage Car Shipping', to: '/salvage-car-shipping' },
        { label: 'Port Delivery', to: '/door-to-port-auto-transport' },
        { label: 'Dealer Auto Transport', to: '/dealer-auto-transport' },
        { label: 'Auction Shipping Guide', to: '/how-to-ship-a-car-bought-at-auction' },
        { label: 'Get a Quote', to: '/quote' },
      ]}
    >
      <AudienceCTA
        title="Getting this car to a port?"
        body="Exporter accounts register eligible warehouses. For portal orders, Y7 Logistics assigns a destination from that network after document review; the freight forwarder handles ocean booking and export filings."
        to="/exporters"
        label="See export services"
        tone="amber"
      />

      <Section title="After a Copart Purchase">
        <p style={p}>
          For a Copart purchase, share the exact yard, available lot and buyer details, vehicle
          condition, release, and destination. The{' '}
          <Link to="/copart-shipping" className={v2t.bodyLinkOnPaper}>
            Copart shipping page
          </Link>{' '}
          explains what information to collect for a Copart pickup and how the domestic handoff
          works.
        </p>
      </Section>

      <Section title="After an IAA or IAAI Purchase">
        <p style={p}>
          Use the auction name shown on the release, the exact yard address, and the vehicle
          condition supplied for the purchase. The{' '}
          <Link to="/iaai-transport" className={v2t.bodyLinkOnPaper}>
            IAA and IAAI transport page
          </Link>{' '}
          explains the information used to arrange that auction pickup and domestic delivery.
        </p>
      </Section>

      <Section title="After a Manheim Purchase">
        <p style={p}>
          For a Manheim purchase, provide the available release information, exact pickup
          location, vehicle condition, and receiving address. The{' '}
          <Link to="/manheim-transport" className={v2t.bodyLinkOnPaper}>
            Manheim transport page
          </Link>{' '}
          provides the details to prepare the Manheim release and delivery handoff.
        </p>
      </Section>

      <Section title="Independent Auction Review">
        <p style={p}>
          Before accepting an independent-auction order, Y7 Logistics must review whether the
          seller releases vehicles to third-party motor carriers and what pickup documents are
          available. The{' '}
          <Link to="/how-to-ship-a-car-bought-at-auction" className={v2t.bodyLinkOnPaper}>
            guide to shipping a car bought at auction
          </Link>{' '}
          shows what to prepare from purchase through domestic delivery.
        </p>
      </Section>

      <Section title="From Auction Purchase to Carrier Pickup">
        <p style={p}>
          Not all auctions work the same way, and the differences matter when you are planning
          transport. Each platform has its own rules for release documents and yard access. Once
          the auction has released the vehicle, provide the available lot number, buyer number,
          and auction location. Y7 Logistics then sources and dispatches the carrier for the
          domestic move. Use the{' '}
          <Link to="/how-to-ship-a-car-bought-at-auction" className={v2t.bodyLinkOnPaper}>
            auction car shipping guide
          </Link>{' '}
          for the full instructional workflow.
        </p>
      </Section>

      <Section title="Auction Release and Storage Responsibility">
        <p style={p}>
          Auction release deadlines, storage windows, and auction charges are set by the auction
          house and remain the buyer&apos;s responsibility. Y7 Logistics coordinates the available
          release details with the dispatched carrier but does not purchase gate passes, manage
          storage, or guarantee avoidance of auction charges.
        </p>
      </Section>

      <AudienceCTA
        title="Shipping one vehicle door-to-door?"
        body="If this auction purchase is for personal use, Y7 Logistics can arrange the domestic carrier move to the delivery address you provide."
        to="/ship-my-car"
        label="Get my car quote"
        tone="coral"
      />
    </SeoLandingPage>
  );
}
