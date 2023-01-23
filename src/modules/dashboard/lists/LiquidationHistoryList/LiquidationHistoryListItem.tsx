import { useState } from 'react';
import { Button, Box, useMediaQuery, useTheme } from '@mui/material';
import { Table } from 'rsuite';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { LiquidationHistoryListValidator } from './type';

const { Column, HeaderCell, Cell } = Table;

const data: LiquidationHistoryListValidator[] = [
  {
    date: '16/12/2022',
    dept_repaid: 234,
    remaining_dept: 234,
    collateral_lost: 500,
  },
  {
    date: '16/12/2022',
    dept_repaid: 2324,
    remaining_dept: 2134,
    collateral_lost: 5200,
  },
];

const LiquidationHistoryListItem = () => {
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
        <HeaderCell>Date</HeaderCell>
        <Cell dataKey="date" />
      </Column>

      <Column flexGrow={1} align="left" sortable verticalAlign="middle">
        <HeaderCell>Dept Repaid</HeaderCell>
        <Cell dataKey="dept_repaid" />
      </Column>

      <Column flexGrow={1} align="left" sortable verticalAlign="middle">
        <HeaderCell>Remaining Dept</HeaderCell>
        <Cell dataKey="remaining_dept" />
      </Column>

      <Column flexGrow={1} align="left" sortable verticalAlign="middle" fixed="right">
        <HeaderCell>Collateral Lost</HeaderCell>
        <Cell dataKey="collateral_lost" />
      </Column>
    </Table>
  );
};
export default LiquidationHistoryListItem;
