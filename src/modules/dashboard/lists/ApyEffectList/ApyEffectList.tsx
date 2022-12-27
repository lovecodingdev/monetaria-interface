import { useState } from 'react';
import { Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Table, Pagination } from 'rsuite';
import { ApyEffectListDataValidator } from './type';
import { textCenterEllipsis } from 'src/helpers/text-center-ellipsis';
import 'rsuite/dist/rsuite.min.css';

const { Column, HeaderCell, Cell } = Table;
const data: ApyEffectListDataValidator[] = [
  {
    address: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    current_mnt_apy: '0.24% to 0.61%',
    future_mnt_apy: '0.24% to 0.61%',
  },
  {
    address: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    current_mnt_apy: '0.24% to 0.61%',
    future_mnt_apy: '0.24% to 0.61%',
  },
  {
    address: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    current_mnt_apy: '0.24% to 0.61%',
    future_mnt_apy: '0.24% to 0.61%',
  },
  {
    address: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    current_mnt_apy: '0.24% to 0.61%',
    future_mnt_apy: '0.24% to 0.61%',
  },
  {
    address: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    current_mnt_apy: '0.24% to 0.61%',
    future_mnt_apy: '0.24% to 0.61%',
  },
];

const ApyEffectList = () => {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);

  const getData = () => {
    if (sortColumn && sortType) {
      return datas.sort((a, b) => {
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
    return datas;
  };

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const datas = data.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  return (
    <div>
      <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '18px' }}>
        Proposed future MNT APYs taking effect on 29/12/2022 UTC
      </Typography>
      <Table
        autoHeight={true}
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        cellBordered={false}
        rowHeight={60}
      >
        <Column
          align="left"
          sortable
          verticalAlign="middle"
          fixed="left"
          width={!downToXSM ? 402 : 162}
        >
          <HeaderCell>Pool</HeaderCell>
          <Cell style={{ fontWeight: 402, fontSize: '14px', color: '#252C32' }}>
            {(rowData) => `cDAI(${textCenterEllipsis(rowData.address, 5, 6)})`}
          </Cell>
        </Column>

        <Column align="left" sortable verticalAlign="middle" width={202}>
          <HeaderCell>Current MNT APY</HeaderCell>
          <Cell
            dataKey="current_mnt_apy"
            style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }}
          />
        </Column>

        <Column align="left" sortable verticalAlign="middle" width={202}>
          <HeaderCell>Future MNT APY</HeaderCell>
          <Cell
            dataKey="future_mnt_apy"
            style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }}
          />
        </Column>
      </Table>
    </div>
  );
};
export default ApyEffectList;
