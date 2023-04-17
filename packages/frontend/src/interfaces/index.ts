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
