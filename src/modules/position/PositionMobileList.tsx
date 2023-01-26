import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { Row } from 'src/components/primitives/Row';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { PositionType } from './PositionType';
import { TokenPair } from 'src/components/primitives/TokenPair';

const data: PositionType[] = [
  {
    asset: 'BUSD',
    symbol: 'busd',
    no: 57287,
    tokenA: 'bnb',
    tokenB: 'busd',
    protocol: 'Pancake Swap',
    position_value: 39.98,
    debt_value: 0,
    current_apy: 1.03,
    debt_ratio: 0,
    liq_threshold: 'No Debt',
    safety_buffer: 'No Debt',
  },
  {
    asset: 'BUSD',
    symbol: 'busd',
    no: 57288,
    tokenA: 'bnb',
    tokenB: 'usdt',
    protocol: 'Pancake Swap',
    position_value: 39.98,
    debt_value: 0,
    current_apy: 1.03,
    debt_ratio: 0,
    liq_threshold: 'No Debt',
    safety_buffer: 'No Debt',
  },
  {
    asset: 'BUSD',
    symbol: 'busd',
    no: 57289,
    tokenA: 'bnb',
    tokenB: 'cake',
    protocol: 'Pancake Swap',
    position_value: 39.98,
    debt_value: 0,
    current_apy: 1.03,
    debt_ratio: 0,
    liq_threshold: 'No Debt',
    safety_buffer: 'No Debt',
  },
];

export const PositionMobileList = () => {
  return (
    <>
      {data.map((rowObject) => (
        <Box className="card-border" sx={{ my: 4, padding: 4 }} key={rowObject.symbol}>
          <Box
            sx={{
              color: 'white',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <TokenPair tokenA={rowObject.tokenA} tokenB={rowObject.tokenB} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingLeft: '8px',
                  pr: 12,
                }}
              >
                <Typography sx={{ color: '#080F26', fontSize: '16px' }}>
                  {rowObject.asset}
                </Typography>
                <Typography sx={{ color: '#84919A' }}>{rowObject.protocol}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ paddingTop: '20px' }}>
            <Row
              caption={<Trans>Position Value</Trans>}
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <div>{rowObject.position_value}</div>
            </Row>

            <Row
              caption={<Trans>Debt Value</Trans>}
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>{rowObject.debt_value}</Box>
            </Row>
            <Row
              caption={<Trans>Current APY</Trans>}
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>{rowObject.current_apy}</Box>
            </Row>
            <Row
              caption={<Trans>Debt Ratio</Trans>}
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>{rowObject.debt_ratio}</Box>
            </Row>
            <Row
              caption={<Trans>Liquidation Thresh</Trans>}
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>{rowObject.liq_threshold}</Box>
            </Row>
            <Row
              caption={<Trans>Safety Buffer</Trans>}
              align="flex-start"
              captionVariant="description"
              mb={6}
            >
              <Box>{rowObject.safety_buffer}</Box>
            </Row>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Button
                sx={{
                  flex: 1,
                  backgroundColor: 'rgba(21, 126, 255, 0.05)',
                  border: '1px solid rgba(21, 126, 255, 0.2)',
                  color: '#074592',
                  fontWeight: 600,
                  fontSize: '16px',
                  marginTop: '-4px',
                }}
              >
                Adjust
              </Button>
              <Button
                sx={{
                  flex: 1,
                  backgroundColor: '#074592',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '16px',
                  marginTop: '-4px',
                }}
                variant="contained"
              >
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};
