import { checkBeanFile, execBQL, getConfig } from "../utilities/utils.js";

interface YearMonth {
  year: number;
  month: number;
}

/**
 * 获取所有不同的年份和月份
 * @returns {YearMonth[]} 包含所有不同年份和月份的数组
 */
function getDistinctYearMonths(): YearMonth[] {
  // 读取配置文件中的 Beancount 文件路径
  const { beanFilePath } = getConfig();
  if (checkBeanFile(beanFilePath)) {
    // 构造 BQL 查询语句
    const bql = `SELECT DISTINCT year(date), month(date)`;

    // 执行查询
    const result = execBQL(beanFilePath, bql);

    // 处理查询结果
    const data = result.split(/\n|,/).splice(2);
    return data
      .map((item) => {
        const record = item.trim().split(/\s+|,/);
        if (record.length === 2) {
          return {
            year: parseInt(record[0], 10),
            month: parseInt(record[1], 10),
          };
        }
        return null;
      })
      .filter((r) => r) as YearMonth[];
  } else {
    throw new Error("beancount file is not exist");
  }
}


export { getDistinctYearMonths };
