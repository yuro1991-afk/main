# Mark README Requirements Windows host as one example

- id: `faceswap-readme-requirements-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: This token cannot push face-swap-ios. Apply `patches/faceswap-readme-requirements-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

README Requirements still says the engine must be a Windows host with MultoModa. The contract is `FACESWAP_ENGINE`. Independent of honesty-env-paths (footer only) and ios-readme-honesty.

## Collision

README Requirements bullet only. Different hunk from honesty-env-paths footer. Do not rewrite START.cmd.

## First commands

- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-readme-requirements-honesty-from-ops
- git apply --check /path/to/main/patches/faceswap-readme-requirements-honesty.patch
- git apply /path/to/main/patches/faceswap-readme-requirements-honesty.patch

## Verify

README Requirements names `FACESWAP_ENGINE` and says a Windows MultoModa host is one example.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
