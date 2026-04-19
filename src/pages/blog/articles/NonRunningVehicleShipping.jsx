import React from 'react';
import { Link } from 'react-router-dom';

export default function NonRunningVehicleShipping({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Shipping a vehicle that does not run its own wheels onto a trailer is an entirely different
        operational discipline from standard auto transport. Different equipment, different carriers,
        different pricing, and a much longer list of ways the pickup can fail. Dealers working
        salvage inventory, rebuilders, and individuals moving project cars or accident vehicles all
        run into the same gaps — usually on the day of pickup when it is too late to fix them.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        What "Inoperable" Actually Means to a Carrier
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Auction condition reports use "inoperable" (often shortened to "inop") as a binary flag. A
        carrier hears it and immediately asks three follow-up questions that the broker or customer
        needs to answer: does it roll? does it steer? does it brake? Each "no" disqualifies a subset
        of carriers and changes pricing.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Three Categories of Inoperable
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Rolls and steers — but engine won't start.</strong> This is the easy case. Any carrier
        with a hydraulic winch can pull the vehicle up the trailer ramps. Adds $100–$150 to the base
        rate. Most open-trailer carriers handle this daily.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Rolls but does not steer (seized steering or front-end damage).</strong> Winch still
        works, but the driver can't line the wheels up on the ramps. Requires a flatbed/roll-back
        carrier that can load the vehicle from the rear or side, or a multi-car hauler with wide
        loading planks. Adds $175–$275.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Does not roll at all (missing wheels, seized axles, crushed suspension).</strong>
        Forklift loading required. Dramatically smaller carrier pool — maybe 10–15% of the active
        market carries forklift-capable equipment. Adds $200–$400 and often requires 3–7 extra days
        of dispatch lead time.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Equipment Required
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Hydraulic winches are standard on about 60% of active open-trailer carriers. They pull
        non-starting but rolling vehicles up the ramps using a cable attached to the tow hook or the
        frame. Winches have a 10,000–15,000 lb rating — fine for any passenger vehicle but
        insufficient for loaded pickups or commercial trucks.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Hydraulic liftgates — the flat platform that lowers to the ground — are on a much smaller
        subset of carriers, typically 15% of the market. They handle low-clearance vehicles and
        vehicles that won't roll onto a ramp.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Forklift-capable flatbeds are the specialty tier. These carriers have hydraulic rails or
        work with ground-based forklifts at pickup. Used for fully seized vehicles, crushed
        suspension, or any "shell" car where the drivetrain is partially removed.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Tie-downs on inop vehicles require extra care. Wheel-net straps work the same as on operational
        cars, but if the vehicle has suspension damage the driver may need to use chain binders on
        the frame — which requires a knowledgeable driver and careful frame positioning.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Why Inop Loads Cost More
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Three reasons: slower loading (a winch pull takes 15–25 minutes vs. 5 for an operational
        vehicle), higher operational risk (winch cable failures, lift hydraulic failures, roll-off
        during loading), and smaller carrier pool which reduces competitive bidding. The premium —
        typically $100–$300 over the base open-trailer rate — is a real operating-cost difference,
        not broker markup.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          The single biggest cause of surprise fees on inop loads is misdeclared condition at quote
          time. A vehicle booked as "operational" that turns out to need a winch at pickup triggers a
          dry-run fee plus a re-dispatch — adding <strong style={{ color: theme.accent }}>$200–$500</strong> and
          3–5 extra days. Describe the vehicle honestly upfront, including any known mechanical
          concerns that might prevent starting.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Common Mistakes That Trigger Surprise Fees
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>The "runs and drives per auction report" trap.</strong> That description reflects the
        vehicle's state when the auction inspected it — often weeks or months before you won it.
        Batteries die sitting in storage. Tires lose pressure. Starters fail on vehicles that have
        sat in hot climates. Treat any auction-source vehicle as condition-uncertain and pay a
        small operational premium to book a winch-capable carrier instead of a dry-run fee to send
        the standard one back.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Failing to mention missing wheels.</strong> A vehicle wearing two wheels instead of
        four cannot be winched. It must be forklifted. If you don't declare this upfront, the
        assigned carrier arrives, refuses the load, and you pay for both dry run and re-dispatch.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Frame damage that the auction photos don't clearly show.</strong> If the tie-down
        points are damaged, carriers may refuse to accept the load entirely for liability reasons.
        Disclose it.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        How to Properly Communicate Vehicle Condition
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Provide specific answers to: Does it start? Does it roll freely? Does it steer? Do all four
        wheels have air in functional tires? Are the brakes functional enough to stop the vehicle
        rolling down a ramp? Are there any frame or suspension modifications or damage?
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        If you don't know — say so. "Condition uncertain, last started 3 weeks ago, recommend
        winch-capable carrier" is a perfectly valid instruction and carriers appreciate the honesty.
        It also gets you a correctly-equipped carrier on the first dispatch instead of the second.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The "Runs and Drives" Problem at Auctions
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Copart and IAA condition reports are point-in-time snapshots. A vehicle that was "runs and
        drives" when a yard auctioneer inspected it in March may be a three-week-dead-battery,
        flat-tire, seized-starter disaster by the time you pick it up in late April. Auctions don't
        re-verify before release — they take a gate pass fee and open the exit gate.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Experienced dealers treat every auction "runs and drives" notation as "might run and drive,
        book a winch-capable carrier anyway." The marginal cost of booking winch-capable vs. standard
        open is $50–$100. The cost of a dry run because you assumed operational is $200–$500 plus
        days of delay. Always pay the small premium.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        How We Verify Carrier Capability
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Before assigning an inop load, we confirm equipment on the carrier's side — not just the rate.
        Is there a winch on the truck? What weight rating? Forklift-capable? Liftgate? We ask specifically
        and we verify against prior loads we've run with that carrier. A listing can say "inop OK" but
        the equipment on the physical truck is what matters at pickup.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Non-running vehicle transport is a specialty lane and it deserves specialty attention. See
        <Link to="/salvage-car-shipping" style={{ color: theme.accent, fontWeight: 600 }}> our salvage
        car shipping page</Link> for detailed workflows on Copart and IAAI pickups, or
        <Link to="/dealers" style={{ color: theme.accent, fontWeight: 600 }}> the dealer program</Link>
        if you're running inop volume and want rate-card pricing instead of per-load quotes. The
        discipline is the same either way: describe the vehicle accurately, book the right equipment,
        budget for the premium.
      </p>
    </article>
  );
}
