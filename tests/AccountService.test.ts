import AccountService from "../src/service/AccountService";
import IAccountRepository from "../src/interface/IAccountRepository";
import IAccount from "../src/interface/IAccount";

describe("AccountService", () => {
  let accountRepository: jest.Mocked<IAccountRepository>;
  let accountService: AccountService;

  beforeEach(() => {
    accountRepository = {
      findOneById: jest.fn(),
      createAccount: jest.fn(),
      updateAccount: jest.fn(),
      reset: jest.fn(),
    };
    accountService = new AccountService(accountRepository);
  });

  it("should return the balance for an existing account", () => {
    const account: IAccount = { id: "100", balance: 10 };
    accountRepository.findOneById.mockReturnValue(account);

    const balance = accountService.getBalance("100");

    expect(balance).toBe(10);
    expect(accountRepository.findOneById).toHaveBeenCalledWith("100");
  });

  it("should throw an error if the account does not exist", () => {
    accountRepository.findOneById.mockReturnValue(undefined);

    expect(() => accountService.getBalance("10")).toThrow("Account not found.");
    expect(accountRepository.findOneById).toHaveBeenCalledWith("10");
  });
});
