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
import { BorrowedPositionsList } from '../dashboard/lists/BorrowedPositionsList/BorrowedPositionsList';
import { SuppliedPositionsList } from '../dashboard/lists/SuppliedPositionsList/SuppliedPositionsList';

const NewTabs = styled(Tabs)({
  minHeight: '24px',
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
    gap: 4,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  border: '1px solid #F6F8F9',
  padding: '2px',
  borderRadius: '100px',
});

const NewTab = styled(Tab)`
  margin: 0px;
  fontweight: 600;
  min-height: 24px;
  height: 24px;
  color: #b0babf;
  &.Mui-selected,
  &:hover {
    background: #eef0f2;
    border-radius: 100px;
    color: #080f26;
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
        my: { xs: '16px', md: '24px' },
        mx: 'auto',
        padding: { xs: '16px', md: '24px' },
      })}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <NewTabs
          value={selectedTab}
          onChange={handleChange}
          sx={{
            mb: 2,
            width: { xs: '100%', sm: '482px' },
          }}
        >
          <NewTab label="Deposits" sx={{ fontSize: { xs: '14px', md: '14px' } }} />
          <NewTab label="Borrows" sx={{ fontSize: { xs: '14px', md: '14px' } }} />
          {/* <NewTab label="Transactions" sx={{ fontSize: { xs: '9px', md: '14px' } }} />
          <NewTab label="Liquidation History" sx={{ fontSize: { xs: '9px', md: '14px' } }} /> */}
        </NewTabs>
      </Box>
      {selectedTab == 0 && <SuppliedPositionsList />}
      {selectedTab == 1 && <BorrowedPositionsList />}
      {selectedTab == 2 && <></>}
      {selectedTab == 3 && <></>}
    </Paper>
  );
};
