# Leftover unused — dronehive-spec-relative

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-spec-relative`
- launch: `reviews/launch/dronehive-spec-relative.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-spec-relative

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-spec-relative.patch`
- Job: `dronehive-spec-relative` — Point DroneHive.spec at repo-relative desktop.py
- Playbook: `playbooks/dronehive-spec-relative.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-spec-relative`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-spec-relative` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('DroneHive.spec').read_text(); assert \"['drone/app/desktop.py']\" in t; assert \"pathex=['.']\" in t"

## Notes

DroneHive.spec Analysis still pins G:/AI-Home/projects/ai-worker-drone-0.5b. Applyable catalog patch is patches/dronehive-spec-relative.patch on main#9. Independent of portable-paths and start-script leftovers (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

DroneHive.spec Analysis script/pathex only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-spec-relative
- node src/cli.js patches --prove-after-apply --job dronehive-spec-relative
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-spec-relative-from-ops
- git apply --check /path/to/main/patches/dronehive-spec-relative.patch
- git apply /path/to/main/patches/dronehive-spec-relative.patch
- python3 -c "from pathlib import Path; t=Path('DroneHive.spec').read_text(); assert \"['drone/app/desktop.py']\" in t; assert \"pathex=['.']\" in t"
- DroneHive.spec Analysis uses drone/app/desktop.py and pathex '.'

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

