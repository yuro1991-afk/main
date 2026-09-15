# Leftover unused — dronehive-grok-handoff-clone-dest

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-grok-handoff-clone-dest`
- launch: `reviews/launch/dronehive-grok-handoff-clone-dest.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-grok-handoff-clone-dest

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-grok-handoff-clone-dest.patch`
- Job: `dronehive-grok-handoff-clone-dest` — Point grok_handoff clone dest defaults at host/ai-home
- Playbook: `playbooks/dronehive-grok-handoff-clone-dest.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-grok-handoff-clone-dest`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-grok-handoff-clone-dest` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/grok_handoff.py').read_text(); dests=[x for x in t.splitlines() if 'dest = r' in x]; assert len(dests)==2; assert all('host/ai-home/projects/dronehive-clone-test' in x for x in dests); assert all(r'G:\\AI-Home' not in x for x in dests)"

## Notes

grok_handoff.py clone dest still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-grok-handoff-clone-dest.patch on main#9. Two dest assignments are one leftover. Independent of runtime-host-paths DEFAULT_ROOT wrap. Leave the G: goal regex. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

drone/grok_handoff.py clone dest defaults only. Leave the G: goal regex. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-grok-handoff-clone-dest
- node src/cli.js patches --prove-after-apply --job dronehive-grok-handoff-clone-dest
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-grok-handoff-clone-dest-from-ops
- git apply --check /path/to/main/patches/dronehive-grok-handoff-clone-dest.patch
- git apply /path/to/main/patches/dronehive-grok-handoff-clone-dest.patch
- python3 -c "from pathlib import Path; t=Path('drone/grok_handoff.py').read_text(); dests=[x for x in t.splitlines() if 'dest = r' in x]; assert len(dests)==2; assert all('host/ai-home/projects/dronehive-clone-test' in x for x in dests); assert all(r'G:\\AI-Home' not in x for x in dests)"
- grok_handoff.py clone dest defaults use host/ai-home/projects/dronehive-clone-test

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

