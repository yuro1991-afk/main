import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { SIBLING_IDS } from "../packages/sibling-kit/src/ids.js";

const ROOT = new URL("..", import.meta.url).pathname;

const META = {
  "local-repo": {
    title: "Genesis local repository",
    contract: "genesis.local-repo.v1",
    kind: "node",
    summary: "Checkout identity, sibling layout, .genesis runtime, lane probes.",
  },
  hub: {
    title: "Genesis main agent hub",
    contract: "genesis.hub.v1",
    kind: "node",
    summary: "Origin kernel: hear operator, route specialists, speak last.",
  },
  catalog: {
    title: "Genesis catalog",
    contract: "genesis.catalog.v1",
    kind: "node",
    summary: "Durable inventory of skills, tools, playbooks, and resources.",
  },
  mail: {
    title: "Genesis mail",
    contract: "genesis.mail.v1",
    kind: "node",
    summary: "In-repo mail blobs for agent-to-agent notes.",
  },
  mcp: {
    title: "Genesis MCP",
    contract: "genesis.mcp.v1",
    kind: "node",
    summary: "MCP tool surface over catalog + dispatch.",
  },
  "floor-mesh": {
    title: "Genesis floor mesh",
    contract: "genesis.floor-mesh.v1",
    kind: "node",
    summary: "Occupancy seats for world/village slices.",
  },
  "genesis-ai": {
    title: "Genesis AI",
    contract: "genesis.ai.v1",
    kind: "node",
    summary: "Local-first completion. No LIVE claim without a provider probe.",
  },
  roster: {
    title: "Genesis roster",
    contract: "genesis.roster.v1",
    kind: "node",
    summary: "Origin, Sentinel, Mnemosyne, Forge, Atlas, Lumen.",
  },
  dispatch: {
    title: "Genesis dispatch",
    contract: "genesis.dispatch.v1",
    kind: "node",
    summary: "Enqueue and run jobs across siblings.",
  },
  sandbox: {
    title: "Genesis local AI sandbox",
    contract: "genesis.sandbox.v1",
    kind: "node",
    summary: "Isolated eval surface. Port 8788 in the lattice.",
  },
  "cpu-bridge": {
    title: "Genesis CPU bridge",
    contract: "genesis.cpu-bridge.v1",
    kind: "node",
    summary: "Host CPU bridge. Port 8789.",
  },
  lattice: {
    title: "Genesis lattice",
    contract: "genesis.lattice.v1",
    kind: "node",
    summary: "Python/node lattice bus. Port 8790.",
  },
  vehicles: {
    title: "Genesis vehicles",
    contract: "genesis.vehicles.v1",
    kind: "node",
    summary: "Movable worker vehicles on the floor mesh.",
  },
  bricks: {
    title: "Genesis bricks",
    contract: "genesis.bricks.v1",
    kind: "node",
    summary: "Reusable world bricks.",
  },
  glasses: {
    title: "Genesis glasses",
    contract: "genesis.glasses.v1",
    kind: "node",
    summary: "View layer. Port 8765 — do not reuse for the Python hub.",
  },
  "data-logger": {
    title: "Genesis data logger",
    contract: "genesis.data-logger.v1",
    kind: "node",
    summary: "Append-only event log.",
  },
  "online-portal": {
    title: "Genesis online portal",
    contract: "genesis.online-portal.v1",
    kind: "node",
    summary: "Public gateway to the origin kernel.",
  },
  "job-organizer": {
    title: "Genesis job organizer",
    contract: "genesis.job-organizer.v1",
    kind: "node",
    summary: "Kanban for jobs whose mesh work is in-repo.",
  },
  "auto-agent-runner": {
    title: "Genesis auto agent runner",
    contract: "genesis.auto-agent-runner.v1",
    kind: "node",
    summary: "Repeatable agent loop runner.",
  },
  gub: {
    title: "GUB automation engine",
    contract: "genesis.gub.v1",
    kind: "node",
    summary: "Inventory tick, route intent, run playbook, superbrain probe.",
  },
  "python-infra": {
    title: "Genesis Python infrastructure",
    contract: "genesis.python-infra.v1",
    kind: "python",
    summary: "Shared Python handshake. Control plane 8800.",
  },
  "python-suit": {
    title: "Genesis Python agent suit",
    contract: "genesis.python-suit.v1",
    kind: "python",
    summary: "Wearable roster/suit layer.",
  },
  "python-mind": {
    title: "Genesis Python agent mind",
    contract: "genesis.python-mind.v1",
    kind: "python",
    summary: "Local mind. Default bind 8792.",
  },
  "python-bridge": {
    title: "Genesis Python bridge server",
    contract: "genesis.python-bridge.v1",
    kind: "python",
    summary: "POST /genesis handshake genesis-python-bridge/1.",
  },
  "python-head": {
    title: "Genesis Python agent head",
    contract: "genesis.python-head.v1",
    kind: "python",
    summary: "Head/planning slice.",
  },
  "python-eyes": {
    title: "Genesis Python agent eyes",
    contract: "genesis.python-eyes.v1",
    kind: "python",
    summary: "Sight/list/see slice.",
  },
  "python-ears": {
    title: "Genesis Python agent ears",
    contract: "genesis.python-ears.v1",
    kind: "python",
    summary: "Listen slice.",
  },
  "live-alert": {
    title: "Genesis live alert",
    contract: "genesis.live-alert.v1",
    kind: "node",
    summary: "Alerts. Never report LIVE without a probe.",
  },
  "python-vision": {
    title: "Genesis Python vision",
    contract: "genesis.python-vision.v1",
    kind: "python",
    summary: "Synthetic seat/see vision.",
  },
  "python-world-host": {
    title: "Genesis Python world host",
    contract: "genesis.python-world-host.v1",
    kind: "python",
    summary: "Binds an address and holds exclusive occupancy.",
  },
  "python-world-knowledge": {
    title: "Genesis Python world knowledge",
    contract: "genesis.python-world-knowledge.v1",
    kind: "python",
    summary: "Queryable world knowledge.",
  },
  "world-canon": {
    title: "Genesis world canon",
    contract: "genesis.world-canon.v1",
    kind: "python",
    summary: "Canon validate/query/serve.",
  },
  "comms-server": {
    title: "Genesis communications server",
    contract: "genesis.comms.v1",
    kind: "node",
    summary: "POST /genesis handshake genesis-comms/1.",
  },
  "world-language": {
    title: "Genesis Python world language",
    contract: "genesis.world-language.v1",
    kind: "python",
    summary: "World language surface.",
  },
  "sentient-world": {
    title: "Genesis sentient world layer",
    contract: "genesis.sentient-world.v1",
    kind: "python",
    summary: "Sentient world occupancy layer.",
  },
  "world-project-manager": {
    title: "Genesis world project manager",
    contract: "genesis.world-project-manager.v1",
    kind: "node",
    summary: "Tracks planes, milestones, and risks. Does not spawn loops.",
  },
  "agent-support": {
    title: "Genesis agent support",
    contract: "genesis.agent-support.v1",
    kind: "python",
    summary: "Occupy/demo support slice.",
  },
  "world-layer-engine": {
    title: "Genesis world layer engine",
    contract: "genesis.world-layer-engine.v1",
    kind: "node",
    summary: "World layer engine.",
  },
  "world-3d-sound": {
    title: "Genesis World 3D sound engine",
    contract: "genesis.world-3d-sound.v1",
    kind: "python",
    summary: "3D sound engine for the world.",
  },
};

const HAND_WRITTEN = new Set([
  "local-repo",
  "hub",
  "catalog",
  "mail",
  "mcp",
  "floor-mesh",
  "genesis-ai",
  "roster",
  "dispatch",
  "sandbox",
  "data-logger",
  "gub",
  "job-organizer",
]);

function moduleSource(id, meta) {
  const safe = JSON.stringify(id);
  const title = JSON.stringify(meta.title);
  const contract = JSON.stringify(meta.contract);
  const kind = JSON.stringify(meta.kind);
  const summary = JSON.stringify(meta.summary);
  return `export const id = ${safe};
export const title = ${title};
export const contract = ${contract};
export const kind = ${kind};
export const summary = ${summary};

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function demo() {
  return { id, title, contract, ok: true, summary };
}
`;
}

function pythonShim(id, meta) {
  const mod = id.replaceAll("-", "_");
  return `"""${meta.title} — in-repo sibling slice."""

ID = ${JSON.stringify(id)}
CONTRACT = ${JSON.stringify(meta.contract)}
TITLE = ${JSON.stringify(meta.title)}


def handshake() -> dict:
    return {"protocol": CONTRACT, "slice": ID, "version": 1}


def health() -> dict:
    return {"status": "ok", "slice": ID, "contract": CONTRACT}


def main() -> None:
    import json
    print(json.dumps(health()))


if __name__ == "__main__":
    main()
`;
}

for (const id of SIBLING_IDS) {
  const meta = META[id];
  if (!meta) throw new Error(`no meta for ${id}`);
  const dir = join(ROOT, "packages", id);
  mkdirSync(join(dir, "src"), { recursive: true });
  writeFileSync(
    join(dir, "sibling.json"),
    JSON.stringify({ id, ...meta, path: `packages/${id}` }, null, 2) + "\n",
  );
  writeFileSync(
    join(dir, "package.json"),
    JSON.stringify(
      {
        name: `@genesis/${id}`,
        version: "0.1.0",
        private: true,
        type: "module",
        main: "src/index.js",
      },
      null,
      2,
    ) + "\n",
  );
  if (!HAND_WRITTEN.has(id) || !existsSync(join(dir, "src", "index.js"))) {
    writeFileSync(join(dir, "src", "index.js"), moduleSource(id, meta));
  }
  if (meta.kind === "python") {
    const pyName = id.replaceAll("-", "_");
    const pyDir = join(dir, "python", pyName);
    mkdirSync(pyDir, { recursive: true });
    writeFileSync(join(pyDir, "__init__.py"), pythonShim(id, meta));
    writeFileSync(
      join(dir, "pyproject.toml"),
      `[project]
name = "genesis-${id}"
version = "0.1.0"
description = ${JSON.stringify(meta.title)}
requires-python = ">=3.11"
[project.scripts]
genesis-${id} = "${pyName}:main"
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"
[tool.setuptools.package-dir]
"" = "python"
`,
    );
  }
}

console.log(`generated ${SIBLING_IDS.length} sibling packages`);
