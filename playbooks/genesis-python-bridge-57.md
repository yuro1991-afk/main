# Land Origin Python bridge server genesis#57

- id: `genesis-python-bridge-57`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion https://app.notion.com/p/3db735da33f38161b4dbc856c5c46893. Branch cursor/python-bridge-server-629c. Origin PR genesis#57. packages/python-bridge. Default HTTP 127.0.0.1:8788. --loopback keeps /live dark. Sibling ports: any-app :8787, CPU bridge :8789, lattice :8790.

## Collision

Port :8788 is also auto-runner #41. :8787 is inventory. Do not steal those binds. UDP 2419 is pong only.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- python -m genesis_bridge serve --loopback. GET /live is 200 only when Ethernet Superbrain /live succeeds.

## Verify

python -m genesis_bridge serve --loopback. GET /live is 200 only when Ethernet Superbrain /live succeeds.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
