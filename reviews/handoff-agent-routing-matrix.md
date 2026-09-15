# Origin relaunch packet — agent-routing-matrix

This GitHub pad (`yuro1991-afk/main`, branch `cursor/agent-dispatch-board-108b`) cannot finish the card. Yuri scoped the pad to Genesis only. **This pod has no Origin auth.** Spin a cloud agent against Origin; do not implement the matrix here.

```
contract: agent-ops.handoff.v1
jobId:    agent-routing-matrix
kind:     catalog (expand or sync inventory; do not duplicate Origin genesis)
scope:    relaunch
priority: 7
status:   open
```

## Relaunch

| Field | Value |
| --- | --- |
| Repo | `origin.cursor.com/git/yuri-afk/genesis` |
| UI | https://cursor.com/codebase/yuri-afk/genesis |
| Notion (this card) | https://app.notion.com/p/3db735da33f381679966e19d177079ce |
| Hub roster page | https://app.notion.com/p/3db735da33f381f491eff11e350a62c1 |
| Playbook on this pad | `playbooks/agent-routing-matrix.md` |
| Seed on this pad | `src/routing.js` (reference only) |

Why: this cloud environment cannot authenticate to Origin (`origin auth login` / `CURSOR_API_KEY` are not available here).

## Job

Build an **intent → skill / tool / subagent** matrix against the existing hub roster:

**Genesis / Sentinel / Mnemosyne / Forge / Atlas / Lumen**

Aliases already recorded on this pad (`AGENTS.md`): Genesis (Origin), Sentinel (Wire), Mnemosyne (Keep), Forge (Iron), Atlas (Chart), Lumen (Lens). Cite those six. Do not add a seventh role.

Verify: **matrix cites the existing hub roster; no new false LIVE lanes.**

Collision: this GitHub board already has a seed matrix in `src/routing.js` — **extend Origin, do not fork it here.**

## Seed matrix (do not copy onto Origin as a fork)

`src/routing.js` on this pad is ops routing so idle agents stop stacking on empty `main`. It is **not** the Genesis SoT. Use it as a hint of intents already named, then extend whatever catalog/routing already lives on Origin.

| Intent (seed) | Destination (seed) | Kind | Notes already on the pad |
| --- | --- | --- | --- |
| keep agents busy | `origin.cursor.com/git/yuri-afk/genesis` leftover card | origin-slice | Next unused Origin card (`gub-route-intent` today). Do not steal the fork's `gub-inventory-tick`. Do not sit on this pad. |
| genesis slice / origin kernel | `origin.cursor.com/git/yuri-afk/genesis` | origin-slice | Source of truth. Do not reopen GitHub PR #1. |
| auto review / coderabbit | an existing open PR, not empty main | review | `main` has no mergeable Genesis tree. |
| items for attention | ledger `next()` then the named repo | fix | Highest-priority open job. Expired claims are fair game. |
| dronehive ci / packaging | `github.com/yuro1991-afk/dronehive` | fix | Out of pad scope. Yuri blocked sibling GitHub cards. |
| superbrain / lanes | probe known lanes via agent-ops | probe | Failed probes are `unreachable`, never `live`. LANE-ETH-PEER ≠ `:8791`. |
| catalog / notion inventory | Origin genesis catalog + Notion Genesis Catalog | catalog | Notion is seeded first; do not invent URLs. |

`routeIntent()` and `destinationForKind()` stay on this pad. Do not reimplement them on GitHub. On Origin, map the same *class* of intents onto hub roles, skills, tools, and subagents.

## Hub roster (cite, do not invent)

Coordinate with Origin PR **genesis#24** (`genesis-hub-24`). The hub page must already name these six; this card does not replace that PR.

| Role | Alias | Use as destination when intent is… |
| --- | --- | --- |
| Genesis | Origin | kernel / origin-slice / SoT tree work |
| Sentinel | Wire | review, routing, lane/probe honesty |
| Mnemosyne | Keep | catalog, Notion inventory, memory |
| Forge | Iron | implement / fix in a named checkout |
| Atlas | Chart | hub map, roster, intent matrix itself |
| Lumen | Lens | read-only verify / evidence, no LIVE upgrade |

Every matrix row should name: **intent → skill or tool or subagent → one of the six roles**. Empty cells stay empty. Do not invent Notion URLs, Origin paths, or extra roster names to fill them.

## Known lanes (probe, never invent LIVE)

Do **not** add LIVE rows. Do **not** mint new lane IDs.

Already named on this pad (probe before any LIVE claim; timeouts and non-2xx stay `unreachable`):

- BOSS Superbrain `http://169.254.124.8:45001` (LANE-ETH-PEER) — owned by `gub-superbrain-probe`, not this card
- GOOSE-PC Core `:8791` is **not** the BOSS peer
- Inventory tick / auto-runner ports `:8787` / `:8788` / `:8789` belong to `gub-inventory-tick` and `genesis-auto-runner-41` — do not relabel them LIVE from this matrix

If a lane has not been probed successfully from the Origin host, the matrix may list it as a probe target. It must not say `live`.

## First commands (on Origin, after relaunch)

1. Open https://cursor.com/codebase/yuri-afk/genesis with Origin login.
2. Read Notion https://app.notion.com/p/3db735da33f381679966e19d177079ce and the hub roster page. Do not invent URLs.
3. Find the existing Origin catalog / routing / hub files. Extend them. Do not paste `src/routing.js` from this pad as a new Origin module.
4. Write intent → skill/tool/subagent rows that cite only Genesis, Sentinel, Mnemosyne, Forge, Atlas, Lumen.
5. Leave sibling GitHub work (dronehive / opensussy / face-swap / ollama-voice / bloom) off the Origin matrix, or mark them out-of-scope. This pad already blocked those cards.
6. Verify: every row cites the hub roster; zero new false LIVE lanes.

## Related Origin cards (do not steal)

| id | priority | note |
| --- | --- | --- |
| `gub-superbrain-probe` | 3 | LIVE / unreachable honesty. Do not claim Superbrain LIVE here. |
| `gub-inventory-tick` | 6 | Wave 4 inventory. Port `:8787`. |
| `catalog-notion-sync` | 8 | `catalog/notion_map.json` — fill empty Genesis Entries URLs only. |
| `genesis-hub-24` | 10 | Origin PR genesis#24 is the roster SoT. |
| `genesis-local-repo` | 9 | Boss checkout is `D:\Wilderness\Genesis`. This GitHub tree stays the ops pad. |

## Do not

- Do not reopen [yuro1991-afk/main#1](https://github.com/yuro1991-afk/main/pull/1). Closed duplicate of Origin genesis.
- Do not fork `src/routing.js` onto this GitHub pad or reconstruct sibling stubs on `main`.
- Do not invent LIVE lanes, lane IDs, or Notion URLs.
- Do not open another landing-pad queue. Do not copy `packages/keep-busy` from PR #4.
- Do not work dronehive / opensussy / face-swap / ollama-voice / bloom from this pad.
- Do not treat this packet as permission to implement on GitHub. Relaunch Origin.

## Pad helpers (already runnable here; they do not finish the card)

```bash
node src/cli.js brief agent-routing-matrix
node src/cli.js handoff agent-routing-matrix
node src/cli.js helpers agent-routing-matrix
```

Destination for kind `catalog`: Notion + Origin catalog, not a GitHub duplicate.
