import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getYearExpensesData } from "../cmd/bean-query/getYearData.js";

interface GetYearExpenses {
  (
    request: FastifyRequest<{
      Querystring: { year: number };
    }>,
    reply: FastifyReply
  ): Promise<void>;
}

const GetYearExpenses: GetYearExpenses = async function (request, reply) {
  try {
    const { year } = request.query;
    const incomeData = getYearExpensesData(year);
    reply.send({ data: incomeData, count: 12, message: "success", status: 1 });
  } catch (error) {
    reply.status(500).send({
      message: `An error occurred while fetching the year expenses data.${error}`,
      status: 0,
    });
  }
};

export default async function (fastify: FastifyInstance) {
  fastify.get("/expenses/year", GetYearExpenses);
}
