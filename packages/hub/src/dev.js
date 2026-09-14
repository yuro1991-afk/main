import { createServer } from "node:http";
import { speak, board, health } from "./index.js";

const port = Number(process.env.GENESIS_HUB_PORT ?? 7411);

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${port}`);
  res.setHeader("content-type", "application/json");
  if (url.pathname === "/health") {
    res.end(JSON.stringify(health()));
    return;
  }
  if (url.pathname === "/hub") {
    res.end(JSON.stringify(await board()));
    return;
  }
  if (url.pathname === "/" && req.method === "POST") {
    const body = await readBody(req);
    const uttered = JSON.parse(body || "{}").text ?? "";
    res.end(JSON.stringify(await speak(uttered)));
    return;
  }
  res.statusCode = 404;
  res.end(JSON.stringify({ error: "not found" }));
});

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

server.listen(port, "127.0.0.1", () => {
  console.log(`genesis hub http://127.0.0.1:${port}`);
});
