import { IInputData, Level } from "./types.ts";

export const processLogFile = (text: string): IInputData[] =>
	text
		.split("\n")
		.filter((item) => item)
		.map((item) => {
			const splitedBySpace = item.split(" ");

			return {
				timestamp: new Date(
					`${splitedBySpace[0]} ${splitedBySpace[1]}`.slice(1, -1),
				),
				level: splitedBySpace[2] as Level,
				user_id: Number(splitedBySpace[6].slice(
					splitedBySpace[6].indexOf("=") + 1,
				)),
				endpoint: splitedBySpace[7].slice(
					splitedBySpace[7].indexOf("=") + 1,
				),
				status_code: Number(splitedBySpace[8].slice(
					splitedBySpace[8].indexOf("=") + 1,
				)),
				response_time: Number(splitedBySpace[9].slice(
					splitedBySpace[9].indexOf("=") + 1,
					-2,
				)),
			};
		});
