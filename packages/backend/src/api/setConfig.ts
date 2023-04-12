import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { saveConfig } from "../cmd/utilities/utils.js";

interface SetConfigBody {
  beanFilePath: string;
  operatingCurrency?: string;
}

interface SetConfig {
  (
    request: FastifyRequest<{
      Body: SetConfigBody;
    }>,
    reply: FastifyReply
  ): Promise<void>;
}

const setBeanFilePath: SetConfig = async function (request, reply) {
  try {
    saveConfig(request.body);
    reply.send({ message: "Bean file path successfully updated.", status: 1 });
  } catch (error) {
    reply.status(500).send({
      message: "An error occurred while updating the bean file path.",
      status: 0,
    });
  }
};

export default async function (fastify: FastifyInstance) {
  fastify.post("/beanfile-config/set", setBeanFilePath);
}
