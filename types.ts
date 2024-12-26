type Level = "INFO" | "ERROR";

export interface ICommonTypes {
  timestamp: Date;
  level: Level;
  endpoint: string;
  status_code: number;
}

export interface IInputData extends ICommonTypes {
  user_id: number;
  response_time: number;
}

export interface IOutputData extends ICommonTypes {
  start_time: Date;
  window: number;
  count: number;
}
