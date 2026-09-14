# Point Install-DroneOllamaApp mountSrc at apps/drone-ollama-mount

- id: `dronehive-install-ollama-app-mount`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-install-ollama-app-mount.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

Install-DroneOllamaApp.ps1 $mountSrc still pins G:\AI-Home\projects\drone-ollama-mount. Use apps\drone-ollama-mount. Independent of cargo leftover and InstallRoot leftover.

## Collision

Install-DroneOllamaApp.ps1 $mountSrc line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-install-ollama-app-mount
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-install-ollama-app-mount-from-ops
- git apply --check /path/to/main/patches/dronehive-install-ollama-app-mount.patch
- git apply /path/to/main/patches/dronehive-install-ollama-app-mount.patch

## Verify

Install-DroneOllamaApp.ps1 $mountSrc uses apps\drone-ollama-mount

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
