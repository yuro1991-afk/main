# Leftover unused — dronehive-bench-goal-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-bench-goal-honesty`
- launch: `reviews/launch/dronehive-bench-goal-honesty.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-bench-goal-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-bench-goal-honesty.patch`
- Job: `dronehive-bench-goal-honesty` — Mark bench GOAL G: path as one host example
- Playbook: `playbooks/dronehive-bench-goal-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-bench-goal-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-bench-goal-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('scripts/bench_vs_helpers.py').read_text(); assert 'under host/' in t and 'one host example' in t"

## Notes

scripts/bench_vs_helpers.py GOAL still says paths under G:\\AI-Home. Applyable catalog patch is patches/dronehive-bench-goal-honesty.patch on main#9. Independent of script-host-roots (ROOT/MUSCLE/out_dir hunks only). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

GOAL string only. Same file as script-host-roots but different hunks. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-bench-goal-honesty
- node src/cli.js patches --prove-after-apply --job dronehive-bench-goal-honesty
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-bench-goal-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-bench-goal-honesty.patch
- git apply /path/to/main/patches/dronehive-bench-goal-honesty.patch
- python3 -c "from pathlib import Path; t=Path('scripts/bench_vs_helpers.py').read_text(); assert 'under host/' in t and 'one host example' in t"
- scripts/bench_vs_helpers.py GOAL mentions host/ and that G:\\AI-Home is one host example.

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

