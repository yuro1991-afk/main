# Mark README firewall as one host example

- id: `faceswap-readme-firewall-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: This token cannot push face-swap-ios. Apply `patches/faceswap-readme-firewall-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

README still says allow Windows Firewall for TCP 8860. Inbound TCP 8860 is the contract; Windows Firewall is one host example. Independent of install, requirements, and Swift leftovers.

## Collision

README firewall sentence only. Different hunk from install, Requirements, and Swift. Do not rewrite START.cmd.

## First commands

- node src/cli.js patches --prove --job faceswap-readme-firewall-honesty
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-readme-firewall-honesty-from-ops
- git apply --check /path/to/main/patches/faceswap-readme-firewall-honesty.patch
- git apply /path/to/main/patches/faceswap-readme-firewall-honesty.patch
- python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'inbound TCP' in t and 'Windows Firewall is one host example' in t"

## Verify

README says inbound TCP 8860 and that Windows Firewall is one host example.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
