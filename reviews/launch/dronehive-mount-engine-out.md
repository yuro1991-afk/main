# Leftover unused — dronehive-mount-engine-out

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-mount-engine-out`
- launch: `reviews/launch/dronehive-mount-engine-out.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-mount-engine-out

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-mount-engine-out.patch`
- Job: `dronehive-mount-engine-out` — Point mount engine out_dir at apps/drone-ollama-mount/out
- Playbook: `playbooks/dronehive-mount-engine-out.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-mount-engine-out`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-mount-engine-out` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/src/engine.rs').read_text(); assert 'apps'+chr(92)+'drone-ollama-mount'+chr(92)+'out' in t; assert 'G:'+chr(92)+'AI-Home'+chr(92)+'projects'+chr(92)+'drone-ollama-mount'+chr(92)+'out' not in t"

## Notes

engine.rs out_dir still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-mount-engine-out.patch on main#9. Independent of fabric-root leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-mount/src/engine.rs out_dir only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-mount-engine-out
- node src/cli.js patches --prove-after-apply --job dronehive-mount-engine-out
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-engine-out-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-engine-out.patch
- git apply /path/to/main/patches/dronehive-mount-engine-out.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/src/engine.rs').read_text(); assert 'apps'+chr(92)+'drone-ollama-mount'+chr(92)+'out' in t; assert 'G:'+chr(92)+'AI-Home'+chr(92)+'projects'+chr(92)+'drone-ollama-mount'+chr(92)+'out' not in t"
- engine.rs out_dir uses apps\\drone-ollama-mount\\out

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

