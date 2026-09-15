# Idle-agent relaunch — Inventory other repo jobs

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Inventory other repo jobs
- bcId: `bc-bdb91c45-75dd-58ec-8b52-7d3f1ae77b86`
- card: `ova-pwsh-syntax-ci`
- launch: `reviews/launch/ova-pwsh-syntax-ci.md`
- GitHub: https://github.com/yuro1991-afk/ollama-voice-access

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply ova-pwsh-syntax-ci

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/ollama-voice-access
- Relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- Patch: `patches/ova-pwsh-syntax-ci.patch`
- Job: `ova-pwsh-syntax-ci` — Add PowerShell syntax CI for ollama-voice-access
- Playbook: `playbooks/ova-pwsh-syntax-ci.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job ova-pwsh-syntax-ci`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job ova-pwsh-syntax-ci` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('.github/workflows/pwsh-syntax.yml').read_text(); assert 'name: pwsh-syntax' in t; assert 'actions/checkout@v5' in t; assert 'Parse PowerShell without talking to Ollama' in t; assert 'Parser]::ParseFile' in t; assert 'ubuntu-latest' in t"

## Notes

No open issues/PRs, no .github. Add a workflow that runs pwsh -NoProfile -Command parser/AST check (or -File -? ) on Install/Uninstall, Open/Start/Stop, Chat/Status, Invoke-OllamaVoiceQA.ps1, lib/OllamaVoice.Common.ps1. Do not hit http://127.0.0.1:11434 and do not stop a live Ollama.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/ova-pwsh-syntax-ci.patch on main#9. Do not copy PR #6 autofix.

## Collision

Do not change Start Menu Bypass installers in the same PR as stop-guard unless one agent owns both.

## First moves

- node src/cli.js patches --prove --job ova-pwsh-syntax-ci
- node src/cli.js patches --prove-after-apply --job ova-pwsh-syntax-ci
- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-pwsh-syntax-ci-from-ops
- git apply --check /path/to/main/patches/ova-pwsh-syntax-ci.patch
- git apply /path/to/main/patches/ova-pwsh-syntax-ci.patch
- python3 -c "from pathlib import Path; t=Path('.github/workflows/pwsh-syntax.yml').read_text(); assert 'name: pwsh-syntax' in t; assert 'actions/checkout@v5' in t; assert 'Parse PowerShell without talking to Ollama' in t; assert 'Parser]::ParseFile' in t; assert 'ubuntu-latest' in t"
- Syntax job passes on ubuntu-latest pwsh without a local ollama.exe.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/ollama-voice-access — apply there


