# Leftover unused — dronehive-multi-hosts-exe-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-multi-hosts-exe-honesty`
- launch: `reviews/launch/dronehive-multi-hosts-exe-honesty.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-multi-hosts-exe-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-multi-hosts-exe-honesty.patch`
- Job: `dronehive-multi-hosts-exe-honesty` — Point multi_hosts.json G: exe paths at host/ai-center
- Playbook: `playbooks/dronehive-multi-hosts-exe-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-multi-hosts-exe-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-multi-hosts-exe-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; hosts=json.loads(Path('configs/multi_hosts.json').read_text())['hosts']; by={h['id']:h for h in hosts}; assert by['supercell_muscle']['exe']=='host/ai-center/agents/super-cell-4/bridges/muscle_dispatch.py' and by['everest']['exe']=='host/ai-center/bridge/everest/cli.py'"

## Notes

configs/multi_hosts.json supercell_muscle and everest exe still pin G:\\AI-Center. Applyable catalog patch is patches/dronehive-multi-hosts-exe-honesty.patch on main#9. Independent of config-load-overlay (Python remap only) and future-seer-jane-honesty (different file). C:\\ AppData exe leftovers stay later. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

configs/multi_hosts.json G: exe keys only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-multi-hosts-exe-honesty
- node src/cli.js patches --prove-after-apply --job dronehive-multi-hosts-exe-honesty
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-multi-hosts-exe-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-multi-hosts-exe-honesty.patch
- git apply /path/to/main/patches/dronehive-multi-hosts-exe-honesty.patch
- python3 -c "from pathlib import Path; import json; hosts=json.loads(Path('configs/multi_hosts.json').read_text())['hosts']; by={h['id']:h for h in hosts}; assert by['supercell_muscle']['exe']=='host/ai-center/agents/super-cell-4/bridges/muscle_dispatch.py' and by['everest']['exe']=='host/ai-center/bridge/everest/cli.py'"
- configs/multi_hosts.json supercell_muscle.exe and everest.exe use host/ai-center.

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

