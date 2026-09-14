# Origin relaunch packet — genesis-world-pm

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. This pod has **NO Origin auth**. Implement on Origin.

## Job

- id: `genesis-world-pm`
- title: Land Origin world project manager
- kind: origin-slice
- priority: 34
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion: https://app.notion.com/p/3db735da33f381b6ac1dc62b85b35f2d
- Path: `packages/world-project-manager/`
- Playbook: `playbooks/genesis-world-pm.md`

## Why relaunch

Origin project manager for the Genesis World program of work. Tracks
planes, milestones, and risks. It does not spawn agent loops, merge
shards, or occupy the village. Genesis still speaks last.

## Ports

HTTP `http://127.0.0.1:8793`. Env `GENESIS_WORLD_PM_URL`.
Do not steal halls `:8793` from other world cards without coordinating.
Leave unifier `:8792`, task hub `:8788`, agent manager `:8789`,
organizer `:7432`. UDP 2419 is pong only.

## First commands (on Origin)

```bash
cd packages/world-project-manager
npm install
npm test
npm start
npx tsx src/cli.ts act "probe all lanes"
```

Contract: `genesis.world-project-manager.v1`. Probe Superbrain before
LIVE. That peer is not GOOSE-PC Core `:8791`.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not bind UDP 2419 or mark Superbrain LIVE from this card
