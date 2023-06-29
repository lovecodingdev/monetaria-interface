import { useState, useEffect } from 'react';
import { Chip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Table, Pagination } from 'rsuite';
import { textCenterEllipsis } from 'src/helpers/text-center-ellipsis';
import { SortType } from 'src/helpers/rsuite-types';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import 'rsuite/dist/rsuite.min.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AnkrProvider, Blockchain } from '@ankr.com/ankr.js';
import { ANKR_SUPPORTED_CHAINS } from 'src/helpers/ankr';
import { BigNumber, utils } from 'ethers';
import { VoteHistoryItem } from './types';

dayjs.extend(utc)

const { Column, HeaderCell, Cell } = Table;

const WeightVotingHistory = () => {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));

  const [sortColumn, setSortColumn] = useState("");
  const [sortType, setSortType] = useState("desc" as SortType);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<VoteHistoryItem[]>([]);
  const [logs, setLogs] = useState<VoteHistoryItem[]>([]);
  const { currentMarketData, currentChainId } = useProtocolDataContext();

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
    if(!ANKR_SUPPORTED_CHAINS[currentChainId]) return;

    let abi = [
      "event VoteForGauge (uint256 time, address user, address gauge_addr, uint256 weight)"
    ];
    let iface = new utils.Interface(abi)
  
    const ankrProvider = new AnkrProvider("https://rpc.ankr.com/multichain/569ca1f392f7d3d0bb1073a1173ecb649af1d9249231fe59fa95db19d5ae41fe");
    ankrProvider.getLogs({
      blockchain: ANKR_SUPPORTED_CHAINS[currentChainId] as Blockchain,
      descOrder: true,
      topics: [
        iface.getEventTopic("VoteForGauge"), // utils.keccak256(utils.toUtf8Bytes('VoteForGauge(uint256,address,address,uint256)'))
      ],
      address: [currentMarketData.addresses.GAUGE_CONTROLLER || ""],
      decodeLogs: false,
    })
    .then(res => {
      console.log(iface.parseLog(res.logs[0]));
      let _logs = res.logs.map((log)=>{
        let parsedLog = iface.parseLog(log);
        return {
          time: BigNumber.from(parsedLog.args.time).toNumber(),
          voter: parsedLog.args.user as string,
          gauge: parsedLog.args.gauge_addr as string,
          weight: BigNumber.from(parsedLog.args.weight).toNumber()
        }
      });
      console.log({_logs})
      setLogs(_logs);
    })
    .catch(console.error);
  }, []);

  return (
    <div>
      <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '18px' }}>
        Weight Voting History
      </Typography>
      <Table
        autoHeight={true}
        data={logs}
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
          <HeaderCell>Time</HeaderCell>
          <Cell
            style={{ fontWeight: 402, fontSize: '14px', color: '#252C32' }} 
          >
            {row=>dayjs.utc(row.time*1000).format('YYYY/MM/DD')}
          </Cell>
        </Column>

        <Column align="center" sortable verticalAlign="middle" flexGrow={1}>
          <HeaderCell>Voter</HeaderCell>
          <Cell
            dataKey="voter"
            style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }}
          />
        </Column>

        <Column align="center" sortable verticalAlign="middle" flexGrow={1}>
          <HeaderCell>Gauge</HeaderCell>
          <Cell
            dataKey="gauge"
            style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }}
          />
        </Column>
        <Column align="right" sortable verticalAlign="middle" flexGrow={1}>
          <HeaderCell>Weight</HeaderCell>
          <Cell
            style={{ fontWeight: 400, fontSize: '14px', color: '#252C32' }}
          >
            {row=>`${row.weight/100}%`}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};
export default WeightVotingHistory;
