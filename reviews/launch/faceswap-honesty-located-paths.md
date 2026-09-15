# Leftover unused — faceswap-honesty-located-paths

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `faceswap-honesty-located-paths`
- launch: `reviews/launch/faceswap-honesty-located-paths.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply faceswap-honesty-located-paths

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/face-swap-ios
- Relaunch: https://github.com/yuro1991-afk/face-swap-ios
- Patch: `patches/faceswap-honesty-located-paths.patch`
- Job: `faceswap-honesty-located-paths` — Mark HONESTY.md Located G: paths as one host example
- Playbook: `playbooks/faceswap-honesty-located-paths.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job faceswap-honesty-located-paths`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job faceswap-honesty-located-paths` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('HONESTY.md').read_text(); path=next(x for x in t.splitlines() if x.startswith('- Path:')); models=next(x for x in t.splitlines() if x.startswith('- Models:')); assert 'one host example' in path; assert 'FACESWAP_ENGINE' in path; assert 'one host example' in models; assert 'weights stay off git' in models"

## Notes

HONESTY.md Located Path/Models still list G:\\AI-Home as the canonical host. Contract is FACESWAP_ENGINE. Applyable catalog patch is patches/faceswap-honesty-located-paths.patch on main#9. Adjacent Located lines are one leftover. Independent of honesty-env-paths footer. Do not copy PR #6 autofix. This token cannot push face-swap-ios.

## Collision

HONESTY.md Located Path/Models only. Different hunk from honesty-env-paths footer. Do not vendor InsightFace weights.

## First moves

- node src/cli.js patches --prove --job faceswap-honesty-located-paths
- node src/cli.js patches --prove-after-apply --job faceswap-honesty-located-paths
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-honesty-located-paths-from-ops
- git apply --check /path/to/main/patches/faceswap-honesty-located-paths.patch
- git apply /path/to/main/patches/faceswap-honesty-located-paths.patch
- python3 -c "from pathlib import Path; t=Path('HONESTY.md').read_text(); path=next(x for x in t.splitlines() if x.startswith('- Path:')); models=next(x for x in t.splitlines() if x.startswith('- Models:')); assert 'one host example' in path; assert 'FACESWAP_ENGINE' in path; assert 'one host example' in models; assert 'weights stay off git' in models"
- HONESTY.md Located Path/Models say G: is one host example and FACESWAP_ENGINE is the contract.

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

