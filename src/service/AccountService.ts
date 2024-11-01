import IAccountRepository from "../interface/IAccountRepository";
import IAccountService from "../interface/IAccountService";

export default class AccountService implements IAccountService {
  private accountRepository: IAccountRepository;

  constructor(accountRepository: IAccountRepository) {
    this.accountRepository = accountRepository;
  }

  getBalance(accountId: string): number {
    const account = this.accountRepository.findOneById(accountId);

    if (!account) {
      throw new Error("Account not found.");
    }

    return account.balance;
  }
}
