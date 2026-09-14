# Pester tests for Ollama Voice percentile / stdev / tok-s math

- id: `ova-pester-qa-math`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/ollama-voice-access
- relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- why: Relaunch against the named repo. This landing-pad token cannot push it.

## Notes

README math lives in lib/OllamaVoice.Common.ps1. No tests/ tree. Live QA needs Ollama; unit tests must not.

## Collision

Same as keep-busy pester-qa-math-unit-tests. Leave Invoke-OllamaVoiceQA.ps1 as the live SLO owner.

## First commands

- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-pester-qa-math-from-ops
- edit: lib/OllamaVoice.Common.ps1, tests/
- Pester covers empty stats, n=1 stdev 0, n=5 p50/p95, tokens/s with no network.

## Verify

Pester covers empty stats, n=1 stdev 0, n=5 p50/p95, tokens/s with no network.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
