# Leftover unused — faceswap-readme-firewall-honesty

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `faceswap-readme-firewall-honesty`
- launch: `reviews/launch/faceswap-readme-firewall-honesty.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply faceswap-readme-firewall-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/face-swap-ios
- Relaunch: https://github.com/yuro1991-afk/face-swap-ios
- Patch: `patches/faceswap-readme-firewall-honesty.patch`
- Job: `faceswap-readme-firewall-honesty` — Mark README firewall as one host example
- Playbook: `playbooks/faceswap-readme-firewall-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job faceswap-readme-firewall-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job faceswap-readme-firewall-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'inbound TCP' in t and 'Windows Firewall is one host example' in t"

## Notes

README still says allow Windows Firewall for TCP 8860. Applyable catalog patch is patches/faceswap-readme-firewall-honesty.patch on main#9. Independent of install, requirements, and Swift leftovers. This token cannot push face-swap-ios.

## Collision

README firewall sentence only. Different hunk from install, Requirements, and Swift. Do not rewrite START.cmd.

## First moves

- node src/cli.js patches --prove --job faceswap-readme-firewall-honesty
- node src/cli.js patches --prove-after-apply --job faceswap-readme-firewall-honesty
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-readme-firewall-honesty-from-ops
- git apply --check /path/to/main/patches/faceswap-readme-firewall-honesty.patch
- git apply /path/to/main/patches/faceswap-readme-firewall-honesty.patch
- python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'inbound TCP' in t and 'Windows Firewall is one host example' in t"
- README says inbound TCP 8860 and that Windows Firewall is one host example.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/face-swap-ios — apply there

## Related

- #9 patch-catalog — Applyable sibling diffs under patches/. node src/cli.js patches lists them. Not an autofix runner.

