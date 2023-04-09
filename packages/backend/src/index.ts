import Fastify from "fastify";
import readbeanfileAPI from "./api/readBeanFIlePath.js";
import setBeanFilePathAPI from "./api/setBeanFilePath.js";
import getMonthExpensesAPI from "./api/getMonthExpenses.js";
import getDistinctYearMonthsAPI from "./api/getDistinctYearMonths.js";


const fastify = Fastify({ logger: true });

fastify.register(readbeanfileAPI, { prefix: "/api" });
fastify.register(setBeanFilePathAPI, { prefix: "/api" });
fastify.register(getMonthExpensesAPI, { prefix: "/api" });
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
