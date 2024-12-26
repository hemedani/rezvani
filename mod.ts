import "jsr:@std/dotenv/load";
import { processJSONFile } from "./processJSON.ts";
import { IOutputData } from "./types.ts";
import { processAggregation } from "./processAggregation.ts";

const logDir = "./logs";
const envTime = Deno.env.get("WINDOW_TIME");
const windowTime = envTime ? Number(envTime) : 200;
const outputJSON: IOutputData[] = [];

for await (const dirEntry of Deno.readDir(logDir)) {
  console.log(dirEntry.name);
  const fileType = dirEntry.name.slice(dirEntry.name.lastIndexOf(".") + 1);
  const text = await Deno.readTextFile(`${logDir}/${dirEntry.name}`);

  if (fileType === "json") {
    for (const item of processJSONFile(text)) {
      processAggregation(item, outputJSON, windowTime);
    }
  }
}

/*
 * 	@LOG @DEBUG @INFO
 * 	This log written by ::==> {{ `` }}
 *
 * 	Please remove your log after debugging
 */
console.log(" ============= ");
console.group("outputJSON ------ ");
console.log();
console.info({ outputJSON, ouplength: outputJSON.length }, " ------ ");
console.log();
console.groupEnd();
console.log(" ============= ");
