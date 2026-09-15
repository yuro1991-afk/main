# Leftover unused — dronehive-future-seer-jane-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-future-seer-jane-honesty`
- launch: `reviews/launch/dronehive-future-seer-jane-honesty.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-future-seer-jane-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-future-seer-jane-honesty.patch`
- Job: `dronehive-future-seer-jane-honesty` — Point future_seer.json jane paths at host/ai-center
- Playbook: `playbooks/dronehive-future-seer-jane-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-future-seer-jane-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-future-seer-jane-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; d=json.loads(Path('configs/future_seer.json').read_text()); assert d['jane']['super_cell'] == 'host/ai-center/agents/super-cell-4' and d['jane']['pythonpath_ai_center'] == 'host/ai-center'"

## Notes

configs/future_seer.json jane.* still pins G:\\AI-Center. Applyable catalog patch is patches/dronehive-future-seer-jane-honesty.patch on main#9. Independent of config-load-overlay (Python remap only) and runtime-host-paths (future_seer.py Path wraps). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

configs/future_seer.json jane keys only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-future-seer-jane-honesty
- node src/cli.js patches --prove-after-apply --job dronehive-future-seer-jane-honesty
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-future-seer-jane-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-future-seer-jane-honesty.patch
- git apply /path/to/main/patches/dronehive-future-seer-jane-honesty.patch
- python3 -c "from pathlib import Path; import json; d=json.loads(Path('configs/future_seer.json').read_text()); assert d['jane']['super_cell'] == 'host/ai-center/agents/super-cell-4' and d['jane']['pythonpath_ai_center'] == 'host/ai-center'"
- configs/future_seer.json jane.super_cell is host/ai-center/agents/super-cell-4 and pythonpath_ai_center is host/ai-center.

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

