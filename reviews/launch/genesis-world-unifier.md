# Idle-agent relaunch — Review sibling PRs 4-6

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Review sibling PRs 4-6
- bcId: `bc-059889f4-2b79-5473-a64e-f5c990ed531a`
- card: `genesis-world-unifier`
- launch: `reviews/launch/genesis-world-unifier.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — genesis-world-unifier

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `genesis-world-unifier` — Land Origin world-unifier plane
- Packet: `reviews/handoff-genesis-world-unifier.md`
- Playbook: `playbooks/genesis-world-unifier.md`
- Priority: 35
- Verify: Unifier stays on Origin. GET /health claimedLive false until Superbrain probed. Coordinate with python-vision #84 before binding :8792.

## Notes

World-PM plane `unifier` — canonical shard merge on HTTP 127.0.0.1:8792. World-layer #102 does not merge unifier logs. Notion PM https://app.notion.com/p/3db735da33f381b6ac1dc62b85b35f2d + layer https://app.notion.com/p/3db735da33f3817cb84fcf529384cb0a. No dedicated Origin PR yet — implement on Origin only.

## Collision

Port :8792 is also the vision HUD / unifier. Do not steal :8793 halls or :8794. UDP 2419 is pong only.

## First moves

- Attach to origin.cursor.com/git/yuri-afk/genesis — not this GitHub repo.
- Do not reopen yuro1991-afk/main#1.
- Unifier stays on Origin. GET /health claimedLive false until Superbrain probed. Coordinate with python-vision #84 before binding :8792.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


