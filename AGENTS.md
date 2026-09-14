# Agent notes for `yuro1991-afk/main`

This GitHub checkout is a **landing pad**, not Genesis.

**Yuri scoped this pad to Genesis only.** Default `next` / `brief` / `handoff` / `helpers` / `playbooks` list Origin cards. DroneHive, OpenSussy, face-swap, ollama-voice, and bloom stay on the ledger as blocked history. Pass `--all` only to inspect them.

## What this repo is

Source of truth for Genesis is **Cursor Origin** (`origin.cursor.com/git/yuri-afk/genesis`). This tree is the claimable ops board (`node src/cli.js`).

Sibling landing-pad PRs: `node src/cli.js siblings`. Do **not** open another queue. `node src/cli.js brief` and `node src/cli.js handoff` print the next Origin packet and relaunch target. `node src/cli.js helpers` prints local Task fan-out for that card.

## First moves

1. `npm test` if you touch this repo.
2. `node src/cli.js next` — default job is `gub-superbrain-probe` (Origin).
   `node src/cli.js helpers` then spin a local Task per helper. Do not sit in inventory.
   Optionally `node src/cli.js tick` to write `.genesis/last-inventory.json`.
   `node src/cli.js playbooks` writes one markdown card per open **Genesis** job.
3. `node src/cli.js claim <id> --agent <your-bcId>` before you start.
4. Work on **Origin**. This cloud environment has no Origin auth — relaunch to https://cursor.com/codebase/yuri-afk/genesis.

## Do not

- Work dronehive / opensussy / face-swap / ollama-voice / bloom from this pad.
- Reconstruct the 39 sibling slices here.
- Reopen closed PR #1 (`Assemble all Genesis sibling slices in one repo`).
- Claim BOSS Superbrain (`169.254.124.8:45001`) or GOOSE-PC (`:8791`) LIVE without a successful probe from this host. Timeouts stay `unreachable`.
- Treat a CodeRabbit skip-on-draft comment as a completed review.
- Copy `packages/keep-busy` from PR #4 onto this branch.

## If the user asks for Genesis work

Relaunch against https://cursor.com/codebase/yuri-afk/genesis with Origin login (`origin auth login` or `CURSOR_API_KEY`). This cloud environment cannot authenticate to Origin.

## Roster (hub)

Genesis (Origin), Sentinel (Wire), Mnemosyne (Keep), Forge (Iron), Atlas (Chart), Lumen (Lens).

This package is **ops**, not the hub, not the Origin auto-runner (`genesis#41`, `:8788`).
