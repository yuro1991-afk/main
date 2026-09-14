# Agent notes for `yuro1991-afk/main`

## What this repo is

A GitHub stub. Source of truth for Genesis is **Cursor Origin** (`yuri-afk/genesis`), not this checkout.

## Do not

- Reconstruct the 39 sibling slices here.
- Reopen closed PR #1 (`Assemble all Genesis sibling slices in one repo`).
- Claim BOSS Superbrain (`169.254.124.8:45001`) or GOOSE-PC (`:8791`) LIVE without a successful probe from this host.
- Treat a CodeRabbit skip-on-draft comment as a completed review.

## If the user asks for Genesis work

Relaunch against https://cursor.com/codebase/yuri-afk/genesis with Origin login (`origin auth login` or `CURSOR_API_KEY`). This cloud environment cannot authenticate to Origin.

## If the user asks for DroneHive work

Relaunch against https://github.com/yuro1991-afk/dronehive. This token can read that repo but cannot push to it.

Open DroneHive PRs are blocked by Windows `python-smoke`: `UnicodeEncodeError` when `_chat()` prints `✓` on cp1252. Fix `_chat` to survive a narrow console (or set `PYTHONIOENCODING=utf-8` / `PYTHONUTF8=1` on the job), then rebase PR #2 on PR #1.
