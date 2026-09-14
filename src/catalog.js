import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { validateJob } from "./ledger.js";

export const CATALOG_CONTRACT = "agent-ops.catalog.v1";
export const ORIGIN_GENESIS_REPO = "origin.cursor.com/git/yuri-afk/genesis";
export const GENESIS_ENTRIES_COLLECTION = "collection://87665364-29fe-4744-aac0-d776847d7542";

/** Existing ledger ids that do not follow the default playbook/ → job map. */
export const ENTRY_JOB_ALIASES = Object.freeze({
  "playbook/add-custom-entry": "catalog-add-custom-entry",
  "playbook/notion-skill-author": "catalog-notion-skill-author",
  "playbook/agent-routing-matrix": "agent-routing-matrix",
  "playbook/expand-by-domain": "catalog-expand-domain",
  "playbook/gub-inventory-tick": "gub-inventory-tick",
  "playbook/gub-superbrain-probe": "gub-superbrain-probe",
  "playbook/inventory-skills": "catalog-inventory-skills",
  "playbook/notion-companion-sync": "catalog-notion-sync",
  "playbook/inventory-mcp-tools": "catalog-inventory-mcp",
});

const JOB_OVERRIDES = Object.freeze({
  "gub-route-intent": {
    title: "Implement GUB route-intent playbook",
    priority: 10,
    verify: "POST /v1/route persists a Genesis run. Playbooks score above skills. Do not invent LIVE lanes.",
    files: ["gub/", "data/playbooks/"],
    collision: "Same GUB process as gub-inventory-tick and genesis-auto-runner-41 (:8787 / :8788).",
  },
  "gub-run-playbook": {
    title: "Implement GUB run-playbook playbook",
    priority: 11,
    verify: "Dry-run writes plan + step results under .genesis/. Allowlisted gub.* operators only.",
    files: ["gub/", "data/playbooks/", ".genesis/"],
    collision: "Coordinate with gub-route-intent and gub-inventory-tick. Do not execute unallowlisted operators.",
  },
  "catalog-inventory-mcp": {
    title: "Inventory MCP tools into the Origin catalog",
    priority: 54,
    verify: "scripts/inventory.py writes data/tools + catalog/stats.json. Do not invent Superbrain LIVE.",
    files: ["scripts/inventory.py", "catalog/stats.json", "data/tools/"],
    collision: "Coordinate with catalog-inventory-skills (same inventory.py) and gub-inventory-tick.",
  },
});

/**
 * @param {string} repoRoot
 */
export function defaultEntriesPath(repoRoot) {
  return join(repoRoot, "ledger", "catalog-entries.json");
}

/**
 * @param {string} repoRoot
 */
export function defaultCatalogMinePath(repoRoot) {
  return join(repoRoot, ".genesis", "last-catalog-mine.json");
}

/**
 * @param {string} entryId
 * @returns {string | null}
 */
export function jobIdForEntry(entryId) {
  if (typeof entryId !== "string" || entryId.length === 0) return null;
  if (ENTRY_JOB_ALIASES[entryId]) return ENTRY_JOB_ALIASES[entryId];
  if (entryId.startsWith("playbook/gub-")) return entryId.slice("playbook/".length);
  if (entryId.startsWith("playbook/")) return `catalog-${entryId.slice("playbook/".length)}`;
  return null;
}

/**
 * @param {string} jobId
 */
export function kindForJobId(jobId) {
  return jobId.startsWith("gub-") ? "origin-slice" : "catalog";
}

/**
 * @param {string} text
 */
export function pageIdFromUrl(text) {
  const match = String(text ?? "").match(/([0-9a-f]{32})/i);
  return match ? match[1].toLowerCase() : "";
}

/**
 * @param {string} url
 */
export function normalizeNotionUrl(url) {
  const pageId = pageIdFromUrl(url);
  return pageId ? `https://app.notion.com/p/${pageId}` : String(url ?? "");
}

/**
 * @param {unknown} raw
 * @returns {{ entryId: string, name: string, type: string, status: string, source: string, category: string, url: string, description: string }[]}
 */
export function normalizeEntries(raw) {
  const rows = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object" && Array.isArray(raw.entries)
      ? raw.entries
      : raw && typeof raw === "object" && Array.isArray(raw.results)
        ? raw.results
        : null;
  if (!rows) {
    throw new Error("catalog entries must be { entries: Entry[] } or Entry[]");
  }
  return rows.map((row) => {
    const entryId = row?.entryId ?? row?.["Entry ID"] ?? "";
    if (!entryId) {
      throw new Error("each catalog entry needs Entry ID");
    }
    return {
      entryId: String(entryId),
      name: String(row.name ?? row.Name ?? entryId),
      type: String(row.type ?? row.Type ?? ""),
      status: String(row.status ?? row.Status ?? ""),
      source: String(row.source ?? row.Source ?? ""),
      category: String(row.category ?? row.Category ?? ""),
      url: String(row.url ?? ""),
      description: String(row.description ?? row.Description ?? ""),
    };
  });
}

/**
 * @param {string} destPath
 */
export function loadEntries(destPath) {
  if (!existsSync(destPath)) {
    throw new Error(`catalog entries file missing: ${destPath}`);
  }
  return normalizeEntries(JSON.parse(readFileSync(destPath, "utf8")));
}

/**
 * @param {{ jobs: Array<{ id: string, notes?: string }> }} ledger
 * @param {{ entryId: string, url: string }} entry
 */
export function ledgerCoversEntry(ledger, entry) {
  const mapped = jobIdForEntry(entry.entryId);
  const pageId = pageIdFromUrl(entry.url);
  return ledger.jobs.some((job) => {
    if (mapped && job.id === mapped) return true;
    const notes = typeof job.notes === "string" ? job.notes : "";
    if (notes.includes(entry.entryId)) return true;
    return pageId !== "" && pageIdFromUrl(notes) === pageId;
  });
}

/**
 * @param {{ entryId: string, name: string, type: string, status: string, url: string, description: string }} entry
 * @param {string} jobId
 * @param {number} [fallbackPriority]
 */
export function jobFromEntry(entry, jobId, fallbackPriority = 70) {
  const override = JOB_OVERRIDES[jobId] ?? {};
  const url = normalizeNotionUrl(entry.url);
  const job = {
    id: jobId,
    title: override.title ?? `${entry.name} (Origin catalog playbook)`,
    repo: ORIGIN_GENESIS_REPO,
    kind: kindForJobId(jobId),
    priority: override.priority ?? fallbackPriority,
    status: "open",
    claim: null,
    notes: [
      `Notion ${entry.entryId} ${url} Status ${entry.status || "unknown"}.`,
      entry.description,
      "Implement on origin.cursor.com/git/yuri-afk/genesis only.",
    ]
      .filter(Boolean)
      .join(" "),
    verify:
      override.verify ??
      `Origin playbook ${entry.entryId} is implemented there. Do not invent LIVE lanes or package paths on this pad.`,
    files: override.files ?? [],
    collision:
      override.collision ??
      "Origin genesis only. Coordinate with catalog-notion-sync. Do not reopen yuro1991-afk/main#1.",
  };
  validateJob(job);
  return job;
}

/**
 * Diff Notion Genesis Entries against the landing-pad ledger.
 * Playbooks become Origin cards. Skills / tools / resources stay skipped.
 * @param {{ entryId: string, name: string, type: string, status: string, source: string, category: string, url: string, description: string }[]} entries
 * @param {{ jobs: Array<{ id: string, notes?: string, kind?: string, priority?: number }> }} ledger
 * @param {number} [nowMs]
 */
export function mineCatalog(entries, ledger, nowMs = Date.now()) {
  const covered = [];
  const proposed = [];
  const skipped = [];
  let nextCatalogPriority = nextPriority(ledger.jobs, "catalog", 54);
  let nextSlicePriority = nextPriority(ledger.jobs, "origin-slice", 10);

  for (const entry of entries) {
    if (entry.status === "deprecated") {
      skipped.push({ entryId: entry.entryId, reason: "deprecated" });
      continue;
    }
    if (entry.type !== "playbook") {
      skipped.push({ entryId: entry.entryId, reason: "not-playbook" });
      continue;
    }
    const jobId = jobIdForEntry(entry.entryId);
    if (!jobId) {
      skipped.push({ entryId: entry.entryId, reason: "no-job-id" });
      continue;
    }
    if (ledgerCoversEntry(ledger, entry)) {
      covered.push(jobId);
      continue;
    }
    const kind = kindForJobId(jobId);
    const fallback = kind === "origin-slice" ? nextSlicePriority : nextCatalogPriority;
    if (!JOB_OVERRIDES[jobId]) {
      if (kind === "origin-slice") nextSlicePriority += 1;
      else nextCatalogPriority += 1;
    }
    proposed.push(jobFromEntry(entry, jobId, fallback));
  }

  proposed.sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));

  return {
    contract: CATALOG_CONTRACT,
    at: new Date(nowMs).toISOString(),
    collection: GENESIS_ENTRIES_COLLECTION,
    entries: entries.length,
    playbooks: entries.filter((entry) => entry.type === "playbook").length,
    covered,
    proposed,
    skipped,
    rule: "Playbook rows become Origin cards. Skills/tools/resources stay skipped unless aliased. Existing ledger ids and Notion URLs count as covered.",
  };
}

/**
 * @param {{ jobs: object[] }} ledger
 * @param {object[]} proposed
 */
export function applyProposedJobs(ledger, proposed) {
  const added = [];
  for (const job of proposed) {
    validateJob(job);
    if (ledger.jobs.some((existing) => existing.id === job.id)) continue;
    ledger.jobs.push(job);
    added.push(job.id);
  }
  return added;
}

/**
 * @param {object} snapshot
 * @param {string} destPath
 */
export function writeCatalogMine(snapshot, destPath) {
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  return destPath;
}

/**
 * @param {Array<{ kind?: string, priority?: number }>} jobs
 * @param {string} kind
 * @param {number} floor
 */
function nextPriority(jobs, kind, floor) {
  const used = jobs.filter((job) => job.kind === kind).map((job) => job.priority ?? 0);
  const max = used.length ? Math.max(...used) : floor - 1;
  return Math.max(floor, max + 1);
}
