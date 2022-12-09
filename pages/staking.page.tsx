import { Trans } from '@lingui/macro';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePermissions } from 'src/hooks/usePermissions';
import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { ContentContainer } from '../src/components/ContentContainer';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';
import borderGradient from 'src/layouts/borderGradient';

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
            <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '24px' }}>
              Staking
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 4,
              }}
            >
              <Box sx={{ flex: 2, order: { xs: 2, sm: 1 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  <Box>
                    <Paper
                      sx={{
                        bgcolor: 'background.header',
                        padding: '24px',
                        mt: { xs: '8px', md: '12px' },
                        color: '#F1F1F3',
                        ...borderGradient,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: '32.8px',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'row', sm: 'column' },
                            justifyContent: { xs: 'space-between', sm: 'start' },
                            gap: { xs: '8px', sm: '0px' },
                          }}
                        >
                          <Box sx={{ order: { xs: 2, sm: 1 } }}>
                            <Typography
                              sx={{ color: '#080F26', fontWeight: 600, fontSize: '14px' }}
                            >
                              622,572,572.00
                            </Typography>
                          </Box>
                          <Box sx={{ order: { xs: 1, sm: 2 } }}>
                            <Typography
                              sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}
                            >
                              Total MNT vote-locked
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'row', sm: 'column' },
                            justifyContent: { xs: 'space-between', sm: 'start' },
                            gap: { xs: '8px', sm: '0px' },
                          }}
                        >
                          <Box sx={{ order: { xs: 2, sm: 1 } }}>
                            <Typography
                              sx={{ color: '#080F26', fontWeight: 600, fontSize: '14px' }}
                            >
                              95.73%
                            </Typography>
                          </Box>
                          <Box sx={{ order: { xs: 1, sm: 2 } }}>
                            <Typography
                              sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}
                            >
                              Percentage of total MNT Locked excluding voting escrow:
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'row', sm: 'column' },
                            justifyContent: { xs: 'space-between', sm: 'start' },
                            gap: { xs: '8px', sm: '0px' },
                          }}
                        >
                          <Box sx={{ order: { xs: 2, sm: 1 } }}>
                            <Typography
                              sx={{ color: '#080F26', fontWeight: 600, fontSize: '14px' }}
                            >
                              48.91%
                            </Typography>
                          </Box>
                          <Box sx={{ order: { xs: 1, sm: 2 } }}>
                            <Typography
                              sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}
                            >
                              Percentage of total MNT Locked:
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'row', sm: 'column' },
                            justifyContent: { xs: 'space-between', sm: 'start' },
                            gap: { xs: '8px', sm: '0px' },
                          }}
                        >
                          <Box sx={{ order: { xs: 2, sm: 1 } }}>
                            <Typography
                              sx={{ color: '#080F26', fontWeight: 600, fontSize: '14px' }}
                            >
                              560,131,773.03
                            </Typography>
                          </Box>
                          <Box sx={{ order: { xs: 1, sm: 2 } }}>
                            <Typography
                              sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}
                            >
                              Total veMNT:
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'row', sm: 'column' },
                            justifyContent: { xs: 'space-between', sm: 'start' },
                            gap: { xs: '8px', sm: '0px' },
                          }}
                        >
                          <Box sx={{ order: { xs: 2, sm: 1 } }}>
                            <Typography
                              sx={{ color: '#080F26', fontWeight: 600, fontSize: '14px' }}
                            >
                              3.60 YEARS
                            </Typography>
                          </Box>
                          <Box sx={{ order: { xs: 1, sm: 2 } }}>
                            <Typography
                              sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}
                            >
                              Average lock time:
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '24px' }}>
                      How do I benefit from staking?
                    </Typography>
                    <Paper
                      sx={{
                        bgcolor: 'background.header',
                        padding: '24px',
                        mt: { xs: '8px', md: '12px' },
                        color: '#F1F1F3',
                        ...borderGradient,
                      }}
                    >
                      Stakiong
                    </Paper>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: 1, order: { xs: 1, sm: 2 } }}>
                <Paper
                  sx={{
                    bgcolor: 'background.header',
                    padding: '24px',
                    mt: { xs: '8px', md: '12px' },
                    color: '#F1F1F3',
                    ...borderGradient,
                  }}
                >
                  Stakiong
                </Paper>
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

Position.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
