# Leftover unused — dronehive-doc-super-kernel-cd

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-doc-super-kernel-cd`
- launch: `reviews/launch/dronehive-doc-super-kernel-cd.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-doc-super-kernel-cd

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-doc-super-kernel-cd.patch`
- Job: `dronehive-doc-super-kernel-cd` — Point SUPER_KERNEL.md Set-Location at repo root
- Playbook: `playbooks/dronehive-doc-super-kernel-cd.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-doc-super-kernel-cd`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-doc-super-kernel-cd` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/SUPER_KERNEL.md').read_text(); assert '\nSet-Location .\n' in t; assert r'Set-Location G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Notes

docs/SUPER_KERNEL.md still pins G:\\AI-Home Set-Location. Applyable catalog patch is patches/dronehive-doc-super-kernel-cd.patch on main#9. Independent of work-order-doc-cd. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/SUPER_KERNEL.md Set-Location line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-doc-super-kernel-cd
- node src/cli.js patches --prove-after-apply --job dronehive-doc-super-kernel-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-super-kernel-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-super-kernel-cd.patch
- git apply /path/to/main/patches/dronehive-doc-super-kernel-cd.patch
- python3 -c "from pathlib import Path; t=Path('docs/SUPER_KERNEL.md').read_text(); assert '\nSet-Location .\n' in t; assert r'Set-Location G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"
- docs/SUPER_KERNEL.md Set-Location is .

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

