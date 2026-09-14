import { execFile } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const ORIGIN_CONTRACT = "agent-ops.origin.v1";
export const ORIGIN_REPO = "yuri-afk/genesis";
export const DEFAULT_ORIGIN_BIN = "/exec-daemon/tools/origin";

/**
 * @param {string} repoRoot
 */
export function defaultOriginPath(repoRoot) {
  return join(repoRoot, ".genesis", "last-origin.json");
}

/**
 * @param {{ bin?: string }} [options]
 */
export function resolveOriginBin(options = {}) {
  if (options.bin) return options.bin;
  if (process.env.ORIGIN_BIN) return process.env.ORIGIN_BIN;
  if (existsSync(DEFAULT_ORIGIN_BIN)) return DEFAULT_ORIGIN_BIN;
  return "origin";
}

/**
 * @param {string} text
 */
export function parseOriginAuthStatus(text) {
  const lower = String(text ?? "").toLowerCase();
  if (lower.includes("not logged in")) return false;
  if (lower.includes("logged in")) return true;
  return false;
}

/**
 * @param {string} bin
 * @param {string[]} args
 * @returns {Promise<{ stdout: string, stderr: string, code: number }>}
 */
async function defaultExec(bin, args) {
  try {
    const { stdout, stderr } = await execFileAsync(bin, args, { timeout: 5000 });
    return { stdout: stdout ?? "", stderr: stderr ?? "", code: 0 };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      throw new Error(`origin cli missing: ${bin}`);
    }
    const err = error && typeof error === "object" ? error : {};
    return {
      stdout: typeof err.stdout === "string" ? err.stdout : "",
      stderr: typeof err.stderr === "string" ? err.stderr : error instanceof Error ? error.message : String(error),
      code: typeof err.code === "number" ? err.code : 1,
    };
  }
}

/**
 * Origin CLI is present on this pad. Logged-out stays logged-out —
 * never claim a Genesis clone without auth.
 * @param {{
 *   nowMs?: number,
 *   bin?: string,
 *   execImpl?: (bin: string, args: string[]) => Promise<{ stdout: string, stderr: string, code: number }>
 * }} [options]
 */
export async function probeOriginAuth(options = {}) {
  const nowMs = options.nowMs ?? Date.now();
  const at = new Date(nowMs).toISOString();
  const bin = resolveOriginBin(options);
  const run = options.execImpl ?? defaultExec;
  try {
    const result = await run(bin, ["auth", "status"]);
    const text = `${result.stdout}\n${result.stderr}`.trim();
    const loggedIn = parseOriginAuthStatus(text);
    return {
      contract: ORIGIN_CONTRACT,
      bin,
      loggedIn,
      status: loggedIn ? "authenticated" : "logged-out",
      detail: text.split("\n")[0] ?? "",
      next: loggedIn
        ? `${bin} repo clone ${ORIGIN_REPO} genesis`
        : `${bin} auth login --api-key "$CURSOR_API_KEY"`,
      at,
    };
  } catch (error) {
    return {
      contract: ORIGIN_CONTRACT,
      bin,
      loggedIn: false,
      status: "unreachable",
      detail: error instanceof Error ? error.message : String(error),
      next: `${bin} auth login --api-key "$CURSOR_API_KEY"`,
      at,
    };
  }
}

/**
 * Login only when an API key is present. Never echo the key.
 * Logged-out stays logged-out if the key is missing.
 * @param {{
 *   nowMs?: number,
 *   bin?: string,
 *   apiKey?: string,
 *   execImpl?: (bin: string, args: string[]) => Promise<{ stdout: string, stderr: string, code: number }>
 * }} [options]
 */
export async function loginOriginAuth(options = {}) {
  const nowMs = options.nowMs ?? Date.now();
  const at = new Date(nowMs).toISOString();
  const bin = resolveOriginBin(options);
  const apiKey = options.apiKey ?? process.env.CURSOR_API_KEY ?? "";
  if (!apiKey) {
    return {
      contract: ORIGIN_CONTRACT,
      bin,
      loggedIn: false,
      status: "logged-out",
      detail: "CURSOR_API_KEY missing; origin auth login skipped",
      next: `${bin} auth login --api-key "$CURSOR_API_KEY"`,
      at,
    };
  }
  const run = options.execImpl ?? defaultExec;
  try {
    await run(bin, ["auth", "login", "--api-key", apiKey]);
  } catch (error) {
    return {
      contract: ORIGIN_CONTRACT,
      bin,
      loggedIn: false,
      status: "unreachable",
      detail: error instanceof Error ? error.message : String(error),
      next: `${bin} auth login --api-key "$CURSOR_API_KEY"`,
      at,
    };
  }
  return probeOriginAuth({
    nowMs,
    bin,
    execImpl: options.execImpl,
  });
}

/**
 * @param {object} snapshot
 * @param {string} destPath
 */
export function writeOriginProbe(snapshot, destPath) {
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  return destPath;
}
