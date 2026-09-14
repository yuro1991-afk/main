# Land Origin Python infrastructure genesis#50

- id: `genesis-python-infra-50`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion https://app.notion.com/p/3db735da33f381b5a411faa0d9317b81. Branch cursor/python-infrastructure-6871. Origin PR genesis#50. Path packages/python-infra, import genesis_infra, contract genesis.python-infra.v1. Control plane http://127.0.0.1:8800/health. Sibling attach for env/roster/mail/dispatch/ports/probes.

## Collision

Do not steal :8787 inventory, :8788 sandbox/runner/bridge, :8789 CPU bridge, :8790 lattice, :8765 glasses, or planned hub :8801.

## First commands

- Attach to origin.cursor.com/git/yuri-afk/genesis — not this GitHub repo.
- Do not reopen yuro1991-afk/main#1.
- ./scripts/install-python.sh && python3 -m pytest && genesis-infra wire. Never report Superbrain LIVE without a probe.

## Verify

./scripts/install-python.sh && python3 -m pytest && genesis-infra wire. Never report Superbrain LIVE without a probe.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
