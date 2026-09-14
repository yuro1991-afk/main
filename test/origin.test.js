import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  ORIGIN_CONTRACT,
  loginOriginAuth,
  parseOriginAuthStatus,
  probeOriginAuth,
  writeOriginProbe,
} from "../src/origin.js";
import { firstCommands } from "../src/brief.js";
import { runCli } from "../src/cli.js";

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

test("cli probe attaches origin auth to the lane report", async () => {
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
  assert.equal(code, 0);
  const report = JSON.parse(chunks.join(""));
  assert.equal(report.origin.loggedIn, false);
  assert.equal(report.origin.status, "logged-out");
  const persisted = JSON.parse(readFileSync(join(root, ".genesis", "last-origin.json"), "utf8"));
  assert.equal(persisted.loggedIn, false);
});
