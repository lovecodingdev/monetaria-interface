import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { Row } from 'src/components/primitives/Row';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { RewardType } from './RewardType';

const data: RewardType[] = [
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    vAPY: 5.45,
    tAPR: 539,
    balance: 2329,
    profit_usd: 239,
    claimable_tokens: 2345,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    vAPY: 5.45,
    tAPR: 539,
    balance: 2329,
    profit_usd: 239,
    claimable_tokens: 2345,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    vAPY: 5.45,
    tAPR: 5329,
    balance: 23219,
    profit_usd: 2392,
    claimable_tokens: 23345,
  },
];

export const PositionMobileList = () => {
  return (
    <>
      {data.map((asset) => (
        <Box className="card-border" sx={{ my: 4, padding: 4 }} key={asset.symbol}>
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Box
              sx={{
                padding: 1.5,
                color: 'white',
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                mb: 4,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                <TokenIcon symbol={asset.symbol} sx={{ fontSize: `32px`, ml: -1 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <Box>
                    {' '}
                    <Typography
                      variant="description"
                      noWrap
                      sx={{ fontSize: '14px', fontWeight: 400, color: 'black' }}
                    >
                      {asset.symbol}
                    </Typography>
                  </Box>
                  <Box>
                    {' '}
                    <Typography
                      variant="description"
                      noWrap
                      sx={{ fontSize: '12px', fontWeight: 400, color: '#84919A' }}
                    >
                      {asset.network}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ paddingTop: '20px' }}>
            <Row
              caption={<Trans>Base vAPY</Trans>}
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <div>{asset.vAPY}%</div>
            </Row>

            <Row
              caption={<Trans>Rewards tAPR(CRV+ Incentives)</Trans>}
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>{asset.tAPR}$</Box>
            </Row>
            <Row
              caption={<Trans>Balance</Trans>}
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>{asset.balance}$</Box>
            </Row>
            <Row
              caption={<Trans>USD Profit</Trans>}
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>{asset.profit_usd}$</Box>
            </Row>
            <Row
              caption={<Trans>Claimable Tokens</Trans>}
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>{asset.claimable_tokens}</Box>
            </Row>
            <Button
              fullWidth
              sx={{
                backgroundColor: 'rgba(21, 126, 255, 0.05)',
                border: '1px solid rgba(21, 126, 255, 0.2)',
                color: '#074592',
                fontWeight: 600,
                fontSize: '16px',
              }}
            >
              Claim
            </Button>
          </Box>
        </Box>
      ))}
    </>
  );
};
