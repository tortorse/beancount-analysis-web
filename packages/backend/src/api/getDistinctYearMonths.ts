// src/api/getDistinctYearMonths.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getDistinctYearMonths } from "../cmd/bean-query/getDistinctYearMonths.js";

interface GetDistinctYearMonths {
  (request: FastifyRequest, reply: FastifyReply): Promise<void>;
}

const getDistinctYearMonthsHandler: GetDistinctYearMonths = async function (
  request,
  reply
) {
  try {
    const yearMonths = getDistinctYearMonths();
    reply.send({ data: yearMonths, message: "success", status: 1 });
  } catch (error) {
    reply.status(500).send({
      message: `An error occurred while fetching the distinct year and month value.${error}`,
      status: 0,
    });
  }
};

export default async function (fastify: FastifyInstance) {
  fastify.get("/ledger/distinct-year-months", getDistinctYearMonthsHandler);
}
