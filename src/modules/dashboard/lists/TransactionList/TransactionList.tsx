import { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TransactionListHeader from './TransactionListHeader';
import TransactionListItem from './TransactionListItem';
import { TransactionListMobileItem } from './TransactionListMobileItem';
import { ListHeader } from '../ListHeader';
import {ethers} from 'ethers'
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { Transaction } from './type';
import { AnkrProvider } from '@ankr.com/ankr.js';

const ankrProvider = new AnkrProvider("https://rpc.ankr.com/multichain/569ca1f392f7d3d0bb1073a1173ecb649af1d9249231fe59fa95db19d5ae41fe");

function TransactionList() {
  const [txs, setTxs] = useState([] as Transaction[]);
  const [assets, setAssets] = useState([] as string[]);

  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));  
  const {currentAccount} = useWeb3Context();

  useEffect(()=>{
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
          date: dateString,
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

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <TransactionListHeader assets={assets}/>
      <Box>{!downToXSM ? <TransactionListItem txs={txs} /> : <TransactionListMobileItem />}</Box>
    </Box>
  );
} 

export default TransactionList;
