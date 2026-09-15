# Leftover unused — dronehive-hive-docstring-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-hive-docstring-honesty`
- launch: `reviews/launch/dronehive-hive-docstring-honesty.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-hive-docstring-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-hive-docstring-honesty.patch`
- Job: `dronehive-hive-docstring-honesty` — Mark hive.py F: library path as one host example
- Playbook: `playbooks/dronehive-hive-docstring-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-hive-docstring-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-hive-docstring-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/hive.py').read_text(); assert 'one host example' in t and 'the library + continuous OPEN_TASKS overlay' in t"

## Notes

drone/hive.py module docstring still says Connected to F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-hive-docstring-honesty.patch on main#9. Independent of config-load-overlay (import/_load_cfg hunks only). Does not need portable-paths. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Docstring only. Independent of config-load-overlay. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-hive-docstring-honesty
- node src/cli.js patches --prove-after-apply --job dronehive-hive-docstring-honesty
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-hive-docstring-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-hive-docstring-honesty.patch
- git apply /path/to/main/patches/dronehive-hive-docstring-honesty.patch
- python3 -c "from pathlib import Path; t=Path('drone/hive.py').read_text(); assert 'one host example' in t and 'the library + continuous OPEN_TASKS overlay' in t"
- drone/hive.py docstring names one host example. Do not py_compile.

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

