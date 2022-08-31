import { useState } from 'react';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackOutlined';
import {
  Box,
  Paper, 
  Button,
  Divider,
  Skeleton,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material';
import { useRouter } from 'next/router';
import { getMarketInfoById, MarketLogo } from 'src/components/MarketSwitcher';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Link } from 'src/components/primitives/Link';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import { TopInfoPanel } from '../../components/TopInfoPanel/TopInfoPanel';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import {
  ComputedReserveData,
  useAppDataContext,
} from '../../hooks/app-data-provider/useAppDataProvider';

import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { CircleIcon } from 'src/components/CircleIcon';
import { AddTokenDropdown } from './AddTokenDropdown';
import { TokenLinkDropdown } from './TokenLinkDropdown';

interface ReserveTopDetailsProps {
  underlyingAsset: string;
}

export const ReserveTopDetails = ({ underlyingAsset }: ReserveTopDetailsProps) => {
  const router = useRouter();
  const { reserves, loading } = useAppDataContext();
  const { currentMarket, currentNetworkConfig, currentChainId } = useProtocolDataContext();
  // const { market, network } = getMarketInfoById(currentMarket);
  const { addERC20Token, switchNetwork, chainId: connectedChainId, connected } = useWeb3Context();

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  const poolReserve = reserves.find(
    (reserve) => reserve.underlyingAsset === underlyingAsset
  ) as ComputedReserveData;

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const symbolsTypographyVariant = downToSM ? 'secondary16' : 'secondary21';

  const ReserveIcon = () => {
    return (
      <Box mr={3} sx={{ mr: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <Skeleton variant="circular" width={40} height={40} sx={{ background: '#074592' }} />
        ) : (
          <img
            src={`/icons/tokens/${poolReserve.iconSymbol.toLowerCase()}.svg`}
            width="40px"
            height="40px"
            alt=""
          />
        )}
      </Box>
    );
  };

  const iconStyling = {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#A5A8B6',
    '&:hover': { color: '#F1F1F3' },
    cursor: 'pointer',
  };

  const ReserveName = () => {
    return loading ? (
      <Skeleton width={60} height={28} sx={{ background: '#074592' }} />
    ) : (
      <Typography variant={valueTypographyVariant} sx={{ color: '#000' }}>{poolReserve.name}</Typography>
    );
  };

  return (
    <>
      {/* <Paper
        sx={theme => ({
          bgcolor: 'transparent',
          py: 0,
          mt: '12px',
          color: '#F1F1F3',
          border: `0px`,
          boxShadow: 'none',
          position: 'relative', 
          top: "14px",
        })}
      >
        <Container sx={{ pb: 0 }}>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            startIcon={
              <SvgIcon sx={{ fontSize: '20px' }}>
                <ArrowBackRoundedIcon />
              </SvgIcon>
            }
            onClick={() => {
              // https://github.com/vercel/next.js/discussions/34980
              if (history.state.idx !== 0) router.back();
              else router.push('/markets');
            }}
            sx={{ width:"100px", mr: 3, mb: downToSM ? '24px' : '0' }}
          >
            <Trans>Back</Trans>
          </Button>
        </Container>
      </Paper> */}
      <TopInfoPanel
        titleComponent={
          <Box>
            {/* <Box
              sx={{
                display: 'flex',
                alignItems: downToSM ? 'flex-start' : 'center',
                alignSelf: downToSM ? 'flex-start' : 'center',
                // mb: 4,
                minHeight: '40px',
                flexDirection: downToSM ? 'column' : 'row',
              }}
            >

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MarketLogo size={20} logo={network.networkLogoPath} />
                <Typography variant="h3" sx={{ color: '#000' }} component="div">
                  {market.marketTitle} <Trans>Market</Trans>
                </Typography>
              </Box>
            </Box> */}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ReserveIcon />
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <ReserveName /> 
                {!loading && (
                  <Typography sx={{ color: '#A5A8B6' }} variant={symbolsTypographyVariant}>
                    ({poolReserve.symbol})
                  </Typography>
                )}
                {loading ? (
                  <Skeleton width={16} height={16} sx={{ ml: 1, background: '#074592' }} />
                ) : (
                  <Box sx={{ display: 'flex' }}>
                    <TokenLinkDropdown poolReserve={poolReserve} downToSM={downToSM} />
                    {connected && (
                      <AddTokenDropdown
                        poolReserve={poolReserve}
                        downToSM={downToSM}
                        switchNetwork={switchNetwork}
                        addERC20Token={addERC20Token}
                        currentChainId={currentChainId}
                        connectedChainId={connectedChainId}
                      />
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        }
      >
        {/* {!downToSM && (
          <>
            <TopInfoPanelItem
              title={!loading && <Trans>{poolReserve.symbol}</Trans>}
              withoutIconWrapper
              icon={<ReserveIcon />}
              loading={loading}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <ReserveName />
                {loading ? (
                  <Skeleton width={16} height={16} sx={{ ml: 1, background: '#074592' }} />
                ) : (
                  <Box sx={{ display: 'flex' }}>
                    <TokenLinkDropdown poolReserve={poolReserve} downToSM={downToSM} />
                    {connected && (
                      <AddTokenDropdown
                        poolReserve={poolReserve}
                        downToSM={downToSM}
                        switchNetwork={switchNetwork}
                        addERC20Token={addERC20Token}
                        currentChainId={currentChainId}
                        connectedChainId={connectedChainId}
                      />
                    )}
                  </Box>
                )}
              </Box>
            </TopInfoPanelItem>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ my: 1, borderColor: 'rgba(235, 235, 239, 0.08)' }}
            />
          </>
        )} */}
        <TopInfoPanelItem title={<Trans>Reserve Size</Trans>} loading={loading} hideIcon>
          <FormattedNumber
            value={poolReserve?.totalLiquidityUSD}
            symbol="USD"
            variant={valueTypographyVariant}
            symbolsVariant={symbolsTypographyVariant}
          />
        </TopInfoPanelItem>

        <TopInfoPanelItem title={<Trans>Available liquidity</Trans>} loading={loading} hideIcon>
          <FormattedNumber
            value={poolReserve?.availableLiquidityUSD}
            symbol="USD"
            variant={valueTypographyVariant}
            symbolsVariant={symbolsTypographyVariant}
          />
        </TopInfoPanelItem>

        <TopInfoPanelItem title={<Trans>Utilization Rate</Trans>} loading={loading} hideIcon>
          <FormattedNumber
            value={poolReserve?.borrowUsageRatio}
            percent
            variant={valueTypographyVariant}
            symbolsVariant={symbolsTypographyVariant}
          />
        </TopInfoPanelItem>

        <TopInfoPanelItem title={<Trans>Oracle price</Trans>} loading={loading} hideIcon>
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <FormattedNumber
              value={poolReserve?.priceInUSD}
              symbol="USD"
              variant={valueTypographyVariant}
              symbolsVariant={symbolsTypographyVariant}
              symbolsColor="#A5A8B6"
            />
            {loading ? (
              <Skeleton width={16} height={16} sx={{ ml: 1, background: '#074592' }} />
            ) : (
              <CircleIcon tooltipText="View oracle contract" downToSM={downToSM}>
                <Link
                  href={currentNetworkConfig.explorerLinkBuilder({
                    address: poolReserve?.priceOracle,
                  })}
                  sx={iconStyling}
                >
                  <SvgIcon sx={{ fontSize: downToSM ? '12px' : '14px' }}>
                    <ExternalLinkIcon />
                  </SvgIcon>
                </Link>
              </CircleIcon>
            )}
          </Box>
        </TopInfoPanelItem>
      </TopInfoPanel>
    </>
  );
};
