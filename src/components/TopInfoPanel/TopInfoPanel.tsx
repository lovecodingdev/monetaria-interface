import { Box, Container, Paper } from '@mui/material';
import { ReactNode } from 'react';

import { PageTitle, PageTitleProps } from './PageTitle';

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
    <Paper
      sx={theme=>({
        bgcolor: 'background.header',
        py: { xs: 9, md: 10, lg: '20px', xl: '20px', xxl: '20px' },
        marginX: '120px', 
        mt: '24px',
        color: '#F1F1F3',
        border: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Container sx={{ pb: 0 }}>
        <Box sx={{ px: { xs: 4, xsm: 6 } }}>
          {!titleComponent && (
            <PageTitle
              pageTitle={pageTitle}
              withMarketSwitcher={withMarketSwitcher}
              bridge={bridge}
            />
          )}

          {titleComponent && titleComponent}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            {children}
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};
