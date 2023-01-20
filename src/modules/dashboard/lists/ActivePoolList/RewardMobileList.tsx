import React, { useState } from 'react';
import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { Row } from 'src/components/primitives/Row';
import { TokenPair } from 'src/components/primitives/TokenPair';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { RewardType } from './RewardType';
import { InputNumber, SelectPicker } from 'rsuite';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TVLTooltip } from 'src/components/infoTooltips/TVLTooltip';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import InfoIcon from '@mui/icons-material/Info';

const data: RewardType[] = [
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'USDT',
          value: 'usdt',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'BNB',
    symbol: 'bnb',
    network: 'Binance Smart Chain',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'USDT',
          value: 'usdt',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
  {
    asset: 'Matic',
    symbol: 'matic',
    network: 'Polygon',
    tvl: 'TVL 3.42m',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: [
        {
          label: 'BNB',
          value: 'bnb',
          token_value: -1.26,
        },
        {
          label: 'USDT',
          value: 'usdt',
          token_value: -1.26,
        },
      ],
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
];

export const RewardMobileList = ({ showModal }) => {
  const [farmData, setFarmData] = useState<RewardType[]>(data);

  const updateVisibleState = (_symbol) => {
    const tempArr = farmData;

    tempArr.forEach((arr) => {
      if (arr.symbol == _symbol) {
        arr.isShowMore = !arr.isShowMore;
      }
    });
    setFarmData([...tempArr]);
  };

  return farmData.map((asset, idx) => (
    <Box className="card-border" sx={{ my: 4, padding: 4 }} key={idx}>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          sx={{
            padding: 1.5,
            color: 'white',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
            <TokenPair tokenA={asset.symbol} tokenB={asset.apr.borrowing_interest[1].value} />{' '}
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <Box>
                {' '}
                <Typography
                  variant="description"
                  noWrap
                  sx={{ fontSize: '14px', fontWeight: 400, color: 'black' }}
                >
                  {asset.symbol.toUpperCase()}
                </Typography>
              </Box>
              <Box>
                {' '}
                <Typography
                  variant="description"
                  noWrap
                  sx={{ fontSize: '12px', fontWeight: 400, color: '#84919A' }}
                >
                  {asset.network}
                </Typography>
                <Typography
                  variant="description"
                  noWrap
                  sx={{ fontSize: '12px', fontWeight: 400, color: '#84919A' }}
                >
                  <TVLTooltip text={asset.tvl} />
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ paddingTop: '8px' }}>
        <Row
          caption={
            <Trans>
              <Typography sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                APY:
              </Typography>
            </Trans>
          }
          align="flex-start"
          captionVariant="description"
          mb={2}
        >
          <div>
            <Typography sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
              {asset.apy}%
            </Typography>
          </div>
        </Row>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '8px',
            alignItems: 'center',
            paddingBottom: '10px',
          }}
        >
          <Button
            fullWidth
            sx={{
              backgroundColor: '#074592',
              border: '1px solid rgba(21, 126, 255, 0.2)',
              color: '#FFF',
              fontWeight: 600,
              fontSize: '16px',
            }}
            variant="contained"
          >
            Farm
          </Button>
          <Button
            sx={{
              backgroundColor: 'rgba(21, 126, 255, 0.05)',
              border: '1px solid rgba(21, 126, 255, 0.2)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '16px',
            }}
            onClick={(e) => {
              e.stopPropagation();
              showModal(true);
            }}
          >
            <SignalCellularAltIcon sx={{ color: '#074592' }} />
          </Button>
        </Box>
        {!asset.isShowMore && (
          <Button
            sx={{
              color: '#252C32',
              backgroundColor: 'white',
              fontSize: '16px',
              fontWeight: 600,
              marginTop: '10px',
            }}
            fullWidth
            onClick={() => updateVisibleState(asset.symbol)}
          >
            <KeyboardArrowDownIcon />
          </Button>
        )}

        {asset.isShowMore && (
          <>
            <Row
              caption={
                <Trans>
                  <Typography sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                    Yield Farming:
                  </Typography>
                </Trans>
              }
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>
                {' '}
                <Typography sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                  {asset.apr.yield_farming}%
                </Typography>
              </Box>
            </Row>
            <Row
              caption={
                <Trans>
                  <Typography sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                    Trading Fees:
                  </Typography>
                </Trans>
              }
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>
                {' '}
                <Typography sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                  {asset.apr.trading_fees}%
                </Typography>
              </Box>
            </Row>
            <Row
              caption={
                <Trans>
                  <Typography sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                    ALPACA Rewards:
                  </Typography>
                </Trans>
              }
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>
                {' '}
                <Typography sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                  {asset.apr.alpaca_rewards}%
                </Typography>
              </Box>
            </Row>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <Box sx={{ color: '#6E7C87' }}>Borrowing Interest :</Box>
              <Box className="farm-custom-select">
                <SelectPicker
                  data={asset.apr.borrowing_interest}
                  style={{ width: '100%' }}
                  defaultValue={asset.apr.borrowing_interest[0].value}
                  placeholder="borrowing interest"
                  searchable={false}
                  cleanable={false}
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
                          <TokenIcon symbol={item.value} sx={{ fontSize: `24px`, ml: -1 }} />
                        </Box>
                        <Box>
                          {' '}
                          <Typography
                            style={{ fontWeight: 400, fontSize: '14px', color: ' #252C32' }}
                          >
                            {label}
                          </Typography>
                        </Box>
                        <Box>
                          {' '}
                          <Typography
                            style={{ fontWeight: 400, fontSize: '14px', color: '#84919A' }}
                          >
                            {item.token_value} %
                          </Typography>
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
                          <TokenIcon symbol={value} sx={{ fontSize: `24px` }} />
                        </Box>
                        <Box>
                          {' '}
                          <Typography
                            style={{ fontWeight: 400, fontSize: '14px', color: ' #0F1228' }}
                          >
                            {item.label}
                          </Typography>
                        </Box>
                        <Box>
                          {' '}
                          <Typography
                            style={{ fontWeight: 400, fontSize: '14px', color: '#0F1228' }}
                          >
                            {item.token_value} %
                          </Typography>
                        </Box>
                      </Box>
                    );
                  }}
                />
              </Box>
            </Box>
            <Row
              caption={
                <Trans>
                  <Typography sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                    Total APR:
                  </Typography>
                </Trans>
              }
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>
                {' '}
                <Typography sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                  {asset.apr.total_apr}%
                </Typography>
              </Box>
            </Row>
            <Row
              caption={
                <Trans>
                  <Typography sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                    Daily APR:
                  </Typography>
                </Trans>
              }
              align="flex-start"
              captionVariant="description"
              mb={2}
            >
              <Box>
                {' '}
                <Typography sx={{ color: '#252C32', fontSize: '14px', fontWeight: 400 }}>
                  {asset.apr.daily_apr}%
                </Typography>
              </Box>
            </Row>
            <Box sx={{ padding: '10px 0' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '4px',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                {' '}
                <ElectricBoltIcon sx={{ fontSize: '12px', color: '#48535B' }} />
                <Typography sx={{ fontSize: '12px', color: '#5B6871' }}>Boosted</Typography>
                <InfoIcon sx={{ fontSize: '12px', color: '#D5DADD' }} />
              </Box>
              <InputNumber defaultValue={asset.leverage} style={{ width: '100%' }} min={0} />
            </Box>
            <Button
              sx={{
                color: '#252C32',
                backgroundColor: 'white',
                fontSize: '16px',
                fontWeight: 600,
                marginTop: '10px',
              }}
              fullWidth
              onClick={() => updateVisibleState(asset.symbol)}
            >
              <KeyboardArrowUpIcon />
            </Button>
          </>
        )}
      </Box>
    </Box>
  ));
};
