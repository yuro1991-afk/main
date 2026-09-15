# Leftover unused — dronehive-app-links-host-paths

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-app-links-host-paths`
- launch: `reviews/launch/dronehive-app-links-host-paths.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-app-links-host-paths

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-app-links-host-paths.patch`
- Requires (apply first): `patches/dronehive-portable-paths.patch`
- Job: `dronehive-app-links-host-paths` — Resolve dronehive app link catalog F:/D: URIs via host_paths
- Playbook: `playbooks/dronehive-app-links-host-paths.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-app-links-host-paths`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-app-links-host-paths` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/app/links.py').read_text(); line=next(x for x in t.splitlines() if 'uri' in x and 'GrokSelfLibrary' in x); assert 'resolve_host_path' in line"

## Notes

drone/app/links.py list_links still hardcodes F:\\GrokSelfLibrary and D:\\GrokCoreMemory\\continuous\\OPEN_TASKS.json. Apply portable-paths first, then patches/dronehive-app-links-host-paths.patch from main#9. Independent of runtime-host-paths and config-load-overlay. Do not copy PR #6 autofix. This token cannot push dronehive. Requires (apply first): patches/dronehive-portable-paths.patch.

## Collision

Apply after dronehive-portable-paths. Different file from runtime-host-paths. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-app-links-host-paths
- node src/cli.js patches --prove-after-apply --job dronehive-app-links-host-paths
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-app-links-host-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-portable-paths.patch
- git apply /path/to/main/patches/dronehive-portable-paths.patch
- git apply --check /path/to/main/patches/dronehive-app-links-host-paths.patch
- git apply /path/to/main/patches/dronehive-app-links-host-paths.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/links.py').read_text(); line=next(x for x in t.splitlines() if 'uri' in x and 'GrokSelfLibrary' in x); assert 'resolve_host_path' in line"
- drone/app/links.py library uri uses resolve_host_path. Do not py_compile.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there


