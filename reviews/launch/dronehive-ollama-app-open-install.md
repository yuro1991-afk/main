# Leftover unused — dronehive-ollama-app-open-install

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-ollama-app-open-install`
- launch: `reviews/launch/dronehive-ollama-app-open-install.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-ollama-app-open-install

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-ollama-app-open-install.patch`
- Job: `dronehive-ollama-app-open-install` — Point drone-ollama-app Open install folder at host/ai-home
- Playbook: `playbooks/dronehive-ollama-app-open-install.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-ollama-app-open-install`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-open-install` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/main.rs').read_text(); assert 'open_path(r'+chr(34)+'host'+chr(92)+'ai-home'+chr(92)+'apps'+chr(92)+'DroneOllama'+chr(34)+')' in t; assert 'open_path(r'+chr(34)+'G:'+chr(92)+'AI-Home'+chr(92)+'apps'+chr(92)+'DroneOllama'+chr(34)+')' not in t"

## Notes

main.rs Open app install folder still pins G:\\AI-Home\\apps. Applyable catalog patch is patches/dronehive-ollama-app-open-install.patch on main#9. Independent of UI leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/main.rs Open app install folder only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-ollama-app-open-install
- node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-open-install
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-open-install-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-open-install.patch
- git apply /path/to/main/patches/dronehive-ollama-app-open-install.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/main.rs').read_text(); assert 'open_path(r'+chr(34)+'host'+chr(92)+'ai-home'+chr(92)+'apps'+chr(92)+'DroneOllama'+chr(34)+')' in t; assert 'open_path(r'+chr(34)+'G:'+chr(92)+'AI-Home'+chr(92)+'apps'+chr(92)+'DroneOllama'+chr(34)+')' not in t"
- main.rs Open install uses host\\ai-home

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there

## Related

- #9 patch-catalog — Applyable sibling diffs under patches/. node src/cli.js patches lists them. Not an autofix runner.

