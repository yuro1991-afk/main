# Add typecheck/lint/test CI for bloom-fair-yellow-charm

- id: `bloom-ci-typecheck`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/bloom-fair-yellow-charm
- relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- why: This token cannot push bloom-fair-yellow-charm. Apply `patches/bloom-ci-typecheck.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

No .github/workflows. package.json already has typecheck, lint, and node --test scripts/**/*.test.mjs (brand-check, grok-pwa-plugin). Add npm ci && npm test && npm run typecheck. Fix only errors the workflow surfaces. Do not require a running :8080 preview for CI.

## Collision

Do not edit dronehive .github. Coordinate with bloom-readme-honest-export if both touch package.json scripts.

## First commands

- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-ci-typecheck-from-ops
- git apply --check /path/to/main/patches/bloom-ci-typecheck.patch
- git apply /path/to/main/patches/bloom-ci-typecheck.patch
- GitHub Actions green on those three commands. Do not mark LIVE on a failed typecheck.

## Verify

GitHub Actions green on those three commands. Do not mark LIVE on a failed typecheck.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
