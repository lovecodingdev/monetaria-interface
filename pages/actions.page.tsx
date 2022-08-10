import {
  Box,
  Container,
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
import { ActionsTopDetails } from 'src/modules/actions/ActionsTopDetails';

import { ContentContainer } from '../src/components/ContentContainer';
import { ActionTabs } from '../src/components/transactions/ActionTabs/ActionTabs';

export default function Actions() {
  const router = useRouter();
  const { reserves } = useAppDataContext();
  const underlyingAsset = router.query.underlyingAsset as string;
  const type = router.query.type as string;
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
    <Container>
      <Box sx={{ 
        width: {
          lg: "50%",
          md: "60%",
          sm: "80%",
          xs: "100%"
        }, 
        marginX: 'auto'
      }}>
        <ActionsTopDetails underlyingAsset={underlyingAsset} />
        <ActionTabs underlyingAsset={underlyingAsset} witch={type} />
      </Box>
    </Container>
  );
}

Actions.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
