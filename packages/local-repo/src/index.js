import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  REPO_ROOT,
  loadAllSiblings,
  layoutFrom,
  allSiblingsWorking,
} from "../../sibling-kit/src/index.js";

export const id = "local-repo";
export const title = "Genesis local repository";
export const contract = "genesis.local-repo.v1";
export const kind = "node";
export const summary =
  "Checkout identity, sibling layout, .genesis runtime, lane probes.";

const GENESIS_DIR = join(REPO_ROOT, ".genesis");

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function checkoutIdentity() {
  return {
    repo: "genesis",
    origin: "origin.cursor.com/git/yuri-afk/genesis",
    githubWorkingCopy: "github.com/yuro1991-afk/main",
    root: REPO_ROOT,
    runtime: GENESIS_DIR,
  };
}

export function init(root = REPO_ROOT) {
  const runtime = join(root, ".genesis");
  mkdirSync(join(runtime, "mail"), { recursive: true });
  mkdirSync(join(runtime, "log"), { recursive: true });
  mkdirSync(join(runtime, "jobs"), { recursive: true });
  const identity = {
    ...checkoutIdentity(),
    initializedAt: new Date().toISOString(),
  };
  writeFileSync(join(runtime, "identity.json"), JSON.stringify(identity, null, 2));
  return identity;
}

export function status(root = REPO_ROOT) {
  const runtime = join(root, ".genesis");
  const identityPath = join(runtime, "identity.json");
  return {
    initialized: existsSync(identityPath),
    identity: existsSync(identityPath)
      ? JSON.parse(readFileSync(identityPath, "utf8"))
      : checkoutIdentity(),
    runtime,
  };
}

export async function layout() {
  const siblings = await loadAllSiblings();
  const result = layoutFrom(siblings);
  return {
    ...result,
    working: allSiblingsWorking(result),
    missing: result.slices.filter((slice) => !slice.present || slice.status !== "ok"),
  };
}

/**
 * Probe a lane. Timeouts and connection failures are `unreachable`, never `live`.
 * @param {string} url
 * @param {number} timeoutMs
 */
export async function probeUrl(url, timeoutMs = 800) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return {
      url,
      status: response.ok ? "live" : "unreachable",
      httpStatus: response.status,
    };
  } catch {
    return { url, status: "unreachable" };
  } finally {
    clearTimeout(timer);
  }
}

export async function probe() {
  const lanes = {
    localKernel: { status: "live", detail: "genesis-repo process" },
    bossSuperbrain: await probeUrl("http://169.254.124.8:45001/health"),
    goosePcCore: await probeUrl("http://127.0.0.1:8791/health"),
    huggingFace: { status: "unknown", detail: "Yuro1991 shelf — probe via HF tools" },
  };
  return { probedAt: new Date().toISOString(), lanes };
}
