export interface Transaction {
  asset: string;
  symbol: string;
  network: string;
  type: string;
  amount: number;
  block: number;
  hash: string;
  date: string;
}
