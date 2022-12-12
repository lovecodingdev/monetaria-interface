import { useState } from 'react';
import { Chip } from '@mui/material';
import { Table, Pagination } from 'rsuite';
import { StatusListDataValidator } from './type';

const { Column, HeaderCell, Cell } = Table;
const data: StatusListDataValidator[] = [
  {
    no: 1,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Executed',
    bgColor: '#EBFFF1',
    color: '#119C2B',
  },
  {
    no: 2,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Canceled',
    bgColor: '#EEF0F2',
    color: '#252C32',
  },
  {
    no: 3,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Failed',
    bgColor: '#FFEFEB',
    color: '#CC0905',
  },
  {
    no: 4,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Failed',
    bgColor: '#FFEFEB',
    color: '#CC0905',
  },
  {
    no: 5,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Failed',
    bgColor: '#FFEFEB',
    color: '#CC0905',
  },
  {
    no: 6,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Failed',
    bgColor: '#FFEFEB',
    color: '#CC0905',
  },
  {
    no: 7,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Failed',
    bgColor: '#FFEFEB',
    color: '#CC0905',
  },
  {
    no: 8,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Failed',
    bgColor: '#FFEFEB',
    color: '#CC0905',
  },
];

const StatusList = () => {
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
        <Column width={72} align="left" sortable verticalAlign="middle" fixed="left">
          <HeaderCell>No</HeaderCell>
          <Cell dataKey="no" style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }} />
        </Column>

        <Column width={560} align="left" sortable verticalAlign="middle">
          <HeaderCell>Name</HeaderCell>
          <Cell
            dataKey="name"
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: '#252C32',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '560px',
            }}
          />
        </Column>

        <Column width={121} align="left" sortable verticalAlign="middle" fixed="right">
          <HeaderCell>Status</HeaderCell>
          <Cell>
            {(rowData) => (
              <Chip
                label={rowData.status}
                sx={{
                  color: `${rowData.color}`,
                  backgroundColor: `${rowData.bgColor}`,
                  fontWeight: 600,
                  fontSize: '14px',
                  borderRadius: '6px',
                }}
              />
            )}
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
export default StatusList;
