import { Stack, Typography } from "@mui/material";
import { ReserveNormalPaper } from "./ReserveNormalPaper"
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';

export const ReserveBorrowInfo = ({reserve}: {reserve: ComputedReserveData}) => {
  return (
    <ReserveNormalPaper title="Borrow info">
      <Stack direction="column" spacing={2}>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <Typography variant="secondary14">Total borrowed</Typography>
          <FormattedNumber value={reserve.totalDebt} variant="secondary14" />
        </Stack>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <Typography variant="secondary14">APY, variable</Typography>
          <FormattedNumber
            value={reserve.variableBorrowAPY}
            percent
            variant="secondary14"
            visibleDecimals={2}
          />
        </Stack>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <Typography variant="secondary14">APY, stable</Typography>
          <FormattedNumber
            value={reserve.stableBorrowAPY}
            percent
            variant="secondary14"
            visibleDecimals={2}
          />
        </Stack>
        {/* <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <Typography variant="secondary14">Reserve factor</Typography>
          <Typography variant="secondary14">5.32%</Typography>
        </Stack>
        <Stack direction='row' justifyContent={'space-between'} style={{
          width: "100%"
        }}>
          <Typography variant="secondary14">Collector Contract</Typography>
          <Typography variant="secondary14">View Contract</Typography>
        </Stack> */}
      </Stack>
    </ReserveNormalPaper>
  );
}