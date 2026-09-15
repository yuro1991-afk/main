# Make leftover 1.3.0 ship/docs match released OpenSussy 2.0.0

- id: `opensussy-ship-json-2-0-0`
- kind: fix (Land a concrete bugfix in a named repo.)
- scope: relaunch
- repo: github.com/yuro1991-afk/opensussy
- relaunch: https://github.com/yuro1991-afk/opensussy
- why: This token cannot push opensussy. Apply `patches/opensussy-ship-json-2-0-0.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

VERSION / PRODUCT.json / csproj are 2.0.0, but SHIP.json, USER_GUIDE.md, SETUP-DESKTOP.cmd, and INSTALL.cmd still say 1.3.0. Seeded from sibling PR #4 so both boards agree.

## Collision

Same card as keep-busy sync-2-0-0-docs-and-ship-json. Claim one board, not both.

## First commands

- node src/cli.js patches --prove --job opensussy-ship-json-2-0-0
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-ship-json-2-0-0-from-ops
- git apply --check /path/to/main/patches/opensussy-ship-json-2-0-0.patch
- git apply /path/to/main/patches/opensussy-ship-json-2-0-0.patch
- python3 -c "from pathlib import Path; import json; s=json.loads(Path('SHIP.json').read_text()); assert s['version']=='2.0.0'; assert s['usb_zip_bytes']==1113129; i=json.loads(Path('install/SHIP.json').read_text()); assert i['version']=='2.0.0'; assert '## 1.3.0' in Path('CHANGELOG.md').read_text()"

## Verify

SHIP.json and generated docs say 2.0.0; leftover 1.3.0 only in CHANGELOG.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
