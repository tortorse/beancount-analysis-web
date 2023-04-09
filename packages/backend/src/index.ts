import Fastify from "fastify";
import beanfileAPI from "./api/readBeanFIlePath.js";
import setBeanFilePathAPI from "./api/setBeanFilePath.js";

const fastify = Fastify({ logger: true });

fastify.register(beanfileAPI, { prefix: "/api" });
fastify.register(setBeanFilePathAPI, { prefix: "/api" });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
