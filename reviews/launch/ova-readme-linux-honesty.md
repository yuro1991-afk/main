# Leftover unused — ova-readme-linux-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `ova-readme-linux-honesty`
- launch: `reviews/launch/ova-readme-linux-honesty.md`
- GitHub: https://github.com/yuro1991-afk/ollama-voice-access

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply ova-readme-linux-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/ollama-voice-access
- Relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- Patch: `patches/ova-readme-linux-honesty.patch`
- Job: `ova-readme-linux-honesty` — Mark OVA README Voice Access as Windows-only
- Playbook: `playbooks/ova-readme-linux-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job ova-readme-linux-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job ova-readme-linux-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'Windows 11 Voice Access' in t and 'syntax/math CI only' in t and 'not** a Voice Access install' in t"

## Notes

README still says Platform: Windows 11 only. Syntax/math CI already runs on Linux pwsh. Applyable catalog patch is patches/ova-readme-linux-honesty.patch on main#9. Independent of api-host-override. This token cannot push ollama-voice-access.

## Collision

Docs only. Independent of api-host-override (that patch appends after License).

## First moves

- node src/cli.js patches --prove --job ova-readme-linux-honesty
- node src/cli.js patches --prove-after-apply --job ova-readme-linux-honesty
- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-readme-linux-honesty-from-ops
- git apply --check /path/to/main/patches/ova-readme-linux-honesty.patch
- git apply /path/to/main/patches/ova-readme-linux-honesty.patch
- python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'Windows 11 Voice Access' in t and 'syntax/math CI only' in t and 'not** a Voice Access install' in t"
- README says Voice Access is Windows-only and Linux pwsh is not a Voice Access install.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/ollama-voice-access — apply there


