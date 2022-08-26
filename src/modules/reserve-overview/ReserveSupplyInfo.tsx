import { Stack, Typography } from "@mui/material";
import { ReserveNormalPaper } from "./ReserveNormalPaper"
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Trans } from '@lingui/macro';

import { MaxLTVTooltip } from 'src/components/infoTooltips/MaxLTVTooltip';
import { LiquidationThresholdTooltip } from 'src/components/infoTooltips/LiquidationThresholdTooltip';
import { LiquidationPenaltyTooltip } from 'src/components/infoTooltips/LiquidationPenaltyTooltip';

export const ReserveSupplyInfo = ({reserve}: {reserve: ComputedReserveData} ) => {
  return (
    <ReserveNormalPaper title="Supply info">
      <Stack direction="column" spacing={2}>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <Typography variant="secondary14">Total Supplied</Typography>
          <FormattedNumber value={reserve.totalLiquidity} variant="secondary14" />
        </Stack>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <Typography variant="secondary14">Supply Cap</Typography>
          <FormattedNumber value={reserve.supplyCap} variant="secondary14" />
        </Stack>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <Typography variant="secondary14">APY</Typography>
          <FormattedNumber
            value={reserve.supplyAPY}
            percent
            variant="secondary14"
            visibleDecimals={2}
          />
        </Stack>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <Typography variant="secondary14">Collateral usage</Typography>
          {reserve.usageAsCollateralEnabled?
            <Typography variant="secondary14">Can be collatral</Typography>
            :
            <Typography variant="secondary14">Cannot be collateral</Typography>
          }
        </Stack>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <MaxLTVTooltip variant="secondary14" text={<Trans>Max LTV</Trans>} />
          <FormattedNumber
            value={reserve.formattedBaseLTVasCollateral}
            percent
            variant="secondary14"
            visibleDecimals={2}
          />
        </Stack>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <LiquidationThresholdTooltip variant="secondary14" text={<Trans>Liquidation threshold</Trans>} />
          <FormattedNumber
            value={reserve.formattedReserveLiquidationThreshold}
            percent
            variant="secondary14"
            visibleDecimals={2}
          />
        </Stack>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <LiquidationPenaltyTooltip variant="secondary14" text={<Trans>Liquidation penalty</Trans>} />
          <FormattedNumber
            value={reserve.formattedReserveLiquidationBonus}
            percent
            variant="secondary14"
            visibleDecimals={2}
          />
        </Stack>
      </Stack>
    </ReserveNormalPaper>
  );
}