# Leftover unused — faceswap-start-sh

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `faceswap-start-sh`
- launch: `reviews/launch/faceswap-start-sh.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply faceswap-start-sh

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/face-swap-ios
- Relaunch: https://github.com/yuro1991-afk/face-swap-ios
- Patch: `patches/faceswap-start-sh.patch`
- Job: `faceswap-start-sh` — Add a Linux START.sh that fail-closes like START.cmd
- Playbook: `playbooks/faceswap-start-sh.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job faceswap-start-sh`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job faceswap-start-sh` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('START.sh').read_text(); assert 'Face Swap iOS gateway' in t; assert 'RED: engine is not reachable at' in t; assert 'set FACESWAP_ENGINE to its health base URL' in t; assert 'exec python3 ./gateway.py' in t"

## Notes

START.cmd is Windows-only. Add START.sh that honors FACESWAP_ENGINE and exits 1 when the engine health check fails. Applyable catalog patch is patches/faceswap-start-sh.patch on main#9. New file; stacks with honesty-env-paths and health-offline. This token cannot push face-swap-ios.

## Collision

New file only. Do not vendor InsightFace weights. Do not change POST /api/ios/swap.

## First moves

- node src/cli.js patches --prove --job faceswap-start-sh
- node src/cli.js patches --prove-after-apply --job faceswap-start-sh
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-start-sh-from-ops
- git apply --check /path/to/main/patches/faceswap-start-sh.patch
- git apply /path/to/main/patches/faceswap-start-sh.patch
- python3 -c "from pathlib import Path; t=Path('START.sh').read_text(); assert 'Face Swap iOS gateway' in t; assert 'RED: engine is not reachable at' in t; assert 'set FACESWAP_ENGINE to its health base URL' in t; assert 'exec python3 ./gateway.py' in t"
- START.sh has Face Swap iOS gateway. Do not run START.sh.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/face-swap-ios — apply there


