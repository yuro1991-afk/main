# Origin relaunch packet — gub-run-playbook

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. Do not implement here.

## Job

- id: `gub-run-playbook`
- title: Implement GUB run-playbook playbook
- kind: origin-slice
- priority: 11
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- playbook: `playbooks/gub-run-playbook.md`

## Why relaunch

This cloud environment cannot authenticate to Origin.

## Notes

Notion playbook/gub-run-playbook https://app.notion.com/p/3db735da33f381edbc43e852d28dee37 Status active. Compile a Genesis playbook into an executable plan and record the run. Implement on origin.cursor.com/git/yuri-afk/genesis only.

## Collision

Coordinate with gub-route-intent and gub-inventory-tick. Do not execute unallowlisted operators.

## Verify

Dry-run writes plan + step results under .genesis/. Allowlisted gub.* operators only.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
