import { Trans } from '@lingui/macro';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import { CapsHint } from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import { IncentivesCard } from '../../../../components/incentives/IncentivesCard';
import { Link, ROUTES } from '../../../../components/primitives/Link';
import { Row } from '../../../../components/primitives/Row';
import { useModalContext, ModalType } from '../../../../hooks/useModal';
import { ListItemCanBeCollateral } from '../ListItemCanBeCollateral';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';
import { SupplyAssetsItem } from './types';
import { InterestRate } from '@monetaria/contract-helpers';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { TokenIcon } from 'src/components/primitives/TokenIcon';

// Tooltips components
import { AvailableTooltip } from 'src/components/infoTooltips/AvailableTooltip';
import { StableAPYTooltip } from 'src/components/infoTooltips/StableAPYTooltip';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';

export const SupplyAssetsListMobileItem = ({
  symbol,
  iconSymbol,
  name,
  walletBalance,
  walletBalanceUSD,
  supplyCap,
  totalLiquidity,
  supplyAPY,
  aIncentivesData,
  isIsolated,
  usageAsCollateralEnabledOnUser,
  isActive,
  isFreezed,
  underlyingAsset,
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

  return (
    // <ListMobileItemWrapper
    //   symbol={symbol}
    //   iconSymbol={iconSymbol}
    //   name={name}
    //   underlyingAsset={underlyingAsset}
    //   currentMarket={currentMarket}
    // >
    <Box className="card-border" sx={{ my: 4, padding: 4 }}>
      <Box
        sx={{
          padding: 2,
          color: 'white',
          borderRadius: 4,
          background:
            'linear-gradient(104.25deg, #074592 0%, #C729FF 100%), rgba(241, 241, 241, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          mb: 4,
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="description" noWrap>
            Supply APY
          </Typography>
          <Typography variant="description" noWrap>
            <StableAPYTooltip
              text={<Trans>Borrow APY, stable</Trans>}
              key="APY_list_stable_type"
              variant="subheader2"
            />
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormattedNumber
            value={supplyAPY}
            percent
            variant={'secondary14'}
            symbolsVariant={'secondary14'}
            sx={{ color: 'white' }}
            symbolsColor="white"
          />
          <FormattedNumber
            value={stableBorrowAPY}
            percent
            variant={'secondary14'}
            symbolsVariant={'secondary14'}
            sx={{ color: 'white' }}
            symbolsColor="white"
          />
        </Box>
        <TokenIcon
          symbol={iconSymbol}
          sx={{
            width: '40px',
            height: '40px',
            position: 'absolute',
            bottom: '-20px',
            left: 'calc(50% - 20px)',
            filter:
              'drop-shadow(0px 0px 1px rgba(26, 32, 36, 0.32)) drop-shadow(0px 8px 16px rgba(91, 104, 113, 0.24))',
          }}
        />
      </Box>
      <Row
        caption={<Trans>Can be collateral</Trans>}
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <ListItemCanBeCollateral
          isIsolated={isIsolated}
          usageAsCollateralEnabled={usageAsCollateralEnabledOnUser}
        />
      </Row>

      <Row
        caption={
          <VariableAPYTooltip
            text={<Trans>Borrow APY, variable</Trans>}
            key="APY_list_variable_type"
            variant="subheader2"
          />
        }
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <IncentivesCard
          value={Number(variableBorrowAPY)}
          incentives={vIncentivesData}
          symbol={symbol}
          variant="secondary14"
        />
      </Row>

      {/* <Row
        caption={<Trans>Borrow APY, stable</Trans>}
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <IncentivesCard
          value={Number(stableBorrowAPY)}
          incentives={vIncentivesData}
          symbol={symbol}
          variant="secondary14"
        />
      </Row> */}

      <ListValueRow
        title={
          <AvailableTooltip
            capType={CapType.borrowCap}
            text={<Trans>Available Lending</Trans>}
            key="Available"
            variant="subheader2"
          />
        }
        value={Number(availableBorrows)}
        subValue={Number(availableBorrowsInUSD)}
        disabled={Number(availableBorrows) === 0}
        capsComponent={
          <CapsHint
            capType={CapType.borrowCap}
            capAmount={borrowCap}
            totalAmount={totalBorrows}
            withoutText
          />
        }
      />

      <ListValueRow
        title={<Trans>Wallet balance</Trans>}
        value={Number(walletBalance)}
        subValue={walletBalanceUSD}
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

      {/* <ListValueRow
        title={<Trans>Supply balance</Trans>}
        value={Number(underlyingBalance)}
        subValue={underlyingBalanceUSD}
        disabled={Number(underlyingBalance) === 0}
      /> */}

      {/* <ListValueRow
        title={<Trans>Borrow balance</Trans>}
        value={Number(borrowRateMode === InterestRate.Variable ? variableBorrows : stableBorrows)}
        subValue={borrowRateMode === InterestRate.Variable ? variableBorrowsUSD : stableBorrowsUSD}
        disabled={Number(underlyingBalance) === 0}
      /> */}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 5,
          gap: 4,
        }}
      >
        {/* <Button
          disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
          variant="contained"
          onClick={() => openSupply(underlyingAsset)}
          sx={{ mr: 1.5 }}
          fullWidth
        >
          <Trans>Supply</Trans>
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(detailsAddress, currentMarket)}
          fullWidth
        >
          <Trans>Details</Trans>
        </Button> */}

        <Button
          variant="outlined"
          // component={Link}
          // href={ROUTES.actions(detailsAddress, currentMarket, "Borrow")}
          sx={{ flex: 1 }}
          onClick={() => openActions(underlyingAsset, ModalType.Borrow)}
        >
          <Trans>Borrow</Trans>
        </Button>

        <Button
          variant="contained"
          // component={Link}
          // href={ROUTES.actions(detailsAddress, currentMarket, "Supply")}
          sx={{ flex: 1 }}
          onClick={() => openActions(underlyingAsset, ModalType.Supply)}
        >
          <Trans>Supply</Trans>
        </Button>
      </Box>
    </Box>
    // </ListMobileItemWrapper>
  );
};
