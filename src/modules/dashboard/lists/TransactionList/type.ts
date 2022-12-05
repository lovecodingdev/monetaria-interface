export interface TransactionListValidator {
  asset: string;
  symbol: string;
  network: string;
  type: string;
  amount: number;
  block: string;
  hash_id: string;
  date: string;
}
