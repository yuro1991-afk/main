# Origin relaunch packet — genesis-auto-runner-41

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. This pad is **not** the auto-runner.

## Job

- id: `genesis-auto-runner-41`
- kind: origin-slice
- priority: 11
- scope: relaunch
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Origin PR: genesis#41
- Notion: https://app.notion.com/p/3db735da33f3819ab863cf5f50af9b4f
- Playbook: `playbooks/genesis-auto-runner-41.md`

## Ports

| Port | Owner | Do not |
| --- | --- | --- |
| `:8787` | `gub-inventory-tick` / genesis#22 | Steal for the runner |
| `:8788` | this card — HTTP listen | Bind inventory here |
| `:8789` | this card — UDP | Treat as Superbrain |

BOSS Superbrain is `169.254.124.8:45001` (`gub-superbrain-probe`).
GOOSE-PC `:8791` is not the BOSS peer. Runner bind success is not LIVE.

## What to do (on Origin)

1. Attach to https://cursor.com/codebase/yuri-afk/genesis
2. Continue Origin PR genesis#41
3. Listen HTTP `:8788` and UDP `:8789`
4. Leave `:8787` for inventory

## Verify

Runner binds `:8788`/`:8789` and does not steal `:8787`.

## Do not

- Do not reopen main#1
- Do not mark Superbrain LIVE from a bind
- Do not implement `gub-inventory-tick` from this packet
- Do not work sibling GitHub repos from this pad
