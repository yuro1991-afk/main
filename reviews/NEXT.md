# Next card (Genesis Python world)

**Yuri: forget Origin** for sibling GitHub work. Applyable diffs:
`node src/cli.js patches` · `reviews/SIBLING-PATCHES.md`.
Merge [main#8](https://github.com/yuro1991-afk/main/pull/8) for GitHub-first
defaults, then [main#9](https://github.com/yuro1991-afk/main/pull/9) for the
patch catalog. Do not steal a rostered card.

Keep-busy tick **2026-09-14T20:38Z**: 39 IDLE + this run RUNNING.
No new agents. Fork `bc-84d93b47` IDLE.
**Yuri: no more Superbrain.** Do not probe `:45001` / `:8791`. Pad probes stop.
PR #3 merged; no real review comments (CodeRabbit skip, <10 stars).
PR #9 catalog now 56 diffs (newest `dronehive-super-llms-hardwire`).
This Genesis-only tree still blocks GitHub cards — leftover `next` is the
expired Origin claim `gub-superbrain-probe`. After #8, leftover unused is
`review-landing-pad-prs`. First parked apply: `dronehive-unicode-ci`.
Cataloged apply leftovers on [main#9](https://github.com/yuro1991-afk/main/pull/9):
first parked `dronehive-unicode-ci`, unused `dronehive-script-host-roots`
(independent), then `faceswap-start-sh`, then stacked
`dronehive-runtime-host-paths` (after portable-paths), then unused
`faceswap-design-honesty` (DESIGN.md only; independent of honesty-env-paths),
then unused stacked `dronehive-config-load-overlay` (JSON remap after portable-paths; independent of runtime-host-paths),
then unused `ova-readme-linux-honesty` (README only; independent of api-host-override),
then unused `dronehive-icons-manifest-relative` (ICONS_MANIFEST icon_root only; independent of portable-paths),
then unused stacked `dronehive-app-links-host-paths` (links.py catalog URIs after portable-paths),
then unused `bloom-ci-lint` (new-file lint.yml; independent of typecheck),
then unused `ova-voice-card-linux-honesty` (VOICE-ACCESS.md only; independent of README honesty),
then unused `faceswap-ios-readme-honesty` (ios/README.md only; independent of DESIGN.md and START.sh),
then unused `dronehive-hive-docstring-honesty` (hive.py docstring only; independent of config-load-overlay),
then unused `dronehive-work-order-doc-honesty` (docs/WORK_ORDER.md only; independent of hive.py),
then unused `dronehive-seed-work-order-doc-honesty` (seed WORK_ORDER.md only; independent of docs/WORK_ORDER.md),
then unused `dronehive-bench-goal-honesty` (GOAL string only; independent of script-host-roots ROOT hunks),
then unused `faceswap-readme-requirements-honesty` (README Requirements bullet only; independent of honesty-env-paths footer),
then unused `faceswap-readme-install-sh` (README install block only; independent of start-sh new file),
then unused `dronehive-buzzer-hive-library-honesty` (buzzer_hive.json library keys only; independent of config-load-overlay),
then unused `dronehive-seed-buzzer-hive-library-honesty` (seed buzzer_hive.json only; independent of live config),
then unused `dronehive-work-order-fabric-root` (fabric_root key only; independent of portable-paths later hunks),
then unused `dronehive-seed-work-order-fabric-root` (seed fabric_root only; independent of live config),
then unused `faceswap-readme-swift-honesty` (README Swift paragraph only; independent of Requirements and install),
then unused `faceswap-readme-firewall-honesty` (README firewall sentence only; independent of install/Requirements/Swift),
then unused `dronehive-future-seer-jane-honesty` (future_seer.json jane keys only; independent of config-load-overlay and runtime-host-paths),
then unused `dronehive-multi-hosts-exe-honesty` (multi_hosts.json G: exe keys only; independent of future-seer-jane and overlay),
then unused `dronehive-work-order-live-registry` (live_registry G: keys only; independent of portable-paths and fabric-root),
then unused `dronehive-seed-work-order-live-registry` (seed live_registry G: keys only; independent of live config),
then unused `dronehive-work-order-school-root` (school_root / school_lessons_md only; independent of portable-paths and live-registry),
then unused `dronehive-seed-work-order-school-root` (seed helper-school keys only; independent of live config),
then unused `dronehive-work-order-reference-db` (reference_db key only; -U1 skips school leftover),
then unused `dronehive-seed-work-order-reference-db` (seed reference_db only; independent of live config),
then unused `dronehive-work-order-knowledge-expand` (knowledge_expand key only; -U1 skips reference_db leftover),
then unused `dronehive-seed-work-order-knowledge-expand` (seed knowledge_expand only; independent of live config),
then unused `dronehive-work-order-curriculum-root` (curriculum_root / curriculum_json only; -U1 skips school leftover),
then unused `dronehive-seed-work-order-curriculum-root` (seed curriculum keys only; independent of live config),
then unused `dronehive-multi-hosts-hardwire` (super_mesh.hardwire only; independent of exe leftover),
then unused `dronehive-super-llms-hardwire` (super_llms.json hardwire only; independent of multi-hosts-hardwire).
Newcomer `bc-f407303f`: `review-main-pr8`.
`bc-5fe241dd` Summarize arena: do not steal `genesis-world-arena`; unused apply `faceswap-design-honesty`.
`bc-e2df7f92` Summarize coordinator: unused apply `dronehive-script-host-roots`.
Next unused apply if those are taken: `dronehive-super-llms-hardwire`.

Idle agents on `yuro1991-afk/main`: do **not** inventory this pad again.
Relaunch Origin. 35 parked agents have unique world-phase cards. The
new fork takes leftover `gub-inventory-tick`.

```bash
node src/cli.js assign
node src/cli.js sync --agents .genesis/last-agents.json --write
node src/cli.js slots --world
node src/cli.js busy --agent "$CURSOR_AGENT_ID"   # your roster card, not leftover next
node src/cli.js prompt --agent "$CURSOR_AGENT_ID" # same card, paste into Origin
```

Paste-ready Origin briefs for the 36 parked agents live in
`reviews/launch/<jobId>.md`. Leftover unused briefs start at
`reviews/launch/gub-route-intent.md` (then `gub-run-playbook`, then
catalog cards). Open yours, then relaunch Origin. Do not stay on this
pad.

This pad has the Origin CLI (`/exec-daemon/tools/origin`) but is
**not logged in**. `node src/cli.js origin` records that as `logged-out`,
never a clone. `origin --login` only attempts login when `CURSOR_API_KEY`
is set. To implement here: `origin auth login --api-key "$CURSOR_API_KEY"`
then `origin repo clone yuri-afk/genesis genesis`. Otherwise paste the
packet at https://cursor.com/codebase/yuri-afk/genesis

**Peek leftover unused (no `--agent`):** `gub-route-intent`  
(`gub-inventory-tick` is rostered to the fork — do not steal it.)  
World leftover unused: none (all 35 world cards are rostered).
`node src/cli.js next --world` → null. First world phase in the table
is still `genesis-world-layer-102` — do not steal it.  
Full table: `reviews/WORLD-PHASES.md` · backlog: `reviews/genesis-backlog.md`

| idle agent | take this Origin card |
| --- | --- |
| Genesis catalog handoff | `genesis-world-layer-102` |
| Genesis routing handoff | `genesis-world-canon-93` |
| Genesis inventory handoff | `genesis-world-host-87` |
| Genesis probe handoff | `genesis-world-knowledge-88` |
| Evidence bloom vercel gitignore | `genesis-world-language-95` |
| Evidence face-swap PWA icons | `genesis-sentient-world-96` |
| Evidence opensussy 2.0 leftovers | `genesis-world-sound-104` |
| Verify dronehive patch applies | `genesis-world-pm` |
| Review sibling PRs 4-6 | `genesis-world-unifier` |
| Write review-agent playbook | `genesis-world-map` |
| Automatic fixes | `genesis-world-spawner` |
| Add inventory tick command | `genesis-world-physics` |
| Inventory other repo jobs | `genesis-world-atmosphere` |
| Summarize inventory transcripts | `genesis-world-generator` |
| Summarize CodeRabbit review | `genesis-world-lattice` |
| Draft opensussy face-swap jobs | `genesis-world-arena` |
| Inventory dronehive work | `genesis-world-robotics` |
| Mine Genesis Notion backlog | `genesis-python-infra-50` |
| Summarize Genesis transcript | `genesis-python-agent-suit-58` |
| Summarize review transcripts | `genesis-python-agent-mind-65` |
| Summarize attention items | `genesis-python-agent-head-76` |
| Summarize Genesis transcript | `genesis-python-agent-ears-78` |
| Summarize sibling agents | `genesis-python-agent-eyes-74` |
| Summarize sibling agents | `genesis-python-vision-84` |
| Summarize Genesis transcript | `genesis-python-bridge-57` |
| CodeRabbit auto review | `genesis-comms-server-94` |
| Needs attention automation | `genesis-agent-support-99` |
| Summarize auto-review transcript | `genesis-local-ai-sandbox-11` |
| Summarize Genesis transcript | `genesis-data-logger-20` |
| Auto review | `genesis-auto-runner-41` |
| Agent workload management | `genesis-hub-24` |
| CodeRabbit Genesis review | `genesis-local-repo` |
| Items for attention | `genesis-live-alert-83` |
| Genesis auto review | `genesis-online-portal-26` |
| Genesis repo location | `genesis-job-organizer-37` |
| Agent workload management (fork) | `gub-inventory-tick` |

Notion (Yuri’s Space) has **no dedicated pages** for unifier / map /
spawner / physics / atmosphere / generator / lattice / arena / robotics.
Do not invent `packages/world-*` on this pad. Those cards stay Origin-only
and start from the PM planes list.

`gub-superbrain-probe` is done on this pad. **Yuri: no more Superbrain.**
Do not probe `:45001` / `:8791`. Do not run `node src/cli.js probe`.
Keep-busy tick: 36 idle / 1 running. No new agents. Catalog proposed 0.
`tick` nextId is leftover
`gub-route-intent` (does not steal the fork's card). New fork
`bc-84d93b47-d0e0-4d4c-bc55-94c546b5dca0` is rostered onto
`gub-inventory-tick` (no lease). `busy --agent` claims the agent's
roster Origin card first. World leftover unused is empty — `next --world`
is null (do not steal `genesis-world-layer-102`).
`sync` leftover for a 37th idle agent: `gub-route-intent`, then
`gub-run-playbook`, then catalog cards.
`node src/cli.js catalog` diffs Notion Genesis Entries
(`ledger/catalog-entries.json`) so new playbooks become cards.
`node src/cli.js route "keep agents busy"` without `--agent` returns
that leftover Origin card (`gub-route-intent`), not this pad.
With `--agent` it returns the agent's roster card. No self-hosted workers.
Stub wake table: [PR #7](https://github.com/yuro1991-afk/main/pull/7)
now includes a fill-in Origin launch block plus an inline leftover
`gub-route-intent` brief for agents that wake on stub `main`.

Do not reopen [main#1](https://github.com/yuro1991-afk/main/pull/1).
Do not work dronehive / opensussy / face-swap / ollama-voice / bloom.
Do not open another landing-pad queue.
