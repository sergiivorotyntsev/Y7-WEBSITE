#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE_PATH = path.join(ROOT, 'scripts', 'lint-baseline.json');
const ESLINT_PATH = path.join(ROOT, 'node_modules', 'eslint', 'bin', 'eslint.js');
const TEST_ERROR_FLAG = '--inject-test-error';
const TEST_WARNING_FLAG = '--inject-test-warning';
const TEST_FIXTURE_FLAGS = new Set([TEST_ERROR_FLAG, TEST_WARNING_FLAG]);

function compareFindings(a, b) {
  return a.file.localeCompare(b.file)
    || a.line - b.line
    || a.column - b.column
    || a.severity.localeCompare(b.severity)
    || (a.ruleId ?? '').localeCompare(b.ruleId ?? '')
    || a.message.localeCompare(b.message);
}

function collectFindings(reports) {
  return reports
    .flatMap((report) => report.messages
      .filter((message) => message.severity === 1 || message.severity === 2)
      .map((message) => ({
        file: path.relative(ROOT, report.filePath).split(path.sep).join('/'),
        line: message.line,
        column: message.column,
        severity: message.severity === 2 ? 'error' : 'warning',
        ruleId: message.ruleId,
        message: message.message,
      })))
    .sort(compareFindings);
}

function countBySeverity(findings) {
  return {
    errors: findings.filter(({ severity }) => severity === 'error').length,
    warnings: findings.filter(({ severity }) => severity === 'warning').length,
  };
}

function fingerprint(finding) {
  return JSON.stringify([
    finding.file,
    finding.line,
    finding.column,
    finding.severity,
    finding.ruleId,
    finding.message,
  ]);
}

function formatFinding(finding) {
  const rule = finding.ruleId ?? 'eslint/internal';
  const summary = finding.message.split('\n', 1)[0];
  return `${finding.severity} ${finding.file}:${finding.line}:${finding.column} ${rule} ${summary}`;
}

function readBaseline() {
  const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
  if (baseline.schemaVersion !== 1 || !Array.isArray(baseline.findings)) {
    throw new Error(`Unsupported lint baseline schema in ${BASELINE_PATH}`);
  }

  const recordedCounts = countBySeverity(baseline.findings);
  if (recordedCounts.errors !== baseline.limits?.errors
    || recordedCounts.warnings !== baseline.limits?.warnings) {
    throw new Error('Lint baseline limits do not match its recorded findings');
  }

  return baseline;
}

function runEslint() {
  const result = spawnSync(
    process.execPath,
    [ESLINT_PATH, '.', '--format', 'json'],
    {
      cwd: ROOT,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    },
  );

  if (result.error) throw result.error;
  if (result.signal) throw new Error(`ESLint terminated by signal ${result.signal}`);
  if (result.status !== 0 && result.status !== 1) {
    const detail = result.stderr.trim() || result.stdout.trim() || 'no diagnostic output';
    throw new Error(`ESLint could not complete (exit ${result.status}): ${detail}`);
  }

  try {
    return collectFindings(JSON.parse(result.stdout));
  } catch (error) {
    throw new Error(`Could not parse ESLint JSON output: ${error.message}`);
  }
}

function reportFindingDrift(baselineFindings, currentFindings) {
  const baselineSet = new Set(baselineFindings.map(fingerprint));
  const currentSet = new Set(currentFindings.map(fingerprint));
  const added = currentFindings.filter((finding) => !baselineSet.has(fingerprint(finding)));
  const removed = baselineFindings.filter((finding) => !currentSet.has(fingerprint(finding)));

  if (added.length === 0 && removed.length === 0) {
    console.log('Finding identities match the committed baseline.');
    return;
  }

  console.log(`Finding identity drift: ${added.length} added, ${removed.length} removed.`);
  for (const finding of added) console.log(`  + ${formatFinding(finding)}`);
  for (const finding of removed) console.log(`  - ${formatFinding(finding)}`);
}

function main() {
  const args = process.argv.slice(2);
  const unknownArgs = args.filter((arg) => !TEST_FIXTURE_FLAGS.has(arg));
  if (unknownArgs.length > 0) {
    throw new Error(`Unknown argument(s): ${unknownArgs.join(', ')}`);
  }

  const baseline = readBaseline();
  const currentFindings = runEslint();

  if (args.includes(TEST_ERROR_FLAG)) {
    currentFindings.push({
      file: '__fixture__/new-lint-error.js',
      line: 1,
      column: 1,
      severity: 'error',
      ruleId: 'fixture/new-error',
      message: 'Synthetic lint regression for gate validation.',
    });
    console.log('Fixture mode: injected one in-memory error; no source file was changed.');
  }
  if (args.includes(TEST_WARNING_FLAG)) {
    currentFindings.push({
      file: '__fixture__/new-lint-warning.js',
      line: 1,
      column: 1,
      severity: 'warning',
      ruleId: 'fixture/new-warning',
      message: 'Synthetic lint regression for gate validation.',
    });
    console.log('Fixture mode: injected one in-memory warning; no source file was changed.');
  }
  currentFindings.sort(compareFindings);

  const currentCounts = countBySeverity(currentFindings);
  console.log(
    `Lint baseline: ${baseline.limits.errors} errors / ${baseline.limits.warnings} warnings; `
      + `current: ${currentCounts.errors} errors / ${currentCounts.warnings} warnings.`,
  );
  reportFindingDrift(baseline.findings, currentFindings);

  const increases = [];
  if (currentCounts.errors > baseline.limits.errors) {
    increases.push(`errors increased by ${currentCounts.errors - baseline.limits.errors}`);
  }
  if (currentCounts.warnings > baseline.limits.warnings) {
    increases.push(`warnings increased by ${currentCounts.warnings - baseline.limits.warnings}`);
  }

  if (increases.length > 0) {
    console.error(`FAIL: lint baseline exceeded (${increases.join('; ')}).`);
    process.exitCode = 1;
    return;
  }

  console.log('PASS: lint errors and warnings did not exceed the committed baseline.');
}

try {
  main();
} catch (error) {
  console.error(`Lint baseline check failed to run: ${error.message}`);
  process.exitCode = 2;
}
