import { Trans } from '@lingui/macro';
import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  ComputedReserveData,
  useAppDataContext,
} from 'src/hooks/app-data-provider/useAppDataProvider';
import { MainLayout } from 'src/layouts/MainLayout';
import { ReserveActions } from 'src/modules/reserve-overview/ReserveActions';
import { ReserveConfiguration } from 'src/modules/reserve-overview/ReserveConfiguration';
import { ReserveTopDetails } from 'src/modules/reserve-overview/ReserveTopDetails';
import { ReserveSupplyInfo } from 'src/modules/reserve-overview/ReserveSupplyInfo';
import { ReserveBorrowInfo } from 'src/modules/reserve-overview/ReserveBorrowInfo';
import { ReserveEModeInfo } from 'src/modules/reserve-overview/ReserveEModeInfo';
import { ReserveInterestRateModel } from 'src/modules/reserve-overview/ReserveInterestRateModel';

import { ContentContainer } from '../src/components/ContentContainer';

export default function ReserveOverview() {
  const router = useRouter();
  const { reserves } = useAppDataContext();
  const underlyingAsset = router.query.underlyingAsset as string;
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.up('lg'));

  const [mode, setMode] = useState<'overview' | 'actions' | ''>('');

  useEffect(() => {
    if (!mode) setMode('overview');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lg]);

  const reserve = reserves.find(
    (reserve) => reserve.underlyingAsset === underlyingAsset
  ) as ComputedReserveData;

  const isOverview = mode === 'overview';

  return (
    <>
      <ReserveTopDetails underlyingAsset={underlyingAsset} />

      <ContentContainer>
        {/* <Box
          sx={{
            display: { xs: 'flex', lg: 'none' },
            justifyContent: { xs: 'center', xsm: 'flex-start' },
            mb: { xs: 3, xsm: 4 },
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={mode}
            exclusive
            onChange={(_, value) => setMode(value)}
            sx={{ width: { xs: '100%', xsm: '359px' }, height: '44px' }}
          >
            <ToggleButton value="overview" disabled={mode === 'overview'}>
              <Typography variant="subheader1">
                <Trans>Overview</Trans>
              </Typography>
            </ToggleButton>
            <ToggleButton value="actions" disabled={mode === 'actions'}>
              <Typography variant="subheader1">
                <Trans>Your info</Trans>
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box> */}

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* * Main status and configuration panel */}
          <Stack
            direction={'column'}
            spacing={4}
            sx={{
              width: { xs: '100%', lg: 'calc(40% - 20px)' },
            }}
          >
            {reserve && 
              <>
                {/* <ReserveConfiguration reserve={reserve} /> */}
                <ReserveSupplyInfo reserve={reserve} />
                <ReserveBorrowInfo reserve={reserve} />
                <ReserveEModeInfo reserve={reserve} />
              </>
            }
          </Stack>

          {/* * Right panel with actions */}
          <Stack
            direction={'column'}
            spacing={4}
            sx={{
              width: { xs: '100%', lg: '60%' },
            }}
          >
            <ReserveActions underlyingAsset={underlyingAsset} />
            {reserve && <ReserveInterestRateModel reserve={reserve} />}
          </Stack>
        </Box>
      </ContentContainer>
    </>
  );
}

ReserveOverview.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
