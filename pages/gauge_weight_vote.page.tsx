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
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { textCenterEllipsis } from 'src/helpers/text-center-ellipsis';
import Slider from '@mui/material/Slider';

import ApyEffectList from 'src/modules/dashboard/lists/ApyEffectList/ApyEffectList';
import VoterList from 'src/modules/dashboard/lists/Voters/VoterList';
import { PieChart } from 'src/components/piecharts/piechart';

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
  ['Task', 'Hours per Day'],
  ['Moonbeam', 2],
  ['Aurora', 2],
  ['Moonriver', 2],
  ['Emerald', 2],
  ['Polygon', 5],
  ['Optimism', 30],
  ['Arbitrum', 25],
  ['OKC', 25],
  ['BNB', 20],
  ['Ethereum', 40],
];

const proportion_options = {
  title: '',
  is3D: true,
};

const gauge_effect_data = [
  ['Task', 'Hours per Day'],
  ['Dola + Fraxbp (0x34ed...))', 2],
  ['Dola + Fraxbp (0x34ed...))', 2],
  ['Dola + Fraxbp (0x34ed...))', 2],
  ['Dola + Fraxbp (0x34ed...))', 2],
  ['Dola + Fraxbp (0x34ed...))', 5],
  ['Dola + Fraxbp (0x34ed...))', 30],
  ['Dola + Fraxbp (0x34ed...))', 25],
  ['Dola + Fraxbp (0x34ed...))', 25],
  ['Dola + Fraxbp (0x34ed...))', 20],
  ['Dola + Fraxbp (0x34ed...))', 40],
];

const gauge_effect_options = {
  title: '',
  is3D: true,
};

export default function GaugeWeightVoting() {
  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [curGauge, setCurGause] = useState<string>('0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1');
  const [curGaugeForHistory, setCurGauseForHistory] = useState<string>(
    '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1'
  );
  const [voteWeight, setVoteWeight] = useState<number>(0);
  const [slow, setSlow] = useState<number>(0);
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
                      }}
                    >
                      <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}>
                        Proportion for All Different Chains
                      </Typography>
                      <PieChart data={proportion_data} options={proportion_options} />
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
                          <SelectPicker
                            data={gaugeTempData}
                            style={{ width: '100%' }}
                            value={curGauge}
                            onChange={setCurGause}
                            placeholder="Select a gauge"
                            searchable={false}
                            renderMenuItem={(label, item) => {
                              return (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 2,
                                    alignItems: 'center',
                                    fontFamily: 'Gilroy, Arial !important',
                                  }}
                                >
                                  <Box>
                                    {' '}
                                    <TokenIcon
                                      symbol={label}
                                      sx={{ fontSize: '24px', mr: 1 }}
                                    />{' '}
                                  </Box>
                                  <Box>
                                    {' '}
                                    <span
                                      style={{
                                        fontWeight: 500,
                                        fontSize: '18px',
                                        color: '#5B6871',
                                      }}
                                    >
                                      {label.toUpperCase()} ({textCenterEllipsis(item.value, 5, 4)})
                                    </span>
                                  </Box>
                                </Box>
                              );
                            }}
                            renderValue={(value, item) => {
                              return (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 2,
                                    alignItems: 'center',
                                  }}
                                >
                                  <Box>
                                    {' '}
                                    <TokenIcon
                                      symbol={item.label}
                                      sx={{ fontSize: '24px', mr: 1 }}
                                    />{' '}
                                  </Box>
                                  <Box>
                                    {' '}
                                    <span
                                      style={{
                                        fontWeight: 500,
                                        fontSize: '18px',
                                        color: '#5B6871',
                                      }}
                                    >
                                      {item.label.toUpperCase()} ({textCenterEllipsis(value, 5, 4)})
                                    </span>
                                  </Box>
                                </Box>
                              );
                            }}
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
                            Vote Weight %(of your voting power):
                          </label>
                          <InputNumber value={voteWeight} onChange={setVoteWeight} min={0} />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: downToXSM ? 'column' : 'row',
                            justifyContent: downToXSM ? 'center' : 'flex-start',
                            gap: downToXSM ? '16px' : '60px',
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
                              Slow
                            </label>
                            <InputNumber
                              value={slow}
                              onChange={setSlow}
                              min={0}
                              step={0.1}
                              style={{ width: downToXSM ? '100%' : '156px' }}
                            />
                          </Box>
                          <Box sx={{ width: '284px' }}>
                            <label
                              style={{
                                display: 'block',
                                color: '#252C32',
                                fontWeight: 400,
                                fontSize: '14px',
                                paddingBottom: '5px',
                              }}
                            >
                              Gas priority fee:
                            </label>{' '}
                            <Box
                              sx={{
                                paddingLeft: '25px',
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              {' '}
                              <Slider
                                aria-label="Custom marks"
                                defaultValue={2}
                                step={1}
                                valueLabelDisplay="auto"
                                min={1}
                                max={3}
                                marks={marks}
                                sx={{
                                  '& .MuiSlider-thumb': {
                                    backgroundColor: '#F6F8F9',
                                    border: '1px solid #B0BABF',
                                    opacity: 1,
                                    '&:focus, &:hover, &.Mui-active': {
                                      boxShadow:
                                        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                                      // Reset on touch devices, it doesn't add specificity
                                    },
                                  },
                                  '& .MuiSlider-track': {
                                    border: 'none',
                                    backgroundColor: '#074592',
                                  },
                                  '& .MuiSlider-rail': {
                                    opacity: 1,
                                    backgroundColor: '#DDE2E4',
                                  },
                                  '& .MuiSlider-mark': {
                                    backgroundColor: '#bfbfbf',
                                    height: '2px',
                                    '&.MuiSlider-markActive': {
                                      opacity: 1,
                                      backgroundColor: '#F6F8F9',
                                    },
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Button
                          sx={{
                            color: '#F6F8F9',
                            fontSize: '14px',
                            fontWeight: 600,
                            backgroundColor: '#023997',
                            '&.hover': {
                              color: '#023997',
                            },
                          }}
                          variant="contained"
                        >
                          Submit
                        </Button>
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
                      <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}>
                        Proposed future gauge weight changes taking effect on 29/12/2022 UTC
                      </Typography>
                      <PieChart data={gauge_effect_data} options={gauge_effect_options} />
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
                              data={gaugeTempData}
                              value={curGaugeForHistory}
                              style={{ width: downToXSM ? '200px' : '100%' }}
                              onChange={setCurGauseForHistory}
                              placeholder="Select a gauge"
                              searchable={false}
                              renderMenuItem={(label, item) => {
                                return (
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      gap: 2,
                                      alignItems: 'center',
                                      fontFamily: 'Gilroy, Arial !important',
                                    }}
                                  >
                                    <Box>
                                      {' '}
                                      <TokenIcon
                                        symbol={label}
                                        sx={{ fontSize: '24px', mr: 1 }}
                                      />{' '}
                                    </Box>
                                    <Box>
                                      {' '}
                                      <span
                                        style={{
                                          fontWeight: 500,
                                          fontSize: '18px',
                                          color: '#5B6871',
                                        }}
                                      >
                                        {label.toUpperCase()} (
                                        {textCenterEllipsis(item.value, 5, 4)})
                                      </span>
                                    </Box>
                                  </Box>
                                );
                              }}
                              renderValue={(value, item) => {
                                return (
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      gap: 2,
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Box>
                                      {' '}
                                      <TokenIcon
                                        symbol={item.label}
                                        sx={{ fontSize: '24px', mr: 1 }}
                                      />{' '}
                                    </Box>
                                    <Box>
                                      {' '}
                                      <span
                                        style={{
                                          fontWeight: 500,
                                          fontSize: '18px',
                                          color: '#5B6871',
                                        }}
                                      >
                                        {item.label.toUpperCase()} (
                                        {textCenterEllipsis(value, 5, 4)})
                                      </span>
                                    </Box>
                                  </Box>
                                );
                              }}
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
