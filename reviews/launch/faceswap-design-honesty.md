# Leftover unused — faceswap-design-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `faceswap-design-honesty`
- launch: `reviews/launch/faceswap-design-honesty.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply faceswap-design-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/face-swap-ios
- Relaunch: https://github.com/yuro1991-afk/face-swap-ios
- Patch: `patches/faceswap-design-honesty.patch`
- Job: `faceswap-design-honesty` — Mark DESIGN.md G: MultoModa path as one host example
- Playbook: `playbooks/faceswap-design-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job faceswap-design-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job faceswap-design-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('DESIGN.md').read_text(); assert 'FACESWAP_ENGINE' in t and 'one host example' in t and 'not the contract' in t"

## Notes

DESIGN.md still lists G:\\AI-Home\\projects\\multomoda-face-studio as the canonical path. Contract is FACESWAP_ENGINE. Applyable catalog patch is patches/faceswap-design-honesty.patch on main#9. Independent of honesty-env-paths. This token cannot push face-swap-ios.

## Collision

Docs only. Do not vendor InsightFace weights. Different file from honesty-env-paths.

## First moves

- node src/cli.js patches --prove --job faceswap-design-honesty
- node src/cli.js patches --prove-after-apply --job faceswap-design-honesty
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-design-honesty-from-ops
- git apply --check /path/to/main/patches/faceswap-design-honesty.patch
- git apply /path/to/main/patches/faceswap-design-honesty.patch
- python3 -c "from pathlib import Path; t=Path('DESIGN.md').read_text(); assert 'FACESWAP_ENGINE' in t and 'one host example' in t and 'not the contract' in t"
- DESIGN.md says FACESWAP_ENGINE is the contract and G: is one host example.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/face-swap-ios — apply there


