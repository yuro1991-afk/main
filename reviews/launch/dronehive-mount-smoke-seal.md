# Leftover unused — dronehive-mount-smoke-seal

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-mount-smoke-seal`
- launch: `reviews/launch/dronehive-mount-smoke-seal.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-mount-smoke-seal

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-mount-smoke-seal.patch`
- Job: `dronehive-mount-smoke-seal` — Point mount SMOKE_SEAL at apps/drone-ollama-mount/out
- Playbook: `playbooks/dronehive-mount-smoke-seal.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-mount-smoke-seal`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-mount-smoke-seal` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/src/main.rs').read_text(); assert 'apps'+chr(92)+'drone-ollama-mount'+chr(92)+'out'+chr(92)+'SMOKE_SEAL.json' in t; assert 'G:'+chr(92)+'AI-Home'+chr(92)+'projects'+chr(92)+'drone-ollama-mount'+chr(92)+'out'+chr(92)+'SMOKE_SEAL.json' not in t"

## Notes

mount main.rs SMOKE_SEAL still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-mount-smoke-seal.patch on main#9. Independent of swarm-seal leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-mount/src/main.rs SMOKE_SEAL only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-mount-smoke-seal
- node src/cli.js patches --prove-after-apply --job dronehive-mount-smoke-seal
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-smoke-seal-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-smoke-seal.patch
- git apply /path/to/main/patches/dronehive-mount-smoke-seal.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/src/main.rs').read_text(); assert 'apps'+chr(92)+'drone-ollama-mount'+chr(92)+'out'+chr(92)+'SMOKE_SEAL.json' in t; assert 'G:'+chr(92)+'AI-Home'+chr(92)+'projects'+chr(92)+'drone-ollama-mount'+chr(92)+'out'+chr(92)+'SMOKE_SEAL.json' not in t"
- mount main.rs SMOKE_SEAL uses apps\\drone-ollama-mount\\out

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

