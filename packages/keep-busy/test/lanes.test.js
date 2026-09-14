import { test } from "node:test";
import assert from "node:assert/strict";
import { assertNotLive, probe } from "../src/lanes.js";

test("probe returns live only when the health response is ok", async () => {
  const result = await probe("http://example.test/health", {
    fetchImpl: async () => ({ ok: true, status: 200 }),
  });
  assert.equal(result.status, "live");
  assert.equal(result.httpStatus, 200);
});

test("probe returns unreachable on timeout or network error", async () => {
  const result = await probe("http://169.254.124.8:45001/health", {
    fetchImpl: async () => {
      throw new Error("connect timeout");
    },
  });
  assert.equal(result.status, "unreachable");
  assert.equal(result.reason, "error");
});

test("probe returns unknown when there is no URL", async () => {
  const result = await probe("");
  assert.equal(result.status, "unknown");
});

test("a result cannot be labeled live without an HTTP status", () => {
  assert.throws(() => assertNotLive({ status: "live" }), /cannot be live/);
  assert.deepEqual(assertNotLive({ status: "live", httpStatus: 200 }), {
    status: "live",
    httpStatus: 200,
  });
});
