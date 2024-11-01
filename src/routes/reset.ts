import { FastifyInstance } from "fastify";

export async function resetRoute(fastify: FastifyInstance) {
  fastify.post("/reset", (req, res) => {
    return res.status(200).send("OK");
  });
}
