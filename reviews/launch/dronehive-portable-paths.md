# Idle-agent relaunch — Genesis inventory handoff

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Genesis inventory handoff
- bcId: `bc-3a1e5eed-7d37-5cfc-bdd8-939ebc0b84aa`
- card: `dronehive-portable-paths`
- launch: `reviews/launch/dronehive-portable-paths.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply dronehive-portable-paths

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-portable-paths.patch`
- Job: `dronehive-portable-paths` — Resolve dronehive host paths via env / app_root
- Playbook: `playbooks/dronehive-portable-paths.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-portable-paths`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-portable-paths` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; h=Path('drone/host_paths.py').read_text(); assert 'Resolve BOSS Windows host paths via env / app_root.' in h; assert 'not the Linux contract' in h; assert 'def resolve_host_path' in h; e=Path('.env.example').read_text(); assert 'Host path overlay (Linux / this pad)' in e; assert 'DRONEHIVE_LIBRARY_ROOT' in e; w=Path('configs/work_order.json').read_text(); assert 'path_overlay' in w; assert 'Linux uses env or app_root()/host.' in w"

## Notes

Hardcoded F:\GrokSelfLibrary, D:\GrokCoreMemory, G:\AI-Home\... leak onto Linux cwd. Not on PR #1 or #2. Applyable catalog patch is patches/dronehive-portable-paths.patch on main#9. Do not copy PR #6 autofix. This token cannot push dronehive.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Avoid drone/pro/tool_agent.py while unicode-ci is claimed.

## First moves

- node src/cli.js patches --prove --job dronehive-portable-paths
- node src/cli.js patches --prove-after-apply --job dronehive-portable-paths
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-portable-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-portable-paths.patch
- git apply /path/to/main/patches/dronehive-portable-paths.patch
- python3 -c "from pathlib import Path; h=Path('drone/host_paths.py').read_text(); assert 'Resolve BOSS Windows host paths via env / app_root.' in h; assert 'not the Linux contract' in h; assert 'def resolve_host_path' in h; e=Path('.env.example').read_text(); assert 'Host path overlay (Linux / this pad)' in e; assert 'DRONEHIVE_LIBRARY_ROOT' in e; w=Path('configs/work_order.json').read_text(); assert 'path_overlay' in w; assert 'Linux uses env or app_root()/host.' in w"
- drone/host_paths.py has resolve_host_path. Do not run work-order-show.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there


