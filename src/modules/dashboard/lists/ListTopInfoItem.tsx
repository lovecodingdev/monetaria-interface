import { Paper, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

import { FormattedNumber } from '../../../components/primitives/FormattedNumber';

interface ListTopInfoItemProps {
  icon?: ReactNode;
  title: ReactNode;
  value: number | string;
  percent?: boolean;
  tooltip?: ReactNode;
}

export const ListTopInfoItem = ({icon, title, value, percent, tooltip }: ListTopInfoItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {icon && 
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #EEF0F2',
            borderRadius: '12px',
            // bgcolor: '#074592',
            // boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)',
            width: 42,
            height: 42,
            mr: 3,
          }}
        >
          {icon && icon}
        </Box>
      }
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

    </Box>
  );
};
