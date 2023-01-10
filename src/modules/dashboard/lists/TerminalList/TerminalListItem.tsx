import { useState } from 'react';
import { Box } from '@mui/material';
import { Table } from 'rsuite';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { TerminalListValidator } from './type';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DoneIcon from '@mui/icons-material/Done';

const { Column, HeaderCell, Cell } = Table;
const data: TerminalListValidator[] = [
  {
    position: 'BTC/USDT',
    net_value: 16629.4,
    size: 100,
    colleteral: true,
    mark_price: 16629.4,
    entry_price: 16629.4,
    liq_price: 13629.4,
    is_trending_up: true,
  },
  {
    position: 'BTC/USDT',
    net_value: 16629.4,
    size: 100,
    colleteral: true,
    mark_price: 16629.4,
    entry_price: 16629.4,
    liq_price: 13629.4,
    is_trending_up: false,
  },
  {
    position: 'BTC/USDT',
    net_value: 16629.4,
    size: 100,
    colleteral: true,
    mark_price: 16629.3,
    entry_price: 16629.4,
    liq_price: 13629.4,
    is_trending_up: false,
  },
];

const TerminalListItem = () => {
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
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      cellBordered={false}
      rowHeight={60}
      autoHeight={true}
      style={{ color: ' #252C32' }}
    >
      <Column width={133} align="center" fixed sortable verticalAlign="middle">
        <HeaderCell>Position</HeaderCell>
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
              {rowData.is_trending_up ? (
                <TrendingUpIcon sx={{ color: '#47D16C' }} />
              ) : (
                <TrendingDownIcon sx={{ color: '#F76659' }} />
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.05em',
                  justifyContent: 'start',
                }}
              >
                <Box sx={{ fontSize: '14px', fontWeight: 400, textAlign: 'left' }}>
                  {rowData.position}
                </Box>
              </Box>
            </Box>
          )}
        </Cell>
      </Column>

      <Column width={99} align="left" sortable verticalAlign="middle">
        <HeaderCell>Net Value</HeaderCell>
        <Cell>{(rowData) => `${rowData.net_value}$`}</Cell>
      </Column>

      <Column width={108} align="left" sortable verticalAlign="middle">
        <HeaderCell>Size</HeaderCell>
        <Cell>{(rowData) => `${rowData.size}$`}</Cell>
      </Column>

      <Column width={96} align="left" sortable verticalAlign="middle">
        <HeaderCell>Colleteral</HeaderCell>
        <Cell>{(rowData) => <DoneIcon sx={{ color: '#22C348' }} />}</Cell>
      </Column>

      <Column width={108} align="right" sortable verticalAlign="middle">
        <HeaderCell>Mark Price</HeaderCell>
        <Cell>{(rowData) => `${rowData.mark_price}$`}</Cell>
      </Column>
      <Column width={108} align="left" sortable fixed="right" verticalAlign="middle">
        <HeaderCell>Entry Price</HeaderCell>
        <Cell>{(rowData) => `${rowData.entry_price}$`}</Cell>
      </Column>
      <Column width={108} align="left" sortable fixed="right" verticalAlign="middle">
        <HeaderCell>Liq.Price</HeaderCell>
        <Cell>{(rowData) => `${rowData.liq_price}$`}</Cell>
      </Column>
    </Table>
  );
};
export default TerminalListItem;
