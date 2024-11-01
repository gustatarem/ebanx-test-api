import { FastifyInstance } from "fastify";
import AccountRepository from "../repository/AccountRepository";
import TransactionService from "../service/TransactionService";
import TransactionController from "../controller/TransactionController";

const accountRepository = new AccountRepository();
const transactionService = new TransactionService(accountRepository);
const transactionController = new TransactionController(transactionService);

export async function eventRoutes(fastify: FastifyInstance) {
  fastify.post("/event", transactionController.handleEvent);
}
