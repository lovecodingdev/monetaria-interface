import { normalize, UserIncentiveData, valueToBigNumber } from '@monetaria/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Paper, Button, useMediaQuery, useTheme, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';

import borderGradient from 'src/layouts/borderGradient';

export const MNTPanel = () => {
  return (
    <Paper
      sx={{
        p: 4,
        height: '100%',
        ...borderGradient,
      }}
    >
      <Typography variant="h2">MNT</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          gap: { sm: 4, md: 8 },
          my: 2,
        }}
      >
        <TopInfoPanelItem hideIcon title={<Trans>Price</Trans>}>
          <FormattedNumber
            value={Number(2.12)}
            symbol="USD"
            variant={'main21'}
            visibleDecimals={2}
            compact
            symbolsVariant={'secondary21'}
            color="#080F26"
            symbolsColor="#080F26"
          />
        </TopInfoPanelItem>
        <TopInfoPanelItem hideIcon title={<Trans>Buyback(72hr)</Trans>}>
          <FormattedNumber
            value={Number(675292.2)}
            symbol="USD"
            variant={'main21'}
            visibleDecimals={2}
            compact
            symbolsVariant={'secondary21'}
            color="#080F26"
            symbolsColor="#080F26"
          />
        </TopInfoPanelItem>
        <TopInfoPanelItem hideIcon title={<Trans>Buyback(Total)</Trans>}>
          <FormattedNumber
            value={Number(675292.2)}
            symbol="USD"
            variant={'main21'}
            visibleDecimals={2}
            compact
            symbolsVariant={'secondary21'}
            color="#080F26"
            symbolsColor="#080F26"
          />
        </TopInfoPanelItem>
        <Box sx={{ flex: { md: 1 } }} />
        <TopInfoPanelItem hideIcon title={<Trans>Liquidity Mining Reserve</Trans>}>
          <FormattedNumber
            value={Number(5656002.2)}
            symbol="USD"
            variant={'main21'}
            visibleDecimals={2}
            compact
            symbolsVariant={'secondary21'}
            color="#080F26"
            symbolsColor="#080F26"
          />
        </TopInfoPanelItem>
      </Box>
    </Paper>
  );
};
