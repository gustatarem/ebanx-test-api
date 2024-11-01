import TransactionService from "../src/service/TransactionService";
import IAccountRepository from "../src/interface/IAccountRepository";
import IAccount from "../src/interface/IAccount";

describe("TransactionService", () => {
  let accountRepository: jest.Mocked<IAccountRepository>;
  let transactionService: TransactionService;

  beforeEach(() => {
    accountRepository = {
      findOneById: jest.fn(),
      createAccount: jest.fn(),
      updateAccount: jest.fn(),
      reset: jest.fn(),
    };
    transactionService = new TransactionService(accountRepository);
  });

  describe("depositToAccount", () => {
    test("should deposit into an existing account", () => {
      const account: IAccount = { id: "100", balance: 10 };
      accountRepository.findOneById.mockReturnValue(account);

      const result = transactionService.depositToAccount("100", 10);

      expect(result).toEqual({ destination: { id: "100", balance: 20 } });
      expect(accountRepository.findOneById).toHaveBeenCalledWith("100");
      expect(accountRepository.updateAccount).toHaveBeenCalledWith({
        id: "100",
        balance: 20,
      });
    });

    test("should create a new account and deposit the amount into it", () => {
      accountRepository.findOneById
        .mockReturnValueOnce(undefined)
        .mockReturnValueOnce({ id: "101", balance: 0 });

      const result = transactionService.depositToAccount("101", 30);

      expect(result).toEqual({ destination: { id: "101", balance: 30 } });
      expect(accountRepository.createAccount).toHaveBeenCalledWith("101");
      expect(accountRepository.findOneById).toHaveBeenCalledWith("101");
      expect(accountRepository.updateAccount).toHaveBeenCalledWith({
        id: "101",
        balance: 30,
      });
    });

    test("should throw an error if account is not found after creation", () => {
      accountRepository.findOneById.mockReturnValue(undefined);

      expect(() => transactionService.depositToAccount("102", 30)).toThrow(
        "Account not found."
      );
      expect(accountRepository.createAccount).toHaveBeenCalledWith("102");
      expect(accountRepository.findOneById).toHaveBeenCalledWith("102");
    });
  });

  describe("withdrawFromAccount", () => {
    test("should withdraw from an existing account", () => {
      const account: IAccount = { id: "100", balance: 20 };
      accountRepository.findOneById.mockReturnValue(account);

      const result = transactionService.withdrawFromAccount("100", 10);

      expect(result).toEqual({ origin: { id: "100", balance: 10 } });
      expect(accountRepository.findOneById).toHaveBeenCalledWith("100");
      expect(accountRepository.updateAccount).toHaveBeenCalledWith({
        id: "100",
        balance: 10,
      });
    });

    test("should throw an error if account is not found", () => {
      accountRepository.findOneById.mockReturnValue(undefined);

      expect(() => transactionService.withdrawFromAccount("101", 10)).toThrow(
        "Account not found."
      );
      expect(accountRepository.findOneById).toHaveBeenCalledWith("101");
    });

    test("should throw an error if balance is insufficient", () => {
      const account: IAccount = { id: "100", balance: 10 };
      accountRepository.findOneById.mockReturnValue(account);

      expect(() => transactionService.withdrawFromAccount("100", 20)).toThrow(
        "You don't have enough balance to complete this trasnsaction."
      );
      expect(accountRepository.findOneById).toHaveBeenCalledWith("100");
    });
  });
});
