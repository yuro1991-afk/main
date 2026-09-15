# Add a Linux START.sh that fail-closes like START.cmd

- id: `faceswap-start-sh`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: This token cannot push face-swap-ios. Apply `patches/faceswap-start-sh.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

START.cmd is Windows-only. Add START.sh that honors FACESWAP_ENGINE and exits 1 when the engine health check fails. Applyable catalog patch is patches/faceswap-start-sh.patch on main#9. New file; stacks with honesty-env-paths and health-offline. This token cannot push face-swap-ios.

## Collision

New file only. Do not vendor InsightFace weights. Do not change POST /api/ios/swap.

## First commands

- node src/cli.js patches --prove --job faceswap-start-sh
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-start-sh-from-ops
- git apply --check /path/to/main/patches/faceswap-start-sh.patch
- git apply /path/to/main/patches/faceswap-start-sh.patch
- python3 -c "from pathlib import Path; t=Path('START.sh').read_text(); assert 'Face Swap iOS gateway' in t; assert 'RED: engine is not reachable at' in t; assert 'set FACESWAP_ENGINE to its health base URL' in t; assert 'exec python3 ./gateway.py' in t"

## Verify

FACESWAP_ENGINE=http://127.0.0.1:9 ./START.sh exits 1 and prints RED.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
