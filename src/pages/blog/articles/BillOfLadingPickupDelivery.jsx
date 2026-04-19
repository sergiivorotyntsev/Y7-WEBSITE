import React from 'react';
import { Link } from 'react-router-dom';

export default function BillOfLadingPickupDelivery({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The Bill of Lading is the single most important piece of paper in any auto transport
        shipment. It is the contract, the receipt, the condition record, and the claim foundation.
        Most customers sign it without reading it at pickup, then sign it again at delivery with
        the same lack of attention — and then discover too late that they've signed away their
        ability to contest damage. This is the full field guide to using a BOL properly.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        What a BOL Is (and Isn't)
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Legally, a Bill of Lading is four things simultaneously: (1) a contract between shipper and
        carrier, (2) a receipt that the carrier took possession of the vehicle, (3) a condition
        record at the time of pickup, and (4) in some cases, a negotiable title document that
        transfers with physical custody. Understanding these four functions helps explain why every
        single line item matters.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        A BOL is <strong>not</strong> an insurance policy. It records the vehicle's condition but
        does not by itself cover damages. Coverage comes from the carrier's cargo insurance, which
        the BOL only references. Don't conflate the two.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Pickup Inspection — 12 Things to Check
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Before signing the pickup BOL, walk the vehicle with the driver and verify:
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        (1) VIN on the dash matches the VIN on the paperwork.<br />
        (2) Odometer reading is recorded accurately.<br />
        (3) All four panels (hood, doors, trunk/liftgate) are photographed with date-stamped photos.<br />
        (4) Any existing scratches, dings, and dents are marked on the vehicle diagram on the BOL.<br />
        (5) Wheels are photographed — curb rash and prior damage are disputed most often.<br />
        (6) Windshield is checked for chips or cracks and noted.<br />
        (7) Interior is photographed if visible — upholstery tears, dashboard cracks.<br />
        (8) Undercarriage scrapes that are visible are noted (often missed, often disputed).<br />
        (9) Fluid levels (oil, coolant, transmission) if you can open the hood quickly.<br />
        (10) Tire tread is photographed — tire damage disputes happen.<br />
        (11) Any missing equipment (spare tire, wheel lugs, keys) is noted.<br />
        (12) Both signatures are dated and legible.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Vehicle Condition Notations
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        BOLs use a vehicle diagram with arrows pointing to damage locations and letter codes:
        S (scratch), D (dent), C (chip), R (rust), BR (broken), CR (cracked), M (missing). A
        pre-existing scratch on the left rear panel might be noted as "LR — S, 4 inches, paint
        intact." A dent on the hood: "HD — D, 1 inch, golf-ball size."
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The purpose is to distinguish pre-existing damage from transit damage. If the BOL shows a
        scratch at pickup and the same scratch at delivery, there's no claim. If the BOL shows a
        scratch at pickup and a new scratch at delivery that wasn't there before, you have a clear
        claim against the carrier's insurance.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Common Pickup Mistakes
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Signing at night when you can't see the vehicle clearly.</strong> Drivers sometimes
        arrive after dark. If you can't see the full vehicle in good lighting, note "inspection
        deferred to daylight, photos taken at delivery" on the BOL. Then take daytime delivery
        photos the next morning.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Accepting a filthy vehicle without washing first.</strong> If the car is covered in
        road dirt or mud, scratches beneath are invisible. Either wash before pickup or note
        "vehicle dirty at pickup, existing damage may be obscured" on the BOL.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Not photographing anything.</strong> Written notations are evidence, but photos
        are stronger evidence. Take dated photos of every panel and every pre-existing damage
        notation. Keep them in a dedicated folder with the BOL PDF.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          If damage is not noted on the BOL at delivery, you effectively have no claim. Most cargo
          insurance policies require notation at the time of delivery — discoveries made days later
          are routinely denied. The two minutes you spend walking the car before signing is the
          most valuable two minutes of the entire shipment.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Delivery Inspection — When the Clock Starts
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Delivery is where claim rights are preserved or lost. Walk the vehicle in natural daylight
        (or under strong lights if unavoidable at night). Compare to the pickup BOL notations. Any
        new damage goes on the delivery BOL with a photo attached and a specific description — not
        "dent on hood" but "2-inch dent on hood, right side, approximately 6 inches from windshield,
        paint intact."
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        If the driver refuses to wait for a thorough inspection, note "driver declined to wait for
        inspection — signed under protest" on the BOL. This preserves your claim position.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The 5-Minute Rule
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Once you sign a clean BOL at delivery, you have effectively acknowledged that the vehicle
        arrived in the condition the pickup BOL described. Later claims for damage not noted at
        delivery are extremely difficult to win. The carrier's insurance routinely denies them
        because there's no documentary evidence that the damage occurred in transit versus later.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Some owners discover damage only when they wash the vehicle or pull it into a well-lit
        garage. If that happens, call the carrier immediately — within 24 hours is best — and
        document with photos. Some policies have a 7-day post-delivery window for latent damage
        claims, but coverage is much weaker than for damage noted at delivery.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Digital vs Paper BOL
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Most carriers now use tablet-based digital BOLs. The legal weight is identical to paper.
        Make sure you receive a copy of the signed document by email before the driver leaves —
        if the system requires them to complete the record back at the truck stop, get a
        confirmation number and a promise of email delivery within 24 hours. If it doesn't arrive,
        that's a problem worth escalating.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        When to Refuse Delivery
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        In rare cases, damage is severe enough to refuse delivery entirely. This is an extreme
        step — the vehicle remains in carrier custody, insurance claims escalate, and the resolution
        drags out. But if the vehicle arrives with structural damage, heavy fluid loss, or evidence
        the cargo straps failed during transit, refusing delivery preserves your claim strength
        and forces a direct insurance negotiation.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        For typical scratch-level damage, do not refuse — accept delivery, note the damage on the
        BOL, photograph thoroughly, and file a standard claim. Refusal is for catastrophic cases
        only.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The BOL is not paperwork to be rushed through — it's the document that determines whether
        you can recover costs if something goes wrong. Take 5 extra minutes at both ends and you
        eliminate 90% of the claim disputes that haunt auto transport customers. See <Link to="/ship-my-car" style={{ color: theme.accent, fontWeight: 600 }}>
        our ship-my-car page</Link> for the end-to-end process, or the <Link to="/what-is-a-bill-of-lading" style={{ color: theme.accent, fontWeight: 600 }}>
        dedicated BOL explainer</Link> for additional technical detail.
      </p>
    </article>
  );
}
