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

export default function Votes() {
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
                flexDirection: { xs: 'column', sm: 'row', gap: '24px' },
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ flex: 2 }}>
                <Paper
                  sx={{
                    bgcolor: 'background.header',
                    padding: '24px',
                    mt: { xs: '8px', md: '12px' },
                    color: '#F1F1F3',
                    ...borderGradient,
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(10, 47, 114, 0.1)',
                        paddingBottom: '25px',
                      }}
                    >
                      <Box>
                        <Typography sx={{ color: '#080F26', fontSize: '24px', fontWeight: 700 }}>
                          Proposals
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          startIcon={<NoteAddIcon />}
                          variant="contained"
                          sx={{
                            backgroundColor: '#023997',
                            padding: '8px 16px',
                            fontWeight: 600,
                            fontSize: '14px',
                          }}
                        >
                          Create Proposal
                        </Button>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                        justifyContent: 'start',
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            color: '#252C32',
                            fontWeight: 400,
                            fontSize: '14px',
                            paddingBottom: '5px',
                          }}
                        >
                          Status
                        </Typography>
                        <SelectPicker
                          data={statusData}
                          style={{ width: downToXSM ? '140px' : '169px' }}
                          value={curStatus}
                          searchable={false}
                          onChange={setCurStatus}
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: '#252C32',
                            fontWeight: 400,
                            fontSize: '14px',
                            paddingBottom: '5px',
                          }}
                        >
                          Outcome
                        </Typography>
                        <SelectPicker
                          data={outcomeData}
                          style={{ width: downToXSM ? '140px' : '169px' }}
                          value={curOutcome}
                          searchable={false}
                          onChange={setCurOutcome}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <StatusList />
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
