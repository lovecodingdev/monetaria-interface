import { useLingui } from '@lingui/react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Trans } from '@lingui/macro';
import * as React from 'react';

import { Link } from '../../components/primitives/Link';
import { useProtocolDataContext } from '../../hooks/useProtocolDataContext';
import { navigation } from '../../ui-config/menu-items';
import { MoreMenu } from '../MoreMenu';

interface NavItemsProps {
  setOpen?: (value: boolean) => void;
}

export const NavItems = ({ setOpen }: NavItemsProps) => {
  const { i18n } = useLingui();
  const { currentMarketData } = useProtocolDataContext();

  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.down('lg'));

  return (
    <List
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', lg: 'center' },
        flexDirection: { xs: 'column', lg: 'row' },
      }}
      disablePadding
    >
      {navigation
        .filter((item) => !item.isVisible || item.isVisible(currentMarketData))
        .map((item, index) => (
          <ListItem
            sx={{
              width: { xs: '100%', lg: 'unset' },
              mr: { xs: 0, lg: 2 },
              textAlign: 'center',
            }}
            data-cy={item.dataCy}
            disablePadding
            key={index}
          >
            {lg ? (
              <Typography
                component={Link}
                href={item.link}
                variant="h2"
                color="#080F26"
                sx={{
                  width: '100%',
                  mx: 4,
                  py: 4,
                  textAlign: 'start',
                  borderBottom: '1px solid rgba(8, 15, 38, 0.15)',
                }}
                onClick={() => (setOpen ? setOpen(false) : undefined)}
              >
                {i18n._(item.title)}
              </Typography>
            ) : (
              <Button
                component={Link}
                href={item.link}
                disableRipple={true}
                sx={(theme) => ({
                  color: { xs: '#F1F1F3', lg: 'text.primary' },
                  py: { xs: 1.5, lg: 1 },
                  position: 'relative',
                  '&:hover': {
                    borderRadius: '100px',
                  },
                  '&.active': {
                    background: '#FFFFFF',
                    borderRadius: '100px',
                  },
                })}
              >
                <ListItemText>
                  <Trans>{i18n._(item.title)}</Trans>
                </ListItemText>
              </Button>
            )}
          </ListItem>
        ))}

      <ListItem sx={{ display: { xs: 'none', lg: 'flex' }, width: 'unset' }} disablePadding>
        <MoreMenu />
      </ListItem>
    </List>
  );
};
