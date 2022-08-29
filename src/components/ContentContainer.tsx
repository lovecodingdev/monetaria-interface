import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
}

export const ContentContainer = ({ children }: ContentContainerProps) => {
  return (
    <Box
      sx={{
        mt: { xs: '16px', md: '24px' },
      }}
    >
      <Container>{children}</Container>
    </Box>
  );
};
