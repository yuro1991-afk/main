import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { COMMANDS, diagnose, parseArgv, reproduce, run, verify } from "../src/autofix.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRONEHIVE = process.env.DRONEHIVE_TREE || "/tmp/sibling/dronehive";

test("diagnose names the dronehive cp1252 crash and refuses a local push", () => {
  const report = diagnose();
  assert.equal(report.id, "dronehive-unicode-ci");
  assert.equal(report.autoFixableHere, false);
  assert.match(report.crash, /cp1252/);
  assert.match(report.push, /cannot write/);
  assert.deepEqual(report.prs, [1, 2]);
});

test("reproduce proves the unpatched printer raises", () => {
  const payload = reproduce();
  assert.equal(payload.raised, true);
  assert.match(payload.error, /charmap|UnicodeEncodeError/i);
});

test("verify proves the patched printer does not raise", () => {
  const payload = verify();
  assert.equal(payload.raised, false);
  assert.equal(payload.status, "replaced");
});

test("run rejects an unknown command", () => {
  assert.throws(() => run("queue"), /unhandled autofix command: queue/);
});

test("COMMANDS is the closed set handled by run", () => {
  assert.deepEqual([...COMMANDS].sort(), ["apply", "diagnose", "reproduce", "verify"]);
  for (const command of COMMANDS) {
    if (command === "apply") {
      assert.throws(() => run("apply"), /apply requires a dronehive checkout path/);
      continue;
    }
    const result = run(command);
    assert.equal(typeof result, "object");
  }
});

test("parseArgv defaults to diagnose", () => {
  assert.deepEqual(parseArgv(["node", "autofix"]), { command: "diagnose", args: [] });
  assert.deepEqual(parseArgv(["node", "autofix", "apply", "/tmp/dronehive"]), {
    command: "apply",
    args: ["/tmp/dronehive"],
  });
});

test("apply patches a fresh dronehive clone and the extracted _chat holds", (t) => {
  const probe = spawnSync("git", ["-C", DRONEHIVE, "rev-parse", "--is-inside-work-tree"], {
    encoding: "utf8",
  });
  if (probe.status !== 0) {
    t.skip(`dronehive checkout not available at ${DRONEHIVE}`);
    return;
  }

  const scratch = mkdtempSync(path.join(tmpdir(), "autofix-dronehive-"));
  try {
    const clone = spawnSync("git", ["clone", "--depth", "1", DRONEHIVE, scratch], {
      encoding: "utf8",
    });
    assert.equal(clone.status, 0, clone.stderr);
    const result = run("apply", [scratch]);
    assert.equal(result.applied, true);
    assert.equal(result.proof.raised, false);
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
});

test("CLI diagnose prints JSON", () => {
  const result = spawnSync(process.execPath, [path.join(ROOT, "bin", "autofix.js"), "diagnose"], {
    encoding: "utf8",
    cwd: ROOT,
  });
  assert.equal(result.status, 0, result.stderr);
  const payload = JSON.parse(result.stdout);
  assert.equal(payload.id, "dronehive-unicode-ci");
});
