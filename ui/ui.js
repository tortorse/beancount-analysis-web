export async function uiSetPath(fastify) {
  fastify.get("/", function (request, reply) {
    reply.sendFile("index.html");
  });

  fastify.get("/js/index.js", function (request, reply) {
    reply.sendFile("js/index.js");
  });

  fastify.get("/statistic", function (request, reply) {
    reply.sendFile("statistic.html");
  });

  fastify.get("/js/statistic.js", function (request, reply) {
    reply.sendFile("js/statistic.js");
  });
}
