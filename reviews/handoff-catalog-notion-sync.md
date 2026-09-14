# Origin relaunch packet — catalog-notion-sync

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. This pod has **NO Origin auth**. Spin a cloud agent
against the Origin UI. Do not fill catalog URLs here. Do not rebuild
siblings on GitHub main.

## Job

- id: `catalog-notion-sync`
- title: Sync Origin catalog snapshot URLs into Notion
- kind: catalog
- priority: 8
- scope: relaunch
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion: https://app.notion.com/p/3db735da33f381a1b427d391daa071c5
- File: `catalog/notion_map.json`
- Playbook (this pad, read-only context): `playbooks/catalog-notion-sync.md`

## Why relaunch

Work Notion + the Origin catalog on Origin. This GitHub tree
(`yuro1991-afk/main`, branch `cursor/agent-dispatch-board-108b`) is the
ops board only. The Origin repo is source of truth for files.

## What to do (on Origin)

Fill **empty Genesis Entries URLs only** in `catalog/notion_map.json`.

- Do **not** invent Notion URLs.
- Seeded-first catalog stays the map.
- Leave rows that already have a Genesis Entries URL untouched.
- Only write a URL when the Origin catalog already has a real Entries
  page to point at.

## Collision / inventory

- Origin repo is SoT for files.
- Notion Entries DB is the workspace inventory.
- Do not duplicate Origin genesis onto this GitHub pad.

## Verify

Do not invent Notion URLs. Seeded-first catalog stays the map.

## Do not

- Do not reopen [main#1](https://github.com/yuro1991-afk/main/pull/1).
- Do not open another landing-pad queue.
- Do not work dronehive / opensussy / face-swap / ollama-voice / bloom.
- Do not invent Notion URLs or fabricate Genesis Entries pages.
- Do not treat this pad as the catalog source of truth.

## First commands (on Origin)

1. Attach to `origin.cursor.com/git/yuri-afk/genesis` via
   https://cursor.com/codebase/yuri-afk/genesis
2. Open Notion https://app.notion.com/p/3db735da33f381a1b427d391daa071c5
3. Edit Origin file `catalog/notion_map.json`
4. Fill empty Genesis Entries URLs only
5. Do not invent Notion URLs

## Hard rules (this pad)

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- This pod has no Origin auth — relaunch, do not pretend to push Origin
- Origin repo is SoT for files; Notion Entries DB is workspace inventory
