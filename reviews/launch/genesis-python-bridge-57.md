# Idle-agent relaunch — Summarize Genesis transcript

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Summarize Genesis transcript
- bcId: `bc-d97f2638-90e4-55bb-9bde-47e356a0647e`
- card: `genesis-python-bridge-57`
- launch: `reviews/launch/genesis-python-bridge-57.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — genesis-python-bridge-57

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `genesis-python-bridge-57` — Land Origin Python bridge server genesis#57
- Packet: `reviews/handoff-genesis-python-bridge-57.md`
- Playbook: `playbooks/genesis-python-bridge-57.md`
- Priority: 33
- Verify: python -m genesis_bridge serve --loopback. GET /live is 200 only when Ethernet Superbrain /live succeeds.

## Notes

Notion https://app.notion.com/p/3db735da33f38161b4dbc856c5c46893. Branch cursor/python-bridge-server-629c. Origin PR genesis#57. packages/python-bridge. Default HTTP 127.0.0.1:8788. --loopback keeps /live dark. Sibling ports: any-app :8787, CPU bridge :8789, lattice :8790.

## Collision

Port :8788 is also auto-runner #41. :8787 is inventory. Do not steal those binds. UDP 2419 is pong only.

## First moves

- Attach to origin.cursor.com/git/yuri-afk/genesis — not this GitHub repo.
- Do not reopen yuro1991-afk/main#1.
- python -m genesis_bridge serve --loopback. GET /live is 200 only when Ethernet Superbrain /live succeeds.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


