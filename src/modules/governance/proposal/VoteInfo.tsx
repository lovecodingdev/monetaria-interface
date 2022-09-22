import { ProposalState } from '@monetaria/contract-helpers';
import { normalize } from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import { Alert, Button, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { ConnectWalletButton } from 'src/components/WalletConnection/ConnectWalletButton';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Row } from 'src/components/primitives/Row';
import { useGovernanceDataProvider } from 'src/hooks/governance-data-provider/GovernanceDataProvider';
import { useModalContext } from 'src/hooks/useModal';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { CustomProposalType } from 'src/static-build/proposal';
import { useMntTokensProviderContext } from 'src/hooks/governance-data-provider/MntTokensDataProvider';
import { useQuery, gql } from '@apollo/client';
import { MNTProposal } from '../MNTProposalListItem';

const GET_VOTES = gql`
  query Votes($proposal: String!, $voter: String!) {
    votes (
      where: {
        proposal: $proposal
        voter: $voter
      }
    ) {
      id
      voter
      created
      choice
      vp
      vp_by_strategy
      vp_state
    }
  }
`;

export function VoteInfo({ id, state }: MNTProposal) {
  const { openGovVote } = useModalContext();
  const { currentAccount } = useWeb3Context();

  let votedPower = "0";
  let support = false;
  let didVote = false;

  const voteOngoing = state === ProposalState.Active.toLowerCase();

  const {
    mntTokens: { mnt: power },
  } = useMntTokensProviderContext();

  const { loading, data } = useQuery(GET_VOTES, {
    variables: { proposal: id, voter: currentAccount },
    context: { client: 'voting' },
  });

  if (!loading && data.votes.length > 0) {
    const vote = data.votes[0];
    support = vote.choice == 1;
    votedPower = vote.vp;
    didVote = true;
  }

  return (
    <>
      <Typography variant="h3" sx={{ mb: 8 }}>
        <Trans>Your voting info</Trans>
      </Typography>
      {currentAccount && !didVote && !voteOngoing && (
        <Typography sx={{ textAlign: 'center' }} color="text.muted">
          <Trans>You did not participate in this proposal</Trans>
        </Typography>
      )}
      {currentAccount && voteOngoing && (
        <Row
          caption={
            <>
              <Typography variant="description">
                <Trans>Voting power</Trans>
              </Typography>
            </>
          }
        >
          <Box>
            <FormattedNumber value={power || 0} variant="main16" visibleDecimals={2} />{" MNT"}
          </Box>
        </Row>
      )}
      {currentAccount && didVote && (
        <Alert severity={support ? 'success' : 'error'} sx={{ my: 2 }}>
          <Typography variant="subheader1">
            <Trans>You voted {support ? 'YAE' : 'NAY'}</Trans>
          </Typography>
          <Typography variant="caption">
            <Trans>
              With a voting power of{' '}
              <FormattedNumber value={votedPower || 0} variant="caption" visibleDecimals={2} />
            </Trans>
          </Typography>
        </Alert>
      )}
      {currentAccount && voteOngoing && Number(power) === 0 && (
        <Alert severity="warning" sx={{ my: 2 }}>
          <Trans>Not enough voting power to participate in this proposal</Trans>
        </Alert>
      )}
      {!didVote && currentAccount && voteOngoing && Number(power) !== 0 && (
        <>
          <Button
            color="success"
            variant="contained"
            fullWidth
            onClick={() => openGovVote(id, true, power)}
          >
            <Trans>Vote YAE</Trans>
          </Button>
          <Button
            color="error"
            variant="contained"
            fullWidth
            onClick={() => openGovVote(id, false, power)}
            sx={{ mt: 2 }}
          >
            <Trans>Vote NAY</Trans>
          </Button>
        </>
      )}
      {!currentAccount && <ConnectWalletButton />}
    </>
  );
}
