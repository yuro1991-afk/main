# Leftover unused — dronehive-doc-multi-face-cd

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-doc-multi-face-cd`
- launch: `reviews/launch/dronehive-doc-multi-face-cd.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-doc-multi-face-cd

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-doc-multi-face-cd.patch`
- Job: `dronehive-doc-multi-face-cd` — Point MULTI_FACE.md swarm cd at repo root
- Playbook: `playbooks/dronehive-doc-multi-face-cd.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-doc-multi-face-cd`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-doc-multi-face-cd` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/MULTI_FACE.md').read_text(); assert '\ncd .\n' in t; assert r'cd G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Notes

docs/MULTI_FACE.md still pins G:\\AI-Home cd. Applyable catalog patch is patches/dronehive-doc-multi-face-cd.patch on main#9. Independent of work-order-doc-cd. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/MULTI_FACE.md cd line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-doc-multi-face-cd
- node src/cli.js patches --prove-after-apply --job dronehive-doc-multi-face-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-multi-face-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-multi-face-cd.patch
- git apply /path/to/main/patches/dronehive-doc-multi-face-cd.patch
- python3 -c "from pathlib import Path; t=Path('docs/MULTI_FACE.md').read_text(); assert '\ncd .\n' in t; assert r'cd G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"
- docs/MULTI_FACE.md cd is .

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

