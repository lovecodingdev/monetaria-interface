import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
  AlertTitle,
  Alert,
} from '@mui/material';
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
import { useSafeAppConnection } from '@gnosis.pm/safe-apps-web3-react';

const marks = [
  {
    value: 1,
    label: '1.00x',
  },
  {
    value: 1.5,
    label: '1.50x',
  },
  {
    value: 2,
    label: '2.00x',
  },
];

const investMarks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '30',
  },
  {
    value: 3,
    label: '90',
  },
  {
    value: 4,
    label: '180',
  },
  {
    value: 5,
    label: '365',
  },
];

const coinList = [
  {
    label: 'eth',
    value: '0xc7CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
  },
  {
    label: 'btc',
    value: '0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e600b1',
  },
];

export default function FarmDetail() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [amtOfMnt, setAmtOfMnt] = useState(0);
  const [amtOfCoin, setAmtOfCoin] = useState(0);
  const [times, setTimes] = useState(1.5);
  const [investDay, setInvestDay] = useState('90');
  const [curCoin, setCurCoin] = useState('0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e600b1');
  const [isWarning, setIsWarning] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [slippage, setSlippage] = useState(0.25);

  const valuetext = (value: number) => {
    setTimes(value);
    return `${value} time(s)`;
  };

  const valuetextForInvest = (_value: number) => {
    const curMarkLabel = investMarks.filter((mark) => {
      return mark.value == _value;
    });
    setInvestDay(curMarkLabel[0].label);
    return `${curMarkLabel[0].label} Day(s)`;
  };

  return (
    <Container
      sx={{
        pb: 0,
        flexGrow: 0,
        width: { xs: '100%', sm: '700px' },
        fontFamily: 'Gilroy, Arial !important',
        fontStyle: 'normal',
        paddingTop: '33px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {isWarning && (
          <Box sx={{ marginBottom: '24px' }}>
            <Alert
              severity="error"
              onClose={() => setIsWarning(false)}
              sx={{
                backgroundColor: '#FFFCC2',
                border: '1px solid #FCF27D',
                padding: '16px 16px 20px',
              }}
            >
              <AlertTitle sx={{ color: '#252C32', fontWeight: 600, fontSize: '14px' }}>
                Warning
              </AlertTitle>
              <Typography sx={{ color: '#5B6871' }}>
                {' '}
                Please be aware of a potential large price impact when opening a large position.
                This is due to your position size compared to the underlying liquidity of the pool
                PancakeSwap BUSD-ALPACA.
              </Typography>
            </Alert>
          </Box>
        )}

        <BasicModal open={openModal} setOpen={setOpenModal} withCloseButton={true}>
          <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}>
            Settings
          </Typography>
          <Box sx={{ mt: 2 }}>
            {' '}
            <label
              style={{
                display: 'block',
                color: '#252C32',
                fontWeight: 400,
                fontSize: '14px',
                paddingBottom: '5px',
              }}
            >
              Slippage tolerance
            </label>
            <Box
              sx={{
                display: 'flex',
                border: '1px solid #DDE2E4',
                width: '279px',
                height: '40px',
                borderRadius: '6px',
                alignItems: 'center',
                paddingLeft: '10px',
              }}
            >
              {' '}
              <input
                type="number"
                className="stake-input"
                placeholder="0.00"
                step={0.01}
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                style={{
                  outline: 'none',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontWeight: 500,
                  fontSize: '18px',
                  color: '#252C32',
                  width: downToXSM ? '120px' : '100%',
                }}
              />
            </Box>
          </Box>
        </BasicModal>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box>
            <Paper
              sx={{
                bgcolor: 'background.header',
                padding: { xs: '24px 12px', sm: '24px 22px' },
                mt: { xs: '8px', md: '12px' },
                color: '#F1F1F3',
                ...borderGradient,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: { xs: '24px', sm: '20%' } }}>
                  <Box>
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
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                    <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '24px' }}>
                      Farming
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#080F26',
                        fontSize: '16px',
                        fontWeight: 400,
                      }}
                    >
                      <MntShiba /> MNT - Shiba
                    </Box>
                  </Box>
                </Box>
                <Typography sx={{ color: 'black', fontWeight: 700, fontSize: '18px' }}>
                  How much would you like to add for farming?
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
                    Available Balance: 0.01 BNB
                  </label>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: '#F6F8F9',
                      border: '1px solid #EEF0F2',
                      height: '48px',
                      alignItems: 'center',
                      padding: '0 17px',
                      borderRadius: '8px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <TokenIcon symbol={'bnb'} sx={{ fontSize: '24px', mr: 1 }} />
                      <input
                        type="number"
                        className="stake-input"
                        placeholder="0.00"
                        step={0.01}
                        value={amtOfMnt}
                        onChange={(e) => setAmtOfMnt(e.target.value)}
                        style={{
                          outline: 'none',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontWeight: 500,
                          fontSize: '18px',
                          color: '#D5DADD',
                          width: downToXSM ? '120px' : '100%',
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                      <Typography sx={{ color: '#9AA6AC', fontWeight: 400, fontSize: '12px' }}>
                        <span style={{ fontWeight: 600 }}> MNT</span>
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mt: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '6px',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      {' '}
                      <TokenIcon symbol={'bnb'} sx={{ fontSize: '20px', mr: 1 }} />
                    </Box>
                    <Typography sx={{ color: '#5B6871', fontSize: '12px', fontWeight: 400 }}>
                      1 BNB = 285 BUSD
                    </Typography>
                    <Button>Buy</Button>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                  <Button
                    sx={{
                      flex: 1,
                      backgroundColor: '#EEF0F2',
                      color: '#000000',
                      borderRadius: '8px',
                      height: '33px',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    25%
                  </Button>
                  <Button
                    sx={{
                      flex: 1,
                      backgroundColor: '#EEF0F2',
                      color: '#000000',
                      borderRadius: '8px',
                      height: '33px',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    50%
                  </Button>
                  <Button
                    sx={{
                      flex: 1,
                      backgroundColor: '#EEF0F2',
                      color: '#000000',
                      borderRadius: '8px',
                      height: '33px',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    75%
                  </Button>
                  <Button
                    sx={{
                      flex: 1,
                      backgroundColor: '#EEF0F2',
                      color: '#000000',
                      borderRadius: '8px',
                      height: '33px',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    100%
                  </Button>
                </Box>
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
                    Available Balance: 0.01 SHIBA
                  </label>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: '#F6F8F9',
                      border: '1px solid #EEF0F2',
                      height: '48px',
                      alignItems: 'center',
                      padding: '0 17px',
                      borderRadius: '8px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <TokenIcon symbol={'bnb'} sx={{ fontSize: '24px', mr: 1 }} />
                      <input
                        type="number"
                        className="stake-input"
                        placeholder="0.00"
                        step={0.01}
                        value={amtOfCoin}
                        onChange={(e) => setAmtOfCoin(e.target.value)}
                        style={{
                          outline: 'none',
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontWeight: 500,
                          fontSize: '18px',
                          color: '#D5DADD',
                          width: downToXSM ? '110px' : '100%',
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                      <Typography sx={{ color: '#9AA6AC', fontWeight: 400, fontSize: '12px' }}>
                        <span style={{ fontWeight: 600 }}>SHIBA</span>
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mt: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '6px',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      {' '}
                      <TokenIcon symbol={'bnb'} sx={{ fontSize: '20px', mr: 1 }} />
                    </Box>
                    <Typography sx={{ color: '#5B6871', fontSize: '12px', fontWeight: 400 }}>
                      1 Shiba = 285 BUSD
                    </Typography>
                    <Button>Buy</Button>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                  <Button
                    sx={{
                      flex: 1,
                      backgroundColor: '#EEF0F2',
                      color: '#000000',
                      borderRadius: '8px',
                      height: '33px',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    25%
                  </Button>
                  <Button
                    sx={{
                      flex: 1,
                      backgroundColor: '#EEF0F2',
                      color: '#000000',
                      borderRadius: '8px',
                      height: '33px',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    50%
                  </Button>
                  <Button
                    sx={{
                      flex: 1,
                      backgroundColor: '#EEF0F2',
                      color: '#000000',
                      borderRadius: '8px',
                      height: '33px',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    75%
                  </Button>
                  <Button
                    sx={{
                      flex: 1,
                      backgroundColor: '#EEF0F2',
                      color: '#000000',
                      borderRadius: '8px',
                      height: '33px',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    100%
                  </Button>
                </Box>
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
                        defaultValue={1.5}
                        step={0.5}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={1}
                        max={2}
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
                    <Box sx={{ flex: 1 }}>
                      {' '}
                      <InputGroup inside>
                        <Input value={times} />
                        <InputGroup.Addon>X</InputGroup.Addon>
                      </InputGroup>
                    </Box>
                  </Box>
                </Box>
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
                    Which asset would you like to borrow?
                  </label>
                  <Box>
                    <SelectPicker
                      data={coinList}
                      style={{ width: '100%' }}
                      value={curCoin}
                      onChange={setCurCoin}
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
                              <TokenIcon symbol={label} sx={{ fontSize: '24px', mr: 1 }} />{' '}
                            </Box>
                            <Box>
                              {' '}
                              <span style={{ fontWeight: 500, fontSize: '18px', color: '#5B6871' }}>
                                {label.toUpperCase()}
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
                                sx={{ fontSize: '24px', mr: 1 }}
                              />{' '}
                            </Box>
                            <Box>
                              {' '}
                              <span style={{ fontWeight: 500, fontSize: '18px', color: '#5B6871' }}>
                                {item.label.toUpperCase()}
                              </span>
                            </Box>
                          </Box>
                        );
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Alert
                      severity="error"
                      sx={{
                        backgroundColor: '#FFEFEB',
                        border: '1px solid #FED6CD',
                        padding: '16px',
                        borderRadius: '6px',
                      }}
                    >
                      <Typography sx={{ color: '#F76659' }}>
                        {' '}
                        Please keep in mind that when you leverage above 2x, you will have a slight
                        short on the borrowed asset. The other paired asset will have typical long
                        exposure, so choose which asset you borrow wisely.
                      </Typography>
                    </Alert>
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
                  <Box sx={{ flex: 1 }}>
                    <IconButton onClick={() => setOpenModal(true)}>
                      <SettingsIcon sx={{ color: '#023997' }} />
                    </IconButton>
                  </Box>
                  <Box sx={{ flex: 3 }}>
                    {' '}
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
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
                        Approve
                      </Button>
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
                          Simulator
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
                {downToXSM && (
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
                    Simulator
                  </Button>
                )}
              </Box>
            </Paper>
          </Box>
          <Box>
            <Paper
              sx={{
                bgcolor: 'background.header',
                padding: { xs: '24px 12px', sm: '24px 22px' },
                mt: { xs: '8px', md: '12px' },
                color: '#F1F1F3',
                ...borderGradient,
              }}
            >
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
                      defaultValue={3}
                      step={1}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetextForInvest}
                      min={1}
                      max={5}
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
            </Paper>
          </Box>
          <Box>
            <Paper
              sx={{
                bgcolor: 'background.header',
                padding: { xs: '24px 12px', sm: '24px 22px' },
                mt: { xs: '8px', md: '12px' },
                color: '#F1F1F3',
                ...borderGradient,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '11px',
                    border: '1px solid #d4e6f3',
                    padding: '10px',
                    borderRadius: '8px',
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                      Total APR
                    </Typography>
                    <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                      3.74% → 7.49%
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '10px' }}>
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                      Total APY
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                      Neutral
                    </Typography>
                    <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                      0.00 BUSD
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '11px',
                    border: '1px solid #d4e6f3',
                    padding: '10px',
                    borderRadius: '8px',
                  }}
                >
                  {' '}
                  <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '14px' }}>
                    Summary
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                      Share of Pool (PancakeSwap)
                    </Typography>
                    <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                      0.00% of 3.21M
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>{' '}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

FarmDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
