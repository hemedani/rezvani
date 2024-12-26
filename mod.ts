import { IInputData } from "./types.ts";

const logDir = "./logs";

const proccessJSONFile = (text: string) => {
  const splitedText: IInputData[] = text
    .split("\n")
    .filter((item) => item)
    .map((item) => JSON.parse(item));
};

for await (const dirEntry of Deno.readDir(logDir)) {
  console.log(dirEntry.name);
  const fileType = dirEntry.name.slice(dirEntry.name.lastIndexOf(".") + 1);
  const text = await Deno.readTextFile(`${logDir}/${dirEntry.name}`);

  if (fileType === "json") {
    proccessJSONFile(text);
  }
}
