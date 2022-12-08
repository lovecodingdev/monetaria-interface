import { Box, Container, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { SelectPicker, InputNumber, Button, ButtonToolbar, ButtonGroup, Slider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { textCenterEllipsis } from 'src/helpers/text-center-ellipsis';
import Rocket from '/public/icons/rocket.svg';

const gaugeTempData = [
  {
    label: 'mnt',
    value: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
  },
  {
    label: 'btc',
    value: '0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e600b1',
  },
];

export default function Calc() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [curGauge, setCurGause] = useState('0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1');
  const [depositValue, setDepositValue] = useState(0);
  const [liquidityValue, setLiquidityValue] = useState(0);
  const [mntAmount, setMntAmount] = useState(0);
  const [veAmount, setVeAmount] = useState(0);
  const [isVe, setIsVe] = useState(false);

  return (
    <Container
      sx={{
        pb: 0,
        flexGrow: 0,
        width: { xs: '100%', sm: '700px' },
        fontFamily: 'Gilroy, Arial !important',
        fontStyle: 'normal',
      }}
    >
      <Paper
        sx={{
          bgcolor: 'background.header',
          padding: '24px',
          mt: { xs: '8px', md: '12px' },
          color: '#F1F1F3',
          ...borderGradient,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {' '}
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
              Select a gauge
            </label>
            <SelectPicker
              data={gaugeTempData}
              style={{ width: '100%' }}
              value={curGauge}
              onChange={setCurGause}
              placeholder="Select a gauge"
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
                        {label.toUpperCase()} ({textCenterEllipsis(item.value, 5, 4)})
                      </span>
                    </Box>
                  </Box>
                );
              }}
              renderValue={(value, item) => {
                return (
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                    <Box>
                      {' '}
                      <TokenIcon symbol={item.label} sx={{ fontSize: '24px', mr: 1 }} />{' '}
                    </Box>
                    <Box>
                      {' '}
                      <span style={{ fontWeight: 500, fontSize: '18px', color: '#5B6871' }}>
                        {item.label.toUpperCase()} ({textCenterEllipsis(value, 5, 4)})
                      </span>
                    </Box>
                  </Box>
                );
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'end',
            }}
          >
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
                Deposit: Use existing deposit
              </label>
              <InputNumber value={depositValue} onChange={setDepositValue} min={0} />
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
                Pool liquidity
              </label>
              <InputNumber value={liquidityValue} onChange={setLiquidityValue} min={0} />
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
              Select
            </label>
            <ButtonToolbar>
              <ButtonGroup justified>
                <Button
                  style={{
                    backgroundColor: !isVe ? '#074592' : '#FFFFFF',
                    border: '1px solid #DDE2E4',
                    padding: '4px 12px',
                    borderRadius: '6px 0px 0px 6px',
                    color: !isVe ? 'white' : '#252C32',
                    fontWeight: 400,
                    fontSize: '14px',
                    height: '32px',
                  }}
                  onClick={() => setIsVe(false)}
                >
                  MNT
                </Button>
                <Button
                  style={{
                    backgroundColor: isVe ? '#074592' : '#FFFFFF',
                    border: '1px solid #DDE2E4',
                    padding: '4px 12px',
                    borderRadius: '0px 6px 6px 0px',
                    color: isVe ? 'white' : '#252C32',
                    fontWeight: 400,
                    fontSize: '14px',
                    height: '32px',
                  }}
                  onClick={() => setIsVe(true)}
                >
                  veMNT
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Box>
          {!isVe && (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '24px',
                  flexWrap: 'wrap',
                }}
              >
                <Box>
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
                    My MNT
                  </label>
                  <InputNumber value={mntAmount} onChange={setMntAmount} min={0} />
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
                    Locked for
                  </label>{' '}
                  <Slider
                    defaultValue={60}
                    step={20}
                    graduated
                    progress
                    min={0}
                    max={120}
                    style={{ width: downToXSM ? '300px' : '230px' }}
                    renderMark={(mark) => {
                      if ([0, 20, 40, 60, 80, 100, 120].includes(mark)) {
                        let strMark = '';
                        if (mark == 0) {
                          strMark = '1 week';
                        }
                        if (mark == 20) {
                          strMark = '1 month';
                        }
                        if (mark == 40) {
                          strMark = '3 month';
                        }
                        if (mark == 60) {
                          strMark = '6 month';
                        }
                        if (mark == 80) {
                          strMark = '1 year';
                        }
                        if (mark == 100) {
                          strMark = '2 year';
                        }
                        if (mark == 120) {
                          strMark = '4 year';
                        }
                        return (
                          <span style={{ color: '#5B6871', fontSize: '10px', fontWeight: 400 }}>
                            {strMark}
                          </span>
                        );
                      }
                      return null;
                    }}
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#1A2024' }}>
                    veMNT:{' '}
                    <span style={{ fontWeight: 600, fontSize: '14px', color: 'black' }}>
                      834.75
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          {isVe && (
            <Box>
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
                My veMNT
              </label>
              <InputNumber value={veAmount} onChange={setVeAmount} min={0} />
            </Box>
          )}
          <Button
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundImage: 'linear-gradient(#A439FF, #9582FF)',
              height: '40px',
              color: '#F6F8F9',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            Calculate
          </Button>
        </Box>
      </Paper>
      <Paper
        sx={{
          bgcolor: 'background.header',
          padding: '24px',
          mt: { xs: '8px', md: '12px' },
          mb: { xs: '16px' },
          color: '#F1F1F3',
          ...borderGradient,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {' '}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 4,
              justifyContent: 'start',
            }}
          >
            <Box sx={{ width: '220px' }}>
              <Typography sx={{ color: '#1A2024', fontWeight: 400, fontSize: '14px' }}>
                Total MNT:
              </Typography>
              <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '24px' }}>
                559695.73
              </Typography>
            </Box>
            <Box sx={{ width: '220px' }}>
              <Typography sx={{ color: '#1A2024', fontWeight: 400, fontSize: '14px' }}>
                Boost:
              </Typography>
              <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '24px' }}>
                <Rocket /> 2.50x
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ width: '230px' }}>
              <Typography sx={{ color: '#1A2024', fontWeight: 400, fontSize: '14px' }}>
                Max deposit to have max boost:
                <span style={{ fontWeight: 600, color: 'black' }}>0</span>
              </Typography>
              <Typography sx={{ color: 'black', fontWeight: 600, fontSize: '14px' }}>
                cDAI+cUSDC (0xA2B4…7A56)
              </Typography>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '220px' } }}>
              <Typography sx={{ color: '#1A2024', fontWeight: 400, fontSize: '14px' }}>
                Max deposit per veMNT to have max boost:{' '}
                <span style={{ fontWeight: 600, color: 'black' }}>0.07</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

Calc.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
