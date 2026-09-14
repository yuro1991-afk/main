# Add PowerShell syntax CI for ollama-voice-access

- id: `ova-pwsh-syntax-ci`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/ollama-voice-access
- relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- why: This token cannot push ollama-voice-access. Apply `patches/ova-pwsh-syntax-ci.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

No open issues/PRs, no .github. Add a workflow that runs pwsh -NoProfile -Command parser/AST check (or -File -? ) on Install/Uninstall, Open/Start/Stop, Chat/Status, Invoke-OllamaVoiceQA.ps1, lib/OllamaVoice.Common.ps1. Do not hit http://127.0.0.1:11434 and do not stop a live Ollama.

## Collision

Do not change Start Menu Bypass installers in the same PR as stop-guard unless one agent owns both.

## First commands

- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-pwsh-syntax-ci-from-ops
- git apply --check /path/to/main/patches/ova-pwsh-syntax-ci.patch
- git apply /path/to/main/patches/ova-pwsh-syntax-ci.patch
- Syntax job passes on ubuntu-latest pwsh without a local ollama.exe.

## Verify

Syntax job passes on ubuntu-latest pwsh without a local ollama.exe.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
