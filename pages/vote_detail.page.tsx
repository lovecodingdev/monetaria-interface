import { Trans } from '@lingui/macro';
import { Box, Paper, Typography, useMediaQuery, useTheme, Button, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePermissions } from 'src/hooks/usePermissions';
import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { ContentContainer } from '../src/components/ContentContainer';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';
import borderGradient from 'src/layouts/borderGradient';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ShareIcon from '@mui/icons-material/Share';
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
              <Box sx={{ flex: 2, order: { xs: 2, sm: 1 } }}>
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
                        flexDirection: 'column',
                        alignItems: 'start',
                        gap: 4,
                      }}
                    >
                      <Box>
                        <Button
                          startIcon={<KeyboardArrowLeftIcon />}
                          href="/vote"
                          sx={{
                            backgroundColor: 'white',
                            border: '1px solid #DDE2E4',
                            borderRadius: '8px',
                            color: '#252C32',
                          }}
                        >
                          Back
                        </Button>
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '32px' }}>
                          Appoint Securitize as a Whitelister to Aave Arc
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                          paddingRight: '40px',
                        }}
                      >
                        <Box>
                          <Chip
                            label="Open"
                            sx={{
                              color: `#119C2B`,
                              backgroundColor: `#EBFFF1`,
                              fontWeight: 600,
                              fontSize: '14px',
                              borderRadius: '6px',
                            }}
                          />
                        </Box>
                        <Box>
                          <Button
                            startIcon={<ShareIcon />}
                            sx={{
                              color: '#252C32',
                              backgroundColor: 'transparent',
                              fontWeight: 400,
                              fontSize: '14px',
                            }}
                          >
                            Share
                          </Button>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                          fontSize: '14px',
                          color: '#252C32',
                          height: '300px',
                          overflow: 'hidden',
                        }}
                      >
                        <Typography sx={{ color: '#000000', fontWeight: 600, fontSize: '14px' }}>
                          Description Text
                        </Typography>
                        <p>
                          Securitize asks the Aave Governance community to approve the appointment,
                          adoption, and authorization of Securitize as a “whitelister” on the Aave
                          Arc market.
                        </p>
                        <p>
                          Securitize asks the Aave Governance community to approve the appointment,
                          adoption, and authorization of Securitize as a “whitelister” on the Aave
                          Arc market.
                        </p>
                        <p>
                          Securitize asks the Aave Governance community to approve the appointment,
                          adoption, and authorization of Securitize as a “whitelister” on the Aave
                          Arc market.
                        </p>
                        <p>
                          Securitize asks the Aave Governance community to approve the appointment,
                          adoption, and authorization of Securitize as a “whitelister” on the Aave
                          Arc market.
                        </p>
                        <p>
                          Securitize asks the Aave Governance community to approve the appointment,
                          adoption, and authorization of Securitize as a “whitelister” on the Aave
                          Arc market.
                        </p>
                      </Box>
                      <Box
                        sx={{
                          backgroundImage:
                            'linear-gradient(to bottom, rgba(255,255,255, 0) 50%, white)',
                          height: '100px',
                          width: '100%',
                          marginTop: '-100px',
                          display: 'flex',
                          justifyContent: 'center',
                          position: 'relative',
                        }}
                      >
                        <Button
                          sx={{
                            width: '148px',
                            height: '40px',
                            color: '#074592',
                            backgroundColor: 'rgba(21, 126, 255, 0.05)',
                            border: ' 1px solid rgba(21, 126, 255, 0.2)',
                            fontSize: '16px',
                            fontWeight: 600,
                            position: 'absolute',
                            top: '90px',
                          }}
                        >
                          Show more
                        </Button>
                      </Box>
                    </Box>
                    {!downToXSM && (
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
                    )}
                    <Box>{!downToXSM ? <StatusList /> : <StatusListMobile />}</Box>
                  </Box>
                </Paper>
              </Box>
              <Box sx={{ flex: 1, order: { xs: 1, sm: 2 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                      <Box>
                        <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '18px' }}>
                          DAO Overview
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            py: '5px',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                              Total vote-locked
                            </Box>
                            <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                              602,1243.19
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              gap: '50px',
                            }}
                          >
                            <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                              Percentage of total Locked excluding voting escrow
                            </Box>
                            <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                              93%
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                              Percentage of total Locked
                            </Box>
                            <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                              48.84%
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                              Total veMNT
                            </Box>
                            <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                              549,276,641.45
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                              Average lock time
                            </Box>
                            <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                              3.62 years
                            </Box>
                          </Box>
                          <Button
                            sx={{
                              backgroundColor: 'rgba(21, 126, 255, 0.05)',
                              color: '#074592',
                              border: '1px solid rgba(21, 126, 255, 0.2)',
                              fontWeight: 600,
                              fontSize: '16px',
                            }}
                            endIcon={<EastIcon />}
                          >
                            Staking{' '}
                          </Button>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
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
                      <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '18px' }}>
                        My Votes
                      </Typography>
                      <Box
                        sx={{ display: 'flex', flexDirection: 'column', gap: '12px', py: '10px' }}
                      >
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                            Total Votes
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            321
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                            Votes Casted
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            123
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
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
                      <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '18px' }}>
                        My wallet
                      </Typography>
                      <Box
                        sx={{ display: 'flex', flexDirection: 'column', gap: '12px', py: '10px' }}
                      >
                        {' '}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                            Balance
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            234 MNT
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                            My Locked
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            234 MNT
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
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
