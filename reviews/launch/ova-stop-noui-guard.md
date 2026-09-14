# Idle-agent relaunch — Summarize CodeRabbit review

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Summarize CodeRabbit review
- bcId: `bc-7bdd2cbd-7307-55d4-bcc9-da7f01c6bee7`
- card: `ova-stop-noui-guard`
- launch: `reviews/launch/ova-stop-noui-guard.md`
- GitHub: https://github.com/yuro1991-afk/ollama-voice-access

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — ova-stop-noui-guard

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/ollama-voice-access
- Git: `github.com/yuro1991-afk/ollama-voice-access`
- Job: `ova-stop-noui-guard` — Keep Stop-Ollama -NoUI refusing without -Force
- Packet: `reviews/handoff-ova-stop-noui-guard.md`
- Playbook: `playbooks/ova-stop-noui-guard.md`
- Priority: 17
- Verify: pwsh -File Stop-Ollama.ps1 -NoUI exits 4; no ollama processes signaled.

## Notes

SECURITY.md and Stop-Ollama.ps1 already refuse kill in -NoUI without -Force (exit 4) before Stop-OVServe. Add a no-network assertion (Pester or a tiny .ps1 under tests/) that mocks Show-OVMessage and proves exit 4 and zero Stop-Process. Do not add a default -Force.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Safety default stays refuse. Do not point api.baseUrl at untrusted hosts.

## First moves

- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-stop-noui-guard-from-ops
- edit: Stop-Ollama.ps1, lib/OllamaVoice.Common.ps1, SECURITY.md
- pwsh -File Stop-Ollama.ps1 -NoUI exits 4; no ollama processes signaled.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


