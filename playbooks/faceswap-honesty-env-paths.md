# Document face-swap engine via env, not G: host paths

- id: `faceswap-honesty-env-paths`
- kind: catalog (Expand or sync inventory; do not duplicate Origin genesis.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: Relaunch against the named repo. This landing-pad token cannot push it.

## Notes

HONESTY.md pins G:\AI-Home\projects\multomoda-face-studio and G:\AI-Home\models\insightface. Gateway already uses FACESWAP_ENGINE / FACESWAP_IOS_PORT / FACESWAP_IOS_HOST. Catalog those env vars in README + HONESTY so Linux agents do not treat G: as required. Weights stay off git.
Blocked: Yuri scoped this landing pad to Genesis only.

## Collision

Docs/env only. Do not vendor InsightFace weights. Same path-leak theme as dronehive-portable-paths but different repo.

## First commands

- Work Notion + Origin catalog. Do not invent URLs.
- README lists the three env vars; HONESTY marks G: as one host example, not the contract.

## Verify

README lists the three env vars; HONESTY marks G: as one host example, not the contract.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
