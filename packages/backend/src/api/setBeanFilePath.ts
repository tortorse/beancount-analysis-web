import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { writeBeanFilePath } from "../cmd/bean-file-path/writeBeanFilePath.js";

interface SetBeanFilePathBody {
  beanFilePath: string;
}

interface SetBeanFilePath {
  (
    request: FastifyRequest<{
      Body: SetBeanFilePathBody;
    }>,
    reply: FastifyReply
  ): Promise<void>;
}

const setBeanFilePath: SetBeanFilePath = async function (request, reply) {
  try {
    writeBeanFilePath(request.body.beanFilePath);
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
