import { FastifyRequest, FastifyReply } from "fastify";
import IAccountService from "../interface/IAccountService";

export default class AccountController {
  private accountService: IAccountService;

  constructor(accountService: IAccountService) {
    this.accountService = accountService;
  }

  getBalance = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { account_id } = request.query as { account_id: string };

      const balance = this.accountService.getBalance(account_id);

      if (balance === 0) {
        return reply.status(404).send(0);
      }

      reply.status(200).send(balance.toString());
    } catch (error) {
      return reply.status(404).send("0");
    }
  };
}
