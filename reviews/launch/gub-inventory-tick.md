# Idle-agent relaunch — Agent workload management (fork)

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Agent workload management (fork)
- bcId: `bc-84d93b47-d0e0-4d4c-bc55-94c546b5dca0`
- card: `gub-inventory-tick`
- launch: `reviews/launch/gub-inventory-tick.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — gub-inventory-tick

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `gub-inventory-tick` — Implement GUB continuous inventory tick
- Packet: `reviews/handoff-gub-inventory-tick.md`
- Playbook: `playbooks/gub-inventory-tick.md`
- Priority: 6
- Verify: Inventory tick writes last-inventory.json without claiming Superbrain LIVE.

## Notes

Notion draft https://app.notion.com/p/3db735da33f38109a568ed3d589253b6 — Entry playbook/gub-inventory-tick. Steps: snapshot catalog stats; run scripts/build_catalog.py and scripts/inventory.py when present; write .genesis/last-inventory.json. GUB engine https://app.notion.com/p/3db735da33f3819ba589fd969cefe4a3 — gub/, workflows/, data/playbooks/playbook__gub-*.json. `python3 -m gub serve --port 8787`; GET /; POST /v1/route, /v1/runs, /v1/schedule/tick. Shell allowlist: scripts/inventory.py, scripts/build_catalog.py, scripts/query_catalog.py. Related Origin PR genesis#22.

## Collision

Port :8787 is also auto-runner dispatch. Coordinate with genesis#41.

## First moves

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- Inventory tick writes last-inventory.json without claiming Superbrain LIVE.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


