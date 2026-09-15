# Leftover unused — dronehive-ollama-app-open-benchmarks

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-ollama-app-open-benchmarks`
- launch: `reviews/launch/dronehive-ollama-app-open-benchmarks.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-ollama-app-open-benchmarks

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-ollama-app-open-benchmarks.patch`
- Job: `dronehive-ollama-app-open-benchmarks` — Point drone-ollama-app Open benchmarks at repo out/benchmarks
- Playbook: `playbooks/dronehive-ollama-app-open-benchmarks.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-ollama-app-open-benchmarks`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-open-benchmarks` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/main.rs').read_text(); assert any(x.strip() == 'r'+chr(34)+'out'+chr(92)+'benchmarks'+chr(34)+',' for x in t.splitlines()); assert '0.5b'+chr(92)+'out'+chr(92)+'benchmarks' not in t"

## Notes

main.rs Open benchmarks still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-ollama-app-open-benchmarks.patch on main#9. Independent of out leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/main.rs Open benchmarks only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-ollama-app-open-benchmarks
- node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-open-benchmarks
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-open-benchmarks-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-open-benchmarks.patch
- git apply /path/to/main/patches/dronehive-ollama-app-open-benchmarks.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/main.rs').read_text(); assert any(x.strip() == 'r'+chr(34)+'out'+chr(92)+'benchmarks'+chr(34)+',' for x in t.splitlines()); assert '0.5b'+chr(92)+'out'+chr(92)+'benchmarks' not in t"
- main.rs Open benchmarks uses out\\benchmarks

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

