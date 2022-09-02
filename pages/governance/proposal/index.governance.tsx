import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GovVoteModal } from 'src/components/transactions/GovVote/GovVoteModal';
import { GovernanceDataProvider } from 'src/hooks/governance-data-provider/GovernanceDataProvider';
import { usePolling } from 'src/hooks/usePolling';
import { MainLayout } from 'src/layouts/MainLayout';
import { enhanceProposalWithTimes } from 'src/modules/governance/utils/formatProposal';
import { getProposalMetadata } from 'src/modules/governance/utils/getProposalMetadata';
import { governanceContract } from 'src/modules/governance/utils/governanceProvider';
import { isProposalStateImmutable } from 'src/modules/governance/utils/immutableStates';
import { IpfsType } from 'src/static-build/ipfs';
import { CustomProposalType } from 'src/static-build/proposal';
import { governanceConfig } from 'src/ui-config/governanceConfig';
import ProposalPage from './[proposalId].governance';
import { MntTokensBalanceProvider } from 'src/hooks/governance-data-provider/MntTokensDataProvider';
import { useQuery, gql } from '@apollo/client';
import { MNTProposal } from 'src/modules/governance/MNTProposalListItem';

const GET_PROPOSAL = gql`
  query Proposal($id: String!){
    proposal(id: $id) {
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

export default function DynamicProposal() {
  const router = useRouter();
  const id = router.query.proposalId;

  const { data, loading } = useQuery(
    GET_PROPOSAL,
    {
      variables: { id },
      context: { client: 'voting' }
    }
  );

  return loading ? <></> : <ProposalPage proposal={data.proposal} />;
}

DynamicProposal.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MainLayout>
      <GovernanceDataProvider>
        <MntTokensBalanceProvider>
          {page}
          <GovVoteModal />
        </MntTokensBalanceProvider>
      </GovernanceDataProvider>
    </MainLayout>
  );
};
