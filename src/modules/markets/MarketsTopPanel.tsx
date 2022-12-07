import { valueToBigNumber } from '@monetaria/math-utils';
import { Trans } from '@lingui/macro';
import { useMediaQuery, useTheme, Box } from '@mui/material';
import * as React from 'react';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { TopInfoPanel } from '../../components/TopInfoPanel/TopInfoPanel';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import { useAppDataContext } from '../../hooks/app-data-provider/useAppDataProvider';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import TotalBorrowIcon from '../../../public/icons/markets/total-borrow-indicator.svg';
import TotalSupplyIcon from '../../../public/icons/markets/total-supply-indicator.svg';
import PieIcon from '../../../public/icons/markets/pie-icon.svg';
import { NoData } from '../../components/primitives/NoData';

export const MarketsTopPanel = () => {
  const { currentNetworkConfig, currentMarketData, currentMarket } = useProtocolDataContext();
  const { reserves, loading } = useAppDataContext();
  const { currentAccount } = useWeb3Context();

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  const aggregatedStats = reserves.reduce(
    (acc, reserve) => {
      return {
        totalLiquidity: acc.totalLiquidity.plus(reserve.totalLiquidityUSD),
        totalDebt: acc.totalDebt.plus(reserve.totalDebtUSD),
      };
    },
    {
      totalLiquidity: valueToBigNumber(0),
      totalDebt: valueToBigNumber(0),
    }
  );

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const symbolsVariant = downToSM ? 'secondary16' : 'secondary21';

  return (
    <TopInfoPanel
      pageTitle={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 2,
          }}
        >
          <img src={currentNetworkConfig.networkLogoPath} alt="" width="40" height="40" />
          {currentMarketData.marketTitle} Market
        </Box>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
        {' '}
        <TopInfoPanelItem
          icon={<PieIcon />}
          hideIcon
          title={<Trans>Total market size</Trans>}
          loading={loading}
        >
          <FormattedNumber
            value={aggregatedStats.totalLiquidity.toString()}
            symbol="USD"
            variant={valueTypographyVariant}
            visibleDecimals={2}
            compact
            symbolsVariant={symbolsVariant}
            color="#080F26"
            symbolsColor="#080F26"
          />
        </TopInfoPanelItem>
        <TopInfoPanelItem
          icon={<TotalSupplyIcon />}
          hideIcon
          title={<Trans>Total available</Trans>}
          loading={loading}
        >
          <FormattedNumber
            value={aggregatedStats.totalLiquidity.minus(aggregatedStats.totalDebt).toString()}
            symbol="USD"
            variant={valueTypographyVariant}
            visibleDecimals={2}
            compact
            symbolsVariant={symbolsVariant}
            color="#080F26"
            symbolsColor="#080F26"
          />
        </TopInfoPanelItem>
        <TopInfoPanelItem
          icon={<TotalBorrowIcon />}
          hideIcon
          title={<Trans>Total borrows</Trans>}
          loading={loading}
        >
          <FormattedNumber
            value={aggregatedStats.totalDebt.toString()}
            symbol="USD"
            variant={valueTypographyVariant}
            visibleDecimals={2}
            compact
            symbolsVariant={symbolsVariant}
            color="#080F26"
            symbolsColor="#080F26"
          />
        </TopInfoPanelItem>
      </Box>
    </TopInfoPanel>
  );
};
