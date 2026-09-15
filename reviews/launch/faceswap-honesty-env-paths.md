# Idle-agent relaunch — Add inventory tick command

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Add inventory tick command
- bcId: `bc-26e3762b-232c-54c8-847a-a9edb8d92bc1`
- card: `faceswap-honesty-env-paths`
- launch: `reviews/launch/faceswap-honesty-env-paths.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply faceswap-honesty-env-paths

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/face-swap-ios
- Relaunch: https://github.com/yuro1991-afk/face-swap-ios
- Patch: `patches/faceswap-honesty-env-paths.patch`
- Job: `faceswap-honesty-env-paths` — Document face-swap engine via env, not G: host paths
- Playbook: `playbooks/faceswap-honesty-env-paths.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job faceswap-honesty-env-paths`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job faceswap-honesty-env-paths` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; h=Path('HONESTY.md').read_text(); r=Path('README.md').read_text(); s=Path('START.cmd').read_text(); env=h.split('## Env contract',1)[1]; assert 'one host example' in env; assert 'FACESWAP_ENGINE' in env; assert 'FACESWAP_IOS_PORT' in env; assert 'FACESWAP_IOS_HOST' in env; assert '## Engine contract (env, not G: paths)' in r; assert 'if not defined FACESWAP_ENGINE' in s"

## Notes

HONESTY.md pins G:\AI-Home\projects\multomoda-face-studio and G:\AI-Home\models\insightface. Gateway already uses FACESWAP_ENGINE / FACESWAP_IOS_PORT / FACESWAP_IOS_HOST. Catalog those env vars in README + HONESTY so Linux agents do not treat G: as required. Weights stay off git.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/faceswap-honesty-env-paths.patch on main#9. Do not copy PR #6 autofix.

## Collision

Docs/env only. Do not vendor InsightFace weights. Same path-leak theme as dronehive-portable-paths but different repo.

## First moves

- node src/cli.js patches --prove --job faceswap-honesty-env-paths
- node src/cli.js patches --prove-after-apply --job faceswap-honesty-env-paths
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-honesty-env-paths-from-ops
- git apply --check /path/to/main/patches/faceswap-honesty-env-paths.patch
- git apply /path/to/main/patches/faceswap-honesty-env-paths.patch
- python3 -c "from pathlib import Path; h=Path('HONESTY.md').read_text(); r=Path('README.md').read_text(); s=Path('START.cmd').read_text(); env=h.split('## Env contract',1)[1]; assert 'one host example' in env; assert 'FACESWAP_ENGINE' in env; assert 'FACESWAP_IOS_PORT' in env; assert 'FACESWAP_IOS_HOST' in env; assert '## Engine contract (env, not G: paths)' in r; assert 'if not defined FACESWAP_ENGINE' in s"
- README lists the three env vars; HONESTY marks G: as one host example, not the contract.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/face-swap-ios — apply there


