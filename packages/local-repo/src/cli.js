import { init, status, layout, probe } from "./index.js";

const [, , command = "status", ...rest] = process.argv;

async function main() {
  switch (command) {
    case "init":
      console.log(JSON.stringify(init(), null, 2));
      return;
    case "status":
      console.log(JSON.stringify(status(), null, 2));
      return;
    case "layout":
      console.log(JSON.stringify(await layout(), null, 2));
      return;
    case "probe":
      console.log(JSON.stringify(await probe(), null, 2));
      return;
    case "help":
      console.log("genesis-repo <init|status|layout|probe>");
      return;
    default: {
      const _exhaustive = command;
      throw new Error(`unknown genesis-repo command: ${_exhaustive}${rest.length ? ` ${rest.join(" ")}` : ""}`);
    }
  }
}

await main();
