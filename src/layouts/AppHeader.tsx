import { InformationCircleIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import {
  Button,
  Slide,
  SvgIcon,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ContentWithTooltip } from 'src/components/ContentWithTooltip';
import { ENABLE_TESTNET } from 'src/utils/marketsAndNetworksConfig';

import { Link } from '../components/primitives/Link';
import { uiConfig } from '../uiConfig';
import { NavItems } from './components/NavItems';
import { MobileMenu } from './MobileMenu';
import { SettingsMenu } from './SettingsMenu';
import WalletWidget from './WalletWidget';
import { MarketSwitcher } from '../components/MarketSwitcher';

interface Props {
  children: React.ReactElement;
}

function HideOnScroll({ children }: Props) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export function AppHeader() {
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.down('lg'));
  const xsm = useMediaQuery(breakpoints.down('xsm'));
  const md = useMediaQuery(breakpoints.down('md'));
  const mmd = useMediaQuery(breakpoints.down('mmd'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletWidgetOpen, setWalletWidgetOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen && !lg) {
      setMobileMenuOpen(false);
    }
    if (walletWidgetOpen) {
      setWalletWidgetOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lg]);

  const headerHeight = 82;

  const disableTestnet = () => {
    localStorage.setItem('testnetsEnabled', 'false');
    // Set window.location to trigger a page reload when navigating to the the dashboard
    window.location.href = '/';
  };

  const testnetTooltip = (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 1 }}>
      <Typography variant="subheader1">
        <Trans>Testnet mode is ON</Trans>
      </Typography>
      <Typography variant="description">
        <Trans>The app is running in testnet mode. Learn how it works in</Trans>{' '}
        <Link
          href="https://docs.aave.com/faq/testing-aave"
          style={{ fontSize: '14px', fontWeight: 400, textDecoration: 'underline' }}
        >
          FAQ.
        </Link>
      </Typography>
      <Button variant="outlined" sx={{ mt: '12px' }} onClick={disableTestnet}>
        <Trans>Disable testnet</Trans>
      </Button>
    </Box>
  );

  return (
    // <HideOnScroll>
    <Box
      component="header"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      sx={(theme) => ({
        height: headerHeight,
        width: '100%',
        position: { xs: 'fixed', md: 'sticky' },
        top: 0,
        transition: theme.transitions.create('top'),
        zIndex: theme.zIndex.appBar,
        bgcolor: 'background.header',
        // padding: {
        //   xs: mobileMenuOpen || walletWidgetOpen ? '8px 20px' : '8px 8px 8px 20px',
        //   xsm: '8px 20px',
        // },
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'space-between',
        boxShadow: 'inset 0px -1px 0px rgba(242, 243, 247, 0.16)',
      })}
    >
      <Box
        component={Link}
        href="/"
        aria-label="Go to homepage"
        sx={{
          lineHeight: 0,
          mr: 3,
          transition: '0.3s ease all',
          '&:hover': { opacity: 0.7 },
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'space-between',
          gap: 2,
        }}
        onClick={() => setMobileMenuOpen(false)}
      >
        <img src={uiConfig.appLogo} alt="An SVG of an eye" width="47" height="42" />
        {!xsm && <img src={uiConfig.monetariaText} alt="An SVG of an eye" />}
      </Box>
      <Box sx={{ mr: xsm ? 1 : 3 }}>
        {ENABLE_TESTNET && (
          <ContentWithTooltip tooltipContent={testnetTooltip} offset={[0, -4]} withoutHover>
            <Button
              variant="surface"
              size="small"
              color="primary"
              sx={{
                backgroundColor: '#B6509E',
                '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(182, 80, 158, 0.7)' },
              }}
            >
              TESTNET
              <SvgIcon sx={{ marginLeft: '2px', fontSize: '16px' }}>
                <InformationCircleIcon />
              </SvgIcon>
            </Button>
          </ContentWithTooltip>
        )}
      </Box>

      {!mmd && (
        <Box
          sx={{
            display: 'block',
            background: '#F6F8F9',
            borderRadius: '100px',
            padding: '4px',
          }}
        >
          <NavItems />
        </Box>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <MarketSwitcher />

      {!mobileMenuOpen && (
        <WalletWidget
          open={walletWidgetOpen}
          setOpen={setWalletWidgetOpen}
          headerHeight={headerHeight}
        />
      )}

      <Box sx={{ display: { xs: 'none', xsm: 'block' } }}>
        <SettingsMenu />
      </Box>

      {!walletWidgetOpen && (
        <Box sx={{ display: { xs: 'flex', mmd: 'none' } }}>
          <MobileMenu
            open={mobileMenuOpen}
            setOpen={setMobileMenuOpen}
            headerHeight={headerHeight}
          />
        </Box>
      )}
    </Box>
    // </HideOnScroll>
  );
}
