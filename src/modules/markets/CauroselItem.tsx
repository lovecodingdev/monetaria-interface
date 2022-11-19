import react from 'react';
import { Box, Typography } from '@mui/material';
import { TokenIcon } from '../../components/primitives/TokenIcon';
import { ComputedReserveData } from '../../hooks/app-data-provider/useAppDataProvider';
import { IncentivesCard } from '../../components/incentives/IncentivesCard';
import { useRouter } from 'next/router';
import { Link, ROUTES } from '../../components/primitives/Link';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

export const CauroselItem = (props: ComputedReserveData) => {
  const router = useRouter();
  const { currentMarket } = useProtocolDataContext();

  return (
    <Box
      sx={{
        cursor: 'pointer',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        border: '1px solid #719aad38',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.609) 100%)',
        height: '48px',
      }}
      onClick={() => router.push(ROUTES.reserveOverview(props.underlyingAsset, currentMarket))}
    >
      <TokenIcon symbol={props.iconSymbol} fontSize="large" />
      <Box
        sx={{
          marginLeft: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <Typography variant="secondary12" component="div" sx={{ whiteSpace: 'nowrap' }}>
          {String(props.name).length > 12 ? props.name.slice(0, 12) + '...' : props.name}
        </Typography>
        <Typography
          variant="secondary12"
          component="p"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <b>{props.symbol}</b>&nbsp;
          <IncentivesCard
            value={props.supplyAPY}
            incentives={props.aIncentivesData || []}
            symbol={props.symbol}
            variant="secondary14"
            symbolsVariant="secondary14"
          />
        </Typography>
      </Box>
    </Box>
  );
};
