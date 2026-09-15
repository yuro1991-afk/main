# Leftover unused — dronehive-start-tui-cargo-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-start-tui-cargo-honesty`
- launch: `reviews/launch/dronehive-start-tui-cargo-honesty.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-start-tui-cargo-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-start-tui-cargo-honesty.patch`
- Job: `dronehive-start-tui-cargo-honesty` — Point START_TUI_OLLAMA.bat cargo PATH at host/ai-home
- Playbook: `playbooks/dronehive-start-tui-cargo-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-start-tui-cargo-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-start-tui-cargo-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('START_TUI_OLLAMA.bat').read_text(); assert r'%ROOT%\\host\\ai-home\\tools\\cargo\\bin' in t; assert r'G:\\AI-Home\\tools\\cargo\\bin' not in t"

## Notes

START_TUI_OLLAMA.bat Build echo still pins G:\\AI-Home\\tools\\cargo\\bin. Applyable catalog patch is patches/dronehive-start-tui-cargo-honesty.patch on main#9. Independent of START_SUPER_MESH leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

START_TUI_OLLAMA.bat Build echo line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-start-tui-cargo-honesty
- node src/cli.js patches --prove-after-apply --job dronehive-start-tui-cargo-honesty
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-start-tui-cargo-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-start-tui-cargo-honesty.patch
- git apply /path/to/main/patches/dronehive-start-tui-cargo-honesty.patch
- python3 -c "from pathlib import Path; t=Path('START_TUI_OLLAMA.bat').read_text(); assert r'%ROOT%\\host\\ai-home\\tools\\cargo\\bin' in t; assert r'G:\\AI-Home\\tools\\cargo\\bin' not in t"
- START_TUI_OLLAMA.bat Build echo uses %ROOT%\\host\\ai-home\\tools\\cargo\\bin

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

