import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getMonthExpensesData } from "../cmd/bean-query/getMonthData.js";

interface GetMonthExpenses {
  (
    request: FastifyRequest<{
      Querystring: { year: number; month: number; level: number };
    }>,
    reply: FastifyReply
  ): Promise<void>;
}

const getMonthExpenses: GetMonthExpenses = async function (request, reply) {
  try {
    const { year, month, level } = request.query;
    const expensesData = getMonthExpensesData(year, month, level);
    reply.send({ data: expensesData, message: "success", status: 1 });
  } catch (error) {
    reply.status(500).send({
      message: `An error occurred while fetching the month expenses data.${error}`,
      status: 0,
    });
  }
};

export default async function (fastify: FastifyInstance) {
  fastify.get("/expenses/month", getMonthExpenses);
}
