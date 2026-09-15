# Leftover unused — dronehive-runtime-host-paths

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-runtime-host-paths`
- launch: `reviews/launch/dronehive-runtime-host-paths.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-runtime-host-paths

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-runtime-host-paths.patch`
- Requires (apply first): `patches/dronehive-portable-paths.patch`
- Job: `dronehive-runtime-host-paths` — Wrap leftover dronehive runtime Path() via host_paths
- Playbook: `playbooks/dronehive-runtime-host-paths.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-runtime-host-paths`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-runtime-host-paths` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/grok_handoff.py').read_text(); line=next(x for x in t.splitlines() if x.startswith('DEFAULT_ROOT =')); assert 'resolve_host_path' in line"

## Notes

After portable-paths, grok_handoff / future_seer / tools / operational still hardcode G: Path(). Apply portable-paths first, then patches/dronehive-runtime-host-paths.patch from main#9. Do not copy PR #6 autofix. This token cannot push dronehive. Requires (apply first): patches/dronehive-portable-paths.patch.

## Collision

Apply after dronehive-portable-paths. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-runtime-host-paths
- node src/cli.js patches --prove-after-apply --job dronehive-runtime-host-paths
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-runtime-host-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-portable-paths.patch
- git apply /path/to/main/patches/dronehive-portable-paths.patch
- git apply --check /path/to/main/patches/dronehive-runtime-host-paths.patch
- git apply /path/to/main/patches/dronehive-runtime-host-paths.patch
- python3 -c "from pathlib import Path; t=Path('drone/grok_handoff.py').read_text(); line=next(x for x in t.splitlines() if x.startswith('DEFAULT_ROOT =')); assert 'resolve_host_path' in line"
- DEFAULT_ROOT uses resolve_host_path. Do not py_compile.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there


