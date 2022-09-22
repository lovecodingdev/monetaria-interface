import { ChainId, Proposal, ProposalState } from '@monetaria/contract-helpers';
import { normalizeBN } from '@aave/math-utils';
import BigNumber from 'bignumber.js';
import { getProvider } from 'src/utils/marketsAndNetworksConfig';
import { MNTProposal } from '../MNTProposalListItem';

export function formatProposal(proposal: Omit<MNTProposal, 'values'>) {
  const forVotes = proposal.scores[0];
  const againstVotes = proposal.scores[1];
  const allVotes = new BigNumber(forVotes).plus(againstVotes);
  const yaePercent = allVotes.gt(0) ? new BigNumber(forVotes).dividedBy(allVotes).toNumber() : 0;
  const yaeVotes = forVotes;
  const nayPercent = allVotes.gt(0)
    ? new BigNumber(againstVotes).dividedBy(allVotes).toNumber()
    : 0;
  const nayVotes = againstVotes;

  return {
    totalVotes: allVotes.toNumber(),
    yaePercent,
    yaeVotes,
    nayPercent,
    nayVotes,
  };
}

const averageBlockTime = 14;

export async function enhanceProposalWithTimes(proposal: Omit<MNTProposal, 'values'>) {
  const { start: startTimestamp, created: creationTimestamp, end: expirationTimestamp} = proposal;
  return {
    ...proposal,
    startTimestamp,
    creationTimestamp,
    expirationTimestamp,
  };
}
