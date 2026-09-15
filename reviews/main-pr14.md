# Review main#14 (`assign --job`)

Written for leftover `review-landing-pad-prs`. Merge stays with Yuri.
Do not steal #7. Do not steal #13.

**PR:** https://github.com/yuro1991-afk/main/pull/14  
**Branch:** `cursor/assign-job-launch-108b`  
**Base:** `cursor/leftover-apply-launches-108b` (#12)

## What it is

`node src/cli.js assign --job <id> [--out dir]` writes **one** leftover
Apply brief (or the roster idle-agent wrapper if that card is already
assigned). Unknown ids fail closed. Bare `assign` is unchanged
(roster + leftover next).

Prefer `--out` for throwaways. Default dest is still `reviews/launch/`.

## Check

- Merge #11, then #12, then this.
- Local tests were 374/374 on `8ddda77`.
- CodeRabbit skip-on-draft is a completed review. Do not trigger it.

## Do not

- Do not copy PR #6 autofix.
- Do not reopen #1.
- Do not invent leftover 163+.
