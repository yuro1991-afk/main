#!/usr/bin/env node
import { scan } from "../src/scan.js";

const offline = process.argv.includes("--offline");
const json = process.argv.includes("--json");

const report = await scan({ offline });

if (json) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exit(0);
}

process.stdout.write(`attention ${report.repo} offline=${report.offline}\n`);
process.stdout.write(`counts ${JSON.stringify(report.counts)}\n`);
process.stdout.write(`${report.note}\n\n`);

for (const item of report.items) {
  process.stdout.write(`[${item.status}] ${item.title}\n`);
  process.stdout.write(`  ${item.detail}\n`);
  if (item.fix) {
    process.stdout.write(`  fix: ${item.fix}\n`);
  }
  if (item.url) {
    process.stdout.write(`  ${item.url}\n`);
  }
  process.stdout.write("\n");
}
