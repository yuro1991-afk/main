import { test } from "node:test";
import assert from "node:assert/strict";
import { destinationForKind, routeIntent } from "../src/routing.js";
import { JOB_KINDS } from "../src/kinds.js";

test("keep-busy routes to this board, not Origin stubs", () => {
  const route = routeIntent("Keep my agents busy");
  assert.match(route.destination, /dispatch board/);
  assert.match(route.notes, /Genesis only/);
  assert.match(route.notes, /Do not rebuild/);
});

test("genesis routes to Origin, not GitHub PR 1", () => {
  const route = routeIntent("assemble genesis siblings");
  assert.match(route.destination, /yuri-afk\/genesis/);
  assert.match(route.notes, /Do not reopen GitHub PR #1/);
});

test("review does not target empty main", () => {
  const route = routeIntent("Have code rabbit auto review genesis");
  assert.equal(route.kind, "review");
  assert.match(route.destination, /existing open PR/);
});

test("dronehive and probe intents", () => {
  assert.equal(routeIntent("fix dronehive unicode").kind, "fix");
  assert.equal(routeIntent("probe superbrain lanes").kind, "probe");
});

test("destinationForKind is exhaustive", () => {
  for (const kind of JOB_KINDS) {
    assert.equal(typeof destinationForKind(kind), "string");
  }
});
