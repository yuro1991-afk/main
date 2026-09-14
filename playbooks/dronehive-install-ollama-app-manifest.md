# Point Install-DroneOllamaApp manifest host paths at the repo

- id: `dronehive-install-ollama-app-manifest`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-install-ollama-app-manifest.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

Install-DroneOllamaApp.ps1 manifest drone_root / mount_exe still pin G:\AI-Home. Use `.` and apps\drone-ollama-mount. Independent of $mountSrc leftover.

## Collision

Install-DroneOllamaApp.ps1 manifest drone_root / mount_exe only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-install-ollama-app-manifest-from-ops
- git apply --check /path/to/main/patches/dronehive-install-ollama-app-manifest.patch
- git apply /path/to/main/patches/dronehive-install-ollama-app-manifest.patch

## Verify

manifest drone_root is `.` and mount_exe uses apps\drone-ollama-mount

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
