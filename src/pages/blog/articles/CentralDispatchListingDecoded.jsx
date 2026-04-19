import React from 'react';
import { Link } from 'react-router-dom';

export default function CentralDispatchListingDecoded({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Central Dispatch is the load board that moves the US auto-transport industry. Every week,
        hundreds of thousands of vehicles are posted, bid on, and dispatched through its interface.
        For brokers writing listings and carriers scanning them, CD is the primary signal layer — the
        difference between a listing that gets picked up in two hours and one that sits for a week is
        almost always in the copy, not the route.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Anatomy of a Listing
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Every CD listing has roughly twenty fields that matter to a carrier skimming the board. The
        headline fields — origin, destination, vehicle type, rate, pickup date — determine whether a
        carrier clicks into the listing at all. The detail fields — location type, operative status,
        contact info, trailer preference — determine whether they accept it after they click in.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Origin + Destination.</strong> City + state, occasionally a ZIP. Carriers filter by
        geographic cluster, so specificity matters. "Northeast PA" in the origin field is useless;
        "Scranton PA 18505" is actionable.<br />
        <strong>Vehicle type.</strong> Sedan / SUV / Pickup / Van / Motorcycle / Inoperable. The
        operational status drives equipment filter on the carrier's side.<br />
        <strong>Vehicle count.</strong> Single vehicle vs. multi-car. Multi-car loads get better
        per-unit rates but require a carrier with matching capacity.<br />
        <strong>Trailer preference.</strong> Open / Enclosed / Either. Saying "Either" opens the
        listing to 5x the carrier pool.<br />
        <strong>Pickup date fields.</strong> "First available" vs. "Ready by" vs. exact date — these
        are three different operational commitments.<br />
        <strong>Rate.</strong> Your offered carrier pay. This is the single biggest lever.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Red Flags in Poorly-Written Listings
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Experienced carriers skip listings with certain tells. "Operative but needs jump" is a red flag
        — if the battery is dead now, it will be dead when the driver arrives, which means 20 minutes
        of waiting at pickup and a risk the vehicle will not start at delivery. "Runs and drives per
        auction report" is another — it means nobody has verified it recently. The carriers who have
        been burned once or twice add a mental $50 pad to those listings before bidding.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Contact-info gaming is rampant. Listings that hide the broker's direct number behind a dispatch
        service prompt are signaling that the broker is hard to reach — which matters when a driver
        hits a snag at pickup and needs an answer fast. Carriers prefer listings with a name and direct
        mobile number, and they will bid below market for the peace of mind that comes with one.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        What Carrier Rate Actually Means
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The rate you post on CD is what the carrier sees as their gross pay for the load. It is not
        your price to the customer — that is rate + your broker markup. Carriers evaluate rate against
        the deadhead miles they'll absorb to get to pickup, the fuel cost between pickup and delivery,
        and the opportunity cost of other loads on the same corridor.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        A rate that is <strong style={{ color: theme.accent }}>10% below the lane average</strong>
        simply will not get picked up in the first 24 hours. A rate 15% above will get accepted inside
        30 minutes. The sweet spot — reliable acceptance without overpaying — is typically 2–5% above
        the 30-day rolling lane average, which most CD power users track privately. If you are a
        broker posting listings without a lane-average reference point, you are flying blind.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          Carriers bid with pattern-recognition, not calculators. A tight, specific listing at the
          right rate gets picked up inside hours; a vague listing at any rate gets skipped until the
          broker raises it.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Pickup Date Fields — the Three Shapes
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        "First available" tells carriers: match me with the first truck running this lane, whenever it
        runs. This gets fastest pickup but least control — you might be dispatched today or five days
        from now.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        "Ready by [date]" tells carriers: any pickup on or after this date is fine, within a reasonable
        window. This is the most common formulation and balances carrier flexibility with customer
        planning.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        "Exact date" tells carriers: pickup must happen on this specific day. This narrows the carrier
        pool significantly and often requires a 15–25% rate premium to guarantee acceptance. Use only
        when the customer's schedule genuinely requires it — snowbird flight departures, closing
        dates, specific auction pickup windows.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Location Types and Why They Matter
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        CD lets you classify each end of the route as Residential, Business, Auction, Dealer, or Terminal.
        Carriers filter differently on each. An Auction origin tells them there will be a gate pass,
        yard rules, and often limited pickup windows. A Residential origin tells them to expect a
        narrow street and possibly a meet-up at a nearby commercial lot. A Dealer origin tells them
        someone competent will be on site with keys.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Mis-declaring location type is the second-most-common listing error after rate mispricing. A
        "Residential" pickup in a gated community without driveway clearance gets refused at pickup.
        Honesty here saves both carrier time and broker credibility.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The 5 Things Brokers Get Wrong
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>(1) Vague origin.</strong> "Northeast PA" forces carriers to guess the deadhead miles.
        Specific ZIP or city wins.<br />
        <strong>(2) Optimistic operative status.</strong> If the auction report says "runs and drives"
        but the car has sat for 3 weeks, declare it "operational condition uncertain — winch-capable
        carrier preferred."<br />
        <strong>(3) Hiding inop.</strong> Non-running vehicles declared as operational get refused at
        pickup — a dry run fee for you, a wasted day for the carrier.<br />
        <strong>(4) Under-rating by $50.</strong> Carriers bid pattern-recognition on rates. A listing
        $50 under the real market number sits for days while a listing $10 above market gets accepted
        in an hour.<br />
        <strong>(5) No contact info in the listing body.</strong> Carriers want a direct number before
        they accept, not after.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        How to Write a Listing That Gets Picked Up Fast
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        A well-written CD listing reads like an experienced dispatcher talking to another experienced
        dispatcher. Specific origin and destination ZIPs. Honest operative status with any known
        flags (battery age, tire condition, known mechanical issues). A ready-by date that reflects
        the actual customer timeline, not an optimistic guess. A rate calibrated against the 30-day
        lane average with a small pad for fast acceptance. A contact number in the body, not
        gate-kept behind a portal login.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        At Y7 we post every broker load with that exact discipline. See how we structure <Link to="/dealers" style={{ color: theme.accent, fontWeight: 600 }}>
        dealer-side dispatch</Link> for dealer accounts, or the <Link to="/ship-my-car" style={{ color: theme.accent, fontWeight: 600 }}>
        individual-customer side</Link> for how we translate first-available dates into CD-ready
        listings. Good listings reflect good operations — the two are inseparable.
      </p>
    </article>
  );
}
