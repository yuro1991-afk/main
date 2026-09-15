# Leftover unused — dronehive-truth-honesty-library-list

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-truth-honesty-library-list`
- launch: `reviews/launch/dronehive-truth-honesty-library-list.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-truth-honesty-library-list

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-truth-honesty-library-list.patch`
- Job: `dronehive-truth-honesty-library-list` — Point TRUTH_AND_HONESTY library list at host/library
- Playbook: `playbooks/dronehive-truth-honesty-library-list.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-truth-honesty-library-list`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-truth-honesty-library-list` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('TRUTH_AND_HONESTY.md').read_text(); law=t.split('## Full law',1)[1].split('##',1)[0]; assert 'host/library' in law; assert r'F:\\GrokSelfLibrary' not in law"

## Notes

TRUTH_AND_HONESTY.md Universal/Oath/Coder list still pins F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-truth-honesty-library-list.patch on main#9. Adjacent list lines are one leftover (cannot -U1-split). Independent of system-root and inline oath leftovers. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

TRUTH_AND_HONESTY.md Universal/Oath/Coder list only. Leave C:\\Users hardwire. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-truth-honesty-library-list
- node src/cli.js patches --prove-after-apply --job dronehive-truth-honesty-library-list
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-truth-honesty-library-list-from-ops
- git apply --check /path/to/main/patches/dronehive-truth-honesty-library-list.patch
- git apply /path/to/main/patches/dronehive-truth-honesty-library-list.patch
- python3 -c "from pathlib import Path; t=Path('TRUTH_AND_HONESTY.md').read_text(); law=t.split('## Full law',1)[1].split('##',1)[0]; assert 'host/library' in law; assert r'F:\\GrokSelfLibrary' not in law"
- TRUTH_AND_HONESTY.md list Universal/Oath/Coder use host/library

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

