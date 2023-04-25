import Fastify from "fastify";
import fastifyCors, { FastifyCorsOptions } from "@fastify/cors";

import readConfigAPI from "./api/readConfig.js";
import setConifgAPI from "./api/setConfig.js";
import getMonthExpensesAPI from "./api/getMonthExpenses.js";
import getDistinctYearMonthsAPI from "./api/getDistinctYearMonths.js";
import getMonthIncomeAPI from "./api/getMonthIncome.js";
import getYearExpensesAPI from "./api/getYearExpenses.js";
import getYearIncomeAPI from "./api/getYearIncome.js";
import checkBeanFile from "./api/validateBeanFile.js";

const fastify = Fastify({ logger: true });

fastify.register(readConfigAPI, { prefix: "/api" });
fastify.register(setConifgAPI, { prefix: "/api" });
fastify.register(getMonthExpensesAPI, { prefix: "/api" });
fastify.register(getMonthIncomeAPI, { prefix: "/api" });
fastify.register(getDistinctYearMonthsAPI, { prefix: "/api" });
fastify.register(getYearExpensesAPI, { prefix: "/api" });
fastify.register(getYearIncomeAPI, { prefix: "/api" });
fastify.register(checkBeanFile, { prefix: "/api" });
// Register the fastify-cors plugin
fastify.register(fastifyCors, {
  // Configure the allowed origins
  origin: (
    origin: string | undefined,
    cb: (err: Error | null, allow?: boolean) => void
  ) => {
    cb(null, true);
  },
} as FastifyCorsOptions);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
