import IAccount from "../interface/IAccount";
import IAccountRepository from "../interface/IAccountRepository";

export let accounts = [] as IAccount[];

export default class AccountRepository implements IAccountRepository {
  findOneById(accountId: string): IAccount | undefined {
    const account = accounts.find((account) => account.id === accountId);

    return account;
  }

  createAccount(accountId: string) {
    accounts.push({ id: accountId, balance: 0 });
  }

  updateAccount(account: IAccount) {
    const index = accounts.findIndex((acc) => acc.id === account.id);
    accounts[index] = account;
  }

  reset() {
    if (accounts.length > 0) {
      accounts = [];
    }
  }
}
