import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
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
  const [curCoin, setCurCoin] = useState('0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e600b1');

  const valuetext = (value: number) => {
    setTimes(value);
    return `${value} Week(s)`;
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
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: { xs: '24px', sm: '98px' } }}>
          <Box>
            <Button
              startIcon={<KeyboardArrowLeftIcon />}
              href="/farm"
              sx={{
                backgroundColor: 'white',
                border: '1px solid #DDE2E4',
                borderRadius: '8px',
                color: '#252C32',
              }}
            >
              Back
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '3px' }}>
            <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '24px' }}>
              Farming
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MntShiba /> MNT - Shiba
            </Box>
          </Box>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                  MNT
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
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <TokenIcon symbol={'mnt'} sx={{ fontSize: '24px', mr: 1 }} />
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
                      Balance: <span style={{ fontWeight: 600 }}>179 MNT</span>
                    </Typography>
                    <Typography
                      sx={{
                        color: '#9AA6AC',
                        fontWeight: 400,
                        fontSize: '12px',
                        textDecoration: 'underline',
                      }}
                    >
                      Buy
                    </Typography>
                  </Box>
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
                  COIN
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
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
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
                        width: downToXSM ? '120px' : '100%',
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                    <Typography sx={{ color: '#9AA6AC', fontWeight: 400, fontSize: '12px' }}>
                      Balance: <span style={{ fontWeight: 600 }}>179 COIN</span>
                    </Typography>
                    <Typography
                      sx={{
                        color: '#9AA6AC',
                        fontWeight: 400,
                        fontSize: '12px',
                        textDecoration: 'underline',
                      }}
                    >
                      Buy
                    </Typography>
                  </Box>
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
                            <TokenIcon symbol={item.label} sx={{ fontSize: '24px', mr: 1 }} />{' '}
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
                  <IconButton>
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
                      Farm 2.0x
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
                    >
                      Simulator
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

FarmDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
