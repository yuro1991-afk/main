# Leftover unused — dronehive-ollama-app-bridge-paths

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-ollama-app-bridge-paths`
- launch: `reviews/launch/dronehive-ollama-app-bridge-paths.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-ollama-app-bridge-paths

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-ollama-app-bridge-paths.patch`
- Job: `dronehive-ollama-app-bridge-paths` — Point drone-ollama-app bridge constants at repo-relative paths
- Playbook: `playbooks/dronehive-ollama-app-bridge-paths.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-ollama-app-bridge-paths`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-bridge-paths` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/drone_bridge.rs').read_text(); root=next(x for x in t.splitlines() if 'DRONE_ROOT' in x and 'const' in x); assert r'G:\\AI-Home' not in root; assert '0.5b' not in root; assert 'apps'+chr(92)+'drone-ollama-mount'+chr(92)+'target'+chr(92)+'release'+chr(92)+'drone-ollama-mount.exe' in t; assert 'G:'+chr(92)+'AI-Home'+chr(92)+'projects'+chr(92)+'drone-ollama-mount'+chr(92)+'target' not in t"

## Notes

drone_bridge.rs DRONE_ROOT and MOUNT_EXE still pin G:\\AI-Home. Applyable catalog patch is patches/dronehive-ollama-app-bridge-paths.patch on main#9. Adjacent consts are one leftover. Independent of main.rs leftovers. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/drone_bridge.rs DRONE_ROOT + MOUNT_EXE only. Leave C:\\Python. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-ollama-app-bridge-paths
- node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-bridge-paths
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-bridge-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-bridge-paths.patch
- git apply /path/to/main/patches/dronehive-ollama-app-bridge-paths.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/drone_bridge.rs').read_text(); root=next(x for x in t.splitlines() if 'DRONE_ROOT' in x and 'const' in x); assert r'G:\\AI-Home' not in root; assert '0.5b' not in root; assert 'apps'+chr(92)+'drone-ollama-mount'+chr(92)+'target'+chr(92)+'release'+chr(92)+'drone-ollama-mount.exe' in t; assert 'G:'+chr(92)+'AI-Home'+chr(92)+'projects'+chr(92)+'drone-ollama-mount'+chr(92)+'target' not in t"
- drone_bridge.rs DRONE_ROOT is . and MOUNT_EXE uses apps\\drone-ollama-mount

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

