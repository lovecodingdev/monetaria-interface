import React, { useState } from 'react';
import {Box, Paper} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import { ReserveInterestRateModel } from './ReserveInterestRateModel';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';

const NewTabs = styled(Tabs)({
  minHeight: '24px',
  '& .MuiTabs-flexContainer': {
    justifyContent: 'start',
    gap: 2,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const NewTab = styled(Tab)`
  margin: 0px;
  min-height: 24px;
  height: 24px;
  color: #B0BABF;
  &.Mui-selected, &:hover {
    background: #EEF0F2;
    border-radius: 100px;  
    color: #080F26;
    font-weight: bold;
  }
`;

export const InfoTabs = ({reserve}: {reserve: ComputedReserveData}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Paper
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        width: '100%', 
        bgcolor: 'background.paper', 
        my: {xs: '16px', md: '24px'},
        mx: 'auto',
        padding: {xs: '16px', md: '24px'},
      })}
    >
      <Box>
        <NewTabs
          value={selectedTab}
          onChange={handleChange}
          sx={{
            mb: 2,
          }}
        >
          <NewTab label="Interest Rate Model"/>
          <NewTab label="Supply Info" />
          <NewTab label="Borrow Info" />
          <NewTab label="E-Mode Info" />
        </NewTabs>
      </Box>
      {selectedTab == 0 &&
        <ReserveInterestRateModel reserve={reserve} />
      }
    </Paper>
  );
}
