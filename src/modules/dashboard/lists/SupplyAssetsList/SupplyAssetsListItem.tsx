import { Trans } from '@lingui/macro';
import { Button, Box, useMediaQuery, useTheme } from '@mui/material';
import { useModalContext, ModalType } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import { CapsHint } from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import { ListColumn } from '../../../../components/lists/ListColumn';
import { Link, ROUTES } from '../../../../components/primitives/Link';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemCanBeCollateral } from '../ListItemCanBeCollateral';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';
import { IncentivesCard } from '../../../../components/incentives/IncentivesCard';
import { SupplyAssetsItem } from './types';
import { FormattedNumber } from '../../../../components/primitives/FormattedNumber';
import { NoData } from '../../../../components/primitives/NoData';
import { InterestRate } from '@monetaria/contract-helpers';

export const SupplyAssetsListItem = ({
  symbol,
  iconSymbol,
  name,
  walletBalance,
  walletBalanceUSD,
  supplyCap,
  totalLiquidity,
  supplyAPY,
  aIncentivesData,
  underlyingAsset,
  isActive,
  isFreezed,
  isIsolated,
  usageAsCollateralEnabledOnUser,
  detailsAddress,
  underlyingBalance,
  underlyingBalanceUSD,
  variableBorrows,
  variableBorrowsUSD,
  stableBorrows,
  stableBorrowsUSD,
  borrowRateMode,
  borrowingEnabled,
  stableBorrowRateEnabled,
  variableBorrowAPY,
  stableBorrowAPY,
  vIncentivesData,
  sIncentivesData,
  availableBorrows,
  availableBorrowsInUSD,
  borrowCap,
  totalBorrows,
}: SupplyAssetsItem) => {
  const { currentMarket } = useProtocolDataContext();
  const { openActions } = useModalContext();
  const theme = useTheme();
  const downToLG = useMediaQuery(theme.breakpoints.down('lg'));
  const downToMD = useMediaQuery(theme.breakpoints.down('md'));
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <ListItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      detailsAddress={detailsAddress}
      data-cy={`dashboardSupplyListItem_${symbol.toUpperCase()}`}
      currentMarket={currentMarket}
    >
      {!downToSM && (
        <ListAPRColumn value={Number(supplyAPY)} incentives={aIncentivesData} symbol={symbol} />
      )}

      {!downToLG && (
        <ListColumn>
          <ListItemCanBeCollateral
            isIsolated={isIsolated}
            usageAsCollateralEnabled={usageAsCollateralEnabledOnUser}
          />
        </ListColumn>
      )}

      <ListAPRColumn
        value={Number(variableBorrowAPY)}
        incentives={vIncentivesData}
        symbol={symbol}
      />

      <ListAPRColumn value={Number(stableBorrowAPY)} incentives={sIncentivesData} symbol={symbol} />
      <ListValueColumn
        symbol={symbol}
        value={Number(availableBorrows)}
        subValue={Number(availableBorrowsInUSD)}
        disabled={Number(availableBorrows) === 0}
        withTooltip
        capsComponent={
          <CapsHint
            capType={CapType.borrowCap}
            capAmount={borrowCap}
            totalAmount={totalBorrows}
            withoutText
          />
        }
      />
      {!downToMD && (
        <ListValueColumn
          symbol={symbol}
          value={Number(walletBalance)}
          subValue={walletBalanceUSD}
          withTooltip
          disabled={Number(walletBalance) === 0}
          capsComponent={
            <CapsHint
              capType={CapType.supplyCap}
              capAmount={supplyCap}
              totalAmount={totalLiquidity}
              withoutText
            />
          }
        />
      )}

      <ListButtonsColumn>
        <Button
          // component={Link}
          // href={ROUTES.actions(detailsAddress, currentMarket, "Borrow")}
          // disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
          variant="outlined"
          onClick={() => {
            openActions(underlyingAsset, ModalType.Borrow);
          }}
        >
          <Trans>Borrow</Trans>
        </Button>
        <Button
          // component={Link}
          // href={ROUTES.actions(detailsAddress, currentMarket, "Supply")}
          // disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
          variant="contained"
          onClick={() => {
            openActions(underlyingAsset, ModalType.Supply);
          }}
        >
          <Trans>Supply</Trans>
        </Button>
        {/* <Button
          disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
          variant="contained"
          onClick={() => openSupply(underlyingAsset)}
        >
          <Trans>Supply</Trans>
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(detailsAddress, currentMarket)}
        >
          <Trans>Details</Trans>
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={ROUTES.actions(detailsAddress, currentMarket, "supply")}
        >
          <Trans>Actions</Trans>
        </Button> */}
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};
