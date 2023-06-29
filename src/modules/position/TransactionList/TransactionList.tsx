import { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TransactionListHeader from './TransactionListHeader';
import TransactionListItem from './TransactionListItem';
import { TransactionListMobileItem } from './TransactionListMobileItem';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { Transaction } from './type';
import { AnkrProvider, Blockchain } from '@ankr.com/ankr.js';
import { ANKR_SUPPORTED_CHAINS } from 'src/helpers/ankr';

function TransactionList() {
  const [txs, setTxs] = useState([] as Transaction[]);
  const [assets, setAssets] = useState([] as string[]);
  const [selectedAsset, setSelectedAsset] = useState("All");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));  
  const {currentAccount} = useWeb3Context();
  const {currentChainId} = useProtocolDataContext();

  useEffect(()=>{
    if(!ANKR_SUPPORTED_CHAINS[currentChainId]) return;
    
    const ankrProvider = new AnkrProvider("https://rpc.ankr.com/multichain/569ca1f392f7d3d0bb1073a1173ecb649af1d9249231fe59fa95db19d5ae41fe");
    ankrProvider.getTokenTransfers({ 
      blockchain:    ANKR_SUPPORTED_CHAINS[currentChainId] as Blockchain,
      address:       [currentAccount],
      descOrder: true,
    })
    .then(res => {
      console.log(res);
      let _assets: Record<string, boolean> = {};
      setTxs(res.transfers.map((tx) => {
        const date = new Date(tx.timestamp! * 1000);
        const dateString = date.toLocaleString();
        const value = tx.value;
        const hash = tx.transactionHash;
        _assets[tx.tokenSymbol] = true;
        return {
          date,
          asset: tx.tokenSymbol,
          symbol: tx.tokenSymbol,
          network: tx.blockchain,
          type: "Transfer",
          amount: +value,
          block: tx.blockHeight,
          hash
        } as Transaction
      }));
      setAssets(Object.keys(_assets));
    })
    .catch(console.error);
  }, [])

  const filteredTxs = () => {
    let _filteredTxs = selectedAsset == "All" ? [...txs] : txs.filter(tx=>tx.asset == selectedAsset);
    _filteredTxs = startDate ? _filteredTxs.filter(tx=>tx.date>=startDate) : _filteredTxs;
    _filteredTxs = endDate ? _filteredTxs.filter(tx=>tx.date<=endDate) : _filteredTxs;
    return _filteredTxs;
  }

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <TransactionListHeader
        assets={assets}
        onChangeDateRange={(startDate, endDate)=>{
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        onChangeAsset={asset=>setSelectedAsset(asset)}
      />
      <Box>
        {!downToXSM ? 
          <TransactionListItem txs={filteredTxs()}/> : 
          <TransactionListMobileItem txs={filteredTxs()}/>}
      </Box>
    </Box>
  );
} 

export default TransactionList;
