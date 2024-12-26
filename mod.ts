import "jsr:@std/dotenv/load";
import { ensureDir } from "@std/fs/ensure-dir";
import { processJSONFile } from "./processJSON.ts";
import { IOutputData } from "./types.ts";
import { processAggregation } from "./processAggregation.ts";
import { processLogFile } from "./processLogFile.ts";

const logDir = "./logs";
const envTime = Deno.env.get("WINDOW_TIME");
const windowTime = envTime ? Number(envTime) : 200;
const outputJSON: IOutputData[] = [];

for await (const dirEntry of Deno.readDir(logDir)) {
	const fileType = dirEntry.name.slice(dirEntry.name.lastIndexOf(".") + 1);
	const text = await Deno.readTextFile(`${logDir}/${dirEntry.name}`);

	if (fileType === "json") {
		for (const item of processJSONFile(text)) {
			processAggregation(item, outputJSON, windowTime);
		}
	} else if (fileType === "log") {
		for (const item of processLogFile(text)) {
			processAggregation(item, outputJSON, windowTime);
		}
	}
}

await ensureDir("./output");
await Deno.writeTextFile(
	"./output/aggregated.json",
	JSON.stringify(outputJSON),
);
