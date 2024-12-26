import { IInputData, IOutputData } from "./types.ts";

export const processAggregation = (
  item: IInputData,
  outputJSON: IOutputData[],
  windowTime: number,
) => {
  const foundedEndPoint = outputJSON.findLast((outputItem) =>
    (outputItem.endpoint === item.endpoint) && (outputItem.level === item.level)
  );
  const newOutputItem = {
    start_time: item.timestamp,
    count: 1,
    level: item.level,
    endpoint: item.endpoint,
    status_code: item.status_code,
    window: windowTime,
  };

  if (foundedEndPoint) {
    const foundedEndPointStartTime = new Date(foundedEndPoint.start_time)
      .getTime();
    const itemTimeStamp = new Date(item.timestamp).getTime();
    const timeDef = (itemTimeStamp - foundedEndPointStartTime) / 1000;

    if (timeDef < windowTime) {
      foundedEndPoint.count = foundedEndPoint.count + 1;
    } else {
      outputJSON.push(newOutputItem);
    }
  } else {
    outputJSON.push(newOutputItem);
  }
};
