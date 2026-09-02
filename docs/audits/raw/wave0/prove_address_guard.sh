#!/usr/bin/env bash
# [WAVE0-T03] Prove the inverted address guard by mutation, three times.
#
# A guard never observed REFUSING is not a guard.
# A guard that refuses only one alphabet is the defect this task exists to close.
# A guard never observed PASSING is not green.
#
# So: latin mutation must fail, Cyrillic mutation must fail FOR THE SAME RULE,
# and the clean tree must pass. The Cyrillic case is the one that matters — it is
# the string that reached production in src/locales/ua/faq.json:10 and survived
# three latin-only sweeps.
#
# Usage: bash docs/audits/raw/wave0/prove_address_guard.sh
# Leaves the tree exactly as it found it; refuses to run on a dirty scratch path.
set -uo pipefail
cd "$(dirname "$0")/../../../.." || exit 1

SCRATCH="src/_wave0_mutation_scratch.jsx"
RUN="python docs/audits/raw/wave0/run_safety_checks.py --only SUPERSEDED"

if [ -e "$SCRATCH" ]; then
  echo "REFUSING: $SCRATCH already exists — a previous run did not clean up."
  exit 2
fi
cleanup() { rm -f "$SCRATCH"; }
trap cleanup EXIT

hdr() { printf '\n=== %s\n%s\n' "$1" "----------------------------------------------------------------"; }

echo "WAVE0-T03 — ADDRESS GUARD MUTATION PROOF"
echo "repo:  $(pwd)"
echo "HEAD:  $(git rev-parse HEAD)"
echo "date:  $(date -u +%Y-%m-%dT%H:%M:%SZ)"

# ---------------------------------------------------------------- 0. clean tree
hdr "0. CLEAN TREE — the guard must PASS (a guard never seen passing is not green)"
$RUN 2>&1 | grep -E '^\[|^executed'
CLEAN=${PIPESTATUS[0]}

# ---------------------------------------------------------------- 1. latin
hdr "1. LATIN MUTATION — 'based in Newton' in $SCRATCH — the guard must REFUSE"
cat > "$SCRATCH" <<'JSX'
export default function Mutation() {
  return <p>Y7 Logistics is based in Newton, Massachusetts.</p>;
}
JSX
$RUN 2>&1 | grep -E '^\[|_wave0_mutation|^executed'
LATIN=${PIPESTATUS[0]}
rm -f "$SCRATCH"

# ---------------------------------------------------------------- 2. cyrillic
hdr "2. CYRILLIC MUTATION — 'у Ньютоні' in $SCRATCH — the SAME rule must REFUSE"
cat > "$SCRATCH" <<'JSX'
export default function Mutation() {
  return <p>Y7 Logistics із головним офісом у Ньютоні, штат Массачусетс.</p>;
}
JSX
$RUN 2>&1 | grep -E '^\[|_wave0_mutation|^executed'
CYR=${PIPESTATUS[0]}
rm -f "$SCRATCH"

# ---------------------------------------------------------------- 3. restored
hdr "3. MUTATIONS REMOVED — the guard must PASS again"
$RUN 2>&1 | grep -E '^\[|^executed'
BACK=${PIPESTATUS[0]}

hdr "VERDICT"
printf '  0. clean tree      exit=%s  expect 0 (pass)   %s\n' "$CLEAN" "$([ "$CLEAN" = 0 ] && echo OK || echo '*** WRONG')"
printf '  1. latin Newton    exit=%s  expect 1 (refuse) %s\n' "$LATIN" "$([ "$LATIN" = 1 ] && echo OK || echo '*** WRONG')"
printf '  2. Cyrillic Ньютоні exit=%s  expect 1 (refuse) %s\n' "$CYR"  "$([ "$CYR"  = 1 ] && echo OK || echo '*** WRONG')"
printf '  3. restored        exit=%s  expect 0 (pass)   %s\n' "$BACK" "$([ "$BACK" = 0 ] && echo OK || echo '*** WRONG')"

if [ "$CLEAN" = 0 ] && [ "$LATIN" = 1 ] && [ "$CYR" = 1 ] && [ "$BACK" = 0 ]; then
  echo "  ALL FOUR AS EXPECTED — the guard refuses both alphabets and passes clean."
  exit 0
fi
echo "  *** THE PROOF FAILED — do not trust the guard."
exit 1
