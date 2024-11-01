import { FastifyInstance } from "fastify";

export async function balanceRoutes(fastify: FastifyInstance) {
  fastify.get("/balance", (req, res) => {
    return res.status(200).send(20);
  });
}
