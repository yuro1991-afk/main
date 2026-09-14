# Origin relaunch packet — gub-route-intent

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. Do not implement here.

## Job

- id: `gub-route-intent`
- title: Implement GUB route-intent playbook
- kind: origin-slice
- priority: 10
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- playbook: `playbooks/gub-route-intent.md`

## Why relaunch

This cloud environment cannot authenticate to Origin.

## Notes

Notion playbook/gub-route-intent https://app.notion.com/p/3db735da33f3819db32ecfc122a40c70 Status active. Route a free-text intent through the Genesis engine to a playbook, skill, tools, and optional subagent. Implement on origin.cursor.com/git/yuri-afk/genesis only.

## Collision

Same GUB process as gub-inventory-tick and genesis-auto-runner-41 (:8787 / :8788).

## Verify

POST /v1/route persists a Genesis run. Playbooks score above skills. Do not invent LIVE lanes.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
