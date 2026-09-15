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
   uncarded ledger jobs. It refuses the in-repo `playbooks/` and
   `reviews/` directories. Prefer `brief --job`.
   `slots --world` lists world cards. `busy --world` without an unused
   world leftover peeks/claims nothing (do not steal
   `genesis-world-layer-102`). Peek leftover next (no `--agent`): `node src/cli.js next`
   (`gub-route-intent` — does not steal a rostered card;
   paste-ready brief: `reviews/launch/gub-route-intent.md`).
   `node src/cli.js route "keep agents busy"` without `--agent` is that
   leftover card. With `--agent` it is **your roster Origin card**.
   Paste `node src/cli.js prompt --agent <your-bcId>` into an
   Origin agent — that prints **your roster card**, not leftover
   `gub-inventory-tick`. Peek leftover next with `node src/cli.js next`
   (no `--agent`). Read `reviews/WORLD-PHASES.md` and your
   `reviews/launch/<jobId>.md`. Do not sit in inventory.
   Optionally `node src/cli.js tick` to write `.genesis/last-inventory.json`.
   `node src/cli.js playbooks` checks on-disk catalog playbooks (compact: `nextApply` + counts; never writes). Prefer `brief --job`. `--write` refuses the in-repo `playbooks/` directory.
3. If you skipped `busy`, `node src/cli.js claim <id> --agent <your-bcId>` before you start.
4. Work on **Origin**. This pad has `/exec-daemon/tools/origin` but is
   **not logged in**. `node src/cli.js origin` records that
   in `.genesis/last-origin.json`. Do not run `node src/cli.js probe`.
   `node src/cli.js origin --login`
   uses `CURSOR_API_KEY` when present and otherwise stays logged-out.
   Then `origin repo clone yuri-afk/genesis genesis`. Until then,
   relaunch to https://cursor.com/codebase/yuri-afk/genesis.

## Sibling patches (GitHub)

**Yuri: forget Origin** for these cards. `node src/cli.js patches` lists
applyable diffs under `patches/` (compact: `nextApply` + id/file; `--job` for applyNext). `patches --prove` re-checks them on a `--no-hardlinks` throwaway
and never writes or resets `/tmp/siblings`. This token **cannot push**
those repos — clone and relaunch there. Do not copy PR #6’s autofix runner.
Evidence: `reviews/SIBLING-PATCHES.md`. Merge
[main#8](https://github.com/yuro1991-afk/main/pull/8) for GitHub-first defaults.

## Do not

- Push dronehive / opensussy / face-swap / ollama-voice / bloom from this pad.
- Reconstruct the 39 sibling slices here.
- Reopen closed PR #1 (`Assemble all Genesis sibling slices in one repo`).
- **Yuri: no more Superbrain.** Do not probe `:45001` / `:8791`. Do not run `node src/cli.js probe`. Do not mark Superbrain LIVE.
- Treat a CodeRabbit skip-on-draft comment as a completed review.
- Copy `packages/keep-busy` from PR #4 onto this branch.
- Copy `bin/autofix.js` / `src/autofix.js` from PR #6.

## If the user asks for Genesis work

Relaunch against https://cursor.com/codebase/yuri-afk/genesis with Origin login (`origin auth login` or `CURSOR_API_KEY`). This cloud environment cannot authenticate to Origin.

## Roster (hub)

Genesis (Origin), Sentinel (Wire), Mnemosyne (Keep), Forge (Iron), Atlas (Chart), Lumen (Lens).

This package is **ops**, not the hub, not the Origin auto-runner (`genesis#41`, `:8788`).
