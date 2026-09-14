# Idle-agent relaunch — Genesis inventory handoff

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Genesis inventory handoff
- bcId: `bc-3a1e5eed-7d37-5cfc-bdd8-939ebc0b84aa`
- card: `dronehive-portable-paths`
- launch: `reviews/launch/dronehive-portable-paths.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — dronehive-portable-paths

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/dronehive
- Git: `github.com/yuro1991-afk/dronehive`
- Job: `dronehive-portable-paths` — Resolve dronehive host paths via env / app_root
- Packet: `reviews/handoff-dronehive-portable-paths.md`
- Playbook: `playbooks/dronehive-portable-paths.md`
- Priority: 4
- Verify: python -m drone work-order-show

## Notes

Hardcoded F:\GrokSelfLibrary, D:\GrokCoreMemory, G:\AI-Home\... leak onto Linux cwd. Not on PR #1 or #2.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Avoid drone/pro/tool_agent.py while unicode-ci is claimed.

## First moves

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-portable-paths-from-ops
- edit: drone/ai_bus.py, drone/library_bridge.py, drone/knowledge_imprint.py, drone/work_order.py, drone/clean_slate.py, configs/work_order.json
- python -m drone work-order-show

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


