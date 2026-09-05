import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import styles from './Careers.module.css';
import v2b from '../styles/v2/buttons.module.css';

// DESIGN-V2-W5-T04: the previous useInViewFade IntersectionObserver entrance
// (opacity-0 sections) ran outside the Reveal/__Y7_PRERENDER gates and could
// snapshot mid-fade in the prerender (Reveal Gate Rule). Removed, not ported.

const BENEFITS = [
  { title: 'Steady lane mix', desc: 'Copart, IAA, Manheim, ADESA pickups daily. No dead freight, no wasted backhauls. Clean dispatch packets with accurate condition notes.' },
  { title: 'Digital-first dispatch', desc: 'Portal + Telegram + email. No phone tag eating your dashboard time. Quick decisions, written record of every dispatch.' },
  { title: 'Fast payment', desc: 'Payment Day dashboard tracks every load. Zelle same-day on confirmed clean deliveries where possible, ACH on the next cycle.' },
  { title: 'Transparent paperwork', desc: 'One-link onboarding portal. Upload W9, COI, voided check once — encrypted at rest, reused for every load going forward.' },
  { title: 'Multi-language dispatch', desc: 'EN / RU / PL / UA dispatchers on the team. Useful for owner-operators from Eastern European diaspora running East-Coast corridors.' },
  { title: 'Licensed & Bonded broker', desc: 'FMCSA MC #1741537, USDOT #4427359, BMC-84 $75,000 surety bond. Standard Broker-Carrier Agreement, signed digitally at onboarding.' },
];

const QUALIFICATIONS = [
  'Active FMCSA MC authority (motor carrier of property)',
  'USDOT registration with active operating status',
  'Cargo insurance: minimum $100,000 COI on file',
  'Auto liability: minimum $1,000,000',
  'Safety rating: Satisfactory or Not Rated (no Conditional/Unsatisfactory)',
  'Out-of-Service rate under FMCSA average',
  'Equipment: open or enclosed auto transport (car hauler)',
  'W9 current for this tax year',
];

const ONBOARDING_STEPS = [
  { day: 'Step 1', title: 'Apply on this page', desc: '5 minutes. Company authority, contact info, COI + W9 upload. We validate MC# uniqueness and file integrity on submit.' },
  { day: 'Step 2', title: 'Email with onboarding link', desc: 'Within 30 minutes during business hours. Secure one-time link (72-hour TTL) takes you into the onboarding portal.' },
  { day: 'Step 3', title: 'Complete secure portal', desc: '10 minutes. ACH banking (AES-256 encrypted), voided check upload, driver/dispatcher contacts. Review + submit.' },
  { day: 'Step 4', title: 'Admin review + activation', desc: 'Within one business day. Once verified, you receive a welcome email with carrier portal login instructions.' },
];

const LOAD_FLOW = [
  { title: 'Post on Central Dispatch', desc: 'Y7 posts with clear rates, pickup/delivery windows, and equipment requirements. 90% of our loads move through CD.' },
  { title: 'Bid or direct offer', desc: 'You bid or accept directly on CD. Carriers we\'ve worked with before get direct offers on repeat lanes.' },
  { title: 'Digital dispatch packet', desc: 'After pickup assignment: BOL template, customer contact (when needed for delivery-side coordination), gate pass info for auction pickups.' },
  { title: 'Delivery confirmation', desc: 'On delivery, we may send a per-load link. You enter driver name + phone, upload BOL, confirm method. Faster payment when the link is completed.' },
];

const PORTAL_TABS = [
  { label: 'My Loads', desc: 'Active assignments, status (dispatched / in-transit / delivered), ETA, pay status. Sortable by pickup date or lane.' },
  { label: 'Profile', desc: 'Company info, contact emails/phones, equipment mix. Edit freely. Changes flow through to future dispatch decisions.' },
  { label: 'Documents', desc: 'W9, COI, voided check status with expiry dates. 30-day and 7-day expiry reminders sent via email.' },
  { label: 'Payment', desc: 'Zelle / ACH method on file. Payment history with per-load detail. Tax-year summary available for download.' },
];

const BOUNDARIES = [
  'We don\'t guarantee daily loads — lane mix depends on market.',
  'We don\'t pay upfront — after clean delivery only.',
  'We don\'t take factoring-company assignments without review.',
  'We don\'t work with carriers carrying Conditional or Unsatisfactory safety ratings.',
  'We don\'t handle household goods, hazmat, or oversize/over-dimensional loads.',
];

const FAQS = [
  { q: 'What\'s the minimum volume you expect from carriers?', a: 'No minimum. Owner-operators running a single truck, small fleets, and larger operations are all welcome. The fit depends on your lanes matching our load mix, not on volume.' },
  { q: 'How fast do you pay after delivery?', a: '15 days from clean delivery as the standard (BOL received, no open damage claim). Zelle same-day on confirmed clean deliveries where possible. Every load\'s pay status is visible in the carrier portal Payment Day dashboard.' },
  { q: 'Do I need to use Central Dispatch or can I work direct?', a: 'Both. About 90% of our loads post on Central Dispatch — that\'s where most of our carrier discovery happens. Carriers we\'ve worked with before get direct offers on repeat lanes without the CD listing step.' },
  { q: 'What if I have a claim or damage dispute?', a: 'Documented damage on the delivery BOL is the starting point. Y7 pulls pickup-side photos from the dispatch archive and files with your cargo insurer. We coordinate; the claim is carrier-insurance-backed.' },
  { q: 'How do you verify my insurance?', a: 'COI upload at application; we verify limits and policy effective dates. Ongoing: COI expiry tracked in the documents tab with 30-day and 7-day reminders. Lapsed coverage = no new dispatch until re-uploaded.' },
  { q: 'Can I work with you as an owner-operator (single truck)?', a: 'Yes. Single-truck owner-operators are a core part of our network. The portal + Telegram workflow is actually easier for solo operators than fleets — less paperwork handoff between dispatcher and driver.' },
  { q: 'Do you work with factoring companies?', a: 'Reviewed case-by-case. Factoring arrangements add complexity on the payment side; we prefer direct ACH/Zelle. If factoring is essential for your cash flow, mention it in the application notes and we\'ll discuss.' },
  { q: 'What if I don\'t have a W9 ready?', a: 'Fillable W9 at irs.gov/pub/irs-pdf/fw9.pdf. 5-minute form. We can\'t onboard a carrier for payment without a current-year W9 on file — required for carrier onboarding and payment records.' },
  { q: 'How do I get my first load from Y7?', a: 'After account activation you\'re visible on Central Dispatch bids as normal, plus eligible for direct offers on lanes where we know the pickup/delivery profile matches. There\'s no guaranteed first-load timeline — depends on lane alignment.' },
  { q: 'Is there a contract lock-in?', a: 'Standard Broker-Carrier Agreement, no exclusivity, no minimum commitment. Work with other brokers, take direct loads, scale up/down as fits your operation.' },
];

export default function Careers() {
  const jobSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Auto Transport Carrier Partner',
    description: 'Join the Y7 Logistics vetted carrier network. Auto transport loads from Copart, IAA, Manheim, ADESA. Licensed & bonded FMCSA broker. Fast Zelle/ACH payment. Digital-first dispatch workflow.',
    datePosted: '2026-04-21',
    validThrough: '2027-04-21',
    employmentType: 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      '@id': 'https://www.y7agency.com/#organization',
      name: 'Y7 Logistics',
      url: 'https://www.y7agency.com',
    },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressCountry: 'US' },
    },
    industry: 'Auto Transport',
    occupationalCategory: '53-3032',
    qualifications: 'Active FMCSA MC authority, USDOT registration, cargo insurance minimum $100k, auto liability $1M, Satisfactory safety rating, car hauler equipment, current-year W9',
    responsibilities: 'Transport vehicles between auction yards, dealer lots, and customer delivery addresses. Maintain BOL documentation. Communicate via digital channels (portal, Telegram, email).',
  });

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });

  return (
    <div className={styles.page}>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers' }]} />
      <PageMeta
        title="Carrier Application — Join Y7 Auto Transport Network | Y7 Logistics"
        description="Apply to the Y7 Logistics carrier network. Auto transport loads from Copart/IAA/Manheim. Licensed & bonded FMCSA broker MC #1741537. Fast Zelle/ACH payment. 5-minute application."
        path="/careers"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jobSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroKicker}>CARRIER RECRUITING</span>
          <h1 className={styles.heroTitle}>Become a Y7 Carrier Partner</h1>
          <p className={styles.heroSubtitle}>
            Y7 Logistics is building a vetted carrier network for auto transport. Steady loads from
            Copart, IAA, Manheim and ADESA. Digital-first dispatchers. Fast payment. Honest lane
            mix.
          </p>
          <div className={styles.heroTrust}>
            <span className={styles.heroTrustItem}>&#x2713; Licensed &amp; Bonded FMCSA Broker · MC #1741537</span>
            <span className={styles.heroTrustItem}>&#x2713; 90% loads via Central Dispatch</span>
            <span className={styles.heroTrustItem}>&#x2713; Fast Zelle / ACH payment</span>
          </div>
          <div className={styles.heroCtaRow}>
            <Link to="/careers/apply" className={`${v2b.cta} ${styles.heroCta}`}>Apply to Carrier Network &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Why Work With Y7 */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.kicker}>WHY Y7</span>
          <h2 className={styles.h2}>What you get as a Y7 carrier partner</h2>
          <div className={styles.benefitGrid}>
            {BENEFITS.map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <div className={styles.benefitNum}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className={styles.sectionMuted}>
        <div className={styles.inner}>
          <span className={styles.kicker}>QUALIFICATIONS</span>
          <h2 className={styles.h2}>What we look for</h2>
          <p className={styles.sectionSub}>
            Standard FMCSA compliance plus a safety profile we can confidently represent to shippers.
            If you meet these on paper and the insurance filings are current, we can start the
            conversation.
          </p>
          <ul className={styles.qualList}>
            {QUALIFICATIONS.map((q, i) => (
              <li key={i} className={styles.qualItem}>
                <span className={styles.qualCheck}>&#x2713;</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Onboarding */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.kicker}>ONBOARDING</span>
          <h2 className={styles.h2}>From apply to active in about one business day</h2>
          <ol className={styles.timeline}>
            {ONBOARDING_STEPS.map((s, i) => (
              <li key={i} className={styles.timelineItem}>
                <span className={styles.timelineDay}>{s.day}</span>
                <h3 className={styles.timelineTitle}>{s.title}</h3>
                <p className={styles.timelineDesc}>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How Loads Flow */}
      <section className={styles.sectionMuted}>
        <div className={styles.inner}>
          <span className={styles.kicker}>HOW LOADS FLOW</span>
          <h2 className={styles.h2}>From dispatch to delivery, operationally</h2>
          <div className={styles.flowGrid}>
            {LOAD_FLOW.map((f, i) => (
              <div key={i} className={styles.flowCard}>
                <div className={styles.flowNum}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className={styles.flowTitle}>{f.title}</h3>
                <p className={styles.flowDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Terms */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.kicker}>PAYMENT</span>
          <h2 className={styles.h2}>Payment terms, transparently</h2>
          <div className={styles.payGrid}>
            <div className={styles.payCard}>
              <h3 className={styles.payCardTitle}>15-day payment standard</h3>
              <p className={styles.payCardDesc}>Clean delivery (BOL received, no open damage claim) triggers the 15-day clock. Same-day Zelle where possible.</p>
            </div>
            <div className={styles.payCard}>
              <h3 className={styles.payCardTitle}>Zelle or ACH</h3>
              <p className={styles.payCardDesc}>Your choice at onboarding. Change any time via the portal. No wire fees on either path.</p>
            </div>
            <div className={styles.payCard}>
              <h3 className={styles.payCardTitle}>Payment Day dashboard</h3>
              <p className={styles.payCardDesc}>Every load&apos;s pay status visible: ready-to-pay, pending docs, held for damage review. No mystery, no phone calls.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Tabs */}
      <section className={styles.sectionMuted}>
        <div className={styles.inner}>
          <span className={styles.kicker}>CARRIER PORTAL</span>
          <h2 className={styles.h2}>Four tabs, everything you need</h2>
          <p className={styles.sectionSub}>
            Phone OTP login at dispatch.y7agency.com/carrier-portal — no passwords to lose. Every tab
            built for mobile-first use from the truck.
          </p>
          <div className={styles.portalGrid}>
            {PORTAL_TABS.map((t, i) => (
              <div key={i} className={styles.portalCard}>
                <h3 className={styles.portalLabel}>{t.label}</h3>
                <p className={styles.portalDesc}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-load workflow */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.kicker}>PER-LOAD WORKFLOW</span>
          <h2 className={styles.h2}>Per-load confirmation — one link, two minutes</h2>
          <p className={styles.sectionSub}>
            When you&apos;re assigned a load, we may text a per-load confirmation link. It takes two
            minutes and speeds up your payment.
          </p>
          <ol className={styles.perloadList}>
            <li>Click the link from your phone.</li>
            <li>Enter the driver name + phone for this specific load.</li>
            <li>On delivery, upload the signed BOL.</li>
            <li>Pay processing starts as soon as the link is completed — often same-day Zelle.</li>
          </ol>
        </div>
      </section>

      {/* Honest boundaries */}
      <section className={styles.sectionMuted}>
        <div className={styles.inner}>
          <span className={styles.kicker}>OPERATIONAL HONESTY</span>
          <h2 className={styles.h2}>What Y7 does not do</h2>
          <p className={styles.sectionSub}>
            Clear on scope. If any of these are deal-breakers, Y7 is not the right broker
            — and the time to know that is before onboarding.
          </p>
          <ul className={styles.boundList}>
            {BOUNDARIES.map((b, i) => (
              <li key={i} className={styles.boundItem}>
                <span className={styles.boundX}>&times;</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.kicker}>FAQ</span>
          <h2 className={styles.h2}>Questions carriers ask</h2>
          <div className={styles.faqList}>
            {FAQS.map((f, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{f.q}</span>
                  <span className={styles.faqChevron} aria-hidden="true">&#9662;</span>
                </summary>
                <p className={styles.faqAnswer}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaStrip}>
        <div className={styles.inner}>
          <h2 className={styles.ctaTitle}>Ready to join the network?</h2>
          <p className={styles.ctaSubtitle}>
            Application takes five minutes. You&apos;ll get the onboarding link by email within 30
            minutes during business hours.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/careers/apply" className={`${v2b.cta} ${styles.ctaPrimary}`}>Apply to Carrier Network &rarr;</Link>
            <a href="https://dispatch.y7agency.com/carrier-portal" className={`${v2b.ghostOnDark} ${styles.ctaSecondary}`}>
              Already a Y7 carrier? Sign in &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Crosslinks */}
      <section className={styles.crosslinks}>
        <div className={styles.inner}>
          <h3 className={styles.crosslinksTitle}>RELATED</h3>
          <div className={styles.crosslinksRow}>
            <Link to="/dealers" className={styles.crosslink}>For auto dealers &rarr;</Link>
            <Link to="/about" className={styles.crosslink}>About Y7 Logistics &rarr;</Link>
            <a href="https://www.centraldispatch.com/" target="_blank" rel="noopener noreferrer" className={styles.crosslink}>
              Central Dispatch &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
