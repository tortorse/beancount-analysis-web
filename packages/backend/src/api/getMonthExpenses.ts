import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getMonthExpensesData } from "../cmd/bean-query/getMonthExpensesData.js";

interface GetMonthExpenses {
  (
    request: FastifyRequest<{ Querystring: { year: number; month: number } }>,
    reply: FastifyReply
  ): Promise<void>;
}

const getMonthExpenses: GetMonthExpenses = async function (request, reply) {
  try {
    const { year, month } = request.query;
    const expensesData = getMonthExpensesData(year, month);
    reply.send({ data: expensesData, message: "success", status: 1 });
  } catch (error) {
    reply.status(500).send({
      message: "An error occurred while fetching the month expenses data.",
      status: 0,
    });
  }
};

export default async function (fastify: FastifyInstance) {
  fastify.get("/expenses/month", getMonthExpenses);
}
