# Origin relaunch packet — genesis-data-logger-20

This landing-pad token cannot authenticate to Origin. Implement on Origin.

## Job

- id: `genesis-data-logger-20`
- Origin PR: genesis#20
- Branch: `cursor/genesis-data-logger-9c7b`
- Path: `packages/data-logger`
- Notion: https://app.notion.com/p/3db735da33f381bbb3a7da19798da61e
- UI: https://cursor.com/codebase/yuri-afk/genesis

Append-only JSONL event plane for the origin kernel. Hub, dispatch,
mail, roster, and operator notes land in one log.

## Ports

UI `http://127.0.0.1:7430`. UDP ingest **2420**. Mail pong stays on
**2419**. Do not steal organizer `:7432`.

## First commands (on Origin)

```bash
cd packages/data-logger
npm install
npm test
npm start
```

Ingest: `POST /v1/events`, `POST /v1/ingest/hub|dispatch|mail|roster`,
`GET /v1/events/stream` (SSE).

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not bind UDP 2419
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
