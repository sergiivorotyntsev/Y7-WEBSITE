import React from 'react';
import { Link } from 'react-router-dom';

export default function DealerAuctionPickupGuide({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Every week, independent and franchise dealers lose money not on the vehicles they buy at auction, but on
        the logistics that follow. The car you won at Manheim or ADESA for a competitive margin can quietly erode
        that profit through storage fees, dry run charges, and dispatch delays before it ever reaches your lot. The
        difference between dealers who consistently turn auction inventory profitably and those who bleed margin
        on transport comes down to a handful of operational details that most people overlook.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Gate Pass Problem Nobody Talks About
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Here is the scenario that plays out more often than any dealer wants to admit: your carrier dispatches a
        driver, the truck arrives at the auction facility, and the driver cannot get the vehicle released because
        there is no gate pass on file. The result is a dry run fee — typically $150 to $350 depending on the
        facility and distance — and your vehicle sits for another cycle while the paperwork gets sorted out.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Gate pass authorization is the single most common point of failure in auction-to-dealer transport. Each
        auction house has its own release process: some issue gate passes via email, others require buyer portal
        action, and a few still rely on faxed authorization forms. When a broker or dispatcher does not confirm
        release authorization before sending a truck, you pay for the mistake.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          Y7 auto-extracts gate pass details directly from auction confirmation emails during intake. By the time
          a carrier is assigned, gate pass authorization is already verified and attached to the load — eliminating
          the most common cause of dry run fees.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The "Runs and Drives" Myth
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Auction condition reports are a starting point, not a guarantee. A vehicle listed as "runs and drives"
        means it started and moved under its own power at the time of inspection. It does not mean the battery
        will hold a charge two weeks later when the carrier shows up. It does not mean the tires are inflated.
        It does not account for fluids that have drained or a starter motor that gave out while the car sat on a
        storage lot waiting for pickup.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        When a driver arrives expecting an operable vehicle and discovers it is inoperable, the load changes.
        The original truck may not have a winch or the right equipment. A rescheduled pickup with the correct
        equipment costs more, and the storage clock keeps ticking. Smart dealers account for this by flagging
        vehicles that have been sitting for more than a week and requesting an inoperable-ready carrier upfront.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Y7 cross-references every VIN against NHTSA safety data to flag open recalls and known issues before
        dispatch. This does not replace a physical check, but it reduces the chance of a surprise at the gate
        when a recall-affected component has rendered the vehicle non-driveable.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Storage Fees: The Silent Margin Killer
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Most dealers understand that auction lots charge storage, but few calculate the actual annual cost. Copart
        and IAA typically offer 3 to 5 free days after purchase, then charge <strong style={{ color: theme.accent }}>$15 to $40 per day</strong> depending
        on the facility and vehicle size. For a dealer moving 20 vehicles per month, even an average of 4 extra
        storage days per vehicle at $25/day adds up to roughly <strong style={{ color: theme.accent }}>$30,000 per year</strong> in
        pure waste.
      </p>

      <div style={{ borderLeft: `4px solid ${theme.accent}`, padding: '16px 24px', margin: '24px 0', background: 'rgba(153,60,29,0.04)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: theme.text }}>
        Speed of dispatch is the single biggest cost lever in auction transport. Every day between purchase and
        pickup is a day of storage fees, opportunity cost on your capital, and one less day on your lot turning
        that vehicle into revenue.
      </div>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The math is straightforward: if you can shave two days off your average pickup time across your monthly
        volume, the savings compound fast. This is why automated dispatch — where load creation, carrier matching,
        and gate pass verification happen within hours rather than days — directly impacts your bottom line.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Volume Pricing and Contract Rates
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        If you are moving <strong style={{ color: theme.accent }}>10 or more vehicles per month</strong>, you
        should not be paying spot-market rates on every load. Volume creates predictability for carriers, and
        predictability translates into fixed contract rates that are consistently lower than one-off pricing. The
        savings typically range from 8% to 15% per vehicle depending on lane consistency.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Y7 Agency (MC #1741537, USDOT #4427359) structures volume agreements for dealers who commit to regular
        lanes. Rather than renegotiating each load, you get a rate card that reflects your actual shipping
        patterns, with priority dispatch built in.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        What a Modern Dealer Portal Looks Like
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The days of tracking your transport loads via email threads and phone calls are ending. A proper dealer
        portal gives you a single view of every vehicle in transit: current status, carrier information, estimated
        delivery, and document access. You can see where your money is going and where your vehicles are without
        placing a single call.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Y7 is building a self-service dealer portal with exactly this in mind — full visibility into every
        load, document access, and direct communication channels. If you want early access or want to discuss
        volume pricing for your dealership, visit our{' '}
        <Link to="/dealers" style={{ color: theme.accent, textDecoration: 'underline' }}>dealer services page</Link>{' '}
        or reach out directly via Telegram at <strong>@y7dispatch_bot</strong>.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          Auction transport profitability is not about finding the cheapest carrier. It is about eliminating the
          delays, rework, and storage fees that accumulate between the moment you win a bid and the moment that
          vehicle is on your lot ready for sale.
        </p>
      </div>
    </article>
  );
}
