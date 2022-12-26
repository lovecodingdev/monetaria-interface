import { useState } from 'react';
import { Chip, Typography, Box } from '@mui/material';
import { Table, Pagination } from 'rsuite';
import { VoterListDataValidator } from './type';
import { textCenterEllipsis } from 'src/helpers/text-center-ellipsis';
import 'rsuite/dist/rsuite.min.css';
import PieIcon from '/public/icons/pie.svg';

const { Column, HeaderCell, Cell } = Table;
const data: VoterListDataValidator[] = [
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    ve_crv: 1623.78,
    total_ve_crv: 'bLUSD+LUSD3CRV-f (0x74ED…901c) ',
    weight: '99%',
    total_weight: 530127650.31,
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    ve_crv: 1623.78,
    total_ve_crv: 'bLUSD+LUSD3CRV-f (0x74ED…901c) ',
    weight: '99%',
    total_weight: 530127650.31,
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    ve_crv: 1623.78,
    total_ve_crv: 'bLUSD+LUSD3CRV-f (0x74ED…901c) ',
    weight: '99%',
    total_weight: 530127650.31,
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    ve_crv: 1623.78,
    total_ve_crv: 'bLUSD+LUSD3CRV-f (0x74ED…901c) ',
    weight: '99%',
    total_weight: 530127650.31,
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    ve_crv: 1623.78,
    total_ve_crv: 'bLUSD+LUSD3CRV-f (0x74ED…901c) ',
    weight: '99%',
    total_weight: 530127650.31,
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    ve_crv: 1623.78,
    total_ve_crv: 'bLUSD+LUSD3CRV-f (0x74ED…901c) ',
    weight: '99%',
    total_weight: 530127650.31,
  },
];

const VoterList = () => {
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
      <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '18px' }}>Voters</Typography>
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
        <Column align="left" sortable verticalAlign="middle" fixed="left" width={316}>
          <HeaderCell>Voter</HeaderCell>
          <Cell style={{ fontWeight: 402, fontSize: '14px', color: '#252C32' }}>
            {(rowData) => `${textCenterEllipsis(rowData.voter, 5, 6)}`}
          </Cell>
        </Column>

        <Column align="left" sortable verticalAlign="middle" width={133}>
          <HeaderCell>veCRV</HeaderCell>
          <Cell dataKey="ve_crv" style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }} />
        </Column>

        <Column align="left" sortable verticalAlign="middle" width={252}>
          <HeaderCell>Total veCRV</HeaderCell>
          <Cell
            dataKey="total_ve_crv"
            style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }}
          />
        </Column>
        <Column align="left" sortable verticalAlign="middle" width={134}>
          <HeaderCell>Weight</HeaderCell>
          <Cell dataKey="weight" style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }} />
        </Column>
        <Column align="left" sortable verticalAlign="middle" width={309}>
          <HeaderCell>Total Weight</HeaderCell>
          <Cell>
            {(rowData) => (
              <>
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}
                >
                  <Box>
                    {' '}
                    <PieIcon />
                  </Box>

                  <Box>
                    {' '}
                    <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }}>
                      {rowData.total_weight}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};
export default VoterList;
