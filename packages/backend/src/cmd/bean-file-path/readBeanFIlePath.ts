import { getConfig } from "../utilities/utils.js";

/**
 * 读取配置文件中的 beanFilePath
 * @returns {string} 返回配置文件中的 beanFilePath
 */
export const readBeanFilePath = (): string => {
  const config = getConfig();
  return config.beanFilePath;
};
