# Leftover unused — dronehive-tui-readme-cargo

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-tui-readme-cargo`
- launch: `reviews/launch/dronehive-tui-readme-cargo.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-tui-readme-cargo

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-tui-readme-cargo.patch`
- Job: `dronehive-tui-readme-cargo` — Point dronehive-tui README cargo PATH at host/ai-home
- Playbook: `playbooks/dronehive-tui-readme-cargo.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-tui-readme-cargo`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-tui-readme-cargo` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/dronehive-tui/README.md').read_text(); assert r'host\\ai-home\\tools\\cargo\\bin' in t; assert r'G:\\AI-Home\\tools\\cargo\\bin' not in t"

## Notes

apps/dronehive-tui/README.md build still pins G:\\AI-Home\\tools\\cargo\\bin. Applyable catalog patch is patches/dronehive-tui-readme-cargo.patch on main#9. Independent of ollama-tui README leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/dronehive-tui/README.md PATH line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-tui-readme-cargo
- node src/cli.js patches --prove-after-apply --job dronehive-tui-readme-cargo
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-tui-readme-cargo-from-ops
- git apply --check /path/to/main/patches/dronehive-tui-readme-cargo.patch
- git apply /path/to/main/patches/dronehive-tui-readme-cargo.patch
- python3 -c "from pathlib import Path; t=Path('apps/dronehive-tui/README.md').read_text(); assert r'host\\ai-home\\tools\\cargo\\bin' in t; assert r'G:\\AI-Home\\tools\\cargo\\bin' not in t"
- dronehive-tui README build PATH uses host\\ai-home\\tools\\cargo\\bin

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

