import React, { useState, ReactNode } from 'react';
import { Trans } from '@lingui/macro';
import {
  Box,
  Paper,
  Typography,
  Tab,
  Tabs,
  Alert,
  Link,
  SvgIcon,
  BoxProps,
  TypographyProps,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/system';
import { ReserveInterestRateModel } from './ReserveInterestRateModel';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useReserveRatesHistory } from 'src/hooks/useReservesHistory';
import { ParentSize } from '@visx/responsive';
import { ApyChart } from '../reserve-overview/ApyChart';
import { InterestRateModelChart } from '../reserve-overview/InterestRateModelChart';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { StableAPYTooltip } from 'src/components/infoTooltips/StableAPYTooltip';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { IncentivesButton } from 'src/components/incentives/IncentivesButton';
import { ReserveOverviewBox } from 'src/components/ReserveOverviewBox';
import { getEmodeMessage } from 'src/components/transactions/Emode/EmodeNaming';
import LightningBoltGradient from '/public/lightningBoltGradient.svg';
import { ROUTES } from 'src/components/primitives/Link';
import { MaxLTVTooltip } from 'src/components/infoTooltips/MaxLTVTooltip';
import { LiquidationThresholdTooltip } from 'src/components/infoTooltips/LiquidationThresholdTooltip';
import { LiquidationPenaltyTooltip } from 'src/components/infoTooltips/LiquidationPenaltyTooltip';
import { ReserveSubheader } from 'src/components/ReserveSubheader';
import { frozenProposalMap } from 'src/utils/marketsAndNetworksConfig';

const NewTabs = styled(Tabs)({
  minHeight: '24px',
  '& .MuiTabs-flexContainer': {
    justifyContent: 'start',
    gap: 2,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const NewTab = styled(Tab)`
  margin: 0px;
  min-height: 24px;
  height: 24px;
  color: #b0babf;
  &.Mui-selected,
  &:hover {
    background: #eef0f2;
    border-radius: 100px;
    color: #080f26;
    font-weight: bold;
  }
`;
export const PanelRow: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={{
      position: 'relative',
      display: { xs: 'block', md: 'flex' },
      margin: '0 auto',
      ...props.sx,
    }}
  />
);
export const PanelTitle: React.FC<TypographyProps> = (props) => (
  <Typography
    {...props}
    variant="subheader1"
    sx={{ minWidth: { xs: '170px' }, mr: 4, mb: { xs: 6, md: 0 }, ...props.sx }}
  />
);

interface PanelColumnProps {
  children?: ReactNode;
}

export const PanelColumn = ({ children }: PanelColumnProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flex: 1,
        overflow: 'hidden',
        py: 1,
      }}
    >
      {children}
    </Box>
  );
};

interface PanelItemProps {
  title: ReactNode;
}

export const PanelItem: React.FC<PanelItemProps> = ({ title, children }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        mb: 4,
        '&:not(:last-child)': {
          pr: 4,
          mr: 4,
        },
        ...(mdUp
          ? {
              '&:not(:last-child)::after': {
                content: '""',
                height: '32px',
                position: 'absolute',
                right: 4,
                top: 'calc(50% - 17px)',
                borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              },
            }
          : {}),
      }}
    >
      <Typography color="text.secondary">{title}</Typography>
      <PanelColumn>{children}</PanelColumn>
    </Box>
  );
};

const ChartContainer: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={{
      minWidth: 0,
      width: '100%',
      maxWidth: '100%',
      height: 300,
      marginLeft: 0,
      flexGrow: 1,
      ...props.sx,
    }}
  />
);

export const InfoTabs = ({ reserve }: { reserve: ComputedReserveData }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const { currentNetworkConfig, currentMarketData } = useProtocolDataContext();
  const renderCharts = !!currentNetworkConfig.ratesHistoryApiUrl;
  const { data, error } = useReserveRatesHistory(
    reserve
      ? `${reserve.underlyingAsset}${currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER}`
      : ''
  ); // TODO: might make sense to move this to gql as well

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Paper
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        width: '100%',
        bgcolor: 'background.paper',
        mx: 'auto',
        padding: { xs: '16px', md: '24px' },
      })}
    >
      <Box sx={{ border: '1px solid red' }}>
        <NewTabs
          value={selectedTab}
          onChange={handleChange}
          sx={{
            mb: 2,
          }}
        >
          <NewTab label="Interest Rate Model" />
          <NewTab label="Supply Info" />
          <NewTab label="Borrow Info" />
          <NewTab label="E-Mode Info" />
        </NewTabs>
      </Box>
      {selectedTab == 0 && <ReserveInterestRateModel reserve={reserve} />}
      {selectedTab == 1 && (
        <Box sx={{ minWidth: 0, maxWidth: '100%', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <PanelItem title={<Trans>Total supplied</Trans>}>
              <FormattedNumber value={reserve.totalLiquidity} variant="main16" compact />
              <ReserveSubheader value={reserve.totalLiquidityUSD} />
            </PanelItem>
            <PanelItem title={<Trans>APY</Trans>}>
              <FormattedNumber value={reserve.supplyAPY} percent variant="main16" />
              <IncentivesButton
                symbol={reserve.symbol}
                incentives={reserve.aIncentivesData}
                displayBlank={true}
              />
            </PanelItem>
            {reserve.supplyCapUSD !== '0' && (
              <PanelItem title={<Trans>Supply cap</Trans>}>
                <FormattedNumber value={reserve.supplyCap} variant="main16" />
                <ReserveSubheader value={reserve.supplyCapUSD} />
              </PanelItem>
            )}
            {reserve.unbacked !== '0' && (
              <PanelItem title={<Trans>Unbacked</Trans>}>
                <FormattedNumber value={reserve.unbacked} variant="main16" symbol={reserve.name} />
                <ReserveSubheader value={reserve.unbackedUSD} />
              </PanelItem>
            )}
          </Box>

          {renderCharts && !error && reserve.borrowingEnabled && (
            <ChartContainer sx={{ mt: 4, pb: 8 }}>
              <ParentSize>
                {(parent) => (
                  <ApyChart
                    width={parent.width}
                    height={parent.height}
                    data={data}
                    fields={[{ name: 'liquidityRate', color: '#2EBAC6', text: 'Supply APR' }]}
                  />
                )}
              </ParentSize>
            </ChartContainer>
          )}

          {reserve.usageAsCollateralEnabled && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <ReserveOverviewBox
                title={<MaxLTVTooltip variant="description" text={<Trans>Max LTV</Trans>} />}
              >
                <FormattedNumber
                  value={reserve.formattedBaseLTVasCollateral}
                  percent
                  variant="secondary14"
                  visibleDecimals={2}
                />
              </ReserveOverviewBox>

              <ReserveOverviewBox
                title={
                  <LiquidationThresholdTooltip
                    variant="description"
                    text={<Trans>Liquidation threshold</Trans>}
                  />
                }
              >
                <FormattedNumber
                  value={reserve.formattedReserveLiquidationThreshold}
                  percent
                  variant="secondary14"
                  visibleDecimals={2}
                />
              </ReserveOverviewBox>

              <ReserveOverviewBox
                title={
                  <LiquidationPenaltyTooltip
                    variant="description"
                    text={<Trans>Liquidation penalty</Trans>}
                  />
                }
              >
                <FormattedNumber
                  value={reserve.formattedReserveLiquidationBonus}
                  percent
                  variant="secondary14"
                  visibleDecimals={2}
                />
              </ReserveOverviewBox>

              {reserve.isIsolated && (
                <ReserveOverviewBox title="Debt ceiling">
                  <Box sx={{ display: { sm: 'inline-flex', xs: 'block' } }}>
                    <FormattedNumber
                      value={reserve.isolationModeTotalDebtUSD}
                      variant="secondary14"
                      symbol="USD"
                      symbolsVariant="secondary14"
                      visibleDecimals={2}
                    />
                    &nbsp;of&nbsp;
                    <FormattedNumber
                      value={reserve.debtCeilingUSD}
                      variant="secondary14"
                      symbol="USD"
                      symbolsVariant="secondary14"
                      visibleDecimals={2}
                    />
                  </Box>
                </ReserveOverviewBox>
              )}
              <ReserveOverviewBox title="Collateral usage">
                {reserve.isIsolated ? (
                  <Alert severity="warning">
                    <Typography variant="subheader1">
                      <Trans>Asset can only be used as collateral in isolation mode only.</Trans>
                    </Typography>
                    <Typography variant="caption">
                      In Isolation mode you cannot supply other assets as collateral for borrowing.
                      Assets used as collateral in Isolation mode can only be borrowed to a specific
                      debt ceiling.{' '}
                      <Link href="https://docs.aave.com/faq/aave-v3-features#isolation-mode">
                        Learn more
                      </Link>
                    </Typography>
                  </Alert>
                ) : reserve.usageAsCollateralEnabled ? (
                  <Typography variant="subheader1">
                    <Trans>Can be collateral</Trans>
                  </Typography>
                ) : (
                  <Alert sx={{ my: '12px' }} severity="warning">
                    <Trans>Asset cannot be used as collateral.</Trans>
                  </Alert>
                )}
              </ReserveOverviewBox>
            </Box>
          )}
        </Box>
      )}
      {selectedTab == 2 && reserve.borrowingEnabled && (
        <Box sx={{ flexGrow: 1, minWidth: 0, maxWidth: '100%', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <PanelItem title={<Trans>Total borrowed</Trans>}>
              <FormattedNumber value={reserve.totalDebt} variant="main16" />
              <ReserveSubheader value={reserve.totalDebtUSD} />
            </PanelItem>
            <PanelItem
              title={
                <VariableAPYTooltip
                  text={<Trans>APY, variable</Trans>}
                  key="APY_res_variable_type"
                  variant="description"
                />
              }
            >
              <FormattedNumber value={reserve.variableBorrowAPY} percent variant="main16" />
              <IncentivesButton
                symbol={reserve.symbol}
                incentives={reserve.vIncentivesData}
                displayBlank={true}
              />
            </PanelItem>
            {reserve.stableBorrowRateEnabled && (
              <PanelItem
                title={
                  <StableAPYTooltip
                    text={<Trans>APY, stable</Trans>}
                    key="APY_res_stable_type"
                    variant="description"
                  />
                }
              >
                <FormattedNumber value={reserve.stableBorrowAPY} percent variant="main16" />
                <IncentivesButton
                  symbol={reserve.symbol}
                  incentives={reserve.sIncentivesData}
                  displayBlank={true}
                />
              </PanelItem>
            )}
            {reserve.borrowCapUSD !== '0' && (
              <PanelItem title={<Trans>Borrow cap</Trans>}>
                <FormattedNumber value={reserve.borrowCap} variant="main16" />
                <ReserveSubheader value={reserve.borrowCapUSD} />
              </PanelItem>
            )}
          </Box>
          {renderCharts && !error && (
            <ChartContainer sx={{ mt: 8 }}>
              <ParentSize>
                {(parent) => (
                  <ApyChart
                    width={parent.width}
                    height={parent.height}
                    data={data}
                    fields={[
                      ...(reserve.stableBorrowRateEnabled
                        ? ([
                            {
                              name: 'stableBorrowRate',
                              color: '#0062D2',
                              text: 'Borrow APR, stable',
                            },
                          ] as const)
                        : []),
                      {
                        name: 'variableBorrowRate',
                        color: '#B6509E',
                        text: 'Borrow APR, variable',
                      },
                    ]}
                  />
                )}
              </ParentSize>
            </ChartContainer>
          )}
        </Box>
      )}
      {selectedTab == 3 && reserve.eModeCategoryId !== 0 && (
        <Box sx={{ flexGrow: 1, minWidth: 0, maxWidth: '100%', width: '100%' }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <Typography variant="secondary14" color="text.secondary">
              <Trans>E-Mode Category</Trans>
            </Typography>
            <SvgIcon sx={{ fontSize: '14px', mr: 0.5, ml: 2 }}>
              <LightningBoltGradient />
            </SvgIcon>
            <Typography variant="subheader1">
              {getEmodeMessage(reserve.eModeCategoryId, currentNetworkConfig.baseAssetSymbol)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              pt: '12px',
            }}
          >
            <ReserveOverviewBox
              title={<MaxLTVTooltip variant="description" text={<Trans>Max LTV</Trans>} />}
            >
              <FormattedNumber
                value={reserve.formattedEModeLtv}
                percent
                variant="secondary14"
                visibleDecimals={2}
              />
            </ReserveOverviewBox>
            <ReserveOverviewBox
              title={
                <LiquidationThresholdTooltip
                  variant="description"
                  text={<Trans>Liquidation threshold</Trans>}
                />
              }
            >
              <FormattedNumber
                value={reserve.formattedEModeLiquidationThreshold}
                percent
                variant="secondary14"
                visibleDecimals={2}
              />
            </ReserveOverviewBox>
            <ReserveOverviewBox
              title={
                <LiquidationPenaltyTooltip
                  variant="description"
                  text={<Trans>Liquidation penalty</Trans>}
                />
              }
            >
              <FormattedNumber
                value={reserve.formattedEModeLiquidationBonus}
                percent
                variant="secondary14"
                visibleDecimals={2}
              />
            </ReserveOverviewBox>
          </Box>
          <Typography variant="caption" color="text.secondary" paddingTop="24px">
            <Trans>
              E-Mode increases your LTV for a selected category of assets, meaning that when E-mode
              is enabled, you will have higher borrowing power over assets of the same E-mode
              category which are defined by Aave Governance. You can enter E-Mode from your{' '}
              <Link
                href={ROUTES.dashboard}
                sx={{ textDecoration: 'underline' }}
                variant="caption"
                color="text.secondary"
              >
                Dashboard
              </Link>
              . To learn more about E-Mode and applied restrictions in{' '}
              <Link
                href="https://docs.aave.com/faq/aave-v3-features#high-efficiency-mode-e-mode"
                sx={{ textDecoration: 'underline' }}
                variant="caption"
                color="text.secondary"
              >
                FAQ
              </Link>{' '}
              or{' '}
              <Link
                href="https://github.com/aave/aave-v3-core/blob/master/techpaper/Aave_V3_Technical_Paper.pdf"
                sx={{ textDecoration: 'underline' }}
                variant="caption"
                color="text.secondary"
              >
                Aave V3 Technical Paper
              </Link>
              .
            </Trans>
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
