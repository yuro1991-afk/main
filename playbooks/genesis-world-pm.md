# Land Origin world project manager

- id: `genesis-world-pm`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion https://app.notion.com/p/3db735da33f381b6ac1dc62b85b35f2d. Path packages/world-project-manager/. HTTP 127.0.0.1:8793. Contract genesis.world-project-manager.v1. Env GENESIS_WORLD_PM_URL. Tracks planes/milestones/risks — does not spawn loops, merge shards, or occupy the village.

## Collision

Do not steal :8793 halls, unifier :8792, task hub :8788, agent manager :8789, or organizer :7432.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- cd packages/world-project-manager && npm test && npm start. Probe Superbrain before LIVE. Never bind UDP 2419.

## Verify

cd packages/world-project-manager && npm test && npm start. Probe Superbrain before LIVE. Never bind UDP 2419.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
