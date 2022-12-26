import { Trans } from '@lingui/macro';
import { Box, Paper, Typography, useMediaQuery, useTheme, Button, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePermissions } from 'src/hooks/usePermissions';
import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { ContentContainer } from '../src/components/ContentContainer';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';
import borderGradient from 'src/layouts/borderGradient';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EastIcon from '@mui/icons-material/East';
import { DatePicker, Slider, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import StatusList from 'src/modules/dashboard/lists/StatusList/StatusList';
import { StatusListMobile } from 'src/modules/dashboard/lists/StatusList/StatusListMobile';

const statusData = ['All', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  (item) => ({ label: item, value: item })
);

const outcomeData = ['All', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  (item) => ({ label: item, value: item })
);

export default function GaugeWeightVoting() {
  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [curStatus, setCurStatus] = useState('All');
  const [curOutcome, setCurOutcome] = useState('All');

  return (
    <>
      <ContentContainer>
        {currentAccount && !isPermissionsLoading ? (
          <Box sx={{ fontFamily: 'Gilroy, Arial !important', fontStyle: 'normal' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: '32px',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: '24px',
                    flexWrap: 'wrap',
                  }}
                >
                  <Box sx={{ flex: 1.5 }}>
                    <Paper
                      sx={{
                        bgcolor: 'background.header',
                        padding: '24px',
                        mt: { xs: '8px', md: '12px' },
                        color: '#F1F1F3',
                        ...borderGradient,
                      }}
                    >
                      <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}>
                        WPC Distribution
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginTop: '42px',
                          gap: '42px',
                        }}
                      >
                        <Box>
                          <Typography sx={{ color: '#000', fontWeight: 400, fontSize: '14px' }}>
                            Total WPC Distribution Speed
                          </Typography>
                          <Typography sx={{ color: '#000', fontWeight: 400, fontSize: '14px' }}>
                            <span style={{ color: '#333333', fontSize: '24px', fontWeight: 700 }}>
                              280
                            </span>{' '}
                            <span style={{ color: '#000000', fontSize: '14px', fontWeight: 400 }}>
                              WPC/Block
                            </span>
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '74px' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box>
                              <Typography
                                sx={{ color: '#000000', fontSize: '14px', fontWeight: 400 }}
                              >
                                Community Part Distribution Speed
                              </Typography>
                            </Box>
                            <Box>
                              <span style={{ color: '#333333', fontSize: '24px', fontWeight: 700 }}>
                                1,318,372.44
                              </span>{' '}
                              <span style={{ color: '#000000', fontSize: '14px', fontWeight: 400 }}>
                                WPC/Day
                              </span>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box>
                              <Typography
                                sx={{ color: '#000000', fontSize: '14px', fontWeight: 400 }}
                              >
                                Community Part Ratio
                              </Typography>
                            </Box>
                            <Box>
                              <span style={{ color: '#333333', fontSize: '24px', fontWeight: 700 }}>
                                71.94%
                              </span>{' '}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
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
                    >
                      Hi
                    </Paper>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}></Box>
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

GaugeWeightVoting.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
