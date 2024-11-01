import IAccount from "../interface/IAccount";

export const accounts = [] as IAccount[];

export default class AccountRepository {
  findOneById(accountId: string): IAccount {
    const account = accounts.find((account) => account.id === accountId);

    if (!account) {
      throw new Error(`Account with id ${accountId} not found`);
    }

    return account;
  }

  createAccount(accountId: string) {
    accounts.push({ id: accountId, balance: 0 });
  }
}
