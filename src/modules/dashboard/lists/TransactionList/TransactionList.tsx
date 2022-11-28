import { Box, useMediaQuery, useTheme } from '@mui/material';
import TransactionListHeader from './TransactionListHeader';
import TransactionListItem from './TransactionListItem';
import { ListHeader } from '../ListHeader';

function TransactionList() {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const head = ['Type', 'Amount', 'Block', 'hash id', 'Date'];

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <TransactionListHeader />
      <Box>{!downToXSM && <TransactionListItem />}</Box>
    </Box>
  );
}

export default TransactionList;
