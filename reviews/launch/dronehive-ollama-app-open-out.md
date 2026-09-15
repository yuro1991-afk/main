# Leftover unused — dronehive-ollama-app-open-out

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-ollama-app-open-out`
- launch: `reviews/launch/dronehive-ollama-app-open-out.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-ollama-app-open-out

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-ollama-app-open-out.patch`
- Job: `dronehive-ollama-app-open-out` — Point drone-ollama-app Open drone out at repo out/
- Playbook: `playbooks/dronehive-ollama-app-open-out.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-ollama-app-open-out`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-open-out` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/main.rs').read_text(); assert any(x.strip() == 'r'+chr(34)+'out'+chr(34)+',' for x in t.splitlines()); assert r'ai-worker-drone-0.5b\\out'+chr(34) not in t"

## Notes

main.rs Open drone out still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-ollama-app-open-out.patch on main#9. Independent of benchmarks leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/main.rs Open drone out only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-ollama-app-open-out
- node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-open-out
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-open-out-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-open-out.patch
- git apply /path/to/main/patches/dronehive-ollama-app-open-out.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/main.rs').read_text(); assert any(x.strip() == 'r'+chr(34)+'out'+chr(34)+',' for x in t.splitlines()); assert r'ai-worker-drone-0.5b\\out'+chr(34) not in t"
- main.rs Open drone out uses out

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

