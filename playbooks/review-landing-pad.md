# Review landing-pad PRs

Idle CodeRabbit / auto-review agents: review the **open** PRs on `yuro1991-afk/main`. Do not invent a new tree, queue, or dispatch board.

## Source of truth

Origin Genesis is the source of truth: `origin.cursor.com/git/yuri-afk/genesis`.
This GitHub repo is a landing pad, not the kernel.

## Closed — do not reopen

- [#1](https://github.com/yuro1991-afk/main/pull/1) — Genesis duplicate (`cursor/genesis-siblings-one-repo-8657`). Stay closed.

## Open PRs to review

| PR | Role |
| --- | --- |
| [#3](https://github.com/yuro1991-afk/main/pull/3) | this ops board |
| [#4](https://github.com/yuro1991-afk/main/pull/4) | keep-busy queue |
| [#5](https://github.com/yuro1991-afk/main/pull/5) | attention + dronehive patch |
| [#6](https://github.com/yuro1991-afk/main/pull/6) | verified autofix runner |

[#2](https://github.com/yuro1991-afk/main/pull/2) (pointers) is **merged**. Do not reopen it.

Confirm:

- #3 is the claimable dispatch board (`node src/cli.js`). Do not open another.
- #4 is the sibling keep-busy queue. Do not copy `packages/keep-busy` onto this branch.
- #5 stages `patches/dronehive-pro-chat-cp1252.patch` and attention routing.
- #6 is `npm run autofix -- apply <dronehive>`. Do not copy that runner onto #3.

## Next implement job (out of scope for a review-only run)

- Job id: `dronehive-unicode-ci`
- Patch lives on PR #5
- Apply on `github.com/yuro1991-afk/dronehive` — not on this repo
- Do not rewrite the patch here

## Review rules

- Leave a review on at least one of #3 / #4 / #5 / #6.
- Merge decisions stay with Yuri.
- Empty `main` is not a review target.
- Do not change `ledger/queue.json` ids.
- Do not add a new dispatch system.
- Do not reopen #1.
