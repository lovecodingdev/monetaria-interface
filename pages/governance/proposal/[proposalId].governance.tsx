import { normalize } from '@aave/math-utils';
import { DownloadIcon, ExternalLinkIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { Twitter } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  styled,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Meta } from 'src/components/Meta';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Row } from 'src/components/primitives/Row';
import { GovernanceDataProvider } from 'src/hooks/governance-data-provider/GovernanceDataProvider';
import { MainLayout } from 'src/layouts/MainLayout';
import { ProposalTopPanel } from 'src/modules/governance/proposal/ProposalTopPanel';
import { VoteInfo } from 'src/modules/governance/proposal/VoteInfo';
import { StateBadge } from 'src/modules/governance/StateBadge';
import {
  enhanceProposalWithTimes,
  formatProposal,
} from 'src/modules/governance/utils/formatProposal';
import { governanceContract } from 'src/modules/governance/utils/governanceProvider';
import { isProposalStateImmutable } from 'src/modules/governance/utils/immutableStates';
import { VoteBar } from 'src/modules/governance/VoteBar';
import { Ipfs, IpfsType } from 'src/static-build/ipfs';
import { CustomProposalType, Proposal } from 'src/static-build/proposal';
import { governanceConfig } from 'src/ui-config/governanceConfig';
import { Link } from 'src/components/primitives/Link';

import { ContentContainer } from '../../../src/components/ContentContainer';
import { GovVoteModal } from 'src/components/transactions/GovVote/GovVoteModal';
import { FormattedProposalTime } from 'src/modules/governance/FormattedProposalTime';
// import { Vote } from 'src/static-build/vote';
import { useQuery, gql } from '@apollo/client';
import { apolloClient } from 'src/utils/apolloClient';
import { MNTProposal } from 'src/modules/governance/MNTProposalListItem';
import { MntTokensBalanceProvider } from 'src/hooks/governance-data-provider/MntTokensDataProvider';
import { ProposalState } from '@aave/contract-helpers';

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

// export async function getStaticPaths() {
//   const ProposalFetcher = new Proposal();
//   const paths = [...Array(ProposalFetcher.count()).keys()].map((id) => ({
//     params: { proposalId: id.toString() },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }: { params: { proposalId: string } }) {
//   const IpfsFetcher = new Ipfs();
//   const ProposalFetcher = new Proposal();
//   // const VoteFetcher = new Vote();

//   const proposal = ProposalFetcher.get(Number(params.proposalId));
//   return {
//     props: {
//       proposal,
//       ipfs: IpfsFetcher.get(Number(params.proposalId)),
//       prerendered: true,
//       // votes: await VoteFetcher.get(
//       //   Number(params.proposalId),
//       //   proposal.startBlock,
//       //   proposal.endBlock
//       // ),
//     },
//   };
// }

interface ProposalPageProps {
  proposal: MNTProposal;
}

const CenterAlignedImage = styled('img')({
  display: 'block',
  margin: '0 auto',
  maxWidth: '100%',
});

const StyledLink = styled('a')({
  color: 'inherit',
});

export default function ProposalPage({ proposal: initialProposal }: ProposalPageProps) {
  const [url, setUrl] = useState('');
  const [proposal, setProposal] = useState(initialProposal);
  const [loading, setLoading] = useState(false);
  const { breakpoints } = useTheme();
  const xsmUp = useMediaQuery(breakpoints.up('xsm'));

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!proposal) return <></>;

  const { yaeVotes, yaePercent, nayPercent, nayVotes, totalVotes } = proposal
    ? formatProposal(proposal)
    : {
        yaeVotes: 0,
        yaePercent: 0,
        nayPercent: 0,
        nayVotes: 0,
        totalVotes: 0,
      };
  console.log({yaeVotes, yaePercent, nayPercent, nayVotes, totalVotes})

  const state = (proposal.state.charAt(0).toUpperCase() + proposal.state.slice(1)) as ProposalState;

  return (
    <>
      <Meta title={proposal.title} description={proposal.body} />
      <ProposalTopPanel />

      <ContentContainer>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ px: 6, pt: 4, pb: 12 }}>
              <Typography variant="h3">
                <Trans>Proposal overview</Trans>
              </Typography>
              <Box sx={{ px: { md: 18 }, pt: 8 }}>
                <Typography variant="h2" sx={{ mb: 6 }}>
                  {proposal.title || <Skeleton />}
                </Typography>
                {proposal ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ mr: '24px', mb: { xs: '2px', sm: 0 } }}>
                        <StateBadge state={state} loading={loading} />
                      </Box>
                      {!loading && (
                        <FormattedProposalTime
                          state={state}
                          executionTime={proposal.end}
                          executionTimeWithGracePeriod={proposal.end}
                          expirationTimestamp={proposal.end}
                        />
                      )}
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      component="a"
                      target="__BLANK"
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        proposal.title
                      )}&url=${url}`}
                      startIcon={<Twitter />}
                    >
                      {xsmUp && <Trans>Share on twitter</Trans>}
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="buttonL">
                    <Skeleton />
                  </Typography>
                )}
                {proposal ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      img({ src, alt }) {
                        return <CenterAlignedImage src={src} alt={alt} />;
                      },
                      a({ node, ...rest }) {
                        return <StyledLink {...rest} />;
                      },
                      h2({ node, ...rest }) {
                        return (
                          <Typography variant="subheader1" sx={{ mt: 6 }} gutterBottom {...rest} />
                        );
                      },
                      p({ node, ...rest }) {
                        return <Typography variant="description" {...rest} />;
                      },
                    }}
                  >
                    {proposal.body}
                  </ReactMarkdown>
                ) : (
                  <>
                    <Skeleton variant="text" sx={{ my: 4 }} />
                    <Skeleton variant="rectangular" height={200} sx={{ my: 4 }} />
                    <Skeleton variant="text" sx={{ my: 4 }} />
                    <Skeleton variant="rectangular" height={400} sx={{ my: 4 }} />
                  </>
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ px: 6, py: 4, mb: 2.5 }}>{proposal && <VoteInfo {...proposal} />}</Paper>
            <Paper sx={{ px: 6, py: 4, mb: 2.5 }}>
              <Typography variant="h3">
                <Trans>Voting results</Trans>
              </Typography>
              {proposal ? (
                <>
                  <VoteBar
                    yae
                    percent={yaePercent}
                    votes={yaeVotes}
                    sx={{ mt: 8 }}
                    loading={loading}
                  />
                  <VoteBar percent={nayPercent} votes={nayVotes} sx={{ mt: 3 }} loading={loading} />
                  <Row
                    caption={<Trans>State</Trans>}
                    sx={{ height: 48, mt: 10 }}
                    captionVariant="description"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                      }}
                    >
                      <StateBadge state={state} loading={loading} />
                      <Box sx={{ mt: '2px' }}>
                        <FormattedProposalTime
                          state={state}
                          executionTime={proposal.end}
                          expirationTimestamp={proposal.end}
                          executionTimeWithGracePeriod={proposal.end}
                        />
                      </Box>
                    </Box>
                  </Row>
                  <Row
                    caption={
                      <>
                        <Trans>Current votes</Trans>
                      </>
                    }
                    sx={{ height: 48 }}
                    captionVariant="description"
                  >
                    <Box sx={{ textAlign: 'right' }}>
                      <FormattedNumber
                        value={yaeVotes}
                        visibleDecimals={2}
                        sx={{ display: 'block' }}
                      />
                    </Box>
                  </Row>
                  <Row
                    caption={<Trans>Total voting power</Trans>}
                    sx={{ height: 48 }}
                    captionVariant="description"
                  >
                    <FormattedNumber value={totalVotes} visibleDecimals={0} compact={false} />
                  </Row>
                </>
              ) : (
                <>
                  <Skeleton height={28} sx={{ mt: 8 }} />
                  <Skeleton height={28} sx={{ mt: 8 }} />
                </>
              )}
            </Paper>
            <Paper sx={{ px: 6, py: 4 }}>
              <Typography variant="h3" sx={{ mb: '22px' }}>
                <Trans>Proposal details</Trans>
              </Typography>
              {proposal ? (
                <>
                  <Row
                    caption={
                      <>
                        <Trans>Created</Trans>
                      </>
                    }
                    sx={{ height: 48 }}
                    captionVariant="description"
                  >
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography>
                        ~ {dayjs.unix(proposal.created).format('DD MMM YYYY, hh:mm a')}
                      </Typography>
                    </Box>
                  </Row>
                  <Row
                    caption={
                      <>
                        <Trans>Started</Trans>
                      </>
                    }
                    sx={{ height: 48 }}
                    captionVariant="description"
                  >
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography>
                        ~ {dayjs.unix(proposal.start).format('DD MMM YYYY, hh:mm a')}
                      </Typography>
                    </Box>
                  </Row>
                  <Row
                    caption={
                      <>
                        <Trans>End</Trans>
                      </>
                    }
                    sx={{ height: 48 }}
                    captionVariant="description"
                  >
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography>
                        ~ {dayjs.unix(proposal.end).format('DD MMM YYYY, hh:mm a')}
                      </Typography>
                    </Box>
                  </Row>
                  {/* {proposal.executed && (
                    <Row
                      caption={<Trans>Executed</Trans>}
                      sx={{ height: 48 }}
                      captionVariant="description"
                    >
                      <Typography>
                        {dayjs.unix(proposal.executionTime).format('DD MMM YYYY, hh:mm a')}
                      </Typography>
                    </Row>
                  )} */}
                  <Row
                    caption={<Trans>Author</Trans>}
                    sx={{ height: 48 }}
                    captionVariant="description"
                  >
                    <Typography
                      sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                    >
                      {proposal.author}
                    </Typography>
                  </Row>
                </>
              ) : (
                <>
                  <Skeleton variant="rectangular" height={600} />
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </ContentContainer>
    </>
  );
}

ProposalPage.getLayout = function getLayout(page: React.ReactElement) {
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
