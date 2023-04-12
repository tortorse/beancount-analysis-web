import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getConfig } from "../cmd/utilities/utils.js";

/**
 * 获取 bean 文件路径
 * @param request 请求对象
 * @param reply 响应对象
 */
interface GetBeanFilePath {
  (request: FastifyRequest, reply: FastifyReply): Promise<void>;
}

/**
 * 获取 bean 文件路径
 * @param request 请求对象
 * @param reply 响应对象
 */
const getBeanFilePath: GetBeanFilePath = async function (request, reply) {
  try {
    const { beanFilePath } = getConfig();
    reply.send({ data: beanFilePath, message: "success", status: 1 });
  } catch (error) {
    reply.status(500).send({
      message: "An error occurred while fetching the bean file path.",
      status: 0,
    });
  }
};

export default async function (fastify: FastifyInstance) {
  fastify.get("/beanfile-config/read", getBeanFilePath);
}
