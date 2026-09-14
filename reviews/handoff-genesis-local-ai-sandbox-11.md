# Origin relaunch packet — genesis-local-ai-sandbox-11

This landing-pad token cannot authenticate to Origin. Implement on Origin.

## Job

- id: `genesis-local-ai-sandbox-11`
- Origin PR: genesis#11
- Branch: `cursor/local-ai-sandbox-3931`
- Path: `packages/sandbox`
- Notion: https://app.notion.com/p/3db735da33f381708d56f2abec3626d9
- UI: https://cursor.com/codebase/yuri-afk/genesis

Isolated Python jail + OpenAI-compatible chat on `http://127.0.0.1:8788`.
Stub provider by default (no GPU). MCP HTTP `:8787`. Origin seat stays
with the hub.

## First commands (on Origin)

```bash
cd packages/sandbox
pip install -e ".[dev]"
pytest
genesis-sandbox serve
```

Optional local coder: `GENESIS_SANDBOX_PROVIDER=openai`,
`GENESIS_LLM_BASE_URL=http://127.0.0.1:8080/v1`.

`:8788` is also auto-runner #41 and python-bridge #57. `:8787` is
inventory. Do not steal those binds. Never report Superbrain LIVE
without a probe.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
