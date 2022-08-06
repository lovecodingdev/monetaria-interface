import { Trans } from '@lingui/macro';
import { Button, SvgIcon } from '@mui/material';
import { useWalletModalContext } from 'src/hooks/useWalletModal';
import { WalletModal } from './WalletModal';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const ConnectWalletButton = () => {
  const { setWalletModalOpen } = useWalletModalContext();

  return (
    <>
      <Button variant="contained" onClick={() => setWalletModalOpen(true)}
        startIcon={
          <SvgIcon
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          >
            <AccountBalanceWalletIcon />
          </SvgIcon>
        }>
        <Trans>Connect wallet</Trans>
      </Button>
      <WalletModal />
    </>
  );
};
