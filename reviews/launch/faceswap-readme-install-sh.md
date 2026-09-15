# Leftover unused — faceswap-readme-install-sh

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `faceswap-readme-install-sh`
- launch: `reviews/launch/faceswap-readme-install-sh.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply faceswap-readme-install-sh

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/face-swap-ios
- Relaunch: https://github.com/yuro1991-afk/face-swap-ios
- Patch: `patches/faceswap-readme-install-sh.patch`
- Job: `faceswap-readme-install-sh` — Document bash START.sh in the README install block
- Playbook: `playbooks/faceswap-readme-install-sh.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job faceswap-readme-install-sh`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job faceswap-readme-install-sh` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'bash START.sh' in t and 'Linux / this pad' in t and 'fail-closed contract' in t"

## Notes

README install still shows only START.cmd. Applyable catalog patch is patches/faceswap-readme-install-sh.patch on main#9. Independent of start-sh (new file) and readme-requirements-honesty. This token cannot push face-swap-ios.

## Collision

README install block only. Different hunk from Requirements and honesty-env-paths footer. Do not rewrite START.cmd.

## First moves

- node src/cli.js patches --prove --job faceswap-readme-install-sh
- node src/cli.js patches --prove-after-apply --job faceswap-readme-install-sh
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-readme-install-sh-from-ops
- git apply --check /path/to/main/patches/faceswap-readme-install-sh.patch
- git apply /path/to/main/patches/faceswap-readme-install-sh.patch
- python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'bash START.sh' in t and 'Linux / this pad' in t and 'fail-closed contract' in t"
- README install block mentions bash START.sh as the Linux/pad path.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/face-swap-ios — apply there

## Related

- #9 patch-catalog — Applyable sibling diffs under patches/. node src/cli.js patches lists them. Not an autofix runner.

