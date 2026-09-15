# Leftover unused — dronehive-apps-readme-cargo

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-apps-readme-cargo`
- launch: `reviews/launch/dronehive-apps-readme-cargo.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-apps-readme-cargo

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-apps-readme-cargo.patch`
- Job: `dronehive-apps-readme-cargo` — Point apps README Rust path at host/ai-home
- Playbook: `playbooks/dronehive-apps-readme-cargo.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-apps-readme-cargo`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-apps-readme-cargo` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/README.md').read_text(); assert 'host/ai-home/tools/cargo' in t; assert 'one host example' in t"

## Notes

apps/README.md still pins G:\\AI-Home\\tools\\cargo as the required Rust path. Applyable catalog patch is patches/dronehive-apps-readme-cargo.patch on main#9. Independent of per-app README leftovers. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/README.md build line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-apps-readme-cargo
- node src/cli.js patches --prove-after-apply --job dronehive-apps-readme-cargo
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-apps-readme-cargo-from-ops
- git apply --check /path/to/main/patches/dronehive-apps-readme-cargo.patch
- git apply /path/to/main/patches/dronehive-apps-readme-cargo.patch
- python3 -c "from pathlib import Path; t=Path('apps/README.md').read_text(); assert 'host/ai-home/tools/cargo' in t; assert 'one host example' in t"
- apps/README.md build line uses host/ai-home/tools/cargo

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

