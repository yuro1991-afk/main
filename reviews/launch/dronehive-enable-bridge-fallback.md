# Leftover unused — dronehive-enable-bridge-fallback

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-enable-bridge-fallback`
- launch: `reviews/launch/dronehive-enable-bridge-fallback.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-enable-bridge-fallback

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-enable-bridge-fallback.patch`
- Job: `dronehive-enable-bridge-fallback` — Point Enable-Bridge1080 fallback root at the repo
- Playbook: `playbooks/dronehive-enable-bridge-fallback.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-enable-bridge-fallback`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-enable-bridge-fallback` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('scripts/Enable-Bridge1080-Admin.ps1').read_text(); assert t.count('Split-Path')>=3; assert r'G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Notes

scripts/Enable-Bridge1080-Admin.ps1 fallback still pins G:\\AI-Home\\projects\\ai-worker-drone-0.5b. Applyable catalog patch is patches/dronehive-enable-bridge-fallback.patch on main#9. Independent of start-script leftovers. Leaves the double-parent probe. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

scripts/Enable-Bridge1080-Admin.ps1 fallback line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-enable-bridge-fallback
- node src/cli.js patches --prove-after-apply --job dronehive-enable-bridge-fallback
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-enable-bridge-fallback-from-ops
- git apply --check /path/to/main/patches/dronehive-enable-bridge-fallback.patch
- git apply /path/to/main/patches/dronehive-enable-bridge-fallback.patch
- python3 -c "from pathlib import Path; t=Path('scripts/Enable-Bridge1080-Admin.ps1').read_text(); assert t.count('Split-Path')>=3; assert r'G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"
- Enable-Bridge1080-Admin.ps1 fallback is Split-Path of PSScriptRoot parent.

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

