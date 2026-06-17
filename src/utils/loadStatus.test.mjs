// DEALER-DASH-S1-T03 — unit test for the unified load-status mapper.
// No test framework is configured (frontend rule: no new npm deps), so this is
// a plain node-runnable assertion script:  node src/utils/loadStatus.test.mjs
import assert from 'node:assert/strict';
import { mapUnifiedStage, UNIFIED_STAGES } from './loadStatus.js';

let passed = 0;
function check(name, order, expectKey, expectTerminal = false) {
  const r = mapUnifiedStage(order);
  assert.equal(r.stageKey, expectKey, `${name}: stageKey`);
  assert.equal(r.terminal, expectTerminal, `${name}: terminal`);
  if (expectKey) {
    assert.equal(r.stageIndex, UNIFIED_STAGES.findIndex(s => s.key === expectKey), `${name}: stageIndex`);
  } else {
    assert.equal(r.stageIndex, -1, `${name}: terminal stageIndex -1`);
  }
  passed++;
}

// customer_orders.status mapping
check('pending', { status: 'pending' }, 'submitted');
check('quoted', { status: 'quoted' }, 'quoted');
check('confirmed', { status: 'confirmed' }, 'confirmed');
check('completed', { status: 'completed' }, 'delivered');

// dispatched — fallback from carrier presence (API does not expose dispatch_status yet)
check('dispatched + no load/carrier', { status: 'dispatched' }, 'confirmed');
check('dispatched + listed (load, no carrier)', { status: 'dispatched', dispatch_load_id: 'L1' }, 'listed');
check('dispatched + carrier assigned', { status: 'dispatched', dispatch_load_id: 'L1', carrier_name: 'ACME' }, 'carrier_assigned');

// dispatched — precise dispatch_status wins when present (forward-compat)
check('dispatch_status PICKED_UP', { status: 'dispatched', carrier_name: 'ACME', dispatch_status: 'PICKED_UP' }, 'picked_up');
check('dispatch_status IN_TRANSIT', { status: 'dispatched', dispatch_status: 'IN_TRANSIT' }, 'in_transit');
check('dispatch_status DELIVERED', { status: 'dispatched', dispatch_status: 'DELIVERED' }, 'delivered');
check('dispatch_status POSTED', { status: 'dispatched', dispatch_status: 'POSTED' }, 'listed');

// terminal states (off the progress bar)
check('declined', { status: 'declined' }, null, true);
check('cancelled', { status: 'cancelled' }, null, true);
check('expired', { status: 'expired' }, null, true);

// fail-safe
check('unknown status', { status: 'wat' }, 'submitted');
check('missing status', {}, 'submitted');

console.log(`loadStatus mapper: ${passed} assertions passed`);
