import { FastifyInstance } from "fastify";

export async function eventRoutes(fastify: FastifyInstance) {
  fastify.post("/event", (req, res) => {
    return res.status(201).send({ event: "created" });
  });
}
