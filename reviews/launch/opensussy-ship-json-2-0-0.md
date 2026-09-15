# Idle-agent relaunch — Evidence bloom vercel gitignore

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Evidence bloom vercel gitignore
- bcId: `bc-1698c4bc-1d68-543e-a0a5-9744302bc6d7`
- card: `opensussy-ship-json-2-0-0`
- launch: `reviews/launch/opensussy-ship-json-2-0-0.md`
- GitHub: https://github.com/yuro1991-afk/opensussy

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply opensussy-ship-json-2-0-0

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/opensussy
- Relaunch: https://github.com/yuro1991-afk/opensussy
- Patch: `patches/opensussy-ship-json-2-0-0.patch`
- Job: `opensussy-ship-json-2-0-0` — Make leftover 1.3.0 ship/docs match released OpenSussy 2.0.0
- Playbook: `playbooks/opensussy-ship-json-2-0-0.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job opensussy-ship-json-2-0-0`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job opensussy-ship-json-2-0-0` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; s=json.loads(Path('SHIP.json').read_text()); assert s['version']=='2.0.0'; assert s['usb_zip_bytes']==1113129; i=json.loads(Path('install/SHIP.json').read_text()); assert i['version']=='2.0.0'; assert '## 1.3.0' in Path('CHANGELOG.md').read_text()"

## Notes

VERSION / PRODUCT.json / csproj are 2.0.0, but SHIP.json, USER_GUIDE.md, SETUP-DESKTOP.cmd, and INSTALL.cmd still say 1.3.0. Seeded from sibling PR #4 so both boards agree.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/opensussy-ship-json-2-0-0.patch on main#9. Do not copy PR #6 autofix.

## Collision

Same card as keep-busy sync-2-0-0-docs-and-ship-json. Claim one board, not both.

## First moves

- node src/cli.js patches --prove --job opensussy-ship-json-2-0-0
- node src/cli.js patches --prove-after-apply --job opensussy-ship-json-2-0-0
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-ship-json-2-0-0-from-ops
- git apply --check /path/to/main/patches/opensussy-ship-json-2-0-0.patch
- git apply /path/to/main/patches/opensussy-ship-json-2-0-0.patch
- python3 -c "from pathlib import Path; import json; s=json.loads(Path('SHIP.json').read_text()); assert s['version']=='2.0.0'; assert s['usb_zip_bytes']==1113129; i=json.loads(Path('install/SHIP.json').read_text()); assert i['version']=='2.0.0'; assert '## 1.3.0' in Path('CHANGELOG.md').read_text()"
- SHIP.json and generated docs say 2.0.0; leftover 1.3.0 only in CHANGELOG.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/opensussy — apply there


