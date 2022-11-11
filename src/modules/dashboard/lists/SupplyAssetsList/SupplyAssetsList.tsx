import { API_ETH_MOCK_ADDRESS, InterestRate } from '@monetaria/contract-helpers';
import { USD_DECIMALS, valueToBigNumber } from '@monetaria/math-utils';
import { Trans } from '@lingui/macro';
import { Alert, Box, useMediaQuery, useTheme } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { fetchIconSymbolAndName } from 'src/ui-config/reservePatches';

import { ListWrapper } from '../../../../components/lists/ListWrapper';
import { Link, ROUTES } from '../../../../components/primitives/Link';
import {
  ComputedReserveData,
  useAppDataContext,
} from '../../../../hooks/app-data-provider/useAppDataProvider';
import { useWalletBalances } from '../../../../hooks/app-data-provider/useWalletBalances';
import { useProtocolDataContext } from '../../../../hooks/useProtocolDataContext';
import { DashboardListTopPanel } from '../../DashboardListTopPanel';
import {
  assetCanBeBorrowedByUser,
  getMaxAmountAvailableToBorrow,
} from 'src/utils/getMaxAmountAvailableToBorrow';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { StableAPYTooltip } from 'src/components/infoTooltips/StableAPYTooltip';
import { AvailableTooltip } from 'src/components/infoTooltips/AvailableTooltip';
import { CapType } from 'src/components/caps/helper';
import { ListHeader } from '../ListHeader';
import { ListLoader } from '../ListLoader';
import { SupplyAssetsListItem } from './SupplyAssetsListItem';
import { SupplyAssetsListMobileItem } from './SupplyAssetsListMobileItem';
import { BorrowAssetsListItem } from '../BorrowAssetsList/BorrowAssetsListItem';
import { BorrowAssetsListMobileItem } from '../BorrowAssetsList/BorrowAssetsListMobileItem';
import { BorrowAssetsItem } from '../BorrowAssetsList/types';

export const SupplyAssetsList = () => {
  const { currentNetworkConfig } = useProtocolDataContext();
  const {
    user,
    reserves,
    marketReferencePriceInUsd,
    loading: loadingReserves,
  } = useAppDataContext();
  const { walletBalances, loading } = useWalletBalances();
  const theme = useTheme();
  const downToLG = useMediaQuery(theme.breakpoints.down('lg'));
  const downToMD = useMediaQuery(theme.breakpoints.down('md'));
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  const { bridge, isTestnet, baseAssetSymbol, name: networkName } = currentNetworkConfig;

  const localStorageName = 'showSupplyZeroAssets';
  const [isShowZeroAssets, setIsShowZeroAssets] = useState(
    localStorage.getItem(localStorageName) === 'true'
  );
  const [search, setSearch] = useState('');

  const tokensToSupply = reserves
    .filter((reserve: ComputedReserveData) => !reserve.isFrozen)
    .map((reserve: ComputedReserveData) => {
      const walletBalance = walletBalances[reserve.underlyingAsset]?.amount;
      const walletBalanceUSD = walletBalances[reserve.underlyingAsset]?.amountUSD;

      let availableToDeposit = valueToBigNumber(walletBalance);
      if (reserve.supplyCap !== '0') {
        availableToDeposit = BigNumber.min(
          availableToDeposit,
          new BigNumber(reserve.supplyCap).minus(reserve.totalLiquidity).multipliedBy('0.995')
        );
      }
      const availableToDepositUSD = valueToBigNumber(availableToDeposit)
        .multipliedBy(reserve.priceInMarketReferenceCurrency)
        .multipliedBy(marketReferencePriceInUsd)
        .shiftedBy(-USD_DECIMALS)
        .toString();

      const availableBorrows = user
        ? getMaxAmountAvailableToBorrow(reserve, user, InterestRate.Variable).toNumber()
        : 0;

      const availableBorrowsInUSD = valueToBigNumber(availableBorrows)
        .multipliedBy(reserve.formattedPriceInMarketReferenceCurrency)
        .multipliedBy(marketReferencePriceInUsd)
        .shiftedBy(-USD_DECIMALS)
        .toFixed(2);

      const isIsolated = reserve.isIsolated;
      const hasDifferentCollateral = user?.userReservesData.find(
        (userRes) => userRes.usageAsCollateralEnabledOnUser && userRes.reserve.id !== reserve.id
      );

      const usageAsCollateralEnabledOnUser = !user?.isInIsolationMode
        ? reserve.usageAsCollateralEnabled &&
          (!isIsolated || (isIsolated && !hasDifferentCollateral))
        : !isIsolated
        ? false
        : !hasDifferentCollateral;

      const userRes = user?.userReservesData.find((userRes) => userRes.reserve.id === reserve.id);
      const userData = {
        underlyingBalance: userRes?.underlyingBalance || '0',
        underlyingBalanceUSD: userRes?.underlyingBalanceUSD || '0',
        variableBorrows: userRes?.variableBorrows || '0',
        variableBorrowsUSD: userRes?.variableBorrowsUSD || '0',
        stableBorrows: userRes?.stableBorrows || '0',
        stableBorrowsUSD: userRes?.stableBorrowsUSD || '0',
        borrowRateMode:
          userRes?.variableBorrows !== '0' ? InterestRate.Variable : InterestRate.Stable,
      };

      if (reserve.isWrappedBaseAsset) {
        let baseAvailableToDeposit = valueToBigNumber(
          walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amount
        );
        if (reserve.supplyCap !== '0') {
          baseAvailableToDeposit = BigNumber.min(
            baseAvailableToDeposit,
            new BigNumber(reserve.supplyCap).minus(reserve.totalLiquidity).multipliedBy('0.995')
          );
        }
        const baseAvailableToDepositUSD = valueToBigNumber(baseAvailableToDeposit)
          .multipliedBy(reserve.priceInMarketReferenceCurrency)
          .multipliedBy(marketReferencePriceInUsd)
          .shiftedBy(-USD_DECIMALS)
          .toString();
        return [
          {
            ...reserve,
            underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
            ...fetchIconSymbolAndName({
              symbol: baseAssetSymbol,
              underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
            }),
            walletBalance: walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amount,
            walletBalanceUSD: walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amountUSD,
            availableToDeposit: baseAvailableToDeposit.toString(),
            availableToDepositUSD: baseAvailableToDepositUSD,
            availableBorrows: availableBorrows,
            availableBorrowsInUSD: availableBorrowsInUSD,
            totalBorrows: reserve.totalDebt,
            usageAsCollateralEnabledOnUser,
            detailsAddress: reserve.underlyingAsset,
            id: reserve.id + 'base',
            ...userData,
          },
          {
            ...reserve,
            walletBalance,
            walletBalanceUSD,
            availableToDeposit:
              availableToDeposit.toNumber() <= 0 ? '0' : availableToDeposit.toString(),
            availableToDepositUSD:
              Number(availableToDepositUSD) <= 0 ? '0' : availableToDepositUSD.toString(),
            availableBorrows: availableBorrows,
            availableBorrowsInUSD: availableBorrowsInUSD,
            totalBorrows: reserve.totalDebt,
            usageAsCollateralEnabledOnUser,
            detailsAddress: reserve.underlyingAsset,
            ...userData,
          },
        ];
      }

      return {
        ...reserve,
        walletBalance,
        walletBalanceUSD,
        availableToDeposit:
          availableToDeposit.toNumber() <= 0 ? '0' : availableToDeposit.toString(),
        availableToDepositUSD:
          Number(availableToDepositUSD) <= 0 ? '0' : availableToDepositUSD.toString(),
        availableBorrows: availableBorrows,
        availableBorrowsInUSD: availableBorrowsInUSD,
        totalBorrows: reserve.totalDebt,
        usageAsCollateralEnabledOnUser,
        detailsAddress: reserve.underlyingAsset,
        ...userData,
      };
    })
    .flat();

  const sortedSupplyReserves = tokensToSupply.sort((a, b) =>
    +a.walletBalanceUSD > +b.walletBalanceUSD ? -1 : 1
  );
  const filteredSupplyReserves = sortedSupplyReserves.filter(
    (reserve) => reserve.availableToDepositUSD !== '0'
  );

  const supplyReserves = isShowZeroAssets
    ? sortedSupplyReserves
    : filteredSupplyReserves.length >= 1
    ? filteredSupplyReserves
    : sortedSupplyReserves;

  const head = [
    <Trans key="APY">Supply APY</Trans>,
    <Trans key="Can be collateral">Can be collateral</Trans>,
    <VariableAPYTooltip
      text={<Trans>Borrow APY, variable</Trans>}
      key="APY_list_variable_type"
      variant="subheader2"
    />,
    <StableAPYTooltip
      text={<Trans>Borrow APY, stable</Trans>}
      key="APY_list_stable_type"
      variant="subheader2"
    />,
    <AvailableTooltip
      capType={CapType.borrowCap}
      text={<Trans>Available Lending</Trans>}
      key="Available"
      variant="subheader2"
    />,
    <Trans key="Balance">Wallet Balance</Trans>,
    <Trans key="Actions">Actions</Trans>,
  ];

  if (downToLG) {
    head.splice(1, 1); // Remove "Can be collateral" columns
  }
  if (downToMD) {
    head.splice(4, 1); // Remove "Wallet Balance"
  }

  if (loadingReserves || loading)
    return <ListLoader title={<Trans>Assets to supply</Trans>} head={head} withTopMargin />;

  let alert = <></>;
  if (filteredSupplyReserves.length === 0) {
    if (isTestnet) {
      alert = (
        <Alert severity="info" sx={{ mb: 4 }}>
          <Trans>Your {networkName} wallet is empty. Get free test assets at </Trans>{' '}
          <Link href={ROUTES.faucet} style={{ fontWeight: 400 }}>
            <Trans>{networkName} Faucet</Trans>
          </Link>
        </Alert>
      );
    } else {
      alert = (
        <Alert severity="info">
          <Trans>Your {networkName} wallet is empty. Purchase or transfer assets</Trans>{' '}
          {bridge && (
            <Trans>
              or use {<Link href={bridge.url}>{bridge.name}</Link>} to transfer your ETH assets.
            </Trans>
          )}
        </Alert>
      );
    }
  }

  return (
    <ListWrapper
      title={<Trans>Assets</Trans>}
      localStorageName="supplyAssetsDashboardTableCollapse"
      withTopMargin
      onSearch={(search) => setSearch(search.toLowerCase())}
    >
      <>
        {!downToXSM && <ListHeader head={head} />}
        {supplyReserves
          .filter((r) => r.symbol.toLowerCase().includes(search))
          .map((item) =>
            downToXSM ? (
              <SupplyAssetsListMobileItem {...item} key={item.id} />
            ) : (
              <SupplyAssetsListItem {...item} key={item.id} />
            )
          )}
      </>
    </ListWrapper>
  );
};
