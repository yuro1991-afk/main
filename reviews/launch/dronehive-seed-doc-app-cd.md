# Leftover unused — dronehive-seed-doc-app-cd

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-doc-app-cd`
- launch: `reviews/launch/dronehive-seed-doc-app-cd.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-doc-app-cd

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-doc-app-cd.patch`
- Job: `dronehive-seed-doc-app-cd` — Point seed APP.md swarm cd at repo root
- Playbook: `playbooks/dronehive-seed-doc-app-cd.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-doc-app-cd`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-doc-app-cd` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/APP.md').read_text(); assert '\ncd .\n' in t; assert r'cd G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Notes

seed APP.md still pins G:\\AI-Home cd. Applyable catalog patch is patches/dronehive-seed-doc-app-cd.patch on main#9. Independent of live docs leftover and seed Library leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

drone/app/seed/docs/APP.md cd line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-doc-app-cd
- node src/cli.js patches --prove-after-apply --job dronehive-seed-doc-app-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-doc-app-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-doc-app-cd.patch
- git apply /path/to/main/patches/dronehive-seed-doc-app-cd.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/APP.md').read_text(); assert '\ncd .\n' in t; assert r'cd G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"
- seed APP.md cd is .

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

