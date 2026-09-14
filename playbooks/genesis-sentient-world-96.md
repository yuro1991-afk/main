# Land Origin sentient world layer genesis#96

- id: `genesis-sentient-world-96`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion https://app.notion.com/p/3db735da33f3810fa818ecbbe082f824. Branch cursor/sentient-world-layer-2726. Origin PR genesis#96. packages/python-sentient-world. HTTP 127.0.0.1:8794. GET /live is process liveness; claimed_live only when /live answers.

## Collision

Port :8794 is also world-canon #93 and sound #104. Coordinate; do not steal :8792/:8793.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- cd packages/python-sentient-world && pytest && genesis-sentient-world tick --steps 4. Never bind UDP 2419.

## Verify

cd packages/python-sentient-world && pytest && genesis-sentient-world tick --steps 4. Never bind UDP 2419.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
