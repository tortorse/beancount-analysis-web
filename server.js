import Fastify from "fastify";
import Static from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import { setPath } from "./apis/set-path.js";
import { getMonthData } from "./apis/month.js";
import { uiSetPath } from "./ui/ui.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });
fastify.register(setPath);
fastify.register(getMonthData);
fastify.register(Static, {
  root: path.join(__dirname, "public"),
  prefix: "/public/", // optional: default '/'
});

fastify.register(uiSetPath);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
