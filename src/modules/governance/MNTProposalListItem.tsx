import { Trans } from '@lingui/macro';
import { Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { ReserveSubheader } from 'src/components/ReserveSubheader';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import { IncentivesCard } from '../../components/incentives/IncentivesCard';
import { AMPLWarning } from '../../components/infoTooltips/AMPLWarning';
import { ListColumn } from '../../components/lists/ListColumn';
import { ListItem } from '../../components/lists/ListItem';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { Link, ROUTES } from '../../components/primitives/Link';
import { TokenIcon } from '../../components/primitives/TokenIcon';
import { ComputedReserveData } from '../../hooks/app-data-provider/useAppDataProvider';
import { formatProposal } from './utils/formatProposal';
import { isProposalStateImmutable } from './utils/immutableStates';
import { GovernancePageProps } from 'pages/governance/index.governance';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { StateBadge } from './StateBadge';

dayjs.extend(relativeTime);

export function MNTProposalListItem({
  proposal,
  prerendered,
  ipfs,
}: GovernancePageProps['proposals'][0]) {
  const router = useRouter();
  const { nayPercent, yaePercent, nayVotes, yaeVotes, quorumReached, diffReached } =
    formatProposal(proposal);

  const mightBeStale = prerendered && !isProposalStateImmutable(proposal);

  return (
    <ListItem
      px={6}
      minHeight={76}
      onClick={() =>
        router.push(
          prerendered
            ? ROUTES.prerenderedProposal(proposal.id)
            : ROUTES.dynamicRenderedProposal(proposal.id)
        )
      }
      sx={{ cursor: 'pointer' }}
      button
    >

      <ListColumn isRow maxWidth={40}>
        <Typography variant="secondary16">{proposal.id}.</Typography>
      </ListColumn>

      <ListColumn align="left">
        <Typography variant="secondary16">{ipfs.title}</Typography>
      </ListColumn>

      <ListColumn align="right" maxWidth={100}>
        <Typography>
          {dayjs
            .unix(proposal.executionTime || proposal.expirationTimestamp)
            .format('MMM DD, YYYY')}
        </Typography>
      </ListColumn>
      <ListColumn align="left" maxWidth={100}>
        <StateBadge state={proposal.state} loading={mightBeStale} />
      </ListColumn>
    </ListItem>
  );
};
