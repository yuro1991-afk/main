# Allow trusted OLLAMA_HOST override in Voice Access config

- id: `ova-api-host-override`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/ollama-voice-access
- relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- why: This token cannot push ollama-voice-access. Apply `patches/ova-api-host-override.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

Get-OVApiBase reads config/product.json api.baseUrl (http://127.0.0.1:11434). SECURITY.md: do not point baseUrl at untrusted hosts. Accept OLLAMA_HOST / OV_API_BASE only when the URL is loopback (127.0.0.1 or localhost). Reject LAN/WAN silently falling back to config. Document in README.

## Collision

Local Ollama only. Do not add cloud inference. Do not collide ova-stop-noui-guard on Stop-Ollama.ps1.

## First commands

- node src/cli.js patches --prove --job ova-api-host-override
- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-api-host-override-from-ops
- git apply --check /path/to/main/patches/ova-api-host-override.patch
- git apply /path/to/main/patches/ova-api-host-override.patch
- python3 -c "from pathlib import Path; r=Path('README.md').read_text(); s=Path('SECURITY.md').read_text(); p=Path('lib/OllamaVoice.Common.ps1').read_text(); assert '## Local API override' in r; assert 'Non-loopback hosts are' in r; assert '## Loopback API override' in s; assert 'LAN/WAN values are rejected' in s; assert 'function Test-OVLoopbackApiBase' in p; assert 'Rejected non-loopback API override' in p"

## Verify

OV_API_BASE=http://127.0.0.1:11434 works; http://example.com is rejected. Existing launchers still resolve Voice Access names.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
