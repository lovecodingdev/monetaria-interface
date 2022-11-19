import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

import { AppHeader } from './AppHeader';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          position: 'relative',
          marginTop: { xs: '90px', md: '0' },
        }}
      >
        <Box
          sx={{
            width: '60vw',
            height: '60vw',
            position: 'absolute',
            backgroundImage: 'radial-gradient(#00cdff70, white 60%)',
            transform: 'translate(-50%, -50%)',
            top: '100px',
            left: '65vw',
            zIndex: '-1',
          }}
        ></Box>
        <Box
          sx={{
            width: '100vw',
            height: '100vw',
            position: 'absolute',
            backgroundImage: 'radial-gradient(#13c38b69, white 60%)',
            transform: 'translate(-50%, -50%)',
            bottom: '10vw',
            left: '-10vw',
            zIndex: '-1',
          }}
        ></Box>
        {children}
      </Box>
    </>
  );
}
