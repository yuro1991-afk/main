# Land Origin live-alert genesis#83

- id: `genesis-live-alert-83`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion https://app.notion.com/p/3db735da33f381e2b503d62685fcede7. Branch cursor/genesis-live-alert-8b5c. Origin PR genesis#83. Timeouts stay unreachable, never live.

## Collision

Coordinate with gub-superbrain-probe. Do not invent LIVE lanes.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- Failed probes stay unreachable. Do not mark Superbrain LIVE.

## Verify

Failed probes stay unreachable. Do not mark Superbrain LIVE.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
