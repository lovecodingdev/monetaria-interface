import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Table, InputNumber } from 'rsuite';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { RewardType } from './RewardType';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { useRouter } from 'next/router';

const { Column, HeaderCell, Cell } = Table;
const data: RewardType[] = [
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: -1.26,
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: -1.26,
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: -1.26,
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
];

export const RewardTable = ({ showModal }) => {
  const router = useRouter();
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
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
    return data;
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
    <Table
      autoHeight={true}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      cellBordered={false}
      rowHeight={158}
      onRowClick={(rowData) => router.push('/farm_detail/')}
    >
      <Column width={156} align="center" fixed sortable verticalAlign="top">
        <HeaderCell>Pool</HeaderCell>
        <Cell>
          {(rowData) => (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
                justifyContent: 'start',
                alignItems: 'center',
              }}
            >
              <TokenIcon
                symbol={rowData.symbol}
                sx={{ fontSize: `24px`, ml: -1 }}
                key={rowData.symbol}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.05em',
                  justifyContent: 'start',
                }}
              >
                <Box
                  sx={{ fontSize: '14px', fontWeight: 400, textAlign: 'left', color: '#252C32' }}
                >
                  {rowData.asset}
                </Box>
                <Box
                  sx={{ fontSize: '12px', fontWeight: 400, color: '#84919A', textAlign: 'left' }}
                >
                  {rowData.network}
                </Box>
              </Box>
            </Box>
          )}
        </Cell>
      </Column>

      <Column width={125} align="right" sortable verticalAlign="top">
        <HeaderCell>APY</HeaderCell>
        <Cell style={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
          {(rowData) => `${rowData.apy}%`}
        </Cell>
      </Column>

      <Column width={263} align="left" sortable verticalAlign="top">
        <HeaderCell>Yield (APR)</HeaderCell>
        <Cell>
          {(rowData) => (
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
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box>Yield Farming :</Box>
                <Box>{rowData.apr.yield_farming}</Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box>Trading Fees :</Box>
                <Box>{rowData.apr.trading_fees}</Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box>ALPACA Rewards :</Box>
                <Box>{rowData.apr.alpaca_rewards}</Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box>Borrowing Interest :</Box>
                <Box>{rowData.apr.borrowing_interest}</Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box>Total APR :</Box>
                <Box>{rowData.apr.total_apr}</Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box>Daily APR :</Box>
                <Box>{rowData.apr.daily_apr}</Box>
              </Box>
            </Box>
          )}
        </Cell>
      </Column>

      <Column width={278} align="right" sortable verticalAlign="top">
        <HeaderCell>Leverage</HeaderCell>
        <Cell>
          {(rowData) => (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <InputNumber defaultValue={rowData.leverage} style={{ width: '112px' }} min={0} />
            </Box>
          )}
        </Cell>
      </Column>

      <Column width={284} align="right" verticalAlign="top">
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
  );
};
