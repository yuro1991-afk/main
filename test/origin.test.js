import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  ORIGIN_CONTRACT,
  loginOriginAuth,
  parseOriginAuthStatus,
  probeOriginAuth,
  readOriginProbe,
  writeOriginProbe,
} from "../src/origin.js";
import { writeInventoryTick } from "../src/tick.js";
import { firstCommands } from "../src/brief.js";
import { runCli } from "../src/cli.js";
import { saveLedger } from "../src/ledger.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

test("parseOriginAuthStatus does not treat Not logged in as authenticated", () => {
  assert.equal(parseOriginAuthStatus("Not logged in. Run `origin auth login` to sign in."), false);
  assert.equal(parseOriginAuthStatus("Logged in as yuri"), true);
  assert.equal(parseOriginAuthStatus(""), false);
});

test("probeOriginAuth records logged-out without claiming a clone", async () => {
  const report = await probeOriginAuth({
    nowMs: NOW,
    bin: "/exec-daemon/tools/origin",
    execImpl: async () => ({
      stdout: "Not logged in. Run `origin auth login` to sign in.\n",
      stderr: "",
      code: 0,
    }),
  });
  assert.equal(report.contract, ORIGIN_CONTRACT);
  assert.equal(report.loggedIn, false);
  assert.equal(report.status, "logged-out");
  assert.match(report.next, /auth login --api-key/);
  assert.doesNotMatch(report.next, /repo clone/);
});

test("probeOriginAuth authenticated points at repo clone", async () => {
  const report = await probeOriginAuth({
    nowMs: NOW,
    bin: "origin",
    execImpl: async () => ({
      stdout: "Logged in as yuri\n",
      stderr: "",
      code: 0,
    }),
  });
  assert.equal(report.loggedIn, true);
  assert.equal(report.status, "authenticated");
  assert.match(report.next, /repo clone yuri-afk\/genesis/);
});

test("missing origin cli is unreachable, never authenticated", async () => {
  const report = await probeOriginAuth({
    nowMs: NOW,
    bin: "/no/such/origin",
    execImpl: async () => {
      throw new Error("origin cli missing: /no/such/origin");
    },
  });
  assert.equal(report.loggedIn, false);
  assert.equal(report.status, "unreachable");
});

test("writeOriginProbe persists the snapshot", () => {
  const dest = join(mkdtempSync(join(tmpdir(), "agent-ops-origin-")), "last-origin.json");
  writeOriginProbe({ contract: ORIGIN_CONTRACT, loggedIn: false }, dest);
  const written = JSON.parse(readFileSync(dest, "utf8"));
  assert.equal(written.loggedIn, false);
  assert.equal(readOriginProbe(dest).loggedIn, false);
  assert.equal(readOriginProbe(join(dest, "missing.json")), null);
});

test("inventory tick records last Origin auth without claiming a clone", () => {
  const dest = join(mkdtempSync(join(tmpdir(), "agent-ops-tick-origin-")), "last-inventory.json");
  const snapshot = writeInventoryTick({ jobs: [] }, dest, NOW, {
    origin: { loggedIn: false, status: "logged-out" },
  });
  assert.equal(snapshot.originLoggedIn, false);
  assert.equal(snapshot.originStatus, "logged-out");
});

test("cli status attaches last-origin.json", async () => {
  const root = mkdtempSync(join(tmpdir(), "agent-ops-status-origin-"));
  saveLedger(join(root, "ledger", "queue.json"), { jobs: [] });
  writeOriginProbe(
    { contract: ORIGIN_CONTRACT, loggedIn: false, status: "logged-out" },
    join(root, ".genesis", "last-origin.json"),
  );
  const chunks = [];
  const code = await runCli(["status"], {
    nowMs: NOW,
    root,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const summary = JSON.parse(chunks.join(""));
  assert.equal(summary.origin.loggedIn, false);
  assert.equal(summary.origin.status, "logged-out");
});

test("origin-slice first commands start with origin auth", () => {
  const lines = firstCommands({
    id: "genesis-world-layer-102",
    title: "world",
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    priority: 12,
    status: "open",
    claim: null,
    notes: "",
    verify: "pytest",
    files: [],
    collision: "",
  });
  assert.equal(lines[0], "origin auth status");
  assert.ok(lines.some((line) => line.includes("repo clone yuri-afk/genesis")));
});

test("gub-superbrain-probe firstCommands refuse the probe", () => {
  const lines = firstCommands({
    id: "gub-superbrain-probe",
    title: "probe",
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    priority: 3,
    status: "claimed",
    claim: null,
    notes: "",
    verify: "Failed probe stays unreachable. GOOSE-PC :8791 is not the BOSS peer.",
    files: [],
    collision: "",
  });
  assert.ok(lines.some((line) => line.includes("no more Superbrain")));
  assert.ok(lines.some((line) => line.includes("Do not run node src/cli.js probe")));
  assert.ok(lines.some((line) => line.includes("patches --prove")));
  assert.ok(!lines.some((line) => line.includes("origin auth")));
  assert.ok(!lines.some((line) => line.startsWith("node src/cli.js probe")));
  assert.ok(!lines.some((line) => line.includes("GET") && line.includes("45001")));
});

test("loginOriginAuth without a key stays logged-out and never clones", async () => {
  const calls = [];
  const report = await loginOriginAuth({
    nowMs: NOW,
    bin: "/exec-daemon/tools/origin",
    apiKey: "",
    execImpl: async (bin, args) => {
      calls.push([bin, ...args]);
      return { stdout: "", stderr: "", code: 0 };
    },
  });
  assert.equal(report.loggedIn, false);
  assert.equal(report.status, "logged-out");
  assert.match(report.detail, /CURSOR_API_KEY missing/);
  assert.equal(calls.length, 0);
  assert.doesNotMatch(JSON.stringify(report), /sk-secret/);
});

test("loginOriginAuth with a key logs in then re-probes", async () => {
  const calls = [];
  const report = await loginOriginAuth({
    nowMs: NOW,
    bin: "origin",
    apiKey: "sk-secret",
    execImpl: async (bin, args) => {
      calls.push(args[0] === "auth" ? args[1] : args[0]);
      if (args[1] === "login") {
        return { stdout: "Logged in\n", stderr: "", code: 0 };
      }
      return { stdout: "Logged in as yuri\n", stderr: "", code: 0 };
    },
  });
  assert.deepEqual(calls, ["login", "status"]);
  assert.equal(report.loggedIn, true);
  assert.equal(report.status, "authenticated");
  assert.doesNotMatch(JSON.stringify(report), /sk-secret/);
});

test("cli origin --login without a key exits 1", async () => {
  const chunks = [];
  const root = mkdtempSync(join(tmpdir(), "agent-ops-origin-cli-"));
  const code = await runCli(["origin", "--login"], {
    nowMs: NOW,
    root,
    originApiKey: "",
    originExecImpl: async () => ({
      stdout: "Not logged in. Run `origin auth login` to sign in.\n",
      stderr: "",
      code: 0,
    }),
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 1);
  const report = JSON.parse(chunks.join(""));
  assert.equal(report.loggedIn, false);
  assert.match(report.detail, /CURSOR_API_KEY missing/);
});

test("cli probe refuses Superbrain and does not write lane files", async () => {
  const chunks = [];
  const root = mkdtempSync(join(tmpdir(), "agent-ops-probe-origin-"));
  const code = await runCli(["probe"], {
    nowMs: NOW,
    root,
    fetchImpl: async () => ({ ok: false, status: 504 }),
    originExecImpl: async () => ({
      stdout: "Not logged in. Run `origin auth login` to sign in.\n",
      stderr: "",
      code: 0,
    }),
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 1);
  const report = JSON.parse(chunks.join(""));
  assert.equal(report.refused, true);
  assert.match(report.reason, /no more Superbrain/);
  assert.equal(report.origin, undefined);
  assert.equal(existsSync(join(root, ".genesis", "last-origin.json")), false);
  assert.equal(existsSync(join(root, ".genesis", "last-superbrain.json")), false);
});
