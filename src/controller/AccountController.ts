import { FastifyRequest, FastifyReply } from "fastify";
import IAccountService from "../interface/IAccountService";

export default class AccountController {
  private accountService: IAccountService;

  constructor(accountService: IAccountService) {
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
