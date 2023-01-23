import React from 'react';

import { API_ETH_MOCK_ADDRESS, InterestRate } from '@monetaria/contract-helpers';
import { valueToBigNumber } from '@monetaria/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { fetchIconSymbolAndName } from 'src/ui-config/reservePatches';

import { APYTypeTooltip } from '../../../../components/infoTooltips/APYTypeTooltip';
import { BorrowPowerTooltip } from '../../../../components/infoTooltips/BorrowPowerTooltip';
import { TotalBorrowAPYTooltip } from '../../../../components/infoTooltips/TotalBorrowAPYTooltip';
import { ListWrapper } from '../../../../components/lists/ListWrapper';
import {
  ComputedUserReserveData,
  useAppDataContext,
} from '../../../../hooks/app-data-provider/useAppDataProvider';
import { DashboardContentNoData } from '../../DashboardContentNoData';
import { DashboardEModeButton } from '../../DashboardEModeButton';
import { ListHeader } from '../ListHeader';
import { ListLoader } from '../ListLoader';
import { ListTopInfoItem } from '../ListTopInfoItem';
import { BorrowedPositionsListItem } from './BorrowedPositionsListItem';
import { BorrowedPositionsListMobileItem } from './BorrowedPositionsListMobileItem';
import LiquidationHistoryList from '../LiquidationHistoryList/LiquidationHistoryList';

import WalletIcon from 'public/icons/markets/wallet-icon.svg';
import NetAPYIcon from 'public/icons/markets/net-apy-icon.svg';
import PowerIcon from 'public/icons/markets/power.svg';
import { useEffect, useState } from 'react';

// Tab CSS
const NewTabs = styled(Tabs)({
  '& .MuiTabs-flexContainer': {
    gap: '8px',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  padding: '0px',
});

const NewTab = styled(Tab)`
  margin: 0px;
  fontweight: 600;
  fontfamily: Gilroy, Arial !important;
  fontstyle: normal !important;
  background: #f6f8f9;
  padding: 0 20px;
  color: #000000;
  border-radius: 10px;
  min-height: 24px;
  &.Mui-selected,
  &:hover {
    background: #074592;
    border-radius: 10px;
    color: #ffffff;
    font-weight: bold;
  }
`;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const BorrowedPositionsList = () => {
  const { user, loading } = useAppDataContext();
  const { currentMarketData, currentNetworkConfig } = useProtocolDataContext();
  const { openEmode } = useModalContext();
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const borrowPositions =
    user?.userReservesData.reduce((acc, userReserve) => {
      if (userReserve.variableBorrows !== '0') {
        acc.push({
          ...userReserve,
          borrowRateMode: InterestRate.Variable,
          reserve: {
            ...userReserve.reserve,
            ...(userReserve.reserve.isWrappedBaseAsset
              ? fetchIconSymbolAndName({
                  symbol: currentNetworkConfig.baseAssetSymbol,
                  underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
                })
              : {}),
          },
        });
      }
      if (userReserve.stableBorrows !== '0') {
        acc.push({
          ...userReserve,
          borrowRateMode: InterestRate.Stable,
          reserve: {
            ...userReserve.reserve,
            ...(userReserve.reserve.isWrappedBaseAsset
              ? fetchIconSymbolAndName({
                  symbol: currentNetworkConfig.baseAssetSymbol,
                  underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
                })
              : {}),
          },
        });
      }
      return acc;
    }, [] as (ComputedUserReserveData & { borrowRateMode: InterestRate })[]) || [];
  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '0'
    : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
        .div(maxBorrowAmount)
        .toFixed();

  const head = [
    <Trans key="Debt">Debt</Trans>,
    <Trans key="APY">APY</Trans>,
    <APYTypeTooltip text={<Trans>APY type</Trans>} key="APY type" variant="subheader2" />,
    <Trans key="Actions">Actions</Trans>,
  ];

  // if (loading) return <ListLoader title={<Trans>Your borrows</Trans>} head={head} />;

  return (
    <Box>
      <>
        {!!borrowPositions.length && (
          <Box sx={{ display: 'flex', my: 4, gap: 4, flexDirection: 'row', flexWrap: 'wrap' }}>
            <ListTopInfoItem
              icon={<WalletIcon />}
              title={<Trans>Balance</Trans>}
              value={user?.totalBorrowsUSD || 0}
            />
            <ListTopInfoItem
              icon={<NetAPYIcon />}
              title={<Trans>APY</Trans>}
              value={user?.debtAPY || 0}
              percent
              tooltip={<TotalBorrowAPYTooltip />}
            />
            <ListTopInfoItem
              icon={<PowerIcon />}
              title={<Trans>Borrow power used</Trans>}
              value={collateralUsagePercent || 0}
              percent
              tooltip={<BorrowPowerTooltip />}
            />
          </Box>
        )}
      </>

      {borrowPositions.length ? (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Active Positions" />
              <Tab label="Liquidated Positions" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {!downToXSM && <ListHeader head={head} />}
            {borrowPositions.map((item) =>
              downToXSM ? (
                <BorrowedPositionsListMobileItem
                  {...item}
                  key={item.underlyingAsset + item.borrowRateMode}
                />
              ) : (
                <BorrowedPositionsListItem
                  {...item}
                  key={item.underlyingAsset + item.borrowRateMode}
                />
              )
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LiquidationHistoryList />
          </TabPanel>
        </>
      ) : (
        <DashboardContentNoData text={<Trans>Nothing borrowed yet</Trans>} />
      )}
    </Box>
  );
};
