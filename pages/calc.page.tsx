import { Trans } from '@lingui/macro';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';

export default function Calc() {
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.up('lg'));
  const [mode, setMode] = useState<'supply' | 'borrow' | ''>('');

  useEffect(() => {
    if (!mode) setMode('supply');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lg]);

  return <>Calc</>;
}

Calc.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
