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
  Tab,
  Tabs,
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

// Slider marks for farming simulator
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

export default function FarmDetail() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [times, setTimes] = useState(1.5);
  const [investDay, setInvestDay] = useState('90');
  const [curCoin, setCurCoin] = useState('0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e600b1');
  const [isWarning, setIsWarning] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [slippage, setSlippage] = useState(0.25);
  const [selectedTab, setSelectedTab] = useState(0);
  const [amtOfCoinA, setAmtOfCoinA] = useState(0);
  const [amtOfCoinB, setAmtOfCoinB] = useState(0);
  const [curCoinA, setCurCoinA] = useState('0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1');
  const [curCoinB, setCurCoinB] = useState('0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e607b1');
  const [curBorrow, setCurBorrow] = useState('0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e607b1');

  const valuetext = (value: number) => {
    setTimes(value);
    return `${value} time(s)`;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
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
        width: { xs: '100%', sm: '996px' },
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
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
                <Typography sx={{ color: 'black', fontWeight: 700, fontSize: '18px' }}>
                  How much would you like to add for farming?
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: { xs: '24px', sm: '20%' } }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
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
                    <Box>
                      <IconButton onClick={() => setOpenModal(true)}>
                        <SettingsIcon sx={{ color: '#84919A' }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Begin Farming Detail Paper */}
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '35px', paddingTop: '24px' }}>
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                            Add for farming
                          </Typography>
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
                          <SelectPicker
                            data={coinList}
                            style={{ width: '100%' }}
                            value={curCoinA}
                            cleanable={false}
                            placeholder="Select a coin"
                            searchable={false}
                            onChange={(value: string, e) => {
                              setCurCoinA(value);
                            }}
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
                                    <TokenIcon
                                      symbol={label}
                                      sx={{ fontSize: '32px', mr: 1 }}
                                    />{' '}
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
                            Add for farming
                          </Typography>
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
                          <SelectPicker
                            data={coinList}
                            style={{ width: '100%' }}
                            value={curCoinB}
                            cleanable={false}
                            placeholder="Select a coin"
                            searchable={false}
                            onChange={(value: string, e) => {
                              setCurCoinB(value);
                            }}
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
                                    <TokenIcon
                                      symbol={label}
                                      sx={{ fontSize: '32px', mr: 1 }}
                                    />{' '}
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
                    <Box
                      className="custom-select"
                      sx={{ width: '140px', backgroundColor: '#F6F8F9', borderRadius: '8px' }}
                    >
                      <SelectPicker
                        data={coinList}
                        style={{ width: '100%' }}
                        value={curBorrow}
                        cleanable={false}
                        placeholder="Select a coin"
                        searchable={false}
                        onChange={(value: string, e) => {
                          setCurBorrow(value);
                        }}
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
                          Please keep in mind that when you leverage above 2x, you will have a
                          slight short on the borrowed asset. The other paired asset will have
                          typical long exposure, so choose which asset you borrow wisely.
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
                {/** Tab for Overview and Simulator */}
                <Box sx={{ flex: 1 }}>
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
                  {selectedTab == 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                        border: '1px solid #d4e6f3',
                        padding: '15px',
                        borderRadius: '8px',
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
                            <Typography
                              sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}
                            >
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
                  )}
                  {selectedTab == 1 && (
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
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

FarmDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
