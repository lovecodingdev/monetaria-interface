import { Trans } from '@lingui/macro';
import {
  Box,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Chip,
  LinearProgress,
} from '@mui/material';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VoteList from 'src/modules/dashboard/lists/VoteList/VoteList';
import { VoteListMobile } from 'src/modules/dashboard/lists/VoteList/VoteListMobile';
import Logo from '/public/logo_green.svg';

export default function Votes() {
  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [isShowMore, setIsShowMore] = useState(false);

  const showMore = () => {
    setIsShowMore(!isShowMore);
  };

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
                          height: isShowMore ? '100%' : '300px',
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
                      {!isShowMore && (
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
                        ></Box>
                      )}
                      {downToXSM ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                          <Button
                            sx={{
                              color: '#252C32',
                              backgroundColor: 'white',
                              fontSize: '16px',
                              fontWeight: 600,
                              marginTop: '-10px',
                              boxShadow: '1px 1px grey',
                            }}
                            onClick={showMore}
                            fullWidth
                          >
                            {isShowMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </Button>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                          <Button
                            sx={{
                              width: '148px',
                              height: '40px',
                              color: '#074592',
                              backgroundColor: 'rgba(21, 126, 255, 0.05)',
                              border: ' 1px solid rgba(21, 126, 255, 0.2)',
                              fontSize: '16px',
                              fontWeight: 600,
                              marginTop: '-10px',
                            }}
                            onClick={showMore}
                          >
                            {isShowMore ? 'Show less' : 'Show more'}
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Paper>
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
                      Discussion
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        alignItems: 'start',
                        py: '10px',
                      }}
                    >
                      <Box>
                        <Logo />
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#000000', fontWeight: 600, fontSize: '18px' }}>
                          REINSTATED: Increase Kanpai Treasury Allocation to 100%
                        </Typography>
                        <Typography sx={{ color: '#000000', fontWeight: 400, fontSize: '18px' }}>
                          REINSTATED: Increase Kanpai Treasury Allocation to 100% I withdrew the
                          orig...
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
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
                    {!downToXSM ? (
                      <VoteList />
                    ) : (
                      <Box>
                        <Typography
                          sx={{
                            color: '#080F26',
                            fontWeight: 700,
                            fontSize: '18px',
                            paddingBottom: '10px',
                          }}
                        >
                          Votes
                        </Typography>
                        <VoteListMobile />
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Box>

              <Box sx={{ flex: 1 }}>
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
                          Current results
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
                              YAE
                            </Box>
                            <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                              441.16K 9799%
                            </Box>
                          </Box>
                          <Box>
                            <LinearProgress
                              value={60}
                              variant="determinate"
                              sx={{
                                backgroundColor: `#D5DADD`,
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: `#47D16C`,
                                },
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                              NAY
                            </Box>
                            <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                              30.60 {'< '}
                              0.2%
                            </Box>
                          </Box>
                          <Box>
                            <LinearProgress
                              value={20}
                              variant="determinate"
                              sx={{
                                backgroundColor: `#D5DADD`,
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: `#F2271C`,
                                },
                              }}
                            />
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
                            Vote{' '}
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
                        Information
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
                            alignItems: 'center',
                          }}
                        >
                          <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                            State
                          </Box>
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
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                            End
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            04H:13M:28S
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
                            Quorum
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            Not reached
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
                            Current votes
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            207.51K
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
                            Differential
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            Reached
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
                            Current differential
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            203.38K
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
                            Total voting power
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            16,000,000
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
                            Created
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            20 Jul 2022, 02:18 am
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
                            Started
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            20 Jul 2022, 02:19 am
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
                            Author
                          </Box>
                          <Box sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                            0x5180...87621c
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
