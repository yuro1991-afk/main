# Leftover unused — dronehive-script-host-roots

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-script-host-roots`
- launch: `reviews/launch/dronehive-script-host-roots.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-script-host-roots

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-script-host-roots.patch`
- Job: `dronehive-script-host-roots` — Point dronehive scripts at repo root instead of G: AI-Home
- Playbook: `playbooks/dronehive-script-host-roots.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-script-host-roots`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-script-host-roots` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; fs=('scripts/bench_vs_helpers.py','scripts/smoke_delegate_wire.py','scripts/stress_ai_bus_hive.py'); assert all('Path(__file__).resolve().parents[1]' in Path(f).read_text() and r'G:\\AI-Home' not in Path(f).read_text() for f in fs)"

## Notes

scripts/bench_vs_helpers.py, smoke_delegate_wire.py, and stress_ai_bus_hive.py hardcode G:\AI-Home\projects\ai-worker-drone-0.5b. Applyable catalog patch is patches/dronehive-script-host-roots.patch on main#9. Independent of portable-paths (ROOT via __file__). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Do not edit drone/pro/tool_agent.py. Independent of portable-paths.

## First moves

- node src/cli.js patches --prove --job dronehive-script-host-roots
- node src/cli.js patches --prove-after-apply --job dronehive-script-host-roots
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-script-host-roots-from-ops
- git apply --check /path/to/main/patches/dronehive-script-host-roots.patch
- git apply /path/to/main/patches/dronehive-script-host-roots.patch
- python3 -c "from pathlib import Path; fs=('scripts/bench_vs_helpers.py','scripts/smoke_delegate_wire.py','scripts/stress_ai_bus_hive.py'); assert all('Path(__file__).resolve().parents[1]' in Path(f).read_text() and r'G:\\AI-Home' not in Path(f).read_text() for f in fs)"
- scripts ROOT uses Path(__file__). Do not py_compile.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there


