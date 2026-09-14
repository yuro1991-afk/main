# Ship Origin auto-runner genesis#41 on :8788/:8789

- id: `genesis-auto-runner-41`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion https://app.notion.com/p/3db735da33f3819ab863cf5f50af9b4f — listen HTTP :8788, UDP :8789. Branch cursor/genesis-auto-agent-runner-7d7b. Port :8787 is inventory, not this runner.

## Collision

Coordinate with gub-inventory-tick. This pad is not the auto-runner.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- Runner binds :8788/:8789 and does not steal :8787 from gub-inventory-tick / genesis#22.

## Verify

Runner binds :8788/:8789 and does not steal :8787 from gub-inventory-tick / genesis#22.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
