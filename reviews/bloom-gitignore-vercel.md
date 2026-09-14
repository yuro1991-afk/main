# Punch list: bloom-gitignore-vercel

Read-only clone: `/tmp/bloom` from `https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git` (clone not modified).
HEAD: `288a484cd593e37e94c416d5163e207e69dea9b0` (`main`, "Export from Grok").
`gh pr list --repo yuro1991-afk/bloom-fair-yellow-charm --state all`: empty.

Job card (`ledger/queue.json`): stop shipping `.vercel/output`. Verify: `.gitignore` includes `.vercel/` and `dist/`; committed output removed; `npm run build` still works. Collision: keep `package-lock.json` tracked.

## `.gitignore` (tracked, 51 bytes)

Exact contents (no `.vercel/`, no `dist/`):

```
node_modules/
.project_id
.github_repo
.env
.env.*
```

`git check-ignore -v .vercel .vercel/output .vercel/output/config.json`: no ignore rule.

## `.vercel/output` is tracked

`git ls-files '.vercel/**' | wc -l` → **58**. All paths start with `.vercel/output/`.
`git ls-files '.vercel/**' | head`:

```
.vercel/output/config.json
.vercel/output/functions/__server.func/.vc-config.json
.vercel/output/functions/__server.func/_chunks/core.mjs
.vercel/output/functions/__server.func/_chunks/ssr-renderer.mjs
.vercel/output/functions/__server.func/_libs/@better-auth/core+[...].mjs
.vercel/output/functions/__server.func/_libs/@better-auth/kysely-adapter+[...].mjs
.vercel/output/functions/__server.func/_libs/@better-auth/telemetry+[...].mjs
.vercel/output/functions/__server.func/_libs/@tanstack/react-router+[...].mjs
.vercel/output/functions/__server.func/_libs/@tanstack/router-core+[...].mjs
.vercel/output/functions/__server.func/_libs/better-auth__memory-adapter.mjs
```

Also tracked: `nitro.json`, `__server.func` chunks/libs/ssr, `static/` assets.

`git ls-files 'dist/**' | wc -l` → **0**. `package-lock.json` is tracked.

## Open (not done here)

- Add `.vercel/` and `dist/` to `.gitignore`.
- `git rm -r --cached .vercel/` (58 files).
- Confirm `npm run build` after untrack (not run in this pass).
- Land on bloom-fair-yellow-charm; this token did not open a PR.
