import { Box, useMediaQuery, useTheme } from '@mui/material';
import LiquidationHistoryListItem from './LiquidationHistoryListItem';
import { LiquidationHistoryListMobileItem } from './LiquidationHistoryListMobileItem';

function LiquidationHistoryList() {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <Box>
        {!downToXSM ? <LiquidationHistoryListItem /> : <LiquidationHistoryListMobileItem />}
      </Box>
    </Box>
  );
}

export default LiquidationHistoryList;
