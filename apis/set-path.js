import { writeConfig } from "../cmd/config.js";

/**
 * 该函数用于写入配置文件
 * @param {Object} fastify - fastify实例
 */
export async function setPath(fastify) {
  fastify.post("/write-config", async (request, reply) => {
    try {
      const { path } = request.body;
      writeConfig(path);
      reply.send({ status: "success" });
    } catch (error) {
      reply.send({ status: "error", message: error.message });
    }
  });
}
