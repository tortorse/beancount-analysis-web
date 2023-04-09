import getYearExpenses from "../cmd/year.js";
export async function getYear(fastify) {
  fastify.post("/year", async (request, reply) => {
    try {
      const expenses = getYearExpenses();
      reply.send({
        status: "success",
        data: expenses,
      });
    } catch (error) {
      reply.status(500).send({ status: "error", message: error });
    }
  });
}
