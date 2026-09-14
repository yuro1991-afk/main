# Origin relaunch packet — genesis-job-organizer-37

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. This pod has **NO Origin auth**. This pad's
`agent-ops` ledger is **not** the Origin organizer.

## Job

- id: `genesis-job-organizer-37`
- title: Land Origin job organizer genesis#37
- kind: origin-slice
- priority: 31
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion: https://app.notion.com/p/3db735da33f381ef954fe2df21ad3027
- Related Origin PR: genesis#37
- Path: `job-organizer/`
- Playbook: `playbooks/genesis-job-organizer-37.md`

## Why relaunch

Kanban for Genesis jobs whose mesh connection is mmap, not cloned JSON.
Native `mmap(MAP_SHARED)` (`native/mesh_mmap.c`). Payload reads are
views. Moves rewrite a status byte.

## Ports

UI `http://127.0.0.1:7432`. UDP 2419 is notify/pong only — bodies never
ride that wire.

## First commands (on Origin)

```bash
cd job-organizer
npm install
npm test
npm start
```

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not bind UDP 2419 or treat this GitHub ledger as the mmap mesh
