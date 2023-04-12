import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, "../../", "config", "config.json");

interface Config {
  /** beancount 主文件路径 */
  beanFilePath: string;
  /** 货币单位 */
  operatingCurrency?: string;
}

/**
 * 读取配置文件
 * @returns {Config} 配置对象
 */

export const getConfig = (): Config => {
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
};


/**
 * 保存配置文件
 * @param {Config} config 配置对象
 */

export const saveConfig = (config: Config): void => {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
};

/**
 * 执行 bean-query 命令
 * @param {string} beanFilePath - bean 文件路径
 * @param {string} bql - bean-query 语句
 * @returns {string} - 执行结果
 */
export function execBQL(beanFilePath: string, bql: string): string {
  const cmd = `bean-query ${beanFilePath} "${bql}"`;
  const result = execSync(cmd).toString();
  return result;
}
