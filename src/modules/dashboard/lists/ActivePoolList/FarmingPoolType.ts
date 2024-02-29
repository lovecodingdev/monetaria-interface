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

export interface borrowing_interest_type {
  label: string;
  value: string;
  token_value: number;
}

export interface BorrowingInterestType {
  key: string,
  sourceName: string,
  symbol: string,
  interestPercent: number,
  interestPercentAt2XLeverage: number,
  maxLeverage: number
}

export interface TokenType {
  address: string,
  symbol: string
}

export interface WorkingTokenType {
  address: string,
  symbol: string,
  tokenA: TokenType,
  tokenB: TokenType
}

export interface WorkerType {
  key: string,
  sourceName: string,
  workerAddress: string,
  baseToken: TokenType,
  baseTokenAmount: number,
  farmToken: TokenType,
  farmTokenAmount: number,
  tvl: number
}

export interface FarmingPoolType {
  key: string,
  sourceName: string,
  tvl: number,
  tvlInMasterChef: number,
  farmRewardApr: number,
  alpacaRewardApr: number,
  tradingFeeApr: number,
  farmRewardValuePerYear: number,
  borrowingInterestPercent: number,
  borrowingInterestSourceName: string,
  borrowingInterests: BorrowingInterestType[],
  featureRewardApr: number,
  featureRewardAprAt2x: number,
  leverage: number,
  totalApr: number,
  totalApy: number,
  dailyTotalApr: number,
  openPositionUrl: string,
  workingToken: WorkingTokenType,
  workers: WorkerType[]
}
