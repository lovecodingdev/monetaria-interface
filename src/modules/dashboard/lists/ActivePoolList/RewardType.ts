export interface RewardType {
  asset: string;
  symbol: string;
  protocol: string;
  tvl: string;
  apy: number;
  apr: {
    yield_farming: number;
    trading_fees: number;
    alpaca_rewards: number;
    borrowing_interest: borrowing_interest_type[];
    total_apr: number;
    daily_apr: number;
  };
  leverage: number;
  isShowMore: boolean;
}

interface borrowing_interest_type {
  label: string;
  value: string;
  token_value: number;
}
