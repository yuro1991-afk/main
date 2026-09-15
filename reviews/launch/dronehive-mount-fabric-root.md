# Leftover unused — dronehive-mount-fabric-root

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-mount-fabric-root`
- launch: `reviews/launch/dronehive-mount-fabric-root.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-mount-fabric-root

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-mount-fabric-root.patch`
- Job: `dronehive-mount-fabric-root` — Point mount fabric default_drone_root at repo root
- Playbook: `playbooks/dronehive-mount-fabric-root.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-mount-fabric-root`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-mount-fabric-root` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/src/fabric.rs').read_text(); fn=t.split('fn default_drone_root',1)[1].split('}',1)[0]; assert r'G:\\AI-Home' not in fn; assert '0.5b' not in fn"

## Notes

fabric.rs default_drone_root still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-mount-fabric-root.patch on main#9. Independent of engine-out leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-mount/src/fabric.rs default_drone_root only. Leave C:\\Python candidates. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-mount-fabric-root
- node src/cli.js patches --prove-after-apply --job dronehive-mount-fabric-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-fabric-root-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-fabric-root.patch
- git apply /path/to/main/patches/dronehive-mount-fabric-root.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/src/fabric.rs').read_text(); fn=t.split('fn default_drone_root',1)[1].split('}',1)[0]; assert r'G:\\AI-Home' not in fn; assert '0.5b' not in fn"
- fabric.rs default_drone_root is .

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

