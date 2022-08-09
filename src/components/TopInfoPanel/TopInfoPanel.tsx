import { Box, Container, Paper } from '@mui/material';
import { ReactNode } from 'react';

import { PageTitle, PageTitleProps } from './PageTitle';

import borderGradient from "src/layouts/borderGradient";
interface TopInfoPanelProps extends PageTitleProps {
  children?: ReactNode;
  titleComponent?: ReactNode;
}

export const TopInfoPanel = ({
  pageTitle,
  titleComponent,
  withMarketSwitcher,
  bridge,
  children,
}: TopInfoPanelProps) => {
  return (
    <Container sx={{ pb: 0, flexGrow: 0 }}>
      <Paper
        sx={{
          bgcolor: 'background.header',
          py: { xs: 9, md: 10, lg: '20px', xl: '20px', xxl: '20px' },
          mt: '24px',
          color: '#F1F1F3',
          ...borderGradient
        }}
      >
        <Box sx={{
          px: { xs: 4, xsm: 6 },
          display: 'flex',
          flexDirection: {
            lg: 'row',
            md: 'row',
            xs: 'column',
            xsm: 'column',
          }, justifyContent: 'space-between'
        }}>
          {!titleComponent && (
            <PageTitle
              pageTitle={pageTitle}
              withMarketSwitcher={withMarketSwitcher}
              bridge={bridge}
            />
          )}
          <Box sx={{ marginBottom: '10px' }}>
            {titleComponent && titleComponent}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            {children}
          </Box>
        </Box>
      </Paper >
    </Container>
  );
};
