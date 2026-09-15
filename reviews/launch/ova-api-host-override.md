# Idle-agent relaunch — Draft opensussy face-swap jobs

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Draft opensussy face-swap jobs
- bcId: `bc-cf031331-b61b-534a-adda-8f5de7f7ba04`
- card: `ova-api-host-override`
- launch: `reviews/launch/ova-api-host-override.md`
- GitHub: https://github.com/yuro1991-afk/ollama-voice-access

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply ova-api-host-override

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/ollama-voice-access
- Relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- Patch: `patches/ova-api-host-override.patch`
- Job: `ova-api-host-override` — Allow trusted OLLAMA_HOST override in Voice Access config
- Playbook: `playbooks/ova-api-host-override.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job ova-api-host-override`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job ova-api-host-override` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; r=Path('README.md').read_text(); s=Path('SECURITY.md').read_text(); p=Path('lib/OllamaVoice.Common.ps1').read_text(); assert '## Local API override' in r; assert 'Non-loopback hosts are' in r; assert '## Loopback API override' in s; assert 'LAN/WAN values are rejected' in s; assert 'function Test-OVLoopbackApiBase' in p; assert 'Rejected non-loopback API override' in p"

## Notes

Get-OVApiBase reads config/product.json api.baseUrl (http://127.0.0.1:11434). SECURITY.md: do not point baseUrl at untrusted hosts. Accept OLLAMA_HOST / OV_API_BASE only when the URL is loopback (127.0.0.1 or localhost). Reject LAN/WAN silently falling back to config. Document in README.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/ova-api-host-override.patch on main#9. Do not copy PR #6 autofix.

## Collision

Local Ollama only. Do not add cloud inference. Do not collide ova-stop-noui-guard on Stop-Ollama.ps1.

## First moves

- node src/cli.js patches --prove --job ova-api-host-override
- node src/cli.js patches --prove-after-apply --job ova-api-host-override
- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-api-host-override-from-ops
- git apply --check /path/to/main/patches/ova-api-host-override.patch
- git apply /path/to/main/patches/ova-api-host-override.patch
- python3 -c "from pathlib import Path; r=Path('README.md').read_text(); s=Path('SECURITY.md').read_text(); p=Path('lib/OllamaVoice.Common.ps1').read_text(); assert '## Local API override' in r; assert 'Non-loopback hosts are' in r; assert '## Loopback API override' in s; assert 'LAN/WAN values are rejected' in s; assert 'function Test-OVLoopbackApiBase' in p; assert 'Rejected non-loopback API override' in p"
- OV_API_BASE=http://127.0.0.1:11434 works; http://example.com is rejected. Existing launchers still resolve Voice Access names.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/ollama-voice-access — apply there


