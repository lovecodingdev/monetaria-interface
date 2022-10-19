import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type ReserveOverviewBoxProps = {
  children: ReactNode;
  title: ReactNode;
};

export function ReserveOverviewBox({ title, children }: ReserveOverviewBoxProps) {
  return (
    <Box
      sx={(theme) => ({
        // flex: '0 32%',
        // marginBottom: '2%',
        // height: { md: '70px', lg: '60px' },
        // maxWidth: '32%',
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-around',
        }}
      >
        <Typography variant="secondary14" color="text.secondary" component="span">
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
}
