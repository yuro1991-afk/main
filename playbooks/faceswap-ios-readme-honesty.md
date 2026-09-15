# Mark ios/README gateway URL as FACESWAP_ENGINE, not Windows-only

- id: `faceswap-ios-readme-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: This token cannot push face-swap-ios. Apply `patches/faceswap-ios-readme-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

ios/README.md still says set the gateway URL to the Windows LAN address printed by START.cmd. Contract is FACESWAP_ENGINE. START.sh is the Linux leftover on the same catalog.

## Collision

Docs only. Different file from DESIGN.md and START.sh. Do not vendor InsightFace weights.

## First commands

- node src/cli.js patches --prove --job faceswap-ios-readme-honesty
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-ios-readme-honesty-from-ops
- git apply --check /path/to/main/patches/faceswap-ios-readme-honesty.patch
- git apply /path/to/main/patches/faceswap-ios-readme-honesty.patch
- python3 -c "from pathlib import Path; t=Path('ios/README.md').read_text(); assert 'FACESWAP_ENGINE' in t and 'START.sh' in t and 'one example, not the contract' in t"

## Verify

ios/README.md cites START.cmd / START.sh and FACESWAP_ENGINE. Windows LAN / G: is one host example.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
