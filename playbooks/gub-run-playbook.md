# Implement GUB run-playbook playbook

- id: `gub-run-playbook`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion playbook/gub-run-playbook https://app.notion.com/p/3db735da33f381edbc43e852d28dee37 Status active. Compile a Genesis playbook into an executable plan and record the run. Implement on origin.cursor.com/git/yuri-afk/genesis only.

## Collision

Coordinate with gub-route-intent and gub-inventory-tick. Do not execute unallowlisted operators.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- Dry-run writes plan + step results under .genesis/. Allowlisted gub.* operators only.

## Verify

Dry-run writes plan + step results under .genesis/. Allowlisted gub.* operators only.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
