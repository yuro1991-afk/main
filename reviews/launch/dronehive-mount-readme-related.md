# Leftover unused — dronehive-mount-readme-related

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-mount-readme-related`
- launch: `reviews/launch/dronehive-mount-readme-related.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-mount-readme-related

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-mount-readme-related.patch`
- Job: `dronehive-mount-readme-related` — Point mount README related UI at host/ai-home
- Playbook: `playbooks/dronehive-mount-readme-related.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-mount-readme-related`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-mount-readme-related` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/README.md').read_text(); assert 'host/ai-home/projects/ollama-rust-ui' in t; assert 'one host example' in t; assert r'G:\\AI-Home\\projects\\ollama-rust-ui' not in t"

## Notes

apps/drone-ollama-mount/README.md related still pins G:\\AI-Home\\projects\\ollama-rust-ui. Applyable catalog patch is patches/dronehive-mount-readme-related.patch on main#9. Independent of layout and launch leftovers. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-mount/README.md related line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-mount-readme-related
- node src/cli.js patches --prove-after-apply --job dronehive-mount-readme-related
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-readme-related-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-readme-related.patch
- git apply /path/to/main/patches/dronehive-mount-readme-related.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/README.md').read_text(); assert 'host/ai-home/projects/ollama-rust-ui' in t; assert 'one host example' in t; assert r'G:\\AI-Home\\projects\\ollama-rust-ui' not in t"
- mount README related uses host/ai-home/projects/ollama-rust-ui

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

