import { useState } from 'react';
import { Box, useMediaQuery, useTheme, Tab, Tabs, Badge, Typography } from '@mui/material';
import { styled } from '@mui/system';

import TerminalListItem from './TerminalListItem';
import { TerminalListMobileItem } from './TerminalListMobileItem';

const NewTabs = styled(Tabs)({
  minHeight: '28px',
  '& .MuiTabs-flexContainer': {
    gap: 4,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  border: '1px solid #F6F8F9',
  padding: '2px',
  borderRadius: '100px',
});

const NewTab = styled(Tab)`
  margin: 0px;
  fontweight: 600;
  fontfamily: Gilroy, Arial !important;
  fontstyle: normal !important;
  min-height: 24px;
  border-radius: 100px;
  height: 24px;

  color: #b0babf;
  &.Mui-selected,
  &:hover {
    background: #eef0f2;
    border-radius: 100px;
    color: #000000;
    font-weight: bold;
  }
`;

function TerminalList() {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <Box sx={{ padding: '10px 0' }}>
        {' '}
        <NewTabs
          value={selectedTab}
          onChange={handleChange}
          sx={{
            mb: 2,
            width: { xs: '300px', sm: '325px' },
          }}
        >
          <NewTab
            label={
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                <Typography>Position</Typography>
                <Box
                  sx={{
                    backgroundColor: '#D5DADD',
                    borderRadius: '8px',
                    width: '16px',
                    height: '16px',
                    padding: '0 4px',
                    color: '#252C32',
                  }}
                >
                  3
                </Box>
              </Box>
            }
            sx={{
              fontSize: { xs: '14px', md: '14px' },
              fontFamily: 'Gilroy,Arial !important',
              fontStyle: 'normal',
            }}
          />
          <NewTab
            label={
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                <Typography>Limit Orders</Typography>
                <Box
                  sx={{
                    backgroundColor: '#D5DADD',
                    borderRadius: '8px',
                    width: '16px',
                    height: '16px',
                    padding: '0 4px',
                    color: '#252C32',
                  }}
                >
                  2
                </Box>
              </Box>
            }
            sx={{
              fontSize: { xs: '14px', md: '14px' },
              fontFamily: 'Gilroy,Arial !important',
              fontStyle: 'normal',
            }}
          />
          <NewTab
            label={
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                <Typography>Fills</Typography>
                <Box
                  sx={{
                    backgroundColor: '#D5DADD',
                    borderRadius: '8px',
                    width: '16px',
                    height: '16px',
                    padding: '0 4px',
                    color: '#252C32',
                  }}
                >
                  1
                </Box>
              </Box>
            }
            sx={{
              fontSize: { xs: '14px', md: '14px' },
              fontFamily: 'Gilroy,Arial !important',
              fontStyle: 'normal',
            }}
          />
        </NewTabs>
      </Box>

      <Box>
        <TerminalListItem />{' '}
      </Box>
    </Box>
  );
}

export default TerminalList;
