# Agent notes for `yuro1991-afk/main`

This GitHub checkout is a **landing pad**, not Genesis.

## What this repo is

Source of truth for Genesis is **Cursor Origin** (`origin.cursor.com/git/yuri-afk/genesis`). This tree is the claimable ops board (`node src/cli.js`).

Sibling landing-pad PRs: `node src/cli.js siblings`. Do **not** open another queue. `node src/cli.js brief` and `node src/cli.js handoff` print the next work packet and relaunch target.

## First moves

1. `npm test` if you touch this repo.
2. `node src/cli.js next` — take that job unless its `collision` line forbids you.
   If this token cannot push other repos, use `node src/cli.js next --here`.
   Optionally `node src/cli.js tick` to write `.genesis/last-inventory.json`.
   `node src/cli.js playbooks` writes one markdown card per open job.
3. `node src/cli.js claim <id> --agent <your-bcId>` before you start.
4. Work in the **repo on the job card**. Origin slices require Origin auth. This token can read `dronehive` but cannot push to it.

## Do not

- Reconstruct the 39 sibling slices here.
- Reopen closed PR #1 (`Assemble all Genesis sibling slices in one repo`).
- Claim BOSS Superbrain (`169.254.124.8:45001`) or GOOSE-PC (`:8791`) LIVE without a successful probe from this host. Timeouts stay `unreachable`.
- Treat a CodeRabbit skip-on-draft comment as a completed review.
- Copy `packages/keep-busy` from PR #4 onto this branch.

## If the user asks for Genesis work

Relaunch against https://cursor.com/codebase/yuri-afk/genesis with Origin login (`origin auth login` or `CURSOR_API_KEY`). This cloud environment cannot authenticate to Origin.

## If the user asks for DroneHive work

Relaunch against https://github.com/yuro1991-afk/dronehive. The Unicode `✓` patch is already staged on landing-pad [PR #5](https://github.com/yuro1991-afk/main/pull/5) (`patches/dronehive-pro-chat-cp1252.patch`). Apply it there, then rebase dronehive PR #2 on PR #1.

## Roster (hub)

Genesis (Origin), Sentinel (Wire), Mnemosyne (Keep), Forge (Iron), Atlas (Chart), Lumen (Lens).

This package is **ops**, not the hub, not the Origin auto-runner (`genesis#41`, `:8788`).

## Review agents

Read `playbooks/review-landing-pad.md` — review open PRs #3–#5. PR #2 is merged. Do not reopen #1 or invent a new queue.
