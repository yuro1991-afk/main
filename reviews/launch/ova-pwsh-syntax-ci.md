# Idle-agent relaunch — Inventory other repo jobs

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Inventory other repo jobs
- bcId: `bc-bdb91c45-75dd-58ec-8b52-7d3f1ae77b86`
- card: `ova-pwsh-syntax-ci`
- launch: `reviews/launch/ova-pwsh-syntax-ci.md`
- GitHub: https://github.com/yuro1991-afk/ollama-voice-access

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — ova-pwsh-syntax-ci

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/ollama-voice-access
- Git: `github.com/yuro1991-afk/ollama-voice-access`
- Job: `ova-pwsh-syntax-ci` — Add PowerShell syntax CI for ollama-voice-access
- Packet: `reviews/handoff-ova-pwsh-syntax-ci.md`
- Playbook: `playbooks/ova-pwsh-syntax-ci.md`
- Priority: 16
- Verify: Syntax job passes on ubuntu-latest pwsh without a local ollama.exe.

## Notes

No open issues/PRs, no .github. Add a workflow that runs pwsh -NoProfile -Command parser/AST check (or -File -? ) on Install/Uninstall, Open/Start/Stop, Chat/Status, Invoke-OllamaVoiceQA.ps1, lib/OllamaVoice.Common.ps1. Do not hit http://127.0.0.1:11434 and do not stop a live Ollama.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Do not change Start Menu Bypass installers in the same PR as stop-guard unless one agent owns both.

## First moves

- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-pwsh-syntax-ci-from-ops
- edit: .github/workflows/pwsh-syntax.yml, lib/OllamaVoice.Common.ps1, Invoke-OllamaVoiceQA.ps1, Stop-Ollama.ps1
- Syntax job passes on ubuntu-latest pwsh without a local ollama.exe.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


