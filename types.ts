type Level = "INFO" | "ERROR";

export interface ICommonTypes {
  level: Level;
  endpoint: string;
  status_code: number;
}

export interface IInputData extends ICommonTypes {
  timestamp: Date;
  user_id: number;
  response_time: number;
}

export interface IOutputData extends ICommonTypes {
  start_time: Date;
  window: number;
  count: number;
}
