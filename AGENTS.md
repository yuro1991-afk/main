# Agent notes for `yuro1991-afk/main`

This GitHub checkout is a **landing pad**, not Genesis.

**Yuri scoped this pad to Genesis only.** Default `next` / `brief` / `handoff` / `helpers` / `playbooks` list Origin cards. DroneHive, OpenSussy, face-swap, ollama-voice, and bloom stay on the ledger as blocked history. Pass `--all` only to inspect them.

## What this repo is

Source of truth for Genesis is **Cursor Origin** (`origin.cursor.com/git/yuri-afk/genesis`). This tree is the claimable ops board (`node src/cli.js`).

Sibling landing-pad PRs: `node src/cli.js siblings`. Do **not** open another queue. `node src/cli.js relaunch` is the one-screen Origin packet. `node src/cli.js helpers` prints local Task fan-out.

## First moves

1. `npm test` if you touch this repo.
2. `node src/cli.js busy --agent <your-bcId>` — claims **your roster
   Origin card** if `ledger/roster.json` already assigned you one
   (world-phase first). Otherwise it claims the leftover `next` card
   (`gub-route-intent` for a new unassigned agent). Re-running returns the card you already
   hold. `node src/cli.js slots` lists the rest so a second agent does
   not pile on.
   `node src/cli.js assign` maps every idle pad agent to a distinct
   Genesis Python world-phase card (no lease — dead idle agents must
   not hide `next`). `node src/cli.js sync --agents last-agents.json
   --write` maps newly idle agents onto leftover Genesis cards.
   `node src/cli.js catalog --write` diffs
   `ledger/catalog-entries.json` (Notion Genesis Entries) and appends
   uncarded playbooks.
   `slots --world` / `busy --world` stay on those
   planes. Peek leftover next (no `--agent`): `node src/cli.js next`
   (`gub-route-intent` — does not steal a rostered card).
   `node src/cli.js route "keep agents busy"` without `--agent` is that
   leftover card. With `--agent` it is **your roster Origin card**.
   Paste `node src/cli.js prompt --agent <your-bcId>` into an
   Origin agent — that prints **your roster card**, not leftover
   `gub-inventory-tick`. Peek leftover next with `node src/cli.js next`
   (no `--agent`). Read `reviews/WORLD-PHASES.md` and your
   `reviews/launch/<jobId>.md`. Do not sit in inventory.
   Optionally `node src/cli.js tick` to write `.genesis/last-inventory.json`.
   `node src/cli.js playbooks` writes one markdown card per open **Genesis** job.
3. If you skipped `busy`, `node src/cli.js claim <id> --agent <your-bcId>` before you start.
4. Work on **Origin**. This pad has `/exec-daemon/tools/origin` but is
   **not logged in**. `node src/cli.js origin` (or `probe`) records that
   in `.genesis/last-origin.json`. `node src/cli.js origin --login`
   uses `CURSOR_API_KEY` when present and otherwise stays logged-out.
   Then `origin repo clone yuri-afk/genesis genesis`. Until then,
   relaunch to https://cursor.com/codebase/yuri-afk/genesis.

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
