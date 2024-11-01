import { FastifyInstance } from "fastify";
import AccountRepository from "../repository/AccountRepository";

const accountRepository = new AccountRepository();

export async function resetRoute(fastify: FastifyInstance) {
  fastify.post("/reset", (request, reply) => {
    accountRepository.reset();
    return reply.status(200).send("OK");
  });
}
