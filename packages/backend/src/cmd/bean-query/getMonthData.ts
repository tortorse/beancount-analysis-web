import { execBQL, getConfig } from "../utilities/utils.js";

interface MonthData {
  year: string;
  month: string;
  account: string;
  amount: number;
  currency: string;
}

/**
 * 获取月数据
 * @returns
 */
function getMonthData(
  year: number,
  month: number,
  level: number,
  account: string
): MonthData[] {
  const { beanFilePath, operatingCurrency } = getConfig();
  // 构造 BQL 查询语句
  const bql = `SELECT year, month, root(account, ${level}) as subAccount, sum(convert(value(position), '${operatingCurrency}')) as total WHERE account ~ '${account}' and year = ${year} and month = ${month} GROUP BY year, month, subAccount ORDER BY total DESC`;
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
          amount: Math.abs(Number(record[3])),
          currency: record[4],
        };
      }
      return null;
    })
    .filter((r) => r) as MonthData[];
}

function getMonthExpensesData(
  year: number,
  month: number,
  level: number
): MonthData[] {
  return getMonthData(year, month, level, "Expenses");
}

function getMonthIncomeData(
  year: number,
  month: number,
  level: number
): MonthData[] {
  return getMonthData(year, month, level, "Income");
}

export { getMonthExpensesData, getMonthIncomeData };
