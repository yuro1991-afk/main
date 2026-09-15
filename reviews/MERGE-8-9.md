# Merge #8 then #9

Catalog bases still match sibling `main` (re-proof 2026-09-14T23:16Z:
162/162 vanilla + stacked `git apply --check`, no `-U0`). Leftover hunt
is closed. Do not invent leftovers.

| sibling | base |
| --- | --- |
| dronehive | `d538a89` |
| bloom-fair-yellow-charm | `288a484` |
| face-swap-ios | `bba7188` |
| ollama-voice-access | `074bad0` |
| opensussy | `d4b2949` |

Do not invent leftovers. Do not copy PR #6 autofix.

## Conflict

`ledger/siblings.json` will conflict. #8 lists PRs **2–8**. #9 lists
**2–6, 9, 10**. Take the union: **2–10**.

| number | role after merge | owns |
| --- | --- | --- |
| 2 | `pointers` | `do-not-reopen-main-pr1` |
| 3 | `ops-board` | `agent-ops-board` |
| 4 | `keep-busy-queue` | keep-busy cards (CONFLICTING PR) |
| 5 | `attention-and-dronehive-patch` | `dronehive-unicode-ci` |
| 6 | `autofix-runner` | `dronehive-unicode-ci` (do not copy) |
| 7 | `pointers` | (wake table; stale after #8) |
| 8 | `ops-board` | `review-main-pr8`, `review-landing-pad-prs` |
| 9 | `patch-catalog` | catalog apply cards |
| 10 | `python-arena` | `review-main-pr10` |

Keep #9’s `describeRole` cases. After merge, `ops-board` is the landing-pad
CLI (#3 merged, #8 GitHub-first) — not “this PR”.

`src/brief.js`, `src/cli.js`, `src/dispatch.js`, `src/handoff.js`,
`src/helpers.js`, `src/patches.js`, `src/playbook.js`, `src/prompt.js`,
`src/routing.js`, `AGENTS.md`, `README.md`, and `reviews/NEXT.md` will
also conflict. Prefer **#8’s GitHub-first defaults**, then keep #9’s
catalog, Superbrain refuse, prove/`applyNext` apply path (including
`applyNext` on `brief` / `helpers` / `handoff` / `relaunch` / `busy` /
`status --job` / `list --job` / `slots --job`, `busy --job` / `next --job` peek, named-id `route` apply, `dronehive-unicode-ci` / `bloom-grok-pwa-test-sync` / `faceswap-start-sh` / `dronehive-script-host-roots` / `faceswap-design-honesty` / `dronehive-runtime-host-paths` afterApply, stacked `requires`),
`displayNotes` / `jobForDisplay`, and review files (`reviews/main-pr10.md`,
`reviews/landing-pad-prs.md`).

## After merge

Leftover unused review is done locally. First parked apply:
`dronehive-unicode-ci` on a dronehive write checkout. Repeat the catalog
proof with `node src/cli.js patches --prove --siblings-root /tmp/siblings`.
Fork leftover organs: eyes → vision → bridge.
