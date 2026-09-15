# Leftover unused — dronehive-start-seer-pythonpath

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-start-seer-pythonpath`
- launch: `reviews/launch/dronehive-start-seer-pythonpath.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-start-seer-pythonpath

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-start-seer-pythonpath.patch`
- Job: `dronehive-start-seer-pythonpath` — Point START_SEER.bat PYTHONPATH at host/ai-center
- Playbook: `playbooks/dronehive-start-seer-pythonpath.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-start-seer-pythonpath`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-start-seer-pythonpath` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('START_SEER.bat').read_text(); assert r'%ROOT%\\host\\ai-center' in t; assert r'PYTHONPATH=%ROOT%;G:\\AI-Center' not in t"

## Notes

START_SEER.bat PYTHONPATH still appends G:\\AI-Center. Applyable catalog patch is patches/dronehive-start-seer-pythonpath.patch on main#9. Independent of START_MULTI_MODEL leftover (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

START_SEER.bat PYTHONPATH line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-start-seer-pythonpath
- node src/cli.js patches --prove-after-apply --job dronehive-start-seer-pythonpath
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-start-seer-pythonpath-from-ops
- git apply --check /path/to/main/patches/dronehive-start-seer-pythonpath.patch
- git apply /path/to/main/patches/dronehive-start-seer-pythonpath.patch
- python3 -c "from pathlib import Path; t=Path('START_SEER.bat').read_text(); assert r'%ROOT%\\host\\ai-center' in t; assert r'PYTHONPATH=%ROOT%;G:\\AI-Center' not in t"
- START_SEER.bat PYTHONPATH uses %ROOT%\\host\\ai-center

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

