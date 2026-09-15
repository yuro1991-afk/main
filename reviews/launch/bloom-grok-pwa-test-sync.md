# Leftover unused — bloom-grok-pwa-test-sync

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `bloom-grok-pwa-test-sync`
- launch: `reviews/launch/bloom-grok-pwa-test-sync.md`
- GitHub: https://github.com/yuro1991-afk/bloom-fair-yellow-charm

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply bloom-grok-pwa-test-sync

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Patch: `patches/bloom-grok-pwa-test-sync.patch`
- Job: `bloom-grok-pwa-test-sync` — Sync bloom grok-pwa tests to GrokHeadContext
- Playbook: `playbooks/bloom-grok-pwa-test-sync.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job bloom-grok-pwa-test-sync`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job bloom-grok-pwa-test-sync` (throwaways; never write /tmp/siblings)
- After apply: node --test scripts/grok-pwa-plugin.test.mjs scripts/brand-check.test.mjs

## Notes

scripts/grok-pwa-plugin.test.mjs still calls the old positional injectGrokPwaHead API. Applyable catalog patch is patches/bloom-grok-pwa-test-sync.patch on main#9. Proven 43/43 on 288a484. Independent of bloom-ci-typecheck (ci.yml). Do not copy PR #6 autofix. This token cannot push bloom-fair-yellow-charm.

## Collision

scripts/grok-pwa-plugin.test.mjs only. Independent of bloom-ci-typecheck and bloom-ci-lint. Do not edit dronehive.

## First moves

- node src/cli.js patches --prove --job bloom-grok-pwa-test-sync
- node src/cli.js patches --prove-after-apply --job bloom-grok-pwa-test-sync
- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-grok-pwa-test-sync-from-ops
- git apply --check /path/to/main/patches/bloom-grok-pwa-test-sync.patch
- git apply /path/to/main/patches/bloom-grok-pwa-test-sync.patch
- node --test scripts/grok-pwa-plugin.test.mjs scripts/brand-check.test.mjs
- node --test scripts/grok-pwa-plugin.test.mjs scripts/brand-check.test.mjs (43 pass)

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/bloom-fair-yellow-charm — apply there


