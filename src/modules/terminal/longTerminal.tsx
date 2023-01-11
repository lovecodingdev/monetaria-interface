import React, { useState } from 'react';
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Slider,
  Button,
  Switch,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/system';
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import CachedIcon from '@mui/icons-material/Cached';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';

const NewTabs = styled(Tabs)({
  minHeight: '24px',
  '& .MuiTabs-flexContainer': {
    gap: 0,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  padding: '2px',
});

const NewTab = styled(Tab)`
  margin: 0px;
  font-family: Gilroy, Arial !important;
  font-style: normal !important;
  font-size: 14px;
  min-height: 24px;

  height: 24px;
  width: 46px;

  color: #b0babf;
  &.Mui-selected,
  &:hover {
    background: transparent;
    color: #252c32;
    font-weight: 400;
    border-bottom: 1px solid #eef0f2;
  }
`;

const coinList = [
  {
    label: 'mnt',
    title: 'MNT',
    network: 'Ethereum',
    value: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
  },
  {
    label: 'usdt',
    title: 'USDT',
    network: 'Tron',
    value: '0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e607b1',
  },
];

const marks = [
  {
    value: 1,
    label: '1x',
  },
  {
    value: 2,
    label: '2x',
  },
  {
    value: 3,
    label: '10x',
  },
  {
    value: 4,
    label: '15x',
  },
  {
    value: 5,
    label: '20x',
  },
  {
    value: 6,
    label: '25x',
  },
  {
    value: 7,
    label: '30x',
  },
  {
    value: 8,
    label: '35x',
  },
  {
    value: 9,
    label: '40x',
  },
];

export default function LongTerminal({ setIsSettingClicked }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [amtOfCoinA, setAmtOfCoinA] = useState(0);
  const [curCoinA, setCurCoinA] = useState('0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1');
  const [curCoinB, setCurCoinB] = useState('0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e607b1');
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [checked, setChecked] = useState(true);
  const [checkedLimit, setCheckedLimit] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChangeSwitchLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedLimit(event.target.checked);
  };

  const exchangeNetwork = () => {
    const first = curCoinA;
    const second = curCoinB;

    setCurCoinA(second);
    setCurCoinB(first);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Box
        sx={{
          width: { xs: '300px', sm: '336px' },
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {' '}
        <Box sx={{ display: 'flex' }}>
          {' '}
          <NewTabs value={selectedTab} onChange={handleChange}>
            <NewTab
              label="Market"
              sx={{
                fontSize: { xs: '14px', md: '14px' },
                fontFamily: 'Gilroy,Arial !important',
                fontStyle: 'normal',
                minWidth: '46px',
                marginRight: { xs: '12px', sm: '28px' },
              }}
            />
            <NewTab
              label="Limit"
              sx={{
                fontSize: { xs: '14px', md: '14px' },
                fontFamily: 'Gilroy,Arial !important',
                fontStyle: 'normal',

                minWidth: '46px',
                marginRight: { xs: '12px', sm: '28px' },
              }}
            />
            <NewTab
              label="Trigger"
              sx={{
                fontSize: { xs: '14px', md: '14px' },
                fontFamily: 'Gilroy,Arial !important',
                fontStyle: 'normal',
                minWidth: '47px',
                marginRight: { xs: '12px', sm: '28px' },
              }}
            />
          </NewTabs>
        </Box>{' '}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifySelf: 'end' }}>
          <IconButton>
            <CachedIcon sx={{ fontSize: '16px', color: '#5B6871' }} />
          </IconButton>
          <IconButton>
            <AddIcon sx={{ fontSize: '16px', color: '#5B6871' }} />
          </IconButton>
          <IconButton onClick={() => setIsSettingClicked(true)}>
            <SettingsIcon sx={{ fontSize: '16px', color: '#5B6871' }} />
          </IconButton>
        </Box>
      </Box>
      <Box>
        {selectedTab == 0 && (
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  paddingRight: { xs: '6px', sm: '11px' },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#EEF0F2',
                    padding: '12px 16px',
                    border: '1px solid #E5E9EB',
                    borderRadius: '12px',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                    <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '14px' }}>
                      Pay
                    </Typography>
                    <Typography sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}>
                      16,252.07 USD
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: { xs: '2px', sm: '8px' },
                    }}
                  >
                    <Box>
                      <input
                        type="number"
                        className="stake-input"
                        placeholder="0.00"
                        step={0.01}
                        value={amtOfCoinA}
                        onChange={(e) => setAmtOfCoinA(e.target.value)}
                        style={{
                          outline: 'none',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontWeight: 500,
                          fontSize: '28px',
                          color: '#000000',
                          width: downToXSM ? '120px' : '100%',
                        }}
                      />
                    </Box>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}
                      className="custom-select"
                    >
                      {!downToXSM && <Button variant="text">Max</Button>}

                      <SelectPicker
                        data={coinList}
                        style={{ width: '100%' }}
                        value={curCoinA}
                        cleanable={false}
                        onChange={(value: string, e) => {
                          const second = curCoinB;
                          if (value === second) {
                            exchangeNetwork();
                          } else {
                            setCurCoinA(value);
                          }
                        }}
                        placeholder="Select a coin"
                        searchable={false}
                        renderMenuItem={(label, item) => {
                          return (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'center',
                                fontFamily: 'Gilroy, Arial !important',
                              }}
                            >
                              <Box>
                                {' '}
                                <TokenIcon symbol={label} sx={{ fontSize: '32px', mr: 1 }} />{' '}
                              </Box>
                              <Box>
                                {' '}
                                <span
                                  style={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    color: '#5B6871',
                                  }}
                                >
                                  {item.title}
                                </span>
                              </Box>
                              <Box>
                                {' '}
                                <Typography
                                  sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}
                                >
                                  {item.network}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        }}
                        renderValue={(value, item) => {
                          return (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'center',
                              }}
                            >
                              <Box>
                                {' '}
                                <TokenIcon
                                  symbol={item.label}
                                  sx={{ fontSize: '32px', mr: 1 }}
                                />{' '}
                              </Box>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {' '}
                                <Typography
                                  sx={{ fontWeight: 400, fontSize: '14px', color: '#080F26' }}
                                >
                                  {item.title.toUpperCase()}
                                </Typography>{' '}
                              </Box>
                            </Box>
                          );
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ position: 'absolute', left: `calc(50% - 12px)`, bottom: `-24px` }}>
                    <IconButton
                      sx={{
                        border: '1px solid #DDE2E4',
                        color: '#023997',
                        backgroundColor: 'white',
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                      }}
                      onClick={exchangeNetwork}
                    >
                      <CachedIcon sx={{ width: '14px', height: '16px' }} />
                    </IconButton>
                  </Box>
                </Box>

                <Box
                  sx={{
                    backgroundColor: '#EEF0F2',
                    padding: '12px 16px',
                    border: '1px solid #E5E9EB',
                    borderRadius: '12px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: '5px',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                      <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '14px' }}>
                        Long
                      </Typography>
                      <Typography sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}>
                        16,252.07 USD
                      </Typography>
                    </Box>
                    <Typography sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}>
                      Leverage: 6.90x
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: { xs: '2px', sm: '8px' },
                    }}
                  >
                    <Box>
                      <input
                        type="number"
                        className="stake-input"
                        placeholder="0.00"
                        step={0.01}
                        value={amtOfCoinA}
                        onChange={(e) => setAmtOfCoinA(e.target.value)}
                        style={{
                          outline: 'none',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontWeight: 500,
                          fontSize: '28px',
                          color: '#000000',
                          width: downToXSM ? '120px' : '100%',
                        }}
                      />
                    </Box>
                    <Box className="custom-select">
                      <SelectPicker
                        data={coinList}
                        style={{ width: '100%' }}
                        value={curCoinB}
                        cleanable={false}
                        onChange={(value: string, e) => {
                          const first = curCoinA;
                          if (value === first) {
                            exchangeNetwork();
                          } else {
                            setCurCoinB(value);
                          }
                        }}
                        placeholder="Select a coin"
                        searchable={false}
                        renderMenuItem={(label, item) => {
                          return (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'center',
                                fontFamily: 'Gilroy, Arial !important',
                              }}
                            >
                              <Box>
                                {' '}
                                <TokenIcon symbol={label} sx={{ fontSize: '32px', mr: 1 }} />{' '}
                              </Box>
                              <Box>
                                {' '}
                                <span
                                  style={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    color: '#5B6871',
                                  }}
                                >
                                  {item.title}
                                </span>
                              </Box>
                              <Box>
                                {' '}
                                <Typography
                                  sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}
                                >
                                  {item.network}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        }}
                        renderValue={(value, item) => {
                          return (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'center',
                              }}
                            >
                              <Box>
                                {' '}
                                <TokenIcon
                                  symbol={item.label}
                                  sx={{ fontSize: '32px', mr: 1 }}
                                />{' '}
                              </Box>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {' '}
                                <Typography
                                  sx={{ fontWeight: 400, fontSize: '14px', color: '#080F26' }}
                                >
                                  {item.title.toUpperCase()}
                                </Typography>{' '}
                              </Box>
                            </Box>
                          );
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  paddingRight: { xs: '6px', sm: '11px' },
                }}
              >
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}
                >
                  <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '14px' }}>
                    Leverage
                  </Typography>
                  <Box>
                    {' '}
                    <Switch
                      checked={checked}
                      onChange={handleChangeSwitch}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Box>
                </Box>
                <Box sx={{ padding: '0 10px', opacity: checked ? 1 : 0.4 }}>
                  <Slider
                    aria-label="Custom marks"
                    defaultValue={5}
                    step={1}
                    valueLabelDisplay="auto"
                    min={1}
                    max={9}
                    marks={marks}
                    sx={{
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#F6F8F9',
                        border: '1px solid #B0BABF',
                        opacity: 1,
                        '&:focus, &:hover, &.Mui-active': {
                          boxShadow:
                            '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                          // Reset on touch devices, it doesn't add specificity
                        },
                      },
                      '& .MuiSlider-track': {
                        border: 'none',
                        backgroundColor: '#074592',
                      },
                      '& .MuiSlider-rail': {
                        opacity: 1,
                        backgroundColor: '#DDE2E4',
                      },
                      '& .MuiSlider-mark': {
                        backgroundColor: '#bfbfbf',
                        height: '2px',
                        '&.MuiSlider-markActive': {
                          opacity: 1,
                          backgroundColor: '#F6F8F9',
                        },
                      },
                    }}
                    disabled={!checked}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  paddingRight: { xs: '6px', sm: '11px' },
                }}
                onClick={handleExpand}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                    <InfoIcon sx={{ color: '#B0BABF', fontWeight: 500, fontSize: '16px' }} />
                    <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '12px' }}>
                      1 BTC = 1,271.65 USDT
                    </Typography>
                  </Box>

                  <Box>
                    {!isExpanded ? (
                      <ExpandMoreIcon sx={{ color: '#84919A' }} />
                    ) : (
                      <ExpandLessIcon sx={{ color: '#84919A' }} />
                    )}
                  </Box>
                </Box>

                {isExpanded && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {' '}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        paddingRight: { xs: '6px', sm: '11px' },
                        border: '1px solid #EBEFF0',
                        padding: '10px',
                        borderRadius: '8px',
                      }}
                    >
                      {' '}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                          Collateral In
                        </Typography>
                        <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                          USD
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                          Leverage
                        </Typography>
                        <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                          16.8392
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                          Entry Price
                        </Typography>
                        <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                          $1,252.19
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                          Liq. Price
                        </Typography>
                        <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                          $1,282.19
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>{' '}
            <Box
              sx={{
                height: '64px',
                borderTop: '1px solid #E5E9EB',
                padding: '8px 0 16px 0',
                marginTop: '10px',
              }}
            >
              {' '}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#023997',
                  color: '#F6F8F9',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
                fullWidth
              >
                Confirm Long
              </Button>
            </Box>
          </Box>
        )}
        {selectedTab == 1 && (
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                height: '356px',
                overflowY: 'scroll',
                overflowX: 'hidden',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  paddingRight: { xs: '6px', sm: '11px' },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#EEF0F2',
                    padding: '12px 16px',
                    border: '1px solid #E5E9EB',
                    borderRadius: '12px',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                    <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '14px' }}>
                      Pay
                    </Typography>
                    <Typography sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}>
                      16,252.07 USD
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: { xs: '2px', sm: '8px' },
                    }}
                  >
                    <Box>
                      <input
                        type="number"
                        className="stake-input"
                        placeholder="0.00"
                        step={0.01}
                        value={amtOfCoinA}
                        onChange={(e) => setAmtOfCoinA(e.target.value)}
                        style={{
                          outline: 'none',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontWeight: 500,
                          fontSize: '28px',
                          color: '#B0BABF',
                          width: downToXSM ? '120px' : '100%',
                        }}
                      />
                    </Box>
                    <Box className="custom-select">
                      <SelectPicker
                        data={coinList}
                        style={{ width: '100%' }}
                        value={curCoinA}
                        cleanable={false}
                        onChange={(value: string, e) => {
                          const second = curCoinB;
                          if (value === second) {
                            exchangeNetwork();
                          } else {
                            setCurCoinA(value);
                          }
                        }}
                        placeholder="Select a coin"
                        searchable={false}
                        renderMenuItem={(label, item) => {
                          return (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'center',
                                fontFamily: 'Gilroy, Arial !important',
                              }}
                            >
                              <Box>
                                {' '}
                                <TokenIcon symbol={label} sx={{ fontSize: '32px', mr: 1 }} />{' '}
                              </Box>
                              <Box>
                                {' '}
                                <span
                                  style={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    color: '#5B6871',
                                  }}
                                >
                                  {item.title}
                                </span>
                              </Box>
                            </Box>
                          );
                        }}
                        renderValue={(value, item) => {
                          return (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'center',
                              }}
                            >
                              <Box>
                                {' '}
                                <TokenIcon
                                  symbol={item.label}
                                  sx={{ fontSize: '32px', mr: 1 }}
                                />{' '}
                              </Box>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {' '}
                                <Typography
                                  sx={{ fontWeight: 400, fontSize: '14px', color: '#080F26' }}
                                >
                                  {item.title.toUpperCase()}
                                </Typography>{' '}
                              </Box>
                            </Box>
                          );
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ position: 'absolute', left: `calc(50% - 12px)`, bottom: `-24px` }}>
                    <IconButton
                      sx={{
                        border: '1px solid #DDE2E4',
                        color: '#023997',
                        backgroundColor: 'white',
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                      }}
                      onClick={exchangeNetwork}
                    >
                      <CachedIcon sx={{ width: '14px', height: '16px' }} />
                    </IconButton>
                  </Box>
                </Box>

                <Box
                  sx={{
                    backgroundColor: '#EEF0F2',
                    padding: '12px 16px',
                    border: '1px solid #E5E9EB',
                    borderRadius: '12px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: '5px',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                      <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '14px' }}>
                        Long
                      </Typography>
                      <Typography sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}>
                        16,252.07 USD
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: { xs: '2px', sm: '8px' },
                    }}
                  >
                    <Box>
                      <input
                        type="number"
                        className="stake-input"
                        placeholder="0.00"
                        step={0.01}
                        value={amtOfCoinA}
                        onChange={(value: string, e) => {
                          const first = curCoinA;
                          if (value === first) {
                            exchangeNetwork();
                          } else {
                            setCurCoinB(value);
                          }
                        }}
                        style={{
                          outline: 'none',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontWeight: 500,
                          fontSize: '28px',
                          color: '#B0BABF',
                          width: downToXSM ? '120px' : '100%',
                        }}
                      />
                    </Box>
                    <Box className="custom-select">
                      <SelectPicker
                        data={coinList}
                        style={{ width: '100%' }}
                        value={curCoinB}
                        onChange={setCurCoinB}
                        placeholder="Select a coin"
                        searchable={false}
                        cleanable={false}
                        renderMenuItem={(label, item) => {
                          return (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'center',
                                fontFamily: 'Gilroy, Arial !important',
                              }}
                            >
                              <Box>
                                {' '}
                                <TokenIcon symbol={label} sx={{ fontSize: '32px', mr: 1 }} />{' '}
                              </Box>
                              <Box>
                                {' '}
                                <span
                                  style={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    color: '#5B6871',
                                  }}
                                >
                                  {item.title}
                                </span>
                              </Box>
                            </Box>
                          );
                        }}
                        renderValue={(value, item) => {
                          return (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                alignItems: 'center',
                              }}
                            >
                              <Box>
                                {' '}
                                <TokenIcon
                                  symbol={item.label}
                                  sx={{ fontSize: '32px', mr: 1 }}
                                />{' '}
                              </Box>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {' '}
                                <Typography
                                  sx={{ fontWeight: 400, fontSize: '14px', color: '#080F26' }}
                                >
                                  {item.title.toUpperCase()}
                                </Typography>{' '}
                              </Box>
                            </Box>
                          );
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    backgroundColor: '#EEF0F2',
                    padding: '12px 16px',
                    border: '1px solid #E5E9EB',
                    borderRadius: '12px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: '5px',
                    }}
                  >
                    <Typography sx={{ color: '#000000', fontWeight: 600, fontSize: '14px' }}>
                      Price
                    </Typography>
                    <Typography sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}>
                      Mark: 1,253.29
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: { xs: '2px', sm: '8px' },
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <input
                        type="number"
                        className="stake-input"
                        placeholder="0.00"
                        step={0.01}
                        value={amtOfCoinA}
                        onChange={(value: string, e) => {
                          const first = curCoinA;
                          if (value === first) {
                            exchangeNetwork();
                          } else {
                            setCurCoinB(value);
                          }
                        }}
                        style={{
                          outline: 'none',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontWeight: 500,
                          fontSize: '28px',
                          color: '#B0BABF',
                          width: downToXSM ? '120px' : '100%',
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ color: '#1A2024', fontWeight: 400, fontSize: '14px' }}>
                        USD
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  paddingRight: { xs: '6px', sm: '11px' },
                }}
              >
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}
                >
                  <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '14px' }}>
                    Leverage
                  </Typography>
                  <Box>
                    {' '}
                    <Switch
                      checked={checkedLimit}
                      onChange={handleChangeSwitchLimit}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Box>
                </Box>
                <Box sx={{ padding: '0 10px', opacity: checkedLimit ? 1 : 0.4 }}>
                  <Slider
                    disabled={!checkedLimit}
                    aria-label="Custom marks"
                    defaultValue={5}
                    step={1}
                    valueLabelDisplay="auto"
                    min={1}
                    max={9}
                    marks={marks}
                    sx={{
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#F6F8F9',
                        border: '1px solid #B0BABF',
                        opacity: 1,
                        '&:focus, &:hover, &.Mui-active': {
                          boxShadow:
                            '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                          // Reset on touch devices, it doesn't add specificity
                        },
                      },
                      '& .MuiSlider-track': {
                        border: 'none',
                        backgroundColor: '#074592',
                      },
                      '& .MuiSlider-rail': {
                        opacity: 1,
                        backgroundColor: '#DDE2E4',
                      },
                      '& .MuiSlider-mark': {
                        backgroundColor: '#bfbfbf',
                        height: '2px',
                        '&.MuiSlider-markActive': {
                          opacity: 1,
                          backgroundColor: '#F6F8F9',
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  paddingRight: { xs: '6px', sm: '11px' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    paddingRight: { xs: '6px', sm: '11px' },
                  }}
                >
                  {' '}
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                      Collateral In
                    </Typography>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                      USD
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                      Leverage
                    </Typography>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                      16.8392
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                      Entry Price
                    </Typography>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                      $1,252.19
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                      Liq. Price
                    </Typography>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                      $1,282.19
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    paddingRight: { xs: '6px', sm: '11px' },
                  }}
                >
                  {' '}
                  <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '14px' }}>
                    Long
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                      Entry Price
                    </Typography>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                      16,822.3
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                      Exit Price
                    </Typography>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                      16.8392
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                      Borrow Fee
                    </Typography>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                      0.0028% / 1h
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                      Available Liquidity
                    </Typography>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                      $9,931,264.64
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>{' '}
            <Box
              sx={{
                height: '64px',
                borderTop: '1px solid #E5E9EB',
                padding: '8px 0 16px 0',
                marginTop: '10px',
              }}
            >
              {' '}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#023997',
                  color: '#F6F8F9',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
                fullWidth
              >
                Confirm Long
              </Button>
            </Box>
          </Box>
        )}
        {selectedTab == 2 && (
          <>
            <span></span>
          </>
        )}
      </Box>
    </>
  );
}
