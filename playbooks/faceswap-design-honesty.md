# Mark DESIGN.md G: MultoModa path as one host example

- id: `faceswap-design-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: This token cannot push face-swap-ios. Apply `patches/faceswap-design-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

DESIGN.md still lists G:\AI-Home\projects\multomoda-face-studio as the canonical path. Contract is FACESWAP_ENGINE. Applyable catalog patch is patches/faceswap-design-honesty.patch on main#9. Independent of honesty-env-paths.

## Collision

Docs only. Do not vendor InsightFace weights. Different file from honesty-env-paths.

## First commands

- node src/cli.js patches --prove --job faceswap-design-honesty
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-design-honesty-from-ops
- git apply --check /path/to/main/patches/faceswap-design-honesty.patch
- git apply /path/to/main/patches/faceswap-design-honesty.patch

## Verify

DESIGN.md says FACESWAP_ENGINE is the contract and G: is one host example.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
