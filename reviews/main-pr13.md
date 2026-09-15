# Review main#13 (Genesis arena pointers)

Written for leftover `review-landing-pad-prs`. Merge stays with Yuri.
**Do not steal this PR.** `bc-36b235e4` owns the cutover.

**PR:** https://github.com/yuro1991-afk/main/pull/13  
**Branch:** `cursor/genesis-arena-paths-cffd`  
**Base:** `main` (not the #11 stack)

## What it is

Live Genesis arena pointer at `D:\Wilderness\Genesis`. Dead cutover
paths: `C:\Workspace\.agentsroom\Genesis`, `C:\Workspace\.agentsroom`,
`C:\Workspace\python-arena`. Adds `ledger/arena.json` and
`node src/cli.js arena`.

This is independent of the #11 → #12 → #14 stack. Merging that stack
onto `main` after #13 will touch `src/cli.js` / `AGENTS.md` /
`README.md` — Yuri resolves that, not this pad.

## Check

- One live arena. Do not invent a second.
- Draft #10 still vendors `packages/python-arena` on this GitHub tree.
  That is not a second live host arena.
- `siblings` role is `genesis-arena-paths`. `owns` is empty on purpose.

## Do not

- Do not steal the pointer work.
- Do not copy #10’s Python arena here.
- Do not reopen #1.
- Do not probe Superbrain.
