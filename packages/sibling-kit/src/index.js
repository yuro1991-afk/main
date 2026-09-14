import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { SIBLING_IDS, assertNeverSibling, isSiblingId } from "./ids.js";

const KIT_DIR = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = join(KIT_DIR, "..", "..", "..");
export const PACKAGES_DIR = join(REPO_ROOT, "packages");

export { SIBLING_IDS, assertNeverSibling, isSiblingId };

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   contract: string,
 *   path: string,
 *   kind: "node" | "python",
 *   health: () => { status: "ok" | "error", slice: string, contract: string, detail?: string },
 *   handshake: () => { protocol: string, slice: string, version: 1 },
 * }} Sibling
 */

export function packageDir(id) {
  if (!isSiblingId(id)) {
    assertNeverSibling(id);
  }
  return join(PACKAGES_DIR, id);
}

export function siblingManifestPath(id) {
  return join(packageDir(id), "sibling.json");
}

/**
 * @param {string} id
 */
export function readManifest(id) {
  const path = siblingManifestPath(id);
  if (!existsSync(path)) {
    throw new Error(`missing sibling.json for ${id} at ${path}`);
  }
  return JSON.parse(readFileSync(path, "utf8"));
}

/**
 * @param {string} id
 * @returns {Promise<Sibling>}
 */
export async function loadSibling(id) {
  const dir = packageDir(id);
  const entry = join(dir, "src", "index.js");
  if (!existsSync(entry)) {
    throw new Error(`missing entry for ${id}: ${entry}`);
  }
  const mod = await import(pathToFileURL(entry).href);
  if (typeof mod.health !== "function" || typeof mod.handshake !== "function") {
    throw new Error(`${id} does not export health/handshake`);
  }
  return {
    id,
    title: mod.title ?? id,
    contract: mod.contract,
    path: dir,
    kind: mod.kind ?? "node",
    health: mod.health,
    handshake: mod.handshake,
    ...mod,
  };
}

/**
 * @returns {Promise<Sibling[]>}
 */
export async function loadAllSiblings() {
  const siblings = [];
  for (const id of SIBLING_IDS) {
    siblings.push(await loadSibling(id));
  }
  return siblings;
}

/**
 * @param {Sibling[]} siblings
 */
export function layoutFrom(siblings) {
  return {
    repo: "genesis",
    origin: "origin.cursor.com/git/yuri-afk/genesis",
    root: REPO_ROOT,
    slices: siblings.map((sibling) => {
      const health = sibling.health();
      return {
        id: sibling.id,
        title: sibling.title,
        contract: sibling.contract,
        path: `packages/${sibling.id}`,
        present: existsSync(packageDir(sibling.id)),
        status: health.status,
        kind: sibling.kind,
      };
    }),
  };
}

export function allSiblingsWorking(layout) {
  return layout.slices.every((slice) => slice.present && slice.status === "ok");
}
