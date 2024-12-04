export type AiAskDataMessage = {
  data: CustomPage;
  type: number;
  message: string;
}

export type CustomPage = {
  records: any[];
  columns: string[];
  sql: string;
  total: number;
  size: number;
  current: number;
}

export enum HistoryStatusEnum {
  START = 0,
  ANALYSIS_COMPLETE = 1,
  ANALYSIS_RELATE_TABLE_COMPLETE = 2,
  END = 3,
  ERROR = 4,
}
