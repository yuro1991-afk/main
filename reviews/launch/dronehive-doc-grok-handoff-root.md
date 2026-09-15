# Leftover unused — dronehive-doc-grok-handoff-root

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-doc-grok-handoff-root`
- launch: `reviews/launch/dronehive-doc-grok-handoff-root.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-doc-grok-handoff-root

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-doc-grok-handoff-root.patch`
- Job: `dronehive-doc-grok-handoff-root` — Point GROK_HANDOFF.md project root at repo root
- Playbook: `playbooks/dronehive-doc-grok-handoff-root.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-doc-grok-handoff-root`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-doc-grok-handoff-root` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/GROK_HANDOFF.md').read_text(); root=t.split('## Project root',1)[1].split('##',1)[0]; assert r'G:\\AI-Home' not in root; assert '0.5b' not in root"

## Notes

docs/GROK_HANDOFF.md project root still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-doc-grok-handoff-root.patch on main#9. Independent of CLI cd leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/GROK_HANDOFF.md project root line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-doc-grok-handoff-root
- node src/cli.js patches --prove-after-apply --job dronehive-doc-grok-handoff-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-grok-handoff-root-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-grok-handoff-root.patch
- git apply /path/to/main/patches/dronehive-doc-grok-handoff-root.patch
- python3 -c "from pathlib import Path; t=Path('docs/GROK_HANDOFF.md').read_text(); root=t.split('## Project root',1)[1].split('##',1)[0]; assert r'G:\\AI-Home' not in root; assert '0.5b' not in root"
- docs/GROK_HANDOFF.md project root is .

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

