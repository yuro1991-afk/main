# Sync bloom grok-pwa tests to GrokHeadContext

- id: `bloom-grok-pwa-test-sync`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/bloom-fair-yellow-charm
- relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- why: This token cannot push bloom-fair-yellow-charm. Apply `patches/bloom-grok-pwa-test-sync.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

scripts/grok-pwa-plugin.test.mjs still calls positional injectGrokPwaHead / createHeadInjector. Shared API is GrokHeadContext. Align OG/twitter assertions with stripShareMetaTags + grokOgHeadTags. Independent of bloom-ci-typecheck (ci.yml). Proven 43/43 on 288a484.

## Collision

scripts/grok-pwa-plugin.test.mjs only. Independent of bloom-ci-typecheck and bloom-ci-lint. Do not edit dronehive.

## First commands

- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-grok-pwa-test-sync-from-ops
- git apply --check /path/to/main/patches/bloom-grok-pwa-test-sync.patch
- git apply /path/to/main/patches/bloom-grok-pwa-test-sync.patch

## Verify

node --test scripts/grok-pwa-plugin.test.mjs scripts/brand-check.test.mjs (43 pass).

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
