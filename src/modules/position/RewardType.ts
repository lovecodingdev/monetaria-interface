export interface RewardType {
  asset: string;
  symbol: string;
  network: string;
  vAPY: number;
  tAPR: number;
  balance: number;
  profit_usd: number;
  claimable_tokens: number;
}
