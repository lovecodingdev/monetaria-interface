import { Trans } from '@lingui/macro';
import {
  Box,
  FormControlLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Switch,
  ListItemIcon,
} from '@mui/material';
import React, { useState } from 'react';

interface TestNetModeSwitcherProps {
  component?: typeof MenuItem | typeof ListItem;
}

export const TestNetModeSwitcher = ({ component = ListItem }: TestNetModeSwitcherProps) => {
  const testnetsEnabledId = 'testnetsEnabled';
  const testnetsEnabledLocalstorage = localStorage.getItem(testnetsEnabledId) === 'true' || false;
  const [testnetsEnabled, setTestnetsMode] = useState(testnetsEnabledLocalstorage);

  const toggleTestnetsEnabled = () => {
    const newState = !testnetsEnabled;
    setTestnetsMode(!testnetsEnabled);
    localStorage.setItem(testnetsEnabledId, newState ? 'true' : 'false');
    // Set window.location to trigger a page reload when navigating to the the dashboard
    window.location.href = '/';
  };

  return (
    <Box
      component={component}
      onClick={toggleTestnetsEnabled}
      sx={{
        cursor: 'pointer',
        py: { xs: 1.5, md: 2 },
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
      <Box sx={{ display: 'flex', alignItems: 'start' }}>
        <ListItemIcon
          sx={{ mr: 3, borderRadius: '2px', overflow: 'hidden', width: 24, height: 24 }}
        >
          <img src={`/icons/testnet.svg`} width="100%" height="100%" alt={`testnet mode icon`} />
        </ListItemIcon>
      </Box>

      <ListItemText>
        <span style={{ fontSize: '16px' }}>
          <Trans>Testnet mode</Trans>
          <div style={{ color: '#7E8CA9', fontWeight: 400, fontSize: '12px' }}>Try now</div>
        </span>
      </ListItemText>
      <FormControlLabel
        sx={{ mr: 0 }}
        value="testnetsMode"
        control={
          <Switch
            disableRipple
            checked={testnetsEnabled}
            sx={{ '.MuiSwitch-track': { bgcolor: 'primary.light' } }}
          />
        }
        label={testnetsEnabled ? 'On' : 'Off'}
        labelPlacement="start"
      />
    </Box>
  );
};
