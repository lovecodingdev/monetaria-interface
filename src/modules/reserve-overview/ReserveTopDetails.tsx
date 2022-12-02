import { useState } from 'react';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackOutlined';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import {
  Box,
  Paper,
  Button,
  Divider,
  Select,
  Skeleton,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
  MenuItem,
  FormControl,
} from '@mui/material';
import { useRouter } from 'next/router';
import { getMarketInfoById, MarketLogo } from 'src/components/MarketSwitcher';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Link, ROUTES } from 'src/components/primitives/Link';
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
import borderGradient from 'src/layouts/borderGradient';
import { ReserveNormalPaper } from './ReserveNormalPaper';

interface ReserveTopDetailsProps {
  underlyingAsset: string;
}

export const ReserveTopDetails = ({ underlyingAsset }: ReserveTopDetailsProps) => {
  const router = useRouter();
  const { reserves, loading } = useAppDataContext();
  const { currentMarket, currentNetworkConfig, currentChainId } = useProtocolDataContext();
  // const { market, network } = getMarketInfoById(currentMarket);
  const { addERC20Token, switchNetwork, chainId: connectedChainId, connected } = useWeb3Context();
  const [curCoin, setCurCoin] = useState(underlyingAsset);

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));
  const reserveData = reserves.filter((reserve: ComputedReserveData) => !reserve.isFrozen);
  const poolReserve = reserves.find(
    (reserve) => reserve.underlyingAsset === underlyingAsset
  ) as ComputedReserveData;

  const valueTypographyVariant = downToSM ? 'main14' : 'main16';
  const symbolsTypographyVariant = downToSM ? 'secondary14' : 'secondary16';

  const handleCoins = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurCoin(e.target.value);
    router.push(ROUTES.reserveOverview(e.target.value, currentMarket));
  };

  const ReserveIcon = ({ asset }) => {
    return (
      <Box mr={3} sx={{ mr: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <Skeleton variant="circular" width={40} height={40} sx={{ background: '#F1F1F3' }} />
        ) : (
          <img
            src={`/icons/tokens/${asset.iconSymbol.toLowerCase()}.svg`}
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

  const ReserveName = ({ asset }) => {
    return loading ? (
      <Skeleton width={60} height={28} sx={{ background: '#F1F1F3' }} />
    ) : (
      <Typography variant={valueTypographyVariant} sx={{ color: '#000' }}>
        {asset.name}
      </Typography>
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
      <Paper
        sx={{
          p: 4,
          color: '#F1F1F3',
          ...borderGradient,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormControl>
              <Select
                value={curCoin}
                onChange={handleCoins}
                label="coin"
                variant="outlined"
                className="AssetInput__select"
                sx={{
                  p: 0,
                  '&.AssetInput__select .MuiOutlinedInput-input': {
                    p: 0,
                    backgroundColor: 'transparent',
                    pr: '24px !important',
                  },
                  '&.AssetInput__select .MuiOutlinedInput-notchedOutline': { display: 'none' },
                  '&.AssetInput__select .MuiSelect-icon': {
                    color: '#B0BABF',
                  },
                  border: '1px solid #E5E9EB',
                  padding: '1px 8px',
                  width: { xs: '250px', md: '260px' },
                  height: '50px',
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      marginTop: '18px',
                      width: '260px',
                      height: '440px',
                    },
                  },
                }}
              >
                {reserveData?.map((reserve: ComputedReserveData) => (
                  <MenuItem value={reserve.underlyingAsset} key={reserve.underlyingAsset}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: '0.5em',
                      }}
                    >
                      <ReserveIcon asset={reserve} />
                      <ReserveName asset={reserve} />
                      {!loading && (
                        <Typography sx={{ color: '#A5A8B6' }} variant={symbolsTypographyVariant}>
                          ({reserve.symbol})
                        </Typography>
                      )}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {loading ? (
                <Skeleton width={16} height={16} sx={{ ml: 1, background: '#F1F1F3' }} />
              ) : (
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', gap: '0.5em', alignItems: 'center' }}
                >
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
                  <TokenLinkDropdown poolReserve={poolReserve} downToSM={downToSM} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 4,
            flexWrap: 'wrap',
            marginTop: '15px',
          }}
        >
          <TopInfoPanelItem title={<Trans>Oracle price</Trans>} loading={loading} hideIcon>
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <FormattedNumber
                value={poolReserve?.priceInUSD}
                symbol="USD"
                variant={valueTypographyVariant}
                symbolsVariant={symbolsTypographyVariant}
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
                    <SvgIcon sx={{ fontSize: downToSM ? '12px' : '14px', color: '#080F26' }}>
                      <ExternalLinkIcon />
                    </SvgIcon>
                  </Link>
                </CircleIcon>
              )}
            </Box>
          </TopInfoPanelItem>
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
        </Box>
      </Paper>
    </>
  );
};
