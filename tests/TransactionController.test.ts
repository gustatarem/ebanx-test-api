import { FastifyRequest, FastifyReply } from "fastify";
import TransactionController from "../src/controller/TransactionController";
import ITransactionService from "../src/interface/ITransactionService";

describe("TransactionController", () => {
  let transactionService: jest.Mocked<ITransactionService>;
  let transactionController: TransactionController;
  let request: Partial<FastifyRequest>;
  let reply: Partial<FastifyReply>;

  beforeEach(() => {
    transactionService = {
      depositToAccount: jest.fn(),
      withdrawFromAccount: jest.fn(),
      transfer: jest.fn(),
    };
    transactionController = new TransactionController(transactionService);
    request = {};
    reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should deposit the amount to an account", async () => {
    request.body = { type: "deposit", destination: "100", amount: 20 };
    transactionService.depositToAccount.mockReturnValue({
      destination: { id: "100", balance: 20 },
    });

    await transactionController.handleEvent(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(transactionService.depositToAccount).toHaveBeenCalledWith("100", 20);
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({
      destination: { id: "100", balance: 20 },
    });
  });

  it("should withdraw from an existing account", async () => {
    const account = { id: "100", balance: 10 };
    transactionService.withdrawFromAccount.mockReturnValue({
      origin: { id: "100", balance: 5 },
    });

    request.body = { type: "withdraw", origin: "100", amount: 5 };

    await transactionController.handleEvent(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(transactionService.withdrawFromAccount).toHaveBeenCalledWith(
      "100",
      5
    );
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({
      origin: { id: "100", balance: 5 },
    });
  });

  it("should not withdraw from a non existent account", async () => {
    const account = { id: "100", balance: 10 };
    transactionService.withdrawFromAccount.mockImplementation(() => {
      throw new Error("Account not found.");
    });

    request.body = { type: "withdraw", origin: "999", amount: 5 };

    await transactionController.handleEvent(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(transactionService.withdrawFromAccount).toHaveBeenCalledWith(
      "999",
      5
    );
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith("0");
  });

  it("should transfer from an account to another", async () => {
    const originAccount = { id: "100", balance: 50 };

    request.body = {
      type: "transfer",
      origin: "100",
      destination: "200",
      amount: 30,
    };

    transactionService.transfer.mockReturnValue({
      origin: { id: "100", balance: 20 },
      destination: { id: "200", balance: 30 },
    });

    await transactionController.handleEvent(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(transactionService.transfer).toHaveBeenCalledWith("100", "200", 30);
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({
      origin: { id: "100", balance: 20 },
      destination: { id: "200", balance: 30 },
    });
  });

  it("should not transfer from an non existent account", async () => {
    request.body = {
      type: "transfer",
      origin: "999",
      destination: "200",
      amount: 30,
    };

    transactionService.transfer.mockImplementation(() => {
      throw new Error("Account not found.");
    });

    await transactionController.handleEvent(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(transactionService.transfer).toHaveBeenCalledWith("999", "200", 30);
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith("0");
  });

  test("should return 404 for invalid event type", async () => {
    request.body = { type: "invalid", destination: "100", amount: 50 };

    await transactionController.handleEvent(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith("0");
  });
});
