# Origin relaunch packet — genesis-local-repo

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. Spin a cloud agent against the Origin UI. Do not
clone Genesis onto GitHub `yuro1991-afk/main`.

## Job

- id: `genesis-local-repo`
- kind: origin-slice
- priority: 9
- scope: relaunch
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Origin branch: `cursor/genesis-local-repo-67b3`
- Playbook: `playbooks/genesis-local-repo.md`

## Why relaunch

Later Origin slices need a working copy of the Genesis tree. This GitHub
checkout is the ops pad only. Reconstructing sibling stubs here was
already closed as [main#1](https://github.com/yuro1991-afk/main/pull/1).
The live Boss-metal checkout is `D:\Wilderness\Genesis`.
`C:\Workspace\.agentsroom\Genesis` and `C:\Workspace\python-arena` are
dead. Do not invent a second arena.

## What to do (on Origin)

1. Attach to https://cursor.com/codebase/yuri-afk/genesis
2. Continue or stand up branch `cursor/genesis-local-repo-67b3`
3. Point host checkouts at `D:\Wilderness\Genesis` (or `.` inside it)
4. Leave `yuro1991-afk/main` as the claimable board, not a Genesis duplicate

## Verify

Pointers cite `D:\Wilderness\Genesis` as the only live Boss checkout.
Dead agentsroom and `C:\Workspace\python-arena` paths stay marked dead.
GitHub `yuro1991-afk/main` is still the ops pad, not a Genesis tree.

## Do not

- Do not reopen main#1
- Do not copy Origin files onto this landing pad
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
