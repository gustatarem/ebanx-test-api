import ITransactionService from "../interface/ITransactionservice";
import AccountRepository from "../repository/AccountRepository";

export default class TransactionService implements ITransactionService {
  private accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  depositToAccount(
    accountId: string,
    amount: number
  ): { destination: { id: string; balance: number } } {
    const account = this.accountRepository.findOneById(accountId);
    account.balance += amount;
    this.accountRepository.updateAccount(account);
    return { destination: account };
  }

  withdrawFromAccount(
    accountId: string,
    amount: number
  ): { origin: { id: string; balance: number } } {
    const account = this.accountRepository.findOneById(accountId);
    if (account.balance < amount) {
      throw new Error(
        "You don't have enough balance to complete this trasnsaction."
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
