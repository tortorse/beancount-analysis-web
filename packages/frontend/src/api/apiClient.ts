import axios, { AxiosResponse } from "axios";
import {
  YearMonth,
  Config,
  SuccessResponse,
  Account,
  BeanData,
  DateMode,
  DataOptions,
} from "../interfaces";

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
export async function getLedgerYearAndMonth(): Promise<
  YearMonth[] | undefined
> {
  try {
    const response: AxiosResponse<{ data: YearMonth[] }> = await apiClient.get(
      "/api/ledger/distinct-year-months"
    );
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
    const response: AxiosResponse<{ configData: Config }> = await apiClient.get(
      "/api/beanfile-config/read"
    );
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
export async function saveConfig(
  beanFilePath: string,
  operatingCurrency: string
): Promise<SuccessResponse | undefined> {
  try {
    const response: AxiosResponse<{ message: string; status: number }> =
      await apiClient.post("/api/beanfile-config/set", {
        beanFilePath,
        operatingCurrency,
      });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 检查 bean 文件是否存在
 * @param {string} beanFilePath Bean 文件路径
 * @returns {Promise<boolean>} 是否存在的布尔值
 */
export async function checkBeanFileExist(
  beanFilePath: string
): Promise<boolean | undefined> {
  try {
    const response: AxiosResponse<{
      isBeanFileExist: boolean;
      message: string;
      status: number;
    }> = await apiClient.post("/api/beanfile/check", beanFilePath);
    return response.data.isBeanFileExist;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 获取账户数据
 * @param {Account} account 账户名称
 * @param {DateMode} range 时间范围
 * @param {DataOptions} options 数据选项
 * @returns {Promise<BeanData[]>} BeanData 数组
 */
export async function getData(
  account: Account,
  range: DateMode,
  options: DataOptions
): Promise<BeanData[] | undefined> {
  const params = objectToUrlParams(options);
  try {
    const response: AxiosResponse<{ data: BeanData[] }> = await apiClient.get(
      `/api/${account}/${range}?${params}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

function objectToUrlParams(option: Record<string, any>): string {
  const params = new URLSearchParams();
  for (const key in option) {
    if (Object.prototype.hasOwnProperty.call(option, key)) {
      params.append(key, option[key]);
    }
  }
  return params.toString();
}
