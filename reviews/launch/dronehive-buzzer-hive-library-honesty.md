# Leftover unused — dronehive-buzzer-hive-library-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-buzzer-hive-library-honesty`
- launch: `reviews/launch/dronehive-buzzer-hive-library-honesty.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-buzzer-hive-library-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-buzzer-hive-library-honesty.patch`
- Job: `dronehive-buzzer-hive-library-honesty` — Point buzzer_hive.json library paths at host/
- Playbook: `playbooks/dronehive-buzzer-hive-library-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-buzzer-hive-library-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-buzzer-hive-library-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('configs/buzzer_hive.json').read_text(); assert 'host/library' in t and 'host/continuous/OPEN_TASKS.json' in t"

## Notes

configs/buzzer_hive.json still pins F:\\GrokSelfLibrary and D:\\GrokCoreMemory. Applyable catalog patch is patches/dronehive-buzzer-hive-library-honesty.patch on main#9. Independent of config-load-overlay (Python remap only). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

configs/buzzer_hive.json library keys only. Seed copy is a later leftover. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-buzzer-hive-library-honesty
- node src/cli.js patches --prove-after-apply --job dronehive-buzzer-hive-library-honesty
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-buzzer-hive-library-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-buzzer-hive-library-honesty.patch
- git apply /path/to/main/patches/dronehive-buzzer-hive-library-honesty.patch
- python3 -c "from pathlib import Path; t=Path('configs/buzzer_hive.json').read_text(); assert 'host/library' in t and 'host/continuous/OPEN_TASKS.json' in t"
- configs/buzzer_hive.json library.root is host/library and continuous_tasks is host/continuous/OPEN_TASKS.json.

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

