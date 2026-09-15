# Leftover unused — dronehive-doc-app-library

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-doc-app-library`
- launch: `reviews/launch/dronehive-doc-app-library.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-doc-app-library

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-doc-app-library.patch`
- Job: `dronehive-doc-app-library` — Point APP.md library root at host/library
- Playbook: `playbooks/dronehive-doc-app-library.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-doc-app-library`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-doc-app-library` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/APP.md').read_text(); assert 'host/library' in t; assert r'F:\\GrokSelfLibrary' not in t"

## Notes

docs/APP.md Library row still pins F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-doc-app-library.patch on main#9. Independent of APP.md cd leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/APP.md Library row only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-doc-app-library
- node src/cli.js patches --prove-after-apply --job dronehive-doc-app-library
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-app-library-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-app-library.patch
- git apply /path/to/main/patches/dronehive-doc-app-library.patch
- python3 -c "from pathlib import Path; t=Path('docs/APP.md').read_text(); assert 'host/library' in t; assert r'F:\\GrokSelfLibrary' not in t"
- docs/APP.md Library row uses host/library

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

