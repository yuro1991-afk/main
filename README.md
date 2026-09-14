# Genesis

Yuri's origin kernel. **Every sibling slice lives in this one repo.**

Source of truth on Cursor Origin: `origin.cursor.com/git/yuri-afk/genesis`  
This GitHub tree is the working copy that keeps the sibling map assembled and tested in one checkout.

## Siblings

The local-repo kernel answers four questions:

1. What is this checkout?
2. Which Genesis slices are on disk?
3. Where does `.genesis/` runtime state live?
4. Is BOSS Superbrain live, or unprobed?

Core slices: hub, catalog, mail, MCP, floor-mesh, genesis-ai, roster, dispatch, local-repo.

The same tree also holds the lattice, portal, logger, GUB, Python agent/world slices, and comms. `packages/sibling-kit` is the exhaustive registry — a missing folder or a failing `health()` fails CI.

## Run

```bash
npm test
npm run verify
node packages/local-repo/src/cli.js init
node packages/local-repo/src/cli.js layout
node packages/local-repo/src/cli.js probe
npm run dev
```

Lanes stay `unknown` until probed. Failed probes are `unreachable`, never `live`.

BOSS Superbrain: `http://169.254.124.8:45001` (LANE-ETH-PEER).  
GOOSE-PC Core `:8791` is not the BOSS peer.

## Notion companions

- [Genesis Catalog](https://app.notion.com/p/3db735da33f38170bab8c22bf71d6347)
- [Genesis main agent hub](https://app.notion.com/p/3db735da33f381f491eff11e350a62c1)
