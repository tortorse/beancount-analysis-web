import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getYearIncomeData } from "../cmd/bean-query/getYearData.js";

interface GetYearIncome {
  (
    request: FastifyRequest<{
      Querystring: { year: number };
    }>,
    reply: FastifyReply
  ): Promise<void>;
}

const GetYearIncome: GetYearIncome = async function (request, reply) {
  try {
    const { year } = request.query;
    const incomeData = getYearIncomeData(year);
    reply.send({ data: incomeData, count: 12, message: "success", status: 1 });
  } catch (error) {
    reply.status(500).send({
      message: `An error occurred while fetching the year income data.${error}`,
      status: 0,
    });
  }
};

export default async function (fastify: FastifyInstance) {
  fastify.get("/income/year", GetYearIncome);
}
