import { Trans } from '@lingui/macro';
import { Box, Button } from '@mui/material';

import { IncentivesCard } from '../../../../components/incentives/IncentivesCard';
import { Row } from '../../../../components/primitives/Row';
import {
  ComputedUserReserveData,
  ExtendedFormattedUser,
} from '../../../../hooks/app-data-provider/useAppDataProvider';
import { useModalContext } from '../../../../hooks/useModal';
import { useProtocolDataContext } from '../../../../hooks/useProtocolDataContext';
import { isFeatureEnabled } from '../../../../utils/marketsAndNetworksConfig';
import { ListItemUsedAsCollateral } from '../ListItemUsedAsCollateral';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';

export const SuppliedPositionsListMobileItem = ({
  reserve,
  underlyingBalance,
  underlyingBalanceUSD,
  usageAsCollateralEnabledOnUser,
  underlyingAsset,
  user,
}: ComputedUserReserveData & { user: ExtendedFormattedUser }) => {
  const { symbol, iconSymbol, name, supplyAPY, isIsolated, aIncentivesData, isFrozen, isActive } =
    reserve;
  const { currentMarketData, currentMarket } = useProtocolDataContext();
  const { openSupply, openWithdraw, openCollateralChange } = useModalContext();
  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);

  const canBeEnabledAsCollateral =
    reserve.usageAsCollateralEnabled &&
    ((!reserve.isIsolated && !user.isInIsolationMode) ||
      user.isolatedReserve?.underlyingAsset === reserve.underlyingAsset ||
      (reserve.isIsolated && user.totalCollateralMarketReferenceCurrency === '0'));

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
      currentMarket={currentMarket}
      frozen={reserve.isFrozen}
    >
      <ListValueRow
        title={<Trans>Supply balance</Trans>}
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        disabled={Number(underlyingBalance) === 0}
      />

      <Row
        caption={<Trans>Supply APY</Trans>}
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <IncentivesCard
          value={Number(supplyAPY)}
          incentives={aIncentivesData}
          symbol={symbol}
          variant="secondary14"
        />
      </Row>

      <Row
        caption={<Trans>Reward APY</Trans>}
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <span style={{ fontSize: '14px', color: '#252C32', fontWeight: 400 }}>2.08%</span>
      </Row>

      <Row
        caption={<Trans>Reward Amount</Trans>}
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <span style={{ fontSize: '14px', color: '#252C32', fontWeight: 400 }}>10(10.93$)</span>
      </Row>

      <Row
        caption={<Trans>Collateral</Trans>}
        align={isIsolated ? 'flex-start' : 'center'}
        captionVariant="description"
        mb={2}
      >
        <ListItemUsedAsCollateral
          isIsolated={isIsolated}
          usageAsCollateralEnabledOnUser={usageAsCollateralEnabledOnUser}
          canBeEnabledAsCollateral={canBeEnabledAsCollateral}
          onToggleSwitch={() => openCollateralChange(underlyingAsset)}
        />
      </Row>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
        <Button
          disabled={!isActive}
          variant="outlined"
          onClick={() => openWithdraw(underlyingAsset)}
          sx={{
            mr: 1.5,
            fontWeight: 600,
            fontSize: '16px',
            backgroundColor: 'rgba(21, 126, 255, 0.05)',
          }}
          fullWidth
        >
          <Trans>Withdraw</Trans>
        </Button>

        {isSwapButton ? (
          <Button
            disabled={!isActive || isFrozen}
            variant="outlined"
            onClick={() => console.log('TODO: should be swap modal')}
            fullWidth
          >
            <Trans>Swap</Trans>
          </Button>
        ) : (
          <Button
            disabled={!isActive || isFrozen}
            variant="contained"
            onClick={() => openSupply(underlyingAsset)}
            fullWidth
            sx={{ fontWeight: 600, fontSize: '16px' }}
          >
            <Trans>Deposit</Trans>
          </Button>
        )}
      </Box>
    </ListMobileItemWrapper>
  );
};
