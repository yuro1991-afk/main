# Review landing-pad PRs (stale id)

This playbook id is leftover. Take `review-landing-pad-prs` or
`review-main-pr10` instead. Do not invent a new tree, queue, or dispatch board.

## Closed — do not reopen

- [#1](https://github.com/yuro1991-afk/main/pull/1) — Genesis duplicate. Stay closed.
- [#3](https://github.com/yuro1991-afk/main/pull/3) — **merged**. This ops board.

## Open PRs to review

| PR | Role |
| --- | --- |
| [#8](https://github.com/yuro1991-afk/main/pull/8) | GitHub-first dispatch defaults |
| [#9](https://github.com/yuro1991-afk/main/pull/9) | sibling patch catalog (not PR #6 autofix) |
| [#10](https://github.com/yuro1991-afk/main/pull/10) | fork Python arena/infra — prefer `review-main-pr10` |
| [#11](https://github.com/yuro1991-afk/main/pull/11) | resolved #8 then #9 — merge first |
| [#12](https://github.com/yuro1991-afk/main/pull/12) | leftover Apply launches (stacked on #11) |
| [#13](https://github.com/yuro1991-afk/main/pull/13) | Genesis arena pointers — review only, do not steal |
| [#14](https://github.com/yuro1991-afk/main/pull/14) | `assign --job` (stacked on #12) |
| [#15](https://github.com/yuro1991-afk/main/pull/15) | siblings board 11–14 |
| [#16](https://github.com/yuro1991-afk/main/pull/16) | `assign --job` related JSON |
| [#17](https://github.com/yuro1991-afk/main/pull/17) | `assign --missing` |
| [#18](https://github.com/yuro1991-afk/main/pull/18) | next parked leftover launches |
| [#19](https://github.com/yuro1991-afk/main/pull/19) | related section in assign --job launches |

Skip conflicting #4 / #5 / #6. Do not merge #7 after #8 without a rewrite.
Do not steal the fork’s next slices: head → ears → eyes → vision → bridge.
Do not copy `packages/keep-busy` or `bin/autofix.js` onto this board.

## Review rules

- Leave a review on at least one of #8 / #9 / #10 / #11 / #12 / #13 / #14 / #15 / #16 / #17 / #18 / #19.
- Merge decisions stay with Yuri.
- Empty `main` is not a review target.
- Do not reopen #1.
