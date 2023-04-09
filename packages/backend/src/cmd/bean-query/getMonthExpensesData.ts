// src/cmd/bean-query/getMonthExpensesData.ts
import { readBeanFilePath } from "../bean-file-path/readBeanFIlePath.js";
import { execBQL } from "../utilities/utils.js";

// 读取配置文件中的 Beancount 文件路径
const beanFilePath = readBeanFilePath();

interface MonthExpenseData {
  year: string;
  month: string;
  account: string;
  amount: number;
  currency: string;
}

/**
 * 获取月消费数据分布
 * @returns
 */
function getMonthExpensesData(year: number, month: number): MonthExpenseData[] {
  // 构造 BQL 查询语句
  const bql = `SELECT year, month, account, sum(cost(position)) as total WHERE account ~ 'Expenses:' and year = ${year} and month = ${month} GROUP BY year,month, account ORDER BY total, account DESC`;

  // 执行查询
  const result = execBQL(beanFilePath, bql);

  // 处理查询结果
  const data = result.split(/\n|,/).splice(2);
  return data
    .map((item) => {
      const record = item.trim().split(/\s+|,/);
      if (record.length === 5) {
        return {
          year: record[0],
          month: record[1],
          account: record[2],
          amount: Number(record[3]),
          currency: record[4],
        };
      }
      return null;
    })
    .filter((r) => r) as MonthExpenseData[];
}

export { getMonthExpensesData };
