import { Stack, Typography } from "@mui/material";
import { ReserveNormalPaper } from "./ReserveNormalPaper"
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { Trans } from '@lingui/macro';

import { MaxLTVTooltip } from 'src/components/infoTooltips/MaxLTVTooltip';
import { LiquidationThresholdTooltip } from 'src/components/infoTooltips/LiquidationThresholdTooltip';
import { LiquidationPenaltyTooltip } from 'src/components/infoTooltips/LiquidationPenaltyTooltip';

export const ReserveEModeInfo = ({reserve}: {reserve: ComputedReserveData}) => {
  return (
    <ReserveNormalPaper title="E-Mode info">
      <Stack direction="column" spacing={2}>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <MaxLTVTooltip variant="secondary14" text={<Trans>Max LTV</Trans>} />
          <FormattedNumber
            value={reserve.formattedEModeLtv}
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
            value={reserve.formattedEModeLiquidationThreshold}
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
            value={reserve.formattedEModeLiquidationBonus}
            percent
            variant="secondary14"
            visibleDecimals={2}
          />
        </Stack>
      </Stack>
    </ReserveNormalPaper>
  );
}