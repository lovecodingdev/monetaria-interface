// import { MenuIcon } from '@heroicons/react/outline';
import { CogIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
} from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { PROD_ENV } from 'src/utils/marketsAndNetworksConfig';

import { Link } from '../components/primitives/Link';
import { moreNavigation } from '../ui-config/menu-items';
import { DarkModeSwitcher } from './components/DarkModeSwitcher';
import { DrawerWrapper } from './components/DrawerWrapper';
import { LanguageListItem, LanguagesList } from './components/LanguageSwitcher';
import { MobileCloseButton } from './components/MobileCloseButton';
import { NavItems } from './components/NavItems';
import { TestNetModeSwitcher } from './components/TestNetModeSwitcher';
import MenuIcon from 'public/icons/menu.svg';
import { BasicModal } from 'src/components/primitives/BasicModal';

interface MobileMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  headerHeight: number;
}

const MenuItemsWrapper = ({ children, title }: { children: ReactNode; title?: ReactNode }) => (
  <Box sx={{ mb: 2, '&:last-of-type': { mb: 0, '.MuiDivider-root': { display: 'none' } } }}>
    <Box sx={{ px: 2 }}>
      {/* <Typography variant="subheader2" sx={{ color: '#A5A8B6', px: 4, py: 2 }}>
        {title}
      </Typography> */}

      {children}
    </Box>

    {/* <Divider sx={{ borderColor: '#F2F3F729', mt: 6 }} /> */}
  </Box>
);

export const MobileMenu = ({ open, setOpen, headerHeight }: MobileMenuProps) => {
  const { i18n } = useLingui();
  const [isLanguagesListOpen, setIsLanguagesListOpen] = useState(false);
  const [isOpenMore, setIsOpenMore] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  useEffect(() => setIsLanguagesListOpen(false), [open]);

  return (
    <>
      {open ? (
        <MobileCloseButton setOpen={setOpen} />
      ) : (
        <Button
          // variant="surface"
          sx={{ p: '0px', minWidth: 'unset', ml: 2 }}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </Button>
      )}

      <BasicModal open={isOpenSettings} setOpen={setIsOpenSettings}>
        <div style={{ padding: '3px' }}>
          <Typography
            variant="subheader2"
            sx={{
              color: '#080F26',
              fontWeight: 500,
              fontSize: '20px',
            }}
          >
            <Trans>
              <span style={{ fontSize: '20px', fontWeight: 500, lineHeight: '23.54px' }}>
                Settings
              </span>
            </Trans>
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px 32px',
              gap: '16px',
            }}
          >
            {/* <DarkModeSwitcher /> */}
            <LanguageListItem
              onClick={() => {
                setIsOpenSettings(false);
                setIsLanguagesListOpen(true);
              }}
            />
            {PROD_ENV && <TestNetModeSwitcher />}
          </div>
        </div>
      </BasicModal>

      <DrawerWrapper open={open} setOpen={setOpen} headerHeight={headerHeight}>
        {!isLanguagesListOpen ? (
          <>
            <MenuItemsWrapper title={<Trans>Menu</Trans>}>
              <NavItems setOpen={setOpen} />
              <ListItem
                sx={{
                  width: { xs: '100%', md: 'unset' },
                  mr: { xs: 0, md: 2 },
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                data-cy="more"
                disablePadding
                onClick={() => setIsOpenMore(!isOpenMore)}
              >
                <Typography
                  variant="h2"
                  color="#080F26"
                  sx={{
                    width: '100%',
                    mx: 4,
                    py: 4,
                    textAlign: 'start',
                    borderBottom: '1px solid rgba(8, 15, 38, 0.15)',
                    fontSize: '16px',
                  }}
                >
                  More
                </Typography>
              </ListItem>
              {isOpenMore && (
                <MenuItemsWrapper title={<Trans>More</Trans>}>
                  <List>
                    {moreNavigation.map((item, index) => (
                      <ListItem
                        component={Link}
                        href={item.link}
                        sx={{
                          color: '#080F26',
                          pl: 8,
                        }}
                        key={index}
                      >
                        <ListItemIcon sx={{ minWidth: 'unset', mr: 3 }}>
                          <SvgIcon sx={{ fontSize: '20px', color: '#080F26' }}>{item.icon}</SvgIcon>
                        </ListItemIcon>

                        <ListItemText>{i18n._(item.title)}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </MenuItemsWrapper>
              )}
              <ListItem
                sx={{
                  width: { xs: '100%', md: 'unset' },
                  mr: { xs: 0, md: 2 },
                  textAlign: 'center',
                  cursor: 'pointer',
                  alignContent: 'center',
                }}
                data-cy="more"
                disablePadding
                onClick={() => setIsOpenSettings(!isOpenSettings)}
              >
                <Typography
                  variant="h2"
                  color="#080F26"
                  sx={{
                    width: '100%',
                    mx: 4,
                    py: 4,
                    textAlign: 'start',
                    borderBottom: '1px solid rgba(8, 15, 38, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                  }}
                >
                  <SvgIcon sx={{ color: '#A2B7D1' }} fontSize="medium">
                    <CogIcon />
                  </SvgIcon>
                  <span>&nbsp;Settings</span>
                </Typography>
              </ListItem>
            </MenuItemsWrapper>
          </>
        ) : (
          <List sx={{ px: 2 }}>
            <LanguagesList onClick={() => setIsLanguagesListOpen(false)} />
          </List>
        )}
      </DrawerWrapper>
    </>
  );
};
