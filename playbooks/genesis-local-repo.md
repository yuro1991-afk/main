# Stand up the Genesis local-repo checkout

- id: `genesis-local-repo`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Live Boss-metal checkout is D:\Wilderness\Genesis (relative root . when already there). Dead: C:\Workspace\.agentsroom\Genesis and C:\Workspace\python-arena. Do not invent a second arena. Notion https://app.notion.com/p/3db735da33f38180b0d0f36f30fc5dbd. Origin branch cursor/genesis-local-repo-67b3. npx genesis-repo init/status/layout/probe. This GitHub pad is not that checkout.

## Collision

Do not reconstruct sibling stubs on this repo. Do not reopen main#1.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- Pointers cite D:\Wilderness\Genesis as the only live Boss checkout; dead agentsroom and C:\Workspace\python-arena paths stay marked dead. GitHub yuro1991-afk/main is still the ops pad, not a Genesis duplicate.

## Verify

Pointers cite D:\Wilderness\Genesis as the only live Boss checkout; dead agentsroom and C:\Workspace\python-arena paths stay marked dead. GitHub yuro1991-afk/main is still the ops pad, not a Genesis duplicate.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
