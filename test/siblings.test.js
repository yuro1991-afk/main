import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  SIBLING_IDS,
  loadAllSiblings,
  layoutFrom,
  allSiblingsWorking,
  isSiblingId,
} from "../packages/sibling-kit/src/index.js";
import { init, status, layout, probeUrl } from "../packages/local-repo/src/index.js";
import { route, speak } from "../packages/hub/src/index.js";
import { query, stats, health as catalogHealth } from "../packages/catalog/src/index.js";
import { send, list as listMail } from "../packages/mail/src/index.js";
import { listTools, callTool } from "../packages/mcp/src/index.js";
import { occupy, release, listSeats } from "../packages/floor-mesh/src/index.js";
import { complete } from "../packages/genesis-ai/src/index.js";
import { members, find } from "../packages/roster/src/index.js";
import { enqueue, run } from "../packages/dispatch/src/index.js";
import { run as sandboxRun } from "../packages/sandbox/src/index.js";
import { append, list as listEvents } from "../packages/data-logger/src/index.js";
import { routeIntent } from "../packages/gub/src/index.js";
import { add, move, board } from "../packages/job-organizer/src/index.js";

describe("sibling registry", () => {
  it("has a unique exhaustive id list", () => {
    assert.equal(new Set(SIBLING_IDS).size, SIBLING_IDS.length);
    assert.ok(SIBLING_IDS.length >= 39);
    for (const id of SIBLING_IDS) {
      assert.equal(isSiblingId(id), true);
    }
  });

  it("loads every sibling from packages/ and reports ok", async () => {
    const siblings = await loadAllSiblings();
    assert.equal(siblings.length, SIBLING_IDS.length);
    const map = layoutFrom(siblings);
    assert.equal(allSiblingsWorking(map), true, JSON.stringify(map.slices.filter((s) => s.status !== "ok")));
    for (const sibling of siblings) {
      const hs = sibling.handshake();
      assert.equal(hs.version, 1);
      assert.equal(hs.slice, sibling.id);
      assert.equal(sibling.health().status, "ok");
    }
  });
});

describe("local-repo", () => {
  it("inits runtime and reports a complete layout", async () => {
    const identity = init();
    assert.equal(identity.repo, "genesis");
    assert.equal(status().initialized, true);
    const map = await layout();
    assert.equal(map.working, true);
    assert.deepEqual(map.missing, []);
    assert.equal(map.slices.length, SIBLING_IDS.length);
  });

  it("marks failed probes unreachable, never live", async () => {
    const result = await probeUrl("http://127.0.0.1:1/health", 200);
    assert.equal(result.status, "unreachable");
    assert.notEqual(result.status, "live");
  });
});

describe("hub and roster", () => {
  it("routes probe/code/memory/hf intents", async () => {
    assert.equal((await route("probe all lanes")).specialist, "Sentinel");
    assert.equal((await route("write a debounce helper in TypeScript")).specialist, "Forge");
    assert.equal((await route("remember the origin protocol is local-first")).specialist, "Mnemosyne");
    assert.equal((await route("list hugging face models")).specialist, "Lumen");
    const spoken = await speak("show me src/kernel/router.ts");
    assert.equal(spoken.speaker, "Genesis");
    assert.equal(spoken.specialist, "Forge");
  });

  it("exposes the six origin members", () => {
    assert.equal(members().length, 6);
    assert.equal(find("Lumen")?.epithet, "Lens");
  });
});

describe("catalog mail mcp dispatch", () => {
  it("queries catalog entries and stats", () => {
    assert.equal(catalogHealth().status, "ok");
    assert.ok(stats().count >= 9);
    assert.ok(query("gub").length >= 1);
  });

  it("sends mail and lists it", () => {
    const blob = send({
      from: "hub",
      to: "roster",
      subject: "siblings",
      body: "all in one repo",
    });
    assert.ok(listMail().some((item) => item.id === blob.id));
  });

  it("exposes MCP tools and dispatches jobs", () => {
    const names = listTools().map((tool) => tool.name);
    assert.deepEqual(names, ["genesis_catalog_query", "genesis_dispatch"]);
    const hits = callTool("genesis_catalog_query", { q: "playbook" });
    assert.ok(hits.entries.length >= 1);
    const job = callTool("genesis_dispatch", { kind: "verify" });
    assert.equal(job.status, "queued");
    assert.equal(run(job.id)?.status, "done");
  });

  it("rejects unknown MCP tools", () => {
    assert.throws(() => callTool("not-a-tool"), /unknown MCP tool/);
  });
});

describe("mesh, sandbox, logger, gub, kanban", () => {
  it("occupies and releases seats exclusively", () => {
    assert.equal(occupy("village", "genesis").ok, true);
    assert.equal(occupy("village", "intruder").ok, false);
    assert.equal(release("village", "genesis").ok, true);
    assert.deepEqual(listSeats(), []);
  });

  it("runs sandbox code in a vm", () => {
    assert.equal(sandboxRun("1 + 2").value, 3);
  });

  it("appends log events and routes GUB intents", () => {
    append({ type: "test", ok: true });
    assert.ok(listEvents().length >= 1);
    const decision = routeIntent("superbrain");
    assert.ok(decision.playbook);
  });

  it("moves job cards across columns", () => {
    const card = add("wire siblings");
    move(card.id, "done");
    assert.equal(board().done[0].title, "wire siblings");
  });

  it("does not claim a remote provider live", () => {
    const completion = complete("ping");
    assert.equal(completion.live, false);
    assert.match(completion.text, /ping/);
  });
});

describe("python sibling shims", () => {
  it("import and report ok from generated python packages", async () => {
    const { spawnSync } = await import("node:child_process");
    const pythonIds = SIBLING_IDS.filter((id) => id.startsWith("python-") || [
      "world-canon",
      "world-language",
      "sentient-world",
      "agent-support",
      "world-3d-sound",
    ].includes(id));
    for (const id of pythonIds) {
      const mod = id.replaceAll("-", "_");
      const result = spawnSync(
        "python3",
        ["-c", `import sys; sys.path.insert(0, 'packages/${id}/python'); import ${mod}; print(${mod}.health()['status'])`],
        { encoding: "utf8" },
      );
      assert.equal(result.status, 0, result.stderr);
      assert.equal(result.stdout.trim(), "ok");
    }
  });
});

describe("enqueue target guard", () => {
  it("rejects a non-sibling dispatch target", () => {
    assert.throws(() => enqueue({ kind: "x", payload: {}, target: "not-a-slice" }), /not a sibling/);
  });
});
