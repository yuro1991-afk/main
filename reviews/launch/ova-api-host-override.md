# Idle-agent relaunch — Draft opensussy face-swap jobs

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Draft opensussy face-swap jobs
- bcId: `bc-cf031331-b61b-534a-adda-8f5de7f7ba04`
- card: `ova-api-host-override`
- launch: `reviews/launch/ova-api-host-override.md`
- GitHub: https://github.com/yuro1991-afk/ollama-voice-access

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — ova-api-host-override

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/ollama-voice-access
- Git: `github.com/yuro1991-afk/ollama-voice-access`
- Job: `ova-api-host-override` — Allow trusted OLLAMA_HOST override in Voice Access config
- Packet: `reviews/handoff-ova-api-host-override.md`
- Playbook: `playbooks/ova-api-host-override.md`
- Priority: 18
- Verify: OV_API_BASE=http://127.0.0.1:11434 works; http://example.com is rejected. Existing launchers still resolve Voice Access names.

## Notes

Get-OVApiBase reads config/product.json api.baseUrl (http://127.0.0.1:11434). SECURITY.md: do not point baseUrl at untrusted hosts. Accept OLLAMA_HOST / OV_API_BASE only when the URL is loopback (127.0.0.1 or localhost). Reject LAN/WAN silently falling back to config. Document in README.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Local Ollama only. Do not add cloud inference. Do not collide ova-stop-noui-guard on Stop-Ollama.ps1.

## First moves

- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-api-host-override-from-ops
- edit: lib/OllamaVoice.Common.ps1, config/product.json, README.md, SECURITY.md
- OV_API_BASE=http://127.0.0.1:11434 works; http://example.com is rejected. Existing launchers still resolve Voice Access names.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


