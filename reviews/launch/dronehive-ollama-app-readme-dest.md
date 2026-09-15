# Leftover unused — dronehive-ollama-app-readme-dest

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-ollama-app-readme-dest`
- launch: `reviews/launch/dronehive-ollama-app-readme-dest.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-ollama-app-readme-dest

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-ollama-app-readme-dest.patch`
- Job: `dronehive-ollama-app-readme-dest` — Point drone-ollama-app README install dest at host/ai-home
- Playbook: `playbooks/dronehive-ollama-app-readme-dest.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-ollama-app-readme-dest`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-readme-dest` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/README.md').read_text(); assert r'host\\ai-home\\apps\\DroneOllama' in t; assert r'G:\\AI-Home\\apps\\DroneOllama' not in t"

## Notes

apps/drone-ollama-app/README.md install dest still pins G:\\AI-Home\\apps. Applyable catalog patch is patches/dronehive-ollama-app-readme-dest.patch on main#9. Independent of installer leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/README.md dest line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-ollama-app-readme-dest
- node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-readme-dest
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-readme-dest-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-readme-dest.patch
- git apply /path/to/main/patches/dronehive-ollama-app-readme-dest.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/README.md').read_text(); assert r'host\\ai-home\\apps\\DroneOllama' in t; assert r'G:\\AI-Home\\apps\\DroneOllama' not in t"
- drone-ollama-app README dest uses host\\ai-home\\apps\\DroneOllama

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

