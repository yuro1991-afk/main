# Document bash START.sh in the README install block

- id: `faceswap-readme-install-sh`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: This token cannot push face-swap-ios. Apply `patches/faceswap-readme-install-sh.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

README install still shows only `START.cmd`. Linux / this pad uses `bash START.sh` (same fail-closed contract). Independent of start-sh (new file) and readme-requirements-honesty.

## Collision

README install block only. Different hunk from Requirements and honesty-env-paths footer. Do not rewrite START.cmd.

## First commands

- node src/cli.js patches --prove --job faceswap-readme-install-sh
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-readme-install-sh-from-ops
- git apply --check /path/to/main/patches/faceswap-readme-install-sh.patch
- git apply /path/to/main/patches/faceswap-readme-install-sh.patch
- python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'bash START.sh' in t and 'Linux / this pad' in t and 'fail-closed contract' in t"

## Verify

README install block mentions `bash START.sh` as the Linux/pad path.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
