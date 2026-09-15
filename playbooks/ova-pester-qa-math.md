# Pester tests for Ollama Voice percentile / stdev / tok-s math

- id: `ova-pester-qa-math`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/ollama-voice-access
- relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- why: This token cannot push ollama-voice-access. Apply `patches/ova-pester-qa-math.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

README math lives in lib/OllamaVoice.Common.ps1. No tests/ tree. Live QA needs Ollama; unit tests must not.

## Collision

Same as keep-busy pester-qa-math-unit-tests. Leave Invoke-OllamaVoiceQA.ps1 as the live SLO owner.

## First commands

- node src/cli.js patches --prove --job ova-pester-qa-math
- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-pester-qa-math-from-ops
- git apply --check /path/to/main/patches/ova-pester-qa-math.patch
- git apply /path/to/main/patches/ova-pester-qa-math.patch
- python3 -c "from pathlib import Path; w=Path('.github/workflows/math-unit.yml').read_text(); assert 'name: math-unit' in w; assert 'Percentile / stdev / tok-s without Ollama' in w; t=Path('tests/OllamaVoice.Math.Tests.ps1').read_text(); assert 'No network. Unit-test percentile / stdev / empty stats.' in t; assert 'OK math unit tests (no network)' in t; assert 'tokens/s 50' in t"

## Verify

Pester covers empty stats, n=1 stdev 0, n=5 p50/p95, tokens/s with no network.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
