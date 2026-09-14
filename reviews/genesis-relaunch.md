# Origin relaunch packets (Genesis only)

This landing-pad token cannot authenticate to Origin. Spin a cloud agent
against https://cursor.com/codebase/yuri-afk/genesis. Do not reopen
[main#1](https://github.com/yuro1991-afk/main/pull/1). Do not work
dronehive / opensussy / face-swap / ollama-voice / bloom from this pad.

```bash
node src/cli.js busy --agent "$CURSOR_AGENT_ID"
node src/cli.js slots
node src/cli.js helpers
```

Peek `next` is `gub-inventory-tick` while the pad holds `gub-superbrain-probe`.

## 1. gub-superbrain-probe (priority 3)

- Notion draft: https://app.notion.com/p/3db735da33f381a58f19ceffc771ecdd
- Short-timeout GET `http://169.254.124.8:45001/health`
- Persist `.genesis/last-superbrain.json`
- Timeout / non-2xx stays `unreachable`, never `live`
- GOOSE-PC `:8791` is not the BOSS peer

## 2. gub-inventory-tick (priority 6)

- Notion draft: https://app.notion.com/p/3db735da33f38109a568ed3d589253b6
- Related Origin PR genesis#22
- Wave 4 rebuild/stats → `.genesis/last-inventory.json`
- Port `:8787` clashes with auto-runner dispatch — coordinate genesis#41

## 3. agent-routing-matrix (priority 7)

- Notion: https://app.notion.com/p/3db735da33f381679966e19d177079ce
- Intent → skill/tool/subagent vs Genesis/Sentinel/Mnemosyne/Forge/Atlas/Lumen
- Seed matrix already exists on this pad in `src/routing.js` — extend Origin, do not fork it here

## 4. catalog-notion-sync (priority 8)

- Notion: https://app.notion.com/p/3db735da33f381a1b427d391daa071c5
- `catalog/notion_map.json` — fill empty Genesis Entries URLs
- Do not invent Notion URLs

## 5. genesis-local-repo (priority 9)

- Origin branch `cursor/genesis-local-repo-67b3`
- Stand up a working Origin checkout. This GitHub tree stays the ops pad.

## 6. genesis-hub-24 (priority 10)

- Origin PR genesis#24
- Hub: https://app.notion.com/p/3db735da33f381f491eff11e350a62c1
- Roster: Genesis, Sentinel, Mnemosyne, Forge, Atlas, Lumen

## 7. genesis-auto-runner-41 (priority 11)

- Origin PR genesis#41
- Notion: https://app.notion.com/p/3db735da33f3819ab863cf5f50af9b4f
- Listen HTTP `:8788`, UDP `:8789`. Leave `:8787` for inventory.

## 8. genesis-world-layer-102 (priority 12)

- Origin PR genesis#102
- World/layer stays on the Origin tree. No GitHub clone.
