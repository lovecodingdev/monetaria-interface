import { Trans } from '@lingui/macro';
import { useTransactionHandler } from 'src/helpers/useTransactionHandler';
import { useGovernanceDataProvider } from 'src/hooks/governance-data-provider/GovernanceDataProvider';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { TxActionsWrapper } from '../TxActionsWrapper';
import { Box, BoxProps, Button, CircularProgress } from '@mui/material';
import snapshot from '@snapshot-labs/snapshot.js';
import { Web3Provider } from '@ethersproject/providers';

const hub = 'https://testnet.snapshot.org'; // or https://testnet.snapshot.org for testnet
const client = new snapshot.Client(hub);

export type MNTGovVoteActionsProps = {
  isWrongNetwork: boolean;
  blocked: boolean;
  proposalId: string;
  support: boolean;
};

export const MNTGovVoteActions = ({
  isWrongNetwork,
  blocked,
  proposalId,
  support,
}: MNTGovVoteActionsProps) => {
  const { currentAccount, provider } = useWeb3Context();

  const loading = true;

  const handleClick = async () => {
    if(!provider) return;
    const web3 = provider as Web3Provider;
    const [account] = await web3.listAccounts();
    console.log({account});
    const receipt = await client.vote(web3, currentAccount, 'mnt.eth', {
      proposal: proposalId,
      choice: 1,
    });
  }

  return (
    <Button
      variant="contained"
      disabled={false}
      onClick={handleClick}
      size="large"
      sx={{ minHeight: '44px'}}
      data-cy="actionButton"
    >
      {loading && <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />}
      Vote
    </Button>
  );
};
