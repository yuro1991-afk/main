# Agent notes for `yuro1991-afk/main`

This GitHub checkout is a **landing pad**.

**Yuri: forget Origin.** Default `next` / `busy` / `route` / `assign` list
**GitHub sibling** cards. Pass `--origin` only to inspect Genesis cards.

## What this repo is

The claimable ops board (`node src/cli.js`). Implement on the named
GitHub repo. This pad token **cannot push** dronehive / opensussy /
bloom / face-swap / ollama-voice — clone and relaunch there.

Sibling landing-pad PRs: `node src/cli.js siblings` (names `nextApply` +
`lead` #9). `siblings --job <id>` lists catalog-first related PRs.
Prefer `brief --job`. Do **not** open another queue. `node src/cli.js helpers`
prints local Task fan-out.

## First moves

1. `npm test` if you touch this repo.
2. `node src/cli.js busy --agent <your-bcId>` — claims **your roster
   GitHub card**. A new unassigned agent gets leftover next (none —
   all 21 GitHub cards are assigned). `node src/cli.js slots` lists
   the rest so a second agent does not pile on.
   `node src/cli.js catalog --write` diffs
   `ledger/catalog-entries.json` and appends uncarded ledger jobs. It
   refuses the in-repo `playbooks/` and `reviews/` directories. Prefer
   `brief --job`.
   `node src/cli.js playbooks` checks on-disk catalog playbooks
   (compact: `nextApply` + counts; never writes). `--write` refuses the
   in-repo `playbooks/` directory.
   `slots --world` / `--origin` are opt-in Genesis views.
3. Clone `https://<job.repo>.git`, implement the card, push from an
   environment that can write that repo.
4. Pass `--origin` only if Yuri asks for Genesis again.

## Parked agent → GitHub card

| idle agent | take this GitHub card |
| --- | --- |
| Genesis catalog handoff | `dronehive-unicode-ci` |
| Genesis routing handoff | `dronehive-rebase-packaging` |
| Genesis inventory handoff | `dronehive-portable-paths` |
| Genesis probe handoff | `dronehive-ubuntu-smoke` |
| Evidence bloom vercel gitignore | `opensussy-ship-json-2-0-0` |
| Evidence face-swap PWA icons | `opensussy-linux-syntax-ci` |
| Evidence opensussy 2.0 leftovers | `opensussy-agama-honesty` |
| Verify dronehive patch applies | `opensussy-sec-residuals-catalog` |
| Review sibling PRs 4-6 | `faceswap-mock-engine-ci` |
| Write review-agent playbook | `faceswap-commit-pwa-icons` |
| Automatic fixes | `faceswap-health-offline` |
| Add inventory tick command | `faceswap-honesty-env-paths` |
| Inventory other repo jobs | `ova-pwsh-syntax-ci` |
| Summarize inventory transcripts | `ova-pester-qa-math` |
| Summarize CodeRabbit review | `ova-stop-noui-guard` |
| Draft opensussy face-swap jobs | `ova-api-host-override` |
| Inventory dronehive work | `bloom-gitignore-vercel` |
| Mine Genesis Notion backlog | `bloom-readme-honest-export` |
| Summarize Genesis transcript | `bloom-ci-typecheck` |
| Summarize review transcripts | `bloom-health-probe` |
| Extract arena assignment | `review-main-pr8` |

A 22nd unassigned agent takes leftover `review-landing-pad-prs`.
Do not invent Origin work.

## Sibling patches (GitHub)

**Yuri: forget Origin** for these cards. `node src/cli.js patches` lists
applyable diffs under `patches/` (compact: `nextApply` + id/file; `--job` for applyNext). `patches --prove` re-checks them on a `--no-hardlinks` throwaway
and never writes or resets `/tmp/siblings`. This token **cannot push**
those repos — clone and relaunch there. Do not copy PR #6’s autofix runner.
Evidence: `reviews/SIBLING-PATCHES.md`.

## Do not

- Push dronehive / opensussy / face-swap / ollama-voice / bloom from this pad.
- Reconstruct the 39 sibling slices here.
- Reopen closed PR #1 (`Assemble all Genesis sibling slices in one repo`).
- Copy `packages/keep-busy` from PR #4 onto this branch.
- Copy `bin/autofix.js` / `src/autofix.js` from PR #6.
- **Yuri: no more Superbrain.** Do not probe `:45001` / `:8791`. Do not run `node src/cli.js probe`. Do not mark Superbrain LIVE.
- Treat a CodeRabbit skip-on-draft comment as a completed review.

## If the user asks for Genesis work

Relaunch against https://cursor.com/codebase/yuri-afk/genesis with Origin login (`origin auth login` or `CURSOR_API_KEY`). This cloud environment cannot authenticate to Origin.

## Roster (hub)

Genesis (Origin), Sentinel (Wire), Mnemosyne (Keep), Forge (Iron), Atlas (Chart), Lumen (Lens).

This package is **ops**, not the hub.
