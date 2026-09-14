# Agent protocol

You are on `yuro1991-afk/main`. The user is Yuri. Prefer shipping evidence over planning.

## Stay out of these lanes

- Do not reopen https://github.com/yuro1991-afk/main/pull/1 or rebuild `packages/*` Genesis shims here.
- Do not claim `yuro1991-afk/dronehive` unless the queue marks those jobs open.
- Do not run a second CodeRabbit pass on the closed Genesis draft.
- Probe `http://169.254.124.8:45001/health` before any LIVE Superbrain claim. Timeouts are `unreachable`. GOOSE-PC Core `:8791` is not the BOSS peer.

## Take work

```bash
node packages/keep-busy/src/cli.js next --agent "<your-bcId-or-name>"
```

That prints one leased job (repo, why, acceptance). Work **in that repo**, open a PR there, then:

```bash
node packages/keep-busy/src/cli.js complete <job-id> --agent "<same>" --pr "<url>"
```

If you cannot finish, `release` the id. Leases expire after two hours.

## Honesty

- `GREEN` / `done` only with on-disk evidence (PR URL or notes).
- Do not invent install paths. Lab `G:\AI-Home\...` is an example, not a requirement.
- Prefer small PRs that close one queue id.
