#!/usr/bin/env node
import { parseArgv, run } from "../src/autofix.js";

const { command, args } = parseArgv(process.argv);
const result = run(command, args);
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
