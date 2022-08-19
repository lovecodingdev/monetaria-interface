import { Trans } from '@lingui/macro';
import { Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

import { ListColumn } from '../../components/lists/ListColumn';
import { ListItem } from '../../components/lists/ListItem';
import { Link, ROUTES } from '../../components/primitives/Link';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { StateBadge } from './StateBadge';
import { ProposalState } from '@aave/contract-helpers';

dayjs.extend(relativeTime);

export interface MNTSpace {
  __typename: string, 
  id: string, 
  name: string
}

export interface MNTProposal {
  author: string,
  body: string,
  choices: Array<string>,
  end: number,
  id: string,
  snapshot: string,
  space: MNTSpace,
  start: number,
  state: string,
  title: string,
  __typename: string,
}

export function MNTProposalListItem({
  proposalId,
  proposal,
}: {
  proposalId: number;
  proposal: MNTProposal;
}) {
  const router = useRouter();

  return (
    <ListItem
      px={6}
      minHeight={76}
      onClick={() => router.push(ROUTES.prerenderedProposal(proposalId))}
      sx={{ cursor: 'pointer' }}
      button
    >
      <ListColumn isRow maxWidth={40}>
        <Typography variant="secondary16">{proposalId}.</Typography>
      </ListColumn>

      <ListColumn align="left">
        <Typography variant="secondary16">{proposal.title}</Typography>
      </ListColumn>

      <ListColumn align="right" maxWidth={100}>
        <Typography>{dayjs.unix(proposal.start).format('MMM DD, YYYY')}</Typography>
      </ListColumn>
      <ListColumn align="left" maxWidth={100}>
        <StateBadge
          state={
            (proposal.state.charAt(0).toUpperCase() + proposal.state.slice(1)) as ProposalState
          }
          loading={false}
        />
      </ListColumn>
    </ListItem>
  );
}
