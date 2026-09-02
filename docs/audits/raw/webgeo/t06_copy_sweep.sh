#!/usr/bin/env bash
# WEBGEO T06 — copy compliance sweep.
#
# Every hit with file:line, never a count. Each block PRINTS THE COMMAND before
# running it, so the report's numbers can be reproduced without reading this file.
#
# Scope: src/ (components, pages, locales) plus the content data files outside it
# that feed rendered copy. `git ls-files` bounds the search to TRACKED files so an
# untracked scratch file cannot inflate a count.
#
# Usage:  bash docs/audits/raw/webgeo/t06_copy_sweep.sh
# Writes: docs/audits/raw/webgeo/out/T06_copy_sweep.txt  (via redirection)
set -uo pipefail
cd "$(dirname "$0")/../../../.." || exit 1

hdr() { printf '\n%s\n%s\n' "=== $1" "-----------------------------------------------------------------"; }
run() { printf '$ %s\n' "$1"; eval "$1"; local rc=$?; [ $rc -ne 0 ] && printf '(no matches)\n'; return 0; }

echo "WEBGEO T06 — COPY COMPLIANCE SWEEP"
echo "repo: $(pwd)"
echo "HEAD: $(git rev-parse HEAD)"
echo "date: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "scope: tracked files under src/ plus tracked content data files"

hdr "1a. real-time tracking / real time tracking / live tracking (any locale)"
run "git grep -in -e 'real-time tracking' -e 'real time tracking' -e 'live tracking' -- src/ '*.json' '*.js' '*.jsx'"

hdr "1b. GPS (word-boundary, case-sensitive acronym AND case-insensitive prose)"
run "git grep -n -w 'GPS' -- src/ '*.json' '*.js' '*.jsx'"
echo "--- case-insensitive, to catch 'gps' in prose:"
run "git grep -in -w 'gps' -- src/ '*.json' '*.js' '*.jsx'"
echo "--- Cyrillic/Polish equivalents (GPS is a loanword; check the locales explicitly):"
run "git grep -in -e 'GPS-' -e 'ГЛОНАСС' -e 'отслеживание в реальном' -e 'відстеження в реальному' -e 'sledzenie w czasie rzeczywistym' -e 'śledzenie w czasie rzeczywistym' -- src/"

hdr "2. Licensed & Insured / licensed and insured  (must be 'Licensed & Bonded FMCSA Broker')"
run "git grep -in -e 'licensed & insured' -e 'licensed and insured' -e 'licensed &amp; insured' -- src/ '*.json' '*.js' '*.jsx' '*.html'"
echo "--- the CORRECT form, for contrast (where it is stated):"
run "git grep -in -e 'Licensed & Bonded' -e 'Licensed &amp; Bonded' -- src/ '*.json' '*.html'"
echo "--- every other use of 'insur' in src/, to check each describes the CARRIER not Y7:"
run "git grep -in 'insur' -- src/ | wc -l"
run "git grep -in 'insur' -- src/locales/en/"

hdr "3a. 'Y7 AGENCY' (old brand — the CI guard bans it)"
run "git grep -in 'Y7 AGENCY' -- ."
hdr "3b. 'Y7 Logistics' vs 'Y7 Agency' vs 'Y7Agency' across src/"
run "git grep -in 'Y7 Logistics' -- src/ | wc -l"
run "git grep -in 'Y7 Agency' -- src/ | wc -l"
run "git grep -in 'y7agency' -- src/ | wc -l"
echo "--- brand strings inside <title>/PageMeta title props (what a SERP shows):"
run "git grep -in 'title' -- src/locales/*/*.json | grep -i 'y7' | head -60"

hdr "4. residual old address — Newton / Chestnut / 02464"
run "git grep -in -e 'Newton' -e 'Chestnut' -e '02464' -e '02458' -- ."

hdr "5. phone number patterns (the site is meant to publish none)"
echo "--- tel: links:"
run "git grep -in 'tel:' -- src/ '*.html' '*.json'"
echo "--- US-shaped numbers, several notations:"
run "git grep -inE '\(?[0-9]{3}\)?[ .-][0-9]{3}[ .-][0-9]{4}' -- src/ '*.html' '*.json'"
echo "--- the two historical Y7 numbers explicitly:"
run "git grep -inE '857.{0,5}(895|897)|508.{0,5}744' -- ."
echo "--- JSON-LD telephone field:"
run "git grep -in '\"telephone\"' -- src/ '*.html' '*.json'"

hdr "6. MC # / USDOT # — which files state them"
run "git grep -in -e 'MC #' -e 'MC#' -e '1741537' -- src/ '*.html' '*.json'"
run "git grep -in -e 'USDOT' -e 'DOT #' -e '4427359' -- src/ '*.html' '*.json'"
echo "--- the old MC number (CI guard bans it):"
run "git grep -in '1677498' -- ."

hdr "7. dispatch@ address (the CI guard bans it on the public site)"
run "git grep -in 'dispatch@y7agency' -- ."

echo
echo "=== END T06"
