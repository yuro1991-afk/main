# Mark README Swift IPA as Mac/Xcode only

- id: `faceswap-readme-swift-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: This token cannot push face-swap-ios. Apply `patches/faceswap-readme-swift-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

README Swift section still says the IPA is not produced on this Windows host. It is not produced on Windows, Linux, or this pad — only on a Mac with Xcode. Independent of requirements and install leftovers.

## Collision

README Swift paragraph only. Different hunk from Requirements, install, and honesty-env-paths footer. Do not vendor InsightFace weights.

## First commands

- node src/cli.js patches --prove --job faceswap-readme-swift-honesty
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-readme-swift-honesty-from-ops
- git apply --check /path/to/main/patches/faceswap-readme-swift-honesty.patch
- git apply /path/to/main/patches/faceswap-readme-swift-honesty.patch

## Verify

README Swift section says the IPA is Mac/Xcode only.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
