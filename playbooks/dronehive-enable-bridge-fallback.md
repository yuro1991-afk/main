# Point Enable-Bridge1080 fallback root at the repo

- id: `dronehive-enable-bridge-fallback`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-enable-bridge-fallback.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

scripts/Enable-Bridge1080-Admin.ps1 fallback still pins G:\AI-Home\projects\ai-worker-drone-0.5b. Use `Split-Path $PSScriptRoot -Parent`. Independent of start-script leftovers. Leaves the double-parent probe line.

## Collision

scripts/Enable-Bridge1080-Admin.ps1 fallback line only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-enable-bridge-fallback-from-ops
- git apply --check /path/to/main/patches/dronehive-enable-bridge-fallback.patch
- git apply /path/to/main/patches/dronehive-enable-bridge-fallback.patch

## Verify

Enable-Bridge1080-Admin.ps1 fallback is `Split-Path $PSScriptRoot -Parent`

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
