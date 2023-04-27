import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getMonthIncomeData } from "../cmd/bean-query/getMonthData.js";
import dayjs from "dayjs";
interface GetMonthIncome {
  (
    request: FastifyRequest<{
      Querystring: { year: number; month: number; level: number };
    }>,
    reply: FastifyReply
  ): Promise<void>;
}

const GetMonthIncome: GetMonthIncome = async function (request, reply) {
  try {
    const { year, month, level } = request.query;
    const incomeData = getMonthIncomeData(year, month, level);
    reply.send({
      data: incomeData,
      count: dayjs(`${year}-${month}`).daysInMonth(),
      message: "success",
      status: 1,
    });
  } catch (error) {
    reply.status(500).send({
      message: `An error occurred while fetching the month income data.${error}`,
      status: 0,
    });
  }
};

export default async function (fastify: FastifyInstance) {
  fastify.get("/income/month", GetMonthIncome);
}
