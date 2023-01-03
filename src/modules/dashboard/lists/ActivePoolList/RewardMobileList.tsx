import React, { useState } from 'react';
import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { Row } from 'src/components/primitives/Row';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { RewardType } from './RewardType';
import { InputNumber } from 'rsuite';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const data: RewardType[] = [
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: -1.26,
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
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: -1.26,
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
    apy: 0.68,
    apr: {
      yield_farming: 7.8,
      trading_fees: 5.97,
      alpaca_rewards: 1.26,
      borrowing_interest: -1.26,
      total_apr: 13.09,
      daily_apr: 0.0358,
    },
    leverage: 2,
    isShowMore: false,
  },
];

export const RewardMobileList = () => {
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
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
            <TokenIcon symbol={asset.symbol} sx={{ fontSize: `32px`, ml: -1 }} />
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
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ paddingTop: '20px' }}>
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
              boxShadow: '1px 1px grey',
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
            <Row
              caption={
                <Trans>
                  <Typography sx={{ color: '#6E7C87', fontSize: '14px', fontWeight: 400 }}>
                    Borrowing Interest:
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
                  {asset.apr.borrowing_interest}%
                </Typography>
              </Box>
            </Row>
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
              <label
                style={{
                  display: 'block',
                  color: '#252C32',
                  fontWeight: 400,
                  fontSize: '14px',
                  paddingBottom: '5px',
                }}
              >
                Leverage:
              </label>
              <InputNumber defaultValue={asset.leverage} style={{ width: '100%' }} min={0} />
            </Box>
            <Button
              sx={{
                color: '#252C32',
                backgroundColor: 'white',
                fontSize: '16px',
                fontWeight: 600,
                marginTop: '10px',
                boxShadow: '1px 1px grey',
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
