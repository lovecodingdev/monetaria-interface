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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
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
              border: `1px solid ${theme.palette.divider}`,
              width: '100%',
              bgcolor: 'background.paper',
              my: { xs: '16px', md: '24px' },
              mx: 'auto',
              padding: '12px 16px',
              ...borderGradient,
            })}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '50px',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                  <TokenIcon symbol={'mnt'} sx={{ fontSize: `24px`, ml: -1 }} />
                  <Typography sx={{ fontSize: '20px', fontWeight: 500, color: '#080F26' }}>
                    MNT Earned
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#333333' }}>
                  13.50
                </Typography>
              </Box>
              <Box>
                <Button
                  sx={{ backgroundColor: '#074592', fontWeight: 600, fontSize: '16px' }}
                  variant="contained"
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
