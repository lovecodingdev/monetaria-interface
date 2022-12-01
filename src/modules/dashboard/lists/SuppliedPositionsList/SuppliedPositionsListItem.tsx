import { Trans } from '@lingui/macro';
import { Button, Box } from '@mui/material';
import {
  ComputedUserReserveData,
  ExtendedFormattedUser,
} from 'src/hooks/app-data-provider/useAppDataProvider';
import { useModalContext, ModalType } from 'src/hooks/useModal';

import { ListColumn } from '../../../../components/lists/ListColumn';
import { useProtocolDataContext } from '../../../../hooks/useProtocolDataContext';
import { isFeatureEnabled } from '../../../../utils/marketsAndNetworksConfig';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemUsedAsCollateral } from '../ListItemUsedAsCollateral';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';
import { Link, ROUTES } from '../../../../components/primitives/Link';

export const SuppliedPositionsListItem = ({
  reserve,
  underlyingBalance,
  underlyingBalanceUSD,
  usageAsCollateralEnabledOnUser,
  underlyingAsset,
  user,
}: ComputedUserReserveData & { user: ExtendedFormattedUser }) => {
  const { isIsolated, aIncentivesData, isFrozen, isActive } = reserve;
  const { currentMarketData, currentMarket } = useProtocolDataContext();
  const { openActions, openSupply, openWithdraw, openCollateralChange, openSwap } =
    useModalContext();
  const isSwapButton = isFeatureEnabled.liquiditySwap(currentMarketData);

  const canBeEnabledAsCollateral =
    reserve.usageAsCollateralEnabled &&
    ((!reserve.isIsolated && !user.isInIsolationMode) ||
      user.isolatedReserve?.underlyingAsset === reserve.underlyingAsset ||
      (reserve.isIsolated && user.totalCollateralMarketReferenceCurrency === '0'));

  return (
    <ListItemWrapper
      symbol={reserve.symbol}
      iconSymbol={reserve.iconSymbol}
      name={reserve.name}
      detailsAddress={underlyingAsset}
      currentMarket={currentMarket}
      frozen={reserve.isFrozen}
      data-cy={`dashboardSuppliedListItem_${reserve.symbol.toUpperCase()}_${
        canBeEnabledAsCollateral && usageAsCollateralEnabledOnUser ? 'Collateral' : 'NoCollateral'
      }`}
    >
      <ListValueColumn
        symbol={reserve.iconSymbol}
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        disabled={Number(underlyingBalance) === 0}
      />

      <ListAPRColumn
        value={Number(reserve.supplyAPY)}
        incentives={aIncentivesData}
        symbol={reserve.symbol}
      />

      <ListColumn>
        <ListItemUsedAsCollateral
          isIsolated={isIsolated}
          usageAsCollateralEnabledOnUser={usageAsCollateralEnabledOnUser}
          canBeEnabledAsCollateral={canBeEnabledAsCollateral}
          onToggleSwitch={() => openCollateralChange(underlyingAsset)}
          data-cy={`collateralStatus`}
        />
      </ListColumn>

      <ListColumn>
        <Box>23.45%</Box>
      </ListColumn>

      <ListColumn>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box>5300</Box>
          <Box sx={{ color: '#84919A', fontWeight: 400, fontSize: '12px' }}>100.93$</Box>
        </Box>
      </ListColumn>

      <ListButtonsColumn>
        <Button
          variant="outlined"
          onClick={() => openActions(underlyingAsset, ModalType.Withdraw)}
          sx={{
            backgroundColor: 'rgba(21, 126, 255, 0.05)',
            border: '1px solid rgba(21, 126, 255, 0.2)',
            borderRadius: '8px',
          }}
        >
          <Trans>Withdraw</Trans>
        </Button>
        <Button variant="contained" onClick={() => openActions(underlyingAsset, ModalType.Supply)}>
          <Trans>Deposit</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};
