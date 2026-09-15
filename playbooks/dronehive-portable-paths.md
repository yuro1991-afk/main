# Resolve dronehive host paths via env / app_root

- id: `dronehive-portable-paths`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-portable-paths.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

Hardcoded F:\GrokSelfLibrary, D:\GrokCoreMemory, G:\AI-Home\... leak onto Linux cwd. Not on PR #1 or #2.

## Collision

Avoid drone/pro/tool_agent.py while unicode-ci is claimed.

## First commands

- node src/cli.js patches --prove --job dronehive-portable-paths
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-portable-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-portable-paths.patch
- git apply /path/to/main/patches/dronehive-portable-paths.patch
- python3 -c "from pathlib import Path; h=Path('drone/host_paths.py').read_text(); assert 'Resolve BOSS Windows host paths via env / app_root.' in h; assert 'not the Linux contract' in h; assert 'def resolve_host_path' in h; e=Path('.env.example').read_text(); assert 'Host path overlay (Linux / this pad)' in e; assert 'DRONEHIVE_LIBRARY_ROOT' in e; w=Path('configs/work_order.json').read_text(); assert 'path_overlay' in w; assert 'Linux uses env or app_root()/host.' in w"

## Verify

python -m drone work-order-show

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
