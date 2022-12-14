import { useState } from 'react';
import { Chip, Typography } from '@mui/material';
import { Table, Pagination } from 'rsuite';
import { VoteListDataValidator } from './type';
import { textCenterEllipsis } from 'src/helpers/text-center-ellipsis';
import 'rsuite/dist/rsuite.min.css';

const { Column, HeaderCell, Cell } = Table;
const data: VoteListDataValidator[] = [
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Yap',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Yap',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Nay',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Nay',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Yap',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Yap',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Yap',
  },
];

const VoteList = () => {
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
      <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '18px' }}>Votes</Typography>
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
        <Column align="left" sortable verticalAlign="middle" fixed="left" width={250}>
          <HeaderCell>Voters</HeaderCell>
          <Cell style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }}>
            {(rowData) => textCenterEllipsis(rowData.voter, 5, 6)}
          </Cell>
        </Column>

        <Column align="left" sortable verticalAlign="middle" width={250}>
          <HeaderCell>MNT</HeaderCell>
          <Cell dataKey="amount" style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }} />
        </Column>

        <Column align="left" sortable verticalAlign="middle" fixed="right" width={250}>
          <HeaderCell>Answer</HeaderCell>
          <Cell dataKey="answer" style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }} />
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
          layout={['total', '-', 'pager', '-', 'limit']}
          total={data.length}
          limitOptions={[6, 20, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </div>
  );
};
export default VoteList;
