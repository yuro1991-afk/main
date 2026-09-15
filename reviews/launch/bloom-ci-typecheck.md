# Idle-agent relaunch — Summarize Genesis transcript

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Summarize Genesis transcript
- bcId: `bc-186c633c-95aa-57f0-9db4-dd5a8dd6e3f3`
- card: `bloom-ci-typecheck`
- launch: `reviews/launch/bloom-ci-typecheck.md`
- GitHub: https://github.com/yuro1991-afk/bloom-fair-yellow-charm

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply bloom-ci-typecheck

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Patch: `patches/bloom-ci-typecheck.patch`
- Job: `bloom-ci-typecheck` — Add typecheck/lint/test CI for bloom-fair-yellow-charm
- Playbook: `playbooks/bloom-ci-typecheck.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job bloom-ci-typecheck`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job bloom-ci-typecheck` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('.github/workflows/ci.yml').read_text(); assert 'name: ci' in t; assert 'actions/checkout@v5' in t; assert 'actions/setup-node@v5' in t; assert 'npm test' in t; assert 'npm run typecheck' in t"

## Notes

No .github/workflows. package.json already has typecheck, lint, and node --test scripts/**/*.test.mjs (brand-check, grok-pwa-plugin). Add npm ci && npm test && npm run typecheck. Fix only errors the workflow surfaces. Do not require a running :8080 preview for CI.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/bloom-ci-typecheck.patch on main#9. Do not copy PR #6 autofix.

## Collision

Do not edit dronehive .github. Coordinate with bloom-readme-honest-export if both touch package.json scripts.

## First moves

- node src/cli.js patches --prove --job bloom-ci-typecheck
- node src/cli.js patches --prove-after-apply --job bloom-ci-typecheck
- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-ci-typecheck-from-ops
- git apply --check /path/to/main/patches/bloom-ci-typecheck.patch
- git apply /path/to/main/patches/bloom-ci-typecheck.patch
- python3 -c "from pathlib import Path; t=Path('.github/workflows/ci.yml').read_text(); assert 'name: ci' in t; assert 'actions/checkout@v5' in t; assert 'actions/setup-node@v5' in t; assert 'npm test' in t; assert 'npm run typecheck' in t"
- GitHub Actions green on those three commands. Do not mark LIVE on a failed typecheck.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/bloom-fair-yellow-charm — apply there


