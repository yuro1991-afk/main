# Add typecheck/lint/test CI for bloom-fair-yellow-charm

- id: `bloom-ci-typecheck`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/bloom-fair-yellow-charm
- relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- why: Relaunch against the named repo. This landing-pad token cannot push it.

## Notes

No .github/workflows. package.json already has typecheck, lint, and node --test scripts/**/*.test.mjs (brand-check, grok-pwa-plugin). Add npm ci && npm test && npm run typecheck. Fix only errors the workflow surfaces. Do not require a running :8080 preview for CI.

## Collision

Do not edit dronehive .github. Coordinate with bloom-readme-honest-export if both touch package.json scripts.

## First commands

- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-ci-typecheck-from-ops
- edit: .github/workflows/ci.yml, package.json, scripts/brand-check.test.mjs, scripts/grok-pwa-plugin.test.mjs
- GitHub Actions green on those three commands. Do not mark LIVE on a failed typecheck.

## Verify

GitHub Actions green on those three commands. Do not mark LIVE on a failed typecheck.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
