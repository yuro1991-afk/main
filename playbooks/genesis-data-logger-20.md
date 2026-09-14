# Land Origin data-logger genesis#20

- id: `genesis-data-logger-20`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion https://app.notion.com/p/3db735da33f381bbb3a7da19798da61e. Branch cursor/genesis-data-logger-9c7b. Origin PR genesis#20. Path packages/data-logger. Append-only JSONL event plane. UI http://127.0.0.1:7430. UDP ingest 2420. Mail pong stays on 2419.

## Collision

UDP 2419 is pong only. Ingest is 2420. Do not steal organizer :7432.

## First commands

- Attach to origin.cursor.com/git/yuri-afk/genesis — not this GitHub repo.
- Do not reopen yuro1991-afk/main#1.
- cd packages/data-logger && npm test. POST /v1/events works. Do not bind UDP 2419.

## Verify

cd packages/data-logger && npm test. POST /v1/events works. Do not bind UDP 2419.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
