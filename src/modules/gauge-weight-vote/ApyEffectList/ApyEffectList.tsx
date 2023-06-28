import { useState, useEffect } from 'react';
import { Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Table, Pagination } from 'rsuite';
import { ApyEffectListItem } from './type';
import { textCenterEllipsis } from 'src/helpers/text-center-ellipsis';
import { SortType } from 'src/helpers/rsuite-types';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import 'rsuite/dist/rsuite.min.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

const { Column, HeaderCell, Cell } = Table;

const ApyEffectList = () => {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));

  const [sortColumn, setSortColumn] = useState("");
  const [sortType, setSortType] = useState("desc" as SortType);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApyEffectListItem[]>([]);
  const { currentMarketData } = useProtocolDataContext();

  const nextTime = dayjs.utc().add(7, 'day').format('YYYY/MM/DD');

  const handleSortColumn = (sortColumn: string, sortType?: SortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType!);
    }, 500);
  };

  useEffect(()=>{
    let _data: ApyEffectListItem[] = [];
    for (const key in currentMarketData.addresses.GAUGES) {
      let currentAPY = 0.001;
      _data.push({
        pool: `${key} ( Gauge ${currentMarketData.addresses.GAUGES[key]} )`,
        currentMNT_APY: `${currentAPY}% to ${currentAPY * 2.5}%`,
        futureMNT_APY: `${currentAPY}% to ${currentAPY * 2.5}%`,
      });
    }
    setData(_data);
  }, []);

  return (
    <div>
      <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '18px' }}>
        Proposed future MNT APYs taking effect on {nextTime} UTC
      </Typography>
      <Table
        autoHeight={true}
        data={data}
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
          flexGrow={1} 
        >
          <HeaderCell>Pool</HeaderCell>
          <Cell
            dataKey='pool'
            style={{ fontWeight: 402, fontSize: '14px', color: '#252C32' }} 
          />
        </Column>

        <Column align="right" sortable verticalAlign="middle" flexGrow={1}>
          <HeaderCell>Current MNT APY</HeaderCell>
          <Cell
            dataKey="currentMNT_APY"
            style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }}
          />
        </Column>

        <Column align="right" sortable verticalAlign="middle" flexGrow={1}>
          <HeaderCell>Future MNT APY</HeaderCell>
          <Cell
            dataKey="futureMNT_APY"
            style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }}
          />
        </Column>
      </Table>
    </div>
  );
};
export default ApyEffectList;
