const { execSync } = require("child_process");
const beanFilePath = `/Users/tortorse/Library/CloudStorage/Dropbox/my-ledger/main.bean`;
const bql = `SELECT year, month, SUM(position) AS total WHERE account ~ 'Expenses' GROUP BY year, month;`;
const beanQueryCmd = `bean-query ${beanFilePath} "${bql}"`;
const result = execSync(beanQueryCmd).toString();
// console.log(result);
const resultSet = result.split(/\n|,/).splice(2);

resultSet.map((record) => {
  console.log(record.trim().split(/\s+|,/));
});
