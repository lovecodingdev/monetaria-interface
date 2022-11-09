import { Trans } from '@lingui/macro';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePermissions } from 'src/hooks/usePermissions';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';
import { DashboardContentWrapper } from '../src/modules/dashboard/DashboardContentWrapper';
import { DashboardTopPanel } from '../src/modules/dashboard/DashboardTopPanel';
import ErrorImg from 'public/404_white.svg';

export default function Custom404() {
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.up('lg'));
  const xsm = useMediaQuery(breakpoints.down('xsm'));
  const md = useMediaQuery(breakpoints.down('md'));

  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();

  const [mode, setMode] = useState<'supply' | 'borrow' | ''>('');

  useEffect(() => {
    if (!mode) setMode('supply');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lg]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: { xs: '80%', md: '60%', lg: '50%' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '25px' }}>
            <ErrorImg />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              color: '#28464D',
              fontSize: { xs: '22px', md: '32px', lg: '42px' },
              fontWeight: 800,
              padding: '15px',
            }}
          >
            Oops, We can seem to find
            <br />
            the page what you are looking for.
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              color: '#436972',
              fontSize: '18px',
              fontWeight: 500,
              padding: '15px',
              lineHeight: '28px',
            }}
          >
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '15px',
            }}
          >
            <Button
              sx={{
                padding: '12px',
                height: '50px',
                backgroundColor: '#074592',
                color: 'white',
                borderRadius: '8px',
              }}
              href="/"
            >
              Go to HomePage
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

Custom404.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
