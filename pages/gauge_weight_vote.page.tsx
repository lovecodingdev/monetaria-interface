import { Trans } from '@lingui/macro';
import { Box, Paper, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePermissions } from 'src/hooks/usePermissions';
import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { ContentContainer } from '../src/components/ContentContainer';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';
import borderGradient from 'src/layouts/borderGradient';
import { SelectPicker, InputNumber } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import ApyEffectList from 'src/modules/gauge-weight-vote/ApyEffectList/ApyEffectList';
import VoterList from 'src/modules/dashboard/lists/Voters/VoterList';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { ItemDataType } from 'src/helpers/rsuite-types';
import { GuageWeightVoteActions } from 'src/components/transactions/GaugeWeightVote/GuageWeightVoteActions';
import { ChangeNetworkWarning } from 'src/components/transactions/Warnings/ChangeNetworkWarning';
import { getNetworkConfig } from 'src/utils/marketsAndNetworksConfig';
import { TokenOption } from 'src/components/TokenOption';
import { useModalContext } from 'src/hooks/useModal';
import { GasEstimationError } from 'src/components/transactions/FlowCommons/GasEstimationError';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import WeightVotingHistory from 'src/modules/gauge-weight-vote/WeightVotingHistory/WeightVotingHistory';
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

export default function GaugeWeightVoting() {
  const { currentAccount, loading: web3Loading, chainId: connectedChainId } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [curGauge, setCurGause] = useState<string>();
  const [curGaugeForHistory, setCurGauseForHistory] = useState<string>();
  const [voteWeight, setVoteWeight] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [gaugePickerData, setGaugePickerData] = useState<ItemDataType<string>[]>([]);
  const [pieOptions, setPieOptions]  = useState<Highcharts.Options>({
    chart: {
      height: 300
    },
    title: {
      text: 'Proposed future gauge weights',
      align: 'left'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        size:'100%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Gauges',
      data: [],
    }]
  });

  const { currentMarketData, currentChainId: marketChainId } = useProtocolDataContext();
  const { txError } = useModalContext();

  const isWrongNetwork = connectedChainId !== marketChainId;

  useEffect(()=>{
    let _gaugePickerData = [];
    let _pieData = [];
    for (const key in currentMarketData.addresses.GAUGES) {
      _gaugePickerData.push({
        label: key,
        value: currentMarketData.addresses.GAUGES[key],
      });
      _pieData.push({
        name: key,
        y: 0.0001,
      });
    }
    setGaugePickerData(_gaugePickerData);
    setPieOptions({
      ...pieOptions,
      series: [{
        type: 'pie',
        name: 'Gauges',
        data: _pieData
      }]
    });
  }, []);

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
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: '24px',
                    flexWrap: 'wrap',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Paper
                      sx={{
                        bgcolor: 'background.header',
                        padding: '24px',
                        color: '#F1F1F3',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        ...borderGradient,
                      }}
                    >
                      <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px', mb: 4 }}>
                        Vote for Gauge Weight
                      </Typography>
                      {isWrongNetwork && (
                        <ChangeNetworkWarning
                          networkName={getNetworkConfig(marketChainId).name}
                          chainId={marketChainId}
                        />
                      )}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                          flex: 1,
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
                        {txError ? 
                          <Box sx={{mt: -4}}>
                            <GasEstimationError txError={txError} />
                          </Box>
                          :
                          <Box sx={{flex: 1}}/>
                        }
                        <Box sx={{ display: 'flex' }}>
                          <GuageWeightVoteActions 
                            gaugeAddr={curGauge || ""}
                            userWeight={voteWeight}
                            isWrongNetwork={isWrongNetwork}
                            blocked={false}
                            sx={{mt: 0, width: '100%'}}
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
                        color: '#F1F1F3',
                        height: '100%',
                        ...borderGradient,
                      }}
                    >
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={pieOptions}
                      />
                    </Paper>
                  </Box>
                </Box>
                <Box>
                  <Paper
                    sx={{
                      bgcolor: 'background.header',
                      padding: '24px',
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
                      color: '#F1F1F3',
                      ...borderGradient,
                    }}
                  >
                    <WeightVotingHistory/>
                  </Paper>
                </Box>
                {/* <Box>
                  <Paper
                    sx={{
                      bgcolor: 'background.header',
                      padding: '24px',
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
                              596,512.56 <span style={{ fontSize: '14px' }}>veMNT</span>
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
                              Total veMNT{' '}
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
                              veMNT supply voted{' '}
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
                </Box> */}
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
