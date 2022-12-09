import { Trans } from '@lingui/macro';
import { Box, Paper, Typography, useMediaQuery, useTheme, Button, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePermissions } from 'src/hooks/usePermissions';
import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { ContentContainer } from '../src/components/ContentContainer';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';
import borderGradient from 'src/layouts/borderGradient';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import PlaceholderImage from '/public/icons/placeholder.svg';
import { styled } from '@mui/system';
import { ButtonToolbar, ButtonGroup, Slider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

interface DescriptionData {
  image: string;
  title: string;
  description: string;
  expanded: boolean;
}

const descriptions: DescriptionData[] = [
  {
    image: '',
    title: 'GAS REFUND',
    description: `Get up to 95% of gas expenses refunded, depending on your stake size
    Under this program, 1INCH tokens are distributed as gas refund to
    Ethereum users who stake 1INCH tokens through the 1inch dApp.`,
    expanded: false,
  },
  {
    image: '',
    title: 'GAS REFUND',
    description: `Get up to 95% of gas expenses refunded, depending on your stake size
    Under this program, 1INCH tokens are distributed as gas refund to
    Ethereum users who stake 1INCH tokens through the 1inch dApp.`,
    expanded: false,
  },
  {
    image: '',
    title: 'GAS REFUND',
    description: `Get up to 95% of gas expenses refunded, depending on your stake size
    Under this program, 1INCH tokens are distributed as gas refund to
    Ethereum users who stake 1INCH tokens through the 1inch dApp.`,
    expanded: false,
  },
];

const NewTabs = styled(Tabs)({
  minHeight: '24px',
  '& .MuiTabs-flexContainer': {
    gap: 4,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  border: '1px solid #F6F8F9',
  padding: '2px',
  borderRadius: '100px',
});

const NewTab = styled(Tab)`
  margin: 0px;
  fontweight: 600;
  fontfamily: Gilroy, Arial !important;
  fontstyle: normal !important;
  min-height: 24px;
  border-radius: 100px;
  height: 40px;
  width: 49%;
  color: #b0babf;
  &.Mui-selected,
  &:hover {
    background: #eef0f2;
    border-radius: 100px;
    color: #000000;
    font-weight: bold;
  }
`;

export default function Staking() {
  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();
  const [data, setData] = useState(descriptions);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const toggleReadMore = (index: number) => {
    data.forEach((description, idx) => {
      if (idx == index) {
        description.expanded = !description.expanded;
      }
    });
    setData([...data]);
  };

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
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
              }}
            >
              <Box sx={{ flex: 2, order: { xs: 2, md: 1 } }}>
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
                        position: 'relative',
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {data.map((description: DescriptionData, idx) => (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: { xs: 'column', sm: 'row' },
                              gap: '4px',
                              flexWrap: 'wrap',
                            }}
                            key={idx}
                          >
                            <Box sx={{ flex: 2, order: { xs: 1, sm: 1 } }}>
                              <PlaceholderImage />
                            </Box>
                            <Box sx={{ flex: 10, padding: '5px', order: { xs: 3, sm: 2 } }}>
                              <Typography
                                sx={{ color: '#080F26', fontWeight: 600, fontSize: '14px' }}
                              >
                                {description.title}
                              </Typography>
                              <Typography
                                sx={{
                                  color: '#5B6871',
                                  fontWeight: 400,
                                  fontSize: '14px',
                                }}
                              >
                                {!description.expanded
                                  ? description.description.slice(0, 110) + '...'
                                  : description.description}
                              </Typography>
                            </Box>

                            {!description.expanded ? (
                              <ChevronDownIcon
                                style={{
                                  color: '#252C32',
                                  width: '20px',
                                  position: 'absolute',
                                  right: '20px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => toggleReadMore(idx)}
                              />
                            ) : (
                              <ChevronUpIcon
                                style={{
                                  color: '#252C32',
                                  width: '20px',
                                  position: 'absolute',
                                  right: '20px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => toggleReadMore(idx)}
                              />
                            )}
                          </Box>
                        ))}
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: 1, order: { xs: 1, md: 2 } }}>
                <Paper
                  sx={{
                    bgcolor: 'background.header',
                    padding: '24px',
                    mt: { xs: '8px', md: '12px' },
                    color: '#F1F1F3',
                    ...borderGradient,
                  }}
                >
                  <Box style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    <Box>
                      <NewTabs
                        value={selectedTab}
                        onChange={handleChange}
                        sx={{
                          mb: 2,
                        }}
                      >
                        <NewTab
                          label="Stake"
                          sx={{
                            fontSize: { xs: '14px', md: '14px' },
                            fontFamily: 'Gilroy,Arial !important',
                            fontStyle: 'normal',
                          }}
                        />
                        <NewTab
                          label="Unstake"
                          sx={{
                            fontSize: { xs: '14px', md: '14px' },
                            fontFamily: 'Gilroy,Arial !important',
                            fontStyle: 'normal',
                          }}
                        />
                      </NewTabs>
                    </Box>
                    <Box>
                      {selectedTab == 0 && <>first</>}
                      {selectedTab == 1 && <>sec</>}
                    </Box>
                    <Button
                      sx={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        backgroundImage: 'linear-gradient(#A439FF, #9582FF)',
                        height: '40px',
                        color: '#F6F8F9',
                        fontWeight: 600,
                        fontSize: '14px',
                      }}
                    >
                      Create Lock
                    </Button>
                  </Box>
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

Staking.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
