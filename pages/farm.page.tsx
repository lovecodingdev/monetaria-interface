import { Box, Container, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { InputNumber } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export default function Farm() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));

  return (
    <Container
      sx={{
        pb: 0,
        flexGrow: 0,
        width: '100%',
        fontFamily: 'Gilroy, Arial !important',
        fontStyle: 'normal',
        paddingTop: '33px',
      }}
    >
      <Paper
        sx={{
          bgcolor: 'background.header',
          padding: '24px',
          mt: { xs: '8px', md: '12px' },
          color: '#F1F1F3',
          ...borderGradient,
        }}
      ></Paper>
    </Container>
  );
}

Farm.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
