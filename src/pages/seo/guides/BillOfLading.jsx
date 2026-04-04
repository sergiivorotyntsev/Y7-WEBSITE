import { Link } from 'react-router-dom';
import PageMeta from '../../../components/PageMeta';
import { colors, fonts, button as btnStyles } from '../../../theme';

const h2Style = {
  fontFamily: fonts.serif,
  fontSize: '22px',
  fontWeight: 700,
  color: colors.text,
  marginBottom: '16px',
  marginTop: '48px',
};

const pStyle = {
  fontFamily: fonts.sans,
  fontSize: '15px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '16px',
};

const liStyle = {
  fontFamily: fonts.sans,
  fontSize: '14px',
  color: colors.textMuted,
  lineHeight: 1.7,
  marginBottom: '8px',
};

export default function BillOfLading() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>
      <PageMeta
        title="What Is a Bill of Lading (BOL) in Auto Transport? | Y7 Logistics"
        description="Understanding the Bill of Lading in vehicle shipping. What it includes, why it matters, and how to use it to protect yourself during auto transport."
        path="/what-is-a-bill-of-lading"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{
        fontFamily: fonts.sans, fontSize: '13px', color: colors.textMuted,
        marginBottom: '24px',
      }}>
        <Link to="/" style={{ color: colors.textMuted }}>Home</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <Link to="/services" style={{ color: colors.textMuted }}>Services</Link>
        <span style={{ margin: '0 6px' }}>/</span>
        <span style={{ color: colors.text }}>What Is a Bill of Lading</span>
      </nav>

      {/* H1 */}
      <h1 style={{
        fontFamily: fonts.serif,
        fontSize: 'clamp(28px, 4vw, 40px)',
        fontWeight: 700,
        color: colors.text,
        marginBottom: '16px',
        lineHeight: 1.2,
      }}>
        What Is a Bill of Lading (BOL) in Auto Transport?
      </h1>

      {/* Intro */}
      <p style={{ ...pStyle, fontSize: '16px', marginBottom: '48px' }}>
        The Bill of Lading, commonly abbreviated as BOL, is the single most important document in any auto transport shipment. It serves as a legal contract between the shipper and the carrier, and it is your primary evidence if anything goes wrong during transport. Whether you are shipping a daily driver across the state or an auction vehicle to a port for export, understanding the BOL protects you and your investment.
      </p>

      {/* Definition */}
      <h2 style={h2Style}>Definition: What Exactly Is a Bill of Lading?</h2>
      <p style={pStyle}>
        A Bill of Lading is a legal document created at the time of vehicle pickup that records the condition of the vehicle and the terms of transport. It is signed by both the carrier (driver) and the shipper (or the shipper's representative at the pickup location). The BOL travels with the vehicle and is presented again at delivery, where the receiving party inspects the vehicle and signs to acknowledge receipt.
      </p>
      <p style={pStyle}>
        In auto transport, the BOL functions as three things simultaneously: a receipt confirming that the carrier has taken possession of the vehicle, a contract outlining the terms of the transport agreement, and a condition report documenting the vehicle's state at both pickup and delivery. This triple function makes it the cornerstone of any damage claim or dispute resolution process.
      </p>

      {/* What's on a BOL */}
      <h2 style={h2Style}>What Information Is on a Bill of Lading?</h2>
      <p style={pStyle}>
        A standard auto transport Bill of Lading includes the following information:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li style={liStyle}><strong>Vehicle information:</strong> Year, make, model, color, VIN (Vehicle Identification Number), and odometer reading.</li>
        <li style={liStyle}><strong>Origin and destination:</strong> The pickup address and the delivery address, including contact names and phone numbers for both locations.</li>
        <li style={liStyle}><strong>Condition at pickup:</strong> A detailed diagram or checklist noting any existing damage, scratches, dents, missing parts, or mechanical issues observed at the time of loading.</li>
        <li style={liStyle}><strong>Condition at delivery:</strong> The same diagram or checklist, updated at delivery to reflect the vehicle's condition when unloaded from the carrier.</li>
        <li style={liStyle}><strong>Signatures:</strong> The driver's signature at pickup, the shipper's signature at pickup, the driver's signature at delivery, and the receiver's signature at delivery.</li>
        <li style={liStyle}><strong>Carrier information:</strong> The carrier company name, USDOT number, MC number, and driver name.</li>
        <li style={liStyle}><strong>Dates:</strong> The date and time of pickup and the date and time of delivery.</li>
        <li style={liStyle}><strong>Special notes:</strong> Any special instructions, vehicle operability status (running or non-running), and any observations made by the driver or shipper.</li>
      </ul>

      {/* Why It Matters */}
      <h2 style={h2Style}>Why the Bill of Lading Matters</h2>
      <p style={pStyle}>
        The BOL is your proof of condition. If damage occurs during transport, the BOL is the primary piece of evidence used to determine liability. Insurance companies, brokers, and carriers all rely on the BOL to assess damage claims. Without a properly documented BOL, proving that damage occurred during transport rather than before becomes extremely difficult, if not impossible.
      </p>
      <p style={pStyle}>
        Think of the BOL as a before-and-after snapshot of your vehicle. The pickup condition report establishes the baseline. The delivery condition report shows the result. Any discrepancy between the two is the carrier's responsibility. This is why thorough, accurate documentation at both stages is critical.
      </p>

      {/* What to Look for at Pickup */}
      <h2 style={h2Style}>What to Look for at Pickup</h2>
      <p style={pStyle}>
        When the carrier arrives to pick up your vehicle, you or your representative should be present for the inspection. The driver will walk around the vehicle and note its condition on the BOL. You should walk around with the driver and actively participate in this inspection. Here is what to do:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li style={liStyle}><strong>Walk the entire vehicle.</strong> Check every panel, bumper, fender, hood, roof, and trunk. Look at the wheels, tires, mirrors, and glass.</li>
        <li style={liStyle}><strong>Note every piece of existing damage.</strong> Even minor scratches, small dents, rock chips, and scuffs should be recorded on the BOL. If the driver does not note something you see, ask them to add it.</li>
        <li style={liStyle}><strong>Take your own photographs.</strong> Photograph the vehicle from all four corners, each side, the front, the rear, the roof, and any specific areas of existing damage. Include close-ups. Timestamp your photos if possible.</li>
        <li style={liStyle}><strong>Check that the VIN and vehicle details are correct.</strong> Verify that the VIN, year, make, model, and color on the BOL match your vehicle exactly.</li>
        <li style={liStyle}><strong>Note operability.</strong> Confirm whether the vehicle is marked as operable or inoperable on the BOL.</li>
        <li style={liStyle}><strong>Sign the BOL only after you are satisfied</strong> that all existing damage has been accurately documented. Your signature confirms that you agree with the condition report.</li>
      </ul>

      {/* What to Look for at Delivery */}
      <h2 style={h2Style}>What to Look for at Delivery</h2>
      <p style={pStyle}>
        The delivery inspection is equally important. When the carrier arrives with your vehicle, repeat the same thorough inspection process before signing the delivery BOL. Here is the procedure:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li style={liStyle}><strong>Walk the entire vehicle again.</strong> Inspect every panel and surface just as you did at pickup.</li>
        <li style={liStyle}><strong>Compare to the pickup BOL.</strong> Look at the damage notes from pickup and verify that no new damage has appeared. The driver should have a copy of the pickup BOL for comparison.</li>
        <li style={liStyle}><strong>Note any new damage immediately.</strong> If you see any damage that was not on the pickup BOL, write it clearly on the delivery BOL before signing. Be specific: "New 3-inch scratch on driver rear door" is better than "scratch on side."</li>
        <li style={liStyle}><strong>Take photographs again.</strong> Photograph the vehicle from all angles at delivery, including close-ups of any new damage you have noted.</li>
        <li style={liStyle}><strong>Do not let the driver rush you.</strong> Some drivers may be in a hurry to move to their next delivery. Take the time you need to do a thorough inspection. Once you sign the delivery BOL, it becomes much harder to claim damage occurred during transport.</li>
      </ul>

      {/* If There's Damage */}
      <h2 style={h2Style}>If There Is Damage: What to Do</h2>
      <p style={pStyle}>
        If you discover new damage at delivery that was not documented on the pickup BOL, take the following steps immediately:
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li style={liStyle}><strong>Note it on the delivery BOL.</strong> Write a clear, specific description of the damage on the BOL before signing. Do not sign the BOL as "received in good condition" if there is new damage.</li>
        <li style={liStyle}><strong>Take detailed photographs.</strong> Photograph the new damage from multiple angles, including wide shots that show the damage in context and close-ups that show the detail.</li>
        <li style={liStyle}><strong>Contact your broker immediately.</strong> Call or email your transport broker (Y7 Logistics) as soon as you discover the damage. We will initiate the claims process with the carrier on your behalf.</li>
        <li style={liStyle}><strong>File a claim within 48 hours.</strong> Most carrier insurance policies require that damage claims be filed within a specific timeframe, typically 48 hours of delivery. Delaying your claim can jeopardize your ability to recover damages.</li>
        <li style={liStyle}><strong>Preserve all documentation.</strong> Keep the signed BOL (both pickup and delivery copies), all photographs, and any written communication with the broker and carrier. This documentation package is what the insurance company will review.</li>
      </ul>
      <p style={pStyle}>
        The claims process can take time, but having a well-documented BOL with clear condition notes and photographs dramatically strengthens your position. Carriers and their insurance companies take claims seriously when the evidence is clear and well-organized.
      </p>

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        padding: '40px 0',
        borderTop: `1px solid ${colors.border}`,
        marginTop: '48px',
      }}>
        <h2 style={{
          fontFamily: fonts.serif,
          fontSize: '22px',
          fontWeight: 700,
          color: colors.text,
          marginBottom: '8px',
        }}>
          Ship with Confidence
        </h2>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: '14px',
          color: colors.textMuted,
          marginBottom: '24px',
          lineHeight: 1.6,
        }}>
          Y7 Logistics uses verified, insured carriers and ensures proper BOL documentation on every shipment. Get a free quote today.
        </p>
        <Link to="/quote" style={{
          ...btnStyles.accent,
          display: 'inline-block',
          padding: '14px 32px',
          fontSize: '13px',
          textDecoration: 'none',
          borderRadius: '24px',
        }}>
          Get a Free Quote
        </Link>
      </div>

      {/* Related Pages */}
      <div style={{
        borderTop: `1px solid ${colors.border}`,
        paddingTop: '32px',
      }}>
        <h3 style={{
          fontFamily: fonts.sans, fontSize: '13px', fontWeight: 600, color: colors.text,
          textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px',
        }}>
          Related Pages
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { label: 'How to Ship an Auction Car', to: '/how-to-ship-a-car-bought-at-auction' },
            { label: 'Open vs Enclosed Transport', to: '/open-vs-enclosed-auto-transport' },
            { label: 'Car Shipping Cost', to: '/car-shipping-cost' },
            { label: 'Copart Shipping', to: '/copart-shipping' },
            { label: 'IAAI Transport', to: '/iaai-transport' },
          ].map((link, i) => (
            <Link key={i} to={link.to} style={{
              fontFamily: fonts.sans,
              fontSize: '13px',
              color: colors.accent,
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: '20px',
              padding: '8px 16px',
              textDecoration: 'none',
            }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
