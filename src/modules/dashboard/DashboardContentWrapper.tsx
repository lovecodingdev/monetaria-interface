import { Box, useMediaQuery, useTheme } from '@mui/material';

import { BorrowAssetsList } from './lists/BorrowAssetsList/BorrowAssetsList';
import { BorrowedPositions } from './lists/BorrowedPositionsList/BorrowedPositions';
import { SuppliedPositions } from './lists/SuppliedPositionsList/SuppliedPositions';
import { SupplyAssetsList } from './lists/SupplyAssetsList/SupplyAssetsList';

interface DashboardContentWrapperProps {
  isBorrow: boolean;
}

export const DashboardContentWrapper = ({ isBorrow }: DashboardContentWrapperProps) => {
  const { breakpoints } = useTheme();
  const isDesktop = useMediaQuery(breakpoints.up('lg'));
  // const paperWidth = isDesktop ? 'calc(50% - 8px)' : '100%';
  const paperWidth = '100%';

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1, width: paperWidth }}>
          <SuppliedPositions />
        </Box>
        <Box sx={{ flex: 1, width: paperWidth }}>
          <BorrowedPositions />
        </Box>
      </Box>
      <SupplyAssetsList />
     
    </Box>
  );
};
