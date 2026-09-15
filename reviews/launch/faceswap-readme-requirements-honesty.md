# Leftover unused — faceswap-readme-requirements-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `faceswap-readme-requirements-honesty`
- launch: `reviews/launch/faceswap-readme-requirements-honesty.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply faceswap-readme-requirements-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/face-swap-ios
- Relaunch: https://github.com/yuro1991-afk/face-swap-ios
- Patch: `patches/faceswap-readme-requirements-honesty.patch`
- Job: `faceswap-readme-requirements-honesty` — Mark README Requirements Windows host as one example
- Playbook: `playbooks/faceswap-readme-requirements-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job faceswap-readme-requirements-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job faceswap-readme-requirements-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'Engine healthy at' in t and 'FACESWAP_ENGINE' in t and 'one example, not the contract' in t"

## Notes

README Requirements still says Windows host with MultoModa. Applyable catalog patch is patches/faceswap-readme-requirements-honesty.patch on main#9. Independent of honesty-env-paths (footer only) and ios-readme-honesty. This token cannot push face-swap-ios.

## Collision

README Requirements bullet only. Different hunk from honesty-env-paths footer. Do not rewrite START.cmd.

## First moves

- node src/cli.js patches --prove --job faceswap-readme-requirements-honesty
- node src/cli.js patches --prove-after-apply --job faceswap-readme-requirements-honesty
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-readme-requirements-honesty-from-ops
- git apply --check /path/to/main/patches/faceswap-readme-requirements-honesty.patch
- git apply /path/to/main/patches/faceswap-readme-requirements-honesty.patch
- python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'Engine healthy at' in t and 'FACESWAP_ENGINE' in t and 'one example, not the contract' in t"
- README Requirements names FACESWAP_ENGINE and says a Windows MultoModa host is one example.

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

