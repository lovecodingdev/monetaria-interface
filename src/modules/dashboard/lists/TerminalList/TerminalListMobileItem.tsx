import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { Row } from '../../../../components/primitives/Row';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { TerminalListValidator } from './type';

const data: TerminalListValidator[] = [
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    type: 'ETH borrow',
    amount: 2374.5,
    block: 'YES',
    hash_id: '2342342342342',
    date: '16/12/2022',
  },
  {
    asset: 'BTC',
    symbol: 'btc',
    network: 'BTC',
    type: 'ETH borrow',
    amount: 237.5,
    block: 'YES',
    hash_id: '2342342342342',
    date: '16/12/2022',
  },
];

export const TerminalListMobileItem = () => {
  return data.map((asset) => (
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
        <Row caption={<Trans>Type</Trans>} align="flex-start" captionVariant="description" mb={2}>
          <div>{asset.type}</div>
        </Row>

        <Row caption={<Trans>Amount</Trans>} align="flex-start" captionVariant="description" mb={2}>
          <Box>{asset.amount}</Box>
        </Row>
        <Row caption={<Trans>Block</Trans>} align="flex-start" captionVariant="description" mb={2}>
          <Box>{asset.block}</Box>
        </Row>
        <Row
          caption={<Trans>Hash Id</Trans>}
          align="flex-start"
          captionVariant="description"
          mb={2}
        >
          <Box>{asset.hash_id}</Box>
        </Row>
        <Row caption={<Trans>Date</Trans>} align="flex-start" captionVariant="description" mb={2}>
          <Box>{asset.date}</Box>
        </Row>
      </Box>
    </Box>
  ));

  // </ListMobileItemWrapper>
};
