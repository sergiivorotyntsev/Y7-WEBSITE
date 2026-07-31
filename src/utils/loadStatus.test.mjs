// CAB-LOADS T02 — unit test for the progress RENDERER.
// No test framework is configured (frontend rule: no new npm deps), so this is
// a plain node-runnable assertion script:  node src/utils/loadStatus.test.mjs
//
// Note what is NOT tested here any more: the status MAP. It moved to the server
// (services/load_status_vocabulary.py) and is asserted total by
// tests/unit/test_cab_loads_vocabulary.py. Testing a client-side copy of it was
// testing the divergence.
import assert from 'node:assert/strict';
import { progressFor, NEGOTIATION_STAGES, SHIPPING_STAGES } from './loadStatus.js';

let passed = 0;

function check(name, item, { stages, index, terminal }) {
  const r = progressFor(item);
  assert.equal(r.index, index, `${name}: index`);
  assert.equal(r.terminal, terminal, `${name}: terminal`);
  assert.equal(r.stages.length, stages, `${name}: stage count`);
  passed++;
}

// -- shipping phase: the sequence email loads and posted orders render --
check('POSTED', { status: 'POSTED', phase: 'shipping', label: 'Posted' },
  { stages: 3, index: 0, terminal: false });
check('DISPATCHED', { status: 'DISPATCHED', phase: 'shipping', label: 'Dispatched' },
  { stages: 3, index: 1, terminal: false });
check('DELIVERED', { status: 'DELIVERED', phase: 'shipping', label: 'Delivered' },
  { stages: 3, index: 2, terminal: false });

// -- negotiation phase: a portal order that has not been posted yet --
check('SUBMITTED', { status: 'SUBMITTED', phase: 'negotiation', label: 'Submitted' },
  { stages: 3, index: 0, terminal: false });
check('QUOTED', { status: 'QUOTED', phase: 'negotiation', label: 'Quoted' },
  { stages: 3, index: 1, terminal: false });
check('CONFIRMED', { status: 'CONFIRMED', phase: 'negotiation', label: 'Confirmed' },
  { stages: 3, index: 2, terminal: false });

// -- the two phases are separate sequences, not one 6-step scale --
assert.equal(NEGOTIATION_STAGES.length, 3, 'negotiation has 3 stages');
assert.equal(SHIPPING_STAGES.length, 3, 'shipping has 3 stages');
assert.ok(
  !NEGOTIATION_STAGES.some(s => SHIPPING_STAGES.find(t => t.key === s.key)),
  'phases share no stage key',
);
passed += 3;

// -- terminals: statement, no bar --
for (const s of ['CLOSED', 'DECLINED', 'EXPIRED', 'CANCELLED']) {
  check(s, { status: s, phase: s === 'CLOSED' ? 'shipping' : 'negotiation', label: s },
    { stages: 0, index: -1, terminal: true });
}

// -- an unplaceable status draws NO sequence rather than guessing position 0.
//    The old mapper failed safe to "submitted", which told the customer their
//    delivered car was newly submitted. Silence beats a wrong claim. --
check('UNKNOWN sentinel', { status: 'UNKNOWN', phase: 'shipping', label: 'Status unavailable' },
  { stages: 0, index: -1, terminal: false });
check('status absent', {}, { stages: 0, index: -1, terminal: false });
check('phase mismatch', { status: 'POSTED', phase: 'negotiation', label: 'Posted' },
  { stages: 0, index: -1, terminal: false });

// -- the label always survives, never blank, never the raw internal string --
assert.equal(progressFor({ status: 'POSTED', phase: 'shipping', label: 'Posted' }).label, 'Posted');
assert.equal(progressFor({}).label, 'Status unavailable');
passed += 2;

console.log(`loadStatus progress renderer: ${passed} assertions passed`);
