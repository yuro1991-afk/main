# Leftover unused — dronehive-work-order-doc-codex-paths

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-work-order-doc-codex-paths`
- launch: `reviews/launch/dronehive-work-order-doc-codex-paths.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-work-order-doc-codex-paths

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-work-order-doc-codex-paths.patch`
- Job: `dronehive-work-order-doc-codex-paths` — Point docs/WORK_ORDER.md codex table at host/library
- Playbook: `playbooks/dronehive-work-order-doc-codex-paths.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-work-order-doc-codex-paths`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-work-order-doc-codex-paths` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); assert 'host/library/knowledge/codex/CODEX.md' in t; assert 'host/library/knowledge/codex/models/catalog.min.json' in t; assert 'host/library/bin/query_llm_codex.py' in t; assert 'host/library/bin/build_llm_codex.py' in t"

## Notes

docs/WORK_ORDER.md codex table still pins F:\\GrokSelfLibrary\\knowledge\\codex. Applyable catalog patch is patches/dronehive-work-order-doc-codex-paths.patch on main#9. Independent of JSON codex-paths leftover and the CLI-example leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/WORK_ORDER.md codex table only. Do not edit the & $py CLI examples. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-work-order-doc-codex-paths
- node src/cli.js patches --prove-after-apply --job dronehive-work-order-doc-codex-paths
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-codex-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-codex-paths.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-codex-paths.patch
- python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); assert 'host/library/knowledge/codex/CODEX.md' in t; assert 'host/library/knowledge/codex/models/catalog.min.json' in t; assert 'host/library/bin/query_llm_codex.py' in t; assert 'host/library/bin/build_llm_codex.py' in t"
- docs/WORK_ORDER.md codex table rows use host/library.

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

