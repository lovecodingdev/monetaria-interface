import { Stack, Typography } from "@mui/material";
import { ReserveNormalPaper } from "./ReserveNormalPaper"
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';

export const ReserveEModeInfo = ({reserve}: {reserve: ComputedReserveData}) => {
  return (
    <ReserveNormalPaper title="E-Mode info">
      <Stack direction="column" spacing={2}>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <Typography variant="secondary14">Max LTV</Typography>
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
          <Typography variant="secondary14">Liquidation threshold</Typography>
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
          <Typography variant="secondary14">Liquidation penalty</Typography>
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