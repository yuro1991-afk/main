# Implement GUB route-intent playbook

- id: `gub-route-intent`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion playbook/gub-route-intent https://app.notion.com/p/3db735da33f3819db32ecfc122a40c70 Status active. Route a free-text intent through the Genesis engine to a playbook, skill, tools, and optional subagent. Implement on origin.cursor.com/git/yuri-afk/genesis only.

## Collision

Same GUB process as gub-inventory-tick and genesis-auto-runner-41 (:8787 / :8788).

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- POST /v1/route persists a Genesis run. Playbooks score above skills. Do not invent LIVE lanes.

## Verify

POST /v1/route persists a Genesis run. Playbooks score above skills. Do not invent LIVE lanes.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
