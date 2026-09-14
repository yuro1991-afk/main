# Idle-agent relaunch — Summarize Genesis transcript

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Summarize Genesis transcript
- bcId: `bc-186c633c-95aa-57f0-9db4-dd5a8dd6e3f3`
- card: `bloom-ci-typecheck`
- launch: `reviews/launch/bloom-ci-typecheck.md`
- GitHub: https://github.com/yuro1991-afk/bloom-fair-yellow-charm

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — bloom-ci-typecheck

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Git: `github.com/yuro1991-afk/bloom-fair-yellow-charm`
- Job: `bloom-ci-typecheck` — Add typecheck/lint/test CI for bloom-fair-yellow-charm
- Packet: `reviews/handoff-bloom-ci-typecheck.md`
- Playbook: `playbooks/bloom-ci-typecheck.md`
- Priority: 20
- Verify: GitHub Actions green on those three commands. Do not mark LIVE on a failed typecheck.

## Notes

No .github/workflows. package.json already has typecheck, lint, and node --test scripts/**/*.test.mjs (brand-check, grok-pwa-plugin). Add npm ci && npm test && npm run typecheck. Fix only errors the workflow surfaces. Do not require a running :8080 preview for CI.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Do not edit dronehive .github. Coordinate with bloom-readme-honest-export if both touch package.json scripts.

## First moves

- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-ci-typecheck-from-ops
- edit: .github/workflows/ci.yml, package.json, scripts/brand-check.test.mjs, scripts/grok-pwa-plugin.test.mjs
- GitHub Actions green on those three commands. Do not mark LIVE on a failed typecheck.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


