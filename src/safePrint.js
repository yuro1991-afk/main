/**
 * Encoding-safe console writes. Windows cp1252 (GitHub Actions
 * windows-latest) throws if a process prints ✓ / → unescaped.
 */

const NARROW = new Set(["ascii", "latin1", "binary", "cp1252", "windows-1252"]);

/**
 * @param {string} text
 */
function asciiFallback(text) {
  return text
    .replaceAll("✓", "OK")
    .replaceAll("✗", "X")
    .replaceAll("→", "->")
    .replaceAll("·", "-")
    .replace(/[^\x00-\x7F]/g, "?");
}

/**
 * @param {{ write: (chunk: string) => unknown, encoding?: string }} stream
 * @param {string} text
 */
export function safeWrite(stream, text) {
  const encoding = String(stream.encoding || "utf8").toLowerCase();
  if (NARROW.has(encoding) && /[^\x00-\x7F]/.test(text)) {
    stream.write(asciiFallback(text));
    return "replaced";
  }
  stream.write(text);
  return "ok";
}

/**
 * @param {string} role
 * @param {string} text
 * @param {{ write: (chunk: string) => unknown, encoding?: string }} [stream]
 */
export function chatLine(role, text, stream = process.stdout) {
  const line = String(text || "")
    .replaceAll("\n", " ")
    .trim();
  if (!line) {
    return "empty";
  }
  return safeWrite(stream, `CHAT|${role}|${line.slice(0, 500)}\n`);
}
