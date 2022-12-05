import { Trans } from '@lingui/macro';
import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
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
import { InfoTabs } from 'src/modules/reserve-overview/InfoTabs';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

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

  // const goPrevPage = () => {
  //   router.back();
  // };

  const isOverview = mode === 'overview';

  return (
    <>
      <ContentContainer>
        {/* <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-start',
            mb: { xs: 3, xsm: 4 },
          }}
        >
          <Button
            startIcon={<KeyboardArrowLeftIcon />}
            sx={{
              width: '89px',
              height: '32px',
              background: 'white',
              color: '#252C32',
              fontWeight: 400,
              fontSize: '14px',
              border: '1px solid #DDE2E4',
              borderRadius: '8px',
            }}
            onClick={goPrevPage}
          >
            Back
          </Button>
        </Box> */}

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* * Main status and configuration panel */}
          <Stack
            direction={'column'}
            spacing={4}
            sx={{
              width: { xs: '100%', lg: 'calc(44% - 20px)' },
            }}
          >
            {reserve && (
              <>
                <ReserveTopDetails underlyingAsset={underlyingAsset} />
                <ReserveActions underlyingAsset={underlyingAsset} />
              </>
            )}
          </Stack>

          {/* * Right panel with actions */}
          <Stack
            direction={'column'}
            spacing={4}
            sx={{
              width: { xs: '100%', lg: '60%' },
            }}
          >
            {reserve && <InfoTabs reserve={reserve} />}
          </Stack>
        </Box>
      </ContentContainer>
    </>
  );
}

ReserveOverview.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
