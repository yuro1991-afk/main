# Leftover unused — dronehive-future-seer-pythonpath

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-future-seer-pythonpath`
- launch: `reviews/launch/dronehive-future-seer-pythonpath.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-future-seer-pythonpath

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-future-seer-pythonpath.patch`
- Job: `dronehive-future-seer-pythonpath` — Point future_seer PYTHONPATH jane fallbacks at host/ai-center
- Playbook: `playbooks/dronehive-future-seer-pythonpath.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-future-seer-pythonpath`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-future-seer-pythonpath` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/future_seer.py').read_text(); paths=[x for x in t.splitlines() if 'pythonpath_ai_center' in x and 'PYTHONPATH' in x]; assert len(paths)==3; assert all('host/ai-center' in x for x in paths); assert all(r'G:\\AI-Center' not in x for x in paths)"

## Notes

future_seer.py PYTHONPATH jane fallback still pins G:\\AI-Center. Applyable catalog patch is patches/dronehive-future-seer-pythonpath.patch on main#9. Three sites are one leftover. Independent of jane JSON leftover and runtime outbox wrap. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

drone/future_seer.py PYTHONPATH jane fallbacks only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-future-seer-pythonpath
- node src/cli.js patches --prove-after-apply --job dronehive-future-seer-pythonpath
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-future-seer-pythonpath-from-ops
- git apply --check /path/to/main/patches/dronehive-future-seer-pythonpath.patch
- git apply /path/to/main/patches/dronehive-future-seer-pythonpath.patch
- python3 -c "from pathlib import Path; t=Path('drone/future_seer.py').read_text(); paths=[x for x in t.splitlines() if 'pythonpath_ai_center' in x and 'PYTHONPATH' in x]; assert len(paths)==3; assert all('host/ai-center' in x for x in paths); assert all(r'G:\\AI-Center' not in x for x in paths)"
- future_seer.py PYTHONPATH jane fallbacks use host/ai-center

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

