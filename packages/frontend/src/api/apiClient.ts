import axios, { AxiosResponse } from "axios";
import { YearMonth, Config, SuccessResponse } from "../interfaces";

const API_HOST = import.meta.env.VITE_API_HOST;

const apiClient = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 获取账本的年份和月份
 * @returns {Promise<YearMonth[]>} 包含年份和月份的数组
 */
export async function getLedgerYearAndMonth(): Promise<YearMonth[] | undefined> {
  try {
    const response: AxiosResponse<{ data: YearMonth[] }> = await apiClient.get("/api/ledger/distinct-year-months");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 获取配置信息
 * @returns {Promise<Config>} 包含配置信息的对象
 */
export async function getConfig(): Promise<Config | undefined> {
  try {
    const response: AxiosResponse<{ configData: Config }> = await apiClient.get("/api/beanfile-config/read");
    return response.data.configData;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 存储配置信息
 * @param {string} beanFilePath Bean 文件路径
 * @param {string} operatingCurrency 操作货币
 * @returns {Promise<void>}
 */
export async function saveConfig(beanFilePath: string, operatingCurrency: string): Promise<SuccessResponse | undefined> {
  try {
    const response: AxiosResponse<{ message:string, status:number }> = await apiClient.post(
      "/api/beanfile-config/set",
      {
        beanFilePath,
        operatingCurrency,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

