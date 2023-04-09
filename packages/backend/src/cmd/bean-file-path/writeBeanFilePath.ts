import { getConfig, saveConfig } from "../utilities/utils.js";

/**
 * 修改配置文件中 beanFilePath
 * @param {string} filePath - 要写入的文件路径
 */
export const writeBeanFilePath = (filePath: string) => {
  const config = getConfig();
  config.beanFilePath = filePath;
  saveConfig(config);
};
