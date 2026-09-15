# Idle-agent relaunch — Summarize CodeRabbit review

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Summarize CodeRabbit review
- bcId: `bc-7bdd2cbd-7307-55d4-bcc9-da7f01c6bee7`
- card: `ova-stop-noui-guard`
- launch: `reviews/launch/ova-stop-noui-guard.md`
- GitHub: https://github.com/yuro1991-afk/ollama-voice-access

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply ova-stop-noui-guard

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/ollama-voice-access
- Relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- Patch: `patches/ova-stop-noui-guard.patch`
- Job: `ova-stop-noui-guard` — Keep Stop-Ollama -NoUI refusing without -Force
- Playbook: `playbooks/ova-stop-noui-guard.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job ova-stop-noui-guard`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job ova-stop-noui-guard` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('tests/assert-stop-noui.ps1').read_text(); assert 'Prove -NoUI without -Force exits 4 and does not call Stop-Process.' in t; assert 'OK Stop-Ollama -NoUI exit 4 (no -Force)' in t; assert 'RED expected exit 4' in t"

## Notes

SECURITY.md and Stop-Ollama.ps1 already refuse kill in -NoUI without -Force (exit 4) before Stop-OVServe. Add a no-network assertion (Pester or a tiny .ps1 under tests/) that mocks Show-OVMessage and proves exit 4 and zero Stop-Process. Do not add a default -Force.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/ova-stop-noui-guard.patch on main#9. Do not copy PR #6 autofix.

## Collision

Safety default stays refuse. Do not point api.baseUrl at untrusted hosts.

## First moves

- node src/cli.js patches --prove --job ova-stop-noui-guard
- node src/cli.js patches --prove-after-apply --job ova-stop-noui-guard
- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-stop-noui-guard-from-ops
- git apply --check /path/to/main/patches/ova-stop-noui-guard.patch
- git apply /path/to/main/patches/ova-stop-noui-guard.patch
- python3 -c "from pathlib import Path; t=Path('tests/assert-stop-noui.ps1').read_text(); assert 'Prove -NoUI without -Force exits 4 and does not call Stop-Process.' in t; assert 'OK Stop-Ollama -NoUI exit 4 (no -Force)' in t; assert 'RED expected exit 4' in t"
- tests/assert-stop-noui.ps1 expects exit 4. Do not run Stop-Ollama. Do not stop Ollama.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/ollama-voice-access — apply there


