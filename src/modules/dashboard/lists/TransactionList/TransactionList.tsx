import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TransactionListHeader from './TransactionListHeader';
import TransactionListItem from './TransactionListItem';
import { TransactionListMobileItem } from './TransactionListMobileItem';
import { ListHeader } from '../ListHeader';
import {ethers} from 'ethers'
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { Transaction } from './type';

function getMethodFromInput(input: string) {
  const iface = new ethers.utils.Interface([
    'function transfer(address,uint256)',
    'function transferFrom(address,address,uint256)',
    'function approve(address,uint256)',
    'function mint(address,uint256)',
  ]);
  try {
    const method = iface.parseTransaction({ data: input }).name;
    return method;
  } catch {
    return "Unknown";
  }
}

function TransactionList() {
  const [txs, setTxs] = useState([] as Transaction[]);

  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));  
  const {currentAccount} = useWeb3Context();
  const provider = new ethers.providers.EtherscanProvider('goerli', 'S5YC7V62ZDAA2M5J32411166F2AQFG61YD');
  provider.getHistory(currentAccount)
    .then((_txs)=>{
      console.log({txs});
      setTxs(_txs.map((tx) => {
        const date = new Date(tx.timestamp! * 1000);
        const dateString = date.toLocaleString();
        const value = ethers.utils.formatEther(tx.value);
        const from = tx.from;
        const to = tx.to;
        const hash = tx.hash;
        const status = 'Failed';
        const method = getMethodFromInput(tx.data);
        return {
          date: dateString,
          symbol: 'eth',
          type: method,
          block: tx.blockNumber,
          hash: tx.hash
        } as Transaction
      }).reverse());
    })
    .catch(err=>{
      console.error(err);
    })
  return (
    <Box sx={{ paddingTop: '10px' }}>
      <TransactionListHeader />
      <Box>{!downToXSM ? <TransactionListItem txs={txs} /> : <TransactionListMobileItem />}</Box>
    </Box>
  );
} 

export default TransactionList;
