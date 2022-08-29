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
import { TokenSelectModal } from 'src/components/transactions/ActionTabs/TokenSelectModal';
import { useModalContext } from 'src/hooks/useModal';

export default function Actions() {
  const router = useRouter();
  const { reserves } = useAppDataContext();
  const { openSelectToken, close } = useModalContext();
  const [underlyingAsset, setUnderlyingAsset] = useState(router.query.underlyingAsset as string);
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

  const onSelectReserve = (r: ComputedReserveData) => {
    console.log(r);
    setUnderlyingAsset(r.underlyingAsset);
    close();
  }

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
      <TokenSelectModal onSelect={onSelectReserve}/>
    </Container>
  );
}

Actions.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
