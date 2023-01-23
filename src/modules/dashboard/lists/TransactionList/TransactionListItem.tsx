import { useState } from 'react';
import { Box } from '@mui/material';
import { Table } from 'rsuite';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { TransactionListValidator } from './type';

const { Column, HeaderCell, Cell } = Table;
const data: TransactionListValidator[] = [
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    type: 'ETH borrow',
    amount: 2374.5,
    block: 'YES',
    hash_id: '2342342342342',
    date: '16/12/2022',
  },
  {
    asset: 'BTC',
    symbol: 'btc',
    network: 'BTC',
    type: 'ETH borrow',
    amount: 237.5,
    block: 'YES',
    hash_id: '2342342342342',
    date: '16/12/2022',
  },
];

const TransactionListItem = () => {
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
      <Column flexGrow={1} align="left" fixed sortable verticalAlign="middle">
        <HeaderCell>Asset</HeaderCell>
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

      <Column flexGrow={1} align="left" sortable verticalAlign="middle">
        <HeaderCell>Type</HeaderCell>
        <Cell dataKey="type" />
      </Column>

      <Column flexGrow={1} align="left" sortable verticalAlign="middle">
        <HeaderCell>Amount</HeaderCell>
        <Cell dataKey="amount" />
      </Column>

      <Column flexGrow={1} align="left" sortable verticalAlign="middle">
        <HeaderCell>Block</HeaderCell>
        <Cell dataKey="block" />
      </Column>

      <Column flexGrow={1} align="left" sortable verticalAlign="middle">
        <HeaderCell>Hash Id</HeaderCell>
        <Cell dataKey="hash_id" />
      </Column>
      <Column flexGrow={1} align="left" sortable fixed="right" verticalAlign="middle">
        <HeaderCell>Date</HeaderCell>
        <Cell dataKey="date" />
      </Column>
    </Table>
  );
};
export default TransactionListItem;
