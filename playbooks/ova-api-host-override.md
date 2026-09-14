# Allow trusted OLLAMA_HOST override in Voice Access config

- id: `ova-api-host-override`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/ollama-voice-access
- relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- why: Relaunch against the named repo. This landing-pad token cannot push it.

## Notes

Get-OVApiBase reads config/product.json api.baseUrl (http://127.0.0.1:11434). SECURITY.md: do not point baseUrl at untrusted hosts. Accept OLLAMA_HOST / OV_API_BASE only when the URL is loopback (127.0.0.1 or localhost). Reject LAN/WAN silently falling back to config. Document in README.

## Collision

Local Ollama only. Do not add cloud inference. Do not collide ova-stop-noui-guard on Stop-Ollama.ps1.

## First commands

- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-api-host-override-from-ops
- edit: lib/OllamaVoice.Common.ps1, config/product.json, README.md, SECURITY.md
- OV_API_BASE=http://127.0.0.1:11434 works; http://example.com is rejected. Existing launchers still resolve Voice Access names.

## Verify

OV_API_BASE=http://127.0.0.1:11434 works; http://example.com is rejected. Existing launchers still resolve Voice Access names.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
