import { Trans } from '@lingui/macro';
import { Button, Box } from '@mui/material';
import { useModalContext } from 'src/hooks/useModal';
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
import { SupplyAssetsItem } from './types';
import { FormattedNumber } from '../../../../components/primitives/FormattedNumber';
import { NoData } from '../../../../components/primitives/NoData';
import { InterestRate } from '@aave/contract-helpers';

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
}: SupplyAssetsItem) => {
  const { currentMarket } = useProtocolDataContext();
  // const { openSupply, openBorrow } = useModalContext();

  return (
    <ListItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      detailsAddress={detailsAddress}
      data-cy={`dashboardSupplyListItem_${symbol.toUpperCase()}`}
      currentMarket={currentMarket}
    >
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
      <ListAPRColumn value={Number(supplyAPY)} incentives={aIncentivesData} symbol={symbol} />

      <ListColumn>
        <ListItemCanBeCollateral
          isIsolated={isIsolated}
          usageAsCollateralEnabled={usageAsCollateralEnabledOnUser}
        />
      </ListColumn>
      <ListValueColumn
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        disabled={Number(underlyingBalance) === 0}
      />
      <ListValueColumn
        value={Number(borrowRateMode === InterestRate.Variable ? variableBorrows : stableBorrows)}
        subValue={Number(
          borrowRateMode === InterestRate.Variable ? variableBorrowsUSD : stableBorrowsUSD
        )}
      />
      <ListColumn>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {supplyAPY.toString() !== '-1' ? (
            <FormattedNumber value={Number(supplyAPY)} percent variant={'secondary14'} symbolsVariant={'secondary14'} />
          ) : (
            <NoData variant={'secondary14'} color="text.secondary" />
          )}
        </Box>
      </ListColumn>

      <ListColumn>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {supplyAPY.toString() !== '-1' ? (
            <FormattedNumber value={Number(supplyAPY)} percent variant={'secondary14'} symbolsVariant={'secondary14'} />
          ) : (
            <NoData variant={'secondary14'} color="text.secondary" />
          )}
        </Box>
      </ListColumn>

      <ListButtonsColumn>
        <Link href={ROUTES.actions(detailsAddress, currentMarket, "Borrow")}
          noWrap>
          <Button
            // disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
            variant="outlined"
            // onClick={() => openBorrow(underlyingAsset)}
          >
            <Trans>Borrow</Trans>
          </Button>
        </Link>
        <Link href={ROUTES.actions(detailsAddress, currentMarket, "Supply")}
          noWrap>
          <Button
            // disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
            variant="contained"
            // onClick={() => openSupply(underlyingAsset)}
          >
            <Trans>Supply</Trans>
          </Button>
        </Link>
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
