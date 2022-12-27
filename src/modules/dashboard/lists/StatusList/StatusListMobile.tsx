import { Trans } from '@lingui/macro';
import { Box, Typography, Chip } from '@mui/material';
import { Row } from '../../../../components/primitives/Row';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { StatusListDataValidator } from './type';

const data: StatusListDataValidator[] = [
  {
    no: 1,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Executed',
    bgColor: '#EBFFF1',
    color: '#119C2B',
  },
  {
    no: 2,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Canceled',
    bgColor: '#EEF0F2',
    color: '#252C32',
  },
  {
    no: 3,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Failed',
    bgColor: '#FFEFEB',
    color: '#CC0905',
  },
  {
    no: 4,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Failed',
    bgColor: '#FFEFEB',
    color: '#CC0905',
  },
  {
    no: 5,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Failed',
    bgColor: '#FFEFEB',
    color: '#CC0905',
  },
  {
    no: 6,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Failed',
    bgColor: '#FFEFEB',
    color: '#CC0905',
  },
  {
    no: 7,
    name: 'Ramp gamma from 0.000145 to 0.0002 9 and A from 10 * (4*1e4) to 20 (4*1e4) for bLUSD pool',
    status: 'Failed',
    bgColor: '#FFEFEB',
    color: '#CC0905',
  },
];

export const StatusListMobile = () => {
  return data.map((asset) => (
    <Box className="card-border" sx={{ padding: 4 }} key={asset.symbol}>
      <Box sx={{ paddingTop: '20px' }}>
        <Row
          caption={
            <Typography sx={{ color: '#252C32', fontWeight: 600, fontSize: '14px' }}>
              {asset.name}
            </Typography>
          }
          align="flex-start"
          captionVariant="description"
          mb={2}
        >
          <Box sx={{ color: '#252C32', fontWeight: 400, fontSize: '14px' }}>{asset.no}</Box>
        </Row>
        <Row
          caption={
            <Trans>
              <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '14px' }}>
                Status
              </Typography>
            </Trans>
          }
          align="flex-start"
          captionVariant="description"
          mb={2}
        >
          <Box>
            <Chip
              label={asset.status}
              sx={{
                color: `${asset.color}`,
                backgroundColor: `${asset.bgColor}`,
                fontWeight: 600,
                fontSize: '14px',
                borderRadius: '6px',
              }}
            />
          </Box>
        </Row>
      </Box>
    </Box>
  ));

  // </ListMobileItemWrapper>
};
