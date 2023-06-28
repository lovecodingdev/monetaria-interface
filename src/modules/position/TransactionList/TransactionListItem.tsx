import { useState } from 'react';
import { Box } from '@mui/material';
import { Table, Pagination } from 'rsuite';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { Transaction } from './type';
import { SortType } from 'src/helpers/rsuite-types';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

const { Column, HeaderCell, Cell } = Table;

interface Props {
  txs: Transaction[];
}

const TransactionListItem = ({txs}: Props) => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortType, setSortType] = useState("desc" as SortType);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {currentNetworkConfig} = useProtocolDataContext();

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const filteredTxs = txs.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  // const getData = () => {
  //   if (sortColumn && sortType) {
  //     return data.sort((a, b) => {
  //       let x = a[sortColumn];
  //       let y = b[sortColumn];
  //       if (typeof x === 'string') {
  //         x = x.charCodeAt();
  //       }
  //       if (typeof y === 'string') {
  //         y = y.charCodeAt();
  //       }
  //       if (sortType === 'asc') {
  //         return x - y;
  //       } else {
  //         return y - x;
  //       }
  //     });
  //   }
  //   return data;
  // };

  const handleSortColumn = (sortColumn: string, sortType?: SortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType!);
    }, 500);
  };

  return (
    <Box>
      <Table
        autoHeight
        data={filteredTxs}
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
          <HeaderCell>Hash</HeaderCell>
          <Cell>
            {row=>(
              <a href={currentNetworkConfig.explorerLink+"/tx/"+row.hash}>{row.hash.slice(0, 16)+"..."}</a>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1} align="left" sortable fixed="right" verticalAlign="middle">
          <HeaderCell>Date</HeaderCell>
          <Cell>
            {row=>row.date.toLocaleString()}
          </Cell>
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
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
          total={txs.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </Box>
  );
};
export default TransactionListItem;
