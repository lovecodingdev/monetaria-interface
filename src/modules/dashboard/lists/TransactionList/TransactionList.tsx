import { Box, useMediaQuery, useTheme } from '@mui/material';
import TransactionListHeader from './TransactionListHeader';

function TransactionList() {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <TransactionListHeader />
      <Box>Ok</Box>
    </Box>
  );
}

export default TransactionList;
