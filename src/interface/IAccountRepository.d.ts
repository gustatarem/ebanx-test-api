export default interface IAccountRepository {
  findOneById(accountId: string): { id: string; balance: number } | undefined;
  createAccount(accountId: string): void;
  updateAccount(account: { id: string; balance: number }): void;
  reset(): void;
}
