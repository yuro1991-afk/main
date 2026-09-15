# Leftover unused — opensussy-superpowers-lab-plan

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `opensussy-superpowers-lab-plan`
- launch: `reviews/launch/opensussy-superpowers-lab-plan.md`
- GitHub: https://github.com/yuro1991-afk/opensussy

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply opensussy-superpowers-lab-plan

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/opensussy
- Relaunch: https://github.com/yuro1991-afk/opensussy
- Patch: `patches/opensussy-superpowers-lab-plan.patch`
- Job: `opensussy-superpowers-lab-plan` — Point OpenSussy lab plan save-path at repo-relative docs
- Playbook: `playbooks/opensussy-superpowers-lab-plan.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job opensussy-superpowers-lab-plan`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job opensussy-superpowers-lab-plan` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/superpowers/plans/2026-08-16-opensussy-lab.md').read_text(); block=t.split('Plan complete and saved to:',1)[1].split('**Two execution options:**',1)[0]; assert 'docs/superpowers/plans/2026-08-16-opensussy-lab.md' in block; assert 'one host example' in block"

## Notes

docs/superpowers/plans/2026-08-16-opensussy-lab.md still pins G:\\AI-Home\\projects\\opensussy. Applyable catalog patch is patches/opensussy-superpowers-lab-plan.patch on main#9. Independent of SEC_REVIEW leftovers and ship-json-2-0-0. Do not copy PR #6 autofix. This token cannot push opensussy.

## Collision

Historical lab plan save-path line only. Leave CHANGELOG 1.3.0.

## First moves

- node src/cli.js patches --prove --job opensussy-superpowers-lab-plan
- node src/cli.js patches --prove-after-apply --job opensussy-superpowers-lab-plan
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-superpowers-lab-plan-from-ops
- git apply --check /path/to/main/patches/opensussy-superpowers-lab-plan.patch
- git apply /path/to/main/patches/opensussy-superpowers-lab-plan.patch
- python3 -c "from pathlib import Path; t=Path('docs/superpowers/plans/2026-08-16-opensussy-lab.md').read_text(); block=t.split('Plan complete and saved to:',1)[1].split('**Two execution options:**',1)[0]; assert 'docs/superpowers/plans/2026-08-16-opensussy-lab.md' in block; assert 'one host example' in block"
- lab plan save-path is docs/superpowers/plans/2026-08-16-opensussy-lab.md

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/opensussy — apply there

## Related

- #9 patch-catalog — Applyable sibling diffs under patches/. node src/cli.js patches lists them. Not an autofix runner.

