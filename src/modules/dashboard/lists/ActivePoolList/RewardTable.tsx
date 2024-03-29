// @ts-nocheck

import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Table, InputNumber, SelectPicker, Pagination } from 'rsuite';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { RewardType } from './RewardType';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { useRouter } from 'next/router';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import InfoIcon from '@mui/icons-material/Info';
import { TVLTooltip } from 'src/components/infoTooltips/TVLTooltip';
import { ListMobileItem } from 'src/components/lists/ListMobileItem';

const { Column, HeaderCell, Cell } = Table;
const data: RewardType[] = [
  {
    asset: 'ETH',
    symbol: 'eth',
    protocol: 'Pancake Swap',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'USDT',
          value: 'usdt',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    protocol: 'Pancake Swap',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'BUSD',
          value: 'busd',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    protocol: 'Pancake Swap',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'CAKE',
          value: 'cake',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    protocol: 'Pancake Swap',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'CAKE',
          value: 'cake',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    protocol: 'Pancake Swap',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'CAKE',
          value: 'cake',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    protocol: 'Pancake Swap',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'CAKE',
          value: 'cake',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    protocol: 'Pancake Swap',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'CAKE',
          value: 'cake',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    protocol: 'Pancake Swap',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'CAKE',
          value: 'cake',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    protocol: 'Pancake Swap',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'CAKE',
          value: 'cake',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    protocol: 'Pancake Swap',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'CAKE',
          value: 'cake',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    protocol: 'Pancake Swap',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'CAKE',
          value: 'cake',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
];

export const RewardTable = ({ showModal }: { showModal: (type: boolean) => void }) => {
  const { breakpoints } = useTheme();
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (_limit: number) => {
    setPage(1);
    setLimit(_limit);
  };

  const router = useRouter();
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [tblData, setTblData] = useState(data);

  const tblFilterData = tblData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const getData = () => {
    if (sortColumn && sortType) {
      return tblFilterData.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return tblFilterData;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  return (
    <>
      <Table
        autoHeight={true}
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        cellBordered={false}
        rowHeight={178}
      >
        <Column minWidth={180} flexGrow={2} align="center" fixed sortable verticalAlign="top">
          <HeaderCell>Pool</HeaderCell>
          <Cell>
            {(rowData) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 8,
                  justifyContent: 'start',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => router.push('/farm_detail/')}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                  }}
                >
                  {' '}
                  <TokenIcon
                    symbol={rowData.apr.borrowing_interest[0].value}
                    sx={{ fontSize: '32px', mr: 1, zIndex: 10 }}
                  />{' '}
                  <TokenIcon
                    symbol={rowData.apr.borrowing_interest[1].value}
                    sx={{
                      fontSize: '32px',
                      mr: 1,
                      position: 'absolute',
                      left: '24px',
                      zIndex: 9,
                    }}
                  />{' '}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.05em',
                    justifyContent: 'start',
                  }}
                >
                  <Box
                    sx={{ fontSize: '14px', fontWeight: 600, textAlign: 'left', color: '#252C32' }}
                  >
                    {rowData.asset}
                  </Box>
                  <Box
                    sx={{ fontSize: '12px', fontWeight: 400, color: '#84919A', textAlign: 'left' }}
                  >
                    {rowData.protocol}
                  </Box>
                  <Box
                    sx={{ fontSize: '12px', fontWeight: 400, color: '#48535B', textAlign: 'left' }}
                  >
                    <TVLTooltip text={rowData.tvl} />
                  </Box>
                </Box>
              </Box>
            )}
          </Cell>
        </Column>

        <Column width={100} align="center" sortable verticalAlign="top">
          <HeaderCell>APY</HeaderCell>
          <Cell style={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
            {(rowData) => `${rowData.apy}%`}
          </Cell>
        </Column>

        <Column minWidth={300} flexGrow={3} align="left" sortable verticalAlign="top">
          <HeaderCell>Yield (APR)</HeaderCell>
          <Cell>
            {(rowData, idx) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  color: '#252C32',
                  fontSize: '14px',
                  fontWeight: 400,
                }}
              >
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Box>Yield Farming :</Box>
                  <Box>{rowData.apr.yield_farming}</Box>
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Box>Trading Fees :</Box>
                  <Box>{rowData.apr.trading_fees}</Box>
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Box>ALPACA Rewards :</Box>
                  <Box>{rowData.apr.alpaca_rewards}</Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>Borrowing Interest :</Box>
                  <Box className="farm-custom-select">
                    <SelectPicker
                      data={rowData.apr.borrowing_interest}
                      style={{ width: '100%' }}
                      defaultValue={rowData.apr.borrowing_interest[0].value}
                      placeholder="borrowing interest"
                      searchable={false}
                      cleanable={false}
                      renderMenuItem={(label, item) => {
                        return (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 2,
                              alignItems: 'center',
                              fontFamily: 'Gilroy, Arial !important',
                            }}
                          >
                            <Box>
                              {' '}
                              <TokenIcon symbol={item.value} sx={{ fontSize: `24px`, ml: -1 }} />
                            </Box>
                            <Box>
                              {' '}
                              <Typography
                                style={{ fontWeight: 400, fontSize: '14px', color: ' #252C32' }}
                              >
                                {label}
                              </Typography>
                            </Box>
                            <Box>
                              {' '}
                              <Typography
                                style={{ fontWeight: 400, fontSize: '14px', color: '#84919A' }}
                              >
                                {item.token_value} %
                              </Typography>
                            </Box>
                          </Box>
                        );
                      }}
                      renderValue={(value, item) => {
                        return (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 2,
                              alignItems: 'center',
                            }}
                          >
                            <Box>
                              {' '}
                              <TokenIcon symbol={value} sx={{ fontSize: `24px` }} />
                            </Box>
                            <Box>
                              {' '}
                              <Typography
                                style={{ fontWeight: 400, fontSize: '14px', color: ' #0F1228' }}
                              >
                                {item.label}
                              </Typography>
                            </Box>
                            <Box>
                              {' '}
                              <Typography
                                style={{ fontWeight: 400, fontSize: '14px', color: '#0F1228' }}
                              >
                                {item.token_value} %
                              </Typography>
                            </Box>
                          </Box>
                        );
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Box>Total APR :</Box>
                  <Box>{rowData.apr.total_apr}</Box>
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Box>Daily APR :</Box>
                  <Box>{rowData.apr.daily_apr}</Box>
                </Box>
              </Box>
            )}
          </Cell>
        </Column>

        <Column width={180} align="center" sortable verticalAlign="top">
          <HeaderCell>Leverage</HeaderCell>
          <Cell>
            {(rowData) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '4px',
                    alignItems: 'center',
                  }}
                >
                  {' '}
                  <ElectricBoltIcon sx={{ fontSize: '12px', color: '#48535B' }} />
                  <Typography sx={{ fontSize: '12px', color: '#5B6871' }}>Boosted</Typography>
                  <InfoIcon sx={{ fontSize: '12px', color: '#D5DADD' }} />
                </Box>

                <InputNumber defaultValue={rowData.leverage} style={{ width: '112px' }} min={0} />
              </Box>
            )}
          </Cell>
        </Column>

        <Column width={200} align="right" verticalAlign="top" fixed="right">
          <HeaderCell>Actions</HeaderCell>
          <Cell>
            {(rowData) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '7.5px' }}>
                  <Button
                    sx={{
                      backgroundColor: 'rgba(21, 126, 255, 0.05)',
                      border: '1px solid rgba(21, 126, 255, 0.2)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '16px',
                      marginTop: '-4px',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      showModal(true);
                    }}
                  >
                    <SignalCellularAltIcon sx={{ color: '#074592' }} />
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: '#074592',
                      border: '1px solid rgba(21, 126, 255, 0.2)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '16px',
                      marginTop: '-4px',
                      width: '110px',
                    }}
                    variant="contained"
                  >
                    Farm
                  </Button>
                </Box>
              </Box>
            )}
          </Cell>
        </Column>
      </Table>
      {!downToXSM && (
        <div style={{ padding: 20, color: 'black' }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={tblData.length}
            limitOptions={[5, 10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      )}
    </>
  );
};
