import { useLingui } from '@lingui/react';
import { Button, List, ListItem, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const md = useMediaQuery(breakpoints.down('md'));

  return (
    <List
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        flexDirection: { xs: 'column', md: 'row' },
      }}
      disablePadding
    >
      {navigation
        .filter((item) => !item.isVisible || item.isVisible(currentMarketData))
        .map((item, index) => (
          <ListItem
            sx={{
              width: { xs: '100%', md: 'unset' },
              mr: { xs: 0, md: 2 },
            }}
            data-cy={item.dataCy}
            disablePadding
            key={index}
          >
            {md ? (
              <Typography
                component={Link}
                href={item.link}
                variant="h2"
                color="#F1F1F3"
                sx={{ width: '100%', p: 4 }}
                onClick={() => (setOpen ? setOpen(false) : undefined)}
              >
                {i18n._(item.title)}
              </Typography>
            ) : (
              <Button
                component={Link}
                href={item.link}
                sx={(theme) => ({
                  color: { xs: '#F1F1F3', md: 'text.primary' },
                  py: { xs: 1.5, md: 2 },
                  position: 'relative',
                  '&:hover': {
                    background: 'none',
                  },
                  '.active&:after, &:hover&:after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                  },
                  '&:after': {
                    content: "''",
                    position: 'absolute',
                    width: '100%',
                    transform: 'scaleX(0)',
                    height: '100%',
                    left: '0',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out',
                    zIndex: -1,
                    background: 'rgba(215, 215, 215, 0.25)',
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

      <ListItem sx={{ display: { xs: 'none', md: 'flex' }, width: 'unset' }} disablePadding>
        <MoreMenu />
      </ListItem>
    </List>
  );
};
