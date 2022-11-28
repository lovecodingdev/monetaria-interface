import { Box, useMediaQuery, useTheme } from '@mui/material';
import TransactionListHeader from './TransactionListHeader';
import TransactionListItem from './TransactionListItem';
import { TransactionListMobileItem } from './TransactionListMobileItem';

import { ListHeader } from '../ListHeader';

function TransactionList() {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <TransactionListHeader />
      <Box>{!downToXSM ? <TransactionListItem /> : <TransactionListMobileItem />}</Box>
    </Box>
  );
}

export default TransactionList;
