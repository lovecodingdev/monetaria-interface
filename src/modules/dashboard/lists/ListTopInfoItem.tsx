import { Paper, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

import { FormattedNumber } from '../../../components/primitives/FormattedNumber';

interface ListTopInfoItemProps {
  title: ReactNode;
  value: number | string;
  percent?: boolean;
  tooltip?: ReactNode;
}

export const ListTopInfoItem = ({ title, value, percent, tooltip }: ListTopInfoItemProps) => {
  return (
    <Box
      sx={{
        mr: 2,
        p: '2px 4px',
        display: 'flex',
        boxShadow: 'none',
        bgcolor: 'transparent',
        flexDirection: 'column',
      }}
    >
      <Box 
        sx={{
          display: 'flex',
        }}
      >
        <Typography color="text.secondary" sx={{ mr: 1 }} noWrap>
          {title}
        </Typography>
        {tooltip}
      </Box>
      <FormattedNumber value={value} percent={percent} variant="h3" symbol="USD" />
    </Box>
  );
};
