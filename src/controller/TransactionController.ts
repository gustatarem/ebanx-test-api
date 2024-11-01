import { FastifyRequest, FastifyReply } from "fastify";
import TransactionService from "../service/TransactionService";

export default class TransactionController {
  private transactionService: TransactionService;

  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  handleEvent = async (request: FastifyRequest, reply: FastifyReply) => {
    const { type, origin, destination, amount } = request.body as {
      type: string;
      origin?: string;
      destination: string;
      amount: number;
    };

    try {
      let result;
      switch (type) {
        case "deposit":
          result = this.transactionService.depositToAccount(
            destination,
            amount
          );
          return reply.status(201).send(result);
        case "withdraw":
          if (!origin) {
            throw new Error(
              "Origin account is required for completing a withdraw."
            );
          }
          result = this.transactionService.withdrawFromAccount(origin, amount);
          return reply.status(201).send(result);
        case "transfer":
          if (!origin) {
            throw new Error(
              "Origin account is required for completing a transfer."
            );
          }
          result = this.transactionService.transfer(
            origin,
            destination,
            amount
          );
          return reply.status(201).send(result);
        default:
          throw new Error("Invalid event.");
      }
    } catch (error) {
      return reply.status(404).send("0");
    }
  };
}
