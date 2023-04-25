import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { checkBeanFile, getConfig } from "../cmd/utilities/utils.js";

/**
 * 校验 bean 文件是否存在
 * @param {FastifyRequest} request - 请求对象
 * @param {FastifyReply} reply - 响应对象
 * @returns {Promise<void>}
 */
const validateBeanFile = async function (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const beanfilePath = request.body as string;
    if (!beanfilePath) {
      throw new Error("Missing required parameter: beanFilePath");
    }
    const isBeanFileExist = checkBeanFile(beanfilePath);
    reply.send({ isBeanFileExist, message: "success", status: 1 });
  } catch (error) {
    reply.status(500).send({
      message: `An error occurred while fetching the bean file path.${error}`,
      status: 0,
    });
  }
};


/**
 * 注册校验 bean 文件是否存在的路由
 * @param {FastifyInstance} fastify - Fastify 实例
 * @returns {Promise<void>}
 */
export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.post("/beanfile/check", validateBeanFile);
}
