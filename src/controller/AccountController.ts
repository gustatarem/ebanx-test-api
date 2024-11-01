import { FastifyRequest, FastifyReply } from "fastify";
import AccountService from "../service/AccountService";

export default class AccountController {
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  getBalance = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { accountId } = request.query as { accountId: string };

      const balance = this.accountService.getBalance(accountId);

      if (balance === 0) {
        return reply.status(404).send(0);
      }

      reply.status(200).send(balance.toString());
    } catch (error) {
      return reply.status(404).send("0");
    }
  };
}
