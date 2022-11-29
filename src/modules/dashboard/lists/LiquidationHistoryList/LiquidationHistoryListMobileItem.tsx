import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { Row } from '../../../../components/primitives/Row';
import { LiquidationHistoryListValidator } from './type';

const data: LiquidationHistoryListValidator[] = [
  {
    date: '16/12/2022',
    dept_repaid: 234,
    remaining_dept: 234,
    collateral_lost: 500,
  },
  {
    date: '16/12/2022',
    dept_repaid: 2324,
    remaining_dept: 2134,
    collateral_lost: 5200,
  },
];

export const LiquidationHistoryListMobileItem = () => {
  return data.map((asset) => (
    <Box className="card-border" sx={{ my: 4, padding: 4 }} key={asset.symbol}>
      <Box sx={{ paddingTop: '20px' }}>
        <Row
          caption={<Trans>Dept Repaid</Trans>}
          align="flex-start"
          captionVariant="description"
          mb={2}
        >
          <Box>{asset.dept_repaid}</Box>
        </Row>
        <Row
          caption={<Trans>Remaining Dept</Trans>}
          align="flex-start"
          captionVariant="description"
          mb={2}
        >
          <Box>{asset.remaining_dept}</Box>
        </Row>
        <Row
          caption={<Trans>Collateral Lost</Trans>}
          align="flex-start"
          captionVariant="description"
          mb={2}
        >
          <Box>{asset.collateral_lost}</Box>
        </Row>
        <Row caption={<Trans>Date</Trans>} align="flex-start" captionVariant="description" mb={2}>
          <div>{asset.date}</div>
        </Row>
      </Box>
    </Box>
  ));
};
