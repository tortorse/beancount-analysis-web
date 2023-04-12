import Fastify from "fastify";
import readConfigAPI from "./api/readConfig.js";
import setConifgAPI from "./api/setConfig.js";
import getMonthExpensesAPI from "./api/getMonthExpenses.js";
import getDistinctYearMonthsAPI from "./api/getDistinctYearMonths.js";
import getMonthIncomeAPI from './api/getMonthIncome.js'


const fastify = Fastify({ logger: true });

fastify.register(readConfigAPI, { prefix: "/api" });
fastify.register(setConifgAPI, { prefix: "/api" });
fastify.register(getMonthExpensesAPI, { prefix: "/api" });
fastify.register(getMonthIncomeAPI, { prefix: "/api" });
fastify.register(getDistinctYearMonthsAPI, { prefix: "/api" });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
