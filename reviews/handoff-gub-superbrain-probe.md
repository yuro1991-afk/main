# Origin relaunch — gub-superbrain-probe

Attach to https://cursor.com/codebase/yuri-afk/genesis
Git: `origin.cursor.com/git/yuri-afk/genesis`
Notion draft: https://app.notion.com/p/3db735da33f381a58f19ceffc771ecdd
Playbook: `playbooks/gub-superbrain-probe.md`

Default `node src/cli.js next` on this pad. Implement on Origin, not here.

- Short-timeout GET `http://169.254.124.8:45001/health`
- Persist `.genesis/last-superbrain.json`
- Timeout / non-2xx stays `unreachable`, never `live`
- GOOSE-PC `:8791` is not the BOSS peer (LANE-ETH-PEER is `:45001`)

Verify: failed probe stays unreachable.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not work dronehive / opensussy / face-swap / ollama-voice / bloom from this pad.
