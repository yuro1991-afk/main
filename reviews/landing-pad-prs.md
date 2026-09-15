# Landing-pad PR review (2026-09-15T07:18Z)

Written on this pad for `review-landing-pad-prs`. Merge stays with Yuri.
Do not comment on GitHub unless Yuri asked. Do not open another queue.

**Yuri: no more Superbrain.** Do not probe `:45001` / `:8791`. Do not run
`node src/cli.js probe`.

#8 already has a stale `reviews/LANDING-PAD-PRS.md` (19:05Z) that stops
at #8. This file is the current board, including #9–#23.

| PR | state | take? |
| --- | --- | --- |
| [#3](https://github.com/yuro1991-afk/main/pull/3) | **merged** (`e6db198`) | done. |
| [#4](https://github.com/yuro1991-afk/main/pull/4) | CONFLICTING | skip. Duplicate queue (`packages/keep-busy`). |
| [#5](https://github.com/yuro1991-afk/main/pull/5) | CONFLICTING | skip. Holds a dronehive unicode patch. |
| [#6](https://github.com/yuro1991-afk/main/pull/6) | CONFLICTING | skip. Autofix runner. **Do not copy.** |
| [#7](https://github.com/yuro1991-afk/main/pull/7) | MERGEABLE + CI green | stale Origin wake table. Prefer #8. Do not merge after #8 without rewrite. |
| [#8](https://github.com/yuro1991-afk/main/pull/8) | MERGEABLE + CI green (`bf85360`) | GitHub-first defaults. Prefer the #8+#9 product. |
| [#9](https://github.com/yuro1991-afk/main/pull/9) | MERGEABLE + CI green (`0da05cf`) | patch catalog. Prefer the #8+#9 product. |
| [#10](https://github.com/yuro1991-afk/main/pull/10) | draft MERGEABLE + CI green | review only. Base is `cursor/agent-dispatch-board-108b`, not `main`. Head and ears already landed. Do not steal **eyes → vision → bridge**. See `reviews/main-pr10.md`. |
| [#11](https://github.com/yuro1991-afk/main/pull/11) | draft MERGEABLE + CI green | **merge this first**. Resolved #8 then #9. See `reviews/main-pr11.md`. |
| [#12](https://github.com/yuro1991-afk/main/pull/12) | draft MERGEABLE + CI green | leftover Apply launches. Stacked on #11. See `reviews/main-pr12.md`. |
| [#13](https://github.com/yuro1991-afk/main/pull/13) | MERGEABLE + CI green | Genesis arena pointers (`D:\Wilderness\Genesis`). Review only. **Do not steal.** See `reviews/main-pr13.md`. |
| [#14](https://github.com/yuro1991-afk/main/pull/14) | draft MERGEABLE + CI green | `assign --job`. Stacked on #12. See `reviews/main-pr14.md`. |
| [#15](https://github.com/yuro1991-afk/main/pull/15) | draft MERGEABLE + CI green | siblings board 11–14. Stacked on #14. |
| [#16](https://github.com/yuro1991-afk/main/pull/16) | draft MERGEABLE + CI green | `assign --job` related JSON. Stacked on #15. |
| [#17](https://github.com/yuro1991-afk/main/pull/17) | draft MERGEABLE + CI green | `assign --missing`. Stacked on #16. |
| [#18](https://github.com/yuro1991-afk/main/pull/18) | draft MERGEABLE + CI green | next parked leftover launches. Stacked on #17. |
| [#19](https://github.com/yuro1991-afk/main/pull/19) | draft MERGEABLE + CI green | related section in `assign --job` launches. Stacked on #18. |
| [#20](https://github.com/yuro1991-afk/main/pull/20) | draft MERGEABLE + CI green | siblings board 15–19. Stacked on #19. |
| [#21](https://github.com/yuro1991-afk/main/pull/21) | draft MERGEABLE + CI green | compact `patches` names `nextMissing`. Stacked on #20. |
| [#22](https://github.com/yuro1991-afk/main/pull/22) | draft MERGEABLE + CI green | hive-docstring honesty leftover launches. Stacked on #21. |
| [#23](https://github.com/yuro1991-afk/main/pull/23) | draft MERGEABLE + CI green | faceswap-readme leftover launches. Stacked on #22. |

## Merge order

1. Merge **#11** (already resolved #8 then #9).
2. Merge **#12** (leftover Apply launches).
3. Merge **#14** (`assign --job`).
4. Merge **#15** (siblings board 11–14).
5. Merge **#16** (`assign --job` related JSON).
6. Merge **#17** (`assign --missing`).
7. Merge **#18** (next parked leftover launches).
8. Merge **#19** (related in launch files).
9. Merge **#20** (siblings board 15–19).
10. Merge **#21** (compact patches nextMissing).
11. Merge **#22** (hive-docstring honesty launches).
12. Merge **#23** (faceswap-readme leftover launches).
13. Review **#13**; do not steal. Independent of the #11 stack.
14. Review **#10**; do not merge onto `main` until Yuri retargets the base.
15. Skip #4/#5/#6.
16. Do not merge #7 after #8/#11 unless rewritten.
17. #8 and #9 can close after #11 lands.

## DroneHive (cannot push from this token)

| PR | state | note |
| --- | --- | --- |
| [dronehive#1](https://github.com/yuro1991-afk/dronehive/pull/1) | MERGEABLE | `python-smoke` red (cp1252). First parked apply: `dronehive-unicode-ci` (`patches/dronehive-pro-chat-cp1252.patch`). |
| [dronehive#2](https://github.com/yuro1991-afk/dronehive/pull/2) | MERGEABLE | stacked packaging. Same smoke failure. `dronehive-rebase-packaging` stays blocked until smoke is green. |

## Agents

41 IDLE + `bc-01a0a0ce` RUNNING on #7. Newest idle `bc-710c5477` takes
`bloom-grok-pwa-test-sync`. Fork `bc-84d93b47` owns #10 leftover
organs. `bc-36b235e4` shipped #13 — do not steal. This pad cannot
wake idle runs.
