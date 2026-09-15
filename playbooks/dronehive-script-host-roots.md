# Point dronehive scripts at repo root instead of G: AI-Home

- id: `dronehive-script-host-roots`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-script-host-roots.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

scripts/bench_vs_helpers.py, smoke_delegate_wire.py, and stress_ai_bus_hive.py hardcode G:\AI-Home\projects\ai-worker-drone-0.5b. Applyable catalog patch is patches/dronehive-script-host-roots.patch on main#9. Independent of portable-paths (ROOT via __file__). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Do not edit drone/pro/tool_agent.py. Independent of portable-paths.

## First commands

- node src/cli.js patches --prove --job dronehive-script-host-roots
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-script-host-roots-from-ops
- git apply --check /path/to/main/patches/dronehive-script-host-roots.patch
- git apply /path/to/main/patches/dronehive-script-host-roots.patch
- python3 -m py_compile scripts/bench_vs_helpers.py scripts/smoke_delegate_wire.py scripts/stress_ai_bus_hive.py
- python3 -c "from pathlib import Path; fs=('scripts/bench_vs_helpers.py','scripts/smoke_delegate_wire.py','scripts/stress_ai_bus_hive.py'); assert all('Path(__file__).resolve().parents[1]' in Path(f).read_text() and r'G:\\AI-Home' not in Path(f).read_text() for f in fs)"

## Verify

python3 -m py_compile scripts/bench_vs_helpers.py scripts/smoke_delegate_wire.py scripts/stress_ai_bus_hive.py

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
