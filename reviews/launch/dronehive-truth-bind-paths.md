# Leftover unused — dronehive-truth-bind-paths

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-truth-bind-paths`
- launch: `reviews/launch/dronehive-truth-bind-paths.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-truth-bind-paths

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-truth-bind-paths.patch`
- Job: `dronehive-truth-bind-paths` — Point TRUTH_BIND.json host paths at repo overlays
- Playbook: `playbooks/dronehive-truth-bind-paths.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-truth-bind-paths`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-truth-bind-paths` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "import json; d=json.load(open('TRUTH_BIND.json')); assert d['root']=='.'; assert d['universal']=='host/library/truth/UNIVERSAL_TRUTH.md'; assert d['oath_gate']=='host/library/bin/truth_oath_gate.py'; assert d['agreement']=='host/library/oath/CURRENT_AGREEMENT.json'"

## Notes

TRUTH_BIND.json root/universal/oath_gate/agreement still pin G:\\AI-Home and F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-truth-bind-paths.patch on main#9. Independent of work_order JSON leftovers (different file). Leaves core_imprint F:/C: text and the C:\\ grok hardwire. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

TRUTH_BIND.json remappable keys only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-truth-bind-paths
- node src/cli.js patches --prove-after-apply --job dronehive-truth-bind-paths
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-truth-bind-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-truth-bind-paths.patch
- git apply /path/to/main/patches/dronehive-truth-bind-paths.patch
- python3 -c "import json; d=json.load(open('TRUTH_BIND.json')); assert d['root']=='.'; assert d['universal']=='host/library/truth/UNIVERSAL_TRUTH.md'; assert d['oath_gate']=='host/library/bin/truth_oath_gate.py'; assert d['agreement']=='host/library/oath/CURRENT_AGREEMENT.json'"
- TRUTH_BIND.json root is '.' and universal/oath_gate/agreement use host/library

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

