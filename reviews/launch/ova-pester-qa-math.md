# Idle-agent relaunch — Summarize inventory transcripts

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Summarize inventory transcripts
- bcId: `bc-1d53d8a9-d5b1-554e-af52-c612eca2920d`
- card: `ova-pester-qa-math`
- launch: `reviews/launch/ova-pester-qa-math.md`
- GitHub: https://github.com/yuro1991-afk/ollama-voice-access

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — ova-pester-qa-math

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/ollama-voice-access
- Git: `github.com/yuro1991-afk/ollama-voice-access`
- Job: `ova-pester-qa-math` — Pester tests for Ollama Voice percentile / stdev / tok-s math
- Packet: `reviews/handoff-ova-pester-qa-math.md`
- Playbook: `playbooks/ova-pester-qa-math.md`
- Priority: 16
- Verify: Pester covers empty stats, n=1 stdev 0, n=5 p50/p95, tokens/s with no network.

## Notes

README math lives in lib/OllamaVoice.Common.ps1. No tests/ tree. Live QA needs Ollama; unit tests must not.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Same as keep-busy pester-qa-math-unit-tests. Leave Invoke-OllamaVoiceQA.ps1 as the live SLO owner.

## First moves

- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-pester-qa-math-from-ops
- edit: lib/OllamaVoice.Common.ps1, tests/
- Pester covers empty stats, n=1 stdev 0, n=5 p50/p95, tokens/s with no network.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


