import { FastifyRequest, FastifyReply } from "fastify";
import AccountController from "../src/controller/AccountController";
import IAccountService from "../src/interface/IAccountService";

describe("AccountController", () => {
  let accountService: jest.Mocked<IAccountService>;
  let accountController: AccountController;
  let request: Partial<FastifyRequest>;
  let reply: Partial<FastifyReply>;

  beforeEach(() => {
    accountService = {
      getBalance: jest.fn(),
    };
    accountController = new AccountController(accountService);
    request = {};
    reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should return status code 404 if the account does not exist", async () => {
    request.query = { account_id: "999" };
    accountService.getBalance.mockImplementation(() => {
      throw new Error("Account not found.");
    });

    await accountController.getBalance(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(accountService.getBalance).toHaveBeenCalledWith("999");
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith("0");
  });

  it("should return status code 200 and the balance for an existing account", async () => {
    request.query = { account_id: "100" };
    accountService.getBalance.mockReturnValue(20);

    await accountController.getBalance(
      request as FastifyRequest,
      reply as FastifyReply
    );

    expect(accountService.getBalance).toHaveBeenCalledWith("100");
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith("20");
  });
});
