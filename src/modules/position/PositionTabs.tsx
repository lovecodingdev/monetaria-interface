import React, { useState, ReactNode } from 'react';
import { Trans } from '@lingui/macro';
import {
  Box,
  Paper,
  Typography,
  Tab,
  Tabs,
  Alert,
  Link,
  SvgIcon,
  BoxProps,
  TypographyProps,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/system';

const NewTabs = styled(Tabs)({
  minHeight: '24px',
  '& .MuiTabs-flexContainer': {
    justifyContent: 'start',
    gap: 2,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const NewTab = styled(Tab)`
  margin: 0px;
  min-height: 24px;
  height: 24px;
  color: #B0BABF;
  &.Mui-selected, &:hover {
    background: #EEF0F2;
    border-radius: 100px;  
    color: #080F26;
    font-weight: bold;
  }
`;
export const PanelRow: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={{
      position: 'relative',
      display: { xs: 'block', md: 'flex' },
      margin: '0 auto',
      ...props.sx,
    }}
  />
);
export const PanelTitle: React.FC<TypographyProps> = (props) => (
  <Typography
    {...props}
    variant="subheader1"
    sx={{ minWidth: { xs: '170px' }, mr: 4, mb: { xs: 6, md: 0 }, ...props.sx }}
  />
);

interface PanelColumnProps {
  children?: ReactNode;
}

export const PanelColumn = ({ children }: PanelColumnProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flex: 1,
        overflow: 'hidden',
        py: 1,
      }}
    >
      {children}
    </Box>
  );
};

interface PanelItemProps {
  title: ReactNode;
}

export const PanelItem: React.FC<PanelItemProps> = ({ title, children }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        mb: 4,
        '&:not(:last-child)': {
          pr: 4,
          mr: 4,
        },
        ...(mdUp
          ? {
              '&:not(:last-child)::after': {
                content: '""',
                height: '32px',
                position: 'absolute',
                right: 4,
                top: 'calc(50% - 17px)',
                borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              },
            }
          : {}),
      }}
    >
      <Typography color="text.secondary">{title}</Typography>
      <PanelColumn>{children}</PanelColumn>
    </Box>
  );
};

const ChartContainer: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={{
      minWidth: 0,
      width: '100%',
      maxWidth: '100%',
      height: 300,
      marginLeft: 0,
      flexGrow: 1,
      ...props.sx,
    }}
  />
);

export const PositionTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Paper
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        width: '100%', 
        bgcolor: 'background.paper', 
        my: {xs: '16px', md: '24px'},
        mx: 'auto',
        padding: {xs: '16px', md: '24px'},
      })}
    >
      <Box>
        <NewTabs
          value={selectedTab}
          onChange={handleChange}
          sx={{
            mb: 2,
          }}
        >
          <NewTab label="Deposits"/>
          <NewTab label="Borrows" />
          <NewTab label="Transactions" />
          <NewTab label="Liquidation History" />
        </NewTabs>
      </Box>
      {selectedTab == 0 &&
        <></>
      }
      {selectedTab == 1 && 
        <></>
      }
      {selectedTab == 2 && 
        <></>
      }
      {selectedTab == 3 && 
        <></>
      }
    </Paper>
  );
}
