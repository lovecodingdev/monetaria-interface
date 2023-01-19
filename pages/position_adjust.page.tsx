import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
  Tab,
  Tabs,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { InputGroup, Input, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Slider from '@mui/material/Slider';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SettingsIcon from '@mui/icons-material/Settings';
import MntShiba from '/public/icons/tokens/mnt-shiba.svg';
import { BasicModal } from 'src/components/primitives/BasicModal';
import { useRouter } from 'next/router';
import { BorrowMoreToolTip, BorrowMoreToolTipProps } from 'src/components/BorrowMoreTooltip';
// Slider marks for farming simulator
const marks = [
  {
    value: 1,
    label: '1x',
  },
  {
    value: 5,
    label: '5x',
  },
  {
    value: 10,
    label: '10x',
  },
  {
    value: 15,
    label: '15x',
  },
  {
    value: 20,
    label: '20x',
  },
  {
    value: 25,
    label: '25x',
  },
  {
    value: 30,
    label: '30x',
  },
  {
    value: 35,
    label: '35x',
  },
  {
    value: 40,
    label: '40x',
  },
  {
    value: 45,
    label: '45x',
  },
  {
    value: 50,
    label: '50x',
  },
];

const investMarks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 90,
    label: '90',
  },
  {
    value: 180,
    label: '180',
  },
  {
    value: 365,
    label: '365',
  },
];

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

// Tab CSS
const NewTabs = styled(Tabs)({
  minHeight: '24px',
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
  height: 40px;
  width: 49%;
  color: #b0babf;
  &.Mui-selected,
  &:hover {
    background: #eef0f2;
    border-radius: 100px;
    color: #000000;
    font-weight: bold;
  }
`;

export default function PositionAdjust() {
  const router = useRouter();
  const tokenAParams = router.query.tknA;

  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [times, setTimes] = useState(1.5);
  const [investDay, setInvestDay] = useState('180');
  const [curCoin, setCurCoin] = useState('0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e600b1');
  const [isWarning, setIsWarning] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalForGraph, setOpenModalForGraph] = useState(false);
  const [slippage, setSlippage] = useState(0.25);
  const [selectedTab, setSelectedTab] = useState(0);
  const [amtOfCoinA, setAmtOfCoinA] = useState(0);
  const [amtOfCoinB, setAmtOfCoinB] = useState(0);
  const [curBorrow, setCurBorrow] = useState('0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e607b1');

  const valuetext = (value: number) => {
    setTimes(value);
    return `${value} time(s)`;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const valuetextForInvest = (_value: number) => {
    setInvestDay(_value);
  };

  return (
    <Container
      sx={{
        pb: 0,
        flexGrow: 0,
        width: { xs: '100%', sm: '1026px' },
        fontFamily: 'Gilroy, Arial !important',
        fontStyle: 'normal',
        pt: '33px',
        pb: '33px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Paper
          sx={{
            bgcolor: 'background.header',
            padding: { xs: '24px 12px', sm: '13px 22px' },
            color: '#F1F1F3',
            ...borderGradient,
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <IconButton
                  href="/farm"
                  sx={{
                    backgroundColor: 'transparent',
                    color: '#252C32',
                  }}
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
              </Box>
              {!downToXSM && (
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ color: 'black', fontWeight: 700, fontSize: '24px' }}>
                    Adjust Position
                  </Typography>
                </Box>
              )}
              {downToXSM && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#080F26',
                    fontSize: '16px',
                    fontWeight: 400,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <TokenIcon symbol={'bnb'} sx={{ fontSize: '32px', mr: -1, zIndex: 1 }} />
                    <TokenIcon symbol={'usdt'} sx={{ fontSize: '32px', mr: 1 }} />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '8px',
                    }}
                  >
                    <Typography>SHB-BNB</Typography>
                  </Box>
                </Box>
              )}

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: { xs: '24px', sm: '20%' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                  {!downToXSM && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#080F26',
                        fontSize: '16px',
                        fontWeight: 400,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: '400px',
                            fontSize: '16px',
                            mr: '8px',
                          }}
                        >
                          BUSD#57287
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <TokenIcon
                            symbol={'bnb'}
                            sx={{
                              width: '16px',
                              height: '16px',
                              fontSize: '32px',
                              mr: -2,
                              zIndex: 1,
                            }}
                          />
                          <TokenIcon
                            symbol={'usdt'}
                            sx={{
                              width: '16px',
                              height: '16px',
                              fontSize: '32px',
                              mr: '8px',
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: '400px',
                              fontSize: '16px',
                            }}
                          >
                            SHB-BNB
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  <Box>
                    <IconButton onClick={() => setOpenModal(true)}>
                      <SettingsIcon sx={{ color: '#84919A' }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                height: '1px',
                ml: { xs: '-12px', sm: '-22px' },
                width: { xs: 'calc(100% + 24px)', sm: 'calc(100% + 44px)' },
                marginTop: '17px',
                background: '#E5E9EB',
              }}
            ></Box>
          </Box>

          {/* Begin Farming Detail Paper */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: '21px', sm: '35px' },
              paddingTop: '24px',
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Typography sx={{ color: 'black', fontWeight: 700, fontSize: '18px' }}>
                  How much collateral would you like to add?
                </Typography>
                <Typography sx={{ color: 'black', fontWeight: 400, fontSize: '12px' }}>
                  Collateral added will be optimally swapped into equal values of each asset and
                  then added as LP.
                </Typography>
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
                      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                        <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '14px' }}>
                          Add for farming
                        </Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}>
                      Balance: 0.01 BNB
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
                      className="custom-select"
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '4px',
                        alignItems: 'center',
                      }}
                    >
                      {!downToXSM && (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#023997',
                            color: 'white',
                            height: '24px',
                            minWidth: 'auto',
                          }}
                        >
                          Max
                        </Button>
                      )}
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
                          <TokenIcon symbol={'btc'} sx={{ fontSize: '32px', mr: 1 }} />{' '}
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {' '}
                          <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#080F26' }}>
                            BTC
                          </Typography>{' '}
                        </Box>
                      </Box>
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                        <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '14px' }}>
                          Add for farming
                        </Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ color: '#84919A', fontWeight: 400, fontSize: '14px' }}>
                      Balance: 0.01 USDT
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
                        value={amtOfCoinB}
                        onChange={(e) => setAmtOfCoinB(e.target.value)}
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
                      className="custom-select"
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '4px',
                        alignItems: 'center',
                      }}
                    >
                      {!downToXSM && (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#023997',
                            color: 'white',
                            height: '24px',
                            minWidth: 'auto',
                          }}
                        >
                          Max
                        </Button>
                      )}
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
                          <TokenIcon symbol={'usdt'} sx={{ fontSize: '32px', mr: 1 }} />{' '}
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {' '}
                          <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#080F26' }}>
                            USDT
                          </Typography>{' '}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <BorrowMoreToolTip
                  text={`You can increase the leverage to borrow more and amplify your potential gains or you could decrease the leverage to lower risk.`}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Borrow More?"
                      sx={{ color: 'black', fontSize: '14px', fontWeight: '400px' }}
                    />
                  </FormGroup>
                </BorrowMoreToolTip>
              </Box>
              <Box>
                <Typography sx={{ color: 'black', fontWeight: 700, fontSize: '18px' }}>
                  How much more would you like to borrow?
                </Typography>
                <Typography sx={{ color: 'black', fontWeight: 400, fontSize: '12px' }}>
                  Current Position Leverage: 1.00x
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box>
                    <label
                      style={{
                        display: 'block',
                        color: '#252C32',
                        fontWeight: 400,
                        fontSize: '14px',
                        paddingBottom: '5px',
                      }}
                    >
                      Leverage
                    </label>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '12px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box sx={{ flex: 3, padding: '0 10px' }}>
                        {' '}
                        <Slider
                          aria-label="Custom marks"
                          defaultValue={25}
                          step={1}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                          min={1}
                          max={50}
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
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ flex: 3 }}>
                  {' '}
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                    {!downToXSM && (
                      <Button
                        sx={{
                          flex: 1,
                          backgroundColor: 'rgba(21, 126, 255, 0.05)',
                          border: '1px solid rgba(21, 126, 255, 0.2)',
                          color: '#023997',
                          fontWeight: 600,
                          fontSize: '14px',
                        }}
                      >
                        Simulate Your Position
                      </Button>
                    )}
                    {!downToXSM && (
                      <Button
                        sx={{
                          flex: 1,
                          backgroundColor: '#074592',
                          border: '1px solid rgba(21, 126, 255, 0.2)',
                          color: '#F6F8F9',
                          fontWeight: 600,
                          fontSize: '14px',
                        }}
                        variant="contained"
                      >
                        Adjust Position
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
            {/** Tab for Overview and Simulator */}
            <Box sx={{ flex: 1 }}>
              {!downToXSM && (
                <NewTabs
                  value={selectedTab}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                  }}
                >
                  <NewTab
                    label="Overview"
                    sx={{
                      fontSize: { xs: '14px', md: '14px' },
                      fontFamily: 'Gilroy,Arial !important',
                      fontStyle: 'normal',
                    }}
                  />
                  <NewTab
                    label="Farming Simulator"
                    sx={{
                      fontSize: { xs: '14px', md: '14px' },
                      fontFamily: 'Gilroy,Arial !important',
                      fontStyle: 'normal',
                    }}
                  />
                </NewTabs>
              )}

              {selectedTab == 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    border: '1px solid #d4e6f3',
                    padding: '15px',
                    borderRadius: '8px',
                    backgroundColor: '#F6F8F9',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '11px',
                    }}
                  >
                    {' '}
                    <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '14px' }}>
                      Overview
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Yield Farm APR
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        3.74% → 7.49%
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Trading Fees APR(7-day avg.)
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        3.74% → 7.49%
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        MNT Rewards APR
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
                        <TokenIcon symbol={'mnt'} sx={{ fontSize: '16px', mr: 1 }} />
                        <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                          1.25%
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Borrowing Interest APR
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        -1.25%
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Total APR
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        3.74% → 7.49%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: '#252C32', fontWeight: 500, fontSize: '10px' }}>
                        (Yield Farming + Trading Fees + ALPACA Rewards – Borrowing Interest)
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Total APY
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        3.74% → 7.49%
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '11px',
                    }}
                  >
                    {' '}
                    <Typography
                      sx={{
                        color: '#59729D',
                        fontWeight: 500,
                        fontSize: '14px',
                      }}
                    >
                      Summary
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Neutral
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        0.00 BUSD
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Assets Supplied(Equity Value before fees)
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        0 MNT+ 0 BUSD
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Assets Borrowed(Debt Value)
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        0.00 MNT
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Assets Borrowed(Debt Value)
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        0.00%
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Total Assets inPosition Value
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        0.00 ALPACA+ 0.00 BUSD
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Share of Pool (Alpaca Finance)
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        0.00% of 3.21M
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                        Share of Pool (PancakeSwap)
                      </Typography>
                      <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                        0.00% of 3.21M
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {selectedTab == 1 && !downToXSM && (
                <>
                  <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}>
                    Farming Simulator
                  </Typography>
                  <Box>
                    <label
                      style={{
                        display: 'block',
                        color: '#252C32',
                        fontWeight: 400,
                        fontSize: '14px',
                        paddingBottom: '5px',
                      }}
                    >
                      Invest Days:
                    </label>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '12px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box sx={{ flex: 3, padding: '0 10px' }}>
                        {' '}
                        <Slider
                          aria-label="Custom marks"
                          defaultValue={180}
                          step={1}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetextForInvest}
                          min={1}
                          max={365}
                          marks={investMarks}
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
                      <Box sx={{ flex: 1 }}>
                        {' '}
                        <InputGroup inside>
                          <Input value={investDay} />
                          <InputGroup.Addon></InputGroup.Addon>
                        </InputGroup>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
            {downToXSM && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: 'rgba(21, 126, 255, 0.05)',
                    border: '1px solid rgba(21, 126, 255, 0.2)',
                    color: '#023997',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                  fullWidth
                  onClick={() => {
                    setOpenModalForGraph(true);
                  }}
                >
                  Simulate Your Position
                </Button>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: '#074592',
                    border: '1px solid rgba(21, 126, 255, 0.2)',
                    color: '#F6F8F9',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                  variant="contained"
                  fullWidth
                >
                  Farm 6x
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

PositionAdjust.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
