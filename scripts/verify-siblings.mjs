import { loadAllSiblings, layoutFrom, allSiblingsWorking, SIBLING_IDS } from "../packages/sibling-kit/src/index.js";
import { init, layout, probe } from "../packages/local-repo/src/index.js";

const siblings = await loadAllSiblings();
if (siblings.length !== SIBLING_IDS.length) {
  throw new Error(`loaded ${siblings.length} siblings, expected ${SIBLING_IDS.length}`);
}

init();
const map = await layout();
const generated = layoutFrom(siblings);
const working = allSiblingsWorking(generated) && map.working;
const lanes = await probe();

const report = {
  repo: "genesis",
  siblings: generated.slices.length,
  working,
  missing: map.missing,
  lanes: Object.fromEntries(
    Object.entries(lanes.lanes).map(([name, lane]) => [name, lane.status ?? lane]),
  ),
};

console.log(JSON.stringify(report, null, 2));

if (!working) {
  process.exitCode = 1;
}
