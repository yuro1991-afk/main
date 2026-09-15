# Leftover unused — dronehive-icons-manifest-relative

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-icons-manifest-relative`
- launch: `reviews/launch/dronehive-icons-manifest-relative.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-icons-manifest-relative

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-icons-manifest-relative.patch`
- Job: `dronehive-icons-manifest-relative` — Point ICONS_MANIFEST icon_root at repo assets/icons
- Playbook: `playbooks/dronehive-icons-manifest-relative.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-icons-manifest-relative`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-icons-manifest-relative` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; k=json.loads(Path('assets/icons/ICONS_MANIFEST.json').read_text())['icon_root']; assert k=='assets/icons'; assert r'G:\\AI-Home' not in k"

## Notes

assets/icons/ICONS_MANIFEST.json still pins G:\\AI-Home\\projects\\ai-worker-drone-0.5b\\assets\\icons. Applyable catalog patch is patches/dronehive-icons-manifest-relative.patch on main#9. Independent of portable-paths. Desktop C: paths left as one host example. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Manifest only. Independent of portable-paths and config-load-overlay. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-icons-manifest-relative
- node src/cli.js patches --prove-after-apply --job dronehive-icons-manifest-relative
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-icons-manifest-relative-from-ops
- git apply --check /path/to/main/patches/dronehive-icons-manifest-relative.patch
- git apply /path/to/main/patches/dronehive-icons-manifest-relative.patch
- python3 -c "from pathlib import Path; import json; k=json.loads(Path('assets/icons/ICONS_MANIFEST.json').read_text())['icon_root']; assert k=='assets/icons'; assert r'G:\\AI-Home' not in k"
- ICONS_MANIFEST icon_root is assets/icons.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there


