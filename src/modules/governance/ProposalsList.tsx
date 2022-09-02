import { ProposalState } from '@aave/contract-helpers';
import { Trans } from '@lingui/macro';
import {
  Box,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { GovernancePageProps } from 'pages/governance/index.governance';
import { useState } from 'react';
import { usePolling } from 'src/hooks/usePolling';
import { getProposalMetadata } from 'src/modules/governance/utils/getProposalMetadata';
import { governanceContract } from 'src/modules/governance/utils/governanceProvider';
import { isProposalStateImmutable } from 'src/modules/governance/utils/immutableStates';
import { governanceConfig } from 'src/ui-config/governanceConfig';

import { ProposalListItem } from './ProposalListItem';
import { MNTProposalListItem, MNTProposal } from './MNTProposalListItem';
import { enhanceProposalWithTimes } from './utils/formatProposal';

import { ListColumn } from '../../components/lists/ListColumn';
import { ListHeaderTitle } from '../../components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from '../../components/lists/ListHeaderWrapper';
import { useQuery, gql } from '@apollo/client';

const GET_PROPOSALS = gql`
  query Proposals {
    proposals(
      skip: 0
      where: { space_in: ["mnt.eth"] }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      author
      created
      scores
      scores_by_strategy
      scores_total
      scores_updated
      plugins
      network
      strategies {
        name
        network
        params
      }
      space {
        id
        name
      }  
    }
  }
`;

export function ProposalsList({ proposals: initialProposals }: GovernancePageProps) {

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value as string);
  };

  const { loading, data } = useQuery(GET_PROPOSALS, { context: { client: 'voting' } });

  const header = [
    {
      title: <Trans>Id</Trans>,
      sortKey: 'symbol',
      maxWidth: 40,
    },
    {
      title: <Trans>Name</Trans>,
      sortKey: 'name',
    },
    {
      title: <Trans>Executed on</Trans>,
      sortKey: 'executed_on',
      align: 'right',
    },
    {
      title: <Trans>Status</Trans>,
      sortKey: 'status',
      maxWidth: 100,
    },
  ];

  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);

  return (
    <div>
      <Box
        sx={{
          px: 6,
          py: 8,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          <Trans>Proposals</Trans>
        </Typography>
        <Typography sx={{ mx: 4 }}>
          <Trans>Filter</Trans>
        </Typography>
        <Select id="filter" value={'all'} sx={{ minWidth: 140 }} onChange={handleChange}>
          <MenuItem value="all">
            <Trans>All proposals</Trans>
          </MenuItem>
          {Object.keys(ProposalState).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {/* {(loadingNewProposals || updatingPendingProposals) && <LinearProgress />} */}
      <ListHeaderWrapper px={6}>
        {header.map((col) => (
          <ListColumn
            isRow={col.sortKey === 'symbol'}
            align={col.align ? 'right' : 'left'}
            maxWidth={col.maxWidth}
            key={col.sortKey}
          >
            <ListHeaderTitle>{col.title}</ListHeaderTitle>
          </ListColumn>
        ))}
        {/* <ListColumn maxWidth={95} minWidth={95} /> */}
      </ListHeaderWrapper>
      {!loading && 
        data.proposals.map((proposal: MNTProposal, index: number) => (
          <MNTProposalListItem key={index} proposalId={index + 1} proposal={proposal} />
        ))
      }
      {/* {proposals
        .slice()
        .reverse()
        .filter(
          (proposal) => proposalFilter === 'all' || proposal.proposal.state === proposalFilter
        )
        .map(({ proposal, prerendered, ipfs }) => (
          <MNTProposalListItem
            key={proposal.id}
            proposal={proposal}
            ipfs={ipfs}
            prerendered={prerendered}
          />
        ))} */}
    </div>
  );
}
