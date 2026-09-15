# Leftover unused — dronehive-multi-face-pythonpath

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-multi-face-pythonpath`
- launch: `reviews/launch/dronehive-multi-face-pythonpath.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-multi-face-pythonpath

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-multi-face-pythonpath.patch`
- Job: `dronehive-multi-face-pythonpath` — Point multi_face PYTHONPATH fallbacks at host/ai-center
- Playbook: `playbooks/dronehive-multi-face-pythonpath.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-multi-face-pythonpath`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-multi-face-pythonpath` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/multi_face.py').read_text(); paths=[x for x in t.splitlines() if 'PYTHONPATH' in x and 'env[' in x]; assert len(paths)==2; assert all('host/ai-center' in x for x in paths); assert all(r'G:\\AI-Center' not in x for x in paths)"

## Notes

multi_face.py PYTHONPATH still pins G:\\AI-Center. Applyable catalog patch is patches/dronehive-multi-face-pythonpath.patch on main#9. Two sites are one leftover. Independent of config-load-overlay. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

drone/multi_face.py PYTHONPATH assignments only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-multi-face-pythonpath
- node src/cli.js patches --prove-after-apply --job dronehive-multi-face-pythonpath
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-multi-face-pythonpath-from-ops
- git apply --check /path/to/main/patches/dronehive-multi-face-pythonpath.patch
- git apply /path/to/main/patches/dronehive-multi-face-pythonpath.patch
- python3 -c "from pathlib import Path; t=Path('drone/multi_face.py').read_text(); paths=[x for x in t.splitlines() if 'PYTHONPATH' in x and 'env[' in x]; assert len(paths)==2; assert all('host/ai-center' in x for x in paths); assert all(r'G:\\AI-Center' not in x for x in paths)"
- multi_face.py PYTHONPATH fallbacks use host/ai-center

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

