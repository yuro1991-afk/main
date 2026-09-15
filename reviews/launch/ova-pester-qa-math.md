# Idle-agent relaunch — Summarize inventory transcripts

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Summarize inventory transcripts
- bcId: `bc-1d53d8a9-d5b1-554e-af52-c612eca2920d`
- card: `ova-pester-qa-math`
- launch: `reviews/launch/ova-pester-qa-math.md`
- GitHub: https://github.com/yuro1991-afk/ollama-voice-access

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply ova-pester-qa-math

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/ollama-voice-access
- Relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- Patch: `patches/ova-pester-qa-math.patch`
- Job: `ova-pester-qa-math` — Pester tests for Ollama Voice percentile / stdev / tok-s math
- Playbook: `playbooks/ova-pester-qa-math.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job ova-pester-qa-math`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job ova-pester-qa-math` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; w=Path('.github/workflows/math-unit.yml').read_text(); assert 'name: math-unit' in w; assert 'actions/checkout@v5' in w; assert 'Percentile / stdev / tok-s without Ollama' in w; t=Path('tests/OllamaVoice.Math.Tests.ps1').read_text(); assert 'No network. Unit-test percentile / stdev / empty stats.' in t; assert 'OK math unit tests (no network)' in t; assert 'tokens/s 50' in t"

## Notes

README math lives in lib/OllamaVoice.Common.ps1. No tests/ tree. Live QA needs Ollama; unit tests must not.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/ova-pester-qa-math.patch on main#9. Do not copy PR #6 autofix.

## Collision

Same as keep-busy pester-qa-math-unit-tests. Leave Invoke-OllamaVoiceQA.ps1 as the live SLO owner.

## First moves

- node src/cli.js patches --prove --job ova-pester-qa-math
- node src/cli.js patches --prove-after-apply --job ova-pester-qa-math
- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-pester-qa-math-from-ops
- git apply --check /path/to/main/patches/ova-pester-qa-math.patch
- git apply /path/to/main/patches/ova-pester-qa-math.patch
- python3 -c "from pathlib import Path; w=Path('.github/workflows/math-unit.yml').read_text(); assert 'name: math-unit' in w; assert 'actions/checkout@v5' in w; assert 'Percentile / stdev / tok-s without Ollama' in w; t=Path('tests/OllamaVoice.Math.Tests.ps1').read_text(); assert 'No network. Unit-test percentile / stdev / empty stats.' in t; assert 'OK math unit tests (no network)' in t; assert 'tokens/s 50' in t"
- Pester covers empty stats, n=1 stdev 0, n=5 p50/p95, tokens/s with no network.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/ollama-voice-access — apply there


