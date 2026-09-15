# Leftover unused — dronehive-config-load-overlay

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-config-load-overlay`
- launch: `reviews/launch/dronehive-config-load-overlay.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-config-load-overlay

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-config-load-overlay.patch`
- Requires (apply first): `patches/dronehive-portable-paths.patch`
- Job: `dronehive-config-load-overlay` — Remap F:/D:/G: strings when dronehive JSON configs load
- Playbook: `playbooks/dronehive-config-load-overlay.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-config-load-overlay`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-config-load-overlay` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from drone.config_overlay import remap_host_strings"

## Notes

After Path() wraps, hive / future_seer / multi_hosts / work_order / super_llms JSON still leak F:/D:/G: on load. Apply portable-paths first, then patches/dronehive-config-load-overlay.patch from main#9. Independent of runtime-host-paths. Do not copy PR #6 autofix. This token cannot push dronehive. Requires (apply first): patches/dronehive-portable-paths.patch.

## Collision

Apply after dronehive-portable-paths. Independent of runtime-host-paths. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-config-load-overlay
- node src/cli.js patches --prove-after-apply --job dronehive-config-load-overlay
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-config-load-overlay-from-ops
- git apply --check /path/to/main/patches/dronehive-portable-paths.patch
- git apply /path/to/main/patches/dronehive-portable-paths.patch
- git apply --check /path/to/main/patches/dronehive-config-load-overlay.patch
- git apply /path/to/main/patches/dronehive-config-load-overlay.patch
- python3 -c "from drone.config_overlay import remap_host_strings"
- drone/config_overlay.py has remap_host_strings. Do not py_compile.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there


