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
import { PositionTable } from './PositionTable';
import { PositionMobileList } from './PositionMobileList';
import InfoIcon from '@mui/icons-material/Info';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import borderGradient from 'src/layouts/borderGradient';
import { useEffect, useState } from 'react';
import { PositionType } from './positionType';
import { FarmClaimModal } from './modals/FarmClaimModal';
import { FarmCloseModal } from './modals/FarmCloseModal';

const farmPositionData: PositionType[] = [
  {
    asset: 'BUSD',
    symbol: 'busd',
    no: 57287,
    tokenA: 'bnb',
    tokenB: 'busd',
    protocol: 'Pancake Swap',
    position_value: 39.98,
    debt_value: 0,
    current_apy: 1.03,
    debt_ratio: 0,
    liq_threshold: 'No Debt',
    safety_buffer: 'No Debt',
  },
  {
    asset: 'BUSD',
    symbol: 'busd',
    no: 57288,
    tokenA: 'bnb',
    tokenB: 'usdt',
    protocol: 'Pancake Swap',
    position_value: 39.98,
    debt_value: 0,
    current_apy: 1.03,
    debt_ratio: 0,
    liq_threshold: 'No Debt',
    safety_buffer: 'No Debt',
  },
  {
    asset: 'BUSD',
    symbol: 'busd',
    no: 57289,
    tokenA: 'bnb',
    tokenB: 'cake',
    protocol: 'Pancake Swap',
    position_value: 39.98,
    debt_value: 0,
    current_apy: 1.03,
    debt_ratio: 0,
    liq_threshold: 'No Debt',
    safety_buffer: 'No Debt',
  },
];

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

export const FarmPosition = () => {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const [value, setValue] = React.useState(0);
  const [isOpenClaimModal, setIsOpenClaimModal] = useState(false);
  const [isOpenFarmCloseModal, setIsOpenFarmCloseModal] = useState(false);

  const openFarmCloseModal = () => {
    setIsOpenFarmCloseModal(true);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <FarmClaimModal 
        isOpenClaimModal={isOpenClaimModal} 
        setOpen={setIsOpenClaimModal} 
      />
      <FarmCloseModal
        isOpenFarmCloseModal={isOpenFarmCloseModal}
        setOpen={setIsOpenFarmCloseModal}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { md: 'column', xs: 'row' }, gap: '16px' }}>
          <Typography sx={{ color: '#080F26', fontSize: '24px', fontWeight: 600 }}>
            Your position
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
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
                  onClick={() => setIsOpenClaimModal(true)}
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
          {!downToXSM ? (
            <PositionTable data={farmPositionData} onClose={openFarmCloseModal} />
          ) : (
            <PositionMobileList data={farmPositionData} onClose={openFarmCloseModal} />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </div>
  );
};
