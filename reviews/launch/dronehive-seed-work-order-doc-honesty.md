# Leftover unused — dronehive-seed-work-order-doc-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-work-order-doc-honesty`
- launch: `reviews/launch/dronehive-seed-work-order-doc-honesty.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-work-order-doc-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-work-order-doc-honesty.patch`
- Job: `dronehive-seed-work-order-doc-honesty` — Point seed WORK_ORDER.md NEXT.json example at host/library
- Playbook: `playbooks/dronehive-seed-work-order-doc-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-work-order-doc-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); assert 'host/library/knowledge/codex/CODEX.min.json' in t and 'host/library' in t"

## Notes

drone/app/seed/docs/WORK_ORDER.md NEXT.json example still pins F:\\GrokSelfLibrary\\knowledge\\codex\\CODEX.min.json. Applyable catalog patch is patches/dronehive-seed-work-order-doc-honesty.patch on main#9. Independent of docs/WORK_ORDER.md leftover (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Seed docs only. Different file from docs/WORK_ORDER.md. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-work-order-doc-honesty
- node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-honesty
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-doc-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-doc-honesty.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-doc-honesty.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); assert 'host/library/knowledge/codex/CODEX.min.json' in t and 'host/library' in t"
- drone/app/seed/docs/WORK_ORDER.md NEXT.json example codex_ref is host/library/knowledge/codex/CODEX.min.json.

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

