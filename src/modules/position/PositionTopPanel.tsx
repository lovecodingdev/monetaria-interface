import { normalize, UserIncentiveData, valueToBigNumber } from '@monetaria/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Paper, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';

// TODO: need change icon
// import HfEmpty from '/public/icons/healthFactor/hfEmpty.svg';
// import HfFull from '/public/icons/healthFactor/hfFull.svg';
// import HfLow from '/public/icons/healthFactor/hfLow.svg';
// import HfMiddle from '/public/icons/healthFactor/hfMiddle.svg';
import HALLink from '../../components/HALLink';
import { HealthFactorNumber } from '../../components/HealthFactorNumber';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { NoData } from '../../components/primitives/NoData';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import { useAppDataContext } from '../../hooks/app-data-provider/useAppDataProvider';
import { LiquidationRiskParametresInfoModal } from '../dashboard/LiquidationRiskParametresModal/LiquidationRiskParametresModal';

import WalletIcon from '../../../public/icons/markets/wallet-icon.svg';
import NetAPYIcon from '../../../public/icons/markets/net-apy-icon.svg';
import EmptyHeartIcon from '../../../public/icons/markets/empty-heart-icon.svg';
import ClaimGiftIcon from '../../../public/icons/markets/claim-gift-icon.svg';
import { NetAPYTooltip } from 'src/components/infoTooltips/NetAPYTooltip';
import borderGradient from "src/layouts/borderGradient";
import { ContentWithTooltip } from 'src/components/ContentWithTooltip';

export const PositionTopPanel = () => {
  const { currentNetworkConfig, currentMarketData, currentMarket } = useProtocolDataContext();
  const { user, reserves, loading } = useAppDataContext();
  const { currentAccount } = useWeb3Context();
  const [open, setOpen] = useState(false);
  const [openBorrowPowerTooltip, setOpenBorrowPowerTooltip] = useState(false);
  const { openClaimRewards } = useModalContext();

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { claimableRewardsUsd } = Object.keys(user.calculatedUserIncentives).reduce(
    (acc, rewardTokenAddress) => {
      const incentive: UserIncentiveData = user.calculatedUserIncentives[rewardTokenAddress];
      const rewardBalance = normalize(incentive.claimableRewards, incentive.rewardTokenDecimals);

      let tokenPrice = 0;
      // getting price from reserves for the native rewards for v2 markets
      if (!currentMarketData.v3 && Number(rewardBalance) > 0) {
        if (currentMarket === 'proto_mainnet') {
          const aave = reserves.find((reserve) => reserve.symbol === 'AAVE');
          tokenPrice = aave ? Number(aave.priceInUSD) : 0;
        } else {
          reserves.forEach((reserve) => {
            if (reserve.symbol === currentNetworkConfig.wrappedBaseAssetSymbol) {
              tokenPrice = Number(reserve.priceInUSD);
            }
          });
        }
      } else {
        tokenPrice = Number(incentive.rewardPriceFeed);
      }

      const rewardBalanceUsd = Number(rewardBalance) * tokenPrice;

      if (rewardBalanceUsd > 0) {
        if (acc.assets.indexOf(incentive.rewardTokenSymbol) === -1) {
          acc.assets.push(incentive.rewardTokenSymbol);
        }

        acc.claimableRewardsUsd += Number(rewardBalanceUsd);
      }

      return acc;
    },
    { claimableRewardsUsd: 0, assets: [] } as { claimableRewardsUsd: number; assets: string[] }
  );

  const loanToValue =
    user?.totalCollateralMarketReferenceCurrency === '0'
      ? '0'
      : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
        .dividedBy(user?.totalCollateralMarketReferenceCurrency || '1')
        .toFixed();

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const noDataTypographyVariant = downToSM ? 'secondary16' : 'secondary21';

  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? valueToBigNumber('0')
    : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
        .div(maxBorrowAmount).multipliedBy(100);

  return (
    <>
      <Paper
        sx={{
          p: 4,
          ...borderGradient
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          <TopInfoPanelItem hideIcon icon={<WalletIcon />} title={<Trans>Net worth</Trans>} loading={loading}>
            {currentAccount ? (
              <FormattedNumber
                value={Number(user?.netWorthUSD || 0)}
                symbol="USD"
                variant={valueTypographyVariant}
                visibleDecimals={2}
                compact
                symbolsVariant={noDataTypographyVariant}
              />
            ) : (
              <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7' }} />
            )}
          </TopInfoPanelItem>

          <TopInfoPanelItem
            hideIcon 
            icon={<NetAPYIcon />}
            title={
              <div style={{ display: 'flex' }}>
                <Trans>Net APY</Trans>
                <NetAPYTooltip />
              </div>
            }
            loading={loading}
          >
            {currentAccount ? (
              <FormattedNumber
                value={user.netAPY}
                variant={valueTypographyVariant}
                visibleDecimals={2}
                percent
                symbolsVariant={noDataTypographyVariant}
              />
            ) : (
              <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7' }} />
            )}
          </TopInfoPanelItem>

          {currentAccount && user?.healthFactor !== '-1' && (
            <TopInfoPanelItem
              hideIcon 
              icon={<EmptyHeartIcon />}
              title={
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                  <Trans>Health factor</Trans>
                </Box>
              }
              // TODO: need change icon
              // icon={
              //   <SvgIcon sx={{ fontSize: '24px' }}>
              //     {+user.healthFactor >= 10 && <HfFull />}
              //     {+user.healthFactor < 10 && +user.healthFactor >= 3 && <HfMiddle />}
              //     {+user.healthFactor < 3 && +user.healthFactor >= 1 && <HfLow />}
              //     {+user.healthFactor < 1 && <HfEmpty />}
              //   </SvgIcon>
              // }
              loading={loading}
            >
              <HealthFactorNumber
                value={user?.healthFactor || '-1'}
                variant={valueTypographyVariant}
                onInfoClick={() => setOpen(true)}
                // HALIntegrationComponent={
                //   currentMarketData.halIntegration && (
                //     <HALLink
                //       healthFactor={user?.healthFactor || '-1'}
                //       marketName={currentMarketData.halIntegration.marketName}
                //       integrationURL={currentMarketData.halIntegration.URL}
                //     />
                //   )
                // }
              />
            </TopInfoPanelItem>
          )}

          {/* {currentAccount && claimableRewardsUsd > 0 && (
            <TopInfoPanelItem
              title={<Trans>Available rewards</Trans>}
              icon={<ClaimGiftIcon />}
              loading={loading}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'flex-start', xsm: 'center' },
                  flexDirection: { xs: 'column', xsm: 'row' },
                }}
              >
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }} data-cy={'Claim_Box'}>
                  <FormattedNumber
                    value={claimableRewardsUsd}
                    variant={valueTypographyVariant}
                    visibleDecimals={2}
                    compact
                    symbol="USD"
                    symbolsColor="#A5A8B6"
                    symbolsVariant={noDataTypographyVariant}
                    data-cy={'Claim_Value'}
                  />
                </Box>

                <Button
                  variant="gradient"
                  size="small"
                  onClick={() => openClaimRewards()}
                  sx={{ minWidth: 'unset', ml: { xs: 0, xsm: 2 } }}
                  data-cy={'Dashboard_Claim_Button'}
                >
                  <Trans>Claim</Trans>
                </Button>
              </Box>
            </TopInfoPanelItem>
          )} */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            // justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ContentWithTooltip
            tooltipContent={
              <>
                {
                  'The % of your total borrowing power used. This is based on the amount of your collateral supplied and the total amount that you can borrow.'
                }
              </>
            }
            open={openBorrowPowerTooltip}
            setOpen={setOpenBorrowPowerTooltip}
          >
            <Box sx={{ position: 'relative', mr: 4, mt: 4, width: '172px' }}>
              <CircularProgress
                variant="determinate"
                sx={{
                  color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                  position: 'absolute',
                  left: 0,
                  top: 0,
                }}
                size={172}
                thickness={8}
                value={100}
              />
              <CircularProgress
                variant="determinate"
                color={'error'}
                sx={{
                  [`& .${circularProgressClasses.circle}`]: {
                  },
                }}
                size={172}
                thickness={8}
                // We show at minimum, 2% color to represent small values
                value={
                  collateralUsagePercent.toNumber() <= 2 ? 2 : collateralUsagePercent.toNumber()
                }
              />
              <Typography
                variant="h2"
                sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {collateralUsagePercent.toFixed(2)}%
              </Typography>
            </Box>
          </ContentWithTooltip>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <TopInfoPanelItem
              hideIcon
              icon={<WalletIcon />}
              title={<Trans>Total Supplies</Trans>}
              loading={loading}
            >
              {currentAccount ? (
                <FormattedNumber
                  value={Number(user?.totalLiquidityUSD || 0)}
                  symbol="USD"
                  variant={valueTypographyVariant}
                  visibleDecimals={2}
                  compact
                  symbolsVariant={noDataTypographyVariant}
                />
              ) : (
                <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7' }} />
              )}
            </TopInfoPanelItem>
            <TopInfoPanelItem
              hideIcon
              icon={<WalletIcon />}
              title={<Trans>Total Borrows</Trans>}
              loading={loading}
            >
              {currentAccount ? (
                <FormattedNumber
                  value={Number(user?.totalBorrowsUSD || 0)}
                  symbol="USD"
                  variant={valueTypographyVariant}
                  visibleDecimals={2}
                  compact
                  symbolsVariant={noDataTypographyVariant}
                />
              ) : (
                <NoData variant={noDataTypographyVariant} sx={{ opacity: '0.7' }} />
              )}
            </TopInfoPanelItem>
          </Box>
        </Box>
      </Paper>

      <LiquidationRiskParametresInfoModal
        open={open}
        setOpen={setOpen}
        healthFactor={user?.healthFactor || '-1'}
        loanToValue={loanToValue}
        currentLoanToValue={user?.currentLoanToValue || '0'}
        currentLiquidationThreshold={user?.currentLiquidationThreshold || '0'}
      />
    </>
  );
};
