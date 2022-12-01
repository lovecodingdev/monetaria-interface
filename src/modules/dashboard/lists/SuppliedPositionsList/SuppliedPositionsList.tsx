import { API_ETH_MOCK_ADDRESS } from '@monetaria/contract-helpers';
import { Trans } from '@lingui/macro';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { fetchIconSymbolAndName } from 'src/ui-config/reservePatches';

import { CollateralSwitchTooltip } from '../../../../components/infoTooltips/CollateralSwitchTooltip';
import { CollateralTooltip } from '../../../../components/infoTooltips/CollateralTooltip';
import { TotalSupplyAPYTooltip } from '../../../../components/infoTooltips/TotalSupplyAPYTooltip';
import { ListWrapper } from '../../../../components/lists/ListWrapper';
import { useAppDataContext } from '../../../../hooks/app-data-provider/useAppDataProvider';
import { DashboardContentNoData } from '../../DashboardContentNoData';
import { ListHeader } from '../ListHeader';
import { ListLoader } from '../ListLoader';

import { ListTopInfoItem } from '../ListTopInfoItem';
import { SuppliedPositionsListItem } from './SuppliedPositionsListItem';
import { SuppliedPositionsListMobileItem } from './SuppliedPositionsListMobileItem';

import WalletIcon from 'public/icons/markets/wallet-icon.svg';
import NetAPYIcon from 'public/icons/markets/net-apy-icon.svg';
import CollateralIcon from 'public/icons/markets/collateral.svg';

export const SuppliedPositionsList = () => {
  const { user, loading } = useAppDataContext();
  const { currentNetworkConfig } = useProtocolDataContext();
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  const suppliedPosition =
    user?.userReservesData
      .filter((userReserve) => userReserve.underlyingBalance !== '0')
      .map((userReserve) => ({
        ...userReserve,
        reserve: {
          ...userReserve.reserve,
          ...(userReserve.reserve.isWrappedBaseAsset
            ? fetchIconSymbolAndName({
                symbol: currentNetworkConfig.baseAssetSymbol,
                underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
              })
            : {}),
        },
      })) || [];

  const head = [
    <Trans key="Balance">Balance</Trans>,
    <Trans key="APY">APY</Trans>,
    <CollateralSwitchTooltip
      text={<Trans>Collateral</Trans>}
      key="Collateral"
      variant="subheader2"
    />,
    'Reward APY',
    'Reward Amount',
    <Trans key="Actions">Actions</Trans>,
  ];

  // if (loading) return <ListLoader title={<Trans>Your supplies</Trans>} head={head} />;

  return (
    <Box>
      <>
        {!!suppliedPosition.length && (
          <Box sx={{ display: 'flex', my: 4, gap: 4, flexDirection: 'row', flexWrap: 'wrap' }}>
            <ListTopInfoItem
              icon={<WalletIcon />}
              title={<Trans>Balance</Trans>}
              value={user?.totalLiquidityUSD || 0}
            />
            <ListTopInfoItem
              icon={<NetAPYIcon />}
              title={<Trans>APY</Trans>}
              value={user?.earnedAPY || 0}
              percent
              tooltip={<TotalSupplyAPYTooltip />}
            />
            <ListTopInfoItem
              icon={<CollateralIcon />}
              title={<Trans>Collateral</Trans>}
              value={user?.totalCollateralUSD || 0}
              tooltip={<CollateralTooltip />}
            />
          </Box>
        )}
      </>
      {suppliedPosition.length ? (
        <>
          {!downToXSM && <ListHeader head={head} />}
          {suppliedPosition.map((item) =>
            downToXSM ? (
              <SuppliedPositionsListMobileItem {...item} user={user} key={item.underlyingAsset} />
            ) : (
              <SuppliedPositionsListItem {...item} user={user} key={item.underlyingAsset} />
            )
          )}
        </>
      ) : (
        <DashboardContentNoData text={<Trans>Nothing supplied yet</Trans>} />
      )}
    </Box>
  );
};
