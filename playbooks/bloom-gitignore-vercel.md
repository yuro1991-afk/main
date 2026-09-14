# Stop shipping .vercel/output in Omni-Forge

- id: `bloom-gitignore-vercel`
- kind: fix (Land a concrete bugfix in a named repo.)
- scope: relaunch
- repo: github.com/yuro1991-afk/bloom-fair-yellow-charm
- relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- why: Relaunch against the named repo. This landing-pad token cannot push it.

## Notes

.gitignore is only node_modules and env crumbs; the tree includes Nitro/Vercel build output.

## Collision

Same as keep-busy gitignore-vercel-build-output. Keep package-lock.json tracked.

## First commands

- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-gitignore-vercel-from-ops
- edit: .gitignore, .vercel/
- .gitignore includes .vercel/ and dist/; committed output is removed; npm run build still works.

## Verify

.gitignore includes .vercel/ and dist/; committed output is removed; npm run build still works.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
