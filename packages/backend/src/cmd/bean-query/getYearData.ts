import { checkBeanFile, execBQL, getConfig } from "../utilities/utils.js";

interface YearData {
  year: string;
  month: string;
  account: string;
  amount: number;
  currency: string;
}

/**
 * 获取月数据
 * @param year - 年份
 * @param month - 月份
 * @param level - 层级
 * @param account - 账户
 * @returns 月数据
 */
function getYearData(year: number, account: string): YearData[] {
  const { beanFilePath, operatingCurrency } = getConfig();
  if (checkBeanFile(beanFilePath)) {
    const level = 1;
    // 构造 BQL 查询语句
    const bql = `SELECT year, month, root(account, ${level}) as subAccount, sum(convert(value(position), '${operatingCurrency}')) as total WHERE account ~ '${account}' and year = ${year} GROUP BY year, month, subAccount ORDER BY month ASC`;
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
      .filter((r) => r) as YearData[];
  } else {
    throw new Error("beancount file is not exist");
  }
}

function getYearExpensesData(year: number): YearData[] {
  try {
    return getYearData(year, "Expenses");
  } catch (error) {
    throw error;
  }
}

function getYearIncomeData(year: number): YearData[] {
  try {
    return getYearData(year, "Income");
  } catch (error) {
    throw error;
  }
}

export { getYearExpensesData, getYearIncomeData };
