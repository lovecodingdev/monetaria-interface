import { Box, useMediaQuery, useTheme } from '@mui/material';
import { usePermissions } from 'src/hooks/usePermissions';
import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { ContentContainer } from '../src/components/ContentContainer';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';
import { PositionTopPanel } from '../src/modules/position/PositionTopPanel';
import { MNTPanel } from '../src/modules/position/MNTPanel';
import { PositionTabs } from '../src/modules/position/PositionTabs';

export default function Position() {
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.up('lg'));

  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();

  return (
    <>
      <ContentContainer>
        {currentAccount && !isPermissionsLoading ? (
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', xsm: 'row' },
                gap: 4,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <PositionTopPanel />
              </Box>
              <Box sx={{ flex: 2 }}>
                <MNTPanel />
              </Box>
            </Box>
            <PositionTabs />
          </Box>
        ) : (
          <ConnectWalletPaper loading={web3Loading} />
        )}
      </ContentContainer>
    </>
  );
}

Position.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
