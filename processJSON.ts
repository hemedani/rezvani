import { IInputData } from "./types.ts";

export const processJSONFile = (text: string) =>
  text
    .split("\n")
    .filter((item) => item)
    .map((item) => JSON.parse(item)) as IInputData[];
