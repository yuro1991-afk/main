import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import {
  ARENA_CONTRACT,
  DEAD_ARENA_ROOTS,
  LIVE_ARENA_RELATIVE_ROOT,
  LIVE_ARENA_ROOT,
  classifyArenaPath,
  defaultArenaPath,
  describeArenaKind,
  loadArena,
  resolveArenaRoot,
  summarizeArena,
} from "../src/arena.js";
import { parseArgs, runCli } from "../src/cli.js";

const LEDGER = fileURLToPath(new URL("../ledger/arena.json", import.meta.url));

test("seeded arena ledger points at Wilderness and marks cutover leftovers dead", () => {
  const arena = loadArena(LEDGER);
  assert.equal(arena.contract, ARENA_CONTRACT);
  assert.equal(arena.live.root, LIVE_ARENA_ROOT);
  assert.equal(arena.live.relativeRoot, LIVE_ARENA_RELATIVE_ROOT);
  assert.deepEqual(
    arena.dead.map((entry) => entry.root),
    [...DEAD_ARENA_ROOTS],
  );
  const summary = summarizeArena(arena);
  assert.equal(summary.live, "D:\\Wilderness\\Genesis");
  assert.ok(summary.dead.includes("C:\\Workspace\\.agentsroom\\Genesis"));
  assert.ok(summary.dead.includes("C:\\Workspace\\python-arena"));
});

test("classifyArenaPath treats slash variants of live and dead roots", () => {
  assert.equal(classifyArenaPath("D:\\Wilderness\\Genesis"), "live");
  assert.equal(classifyArenaPath("D:/Wilderness/Genesis/packages"), "live");
  assert.equal(classifyArenaPath("C:\\Workspace\\.agentsroom\\Genesis"), "dead");
  assert.equal(classifyArenaPath("C:/Workspace/.agentsroom/Genesis/src"), "dead");
  assert.equal(classifyArenaPath("C:\\Workspace\\python-arena"), "dead");
  assert.equal(classifyArenaPath("C:/Workspace/python-arena/eval"), "dead");
  assert.equal(classifyArenaPath("\\\\agentsroom\\\\scratch"), "dead");
  assert.equal(classifyArenaPath("packages/python-arena"), "unknown");
  assert.equal(classifyArenaPath(""), "unknown");
});

test("resolveArenaRoot rejects dead env overrides and keeps one live root", () => {
  assert.equal(resolveArenaRoot({ env: {} }), LIVE_ARENA_ROOT);
  assert.equal(resolveArenaRoot({ relative: true, env: {} }), ".");
  assert.equal(
    resolveArenaRoot({ env: { GENESIS_ARENA_ROOT: "D:\\Wilderness\\Genesis" } }),
    "D:\\Wilderness\\Genesis",
  );
  assert.throws(
    () =>
      resolveArenaRoot({
        env: { GENESIS_ARENA_ROOT: "C:\\Workspace\\.agentsroom\\Genesis" },
      }),
    /dead cutover path/,
  );
});

test("describeArenaKind stays exhaustive", () => {
  assert.match(describeArenaKind("live"), /Wilderness/);
  assert.match(describeArenaKind("dead"), /agentsroom/);
  assert.match(describeArenaKind("unknown"), /relative root/);
  assert.throws(() => describeArenaKind("second"), /unhandled arena kind/);
});

test("loadArena rejects a second live root", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-arena-"));
  const dest = join(dir, "arena.json");
  writeFileSync(
    dest,
    `${JSON.stringify({
      contract: ARENA_CONTRACT,
      live: { root: "C:\\Workspace\\python-arena" },
      dead: [{ root: "C:\\Workspace\\.agentsroom\\Genesis" }],
    })}\n`,
  );
  assert.throws(() => loadArena(dest), /Wilderness checkout/);
});

test("cli arena and status expose the Boss pointer", async () => {
  const chunks = [];
  const code = await runCli(["arena"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const body = chunks.join("");
  assert.match(body, /D:\\\\Wilderness\\\\Genesis/);
  assert.match(body, /agentsroom/);
  assert.match(body, /python-arena/);
  const classified = [];
  const classifiedCode = await runCli(
    ["arena", "--classify", "C:\\Workspace\\python-arena"],
    {
      write: (value) => {
        classified.push(value);
      },
    },
  );
  assert.equal(classifiedCode, 0);
  assert.match(classified.join(""), /"kind": "dead"/);
  const status = [];
  const statusCode = await runCli(["status"], {
    write: (value) => {
      status.push(value);
    },
  });
  assert.equal(statusCode, 0);
  assert.match(status.join(""), /"live": "D:\\\\Wilderness\\\\Genesis"/);
});

test("defaultArenaPath sits next to the other ledgers", () => {
  assert.equal(defaultArenaPath("/tmp/pad"), join("/tmp/pad", "ledger", "arena.json"));
});

test("loadArena falls back when the ledger file is missing", () => {
  const arena = loadArena(join(tmpdir(), "no-such-agent-ops-arena.json"));
  assert.equal(arena.live.root, LIVE_ARENA_ROOT);
  assert.equal(classifyArenaPath(arena.dead[0].root), "dead");
});

test("parseArgs still reads arena flags", () => {
  const parsed = parseArgs(["arena", "--classify", "D:\\Wilderness\\Genesis"]);
  assert.equal(parsed.command, "arena");
  assert.equal(parsed.flags.classify, "D:\\Wilderness\\Genesis");
});
