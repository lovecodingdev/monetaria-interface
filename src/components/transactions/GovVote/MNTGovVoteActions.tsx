import { useState } from 'react';
import { Trans } from '@lingui/macro';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { Box, BoxProps, Button, CircularProgress } from '@mui/material';
import snapshot from '@snapshot-labs/snapshot.js';
import { Web3Provider } from '@ethersproject/providers';

const hub = 'https://testnet.snapshot.org'; // or https://testnet.snapshot.org for testnet
const client = new snapshot.Client712(hub);

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
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if(!provider) return;
    
    const web3 = provider as Web3Provider;
    const [account] = await web3.listAccounts();

    setLoading(true);
    const res = await client.vote(web3, account, {
      space: 'mnt.eth',
      proposal: proposalId,
      type: 'single-choice',
      choice: support ? 1 : 2,
      app: 'snapshot',
    });
    console.log({res});
    setLoading(false);
  }

  return (
    <Button
      variant="contained"
      disabled={false}
      onClick={handleClick}
      size="large"
      sx={{ minHeight: '44px', width: '100%'}}
      data-cy="actionButton"
    >
      {loading && <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />}
      {support ? <Trans>VOTE YAE</Trans> : <Trans>VOTE NAY</Trans>}
    </Button>
  );
};
