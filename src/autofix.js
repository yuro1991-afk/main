import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PATCH = path.join(ROOT, "patches", "dronehive-pro-chat-cp1252.patch");
const REPRODUCE = path.join(ROOT, "src", "reproduce.py");
const PYTHON = process.env.PYTHON || "python3";

export const COMMANDS = ["diagnose", "reproduce", "verify", "apply"];

function runPython(args, options = {}) {
  const result = spawnSync(PYTHON, args, {
    encoding: "utf8",
    cwd: ROOT,
    ...options,
  });
  return result;
}

function requireOk(result, label) {
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    throw new Error(`${label} failed (${result.status}): ${detail}`);
  }
  return result;
}

export function diagnose() {
  return {
    id: "dronehive-unicode-ci",
    repo: "github.com/yuro1991-afk/dronehive",
    prs: [1, 2],
    crash:
      "UnicodeEncodeError printing \\u2713 via _chat on windows-latest cp1252",
    file: "drone/pro/tool_agent.py",
    patch: "patches/dronehive-pro-chat-cp1252.patch",
    push: "blocked — this token cannot write yuro1991-afk/dronehive",
    apply: "npm run autofix -- apply /path/to/dronehive",
    autoFixableHere: false,
  };
}

export function reproduce() {
  const result = runPython([REPRODUCE, "--mode", "unpatched", "--json"]);
  if (result.error) {
    throw result.error;
  }
  const payload = JSON.parse(result.stdout || "{}");
  if (result.status !== 0 || payload.raised !== true) {
    throw new Error("expected unpatched _chat to raise UnicodeEncodeError");
  }
  return payload;
}

export function verify() {
  const patched = requireOk(
    runPython([REPRODUCE, "--mode", "patched", "--json"]),
    "patched reproduce",
  );
  return JSON.parse(patched.stdout || "{}");
}

export function apply(tree) {
  if (!tree) {
    throw new Error("apply requires a dronehive checkout path");
  }
  const resolved = path.resolve(tree);
  const toolAgent = path.join(resolved, "drone", "pro", "tool_agent.py");
  const workflow = path.join(resolved, ".github", "workflows", "ci.yml");
  if (!existsSync(toolAgent) || !existsSync(workflow)) {
    throw new Error(`not a dronehive checkout: ${resolved}`);
  }
  if (!existsSync(PATCH)) {
    throw new Error(`missing patch: ${PATCH}`);
  }

  const check = spawnSync("git", ["apply", "--check", PATCH], {
    cwd: resolved,
    encoding: "utf8",
  });
  requireOk(check, "git apply --check");

  const applied = spawnSync("git", ["apply", PATCH], {
    cwd: resolved,
    encoding: "utf8",
  });
  requireOk(applied, "git apply");

  const proof = requireOk(
    runPython([REPRODUCE, "--tree", resolved, "--json"]),
    "tree reproduce",
  );
  return {
    tree: resolved,
    patch: PATCH,
    applied: true,
    proof: JSON.parse(proof.stdout || "{}"),
  };
}

export function run(command, args = []) {
  switch (command) {
    case "diagnose":
      return diagnose();
    case "reproduce":
      return reproduce();
    case "verify":
      return verify();
    case "apply":
      return apply(args[0]);
    default: {
      const unseen = command;
      throw new Error(`unhandled autofix command: ${unseen}`);
    }
  }
}

export function parseArgv(argv) {
  const [, , command, ...rest] = argv;
  if (!command || command === "--help" || command === "-h") {
    return { command: "diagnose", args: [] };
  }
  return { command, args: rest };
}
