# Wrap leftover dronehive runtime Path() via host_paths

- id: `dronehive-runtime-host-paths`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-portable-paths.patch` then `patches/dronehive-runtime-host-paths.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

After portable-paths, grok_handoff / future_seer / tools / operational still hardcode G: Path(). Apply portable-paths first so `drone/host_paths.py` exists.

## Collision

Apply after dronehive-portable-paths. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-runtime-host-paths
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-runtime-host-paths-from-ops
- git apply /path/to/main/patches/dronehive-portable-paths.patch
- git apply --check /path/to/main/patches/dronehive-runtime-host-paths.patch
- git apply /path/to/main/patches/dronehive-runtime-host-paths.patch
- python3 -m py_compile drone/grok_handoff.py drone/future_seer.py drone/tools.py drone/operational.py

## Verify

python3 -m py_compile drone/grok_handoff.py drone/future_seer.py drone/tools.py drone/operational.py

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
