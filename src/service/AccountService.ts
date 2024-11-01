import IAccountService from "../interface/IAccountService";
import AccountRepository from "../repository/AccountRepository";

export default class AccountService implements IAccountService {
  private accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  getBalance(accountId: string): number {
    const account = this.accountRepository.findOneById(accountId);

    return account.balance;
  }
}
