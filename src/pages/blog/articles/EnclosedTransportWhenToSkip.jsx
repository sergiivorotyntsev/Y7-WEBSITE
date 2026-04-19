import React from 'react';
import { Link } from 'react-router-dom';

export default function EnclosedTransportWhenToSkip({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Enclosed transport exists for a reason — certain vehicles genuinely need the protection of a
        sealed trailer. But the assumption that "expensive car = enclosed" is wrong often enough that
        it deserves a careful counter-argument. Half the dealers and private buyers who pay for
        enclosed would have been fine with open. The other half absolutely needed it. This is the
        honest framework for choosing.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Enclosed vs Open Myth
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Enclosed trailers protect against four specific things: weather exposure (rain, snow, road
        salt), road debris (rock chips, stone spray), sun UV during long-duration transit, and
        visibility during highway travel (theft, paparazzi for celebrity-owned vehicles). Open trailers
        expose vehicles to exactly those four things. For most cars, exposure to those four things
        during 5–10 days of transit causes zero permanent damage.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        A daily driver gets rained on every week. A family SUV accumulates more road debris in one
        month of commuting than a cross-country transport ride deposits. The mechanical risks that
        actually matter — strap damage, loading accidents, tie-down failures — are essentially
        identical between open and enclosed carriers because tie-down protocols are the same.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        When Enclosed Is Absolutely Worth It
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Collector cars.</strong> Pre-1985 vehicles with original paint, vintage trim, or
        period-correct restoration work. Every stone chip is expensive to fix. Enclosed is the right
        call without argument.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Exotics (Ferrari, Lamborghini, McLaren, specialty Porsche models).</strong> Low
        ground clearance alone often disqualifies open trailers — the ramp angle is too steep.
        Combined with paint value and parts cost, enclosed is non-negotiable.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Brand-new zero-mile deliveries.</strong> A vehicle arriving at a customer with road
        film already on it damages the first-impression moment. For dealers delivering to retail
        customers, enclosed pays for itself in review goodwill.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Show cars and concours vehicles.</strong> Any vehicle heading to judged competition
        must arrive pristine. Open transport risks scoring against condition points.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Winter snowbird transport from the Rust Belt.</strong> Two weeks of I-95 road salt
        exposure on an open trailer is corrosive on a classic or a recently-restored vehicle. For
        late-model daily drivers it's a car wash; for collector cars it's damage.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        When Open Is Fine
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Daily drivers of any price point under ~$80,000.</strong> A 2022 BMW X5 going to a
        customer 1,500 miles away does not need enclosed. It needs competent open transport with a
        pre-pickup condition inspection, proper tie-downs, and a BOL photo trail at both ends.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Vehicles 5+ years old, not in concours condition.</strong> The paint has seen weather
        for half a decade already. A week on an open trailer is a wash in the customer's driveway.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Dealer trade-ins and standard used inventory.</strong> Most inventory moving between
        dealer rooftops travels open — if carriers delivered every new car from factories to
        dealerships on open trailers (they do), your used trade-in is fine on open.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Auction salvage vehicles.</strong> Copart and IAA inventory is typically already
        damaged. Paying enclosed premiums on a vehicle that the buyer plans to repair anyway is
        throwing money.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          The right test is not "is the car expensive?" It's "is any damage during transit disproportionately
          costly or permanent?" Daily drivers: any damage is absorbable. Collector cars: no damage is
          acceptable. The framework is that simple.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Real Numbers — What the Premium Costs
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Enclosed transport typically runs <strong style={{ color: theme.accent }}>40–60% more</strong>
        than open on the same lane. Concrete numbers for a coast-to-coast standard-vehicle move (roughly
        2,800 miles):
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Open trailer: $1,100–$1,600.<br />
        Enclosed trailer (multi-car): $1,700–$2,400.<br />
        Single-vehicle top-tier enclosed (museum-grade): $2,500–$4,500.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The $800–$1,000 premium for standard enclosed is the real decision point. On a $30,000 used
        BMW, that's 2.7–3.3% of the vehicle value. On a $400,000 collector car, it's 0.25%. The
        latter is obvious; the former is not. For the former, the honest answer is usually "skip
        enclosed — take the savings."
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Edge Cases That Flip the Calculation
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Winter shipping through the Rust Belt.</strong> January transit through the
        Pennsylvania-Ohio-Indiana corridor exposes vehicles to prolonged salt brine spray. For any
        vehicle where the owner cares about the underbody, enclosed starts making sense even on
        late-model cars.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Long routes (2,500+ miles).</strong> The probability of a rock chip incident scales
        with mileage. On a 1,200-mile move, the risk is negligible. On a 3,000-mile move, risk compounds
        enough that some careful owners decide the premium is cheaper than a windshield replacement.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        <strong>Dealer trade-ins of high-condition, low-mileage vehicles.</strong> When the dealer
        expects to retail the car at a condition premium, every chip costs margin. Enclosed can
        quietly pay for itself in avoided reconditioning.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Insurance Differences
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Cargo insurance on open carriers is typically $100,000–$250,000 per carrier. Enclosed specialty
        carriers run $250,000–$500,000. On a $400,000 exotic, the coverage gap between open and
        enclosed matters. On a $35,000 SUV, it does not — any reasonable cargo policy covers the
        vehicle's value several times over.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Three-Question Decision Framework
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Before paying the enclosed premium, answer:
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        (1) Is any transit-caused cosmetic damage (stone chips, road film, UV exposure) disproportionately
        costly or impossible to repair to original on this vehicle? If yes → enclosed. If no → open.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        (2) Does the vehicle's ground clearance, size, or loading requirements disqualify a standard open
        trailer? If yes → enclosed (liftgate-capable specifically). If no → open is viable.
      </p>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        (3) Is the enclosed premium less than 1% of the vehicle's value? If yes → enclosed is a cheap
        insurance policy. If the premium is 3%+ of value → open is the smart financial call.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Most customers who email us asking about enclosed are overthinking it. Standard open transport
        is genuinely fine for 85% of US auto transport volume — it's how every new car in the country
        gets delivered. See <Link to="/ship-my-car" style={{ color: theme.accent, fontWeight: 600 }}>
        our ship-my-car page</Link> for pricing on both transport types, or the <Link to="/open-vs-enclosed-auto-transport" style={{ color: theme.accent, fontWeight: 600 }}>
        open vs enclosed deep-dive</Link> for the full side-by-side comparison.
      </p>
    </article>
  );
}
