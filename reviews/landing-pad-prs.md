# Landing-pad PR review (#4, #5, #6)

Read from `gh pr view` / `gh pr diff` / `git show origin/<branch>` on 2026-09-14.
`origin/main` has `LICENSE` plus `AGENTS.md` / `README.md` from merged #2.

**PR #3** (`cursor/agent-dispatch-board-108b`) is the ops board we extend. It is **mergeable** vs `main`. Do not close it as a competing queue.

Conflict check (`git merge-tree` vs `origin/main`): #4, #5, and #6 each conflict only on **`AGENTS.md` and `README.md`** (both PRs add those files as new; main already has them). Other paths are adds onto a tree that does not have `package.json` / `src/` / `patches/`.

---

## PR #4 — keep-busy queue (`cursor/keep-busy-queue-65cc`)

- **Mergeable vs main?** No. GitHub `mergeable=CONFLICTING` / `DIRTY`. Same two-file doc clash as above.
- **Duplicate?** Yes, of **#3**. Second lease catalog (`queue/jobs.json` + `packages/keep-busy`) for the same sibling leftovers (OpenSussy, face-swap, OVA, Omni-Forge). #3 already has `ledger/queue.json` + `node src/cli.js`. #3 `AGENTS.md` says do not copy `packages/keep-busy`. #6 `AGENTS.md` also tells agents not to open another queue.
- **Risk / bug:** `cli.js` usage advertises `list [--status …]` but `list` always dumps `board()` and never reads `args.status` (`packages/keep-busy/src/cli.js`). Also: catalog is a single JSON file with pid-tmp rename only — two agents claiming in one checkout last-write-win the leases.
- **Call: close.** Fold any missing job cards into #3; do not land a second queue.

---

## PR #5 — attention + dronehive patch (`cursor/attention-router-7646`)

- **Mergeable vs main?** No. Same `AGENTS.md` / `README.md` add-vs-add conflicts.
- **Duplicate?** Patch and `_chat` helper are **byte-identical** to #6:
  - `patches/dronehive-pro-chat-cp1252.patch` blob `5b22b8d101f578c3ffff83055b2cceaac03704ef`
  - `src/safe_chat.py` blob `d0e7e3cd20b8eda1776266e34e15cc994506baf0`
  Scanner (`src/scan.js`, `src/inventory.js`) overlaps #3’s board; docs restating “not Genesis” overlap merged #2.
- **Risk / bug:** Live overlay is discarded. `scan()` may set Superbrain to `cleared` or a dronehive PR to `cleared` / `open`, then remaps via `classify()`: `superbrain` is **always** `unreachable`; `dronehive_pr` is `failed_ci` or else **`blocked_wrong_repo`** (a closed PR never stays `cleared`). See `src/inventory.js` `classify` + `src/scan.js` report map.
- **Call: rebase** only if the scanner is still wanted on the board after fixing `classify`. Do not merge alongside #6 as a second copy of the patch. Default: drop the patch files; keep one patch owner (#6).

---

## PR #6 — autofix runner (`cursor/autofix-dronehive-ci-ab19`)

- **Mergeable vs main?** No. Same two-file doc conflicts. Unique payload (`src/autofix.js`, `src/reproduce.py`, apply CLI, CI apply step) does not conflict with main’s tree.
- **Duplicate?** Shares the **same** patch + `safe_chat.py` as #5 (hashes above). Docs / `AGENTS.md` / `ci.yml` / `test_safe_chat.py` overlap #5. Not a duplicate of #3 or #4 (this is apply/verify, not a job queue).
- **Risk / bug:** `git apply` is pinned to dronehive hunks (`tool_agent.py` index `2690bc5`, workflow `0b202bd`). Any drift on `yuro1991-afk/dronehive` main fails `apply` / the CI step that `git clone`s dronehive on **every** push (`on.push.branches: ["**"]`). This token still cannot push dronehive, so landing here does not turn dronehive PRs green.
- **Call: rebase** onto current `main` (merge #2 docs, do not replace them), keep **one** copy of the patch, then ship. Close #5’s patch side so the files exist once.

---

## Calls

| PR | Call |
|----|------|
| #3 | keep open (board) |
| #4 | **close** |
| #5 | **rebase** (or close if #6 owns the patch and #3 owns the board) |
| #6 | **rebase**, then **ship** |

No GitHub review comments posted.
