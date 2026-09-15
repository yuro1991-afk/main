# Leftover unused — faceswap-ios-readme-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `faceswap-ios-readme-honesty`
- launch: `reviews/launch/faceswap-ios-readme-honesty.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply faceswap-ios-readme-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/face-swap-ios
- Relaunch: https://github.com/yuro1991-afk/face-swap-ios
- Patch: `patches/faceswap-ios-readme-honesty.patch`
- Job: `faceswap-ios-readme-honesty` — Mark ios/README gateway URL as FACESWAP_ENGINE, not Windows-only
- Playbook: `playbooks/faceswap-ios-readme-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job faceswap-ios-readme-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job faceswap-ios-readme-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('ios/README.md').read_text(); assert 'FACESWAP_ENGINE' in t and 'START.sh' in t and 'one example, not the contract' in t"

## Notes

ios/README.md still says set the gateway URL to the Windows LAN address printed by START.cmd. Applyable catalog patch is patches/faceswap-ios-readme-honesty.patch on main#9. Independent of design-honesty (DESIGN.md) and start-sh (new file). This token cannot push face-swap-ios.

## Collision

Docs only. Different file from DESIGN.md and START.sh. Do not vendor InsightFace weights.

## First moves

- node src/cli.js patches --prove --job faceswap-ios-readme-honesty
- node src/cli.js patches --prove-after-apply --job faceswap-ios-readme-honesty
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-ios-readme-honesty-from-ops
- git apply --check /path/to/main/patches/faceswap-ios-readme-honesty.patch
- git apply /path/to/main/patches/faceswap-ios-readme-honesty.patch
- python3 -c "from pathlib import Path; t=Path('ios/README.md').read_text(); assert 'FACESWAP_ENGINE' in t and 'START.sh' in t and 'one example, not the contract' in t"
- ios/README.md cites START.cmd / START.sh and FACESWAP_ENGINE. Windows LAN / G: is one host example.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/face-swap-ios — apply there


