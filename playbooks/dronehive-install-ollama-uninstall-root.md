# Point Install-DroneOllamaApp uninstall root at host/ai-home

- id: `dronehive-install-ollama-uninstall-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-install-ollama-uninstall-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

Install-DroneOllamaApp.ps1 uninstall here-string still pins G:\AI-Home\apps\DroneOllama. Use host\ai-home\apps\DroneOllama. Independent of live $InstallRoot leftover.

## Collision

Install-DroneOllamaApp.ps1 uninstall here-string $InstallRoot only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-install-ollama-uninstall-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-install-ollama-uninstall-root-from-ops
- git apply --check /path/to/main/patches/dronehive-install-ollama-uninstall-root.patch
- git apply /path/to/main/patches/dronehive-install-ollama-uninstall-root.patch

## Verify

uninstall here-string $InstallRoot uses host\ai-home\apps\DroneOllama

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
