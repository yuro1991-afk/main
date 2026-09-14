# Stop shipping .vercel/output in Omni-Forge

- id: `bloom-gitignore-vercel`
- kind: fix (Land a concrete bugfix in a named repo.)
- scope: relaunch
- repo: github.com/yuro1991-afk/bloom-fair-yellow-charm
- relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- why: This token cannot push bloom-fair-yellow-charm. Apply `patches/bloom-gitignore-vercel.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

.gitignore is only node_modules and env crumbs; the tree includes Nitro/Vercel build output.

## Collision

Same as keep-busy gitignore-vercel-build-output. Keep package-lock.json tracked.

## First commands

- node src/cli.js patches --prove --job bloom-gitignore-vercel
- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-gitignore-vercel-from-ops
- git apply --check /path/to/main/patches/bloom-gitignore-vercel.patch
- git apply /path/to/main/patches/bloom-gitignore-vercel.patch
- git rm -r --cached .vercel/output
- .gitignore includes .vercel/ and dist/; committed output is removed; npm run build still works.

## Verify

.gitignore includes .vercel/ and dist/; committed output is removed; npm run build still works.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
