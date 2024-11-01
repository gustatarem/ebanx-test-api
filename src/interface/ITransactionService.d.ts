export interface ITransactionService {
  depositToAccount(
    accountId: string,
    amount: number
  ): { destination: { id: string; balance: number } };
  withdrawFromAccount(
    accountId: string,
    amount: number
  ): { origin: { id: string; balance: number } };
  transfer(
    originId: string,
    destinationId: string,
    amount: number
  ): {
    origin: { id: string; balance: number };
    destination: { id: string; balance: number };
  };
}
