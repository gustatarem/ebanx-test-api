import { FastifyInstance } from "fastify";
import AccountRepository from "../repository/AccountRepository";
import AccountService from "../service/AccountService";
import AccountController from "../controller/AccountController";

const accountRepository = new AccountRepository();
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(accountService);

export async function balanceRoutes(fastify: FastifyInstance) {
  fastify.get("/balance", accountController.getBalance);
}
