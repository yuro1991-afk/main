# Leftover unused — dronehive-seed-doc-app-library

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-doc-app-library`
- launch: `reviews/launch/dronehive-seed-doc-app-library.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-doc-app-library

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-doc-app-library.patch`
- Job: `dronehive-seed-doc-app-library` — Point seed APP.md library root at host/library
- Playbook: `playbooks/dronehive-seed-doc-app-library.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-doc-app-library`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-doc-app-library` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/APP.md').read_text(); assert 'host/library' in t; assert r'F:\\GrokSelfLibrary' not in t"

## Notes

seed APP.md Library row still pins F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-seed-doc-app-library.patch on main#9. Independent of live docs leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

drone/app/seed/docs/APP.md Library row only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-doc-app-library
- node src/cli.js patches --prove-after-apply --job dronehive-seed-doc-app-library
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-doc-app-library-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-doc-app-library.patch
- git apply /path/to/main/patches/dronehive-seed-doc-app-library.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/APP.md').read_text(); assert 'host/library' in t; assert r'F:\\GrokSelfLibrary' not in t"
- seed APP.md Library row uses host/library

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

