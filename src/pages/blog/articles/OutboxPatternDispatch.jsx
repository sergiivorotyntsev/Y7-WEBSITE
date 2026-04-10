import React from 'react';
import { Link } from 'react-router-dom';

export default function OutboxPatternDispatch({ theme }) {
  return (
    <article style={{ maxWidth: 780, margin: '0 auto' }}>
      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        We lost a Central Dispatch listing on a Thursday afternoon. Not because the API was down,
        not because our credentials expired, but because <strong style={{ color: theme.accent }}>45
        dead events</strong> were stuck in an infinite retry loop, blocking every new listing behind
        them. The carrier was waiting, the customer was waiting, and our system was dutifully
        retrying a failed event for the 2,000th time instead of moving on.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        That was the day we rebuilt our entire external communication layer around a pattern that
        database engineers have used for decades but that most small software teams in logistics
        never implement: the transactional outbox.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Problem with Direct API Calls
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The naive approach to integrating with an external service is to call the API directly
        when the action occurs. A dispatcher clicks "List on CD," the server calls the Central
        Dispatch API, and if it succeeds, the listing is live.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The problem surfaces when anything goes wrong. The API times out. The service is down for
        maintenance. Now your application is in an ambiguous state: did the listing get created or
        not? The database says the load was listed, but Central Dispatch has no record. Or worse —
        the listing was created on their end, but your system thinks it failed and creates a
        duplicate.
      </p>

      <div style={{ borderLeft: `4px solid ${theme.accent}`, padding: '16px 24px', margin: '24px 0', background: 'rgba(153,60,29,0.04)', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: theme.text }}>
        Every direct API call is a bet that two independent systems will agree on what happened.
        In production, that bet loses more often than anyone wants to admit.
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        The Outbox Pattern
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The transactional outbox separates the intent to perform an external action from the
        execution of that action. When a dispatcher lists a load, the system does not call Central
        Dispatch. Instead, it writes an event record to a database table — the outbox — within the
        same transaction that updates the load status. The database guarantees that both writes
        succeed or both fail. There is no ambiguity.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        A background worker polls the outbox table, picks up pending events, and executes them
        against the external service. If the call succeeds, the event is marked complete. If it
        fails, the event stays in the queue with an incremented retry count and a backoff timer.
        The worker moves on to the next event. Nothing blocks.
      </p>

      <h3 style={{ fontFamily: theme.fonts.sans, fontSize: '1.05rem', fontWeight: 600, color: theme.text, margin: '28px 0 10px' }}>
        The Three Guarantees
      </h3>

      <ul style={{ paddingLeft: 24, margin: '16px 0' }}>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Atomicity.</strong> The event and the database state change live in the same
          transaction. You cannot have one without the other.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Durability.</strong> Events survive crashes, restarts, and deployments. They are
          rows in a table, not messages in memory.
        </li>
        <li style={{ marginBottom: 8, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          <strong>Ordering.</strong> Events are processed in the sequence they were created. A
          cancel event will never execute before the create event it depends on.
        </li>
      </ul>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Dead Letters: When Events Cannot Succeed
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The 45 dead events that caused our original outage all referenced a Central Dispatch
        operation the API no longer supported. No amount of retrying would make them succeed.
        The fix was a dead letter mechanism. When the worker encounters an unknown or deprecated
        event type, it marks that event as permanently failed and moves on. These events remain
        in the table for auditing but are excluded from the processing queue forever.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(15,110,86,0.06), rgba(15,110,86,0.02))', border: '1px solid rgba(15,110,86,0.15)', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
        <div style={{ fontWeight: 700, color: theme.success, marginBottom: 8, fontSize: '0.85rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Key Takeaway</div>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: theme.text }}>
          A retry mechanism without a dead letter strategy is a time bomb. Events that can never
          succeed will eventually block events that can.
        </p>
      </div>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Payload Snapshots and Stale Data
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        When an event is created, it captures a snapshot of the data it needs. But what happens
        when a dispatcher edits the load after the event is enqueued but before the worker
        processes it? Our solution is a cancel-and-re-enqueue strategy. When a load is edited,
        the system cancels any pending outbox events for that load and creates new events with
        fresh payload snapshots. The stale events never execute. No ambiguity, no race conditions.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Idempotency: The Guard Against Duplicates
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Every event carries an idempotency key — a unique identifier ensuring the same operation
        cannot execute twice. On the database side, this is enforced with an ON CONFLICT DO NOTHING
        clause. If a duplicate event enters the outbox through a race condition or retried
        transaction, the database silently ignores it. The idempotency key is also passed to the
        external API for remote deduplication.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Fire-and-Forget AI
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        Our AI-powered extraction calls — the LLM operations that parse emails, categorize
        messages, and extract vehicle details — all run through the outbox as fire-and-forget
        events. They never block the primary pipeline. If the AI service is slow or down, the load
        still moves through dispatch. The AI results arrive when they arrive, and the system is
        better for having them, but never dependent on them.
      </p>

      <h2 style={{ fontFamily: theme.fonts.serif, fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', fontWeight: 700, color: theme.text, margin: '36px 0 16px' }}>
        Technology as Table Stakes
      </h2>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        The outbox pattern has existed in enterprise software for decades. But in auto transport
        brokerage, where most operations still run on spreadsheets and manual load board
        interactions, this kind of infrastructure is rare. It should not be. The reliability of the
        systems behind dispatch communications is not a technical detail — it is the service itself.
      </p>

      <p style={{ marginBottom: 18, fontSize: '1.02rem', lineHeight: 1.8, color: theme.text }}>
        At Y7 Transport (MC #1741537, USDOT #4427359), every external write — every Central
        Dispatch listing, every carrier notification, every status update — goes through the
        transactional outbox. The{' '}
        <Link to="/services" style={{ color: theme.accent, textDecoration: 'none', borderBottom: `1px solid ${theme.accent}` }}>
          dispatch services
        </Link>{' '}
        we provide are only as reliable as the infrastructure behind them, and we decided that
        losing loads to dead events was not an acceptable cost of doing business.
      </p>
    </article>
  );
}
