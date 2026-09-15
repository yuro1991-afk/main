# Leftover unused — dronehive-super-llms-hardwire

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-super-llms-hardwire`
- launch: `reviews/launch/dronehive-super-llms-hardwire.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-super-llms-hardwire

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-super-llms-hardwire.patch`
- Job: `dronehive-super-llms-hardwire` — Point super_llms.json hardwire at repo data/
- Playbook: `playbooks/dronehive-super-llms-hardwire.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-super-llms-hardwire`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-super-llms-hardwire` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; d=json.loads(Path('configs/super_llms.json').read_text()); assert d['super_mesh']['hardwire']=='data/super_mesh/HARDWIRE.json'"

## Notes

configs/super_llms.json super_mesh.hardwire still pins G:\\AI-Home\\projects\\ai-worker-drone-0.5b. That is this repo; use data/super_mesh/HARDWIRE.json. Applyable catalog patch is patches/dronehive-super-llms-hardwire.patch on main#9. Independent of multi-hosts-hardwire (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

configs/super_llms.json super_mesh.hardwire key only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-super-llms-hardwire
- node src/cli.js patches --prove-after-apply --job dronehive-super-llms-hardwire
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-super-llms-hardwire-from-ops
- git apply --check /path/to/main/patches/dronehive-super-llms-hardwire.patch
- git apply /path/to/main/patches/dronehive-super-llms-hardwire.patch
- python3 -c "from pathlib import Path; import json; d=json.loads(Path('configs/super_llms.json').read_text()); assert d['super_mesh']['hardwire']=='data/super_mesh/HARDWIRE.json'"
- configs/super_llms.json super_mesh.hardwire is data/super_mesh/HARDWIRE.json.

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

