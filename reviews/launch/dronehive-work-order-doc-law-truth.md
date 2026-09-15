# Leftover unused — dronehive-work-order-doc-law-truth

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-work-order-doc-law-truth`
- launch: `reviews/launch/dronehive-work-order-doc-law-truth.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-work-order-doc-law-truth

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-work-order-doc-law-truth.patch`
- Job: `dronehive-work-order-doc-law-truth` — Point docs/WORK_ORDER.md Library law at host/library
- Playbook: `playbooks/dronehive-work-order-doc-law-truth.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-work-order-doc-law-truth`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-work-order-doc-law-truth` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('Library law:')); assert 'host/library/LAW_TRUTH.md' in line; assert 'GrokSelfLibrary' not in line"

## Notes

docs/WORK_ORDER.md Library law still pins F:\\GrokSelfLibrary\\LAW_TRUTH.md. Applyable catalog patch is patches/dronehive-work-order-doc-law-truth.patch on main#9. Independent of work-order-doc-honesty (NEXT.json) and the JSON law-truth leftover. Leave the C:\\ host-law line. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/WORK_ORDER.md Library law line only. Seed copy is a later leftover. Do not edit the C:\\ host-law line. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-work-order-doc-law-truth
- node src/cli.js patches --prove-after-apply --job dronehive-work-order-doc-law-truth
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-law-truth-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-law-truth.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-law-truth.patch
- python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('Library law:')); assert 'host/library/LAW_TRUTH.md' in line; assert 'GrokSelfLibrary' not in line"
- docs/WORK_ORDER.md Library law is host/library/LAW_TRUTH.md.

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

