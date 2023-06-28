import { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TransactionListHeader from './TransactionListHeader';
import TransactionListItem from './TransactionListItem';
import { TransactionListMobileItem } from './TransactionListMobileItem';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { Transaction } from './type';
import { AnkrProvider } from '@ankr.com/ankr.js';

const ANKR_SUPPORTED_CHAINS: Record<number, string> = {
  1: "eth", 
  56: "bsc", 
  250: "fantom", 
  43114: "avalanche", 
  137: "polygon", 
  42161: "arbitrum", 
  57: "syscoin", 
  10: "optimism", 
  5: "eth_goerli", 
  80001: "polygon_mumbai", 
  43113: "avalanche_fuji"
}

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
      blockchain:    'eth_goerli',
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
