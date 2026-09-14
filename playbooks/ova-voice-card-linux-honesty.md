# Mark OVA voice card Voice Access as Windows-only

- id: `ova-voice-card-linux-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/ollama-voice-access
- relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- why: This token cannot push ollama-voice-access. Apply `patches/ova-voice-card-linux-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

VOICE-ACCESS.md still lists Voice Access phrases with no Linux honesty. Syntax/math CI already runs on Linux pwsh. That is not a Voice Access install.

## Collision

Docs only. Different file from ova-readme-linux-honesty (README). Independent of api-host-override (License appendix).

## First commands

- node src/cli.js patches --prove --job ova-voice-card-linux-honesty
- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-voice-card-linux-honesty-from-ops
- git apply --check /path/to/main/patches/ova-voice-card-linux-honesty.patch
- git apply /path/to/main/patches/ova-voice-card-linux-honesty.patch

## Verify

VOICE-ACCESS.md says Voice Access / Start Menu are Windows-only and Linux pwsh is not a Voice Access install.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
