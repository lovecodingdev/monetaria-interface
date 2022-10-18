import { Stack, Typography, Box } from "@mui/material";
import { InfoWrapper } from "./InfoWrapper"
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { ParentSize } from '@visx/responsive';
import { InterestRateModelChart } from './InterestRateModelChart';

export const ReserveInterestRateModel = ({reserve}: {reserve: ComputedReserveData} ) => {
  return (
    <InfoWrapper>
      <Box
        sx={{
          minWidth: 0,
          width: '100%',
          maxWidth: '100%',
          height: 300,
          marginLeft: 0,
          flexGrow: 1,
        }}
      >
        <ParentSize>
          {(parent) => (
            <InterestRateModelChart
              width={parent.width}
              height={parent.height}
              reserve={{
                baseStableBorrowRate: reserve.baseStableBorrowRate,
                baseVariableBorrowRate: reserve.baseVariableBorrowRate,
                optimalUsageRatio: reserve.optimalUsageRatio,
                stableRateSlope1: reserve.stableRateSlope1,
                stableRateSlope2: reserve.stableRateSlope2,
                utilizationRate: reserve.borrowUsageRatio,
                variableRateSlope1: reserve.variableRateSlope1,
                variableRateSlope2: reserve.variableRateSlope2,
                stableBorrowRateEnabled: reserve.stableBorrowRateEnabled,
              }}
            />
          )}
        </ParentSize>
      </Box>
    </InfoWrapper>
  );
}