# Leftover unused — dronehive-truth-honesty-oath-inline

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-truth-honesty-oath-inline`
- launch: `reviews/launch/dronehive-truth-honesty-oath-inline.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-truth-honesty-oath-inline

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-truth-honesty-oath-inline.patch`
- Job: `dronehive-truth-honesty-oath-inline` — Point TRUTH_AND_HONESTY inline oath at host/library
- Playbook: `playbooks/dronehive-truth-honesty-oath-inline.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-truth-honesty-oath-inline`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-truth-honesty-oath-inline` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('TRUTH_AND_HONESTY.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('Oath: python')); assert 'host/library' in line; assert r'F:\\GrokSelfLibrary' not in line"

## Notes

TRUTH_AND_HONESTY.md inline oath still pins F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-truth-honesty-oath-inline.patch on main#9. Independent of system-root leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

TRUTH_AND_HONESTY.md inline Oath line only. Leave C:\\Users hardwire. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-truth-honesty-oath-inline
- node src/cli.js patches --prove-after-apply --job dronehive-truth-honesty-oath-inline
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-truth-honesty-oath-inline-from-ops
- git apply --check /path/to/main/patches/dronehive-truth-honesty-oath-inline.patch
- git apply /path/to/main/patches/dronehive-truth-honesty-oath-inline.patch
- python3 -c "from pathlib import Path; t=Path('TRUTH_AND_HONESTY.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('Oath: python')); assert 'host/library' in line; assert r'F:\\GrokSelfLibrary' not in line"
- TRUTH_AND_HONESTY.md inline oath uses host/library

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

