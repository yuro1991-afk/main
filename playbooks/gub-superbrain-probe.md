# Implement GUB Superbrain probe playbook

- id: `gub-superbrain-probe`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion draft https://app.notion.com/p/3db735da33f381a58f19ceffc771ecdd — short-timeout GET http://169.254.124.8:45001/health, write .genesis/last-superbrain.json, never mark LIVE on timeout.

## Collision

Origin genesis only. Do not reopen github.com/yuro1991-afk/main/pull/1.

## First commands

- Attach to origin.cursor.com/git/yuri-afk/genesis — not this GitHub repo.
- Do not reopen yuro1991-afk/main#1.
- Failed probe stays unreachable. GOOSE-PC :8791 is not the BOSS peer.

## Verify

Failed probe stays unreachable. GOOSE-PC :8791 is not the BOSS peer.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
