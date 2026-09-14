# Point Install-DroneOllamaApp cargo homes at host/ai-home

- id: `dronehive-install-ollama-app-cargo`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-install-ollama-app-cargo.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

Install-DroneOllamaApp.ps1 still pins G:\AI-Home\tools cargo/rustup. Use host\ai-home\tools. Leaves InstallRoot / mountSrc / manifest G: leftovers.

## Collision

Install-DroneOllamaApp.ps1 cargo env only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-install-ollama-app-cargo
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-install-ollama-app-cargo-from-ops
- git apply --check /path/to/main/patches/dronehive-install-ollama-app-cargo.patch
- git apply /path/to/main/patches/dronehive-install-ollama-app-cargo.patch

## Verify

Install-DroneOllamaApp.ps1 cargo/rustup env uses host\ai-home\tools

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
