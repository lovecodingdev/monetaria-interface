import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Table } from 'rsuite';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { RewardType } from './RewardType';

const { Column, HeaderCell, Cell } = Table;
const data: RewardType[] = [
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    vAPY: 5.45,
    tAPR: 539,
    balance: 2329,
    profit_usd: 239,
    claimable_tokens: 2345,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    vAPY: 5.45,
    tAPR: 539,
    balance: 2329,
    profit_usd: 239,
    claimable_tokens: 2345,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    vAPY: 5.45,
    tAPR: 5329,
    balance: 23219,
    profit_usd: 2392,
    claimable_tokens: 23345,
  },
];

export const RewardTable = () => {
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
      autoHeight
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      cellBordered={false}
      rowHeight={60}
    >
      <Column width={137} align="center" fixed sortable verticalAlign="middle">
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
                <Box sx={{ fontSize: '14px', fontWeight: 400, textAlign: 'left' }}>
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

      <Column width={112} align="right" sortable verticalAlign="middle">
        <HeaderCell>Base vAPY</HeaderCell>
        <Cell>{(rowData) => `${rowData.vAPY}%`}</Cell>
      </Column>

      <Column width={185} align="right" sortable verticalAlign="middle">
        <HeaderCell>Rewards tAPR(CRV+ Incentives)</HeaderCell>
        <Cell>{(rowData) => `${rowData.tAPR}$`}</Cell>
      </Column>

      <Column width={112} align="right" sortable verticalAlign="middle">
        <HeaderCell>Balance</HeaderCell>
        <Cell>{(rowData) => `${rowData.balance}$`}</Cell>
      </Column>

      <Column width={149} align="right" sortable verticalAlign="middle">
        <HeaderCell>USD Profits</HeaderCell>
        <Cell>{(rowData) => `${rowData.profit_usd}$`}</Cell>
      </Column>
      <Column width={422} align="left" verticalAlign="middle" fixed="right">
        <HeaderCell>Claimable Tokens</HeaderCell>
        <Cell>
          {(rowData) => (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box> {rowData.claimable_tokens}</Box>
              <Box>
                <Button
                  sx={{
                    backgroundColor: 'rgba(21, 126, 255, 0.05)',
                    border: '1px solid rgba(21, 126, 255, 0.2)',
                    color: '#074592',
                    fontWeight: 600,
                    fontSize: '16px',
                    marginTop: '-4px',
                  }}
                >
                  Claim
                </Button>
              </Box>
            </Box>
          )}
        </Cell>
      </Column>
    </Table>
  );
};
