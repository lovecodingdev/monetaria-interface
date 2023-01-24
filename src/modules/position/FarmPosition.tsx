import React from 'react';
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Switch,
  FormControlLabel,
  Paper,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/system';
import { PositionTable } from './PositionTable';
import { PositionMobileList } from './PositionMobileList';
import InfoIcon from '@mui/icons-material/Info';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import borderGradient from 'src/layouts/borderGradient';
import { BasicModal } from 'src/components/primitives/BasicModal';
import { useEffect, useState } from 'react';

// Tab CSS
const NewTabs = styled(Tabs)({
  '& .MuiTabs-flexContainer': {
    gap: '8px',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  padding: '0px',
});

const NewTab = styled(Tab)`
  margin: 0px;
  fontweight: 600;
  fontfamily: Gilroy, Arial !important;
  fontstyle: normal !important;
  background: #f6f8f9;
  padding: 0 20px;
  color: #000000;
  border-radius: 10px;
  min-height: 24px;
  &.Mui-selected,
  &:hover {
    background: #074592;
    border-radius: 10px;
    color: #ffffff;
    font-weight: bold;
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const rewardsData = [
  {
    symbol: 'eth',
    earned: 4.5,
  },
  {
    symbol: 'mnt',
    earned: 5.45,
  },
  {
    symbol: 'bnb',
    earned: 13.567,
  },
  {
    symbol: 'eth',
    earned: 13.567,
  },
  {
    symbol: 'bnb',
    earned: 13.567,
  },
];

const poolRewardsData = [
  {
    symbol: 'eth',
    campaignContent: 'pSTAKE rewards for LYF positions (11 Aug - 6 Oct):',
    earned: 4.57,
  },
  {
    symbol: 'mnt',
    campaignContent:
      'After the community voting of AIP-1, all unclaimed ITAM rewards were converted into ALPACA. Users will have until 15 March 2023 to claim their rewards. Any remaining unclaimed ALPACA will be burned.',
    earned: 13.75,
  },
  {
    symbol: 'bnb',
    campaignContent:
      'After the community voting of AIP-1, all unclaimed ITAM rewards were converted into ALPACA. Users will have until 15 March 2023 to claim their rewards. Any remaining unclaimed ALPACA will be burned.',
    earned: 3.54,
  },
];

export const FarmPosition = () => {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const [value, setValue] = React.useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSelectedTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <BasicModal
        open={openModal}
        setOpen={setOpenModal}
        withCloseButton={true}
        contentMaxWidth={731}
      >
        <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}>
          Available Leveraged Yield Farming Rewards
        </Typography>
        {/** Tab for Overview and Simulator */}
        <Box sx={{ flex: 1 }}>
          <NewTabs
            value={selectedTab}
            onChange={handleSelectedTabChange}
            sx={{
              my: 4,
            }}
          >
            <NewTab label="Rewards" />
            <NewTab label="Featured Pool Rewards" />
          </NewTabs>

          {selectedTab == 0 &&
            rewardsData.map((row) => (
              <Box
                sx={{
                  px: 8,
                  py: '12px',
                  display: 'flex',
                  flexDirection: 'row',
                  border: '1px solid #F6F8F9',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: '6px',
                  }}
                >
                  <TokenIcon symbol={row.symbol} sx={{ fontSize: `32px`, mr: 2 }} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#252C32' }}>
                    SHB Pairs
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#252C32' }}>
                    Earned
                  </Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#252C32' }}>
                    {row.earned}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    sx={{ backgroundColor: '#074592', fontWeight: 600, fontSize: '16px' }}
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                  >
                    Claim
                  </Button>
                </Box>
              </Box>
            ))}

          {selectedTab == 1 &&
            poolRewardsData.map((row) => (
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <TokenIcon symbol={row.symbol} sx={{ fontSize: `32px`, mr: 4 }} />
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    border: '1px solid #F6F8F9',
                    mb: 2,
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      flex: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '6px',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#252C32' }}>
                        Compaigns Completed
                      </Typography>
                      <Typography
                        sx={{ fontSize: '14px', fontWeight: 400, color: '#252C32', pr: 2 }}
                      >
                        {row.campaignContent}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#252C32' }}>
                      Your rewards (pSTAKE)
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#252C32' }}>
                      {row.earned}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      sx={{ backgroundColor: '#074592', fontWeight: 600, fontSize: '16px' }}
                      variant="contained"
                      onClick={() => setOpenModal(true)}
                    >
                      Claim
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </BasicModal>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography sx={{ color: '#080F26', fontSize: '24px', fontWeight: 600 }}>
            Your position
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {' '}
            <FormControlLabel control={<Switch defaultChecked />} label="Enable Profit and Loss" />
            <InfoIcon sx={{ fontSize: '12px', color: '#B0BABF' }} />
          </Box>
        </Box>
        <Box>
          <Paper
            sx={(theme) => ({
              width: '100%',
              my: { xs: '16px', md: '24px' },
              mx: 'auto',
              padding: '12px 16px',
              ...borderGradient,
              background: 'linear-gradient(270deg, #393DFF 0%, #9582FF 100%)',
            })}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                  <TokenIcon symbol={'bnb'} sx={{ fontSize: `24px`, ml: -1 }} />
                  <Typography sx={{ fontSize: '20px', fontWeight: 500, color: '#FFFFFF' }}>
                    MNT Earned:
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#FFFFFF' }}>
                  13.50
                </Typography>
              </Box>
              <Box>
                <Button
                  sx={{
                    background: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#000000',
                  }}
                  variant="contained"
                  onClick={() => setOpenModal(true)}
                >
                  Claim
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Active Positions" {...a11yProps(0)} />
            <Tab label="Liquidated Positions" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {!downToXSM ? <PositionTable /> : <PositionMobileList />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </div>
  );
};
