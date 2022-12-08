import { Trans } from '@lingui/macro';
import { Box, Container, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { SelectPicker, InputNumber, Button, ButtonToolbar, ButtonGroup } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const gaugeData = ['All', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  (item) => ({ label: item, value: item })
);

export default function Calc() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [curGauge, setCurGause] = useState('All');
  const [depositValue, setDepositValue] = useState(0);
  const [liquidityValue, setLiquidityValue] = useState(0);

  return (
    <Container
      sx={{
        pb: 0,
        flexGrow: 0,
        width: { xs: '100%', xsm: '650px' },
        fontFamily: 'Gilroy, Arial !important',
        fontStyle: 'normal',
      }}
    >
      <Paper
        sx={{
          bgcolor: 'background.header',
          padding: '24px',
          mt: { xs: '16px', md: '24px' },
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
              data={gaugeData}
              style={{ width: '100%' }}
              value={curGauge}
              onChange={setCurGause}
              searchable={false}
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
                    backgroundColor: '#074592',
                    padding: '4px 12px',
                    borderRadius: '6px 0px 0px 6px',
                    color: 'white',
                    fontWeight: 400,
                    fontSize: '14px',
                  }}
                >
                  MNT
                </Button>
                <Button
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DDE2E4',
                    padding: '4px 12px',
                    borderRadius: '0px 6px 6px 0px',
                    color: '#252C32',
                    fontWeight: 400,
                    fontSize: '14px',
                  }}
                >
                  veMNT
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

Calc.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
