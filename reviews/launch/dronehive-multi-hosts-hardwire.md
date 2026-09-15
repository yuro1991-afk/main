# Leftover unused — dronehive-multi-hosts-hardwire

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-multi-hosts-hardwire`
- launch: `reviews/launch/dronehive-multi-hosts-hardwire.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-multi-hosts-hardwire

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-multi-hosts-hardwire.patch`
- Job: `dronehive-multi-hosts-hardwire` — Point multi_hosts.json hardwire at repo data/
- Playbook: `playbooks/dronehive-multi-hosts-hardwire.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-multi-hosts-hardwire`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-multi-hosts-hardwire` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; d=json.loads(Path('configs/multi_hosts.json').read_text()); assert d['super_mesh']['hardwire']=='data/super_mesh/HARDWIRE.json'"

## Notes

configs/multi_hosts.json super_mesh.hardwire still pins G:\\AI-Home\\projects\\ai-worker-drone-0.5b. That is this repo; use data/super_mesh/HARDWIRE.json. Applyable catalog patch is patches/dronehive-multi-hosts-hardwire.patch on main#9. Independent of multi-hosts-exe-honesty (exe keys) and super-llms-hardwire (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

configs/multi_hosts.json super_mesh.hardwire key only. Do not edit C:\\ AppData exe leftovers. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-multi-hosts-hardwire
- node src/cli.js patches --prove-after-apply --job dronehive-multi-hosts-hardwire
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-multi-hosts-hardwire-from-ops
- git apply --check /path/to/main/patches/dronehive-multi-hosts-hardwire.patch
- git apply /path/to/main/patches/dronehive-multi-hosts-hardwire.patch
- python3 -c "from pathlib import Path; import json; d=json.loads(Path('configs/multi_hosts.json').read_text()); assert d['super_mesh']['hardwire']=='data/super_mesh/HARDWIRE.json'"
- configs/multi_hosts.json super_mesh.hardwire is data/super_mesh/HARDWIRE.json.

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

