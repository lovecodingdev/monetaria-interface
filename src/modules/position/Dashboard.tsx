import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { RewardTable } from './RewardTable';
import { RewardMobileList } from './RewardMobileList';
import HeaderDashboard from './HeaderDashboard';

export const Dashboard = () => {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  return (
    <div>
      {/* <HeaderDashboard /> */}
      <Box>{!downToXSM ? <RewardTable /> : <RewardMobileList />}</Box>
    </div>
  );
};
