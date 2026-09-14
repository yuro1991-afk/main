# Origin relaunch packet — gub-superbrain-probe

This landing-pad pod has **no Origin auth**. Yuri scoped this pad to Genesis only.
Do not implement the probe here. Relaunch against Origin.

## Target

- Job: `gub-superbrain-probe`
- Kind: origin-slice
- Repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion draft: https://app.notion.com/p/3db735da33f381a58f19ceffc771ecdd
- Playbook: `playbooks/gub-superbrain-probe.md`

## Why this packet exists

This cloud environment cannot authenticate to Origin (`origin auth login` / `CURSOR_API_KEY`).
Spin a cloud agent on https://cursor.com/codebase/yuri-afk/genesis and do the work there.

## Implement on Origin

1. Short-timeout GET `http://169.254.124.8:45001/health` (BOSS Superbrain, LANE-ETH-PEER).
2. Persist the result to `.genesis/last-superbrain.json`.
3. Timeout, connection error, or non-2xx stays `unreachable`. Never write `live`.
4. GOOSE-PC `:8791` is **not** the BOSS peer. Do not treat it as Superbrain.

## Verify

Failed probe stays `unreachable`. GOOSE-PC `:8791` is not the BOSS peer.

## Do not

- Do not reopen [yuro1991-afk/main#1](https://github.com/yuro1991-afk/main/pull/1).
- Do not work dronehive / opensussy / bloom from this pad.
- Do not rebuild siblings on GitHub `yuro1991-afk/main`.
- Do not open another landing-pad queue.
- Do not claim Superbrain LIVE without a successful probe from the Origin host.
