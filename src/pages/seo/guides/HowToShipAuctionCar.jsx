import { Link } from 'react-router-dom';
import PageMeta from '../../../components/PageMeta';
import styles from './GuidePage.module.css';

// DESIGN-V2-W5-T06: V2 "Dispatch Board" restyle. All heading texts/levels/
// order and copy are byte-identical to V1; shells + tokens only.

export default function HowToShipAuctionCar() {
  return (
    <div className={styles.page}>
      <PageMeta
        title="How to Ship a Car Bought at Auction | Y7 Logistics"
        description="Complete guide to shipping a vehicle purchased at Copart, IAAI, or Manheim auction. Step-by-step process from winning bid to delivery."
        path="/how-to-ship-a-car-bought-at-auction"
      />

      {/* Hero — board band */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link to="/" className={styles.crumbLink}>Home</Link>
            <span className={styles.crumbSep}>/</span>
            <Link to="/services" className={styles.crumbLink}>Services</Link>
            <span className={styles.crumbSep}>/</span>
            <span className={styles.crumbCurrent}>How to Ship a Car Bought at Auction</span>
          </nav>

          <span className={styles.kicker}>Auction logistics guide</span>

          {/* H1 */}
          <h1 className={styles.h1}>
            How to Ship a Car Bought at Auction: Complete Guide
          </h1>
        </div>
      </section>

      <div className={styles.body}>
        {/* Intro */}
        <p className={styles.intro}>
          Buying vehicles at auction is one of the most common ways to source affordable cars in the United States. Whether you are a dealer restocking inventory, an exporter purchasing vehicles for overseas markets, or an individual buyer who found a great deal, you will need reliable auto transport to get your vehicle from the auction yard to its final destination. This guide walks you through every step of the process, from winning the auction to receiving your vehicle, so you can avoid costly mistakes and get your car shipped quickly.
        </p>

        {/* Understanding the Auction Landscape */}
        <h2 className={styles.h2}>Understanding the Auction Landscape</h2>
        <p className={styles.p}>
          The US auto auction industry is dominated by three major platforms, each serving different buyer segments and offering different types of inventory. Understanding the differences will help you navigate the shipping process more effectively.
        </p>

        <h3 className={styles.h3}>Copart</h3>
        <p className={styles.p}>
          Copart is the largest online vehicle auction platform in the US, with over 200 locations nationwide. They specialize in insurance salvage vehicles, but also sell clean title, fleet, and dealer vehicles. Copart operates on a 100% online bidding model, meaning you never need to visit the yard to buy. However, you will need a registered carrier to pick up the vehicle from the Copart yard. Copart provides a gate pass system that authorizes vehicle release to your designated transporter.
        </p>

        <h3 className={styles.h3}>IAAI (Insurance Auto Auctions)</h3>
        <p className={styles.p}>
          IAAI is Copart's primary competitor, with over 200 locations across the US. They handle a similar mix of salvage and clean title vehicles. IAAI's pickup process is similar to Copart's, requiring a gate pass and authorized carrier. One key difference is that IAAI's storage fee policies and free storage periods may differ from Copart's, so always check the specific terms for your purchase location.
        </p>

        <h3 className={styles.h3}>Manheim</h3>
        <p className={styles.p}>
          Manheim is the largest wholesale auction platform, primarily serving licensed dealers. Unlike Copart and IAAI, Manheim deals almost exclusively in clean title, dealer-consigned vehicles. The pickup process at Manheim locations tends to be more streamlined, with dedicated transport lanes and fewer restrictions. However, Manheim auctions require a dealer license to participate, making them inaccessible to individual buyers.
        </p>

        {/* Step 1 */}
        <h2 className={styles.h2}>Step 1: Win the Auction and Complete Payment</h2>
        <p className={styles.p}>
          After winning your bid, the clock starts ticking immediately. Each auction platform has a specific payment deadline, typically 48 hours for Copart and IAAI, and payment terms vary at Manheim depending on your dealer agreement. Late payments can result in penalties or forfeiture of the vehicle.
        </p>
        <p className={styles.p}>
          Payment methods vary by platform. Copart and IAAI accept wire transfers, cashier's checks, and credit/debit cards (with limits and fees). Complete your payment as quickly as possible because free storage days begin counting from the sale date at most locations, not from the payment date. Every day you delay payment is a day closer to incurring storage fees.
        </p>

        {/* Step 2 */}
        <h2 className={styles.h2}>Step 2: Obtain Your Title and Gate Pass</h2>
        <p className={styles.p}>
          Once payment clears, the auction house will issue a gate pass. This document authorizes the release of your vehicle to a carrier. At Copart, gate passes are digital and can be emailed to your transport broker. IAAI uses a similar system. Without a valid gate pass, no carrier will be able to pick up your vehicle.
        </p>
        <p className={styles.p}>
          Title processing timelines vary. Some auction locations issue titles immediately upon payment, while others take 5-10 business days or longer, especially for salvage title vehicles that require state processing. If you are exporting the vehicle, you may not need the physical title for transport but will need it for customs. Make sure to clarify title timeline with the auction before arranging transport.
        </p>

        {/* Step 3 */}
        <h2 className={styles.h2}>Step 3: Choose a Transport Broker</h2>
        <p className={styles.p}>
          Working with a licensed auto transport broker is the most efficient way to ship your auction purchase. A broker has access to a network of verified carriers and can match your shipment with a driver who is already routing through the auction yard's area. This is particularly important for auction vehicles because timing matters: you need a carrier who can pick up within the free storage window.
        </p>
        <p className={styles.p}>
          When choosing a broker, look for one who specializes in auction vehicle transport. They should be familiar with the gate pass process, storage fee deadlines, and the specific requirements of Copart, IAAI, or Manheim yards. A good broker will coordinate directly with the yard and handle all scheduling so you do not have to. Y7 Logistics handles hundreds of auction-to-door and auction-to-port shipments monthly and is deeply familiar with all major auction platforms.
        </p>
        <p className={styles.p}>
          Verify that the broker is FMCSA-licensed. Ask for their USDOT and MC numbers. A legitimate broker will have these displayed on their website and be verifiable through the FMCSA SAFER system. Avoid unlicensed operators or brokers who cannot provide carrier insurance documentation.
        </p>

        {/* Step 4 */}
        <h2 className={styles.h2}>Step 4: Coordinate Pickup</h2>
        <p className={styles.p}>
          Your broker will schedule a carrier to pick up the vehicle from the auction yard. Provide the following information to your broker: the lot number, buyer number, auction location, and whether the vehicle is operable or inoperable. If the vehicle does not run, the carrier will need a truck with winch or forklift capability, which may affect pricing and scheduling.
        </p>
        <p className={styles.p}>
          Timing is critical. Copart typically provides 3-5 free storage days after payment clears. After that, storage fees range from $25-$75 per day depending on the location. IAAI has similar policies. Make sure your broker schedules pickup within this free window. If you cannot arrange transport immediately, some auction yards allow you to extend storage for a daily fee, but this adds up quickly.
        </p>
        <p className={styles.p}>
          For inoperable vehicles, be specific about the vehicle's condition. Can the wheels roll freely, or is the vehicle completely immobile? Does it need to be dragged onto the trailer? This information affects what equipment the carrier needs and can impact the transport price.
        </p>

        {/* Step 5 */}
        <h2 className={styles.h2}>Step 5: Track Your Shipment</h2>
        <p className={styles.p}>
          Once the carrier has loaded your vehicle, your broker should provide tracking updates. At Y7 Logistics, we provide status updates through our customer portal, including pickup confirmation, transit status, and estimated delivery time. Most auction vehicle shipments are completed within 1-7 days depending on the distance between the auction yard and the delivery location.
        </p>
        <p className={styles.p}>
          During transit, the carrier is responsible for the vehicle. All carriers in the Y7 Logistics network carry cargo insurance with minimum coverage of $100,000 per vehicle. The Bill of Lading (BOL) signed at pickup documents the vehicle's condition at the time of loading, serving as the baseline for any damage claims.
        </p>

        {/* Step 6 */}
        <h2 className={styles.h2}>Step 6: Receive and Inspect Your Vehicle</h2>
        <p className={styles.p}>
          When the carrier arrives at the delivery location, carefully inspect the vehicle before signing the delivery BOL. Walk around the entire vehicle and compare its condition to the pickup BOL. Note any new damage, no matter how minor, directly on the delivery BOL before signing. Take photographs of the vehicle from all angles as additional documentation.
        </p>
        <p className={styles.p}>
          Remember that auction vehicles often arrive in less-than-perfect condition. The vehicle may have existing damage from the insurance claim, auction yard handling, or pre-existing wear. The key is to distinguish between pre-existing damage (documented on the pickup BOL) and any new damage that occurred during transport. If you notice new damage, note it on the BOL, take photos, and contact your broker immediately to initiate a claim.
        </p>

        {/* Common Mistakes */}
        <h2 className={styles.h2}>Common Mistakes to Avoid</h2>
        <p className={styles.p}>
          Shipping an auction vehicle is straightforward if you follow the process, but there are several common mistakes that can cost you time and money:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Delaying transport and incurring storage fees.</strong> This is the most expensive mistake. Storage fees of $50+ per day add up quickly. Book your transport as soon as you complete payment.</li>
          <li className={styles.listItem}><strong>Providing the wrong pickup contact or lot number.</strong> Double-check your lot number and buyer number before submitting to your broker. Incorrect information causes pickup delays.</li>
          <li className={styles.listItem}><strong>Not checking the Bill of Lading at delivery.</strong> The BOL is your legal proof of the vehicle's condition. If you sign it without noting new damage, you lose your ability to file a claim.</li>
          <li className={styles.listItem}><strong>Not disclosing that the vehicle is inoperable.</strong> If your vehicle does not run and you do not tell your broker, the assigned carrier may arrive without the proper equipment, causing a failed pickup and additional fees.</li>
          <li className={styles.listItem}><strong>Assuming the title will arrive with the vehicle.</strong> Titles are mailed separately by the auction house. They do not travel with the vehicle on the carrier.</li>
          <li className={styles.listItem}><strong>Choosing the cheapest quote without verifying the broker.</strong> Unlicensed brokers and carriers create risk. Always verify FMCSA licensing and insurance before booking.</li>
        </ul>

        {/* Auction to Port */}
        <h2 className={styles.h2}>Auction to Port: For Export Buyers</h2>
        <p className={styles.p}>
          A large percentage of vehicles purchased at US auctions are destined for export. If you are buying a vehicle at Copart, IAAI, or Manheim for export overseas, the transport process adds a few additional steps. Instead of delivering to a home or shop address, the carrier delivers the vehicle to a marine terminal at a designated US port.
        </p>
        <p className={styles.p}>
          The most common export ports for auction vehicles include Port of Houston, Port Newark, Port of Savannah, Port of Baltimore, JAXPORT Jacksonville, and the Port of Los Angeles. Each port has specific terminal hours, delivery requirements, and documentation needs. Your transport broker should be experienced with port deliveries and coordinate the terminal appointment on your behalf.
        </p>
        <p className={styles.p}>
          For export shipments, you will need additional documentation beyond the gate pass and title. This typically includes export documentation, port delivery orders, and in some cases EPA/DOT compliance forms. Working with a broker who specializes in auction-to-port transport, like Y7 Logistics, ensures that all documentation and scheduling is handled correctly so your vehicle arrives at the port ready for loading onto the vessel.
        </p>
        <p className={styles.p}>
          Timing is especially important for port deliveries. You need to coordinate the overland transport with the vessel's cutoff date. If your vehicle arrives at the port after the cutoff, it will miss the sailing and you will incur terminal storage fees while waiting for the next available vessel. A knowledgeable broker will work backward from the vessel schedule to ensure your vehicle is picked up and delivered with sufficient lead time.
        </p>

        {/* CTA — the page's one closing board moment */}
        <div className={styles.ctaBlock}>
          <h2 className={styles.ctaTitle}>
            Ready to Ship Your Auction Vehicle?
          </h2>
          <p className={styles.ctaSubtitle}>
            Y7 Logistics specializes in auction-to-door and auction-to-port auto transport. Get a free quote in minutes.
          </p>
          <Link to="/quote" className={styles.ctaBtn}>
            Get a Free Quote
          </Link>
        </div>

        {/* Related Pages */}
        <div className={styles.relatedBlock}>
          <h3 className={styles.relatedHeading}>
            Related Pages
          </h3>
          <div className={styles.relatedPills}>
            {[
              { label: 'Copart Shipping', to: '/copart-shipping' },
              { label: 'IAAI Transport', to: '/iaai-transport' },
              { label: 'Manheim Transport', to: '/manheim-transport' },
              { label: 'Auction Car Shipping', to: '/auction-car-shipping' },
              { label: 'Open vs Enclosed Transport', to: '/open-vs-enclosed-auto-transport' },
              { label: 'What Is a Bill of Lading?', to: '/what-is-a-bill-of-lading' },
            ].map((link, i) => (
              <Link key={i} to={link.to} className={styles.relatedPill}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
