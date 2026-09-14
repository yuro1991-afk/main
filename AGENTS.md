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
   `node src/cli.js playbooks` writes one markdown card per open **Genesis** job.
3. If you skipped `busy`, `node src/cli.js claim <id> --agent <your-bcId>` before you start.
4. Work on **Origin**. This pad has `/exec-daemon/tools/origin` but is
   **not logged in**. `node src/cli.js origin` (or `probe`) records that
   in `.genesis/last-origin.json`. `node src/cli.js origin --login`
   uses `CURSOR_API_KEY` when present and otherwise stays logged-out.
   Then `origin repo clone yuri-afk/genesis genesis`. Until then,
   relaunch to https://cursor.com/codebase/yuri-afk/genesis.

## Parked agent → Origin card

If you skip the CLI, take **your** row. Do not all take
`gub-inventory-tick`. Paste the launch block, replacing `YOUR-CARD`.

```
# Origin launch — YOUR-CARD

Work on Cursor Origin. This GitHub pad is not Genesis.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: origin.cursor.com/git/yuri-afk/genesis
- Job: YOUR-CARD (your row — do not steal another agent's card)
- Brief: reviews/launch/YOUR-CARD.md
- First: origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY"
- Then: origin repo clone yuri-afk/genesis genesis && cd genesis
- Implement YOUR-CARD only
- Do not reopen yuro1991-afk/main#1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not mark Superbrain LIVE without a successful probe
```

| idle agent | take this Origin card |
| --- | --- |
| Genesis catalog handoff | `genesis-world-layer-102` |
| Genesis routing handoff | `genesis-world-canon-93` |
| Genesis inventory handoff | `genesis-world-host-87` |
| Genesis probe handoff | `genesis-world-knowledge-88` |
| Evidence bloom vercel gitignore | `genesis-world-language-95` |
| Evidence face-swap PWA icons | `genesis-sentient-world-96` |
| Evidence opensussy 2.0 leftovers | `genesis-world-sound-104` |
| Verify dronehive patch applies | `genesis-world-pm` |
| Review sibling PRs 4-6 | `genesis-world-unifier` |
| Write review-agent playbook | `genesis-world-map` |
| Automatic fixes | `genesis-world-spawner` |
| Add inventory tick command | `genesis-world-physics` |
| Inventory other repo jobs | `genesis-world-atmosphere` |
| Summarize inventory transcripts | `genesis-world-generator` |
| Summarize CodeRabbit review | `genesis-world-lattice` |
| Draft opensussy face-swap jobs | `genesis-world-arena` |
| Inventory dronehive work | `genesis-world-robotics` |
| Mine Genesis Notion backlog | `genesis-python-infra-50` |
| Summarize Genesis transcript | `genesis-python-agent-suit-58` |
| Summarize review transcripts | `genesis-python-agent-mind-65` |
| Summarize attention items | `genesis-python-agent-head-76` |
| Summarize Genesis transcript | `genesis-python-agent-ears-78` |
| Summarize sibling agents | `genesis-python-agent-eyes-74` |
| Summarize sibling agents | `genesis-python-vision-84` |
| Summarize Genesis transcript | `genesis-python-bridge-57` |
| CodeRabbit auto review | `genesis-comms-server-94` |
| Needs attention automation | `genesis-agent-support-99` |
| Summarize auto-review transcript | `genesis-local-ai-sandbox-11` |
| Summarize Genesis transcript | `genesis-data-logger-20` |
| Auto review | `genesis-auto-runner-41` |
| Agent workload management | `genesis-hub-24` |
| CodeRabbit Genesis review | `genesis-local-repo` |
| Items for attention | `genesis-live-alert-83` |
| Genesis auto review | `genesis-online-portal-26` |
| Genesis repo location | `genesis-job-organizer-37` |
| Agent workload management (fork) | `gub-inventory-tick` |

A 37th unassigned agent takes leftover `gub-route-intent`
(`reviews/launch/gub-route-intent.md`), then `gub-run-playbook`.
Every world-phase card is already in the table — there is no unused
world leftover. Do not steal `genesis-world-layer-102` (catalog
handoff) or the fork's `gub-inventory-tick`.

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
