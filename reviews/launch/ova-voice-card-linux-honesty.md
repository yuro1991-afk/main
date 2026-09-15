# Leftover unused — ova-voice-card-linux-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `ova-voice-card-linux-honesty`
- launch: `reviews/launch/ova-voice-card-linux-honesty.md`
- GitHub: https://github.com/yuro1991-afk/ollama-voice-access

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply ova-voice-card-linux-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/ollama-voice-access
- Relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- Patch: `patches/ova-voice-card-linux-honesty.patch`
- Job: `ova-voice-card-linux-honesty` — Mark OVA voice card Voice Access as Windows-only
- Playbook: `playbooks/ova-voice-card-linux-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job ova-voice-card-linux-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job ova-voice-card-linux-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('VOICE-ACCESS.md').read_text(); assert 'Windows Voice Access / Start Menu only' in t and 'install/QA scripts' in t and 'not** a Voice Access install' in t"

## Notes

VOICE-ACCESS.md still lists Voice Access phrases with no Linux honesty. Applyable catalog patch is patches/ova-voice-card-linux-honesty.patch on main#9. Independent of ova-readme-linux-honesty (README) and ova-api-host-override. This token cannot push ollama-voice-access.

## Collision

Docs only. Different file from ova-readme-linux-honesty. Independent of api-host-override.

## First moves

- node src/cli.js patches --prove --job ova-voice-card-linux-honesty
- node src/cli.js patches --prove-after-apply --job ova-voice-card-linux-honesty
- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-voice-card-linux-honesty-from-ops
- git apply --check /path/to/main/patches/ova-voice-card-linux-honesty.patch
- git apply /path/to/main/patches/ova-voice-card-linux-honesty.patch
- python3 -c "from pathlib import Path; t=Path('VOICE-ACCESS.md').read_text(); assert 'Windows Voice Access / Start Menu only' in t and 'install/QA scripts' in t and 'not** a Voice Access install' in t"
- VOICE-ACCESS.md says Voice Access / Start Menu are Windows-only and Linux pwsh is not a Voice Access install.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/ollama-voice-access — apply there


