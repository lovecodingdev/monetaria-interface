import { Trans } from '@lingui/macro';
import { Box, Paper, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { useState } from 'react';
import { usePermissions } from 'src/hooks/usePermissions';
import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { ContentContainer } from '../src/components/ContentContainer';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';
import borderGradient from 'src/layouts/borderGradient';

import { SelectPicker, InputNumber } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Slider from '@mui/material/Slider';

import ApyEffectList from 'src/modules/dashboard/lists/ApyEffectList/ApyEffectList';
import VoterList from 'src/modules/dashboard/lists/Voters/VoterList';
import dynamic from 'next/dynamic';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { ItemDataType } from 'src/helpers/rsuite-types';
import { GuageWeightVoteActions } from 'src/components/transactions/GaugeWeightVote/GuageWeightVoteActions';
import { ChangeNetworkWarning } from 'src/components/transactions/Warnings/ChangeNetworkWarning';
import { getNetworkConfig } from 'src/utils/marketsAndNetworksConfig';
import { TokenOption } from 'src/components/TokenOption';

const PieChart = dynamic(() => import('src/components/piecharts/piechart'), { ssr: false });

const gaugeTempData = [
  {
    label: 'mnt',
    value: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
  },
  {
    label: 'btc',
    value: '0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e600b1',
  },
];

const marks = [
  {
    value: 1,
    label: 'Standard',
  },
  {
    value: 2,
    label: 'Fast',
  },
  {
    value: 3,
    label: 'Instant',
  },
];

const proportion_data = [
  { name: 'Moonbeam', address: '', percentage: 1 },
  { name: 'Aurora', address: '', percentage: 1 },
  { name: 'Moonriver', address: '', percentage: 1 },
  { name: 'Emerald', address: '', percentage: 1 },
  { name: 'Polygon', address: '', percentage: 6 },
  { name: 'Optimism', address: '', percentage: 20 },
  { name: 'Arbitrm', address: '', percentage: 15 },
  { name: 'OKC', address: '', percentage: 15 },
  { name: 'BNB', address: '', percentage: 15 },
  { name: 'Ethereum', address: '', percentage: 25 },
];

const gauge_effect_data = [
  { name: 'Dola', address: '0x34ed...', percentage: 10 },
  { name: 'Fraxbp', address: '0x34ed...', percentage: 10 },
  { name: 'Fraxbp', address: '0x34ed...', percentage: 10 },
  { name: 'Fraxbp', address: '0x34ed...', percentage: 10 },
  { name: 'Fraxbp', address: '0x34ed...', percentage: 10 },
  { name: 'Fraxbp', address: '0x34ed...', percentage: 10 },
  { name: 'Fraxbp', address: '0x34ed...', percentage: 10 },
  { name: 'Fraxbp', address: '0x34ed...', percentage: 10 },
  { name: 'Fraxbp', address: '0x34ed...', percentage: 10 },
  { name: 'Fraxbp', address: '0x34ed...', percentage: 10 },
];

export default function GaugeWeightVoting() {
  const { currentAccount, loading: web3Loading, chainId: connectedChainId } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [curGauge, setCurGause] = useState<string>();
  const [curGaugeForHistory, setCurGauseForHistory] = useState<string>();
  const [voteWeight, setVoteWeight] = useState<number>(0);
  const [slow, setSlow] = useState<number>(0);

  const { currentMarketData, currentChainId: marketChainId } = useProtocolDataContext();

  const gaugePickerData = [];
  for (const key in currentMarketData.addresses.GAUGES) {
    gaugePickerData.push({
      label: key,
      value: currentMarketData.addresses.GAUGES[key],
    });
  }

  const isWrongNetwork = connectedChainId !== marketChainId;

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
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
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
                        height: !downToXSM ? '316px' : 'auto',
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
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: downToXSM ? 'row' : 'column',
                            justifyContent: downToXSM ? 'space-between' : 'flex-start',
                          }}
                        >
                          <Box>
                            {' '}
                            <Typography sx={{ color: '#000', fontWeight: 400, fontSize: '14px' }}>
                              Total WPC Distribution Speed
                            </Typography>
                          </Box>
                          <Box>
                            {' '}
                            <Typography sx={{ color: '#000', fontWeight: 400, fontSize: '14px' }}>
                              <span style={{ color: '#333333', fontSize: '24px', fontWeight: 700 }}>
                                280
                              </span>{' '}
                              <span style={{ color: '#000000', fontSize: '14px', fontWeight: 400 }}>
                                WPC/Block
                              </span>
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: downToXSM ? 'column' : 'row',
                            gap: downToXSM ? '42px' : '74px',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: downToXSM ? 'row' : 'column',
                              justifyContent: downToXSM ? 'space-between' : 'flex-start',
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{ color: '#000000', fontSize: '14px', fontWeight: 400 }}
                              >
                                Community Part Distribution Speed
                              </Typography>
                            </Box>
                            <Box>
                              <Typography>
                                <span
                                  style={{ color: '#333333', fontSize: '24px', fontWeight: 700 }}
                                >
                                  1,318,372.44
                                </span>{' '}
                                <span
                                  style={{ color: '#000000', fontSize: '14px', fontWeight: 400 }}
                                >
                                  WPC/Day
                                </span>
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: downToXSM ? 'row' : 'column',
                              justifyContent: downToXSM ? 'space-between' : 'flex-start',
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{ color: '#000000', fontSize: '14px', fontWeight: 400 }}
                              >
                                Community Part Ratio
                              </Typography>
                            </Box>
                            <Box>
                              <Typography>
                                {' '}
                                <span
                                  style={{ color: '#333333', fontSize: '24px', fontWeight: 700 }}
                                >
                                  71.94%
                                </span>{' '}
                              </Typography>
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
                        height: !downToXSM ? '316px' : 'auto',
                      }}
                    >
                      <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}>
                        Proportion for All Different Chains
                      </Typography>

                      <PieChart data={proportion_data} />

                      <Typography
                        sx={{ color: '#000', fontWeight: 400, fontSize: '12px', opacity: '50%' }}
                      >
                        Data update rules: Ethereum updates every 28 days, other chains update every
                        7 days, the lastest update 2022-12-12
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
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
                        height: !downToXSM ? '344px' : 'auto',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                        }}
                      >
                        <Box>
                          {' '}
                          <label
                            style={{
                              display: 'block',
                              color: '#252C32',
                              fontWeight: 400,
                              fontSize: '14px',
                              paddingBottom: '5px',
                            }}
                          >
                            Select a gauge
                          </label>
                          {isWrongNetwork && (
                            // <Box sx={{mb: -6}}>
                              <ChangeNetworkWarning
                                networkName={getNetworkConfig(marketChainId).name}
                                chainId={marketChainId}
                              />
                            // </Box>
                          )}

                          <SelectPicker
                            data={gaugePickerData}
                            style={{ width: '100%' }}
                            value={curGauge}
                            onChange={(value) => setCurGause(value || '')}
                            placeholder="Select a gauge"
                            searchable={false}
                            renderMenuItem={(label, item) => <TokenOption item={item} />}
                            renderValue={(value, item) => <TokenOption item={item} />}
                            cleanable={false}
                          />
                        </Box>
                        <Box>
                          <label
                            style={{
                              display: 'block',
                              color: '#252C32',
                              fontWeight: 400,
                              fontSize: '14px',
                              paddingBottom: '5px',
                            }}
                          >
                            Vote Weight :
                          </label>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              gap: '16px',
                              alignItems: 'center',
                            }}
                          >
                            <InputNumber
                              value={voteWeight}
                              onChange={(value) => setVoteWeight(Number(value))}
                              min={0}
                              step={10}
                              style={{ flex: 1 }}
                            />
                            <Box
                              sx={{
                                color: 'black',
                                fontWeight: 400,
                                fontSize: '14px',
                                textAlign: 'end',
                              }}
                            >
                              % ( of your voting power )
                            </Box>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                          {/* <Button
                            sx={{
                              color: '#F6F8F9',
                              fontSize: '14px',
                              fontWeight: 600,
                              width: '299px',
                              backgroundColor: '#023997',
                              '&.hover': {
                                color: '#023997',
                              },
                            }}
                            variant="contained"
                          >
                            Submit
                          </Button> */}
                          <GuageWeightVoteActions 
                            gaugeAddr={curGauge || ""}
                            userWeight={voteWeight}
                            isWrongNetwork={isWrongNetwork}
                            blocked={false}
                          />
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
                        height: !downToXSM ? '344px' : 'auto',
                      }}
                    >
                      <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}>
                        Proposed future gauge weight changes taking effect on 29/12/2022 UTC
                      </Typography>
                      <PieChart data={gauge_effect_data} />
                    </Paper>
                  </Box>
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
                    <ApyEffectList />
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
                    <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}>
                      Weight Voting History
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '32px',
                        gap: '28px',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: downToXSM ? 'column' : 'row',
                          gap: downToXSM ? '30px' : '60px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: downToXSM ? 'row' : 'column',
                            justifyContent: downToXSM ? 'space-between' : 'flex-start',
                            alignItems: downToXSM ? 'center' : 'flex-start',
                          }}
                        >
                          <Box>
                            {' '}
                            <Typography sx={{ color: '#000', fontWeight: 400, fontSize: '14px' }}>
                              Voted this week{' '}
                            </Typography>
                          </Box>
                          <Box>
                            {' '}
                            <Typography
                              sx={{ color: '#333333', fontWeight: 700, fontSize: '24px' }}
                            >
                              596,512.56 <span style={{ fontSize: '14px' }}>veCRV</span>
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: downToXSM ? 'row' : 'column',
                            justifyContent: downToXSM ? 'space-between' : 'flex-start',

                            alignItems: downToXSM ? 'center' : 'flex-start',
                          }}
                        >
                          <Box>
                            {' '}
                            <Typography sx={{ color: '#000', fontWeight: 400, fontSize: '14px' }}>
                              Total veCRV{' '}
                            </Typography>
                          </Box>
                          <Box>
                            {' '}
                            <Typography
                              sx={{ color: '#333333', fontWeight: 700, fontSize: '24px' }}
                            >
                              563,884,351.8
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: downToXSM ? 'row' : 'column',
                            justifyContent: downToXSM ? 'space-between' : 'flex-start',

                            alignItems: downToXSM ? 'center' : 'flex-start',
                          }}
                        >
                          <Box>
                            {' '}
                            <Typography sx={{ color: '#000', fontWeight: 400, fontSize: '14px' }}>
                              veCRV supply voted{' '}
                            </Typography>
                          </Box>
                          <Box>
                            {' '}
                            <Typography
                              sx={{ color: '#333333', fontWeight: 700, fontSize: '24px' }}
                            >
                              0.11 %
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        {' '}
                        <label
                          style={{
                            display: 'block',
                            color: '#252C32',
                            fontWeight: 400,
                            fontSize: '14px',
                            paddingBottom: '5px',
                          }}
                        >
                          Select a gauge
                        </label>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: '8px',
                          }}
                        >
                          {' '}
                          <Box>
                            {' '}
                            <SelectPicker
                              data={gaugePickerData}
                              value={curGaugeForHistory}
                              style={{ width: downToXSM ? '200px' : '100%' }}
                              onChange={value => setCurGauseForHistory(value || "")}
                              placeholder="Select a gauge"
                              searchable={false}
                              renderMenuItem={(label, item) => <TokenOption item={item} />}
                              renderValue={(value, item) => <TokenOption item={item} />}
                              cleanable={false}
                            />
                          </Box>
                          <Box>
                            <Button
                              sx={{
                                backgroundColor: 'rgba(21, 126, 255, 0.05)',
                                border: '1px solid rgba(21, 126, 255, 0.2)',
                                color: '#074592',
                                fontWeight: 600,
                                fontSize: '16px',
                              }}
                            >
                              Filter
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ paddingTop: '32px' }}>
                      <VoterList />
                    </Box>
                  </Paper>
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

GaugeWeightVoting.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
