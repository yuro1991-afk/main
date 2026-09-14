# Add a lint-only GitHub Actions workflow for bloom

- id: `bloom-ci-lint`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/bloom-fair-yellow-charm
- relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- why: This token cannot push bloom-fair-yellow-charm. Apply `patches/bloom-ci-lint.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

`package.json` already has `lint` (`eslint .`). `bloom-ci-typecheck` only runs test + typecheck. This leftover is a new-file `.github/workflows/lint.yml`. Proven on `288a484`: 0 errors, 2 unused-var warnings, exit 0. Do not fold lint into `ci.yml`.

## Collision

New file. Independent of bloom-ci-typecheck (`ci.yml`) and bloom-health-probe (`scripts/probe-health.mjs`). Do not require `--max-warnings 0`.

## First commands

- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-ci-lint-from-ops
- git apply --check /path/to/main/patches/bloom-ci-lint.patch
- git apply /path/to/main/patches/bloom-ci-lint.patch
- npm ci && npm run lint

## Verify

`.github/workflows/lint.yml` exists and `npm run lint` exits 0. Do not mark LIVE on a failed lint.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
