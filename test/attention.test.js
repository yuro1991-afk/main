import assert from "node:assert/strict";
import { test } from "node:test";
import { Writable } from "node:stream";
import { classify, isAutoFixableHere, STATIC_ITEMS } from "../src/inventory.js";
import { chatLine, safeWrite } from "../src/safePrint.js";
import { scan } from "../src/scan.js";

test("static inventory covers the known attention set", () => {
  const ids = STATIC_ITEMS.map((item) => item.id).sort();
  assert.deepEqual(ids, [
    "coderabbit-oauth",
    "dronehive-pr-1",
    "dronehive-pr-2",
    "genesis-origin",
    "genesis-pr-1",
    "superbrain",
  ]);
});

test("classify is exhaustive for every static row", () => {
  for (const item of STATIC_ITEMS) {
    const status = classify(item);
    assert.equal(typeof status, "string");
    assert.equal(isAutoFixableHere(status), false);
  }
});

test("classify rejects an unknown kind", () => {
  assert.throws(
    () => classify({ kind: "nope", status: "open" }),
    /unhandled attention kind/,
  );
});

test("safeWrite replaces checkmarks on ascii streams", () => {
  let out = "";
  const stream = {
    encoding: "ascii",
    write: (chunk) => {
      out += String(chunk);
    },
  };
  assert.equal(safeWrite(stream, "CHAT|tool|✓ write → path\n"), "replaced");
  assert.equal(out, "CHAT|tool|OK write -> path\n");
});

test("safeWrite keeps ascii", () => {
  let out = "";
  const stream = new Writable({
    write(chunk, _enc, cb) {
      out += String(chunk);
      cb();
    },
  });
  stream.encoding = "ascii";
  assert.equal(safeWrite(stream, "CHAT|tool|ok\n"), "ok");
  assert.equal(out, "CHAT|tool|ok\n");
});

test("chatLine skips empty text", () => {
  const writes = [];
  const stream = { write: (chunk) => writes.push(chunk) };
  assert.equal(chatLine("tool", "   \n"), "empty");
  assert.equal(writes.length, 0);
});

test("chatLine prefixes CHAT| and truncates", () => {
  let out = "";
  const stream = { write: (chunk) => (out += chunk) };
  chatLine("tool", `✓ write_text → ${"x".repeat(600)}`, stream);
  assert.match(out, /^CHAT\|tool\|/);
  assert.ok(out.length <= "CHAT|tool|".length + 500 + 1);
});

test("offline scan never calls the network", async () => {
  const report = await scan({
    offline: true,
    fetchJson: async () => {
      throw new Error("network should not run offline");
    },
    probe: async () => {
      throw new Error("probe should not run offline");
    },
  });
  assert.equal(report.offline, true);
  assert.equal(report.autoFixableHere, 0);
  assert.equal(report.items.length, STATIC_ITEMS.length);
  const genesis = report.items.find((item) => item.id === "genesis-pr-1");
  assert.equal(genesis.status, "cleared");
});

test("live overlay marks failing dronehive checks", async () => {
  const report = await scan({
    fetchJson: async (url) => {
      if (url.endsWith("/pulls/1") || url.endsWith("/pulls/2")) {
        return { state: "open", mergeable_state: "unstable", head: { sha: "abc" } };
      }
      if (url.includes("/check-runs")) {
        return {
          check_runs: [
            { name: "python-smoke", conclusion: "failure", status: "completed" },
            { name: "rust-tui", conclusion: "success", status: "completed" },
          ],
        };
      }
      throw new Error(url);
    },
    probe: async () => ({ ok: false, error: "timeout" }),
  });
  const pr1 = report.items.find((item) => item.id === "dronehive-pr-1");
  assert.equal(pr1.status, "failed_ci");
  assert.match(pr1.detail, /python-smoke:failure/);
  const brain = report.items.find((item) => item.id === "superbrain");
  assert.equal(brain.status, "unreachable");
});
