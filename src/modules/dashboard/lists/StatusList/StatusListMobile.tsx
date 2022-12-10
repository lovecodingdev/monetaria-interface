import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
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
        <Row caption={<Trans>No</Trans>} align="flex-start" captionVariant="description" mb={2}>
          <div>{asset.no}</div>
        </Row>

        <Row caption={<Trans>Name</Trans>} align="flex-start" captionVariant="description" mb={2}>
          <Box>{asset.name}</Box>
        </Row>
        <Row caption={<Trans>Status</Trans>} align="flex-start" captionVariant="description" mb={2}>
          <Box>{asset.status}</Box>
        </Row>
      </Box>
    </Box>
  ));

  // </ListMobileItemWrapper>
};
