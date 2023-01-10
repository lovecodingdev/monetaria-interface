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

const NewTabs = styled(Tabs)({
  minHeight: '28px',
  '& .MuiTabs-flexContainer': {
    gap: 4,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },

  padding: '2px',
  width: '100%',
});

const NewTab = styled(Tab)`
  margin: 0px;
  font-family: Gilroy, Arial !important;
  font-style: normal !important;
  font-size: 14px;
  min-height: 24px;

  height: 40px;
  width: 54px;

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
    value: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
  },
  {
    label: 'usdt',
    title: 'USDT',
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

export default function SwapTerminal() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [amtOfCoinA, setAmtOfCoinA] = useState(0);
  const [curCoinA, setCurCoinA] = useState('0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1');
  const [curCoinB, setCurCoinB] = useState('0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e607b1');
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [checked, setChecked] = useState(true);
  const [checkedLimit, setCheckedLimit] = useState(true);

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

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <NewTabs
          value={selectedTab}
          onChange={handleChange}
          sx={{
            mb: 2,
          }}
        >
          <NewTab
            label="Market"
            sx={{
              fontSize: { xs: '14px', md: '14px' },
              fontFamily: 'Gilroy,Arial !important',
              fontStyle: 'normal',
            }}
          />
          <NewTab
            label="Limit"
            sx={{
              fontSize: { xs: '14px', md: '14px' },
              fontFamily: 'Gilroy,Arial !important',
              fontStyle: 'normal',
            }}
          />
          <NewTab
            label="Trigger"
            sx={{
              fontSize: { xs: '14px', md: '14px' },
              fontFamily: 'Gilroy,Arial !important',
              fontStyle: 'normal',
            }}
          />
        </NewTabs>
      </Box>
      <Box>
        {selectedTab == 0 && (
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
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '4px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '14px' }}>
                      Pay
                    </Typography>
                    <Typography sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}>
                      Balance: 0.0000
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
                        onChange={(value, e) => {
                          if (value == null) return;
                          const second = curCoinB;
                          if (value === second) {
                            exchangeNetwork();
                          } else {
                            setCurCoinA(value);
                          }
                        }}
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
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '14px' }}>
                        Receive
                      </Typography>
                    </Box>
                    <Typography sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}>
                      Balance: 0.0000
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
                        onChange={(value, e) => {
                          if (value == null) {
                            return;
                          }
                          const first = curCoinA;
                          if (value === first) {
                            exchangeNetwork();
                          } else {
                            setCurCoinB(value);
                          }
                        }}
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
                  <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '14px' }}>
                    Swap
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
            <Box sx={{ height: '64px', borderTop: '1px solid #E5E9EB', padding: '8px 0 16px 0' }}>
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
                Confirm Swap
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
                        onChange={(value, e) => {
                          if (value == null) return;
                          const second = curCoinB;
                          if (value === second) {
                            exchangeNetwork();
                          } else {
                            setCurCoinA(value);
                          }
                        }}
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
                        Swap
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
                        value={curCoinB}
                        onChange={(value, e) => {
                          if (value == null) return;
                          const first = curCoinA;
                          if (value === first) {
                            exchangeNetwork();
                          } else {
                            setCurCoinB(value);
                          }
                        }}
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
                      1,253.29
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
                    <Box sx={{ flex: 1 }}>
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
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
                      <Typography sx={{ color: '#1A2024', fontWeight: 400, fontSize: '14px' }}>
                        BTC per USDT
                      </Typography>
                    </Box>
                  </Box>
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
                  <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '14px' }}>
                    Swap
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                      ETH Price
                    </Typography>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                      16,822.3
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                      USDC Price
                    </Typography>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                      16.8392
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
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                  >
                    <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                      Fees
                    </Typography>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                      $2.3
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>{' '}
            <Box sx={{ height: '64px', borderTop: '1px solid #E5E9EB', padding: '8px 0 16px 0' }}>
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
                Confirm Swap
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
