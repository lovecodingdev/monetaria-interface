import { InformationCircleIcon } from '@heroicons/react/outline';
import { Box, IconButton, SvgIcon, Typography } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';
import { JSXElementConstructor, ReactElement, ReactNode, useState } from 'react';

import { ContentWithTooltip } from './ContentWithTooltip';

export interface BorrowMoreToolTipProps extends TypographyProps {
  text?: ReactNode;
  icon?: ReactNode;
  iconSize?: number;
  // eslint-disable-next-line
  children?: ReactElement<any, string | JSXElementConstructor<any>>;
}

export const BorrowMoreToolTip = ({
  text,
  icon,
  iconSize = 14,
  children,
  ...rest
}: BorrowMoreToolTipProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: '0.2em',
        '& .MuiTooltip-tooltip': {
          background: 'red !important',
        },
      }}
    >
      <Box sx={{}}>
        <ContentWithTooltip
          tooltipContent={<>{text}</>}
          open={open}
          setOpen={setOpen}
          placement="right"
        >
          {children}
        </ContentWithTooltip>
      </Box>
    </Box>
  );
};