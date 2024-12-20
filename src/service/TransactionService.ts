import IAccountRepository from "../interface/IAccountRepository";
import ITransactionService from "../interface/ITransactionService";

export default class TransactionService implements ITransactionService {
  private accountRepository: IAccountRepository;

  constructor(accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository;
  }

  depositToAccount(
    accountId: string,
    amount: number
  ): { destination: { id: string; balance: number } } {
    let account = this.accountRepository.findOneById(accountId);

    if (account === undefined) {
      this.accountRepository.createAccount(accountId);
      account = this.accountRepository.findOneById(accountId);
    }

    if (!account) {
      throw new Error("Account not found.");
    }

    account.balance += amount;
    this.accountRepository.updateAccount(account);
    return { destination: account };
  }

  withdrawFromAccount(
    accountId: string,
    amount: number
  ): { origin: { id: string; balance: number } } {
    const account = this.accountRepository.findOneById(accountId);

    if (!account) {
      throw new Error("Account not found.");
    }

    if (account.balance < amount) {
      throw new Error(
        "You don't have enough balance to complete this transaction."
      );
    }
    account.balance -= amount;
    this.accountRepository.updateAccount(account);
    return { origin: account };
  }

  transfer(
    originId: string,
    destinationId: string,
    amount: number
  ): {
    origin: { id: string; balance: number };
    destination: { id: string; balance: number };
  } {
    const { origin } = this.withdrawFromAccount(originId, amount);
    const { destination } = this.depositToAccount(destinationId, amount);
    return { origin, destination };
  }
}
