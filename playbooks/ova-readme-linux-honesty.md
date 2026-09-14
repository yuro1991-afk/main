# Mark OVA README Voice Access as Windows-only

- id: `ova-readme-linux-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/ollama-voice-access
- relaunch: https://github.com/yuro1991-afk/ollama-voice-access
- why: This token cannot push ollama-voice-access. Apply `patches/ova-readme-linux-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

README still says Platform: Windows 11 only. Syntax/math CI already runs on Linux pwsh. That is not a Voice Access install.

## Collision

Docs only. Independent of api-host-override (that patch appends after License).

## First commands

- node src/cli.js patches --prove --job ova-readme-linux-honesty
- git clone https://github.com/yuro1991-afk/ollama-voice-access.git work && cd work
- git checkout -b cursor/ova-readme-linux-honesty-from-ops
- git apply --check /path/to/main/patches/ova-readme-linux-honesty.patch
- git apply /path/to/main/patches/ova-readme-linux-honesty.patch

## Verify

README says Voice Access is Windows-only and Linux pwsh is not a Voice Access install.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
