import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  assertNotFalseLive,
  probeKnownLanes,
  probeLane,
  refuseKnownLanes,
  writeLaneProbe,
} from "../src/probe.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

test("timeout is unreachable, never live", async () => {
  const result = await probeLane("http://example.test/health", {
    id: "boss",
    nowMs: NOW,
    timeoutMs: 10,
    fetchImpl: () =>
      new Promise((_, reject) => {
        const error = new Error("Aborted");
        error.name = "AbortError";
        reject(error);
      }),
  });
  assert.equal(result.status, "unreachable");
  assert.equal(result.error, "timeout");
  assert.equal(result.statusCode, null);
  assertNotFalseLive(result);
});

test("HTTP 200 is live", async () => {
  const result = await probeLane("http://example.test/health", {
    nowMs: NOW,
    fetchImpl: async () => ({ ok: true, status: 200 }),
  });
  assert.equal(result.status, "live");
  assert.equal(result.statusCode, 200);
});

test("HTTP 503 is unreachable", async () => {
  const result = await probeLane("http://example.test/health", {
    nowMs: NOW,
    fetchImpl: async () => ({ ok: false, status: 503 }),
  });
  assert.equal(result.status, "unreachable");
  assert.equal(result.error, "HTTP 503");
});

test("known lanes keep Superbrain and GOOSE distinct", async () => {
  const report = await probeKnownLanes({
    nowMs: NOW,
    fetchImpl: async () => ({ ok: false, status: 504 }),
  });
  assert.equal(report.lanes.length, 3);
  assert.ok(report.note.includes("not the BOSS peer"));
  assert.deepEqual(
    report.lanes.map((lane) => lane.id),
    ["boss-superbrain-health", "boss-superbrain-live", "goose-pc-core"],
  );
  for (const lane of report.lanes) {
    assert.equal(lane.status, "unreachable");
  }
});

test("writeLaneProbe persists unreachable and rejects forged live", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-probe-"));
  const dest = join(dir, "last-superbrain.json");
  const report = {
    contract: "agent-ops.probe.v1",
    lanes: [
      {
        id: "boss",
        url: "http://x/health",
        status: "unreachable",
        statusCode: null,
        error: "timeout",
        at: new Date(NOW).toISOString(),
      },
    ],
  };
  writeLaneProbe(report, dest);
  const saved = JSON.parse(readFileSync(dest, "utf8"));
  assert.equal(saved.lanes[0].status, "unreachable");
  assert.throws(
    () =>
      writeLaneProbe(
        {
          lanes: [
            {
              id: "x",
              url: "http://x",
              status: "live",
              statusCode: null,
              error: "timeout",
              at: new Date(NOW).toISOString(),
            },
          ],
        },
        dest,
      ),
    /unreachable/,
  );
});

test("refuseKnownLanes does not hit Superbrain", () => {
  const report = refuseKnownLanes();
  assert.equal(report.refused, true);
  assert.match(report.reason, /no more Superbrain/);
  assert.ok(report.take.includes("review-main-pr10"));
});

test("assertNotFalseLive rejects a forged live timeout", () => {
  assert.throws(
    () =>
      assertNotFalseLive({
        id: "x",
        url: "http://x",
        status: "live",
        statusCode: null,
        error: "timeout",
        at: new Date(NOW).toISOString(),
      }),
    /unreachable/,
  );
});
