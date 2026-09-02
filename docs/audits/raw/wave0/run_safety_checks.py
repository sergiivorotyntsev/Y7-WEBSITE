"""[WAVE0-T03] Run safety-check.yml's shell steps locally, exactly as CI runs them.

WHY THIS EXISTS. The guard had not passed in at least 47 days and nobody could see
which step was refusing without opening a GitHub run log. This executes the steps'
own `run:` scripts against the working tree, with the job-level `env:` applied, and
prints a pass/fail line per step -- so the mutation proof (T03) can be performed and
repeated on a laptop.

It does NOT run the Node/build steps (`uses:` steps and the ones that need `npm ci`);
those are reported as SKIPPED with their names, because their status is a separate
question this sprint deliberately does not widen into.

Usage:
    python docs/audits/raw/wave0/run_safety_checks.py            # all shell steps
    python docs/audits/raw/wave0/run_safety_checks.py --only address
Exit code: 0 if every executed step passed, 1 otherwise.
"""

import os
import re
import subprocess
import sys

import yaml

WF = ".github/workflows/safety-check.yml"
NEEDS_BUILD = re.compile(r"npm ci|npm run build|dist/", re.I)


def find_bash() -> str:
    """The bash that has GNU grep, not the one Windows puts first on PATH.

    On Windows, `bash` resolves to C:\\Windows\\System32\\bash.exe -- the WSL
    launcher -- which fails with `execvpe(/bin/bash)` if no distro is installed
    and reports every step as FAILED. Sixteen meaningless failures look exactly
    like sixteen real ones, so the binary is chosen explicitly.
    """
    for cand in (
        os.environ.get("WAVE0_BASH"),
        r"C:\Program Files\Git\bin\bash.exe",
        r"C:\Program Files\Git\usr\bin\bash.exe",
        "/bin/bash",
        "/usr/bin/bash",
    ):
        if cand and os.path.exists(cand):
            return cand
    return "bash"


BASH = find_bash()


def main() -> int:
    only = None
    if "--only" in sys.argv:
        only = sys.argv[sys.argv.index("--only") + 1].lower()

    doc = yaml.safe_load(open(WF, encoding="utf-8"))
    job = doc["jobs"]["safety"]
    env = dict(os.environ)
    env.update({k: str(v) for k, v in (job.get("env") or {}).items()})

    failed, passed, skipped = [], [], []
    for step in job["steps"]:
        name = step.get("name", "(unnamed)")
        script = step.get("run")
        if script is None:
            skipped.append((name, "uses: action"))
            continue
        if NEEDS_BUILD.search(script):
            skipped.append((name, "needs npm ci / dist"))
            continue
        if only and only not in name.lower():
            continue

        proc = subprocess.run(
            [BASH, "-c", script], env=env, capture_output=True, text=True,
            encoding="utf-8", errors="replace"
        )
        soft = bool(step.get("continue-on-error"))
        ok = proc.returncode == 0 or soft
        tag = "PASS" if proc.returncode == 0 else ("WARN" if soft else "FAIL")
        print(f"[{tag}] {name}")
        for line in ((proc.stdout or "") + (proc.stderr or "")).strip().splitlines():
            print(f"        {line[:160]}")
        (passed if ok else failed).append(name)

    print()
    print(f"executed: {len(passed) + len(failed)}   passed: {len(passed)}   FAILED: {len(failed)}")
    for n in failed:
        print(f"   FAILED -> {n}")
    if skipped:
        print(f"not executed here ({len(skipped)}):")
        for n, why in skipped:
            print(f"   - {n}  [{why}]")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
