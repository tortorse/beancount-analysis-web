export interface YearMonth {
  year: number;
  month: number;
}

export interface Config {
  /** beancount 主文件路径 */
  beanFilePath: string;
  /** 货币单位 */
  operatingCurrency: string;
}

export interface SuccessResponse {
  /** 消息 */
  message: string;
  /** 状态 1: 成功 0: 失败 */
  status: number;
}

export interface BeanData {
  year: string;
  month: string;
  account: string;
  amount: number;
  currency: string;
}

export interface DataRes {
  count: number;
  data: BeanData[];
}

export interface DataOptions {
  year: string;
  month?: string;
  level: string;
}

export type Account = "expenses" | "income";
export type DateMode = "year" | "month";
export type ChartMode = "line" | "column" | "pie";
