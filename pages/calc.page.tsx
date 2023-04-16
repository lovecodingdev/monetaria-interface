import { Box, Container, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { SelectPicker, InputNumber, Button, ButtonToolbar, ButtonGroup } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Rocket from '/public/icons/rocket.svg';
import Slider from '@mui/material/Slider';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { TokenOption } from 'src/components/TokenOption';
import { useTxBuilderContext } from 'src/hooks/useTxBuilder';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

export default function Calc() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [curGauge, setCurGause] = useState<string>();
  const [depositValue, setDepositValue] = useState(0);
  const [liquidityValue, setLiquidityValue] = useState(0);
  const [mntAmount, setMntAmount] = useState(0);
  const [veAmount, setVeAmount] = useState(0);
  const [isVe, setIsVe] = useState(false);
  const [lockPeriod, setLockPeriod] = useState(26);
  const [boost, setBoost] = useState(1.0);

  const { currentAccount } = useWeb3Context();
  const { currentMarketData } = useProtocolDataContext();
  const { gauges } = useTxBuilderContext();

  const gaugePickerData = [];
  for (const key in currentMarketData.addresses.GAUGES) {
    gaugePickerData.push({
      label: key,
      value: currentMarketData.addresses.GAUGES[key],
    });
  }

  const valuetext = (value: number) => {
    setLockPeriod(value);
    return `${value} Week(s)`;
  };

  const handleCalculate = async () => {
    if(!curGauge) return;
    let gauge = gauges[curGauge];
    let [, _boost] = await gauge.calcUpdateLiquidityGauge({
      user: currentAccount,
      l: depositValue.toString(),
      L: liquidityValue.toString(),
      veCRV: veAmount.toString(),
      totalveCRV: veAmount.toString(),
    })
    console.log({_boost})
    setBoost(_boost);
  }

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
              data={gaugePickerData}
              style={{ width: '100%' }}
              value={curGauge}
              onChange={(value) => setCurGause(value || '')}
              placeholder="Select a gauge"
              searchable={false}
              renderMenuItem={(label, item) => <TokenOption item={item} />}
              renderValue={(value, item) => <TokenOption item={item} />}
              cleanable={false}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'end',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{flex: 1}}>
              <label
                style={{
                  display: 'block',
                  color: '#252C32',
                  fontWeight: 400,
                  fontSize: '14px',
                  paddingBottom: '5px',
                }}
              >
                Deposit:
              </label>
              <InputNumber
                value={depositValue}
                onChange={(value) => setDepositValue(Number(value))}
                min={0}
              />
            </Box>
            <Box sx={{flex: 1}}>
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
              <InputNumber
                value={liquidityValue}
                onChange={(value) => setLiquidityValue(Number(value))}
                min={0}
              />
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '24px',
                  flexWrap: 'wrap',
                  alignItems: 'start',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ width: { xs: '100%', sm: '30%' } }}>
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
                  <InputNumber
                    value={mntAmount}
                    onChange={(value) => setMntAmount(Number(value))}
                    min={0}
                  />
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
                  <Box
                    sx={{
                      padding: '5px 10px',
                      display: 'flex',
                      justifyContent: 'center',
                      width: { xs: 330, md: 295 },
                      flexDirection: 'column',
                    }}
                  >
                    {' '}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        color: '#252C32',
                        fontWeight: 400,
                        fontSize: '14px',
                      }}
                    >
                      {lockPeriod} Week(s)
                    </Box>{' '}
                    <Box>
                      <Slider
                        aria-label="Custom marks"
                        defaultValue={26}
                        getAriaValueText={valuetext}
                        step={1}
                        valueLabelDisplay="auto"
                        min={1}
                        max={52}
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
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#1A2024' }}>
                  veMNT:{' '}
                  <span style={{ fontWeight: 600, fontSize: '14px', color: 'black' }}>834.75</span>
                </Typography>
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
              <InputNumber
                value={veAmount}
                onChange={(value) => setVeAmount(Number(value))}
                min={0}
              />
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
            onClick={handleCalculate}
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
                <Rocket /> {boost.toFixed(2)}x
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
