import { ReserveIncentiveResponse } from '../../../../hooks/app-data-provider/useIncentiveData';
import { InterestRate } from '@monetaria/contract-helpers';

export type SupplyAssetsItem = {
  underlyingAsset: string;
  symbol: string;
  iconSymbol: string;
  name: string;
  walletBalance: string;
  walletBalanceUSD: string;
  availableToDeposit: string;
  availableToDepositUSD: string;
  supplyAPY: number | string;
  aIncentivesData?: ReserveIncentiveResponse[];
  isFreezed?: boolean;
  isIsolated: boolean;
  totalLiquidity: string;
  supplyCap: string;
  isActive?: boolean;
  usageAsCollateralEnabledOnUser: boolean;
  detailsAddress: string;
  underlyingBalance: string;
  underlyingBalanceUSD: string;
  variableBorrows: string;
  variableBorrowsUSD: string;
  stableBorrows: string;
  stableBorrowsUSD: string;
  borrowRateMode: InterestRate;
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
  variableBorrowAPY: string;
  stableBorrowAPY: string;
  vIncentivesData?: ReserveIncentiveResponse[];
  sIncentivesData?: ReserveIncentiveResponse[];
  availableBorrows: number | string,
  availableBorrowsInUSD: number | string,
  borrowCap: string,
  totalBorrows: string,
};
