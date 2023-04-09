// src/cmd/bean-query/getDistinctYearMonths.ts
import { readBeanFilePath } from "../bean-file-path/readBeanFIlePath.js";
import { execBQL } from "../utilities/utils.js";

interface YearMonth {
  year: number;
  month: number;
}

/**
 * 获取所有不同的年份和月份
 * @returns
 */
function getDistinctYearMonths(): YearMonth[] {
  // 读取配置文件中的 Beancount 文件路径
  const beanFilePath = readBeanFilePath();
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
}

export { getDistinctYearMonths };
