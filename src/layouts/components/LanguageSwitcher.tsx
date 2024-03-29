import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

import { dynamicActivateLanguage } from '../../libs/LanguageProvider';
import { BasicModal } from 'src/components/primitives/BasicModal';

const langMap = {
  en: t`English`,
  es: t`Spanish`,
  fr: t`French`,
  el: t`Greek`,
};

interface LanguageListItemProps {
  component?: typeof MenuItem | typeof ListItem;
  onClick: () => void;
}

export const LanguageListItem = ({ component = ListItem, onClick }: LanguageListItemProps) => {
  const { i18n } = useLingui();
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  return (
    <Box
      component={component}
      onClick={() => {
        if (downToXSM) {
          setIsOpenSettings(true);
        } else {
          onClick();
        }
      }}
      sx={{
        color: { xs: '#080F26', md: 'text.primary' },
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        gap: '16px',
        width: '304px',
        height: '69.48px',
        background: '#F3F8FF',
        border: '1px solid rgba(21, 126, 255, 0.15)',
        borderRadius: '12px',
        flex: 'none',
        order: 1,
        flexGrow: 0,
      }}
    >
      <BasicModal open={isOpenSettings} setOpen={setIsOpenSettings} withCloseButton={false}>
        <Box
          component={component}
          sx={{
            cursor: 'pointer',
            color: { xs: '#080F26', md: 'text.primary' },
            mb: '4px',
            display: 'flex',
            alignItems: 'center',
            minHeight: '50px',
          }}
          onClick={() => {
            setIsOpenSettings(!isOpenSettings);
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 'unset !important',
              mr: 2,
              color: { xs: '#080F26', md: 'primary.light' },
            }}
          >
            <SvgIcon fontSize="small">
              <ChevronLeftIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText disableTypography>
            <Typography
              variant="subheader2"
              sx={{ fontWeight: 400, fontSize: '14px', textAlign: 'center' }}
            >
              <Trans>Select language</Trans>
            </Typography>
          </ListItemText>
        </Box>

        {Object.keys(langMap).map((lang) => (
          <Box
            component={component}
            key={lang}
            onClick={() => dynamicActivateLanguage(lang)}
            sx={{
              cursor: 'pointer',
              color: { xs: '#080F26', md: 'text.primary' },
              '.MuiListItemIcon-root': { minWidth: 'unset' },
              '.MuiMenuItemIcon-root': { minWidth: 'unset' },
            }}
          >
            <ListItemIcon
              sx={{ mr: 3, borderRadius: '2px', overflow: 'hidden', width: 20, height: 14 }}
            >
              <img
                src={`/icons/flags/${lang}.svg`}
                width="100%"
                height="100%"
                alt={`${lang} icon`}
              />
            </ListItemIcon>
            <ListItemText>{i18n._(langMap[lang as keyof typeof langMap])}</ListItemText>
            {lang === i18n.locale && (
              <ListItemIcon sx={{ m: 0 }}>
                <SvgIcon fontSize="small" sx={{ color: { xs: '#080F26', md: 'text.primary' } }}>
                  <CheckIcon />
                </SvgIcon>
              </ListItemIcon>
            )}
          </Box>
        ))}
      </BasicModal>
      <Box sx={{ display: 'flex', alignItems: 'start' }}>
        <ListItemIcon
          sx={{ mr: 3, borderRadius: '2px', overflow: 'hidden', width: 24, height: 24 }}
        >
          <img
            src={`/icons/flags/${i18n.locale}.svg`}
            width="100%"
            height="100%"
            alt={`${i18n.locale} icon`}
          />
        </ListItemIcon>
      </Box>

      <ListItemText>
        <span style={{ fontSize: '16px' }}>
          {i18n._(langMap[i18n.locale as keyof typeof langMap])}
        </span>
        <div style={{ color: '#7E8CA9', fontWeight: 400, fontSize: '12px' }}>Choose language</div>
      </ListItemText>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SvgIcon fontSize="small" sx={{ color: { xs: '#A7BDD9', md: '#A7BDD9' }, ml: 1 }}>
          <ChevronRightIcon />
        </SvgIcon>
      </Box>
    </Box>
  );
};

export const LanguagesList = ({ component = ListItem, onClick }: LanguageListItemProps) => {
  const { i18n } = useLingui();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { md: '444px' },
        borderRadius: { xs: '16px', md: 'none' },
      }}
    >
      <Box
        component={component}
        sx={{ cursor: 'pointer', color: { xs: '#080F26', md: 'text.primary' }, mb: '4px' }}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 'unset !important',
            mr: 2,
            color: { xs: '#080F26', md: 'primary.light' },
          }}
        >
          <SvgIcon fontSize="small">
            <ChevronLeftIcon />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText disableTypography>
          <Typography
            variant="subheader2"
            sx={{ fontWeight: 400, fontSize: '14px', textAlign: 'center' }}
          >
            <Trans>Select language</Trans>
          </Typography>
        </ListItemText>
      </Box>

      {Object.keys(langMap).map((lang) => (
        <Box
          component={component}
          key={lang}
          onClick={() => dynamicActivateLanguage(lang)}
          sx={{
            cursor: 'pointer',
            color: { xs: '#080F26', md: 'text.primary' },
            '.MuiListItemIcon-root': { minWidth: 'unset' },
            '.MuiMenuItemIcon-root': { minWidth: 'unset' },
          }}
        >
          <ListItemIcon
            sx={{ mr: 3, borderRadius: '2px', overflow: 'hidden', width: 20, height: 14 }}
          >
            <img src={`/icons/flags/${lang}.svg`} width="100%" height="100%" alt={`${lang} icon`} />
          </ListItemIcon>
          <ListItemText>{i18n._(langMap[lang as keyof typeof langMap])}</ListItemText>
          {lang === i18n.locale && (
            <ListItemIcon sx={{ m: 0 }}>
              <SvgIcon fontSize="small" sx={{ color: { xs: '#080F26', md: 'text.primary' } }}>
                <CheckIcon />
              </SvgIcon>
            </ListItemIcon>
          )}
        </Box>
      ))}
    </Box>
  );
};
