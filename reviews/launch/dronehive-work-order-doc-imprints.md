# Leftover unused — dronehive-work-order-doc-imprints

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-work-order-doc-imprints`
- launch: `reviews/launch/dronehive-work-order-doc-imprints.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-work-order-doc-imprints

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-work-order-doc-imprints.patch`
- Job: `dronehive-work-order-doc-imprints` — Point docs/WORK_ORDER.md imprint index at host/library
- Playbook: `playbooks/dronehive-work-order-doc-imprints.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-work-order-doc-imprints`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-work-order-doc-imprints` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); assert 'host/library/knowledge/indexes/drone_imprints.jsonl' in t"

## Notes

docs/WORK_ORDER.md imprint table still pins F:\\GrokSelfLibrary\\knowledge\\indexes\\drone_imprints.jsonl. Applyable catalog patch is patches/dronehive-work-order-doc-imprints.patch on main#9. Independent of header fabric, Library law, NEXT.json, and live-registry docs leftovers. No seed copy of this row. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/WORK_ORDER.md imprint table row only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-work-order-doc-imprints
- node src/cli.js patches --prove-after-apply --job dronehive-work-order-doc-imprints
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-imprints-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-imprints.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-imprints.patch
- python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); assert 'host/library/knowledge/indexes/drone_imprints.jsonl' in t"
- docs/WORK_ORDER.md imprint table uses host/library/knowledge/indexes/drone_imprints.jsonl.

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

