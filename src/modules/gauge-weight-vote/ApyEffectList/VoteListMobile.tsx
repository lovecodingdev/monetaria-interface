import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { Row } from '../../../components/primitives/Row';
import { textCenterEllipsis } from 'src/helpers/text-center-ellipsis';
import { VoteListDataValidator } from './type';

const data: VoteListDataValidator[] = [
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Yap',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Yap',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Nay',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Nay',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Yap',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Yap',
  },
  {
    voter: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    amount: 27212636.65,
    answer: 'Yap',
  },
];

export const VoteListMobile = () => {
  return data.map((asset, index) => (
    <Box className="card-border" sx={{ padding: 4 }} key={index}>
      <Box sx={{ paddingTop: '20px' }}>
        <Row
          caption={
            <Trans>
              <span style={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>Voter</span>
            </Trans>
          }
          align="flex-start"
          captionVariant="description"
          mb={2}
        >
          <div style={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
            {textCenterEllipsis(asset.voter, 5, 6)}
          </div>
        </Row>

        <Row
          caption={
            <Trans>
              <span style={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>MNT</span>
            </Trans>
          }
          align="flex-start"
          captionVariant="description"
          mb={2}
        >
          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>{asset.amount}</Box>
        </Row>
        <Row
          caption={
            <Trans>
              <span style={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>Answer</span>
            </Trans>
          }
          align="flex-start"
          captionVariant="description"
          mb={2}
        >
          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>{asset.answer}</Box>
        </Row>
      </Box>
    </Box>
  ));

  // </ListMobileItemWrapper>
};
