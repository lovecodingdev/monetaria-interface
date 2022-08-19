import { Trans } from '@lingui/macro';
import { Box, Button, Divider, Typography } from '@mui/material';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Row } from 'src/components/primitives/Row';
import { ConnectWalletButton } from 'src/components/WalletConnection/ConnectWalletButton';
import { useVotingPower } from 'src/hooks/governance-data-provider/useVotingPower';
import { useModalContext } from 'src/hooks/useModal';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { useMntTokensProviderContext } from 'src/hooks/governance-data-provider/MntTokensDataProvider';

export function VotingPowerInfoPanel() {
  const { currentAccount } = useWeb3Context();
  const { mntTokens } = useMntTokensProviderContext();
  
  // TODO: if not logged in & loading, show some placeholder
  return (
    <>
      <Box sx={{ px: 6, py: 4 }}>
        <Typography variant="h3" gutterBottom>
          <Trans>Your info</Trans>
        </Typography>
        {currentAccount && (
          <>
            <Row
              sx={{ py: 2 }}
              caption={
                <Typography variant="description">
                  <Trans>Voting power</Trans>
                </Typography>
              }
            >
              <Box>
                <FormattedNumber value={mntTokens.mnt || 0} variant="main16" visibleDecimals={2} />{" MNT"}
              </Box>
            </Row>
          </>
        )}
      </Box>
      {/* <Divider />
      <Box sx={{ px: 6, pt: 4, pb: 6, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography>Delegate your power</Typography>
        </Box>
        {currentAccount ? (
          <Button
            variant="contained"
            disabled={votingPower === '0' && propositionPower === '0'}
            onClick={() => openGovDelegation()}
          >
            <Trans>Delegate</Trans>
          </Button>
        ) : (
          <ConnectWalletButton />
        )}
      </Box> */}
    </>
  );
}
