import getYearExpenses from "../cmd/get-year-expenses.js";
export async function getYearData(fastify) {
  fastify.post("/year", async (request, reply) => {
    try {
      const expenses = getYearExpenses();
      reply.send(expenses);
    } catch (error) {
      reply.status(500).send(error);
    }
  });
}
