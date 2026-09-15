# Landing-pad PR review (2026-09-14T23:11Z)

Written on this pad for `review-landing-pad-prs`. Merge stays with Yuri.
Do not comment on GitHub unless Yuri asked. Do not open another queue.

**Yuri: no more Superbrain.** Do not probe `:45001` / `:8791`. Do not run
`node src/cli.js probe`.

#8 already has a stale `reviews/LANDING-PAD-PRS.md` (19:05Z) that stops
at #8. This file is the current board, including #9/#10/#11.

| PR | state | take? |
| --- | --- | --- |
| [#3](https://github.com/yuro1991-afk/main/pull/3) | **merged** (`e6db198`) | done. |
| [#4](https://github.com/yuro1991-afk/main/pull/4) | CONFLICTING | skip. Duplicate queue (`packages/keep-busy`). |
| [#5](https://github.com/yuro1991-afk/main/pull/5) | CONFLICTING | skip. Holds a dronehive unicode patch. |
| [#6](https://github.com/yuro1991-afk/main/pull/6) | CONFLICTING | skip. Autofix runner. **Do not copy.** |
| [#7](https://github.com/yuro1991-afk/main/pull/7) | MERGEABLE + CI green | stale Origin wake table. Prefer #8. Do not merge after #8 without rewrite. |
| [#8](https://github.com/yuro1991-afk/main/pull/8) | MERGEABLE + CI green (`bf85360`) | GitHub-first defaults. Prefer the #8+#9 product. |
| [#9](https://github.com/yuro1991-afk/main/pull/9) | MERGEABLE + CI green (`0da05cf`) | patch catalog. Prefer the #8+#9 product. |
| [#10](https://github.com/yuro1991-afk/main/pull/10) | draft MERGEABLE + CI green (`82161d8`) | review only. Base is `cursor/agent-dispatch-board-108b`, not `main`. Head and ears already landed. Do not steal **eyes → vision → bridge**. See `reviews/main-pr10.md`. |
| [#11](https://github.com/yuro1991-afk/main/pull/11) | draft MERGEABLE + CI green | **merge this**. Resolved #8 then #9. See `reviews/main-pr11.md`. |

## Merge order

1. Merge **#11** (already resolved #8 then #9).
2. Review **#10**; do not merge onto `main` until Yuri retargets the base.
3. Skip #4/#5/#6.
4. Do not merge #7 after #8/#11 unless rewritten.
5. #8 and #9 can close after #11 lands.

## DroneHive (cannot push from this token)

| PR | state | note |
| --- | --- | --- |
| [dronehive#1](https://github.com/yuro1991-afk/dronehive/pull/1) | MERGEABLE | `python-smoke` red (cp1252). First parked apply: `dronehive-unicode-ci` (`patches/dronehive-pro-chat-cp1252.patch`). |
| [dronehive#2](https://github.com/yuro1991-afk/dronehive/pull/2) | MERGEABLE | stacked packaging. Same smoke failure. `dronehive-rebase-packaging` stays blocked until smoke is green. |

## Agents

40 IDLE + this run RUNNING. Newest idle `bc-710c5477` takes
`bloom-grok-pwa-test-sync`. Fork `bc-84d93b47` owns #10 leftover
organs. This pad cannot wake idle runs.
