# Leftover unused — dronehive-doc-honesty-library

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-doc-honesty-library`
- launch: `reviews/launch/dronehive-doc-honesty-library.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-doc-honesty-library

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-doc-honesty-library.patch`
- Job: `dronehive-doc-honesty-library` — Point HONESTY.md library root at host/library
- Playbook: `playbooks/dronehive-doc-honesty-library.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-doc-honesty-library`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-doc-honesty-library` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/HONESTY.md').read_text(); assert 'host/library' in t; assert r'F:\\GrokSelfLibrary' not in t"

## Notes

docs/HONESTY.md library row still pins F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-doc-honesty-library.patch on main#9. Independent of hive-docstring-honesty. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/HONESTY.md library row only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-doc-honesty-library
- node src/cli.js patches --prove-after-apply --job dronehive-doc-honesty-library
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-honesty-library-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-honesty-library.patch
- git apply /path/to/main/patches/dronehive-doc-honesty-library.patch
- python3 -c "from pathlib import Path; t=Path('docs/HONESTY.md').read_text(); assert 'host/library' in t; assert r'F:\\GrokSelfLibrary' not in t"
- docs/HONESTY.md library row uses host/library

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

