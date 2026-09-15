# Idle-agent relaunch — Inventory dronehive work

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Inventory dronehive work
- bcId: `bc-97b038c2-8acd-5139-9dcd-6ae70cf4b3c1`
- card: `bloom-gitignore-vercel`
- launch: `reviews/launch/bloom-gitignore-vercel.md`
- GitHub: https://github.com/yuro1991-afk/bloom-fair-yellow-charm

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply bloom-gitignore-vercel

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Patch: `patches/bloom-gitignore-vercel.patch`
- Job: `bloom-gitignore-vercel` — Stop shipping .vercel/output in Omni-Forge
- Playbook: `playbooks/bloom-gitignore-vercel.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job bloom-gitignore-vercel`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job bloom-gitignore-vercel` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('.gitignore').read_text(); assert '.vercel/' in t; assert 'dist/' in t; assert '.output/' in t; assert '.nitro/' in t"

## Notes

.gitignore is only node_modules and env crumbs; the tree includes Nitro/Vercel build output.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/bloom-gitignore-vercel.patch on main#9. Do not copy PR #6 autofix.

## Collision

Same as keep-busy gitignore-vercel-build-output. Keep package-lock.json tracked.

## First moves

- node src/cli.js patches --prove --job bloom-gitignore-vercel
- node src/cli.js patches --prove-after-apply --job bloom-gitignore-vercel
- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-gitignore-vercel-from-ops
- git apply --check /path/to/main/patches/bloom-gitignore-vercel.patch
- git apply /path/to/main/patches/bloom-gitignore-vercel.patch
- python3 -c "from pathlib import Path; t=Path('.gitignore').read_text(); assert '.vercel/' in t; assert 'dist/' in t; assert '.output/' in t; assert '.nitro/' in t"
- .gitignore includes .vercel/ and dist/; committed output is removed; npm run build still works.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/bloom-fair-yellow-charm — apply there


