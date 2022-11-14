import { DuplicateIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon } from '@heroicons/react/solid';
import AccountBalanceWalletIcon from '../../public/icons/markets/account-icon.svg';

import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Skeleton,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import makeBlockie from 'ethereum-blockies-base64';
import stubTrue from 'lodash/stubTrue';
import React, { useEffect, useState } from 'react';
import { WalletModal } from 'src/components/WalletConnection/WalletModal';
import { useWalletModalContext } from 'src/hooks/useWalletModal';
import useGetEns from 'src/libs/hooks/use-get-ens';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

import { Link } from '../components/primitives/Link';
import { textCenterEllipsis } from '../helpers/text-center-ellipsis';
import { ENABLE_TESTNET, getNetworkConfig, STAGING_ENV } from '../utils/marketsAndNetworksConfig';
import { DrawerWrapper } from './components/DrawerWrapper';
import { MobileCloseButton } from './components/MobileCloseButton';

interface WalletWidgetProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  headerHeight: number;
}

export default function WalletWidget({ open, setOpen, headerHeight }: WalletWidgetProps) {
  const { disconnectWallet, currentAccount, connected, chainId, loading } = useWeb3Context();

  const { setWalletModalOpen } = useWalletModalContext();

  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.down('xsm'));
  const md = useMediaQuery(breakpoints.down('md'));

  const { name: ensName, avatar: ensAvatar } = useGetEns(currentAccount);
  const ensNameAbbreviated = ensName
    ? ensName.length > 18
      ? textCenterEllipsis(ensName, 12, 3)
      : ensName
    : undefined;

  const [useBlockie, setUseBlockie] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  useEffect(() => {
    if (ensAvatar) {
      setUseBlockie(false);
    }
  }, [ensAvatar]);

  const networkConfig = getNetworkConfig(chainId);
  let networkColor = '';
  if (networkConfig?.isFork) {
    networkColor = '#ff4a8d';
  } else if (networkConfig?.isTestnet) {
    networkColor = '#7157ff';
  } else {
    networkColor = '#65c970';
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!connected) {
      setWalletModalOpen(stubTrue);
    } else {
      setOpen(true);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleDisconnect = () => {
    if (connected) {
      disconnectWallet();
      handleClose();
      localStorage.removeItem('mockWalletAddress');
    }
  };

  const handleCopy = async () => {
    navigator.clipboard.writeText(currentAccount);
    handleClose();
  };

  const hideWalletAccountText = xsm && (ENABLE_TESTNET || STAGING_ENV);

  const accountAvatar = (
    <Box
      sx={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        border: '1px solid #FAFBFC1F',
        img: { width: '100%', height: '100%', borderRadius: '50%' },
      }}
    >
      <img
        src={
          useBlockie ? makeBlockie(currentAccount !== '' ? currentAccount : 'default') : ensAvatar
        }
        alt=""
        onError={() => setUseBlockie(true)}
      />
    </Box>
  );

  let buttonContent = <></>;
  if (currentAccount) {
    if (hideWalletAccountText) {
      buttonContent = <Box sx={{ margin: '1px 0' }}>{accountAvatar}</Box>;
    } else {
      buttonContent = <>{ensNameAbbreviated ?? textCenterEllipsis(currentAccount, 4, 4)}</>;
    }
  } else {
    buttonContent = <Trans>{xsm ? `` : 'Connect wallet'}</Trans>;
  }

  const Content = ({ component = ListItem }: { component?: typeof MenuItem | typeof ListItem }) => (
    <Box
      sx={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px',
        gap: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        margin: { xs: '0 auto', md: 'none' },
        width: { xs: '380px', md: '415px' },
        height: { xs: '212px', md: '168px' },
        boxShadow: { xs: '4px 6px 4px rgba(163, 163, 163, 0.14)', md: 'none' },
      }}
    >
      <Typography
        variant="subheader2"
        sx={{
          display: { xs: 'block', md: 'none' },
          color: '#000000',
          py: 2,
          fontWeight: 400,
          fontSize: '14px',
        }}
      >
        <Trans>Connected with Metamask</Trans>
      </Typography>
      <Box
        sx={{
          color: { xs: '#000000', md: '#000000' },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '0.5em',
          fontWeight: '400',
          fontSize: '14px',
        }}
      >
        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'start' }}>
          Connected with Metamask
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
          <Button
            sx={{
              width: '95.5px',
              height: '32px',
              backgroundColor: '#F3F8FF',
              border: '1px solid rgba(21, 126, 255, 0.15)',
              borderRadius: '12px',
              cursor: 'pointer',
              color: '#252C32',
            }}
            onClick={() => {
              setOpen(false);
              setWalletModalOpen(true);
            }}
          >
            <Trans>Change</Trans>
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
          <Button
            sx={{
              width: '95.5px',
              height: '32px',
              backgroundColor: '#F3F8FF',
              border: '1px solid rgba(21, 126, 255, 0.15)',
              borderRadius: '12px',
              cursor: 'pointer',
              color: '#252C32',
              fontWeight: '400',
              fontSize: '14px',
            }}
            onClick={handleDisconnect}
          >
            <Trans>Disconnect</Trans>
          </Button>
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid #FAFBFC1F',
              mr: 3,
              img: { width: '100%', height: '100%', borderRadius: '50%' },
            }}
          >
            <img
              src={
                useBlockie
                  ? makeBlockie(currentAccount !== '' ? currentAccount : 'default')
                  : ensAvatar
              }
              alt=""
              onError={() => setUseBlockie(true)}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
              {ensNameAbbreviated && (
                <Typography color={{ xs: '#000000', md: '#000000' }}>
                  {ensNameAbbreviated}
                </Typography>
              )}

              <Typography
                variant={ensNameAbbreviated ? 'caption' : 'h4'}
                color={
                  ensNameAbbreviated
                    ? { xs: '#000000', md: 'text.secondary' }
                    : { xs: '#000000', md: 'text.primary' }
                }
              >
                {textCenterEllipsis(currentAccount, ensNameAbbreviated ? 12 : 7, 4)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5em' }}>
              <Box sx={{}}>
                <img src="/icons/tokens/btc.svg" width="16px" />
              </Box>
              <Box>
                {' '}
                <Typography
                  variant={ensNameAbbreviated ? 'caption' : 'h4'}
                  color={
                    ensNameAbbreviated
                      ? { xs: '#000000', md: 'text.secondary' }
                      : { xs: '#000000', md: 'text.primary' }
                  }
                  sx={{ fontWeight: 400, fontSize: '14px' }}
                >
                  0.5
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5em' }}>
        <Button
          sx={{
            display: 'flex',
            justifyContent: 'start',
            cursor: 'pointer',
            fontWeight: 600,
            color: '#0E73F6',
            backgroundColor: '#F3F8FF',
            borderRadius: '8px',
            height: '32px',
          }}
          onClick={handleCopy}
        >
          <ListItemIcon
            sx={{
              color: {
                xs: '#0E73F6',
                md: '#0E73F6',
                minWidth: 'unset',
                marginRight: 12,
              },
            }}
          >
            <SvgIcon fontSize="small">
              <DuplicateIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText>
            <Trans>Copy address</Trans>
          </ListItemText>
        </Button>
        {networkConfig?.explorerLinkBuilder && (
          <Link href={networkConfig.explorerLinkBuilder({ address: currentAccount })}>
            <Box
              component={component}
              sx={{
                display: 'flex',
                justifyContent: 'start',
                cursor: 'pointer',
                fontWeight: 600,
                color: '#0E73F6',
                backgroundColor: '#F3F8FF',
                borderRadius: '8px',
                height: '32px',
              }}
              onClick={handleClose}
            >
              <ListItemIcon
                sx={{
                  color: {
                    xs: '#0E73F6',
                    md: '#0E73F6',
                    minWidth: 'unset',
                    marginRight: 12,
                  },
                }}
              >
                <SvgIcon fontSize="small">
                  <ExternalLinkIcon />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText>
                <Trans>View on Explorer</Trans>
              </ListItemText>
            </Box>
          </Link>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {md && connected && open ? (
        <MobileCloseButton setOpen={setOpen} />
      ) : loading ? (
        <Skeleton height={36} width={126} sx={{ background: '#074592' }} />
      ) : (
        <Button
          // variant={connected ? 'surface' : 'gradient'}
          variant={'contained'}
          aria-label="wallet"
          id="wallet-button"
          aria-controls={open ? 'wallet-button' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            p: connected ? '5px 8px' : undefined,
            minWidth: hideWalletAccountText ? 'unset' : undefined,
            // backgroundColor: '#074592',
            '& .MuiButton-startIcon': {
              marginLeft: 0,
              marginRight: { xs: 0, xsm: '8px' },
            },
          }}
          // startIcon={connected && !hideWalletAccountText && accountAvatar}
          startIcon={<AccountBalanceWalletIcon />}
          endIcon={
            connected &&
            !hideWalletAccountText && (
              <SvgIcon
                sx={{
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </SvgIcon>
            )
          }
        >
          {buttonContent}
        </Button>
      )}

      {md ? (
        <DrawerWrapper open={open} setOpen={setOpen} headerHeight={headerHeight}>
          <Content component={ListItem} />
        </DrawerWrapper>
      ) : (
        <Menu
          id="wallet-menu"
          MenuListProps={{
            'aria-labelledby': 'wallet-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          keepMounted={true}
        >
          <MenuList disablePadding sx={{ '.MuiMenuItem-root.Mui-disabled': { opacity: 1 } }}>
            <Content component={MenuItem} />
          </MenuList>
        </Menu>
      )}

      <WalletModal />
    </>
  );
}
