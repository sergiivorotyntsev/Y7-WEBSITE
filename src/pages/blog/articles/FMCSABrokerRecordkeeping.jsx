import React from 'react';
import { Link } from 'react-router-dom';

export default function FMCSABrokerRecordkeeping({ theme }) {
  return (
    <article>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        If you operate as a property broker under FMCSA authority, your recordkeeping is not optional
        housekeeping — it is a legal obligation that directly determines whether your authority survives an
        audit. The Federal Motor Carrier Safety Administration does not conduct audits to educate. They conduct
        audits to verify compliance, and the consequences of falling short are immediate and severe.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        In 2025, FMCSA reported over <strong style={{ color: theme.accent }}>100,000 violations</strong> across
        compliance reviews and audits, with carriers and brokers averaging approximately{' '}
        <strong style={{ color: theme.accent }}>6 violations per audit</strong>. Penalties in enforcement
        actions exceeded <strong style={{ color: theme.accent }}>$125,000</strong> on average. These are not
        abstract numbers — they represent businesses that thought they were compliant until an auditor proved
        otherwise.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Three Categories of Required Records
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        FMCSA regulation 49 CFR Part 371 defines what brokers must maintain. The records break down into three
        categories, each with its own retention requirements and audit scrutiny level:
      </p>

      <h3 style={{ fontFamily: theme.fonts.sans, fontSize: '1.05rem', fontWeight: 600, color: theme.text, margin: '28px 0 10px' }}>
        1. Load Records (Transaction Records)
      </h3>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Every brokered load must have a complete transaction record including the shipper's name and address,
        the carrier used, the date of the transaction, a description of the shipment, the amount charged to the
        shipper, the amount paid to the carrier, and the method and date of payment. This is the core of what
        auditors examine — they are looking for complete, consistent records that demonstrate you actually
        arranged the transportation you billed for.
      </p>

      <h3 style={{ fontFamily: theme.fonts.sans, fontSize: '1.05rem', fontWeight: 600, color: theme.text, margin: '28px 0 10px' }}>
        2. Carrier Qualification Records
      </h3>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Before you tender a load to any carrier, you are expected to verify that carrier's authority, insurance
        coverage, and safety record. This means documenting that you checked the carrier's MC or USDOT status,
        confirmed active insurance with adequate coverage, and reviewed their Safety Measurement System (SMS)
        scores. An auditor will ask: did you know this carrier was fit to operate when you gave them the load?
        Your records need to answer yes with documentation.
      </p>

      <h3 style={{ fontFamily: theme.fonts.sans, fontSize: '1.05rem', fontWeight: 600, color: theme.text, margin: '28px 0 10px' }}>
        3. Financial Records
      </h3>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Bank statements, payment records, invoices, and any financial instruments used in your brokerage
        operations. FMCSA wants to see that money flowed where your records say it flowed — from shipper to
        you, from you to carrier, with amounts matching your transaction records.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          Retention requirements vary by document type:{' '}
          <strong style={{ color: theme.accent }}>3 to 5 years</strong> depending on the record category. Load
          transaction records must be kept for a minimum of 3 years. Financial records and carrier qualification
          files should be retained for 5 years to cover the outer edge of audit windows and potential litigation.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Safety Data: Not Just for Carriers
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Brokers have an obligation to use carriers that are fit to operate. This means checking SMS scores before
        booking — not after an incident. The Safety Measurement System evaluates carriers across multiple
        Behavior Analysis and Safety Improvement Categories (BASICs). A carrier with an "Alert" status in
        Unsafe Driving or Crash Indicator should trigger a documented decision about whether to proceed. If
        you booked that carrier without checking and something goes wrong, the audit trail shows negligence.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        ELD Compliance: The January 2026 Deadline
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        As of <strong style={{ color: theme.accent }}>January 20, 2026</strong>, any Electronic Logging Device
        that does not meet FMCSA's full technical specifications will place the driver — and by extension
        the carrier — out of service. Non-compliant ELDs are no longer grandfathered. If you are booking
        carriers who are still running older, non-compliant devices, you are exposing your operation to the
        risk of a carrier shutdown mid-load.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        This matters for brokers because Hours of Service limits must factor into your load planning. If you
        are booking a load with a tight delivery window and the carrier's driver is approaching their HOS limit,
        that delivery will be late. ELD data makes HOS compliance verifiable and enforceable — there is no
        more fudging paper logs.
      </p>

      <div style={{ borderLeft: `4px solid ${theme.accent}`, padding: '16px 24px', margin: '24px 0', background: 'rgba(153,60,29,0.04)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: theme.text }}>
        An auditor does not care that you were busy. They care that the record exists, that it is accurate,
        and that it was created at the time of the transaction — not reconstructed after the fact. Automated
        logging beats manual spreadsheets every time.
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Automated Logging vs. Manual Spreadsheets
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The brokers who fail audits most often are not the ones running illegal operations. They are the ones
        who did the work but did not record it consistently. A spreadsheet that gets updated "when there is
        time" is a compliance gap waiting to be discovered. A phone call to check carrier insurance that is not
        documented is the same as not making the call at all, as far as an auditor is concerned.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Y7 Logistics (MC #1741537, USDOT #4427359) builds compliance into the operational workflow. Every action
        in our dispatch system — carrier assignment, rate confirmation, pickup, delivery, payment — generates
        a timestamped database record automatically. There is no separate compliance step because compliance is
        a byproduct of the operation itself. When an auditor asks for the record of a load from 18 months ago,
        the record exists because the system created it at the time of the transaction, not because someone
        remembered to update a spreadsheet.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          The best audit preparation is not a last-minute records review. It is an operational system that
          creates compliant records as a natural byproduct of doing business. If compliance requires a separate
          effort, it will eventually be skipped.
        </p>
      </div>
    </article>
  );
}
