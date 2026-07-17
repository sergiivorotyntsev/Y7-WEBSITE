import { Link } from 'react-router-dom';
import PageMeta from '../../../components/PageMeta';
import styles from './GuidePage.module.css';

// DESIGN-V2-W5-T06: V2 "Dispatch Board" restyle. All heading texts/levels/
// order and copy are byte-identical to V1; shells + tokens only.

export default function BillOfLading() {
  return (
    <div className={styles.page}>
      <PageMeta
        title="What Is a Bill of Lading?"
        description="Understanding the Bill of Lading in vehicle shipping. What it includes, why it matters, and how to use it to protect yourself during auto transport."
        path="/what-is-a-bill-of-lading"
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
            <span className={styles.crumbCurrent}>What Is a Bill of Lading</span>
          </nav>

          <span className={styles.kicker}>Documentation guide</span>

          {/* H1 */}
          <h1 className={styles.h1}>
            What Is a Bill of Lading (BOL) in Auto Transport?
          </h1>
        </div>
      </section>

      <div className={styles.body}>
        {/* Intro */}
        <p className={styles.intro}>
          The Bill of Lading, commonly abbreviated as BOL, is the single most important document in any auto transport shipment. It serves as a legal contract between the shipper and the carrier, and it is your primary evidence if anything goes wrong during transport. Whether you are shipping a daily driver across the state or an auction vehicle to a port for export, understanding the BOL protects you and your investment.
        </p>

        {/* Definition */}
        <h2 className={styles.h2}>Definition: What Exactly Is a Bill of Lading?</h2>
        <p className={styles.p}>
          A Bill of Lading is a legal document created at the time of vehicle pickup that records the condition of the vehicle and the terms of transport. It is signed by both the carrier (driver) and the shipper (or the shipper's representative at the pickup location). The BOL travels with the vehicle and is presented again at delivery, where the receiving party inspects the vehicle and signs to acknowledge receipt.
        </p>
        <p className={styles.p}>
          In auto transport, the BOL functions as three things simultaneously: a receipt confirming that the carrier has taken possession of the vehicle, a contract outlining the terms of the transport agreement, and a condition report documenting the vehicle's state at both pickup and delivery. This triple function makes it the cornerstone of any damage claim or dispute resolution process.
        </p>

        {/* What's on a BOL */}
        <h2 className={styles.h2}>What Information Is on a Bill of Lading?</h2>
        <p className={styles.p}>
          A standard auto transport Bill of Lading includes the following information:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Vehicle information:</strong> Year, make, model, color, VIN (Vehicle Identification Number), and odometer reading.</li>
          <li className={styles.listItem}><strong>Origin and destination:</strong> The pickup address and the delivery address, including contact names and phone numbers for both locations.</li>
          <li className={styles.listItem}><strong>Condition at pickup:</strong> A detailed diagram or checklist noting any existing damage, scratches, dents, missing parts, or mechanical issues observed at the time of loading.</li>
          <li className={styles.listItem}><strong>Condition at delivery:</strong> The same diagram or checklist, updated at delivery to reflect the vehicle's condition when unloaded from the carrier.</li>
          <li className={styles.listItem}><strong>Signatures:</strong> The driver's signature at pickup, the shipper's signature at pickup, the driver's signature at delivery, and the receiver's signature at delivery.</li>
          <li className={styles.listItem}><strong>Carrier information:</strong> The carrier company name, USDOT number, MC number, and driver name.</li>
          <li className={styles.listItem}><strong>Dates:</strong> The date and time of pickup and the date and time of delivery.</li>
          <li className={styles.listItem}><strong>Special notes:</strong> Any special instructions, vehicle operability status (running or non-running), and any observations made by the driver or shipper.</li>
        </ul>

        {/* Why It Matters */}
        <h2 className={styles.h2}>Why the Bill of Lading Matters</h2>
        <p className={styles.p}>
          The BOL is your proof of condition. If damage occurs during transport, the BOL is the primary piece of evidence used to determine liability. Insurance companies, brokers, and carriers all rely on the BOL to assess damage claims. Without a properly documented BOL, proving that damage occurred during transport rather than before becomes extremely difficult, if not impossible.
        </p>
        <p className={styles.p}>
          Think of the BOL as a before-and-after snapshot of your vehicle. The pickup condition report establishes the baseline. The delivery condition report shows the result. Any discrepancy between the two is the carrier's responsibility. This is why thorough, accurate documentation at both stages is critical.
        </p>

        {/* What to Look for at Pickup */}
        <h2 className={styles.h2}>What to Look for at Pickup</h2>
        <p className={styles.p}>
          When the carrier arrives to pick up your vehicle, you or your representative should be present for the inspection. The driver will walk around the vehicle and note its condition on the BOL. You should walk around with the driver and actively participate in this inspection. Here is what to do:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Walk the entire vehicle.</strong> Check every panel, bumper, fender, hood, roof, and trunk. Look at the wheels, tires, mirrors, and glass.</li>
          <li className={styles.listItem}><strong>Note every piece of existing damage.</strong> Even minor scratches, small dents, rock chips, and scuffs should be recorded on the BOL. If the driver does not note something you see, ask them to add it.</li>
          <li className={styles.listItem}><strong>Take your own photographs.</strong> Photograph the vehicle from all four corners, each side, the front, the rear, the roof, and any specific areas of existing damage. Include close-ups. Timestamp your photos if possible.</li>
          <li className={styles.listItem}><strong>Check that the VIN and vehicle details are correct.</strong> Verify that the VIN, year, make, model, and color on the BOL match your vehicle exactly.</li>
          <li className={styles.listItem}><strong>Note operability.</strong> Confirm whether the vehicle is marked as operable or inoperable on the BOL.</li>
          <li className={styles.listItem}><strong>Sign the BOL only after you are satisfied</strong> that all existing damage has been accurately documented. Your signature confirms that you agree with the condition report.</li>
        </ul>

        {/* What to Look for at Delivery */}
        <h2 className={styles.h2}>What to Look for at Delivery</h2>
        <p className={styles.p}>
          The delivery inspection is equally important. When the carrier arrives with your vehicle, repeat the same thorough inspection process before signing the delivery BOL. Here is the procedure:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Walk the entire vehicle again.</strong> Inspect every panel and surface just as you did at pickup.</li>
          <li className={styles.listItem}><strong>Compare to the pickup BOL.</strong> Look at the damage notes from pickup and verify that no new damage has appeared. The driver should have a copy of the pickup BOL for comparison.</li>
          <li className={styles.listItem}><strong>Note any new damage immediately.</strong> If you see any damage that was not on the pickup BOL, write it clearly on the delivery BOL before signing. Be specific: "New 3-inch scratch on driver rear door" is better than "scratch on side."</li>
          <li className={styles.listItem}><strong>Take photographs again.</strong> Photograph the vehicle from all angles at delivery, including close-ups of any new damage you have noted.</li>
          <li className={styles.listItem}><strong>Do not let the driver rush you.</strong> Some drivers may be in a hurry to move to their next delivery. Take the time you need to do a thorough inspection. Once you sign the delivery BOL, it becomes much harder to claim damage occurred during transport.</li>
        </ul>

        {/* If There's Damage */}
        <h2 className={styles.h2}>If There Is Damage: What to Do</h2>
        <p className={styles.p}>
          If you discover new damage at delivery that was not documented on the pickup BOL, take the following steps immediately:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Note it on the delivery BOL.</strong> Write a clear, specific description of the damage on the BOL before signing. Do not sign the BOL as "received in good condition" if there is new damage.</li>
          <li className={styles.listItem}><strong>Take detailed photographs.</strong> Photograph the new damage from multiple angles, including wide shots that show the damage in context and close-ups that show the detail.</li>
          <li className={styles.listItem}><strong>Contact your broker immediately.</strong> Call or email your transport broker (Y7 Logistics) as soon as you discover the damage. We will initiate the claims process with the carrier on your behalf.</li>
          <li className={styles.listItem}><strong>File a claim within 48 hours.</strong> Most carrier insurance policies require that damage claims be filed within a specific timeframe, typically 48 hours of delivery. Delaying your claim can jeopardize your ability to recover damages.</li>
          <li className={styles.listItem}><strong>Preserve all documentation.</strong> Keep the signed BOL (both pickup and delivery copies), all photographs, and any written communication with the broker and carrier. This documentation package is what the insurance company will review.</li>
        </ul>
        <p className={styles.p}>
          The claims process can take time, but having a well-documented BOL with clear condition notes and photographs dramatically strengthens your position. Carriers and their insurance companies take claims seriously when the evidence is clear and well-organized.
        </p>

        {/* CTA — the page's one closing board moment */}
        <div className={styles.ctaBlock}>
          <h2 className={styles.ctaTitle}>
            Ship with Confidence
          </h2>
          <p className={styles.ctaSubtitle}>
            Y7 Logistics uses verified, insured carriers and ensures proper BOL documentation on every shipment. Get a free quote today.
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
              { label: 'BOL Checks at Pickup & Delivery', to: '/blog/bill-of-lading-pickup-delivery-guide' },
              { label: 'How to Ship an Auction Car', to: '/how-to-ship-a-car-bought-at-auction' },
              { label: 'Open vs Enclosed Transport', to: '/open-vs-enclosed-auto-transport' },
              { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
              { label: 'Copart Shipping', to: '/copart-shipping' },
              { label: 'IAAI Transport', to: '/iaai-transport' },
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
