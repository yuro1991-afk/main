# Resolve dronehive app link catalog F:/D: URIs via host_paths

- id: `dronehive-app-links-host-paths`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-portable-paths.patch` then `patches/dronehive-app-links-host-paths.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/links.py list_links still hardcodes F:\GrokSelfLibrary and D:\GrokCoreMemory\continuous\OPEN_TASKS.json. Apply portable-paths first so `drone/host_paths.py` exists.

## Collision

Apply after dronehive-portable-paths. Different file from runtime-host-paths. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-app-links-host-paths
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-app-links-host-paths-from-ops
- git apply /path/to/main/patches/dronehive-portable-paths.patch
- git apply --check /path/to/main/patches/dronehive-app-links-host-paths.patch
- git apply /path/to/main/patches/dronehive-app-links-host-paths.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/links.py').read_text(); line=next(x for x in t.splitlines() if 'uri' in x and 'GrokSelfLibrary' in x); assert 'resolve_host_path' in line"

## Verify

python3 -m py_compile drone/app/links.py

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
