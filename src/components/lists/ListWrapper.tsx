import { Trans } from '@lingui/macro';
import { Box, Paper, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import { toggleLocalStorageClick } from '../../helpers/toggle-local-storage-click';

interface ListWrapperProps {
  title: ReactNode;
  localStorageName?: string;
  subTitleComponent?: ReactNode;
  subChildrenComponent?: ReactNode;
  topInfo?: ReactNode;
  children: ReactNode;
  withTopMargin?: boolean;
  noData?: boolean;
  captionSize?: 'h2' | 'h3';
  onSearch?: (search: string) => void;
}

export const ListWrapper = ({
  children,
  localStorageName,
  title,
  subTitleComponent,
  subChildrenComponent,
  topInfo,
  withTopMargin,
  noData,
  captionSize = 'h3',
  onSearch,
}: ListWrapperProps) => {
  const [isCollapse, setIsCollapse] = useState(
    localStorageName ? localStorage.getItem(localStorageName) === 'true' : false
  );

  const collapsed = isCollapse && !noData;

  return (
    <Paper
      sx={(theme) => ({
        mt: withTopMargin ? { xs: 4, md: 6 } : 0,
        p: 4,
        overflow: 'hidden',
        border: '1px solid #00aae98a',
        height: '100%'
      })}
    >
      <Box
        sx={{
          // px: { xs: 4, xsm: 6 },
          // py: { xs: 3.5, xsm: 4 },
          pb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', xsm: 'center' },
            py: '3.6px',
            flexDirection: { xs: 'column', xsm: 'row' },
          }}
        >
          <Typography component="div" variant={captionSize} sx={{ mr: 4 }}>
            {title}
          </Typography>
          {subTitleComponent}
        </Box>
        
        {onSearch &&
          <Box
            component="form"
            sx={{ 
              p: '2px', 
              display: 'flex', 
              alignItems: 'center',
              background: '#F6F8F9',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid #EEF0F2',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => onSearch(e.target.value)}
            />
            <IconButton type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>      
        }

        {/* {!!localStorageName && !noData && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              minHeight: '28px',
              pl: 3,
              span: {
                width: '14px',
                height: '2px',
                bgcolor: 'text.secondary',
                position: 'relative',
                ml: 1,
                '&:after': {
                  content: "''",
                  position: 'absolute',
                  width: '14px',
                  height: '2px',
                  bgcolor: 'text.secondary',
                  transition: 'all 0.2s ease',
                  transform: collapsed ? 'rotate(90deg)' : 'rotate(0)',
                  opacity: collapsed ? 1 : 0,
                },
              },
            }}
            onClick={() =>
              !!localStorageName && !noData
                ? toggleLocalStorageClick(isCollapse, setIsCollapse, localStorageName)
                : undefined
            }
          >
            <Typography variant="buttonM" color="text.secondary">
              {collapsed ? <Trans>Show</Trans> : <Trans>Hide</Trans>}
            </Typography>
            <span />
          </Box>
        )} */}
      </Box>

      {topInfo && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // px: { xs: 4, xsm: 6 },
            pb: { xs: collapsed && !noData ? 6 : 2, xsm: collapsed && !noData ? 6 : 0 },
            overflowX: 'auto',
          }}
        >
          {topInfo}
        </Box>
      )}
      {subChildrenComponent && !collapsed && (
        <Box sx={{ marginBottom: { xs: 2, xsm: 0 } }}>{subChildrenComponent}</Box>
      )}
      <Box sx={{ display: collapsed ? 'none' : 'block' }}>{children}</Box>
    </Paper>
  );
};
