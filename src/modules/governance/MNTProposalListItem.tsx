import { Trans } from '@lingui/macro';
import { Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

import { ListColumn } from '../../components/lists/ListColumn';
import { ListItem } from '../../components/lists/ListItem';
import { Link, ROUTES } from '../../components/primitives/Link';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { StateBadge } from './StateBadge';
import { ProposalState } from '@monetaria/contract-helpers';

dayjs.extend(relativeTime);

export interface MNTSpace {
  __typename: string;
  id: string;
  name: string;
}

export interface MNTProposal {
  id: string;
  title: string;
  body: string;
  choices: Array<string>;
  start: number;
  end: number;
  snapshot: string;
  state: string;
  author: string;
  created: number;
  scores: Array<number>;
  scores_total: number;
  scores_updated: number;
  network: string;
  space: MNTSpace;
  __typename: string;
}

export function MNTProposalListItem({
  proposalId,
  proposal,
}: {
  proposalId: number;
  proposal: MNTProposal;
}) {
  const router = useRouter();

  const state = (proposal.state.charAt(0).toUpperCase() + proposal.state.slice(1)) as ProposalState;

  return (
    <ListItem
      px={6}
      minHeight={76}
      onClick={() => router.push(ROUTES.dynamicRenderedProposal(proposal.id))}
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
        <StateBadge state={state} loading={false} />
      </ListColumn>
    </ListItem>
  );
}
