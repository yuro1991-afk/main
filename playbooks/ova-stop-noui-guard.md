# Keep Stop-Ollama -NoUI refusing without -Force

- id: `ova-stop-noui-guard`
- kind: fix (Land a concrete bugfix in a named repo.)
- scope: relaunch
- repo: github.com/yuro1991-afk/ollama-voice-access
- relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- why: This token cannot push ollama-voice-access. Apply `patches/ova-stop-noui-guard.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

SECURITY.md and Stop-Ollama.ps1 already refuse kill in -NoUI without -Force (exit 4) before Stop-OVServe. Add a no-network assertion (Pester or a tiny .ps1 under tests/) that mocks Show-OVMessage and proves exit 4 and zero Stop-Process. Do not add a default -Force.

## Collision

Safety default stays refuse. Do not point api.baseUrl at untrusted hosts.

## First commands

- node src/cli.js patches --prove --job ova-stop-noui-guard
- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-stop-noui-guard-from-ops
- git apply --check /path/to/main/patches/ova-stop-noui-guard.patch
- git apply /path/to/main/patches/ova-stop-noui-guard.patch
- pwsh -File Stop-Ollama.ps1 -NoUI exits 4; no ollama processes signaled.

## Verify

pwsh -File Stop-Ollama.ps1 -NoUI exits 4; no ollama processes signaled.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
