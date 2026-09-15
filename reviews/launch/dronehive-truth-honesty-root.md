# Leftover unused — dronehive-truth-honesty-root

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-truth-honesty-root`
- launch: `reviews/launch/dronehive-truth-honesty-root.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-truth-honesty-root

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-truth-honesty-root.patch`
- Job: `dronehive-truth-honesty-root` — Point TRUTH_AND_HONESTY system root at repo root
- Playbook: `playbooks/dronehive-truth-honesty-root.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-truth-honesty-root`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-truth-honesty-root` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('TRUTH_AND_HONESTY.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('**System root:**')); assert r'G:\\AI-Home' not in line; assert '0.5b' not in line"

## Notes

TRUTH_AND_HONESTY.md system root still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-truth-honesty-root.patch on main#9. Independent of truth-bind-paths JSON leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

TRUTH_AND_HONESTY.md system root line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-truth-honesty-root
- node src/cli.js patches --prove-after-apply --job dronehive-truth-honesty-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-truth-honesty-root-from-ops
- git apply --check /path/to/main/patches/dronehive-truth-honesty-root.patch
- git apply /path/to/main/patches/dronehive-truth-honesty-root.patch
- python3 -c "from pathlib import Path; t=Path('TRUTH_AND_HONESTY.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('**System root:**')); assert r'G:\\AI-Home' not in line; assert '0.5b' not in line"
- TRUTH_AND_HONESTY.md system root is .

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there

## Related

- #9 patch-catalog — Applyable sibling diffs under patches/. node src/cli.js patches lists them. Not an autofix runner.

