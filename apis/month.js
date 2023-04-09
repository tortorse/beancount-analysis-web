import { getMonthExpensesData } from "../cmd/get-month-expenses.js";
export async function getMonthData(fastify) {
  fastify.get("/api/month", async (request, reply) => {
    try {
      const { year, month } = request.query;
      const expenses = getMonthExpensesData(year, month);
      reply.send({
        status: "success",
        data: expenses,
      });
    } catch (error) {
      reply.status(500).send({ status: "error", message: error });
    }
  });
}
