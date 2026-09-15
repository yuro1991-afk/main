# Leftover unused — opensussy-superpowers-lab-design

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `opensussy-superpowers-lab-design`
- launch: `reviews/launch/opensussy-superpowers-lab-design.md`
- GitHub: https://github.com/yuro1991-afk/opensussy

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply opensussy-superpowers-lab-design

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/opensussy
- Relaunch: https://github.com/yuro1991-afk/opensussy
- Patch: `patches/opensussy-superpowers-lab-design.patch`
- Job: `opensussy-superpowers-lab-design` — Point OpenSussy lab design base codebase at repo root
- Playbook: `playbooks/opensussy-superpowers-lab-design.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job opensussy-superpowers-lab-design`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job opensussy-superpowers-lab-design` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/superpowers/specs/2026-08-16-opensussy-lab-design.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('**Base codebase:**')); assert 'one host example' in line; assert 'OpenSussy 1.3.0' in line"

## Notes

docs/superpowers/specs/2026-08-16-opensussy-lab-design.md still pins G:\\AI-Home\\projects\\opensussy. Applyable catalog patch is patches/opensussy-superpowers-lab-design.patch on main#9. Independent of the plan leftover (different file) and SEC_REVIEW leftovers. Do not copy PR #6 autofix. This token cannot push opensussy.

## Collision

Historical lab design Base codebase line only. Leave CHANGELOG 1.3.0.

## First moves

- node src/cli.js patches --prove --job opensussy-superpowers-lab-design
- node src/cli.js patches --prove-after-apply --job opensussy-superpowers-lab-design
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-superpowers-lab-design-from-ops
- git apply --check /path/to/main/patches/opensussy-superpowers-lab-design.patch
- git apply /path/to/main/patches/opensussy-superpowers-lab-design.patch
- python3 -c "from pathlib import Path; t=Path('docs/superpowers/specs/2026-08-16-opensussy-lab-design.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('**Base codebase:**')); assert 'one host example' in line; assert 'OpenSussy 1.3.0' in line"
- lab design base codebase is .

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

