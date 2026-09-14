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

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-portable-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-portable-paths.patch
- git apply /path/to/main/patches/dronehive-portable-paths.patch
- python -m drone work-order-show

## Verify

python -m drone work-order-show

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
