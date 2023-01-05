import { Trans } from '@lingui/macro';
import { Box, Paper, Typography, useMediaQuery, useTheme, Button, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePermissions } from 'src/hooks/usePermissions';
import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { ContentContainer } from '../src/components/ContentContainer';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';
import borderGradient from 'src/layouts/borderGradient';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('react-tradingview-widget'), {
  ssr: false,
});

export default function Votes() {
  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));

  return (
    <>
      <ContentContainer>
        {currentAccount && !isPermissionsLoading ? (
          <Box sx={{ fontFamily: 'Gilroy, Arial !important', fontStyle: 'normal' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row', gap: '24px' },
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ flex: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Paper
                    sx={{
                      bgcolor: 'background.header',
                      padding: '24px',
                      mt: { xs: '8px', md: '12px' },
                      color: '#F1F1F3',
                      ...borderGradient,
                    }}
                  ></Paper>
                  <Paper
                    sx={{
                      bgcolor: 'background.header',
                      padding: '24px',
                      mt: { xs: '8px', md: '12px' },
                      color: '#F1F1F3',
                      ...borderGradient,
                    }}
                  >
                    <DynamicComponent symbol="BTCUSDT" width="779px" height="419px" />
                  </Paper>
                  <Paper
                    sx={{
                      bgcolor: 'background.header',
                      padding: '24px',
                      mt: { xs: '8px', md: '12px' },
                      color: '#F1F1F3',
                      ...borderGradient,
                    }}
                  ></Paper>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Paper
                  sx={{
                    bgcolor: 'background.header',
                    padding: '24px',
                    mt: { xs: '8px', md: '12px' },
                    color: '#F1F1F3',
                    ...borderGradient,
                  }}
                ></Paper>
              </Box>
            </Box>
          </Box>
        ) : (
          <ConnectWalletPaper loading={web3Loading} />
        )}
      </ContentContainer>
    </>
  );
}

Votes.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
